import { f as fromNow } from './date_formatter-80b284a6.js';

//**************************************************************************************
/**
 * Making UTC date from local date
 * @param {Date} date Date to convert from
 * @returns {Date}
 */
function getUTCDate(date)
{
	// noinspection NestedFunctionCallJS, MagicNumberJS
	return new Date(date.getTime() + (date.getTimezoneOffset() * 60000));
}
//**************************************************************************************
// noinspection FunctionWithMultipleReturnPointsJS
/**
 * Get value for input parameters, or set a default value
 * @param {Object} parameters
 * @param {string} name
 * @param defaultValue
 */
function getParametersValue(parameters, name, defaultValue)
{
	// noinspection ConstantOnRightSideOfComparisonJS, NonBlockStatementBodyJS
	if((parameters instanceof Object) === false)
		return defaultValue;
	
	// noinspection NonBlockStatementBodyJS
	if(name in parameters)
		return parameters[name];
	
	return defaultValue;
}
//**************************************************************************************
/**
 * Converts "ArrayBuffer" into a hexdecimal string
 * @param {ArrayBuffer} inputBuffer
 * @param {number} [inputOffset=0]
 * @param {number} [inputLength=inputBuffer.byteLength]
 * @param {boolean} [insertSpace=false]
 * @returns {string}
 */
function bufferToHexCodes(inputBuffer, inputOffset = 0, inputLength = (inputBuffer.byteLength - inputOffset), insertSpace = false)
{
	let result = "";
	
	for(const item of (new Uint8Array(inputBuffer, inputOffset, inputLength)))
	{
		// noinspection ChainedFunctionCallJS
		const str = item.toString(16).toUpperCase();
		
		// noinspection ConstantOnRightSideOfComparisonJS, NonBlockStatementBodyJS
		if(str.length === 1)
			result += "0";
		
		result += str;
		
		// noinspection NonBlockStatementBodyJS
		if(insertSpace)
			result += " ";
	}
	
	return result.trim();
}
//**************************************************************************************
// noinspection JSValidateJSDoc, FunctionWithMultipleReturnPointsJS
/**
 * Check input "ArrayBuffer" for common functions
 * @param {LocalBaseBlock} baseBlock
 * @param {ArrayBuffer} inputBuffer
 * @param {number} inputOffset
 * @param {number} inputLength
 * @returns {boolean}
 */
function checkBufferParams(baseBlock, inputBuffer, inputOffset, inputLength)
{
	// noinspection ConstantOnRightSideOfComparisonJS
	if((inputBuffer instanceof ArrayBuffer) === false)
	{
		// noinspection JSUndefinedPropertyAssignment
		baseBlock.error = "Wrong parameter: inputBuffer must be \"ArrayBuffer\"";
		return false;
	}
	
	// noinspection ConstantOnRightSideOfComparisonJS
	if(inputBuffer.byteLength === 0)
	{
		// noinspection JSUndefinedPropertyAssignment
		baseBlock.error = "Wrong parameter: inputBuffer has zero length";
		return false;
	}
	
	// noinspection ConstantOnRightSideOfComparisonJS
	if(inputOffset < 0)
	{
		// noinspection JSUndefinedPropertyAssignment
		baseBlock.error = "Wrong parameter: inputOffset less than zero";
		return false;
	}
	
	// noinspection ConstantOnRightSideOfComparisonJS
	if(inputLength < 0)
	{
		// noinspection JSUndefinedPropertyAssignment
		baseBlock.error = "Wrong parameter: inputLength less than zero";
		return false;
	}
	
	// noinspection ConstantOnRightSideOfComparisonJS
	if((inputBuffer.byteLength - inputOffset - inputLength) < 0)
	{
		// noinspection JSUndefinedPropertyAssignment
		baseBlock.error = "End of input reached before message was fully decoded (inconsistent offset and length values)";
		return false;
	}
	
	return true;
}
//**************************************************************************************
// noinspection FunctionWithMultipleReturnPointsJS
/**
 * Convert number from 2^base to 2^10
 * @param {Uint8Array} inputBuffer
 * @param {number} inputBase
 * @returns {number}
 */
function utilFromBase(inputBuffer, inputBase)
{
	let result = 0;
	
	// noinspection ConstantOnRightSideOfComparisonJS, NonBlockStatementBodyJS
	if(inputBuffer.length === 1)
		return inputBuffer[0];
	
	// noinspection ConstantOnRightSideOfComparisonJS, NonBlockStatementBodyJS
	for(let i = (inputBuffer.length - 1); i >= 0; i--)
		result += inputBuffer[(inputBuffer.length - 1) - i] * Math.pow(2, inputBase * i);
	
	return result;
}
//**************************************************************************************
// noinspection FunctionWithMultipleLoopsJS, FunctionWithMultipleReturnPointsJS
/**
 * Convert number from 2^10 to 2^base
 * @param {!number} value The number to convert
 * @param {!number} base The base for 2^base
 * @param {number} [reserved=0] Pre-defined number of bytes in output array (-1 = limited by function itself)
 * @returns {ArrayBuffer}
 */
function utilToBase(value, base, reserved = (-1))
{
	const internalReserved = reserved;
	let internalValue = value;
	
	let result = 0;
	let biggest = Math.pow(2, base);
	
	// noinspection ConstantOnRightSideOfComparisonJS
	for(let i = 1; i < 8; i++)
	{
		if(value < biggest)
		{
			let retBuf;
			
			// noinspection ConstantOnRightSideOfComparisonJS
			if(internalReserved < 0)
			{
				retBuf = new ArrayBuffer(i);
				result = i;
			}
			else
			{
				// noinspection NonBlockStatementBodyJS
				if(internalReserved < i)
					return (new ArrayBuffer(0));
				
				retBuf = new ArrayBuffer(internalReserved);
				
				result = internalReserved;
			}
			
			const retView = new Uint8Array(retBuf);
			
			// noinspection ConstantOnRightSideOfComparisonJS
			for(let j = (i - 1); j >= 0; j--)
			{
				const basis = Math.pow(2, j * base);
				
				retView[result - j - 1] = Math.floor(internalValue / basis);
				internalValue -= (retView[result - j - 1]) * basis;
			}
			
			return retBuf;
		}
		
		biggest *= Math.pow(2, base);
	}
	
	return new ArrayBuffer(0);
}
//**************************************************************************************
// noinspection FunctionWithMultipleLoopsJS
/**
 * Concatenate two ArrayBuffers
 * @param {...ArrayBuffer} buffers Set of ArrayBuffer
 */
function utilConcatBuf(...buffers)
{
	//region Initial variables
	let outputLength = 0;
	let prevLength = 0;
	//endregion
	
	//region Calculate output length
	
	// noinspection NonBlockStatementBodyJS
	for(const buffer of buffers)
		outputLength += buffer.byteLength;
	//endregion
	
	const retBuf = new ArrayBuffer(outputLength);
	const retView = new Uint8Array(retBuf);
	
	for(const buffer of buffers)
	{
		// noinspection NestedFunctionCallJS
		retView.set(new Uint8Array(buffer), prevLength);
		prevLength += buffer.byteLength;
	}
	
	return retBuf;
}
//**************************************************************************************
// noinspection FunctionWithMultipleLoopsJS
/**
 * Concatenate two Uint8Array
 * @param {...Uint8Array} views Set of Uint8Array
 */
function utilConcatView(...views)
{
	//region Initial variables
	let outputLength = 0;
	let prevLength = 0;
	//endregion
	
	//region Calculate output length
	// noinspection NonBlockStatementBodyJS
	for(const view of views)
		outputLength += view.length;
	//endregion
	
	const retBuf = new ArrayBuffer(outputLength);
	const retView = new Uint8Array(retBuf);
	
	for(const view of views)
	{
		retView.set(view, prevLength);
		prevLength += view.length;
	}
	
	return retView;
}
//**************************************************************************************
// noinspection FunctionWithMultipleLoopsJS
/**
 * Decoding of "two complement" values
 * The function must be called in scope of instance of "hexBlock" class ("valueHex" and "warnings" properties must be present)
 * @returns {number}
 */
function utilDecodeTC()
{
	const buf = new Uint8Array(this.valueHex);
	
	// noinspection ConstantOnRightSideOfComparisonJS
	if(this.valueHex.byteLength >= 2)
	{
		//noinspection JSBitwiseOperatorUsage, ConstantOnRightSideOfComparisonJS, LocalVariableNamingConventionJS, MagicNumberJS, NonShortCircuitBooleanExpressionJS
		const condition1 = (buf[0] === 0xFF) && (buf[1] & 0x80);
		// noinspection ConstantOnRightSideOfComparisonJS, LocalVariableNamingConventionJS, MagicNumberJS, NonShortCircuitBooleanExpressionJS
		const condition2 = (buf[0] === 0x00) && ((buf[1] & 0x80) === 0x00);
		
		// noinspection NonBlockStatementBodyJS
		if(condition1 || condition2)
			this.warnings.push("Needlessly long format");
	}
	
	//region Create big part of the integer
	const bigIntBuffer = new ArrayBuffer(this.valueHex.byteLength);
	const bigIntView = new Uint8Array(bigIntBuffer);
	// noinspection NonBlockStatementBodyJS
	for(let i = 0; i < this.valueHex.byteLength; i++)
		bigIntView[i] = 0;
	
	// noinspection MagicNumberJS, NonShortCircuitBooleanExpressionJS
	bigIntView[0] = (buf[0] & 0x80); // mask only the biggest bit
	
	const bigInt = utilFromBase(bigIntView, 8);
	//endregion
	
	//region Create small part of the integer
	const smallIntBuffer = new ArrayBuffer(this.valueHex.byteLength);
	const smallIntView = new Uint8Array(smallIntBuffer);
	// noinspection NonBlockStatementBodyJS
	for(let j = 0; j < this.valueHex.byteLength; j++)
		smallIntView[j] = buf[j];
	
	// noinspection MagicNumberJS
	smallIntView[0] &= 0x7F; // mask biggest bit
	
	const smallInt = utilFromBase(smallIntView, 8);
	//endregion
	
	return (smallInt - bigInt);
}
//**************************************************************************************
// noinspection FunctionWithMultipleLoopsJS, FunctionWithMultipleReturnPointsJS
/**
 * Encode integer value to "two complement" format
 * @param {number} value Value to encode
 * @returns {ArrayBuffer}
 */
function utilEncodeTC(value)
{
	// noinspection ConstantOnRightSideOfComparisonJS, ConditionalExpressionJS
	const modValue = (value < 0) ? (value * (-1)) : value;
	let bigInt = 128;
	
	// noinspection ConstantOnRightSideOfComparisonJS
	for(let i = 1; i < 8; i++)
	{
		if(modValue <= bigInt)
		{
			// noinspection ConstantOnRightSideOfComparisonJS
			if(value < 0)
			{
				const smallInt = bigInt - modValue;
				
				const retBuf = utilToBase(smallInt, 8, i);
				const retView = new Uint8Array(retBuf);
				
				// noinspection MagicNumberJS
				retView[0] |= 0x80;
				
				return retBuf;
			}
			
			let retBuf = utilToBase(modValue, 8, i);
			let retView = new Uint8Array(retBuf);
			
			//noinspection JSBitwiseOperatorUsage, MagicNumberJS, NonShortCircuitBooleanExpressionJS
			if(retView[0] & 0x80)
			{
				//noinspection JSCheckFunctionSignatures
				const tempBuf = retBuf.slice(0);
				const tempView = new Uint8Array(tempBuf);
				
				retBuf = new ArrayBuffer(retBuf.byteLength + 1);
				// noinspection ReuseOfLocalVariableJS
				retView = new Uint8Array(retBuf);
				
				// noinspection NonBlockStatementBodyJS
				for(let k = 0; k < tempBuf.byteLength; k++)
					retView[k + 1] = tempView[k];
				
				// noinspection MagicNumberJS
				retView[0] = 0x00;
			}
			
			return retBuf;
		}
		
		bigInt *= Math.pow(2, 8);
	}
	
	return (new ArrayBuffer(0));
}
//**************************************************************************************
// noinspection FunctionWithMultipleReturnPointsJS, ParameterNamingConventionJS
/**
 * Compare two array buffers
 * @param {!ArrayBuffer} inputBuffer1
 * @param {!ArrayBuffer} inputBuffer2
 * @returns {boolean}
 */
function isEqualBuffer(inputBuffer1, inputBuffer2)
{
	// noinspection NonBlockStatementBodyJS
	if(inputBuffer1.byteLength !== inputBuffer2.byteLength)
		return false;
	
	// noinspection LocalVariableNamingConventionJS
	const view1 = new Uint8Array(inputBuffer1);
	// noinspection LocalVariableNamingConventionJS
	const view2 = new Uint8Array(inputBuffer2);
	
	for(let i = 0; i < view1.length; i++)
	{
		// noinspection NonBlockStatementBodyJS
		if(view1[i] !== view2[i])
			return false;
	}
	
	return true;
}
//**************************************************************************************
// noinspection FunctionWithMultipleReturnPointsJS
/**
 * Pad input number with leade "0" if needed
 * @returns {string}
 * @param {number} inputNumber
 * @param {number} fullLength
 */
function padNumber(inputNumber, fullLength)
{
	const str = inputNumber.toString(10);
	
	// noinspection NonBlockStatementBodyJS
	if(fullLength < str.length)
		return "";
	
	const dif = fullLength - str.length;
	
	const padding = new Array(dif);
	// noinspection NonBlockStatementBodyJS
	for(let i = 0; i < dif; i++)
		padding[i] = "0";
	
	const paddingString = padding.join("");
	
	return paddingString.concat(str);
}
//**************************************************************************************
const base64Template = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
const base64UrlTemplate = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_=";
//**************************************************************************************
// noinspection FunctionWithMultipleLoopsJS, OverlyComplexFunctionJS, FunctionTooLongJS, FunctionNamingConventionJS
/**
 * Encode string into BASE64 (or "base64url")
 * @param {string} input
 * @param {boolean} useUrlTemplate If "true" then output would be encoded using "base64url"
 * @param {boolean} skipPadding Skip BASE-64 padding or not
 * @param {boolean} skipLeadingZeros Skip leading zeros in input data or not
 * @returns {string}
 */
function toBase64(input, useUrlTemplate = false, skipPadding = false, skipLeadingZeros = false)
{
	let i = 0;
	
	// noinspection LocalVariableNamingConventionJS
	let flag1 = 0;
	// noinspection LocalVariableNamingConventionJS
	let flag2 = 0;
	
	let output = "";
	
	// noinspection ConditionalExpressionJS
	const template = (useUrlTemplate) ? base64UrlTemplate : base64Template;
	
	if(skipLeadingZeros)
	{
		let nonZeroPosition = 0;
		
		for(let i = 0; i < input.length; i++)
		{
			// noinspection ConstantOnRightSideOfComparisonJS
			if(input.charCodeAt(i) !== 0)
			{
				nonZeroPosition = i;
				// noinspection BreakStatementJS
				break;
			}
		}
		
		// noinspection AssignmentToFunctionParameterJS
		input = input.slice(nonZeroPosition);
	}
	
	while(i < input.length)
	{
		// noinspection LocalVariableNamingConventionJS, IncrementDecrementResultUsedJS
		const chr1 = input.charCodeAt(i++);
		// noinspection NonBlockStatementBodyJS
		if(i >= input.length)
			flag1 = 1;
		// noinspection LocalVariableNamingConventionJS, IncrementDecrementResultUsedJS
		const chr2 = input.charCodeAt(i++);
		// noinspection NonBlockStatementBodyJS
		if(i >= input.length)
			flag2 = 1;
		// noinspection LocalVariableNamingConventionJS, IncrementDecrementResultUsedJS
		const chr3 = input.charCodeAt(i++);
		
		// noinspection LocalVariableNamingConventionJS
		const enc1 = chr1 >> 2;
		// noinspection LocalVariableNamingConventionJS, MagicNumberJS, NonShortCircuitBooleanExpressionJS
		const enc2 = ((chr1 & 0x03) << 4) | (chr2 >> 4);
		// noinspection LocalVariableNamingConventionJS, MagicNumberJS, NonShortCircuitBooleanExpressionJS
		let enc3 = ((chr2 & 0x0F) << 2) | (chr3 >> 6);
		// noinspection LocalVariableNamingConventionJS, MagicNumberJS, NonShortCircuitBooleanExpressionJS
		let enc4 = chr3 & 0x3F;
		
		// noinspection ConstantOnRightSideOfComparisonJS
		if(flag1 === 1)
		{
			// noinspection NestedAssignmentJS, AssignmentResultUsedJS, MagicNumberJS
			enc3 = enc4 = 64;
		}
		else
		{
			// noinspection ConstantOnRightSideOfComparisonJS
			if(flag2 === 1)
			{
				// noinspection MagicNumberJS
				enc4 = 64;
			}
		}
		
		// noinspection NonBlockStatementBodyJS
		if(skipPadding)
		{
			// noinspection ConstantOnRightSideOfComparisonJS, NonBlockStatementBodyJS, MagicNumberJS
			if(enc3 === 64)
				output += `${template.charAt(enc1)}${template.charAt(enc2)}`;
			else
			{
				// noinspection ConstantOnRightSideOfComparisonJS, NonBlockStatementBodyJS, MagicNumberJS
				if(enc4 === 64)
					output += `${template.charAt(enc1)}${template.charAt(enc2)}${template.charAt(enc3)}`;
				else
					output += `${template.charAt(enc1)}${template.charAt(enc2)}${template.charAt(enc3)}${template.charAt(enc4)}`;
			}
		}
		else
			output += `${template.charAt(enc1)}${template.charAt(enc2)}${template.charAt(enc3)}${template.charAt(enc4)}`;
	}
	
	return output;
}
//**************************************************************************************
// noinspection FunctionWithMoreThanThreeNegationsJS, FunctionWithMultipleLoopsJS, OverlyComplexFunctionJS, FunctionNamingConventionJS
/**
 * Decode string from BASE64 (or "base64url")
 * @param {string} input
 * @param {boolean} [useUrlTemplate=false] If "true" then output would be encoded using "base64url"
 * @param {boolean} [cutTailZeros=false] If "true" then cut tailing zeroz from function result
 * @returns {string}
 */
function fromBase64(input, useUrlTemplate = false, cutTailZeros = false)
{
	// noinspection ConditionalExpressionJS
	const template = (useUrlTemplate) ? base64UrlTemplate : base64Template;
	
	//region Aux functions
	// noinspection FunctionWithMultipleReturnPointsJS, NestedFunctionJS
	function indexof(toSearch)
	{
		// noinspection ConstantOnRightSideOfComparisonJS, MagicNumberJS
		for(let i = 0; i < 64; i++)
		{
			// noinspection NonBlockStatementBodyJS
			if(template.charAt(i) === toSearch)
				return i;
		}
		
		// noinspection MagicNumberJS
		return 64;
	}
	
	// noinspection NestedFunctionJS
	function test(incoming)
	{
		// noinspection ConstantOnRightSideOfComparisonJS, ConditionalExpressionJS, MagicNumberJS
		return ((incoming === 64) ? 0x00 : incoming);
	}
	//endregion
	
	let i = 0;
	
	let output = "";
	
	while(i < input.length)
	{
		// noinspection NestedFunctionCallJS, LocalVariableNamingConventionJS, IncrementDecrementResultUsedJS
		const enc1 = indexof(input.charAt(i++));
		// noinspection NestedFunctionCallJS, LocalVariableNamingConventionJS, ConditionalExpressionJS, MagicNumberJS, IncrementDecrementResultUsedJS
		const enc2 = (i >= input.length) ? 0x00 : indexof(input.charAt(i++));
		// noinspection NestedFunctionCallJS, LocalVariableNamingConventionJS, ConditionalExpressionJS, MagicNumberJS, IncrementDecrementResultUsedJS
		const enc3 = (i >= input.length) ? 0x00 : indexof(input.charAt(i++));
		// noinspection NestedFunctionCallJS, LocalVariableNamingConventionJS, ConditionalExpressionJS, MagicNumberJS, IncrementDecrementResultUsedJS
		const enc4 = (i >= input.length) ? 0x00 : indexof(input.charAt(i++));
		
		// noinspection LocalVariableNamingConventionJS, NonShortCircuitBooleanExpressionJS
		const chr1 = (test(enc1) << 2) | (test(enc2) >> 4);
		// noinspection LocalVariableNamingConventionJS, MagicNumberJS, NonShortCircuitBooleanExpressionJS
		const chr2 = ((test(enc2) & 0x0F) << 4) | (test(enc3) >> 2);
		// noinspection LocalVariableNamingConventionJS, MagicNumberJS, NonShortCircuitBooleanExpressionJS
		const chr3 = ((test(enc3) & 0x03) << 6) | test(enc4);
		
		output += String.fromCharCode(chr1);
		
		// noinspection ConstantOnRightSideOfComparisonJS, NonBlockStatementBodyJS, MagicNumberJS
		if(enc3 !== 64)
			output += String.fromCharCode(chr2);
		
		// noinspection ConstantOnRightSideOfComparisonJS, NonBlockStatementBodyJS, MagicNumberJS
		if(enc4 !== 64)
			output += String.fromCharCode(chr3);
	}
	
	if(cutTailZeros)
	{
		const outputLength = output.length;
		let nonZeroStart = (-1);
		
		// noinspection ConstantOnRightSideOfComparisonJS
		for(let i = (outputLength - 1); i >= 0; i--)
		{
			// noinspection ConstantOnRightSideOfComparisonJS
			if(output.charCodeAt(i) !== 0)
			{
				nonZeroStart = i;
				// noinspection BreakStatementJS
				break;
			}
		}
		
		// noinspection NonBlockStatementBodyJS, NegatedIfStatementJS
		if(nonZeroStart !== (-1))
			output = output.slice(0, nonZeroStart + 1);
		else
			output = "";
	}
	
	return output;
}
//**************************************************************************************
function arrayBufferToString(buffer)
{
	let resultString = "";
	const view = new Uint8Array(buffer);
	
	// noinspection NonBlockStatementBodyJS
	for(const element of view)
		resultString += String.fromCharCode(element);
	
	return resultString;
}
//**************************************************************************************
function stringToArrayBuffer(str)
{
	const stringLength = str.length;
	
	const resultBuffer = new ArrayBuffer(stringLength);
	const resultView = new Uint8Array(resultBuffer);
	
	// noinspection NonBlockStatementBodyJS
	for(let i = 0; i < stringLength; i++)
		resultView[i] = str.charCodeAt(i);
	
	return resultBuffer;
}
//**************************************************************************************
const log2 = Math.log(2);
//**************************************************************************************
// noinspection FunctionNamingConventionJS
/**
 * Get nearest to input length power of 2
 * @param {number} length Current length of existing array
 * @returns {number}
 */
function nearestPowerOf2(length)
{
	const base = (Math.log(length) / log2);
	
	const floor = Math.floor(base);
	const round = Math.round(base);
	
	// noinspection ConditionalExpressionJS
	return ((floor === round) ? floor : round);
}
//**************************************************************************************
/**
 * Delete properties by name from specified object
 * @param {Object} object Object to delete properties from
 * @param {Array.<string>} propsArray Array of properties names
 */
function clearProps(object, propsArray)
{
	for(const prop of propsArray)
		delete object[prop];
}
//**************************************************************************************

/* eslint-disable indent */
//**************************************************************************************
//region Declaration of global variables
//**************************************************************************************
const powers2 = [new Uint8Array([1])];
const digitsString = "0123456789";
//**************************************************************************************
//endregion
//**************************************************************************************
//region Declaration for "LocalBaseBlock" class
//**************************************************************************************
/**
 * Class used as a base block for all remaining ASN.1 classes
 * @typedef LocalBaseBlock
 * @interface
 * @property {number} blockLength
 * @property {string} error
 * @property {Array.<string>} warnings
 * @property {ArrayBuffer} valueBeforeDecode
 */
class LocalBaseBlock
{
	//**********************************************************************************
	/**
	 * Constructor for "LocalBaseBlock" class
	 * @param {Object} [parameters={}]
	 * @property {ArrayBuffer} [valueBeforeDecode]
	 */
	constructor(parameters = {})
	{
		/**
		 * @type {number} blockLength
		 */
		this.blockLength = getParametersValue(parameters, "blockLength", 0);
		/**
		 * @type {string} error
		 */
		this.error = getParametersValue(parameters, "error", "");
		/**
		 * @type {Array.<string>} warnings
		 */
		this.warnings = getParametersValue(parameters, "warnings", []);
		//noinspection JSCheckFunctionSignatures
		/**
		 * @type {ArrayBuffer} valueBeforeDecode
		 */
		if("valueBeforeDecode" in parameters)
			this.valueBeforeDecode = parameters.valueBeforeDecode.slice(0);
		else
			this.valueBeforeDecode = new ArrayBuffer(0);
	}
	//**********************************************************************************
	/**
	 * Aux function, need to get a block name. Need to have it here for inhiritence
	 * @returns {string}
	 */
	static blockName()
	{
		return "baseBlock";
	}
	//**********************************************************************************
	/**
	 * Convertion for the block to JSON object
	 * @returns {{blockName: string, blockLength: number, error: string, warnings: Array.<string>, valueBeforeDecode: string}}
	 */
	toJSON()
	{
		return {
			blockName: this.constructor.blockName(),
			blockLength: this.blockLength,
			error: this.error,
			warnings: this.warnings,
			valueBeforeDecode: bufferToHexCodes(this.valueBeforeDecode, 0, this.valueBeforeDecode.byteLength)
		};
	}
	//**********************************************************************************
}
//**************************************************************************************
//endregion
//**************************************************************************************
//region Description for "HexBlock" class
//**************************************************************************************
/**
 * Class used as a base block for all remaining ASN.1 classes
 * @extends LocalBaseBlock
 * @typedef HexBlock
 * @property {number} blockLength
 * @property {string} error
 * @property {Array.<string>} warnings
 * @property {ArrayBuffer} valueBeforeDecode
 * @property {boolean} isHexOnly
 * @property {ArrayBuffer} valueHex
 */
//noinspection JSUnusedLocalSymbols
const HexBlock = BaseClass => class LocalHexBlockMixin extends BaseClass
{
	//**********************************************************************************
	//noinspection JSUnusedGlobalSymbols
	/**
	 * Constructor for "HexBlock" class
	 * @param {Object} [parameters={}]
	 * @property {ArrayBuffer} [valueHex]
	 */
	constructor(parameters = {})
	{
		super(parameters);

		/**
		 * @type {boolean}
		 */
		this.isHexOnly = getParametersValue(parameters, "isHexOnly", false);
		/**
		 * @type {ArrayBuffer}
		 */
		if("valueHex" in parameters)
			this.valueHex = parameters.valueHex.slice(0);
		else
			this.valueHex = new ArrayBuffer(0);
	}
	//**********************************************************************************
	/**
	 * Aux function, need to get a block name. Need to have it here for inhiritence
	 * @returns {string}
	 */
	static blockName()
	{
		return "hexBlock";
	}
	//**********************************************************************************
	/**
	 * Base function for converting block from BER encoded array of bytes
	 * @param {!ArrayBuffer} inputBuffer ASN.1 BER encoded array
	 * @param {!number} inputOffset Offset in ASN.1 BER encoded array where decoding should be started
	 * @param {!number} inputLength Maximum length of array of bytes which can be using in this function
	 * @returns {number} Offset after least decoded byte
	 */
	fromBER(inputBuffer, inputOffset, inputLength)
	{
		//region Basic check for parameters
		//noinspection JSCheckFunctionSignatures
		if(checkBufferParams(this, inputBuffer, inputOffset, inputLength) === false)
			return (-1);
		//endregion

		//region Getting Uint8Array from ArrayBuffer
		const intBuffer = new Uint8Array(inputBuffer, inputOffset, inputLength);
		//endregion

		//region Initial checks
		if(intBuffer.length === 0)
		{
			this.warnings.push("Zero buffer length");
			return inputOffset;
		}
		//endregion

		//region Copy input buffer to internal buffer
		this.valueHex = inputBuffer.slice(inputOffset, inputOffset + inputLength);
		//endregion

		this.blockLength = inputLength;

		return (inputOffset + inputLength);
	}
	//**********************************************************************************
	/**
	 * Encoding of current ASN.1 block into ASN.1 encoded array (BER rules)
	 * @param {boolean} [sizeOnly=false] Flag that we need only a size of encoding, not a real array of bytes
	 * @returns {ArrayBuffer}
	 */
	toBER(sizeOnly = false)
	{
		if(this.isHexOnly !== true)
		{
			this.error = "Flag \"isHexOnly\" is not set, abort";
			return new ArrayBuffer(0);
		}

		if(sizeOnly === true)
			return new ArrayBuffer(this.valueHex.byteLength);

		//noinspection JSCheckFunctionSignatures
		return this.valueHex.slice(0);
	}
	//**********************************************************************************
	/**
	 * Convertion for the block to JSON object
	 * @returns {Object}
	 */
	toJSON()
	{
		let object = {};
		
		//region Seems at the moment (Sep 2016) there is no way how to check method is supported in "super" object
		try
		{
			object = super.toJSON();
		}
		catch(ex){}
		//endregion

		object.blockName = this.constructor.blockName();
		object.isHexOnly = this.isHexOnly;
		object.valueHex = bufferToHexCodes(this.valueHex, 0, this.valueHex.byteLength);

		return object;
	}
	//**********************************************************************************
};
//**************************************************************************************
//endregion
//**************************************************************************************
//region Declaration of identification block class
//**************************************************************************************
class LocalIdentificationBlock extends HexBlock(LocalBaseBlock)
{
	//**********************************************************************************
	/**
	 * Constructor for "LocalBaseBlock" class
	 * @param {Object} [parameters={}]
	 * @property {Object} [idBlock]
	 */
	constructor(parameters = {})
	{
		super();

		if("idBlock" in parameters)
		{
			//region Properties from hexBlock class
			this.isHexOnly = getParametersValue(parameters.idBlock, "isHexOnly", false);
			this.valueHex = getParametersValue(parameters.idBlock, "valueHex", new ArrayBuffer(0));
			//endregion

			this.tagClass = getParametersValue(parameters.idBlock, "tagClass", (-1));
			this.tagNumber = getParametersValue(parameters.idBlock, "tagNumber", (-1));
			this.isConstructed = getParametersValue(parameters.idBlock, "isConstructed", false);
		}
		else
		{
			this.tagClass = (-1);
			this.tagNumber = (-1);
			this.isConstructed = false;
		}
	}
	//**********************************************************************************
	/**
	 * Aux function, need to get a block name. Need to have it here for inhiritence
	 * @returns {string}
	 */
	static blockName()
	{
		return "identificationBlock";
	}
	//**********************************************************************************
	/**
	 * Encoding of current ASN.1 block into ASN.1 encoded array (BER rules)
	 * @param {boolean} [sizeOnly=false] Flag that we need only a size of encoding, not a real array of bytes
	 * @returns {ArrayBuffer}
	 */
	toBER(sizeOnly = false)
	{
		//region Initial variables
		let firstOctet = 0;
		let retBuf;
		let retView;
		//endregion

		switch(this.tagClass)
		{
			case 1:
				firstOctet |= 0x00; // UNIVERSAL
				break;
			case 2:
				firstOctet |= 0x40; // APPLICATION
				break;
			case 3:
				firstOctet |= 0x80; // CONTEXT-SPECIFIC
				break;
			case 4:
				firstOctet |= 0xC0; // PRIVATE
				break;
			default:
				this.error = "Unknown tag class";
				return (new ArrayBuffer(0));
		}

		if(this.isConstructed)
			firstOctet |= 0x20;

		if((this.tagNumber < 31) && (!this.isHexOnly))
		{
			retBuf = new ArrayBuffer(1);
			retView = new Uint8Array(retBuf);

			if(!sizeOnly)
			{
				let number = this.tagNumber;
				number &= 0x1F;
				firstOctet |= number;

				retView[0] = firstOctet;
			}

			return retBuf;
		}

		if(this.isHexOnly === false)
		{
			const encodedBuf = utilToBase(this.tagNumber, 7);
			const encodedView = new Uint8Array(encodedBuf);
			const size = encodedBuf.byteLength;

			retBuf = new ArrayBuffer(size + 1);
			retView = new Uint8Array(retBuf);
			retView[0] = (firstOctet | 0x1F);

			if(!sizeOnly)
			{
				for(let i = 0; i < (size - 1); i++)
					retView[i + 1] = encodedView[i] | 0x80;

				retView[size] = encodedView[size - 1];
			}

			return retBuf;
		}

		retBuf = new ArrayBuffer(this.valueHex.byteLength + 1);
		retView = new Uint8Array(retBuf);

		retView[0] = (firstOctet | 0x1F);

		if(sizeOnly === false)
		{
			const curView = new Uint8Array(this.valueHex);

			for(let i = 0; i < (curView.length - 1); i++)
				retView[i + 1] = curView[i] | 0x80;

			retView[this.valueHex.byteLength] = curView[curView.length - 1];
		}

		return retBuf;
	}
	//**********************************************************************************
	/**
	 * Base function for converting block from BER encoded array of bytes
	 * @param {!ArrayBuffer} inputBuffer ASN.1 BER encoded array
	 * @param {!number} inputOffset Offset in ASN.1 BER encoded array where decoding should be started
	 * @param {!number} inputLength Maximum length of array of bytes which can be using in this function
	 * @returns {number}
	 */
	fromBER(inputBuffer, inputOffset, inputLength)
	{
		//region Basic check for parameters
		//noinspection JSCheckFunctionSignatures
		if(checkBufferParams(this, inputBuffer, inputOffset, inputLength) === false)
			return (-1);
		//endregion

		//region Getting Uint8Array from ArrayBuffer
		const intBuffer = new Uint8Array(inputBuffer, inputOffset, inputLength);
		//endregion

		//region Initial checks
		if(intBuffer.length === 0)
		{
			this.error = "Zero buffer length";
			return (-1);
		}
		//endregion

		//region Find tag class
		const tagClassMask = intBuffer[0] & 0xC0;

		switch(tagClassMask)
		{
			case 0x00:
				this.tagClass = (1); // UNIVERSAL
				break;
			case 0x40:
				this.tagClass = (2); // APPLICATION
				break;
			case 0x80:
				this.tagClass = (3); // CONTEXT-SPECIFIC
				break;
			case 0xC0:
				this.tagClass = (4); // PRIVATE
				break;
			default:
				this.error = "Unknown tag class";
				return (-1);
		}
		//endregion

		//region Find it's constructed or not
		this.isConstructed = (intBuffer[0] & 0x20) === 0x20;
		//endregion

		//region Find tag number
		this.isHexOnly = false;

		const tagNumberMask = intBuffer[0] & 0x1F;

		//region Simple case (tag number < 31)
		if(tagNumberMask !== 0x1F)
		{
			this.tagNumber = (tagNumberMask);
			this.blockLength = 1;
		}
		//endregion
		//region Tag number bigger or equal to 31
		else
		{
			let count = 1;

			this.valueHex = new ArrayBuffer(255);
			let tagNumberBufferMaxLength = 255;
			let intTagNumberBuffer = new Uint8Array(this.valueHex);

			//noinspection JSBitwiseOperatorUsage
			while(intBuffer[count] & 0x80)
			{
				intTagNumberBuffer[count - 1] = intBuffer[count] & 0x7F;
				count++;

				if(count >= intBuffer.length)
				{
					this.error = "End of input reached before message was fully decoded";
					return (-1);
				}

				//region In case if tag number length is greater than 255 bytes (rare but possible case)
				if(count === tagNumberBufferMaxLength)
				{
					tagNumberBufferMaxLength += 255;

					const tempBuffer = new ArrayBuffer(tagNumberBufferMaxLength);
					const tempBufferView = new Uint8Array(tempBuffer);

					for(let i = 0; i < intTagNumberBuffer.length; i++)
						tempBufferView[i] = intTagNumberBuffer[i];

					this.valueHex = new ArrayBuffer(tagNumberBufferMaxLength);
					intTagNumberBuffer = new Uint8Array(this.valueHex);
				}
				//endregion
			}

			this.blockLength = (count + 1);
			intTagNumberBuffer[count - 1] = intBuffer[count] & 0x7F; // Write last byte to buffer

			//region Cut buffer
			const tempBuffer = new ArrayBuffer(count);
			const tempBufferView = new Uint8Array(tempBuffer);

			for(let i = 0; i < count; i++)
				tempBufferView[i] = intTagNumberBuffer[i];

			this.valueHex = new ArrayBuffer(count);
			intTagNumberBuffer = new Uint8Array(this.valueHex);
			intTagNumberBuffer.set(tempBufferView);
			//endregion

			//region Try to convert long tag number to short form
			if(this.blockLength <= 9)
				this.tagNumber = utilFromBase(intTagNumberBuffer, 7);
			else
			{
				this.isHexOnly = true;
				this.warnings.push("Tag too long, represented as hex-coded");
			}
			//endregion
		}
		//endregion
		//endregion

		//region Check if constructed encoding was using for primitive type
		if(((this.tagClass === 1)) &&
			(this.isConstructed))
		{
			switch(this.tagNumber)
			{
				case 1:  // Boolean
				case 2:  // REAL
				case 5:  // Null
				case 6:  // OBJECT IDENTIFIER
				case 9:  // REAL
				case 13: // RELATIVE OBJECT IDENTIFIER
				case 14: // Time
				case 23:
				case 24:
				case 31:
				case 32:
				case 33:
				case 34:
					this.error = "Constructed encoding used for primitive type";
					return (-1);
				default:
			}
		}
		//endregion

		return (inputOffset + this.blockLength); // Return current offset in input buffer
	}
	//**********************************************************************************
	/**
	 * Convertion for the block to JSON object
	 * @returns {{blockName: string,
	 *  tagClass: number,
	 *  tagNumber: number,
	 *  isConstructed: boolean,
	 *  isHexOnly: boolean,
	 *  valueHex: ArrayBuffer,
	 *  blockLength: number,
	 *  error: string, warnings: Array.<string>,
	 *  valueBeforeDecode: string}}
	 */
	toJSON()
	{
		let object = {};
		
		//region Seems at the moment (Sep 2016) there is no way how to check method is supported in "super" object
		try
		{
			object = super.toJSON();
		}
		catch(ex){}
		//endregion

		object.blockName = this.constructor.blockName();
		object.tagClass = this.tagClass;
		object.tagNumber = this.tagNumber;
		object.isConstructed = this.isConstructed;

		return object;
	}
	//**********************************************************************************
}
//**************************************************************************************
//endregion
//**************************************************************************************
//region Declaration of length block class
//**************************************************************************************
class LocalLengthBlock extends LocalBaseBlock
{
	//**********************************************************************************
	/**
	 * Constructor for "LocalLengthBlock" class
	 * @param {Object} [parameters={}]
	 * @property {Object} [lenBlock]
	 */
	constructor(parameters = {})
	{
		super();

		if("lenBlock" in parameters)
		{
			this.isIndefiniteForm = getParametersValue(parameters.lenBlock, "isIndefiniteForm", false);
			this.longFormUsed = getParametersValue(parameters.lenBlock, "longFormUsed", false);
			this.length = getParametersValue(parameters.lenBlock, "length", 0);
		}
		else
		{
			this.isIndefiniteForm = false;
			this.longFormUsed = false;
			this.length = 0;
		}
	}
	//**********************************************************************************
	/**
	 * Aux function, need to get a block name. Need to have it here for inhiritence
	 * @returns {string}
	 */
	static blockName()
	{
		return "lengthBlock";
	}
	//**********************************************************************************
	/**
	 * Base function for converting block from BER encoded array of bytes
	 * @param {!ArrayBuffer} inputBuffer ASN.1 BER encoded array
	 * @param {!number} inputOffset Offset in ASN.1 BER encoded array where decoding should be started
	 * @param {!number} inputLength Maximum length of array of bytes which can be using in this function
	 * @returns {number}
	 */
	fromBER(inputBuffer, inputOffset, inputLength)
	{
		//region Basic check for parameters
		//noinspection JSCheckFunctionSignatures
		if(checkBufferParams(this, inputBuffer, inputOffset, inputLength) === false)
			return (-1);
		//endregion

		//region Getting Uint8Array from ArrayBuffer
		const intBuffer = new Uint8Array(inputBuffer, inputOffset, inputLength);
		//endregion

		//region Initial checks
		if(intBuffer.length === 0)
		{
			this.error = "Zero buffer length";
			return (-1);
		}

		if(intBuffer[0] === 0xFF)
		{
			this.error = "Length block 0xFF is reserved by standard";
			return (-1);
		}
		//endregion

		//region Check for length form type
		this.isIndefiniteForm = intBuffer[0] === 0x80;
		//endregion

		//region Stop working in case of indefinite length form
		if(this.isIndefiniteForm === true)
		{
			this.blockLength = 1;
			return (inputOffset + this.blockLength);
		}
		//endregion

		//region Check is long form of length encoding using
		this.longFormUsed = !!(intBuffer[0] & 0x80);
		//endregion

		//region Stop working in case of short form of length value
		if(this.longFormUsed === false)
		{
			this.length = (intBuffer[0]);
			this.blockLength = 1;
			return (inputOffset + this.blockLength);
		}
		//endregion

		//region Calculate length value in case of long form
		const count = intBuffer[0] & 0x7F;

		if(count > 8) // Too big length value
		{
			this.error = "Too big integer";
			return (-1);
		}

		if((count + 1) > intBuffer.length)
		{
			this.error = "End of input reached before message was fully decoded";
			return (-1);
		}

		const lengthBufferView = new Uint8Array(count);

		for(let i = 0; i < count; i++)
			lengthBufferView[i] = intBuffer[i + 1];

		if(lengthBufferView[count - 1] === 0x00)
			this.warnings.push("Needlessly long encoded length");

		this.length = utilFromBase(lengthBufferView, 8);

		if(this.longFormUsed && (this.length <= 127))
			this.warnings.push("Unneccesary usage of long length form");

		this.blockLength = count + 1;
		//endregion

		return (inputOffset + this.blockLength); // Return current offset in input buffer
	}
	//**********************************************************************************
	/**
	 * Encoding of current ASN.1 block into ASN.1 encoded array (BER rules)
	 * @param {boolean} [sizeOnly=false] Flag that we need only a size of encoding, not a real array of bytes
	 * @returns {ArrayBuffer}
	 */
	toBER(sizeOnly = false)
	{
		//region Initial variables
		let retBuf;
		let retView;
		//endregion

		if(this.length > 127)
			this.longFormUsed = true;

		if(this.isIndefiniteForm)
		{
			retBuf = new ArrayBuffer(1);

			if(sizeOnly === false)
			{
				retView = new Uint8Array(retBuf);
				retView[0] = 0x80;
			}

			return retBuf;
		}

		if(this.longFormUsed === true)
		{
			const encodedBuf = utilToBase(this.length, 8);

			if(encodedBuf.byteLength > 127)
			{
				this.error = "Too big length";
				return (new ArrayBuffer(0));
			}

			retBuf = new ArrayBuffer(encodedBuf.byteLength + 1);

			if(sizeOnly === true)
				return retBuf;

			const encodedView = new Uint8Array(encodedBuf);
			retView = new Uint8Array(retBuf);

			retView[0] = encodedBuf.byteLength | 0x80;

			for(let i = 0; i < encodedBuf.byteLength; i++)
				retView[i + 1] = encodedView[i];

			return retBuf;
		}

		retBuf = new ArrayBuffer(1);

		if(sizeOnly === false)
		{
			retView = new Uint8Array(retBuf);

			retView[0] = this.length;
		}

		return retBuf;
	}
	//**********************************************************************************
	/**
	 * Convertion for the block to JSON object
	 * @returns {{blockName, blockLength, error, warnings, valueBeforeDecode}|{blockName: string, blockLength: number, error: string, warnings: Array.<string>, valueBeforeDecode: string}}
	 */
	toJSON()
	{
		let object = {};
		
		//region Seems at the moment (Sep 2016) there is no way how to check method is supported in "super" object
		try
		{
			object = super.toJSON();
		}
		catch(ex){}
		//endregion

		object.blockName = this.constructor.blockName();
		object.isIndefiniteForm = this.isIndefiniteForm;
		object.longFormUsed = this.longFormUsed;
		object.length = this.length;

		return object;
	}
	//**********************************************************************************
}
//**************************************************************************************
//endregion
//**************************************************************************************
//region Declaration of value block class
//**************************************************************************************
class ValueBlock extends LocalBaseBlock
{
	//**********************************************************************************
	/**
	 * Constructor for "ValueBlock" class
	 * @param {Object} [parameters={}]
	 */
	constructor(parameters = {})
	{
		super(parameters);
	}
	//**********************************************************************************
	/**
	 * Aux function, need to get a block name. Need to have it here for inhiritence
	 * @returns {string}
	 */
	static blockName()
	{
		return "valueBlock";
	}
	//**********************************************************************************
	//noinspection JSUnusedLocalSymbols,JSUnusedLocalSymbols,JSUnusedLocalSymbols
	/**
	 * Base function for converting block from BER encoded array of bytes
	 * @param {!ArrayBuffer} inputBuffer ASN.1 BER encoded array
	 * @param {!number} inputOffset Offset in ASN.1 BER encoded array where decoding should be started
	 * @param {!number} inputLength Maximum length of array of bytes which can be using in this function
	 * @returns {number}
	 */
	fromBER(inputBuffer, inputOffset, inputLength)
	{
		//region Throw an exception for a function which needs to be specified in extended classes
		throw TypeError("User need to make a specific function in a class which extends \"ValueBlock\"");
		//endregion
	}
	//**********************************************************************************
	//noinspection JSUnusedLocalSymbols
	/**
	 * Encoding of current ASN.1 block into ASN.1 encoded array (BER rules)
	 * @param {boolean} [sizeOnly=false] Flag that we need only a size of encoding, not a real array of bytes
	 * @returns {ArrayBuffer}
	 */
	toBER(sizeOnly = false)
	{
		//region Throw an exception for a function which needs to be specified in extended classes
		throw TypeError("User need to make a specific function in a class which extends \"ValueBlock\"");
		//endregion
	}
	//**********************************************************************************
}
//**************************************************************************************
//endregion
//**************************************************************************************
//region Declaration of basic ASN.1 block class
//**************************************************************************************
class BaseBlock extends LocalBaseBlock
{
	//**********************************************************************************
	/**
	 * Constructor for "BaseBlock" class
	 * @param {Object} [parameters={}]
	 * @property {Object} [primitiveSchema]
	 * @property {string} [name]
	 * @property {boolean} [optional]
	 * @param valueBlockType Type of value block
	 */
	constructor(parameters = {}, valueBlockType = ValueBlock)
	{
		super(parameters);

		if("name" in parameters)
			this.name = parameters.name;
		if("optional" in parameters)
			this.optional = parameters.optional;
		if("primitiveSchema" in parameters)
			this.primitiveSchema = parameters.primitiveSchema;

		this.idBlock = new LocalIdentificationBlock(parameters);
		this.lenBlock = new LocalLengthBlock(parameters);
		this.valueBlock = new valueBlockType(parameters);
	}
	//**********************************************************************************
	/**
	 * Aux function, need to get a block name. Need to have it here for inhiritence
	 * @returns {string}
	 */
	static blockName()
	{
		return "BaseBlock";
	}
	//**********************************************************************************
	/**
	 * Base function for converting block from BER encoded array of bytes
	 * @param {!ArrayBuffer} inputBuffer ASN.1 BER encoded array
	 * @param {!number} inputOffset Offset in ASN.1 BER encoded array where decoding should be started
	 * @param {!number} inputLength Maximum length of array of bytes which can be using in this function
	 * @returns {number}
	 */
	fromBER(inputBuffer, inputOffset, inputLength)
	{
		const resultOffset = this.valueBlock.fromBER(inputBuffer, inputOffset, (this.lenBlock.isIndefiniteForm === true) ? inputLength : this.lenBlock.length);
		if(resultOffset === (-1))
		{
			this.error = this.valueBlock.error;
			return resultOffset;
		}

		if(this.idBlock.error.length === 0)
			this.blockLength += this.idBlock.blockLength;

		if(this.lenBlock.error.length === 0)
			this.blockLength += this.lenBlock.blockLength;

		if(this.valueBlock.error.length === 0)
			this.blockLength += this.valueBlock.blockLength;

		return resultOffset;
	}
	//**********************************************************************************
	/**
	 * Encoding of current ASN.1 block into ASN.1 encoded array (BER rules)
	 * @param {boolean} [sizeOnly=false] Flag that we need only a size of encoding, not a real array of bytes
	 * @returns {ArrayBuffer}
	 */
	toBER(sizeOnly = false)
	{
		let retBuf;

		const idBlockBuf = this.idBlock.toBER(sizeOnly);
		const valueBlockSizeBuf = this.valueBlock.toBER(true);

		this.lenBlock.length = valueBlockSizeBuf.byteLength;
		const lenBlockBuf = this.lenBlock.toBER(sizeOnly);

		retBuf = utilConcatBuf(idBlockBuf, lenBlockBuf);

		let valueBlockBuf;

		if(sizeOnly === false)
			valueBlockBuf = this.valueBlock.toBER(sizeOnly);
		else
			valueBlockBuf = new ArrayBuffer(this.lenBlock.length);

		retBuf = utilConcatBuf(retBuf, valueBlockBuf);

		if(this.lenBlock.isIndefiniteForm === true)
		{
			const indefBuf = new ArrayBuffer(2);

			if(sizeOnly === false)
			{
				const indefView = new Uint8Array(indefBuf);

				indefView[0] = 0x00;
				indefView[1] = 0x00;
			}

			retBuf = utilConcatBuf(retBuf, indefBuf);
		}

		return retBuf;
	}
	//**********************************************************************************
	/**
	 * Convertion for the block to JSON object
	 * @returns {{blockName, blockLength, error, warnings, valueBeforeDecode}|{blockName: string, blockLength: number, error: string, warnings: Array.<string>, valueBeforeDecode: string}}
	 */
	toJSON()
	{
		let object = {};
		
		//region Seems at the moment (Sep 2016) there is no way how to check method is supported in "super" object
		try
		{
			object = super.toJSON();
		}
		catch(ex){}
		//endregion

		object.idBlock = this.idBlock.toJSON();
		object.lenBlock = this.lenBlock.toJSON();
		object.valueBlock = this.valueBlock.toJSON();

		if("name" in this)
			object.name = this.name;
		if("optional" in this)
			object.optional = this.optional;
		if("primitiveSchema" in this)
			object.primitiveSchema = this.primitiveSchema.toJSON();

		return object;
	}
	//**********************************************************************************
}
//**************************************************************************************
//endregion
//**************************************************************************************
//region Declaration of basic block for all PRIMITIVE types
//**************************************************************************************
class LocalPrimitiveValueBlock extends ValueBlock
{
	//**********************************************************************************
	/**
	 * Constructor for "LocalPrimitiveValueBlock" class
	 * @param {Object} [parameters={}]
	 * @property {ArrayBuffer} [valueBeforeDecode]
	 */
	constructor(parameters = {})
	{
		super(parameters);

		//region Variables from "hexBlock" class
		if("valueHex" in parameters)
			this.valueHex = parameters.valueHex.slice(0);
		else
			this.valueHex = new ArrayBuffer(0);

		this.isHexOnly = getParametersValue(parameters, "isHexOnly", true);
		//endregion
	}
	//**********************************************************************************
	/**
	 * Base function for converting block from BER encoded array of bytes
	 * @param {!ArrayBuffer} inputBuffer ASN.1 BER encoded array
	 * @param {!number} inputOffset Offset in ASN.1 BER encoded array where decoding should be started
	 * @param {!number} inputLength Maximum length of array of bytes which can be using in this function
	 * @returns {number}
	 */
	fromBER(inputBuffer, inputOffset, inputLength)
	{
		//region Basic check for parameters
		//noinspection JSCheckFunctionSignatures
		if(checkBufferParams(this, inputBuffer, inputOffset, inputLength) === false)
			return (-1);
		//endregion

		//region Getting Uint8Array from ArrayBuffer
		const intBuffer = new Uint8Array(inputBuffer, inputOffset, inputLength);
		//endregion

		//region Initial checks
		if(intBuffer.length === 0)
		{
			this.warnings.push("Zero buffer length");
			return inputOffset;
		}
		//endregion

		//region Copy input buffer into internal buffer
		this.valueHex = new ArrayBuffer(intBuffer.length);
		const valueHexView = new Uint8Array(this.valueHex);

		for(let i = 0; i < intBuffer.length; i++)
			valueHexView[i] = intBuffer[i];
		//endregion

		this.blockLength = inputLength;

		return (inputOffset + inputLength);
	}
	//**********************************************************************************
	//noinspection JSUnusedLocalSymbols
	/**
	 * Encoding of current ASN.1 block into ASN.1 encoded array (BER rules)
	 * @param {boolean} [sizeOnly=false] Flag that we need only a size of encoding, not a real array of bytes
	 * @returns {ArrayBuffer}
	 */
	toBER(sizeOnly = false)
	{
		return this.valueHex.slice(0);
	}
	//**********************************************************************************
	/**
	 * Aux function, need to get a block name. Need to have it here for inhiritence
	 * @returns {string}
	 */
	static blockName()
	{
		return "PrimitiveValueBlock";
	}
	//**********************************************************************************
	/**
	 * Convertion for the block to JSON object
	 * @returns {{blockName, blockLength, error, warnings, valueBeforeDecode}|{blockName: string, blockLength: number, error: string, warnings: Array.<string>, valueBeforeDecode: string}}
	 */
	toJSON()
	{
		let object = {};
		
		//region Seems at the moment (Sep 2016) there is no way how to check method is supported in "super" object
		try
		{
			object = super.toJSON();
		}
		catch(ex){}
		//endregion

		object.valueHex = bufferToHexCodes(this.valueHex, 0, this.valueHex.byteLength);
		object.isHexOnly = this.isHexOnly;

		return object;
	}
	//**********************************************************************************
}
//**************************************************************************************
class Primitive extends BaseBlock
{
	//**********************************************************************************
	/**
	 * Constructor for "Primitive" class
	 * @param {Object} [parameters={}]
	 * @property {ArrayBuffer} [valueHex]
	 */
	constructor(parameters = {})
	{
		super(parameters, LocalPrimitiveValueBlock);

		this.idBlock.isConstructed = false;
	}
	//**********************************************************************************
	/**
	 * Aux function, need to get a block name. Need to have it here for inhiritence
	 * @returns {string}
	 */
	static blockName()
	{
		return "PRIMITIVE";
	}
	//**********************************************************************************
}
//**************************************************************************************
//endregion
//**************************************************************************************
//region Declaration of basic block for all CONSTRUCTED types
//**************************************************************************************
class LocalConstructedValueBlock extends ValueBlock
{
	//**********************************************************************************
	/**
	 * Constructor for "LocalConstructedValueBlock" class
	 * @param {Object} [parameters={}]
	 */
	constructor(parameters = {})
	{
		super(parameters);

		this.value = getParametersValue(parameters, "value", []);
		this.isIndefiniteForm = getParametersValue(parameters, "isIndefiniteForm", false);
	}
	//**********************************************************************************
	/**
	 * Base function for converting block from BER encoded array of bytes
	 * @param {!ArrayBuffer} inputBuffer ASN.1 BER encoded array
	 * @param {!number} inputOffset Offset in ASN.1 BER encoded array where decoding should be started
	 * @param {!number} inputLength Maximum length of array of bytes which can be using in this function
	 * @returns {number}
	 */
	fromBER(inputBuffer, inputOffset, inputLength)
	{
		//region Store initial offset and length
		const initialOffset = inputOffset;
		const initialLength = inputLength;
		//endregion

		//region Basic check for parameters
		//noinspection JSCheckFunctionSignatures
		if(checkBufferParams(this, inputBuffer, inputOffset, inputLength) === false)
			return (-1);
		//endregion

		//region Getting Uint8Array from ArrayBuffer
		const intBuffer = new Uint8Array(inputBuffer, inputOffset, inputLength);
		//endregion

		//region Initial checks
		if(intBuffer.length === 0)
		{
			this.warnings.push("Zero buffer length");
			return inputOffset;
		}
		//endregion

		//region Aux function
		function checkLen(indefiniteLength, length)
		{
			if(indefiniteLength === true)
				return 1;

			return length;
		}
		//endregion

		let currentOffset = inputOffset;

		while(checkLen(this.isIndefiniteForm, inputLength) > 0)
		{
			const returnObject = LocalFromBER(inputBuffer, currentOffset, inputLength);
			if(returnObject.offset === (-1))
			{
				this.error = returnObject.result.error;
				this.warnings.concat(returnObject.result.warnings);
				return (-1);
			}

			currentOffset = returnObject.offset;

			this.blockLength += returnObject.result.blockLength;
			inputLength -= returnObject.result.blockLength;

			this.value.push(returnObject.result);

			if((this.isIndefiniteForm === true) && (returnObject.result.constructor.blockName() === EndOfContent.blockName()))
				break;
		}

		if(this.isIndefiniteForm === true)
		{
			if(this.value[this.value.length - 1].constructor.blockName() === EndOfContent.blockName())
				this.value.pop();
			else
				this.warnings.push("No EndOfContent block encoded");
		}

		//region Copy "inputBuffer" to "valueBeforeDecode"
		this.valueBeforeDecode = inputBuffer.slice(initialOffset, initialOffset + initialLength);
		//endregion

		return currentOffset;
	}
	//**********************************************************************************
	/**
	 * Encoding of current ASN.1 block into ASN.1 encoded array (BER rules)
	 * @param {boolean} [sizeOnly=false] Flag that we need only a size of encoding, not a real array of bytes
	 * @returns {ArrayBuffer}
	 */
	toBER(sizeOnly = false)
	{
		let retBuf = new ArrayBuffer(0);

		for(let i = 0; i < this.value.length; i++)
		{
			const valueBuf = this.value[i].toBER(sizeOnly);
			retBuf = utilConcatBuf(retBuf, valueBuf);
		}

		return retBuf;
	}
	//**********************************************************************************
	/**
	 * Aux function, need to get a block name. Need to have it here for inhiritence
	 * @returns {string}
	 */
	static blockName()
	{
		return "ConstructedValueBlock";
	}
	//**********************************************************************************
	/**
	 * Convertion for the block to JSON object
	 * @returns {{blockName, blockLength, error, warnings, valueBeforeDecode}|{blockName: string, blockLength: number, error: string, warnings: Array.<string>, valueBeforeDecode: string}}
	 */
	toJSON()
	{
		let object = {};
		
		//region Seems at the moment (Sep 2016) there is no way how to check method is supported in "super" object
		try
		{
			object = super.toJSON();
		}
		catch(ex){}
		//endregion

		object.isIndefiniteForm = this.isIndefiniteForm;
		object.value = [];
		for(let i = 0; i < this.value.length; i++)
			object.value.push(this.value[i].toJSON());

		return object;
	}
	//**********************************************************************************
}
//**************************************************************************************
class Constructed extends BaseBlock
{
	//**********************************************************************************
	/**
	 * Constructor for "Constructed" class
	 * @param {Object} [parameters={}]
	 */
	constructor(parameters = {})
	{
		super(parameters, LocalConstructedValueBlock);

		this.idBlock.isConstructed = true;
	}
	//**********************************************************************************
	/**
	 * Aux function, need to get a block name. Need to have it here for inhiritence
	 * @returns {string}
	 */
	static blockName()
	{
		return "CONSTRUCTED";
	}
	//**********************************************************************************
	/**
	 * Base function for converting block from BER encoded array of bytes
	 * @param {!ArrayBuffer} inputBuffer ASN.1 BER encoded array
	 * @param {!number} inputOffset Offset in ASN.1 BER encoded array where decoding should be started
	 * @param {!number} inputLength Maximum length of array of bytes which can be using in this function
	 * @returns {number}
	 */
	fromBER(inputBuffer, inputOffset, inputLength)
	{
		this.valueBlock.isIndefiniteForm = this.lenBlock.isIndefiniteForm;

		const resultOffset = this.valueBlock.fromBER(inputBuffer, inputOffset, (this.lenBlock.isIndefiniteForm === true) ? inputLength : this.lenBlock.length);
		if(resultOffset === (-1))
		{
			this.error = this.valueBlock.error;
			return resultOffset;
		}

		if(this.idBlock.error.length === 0)
			this.blockLength += this.idBlock.blockLength;

		if(this.lenBlock.error.length === 0)
			this.blockLength += this.lenBlock.blockLength;

		if(this.valueBlock.error.length === 0)
			this.blockLength += this.valueBlock.blockLength;

		return resultOffset;
	}
	//**********************************************************************************
}
//**************************************************************************************
//endregion
//**************************************************************************************
//region Declaration of ASN.1 EndOfContent type class
//**************************************************************************************
class LocalEndOfContentValueBlock extends ValueBlock
{
	//**********************************************************************************
	/**
	 * Constructor for "LocalEndOfContentValueBlock" class
	 * @param {Object} [parameters={}]
	 */
	constructor(parameters = {})
	{
		super(parameters);
	}
	//**********************************************************************************
	//noinspection JSUnusedLocalSymbols,JSUnusedLocalSymbols
	/**
	 * Base function for converting block from BER encoded array of bytes
	 * @param {!ArrayBuffer} inputBuffer ASN.1 BER encoded array
	 * @param {!number} inputOffset Offset in ASN.1 BER encoded array where decoding should be started
	 * @param {!number} inputLength Maximum length of array of bytes which can be using in this function
	 * @returns {number}
	 */
	fromBER(inputBuffer, inputOffset, inputLength)
	{
		//region There is no "value block" for EndOfContent type and we need to return the same offset
		return inputOffset;
		//endregion
	}
	//**********************************************************************************
	//noinspection JSUnusedLocalSymbols
	/**
	 * Encoding of current ASN.1 block into ASN.1 encoded array (BER rules)
	 * @param {boolean} [sizeOnly=false] Flag that we need only a size of encoding, not a real array of bytes
	 * @returns {ArrayBuffer}
	 */
	toBER(sizeOnly = false)
	{
		return new ArrayBuffer(0);
	}
	//**********************************************************************************
	/**
	 * Aux function, need to get a block name. Need to have it here for inhiritence
	 * @returns {string}
	 */
	static blockName()
	{
		return "EndOfContentValueBlock";
	}
	//**********************************************************************************
}
//**************************************************************************************
class EndOfContent extends BaseBlock
{
	//**********************************************************************************
	constructor(paramaters = {})
	{
		super(paramaters, LocalEndOfContentValueBlock);

		this.idBlock.tagClass = 1; // UNIVERSAL
		this.idBlock.tagNumber = 0; // EndOfContent
	}
	//**********************************************************************************
	/**
	 * Aux function, need to get a block name. Need to have it here for inhiritence
	 * @returns {string}
	 */
	static blockName()
	{
		return "EndOfContent";
	}
	//**********************************************************************************
}
//**************************************************************************************
//endregion
//**************************************************************************************
//region Declaration of ASN.1 Boolean type class
//**************************************************************************************
class LocalBooleanValueBlock extends ValueBlock
{
	//**********************************************************************************
	/**
	 * Constructor for "LocalBooleanValueBlock" class
	 * @param {Object} [parameters={}]
	 */
	constructor(parameters = {})
	{
		super(parameters);
		
		this.value = getParametersValue(parameters, "value", false);
		this.isHexOnly = getParametersValue(parameters, "isHexOnly", false);
		
		if("valueHex" in parameters)
			this.valueHex = parameters.valueHex.slice(0);
		else
		{
			this.valueHex = new ArrayBuffer(1);
			if(this.value === true)
			{
				const view = new Uint8Array(this.valueHex);
				view[0] = 0xFF;
			}
		}
	}
	//**********************************************************************************
	/**
	 * Base function for converting block from BER encoded array of bytes
	 * @param {!ArrayBuffer} inputBuffer ASN.1 BER encoded array
	 * @param {!number} inputOffset Offset in ASN.1 BER encoded array where decoding should be started
	 * @param {!number} inputLength Maximum length of array of bytes which can be using in this function
	 * @returns {number} Offset after least decoded byte
	 */
	fromBER(inputBuffer, inputOffset, inputLength)
	{
		//region Basic check for parameters
		//noinspection JSCheckFunctionSignatures
		if(checkBufferParams(this, inputBuffer, inputOffset, inputLength) === false)
			return (-1);
		//endregion

		//region Getting Uint8Array from ArrayBuffer
		const intBuffer = new Uint8Array(inputBuffer, inputOffset, inputLength);
		//endregion

		if(inputLength > 1)
			this.warnings.push("Boolean value encoded in more then 1 octet");

		this.isHexOnly = true;

		//region Copy input buffer to internal array
		this.valueHex = new ArrayBuffer(intBuffer.length);
		const view = new Uint8Array(this.valueHex);

		for(let i = 0; i < intBuffer.length; i++)
			view[i] = intBuffer[i];
		//endregion
		
		if(utilDecodeTC.call(this) !== 0 )
			this.value = true;
		else
			this.value = false;

		this.blockLength = inputLength;

		return (inputOffset + inputLength);
	}
	//**********************************************************************************
	//noinspection JSUnusedLocalSymbols
	/**
	 * Encoding of current ASN.1 block into ASN.1 encoded array (BER rules)
	 * @param {boolean} [sizeOnly=false] Flag that we need only a size of encoding, not a real array of bytes
	 * @returns {ArrayBuffer}
	 */
	toBER(sizeOnly = false)
	{
		return this.valueHex;
	}
	//**********************************************************************************
	/**
	 * Aux function, need to get a block name. Need to have it here for inhiritence
	 * @returns {string}
	 */
	static blockName()
	{
		return "BooleanValueBlock";
	}
	//**********************************************************************************
	/**
	 * Convertion for the block to JSON object
	 * @returns {{blockName, blockLength, error, warnings, valueBeforeDecode}|{blockName: string, blockLength: number, error: string, warnings: Array.<string>, valueBeforeDecode: string}}
	 */
	toJSON()
	{
		let object = {};
		
		//region Seems at the moment (Sep 2016) there is no way how to check method is supported in "super" object
		try
		{
			object = super.toJSON();
		}
		catch(ex){}
		//endregion

		object.value = this.value;
		object.isHexOnly = this.isHexOnly;
		object.valueHex = bufferToHexCodes(this.valueHex, 0, this.valueHex.byteLength);

		return object;
	}
	//**********************************************************************************
}
//**************************************************************************************
class Boolean extends BaseBlock
{
	//**********************************************************************************
	/**
	 * Constructor for "Boolean" class
	 * @param {Object} [parameters={}]
	 */
	constructor(parameters = {})
	{
		super(parameters, LocalBooleanValueBlock);

		this.idBlock.tagClass = 1; // UNIVERSAL
		this.idBlock.tagNumber = 1; // Boolean
	}
	//**********************************************************************************
	/**
	 * Aux function, need to get a block name. Need to have it here for inhiritence
	 * @returns {string}
	 */
	static blockName()
	{
		return "Boolean";
	}
	//**********************************************************************************
}
//**************************************************************************************
//endregion
//**************************************************************************************
//region Declaration of ASN.1 Sequence and Set type classes
//**************************************************************************************
class Sequence extends Constructed
{
	//**********************************************************************************
	/**
	 * Constructor for "Sequence" class
	 * @param {Object} [parameters={}]
	 */
	constructor(parameters = {})
	{
		super(parameters);

		this.idBlock.tagClass = 1; // UNIVERSAL
		this.idBlock.tagNumber = 16; // Sequence
	}
	//**********************************************************************************
	/**
	 * Aux function, need to get a block name. Need to have it here for inhiritence
	 * @returns {string}
	 */
	static blockName()
	{
		return "Sequence";
	}
	//**********************************************************************************
}
//**************************************************************************************
class Set extends Constructed
{
	//**********************************************************************************
	/**
	 * Constructor for "Set" class
	 * @param {Object} [parameters={}]
	 */
	constructor(parameters = {})
	{
		super(parameters);

		this.idBlock.tagClass = 1; // UNIVERSAL
		this.idBlock.tagNumber = 17; // Set
	}
	//**********************************************************************************
	/**
	 * Aux function, need to get a block name. Need to have it here for inhiritence
	 * @returns {string}
	 */
	static blockName()
	{
		return "Set";
	}
	//**********************************************************************************
}
//**************************************************************************************
//endregion
//**************************************************************************************
//region Declaration of ASN.1 Null type class
//**************************************************************************************
class Null extends BaseBlock
{
	//**********************************************************************************
	/**
	 * Constructor for "Null" class
	 * @param {Object} [parameters={}]
	 */
	constructor(parameters = {})
	{
		super(parameters, LocalBaseBlock); // We will not have a call to "Null value block" because of specified "fromBER" and "toBER" functions

		this.idBlock.tagClass = 1; // UNIVERSAL
		this.idBlock.tagNumber = 5; // Null
	}
	//**********************************************************************************
	/**
	 * Aux function, need to get a block name. Need to have it here for inhiritence
	 * @returns {string}
	 */
	static blockName()
	{
		return "Null";
	}
	//**********************************************************************************
	//noinspection JSUnusedLocalSymbols
	/**
	 * Base function for converting block from BER encoded array of bytes
	 * @param {!ArrayBuffer} inputBuffer ASN.1 BER encoded array
	 * @param {!number} inputOffset Offset in ASN.1 BER encoded array where decoding should be started
	 * @param {!number} inputLength Maximum length of array of bytes which can be using in this function
	 * @returns {number} Offset after least decoded byte
	 */
	fromBER(inputBuffer, inputOffset, inputLength)
	{
		if(this.lenBlock.length > 0)
			this.warnings.push("Non-zero length of value block for Null type");

		if(this.idBlock.error.length === 0)
			this.blockLength += this.idBlock.blockLength;

		if(this.lenBlock.error.length === 0)
			this.blockLength += this.lenBlock.blockLength;
		
		this.blockLength += inputLength;
		
		if((inputOffset + inputLength) > inputBuffer.byteLength)
		{
			this.error = "End of input reached before message was fully decoded (inconsistent offset and length values)";
			return (-1);
		}
		
		return (inputOffset + inputLength);
	}
	//**********************************************************************************
	/**
	 * Encoding of current ASN.1 block into ASN.1 encoded array (BER rules)
	 * @param {boolean} [sizeOnly=false] Flag that we need only a size of encoding, not a real array of bytes
	 * @returns {ArrayBuffer}
	 */
	toBER(sizeOnly = false)
	{
		const retBuf = new ArrayBuffer(2);

		if(sizeOnly === true)
			return retBuf;

		const retView = new Uint8Array(retBuf);
		retView[0] = 0x05;
		retView[1] = 0x00;

		return retBuf;
	}
	//**********************************************************************************
}
//**************************************************************************************
//endregion
//**************************************************************************************
//region Declaration of ASN.1 OctetString type class
//**************************************************************************************
class LocalOctetStringValueBlock extends HexBlock(LocalConstructedValueBlock)
{
	//**********************************************************************************
	/**
	 * Constructor for "LocalOctetStringValueBlock" class
	 * @param {Object} [parameters={}]
	 * @property {ArrayBuffer} [valueHex]
	 */
	constructor(parameters = {})
	{
		super(parameters);

		this.isConstructed = getParametersValue(parameters, "isConstructed", false);
	}
	//**********************************************************************************
	/**
	 * Base function for converting block from BER encoded array of bytes
	 * @param {!ArrayBuffer} inputBuffer ASN.1 BER encoded array
	 * @param {!number} inputOffset Offset in ASN.1 BER encoded array where decoding should be started
	 * @param {!number} inputLength Maximum length of array of bytes which can be using in this function
	 * @returns {number} Offset after least decoded byte
	 */
	fromBER(inputBuffer, inputOffset, inputLength)
	{
		let resultOffset = 0;

		if(this.isConstructed === true)
		{
			this.isHexOnly = false;

			resultOffset = LocalConstructedValueBlock.prototype.fromBER.call(this, inputBuffer, inputOffset, inputLength);
			if(resultOffset === (-1))
				return resultOffset;

			for(let i = 0; i < this.value.length; i++)
			{
				const currentBlockName = this.value[i].constructor.blockName();

				if(currentBlockName === EndOfContent.blockName())
				{
					if(this.isIndefiniteForm === true)
						break;
					else
					{
						this.error = "EndOfContent is unexpected, OCTET STRING may consists of OCTET STRINGs only";
						return (-1);
					}
				}

				if(currentBlockName !== OctetString.blockName())
				{
					this.error = "OCTET STRING may consists of OCTET STRINGs only";
					return (-1);
				}
			}
		}
		else
		{
			this.isHexOnly = true;

			resultOffset = super.fromBER(inputBuffer, inputOffset, inputLength);
			this.blockLength = inputLength;
		}

		return resultOffset;
	}
	//**********************************************************************************
	/**
	 * Encoding of current ASN.1 block into ASN.1 encoded array (BER rules)
	 * @param {boolean} [sizeOnly=false] Flag that we need only a size of encoding, not a real array of bytes
	 * @returns {ArrayBuffer}
	 */
	toBER(sizeOnly = false)
	{
		if(this.isConstructed === true)
			return LocalConstructedValueBlock.prototype.toBER.call(this, sizeOnly);

		let retBuf = new ArrayBuffer(this.valueHex.byteLength);

		if(sizeOnly === true)
			return retBuf;

		if(this.valueHex.byteLength === 0)
			return retBuf;

		retBuf = this.valueHex.slice(0);

		return retBuf;
	}
	//**********************************************************************************
	/**
	 * Aux function, need to get a block name. Need to have it here for inhiritence
	 * @returns {string}
	 */
	static blockName()
	{
		return "OctetStringValueBlock";
	}
	//**********************************************************************************
	toJSON()
	{
		let object = {};
		
		//region Seems at the moment (Sep 2016) there is no way how to check method is supported in "super" object
		try
		{
			object = super.toJSON();
		}
		catch(ex){}
		//endregion

		object.isConstructed = this.isConstructed;
		object.isHexOnly = this.isHexOnly;
		object.valueHex = bufferToHexCodes(this.valueHex, 0, this.valueHex.byteLength);

		return object;
	}
	//**********************************************************************************
}
//**************************************************************************************
class OctetString extends BaseBlock
{
	//**********************************************************************************
	/**
	 * Constructor for "OctetString" class
	 * @param {Object} [parameters={}]
	 */
	constructor(parameters = {})
	{
		super(parameters, LocalOctetStringValueBlock);

		this.idBlock.tagClass = 1; // UNIVERSAL
		this.idBlock.tagNumber = 4; // OctetString
	}
	//**********************************************************************************
	/**
	 * Base function for converting block from BER encoded array of bytes
	 * @param {!ArrayBuffer} inputBuffer ASN.1 BER encoded array
	 * @param {!number} inputOffset Offset in ASN.1 BER encoded array where decoding should be started
	 * @param {!number} inputLength Maximum length of array of bytes which can be using in this function
	 * @returns {number} Offset after least decoded byte
	 */
	fromBER(inputBuffer, inputOffset, inputLength)
	{
		this.valueBlock.isConstructed = this.idBlock.isConstructed;
		this.valueBlock.isIndefiniteForm = this.lenBlock.isIndefiniteForm;

		//region Ability to encode empty OCTET STRING
		if(inputLength === 0)
		{
			if(this.idBlock.error.length === 0)
				this.blockLength += this.idBlock.blockLength;

			if(this.lenBlock.error.length === 0)
				this.blockLength += this.lenBlock.blockLength;

			return inputOffset;
		}
		//endregion

		return super.fromBER(inputBuffer, inputOffset, inputLength);
	}
	//**********************************************************************************
	/**
	 * Aux function, need to get a block name. Need to have it here for inhiritence
	 * @returns {string}
	 */
	static blockName()
	{
		return "OctetString";
	}
	//**********************************************************************************
	//noinspection JSUnusedGlobalSymbols
	/**
	 * Checking that two OCTETSTRINGs are equal
	 * @param {OctetString} octetString
	 */
	isEqual(octetString)
	{
		//region Check input type
		if((octetString instanceof OctetString) === false)
			return false;
		//endregion

		//region Compare two JSON strings
		if(JSON.stringify(this) !== JSON.stringify(octetString))
			return false;
		//endregion

		return true;
	}
	//**********************************************************************************
}
//**************************************************************************************
//endregion
//**************************************************************************************
//region Declaration of ASN.1 BitString type class
//**************************************************************************************
class LocalBitStringValueBlock extends HexBlock(LocalConstructedValueBlock)
{
	//**********************************************************************************
	/**
	 * Constructor for "LocalBitStringValueBlock" class
	 * @param {Object} [parameters={}]
	 * @property {ArrayBuffer} [valueHex]
	 */
	constructor(parameters = {})
	{
		super(parameters);

		this.unusedBits = getParametersValue(parameters, "unusedBits", 0);
		this.isConstructed = getParametersValue(parameters, "isConstructed", false);
		this.blockLength = this.valueHex.byteLength;
	}
	//**********************************************************************************
	/**
	 * Base function for converting block from BER encoded array of bytes
	 * @param {!ArrayBuffer} inputBuffer ASN.1 BER encoded array
	 * @param {!number} inputOffset Offset in ASN.1 BER encoded array where decoding should be started
	 * @param {!number} inputLength Maximum length of array of bytes which can be using in this function
	 * @returns {number} Offset after least decoded byte
	 */
	fromBER(inputBuffer, inputOffset, inputLength)
	{
		//region Ability to decode zero-length BitString value
		if(inputLength === 0)
			return inputOffset;
		//endregion

		let resultOffset = (-1);

		//region If the BISTRING supposed to be a constructed value
		if(this.isConstructed === true)
		{
			resultOffset = LocalConstructedValueBlock.prototype.fromBER.call(this, inputBuffer, inputOffset, inputLength);
			if(resultOffset === (-1))
				return resultOffset;

			for(let i = 0; i < this.value.length; i++)
			{
				const currentBlockName = this.value[i].constructor.blockName();

				if(currentBlockName === EndOfContent.blockName())
				{
					if(this.isIndefiniteForm === true)
						break;
					else
					{
						this.error = "EndOfContent is unexpected, BIT STRING may consists of BIT STRINGs only";
						return (-1);
					}
				}

				if(currentBlockName !== BitString.blockName())
				{
					this.error = "BIT STRING may consists of BIT STRINGs only";
					return (-1);
				}

				if((this.unusedBits > 0) && (this.value[i].valueBlock.unusedBits > 0))
				{
					this.error = "Usign of \"unused bits\" inside constructive BIT STRING allowed for least one only";
					return (-1);
				}

				this.unusedBits = this.value[i].valueBlock.unusedBits;
				if(this.unusedBits > 7)
				{
					this.error = "Unused bits for BitString must be in range 0-7";
					return (-1);
				}
			}

			return resultOffset;
		}
		//endregion
		//region If the BitString supposed to be a primitive value
		//region Basic check for parameters
		//noinspection JSCheckFunctionSignatures
		if(checkBufferParams(this, inputBuffer, inputOffset, inputLength) === false)
			return (-1);
		//endregion

		const intBuffer = new Uint8Array(inputBuffer, inputOffset, inputLength);

		this.unusedBits = intBuffer[0];
		
		if(this.unusedBits > 7)
		{
			this.error = "Unused bits for BitString must be in range 0-7";
			return (-1);
		}

		//region Copy input buffer to internal buffer
		this.valueHex = new ArrayBuffer(intBuffer.length - 1);
		const view = new Uint8Array(this.valueHex);
		for(let i = 0; i < (inputLength - 1); i++)
			view[i] = intBuffer[i + 1];
		//endregion

		this.blockLength = intBuffer.length;

		return (inputOffset + inputLength);
		//endregion
	}
	//**********************************************************************************
	/**
	 * Encoding of current ASN.1 block into ASN.1 encoded array (BER rules)
	 * @param {boolean} [sizeOnly=false] Flag that we need only a size of encoding, not a real array of bytes
	 * @returns {ArrayBuffer}
	 */
	toBER(sizeOnly = false)
	{
		if(this.isConstructed === true)
			return LocalConstructedValueBlock.prototype.toBER.call(this, sizeOnly);

		if(sizeOnly === true)
			return (new ArrayBuffer(this.valueHex.byteLength + 1));

		if(this.valueHex.byteLength === 0)
			return (new ArrayBuffer(0));

		const curView = new Uint8Array(this.valueHex);

		const retBuf = new ArrayBuffer(this.valueHex.byteLength + 1);
		const retView = new Uint8Array(retBuf);

		retView[0] = this.unusedBits;

		for(let i = 0; i < this.valueHex.byteLength; i++)
			retView[i + 1] = curView[i];

		return retBuf;
	}
	//**********************************************************************************
	/**
	 * Aux function, need to get a block name. Need to have it here for inhiritence
	 * @returns {string}
	 */
	static blockName()
	{
		return "BitStringValueBlock";
	}
	//**********************************************************************************
	/**
	 * Convertion for the block to JSON object
	 * @returns {{blockName, blockLength, error, warnings, valueBeforeDecode}|{blockName: string, blockLength: number, error: string, warnings: Array.<string>, valueBeforeDecode: string}}
	 */
	toJSON()
	{
		let object = {};
		
		//region Seems at the moment (Sep 2016) there is no way how to check method is supported in "super" object
		try
		{
			object = super.toJSON();
		}
		catch(ex){}
		//endregion

		object.unusedBits = this.unusedBits;
		object.isConstructed = this.isConstructed;
		object.isHexOnly = this.isHexOnly;
		object.valueHex = bufferToHexCodes(this.valueHex, 0, this.valueHex.byteLength);

		return object;
	}
	//**********************************************************************************
}
//**************************************************************************************
class BitString extends BaseBlock
{
	//**********************************************************************************
	/**
	 * Constructor for "BitString" class
	 * @param {Object} [parameters={}]
	 */
	constructor(parameters = {})
	{
		super(parameters, LocalBitStringValueBlock);

		this.idBlock.tagClass = 1; // UNIVERSAL
		this.idBlock.tagNumber = 3; // BitString
	}
	//**********************************************************************************
	/**
	 * Aux function, need to get a block name. Need to have it here for inhiritence
	 * @returns {string}
	 */
	static blockName()
	{
		return "BitString";
	}
	//**********************************************************************************
	/**
	 * Base function for converting block from BER encoded array of bytes
	 * @param {!ArrayBuffer} inputBuffer ASN.1 BER encoded array
	 * @param {!number} inputOffset Offset in ASN.1 BER encoded array where decoding should be started
	 * @param {!number} inputLength Maximum length of array of bytes which can be using in this function
	 * @returns {number} Offset after least decoded byte
	 */
	fromBER(inputBuffer, inputOffset, inputLength)
	{
		//region Ability to encode empty BitString
		if(inputLength === 0)
			return inputOffset;
		//endregion

		this.valueBlock.isConstructed = this.idBlock.isConstructed;
		this.valueBlock.isIndefiniteForm = this.lenBlock.isIndefiniteForm;

		return super.fromBER(inputBuffer, inputOffset, inputLength);
	}
	//**********************************************************************************
	/**
	 * Checking that two BITSTRINGs are equal
	 * @param {BitString} bitString
	 */
	isEqual(bitString)
	{
		//region Check input type
		if((bitString instanceof BitString) === false)
			return false;
		//endregion

		//region Compare two JSON strings
		if(JSON.stringify(this) !== JSON.stringify(bitString))
			return false;
		//endregion

		return true;
	}
	//**********************************************************************************
}
//**************************************************************************************
//endregion
//**************************************************************************************
//region Declaration of ASN.1 Integer type class
//**************************************************************************************
/**
 * @extends ValueBlock
 */
class LocalIntegerValueBlock extends HexBlock(ValueBlock)
{
	//**********************************************************************************
	/**
	 * Constructor for "LocalIntegerValueBlock" class
	 * @param {Object} [parameters={}]
	 * @property {ArrayBuffer} [valueHex]
	 */
	constructor(parameters = {})
	{
		super(parameters);

		if("value" in parameters)
			this.valueDec = parameters.value;
	}
	//**********************************************************************************
	/**
	 * Setter for "valueHex"
	 * @param {ArrayBuffer} _value
	 */
	set valueHex(_value)
	{
		this._valueHex = _value.slice(0);

		if(_value.byteLength >= 4)
		{
			this.warnings.push("Too big Integer for decoding, hex only");
			this.isHexOnly = true;
			this._valueDec = 0;
		}
		else
		{
			this.isHexOnly = false;

			if(_value.byteLength > 0)
				this._valueDec = utilDecodeTC.call(this);
		}
	}
	//**********************************************************************************
	/**
	 * Getter for "valueHex"
	 * @returns {ArrayBuffer}
	 */
	get valueHex()
	{
		return this._valueHex;
	}
	//**********************************************************************************
	/**
	 * Getter for "valueDec"
	 * @param {number} _value
	 */
	set valueDec(_value)
	{
		this._valueDec = _value;

		this.isHexOnly = false;
		this._valueHex = utilEncodeTC(_value);
	}
	//**********************************************************************************
	/**
	 * Getter for "valueDec"
	 * @returns {number}
	 */
	get valueDec()
	{
		return this._valueDec;
	}
	//**********************************************************************************
	/**
	 * Base function for converting block from DER encoded array of bytes
	 * @param {!ArrayBuffer} inputBuffer ASN.1 DER encoded array
	 * @param {!number} inputOffset Offset in ASN.1 DER encoded array where decoding should be started
	 * @param {!number} inputLength Maximum length of array of bytes which can be using in this function
	 * @param {number} [expectedLength=0] Expected length of converted "valueHex" buffer
	 * @returns {number} Offset after least decoded byte
	 */
	fromDER(inputBuffer, inputOffset, inputLength, expectedLength = 0)
	{
		const offset = this.fromBER(inputBuffer, inputOffset, inputLength);
		if(offset === (-1))
			return offset;

		const view = new Uint8Array(this._valueHex);

		if((view[0] === 0x00) && ((view[1] & 0x80) !== 0))
		{
			const updatedValueHex = new ArrayBuffer(this._valueHex.byteLength - 1);
			const updatedView = new Uint8Array(updatedValueHex);

			updatedView.set(new Uint8Array(this._valueHex, 1, this._valueHex.byteLength - 1));

			this._valueHex = updatedValueHex.slice(0);
		}
		else
		{
			if(expectedLength !== 0)
			{
				if(this._valueHex.byteLength < expectedLength)
				{
					if((expectedLength - this._valueHex.byteLength) > 1)
						expectedLength = this._valueHex.byteLength + 1;
					
					const updatedValueHex = new ArrayBuffer(expectedLength);
					const updatedView = new Uint8Array(updatedValueHex);

					updatedView.set(view, expectedLength - this._valueHex.byteLength);

					this._valueHex = updatedValueHex.slice(0);
				}
			}
		}

		return offset;
	}
	//**********************************************************************************
	/**
	 * Encoding of current ASN.1 block into ASN.1 encoded array (DER rules)
	 * @param {boolean} [sizeOnly=false] Flag that we need only a size of encoding, not a real array of bytes
	 * @returns {ArrayBuffer}
	 */
	toDER(sizeOnly = false)
	{
		const view = new Uint8Array(this._valueHex);

		switch(true)
		{
			case ((view[0] & 0x80) !== 0):
				{
					const updatedValueHex = new ArrayBuffer(this._valueHex.byteLength + 1);
					const updatedView = new Uint8Array(updatedValueHex);

					updatedView[0] = 0x00;
					updatedView.set(view, 1);

					this._valueHex = updatedValueHex.slice(0);
				}
				break;
			case ((view[0] === 0x00) && ((view[1] & 0x80) === 0)):
				{
					const updatedValueHex = new ArrayBuffer(this._valueHex.byteLength - 1);
					const updatedView = new Uint8Array(updatedValueHex);

					updatedView.set(new Uint8Array(this._valueHex, 1, this._valueHex.byteLength - 1));

					this._valueHex = updatedValueHex.slice(0);
				}
				break;
			default:
		}

		return this.toBER(sizeOnly);
	}
	//**********************************************************************************
	/**
	 * Base function for converting block from BER encoded array of bytes
	 * @param {!ArrayBuffer} inputBuffer ASN.1 BER encoded array
	 * @param {!number} inputOffset Offset in ASN.1 BER encoded array where decoding should be started
	 * @param {!number} inputLength Maximum length of array of bytes which can be using in this function
	 * @returns {number} Offset after least decoded byte
	 */
	fromBER(inputBuffer, inputOffset, inputLength)
	{
		const resultOffset = super.fromBER(inputBuffer, inputOffset, inputLength);
		if(resultOffset === (-1))
			return resultOffset;

		this.blockLength = inputLength;

		return (inputOffset + inputLength);
	}
	//**********************************************************************************
	/**
	 * Encoding of current ASN.1 block into ASN.1 encoded array (BER rules)
	 * @param {boolean} [sizeOnly=false] Flag that we need only a size of encoding, not a real array of bytes
	 * @returns {ArrayBuffer}
	 */
	toBER(sizeOnly = false)
	{
		//noinspection JSCheckFunctionSignatures
		return this.valueHex.slice(0);
	}
	//**********************************************************************************
	/**
	 * Aux function, need to get a block name. Need to have it here for inhiritence
	 * @returns {string}
	 */
	static blockName()
	{
		return "IntegerValueBlock";
	}
	//**********************************************************************************
	//noinspection JSUnusedGlobalSymbols
	/**
	 * Convertion for the block to JSON object
	 * @returns {Object}
	 */
	toJSON()
	{
		let object = {};
		
		//region Seems at the moment (Sep 2016) there is no way how to check method is supported in "super" object
		try
		{
			object = super.toJSON();
		}
		catch(ex){}
		//endregion

		object.valueDec = this.valueDec;

		return object;
	}
	//**********************************************************************************
	/**
	 * Convert current value to decimal string representation
	 */
	toString()
	{
		//region Aux functions
		function viewAdd(first, second)
		{
			//region Initial variables
			const c = new Uint8Array([0]);
			
			let firstView = new Uint8Array(first);
			let secondView = new Uint8Array(second);
			
			let firstViewCopy = firstView.slice(0);
			const firstViewCopyLength = firstViewCopy.length - 1;
			let secondViewCopy = secondView.slice(0);
			const secondViewCopyLength = secondViewCopy.length - 1;
			
			let value = 0;
			
			const max = (secondViewCopyLength < firstViewCopyLength) ? firstViewCopyLength : secondViewCopyLength;
			
			let counter = 0;
			//endregion
			
			for(let i = max; i >= 0; i--, counter++)
			{
				switch(true)
				{
					case (counter < secondViewCopy.length):
						value = firstViewCopy[firstViewCopyLength - counter] + secondViewCopy[secondViewCopyLength - counter] + c[0];
						break;
					default:
						value = firstViewCopy[firstViewCopyLength - counter] + c[0];
				}
				
				c[0] = value / 10;
				
				switch(true)
				{
					case (counter >= firstViewCopy.length):
						firstViewCopy = utilConcatView(new Uint8Array([value % 10]), firstViewCopy);
						break;
					default:
						firstViewCopy[firstViewCopyLength - counter] = value % 10;
				}
			}
			
			if(c[0] > 0)
				firstViewCopy = utilConcatView(c, firstViewCopy);
			
			return firstViewCopy.slice(0);
		}
		
		function power2(n)
		{
			if(n >= powers2.length)
			{
				for(let p = powers2.length; p <= n; p++)
				{
					const c = new Uint8Array([0]);
					let digits = (powers2[p - 1]).slice(0);
					
					for(let i = (digits.length - 1); i >=0; i--)
					{
						const newValue = new Uint8Array([(digits[i] << 1) + c[0]]);
						c[0] = newValue[0] / 10;
						digits[i] = newValue[0] % 10;
					}
					
					if (c[0] > 0)
						digits = utilConcatView(c, digits);
					
					powers2.push(digits);
				}
			}
			
			return powers2[n];
		}
		
		function viewSub(first, second)
		{
			//region Initial variables
			let b = 0;
			
			let firstView = new Uint8Array(first);
			let secondView = new Uint8Array(second);
			
			let firstViewCopy = firstView.slice(0);
			const firstViewCopyLength = firstViewCopy.length - 1;
			let secondViewCopy = secondView.slice(0);
			const secondViewCopyLength = secondViewCopy.length - 1;
			
			let value;
			
			let counter = 0;
			//endregion
			
			for(let i = secondViewCopyLength; i >= 0; i--, counter++)
			{
				value = firstViewCopy[firstViewCopyLength - counter] - secondViewCopy[secondViewCopyLength - counter] - b;
				
				switch(true)
				{
					case (value < 0):
						b = 1;
						firstViewCopy[firstViewCopyLength - counter] = value + 10;
						break;
					default:
						b = 0;
						firstViewCopy[firstViewCopyLength - counter] = value;
				}
			}
			
			if(b > 0)
			{
				for(let i = (firstViewCopyLength - secondViewCopyLength + 1); i >= 0; i--, counter++)
				{
					value = firstViewCopy[firstViewCopyLength - counter] - b;
					
					if(value < 0)
					{
						b = 1;
						firstViewCopy[firstViewCopyLength - counter] = value + 10;
					}
					else
					{
						b = 0;
						firstViewCopy[firstViewCopyLength - counter] = value;
						break;
					}
				}
			}
			
			return firstViewCopy.slice();
		}
		//endregion
		
		//region Initial variables
		const firstBit = (this._valueHex.byteLength * 8) - 1;
		
		let digits = new Uint8Array((this._valueHex.byteLength * 8) / 3);
		let bitNumber = 0;
		let currentByte;
		
		const asn1View = new Uint8Array(this._valueHex);
		
		let result = "";
		
		let flag = false;
		//endregion
		
		//region Calculate number
		for(let byteNumber = (this._valueHex.byteLength - 1); byteNumber >= 0; byteNumber--)
		{
			currentByte = asn1View[byteNumber];
			
			for(let i = 0; i < 8; i++)
			{
				if((currentByte & 1) === 1)
				{
					switch(bitNumber)
					{
						case firstBit:
							digits = viewSub(power2(bitNumber), digits);
							result = "-";
							break;
						default:
							digits = viewAdd(digits, power2(bitNumber));
					}
				}
				
				bitNumber++;
				currentByte >>= 1;
			}
		}
		//endregion
		
		//region Print number
		for(let i = 0; i < digits.length; i++)
		{
			if(digits[i])
				flag = true;
			
			if(flag)
				result += digitsString.charAt(digits[i]);
		}
		
		if(flag === false)
			result += digitsString.charAt(0);
		//endregion
		
		return result;
	}
	//**********************************************************************************
}
//**************************************************************************************
class Integer extends BaseBlock
{
	//**********************************************************************************
	/**
	 * Constructor for "Integer" class
	 * @param {Object} [parameters={}]
	 */
	constructor(parameters = {})
	{
		super(parameters, LocalIntegerValueBlock);

		this.idBlock.tagClass = 1; // UNIVERSAL
		this.idBlock.tagNumber = 2; // Integer
	}
	//**********************************************************************************
	/**
	 * Aux function, need to get a block name. Need to have it here for inhiritence
	 * @returns {string}
	 */
	static blockName()
	{
		return "Integer";
	}
	//**********************************************************************************
	//noinspection JSUnusedGlobalSymbols
	/**
	 * Compare two Integer object, or Integer and ArrayBuffer objects
	 * @param {!Integer|ArrayBuffer} otherValue
	 * @returns {boolean}
	 */
	isEqual(otherValue)
	{
		if(otherValue instanceof Integer)
		{
			if(this.valueBlock.isHexOnly && otherValue.valueBlock.isHexOnly) // Compare two ArrayBuffers
				return isEqualBuffer(this.valueBlock.valueHex, otherValue.valueBlock.valueHex);

			if(this.valueBlock.isHexOnly === otherValue.valueBlock.isHexOnly)
				return (this.valueBlock.valueDec === otherValue.valueBlock.valueDec);

			return false;
		}
		
		if(otherValue instanceof ArrayBuffer)
			return isEqualBuffer(this.valueBlock.valueHex, otherValue);

		return false;
	}
	//**********************************************************************************
	/**
	 * Convert current Integer value from BER into DER format
	 * @returns {Integer}
	 */
	convertToDER()
	{
		const integer = new Integer({ valueHex: this.valueBlock.valueHex });
		integer.valueBlock.toDER();

		return integer;
	}
	//**********************************************************************************
	/**
	 * Convert current Integer value from DER to BER format
	 * @returns {Integer}
	 */
	convertFromDER()
	{
		const expectedLength = (this.valueBlock.valueHex.byteLength % 2) ? (this.valueBlock.valueHex.byteLength + 1) : this.valueBlock.valueHex.byteLength;
		const integer = new Integer({ valueHex: this.valueBlock.valueHex });
		integer.valueBlock.fromDER(integer.valueBlock.valueHex, 0, integer.valueBlock.valueHex.byteLength, expectedLength);
		
		return integer;
	}
	//**********************************************************************************
}
//**************************************************************************************
//endregion
//**************************************************************************************
//region Declaration of ASN.1 Enumerated type class
//**************************************************************************************
class Enumerated extends Integer
{
	//**********************************************************************************
	/**
	 * Constructor for "Enumerated" class
	 * @param {Object} [parameters={}]
	 */
	constructor(parameters = {})
	{
		super(parameters);

		this.idBlock.tagClass = 1; // UNIVERSAL
		this.idBlock.tagNumber = 10; // Enumerated
	}
	//**********************************************************************************
	/**
	 * Aux function, need to get a block name. Need to have it here for inhiritence
	 * @returns {string}
	 */
	static blockName()
	{
		return "Enumerated";
	}
	//**********************************************************************************
}
//**************************************************************************************
//endregion
//**************************************************************************************
//region Declaration of ASN.1 ObjectIdentifier type class
//**************************************************************************************
class LocalSidValueBlock extends HexBlock(LocalBaseBlock)
{
	//**********************************************************************************
	/**
	 * Constructor for "LocalSidValueBlock" class
	 * @param {Object} [parameters={}]
	 * @property {number} [valueDec]
	 * @property {boolean} [isFirstSid]
	 */
	constructor(parameters = {})
	{
		super(parameters);

		this.valueDec = getParametersValue(parameters, "valueDec", -1);
		this.isFirstSid = getParametersValue(parameters, "isFirstSid", false);
	}
	//**********************************************************************************
	/**
	 * Aux function, need to get a block name. Need to have it here for inhiritence
	 * @returns {string}
	 */
	static blockName()
	{
		return "sidBlock";
	}
	//**********************************************************************************
	/**
	 * Base function for converting block from BER encoded array of bytes
	 * @param {!ArrayBuffer} inputBuffer ASN.1 BER encoded array
	 * @param {!number} inputOffset Offset in ASN.1 BER encoded array where decoding should be started
	 * @param {!number} inputLength Maximum length of array of bytes which can be using in this function
	 * @returns {number} Offset after least decoded byte
	 */
	fromBER(inputBuffer, inputOffset, inputLength)
	{
		if(inputLength === 0)
			return inputOffset;

		//region Basic check for parameters
		//noinspection JSCheckFunctionSignatures
		if(checkBufferParams(this, inputBuffer, inputOffset, inputLength) === false)
			return (-1);
		//endregion

		const intBuffer = new Uint8Array(inputBuffer, inputOffset, inputLength);

		this.valueHex = new ArrayBuffer(inputLength);
		let view = new Uint8Array(this.valueHex);

		for(let i = 0; i < inputLength; i++)
		{
			view[i] = intBuffer[i] & 0x7F;

			this.blockLength++;

			if((intBuffer[i] & 0x80) === 0x00)
				break;
		}

		//region Ajust size of valueHex buffer
		const tempValueHex = new ArrayBuffer(this.blockLength);
		const tempView = new Uint8Array(tempValueHex);

		for(let i = 0; i < this.blockLength; i++)
			tempView[i] = view[i];

		//noinspection JSCheckFunctionSignatures
		this.valueHex = tempValueHex.slice(0);
		view = new Uint8Array(this.valueHex);
		//endregion

		if((intBuffer[this.blockLength - 1] & 0x80) !== 0x00)
		{
			this.error = "End of input reached before message was fully decoded";
			return (-1);
		}

		if(view[0] === 0x00)
			this.warnings.push("Needlessly long format of SID encoding");

		if(this.blockLength <= 8)
			this.valueDec = utilFromBase(view, 7);
		else
		{
			this.isHexOnly = true;
			this.warnings.push("Too big SID for decoding, hex only");
		}

		return (inputOffset + this.blockLength);
	}
	//**********************************************************************************
	/**
	 * Encoding of current ASN.1 block into ASN.1 encoded array (BER rules)
	 * @param {boolean} [sizeOnly=false] Flag that we need only a size of encoding, not a real array of bytes
	 * @returns {ArrayBuffer}
	 */
	toBER(sizeOnly = false)
	{
		//region Initial variables
		let retBuf;
		let retView;
		//endregion

		if(this.isHexOnly)
		{
			if(sizeOnly === true)
				return (new ArrayBuffer(this.valueHex.byteLength));

			const curView = new Uint8Array(this.valueHex);

			retBuf = new ArrayBuffer(this.blockLength);
			retView = new Uint8Array(retBuf);

			for(let i = 0; i < (this.blockLength - 1); i++)
				retView[i] = curView[i] | 0x80;

			retView[this.blockLength - 1] = curView[this.blockLength - 1];

			return retBuf;
		}

		const encodedBuf = utilToBase(this.valueDec, 7);
		if(encodedBuf.byteLength === 0)
		{
			this.error = "Error during encoding SID value";
			return (new ArrayBuffer(0));
		}

		retBuf = new ArrayBuffer(encodedBuf.byteLength);

		if(sizeOnly === false)
		{
			const encodedView = new Uint8Array(encodedBuf);
			retView = new Uint8Array(retBuf);

			for(let i = 0; i < (encodedBuf.byteLength - 1); i++)
				retView[i] = encodedView[i] | 0x80;

			retView[encodedBuf.byteLength - 1] = encodedView[encodedBuf.byteLength - 1];
		}

		return retBuf;
	}
	//**********************************************************************************
	/**
	 * Create string representation of current SID block
	 * @returns {string}
	 */
	toString()
	{
		let result = "";

		if(this.isHexOnly === true)
			result = bufferToHexCodes(this.valueHex, 0, this.valueHex.byteLength);
		else
		{
			if(this.isFirstSid)
			{
				let sidValue = this.valueDec;

				if(this.valueDec <= 39)
					result = "0.";
				else
				{
					if(this.valueDec <= 79)
					{
						result = "1.";
						sidValue -= 40;
					}
					else
					{
						result = "2.";
						sidValue -= 80;
					}
				}

				result += sidValue.toString();
			}
			else
				result = this.valueDec.toString();
		}

		return result;
	}
	//**********************************************************************************
	//noinspection JSUnusedGlobalSymbols
	/**
	 * Convertion for the block to JSON object
	 * @returns {Object}
	 */
	toJSON()
	{
		let object = {};
		
		//region Seems at the moment (Sep 2016) there is no way how to check method is supported in "super" object
		try
		{
			object = super.toJSON();
		}
		catch(ex){}
		//endregion

		object.valueDec = this.valueDec;
		object.isFirstSid = this.isFirstSid;

		return object;
	}
	//**********************************************************************************
}
//**************************************************************************************
class LocalObjectIdentifierValueBlock extends ValueBlock
{
	//**********************************************************************************
	/**
	 * Constructor for "LocalObjectIdentifierValueBlock" class
	 * @param {Object} [parameters={}]
	 * @property {ArrayBuffer} [valueHex]
	 */
	constructor(parameters = {})
	{
		super(parameters);

		this.fromString(getParametersValue(parameters, "value", ""));
	}
	//**********************************************************************************
	/**
	 * Base function for converting block from BER encoded array of bytes
	 * @param {!ArrayBuffer} inputBuffer ASN.1 BER encoded array
	 * @param {!number} inputOffset Offset in ASN.1 BER encoded array where decoding should be started
	 * @param {!number} inputLength Maximum length of array of bytes which can be using in this function
	 * @returns {number} Offset after least decoded byte
	 */
	fromBER(inputBuffer, inputOffset, inputLength)
	{
		let resultOffset = inputOffset;

		while(inputLength > 0)
		{
			const sidBlock = new LocalSidValueBlock();
			resultOffset = sidBlock.fromBER(inputBuffer, resultOffset, inputLength);
			if(resultOffset === (-1))
			{
				this.blockLength = 0;
				this.error = sidBlock.error;
				return resultOffset;
			}

			if(this.value.length === 0)
				sidBlock.isFirstSid = true;

			this.blockLength += sidBlock.blockLength;
			inputLength -= sidBlock.blockLength;

			this.value.push(sidBlock);
		}

		return resultOffset;
	}
	//**********************************************************************************
	/**
	 * Encoding of current ASN.1 block into ASN.1 encoded array (BER rules)
	 * @param {boolean} [sizeOnly=false] Flag that we need only a size of encoding, not a real array of bytes
	 * @returns {ArrayBuffer}
	 */
	toBER(sizeOnly = false)
	{
		let retBuf = new ArrayBuffer(0);

		for(let i = 0; i < this.value.length; i++)
		{
			const valueBuf = this.value[i].toBER(sizeOnly);
			if(valueBuf.byteLength === 0)
			{
				this.error = this.value[i].error;
				return (new ArrayBuffer(0));
			}

			retBuf = utilConcatBuf(retBuf, valueBuf);
		}

		return retBuf;
	}
	//**********************************************************************************
	/**
	 * Create "LocalObjectIdentifierValueBlock" class from string
	 * @param {string} string Input string to convert from
	 * @returns {boolean}
	 */
	fromString(string)
	{
		this.value = []; // Clear existing SID values

		let pos1 = 0;
		let pos2 = 0;

		let sid = "";

		let flag = false;

		do
		{
			pos2 = string.indexOf(".", pos1);
			if(pos2 === (-1))
				sid = string.substr(pos1);
			else
				sid = string.substr(pos1, pos2 - pos1);

			pos1 = pos2 + 1;

			if(flag)
			{
				const sidBlock = this.value[0];

				let plus = 0;

				switch(sidBlock.valueDec)
				{
					case 0:
						break;
					case 1:
						plus = 40;
						break;
					case 2:
						plus = 80;
						break;
					default:
						this.value = []; // clear SID array
						return false; // ???
				}

				const parsedSID = parseInt(sid, 10);
				if(isNaN(parsedSID))
					return true;

				sidBlock.valueDec = parsedSID + plus;

				flag = false;
			}
			else
			{
				const sidBlock = new LocalSidValueBlock();
				sidBlock.valueDec = parseInt(sid, 10);
				if(isNaN(sidBlock.valueDec))
					return true;

				if(this.value.length === 0)
				{
					sidBlock.isFirstSid = true;
					flag = true;
				}

				this.value.push(sidBlock);
			}
		} while(pos2 !== (-1));

		return true;
	}
	//**********************************************************************************
	/**
	 * Converts "LocalObjectIdentifierValueBlock" class to string
	 * @returns {string}
	 */
	toString()
	{
		let result = "";
		let isHexOnly = false;

		for(let i = 0; i < this.value.length; i++)
		{
			isHexOnly = this.value[i].isHexOnly;

			let sidStr = this.value[i].toString();

			if(i !== 0)
				result = `${result}.`;

			if(isHexOnly)
			{
				sidStr = `{${sidStr}}`;

				if(this.value[i].isFirstSid)
					result = `2.{${sidStr} - 80}`;
				else
					result += sidStr;
			}
			else
				result += sidStr;
		}

		return result;
	}
	//**********************************************************************************
	/**
	 * Aux function, need to get a block name. Need to have it here for inhiritence
	 * @returns {string}
	 */
	static blockName()
	{
		return "ObjectIdentifierValueBlock";
	}
	//**********************************************************************************
	/**
	 * Convertion for the block to JSON object
	 * @returns {Object}
	 */
	toJSON()
	{
		let object = {};
		
		//region Seems at the moment (Sep 2016) there is no way how to check method is supported in "super" object
		try
		{
			object = super.toJSON();
		}
		catch(ex){}
		//endregion

		object.value = this.toString();
		object.sidArray = [];
		for(let i = 0; i < this.value.length; i++)
			object.sidArray.push(this.value[i].toJSON());

		return object;
	}
	//**********************************************************************************
}
//**************************************************************************************
/**
 * @extends BaseBlock
 */
class ObjectIdentifier extends BaseBlock
{
	//**********************************************************************************
	/**
	 * Constructor for "ObjectIdentifier" class
	 * @param {Object} [parameters={}]
	 * @property {ArrayBuffer} [valueHex]
	 */
	constructor(parameters = {})
	{
		super(parameters, LocalObjectIdentifierValueBlock);

		this.idBlock.tagClass = 1; // UNIVERSAL
		this.idBlock.tagNumber = 6; // OBJECT IDENTIFIER
	}
	//**********************************************************************************
	/**
	 * Aux function, need to get a block name. Need to have it here for inhiritence
	 * @returns {string}
	 */
	static blockName()
	{
		return "ObjectIdentifier";
	}
	//**********************************************************************************
}
//**************************************************************************************
//endregion
//**************************************************************************************
//region Declaration of all string's classes
//**************************************************************************************
class LocalUtf8StringValueBlock extends HexBlock(LocalBaseBlock)
{
	//**********************************************************************************
	//noinspection JSUnusedGlobalSymbols
	/**
	 * Constructor for "LocalUtf8StringValueBlock" class
	 * @param {Object} [parameters={}]
	 */
	constructor(parameters = {})
	{
		super(parameters);

		this.isHexOnly = true;
		this.value = ""; // String representation of decoded ArrayBuffer
	}
	//**********************************************************************************
	/**
	 * Aux function, need to get a block name. Need to have it here for inhiritence
	 * @returns {string}
	 */
	static blockName()
	{
		return "Utf8StringValueBlock";
	}
	//**********************************************************************************
	//noinspection JSUnusedGlobalSymbols
	/**
	 * Convertion for the block to JSON object
	 * @returns {Object}
	 */
	toJSON()
	{
		let object = {};
		
		//region Seems at the moment (Sep 2016) there is no way how to check method is supported in "super" object
		try
		{
			object = super.toJSON();
		}
		catch(ex){}
		//endregion

		object.value = this.value;

		return object;
	}
	//**********************************************************************************
}
//**************************************************************************************
/**
 * @extends BaseBlock
 */
class Utf8String extends BaseBlock
{
	//**********************************************************************************
	/**
	 * Constructor for "Utf8String" class
	 * @param {Object} [parameters={}]
	 * @property {ArrayBuffer} [valueHex]
	 */
	constructor(parameters = {})
	{
		super(parameters, LocalUtf8StringValueBlock);

		if("value" in parameters)
			this.fromString(parameters.value);

		this.idBlock.tagClass = 1; // UNIVERSAL
		this.idBlock.tagNumber = 12; // Utf8String
	}
	//**********************************************************************************
	/**
	 * Aux function, need to get a block name. Need to have it here for inhiritence
	 * @returns {string}
	 */
	static blockName()
	{
		return "Utf8String";
	}
	//**********************************************************************************
	/**
	 * Base function for converting block from BER encoded array of bytes
	 * @param {!ArrayBuffer} inputBuffer ASN.1 BER encoded array
	 * @param {!number} inputOffset Offset in ASN.1 BER encoded array where decoding should be started
	 * @param {!number} inputLength Maximum length of array of bytes which can be using in this function
	 * @returns {number} Offset after least decoded byte
	 */
	fromBER(inputBuffer, inputOffset, inputLength)
	{
		const resultOffset = this.valueBlock.fromBER(inputBuffer, inputOffset, (this.lenBlock.isIndefiniteForm === true) ? inputLength : this.lenBlock.length);
		if(resultOffset === (-1))
		{
			this.error = this.valueBlock.error;
			return resultOffset;
		}

		this.fromBuffer(this.valueBlock.valueHex);

		if(this.idBlock.error.length === 0)
			this.blockLength += this.idBlock.blockLength;

		if(this.lenBlock.error.length === 0)
			this.blockLength += this.lenBlock.blockLength;

		if(this.valueBlock.error.length === 0)
			this.blockLength += this.valueBlock.blockLength;

		return resultOffset;
	}
	//**********************************************************************************
	/**
	 * Function converting ArrayBuffer into ASN.1 internal string
	 * @param {!ArrayBuffer} inputBuffer ASN.1 BER encoded array
	 */
	fromBuffer(inputBuffer)
	{
		this.valueBlock.value = String.fromCharCode.apply(null, new Uint8Array(inputBuffer));

		try
		{
			//noinspection JSDeprecatedSymbols
			this.valueBlock.value = decodeURIComponent(escape(this.valueBlock.value));
		}
		catch(ex)
		{
			this.warnings.push(`Error during "decodeURIComponent": ${ex}, using raw string`);
		}
	}
	//**********************************************************************************
	/**
	 * Function converting JavaScript string into ASN.1 internal class
	 * @param {!string} inputString ASN.1 BER encoded array
	 */
	fromString(inputString)
	{
		//noinspection JSDeprecatedSymbols
		const str = unescape(encodeURIComponent(inputString));
		const strLen = str.length;

		this.valueBlock.valueHex = new ArrayBuffer(strLen);
		const view = new Uint8Array(this.valueBlock.valueHex);

		for(let i = 0; i < strLen; i++)
			view[i] = str.charCodeAt(i);

		this.valueBlock.value = inputString;
	}
	//**********************************************************************************
}
//**************************************************************************************
//region Declaration of ASN.1 RelativeObjectIdentifier type class
//**************************************************************************************
class LocalRelativeSidValueBlock extends HexBlock(LocalBaseBlock)
{
	//**********************************************************************************
	/**
	 * Constructor for "LocalRelativeSidValueBlock" class
	 * @param {Object} [parameters={}]
	 * @property {number} [valueDec]
	 */
	constructor(parameters = {})
	{
		super(parameters);

		this.valueDec = getParametersValue(parameters, "valueDec", -1);
	}
	//**********************************************************************************
	/**
	 * Aux function, need to get a block name. Need to have it here for inhiritence
	 * @returns {string}
	 */
	static blockName()
	{
		return "relativeSidBlock";
	}
	//**********************************************************************************
	/**
	 * Base function for converting block from BER encoded array of bytes
	 * @param {!ArrayBuffer} inputBuffer ASN.1 BER encoded array
	 * @param {!number} inputOffset Offset in ASN.1 BER encoded array where decoding should be started
	 * @param {!number} inputLength Maximum length of array of bytes which can be using in this function
	 * @returns {number} Offset after least decoded byte
	 */
	fromBER(inputBuffer, inputOffset, inputLength)
	{
		if (inputLength === 0)
			return inputOffset;

		//region Basic check for parameters
		//noinspection JSCheckFunctionSignatures
		if (checkBufferParams(this, inputBuffer, inputOffset, inputLength) === false)
			return (-1);
		//endregion

		const intBuffer = new Uint8Array(inputBuffer, inputOffset, inputLength);

		this.valueHex = new ArrayBuffer(inputLength);
		let view = new Uint8Array(this.valueHex);

		for (let i = 0; i < inputLength; i++)
		{
			view[i] = intBuffer[i] & 0x7F;

			this.blockLength++;

			if ((intBuffer[i] & 0x80) === 0x00)
				break;
		}

		//region Ajust size of valueHex buffer
		const tempValueHex = new ArrayBuffer(this.blockLength);
		const tempView = new Uint8Array(tempValueHex);

		for (let i = 0; i < this.blockLength; i++)
			tempView[i] = view[i];

		//noinspection JSCheckFunctionSignatures
		this.valueHex = tempValueHex.slice(0);
		view = new Uint8Array(this.valueHex);
		//endregion

		if ((intBuffer[this.blockLength - 1] & 0x80) !== 0x00)
		{
			this.error = "End of input reached before message was fully decoded";
			return (-1);
		}

		if (view[0] === 0x00)
			this.warnings.push("Needlessly long format of SID encoding");

		if (this.blockLength <= 8)
			this.valueDec = utilFromBase(view, 7);
		else
		{
			this.isHexOnly = true;
			this.warnings.push("Too big SID for decoding, hex only");
		}

		return (inputOffset + this.blockLength);
	}
	//**********************************************************************************
	/**
	 * Encoding of current ASN.1 block into ASN.1 encoded array (BER rules)
	 * @param {boolean} [sizeOnly=false] Flag that we need only a size of encoding, not a real array of bytes
	 * @returns {ArrayBuffer}
	 */
	toBER(sizeOnly = false)
	{
		//region Initial variables
		let retBuf;
		let retView;
		//endregion

		if (this.isHexOnly)
		{
			if (sizeOnly === true)
				return (new ArrayBuffer(this.valueHex.byteLength));

			const curView = new Uint8Array(this.valueHex);

			retBuf = new ArrayBuffer(this.blockLength);
			retView = new Uint8Array(retBuf);

			for (let i = 0; i < (this.blockLength - 1); i++)
				retView[i] = curView[i] | 0x80;

			retView[this.blockLength - 1] = curView[this.blockLength - 1];

			return retBuf;
		}

		const encodedBuf = utilToBase(this.valueDec, 7);
		if (encodedBuf.byteLength === 0)
		{
			this.error = "Error during encoding SID value";
			return (new ArrayBuffer(0));
		}

		retBuf = new ArrayBuffer(encodedBuf.byteLength);

		if (sizeOnly === false)
		{
			const encodedView = new Uint8Array(encodedBuf);
			retView = new Uint8Array(retBuf);

			for (let i = 0; i < (encodedBuf.byteLength - 1); i++)
				retView[i] = encodedView[i] | 0x80;

			retView[encodedBuf.byteLength - 1] = encodedView[encodedBuf.byteLength - 1];
		}

		return retBuf;
	}
	//**********************************************************************************
	/**
	 * Create string representation of current SID block
	 * @returns {string}
	 */
	toString()
	{
		let result = "";

		if (this.isHexOnly === true)
			result = bufferToHexCodes(this.valueHex, 0, this.valueHex.byteLength);
		else {
			result = this.valueDec.toString();
		}

		return result;
	}
	//**********************************************************************************
	//noinspection JSUnusedGlobalSymbols
	/**
	 * Convertion for the block to JSON object
	 * @returns {Object}
	 */
	toJSON()
	{
		let object = {};

		//region Seems at the moment (Sep 2016) there is no way how to check method is supported in "super" object
		try {
			object = super.toJSON();
		} catch (ex) {}
		//endregion

		object.valueDec = this.valueDec;

		return object;
	}
	//**********************************************************************************
}
//**************************************************************************************
class LocalRelativeObjectIdentifierValueBlock extends ValueBlock {
	//**********************************************************************************
	/**
	 * Constructor for "LocalRelativeObjectIdentifierValueBlock" class
	 * @param {Object} [parameters={}]
	 * @property {ArrayBuffer} [valueHex]
	 */
	constructor(parameters = {})
	{
		super(parameters);

		this.fromString(getParametersValue(parameters, "value", ""));
	}
	//**********************************************************************************
	/**
	 * Base function for converting block from BER encoded array of bytes
	 * @param {!ArrayBuffer} inputBuffer ASN.1 BER encoded array
	 * @param {!number} inputOffset Offset in ASN.1 BER encoded array where decoding should be started
	 * @param {!number} inputLength Maximum length of array of bytes which can be using in this function
	 * @returns {number} Offset after least decoded byte
	 */
	fromBER(inputBuffer, inputOffset, inputLength)
	{
		let resultOffset = inputOffset;

		while (inputLength > 0)
		{
			const sidBlock = new LocalRelativeSidValueBlock();
			resultOffset = sidBlock.fromBER(inputBuffer, resultOffset, inputLength);
			if (resultOffset === (-1))
			{
				this.blockLength = 0;
				this.error = sidBlock.error;
				return resultOffset;
			}

			this.blockLength += sidBlock.blockLength;
			inputLength -= sidBlock.blockLength;

			this.value.push(sidBlock);
		}

		return resultOffset;
	}
	//**********************************************************************************
	/**
	 * Encoding of current ASN.1 block into ASN.1 encoded array (BER rules)
	 * @param {boolean} [sizeOnly=false] Flag that we need only a size of encoding, not a real array of bytes
	 * @returns {ArrayBuffer}
	 */
	toBER(sizeOnly = false)
	{
		let retBuf = new ArrayBuffer(0);

		for (let i = 0; i < this.value.length; i++)
		{
			const valueBuf = this.value[i].toBER(sizeOnly);
			if (valueBuf.byteLength === 0)
			{
				this.error = this.value[i].error;
				return (new ArrayBuffer(0));
			}

			retBuf = utilConcatBuf(retBuf, valueBuf);
		}

		return retBuf;
	}
	//**********************************************************************************
	/**
	 * Create "LocalRelativeObjectIdentifierValueBlock" class from string
	 * @param {string} string Input string to convert from
	 * @returns {boolean}
	 */
	fromString(string)
	{
		this.value = []; // Clear existing SID values

		let pos1 = 0;
		let pos2 = 0;

		let sid = "";

		do
		{
			pos2 = string.indexOf(".", pos1);
			if (pos2 === (-1))
				sid = string.substr(pos1);
			else
				sid = string.substr(pos1, pos2 - pos1);

			pos1 = pos2 + 1;

			const sidBlock = new LocalRelativeSidValueBlock();
			sidBlock.valueDec = parseInt(sid, 10);
			if (isNaN(sidBlock.valueDec))
				return true;

			this.value.push(sidBlock);

		} while (pos2 !== (-1));

		return true;
	}
	//**********************************************************************************
	/**
	 * Converts "LocalRelativeObjectIdentifierValueBlock" class to string
	 * @returns {string}
	 */
	toString()
	{
		let result = "";
		let isHexOnly = false;

		for (let i = 0; i < this.value.length; i++)
		{
			isHexOnly = this.value[i].isHexOnly;

			let sidStr = this.value[i].toString();

			if (i !== 0)
				result = `${result}.`;

			if (isHexOnly)
			{
				sidStr = `{${sidStr}}`;
				result += sidStr;
			} else
				result += sidStr;
		}

		return result;
	}
	//**********************************************************************************
	/**
	 * Aux function, need to get a block name. Need to have it here for inhiritence
	 * @returns {string}
	 */
	static blockName()
	{
		return "RelativeObjectIdentifierValueBlock";
	}
	//**********************************************************************************
	/**
	 * Convertion for the block to JSON object
	 * @returns {Object}
	 */
	toJSON()
	{
		let object = {};

		//region Seems at the moment (Sep 2016) there is no way how to check method is supported in "super" object
		try
		{
			object = super.toJSON();
		} catch (ex) {}
		//endregion

		object.value = this.toString();
		object.sidArray = [];
		for (let i = 0; i < this.value.length; i++)
			object.sidArray.push(this.value[i].toJSON());

		return object;
	}
	//**********************************************************************************
}
//**************************************************************************************
/**
 * @extends BaseBlock
 */
class RelativeObjectIdentifier extends BaseBlock
{
	//**********************************************************************************
	/**
	 * Constructor for "RelativeObjectIdentifier" class
	 * @param {Object} [parameters={}]
	 * @property {ArrayBuffer} [valueHex]
	 */
	constructor(parameters = {})
	{
		super(parameters, LocalRelativeObjectIdentifierValueBlock);

		this.idBlock.tagClass = 1; // UNIVERSAL
		this.idBlock.tagNumber = 13; // RELATIVE OBJECT IDENTIFIER
	}
	//**********************************************************************************
	/**
	 * Aux function, need to get a block name. Need to have it here for inhiritence
	 * @returns {string}
	 */
	static blockName()
	{
		return "RelativeObjectIdentifier";
	}
	//**********************************************************************************
}
//**************************************************************************************
//endregion
//**************************************************************************************
/**
 * @extends LocalBaseBlock
 * @extends HexBlock
 */
class LocalBmpStringValueBlock extends HexBlock(LocalBaseBlock)
{
	//**********************************************************************************
	/**
	 * Constructor for "LocalBmpStringValueBlock" class
	 * @param {Object} [parameters={}]
	 */
	constructor(parameters = {})
	{
		super(parameters);

		this.isHexOnly = true;
		this.value = "";
	}
	//**********************************************************************************
	/**
	 * Aux function, need to get a block name. Need to have it here for inhiritence
	 * @returns {string}
	 */
	static blockName()
	{
		return "BmpStringValueBlock";
	}
	//**********************************************************************************
	//noinspection JSUnusedGlobalSymbols
	/**
	 * Convertion for the block to JSON object
	 * @returns {Object}
	 */
	toJSON()
	{
		let object = {};
		
		//region Seems at the moment (Sep 2016) there is no way how to check method is supported in "super" object
		try
		{
			object = super.toJSON();
		}
		catch(ex){}
		//endregion

		object.value = this.value;

		return object;
	}
	//**********************************************************************************
}
//**************************************************************************************
/**
 * @extends BaseBlock
 */
class BmpString extends BaseBlock
{
	//**********************************************************************************
	/**
	 * Constructor for "BmpString" class
	 * @param {Object} [parameters={}]
	 */
	constructor(parameters = {})
	{
		super(parameters, LocalBmpStringValueBlock);

		if("value" in parameters)
			this.fromString(parameters.value);

		this.idBlock.tagClass = 1; // UNIVERSAL
		this.idBlock.tagNumber = 30; // BmpString
	}
	//**********************************************************************************
	/**
	 * Aux function, need to get a block name. Need to have it here for inhiritence
	 * @returns {string}
	 */
	static blockName()
	{
		return "BmpString";
	}
	//**********************************************************************************
	/**
	 * Base function for converting block from BER encoded array of bytes
	 * @param {!ArrayBuffer} inputBuffer ASN.1 BER encoded array
	 * @param {!number} inputOffset Offset in ASN.1 BER encoded array where decoding should be started
	 * @param {!number} inputLength Maximum length of array of bytes which can be using in this function
	 * @returns {number} Offset after least decoded byte
	 */
	fromBER(inputBuffer, inputOffset, inputLength)
	{
		const resultOffset = this.valueBlock.fromBER(inputBuffer, inputOffset, (this.lenBlock.isIndefiniteForm === true) ? inputLength : this.lenBlock.length);
		if(resultOffset === (-1))
		{
			this.error = this.valueBlock.error;
			return resultOffset;
		}

		this.fromBuffer(this.valueBlock.valueHex);

		if(this.idBlock.error.length === 0)
			this.blockLength += this.idBlock.blockLength;

		if(this.lenBlock.error.length === 0)
			this.blockLength += this.lenBlock.blockLength;

		if(this.valueBlock.error.length === 0)
			this.blockLength += this.valueBlock.blockLength;

		return resultOffset;
	}
	//**********************************************************************************
	/**
	 * Function converting ArrayBuffer into ASN.1 internal string
	 * @param {!ArrayBuffer} inputBuffer ASN.1 BER encoded array
	 */
	fromBuffer(inputBuffer)
	{
		//noinspection JSCheckFunctionSignatures
		const copyBuffer = inputBuffer.slice(0);
		const valueView = new Uint8Array(copyBuffer);

		for(let i = 0; i < valueView.length; i += 2)
		{
			const temp = valueView[i];

			valueView[i] = valueView[i + 1];
			valueView[i + 1] = temp;
		}

		this.valueBlock.value = String.fromCharCode.apply(null, new Uint16Array(copyBuffer));
	}
	//**********************************************************************************
	/**
	 * Function converting JavaScript string into ASN.1 internal class
	 * @param {!string} inputString ASN.1 BER encoded array
	 */
	fromString(inputString)
	{
		const strLength = inputString.length;

		this.valueBlock.valueHex = new ArrayBuffer(strLength * 2);
		const valueHexView = new Uint8Array(this.valueBlock.valueHex);

		for(let i = 0; i < strLength; i++)
		{
			const codeBuf = utilToBase(inputString.charCodeAt(i), 8);
			const codeView = new Uint8Array(codeBuf);
			if(codeView.length > 2)
				continue;

			const dif = 2 - codeView.length;

			for(let j = (codeView.length - 1); j >= 0; j--)
				valueHexView[i * 2 + j + dif] = codeView[j];
		}

		this.valueBlock.value = inputString;
	}
	//**********************************************************************************
}
//**************************************************************************************
class LocalUniversalStringValueBlock extends HexBlock(LocalBaseBlock)
{
	//**********************************************************************************
	/**
	 * Constructor for "LocalUniversalStringValueBlock" class
	 * @param {Object} [parameters={}]
	 */
	constructor(parameters = {})
	{
		super(parameters);

		this.isHexOnly = true;
		this.value = "";
	}
	//**********************************************************************************
	/**
	 * Aux function, need to get a block name. Need to have it here for inhiritence
	 * @returns {string}
	 */
	static blockName()
	{
		return "UniversalStringValueBlock";
	}
	//**********************************************************************************
	//noinspection JSUnusedGlobalSymbols
	/**
	 * Convertion for the block to JSON object
	 * @returns {Object}
	 */
	toJSON()
	{
		let object = {};
		
		//region Seems at the moment (Sep 2016) there is no way how to check method is supported in "super" object
		try
		{
			object = super.toJSON();
		}
		catch(ex){}
		//endregion

		object.value = this.value;

		return object;
	}
	//**********************************************************************************
}
//**************************************************************************************
/**
 * @extends BaseBlock
 */
class UniversalString extends BaseBlock
{
	//**********************************************************************************
	/**
	 * Constructor for "UniversalString" class
	 * @param {Object} [parameters={}]
	 */
	constructor(parameters = {})
	{
		super(parameters, LocalUniversalStringValueBlock);

		if("value" in parameters)
			this.fromString(parameters.value);

		this.idBlock.tagClass = 1; // UNIVERSAL
		this.idBlock.tagNumber = 28; // UniversalString
	}
	//**********************************************************************************
	/**
	 * Aux function, need to get a block name. Need to have it here for inhiritence
	 * @returns {string}
	 */
	static blockName()
	{
		return "UniversalString";
	}
	//**********************************************************************************
	/**
	 * Base function for converting block from BER encoded array of bytes
	 * @param {!ArrayBuffer} inputBuffer ASN.1 BER encoded array
	 * @param {!number} inputOffset Offset in ASN.1 BER encoded array where decoding should be started
	 * @param {!number} inputLength Maximum length of array of bytes which can be using in this function
	 * @returns {number} Offset after least decoded byte
	 */
	fromBER(inputBuffer, inputOffset, inputLength)
	{
		const resultOffset = this.valueBlock.fromBER(inputBuffer, inputOffset, (this.lenBlock.isIndefiniteForm === true) ? inputLength : this.lenBlock.length);
		if(resultOffset === (-1))
		{
			this.error = this.valueBlock.error;
			return resultOffset;
		}

		this.fromBuffer(this.valueBlock.valueHex);

		if(this.idBlock.error.length === 0)
			this.blockLength += this.idBlock.blockLength;

		if(this.lenBlock.error.length === 0)
			this.blockLength += this.lenBlock.blockLength;

		if(this.valueBlock.error.length === 0)
			this.blockLength += this.valueBlock.blockLength;

		return resultOffset;
	}
	//**********************************************************************************
	/**
	 * Function converting ArrayBuffer into ASN.1 internal string
	 * @param {!ArrayBuffer} inputBuffer ASN.1 BER encoded array
	 */
	fromBuffer(inputBuffer)
	{
		//noinspection JSCheckFunctionSignatures
		const copyBuffer = inputBuffer.slice(0);
		const valueView = new Uint8Array(copyBuffer);

		for(let i = 0; i < valueView.length; i += 4)
		{
			valueView[i] = valueView[i + 3];
			valueView[i + 1] = valueView[i + 2];
			valueView[i + 2] = 0x00;
			valueView[i + 3] = 0x00;
		}

		this.valueBlock.value = String.fromCharCode.apply(null, new Uint32Array(copyBuffer));
	}
	//**********************************************************************************
	/**
	 * Function converting JavaScript string into ASN.1 internal class
	 * @param {!string} inputString ASN.1 BER encoded array
	 */
	fromString(inputString)
	{
		const strLength = inputString.length;

		this.valueBlock.valueHex = new ArrayBuffer(strLength * 4);
		const valueHexView = new Uint8Array(this.valueBlock.valueHex);

		for(let i = 0; i < strLength; i++)
		{
			const codeBuf = utilToBase(inputString.charCodeAt(i), 8);
			const codeView = new Uint8Array(codeBuf);
			if(codeView.length > 4)
				continue;

			const dif = 4 - codeView.length;

			for(let j = (codeView.length - 1); j >= 0; j--)
				valueHexView[i * 4 + j + dif] = codeView[j];
		}

		this.valueBlock.value = inputString;
	}
	//**********************************************************************************
}
//**************************************************************************************
class LocalSimpleStringValueBlock extends HexBlock(LocalBaseBlock)
{
	//**********************************************************************************
	/**
	 * Constructor for "LocalSimpleStringValueBlock" class
	 * @param {Object} [parameters={}]
	 */
	constructor(parameters = {})
	{
		super(parameters);

		this.value = "";
		this.isHexOnly = true;
	}
	//**********************************************************************************
	/**
	 * Aux function, need to get a block name. Need to have it here for inhiritence
	 * @returns {string}
	 */
	static blockName()
	{
		return "SimpleStringValueBlock";
	}
	//**********************************************************************************
	//noinspection JSUnusedGlobalSymbols
	/**
	 * Convertion for the block to JSON object
	 * @returns {Object}
	 */
	toJSON()
	{
		let object = {};
		
		//region Seems at the moment (Sep 2016) there is no way how to check method is supported in "super" object
		try
		{
			object = super.toJSON();
		}
		catch(ex){}
		//endregion

		object.value = this.value;

		return object;
	}
	//**********************************************************************************
}
//**************************************************************************************
/**
 * @extends BaseBlock
 */
class LocalSimpleStringBlock extends BaseBlock
{
	//**********************************************************************************
	/**
	 * Constructor for "LocalSimpleStringBlock" class
	 * @param {Object} [parameters={}]
	 */
	constructor(parameters = {})
	{
		super(parameters, LocalSimpleStringValueBlock);

		if("value" in parameters)
			this.fromString(parameters.value);
	}
	//**********************************************************************************
	/**
	 * Aux function, need to get a block name. Need to have it here for inhiritence
	 * @returns {string}
	 */
	static blockName()
	{
		return "SIMPLESTRING";
	}
	//**********************************************************************************
	/**
	 * Base function for converting block from BER encoded array of bytes
	 * @param {!ArrayBuffer} inputBuffer ASN.1 BER encoded array
	 * @param {!number} inputOffset Offset in ASN.1 BER encoded array where decoding should be started
	 * @param {!number} inputLength Maximum length of array of bytes which can be using in this function
	 * @returns {number} Offset after least decoded byte
	 */
	fromBER(inputBuffer, inputOffset, inputLength)
	{
		const resultOffset = this.valueBlock.fromBER(inputBuffer, inputOffset, (this.lenBlock.isIndefiniteForm === true) ? inputLength : this.lenBlock.length);
		if(resultOffset === (-1))
		{
			this.error = this.valueBlock.error;
			return resultOffset;
		}

		this.fromBuffer(this.valueBlock.valueHex);

		if(this.idBlock.error.length === 0)
			this.blockLength += this.idBlock.blockLength;

		if(this.lenBlock.error.length === 0)
			this.blockLength += this.lenBlock.blockLength;

		if(this.valueBlock.error.length === 0)
			this.blockLength += this.valueBlock.blockLength;

		return resultOffset;
	}
	//**********************************************************************************
	/**
	 * Function converting ArrayBuffer into ASN.1 internal string
	 * @param {!ArrayBuffer} inputBuffer ASN.1 BER encoded array
	 */
	fromBuffer(inputBuffer)
	{
		this.valueBlock.value = String.fromCharCode.apply(null, new Uint8Array(inputBuffer));
	}
	//**********************************************************************************
	/**
	 * Function converting JavaScript string into ASN.1 internal class
	 * @param {!string} inputString ASN.1 BER encoded array
	 */
	fromString(inputString)
	{
		const strLen = inputString.length;

		this.valueBlock.valueHex = new ArrayBuffer(strLen);
		const view = new Uint8Array(this.valueBlock.valueHex);

		for(let i = 0; i < strLen; i++)
			view[i] = inputString.charCodeAt(i);

		this.valueBlock.value = inputString;
	}
	//**********************************************************************************
}
//**************************************************************************************
/**
 * @extends LocalSimpleStringBlock
 */
class NumericString extends LocalSimpleStringBlock
{
	//**********************************************************************************
	/**
	 * Constructor for "NumericString" class
	 * @param {Object} [parameters={}]
	 */
	constructor(parameters = {})
	{
		super(parameters);

		this.idBlock.tagClass = 1; // UNIVERSAL
		this.idBlock.tagNumber = 18; // NumericString
	}
	//**********************************************************************************
	/**
	 * Aux function, need to get a block name. Need to have it here for inhiritence
	 * @returns {string}
	 */
	static blockName()
	{
		return "NumericString";
	}
	//**********************************************************************************
}
//**************************************************************************************
/**
 * @extends LocalSimpleStringBlock
 */
class PrintableString extends LocalSimpleStringBlock
{
	//**********************************************************************************
	/**
	 * Constructor for "PrintableString" class
	 * @param {Object} [parameters={}]
	 */
	constructor(parameters = {})
	{
		super(parameters);

		this.idBlock.tagClass = 1; // UNIVERSAL
		this.idBlock.tagNumber = 19; // PrintableString
	}
	//**********************************************************************************
	/**
	 * Aux function, need to get a block name. Need to have it here for inhiritence
	 * @returns {string}
	 */
	static blockName()
	{
		return "PrintableString";
	}
	//**********************************************************************************
}
//**************************************************************************************
/**
 * @extends LocalSimpleStringBlock
 */
class TeletexString extends LocalSimpleStringBlock
{
	//**********************************************************************************
	/**
	 * Constructor for "TeletexString" class
	 * @param {Object} [parameters={}]
	 */
	constructor(parameters = {})
	{
		super(parameters);

		this.idBlock.tagClass = 1; // UNIVERSAL
		this.idBlock.tagNumber = 20; // TeletexString
	}
	//**********************************************************************************
	/**
	 * Aux function, need to get a block name. Need to have it here for inhiritence
	 * @returns {string}
	 */
	static blockName()
	{
		return "TeletexString";
	}
	//**********************************************************************************
}
//**************************************************************************************
/**
 * @extends LocalSimpleStringBlock
 */
class VideotexString extends LocalSimpleStringBlock
{
	//**********************************************************************************
	/**
	 * Constructor for "VideotexString" class
	 * @param {Object} [parameters={}]
	 */
	constructor(parameters = {})
	{
		super(parameters);

		this.idBlock.tagClass = 1; // UNIVERSAL
		this.idBlock.tagNumber = 21; // VideotexString
	}
	//**********************************************************************************
	/**
	 * Aux function, need to get a block name. Need to have it here for inhiritence
	 * @returns {string}
	 */
	static blockName()
	{
		return "VideotexString";
	}
	//**********************************************************************************
}
//**************************************************************************************
/**
 * @extends LocalSimpleStringBlock
 */
class IA5String extends LocalSimpleStringBlock
{
	//**********************************************************************************
	/**
	 * Constructor for "IA5String" class
	 * @param {Object} [parameters={}]
	 */
	constructor(parameters = {})
	{
		super(parameters);

		this.idBlock.tagClass = 1; // UNIVERSAL
		this.idBlock.tagNumber = 22; // IA5String
	}
	//**********************************************************************************
	/**
	 * Aux function, need to get a block name. Need to have it here for inhiritence
	 * @returns {string}
	 */
	static blockName()
	{
		return "IA5String";
	}
	//**********************************************************************************
}
//**************************************************************************************
/**
 * @extends LocalSimpleStringBlock
 */
class GraphicString extends LocalSimpleStringBlock
{
	//**********************************************************************************
	/**
	 * Constructor for "GraphicString" class
	 * @param {Object} [parameters={}]
	 */
	constructor(parameters = {})
	{
		super(parameters);

		this.idBlock.tagClass = 1; // UNIVERSAL
		this.idBlock.tagNumber = 25; // GraphicString
	}
	//**********************************************************************************
	/**
	 * Aux function, need to get a block name. Need to have it here for inhiritence
	 * @returns {string}
	 */
	static blockName()
	{
		return "GraphicString";
	}
	//**********************************************************************************
}
//**************************************************************************************
/**
 * @extends LocalSimpleStringBlock
 */
class VisibleString extends LocalSimpleStringBlock
{
	//**********************************************************************************
	/**
	 * Constructor for "VisibleString" class
	 * @param {Object} [parameters={}]
	 */
	constructor(parameters = {})
	{
		super(parameters);

		this.idBlock.tagClass = 1; // UNIVERSAL
		this.idBlock.tagNumber = 26; // VisibleString
	}
	//**********************************************************************************
	/**
	 * Aux function, need to get a block name. Need to have it here for inhiritence
	 * @returns {string}
	 */
	static blockName()
	{
		return "VisibleString";
	}
	//**********************************************************************************
}
//**************************************************************************************
/**
 * @extends LocalSimpleStringBlock
 */
class GeneralString extends LocalSimpleStringBlock
{
	//**********************************************************************************
	/**
	 * Constructor for "GeneralString" class
	 * @param {Object} [parameters={}]
	 */
	constructor(parameters = {})
	{
		super(parameters);

		this.idBlock.tagClass = 1; // UNIVERSAL
		this.idBlock.tagNumber = 27; // GeneralString
	}
	//**********************************************************************************
	/**
	 * Aux function, need to get a block name. Need to have it here for inhiritence
	 * @returns {string}
	 */
	static blockName()
	{
		return "GeneralString";
	}
	//**********************************************************************************
}
//**************************************************************************************
/**
 * @extends LocalSimpleStringBlock
 */
class CharacterString extends LocalSimpleStringBlock
{
	//**********************************************************************************
	/**
	 * Constructor for "CharacterString" class
	 * @param {Object} [parameters={}]
	 */
	constructor(parameters = {})
	{
		super(parameters);

		this.idBlock.tagClass = 1; // UNIVERSAL
		this.idBlock.tagNumber = 29; // CharacterString
	}
	//**********************************************************************************
	/**
	 * Aux function, need to get a block name. Need to have it here for inhiritence
	 * @returns {string}
	 */
	static blockName()
	{
		return "CharacterString";
	}
	//**********************************************************************************
}
//**************************************************************************************
//endregion
//**************************************************************************************
//region Declaration of all date and time classes
//**************************************************************************************
/**
 * @extends VisibleString
 */
class UTCTime extends VisibleString
{
	//**********************************************************************************
	/**
	 * Constructor for "UTCTime" class
	 * @param {Object} [parameters={}]
	 * @property {string} [value] String representatio of the date
	 * @property {Date} [valueDate] JavaScript "Date" object
	 */
	constructor(parameters = {})
	{
		super(parameters);

		this.year = 0;
		this.month = 0;
		this.day = 0;
		this.hour = 0;
		this.minute = 0;
		this.second = 0;

		//region Create UTCTime from ASN.1 UTC string value
		if("value" in parameters)
		{
			this.fromString(parameters.value);

			this.valueBlock.valueHex = new ArrayBuffer(parameters.value.length);
			const view = new Uint8Array(this.valueBlock.valueHex);

			for(let i = 0; i < parameters.value.length; i++)
				view[i] = parameters.value.charCodeAt(i);
		}
		//endregion
		//region Create GeneralizedTime from JavaScript Date type
		if("valueDate" in parameters)
		{
			this.fromDate(parameters.valueDate);
			this.valueBlock.valueHex = this.toBuffer();
		}
		//endregion

		this.idBlock.tagClass = 1; // UNIVERSAL
		this.idBlock.tagNumber = 23; // UTCTime
	}
	//**********************************************************************************
	/**
	 * Base function for converting block from BER encoded array of bytes
	 * @param {!ArrayBuffer} inputBuffer ASN.1 BER encoded array
	 * @param {!number} inputOffset Offset in ASN.1 BER encoded array where decoding should be started
	 * @param {!number} inputLength Maximum length of array of bytes which can be using in this function
	 * @returns {number} Offset after least decoded byte
	 */
	fromBER(inputBuffer, inputOffset, inputLength)
	{
		const resultOffset = this.valueBlock.fromBER(inputBuffer, inputOffset, (this.lenBlock.isIndefiniteForm === true) ? inputLength : this.lenBlock.length);
		if(resultOffset === (-1))
		{
			this.error = this.valueBlock.error;
			return resultOffset;
		}

		this.fromBuffer(this.valueBlock.valueHex);

		if(this.idBlock.error.length === 0)
			this.blockLength += this.idBlock.blockLength;

		if(this.lenBlock.error.length === 0)
			this.blockLength += this.lenBlock.blockLength;

		if(this.valueBlock.error.length === 0)
			this.blockLength += this.valueBlock.blockLength;

		return resultOffset;
	}
	//**********************************************************************************
	/**
	 * Function converting ArrayBuffer into ASN.1 internal string
	 * @param {!ArrayBuffer} inputBuffer ASN.1 BER encoded array
	 */
	fromBuffer(inputBuffer)
	{
		this.fromString(String.fromCharCode.apply(null, new Uint8Array(inputBuffer)));
	}
	//**********************************************************************************
	/**
	 * Function converting ASN.1 internal string into ArrayBuffer
	 * @returns {ArrayBuffer}
	 */
	toBuffer()
	{
		const str = this.toString();

		const buffer = new ArrayBuffer(str.length);
		const view = new Uint8Array(buffer);

		for(let i = 0; i < str.length; i++)
			view[i] = str.charCodeAt(i);

		return buffer;
	}
	//**********************************************************************************
	/**
	 * Function converting "Date" object into ASN.1 internal string
	 * @param {!Date} inputDate JavaScript "Date" object
	 */
	fromDate(inputDate)
	{
		this.year = inputDate.getUTCFullYear();
		this.month = inputDate.getUTCMonth() + 1;
		this.day = inputDate.getUTCDate();
		this.hour = inputDate.getUTCHours();
		this.minute = inputDate.getUTCMinutes();
		this.second = inputDate.getUTCSeconds();
	}
	//**********************************************************************************
	//noinspection JSUnusedGlobalSymbols
	/**
	 * Function converting ASN.1 internal string into "Date" object
	 * @returns {Date}
	 */
	toDate()
	{
		return (new Date(Date.UTC(this.year, this.month - 1, this.day, this.hour, this.minute, this.second)));
	}
	//**********************************************************************************
	/**
	 * Function converting JavaScript string into ASN.1 internal class
	 * @param {!string} inputString ASN.1 BER encoded array
	 */
	fromString(inputString)
	{
		//region Parse input string
		const parser = /(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})Z/ig;
		const parserArray = parser.exec(inputString);
		if(parserArray === null)
		{
			this.error = "Wrong input string for convertion";
			return;
		}
		//endregion

		//region Store parsed values
		const year = parseInt(parserArray[1], 10);
		if(year >= 50)
			this.year = 1900 + year;
		else
			this.year = 2000 + year;

		this.month = parseInt(parserArray[2], 10);
		this.day = parseInt(parserArray[3], 10);
		this.hour = parseInt(parserArray[4], 10);
		this.minute = parseInt(parserArray[5], 10);
		this.second = parseInt(parserArray[6], 10);
		//endregion
	}
	//**********************************************************************************
	/**
	 * Function converting ASN.1 internal class into JavaScript string
	 * @returns {string}
	 */
	toString()
	{
		const outputArray = new Array(7);

		outputArray[0] = padNumber(((this.year < 2000) ? (this.year - 1900) : (this.year - 2000)), 2);
		outputArray[1] = padNumber(this.month, 2);
		outputArray[2] = padNumber(this.day, 2);
		outputArray[3] = padNumber(this.hour, 2);
		outputArray[4] = padNumber(this.minute, 2);
		outputArray[5] = padNumber(this.second, 2);
		outputArray[6] = "Z";

		return outputArray.join("");
	}
	//**********************************************************************************
	/**
	 * Aux function, need to get a block name. Need to have it here for inhiritence
	 * @returns {string}
	 */
	static blockName()
	{
		return "UTCTime";
	}
	//**********************************************************************************
	/**
	 * Convertion for the block to JSON object
	 * @returns {Object}
	 */
	toJSON()
	{
		let object = {};
		
		//region Seems at the moment (Sep 2016) there is no way how to check method is supported in "super" object
		try
		{
			object = super.toJSON();
		}
		catch(ex){}
		//endregion

		object.year = this.year;
		object.month = this.month;
		object.day = this.day;
		object.hour = this.hour;
		object.minute = this.minute;
		object.second = this.second;

		return object;
	}
	//**********************************************************************************
}
//**************************************************************************************
/**
 * @extends VisibleString
 */
class GeneralizedTime extends VisibleString
{
	//**********************************************************************************
	/**
	 * Constructor for "GeneralizedTime" class
	 * @param {Object} [parameters={}]
	 * @property {string} [value] String representatio of the date
	 * @property {Date} [valueDate] JavaScript "Date" object
	 */
	constructor(parameters = {})
	{
		super(parameters);

		this.year = 0;
		this.month = 0;
		this.day = 0;
		this.hour = 0;
		this.minute = 0;
		this.second = 0;
		this.millisecond = 0;

		//region Create UTCTime from ASN.1 UTC string value
		if("value" in parameters)
		{
			this.fromString(parameters.value);

			this.valueBlock.valueHex = new ArrayBuffer(parameters.value.length);
			const view = new Uint8Array(this.valueBlock.valueHex);

			for(let i = 0; i < parameters.value.length; i++)
				view[i] = parameters.value.charCodeAt(i);
		}
		//endregion
		//region Create GeneralizedTime from JavaScript Date type
		if("valueDate" in parameters)
		{
			this.fromDate(parameters.valueDate);
			this.valueBlock.valueHex = this.toBuffer();
		}
		//endregion

		this.idBlock.tagClass = 1; // UNIVERSAL
		this.idBlock.tagNumber = 24; // GeneralizedTime
	}
	//**********************************************************************************
	/**
	 * Base function for converting block from BER encoded array of bytes
	 * @param {!ArrayBuffer} inputBuffer ASN.1 BER encoded array
	 * @param {!number} inputOffset Offset in ASN.1 BER encoded array where decoding should be started
	 * @param {!number} inputLength Maximum length of array of bytes which can be using in this function
	 * @returns {number} Offset after least decoded byte
	 */
	fromBER(inputBuffer, inputOffset, inputLength)
	{
		const resultOffset = this.valueBlock.fromBER(inputBuffer, inputOffset, (this.lenBlock.isIndefiniteForm === true) ? inputLength : this.lenBlock.length);
		if(resultOffset === (-1))
		{
			this.error = this.valueBlock.error;
			return resultOffset;
		}

		this.fromBuffer(this.valueBlock.valueHex);

		if(this.idBlock.error.length === 0)
			this.blockLength += this.idBlock.blockLength;

		if(this.lenBlock.error.length === 0)
			this.blockLength += this.lenBlock.blockLength;

		if(this.valueBlock.error.length === 0)
			this.blockLength += this.valueBlock.blockLength;

		return resultOffset;
	}
	//**********************************************************************************
	/**
	 * Function converting ArrayBuffer into ASN.1 internal string
	 * @param {!ArrayBuffer} inputBuffer ASN.1 BER encoded array
	 */
	fromBuffer(inputBuffer)
	{
		this.fromString(String.fromCharCode.apply(null, new Uint8Array(inputBuffer)));
	}
	//**********************************************************************************
	/**
	 * Function converting ASN.1 internal string into ArrayBuffer
	 * @returns {ArrayBuffer}
	 */
	toBuffer()
	{
		const str = this.toString();

		const buffer = new ArrayBuffer(str.length);
		const view = new Uint8Array(buffer);

		for(let i = 0; i < str.length; i++)
			view[i] = str.charCodeAt(i);

		return buffer;
	}
	//**********************************************************************************
	/**
	 * Function converting "Date" object into ASN.1 internal string
	 * @param {!Date} inputDate JavaScript "Date" object
	 */
	fromDate(inputDate)
	{
		this.year = inputDate.getUTCFullYear();
		this.month = inputDate.getUTCMonth() + 1;
		this.day = inputDate.getUTCDate();
		this.hour = inputDate.getUTCHours();
		this.minute = inputDate.getUTCMinutes();
		this.second = inputDate.getUTCSeconds();
		this.millisecond = inputDate.getUTCMilliseconds();
	}
	//**********************************************************************************
	//noinspection JSUnusedGlobalSymbols
	/**
	 * Function converting ASN.1 internal string into "Date" object
	 * @returns {Date}
	 */
	toDate()
	{
		return (new Date(Date.UTC(this.year, this.month - 1, this.day, this.hour, this.minute, this.second, this.millisecond)));
	}
	//**********************************************************************************
	/**
	 * Function converting JavaScript string into ASN.1 internal class
	 * @param {!string} inputString ASN.1 BER encoded array
	 */
	fromString(inputString)
	{
		//region Initial variables
		let isUTC = false;

		let timeString = "";
		let dateTimeString = "";
		let fractionPart = 0;

		let parser;

		let hourDifference = 0;
		let minuteDifference = 0;
		//endregion

		//region Convert as UTC time
		if(inputString[inputString.length - 1] === "Z")
		{
			timeString = inputString.substr(0, inputString.length - 1);

			isUTC = true;
		}
		//endregion
		//region Convert as local time
		else
		{
			//noinspection JSPrimitiveTypeWrapperUsage
			const number = new Number(inputString[inputString.length - 1]);

			if(isNaN(number.valueOf()))
				throw new Error("Wrong input string for convertion");

			timeString = inputString;
		}
		//endregion

		//region Check that we do not have a "+" and "-" symbols inside UTC time
		if(isUTC)
		{
			if(timeString.indexOf("+") !== (-1))
				throw new Error("Wrong input string for convertion");

			if(timeString.indexOf("-") !== (-1))
				throw new Error("Wrong input string for convertion");
		}
		//endregion
		//region Get "UTC time difference" in case of local time
		else
		{
			let multiplier = 1;
			let differencePosition = timeString.indexOf("+");
			let differenceString = "";

			if(differencePosition === (-1))
			{
				differencePosition = timeString.indexOf("-");
				multiplier = (-1);
			}

			if(differencePosition !== (-1))
			{
				differenceString = timeString.substr(differencePosition + 1);
				timeString = timeString.substr(0, differencePosition);

				if((differenceString.length !== 2) && (differenceString.length !== 4))
					throw new Error("Wrong input string for convertion");

				//noinspection JSPrimitiveTypeWrapperUsage
				let number = new Number(differenceString.substr(0, 2));

				if(isNaN(number.valueOf()))
					throw new Error("Wrong input string for convertion");

				hourDifference = multiplier * number;

				if(differenceString.length === 4)
				{
					//noinspection JSPrimitiveTypeWrapperUsage
					number = new Number(differenceString.substr(2, 2));

					if(isNaN(number.valueOf()))
						throw new Error("Wrong input string for convertion");

					minuteDifference = multiplier * number;
				}
			}
		}
		//endregion

		//region Get position of fraction point
		let fractionPointPosition = timeString.indexOf("."); // Check for "full stop" symbol
		if(fractionPointPosition === (-1))
			fractionPointPosition = timeString.indexOf(","); // Check for "comma" symbol
		//endregion

		//region Get fraction part
		if(fractionPointPosition !== (-1))
		{
			//noinspection JSPrimitiveTypeWrapperUsage
			const fractionPartCheck = new Number(`0${timeString.substr(fractionPointPosition)}`);

			if(isNaN(fractionPartCheck.valueOf()))
				throw new Error("Wrong input string for convertion");

			fractionPart = fractionPartCheck.valueOf();

			dateTimeString = timeString.substr(0, fractionPointPosition);
		}
		else
			dateTimeString = timeString;
		//endregion

		//region Parse internal date
		switch(true)
		{
			case (dateTimeString.length === 8): // "YYYYMMDD"
				parser = /(\d{4})(\d{2})(\d{2})/ig;
				if(fractionPointPosition !== (-1))
					throw new Error("Wrong input string for convertion"); // Here we should not have a "fraction point"
				break;
			case (dateTimeString.length === 10): // "YYYYMMDDHH"
				parser = /(\d{4})(\d{2})(\d{2})(\d{2})/ig;

				if(fractionPointPosition !== (-1))
				{
					let fractionResult = 60 * fractionPart;
					this.minute = Math.floor(fractionResult);

					fractionResult = 60 * (fractionResult - this.minute);
					this.second = Math.floor(fractionResult);

					fractionResult = 1000 * (fractionResult - this.second);
					this.millisecond = Math.floor(fractionResult);
				}
				break;
			case (dateTimeString.length === 12): // "YYYYMMDDHHMM"
				parser = /(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})/ig;

				if(fractionPointPosition !== (-1))
				{
					let fractionResult = 60 * fractionPart;
					this.second = Math.floor(fractionResult);

					fractionResult = 1000 * (fractionResult - this.second);
					this.millisecond = Math.floor(fractionResult);
				}
				break;
			case (dateTimeString.length === 14): // "YYYYMMDDHHMMSS"
				parser = /(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/ig;

				if(fractionPointPosition !== (-1))
				{
					const fractionResult = 1000 * fractionPart;
					this.millisecond = Math.floor(fractionResult);
				}
				break;
			default:
				throw new Error("Wrong input string for convertion");
		}
		//endregion

		//region Put parsed values at right places
		const parserArray = parser.exec(dateTimeString);
		if(parserArray === null)
			throw new Error("Wrong input string for convertion");

		for(let j = 1; j < parserArray.length; j++)
		{
			switch(j)
			{
				case 1:
					this.year = parseInt(parserArray[j], 10);
					break;
				case 2:
					this.month = parseInt(parserArray[j], 10);
					break;
				case 3:
					this.day = parseInt(parserArray[j], 10);
					break;
				case 4:
					this.hour = parseInt(parserArray[j], 10) + hourDifference;
					break;
				case 5:
					this.minute = parseInt(parserArray[j], 10) + minuteDifference;
					break;
				case 6:
					this.second = parseInt(parserArray[j], 10);
					break;
				default:
					throw new Error("Wrong input string for convertion");
			}
		}
		//endregion

		//region Get final date
		if(isUTC === false)
		{
			const tempDate = new Date(this.year, this.month, this.day, this.hour, this.minute, this.second, this.millisecond);

			this.year = tempDate.getUTCFullYear();
			this.month = tempDate.getUTCMonth();
			this.day = tempDate.getUTCDay();
			this.hour = tempDate.getUTCHours();
			this.minute = tempDate.getUTCMinutes();
			this.second = tempDate.getUTCSeconds();
			this.millisecond = tempDate.getUTCMilliseconds();
		}
		//endregion
	}
	//**********************************************************************************
	/**
	 * Function converting ASN.1 internal class into JavaScript string
	 * @returns {string}
	 */
	toString()
	{
		const outputArray = [];

		outputArray.push(padNumber(this.year, 4));
		outputArray.push(padNumber(this.month, 2));
		outputArray.push(padNumber(this.day, 2));
		outputArray.push(padNumber(this.hour, 2));
		outputArray.push(padNumber(this.minute, 2));
		outputArray.push(padNumber(this.second, 2));
		if(this.millisecond !== 0)
		{
			outputArray.push(".");
			outputArray.push(padNumber(this.millisecond, 3));
		}
		outputArray.push("Z");

		return outputArray.join("");
	}
	//**********************************************************************************
	/**
	 * Aux function, need to get a block name. Need to have it here for inhiritence
	 * @returns {string}
	 */
	static blockName()
	{
		return "GeneralizedTime";
	}
	//**********************************************************************************
	/**
	 * Convertion for the block to JSON object
	 * @returns {Object}
	 */
	toJSON()
	{
		let object = {};
		
		//region Seems at the moment (Sep 2016) there is no way how to check method is supported in "super" object
		try
		{
			object = super.toJSON();
		}
		catch(ex){}
		//endregion

		object.year = this.year;
		object.month = this.month;
		object.day = this.day;
		object.hour = this.hour;
		object.minute = this.minute;
		object.second = this.second;
		object.millisecond = this.millisecond;

		return object;
	}
	//**********************************************************************************
}
//**************************************************************************************
/**
 * @extends Utf8String
 */
class DATE extends Utf8String
{
	//**********************************************************************************
	/**
	 * Constructor for "DATE" class
	 * @param {Object} [parameters={}]
	 */
	constructor(parameters = {})
	{
		super(parameters);

		this.idBlock.tagClass = 1; // UNIVERSAL
		this.idBlock.tagNumber = 31; // DATE
	}
	//**********************************************************************************
	/**
	 * Aux function, need to get a block name. Need to have it here for inhiritence
	 * @returns {string}
	 */
	static blockName()
	{
		return "DATE";
	}
	//**********************************************************************************
}
//**************************************************************************************
/**
 * @extends Utf8String
 */
class TimeOfDay extends Utf8String
{
	//**********************************************************************************
	/**
	 * Constructor for "TimeOfDay" class
	 * @param {Object} [parameters={}]
	 */
	constructor(parameters = {})
	{
		super(parameters);

		this.idBlock.tagClass = 1; // UNIVERSAL
		this.idBlock.tagNumber = 32; // TimeOfDay
	}
	//**********************************************************************************
	/**
	 * Aux function, need to get a block name. Need to have it here for inhiritence
	 * @returns {string}
	 */
	static blockName()
	{
		return "TimeOfDay";
	}
	//**********************************************************************************
}
//**************************************************************************************
/**
 * @extends Utf8String
 */
class DateTime extends Utf8String
{
	//**********************************************************************************
	/**
	 * Constructor for "DateTime" class
	 * @param {Object} [parameters={}]
	 */
	constructor(parameters = {})
	{
		super(parameters);

		this.idBlock.tagClass = 1; // UNIVERSAL
		this.idBlock.tagNumber = 33; // DateTime
	}
	//**********************************************************************************
	/**
	 * Aux function, need to get a block name. Need to have it here for inhiritence
	 * @returns {string}
	 */
	static blockName()
	{
		return "DateTime";
	}
	//**********************************************************************************
}
//**************************************************************************************
/**
 * @extends Utf8String
 */
class Duration extends Utf8String
{
	//**********************************************************************************
	/**
	 * Constructor for "Duration" class
	 * @param {Object} [parameters={}]
	 */
	constructor(parameters = {})
	{
		super(parameters);

		this.idBlock.tagClass = 1; // UNIVERSAL
		this.idBlock.tagNumber = 34; // Duration
	}
	//**********************************************************************************
	/**
	 * Aux function, need to get a block name. Need to have it here for inhiritence
	 * @returns {string}
	 */
	static blockName()
	{
		return "Duration";
	}
	//**********************************************************************************
}
//**************************************************************************************
/**
 * @extends Utf8String
 */
class TIME extends Utf8String
{
	//**********************************************************************************
	/**
	 * Constructor for "Time" class
	 * @param {Object} [parameters={}]
	 */
	constructor(parameters = {})
	{
		super(parameters);

		this.idBlock.tagClass = 1; // UNIVERSAL
		this.idBlock.tagNumber = 14; // Time
	}
	//**********************************************************************************
	/**
	 * Aux function, need to get a block name. Need to have it here for inhiritence
	 * @returns {string}
	 */
	static blockName()
	{
		return "TIME";
	}
	//**********************************************************************************
}
//**************************************************************************************
//endregion
//**************************************************************************************
//region Declaration of special ASN.1 schema type Choice
//**************************************************************************************
class Choice
{
	//**********************************************************************************
	/**
	 * Constructor for "Choice" class
	 * @param {Object} [parameters={}]
	 * @property {Array} [value] Array of ASN.1 types for make a choice from
	 * @property {boolean} [optional]
	 */
	constructor(parameters = {})
	{
		this.value = getParametersValue(parameters, "value", []);
		this.optional = getParametersValue(parameters, "optional", false);
	}
	//**********************************************************************************
}
//**************************************************************************************
//endregion
//**************************************************************************************
//region Declaration of special ASN.1 schema type Any
//**************************************************************************************
class Any
{
	//**********************************************************************************
	/**
	 * Constructor for "Any" class
	 * @param {Object} [parameters={}]
	 * @property {string} [name]
	 * @property {boolean} [optional]
	 */
	constructor(parameters = {})
	{
		this.name = getParametersValue(parameters, "name", "");
		this.optional = getParametersValue(parameters, "optional", false);
	}
	//**********************************************************************************
}
//**************************************************************************************
//endregion
//**************************************************************************************
//region Declaration of special ASN.1 schema type Repeated
//**************************************************************************************
class Repeated
{
	//**********************************************************************************
	/**
	 * Constructor for "Repeated" class
	 * @param {Object} [parameters={}]
	 * @property {string} [name]
	 * @property {boolean} [optional]
	 */
	constructor(parameters = {})
	{
		this.name = getParametersValue(parameters, "name", "");
		this.optional = getParametersValue(parameters, "optional", false);
		this.value = getParametersValue(parameters, "value", new Any());
		this.local = getParametersValue(parameters, "local", false); // Could local or global array to store elements
	}
	//**********************************************************************************
}
//**************************************************************************************
//endregion
//**************************************************************************************
//region Declaration of special ASN.1 schema type RawData
//**************************************************************************************
/**
 * @description Special class providing ability to have "toBER/fromBER" for raw ArrayBuffer
 */
class RawData
{
	//**********************************************************************************
	/**
	 * Constructor for "Repeated" class
	 * @param {Object} [parameters={}]
	 * @property {string} [name]
	 * @property {boolean} [optional]
	 */
	constructor(parameters = {})
	{
		this.data = getParametersValue(parameters, "data", new ArrayBuffer(0));
	}
	//**********************************************************************************
	/**
	 * Base function for converting block from BER encoded array of bytes
	 * @param {!ArrayBuffer} inputBuffer ASN.1 BER encoded array
	 * @param {!number} inputOffset Offset in ASN.1 BER encoded array where decoding should be started
	 * @param {!number} inputLength Maximum length of array of bytes which can be using in this function
	 * @returns {number} Offset after least decoded byte
	 */
	fromBER(inputBuffer, inputOffset, inputLength)
	{
		this.data = inputBuffer.slice(inputOffset, inputLength);
		return (inputOffset + inputLength);
	}
	//**********************************************************************************
	/**
	 * Encoding of current ASN.1 block into ASN.1 encoded array (BER rules)
	 * @param {boolean} [sizeOnly=false] Flag that we need only a size of encoding, not a real array of bytes
	 * @returns {ArrayBuffer}
	 */
	toBER(sizeOnly = false)
	{
		return this.data;
	}
	//**********************************************************************************
}
//**************************************************************************************
//endregion
//**************************************************************************************
//region Major ASN.1 BER decoding function
//**************************************************************************************
/**
 * Internal library function for decoding ASN.1 BER
 * @param {!ArrayBuffer} inputBuffer ASN.1 BER encoded array
 * @param {!number} inputOffset Offset in ASN.1 BER encoded array where decoding should be started
 * @param {!number} inputLength Maximum length of array of bytes which can be using in this function
 * @returns {{offset: number, result: Object}}
 */
function LocalFromBER(inputBuffer, inputOffset, inputLength)
{
	const incomingOffset = inputOffset; // Need to store initial offset since "inputOffset" is changing in the function

	//region Local function changing a type for ASN.1 classes
	function localChangeType(inputObject, newType)
	{
		if(inputObject instanceof newType)
			return inputObject;

		const newObject = new newType();
		newObject.idBlock = inputObject.idBlock;
		newObject.lenBlock = inputObject.lenBlock;
		newObject.warnings = inputObject.warnings;
		//noinspection JSCheckFunctionSignatures
		newObject.valueBeforeDecode = inputObject.valueBeforeDecode.slice(0);

		return newObject;
	}
	//endregion

	//region Create a basic ASN.1 type since we need to return errors and warnings from the function
	let returnObject = new BaseBlock({}, Object);
	//endregion

	//region Basic check for parameters
	const baseBlock = new LocalBaseBlock();
	if(checkBufferParams(baseBlock, inputBuffer, inputOffset, inputLength) === false)
	{
		returnObject.error = baseBlock.error;
		return {
			offset: (-1),
			result: returnObject
		};
	}
	//endregion

	//region Getting Uint8Array from ArrayBuffer
	const intBuffer = new Uint8Array(inputBuffer, inputOffset, inputLength);
	//endregion

	//region Initial checks
	if(intBuffer.length === 0)
	{
		this.error = "Zero buffer length";
		return {
			offset: (-1),
			result: returnObject
		};
	}
	//endregion

	//region Decode indentifcation block of ASN.1 BER structure
	let resultOffset = returnObject.idBlock.fromBER(inputBuffer, inputOffset, inputLength);
	returnObject.warnings.concat(returnObject.idBlock.warnings);
	if(resultOffset === (-1))
	{
		returnObject.error = returnObject.idBlock.error;
		return {
			offset: (-1),
			result: returnObject
		};
	}

	inputOffset = resultOffset;
	inputLength -= returnObject.idBlock.blockLength;
	//endregion

	//region Decode length block of ASN.1 BER structure
	resultOffset = returnObject.lenBlock.fromBER(inputBuffer, inputOffset, inputLength);
	returnObject.warnings.concat(returnObject.lenBlock.warnings);
	if(resultOffset === (-1))
	{
		returnObject.error = returnObject.lenBlock.error;
		return {
			offset: (-1),
			result: returnObject
		};
	}

	inputOffset = resultOffset;
	inputLength -= returnObject.lenBlock.blockLength;
	//endregion

	//region Check for usign indefinite length form in encoding for primitive types
	if((returnObject.idBlock.isConstructed === false) &&
		(returnObject.lenBlock.isIndefiniteForm === true))
	{
		returnObject.error = "Indefinite length form used for primitive encoding form";
		return {
			offset: (-1),
			result: returnObject
		};
	}
	//endregion

	//region Switch ASN.1 block type
	let newASN1Type = BaseBlock;

	switch(returnObject.idBlock.tagClass)
	{
		//region UNIVERSAL
		case 1:
			//region Check for reserved tag numbers
			if((returnObject.idBlock.tagNumber >= 37) &&
				(returnObject.idBlock.isHexOnly === false))
			{
				returnObject.error = "UNIVERSAL 37 and upper tags are reserved by ASN.1 standard";
				return {
					offset: (-1),
					result: returnObject
				};
			}
			//endregion

			switch(returnObject.idBlock.tagNumber)
			{
				//region EndOfContent type
				case 0:
					//region Check for EndOfContent type
					if((returnObject.idBlock.isConstructed === true) &&
						(returnObject.lenBlock.length > 0))
					{
						returnObject.error = "Type [UNIVERSAL 0] is reserved";
						return {
							offset: (-1),
							result: returnObject
						};
					}
					//endregion

					newASN1Type = EndOfContent;

					break;
				//endregion
				//region Boolean type
				case 1:
					newASN1Type = Boolean;
					break;
				//endregion
				//region Integer type
				case 2:
					newASN1Type = Integer;
					break;
				//endregion
				//region BitString type
				case 3:
					newASN1Type = BitString;
					break;
				//endregion
				//region OctetString type
				case 4:
					newASN1Type = OctetString;
					break;
				//endregion
				//region Null type
				case 5:
					newASN1Type = Null;
					break;
				//endregion
				//region OBJECT IDENTIFIER type
				case 6:
					newASN1Type = ObjectIdentifier;
					break;
				//endregion
				//region Enumerated type
				case 10:
					newASN1Type = Enumerated;
					break;
				//endregion
				//region Utf8String type
				case 12:
					newASN1Type = Utf8String;
					break;
				//endregion
				//region Time type
				//region RELATIVE OBJECT IDENTIFIER type
				case 13:
					newASN1Type = RelativeObjectIdentifier;
					break;
				//endregion
				case 14:
					newASN1Type = TIME;
					break;
				//endregion
				//region ASN.1 reserved type
				case 15:
					returnObject.error = "[UNIVERSAL 15] is reserved by ASN.1 standard";
					return {
						offset: (-1),
						result: returnObject
					};
				//endregion
				//region Sequence type
				case 16:
					newASN1Type = Sequence;
					break;
				//endregion
				//region Set type
				case 17:
					newASN1Type = Set;
					break;
				//endregion
				//region NumericString type
				case 18:
					newASN1Type = NumericString;
					break;
				//endregion
				//region PrintableString type
				case 19:
					newASN1Type = PrintableString;
					break;
				//endregion
				//region TeletexString type
				case 20:
					newASN1Type = TeletexString;
					break;
				//endregion
				//region VideotexString type
				case 21:
					newASN1Type = VideotexString;
					break;
				//endregion
				//region IA5String type
				case 22:
					newASN1Type = IA5String;
					break;
				//endregion
				//region UTCTime type
				case 23:
					newASN1Type = UTCTime;
					break;
				//endregion
				//region GeneralizedTime type
				case 24:
					newASN1Type = GeneralizedTime;
					break;
				//endregion
				//region GraphicString type
				case 25:
					newASN1Type = GraphicString;
					break;
				//endregion
				//region VisibleString type
				case 26:
					newASN1Type = VisibleString;
					break;
				//endregion
				//region GeneralString type
				case 27:
					newASN1Type = GeneralString;
					break;
				//endregion
				//region UniversalString type
				case 28:
					newASN1Type = UniversalString;
					break;
				//endregion
				//region CharacterString type
				case 29:
					newASN1Type = CharacterString;
					break;
				//endregion
				//region BmpString type
				case 30:
					newASN1Type = BmpString;
					break;
				//endregion
				//region DATE type
				case 31:
					newASN1Type = DATE;
					break;
				//endregion
				//region TimeOfDay type
				case 32:
					newASN1Type = TimeOfDay;
					break;
				//endregion
				//region Date-Time type
				case 33:
					newASN1Type = DateTime;
					break;
				//endregion
				//region Duration type
				case 34:
					newASN1Type = Duration;
					break;
				//endregion
				//region default
				default:
					{
						let newObject;

						if(returnObject.idBlock.isConstructed === true)
							newObject = new Constructed();
						else
							newObject = new Primitive();

						newObject.idBlock = returnObject.idBlock;
						newObject.lenBlock = returnObject.lenBlock;
						newObject.warnings = returnObject.warnings;

						returnObject = newObject;

						resultOffset = returnObject.fromBER(inputBuffer, inputOffset, inputLength);
					}
				//endregion
			}
			break;
		//endregion
		//region All other tag classes
		case 2: // APPLICATION
		case 3: // CONTEXT-SPECIFIC
		case 4: // PRIVATE
		default:
			{
				if(returnObject.idBlock.isConstructed === true)
					newASN1Type = Constructed;
				else
					newASN1Type = Primitive;
			}
		//endregion
	}
	//endregion

	//region Change type and perform BER decoding
	returnObject = localChangeType(returnObject, newASN1Type);
	resultOffset = returnObject.fromBER(inputBuffer, inputOffset, (returnObject.lenBlock.isIndefiniteForm === true) ? inputLength : returnObject.lenBlock.length);
	//endregion

	//region Coping incoming buffer for entire ASN.1 block
	returnObject.valueBeforeDecode = inputBuffer.slice(incomingOffset, incomingOffset + returnObject.blockLength);
	//endregion

	return {
		offset: resultOffset,
		result: returnObject
	};
}
//**************************************************************************************
/**
 * Major function for decoding ASN.1 BER array into internal library structuries
 * @param {!ArrayBuffer} inputBuffer ASN.1 BER encoded array of bytes
 */
function fromBER(inputBuffer)
{
	if(inputBuffer.byteLength === 0)
	{
		const result = new BaseBlock({}, Object);
		result.error = "Input buffer has zero length";

		return {
			offset: (-1),
			result
		};
	}

	return LocalFromBER(inputBuffer, 0, inputBuffer.byteLength);
}
//**************************************************************************************
//endregion
//**************************************************************************************
//region Major scheme verification function
//**************************************************************************************
/**
 * Compare of two ASN.1 object trees
 * @param {!Object} root Root of input ASN.1 object tree
 * @param {!Object} inputData Input ASN.1 object tree
 * @param {!Object} inputSchema Input ASN.1 schema to compare with
 * @return {{verified: boolean}|{verified:boolean, result: Object}}
 */
function compareSchema(root, inputData, inputSchema)
{
	//region Special case for Choice schema element type
	if(inputSchema instanceof Choice)
	{
		const choiceResult = false;

		for(let j = 0; j < inputSchema.value.length; j++)
		{
			const result = compareSchema(root, inputData, inputSchema.value[j]);
			if(result.verified === true)
			{
				return {
					verified: true,
					result: root
				};
			}
		}

		if(choiceResult === false)
		{
			const _result = {
				verified: false,
				result: {
					error: "Wrong values for Choice type"
				}
			};

			if(inputSchema.hasOwnProperty("name"))
				_result.name = inputSchema.name;

			return _result;
		}
	}
	//endregion

	//region Special case for Any schema element type
	if(inputSchema instanceof Any)
	{
		//region Add named component of ASN.1 schema
		if(inputSchema.hasOwnProperty("name"))
			root[inputSchema.name] = inputData;
		//endregion

		return {
			verified: true,
			result: root
		};
	}
	//endregion

	//region Initial check
	if((root instanceof Object) === false)
	{
		return {
			verified: false,
			result: { error: "Wrong root object" }
		};
	}

	if((inputData instanceof Object) === false)
	{
		return {
			verified: false,
			result: { error: "Wrong ASN.1 data" }
		};
	}

	if((inputSchema instanceof Object) === false)
	{
		return {
			verified: false,
			result: { error: "Wrong ASN.1 schema" }
		};
	}

	if(("idBlock" in inputSchema) === false)
	{
		return {
			verified: false,
			result: { error: "Wrong ASN.1 schema" }
		};
	}
	//endregion

	//region Comparing idBlock properties in ASN.1 data and ASN.1 schema
	//region Encode and decode ASN.1 schema idBlock
	/// <remarks>This encoding/decoding is neccessary because could be an errors in schema definition</remarks>
	if(("fromBER" in inputSchema.idBlock) === false)
	{
		return {
			verified: false,
			result: { error: "Wrong ASN.1 schema" }
		};
	}

	if(("toBER" in inputSchema.idBlock) === false)
	{
		return {
			verified: false,
			result: { error: "Wrong ASN.1 schema" }
		};
	}

	const encodedId = inputSchema.idBlock.toBER(false);
	if(encodedId.byteLength === 0)
	{
		return {
			verified: false,
			result: { error: "Error encoding idBlock for ASN.1 schema" }
		};
	}

	const decodedOffset = inputSchema.idBlock.fromBER(encodedId, 0, encodedId.byteLength);
	if(decodedOffset === (-1))
	{
		return {
			verified: false,
			result: { error: "Error decoding idBlock for ASN.1 schema" }
		};
	}
	//endregion

	//region tagClass
	if(inputSchema.idBlock.hasOwnProperty("tagClass") === false)
	{
		return {
			verified: false,
			result: { error: "Wrong ASN.1 schema" }
		};
	}

	if(inputSchema.idBlock.tagClass !== inputData.idBlock.tagClass)
	{
		return {
			verified: false,
			result: root
		};
	}
	//endregion
	//region tagNumber
	if(inputSchema.idBlock.hasOwnProperty("tagNumber") === false)
	{
		return {
			verified: false,
			result: { error: "Wrong ASN.1 schema" }
		};
	}

	if(inputSchema.idBlock.tagNumber !== inputData.idBlock.tagNumber)
	{
		return {
			verified: false,
			result: root
		};
	}
	//endregion
	//region isConstructed
	if(inputSchema.idBlock.hasOwnProperty("isConstructed") === false)
	{
		return {
			verified: false,
			result: { error: "Wrong ASN.1 schema" }
		};
	}

	if(inputSchema.idBlock.isConstructed !== inputData.idBlock.isConstructed)
	{
		return {
			verified: false,
			result: root
		};
	}
	//endregion
	//region isHexOnly
	if(("isHexOnly" in inputSchema.idBlock) === false) // Since 'isHexOnly' is an inhirited property
	{
		return {
			verified: false,
			result: { error: "Wrong ASN.1 schema" }
		};
	}

	if(inputSchema.idBlock.isHexOnly !== inputData.idBlock.isHexOnly)
	{
		return {
			verified: false,
			result: root
		};
	}
	//endregion
	//region valueHex
	if(inputSchema.idBlock.isHexOnly === true)
	{
		if(("valueHex" in inputSchema.idBlock) === false) // Since 'valueHex' is an inhirited property
		{
			return {
				verified: false,
				result: { error: "Wrong ASN.1 schema" }
			};
		}

		const schemaView = new Uint8Array(inputSchema.idBlock.valueHex);
		const asn1View = new Uint8Array(inputData.idBlock.valueHex);

		if(schemaView.length !== asn1View.length)
		{
			return {
				verified: false,
				result: root
			};
		}

		for(let i = 0; i < schemaView.length; i++)
		{
			if(schemaView[i] !== asn1View[1])
			{
				return {
					verified: false,
					result: root
				};
			}
		}
	}
	//endregion
	//endregion

	//region Add named component of ASN.1 schema
	if(inputSchema.hasOwnProperty("name"))
	{
		inputSchema.name = inputSchema.name.replace(/^\s+|\s+$/g, "");
		if(inputSchema.name !== "")
			root[inputSchema.name] = inputData;
	}
	//endregion

	//region Getting next ASN.1 block for comparition
	if(inputSchema.idBlock.isConstructed === true)
	{
		let admission = 0;
		let result = { verified: false };

		let maxLength = inputSchema.valueBlock.value.length;

		if(maxLength > 0)
		{
			if(inputSchema.valueBlock.value[0] instanceof Repeated)
				maxLength = inputData.valueBlock.value.length;
		}

		//region Special case when constructive value has no elements
		if(maxLength === 0)
		{
			return {
				verified: true,
				result: root
			};
		}
		//endregion

		//region Special case when "inputData" has no values and "inputSchema" has all optional values
		if((inputData.valueBlock.value.length === 0) &&
			(inputSchema.valueBlock.value.length !== 0))
		{
			let _optional = true;

			for(let i = 0; i < inputSchema.valueBlock.value.length; i++)
				_optional = _optional && (inputSchema.valueBlock.value[i].optional || false);

			if(_optional === true)
			{
				return {
					verified: true,
					result: root
				};
			}

			//region Delete early added name of block
			if(inputSchema.hasOwnProperty("name"))
			{
				inputSchema.name = inputSchema.name.replace(/^\s+|\s+$/g, "");
				if(inputSchema.name !== "")
					delete root[inputSchema.name];
			}
			//endregion

			root.error = "Inconsistent object length";

			return {
				verified: false,
				result: root
			};
		}
		//endregion

		for(let i = 0; i < maxLength; i++)
		{
			//region Special case when there is an "optional" element of ASN.1 schema at the end
			if((i - admission) >= inputData.valueBlock.value.length)
			{
				if(inputSchema.valueBlock.value[i].optional === false)
				{
					const _result = {
						verified: false,
						result: root
					};

					root.error = "Inconsistent length between ASN.1 data and schema";

					//region Delete early added name of block
					if(inputSchema.hasOwnProperty("name"))
					{
						inputSchema.name = inputSchema.name.replace(/^\s+|\s+$/g, "");
						if(inputSchema.name !== "")
						{
							delete root[inputSchema.name];
							_result.name = inputSchema.name;
						}
					}
					//endregion

					return _result;
				}
			}
			//endregion
			else
			{
				//region Special case for Repeated type of ASN.1 schema element
				if(inputSchema.valueBlock.value[0] instanceof Repeated)
				{
					result = compareSchema(root, inputData.valueBlock.value[i], inputSchema.valueBlock.value[0].value);
					if(result.verified === false)
					{
						if(inputSchema.valueBlock.value[0].optional === true)
							admission++;
						else
						{
							//region Delete early added name of block
							if(inputSchema.hasOwnProperty("name"))
							{
								inputSchema.name = inputSchema.name.replace(/^\s+|\s+$/g, "");
								if(inputSchema.name !== "")
									delete root[inputSchema.name];
							}
							//endregion

							return result;
						}
					}

					if(("name" in inputSchema.valueBlock.value[0]) && (inputSchema.valueBlock.value[0].name.length > 0))
					{
						let arrayRoot = {};

						if(("local" in inputSchema.valueBlock.value[0]) && (inputSchema.valueBlock.value[0].local === true))
							arrayRoot = inputData;
						else
							arrayRoot = root;

						if(typeof arrayRoot[inputSchema.valueBlock.value[0].name] === "undefined")
							arrayRoot[inputSchema.valueBlock.value[0].name] = [];

						arrayRoot[inputSchema.valueBlock.value[0].name].push(inputData.valueBlock.value[i]);
					}
				}
				//endregion
				else
				{
					result = compareSchema(root, inputData.valueBlock.value[i - admission], inputSchema.valueBlock.value[i]);
					if(result.verified === false)
					{
						if(inputSchema.valueBlock.value[i].optional === true)
							admission++;
						else
						{
							//region Delete early added name of block
							if(inputSchema.hasOwnProperty("name"))
							{
								inputSchema.name = inputSchema.name.replace(/^\s+|\s+$/g, "");
								if(inputSchema.name !== "")
									delete root[inputSchema.name];
							}
							//endregion

							return result;
						}
					}
				}
			}
		}

		if(result.verified === false) // The situation may take place if last element is "optional" and verification failed
		{
			const _result = {
				verified: false,
				result: root
			};

			//region Delete early added name of block
			if(inputSchema.hasOwnProperty("name"))
			{
				inputSchema.name = inputSchema.name.replace(/^\s+|\s+$/g, "");
				if(inputSchema.name !== "")
				{
					delete root[inputSchema.name];
					_result.name = inputSchema.name;
				}
			}
			//endregion

			return _result;
		}

		return {
			verified: true,
			result: root
		};
	}
	//endregion
	//region Ability to parse internal value for primitive-encoded value (value of OctetString, for example)
	if(("primitiveSchema" in inputSchema) &&
		("valueHex" in inputData.valueBlock))
	{
		//region Decoding of raw ASN.1 data
		const asn1 = fromBER(inputData.valueBlock.valueHex);
		if(asn1.offset === (-1))
		{
			const _result = {
				verified: false,
				result: asn1.result
			};

			//region Delete early added name of block
			if(inputSchema.hasOwnProperty("name"))
			{
				inputSchema.name = inputSchema.name.replace(/^\s+|\s+$/g, "");
				if(inputSchema.name !== "")
				{
					delete root[inputSchema.name];
					_result.name = inputSchema.name;
				}
			}
			//endregion

			return _result;
		}
		//endregion

		return compareSchema(root, asn1.result, inputSchema.primitiveSchema);
	}

	return {
		verified: true,
		result: root
	};
	//endregion
}
//**************************************************************************************
//noinspection JSUnusedGlobalSymbols
/**
 * ASN.1 schema verification for ArrayBuffer data
 * @param {!ArrayBuffer} inputBuffer Input BER-encoded ASN.1 data
 * @param {!Object} inputSchema Input ASN.1 schema to verify against to
 * @return {{verified: boolean}|{verified:boolean, result: Object}}
 */
function verifySchema(inputBuffer, inputSchema)
{
	//region Initial check
	if((inputSchema instanceof Object) === false)
	{
		return {
			verified: false,
			result: { error: "Wrong ASN.1 schema type" }
		};
	}
	//endregion

	//region Decoding of raw ASN.1 data
	const asn1 = fromBER(inputBuffer);
	if(asn1.offset === (-1))
	{
		return {
			verified: false,
			result: asn1.result
		};
	}
	//endregion

	//region Compare ASN.1 struct with input schema
	return compareSchema(asn1.result, asn1.result, inputSchema);
	//endregion
}
//**************************************************************************************
//endregion
//**************************************************************************************
//region Major function converting JSON to ASN.1 objects
//**************************************************************************************
//noinspection JSUnusedGlobalSymbols
/**
 * Converting from JSON to ASN.1 objects
 * @param {string|Object} json JSON string or object to convert to ASN.1 objects
 */
function fromJSON(json)
{
	// TODO Implement
}
//**************************************************************************************
//endregion
//**************************************************************************************

function PrepareBuffer(buffer) {
    if (typeof Buffer !== "undefined" && Buffer.isBuffer(buffer)) {
        return new Uint8Array(buffer);
    }
    else if (ArrayBuffer.isView(buffer)) {
        return new Uint8Array(buffer.buffer, buffer.byteOffset, buffer.byteLength);
    }
    else {
        return new Uint8Array(buffer);
    }
}
class Convert {
    static ToString(buffer, enc = "utf8") {
        const buf = PrepareBuffer(buffer);
        switch (enc.toLowerCase()) {
            case "utf8":
                return this.ToUtf8String(buf);
            case "binary":
                return this.ToBinary(buf);
            case "hex":
                return this.ToHex(buf);
            case "base64":
                return this.ToBase64(buf);
            case "base64url":
                return this.ToBase64Url(buf);
            default:
                throw new Error(`Unknown type of encoding '${enc}'`);
        }
    }
    static FromString(str, enc = "utf8") {
        switch (enc.toLowerCase()) {
            case "utf8":
                return this.FromUtf8String(str);
            case "binary":
                return this.FromBinary(str);
            case "hex":
                return this.FromHex(str);
            case "base64":
                return this.FromBase64(str);
            case "base64url":
                return this.FromBase64Url(str);
            default:
                throw new Error(`Unknown type of encoding '${enc}'`);
        }
    }
    static ToBase64(buffer) {
        const buf = PrepareBuffer(buffer);
        if (typeof btoa !== "undefined") {
            const binary = this.ToString(buf, "binary");
            return btoa(binary);
        }
        else {
            return Buffer.from(buf).toString("base64");
        }
    }
    static FromBase64(base64Text) {
        base64Text = base64Text.replace(/\n/g, "").replace(/\r/g, "").replace(/\t/g, "").replace(/\s/g, "");
        if (typeof atob !== "undefined") {
            return this.FromBinary(atob(base64Text));
        }
        else {
            return new Uint8Array(Buffer.from(base64Text, "base64")).buffer;
        }
    }
    static FromBase64Url(base64url) {
        return this.FromBase64(this.Base64Padding(base64url.replace(/\-/g, "+").replace(/\_/g, "/")));
    }
    static ToBase64Url(data) {
        return this.ToBase64(data).replace(/\+/g, "-").replace(/\//g, "_").replace(/\=/g, "");
    }
    static FromUtf8String(text) {
        const s = unescape(encodeURIComponent(text));
        const uintArray = new Uint8Array(s.length);
        for (let i = 0; i < s.length; i++) {
            uintArray[i] = s.charCodeAt(i);
        }
        return uintArray.buffer;
    }
    static ToUtf8String(buffer) {
        const buf = PrepareBuffer(buffer);
        const encodedString = String.fromCharCode.apply(null, buf);
        const decodedString = decodeURIComponent(escape(encodedString));
        return decodedString;
    }
    static FromBinary(text) {
        const stringLength = text.length;
        const resultView = new Uint8Array(stringLength);
        for (let i = 0; i < stringLength; i++) {
            resultView[i] = text.charCodeAt(i);
        }
        return resultView.buffer;
    }
    static ToBinary(buffer) {
        const buf = PrepareBuffer(buffer);
        let resultString = "";
        const len = buf.length;
        for (let i = 0; i < len; i++) {
            resultString = resultString + String.fromCharCode(buf[i]);
        }
        return resultString;
    }
    static ToHex(buffer) {
        const buf = PrepareBuffer(buffer);
        const splitter = "";
        const res = [];
        const len = buf.length;
        for (let i = 0; i < len; i++) {
            const char = buf[i].toString(16);
            res.push(char.length === 1 ? "0" + char : char);
        }
        return res.join(splitter);
    }
    static FromHex(hexString) {
        const res = new Uint8Array(hexString.length / 2);
        for (let i = 0; i < hexString.length; i = i + 2) {
            const c = hexString.slice(i, i + 2);
            res[i / 2] = parseInt(c, 16);
        }
        return res.buffer;
    }
    static Base64Padding(base64) {
        const padCount = 4 - (base64.length % 4);
        if (padCount < 4) {
            for (let i = 0; i < padCount; i++) {
                base64 += "=";
            }
        }
        return base64;
    }
}

function assign(target, ...sources) {
    const res = arguments[0];
    for (let i = 1; i < arguments.length; i++) {
        const obj = arguments[i];
        for (const prop in obj) {
            res[prop] = obj[prop];
        }
    }
    return res;
}
function combine(...buf) {
    const totalByteLength = buf.map((item) => item.byteLength).reduce((prev, cur) => prev + cur);
    const res = new Uint8Array(totalByteLength);
    let currentPos = 0;
    buf.map((item) => new Uint8Array(item)).forEach((arr) => {
        for (let i = 0; i < arr.length; i++) {
            res[currentPos++] = arr[i];
        }
    });
    return res.buffer;
}
function isEqual(bytes1, bytes2) {
    if (!(bytes1 && bytes2)) {
        return false;
    }
    if (bytes1.byteLength !== bytes2.byteLength) {
        return false;
    }
    const b1 = new Uint8Array(bytes1);
    const b2 = new Uint8Array(bytes2);
    for (let i = 0; i < bytes1.byteLength; i++) {
        if (b1[i] !== b2[i]) {
            return false;
        }
    }
    return true;
}

class Basic {
    constructor(value, name) {
        this.fingerprints = {};
        this.input = value;
        this.name = name;
        this.init();
    }
    static base64Clear(base64) {
        const res = atob(base64.replace(/[\s\r\n]/g, ''));
        if (Basic.validation.isPem(res)) {
            return atob(res
                .replace(/-----.+-----/g, '')
                .replace(/[\s\r\n]/g, ''));
        }
        return res;
    }
    static pemTagCertificate(base64) {
        return `-----BEGIN CERTIFICATE-----\n${base64}\n-----END CERTIFICATE-----`;
    }
    static pemTagCertificateRequest(base64) {
        return `-----BEGIN CERTIFICATE REQUEST-----\n${base64}\n-----END CERTIFICATE REQUEST-----`;
    }
    static pemTagNewCertificateRequest(base64) {
        return `-----BEGIN NEW CERTIFICATE REQUEST-----\n${base64}\n-----END NEW CERTIFICATE REQUEST-----`;
    }
    static formatHex(value) {
        return value.replace(/(.{32})/g, '$1\n').replace(/(.{4})/g, '$1 ').trim();
    }
    init() {
        let certificateBuffer;
        if (Basic.validation.isHex(this.input)) {
            certificateBuffer = Convert.FromHex(this.input);
        }
        else {
            certificateBuffer = Convert.FromBase64(this.input);
        }
        this.schema = fromBER(certificateBuffer).result;
        this.base64 = Convert.ToBase64(certificateBuffer);
        this.hex = Basic.formatHex(Convert.ToHex(certificateBuffer));
    }
    async getFingerprint(algorithm = 'SHA-1') {
        try {
            const response = await crypto.subtle
                .digest(algorithm, this.schema.valueBeforeDecode);
            this.fingerprints[algorithm] = Convert.ToHex(response);
        }
        catch (error) {
            console.error(error);
        }
    }
    static prepareSubject(subjects) {
        if (!subjects) {
            return undefined;
        }
        const data = {};
        subjects.forEach((subject) => {
            const type = Basic.subjectOIDs[subject.type.toString()];
            const name = type && type.short ? type.short : subject.type.toString();
            data[name] = {
                nameLong: type ? type.long : '',
                oid: subject.type.toString(),
                value: subject.value.valueBlock.value.toString(),
            };
        });
        return data;
    }
    static prepareAlgorithm(algorithm) {
        if (!algorithm) {
            return { name: '' };
        }
        if (Basic.algorithmOIDs[algorithm.algorithmId]) {
            return Basic.algorithmOIDs[algorithm.algorithmId];
        }
        return {
            name: algorithm.algorithmId,
        };
    }
}
Basic.algorithmOIDs = {
    '1.2.840.113549.1.1.5': {
        name: 'RSASSA-PKCS1-v1_5',
        hash: 'SHA-1',
    },
    '1.2.840.113549.1.1.11': {
        name: 'RSASSA-PKCS1-v1_5',
        hash: 'SHA-256',
    },
    '1.2.840.113549.1.1.12': {
        name: 'RSASSA-PKCS1-v1_5',
        hash: 'SHA-384',
    },
    '1.2.840.113549.1.1.13': {
        name: 'RSASSA-PKCS1-v1_5',
        hash: 'SHA-512',
    },
    '1.2.840.113549.1.1.14': {
        name: 'RSASSA-PKCS1-v1_5',
        hash: 'SHA-224',
    },
    '1.2.840.10045.4.1': {
        name: 'ECDSA',
        hash: 'SHA-1',
    },
    '1.2.840.10045.4.2': {
        name: 'ECDSA',
        hash: 'Recommended',
    },
    '1.2.840.10045.4.3': {
        name: 'ECDSA',
        hash: 'Specified',
    },
    '1.2.840.10045.4.3.1': {
        name: 'ECDSA',
        hash: 'SHA-224',
    },
    '1.2.840.10045.4.3.2': {
        name: 'ECDSA',
        hash: 'SHA-256',
    },
    '1.2.840.10045.4.3.3': {
        name: 'ECDSA',
        hash: 'SHA-384',
    },
    '1.2.840.10045.4.3.4': {
        name: 'ECDSA',
        hash: 'SHA-512',
    },
};
Basic.subjectOIDs = {
    '2.5.4.3': {
        short: 'CN',
        long: 'Common Name',
    },
    '2.5.4.6': {
        short: 'C',
        long: 'Country',
    },
    '2.5.4.5': {
        short: 'serialNumber',
        long: 'Serial Number',
    },
    '0.9.2342.19200300.100.1.25': {
        short: 'DC',
        long: 'Domain Component',
    },
    '1.2.840.113549.1.9.1': {
        short: 'E',
        long: 'Email',
    },
    '2.5.4.42': {
        short: 'G',
        long: 'Given Name',
    },
    '2.5.4.43': {
        short: 'I',
        long: 'Initials',
    },
    '2.5.4.7': {
        short: 'L',
        long: 'Locality',
    },
    '2.5.4.10': {
        short: 'O',
        long: 'Organization',
    },
    '2.5.4.11': {
        short: 'OU',
        long: 'Organization Unit',
    },
    '2.5.4.8': {
        short: 'ST',
        long: 'State',
    },
    '2.5.4.9': {
        short: 'Street',
        long: 'Street Address',
    },
    '2.5.4.4': {
        short: 'SN',
        long: 'Surname',
    },
    '2.5.4.12': {
        short: 'T',
        long: 'Title',
    },
    '1.2.840.113549.1.9.8': {
        long: 'Unstructured Address',
    },
    '1.2.840.113549.1.9.2': {
        long: 'Unstructured Name',
    },
    '1.3.6.1.4.1.311.60.2.1.3': {
        short: 'jurisdictionCountry',
        long: 'Jurisdiction Country',
    },
    '2.5.4.15': {
        short: 'businessCategory',
        long: 'Business Category',
    },
    '1.3.6.1.2.1.1.5': {
        long: 'Host Name',
    },
};
Basic.logs = {
    '9606c02c690033aa1d145f59c6e2648d0549f0df96aab8db915a70d8ecf390a5': 'Akamai CT',
    '39376f545f7b4607f59742d768cd5d2437bf3473b6534a4834bcf72e681c83c9': 'Alpha CT',
    'a577ac9ced7548dd8f025b67a241089df86e0f476ec203c2ecbedb185f282638': 'CNNIC CT',
    'cdb5179b7fc1c046feea31136a3f8f002e6182faf8896fecc8b2f5b5ab604900': 'Certly.IO',
    '1fbc36e002ede97f40199e86b3573b8a4217d80187746ad0da03a06054d20df4': 'Cloudflare “Nimbus2017”',
    'db74afeecb29ecb1feca3e716d2ce5b9aabb36f7847183c75d9d4f37b61fbf64': 'Cloudflare “Nimbus2018”',
    '747eda8331ad331091219cce254f4270c2bffd5e422008c6373579e6107bcc56': 'Cloudflare “Nimbus2019”',
    '5ea773f9df56c0e7b536487dd049e0327a919a0c84a112128418759681714558': 'Cloudflare “Nimbus2020”',
    '4494652eb0eeceafc44007d8a8fe28c0dae682bed8cb31b53fd33396b5b681a8': 'Cloudflare “Nimbus2021”',
    '41c8cab1df22464a10c6a13a0942875e4e318b1b03ebeb4bc768f090629606f6': 'Cloudflare “Nimbus2022”',
    '7a328c54d8b72db620ea38e0521ee98416703213854d3bd22bc13a57a352eb52': 'Cloudflare “Nimbus2023”',
    '6ff141b5647e4222f7ef052cefae7c21fd608e27d2af5a6e9f4b8a37d6633ee5': 'DigiCert Nessie2018',
    'fe446108b1d01ab78a62ccfeab6ab2b2babff3abdad80a4d8b30df2d0008830c': 'DigiCert Nessie2019',
    'c652a0ec48ceb3fcab170992c43a87413309e80065a26252401ba3362a17c565': 'DigiCert Nessie2020',
    'eec095ee8d72640f92e3c3b91bc712a3696a097b4b6a1a1438e647b2cbedc5f9': 'DigiCert Nessie2021',
    '51a3b0f5fd01799c566db837788f0ca47acc1b27cbf79e88429a0dfed48b05e5': 'DigiCert Nessie2022',
    'b3737707e18450f86386d605a9dc11094a792db1670c0b87dcf0030e7936a59a': 'DigiCert Nessie2023',
    '5614069a2fd7c2ecd3f5e1bd44b23ec74676b9bc99115cc0ef949855d689d0dd': 'DigiCert Server',
    '8775bfe7597cf88c43995fbdf36eff568d475636ff4ab560c1b4eaff5ea0830f': 'DigiCert Server 2',
    'c1164ae0a772d2d4392dc80ac10770d4f0c49bde991a4840c1fa075164f63360': 'DigiCert Yeti2018',
    'e2694bae26e8e94009e8861bb63b83d43ee7fe7488fba48f2893019dddf1dbfe': 'DigiCert Yeti2019',
    'f095a459f200d18240102d2f93888ead4bfe1d47e399e1d034a6b0a8aa8eb273': 'DigiCert Yeti2020',
    '5cdc4392fee6ab4544b15e9ad456e61037fbd5fa47dca17394b25ee6f6c70eca': 'DigiCert Yeti2021',
    '2245450759552456963fa12ff1f76d86e0232663adc04b7f5dc6835c6ee20f02': 'DigiCert Yeti2022',
    '35cf191bbfb16c57bf0fad4c6d42cbbbb627202651ea3fe12aefa803c33bd64c': 'DigiCert Yeti2023',
    '717ea7420975be84a2723553f1777c26dd51af4e102144094d9019b462fb6668': 'GDCA 1',
    '14308d90ccd030135005c01ca526d81e84e87624e39b6248e08f724aea3bb42a': 'GDCA 2',
    'c9cf890a21109c666cc17a3ed065c930d0e0135a9feba85af14210b8072421aa': 'GDCA CT #1',
    '924a30f909336ff435d6993a10ac75a2c641728e7fc2d659ae6188ffad40ce01': 'GDCA CT #2',
    'fad4c97cc49ee2f8ac85c5ea5cea09d0220dbbf4e49c6b50662ff868f86b8c28': 'Google “Argon2017”',
    'a4501269055a15545e6211ab37bc103f62ae5576a45e4b1714453e1b22106a25': 'Google “Argon2018”',
    '63f2dbcde83bcc2ccf0b728427576b33a48d61778fbd75a638b1c768544bd88d': 'Google “Argon2019”',
    'b21e05cc8ba2cd8a204e8766f92bb98a2520676bdafa70e7b249532def8b905e': 'Google “Argon2020”',
    'f65c942fd1773022145418083094568ee34d131933bfdf0c2f200bcc4ef164e3': 'Google “Argon2021”',
    '2979bef09e393921f056739f63a577e5be577d9c600af8f94d5d265c255dc784': 'Google “Argon2022”',
    '68f698f81f6482be3a8ceeb9281d4cfc71515d6793d444d10a67acbb4f4ffbc4': 'Google “Aviator”',
    'c3bf03a7e1ca8841c607bae3ff4270fca5ec45b186ebbe4e2cf3fc778630f5f6': 'Google “Crucible”',
    '1d024b8eb1498b344dfd87ea3efc0996f7506f235d1d497061a4773c439c25fb': 'Google “Daedalus”',
    '293c519654c83965baaa50fc5807d4b76fbf587a2972dca4c30cf4e54547f478': 'Google “Icarus”',
    'a4b90990b418581487bb13a2cc67700a3c359804f91bdfb8e377cd0ec80ddc10': 'Google “Pilot”',
    'ee4bbdb775ce60bae142691fabe19e66a30f7e5fb072d88300c47b897aa8fdcb': 'Google “Rocketeer”',
    'bbd9dfbc1f8a71b593942397aa927b473857950aab52e81a909664368e1ed185': 'Google “Skydiver”',
    '52eb4b225ec896974850675f23e43bc1d021e3214ce52ecd5fa87c203cdfca03': 'Google “Solera2018”',
    '0b760e9a8b9a682f88985b15e947501a56446bba8830785c3842994386450c00': 'Google “Solera2019”',
    '1fc72ce5a1b799f400c359bff96ca3913548e8644220610952e9ba1774f7bac7': 'Google “Solera2020”',
    'a3c99845e80ab7ce00157b3742df0207dd272b2b602ecf98ee2c12db9c5ae7e7': 'Google “Solera2021”',
    '697aafca1a6b536fae21205046debad7e0eaea13d2432e6e9d8fb379f2b9aaf3': 'Google “Solera2022”',
    'a899d8780c9290aaf462f31880ccfbd52451e970d0fbf591ef75b0d99b645681': 'Google “Submariner”',
    'b0cc83e5a5f97d6baf7c09cc284904872ac7e88b132c6350b7c6fd26e16c6c77': 'Google “Testtube”',
    'b10cd559a6d67846811f7df9a51532739ac48d703bea0323da5d38755bc0ad4e': 'Google “Xenon2018”',
    '084114980071532c16190460bcfc47fdc2653afa292c72b37ff863ae29ccc9f0': 'Google “Xenon2019”',
    '07b75c1be57d68fff1b0c61d2315c7bae6577c5794b76aeebc613a1a69d3a21c': 'Google “Xenon2020”',
    '7d3ef2f88fff88556824c2c0ca9e5289792bc50e78097f2e6a9768997e22f0d7': 'Google “Xenon2021”',
    '46a555eb75fa912030b5a28969f4f37d112c4174befd49b885abf2fc70fe6d47': 'Google “Xenon2022”',
    '7461b4a09cfb3d41d75159575b2e7649a445a8d27709b0cc564a6482b7eb41a3': 'Izenpe',
    '8941449c70742e06b9fc9ce7b116ba0024aa36d59af44f0204404f00f7ea8566': 'Izenpe “Argi”',
    '296afa2d568bca0d2ea844956ae9721fc35fa355ecda99693aafd458a71aefdd': 'Let“s Encrypt ”Clicky”',
    '537b69a3564335a9c04904e39593b2c298eb8d7a6e83023635c627248cd6b440': 'Nordu “flimsy”',
    'aae70b7f3cb8d566c86c2f16979c9f445f69ab0eb4535589b2f77a030104f3cd': 'Nordu “plausible”',
    'e0127629e90496564e3d0147984498aa48f8adb16600eb7902a1ef9909906273': 'PuChuangSiDa CT',
    'cf55e28923497c340d5206d05353aeb25834b52f1f8dc9526809f212efdd7ca6': 'SHECA CT 1',
    '32dc59c2d4c41968d56e14bc61ac8f0e45db39faf3c155aa4252f5001fa0c623': 'SHECA CT 2',
    'db76fdadac65e7d09508886e2159bd8b90352f5fead3e3dc5e22eb350acc7b98': 'Sectigo (Comodo) “Dodo” CT',
    '6f5376ac31f03119d89900a45115ff77151c11d902c10029068db2089a37d913': 'Sectigo (Comodo) “Mammoth” CT',
    '5581d4c2169036014aea0b9b573c53f0c0e43878702508172fa3aa1d0713d30c': 'Sectigo (Comodo) “Sabre” CT',
    '34bb6ad6c3df9c03eea8a499ff7891486c9d5e5cac92d01f7bfd1bce19db48ef': 'StartCom',
    'ddeb1d2b7a0d4fa6208b81ad8168707e2e8e9d01d55c888d3d11c4cdb6ecbecc': 'Symantec',
    'a7ce4a4e6207e0addee5fdaa4b1f86768767b5d002a55d47310e7e670a95eab2': 'Symantec Deneb',
    '15970488d7b997a05beb52512adee8d2e8b4a3165264121a9fabfbd5f85ad93f': 'Symantec “Sirius”',
    'bc78e1dfc5f63c684649334da10fa15f0979692009c081b4f3f6917f3ed9b8a5': 'Symantec “Vega”',
    'b0b784bc81c0ddc47544e883f05985bb9077d134d8ab88b2b2e533980b8e508b': 'Up In The Air “Behind the Sofa”',
    'ac3b9aed7fa9674757159e6d7d575672f9d98100941e9bdeffeca1313b75782d': 'Venafi',
    '03019df3fd85a69a8ebd1facc6da9ba73e469774fe77f579fc5a08b8328c1d6b': 'Venafi Gen2 CT',
    '41b2dc2e89e63ce4af1ba7bb29bf68c6dee6f9f1cc047e30dffae3b3ba259263': 'WoSign',
    '63d0006026dde10bb0601f452446965ee2b6ea2cd4fbc95ac866a550af9075b7': 'WoSign 2',
    '9e4ff73dc3ce220b69217c899e468076abf8d78636d5ccfc85a31a75628ba88b': 'WoSign CT #1',
};
Basic.validation = {
    isHex: (value) => /^\s*(?:[0-9A-Fa-f][0-9A-Fa-f]\s*)+$/.test(value),
    isPem: (value) => /-----BEGIN.+-----/.test(value),
};

//**************************************************************************************
/**
 * Class from RFC5280
 */
class AlgorithmIdentifier
{
	//**********************************************************************************
	/**
	 * Constructor for AlgorithmIdentifier class
	 * @param {Object} [parameters={}]
	 * @param {Object} [parameters.schema] asn1js parsed value to initialize the class from
	 * @property {string} [algorithmId] ObjectIdentifier for algorithm (string representation)
	 */
	constructor(parameters = {})
	{
		//region Internal properties of the object
		/**
		 * @type {string}
		 * @desc ObjectIdentifier for algorithm (string representation)
		 */
		this.algorithmId = getParametersValue(parameters, "algorithmId", AlgorithmIdentifier.defaultValues("algorithmId"));

		if("algorithmParams" in parameters)
			/**
			 * @type {Object}
			 * @desc Any algorithm parameters
			 */
			this.algorithmParams = getParametersValue(parameters, "algorithmParams", AlgorithmIdentifier.defaultValues("algorithmParams"));
		//endregion

		//region If input argument array contains "schema" for this object
		if("schema" in parameters)
			this.fromSchema(parameters.schema);
		//endregion
	}
	//**********************************************************************************
	/**
	 * Return default values for all class members
	 * @param {string} memberName String name for a class member
	 */
	static defaultValues(memberName)
	{
		switch(memberName)
		{
			case "algorithmId":
				return "";
			case "algorithmParams":
				return new Any();
			default:
				throw new Error(`Invalid member name for AlgorithmIdentifier class: ${memberName}`);
		}
	}
	//**********************************************************************************
	/**
	 * Compare values with default values for all class members
	 * @param {string} memberName String name for a class member
	 * @param {*} memberValue Value to compare with default value
	 */
	static compareWithDefault(memberName, memberValue)
	{
		switch(memberName)
		{
			case "algorithmId":
				return (memberValue === "");
			case "algorithmParams":
				return (memberValue instanceof Any);
			default:
				throw new Error(`Invalid member name for AlgorithmIdentifier class: ${memberName}`);
		}
	}
	//**********************************************************************************
	/**
	 * Return value of pre-defined ASN.1 schema for current class
	 *
	 * ASN.1 schema:
	 * ```asn1
	 * AlgorithmIdentifier  ::=  Sequence  {
	 *    algorithm               OBJECT IDENTIFIER,
	 *    parameters              ANY DEFINED BY algorithm OPTIONAL  }
	 * ```
	 *
	 * @param {Object} parameters Input parameters for the schema
	 * @returns {Object} asn1js schema object
	 */
	static schema(parameters = {})
	{
		/**
		 * @type {Object}
		 * @property {string} algorithmIdentifier ObjectIdentifier for the algorithm
		 * @property {string} algorithmParams Any algorithm parameters
		 */
		const names = getParametersValue(parameters, "names", {});

		return (new Sequence({
			name: (names.blockName || ""),
			optional: (names.optional || false),
			value: [
				new ObjectIdentifier({ name: (names.algorithmIdentifier || "") }),
				new Any({ name: (names.algorithmParams || ""), optional: true })
			]
		}));
	}
	//**********************************************************************************
	/**
	 * Convert parsed asn1js object into current class
	 * @param {!Object} schema
	 */
	fromSchema(schema)
	{
		//region Clear input data first
		clearProps(schema, [
			"algorithm",
			"params"
		]);
		//endregion
		
		//region Check the schema is valid
		const asn1 = compareSchema(schema,
			schema,
			AlgorithmIdentifier.schema({
				names: {
					algorithmIdentifier: "algorithm",
					algorithmParams: "params"
				}
			})
		);

		if(asn1.verified === false)
			throw new Error("Object's schema was not verified against input data for AlgorithmIdentifier");
		//endregion

		//region Get internal properties from parsed schema
		this.algorithmId = asn1.result.algorithm.valueBlock.toString();
		if("params" in asn1.result)
			this.algorithmParams = asn1.result.params;
		//endregion
	}
	//**********************************************************************************
	/**
	 * Convert current object to asn1js object and set correct values
	 * @returns {Object} asn1js object
	 */
	toSchema()
	{
		//region Create array for output sequence
		const outputArray = [];
		
		outputArray.push(new ObjectIdentifier({ value: this.algorithmId }));
		if(("algorithmParams" in this) && ((this.algorithmParams instanceof Any) === false))
			outputArray.push(this.algorithmParams);
		//endregion
		
		//region Construct and return new ASN.1 schema for this object
		return (new Sequence({
			value: outputArray
		}));
		//endregion
	}
	//**********************************************************************************
	/**
	 * Convertion for the class to JSON object
	 * @returns {Object}
	 */
	toJSON()
	{
		const object = {
			algorithmId: this.algorithmId
		};

		if(("algorithmParams" in this) && ((this.algorithmParams instanceof Any) === false))
			object.algorithmParams = this.algorithmParams.toJSON();

		return object;
	}
	//**********************************************************************************
	/**
	 * Check that two "AlgorithmIdentifiers" are equal
	 * @param {AlgorithmIdentifier} algorithmIdentifier
	 * @returns {boolean}
	 */
	isEqual(algorithmIdentifier)
	{
		//region Check input type
		if((algorithmIdentifier instanceof AlgorithmIdentifier) === false)
			return false;
		//endregion

		//region Check "algorithm_id"
		if(this.algorithmId !== algorithmIdentifier.algorithmId)
			return false;
		//endregion

		//region Check "algorithm_params"
		if("algorithmParams" in this)
		{
			if("algorithmParams" in algorithmIdentifier)
				return JSON.stringify(this.algorithmParams) === JSON.stringify(algorithmIdentifier.algorithmParams);

			return false;
		}

		if("algorithmParams" in algorithmIdentifier)
			return false;
		//endregion

		return true;
	}
	//**********************************************************************************
}
//**************************************************************************************

//**************************************************************************************
/**
 * Class from RFC5480
 */
class ECPublicKey
{
	//**********************************************************************************
	/**
	 * Constructor for ECCPublicKey class
	 * @param {Object} [parameters={}]
	 * @param {Object} [parameters.schema] asn1js parsed value to initialize the class from
	 */
	constructor(parameters = {})
	{
		//region Internal properties of the object
		/**
		 * @type {ArrayBuffer}
		 * @desc type
		 */
		this.x = getParametersValue(parameters, "x", ECPublicKey.defaultValues("x"));
		/**
		 * @type {ArrayBuffer}
		 * @desc values
		 */
		this.y = getParametersValue(parameters, "y", ECPublicKey.defaultValues("y"));
		/**
		 * @type {string}
		 * @desc namedCurve
		 */
		this.namedCurve = getParametersValue(parameters, "namedCurve", ECPublicKey.defaultValues("namedCurve"));
		//endregion

		//region If input argument array contains "schema" for this object
		if("schema" in parameters)
			this.fromSchema(parameters.schema);
		//endregion
		//region If input argument array contains "json" for this object
		if("json" in parameters)
			this.fromJSON(parameters.json);
		//endregion
	}
	//**********************************************************************************
	/**
	 * Return default values for all class members
	 * @param {string} memberName String name for a class member
	 */
	static defaultValues(memberName)
	{
		switch(memberName)
		{
			case "x":
			case "y":
				return new ArrayBuffer(0);
			case "namedCurve":
				return "";
			default:
				throw new Error(`Invalid member name for ECCPublicKey class: ${memberName}`);
		}
	}
	//**********************************************************************************
	/**
	 * Compare values with default values for all class members
	 * @param {string} memberName String name for a class member
	 * @param {*} memberValue Value to compare with default value
	 */
	static compareWithDefault(memberName, memberValue)
	{
		switch(memberName)
		{
			case "x":
			case "y":
				return (isEqualBuffer(memberValue, ECPublicKey.defaultValues(memberName)));
			case "namedCurve":
				return (memberValue === "");
			default:
				throw new Error(`Invalid member name for ECCPublicKey class: ${memberName}`);
		}
	}
	//**********************************************************************************
	/**
	 * Return value of pre-defined ASN.1 schema for current class
	 * @param {Object} parameters Input parameters for the schema
	 * @returns {Object} asn1js schema object
	 */
	static schema(parameters = {})
	{
		return new RawData();
	}
	//**********************************************************************************
	/**
	 * Convert ArrayBuffer into current class
	 * @param {!ArrayBuffer} schema Special case: schema is an ArrayBuffer
	 */
	fromSchema(schema)
	{
		//region Check the schema is valid
		if((schema instanceof ArrayBuffer) === false)
			throw new Error("Object's schema was not verified against input data for ECPublicKey");

		const view = new Uint8Array(schema);
		if(view[0] !== 0x04)
			throw new Error("Object's schema was not verified against input data for ECPublicKey");
		//endregion

		//region Get internal properties from parsed schema
		let coordinateLength;

		switch(this.namedCurve)
		{
			case "1.2.840.10045.3.1.7": // P-256
				coordinateLength = 32;
				break;
			case "1.3.132.0.34": // P-384
				coordinateLength = 48;
				break;
			case "1.3.132.0.35": // P-521
				coordinateLength = 66;
				break;
			default:
				throw new Error(`Incorrect curve OID: ${this.namedCurve}`);
		}

		if(schema.byteLength !== (coordinateLength * 2 + 1))
			throw new Error("Object's schema was not verified against input data for ECPublicKey");
		
		this.x = schema.slice(1, coordinateLength + 1);
		this.y = schema.slice(1 + coordinateLength, coordinateLength * 2 + 1);
		//endregion
	}
	//**********************************************************************************
	/**
	 * Convert current object to asn1js object and set correct values
	 * @returns {Object} asn1js object
	 */
	toSchema()
	{
		return new RawData({ data: utilConcatBuf(
			(new Uint8Array([0x04])).buffer,
			this.x,
			this.y
		)
		});
	}
	//**********************************************************************************
	/**
	 * Convertion for the class to JSON object
	 * @returns {Object}
	 */
	toJSON()
	{
		let crvName = "";

		switch(this.namedCurve)
		{
			case "1.2.840.10045.3.1.7": // P-256
				crvName = "P-256";
				break;
			case "1.3.132.0.34": // P-384
				crvName = "P-384";
				break;
			case "1.3.132.0.35": // P-521
				crvName = "P-521";
				break;
			default:
		}

		return {
			crv: crvName,
			x: toBase64(arrayBufferToString(this.x), true, true, false),
			y: toBase64(arrayBufferToString(this.y), true, true, false)
		};
	}
	//**********************************************************************************
	/**
	 * Convert JSON value into current object
	 * @param {Object} json
	 */
	fromJSON(json)
	{
		let coodinateLength = 0;

		if("crv" in json)
		{
			switch(json.crv.toUpperCase())
			{
				case "P-256":
					this.namedCurve = "1.2.840.10045.3.1.7";
					coodinateLength = 32;
					break;
				case "P-384":
					this.namedCurve = "1.3.132.0.34";
					coodinateLength = 48;
					break;
				case "P-521":
					this.namedCurve = "1.3.132.0.35";
					coodinateLength = 66;
					break;
				default:
			}
		}
		else
			throw new Error("Absent mandatory parameter \"crv\"");

		if("x" in json)
		{
			const convertBuffer = stringToArrayBuffer(fromBase64(json.x, true));
			
			if(convertBuffer.byteLength < coodinateLength)
			{
				this.x = new ArrayBuffer(coodinateLength);
				const view = new Uint8Array(this.x);
				const convertBufferView = new Uint8Array(convertBuffer);
				view.set(convertBufferView, 1);
			}
			else
				this.x = convertBuffer.slice(0, coodinateLength);
		}
		else
			throw new Error("Absent mandatory parameter \"x\"");

		if("y" in json)
		{
			const convertBuffer = stringToArrayBuffer(fromBase64(json.y, true));
			
			if(convertBuffer.byteLength < coodinateLength)
			{
				this.y = new ArrayBuffer(coodinateLength);
				const view = new Uint8Array(this.y);
				const convertBufferView = new Uint8Array(convertBuffer);
				view.set(convertBufferView, 1);
			}
			else
				this.y = convertBuffer.slice(0, coodinateLength);
		}
		else
			throw new Error("Absent mandatory parameter \"y\"");
	}
	//**********************************************************************************
}
//**************************************************************************************

//**************************************************************************************
/**
 * Class from RFC3447
 */
class RSAPublicKey
{
	//**********************************************************************************
	/**
	 * Constructor for RSAPublicKey class
	 * @param {Object} [parameters={}]
	 * @param {Object} [parameters.schema] asn1js parsed value to initialize the class from
	 * @property {Integer} [modulus]
	 * @property {Integer} [publicExponent]
	 */
	constructor(parameters = {})
	{
		//region Internal properties of the object
		/**
		 * @type {Integer}
		 * @desc Modulus part of RSA public key
		 */
		this.modulus = getParametersValue(parameters, "modulus", RSAPublicKey.defaultValues("modulus"));
		/**
		 * @type {Integer}
		 * @desc Public exponent of RSA public key
		 */
		this.publicExponent = getParametersValue(parameters, "publicExponent", RSAPublicKey.defaultValues("publicExponent"));
		//endregion

		//region If input argument array contains "schema" for this object
		if("schema" in parameters)
			this.fromSchema(parameters.schema);
		//endregion
		//region If input argument array contains "json" for this object
		if("json" in parameters)
			this.fromJSON(parameters.json);
		//endregion
	}
	//**********************************************************************************
	/**
	 * Return default values for all class members
	 * @param {string} memberName String name for a class member
	 */
	static defaultValues(memberName)
	{
		switch(memberName)
		{
			case "modulus":
				return new Integer();
			case "publicExponent":
				return new Integer();
			default:
				throw new Error(`Invalid member name for RSAPublicKey class: ${memberName}`);
		}
	}
	//**********************************************************************************
	/**
	 * Return value of pre-defined ASN.1 schema for current class
	 *
	 * ASN.1 schema:
	 * ```asn1
	 * RSAPublicKey ::= Sequence {
	 *    modulus           Integer,  -- n
	 *    publicExponent    Integer   -- e
	 * }
	 * ```
	 *
	 * @param {Object} parameters Input parameters for the schema
	 * @returns {Object} asn1js schema object
	 */
	static schema(parameters = {})
	{
		/**
		 * @type {Object}
		 * @property {string} utcTimeName Name for "utcTimeName" choice
		 * @property {string} generalTimeName Name for "generalTimeName" choice
		 */
		const names = getParametersValue(parameters, "names", {});

		return (new Sequence({
			name: (names.blockName || ""),
			value: [
				new Integer({ name: (names.modulus || "") }),
				new Integer({ name: (names.publicExponent || "") })
			]
		}));
	}
	//**********************************************************************************
	/**
	 * Convert parsed asn1js object into current class
	 * @param {!Object} schema
	 */
	fromSchema(schema)
	{
		//region Clear input data first
		clearProps(schema, [
			"modulus",
			"publicExponent"
		]);
		//endregion
		
		//region Check the schema is valid
		const asn1 = compareSchema(schema,
			schema,
			RSAPublicKey.schema({
				names: {
					modulus: "modulus",
					publicExponent: "publicExponent"
				}
			})
		);

		if(asn1.verified === false)
			throw new Error("Object's schema was not verified against input data for RSAPublicKey");
		//endregion

		//region Get internal properties from parsed schema
		this.modulus = asn1.result.modulus.convertFromDER(256);
		this.publicExponent = asn1.result.publicExponent;
		//endregion
	}
	//**********************************************************************************
	/**
	 * Convert current object to asn1js object and set correct values
	 * @returns {Object} asn1js object
	 */
	toSchema()
	{
		//region Construct and return new ASN.1 schema for this object
		return (new Sequence({
			value: [
				this.modulus.convertToDER(),
				this.publicExponent
			]
		}));
		//endregion
	}
	//**********************************************************************************
	/**
	 * Convertion for the class to JSON object
	 * @returns {Object}
	 */
	toJSON()
	{
		return {
			n: toBase64(arrayBufferToString(this.modulus.valueBlock.valueHex), true, true, true),
			e: toBase64(arrayBufferToString(this.publicExponent.valueBlock.valueHex), true, true, true)
		};
	}
	//**********************************************************************************
	/**
	 * Convert JSON value into current object
	 * @param {Object} json
	 */
	fromJSON(json)
	{
		if("n" in json)
		{
			const array = stringToArrayBuffer(fromBase64(json.n, true));
			this.modulus = new Integer({ valueHex: array.slice(0, Math.pow(2, nearestPowerOf2(array.byteLength))) });
		}
		else
			throw new Error("Absent mandatory parameter \"n\"");

		if("e" in json)
			this.publicExponent = new Integer({ valueHex: stringToArrayBuffer(fromBase64(json.e, true)).slice(0, 3) });
		else
			throw new Error("Absent mandatory parameter \"e\"");
	}
	//**********************************************************************************
}
//**************************************************************************************

//**************************************************************************************
/**
 * Class from RFC5280
 */
class PublicKeyInfo 
{
	//**********************************************************************************
	/**
	 * Constructor for PublicKeyInfo class
	 * @param {Object} [parameters={}]
	 * @param {Object} [parameters.schema] asn1js parsed value to initialize the class from
	 */
	constructor(parameters = {})
	{
		//region Internal properties of the object
		/**
		 * @type {AlgorithmIdentifier}
		 * @desc Algorithm identifier
		 */
		this.algorithm = getParametersValue(parameters, "algorithm", PublicKeyInfo.defaultValues("algorithm"));
		/**
		 * @type {BitString}
		 * @desc Subject public key value
		 */
		this.subjectPublicKey = getParametersValue(parameters, "subjectPublicKey", PublicKeyInfo.defaultValues("subjectPublicKey"));
		
		if("parsedKey" in parameters)
			/**
			 * @type {ECPublicKey|RSAPublicKey}
			 * @desc Parsed public key value
			 */
			this.parsedKey = getParametersValue(parameters, "parsedKey", PublicKeyInfo.defaultValues("parsedKey"));
		//endregion
		
		//region If input argument array contains "schema" for this object
		if("schema" in parameters)
			this.fromSchema(parameters.schema);
		//endregion
		//region If input argument array contains "json" for this object
		if("json" in parameters)
			this.fromJSON(parameters.json);
		//endregion
	}
	//**********************************************************************************
	/**
	 * Return default values for all class members
	 * @param {string} memberName String name for a class member
	 */
	static defaultValues(memberName)
	{
		switch(memberName)
		{
			case "algorithm":
				return new AlgorithmIdentifier();
			case "subjectPublicKey":
				return new BitString();
			default:
				throw new Error(`Invalid member name for PublicKeyInfo class: ${memberName}`);
		}
	}
	//**********************************************************************************
	/**
	 * Return value of pre-defined ASN.1 schema for current class
	 *
	 * ASN.1 schema:
	 * ```asn1
	 * SubjectPublicKeyInfo  ::=  Sequence  {
	 *    algorithm            AlgorithmIdentifier,
	 *    subjectPublicKey     BIT STRING  }
	 * ```
	 *
	 * @param {Object} parameters Input parameters for the schema
	 * @returns {Object} asn1js schema object
	 */
	static schema(parameters = {})
	{
		/**
		 * @type {Object}
		 * @property {string} [blockName]
		 * @property {string} [algorithm]
		 * @property {string} [subjectPublicKey]
		 */
		const names = getParametersValue(parameters, "names", {});
		
		return (new Sequence({
			name: (names.blockName || ""),
			value: [
				AlgorithmIdentifier.schema(names.algorithm || {}),
				new BitString({ name: (names.subjectPublicKey || "") })
			]
		}));
	}
	//**********************************************************************************
	/**
	 * Convert parsed asn1js object into current class
	 * @param {!Object} schema
	 */
	fromSchema(schema)
	{
		//region Clear input data first
		clearProps(schema, [
			"algorithm",
			"subjectPublicKey"
		]);
		//endregion
		
		//region Check the schema is valid
		const asn1 = compareSchema(schema,
			schema,
			PublicKeyInfo.schema({
				names: {
					algorithm: {
						names: {
							blockName: "algorithm"
						}
					},
					subjectPublicKey: "subjectPublicKey"
				}
			})
		);
		
		if(asn1.verified === false)
			throw new Error("Object's schema was not verified against input data for PublicKeyInfo");
		//endregion
		
		//region Get internal properties from parsed schema
		this.algorithm = new AlgorithmIdentifier({ schema: asn1.result.algorithm });
		this.subjectPublicKey = asn1.result.subjectPublicKey;
		
		switch(this.algorithm.algorithmId)
		{
			case "1.2.840.10045.2.1": // ECDSA
				if("algorithmParams" in this.algorithm)
				{
					if(this.algorithm.algorithmParams.constructor.blockName() === ObjectIdentifier.blockName())
					{
						try
						{
							this.parsedKey = new ECPublicKey({
								namedCurve: this.algorithm.algorithmParams.valueBlock.toString(),
								schema: this.subjectPublicKey.valueBlock.valueHex
							});
						}
						catch(ex){} // Could be a problems during recognision of internal public key data here. Let's ignore them.
					}
				}
				break;
			case "1.2.840.113549.1.1.1": // RSA
				{
					const publicKeyASN1 = fromBER(this.subjectPublicKey.valueBlock.valueHex);
					if(publicKeyASN1.offset !== (-1))
					{
						try
						{
							this.parsedKey = new RSAPublicKey({ schema: publicKeyASN1.result });
						}
						catch(ex){} // Could be a problems during recognision of internal public key data here. Let's ignore them.
					}
				}
				break;
			default:
		}
		//endregion
	}
	//**********************************************************************************
	/**
	 * Convert current object to asn1js object and set correct values
	 * @returns {Object} asn1js object
	 */
	toSchema()
	{
		//region Construct and return new ASN.1 schema for this object
		return (new Sequence({
			value: [
				this.algorithm.toSchema(),
				this.subjectPublicKey
			]
		}));
		//endregion
	}
	//**********************************************************************************
	/**
	 * Convertion for the class to JSON object
	 * @returns {Object}
	 */
	toJSON()
	{
		//region Return common value in case we do not have enough info fo making JWK
		if(("parsedKey" in this) === false)
		{
			return {
				algorithm: this.algorithm.toJSON(),
				subjectPublicKey: this.subjectPublicKey.toJSON()
			};
		}
		//endregion
		
		//region Making JWK
		const jwk = {};
		
		switch(this.algorithm.algorithmId)
		{
			case "1.2.840.10045.2.1": // ECDSA
				jwk.kty = "EC";
				break;
			case "1.2.840.113549.1.1.1": // RSA
				jwk.kty = "RSA";
				break;
			default:
		}
		
		const publicKeyJWK = this.parsedKey.toJSON();
		
		for(const key of Object.keys(publicKeyJWK))
			jwk[key] = publicKeyJWK[key];
		
		return jwk;
		//endregion
	}
	//**********************************************************************************
	/**
	 * Convert JSON value into current object
	 * @param {Object} json
	 */
	fromJSON(json)
	{
		if("kty" in json)
		{
			switch(json.kty.toUpperCase())
			{
				case "EC":
					this.parsedKey = new ECPublicKey({ json });
					
					this.algorithm = new AlgorithmIdentifier({
						algorithmId: "1.2.840.10045.2.1",
						algorithmParams: new ObjectIdentifier({ value: this.parsedKey.namedCurve })
					});
					break;
				case "RSA":
					this.parsedKey = new RSAPublicKey({ json });
					
					this.algorithm = new AlgorithmIdentifier({
						algorithmId: "1.2.840.113549.1.1.1",
						algorithmParams: new Null()
					});
					break;
				default:
					throw new Error(`Invalid value for "kty" parameter: ${json.kty}`);
			}
			
			this.subjectPublicKey = new BitString({ valueHex: this.parsedKey.toSchema().toBER(false) });
		}
	}
	//**********************************************************************************
	importKey(publicKey)
	{
		//region Initial variables
		let sequence = Promise.resolve();
		const _this = this;
		//endregion
		
		//region Initial check
		if(typeof publicKey === "undefined")
			return Promise.reject("Need to provide publicKey input parameter");
		//endregion
		
		//region Get a "crypto" extension
		const crypto = getCrypto();
		if(typeof crypto === "undefined")
			return Promise.reject("Unable to create WebCrypto object");
		//endregion
		
		//region Export public key
		sequence = sequence.then(() =>
			crypto.exportKey("spki", publicKey));
		//endregion
		
		//region Initialize internal variables by parsing exported value
		sequence = sequence.then(
			/**
			 * @param {ArrayBuffer} exportedKey
			 */
			exportedKey =>
			{
				const asn1 = fromBER(exportedKey);
				try
				{
					_this.fromSchema(asn1.result);
				}
				catch(exception)
				{
					return Promise.reject("Error during initializing object from schema");
				}
				
				return undefined;
			},
			error => Promise.reject(`Error during exporting public key: ${error}`)
		);
		//endregion
		
		return sequence;
	}
	//**********************************************************************************
}
//**************************************************************************************

//**************************************************************************************
/**
 * Class from RFC2986
 */
class Attribute {
	//**********************************************************************************
	/**
	 * Constructor for Attribute class
	 * @param {Object} [parameters={}]
	 * @param {Object} [parameters.schema] asn1js parsed value to initialize the class from
	 */
	constructor(parameters = {})
	{
		//region Internal properties of the object
		/**
		 * @type {string}
		 * @desc ObjectIdentifier for attribute (string representation)
		 */
		this.type = getParametersValue(parameters, "type", Attribute.defaultValues("type"));
		/**
		 * @type {Array}
		 * @desc Any attribute values
		 */
		this.values = getParametersValue(parameters, "values", Attribute.defaultValues("values"));
		//endregion
		
		//region If input argument array contains "schema" for this object
		if("schema" in parameters)
			this.fromSchema(parameters.schema);
		//endregion
	}
	//**********************************************************************************
	/**
	 * Return default values for all class members
	 * @param {string} memberName String name for a class member
	 */
	static defaultValues(memberName)
	{
		switch(memberName)
		{
			case "type":
				return "";
			case "values":
				return [];
			default:
				throw new Error(`Invalid member name for Attribute class: ${memberName}`);
		}
	}
	//**********************************************************************************
	/**
	 * Compare values with default values for all class members
	 * @param {string} memberName String name for a class member
	 * @param {*} memberValue Value to compare with default value
	 */
	static compareWithDefault(memberName, memberValue)
	{
		switch(memberName)
		{
			case "type":
				return (memberValue === "");
			case "values":
				return (memberValue.length === 0);
			default:
				throw new Error(`Invalid member name for Attribute class: ${memberName}`);
		}
	}
	//**********************************************************************************
	/**
	 * Return value of pre-defined ASN.1 schema for current class
	 *
	 * ASN.1 schema:
	 * ```asn1
	 * Attribute { ATTRIBUTE:IOSet } ::= SEQUENCE {
	 *    type   ATTRIBUTE.&id({IOSet}),
	 *    values SET SIZE(1..MAX) OF ATTRIBUTE.&Type({IOSet}{@type})
	 * }
	 * ```
	 *
	 * @param {Object} parameters Input parameters for the schema
	 * @returns {Object} asn1js schema object
	 */
	static schema(parameters = {})
	{
		/**
		 * @type {Object}
		 * @property {string} [blockName]
		 * @property {string} [type]
		 * @property {string} [setName]
		 * @property {string} [values]
		 */
		const names = getParametersValue(parameters, "names", {});
		
		return (new Sequence({
			name: (names.blockName || ""),
			value: [
				new ObjectIdentifier({ name: (names.type || "") }),
				new Set({
					name: (names.setName || ""),
					value: [
						new Repeated({
							name: (names.values || ""),
							value: new Any()
						})
					]
				})
			]
		}));
	}
	//**********************************************************************************
	/**
	 * Convert parsed asn1js object into current class
	 * @param {!Object} schema
	 */
	fromSchema(schema)
	{
		//region Clear input data first
		clearProps(schema, [
			"type",
			"values"
		]);
		//endregion
		
		//region Check the schema is valid
		const asn1 = compareSchema(schema,
			schema,
			Attribute.schema({
				names: {
					type: "type",
					values: "values"
				}
			})
		);
		
		if(asn1.verified === false)
			throw new Error("Object's schema was not verified against input data for Attribute");
		//endregion
		
		//region Get internal properties from parsed schema
		this.type = asn1.result.type.valueBlock.toString();
		this.values = asn1.result.values;
		//endregion
	}
	//**********************************************************************************
	/**
	 * Convert current object to asn1js object and set correct values
	 * @returns {Object} asn1js object
	 */
	toSchema()
	{
		//region Construct and return new ASN.1 schema for this object
		return (new Sequence({
			value: [
				new ObjectIdentifier({ value: this.type }),
				new Set({
					value: this.values
				})
			]
		}));
		//endregion
	}
	//**********************************************************************************
	/**
	 * Convertion for the class to JSON object
	 * @returns {Object}
	 */
	toJSON()
	{
		return {
			type: this.type,
			values: Array.from(this.values, element => element.toJSON())
		};
	}
	//**********************************************************************************
}
//**************************************************************************************

//**************************************************************************************
/**
 * Class from RFC5915
 */
class ECPrivateKey
{
	//**********************************************************************************
	/**
	 * Constructor for ECPrivateKey class
	 * @param {Object} [parameters={}]
	 * @param {Object} [parameters.schema] asn1js parsed value to initialize the class from
	 */
	constructor(parameters = {})
	{
		//region Internal properties of the object
		/**
		 * @type {number}
		 * @desc version
		 */
		this.version = getParametersValue(parameters, "version", ECPrivateKey.defaultValues("version"));
		/**
		 * @type {OctetString}
		 * @desc privateKey
		 */
		this.privateKey = getParametersValue(parameters, "privateKey", ECPrivateKey.defaultValues("privateKey"));

		if("namedCurve" in parameters)
			/**
			 * @type {string}
			 * @desc namedCurve
			 */
			this.namedCurve = getParametersValue(parameters, "namedCurve", ECPrivateKey.defaultValues("namedCurve"));

		if("publicKey" in parameters)
			/**
			 * @type {ECPublicKey}
			 * @desc publicKey
			 */
			this.publicKey = getParametersValue(parameters, "publicKey", ECPrivateKey.defaultValues("publicKey"));
		//endregion

		//region If input argument array contains "schema" for this object
		if("schema" in parameters)
			this.fromSchema(parameters.schema);
		//endregion
		//region If input argument array contains "json" for this object
		if("json" in parameters)
			this.fromJSON(parameters.json);
		//endregion
	}
	//**********************************************************************************
	/**
	 * Return default values for all class members
	 * @param {string} memberName String name for a class member
	 */
	static defaultValues(memberName)
	{
		switch(memberName)
		{
			case "version":
				return 1;
			case "privateKey":
				return new OctetString();
			case "namedCurve":
				return "";
			case "publicKey":
				return new ECPublicKey();
			default:
				throw new Error(`Invalid member name for ECCPrivateKey class: ${memberName}`);
		}
	}
	//**********************************************************************************
	/**
	 * Compare values with default values for all class members
	 * @param {string} memberName String name for a class member
	 * @param {*} memberValue Value to compare with default value
	 */
	static compareWithDefault(memberName, memberValue)
	{
		switch(memberName)
		{
			case "version":
				return (memberValue === ECPrivateKey.defaultValues(memberName));
			case "privateKey":
				return (memberValue.isEqual(ECPrivateKey.defaultValues(memberName)));
			case "namedCurve":
				return (memberValue === "");
			case "publicKey":
				return ((ECPublicKey.compareWithDefault("namedCurve", memberValue.namedCurve)) &&
						(ECPublicKey.compareWithDefault("x", memberValue.x)) &&
						(ECPublicKey.compareWithDefault("y", memberValue.y)));
			default:
				throw new Error(`Invalid member name for ECCPrivateKey class: ${memberName}`);
		}
	}
	//**********************************************************************************
	/**
	 * Return value of pre-defined ASN.1 schema for current class
	 *
	 * ASN.1 schema:
	 * ```asn1
	 * ECPrivateKey ::= SEQUENCE {
	 * version        INTEGER { ecPrivkeyVer1(1) } (ecPrivkeyVer1),
	 * privateKey     OCTET STRING,
	 * parameters [0] ECParameters {{ NamedCurve }} OPTIONAL,
	 * publicKey  [1] BIT STRING OPTIONAL
	 * }
	 * ```
	 *
	 * @param {Object} parameters Input parameters for the schema
	 * @returns {Object} asn1js schema object
	 */
	static schema(parameters = {})
	{
		/**
		 * @type {Object}
		 * @property {string} [blockName]
		 * @property {string} [version]
		 * @property {string} [privateKey]
		 * @property {string} [namedCurve]
		 * @property {string} [publicKey]
		 */
		const names = getParametersValue(parameters, "names", {});

		return (new Sequence({
			name: (names.blockName || ""),
			value: [
				new Integer({ name: (names.version || "") }),
				new OctetString({ name: (names.privateKey || "") }),
				new Constructed({
					optional: true,
					idBlock: {
						tagClass: 3, // CONTEXT-SPECIFIC
						tagNumber: 0 // [0]
					},
					value: [
						new ObjectIdentifier({ name: (names.namedCurve || "") })
					]
				}),
				new Constructed({
					optional: true,
					idBlock: {
						tagClass: 3, // CONTEXT-SPECIFIC
						tagNumber: 1 // [1]
					},
					value: [
						new BitString({ name: (names.publicKey || "") })
					]
				})
			]
		}));
	}
	//**********************************************************************************
	/**
	 * Convert parsed asn1js object into current class
	 * @param {!Object} schema
	 */
	fromSchema(schema)
	{
		//region Clear input data first
		clearProps(schema, [
			"version",
			"privateKey",
			"namedCurve",
			"publicKey"
		]);
		//endregion
		
		//region Check the schema is valid
		const asn1 = compareSchema(schema,
			schema,
			ECPrivateKey.schema({
				names: {
					version: "version",
					privateKey: "privateKey",
					namedCurve: "namedCurve",
					publicKey: "publicKey"
				}
			})
		);

		if(asn1.verified === false)
			throw new Error("Object's schema was not verified against input data for ECPrivateKey");
		//endregion

		//region Get internal properties from parsed schema
		this.version = asn1.result.version.valueBlock.valueDec;
		this.privateKey = asn1.result.privateKey;

		if("namedCurve" in asn1.result)
			this.namedCurve = asn1.result.namedCurve.valueBlock.toString();

		if("publicKey" in asn1.result)
		{
			const publicKeyData = { schema: asn1.result.publicKey.valueBlock.valueHex };
			if("namedCurve" in this)
				publicKeyData.namedCurve = this.namedCurve;

			this.publicKey = new ECPublicKey(publicKeyData);
		}
		//endregion
	}
	//**********************************************************************************
	/**
	 * Convert current object to asn1js object and set correct values
	 * @returns {Object} asn1js object
	 */
	toSchema()
	{
		const outputArray = [
			new Integer({ value: this.version }),
			this.privateKey
		];

		if("namedCurve" in this)
		{
			outputArray.push(new Constructed({
				idBlock: {
					tagClass: 3, // CONTEXT-SPECIFIC
					tagNumber: 0 // [0]
				},
				value: [
					new ObjectIdentifier({ value: this.namedCurve })
				]
			}));
		}

		if("publicKey" in this)
		{
			outputArray.push(new Constructed({
				idBlock: {
					tagClass: 3, // CONTEXT-SPECIFIC
					tagNumber: 1 // [1]
				},
				value: [
					new BitString({ valueHex: this.publicKey.toSchema().toBER(false) })
				]
			}));
		}

		return new Sequence({
			value: outputArray
		});
	}
	//**********************************************************************************
	/**
	 * Convertion for the class to JSON object
	 * @returns {Object}
	 */
	toJSON()
	{
		if((("namedCurve" in this) === false) || (ECPrivateKey.compareWithDefault("namedCurve", this.namedCurve)))
			throw new Error("Not enough information for making JSON: absent \"namedCurve\" value");

		let crvName = "";

		switch(this.namedCurve)
		{
			case "1.2.840.10045.3.1.7": // P-256
				crvName = "P-256";
				break;
			case "1.3.132.0.34": // P-384
				crvName = "P-384";
				break;
			case "1.3.132.0.35": // P-521
				crvName = "P-521";
				break;
			default:
		}

		const privateKeyJSON = {
			crv: crvName,
			d: toBase64(arrayBufferToString(this.privateKey.valueBlock.valueHex), true, true, false)
		};

		if("publicKey" in this)
		{
			const publicKeyJSON = this.publicKey.toJSON();

			privateKeyJSON.x = publicKeyJSON.x;
			privateKeyJSON.y = publicKeyJSON.y;
		}

		return privateKeyJSON;
	}
	//**********************************************************************************
	/**
	 * Convert JSON value into current object
	 * @param {Object} json
	 */
	fromJSON(json)
	{
		let coodinateLength = 0;

		if("crv" in json)
		{
			switch(json.crv.toUpperCase())
			{
				case "P-256":
					this.namedCurve = "1.2.840.10045.3.1.7";
					coodinateLength = 32;
					break;
				case "P-384":
					this.namedCurve = "1.3.132.0.34";
					coodinateLength = 48;
					break;
				case "P-521":
					this.namedCurve = "1.3.132.0.35";
					coodinateLength = 66;
					break;
				default:
			}
		}
		else
			throw new Error("Absent mandatory parameter \"crv\"");

		if("d" in json)
		{
			const convertBuffer = stringToArrayBuffer(fromBase64(json.d, true));
			
			if(convertBuffer.byteLength < coodinateLength)
			{
				const buffer = new ArrayBuffer(coodinateLength);
				const view = new Uint8Array(buffer);
				const convertBufferView = new Uint8Array(convertBuffer);
				view.set(convertBufferView, 1);
				
				this.privateKey = new OctetString({ valueHex: buffer });
			}
			else
				this.privateKey = new OctetString({ valueHex: convertBuffer.slice(0, coodinateLength) });
		}
		else
			throw new Error("Absent mandatory parameter \"d\"");

		if(("x" in json) && ("y" in json))
			this.publicKey = new ECPublicKey({ json });
	}
	//**********************************************************************************
}
//**************************************************************************************

//**************************************************************************************
/**
 * Class from RFC3447
 */
class OtherPrimeInfo
{
	//**********************************************************************************
	/**
	 * Constructor for OtherPrimeInfo class
	 * @param {Object} [parameters={}]
	 * @param {Object} [parameters.schema] asn1js parsed value to initialize the class from
	 */
	constructor(parameters = {})
	{
		//region Internal properties of the object
		/**
		 * @type {Integer}
		 * @desc prime
		 */
		this.prime = getParametersValue(parameters, "prime", OtherPrimeInfo.defaultValues("prime"));
		/**
		 * @type {Integer}
		 * @desc exponent
		 */
		this.exponent = getParametersValue(parameters, "exponent", OtherPrimeInfo.defaultValues("exponent"));
		/**
		 * @type {Integer}
		 * @desc coefficient
		 */
		this.coefficient = getParametersValue(parameters, "coefficient", OtherPrimeInfo.defaultValues("coefficient"));
		//endregion

		//region If input argument array contains "schema" for this object
		if("schema" in parameters)
			this.fromSchema(parameters.schema);
		//endregion
		//region If input argument array contains "json" for this object
		if("json" in parameters)
			this.fromJSON(parameters.json);
		//endregion
	}
	//**********************************************************************************
	/**
	 * Return default values for all class members
	 * @param {string} memberName String name for a class member
	 */
	static defaultValues(memberName)
	{
		switch(memberName)
		{
			case "prime":
				return new Integer();
			case "exponent":
				return new Integer();
			case "coefficient":
				return new Integer();
			default:
				throw new Error(`Invalid member name for OtherPrimeInfo class: ${memberName}`);
		}
	}
	//**********************************************************************************
	/**
	 * Return value of pre-defined ASN.1 schema for current class
	 *
	 * ASN.1 schema:
	 * ```asn1
	 * OtherPrimeInfo ::= Sequence {
	 *    prime             Integer,  -- ri
	 *    exponent          Integer,  -- di
	 *    coefficient       Integer   -- ti
	 * }
	 * ```
	 *
	 * @param {Object} parameters Input parameters for the schema
	 * @returns {Object} asn1js schema object
	 */
	static schema(parameters = {})
	{

		/**
		 * @type {Object}
		 * @property {string} prime
		 * @property {string} exponent
		 * @property {string} coefficient
		 */
		const names = getParametersValue(parameters, "names", {});

		return (new Sequence({
			name: (names.blockName || ""),
			value: [
				new Integer({ name: (names.prime || "") }),
				new Integer({ name: (names.exponent || "") }),
				new Integer({ name: (names.coefficient || "") })
			]
		}));
	}
	//**********************************************************************************
	/**
	 * Convert parsed asn1js object into current class
	 * @param {!Object} schema
	 */
	fromSchema(schema)
	{
		//region Clear input data first
		clearProps(schema, [
			"prime",
			"exponent",
			"coefficient"
		]);
		//endregion
		
		//region Check the schema is valid
		const asn1 = compareSchema(schema,
			schema,
			OtherPrimeInfo.schema({
				names: {
					prime: "prime",
					exponent: "exponent",
					coefficient: "coefficient"
				}
			})
		);

		if(asn1.verified === false)
			throw new Error("Object's schema was not verified against input data for OtherPrimeInfo");
		//endregion

		//region Get internal properties from parsed schema
		this.prime = asn1.result.prime.convertFromDER();
		this.exponent = asn1.result.exponent.convertFromDER();
		this.coefficient = asn1.result.coefficient.convertFromDER();
		//endregion
	}
	//**********************************************************************************
	/**
	 * Convert current object to asn1js object and set correct values
	 * @returns {Object} asn1js object
	 */
	toSchema()
	{
		//region Construct and return new ASN.1 schema for this object
		return (new Sequence({
			value: [
				this.prime.convertToDER(),
				this.exponent.convertToDER(),
				this.coefficient.convertToDER()
			]
		}));
		//endregion
	}
	//**********************************************************************************
	/**
	 * Convertion for the class to JSON object
	 * @returns {Object}
	 */
	toJSON()
	{
		return {
			r: toBase64(arrayBufferToString(this.prime.valueBlock.valueHex), true, true),
			d: toBase64(arrayBufferToString(this.exponent.valueBlock.valueHex), true, true),
			t: toBase64(arrayBufferToString(this.coefficient.valueBlock.valueHex), true, true)
		};
	}
	//**********************************************************************************
	/**
	 * Convert JSON value into current object
	 * @param {Object} json
	 */
	fromJSON(json)
	{
		if("r" in json)
			this.prime = new Integer({ valueHex: stringToArrayBuffer(fromBase64(json.r, true)) });
		else
			throw new Error("Absent mandatory parameter \"r\"");

		if("d" in json)
			this.exponent = new Integer({ valueHex: stringToArrayBuffer(fromBase64(json.d, true)) });
		else
			throw new Error("Absent mandatory parameter \"d\"");

		if("t" in json)
			this.coefficient = new Integer({ valueHex: stringToArrayBuffer(fromBase64(json.t, true)) });
		else
			throw new Error("Absent mandatory parameter \"t\"");
	}
	//**********************************************************************************
}
//**************************************************************************************

//**************************************************************************************
/**
 * Class from RFC3447
 */
class RSAPrivateKey
{
	//**********************************************************************************
	/**
	 * Constructor for RSAPrivateKey class
	 * @param {Object} [parameters={}]
	 * @param {Object} [parameters.schema] asn1js parsed value to initialize the class from
	 */
	constructor(parameters = {})
	{
		//region Internal properties of the object
		/**
		 * @type {number}
		 * @desc version
		 */
		this.version = getParametersValue(parameters, "version", RSAPrivateKey.defaultValues("version"));
		/**
		 * @type {Integer}
		 * @desc modulus
		 */
		this.modulus = getParametersValue(parameters, "modulus", RSAPrivateKey.defaultValues("modulus"));
		/**
		 * @type {Integer}
		 * @desc publicExponent
		 */
		this.publicExponent = getParametersValue(parameters, "publicExponent", RSAPrivateKey.defaultValues("publicExponent"));
		/**
		 * @type {Integer}
		 * @desc privateExponent
		 */
		this.privateExponent = getParametersValue(parameters, "privateExponent", RSAPrivateKey.defaultValues("privateExponent"));
		/**
		 * @type {Integer}
		 * @desc prime1
		 */
		this.prime1 = getParametersValue(parameters, "prime1", RSAPrivateKey.defaultValues("prime1"));
		/**
		 * @type {Integer}
		 * @desc prime2
		 */
		this.prime2 = getParametersValue(parameters, "prime2", RSAPrivateKey.defaultValues("prime2"));
		/**
		 * @type {Integer}
		 * @desc exponent1
		 */
		this.exponent1 = getParametersValue(parameters, "exponent1", RSAPrivateKey.defaultValues("exponent1"));
		/**
		 * @type {Integer}
		 * @desc exponent2
		 */
		this.exponent2 = getParametersValue(parameters, "exponent2", RSAPrivateKey.defaultValues("exponent2"));
		/**
		 * @type {Integer}
		 * @desc coefficient
		 */
		this.coefficient = getParametersValue(parameters, "coefficient", RSAPrivateKey.defaultValues("coefficient"));

		if("otherPrimeInfos" in parameters)
			/**
			 * @type {Array.<OtherPrimeInfo>}
			 * @desc otherPrimeInfos
			 */
			this.otherPrimeInfos = getParametersValue(parameters, "otherPrimeInfos", RSAPrivateKey.defaultValues("otherPrimeInfos"));
		//endregion

		//region If input argument array contains "schema" for this object
		if("schema" in parameters)
			this.fromSchema(parameters.schema);
		//endregion
		//region If input argument array contains "json" for this object
		if("json" in parameters)
			this.fromJSON(parameters.json);
		//endregion
	}
	//**********************************************************************************
	/**
	 * Return default values for all class members
	 * @param {string} memberName String name for a class member
	 */
	static defaultValues(memberName)
	{
		switch(memberName)
		{
			case "version":
				return 0;
			case "modulus":
				return new Integer();
			case "publicExponent":
				return new Integer();
			case "privateExponent":
				return new Integer();
			case "prime1":
				return new Integer();
			case "prime2":
				return new Integer();
			case "exponent1":
				return new Integer();
			case "exponent2":
				return new Integer();
			case "coefficient":
				return new Integer();
			case "otherPrimeInfos":
				return [];
			default:
				throw new Error(`Invalid member name for RSAPrivateKey class: ${memberName}`);
		}
	}
	//**********************************************************************************
	/**
	 * Return value of pre-defined ASN.1 schema for current class
	 *
	 * ASN.1 schema:
	 * ```asn1
	 * RSAPrivateKey ::= Sequence {
	 *    version           Version,
	 *    modulus           Integer,  -- n
	 *    publicExponent    Integer,  -- e
	 *    privateExponent   Integer,  -- d
	 *    prime1            Integer,  -- p
	 *    prime2            Integer,  -- q
	 *    exponent1         Integer,  -- d mod (p-1)
	 *    exponent2         Integer,  -- d mod (q-1)
	 *    coefficient       Integer,  -- (inverse of q) mod p
	 *    otherPrimeInfos   OtherPrimeInfos OPTIONAL
	 * }
	 *
	 * OtherPrimeInfos ::= Sequence SIZE(1..MAX) OF OtherPrimeInfo
	 * ```
	 *
	 * @param {Object} parameters Input parameters for the schema
	 * @returns {Object} asn1js schema object
	 */
	static schema(parameters = {})
	{
		/**
		 * @type {Object}
		 * @property {string} [blockName]
		 * @property {string} [version]
		 * @property {string} [modulus]
		 * @property {string} [publicExponent]
		 * @property {string} [privateExponent]
		 * @property {string} [prime1]
		 * @property {string} [prime2]
		 * @property {string} [exponent1]
		 * @property {string} [exponent2]
		 * @property {string} [coefficient]
		 * @property {string} [otherPrimeInfosName]
		 * @property {Object} [otherPrimeInfo]
		 */
		const names = getParametersValue(parameters, "names", {});

		return (new Sequence({
			name: (names.blockName || ""),
			value: [
				new Integer({ name: (names.version || "") }),
				new Integer({ name: (names.modulus || "") }),
				new Integer({ name: (names.publicExponent || "") }),
				new Integer({ name: (names.privateExponent || "") }),
				new Integer({ name: (names.prime1 || "") }),
				new Integer({ name: (names.prime2 || "") }),
				new Integer({ name: (names.exponent1 || "") }),
				new Integer({ name: (names.exponent2 || "") }),
				new Integer({ name: (names.coefficient || "") }),
				new Sequence({
					optional: true,
					value: [
						new Repeated({
							name: (names.otherPrimeInfosName || ""),
							value: OtherPrimeInfo.schema(names.otherPrimeInfo || {})
						})
					]
				})
			]
		}));
	}
	//**********************************************************************************
	/**
	 * Convert parsed asn1js object into current class
	 * @param {!Object} schema
	 */
	fromSchema(schema)
	{
		//region Clear input data first
		clearProps(schema, [
			"version",
			"modulus",
			"publicExponent",
			"privateExponent",
			"prime1",
			"prime2",
			"exponent1",
			"exponent2",
			"coefficient",
			"otherPrimeInfos"
		]);
		//endregion
		
		//region Check the schema is valid
		const asn1 = compareSchema(schema,
			schema,
			RSAPrivateKey.schema({
				names: {
					version: "version",
					modulus: "modulus",
					publicExponent: "publicExponent",
					privateExponent: "privateExponent",
					prime1: "prime1",
					prime2: "prime2",
					exponent1: "exponent1",
					exponent2: "exponent2",
					coefficient: "coefficient",
					otherPrimeInfo: {
						names: {
							blockName: "otherPrimeInfos"
						}
					}
				}
			})
		);

		if(asn1.verified === false)
			throw new Error("Object's schema was not verified against input data for RSAPrivateKey");
		//endregion

		//region Get internal properties from parsed schema
		this.version = asn1.result.version.valueBlock.valueDec;
		this.modulus = asn1.result.modulus.convertFromDER(256);
		this.publicExponent = asn1.result.publicExponent;
		this.privateExponent = asn1.result.privateExponent.convertFromDER(256);
		this.prime1 = asn1.result.prime1.convertFromDER(128);
		this.prime2 = asn1.result.prime2.convertFromDER(128);
		this.exponent1 = asn1.result.exponent1.convertFromDER(128);
		this.exponent2 = asn1.result.exponent2.convertFromDER(128);
		this.coefficient = asn1.result.coefficient.convertFromDER(128);

		if("otherPrimeInfos" in asn1.result)
			this.otherPrimeInfos = Array.from(asn1.result.otherPrimeInfos, element => new OtherPrimeInfo({ schema: element }));
		//endregion
	}
	//**********************************************************************************
	/**
	 * Convert current object to asn1js object and set correct values
	 * @returns {Object} asn1js object
	 */
	toSchema()
	{
		//region Create array for output sequence
		const outputArray = [];
		
		outputArray.push(new Integer({ value: this.version }));
		outputArray.push(this.modulus.convertToDER());
		outputArray.push(this.publicExponent);
		outputArray.push(this.privateExponent.convertToDER());
		outputArray.push(this.prime1.convertToDER());
		outputArray.push(this.prime2.convertToDER());
		outputArray.push(this.exponent1.convertToDER());
		outputArray.push(this.exponent2.convertToDER());
		outputArray.push(this.coefficient.convertToDER());
		
		if("otherPrimeInfos" in this)
		{
			outputArray.push(new Sequence({
				value: Array.from(this.otherPrimeInfos, element => element.toSchema())
			}));
		}
		//endregion
		
		//region Construct and return new ASN.1 schema for this object
		return (new Sequence({
			value: outputArray
		}));
		//endregion
	}
	//**********************************************************************************
	/**
	 * Convertion for the class to JSON object
	 * @returns {Object}
	 */
	toJSON()
	{
		const jwk = {
			n: toBase64(arrayBufferToString(this.modulus.valueBlock.valueHex), true, true, true),
			e: toBase64(arrayBufferToString(this.publicExponent.valueBlock.valueHex), true, true, true),
			d: toBase64(arrayBufferToString(this.privateExponent.valueBlock.valueHex), true, true, true),
			p: toBase64(arrayBufferToString(this.prime1.valueBlock.valueHex), true, true, true),
			q: toBase64(arrayBufferToString(this.prime2.valueBlock.valueHex), true, true, true),
			dp: toBase64(arrayBufferToString(this.exponent1.valueBlock.valueHex), true, true, true),
			dq: toBase64(arrayBufferToString(this.exponent2.valueBlock.valueHex), true, true, true),
			qi: toBase64(arrayBufferToString(this.coefficient.valueBlock.valueHex), true, true, true)
		};

		if("otherPrimeInfos" in this)
			jwk.oth = Array.from(this.otherPrimeInfos, element => element.toJSON());

		return jwk;
	}
	//**********************************************************************************
	/**
	 * Convert JSON value into current object
	 * @param {Object} json
	 */
	fromJSON(json)
	{
		if("n" in json)
			this.modulus = new Integer({ valueHex: stringToArrayBuffer(fromBase64(json.n, true, true)) });
		else
			throw new Error("Absent mandatory parameter \"n\"");

		if("e" in json)
			this.publicExponent = new Integer({ valueHex: stringToArrayBuffer(fromBase64(json.e, true, true)) });
		else
			throw new Error("Absent mandatory parameter \"e\"");

		if("d" in json)
			this.privateExponent = new Integer({ valueHex: stringToArrayBuffer(fromBase64(json.d, true, true)) });
		else
			throw new Error("Absent mandatory parameter \"d\"");

		if("p" in json)
			this.prime1 = new Integer({ valueHex: stringToArrayBuffer(fromBase64(json.p, true, true)) });
		else
			throw new Error("Absent mandatory parameter \"p\"");

		if("q" in json)
			this.prime2 = new Integer({ valueHex: stringToArrayBuffer(fromBase64(json.q, true, true)) });
		else
			throw new Error("Absent mandatory parameter \"q\"");

		if("dp" in json)
			this.exponent1 = new Integer({ valueHex: stringToArrayBuffer(fromBase64(json.dp, true, true)) });
		else
			throw new Error("Absent mandatory parameter \"dp\"");

		if("dq" in json)
			this.exponent2 = new Integer({ valueHex: stringToArrayBuffer(fromBase64(json.dq, true, true)) });
		else
			throw new Error("Absent mandatory parameter \"dq\"");

		if("qi" in json)
			this.coefficient = new Integer({ valueHex: stringToArrayBuffer(fromBase64(json.qi, true, true)) });
		else
			throw new Error("Absent mandatory parameter \"qi\"");

		if("oth" in json)
			this.otherPrimeInfos = Array.from(json.oth, element => new OtherPrimeInfo({ json: element }));
	}
	//**********************************************************************************
}
//**************************************************************************************

//**************************************************************************************
/**
 * Class from RFC5208
 */
class PrivateKeyInfo
{
	//**********************************************************************************
	/**
	 * Constructor for PrivateKeyInfo class
	 * @param {Object} [parameters={}]
	 * @param {Object} [parameters.schema] asn1js parsed value to initialize the class from
	 */
	constructor(parameters = {})
	{
		//region Internal properties of the object
		/**
		 * @type {number}
		 * @desc version
		 */
		this.version = getParametersValue(parameters, "version", PrivateKeyInfo.defaultValues("version"));
		/**
		 * @type {AlgorithmIdentifier}
		 * @desc privateKeyAlgorithm
		 */
		this.privateKeyAlgorithm = getParametersValue(parameters, "privateKeyAlgorithm", PrivateKeyInfo.defaultValues("privateKeyAlgorithm"));
		/**
		 * @type {OctetString}
		 * @desc privateKey
		 */
		this.privateKey = getParametersValue(parameters, "privateKey", PrivateKeyInfo.defaultValues("privateKey"));

		if("attributes" in parameters)
			/**
			 * @type {Array.<Attribute>}
			 * @desc attributes
			 */
			this.attributes = getParametersValue(parameters, "attributes", PrivateKeyInfo.defaultValues("attributes"));

		if("parsedKey" in parameters)
			/**
			 * @type {ECPrivateKey|RSAPrivateKey}
			 * @desc Parsed public key value
			 */
			this.parsedKey = getParametersValue(parameters, "parsedKey", PrivateKeyInfo.defaultValues("parsedKey"));
		//endregion

		//region If input argument array contains "schema" for this object
		if("schema" in parameters)
			this.fromSchema(parameters.schema);
		//endregion
		//region If input argument array contains "json" for this object
		if("json" in parameters)
			this.fromJSON(parameters.json);
		//endregion
	}
	//**********************************************************************************
	/**
	 * Return default values for all class members
	 * @param {string} memberName String name for a class member
	 */
	static defaultValues(memberName)
	{
		switch(memberName)
		{
			case "version":
				return 0;
			case "privateKeyAlgorithm":
				return new AlgorithmIdentifier();
			case "privateKey":
				return new OctetString();
			case "attributes":
				return [];
			case "parsedKey":
				return {};
			default:
				throw new Error(`Invalid member name for PrivateKeyInfo class: ${memberName}`);
		}
	}
	//**********************************************************************************
	/**
	 * Return value of pre-defined ASN.1 schema for current class
	 *
	 * ASN.1 schema:
	 * ```asn1
	 * PrivateKeyInfo ::= SEQUENCE {
	 *    version Version,
	 *    privateKeyAlgorithm AlgorithmIdentifier {{PrivateKeyAlgorithms}},
	 *    privateKey PrivateKey,
	 *    attributes [0] Attributes OPTIONAL }
	 *
	 * Version ::= INTEGER {v1(0)} (v1,...)
	 *
	 * PrivateKey ::= OCTET STRING
	 *
	 * Attributes ::= SET OF Attribute
	 * ```
	 *
	 * @param {Object} parameters Input parameters for the schema
	 * @returns {Object} asn1js schema object
	 */
	static schema(parameters = {})
	{
		/**
		 * @type {Object}
		 * @property {string} [blockName]
		 * @property {string} [version]
		 * @property {string} [privateKeyAlgorithm]
		 * @property {string} [privateKey]
		 * @property {string} [attributes]
		 */
		const names = getParametersValue(parameters, "names", {});

		return (new Sequence({
			name: (names.blockName || ""),
			value: [
				new Integer({ name: (names.version || "") }),
				AlgorithmIdentifier.schema(names.privateKeyAlgorithm || {}),
				new OctetString({ name: (names.privateKey || "") }),
				new Constructed({
					optional: true,
					idBlock: {
						tagClass: 3, // CONTEXT-SPECIFIC
						tagNumber: 0 // [0]
					},
					value: [
						new Repeated({
							name: (names.attributes || ""),
							value: Attribute.schema()
						})
					]
				})
			]
		}));
	}
	//**********************************************************************************
	/**
	 * Convert parsed asn1js object into current class
	 * @param {!Object} schema
	 */
	fromSchema(schema)
	{
		//region Clear input data first
		clearProps(schema, [
			"version",
			"privateKeyAlgorithm",
			"privateKey",
			"attributes"
		]);
		//endregion
		
		//region Check the schema is valid
		const asn1 = compareSchema(schema,
			schema,
			PrivateKeyInfo.schema({
				names: {
					version: "version",
					privateKeyAlgorithm: {
						names: {
							blockName: "privateKeyAlgorithm"
						}
					},
					privateKey: "privateKey",
					attributes: "attributes"
				}
			})
		);

		if(asn1.verified === false)
			throw new Error("Object's schema was not verified against input data for PrivateKeyInfo");
		//endregion

		//region Get internal properties from parsed schema
		this.version = asn1.result.version.valueBlock.valueDec;
		this.privateKeyAlgorithm = new AlgorithmIdentifier({ schema: asn1.result.privateKeyAlgorithm });
		this.privateKey = asn1.result.privateKey;

		if("attributes" in asn1.result)
			this.attributes = Array.from(asn1.result.attributes, element => new Attribute({ schema: element }));

		switch(this.privateKeyAlgorithm.algorithmId)
		{
			case "1.2.840.113549.1.1.1": // RSA
				{
					const privateKeyASN1 = fromBER(this.privateKey.valueBlock.valueHex);
					if(privateKeyASN1.offset !== (-1))
						this.parsedKey = new RSAPrivateKey({ schema: privateKeyASN1.result });
				}
				break;
			case "1.2.840.10045.2.1": // ECDSA
				if("algorithmParams" in this.privateKeyAlgorithm)
				{
					if(this.privateKeyAlgorithm.algorithmParams instanceof ObjectIdentifier)
					{
						const privateKeyASN1 = fromBER(this.privateKey.valueBlock.valueHex);
						if(privateKeyASN1.offset !== (-1))
						{
							this.parsedKey = new ECPrivateKey({
								namedCurve: this.privateKeyAlgorithm.algorithmParams.valueBlock.toString(),
								schema: privateKeyASN1.result
							});
						}
					}
				}
				break;
			default:
		}
		//endregion
	}
	//**********************************************************************************
	/**
	 * Convert current object to asn1js object and set correct values
	 * @returns {Object} asn1js object
	 */
	toSchema()
	{
		//region Create array for output sequence
		const outputArray = [
			new Integer({ value: this.version }),
			this.privateKeyAlgorithm.toSchema(),
			this.privateKey
		];

		if("attributes" in this)
		{
			outputArray.push(new Constructed({
				optional: true,
				idBlock: {
					tagClass: 3, // CONTEXT-SPECIFIC
					tagNumber: 0 // [0]
				},
				value: Array.from(this.attributes, element => element.toSchema())
			}));
		}
		//endregion
		
		//region Construct and return new ASN.1 schema for this object
		return (new Sequence({
			value: outputArray
		}));
		//endregion
	}
	//**********************************************************************************
	/**
	 * Convertion for the class to JSON object
	 * @returns {Object}
	 */
	toJSON()
	{
		//region Return common value in case we do not have enough info fo making JWK
		if(("parsedKey" in this) === false)
		{
			const object = {
				version: this.version,
				privateKeyAlgorithm: this.privateKeyAlgorithm.toJSON(),
				privateKey: this.privateKey.toJSON()
			};

			if("attributes" in this)
				object.attributes = Array.from(this.attributes, element => element.toJSON());

			return object;
		}
		//endregion

		//region Making JWK
		const jwk = {};

		switch(this.privateKeyAlgorithm.algorithmId)
		{
			case "1.2.840.10045.2.1": // ECDSA
				jwk.kty = "EC";
				break;
			case "1.2.840.113549.1.1.1": // RSA
				jwk.kty = "RSA";
				break;
			default:
		}

		const publicKeyJWK = this.parsedKey.toJSON();

		for(const key of Object.keys(publicKeyJWK))
			jwk[key] = publicKeyJWK[key];

		return jwk;
		//endregion
	}
	//**********************************************************************************
	/**
	 * Convert JSON value into current object
	 * @param {Object} json
	 */
	fromJSON(json)
	{
		if("kty" in json)
		{
			switch(json.kty.toUpperCase())
			{
				case "EC":
					this.parsedKey = new ECPrivateKey({ json });

					this.privateKeyAlgorithm = new AlgorithmIdentifier({
						algorithmId: "1.2.840.10045.2.1",
						algorithmParams: new ObjectIdentifier({ value: this.parsedKey.namedCurve })
					});
					break;
				case "RSA":
					this.parsedKey = new RSAPrivateKey({ json });

					this.privateKeyAlgorithm = new AlgorithmIdentifier({
						algorithmId: "1.2.840.113549.1.1.1",
						algorithmParams: new Null()
					});
					break;
				default:
					throw new Error(`Invalid value for "kty" parameter: ${json.kty}`);
			}

			this.privateKey = new OctetString({ valueHex: this.parsedKey.toSchema().toBER(false) });
		}
	}
	//**********************************************************************************
}
//**************************************************************************************

//**************************************************************************************
/**
 * Class from RFC5652
 */
class EncryptedContentInfo
{
	//**********************************************************************************
	/**
	 * Constructor for EncryptedContentInfo class
	 * @param {Object} [parameters={}]
	 * @param {Object} [parameters.schema] asn1js parsed value to initialize the class from
	 */
	constructor(parameters = {})
	{
		//region Internal properties of the object
		/**
		 * @type {string}
		 * @desc contentType
		 */
		this.contentType = getParametersValue(parameters, "contentType", EncryptedContentInfo.defaultValues("contentType"));
		/**
		 * @type {AlgorithmIdentifier}
		 * @desc contentEncryptionAlgorithm
		 */
		this.contentEncryptionAlgorithm = getParametersValue(parameters, "contentEncryptionAlgorithm", EncryptedContentInfo.defaultValues("contentEncryptionAlgorithm"));

		if("encryptedContent" in parameters)
		{
			/**
			 * @type {OctetString}
			 * @desc encryptedContent (!!!) could be contructive or primitive value (!!!)
			 */
			this.encryptedContent = parameters.encryptedContent;
			
			if((this.encryptedContent.idBlock.tagClass === 1) &&
				(this.encryptedContent.idBlock.tagNumber === 4))
			{
				//region Divide OCTETSTRING value down to small pieces
				if(this.encryptedContent.idBlock.isConstructed === false)
				{
					const constrString = new OctetString({
						idBlock: { isConstructed: true },
						isConstructed: true
					});
					
					let offset = 0;
					let length = this.encryptedContent.valueBlock.valueHex.byteLength;
					
					while(length > 0)
					{
						const pieceView = new Uint8Array(this.encryptedContent.valueBlock.valueHex, offset, ((offset + 1024) > this.encryptedContent.valueBlock.valueHex.byteLength) ? (this.encryptedContent.valueBlock.valueHex.byteLength - offset) : 1024);
						const _array = new ArrayBuffer(pieceView.length);
						const _view = new Uint8Array(_array);
						
						for(let i = 0; i < _view.length; i++)
							_view[i] = pieceView[i];
						
						constrString.valueBlock.value.push(new OctetString({ valueHex: _array }));
						
						length -= pieceView.length;
						offset += pieceView.length;
					}
					
					this.encryptedContent = constrString;
				}
				//endregion
			}
		}
		//endregion

		//region If input argument array contains "schema" for this object
		if("schema" in parameters)
			this.fromSchema(parameters.schema);
		//endregion
	}
	//**********************************************************************************
	/**
	 * Return default values for all class members
	 * @param {string} memberName String name for a class member
	 */
	static defaultValues(memberName)
	{
		switch(memberName)
		{
			case "contentType":
				return "";
			case "contentEncryptionAlgorithm":
				return new AlgorithmIdentifier();
			case "encryptedContent":
				return new OctetString();
			default:
				throw new Error(`Invalid member name for EncryptedContentInfo class: ${memberName}`);
		}
	}
	//**********************************************************************************
	/**
	 * Compare values with default values for all class members
	 * @param {string} memberName String name for a class member
	 * @param {*} memberValue Value to compare with default value
	 */
	static compareWithDefault(memberName, memberValue)
	{
		switch(memberName)
		{
			case "contentType":
				return (memberValue === "");
			case "contentEncryptionAlgorithm":
				return ((memberValue.algorithmId === "") && (("algorithmParams" in memberValue) === false));
			case "encryptedContent":
				return (memberValue.isEqual(EncryptedContentInfo.defaultValues(memberName)));
			default:
				throw new Error(`Invalid member name for EncryptedContentInfo class: ${memberName}`);
		}
	}
	//**********************************************************************************
	/**
	 * Return value of pre-defined ASN.1 schema for current class
	 *
	 * ASN.1 schema:
	 * ```asn1
	 * EncryptedContentInfo ::= SEQUENCE {
	 *    contentType ContentType,
	 *    contentEncryptionAlgorithm ContentEncryptionAlgorithmIdentifier,
	 *    encryptedContent [0] IMPLICIT EncryptedContent OPTIONAL }
	 *
	 * Comment: Strange, but modern crypto engines create "encryptedContent" as "[0] EXPLICIT EncryptedContent"
	 *
	 * EncryptedContent ::= OCTET STRING
	 * ```
	 *
	 * @param {Object} parameters Input parameters for the schema
	 * @returns {Object} asn1js schema object
	 */
	static schema(parameters = {})
	{
		/**
		 * @type {Object}
		 * @property {string} [blockName]
		 * @property {string} [contentType]
		 * @property {string} [contentEncryptionAlgorithm]
		 * @property {string} [encryptedContent]
		 */
		const names = getParametersValue(parameters, "names", {});

		return (new Sequence({
			name: (names.blockName || ""),
			value: [
				new ObjectIdentifier({ name: (names.contentType || "") }),
				AlgorithmIdentifier.schema(names.contentEncryptionAlgorithm || {}),
				// The CHOICE we need because "EncryptedContent" could have either "constructive"
				// or "primitive" form of encoding and we need to handle both variants
				new Choice({
					value: [
						new Constructed({
							name: (names.encryptedContent || ""),
							idBlock: {
								tagClass: 3, // CONTEXT-SPECIFIC
								tagNumber: 0 // [0]
							},
							value: [
								new Repeated({
									value: new OctetString()
								})
							]
						}),
						new Primitive({
							name: (names.encryptedContent || ""),
							idBlock: {
								tagClass: 3, // CONTEXT-SPECIFIC
								tagNumber: 0 // [0]
							}
						})
					]
				})
			]
		}));
	}
	//**********************************************************************************
	/**
	 * Convert parsed asn1js object into current class
	 * @param {!Object} schema
	 */
	fromSchema(schema)
	{
		//region Clear input data first
		clearProps(schema, [
			"contentType",
			"contentEncryptionAlgorithm",
			"encryptedContent"
		]);
		//endregion
		
		//region Check the schema is valid
		const asn1 = compareSchema(schema,
			schema,
			EncryptedContentInfo.schema({
				names: {
					contentType: "contentType",
					contentEncryptionAlgorithm: {
						names: {
							blockName: "contentEncryptionAlgorithm"
						}
					},
					encryptedContent: "encryptedContent"
				}
			})
		);

		if(asn1.verified === false)
			throw new Error("Object's schema was not verified against input data for EncryptedContentInfo");
		//endregion

		//region Get internal properties from parsed schema
		this.contentType = asn1.result.contentType.valueBlock.toString();
		this.contentEncryptionAlgorithm = new AlgorithmIdentifier({ schema: asn1.result.contentEncryptionAlgorithm });

		if("encryptedContent" in asn1.result)
		{
			this.encryptedContent = asn1.result.encryptedContent;

			this.encryptedContent.idBlock.tagClass = 1; // UNIVERSAL
			this.encryptedContent.idBlock.tagNumber = 4; // OCTETSTRING (!!!) The value still has instance of "in_window.org.pkijs.asn1.ASN1_CONSTRUCTED / ASN1_PRIMITIVE"
		}
		//endregion
	}
	//**********************************************************************************
	/**
	 * Convert current object to asn1js object and set correct values
	 * @returns {Object} asn1js object
	 */
	toSchema()
	{
		//region Create array for output sequence
		const sequenceLengthBlock = {
			isIndefiniteForm: false
		};

		const outputArray = [];

		outputArray.push(new ObjectIdentifier({ value: this.contentType }));
		outputArray.push(this.contentEncryptionAlgorithm.toSchema());

		if("encryptedContent" in this)
		{
			sequenceLengthBlock.isIndefiniteForm = this.encryptedContent.idBlock.isConstructed;

			const encryptedValue = this.encryptedContent;

			encryptedValue.idBlock.tagClass = 3; // CONTEXT-SPECIFIC
			encryptedValue.idBlock.tagNumber = 0; // [0]

			encryptedValue.lenBlock.isIndefiniteForm = this.encryptedContent.idBlock.isConstructed;

			outputArray.push(encryptedValue);
		}
		//endregion

		//region Construct and return new ASN.1 schema for this object
		return (new Sequence({
			lenBlock: sequenceLengthBlock,
			value: outputArray
		}));
		//endregion
	}
	//**********************************************************************************
	/**
	 * Convertion for the class to JSON object
	 * @returns {Object}
	 */
	toJSON()
	{
		const _object = {
			contentType: this.contentType,
			contentEncryptionAlgorithm: this.contentEncryptionAlgorithm.toJSON()
		};

		if("encryptedContent" in this)
			_object.encryptedContent = this.encryptedContent.toJSON();

		return _object;
	}
	//**********************************************************************************
}
//**************************************************************************************

//**************************************************************************************
/**
 * Class from RFC4055
 */
class RSASSAPSSParams
{
	//**********************************************************************************
	/**
	 * Constructor for RSASSAPSSParams class
	 * @param {Object} [parameters={}]
	 * @param {Object} [parameters.schema] asn1js parsed value to initialize the class from
	 */
	constructor(parameters = {})
	{
		//region Internal properties of the object
		/**
		 * @type {AlgorithmIdentifier}
		 * @desc Algorithms of hashing (DEFAULT sha1)
		 */
		this.hashAlgorithm = getParametersValue(parameters, "hashAlgorithm", RSASSAPSSParams.defaultValues("hashAlgorithm"));
		/**
		 * @type {AlgorithmIdentifier}
		 * @desc Algorithm of "mask generaion function (MGF)" (DEFAULT mgf1SHA1)
		 */
		this.maskGenAlgorithm = getParametersValue(parameters, "maskGenAlgorithm", RSASSAPSSParams.defaultValues("maskGenAlgorithm"));
		/**
		 * @type {number}
		 * @desc Salt length (DEFAULT 20)
		 */
		this.saltLength = getParametersValue(parameters, "saltLength", RSASSAPSSParams.defaultValues("saltLength"));
		/**
		 * @type {number}
		 * @desc (DEFAULT 1)
		 */
		this.trailerField = getParametersValue(parameters, "trailerField", RSASSAPSSParams.defaultValues("trailerField"));
		//endregion

		//region If input argument array contains "schema" for this object
		if("schema" in parameters)
			this.fromSchema(parameters.schema);
		//endregion
	}
	//**********************************************************************************
	/**
	 * Return default values for all class members
	 * @param {string} memberName String name for a class member
	 */
	static defaultValues(memberName)
	{
		switch(memberName)
		{
			case "hashAlgorithm":
				return new AlgorithmIdentifier({
					algorithmId: "1.3.14.3.2.26", // SHA-1
					algorithmParams: new Null()
				});
			case "maskGenAlgorithm":
				return new AlgorithmIdentifier({
					algorithmId: "1.2.840.113549.1.1.8", // MGF1
					algorithmParams: (new AlgorithmIdentifier({
						algorithmId: "1.3.14.3.2.26", // SHA-1
						algorithmParams: new Null()
					})).toSchema()
				});
			case "saltLength":
				return 20;
			case "trailerField":
				return 1;
			default:
				throw new Error(`Invalid member name for RSASSAPSSParams class: ${memberName}`);
		}
	}
	//**********************************************************************************
	/**
	 * Return value of pre-defined ASN.1 schema for current class
	 *
	 * ASN.1 schema:
	 * ```asn1
	 * RSASSA-PSS-params  ::=  Sequence  {
	 *    hashAlgorithm      [0] HashAlgorithm DEFAULT sha1Identifier,
	 *    maskGenAlgorithm   [1] MaskGenAlgorithm DEFAULT mgf1SHA1Identifier,
	 *    saltLength         [2] Integer DEFAULT 20,
	 *    trailerField       [3] Integer DEFAULT 1  }
	 * ```
	 *
	 * @param {Object} parameters Input parameters for the schema
	 * @returns {Object} asn1js schema object
	 */
	static schema(parameters = {})
	{
		/**
		 * @type {Object}
		 * @property {string} [blockName]
		 * @property {string} [hashAlgorithm]
		 * @property {string} [maskGenAlgorithm]
		 * @property {string} [saltLength]
		 * @property {string} [trailerField]
		 */
		const names = getParametersValue(parameters, "names", {});

		return (new Sequence({
			name: (names.blockName || ""),
			value: [
				new Constructed({
					idBlock: {
						tagClass: 3, // CONTEXT-SPECIFIC
						tagNumber: 0 // [0]
					},
					optional: true,
					value: [AlgorithmIdentifier.schema(names.hashAlgorithm || {})]
				}),
				new Constructed({
					idBlock: {
						tagClass: 3, // CONTEXT-SPECIFIC
						tagNumber: 1 // [1]
					},
					optional: true,
					value: [AlgorithmIdentifier.schema(names.maskGenAlgorithm || {})]
				}),
				new Constructed({
					idBlock: {
						tagClass: 3, // CONTEXT-SPECIFIC
						tagNumber: 2 // [2]
					},
					optional: true,
					value: [new Integer({ name: (names.saltLength || "") })]
				}),
				new Constructed({
					idBlock: {
						tagClass: 3, // CONTEXT-SPECIFIC
						tagNumber: 3 // [3]
					},
					optional: true,
					value: [new Integer({ name: (names.trailerField || "") })]
				})
			]
		}));
	}
	//**********************************************************************************
	/**
	 * Convert parsed asn1js object into current class
	 * @param {!Object} schema
	 */
	fromSchema(schema)
	{
		//region Clear input data first
		clearProps(schema, [
			"hashAlgorithm",
			"maskGenAlgorithm",
			"saltLength",
			"trailerField"
		]);
		//endregion
		
		//region Check the schema is valid
		const asn1 = compareSchema(schema,
			schema,
			RSASSAPSSParams.schema({
				names: {
					hashAlgorithm: {
						names: {
							blockName: "hashAlgorithm"
						}
					},
					maskGenAlgorithm: {
						names: {
							blockName: "maskGenAlgorithm"
						}
					},
					saltLength: "saltLength",
					trailerField: "trailerField"
				}
			})
		);

		if(asn1.verified === false)
			throw new Error("Object's schema was not verified against input data for RSASSAPSSParams");
		//endregion

		//region Get internal properties from parsed schema
		if("hashAlgorithm" in asn1.result)
			this.hashAlgorithm = new AlgorithmIdentifier({ schema: asn1.result.hashAlgorithm });

		if("maskGenAlgorithm" in asn1.result)
			this.maskGenAlgorithm = new AlgorithmIdentifier({ schema: asn1.result.maskGenAlgorithm });

		if("saltLength" in asn1.result)
			this.saltLength = asn1.result.saltLength.valueBlock.valueDec;

		if("trailerField" in asn1.result)
			this.trailerField = asn1.result.trailerField.valueBlock.valueDec;
		//endregion
	}
	//**********************************************************************************
	/**
	 * Convert current object to asn1js object and set correct values
	 * @returns {Object} asn1js object
	 */
	toSchema()
	{
		//region Create array for output sequence
		const outputArray = [];
		
		if(!this.hashAlgorithm.isEqual(RSASSAPSSParams.defaultValues("hashAlgorithm")))
		{
			outputArray.push(new Constructed({
				idBlock: {
					tagClass: 3, // CONTEXT-SPECIFIC
					tagNumber: 0 // [0]
				},
				value: [this.hashAlgorithm.toSchema()]
			}));
		}
		
		if(!this.maskGenAlgorithm.isEqual(RSASSAPSSParams.defaultValues("maskGenAlgorithm")))
		{
			outputArray.push(new Constructed({
				idBlock: {
					tagClass: 3, // CONTEXT-SPECIFIC
					tagNumber: 1 // [1]
				},
				value: [this.maskGenAlgorithm.toSchema()]
			}));
		}
		
		if(this.saltLength !== RSASSAPSSParams.defaultValues("saltLength"))
		{
			outputArray.push(new Constructed({
				idBlock: {
					tagClass: 3, // CONTEXT-SPECIFIC
					tagNumber: 2 // [2]
				},
				value: [new Integer({ value: this.saltLength })]
			}));
		}
		
		if(this.trailerField !== RSASSAPSSParams.defaultValues("trailerField"))
		{
			outputArray.push(new Constructed({
				idBlock: {
					tagClass: 3, // CONTEXT-SPECIFIC
					tagNumber: 3 // [3]
				},
				value: [new Integer({ value: this.trailerField })]
			}));
		}
		//endregion
		
		//region Construct and return new ASN.1 schema for this object
		return (new Sequence({
			value: outputArray
		}));
		//endregion
	}
	//**********************************************************************************
	/**
	 * Convertion for the class to JSON object
	 * @returns {Object}
	 */
	toJSON()
	{
		const object = {};

		if(!this.hashAlgorithm.isEqual(RSASSAPSSParams.defaultValues("hashAlgorithm")))
			object.hashAlgorithm = this.hashAlgorithm.toJSON();

		if(!this.maskGenAlgorithm.isEqual(RSASSAPSSParams.defaultValues("maskGenAlgorithm")))
			object.maskGenAlgorithm = this.maskGenAlgorithm.toJSON();

		if(this.saltLength !== RSASSAPSSParams.defaultValues("saltLength"))
			object.saltLength = this.saltLength;

		if(this.trailerField !== RSASSAPSSParams.defaultValues("trailerField"))
			object.trailerField = this.trailerField;

		return object;
	}
	//**********************************************************************************
}
//**************************************************************************************

//**************************************************************************************
/**
 * Class from RFC2898
 */
class PBKDF2Params
{
	//**********************************************************************************
	/**
	 * Constructor for PBKDF2Params class
	 * @param {Object} [parameters={}]
	 * @param {Object} [parameters.schema] asn1js parsed value to initialize the class from
	 */
	constructor(parameters = {})
	{
		//region Internal properties of the object
		/**
		 * @type {Object}
		 * @desc salt
		 */
		this.salt = getParametersValue(parameters, "salt", PBKDF2Params.defaultValues("salt"));
		/**
		 * @type {number}
		 * @desc iterationCount
		 */
		this.iterationCount = getParametersValue(parameters, "iterationCount", PBKDF2Params.defaultValues("iterationCount"));
		
		if("keyLength" in parameters)
			/**
			 * @type {number}
			 * @desc keyLength
			 */
			this.keyLength = getParametersValue(parameters, "keyLength", PBKDF2Params.defaultValues("keyLength"));
		
		if("prf" in parameters)
			/**
			 * @type {AlgorithmIdentifier}
			 * @desc prf
			 */
			this.prf = getParametersValue(parameters, "prf", PBKDF2Params.defaultValues("prf"));
		//endregion

		//region If input argument array contains "schema" for this object
		if("schema" in parameters)
			this.fromSchema(parameters.schema);
		//endregion
	}
	//**********************************************************************************
	/**
	 * Return default values for all class members
	 * @param {string} memberName String name for a class member
	 */
	static defaultValues(memberName)
	{
		switch(memberName)
		{
			case "salt":
				return {};
			case "iterationCount":
				return (-1);
			case "keyLength":
				return 0;
			case "prf":
				return new AlgorithmIdentifier({
					algorithmId: "1.3.14.3.2.26", // SHA-1
					algorithmParams: new Null()
				});
			default:
				throw new Error(`Invalid member name for PBKDF2Params class: ${memberName}`);
		}
	}
	//**********************************************************************************
	/**
	 * Return value of pre-defined ASN.1 schema for current class
	 *
	 * ASN.1 schema:
	 * ```asn1
	 * PBKDF2-params ::= SEQUENCE {
	 *    salt CHOICE {
	 *        specified OCTET STRING,
	 *        otherSource AlgorithmIdentifier },
	 *  iterationCount INTEGER (1..MAX),
	 *  keyLength INTEGER (1..MAX) OPTIONAL,
	 *  prf AlgorithmIdentifier
	 *    DEFAULT { algorithm hMAC-SHA1, parameters NULL } }
	 * ```
	 *
	 * @param {Object} parameters Input parameters for the schema
	 * @returns {Object} asn1js schema object
	 */
	static schema(parameters = {})
	{
		/**
		 * @type {Object}
		 * @property {string} [blockName]
		 * @property {string} [saltPrimitive]
		 * @property {string} [saltConstructed]
		 * @property {string} [iterationCount]
		 * @property {string} [keyLength]
		 * @property {string} [prf]
		 */
		const names = getParametersValue(parameters, "names", {});

		return (new Sequence({
			name: (names.blockName || ""),
			value: [
				new Choice({
					value: [
						new OctetString({ name: (names.saltPrimitive || "") }),
						AlgorithmIdentifier.schema(names.saltConstructed || {})
					]
				}),
				new Integer({ name: (names.iterationCount || "") }),
				new Integer({
					name: (names.keyLength || ""),
					optional: true
				}),
				AlgorithmIdentifier.schema(names.prf || {
					names: {
						optional: true
					}
				})
			]
		}));
	}
	//**********************************************************************************
	/**
	 * Convert parsed asn1js object into current class
	 * @param {!Object} schema
	 */
	fromSchema(schema)
	{
		//region Clear input data first
		clearProps(schema, [
			"salt",
			"iterationCount",
			"keyLength",
			"prf"
		]);
		//endregion
		
		//region Check the schema is valid
		const asn1 = compareSchema(schema,
			schema,
			PBKDF2Params.schema({
				names: {
					saltPrimitive: "salt",
					saltConstructed: {
						names: {
							blockName: "salt"
						}
					},
					iterationCount: "iterationCount",
					keyLength: "keyLength",
					prf: {
						names: {
							blockName: "prf",
							optional: true
						}
					}
				}
			})
		);

		if(asn1.verified === false)
			throw new Error("Object's schema was not verified against input data for PBKDF2Params");
		//endregion

		//region Get internal properties from parsed schema
		this.salt = asn1.result.salt;
		this.iterationCount = asn1.result.iterationCount.valueBlock.valueDec;

		if("keyLength" in asn1.result)
			this.keyLength = asn1.result.keyLength.valueBlock.valueDec;

		if("prf" in asn1.result)
			this.prf = new AlgorithmIdentifier({ schema: asn1.result.prf });
		//endregion
	}
	//**********************************************************************************
	/**
	 * Convert current object to asn1js object and set correct values
	 * @returns {Object} asn1js object
	 */
	toSchema()
	{
		//region Create array for output sequence 
		const outputArray = [];
		
		outputArray.push(this.salt);
		outputArray.push(new Integer({ value: this.iterationCount }));
		
		if("keyLength" in this)
		{
			if(PBKDF2Params.defaultValues("keyLength") !== this.keyLength)
				outputArray.push(new Integer({ value: this.keyLength }));
		}
		
		if("prf" in this)
		{
			if(PBKDF2Params.defaultValues("prf").isEqual(this.prf) === false)
				outputArray.push(this.prf.toSchema());
		}
		//endregion 
		
		//region Construct and return new ASN.1 schema for this object 
		return (new Sequence({
			value: outputArray
		}));
		//endregion 
	}
	//**********************************************************************************
	/**
	 * Convertion for the class to JSON object
	 * @returns {Object}
	 */
	toJSON()
	{
		const _object = {
			salt: this.salt.toJSON(),
			iterationCount: this.iterationCount
		};
		
		if("keyLength" in this)
		{
			if(PBKDF2Params.defaultValues("keyLength") !== this.keyLength)
				_object.keyLength = this.keyLength;
		}
		
		if("prf" in this)
		{
			if(PBKDF2Params.defaultValues("prf").isEqual(this.prf) === false)
				_object.prf = this.prf.toJSON();
		}

		return _object;
	}
	//**********************************************************************************
}
//**************************************************************************************

//**************************************************************************************
/**
 * Class from RFC2898
 */
class PBES2Params
{
	//**********************************************************************************
	/**
	 * Constructor for PBES2Params class
	 * @param {Object} [parameters={}]
	 * @param {Object} [parameters.schema] asn1js parsed value to initialize the class from
	 */
	constructor(parameters = {})
	{
		//region Internal properties of the object
		/**
		 * @type {AlgorithmIdentifier}
		 * @desc keyDerivationFunc
		 */
		this.keyDerivationFunc = getParametersValue(parameters, "keyDerivationFunc", PBES2Params.defaultValues("keyDerivationFunc"));
		/**
		 * @type {AlgorithmIdentifier}
		 * @desc encryptionScheme
		 */
		this.encryptionScheme = getParametersValue(parameters, "encryptionScheme", PBES2Params.defaultValues("encryptionScheme"));
		//endregion

		//region If input argument array contains "schema" for this object
		if("schema" in parameters)
			this.fromSchema(parameters.schema);
		//endregion
	}
	//**********************************************************************************
	/**
	 * Return default values for all class members
	 * @param {string} memberName String name for a class member
	 */
	static defaultValues(memberName)
	{
		switch(memberName)
		{
			case "keyDerivationFunc":
				return new AlgorithmIdentifier();
			case "encryptionScheme":
				return new AlgorithmIdentifier();
			default:
				throw new Error(`Invalid member name for PBES2Params class: ${memberName}`);
		}
	}
	//**********************************************************************************
	/**
	 * Return value of pre-defined ASN.1 schema for current class
	 *
	 * ASN.1 schema:
	 * ```asn1
	 * PBES2-params ::= SEQUENCE {
	 *    keyDerivationFunc AlgorithmIdentifier {{PBES2-KDFs}},
	 *    encryptionScheme AlgorithmIdentifier {{PBES2-Encs}} }
	 * ```
	 *
	 * @param {Object} parameters Input parameters for the schema
	 * @returns {Object} asn1js schema object
	 */
	static schema(parameters = {})
	{
		/**
		 * @type {Object}
		 * @property {string} [blockName]
		 * @property {string} [keyDerivationFunc]
		 * @property {string} [encryptionScheme]
		 */
		const names = getParametersValue(parameters, "names", {});

		return (new Sequence({
			name: (names.blockName || ""),
			value: [
				AlgorithmIdentifier.schema(names.keyDerivationFunc || {}),
				AlgorithmIdentifier.schema(names.encryptionScheme || {})
			]
		}));
	}
	//**********************************************************************************
	/**
	 * Convert parsed asn1js object into current class
	 * @param {!Object} schema
	 */
	fromSchema(schema)
	{
		//region Clear input data first
		clearProps(schema, [
			"keyDerivationFunc",
			"encryptionScheme"
		]);
		//endregion
		
		//region Check the schema is valid
		const asn1 = compareSchema(schema,
			schema,
			PBES2Params.schema({
				names: {
					keyDerivationFunc: {
						names: {
							blockName: "keyDerivationFunc"
						}
					},
					encryptionScheme: {
						names: {
							blockName: "encryptionScheme"
						}
					}
				}
			})
		);

		if(asn1.verified === false)
			throw new Error("Object's schema was not verified against input data for PBES2Params");
		//endregion

		//region Get internal properties from parsed schema
		this.keyDerivationFunc = new AlgorithmIdentifier({ schema: asn1.result.keyDerivationFunc });
		this.encryptionScheme = new AlgorithmIdentifier({ schema: asn1.result.encryptionScheme });
		//endregion
	}
	//**********************************************************************************
	/**
	 * Convert current object to asn1js object and set correct values
	 * @returns {Object} asn1js object
	 */
	toSchema()
	{
		//region Construct and return new ASN.1 schema for this object
		return (new Sequence({
			value: [
				this.keyDerivationFunc.toSchema(),
				this.encryptionScheme.toSchema()
			]
		}));
		//endregion
	}
	//**********************************************************************************
	/**
	 * Convertion for the class to JSON object
	 * @returns {Object}
	 */
	toJSON()
	{
		return {
			keyDerivationFunc: this.keyDerivationFunc.toJSON(),
			encryptionScheme: this.encryptionScheme.toJSON()
		};
	}
	//**********************************************************************************
}
//**************************************************************************************

//**************************************************************************************
/**
 * Making MAC key using algorithm described in B.2 of PKCS#12 standard.
 */
function makePKCS12B2Key(cryptoEngine, hashAlgorithm, keyLength, password, salt, iterationCount)
{
	//region Initial variables
	let u;
	let v;
	
	const result = [];
	//endregion
	
	//region Get "u" and "v" values
	switch(hashAlgorithm.toUpperCase())
	{
		case "SHA-1":
			u = 20; // 160
			v = 64; // 512
			break;
		case "SHA-256":
			u = 32; // 256
			v = 64; // 512
			break;
		case "SHA-384":
			u = 48; // 384
			v = 128; // 1024
			break;
		case "SHA-512":
			u = 64; // 512
			v = 128; // 1024
			break;
		default:
			throw new Error("Unsupported hashing algorithm");
	}
	//endregion
	
	//region Main algorithm making key
	//region Transform password to UTF-8 like string
	const passwordViewInitial = new Uint8Array(password);
	
	const passwordTransformed = new ArrayBuffer((password.byteLength * 2) + 2);
	const passwordTransformedView = new Uint8Array(passwordTransformed);
	
	for(let i = 0; i < passwordViewInitial.length; i++)
	{
		passwordTransformedView[i * 2] = 0x00;
		passwordTransformedView[i * 2 + 1] = passwordViewInitial[i];
	}
	
	passwordTransformedView[passwordTransformedView.length - 2] = 0x00;
	passwordTransformedView[passwordTransformedView.length - 1] = 0x00;
	
	password = passwordTransformed.slice(0);
	//endregion
	
	//region Construct a string D (the "diversifier") by concatenating v/8 copies of ID
	const D = new ArrayBuffer(v);
	const dView = new Uint8Array(D);
	
	for(let i = 0; i < D.byteLength; i++)
		dView[i] = 3; // The ID value equal to "3" for MACing (see B.3 of standard)
	//endregion
	
	//region Concatenate copies of the salt together to create a string S of length v * ceil(s / v) bytes (the final copy of the salt may be trunacted to create S)
	const saltLength = salt.byteLength;
	
	const sLen = v * Math.ceil(saltLength / v);
	const S = new ArrayBuffer(sLen);
	const sView = new Uint8Array(S);
	
	const saltView = new Uint8Array(salt);
	
	for(let i = 0; i < sLen; i++)
		sView[i] = saltView[i % saltLength];
	//endregion
	
	//region Concatenate copies of the password together to create a string P of length v * ceil(p / v) bytes (the final copy of the password may be truncated to create P)
	const passwordLength = password.byteLength;
	
	const pLen = v * Math.ceil(passwordLength / v);
	const P = new ArrayBuffer(pLen);
	const pView = new Uint8Array(P);
	
	const passwordView = new Uint8Array(password);
	
	for(let i = 0; i < pLen; i++)
		pView[i] = passwordView[i % passwordLength];
	//endregion
	
	//region Set I=S||P to be the concatenation of S and P
	const sPlusPLength = S.byteLength + P.byteLength;
	
	let I = new ArrayBuffer(sPlusPLength);
	let iView = new Uint8Array(I);
	
	iView.set(sView);
	iView.set(pView, sView.length);
	//endregion
	
	//region Set c=ceil(n / u)
	const c = Math.ceil((keyLength >> 3) / u);
	//endregion
	
	//region Initial variables
	let internalSequence = Promise.resolve(I);
	//endregion
	
	//region For i=1, 2, ..., c, do the following:
	for(let i = 0; i <= c; i++)
	{
		internalSequence = internalSequence.then(_I =>
		{
			//region Create contecanetion of D and I
			const dAndI = new ArrayBuffer(D.byteLength + _I.byteLength);
			const dAndIView = new Uint8Array(dAndI);
			
			dAndIView.set(dView);
			dAndIView.set(iView, dView.length);
			//endregion
			
			return dAndI;
		});
		
		//region Make "iterationCount" rounds of hashing
		for(let j = 0; j < iterationCount; j++)
			internalSequence = internalSequence.then(roundBuffer => cryptoEngine.digest({ name: hashAlgorithm }, new Uint8Array(roundBuffer)));
		//endregion
		
		internalSequence = internalSequence.then(roundBuffer =>
		{
			//region Concatenate copies of Ai to create a string B of length v bits (the final copy of Ai may be truncated to create B)
			const B = new ArrayBuffer(v);
			const bView = new Uint8Array(B);
			
			for(let j = 0; j < B.byteLength; j++)
				bView[j] = roundBuffer[j % roundBuffer.length];
			//endregion
			
			//region Make new I value
			const k = Math.ceil(saltLength / v) + Math.ceil(passwordLength / v);
			const iRound = [];
			
			let sliceStart = 0;
			let sliceLength = v;
			
			for(let j = 0; j < k; j++)
			{
				const chunk = Array.from(new Uint8Array(I.slice(sliceStart, sliceStart + sliceLength)));
				sliceStart += v;
				if((sliceStart + v) > I.byteLength)
					sliceLength = I.byteLength - sliceStart;
				
				let x = 0x1ff;
				
				for(let l = (B.byteLength - 1); l >= 0; l--)
				{
					x >>= 8;
					x += bView[l] + chunk[l];
					chunk[l] = (x & 0xff);
				}
				
				iRound.push(...chunk);
			}
			
			I = new ArrayBuffer(iRound.length);
			iView = new Uint8Array(I);
			
			iView.set(iRound);
			//endregion
			
			result.push(...(new Uint8Array(roundBuffer)));
			
			return I;
		});
	}
	//endregion
	
	//region Initialize final key
	internalSequence = internalSequence.then(() =>
	{
		const resultBuffer = new ArrayBuffer(keyLength >> 3);
		const resultView = new Uint8Array(resultBuffer);
		
		resultView.set((new Uint8Array(result)).slice(0, keyLength >> 3));
		
		return resultBuffer;
	});
	//endregion
	//endregion
	
	return internalSequence;
}
//**************************************************************************************
/**
 * Default cryptographic engine for Web Cryptography API
 */
class CryptoEngine
{
	//**********************************************************************************
	/**
	 * Constructor for CryptoEngine class
	 * @param {Object} [parameters={}]
	 * @param {Object} [parameters.schema] asn1js parsed value to initialize the class from
	 */
	constructor(parameters = {})
	{
		//region Internal properties of the object
		/**
		 * @type {Object}
		 * @desc Usually here we are expecting "window.crypto" or an equivalent from custom "crypto engine"
		 */
		this.crypto = getParametersValue(parameters, "crypto", {});
		/**
		 * @type {Object}
		 * @desc Usually here we are expecting "window.crypto.subtle" or an equivalent from custom "crypto engine"
		 */
		this.subtle = getParametersValue(parameters, "subtle", {});
		/**
		 * @type {string}
		 * @desc Name of the "crypto engine"
		 */
		this.name = getParametersValue(parameters, "name", "");
		//endregion
	}
	//**********************************************************************************
	/**
	 * Import WebCrypto keys from different formats
	 * @param {string} format
	 * @param {ArrayBuffer|Uint8Array} keyData
	 * @param {Object} algorithm
	 * @param {boolean} extractable
	 * @param {Array} keyUsages
	 * @returns {Promise}
	 */
	importKey(format, keyData, algorithm, extractable, keyUsages)
	{
		//region Initial variables
		let jwk = {};
		//endregion
		
		//region Change "keyData" type if needed
		if(keyData instanceof Uint8Array)
			keyData = keyData.buffer;
		//endregion
		
		switch(format.toLowerCase())
		{
			case "raw":
				return this.subtle.importKey("raw", keyData, algorithm, extractable, keyUsages);
			case "spki":
				{
					const asn1 = fromBER(keyData);
					if(asn1.offset === (-1))
						return Promise.reject("Incorrect keyData");

					const publicKeyInfo = new PublicKeyInfo();
					try
					{
						publicKeyInfo.fromSchema(asn1.result);
					}
					catch(ex)
					{
						return Promise.reject("Incorrect keyData");
					}


					// noinspection FallThroughInSwitchStatementJS
					switch(algorithm.name.toUpperCase())
					{
						case "RSA-PSS":
							{
								//region Get information about used hash function
								switch(algorithm.hash.name.toUpperCase())
								{
									case "SHA-1":
										jwk.alg = "PS1";
										break;
									case "SHA-256":
										jwk.alg = "PS256";
										break;
									case "SHA-384":
										jwk.alg = "PS384";
										break;
									case "SHA-512":
										jwk.alg = "PS512";
										break;
									default:
										return Promise.reject(`Incorrect hash algorithm: ${algorithm.hash.name.toUpperCase()}`);
								}
								//endregion
							}
							// break omitted
						case "RSASSA-PKCS1-V1_5":
							{
								keyUsages = ["verify"]; // Override existing keyUsages value since the key is a public key

								jwk.kty = "RSA";
								jwk.ext = extractable;
								jwk.key_ops = keyUsages;

								if(publicKeyInfo.algorithm.algorithmId !== "1.2.840.113549.1.1.1")
									return Promise.reject(`Incorrect public key algorithm: ${publicKeyInfo.algorithm.algorithmId}`);

								//region Get information about used hash function
								if(("alg" in jwk) === false)
								{
									switch(algorithm.hash.name.toUpperCase())
									{
										case "SHA-1":
											jwk.alg = "RS1";
											break;
										case "SHA-256":
											jwk.alg = "RS256";
											break;
										case "SHA-384":
											jwk.alg = "RS384";
											break;
										case "SHA-512":
											jwk.alg = "RS512";
											break;
										default:
											return Promise.reject(`Incorrect public key algorithm: ${publicKeyInfo.algorithm.algorithmId}`);
									}
								}
								//endregion

								//region Create RSA Public Key elements
								const publicKeyJSON = publicKeyInfo.toJSON();

								for(const key of Object.keys(publicKeyJSON))
									jwk[key] = publicKeyJSON[key];
								//endregion
							}
							break;
						case "ECDSA":
							keyUsages = ["verify"]; // Override existing keyUsages value since the key is a public key
							// break omitted
						case "ECDH":
							{
								//region Initial variables
								jwk = {
									kty: "EC",
									ext: extractable,
									key_ops: keyUsages
								};
								//endregion

								//region Get information about algorithm
								if(publicKeyInfo.algorithm.algorithmId !== "1.2.840.10045.2.1")
									return Promise.reject(`Incorrect public key algorithm: ${publicKeyInfo.algorithm.algorithmId}`);
								//endregion

								//region Create ECDSA Public Key elements
								const publicKeyJSON = publicKeyInfo.toJSON();

								for(const key of Object.keys(publicKeyJSON))
									jwk[key] = publicKeyJSON[key];
								//endregion
							}
							break;
						case "RSA-OAEP":
							{
								jwk.kty = "RSA";
								jwk.ext = extractable;
								jwk.key_ops = keyUsages;
								
								if(this.name.toLowerCase() === "safari")
									jwk.alg = "RSA-OAEP";
								else
								{
									switch(algorithm.hash.name.toUpperCase())
									{
										case "SHA-1":
											jwk.alg = "RSA-OAEP";
											break;
										case "SHA-256":
											jwk.alg = "RSA-OAEP-256";
											break;
										case "SHA-384":
											jwk.alg = "RSA-OAEP-384";
											break;
										case "SHA-512":
											jwk.alg = "RSA-OAEP-512";
											break;
										default:
											return Promise.reject(`Incorrect public key algorithm: ${publicKeyInfo.algorithm.algorithmId}`);
									}
								}
								
								//region Create ECDSA Public Key elements
								const publicKeyJSON = publicKeyInfo.toJSON();
								
								for(const key of Object.keys(publicKeyJSON))
									jwk[key] = publicKeyJSON[key];
								//endregion
							}
							break;
						default:
							return Promise.reject(`Incorrect algorithm name: ${algorithm.name.toUpperCase()}`);
					}
				}
				break;
			case "pkcs8":
				{
					const privateKeyInfo = new PrivateKeyInfo();

					//region Parse "PrivateKeyInfo" object
					const asn1 = fromBER(keyData);
					if(asn1.offset === (-1))
						return Promise.reject("Incorrect keyData");

					try
					{
						privateKeyInfo.fromSchema(asn1.result);
					}
					catch(ex)
					{
						return Promise.reject("Incorrect keyData");
					}
					
					if(("parsedKey" in privateKeyInfo) === false)
						return Promise.reject("Incorrect keyData");
					//endregion

					// noinspection FallThroughInSwitchStatementJS
					// noinspection FallThroughInSwitchStatementJS
					switch(algorithm.name.toUpperCase())
					{
						case "RSA-PSS":
							{
								//region Get information about used hash function
								switch(algorithm.hash.name.toUpperCase())
								{
									case "SHA-1":
										jwk.alg = "PS1";
										break;
									case "SHA-256":
										jwk.alg = "PS256";
										break;
									case "SHA-384":
										jwk.alg = "PS384";
										break;
									case "SHA-512":
										jwk.alg = "PS512";
										break;
									default:
										return Promise.reject(`Incorrect hash algorithm: ${algorithm.hash.name.toUpperCase()}`);
								}
								//endregion
							}
							// break omitted
						case "RSASSA-PKCS1-V1_5":
							{
								keyUsages = ["sign"]; // Override existing keyUsages value since the key is a private key

								jwk.kty = "RSA";
								jwk.ext = extractable;
								jwk.key_ops = keyUsages;

								//region Get information about used hash function
								if(privateKeyInfo.privateKeyAlgorithm.algorithmId !== "1.2.840.113549.1.1.1")
									return Promise.reject(`Incorrect private key algorithm: ${privateKeyInfo.privateKeyAlgorithm.algorithmId}`);
								//endregion

								//region Get information about used hash function
								if(("alg" in jwk) === false)
								{
									switch(algorithm.hash.name.toUpperCase())
									{
										case "SHA-1":
											jwk.alg = "RS1";
											break;
										case "SHA-256":
											jwk.alg = "RS256";
											break;
										case "SHA-384":
											jwk.alg = "RS384";
											break;
										case "SHA-512":
											jwk.alg = "RS512";
											break;
										default:
											return Promise.reject(`Incorrect hash algorithm: ${algorithm.hash.name.toUpperCase()}`);
									}
								}
								//endregion

								//region Create RSA Private Key elements
								const privateKeyJSON = privateKeyInfo.toJSON();

								for(const key of Object.keys(privateKeyJSON))
									jwk[key] = privateKeyJSON[key];
								//endregion
							}
							break;
						case "ECDSA":
							keyUsages = ["sign"]; // Override existing keyUsages value since the key is a private key
							// break omitted
						case "ECDH":
							{
								//region Initial variables
								jwk = {
									kty: "EC",
									ext: extractable,
									key_ops: keyUsages
								};
								//endregion

								//region Get information about used hash function
								if(privateKeyInfo.privateKeyAlgorithm.algorithmId !== "1.2.840.10045.2.1")
									return Promise.reject(`Incorrect algorithm: ${privateKeyInfo.privateKeyAlgorithm.algorithmId}`);
								//endregion

								//region Create ECDSA Private Key elements
								const privateKeyJSON = privateKeyInfo.toJSON();

								for(const key of Object.keys(privateKeyJSON))
									jwk[key] = privateKeyJSON[key];
								//endregion
							}
							break;
						case "RSA-OAEP":
							{
								jwk.kty = "RSA";
								jwk.ext = extractable;
								jwk.key_ops = keyUsages;
								
								//region Get information about used hash function
								if(this.name.toLowerCase() === "safari")
									jwk.alg = "RSA-OAEP";
								else
								{
									switch(algorithm.hash.name.toUpperCase())
									{
										case "SHA-1":
											jwk.alg = "RSA-OAEP";
											break;
										case "SHA-256":
											jwk.alg = "RSA-OAEP-256";
											break;
										case "SHA-384":
											jwk.alg = "RSA-OAEP-384";
											break;
										case "SHA-512":
											jwk.alg = "RSA-OAEP-512";
											break;
										default:
											return Promise.reject(`Incorrect hash algorithm: ${algorithm.hash.name.toUpperCase()}`);
									}
								}
								//endregion
								
								//region Create RSA Private Key elements
								const privateKeyJSON = privateKeyInfo.toJSON();
								
								for(const key of Object.keys(privateKeyJSON))
									jwk[key] = privateKeyJSON[key];
								//endregion
							}
							break;
						default:
							return Promise.reject(`Incorrect algorithm name: ${algorithm.name.toUpperCase()}`);
					}
				}
				break;
			case "jwk":
				jwk = keyData;
				break;
			default:
				return Promise.reject(`Incorrect format: ${format}`);
		}
		
		//region Special case for Safari browser (since its acting not as WebCrypto standard describes)
		if(this.name.toLowerCase() === "safari")
		{
			// Try to use both ways - import using ArrayBuffer and pure JWK (for Safari Technology Preview)
			return Promise.resolve().then(() => this.subtle.importKey("jwk", stringToArrayBuffer(JSON.stringify(jwk)), algorithm, extractable, keyUsages))
				.then(result => result, () => this.subtle.importKey("jwk", jwk, algorithm, extractable, keyUsages));
		}
		//endregion
		
		return this.subtle.importKey("jwk", jwk, algorithm, extractable, keyUsages);
	}
	//**********************************************************************************
	/**
	 * Export WebCrypto keys to different formats
	 * @param {string} format
	 * @param {Object} key
	 * @returns {Promise}
	 */
	exportKey(format, key)
	{
		let sequence = this.subtle.exportKey("jwk", key);
		
		//region Currently Safari returns ArrayBuffer as JWK thus we need an additional transformation
		if(this.name.toLowerCase() === "safari")
		{
			sequence = sequence.then(result =>
			{
				// Some additional checks for Safari Technology Preview
				if(result instanceof ArrayBuffer)
					return JSON.parse(arrayBufferToString(result));
				
				return result;
			});
		}
		//endregion
		
		switch(format.toLowerCase())
		{
			case "raw":
				return this.subtle.exportKey("raw", key);
			case "spki":
				sequence = sequence.then(result =>
				{
					const publicKeyInfo = new PublicKeyInfo();

					try
					{
						publicKeyInfo.fromJSON(result);
					}
					catch(ex)
					{
						return Promise.reject("Incorrect key data");
					}

					return publicKeyInfo.toSchema().toBER(false);
				});
				break;
			case "pkcs8":
				sequence = sequence.then(result =>
				{
					const privateKeyInfo = new PrivateKeyInfo();

					try
					{
						privateKeyInfo.fromJSON(result);
					}
					catch(ex)
					{
						return Promise.reject("Incorrect key data");
					}

					return privateKeyInfo.toSchema().toBER(false);
				});
				break;
			case "jwk":
				break;
			default:
				return Promise.reject(`Incorrect format: ${format}`);
		}

		return sequence;
	}
	//**********************************************************************************
	/**
	 * Convert WebCrypto keys between different export formats
	 * @param {string} inputFormat
	 * @param {string} outputFormat
	 * @param {ArrayBuffer|Object} keyData
	 * @param {Object} algorithm
	 * @param {boolean} extractable
	 * @param {Array} keyUsages
	 * @returns {Promise}
	 */
	convert(inputFormat, outputFormat, keyData, algorithm, extractable, keyUsages)
	{
		switch(inputFormat.toLowerCase())
		{
			case "raw":
				switch(outputFormat.toLowerCase())
				{
					case "raw":
						return Promise.resolve(keyData);
					case "spki":
						return Promise.resolve()
							.then(() => this.importKey("raw", keyData, algorithm, extractable, keyUsages))
							.then(result => this.exportKey("spki", result));
					case "pkcs8":
						return Promise.resolve()
							.then(() => this.importKey("raw", keyData, algorithm, extractable, keyUsages))
							.then(result => this.exportKey("pkcs8", result));
					case "jwk":
						return Promise.resolve()
							.then(() => this.importKey("raw", keyData, algorithm, extractable, keyUsages))
							.then(result => this.exportKey("jwk", result));
					default:
						return Promise.reject(`Incorrect outputFormat: ${outputFormat}`);
				}
			case "spki":
				switch(outputFormat.toLowerCase())
				{
					case "raw":
						return Promise.resolve()
							.then(() => this.importKey("spki", keyData, algorithm, extractable, keyUsages))
							.then(result => this.exportKey("raw", result));
					case "spki":
						return Promise.resolve(keyData);
					case "pkcs8":
						return Promise.reject("Impossible to convert between SPKI/PKCS8");
					case "jwk":
						return Promise.resolve()
							.then(() => this.importKey("spki", keyData, algorithm, extractable, keyUsages))
							.then(result => this.exportKey("jwk", result));
					default:
						return Promise.reject(`Incorrect outputFormat: ${outputFormat}`);
				}
			case "pkcs8":
				switch(outputFormat.toLowerCase())
				{
					case "raw":
						return Promise.resolve()
							.then(() => this.importKey("pkcs8", keyData, algorithm, extractable, keyUsages))
							.then(result => this.exportKey("raw", result));
					case "spki":
						return Promise.reject("Impossible to convert between SPKI/PKCS8");
					case "pkcs8":
						return Promise.resolve(keyData);
					case "jwk":
						return Promise.resolve()
							.then(() => this.importKey("pkcs8", keyData, algorithm, extractable, keyUsages))
							.then(result => this.exportKey("jwk", result));
					default:
						return Promise.reject(`Incorrect outputFormat: ${outputFormat}`);
				}
			case "jwk":
				switch(outputFormat.toLowerCase())
				{
					case "raw":
						return Promise.resolve()
							.then(() => this.importKey("jwk", keyData, algorithm, extractable, keyUsages))
							.then(result => this.exportKey("raw", result));
					case "spki":
						return Promise.resolve()
							.then(() => this.importKey("jwk", keyData, algorithm, extractable, keyUsages))
							.then(result => this.exportKey("spki", result));
					case "pkcs8":
						return Promise.resolve()
							.then(() => this.importKey("jwk", keyData, algorithm, extractable, keyUsages))
							.then(result => this.exportKey("pkcs8", result));
					case "jwk":
						return Promise.resolve(keyData);
					default:
						return Promise.reject(`Incorrect outputFormat: ${outputFormat}`);
				}
			default:
				return Promise.reject(`Incorrect inputFormat: ${inputFormat}`);
		}
	}
	//**********************************************************************************
	/**
	 * Wrapper for standard function "encrypt"
	 * @param args
	 * @returns {Promise}
	 */
	encrypt(...args)
	{
		return this.subtle.encrypt(...args);
	}
	//**********************************************************************************
	/**
	 * Wrapper for standard function "decrypt"
	 * @param args
	 * @returns {Promise}
	 */
	decrypt(...args)
	{
		return this.subtle.decrypt(...args);
	}
	//**********************************************************************************
	/**
	 * Wrapper for standard function "sign"
	 * @param args
	 * @returns {Promise}
	 */
	sign(...args)
	{
		return this.subtle.sign(...args);
	}
	//**********************************************************************************
	/**
	 * Wrapper for standard function "verify"
	 * @param args
	 * @returns {Promise}
	 */
	verify(...args)
	{
		return this.subtle.verify(...args);
	}
	//**********************************************************************************
	/**
	 * Wrapper for standard function "digest"
	 * @param args
	 * @returns {Promise}
	 */
	digest(...args)
	{
		return this.subtle.digest(...args);
	}
	//**********************************************************************************
	/**
	 * Wrapper for standard function "generateKey"
	 * @param args
	 * @returns {Promise}
	 */
	generateKey(...args)
	{
		return this.subtle.generateKey(...args);
	}
	//**********************************************************************************
	/**
	 * Wrapper for standard function "deriveKey"
	 * @param args
	 * @returns {Promise}
	 */
	deriveKey(...args)
	{
		return this.subtle.deriveKey(...args);
	}
	//**********************************************************************************
	/**
	 * Wrapper for standard function "deriveBits"
	 * @param args
	 * @returns {Promise}
	 */
	deriveBits(...args)
	{
		return this.subtle.deriveBits(...args);
	}
	//**********************************************************************************
	/**
	 * Wrapper for standard function "wrapKey"
	 * @param args
	 * @returns {Promise}
	 */
	wrapKey(...args)
	{
		return this.subtle.wrapKey(...args);
	}
	//**********************************************************************************
	/**
	 * Wrapper for standard function "unwrapKey"
	 * @param args
	 * @returns {Promise}
	 */
	unwrapKey(...args)
	{
		return this.subtle.unwrapKey(...args);
	}
	//**********************************************************************************
	/**
	 * Initialize input Uint8Array by random values (with help from current "crypto engine")
	 * @param {!Uint8Array} view
	 * @returns {*}
	 */
	getRandomValues(view)
	{
		if(("getRandomValues" in this.crypto) === false)
			throw new Error("No support for getRandomValues");
		
		return this.crypto.getRandomValues(view);
	}
	//**********************************************************************************
	/**
	 * Get WebCrypto algorithm by wel-known OID
	 * @param {string} oid well-known OID to search for
	 * @returns {Object}
	 */
	getAlgorithmByOID(oid)
	{
		switch(oid)
		{
			case "1.2.840.113549.1.1.1":
			case "1.2.840.113549.1.1.5":
				return {
					name: "RSASSA-PKCS1-v1_5",
					hash: {
						name: "SHA-1"
					}
				};
			case "1.2.840.113549.1.1.11":
				return {
					name: "RSASSA-PKCS1-v1_5",
					hash: {
						name: "SHA-256"
					}
				};
			case "1.2.840.113549.1.1.12":
				return {
					name: "RSASSA-PKCS1-v1_5",
					hash: {
						name: "SHA-384"
					}
				};
			case "1.2.840.113549.1.1.13":
				return {
					name: "RSASSA-PKCS1-v1_5",
					hash: {
						name: "SHA-512"
					}
				};
			case "1.2.840.113549.1.1.10":
				return {
					name: "RSA-PSS"
				};
			case "1.2.840.113549.1.1.7":
				return {
					name: "RSA-OAEP"
				};
			case "1.2.840.10045.2.1":
			case "1.2.840.10045.4.1":
				return {
					name: "ECDSA",
					hash: {
						name: "SHA-1"
					}
				};
			case "1.2.840.10045.4.3.2":
				return {
					name: "ECDSA",
					hash: {
						name: "SHA-256"
					}
				};
			case "1.2.840.10045.4.3.3":
				return {
					name: "ECDSA",
					hash: {
						name: "SHA-384"
					}
				};
			case "1.2.840.10045.4.3.4":
				return {
					name: "ECDSA",
					hash: {
						name: "SHA-512"
					}
				};
			case "1.3.133.16.840.63.0.2":
				return {
					name: "ECDH",
					kdf: "SHA-1"
				};
			case "1.3.132.1.11.1":
				return {
					name: "ECDH",
					kdf: "SHA-256"
				};
			case "1.3.132.1.11.2":
				return {
					name: "ECDH",
					kdf: "SHA-384"
				};
			case "1.3.132.1.11.3":
				return {
					name: "ECDH",
					kdf: "SHA-512"
				};
			case "2.16.840.1.101.3.4.1.2":
				return {
					name: "AES-CBC",
					length: 128
				};
			case "2.16.840.1.101.3.4.1.22":
				return {
					name: "AES-CBC",
					length: 192
				};
			case "2.16.840.1.101.3.4.1.42":
				return {
					name: "AES-CBC",
					length: 256
				};
			case "2.16.840.1.101.3.4.1.6":
				return {
					name: "AES-GCM",
					length: 128
				};
			case "2.16.840.1.101.3.4.1.26":
				return {
					name: "AES-GCM",
					length: 192
				};
			case "2.16.840.1.101.3.4.1.46":
				return {
					name: "AES-GCM",
					length: 256
				};
			case "2.16.840.1.101.3.4.1.4":
				return {
					name: "AES-CFB",
					length: 128
				};
			case "2.16.840.1.101.3.4.1.24":
				return {
					name: "AES-CFB",
					length: 192
				};
			case "2.16.840.1.101.3.4.1.44":
				return {
					name: "AES-CFB",
					length: 256
				};
			case "2.16.840.1.101.3.4.1.5":
				return {
					name: "AES-KW",
					length: 128
				};
			case "2.16.840.1.101.3.4.1.25":
				return {
					name: "AES-KW",
					length: 192
				};
			case "2.16.840.1.101.3.4.1.45":
				return {
					name: "AES-KW",
					length: 256
				};
			case "1.2.840.113549.2.7":
				return {
					name: "HMAC",
					hash: {
						name: "SHA-1"
					}
				};
			case "1.2.840.113549.2.9":
				return {
					name: "HMAC",
					hash: {
						name: "SHA-256"
					}
				};
			case "1.2.840.113549.2.10":
				return {
					name: "HMAC",
					hash: {
						name: "SHA-384"
					}
				};
			case "1.2.840.113549.2.11":
				return {
					name: "HMAC",
					hash: {
						name: "SHA-512"
					}
				};
			case "1.2.840.113549.1.9.16.3.5":
				return {
					name: "DH"
				};
			case "1.3.14.3.2.26":
				return {
					name: "SHA-1"
				};
			case "2.16.840.1.101.3.4.2.1":
				return {
					name: "SHA-256"
				};
			case "2.16.840.1.101.3.4.2.2":
				return {
					name: "SHA-384"
				};
			case "2.16.840.1.101.3.4.2.3":
				return {
					name: "SHA-512"
				};
			case "1.2.840.113549.1.5.12":
				return {
					name: "PBKDF2"
				};
			//region Special case - OIDs for ECC curves
			case "1.2.840.10045.3.1.7":
				return {
					name: "P-256"
				};
			case "1.3.132.0.34":
				return {
					name: "P-384"
				};
			case "1.3.132.0.35":
				return {
					name: "P-521"
				};
			//endregion
			default:
		}
		
		return {};
	}
	//**********************************************************************************
	/**
	 * Get OID for each specific algorithm
	 * @param {Object} algorithm
	 * @returns {string}
	 */
	getOIDByAlgorithm(algorithm)
	{
		let result = "";
		
		switch(algorithm.name.toUpperCase())
		{
			case "RSASSA-PKCS1-V1_5":
				switch(algorithm.hash.name.toUpperCase())
				{
					case "SHA-1":
						result = "1.2.840.113549.1.1.5";
						break;
					case "SHA-256":
						result = "1.2.840.113549.1.1.11";
						break;
					case "SHA-384":
						result = "1.2.840.113549.1.1.12";
						break;
					case "SHA-512":
						result = "1.2.840.113549.1.1.13";
						break;
					default:
				}
				break;
			case "RSA-PSS":
				result = "1.2.840.113549.1.1.10";
				break;
			case "RSA-OAEP":
				result = "1.2.840.113549.1.1.7";
				break;
			case "ECDSA":
				switch(algorithm.hash.name.toUpperCase())
				{
					case "SHA-1":
						result = "1.2.840.10045.4.1";
						break;
					case "SHA-256":
						result = "1.2.840.10045.4.3.2";
						break;
					case "SHA-384":
						result = "1.2.840.10045.4.3.3";
						break;
					case "SHA-512":
						result = "1.2.840.10045.4.3.4";
						break;
					default:
				}
				break;
			case "ECDH":
				switch(algorithm.kdf.toUpperCase()) // Non-standard addition - hash algorithm of KDF function
				{
					case "SHA-1":
						result = "1.3.133.16.840.63.0.2"; // dhSinglePass-stdDH-sha1kdf-scheme
						break;
					case "SHA-256":
						result = "1.3.132.1.11.1"; // dhSinglePass-stdDH-sha256kdf-scheme
						break;
					case "SHA-384":
						result = "1.3.132.1.11.2"; // dhSinglePass-stdDH-sha384kdf-scheme
						break;
					case "SHA-512":
						result = "1.3.132.1.11.3"; // dhSinglePass-stdDH-sha512kdf-scheme
						break;
					default:
				}
				break;
			case "AES-CTR":
				break;
			case "AES-CBC":
				switch(algorithm.length)
				{
					case 128:
						result = "2.16.840.1.101.3.4.1.2";
						break;
					case 192:
						result = "2.16.840.1.101.3.4.1.22";
						break;
					case 256:
						result = "2.16.840.1.101.3.4.1.42";
						break;
					default:
				}
				break;
			case "AES-CMAC":
				break;
			case "AES-GCM":
				switch(algorithm.length)
				{
					case 128:
						result = "2.16.840.1.101.3.4.1.6";
						break;
					case 192:
						result = "2.16.840.1.101.3.4.1.26";
						break;
					case 256:
						result = "2.16.840.1.101.3.4.1.46";
						break;
					default:
				}
				break;
			case "AES-CFB":
				switch(algorithm.length)
				{
					case 128:
						result = "2.16.840.1.101.3.4.1.4";
						break;
					case 192:
						result = "2.16.840.1.101.3.4.1.24";
						break;
					case 256:
						result = "2.16.840.1.101.3.4.1.44";
						break;
					default:
				}
				break;
			case "AES-KW":
				switch(algorithm.length)
				{
					case 128:
						result = "2.16.840.1.101.3.4.1.5";
						break;
					case 192:
						result = "2.16.840.1.101.3.4.1.25";
						break;
					case 256:
						result = "2.16.840.1.101.3.4.1.45";
						break;
					default:
				}
				break;
			case "HMAC":
				switch(algorithm.hash.name.toUpperCase())
				{
					case "SHA-1":
						result = "1.2.840.113549.2.7";
						break;
					case "SHA-256":
						result = "1.2.840.113549.2.9";
						break;
					case "SHA-384":
						result = "1.2.840.113549.2.10";
						break;
					case "SHA-512":
						result = "1.2.840.113549.2.11";
						break;
					default:
				}
				break;
			case "DH":
				result = "1.2.840.113549.1.9.16.3.5";
				break;
			case "SHA-1":
				result = "1.3.14.3.2.26";
				break;
			case "SHA-256":
				result = "2.16.840.1.101.3.4.2.1";
				break;
			case "SHA-384":
				result = "2.16.840.1.101.3.4.2.2";
				break;
			case "SHA-512":
				result = "2.16.840.1.101.3.4.2.3";
				break;
			case "CONCAT":
				break;
			case "HKDF":
				break;
			case "PBKDF2":
				result = "1.2.840.113549.1.5.12";
				break;
			//region Special case - OIDs for ECC curves
			case "P-256":
				result = "1.2.840.10045.3.1.7";
				break;
			case "P-384":
				result = "1.3.132.0.34";
				break;
			case "P-521":
				result = "1.3.132.0.35";
				break;
			//endregion
			default:
		}
		
		return result;
	}
	//**********************************************************************************
	/**
	 * Get default algorithm parameters for each kind of operation
	 * @param {string} algorithmName Algorithm name to get common parameters for
	 * @param {string} operation Kind of operation: "sign", "encrypt", "generatekey", "importkey", "exportkey", "verify"
	 * @returns {*}
	 */
	getAlgorithmParameters(algorithmName, operation)
	{
		let result = {
			algorithm: {},
			usages: []
		};
		
		switch(algorithmName.toUpperCase())
		{
			case "RSASSA-PKCS1-V1_5":
				switch(operation.toLowerCase())
				{
					case "generatekey":
						result = {
							algorithm: {
								name: "RSASSA-PKCS1-v1_5",
								modulusLength: 2048,
								publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
								hash: {
									name: "SHA-256"
								}
							},
							usages: ["sign", "verify"]
						};
						break;
					case "verify":
					case "sign":
					case "importkey":
						result = {
							algorithm: {
								name: "RSASSA-PKCS1-v1_5",
								hash: {
									name: "SHA-256"
								}
							},
							usages: ["verify"] // For importKey("pkcs8") usage must be "sign" only
						};
						break;
					case "exportkey":
					default:
						return {
							algorithm: {
								name: "RSASSA-PKCS1-v1_5"
							},
							usages: []
						};
				}
				break;
			case "RSA-PSS":
				switch(operation.toLowerCase())
				{
					case "sign":
					case "verify":
						result = {
							algorithm: {
								name: "RSA-PSS",
								hash: {
									name: "SHA-1"
								},
								saltLength: 20
							},
							usages: ["sign", "verify"]
						};
						break;
					case "generatekey":
						result = {
							algorithm: {
								name: "RSA-PSS",
								modulusLength: 2048,
								publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
								hash: {
									name: "SHA-1"
								}
							},
							usages: ["sign", "verify"]
						};
						break;
					case "importkey":
						result = {
							algorithm: {
								name: "RSA-PSS",
								hash: {
									name: "SHA-1"
								}
							},
							usages: ["verify"] // For importKey("pkcs8") usage must be "sign" only
						};
						break;
					case "exportkey":
					default:
						return {
							algorithm: {
								name: "RSA-PSS"
							},
							usages: []
						};
				}
				break;
			case "RSA-OAEP":
				switch(operation.toLowerCase())
				{
					case "encrypt":
					case "decrypt":
						result = {
							algorithm: {
								name: "RSA-OAEP"
							},
							usages: ["encrypt", "decrypt"]
						};
						break;
					case "generatekey":
						result = {
							algorithm: {
								name: "RSA-OAEP",
								modulusLength: 2048,
								publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
								hash: {
									name: "SHA-256"
								}
							},
							usages: ["encrypt", "decrypt", "wrapKey", "unwrapKey"]
						};
						break;
					case "importkey":
						result = {
							algorithm: {
								name: "RSA-OAEP",
								hash: {
									name: "SHA-256"
								}
							},
							usages: ["encrypt"] // encrypt for "spki" and decrypt for "pkcs8"
						};
						break;
					case "exportkey":
					default:
						return {
							algorithm: {
								name: "RSA-OAEP"
							},
							usages: []
						};
				}
				break;
			case "ECDSA":
				switch(operation.toLowerCase())
				{
					case "generatekey":
						result = {
							algorithm: {
								name: "ECDSA",
								namedCurve: "P-256"
							},
							usages: ["sign", "verify"]
						};
						break;
					case "importkey":
						result = {
							algorithm: {
								name: "ECDSA",
								namedCurve: "P-256"
							},
							usages: ["verify"] // "sign" for "pkcs8"
						};
						break;
					case "verify":
					case "sign":
						result = {
							algorithm: {
								name: "ECDSA",
								hash: {
									name: "SHA-256"
								}
							},
							usages: ["sign"]
						};
						break;
					default:
						return {
							algorithm: {
								name: "ECDSA"
							},
							usages: []
						};
				}
				break;
			case "ECDH":
				switch(operation.toLowerCase())
				{
					case "exportkey":
					case "importkey":
					case "generatekey":
						result = {
							algorithm: {
								name: "ECDH",
								namedCurve: "P-256"
							},
							usages: ["deriveKey", "deriveBits"]
						};
						break;
					case "derivekey":
					case "derivebits":
						result = {
							algorithm: {
								name: "ECDH",
								namedCurve: "P-256",
								public: [] // Must be a "publicKey"
							},
							usages: ["encrypt", "decrypt"]
						};
						break;
					default:
						return {
							algorithm: {
								name: "ECDH"
							},
							usages: []
						};
				}
				break;
			case "AES-CTR":
				switch(operation.toLowerCase())
				{
					case "importkey":
					case "exportkey":
					case "generatekey":
						result = {
							algorithm: {
								name: "AES-CTR",
								length: 256
							},
							usages: ["encrypt", "decrypt", "wrapKey", "unwrapKey"]
						};
						break;
					case "decrypt":
					case "encrypt":
						result = {
							algorithm: {
								name: "AES-CTR",
								counter: new Uint8Array(16),
								length: 10
							},
							usages: ["encrypt", "decrypt", "wrapKey", "unwrapKey"]
						};
						break;
					default:
						return {
							algorithm: {
								name: "AES-CTR"
							},
							usages: []
						};
				}
				break;
			case "AES-CBC":
				switch(operation.toLowerCase())
				{
					case "importkey":
					case "exportkey":
					case "generatekey":
						result = {
							algorithm: {
								name: "AES-CBC",
								length: 256
							},
							usages: ["encrypt", "decrypt", "wrapKey", "unwrapKey"]
						};
						break;
					case "decrypt":
					case "encrypt":
						result = {
							algorithm: {
								name: "AES-CBC",
								iv: this.getRandomValues(new Uint8Array(16)) // For "decrypt" the value should be replaced with value got on "encrypt" step
							},
							usages: ["encrypt", "decrypt", "wrapKey", "unwrapKey"]
						};
						break;
					default:
						return {
							algorithm: {
								name: "AES-CBC"
							},
							usages: []
						};
				}
				break;
			case "AES-GCM":
				switch(operation.toLowerCase())
				{
					case "importkey":
					case "exportkey":
					case "generatekey":
						result = {
							algorithm: {
								name: "AES-GCM",
								length: 256
							},
							usages: ["encrypt", "decrypt", "wrapKey", "unwrapKey"]
						};
						break;
					case "decrypt":
					case "encrypt":
						result = {
							algorithm: {
								name: "AES-GCM",
								iv: this.getRandomValues(new Uint8Array(16)) // For "decrypt" the value should be replaced with value got on "encrypt" step
							},
							usages: ["encrypt", "decrypt", "wrapKey", "unwrapKey"]
						};
						break;
					default:
						return {
							algorithm: {
								name: "AES-GCM"
							},
							usages: []
						};
				}
				break;
			case "AES-KW":
				switch(operation.toLowerCase())
				{
					case "importkey":
					case "exportkey":
					case "generatekey":
					case "wrapkey":
					case "unwrapkey":
						result = {
							algorithm: {
								name: "AES-KW",
								length: 256
							},
							usages: ["wrapKey", "unwrapKey"]
						};
						break;
					default:
						return {
							algorithm: {
								name: "AES-KW"
							},
							usages: []
						};
				}
				break;
			case "HMAC":
				switch(operation.toLowerCase())
				{
					case "sign":
					case "verify":
						result = {
							algorithm: {
								name: "HMAC"
							},
							usages: ["sign", "verify"]
						};
						break;
					case "importkey":
					case "exportkey":
					case "generatekey":
						result = {
							algorithm: {
								name: "HMAC",
								length: 32,
								hash: {
									name: "SHA-256"
								}
							},
							usages: ["sign", "verify"]
						};
						break;
					default:
						return {
							algorithm: {
								name: "HMAC"
							},
							usages: []
						};
				}
				break;
			case "HKDF":
				switch(operation.toLowerCase())
				{
					case "derivekey":
						result = {
							algorithm: {
								name: "HKDF",
								hash: "SHA-256",
								salt: new Uint8Array([]),
								info: new Uint8Array([])
							},
							usages: ["encrypt", "decrypt"]
						};
						break;
					default:
						return {
							algorithm: {
								name: "HKDF"
							},
							usages: []
						};
				}
				break;
			case "PBKDF2":
				switch(operation.toLowerCase())
				{
					case "derivekey":
						result = {
							algorithm: {
								name: "PBKDF2",
								hash: { name: "SHA-256" },
								salt: new Uint8Array([]),
								iterations: 10000
							},
							usages: ["encrypt", "decrypt"]
						};
						break;
					default:
						return {
							algorithm: {
								name: "PBKDF2"
							},
							usages: []
						};
				}
				break;
			default:
		}
		
		return result;
	}
	//**********************************************************************************
	/**
	 * Getting hash algorithm by signature algorithm
	 * @param {AlgorithmIdentifier} signatureAlgorithm Signature algorithm
	 * @returns {string}
	 */
	getHashAlgorithm(signatureAlgorithm)
	{
		let result = "";
		
		switch(signatureAlgorithm.algorithmId)
		{
			case "1.2.840.10045.4.1": // ecdsa-with-SHA1
			case "1.2.840.113549.1.1.5":
				result = "SHA-1";
				break;
			case "1.2.840.10045.4.3.2": // ecdsa-with-SHA256
			case "1.2.840.113549.1.1.11":
				result = "SHA-256";
				break;
			case "1.2.840.10045.4.3.3": // ecdsa-with-SHA384
			case "1.2.840.113549.1.1.12":
				result = "SHA-384";
				break;
			case "1.2.840.10045.4.3.4": // ecdsa-with-SHA512
			case "1.2.840.113549.1.1.13":
				result = "SHA-512";
				break;
			case "1.2.840.113549.1.1.10": // RSA-PSS
				{
					try
					{
						const params = new RSASSAPSSParams({ schema: signatureAlgorithm.algorithmParams });
						if("hashAlgorithm" in params)
						{
							const algorithm = this.getAlgorithmByOID(params.hashAlgorithm.algorithmId);
							if(("name" in algorithm) === false)
								return "";
							
							result = algorithm.name;
						}
						else
							result = "SHA-1";
					}
					catch(ex)
					{
					}
				}
				break;
			default:
		}
		
		return result;
	}
	//**********************************************************************************
	/**
	 * Specialized function encrypting "EncryptedContentInfo" object using parameters
	 * @param {Object} parameters
	 * @returns {Promise}
	 */
	encryptEncryptedContentInfo(parameters)
	{
		//region Check for input parameters
		if((parameters instanceof Object) === false)
			return Promise.reject("Parameters must have type \"Object\"");
		
		if(("password" in parameters) === false)
			return Promise.reject("Absent mandatory parameter \"password\"");
		
		if(("contentEncryptionAlgorithm" in parameters) === false)
			return Promise.reject("Absent mandatory parameter \"contentEncryptionAlgorithm\"");
		
		if(("hmacHashAlgorithm" in parameters) === false)
			return Promise.reject("Absent mandatory parameter \"hmacHashAlgorithm\"");
		
		if(("iterationCount" in parameters) === false)
			return Promise.reject("Absent mandatory parameter \"iterationCount\"");
		
		if(("contentToEncrypt" in parameters) === false)
			return Promise.reject("Absent mandatory parameter \"contentToEncrypt\"");
		
		if(("contentType" in parameters) === false)
			return Promise.reject("Absent mandatory parameter \"contentType\"");

		const contentEncryptionOID = this.getOIDByAlgorithm(parameters.contentEncryptionAlgorithm);
		if(contentEncryptionOID === "")
			return Promise.reject("Wrong \"contentEncryptionAlgorithm\" value");
		
		const pbkdf2OID = this.getOIDByAlgorithm({
			name: "PBKDF2"
		});
		if(pbkdf2OID === "")
			return Promise.reject("Can not find OID for PBKDF2");
		
		const hmacOID = this.getOIDByAlgorithm({
			name: "HMAC",
			hash: {
				name: parameters.hmacHashAlgorithm
			}
		});
		if(hmacOID === "")
			return Promise.reject(`Incorrect value for "hmacHashAlgorithm": ${parameters.hmacHashAlgorithm}`);
		//endregion
		
		//region Initial variables
		let sequence = Promise.resolve();
		
		const ivBuffer = new ArrayBuffer(16); // For AES we need IV 16 bytes long
		const ivView = new Uint8Array(ivBuffer);
		this.getRandomValues(ivView);
		
		const saltBuffer = new ArrayBuffer(64);
		const saltView = new Uint8Array(saltBuffer);
		this.getRandomValues(saltView);
		
		const contentView = new Uint8Array(parameters.contentToEncrypt);
		
		const pbkdf2Params = new PBKDF2Params({
			salt: new OctetString({ valueHex: saltBuffer }),
			iterationCount: parameters.iterationCount,
			prf: new AlgorithmIdentifier({
				algorithmId: hmacOID,
				algorithmParams: new Null()
			})
		});
		//endregion
		
		//region Derive PBKDF2 key from "password" buffer
		sequence = sequence.then(() =>
		{
			const passwordView = new Uint8Array(parameters.password);
			
			return this.importKey("raw",
				passwordView,
				"PBKDF2",
				false,
				["deriveKey"]);
		}, error =>
			Promise.reject(error)
		);
		//endregion
		
		//region Derive key for "contentEncryptionAlgorithm"
		sequence = sequence.then(result =>
			this.deriveKey({
				name: "PBKDF2",
				hash: {
					name: parameters.hmacHashAlgorithm
				},
				salt: saltView,
				iterations: parameters.iterationCount
			},
			result,
			parameters.contentEncryptionAlgorithm,
			false,
			["encrypt"]),
		error =>
			Promise.reject(error)
		);
		//endregion
		
		//region Encrypt content
		sequence = sequence.then(result =>
			this.encrypt({
				name: parameters.contentEncryptionAlgorithm.name,
				iv: ivView
			},
			result,
			contentView),
		error =>
			Promise.reject(error)
		);
		//endregion
		
		//region Store all parameters in EncryptedData object
		sequence = sequence.then(result =>
		{
			const pbes2Parameters = new PBES2Params({
				keyDerivationFunc: new AlgorithmIdentifier({
					algorithmId: pbkdf2OID,
					algorithmParams: pbkdf2Params.toSchema()
				}),
				encryptionScheme: new AlgorithmIdentifier({
					algorithmId: contentEncryptionOID,
					algorithmParams: new OctetString({ valueHex: ivBuffer })
				})
			});
			
			return new EncryptedContentInfo({
				contentType: parameters.contentType,
				contentEncryptionAlgorithm: new AlgorithmIdentifier({
					algorithmId: "1.2.840.113549.1.5.13", // pkcs5PBES2
					algorithmParams: pbes2Parameters.toSchema()
				}),
				encryptedContent: new OctetString({ valueHex: result })
			});
		}, error =>
			Promise.reject(error)
		);
		//endregion

		return sequence;
	}
	//**********************************************************************************
	/**
	 * Decrypt data stored in "EncryptedContentInfo" object using parameters
	 * @param parameters
	 * @return {Promise}
	 */
	decryptEncryptedContentInfo(parameters)
	{
		//region Check for input parameters
		if((parameters instanceof Object) === false)
			return Promise.reject("Parameters must have type \"Object\"");
		
		if(("password" in parameters) === false)
			return Promise.reject("Absent mandatory parameter \"password\"");
		
		if(("encryptedContentInfo" in parameters) === false)
			return Promise.reject("Absent mandatory parameter \"encryptedContentInfo\"");

		if(parameters.encryptedContentInfo.contentEncryptionAlgorithm.algorithmId !== "1.2.840.113549.1.5.13") // pkcs5PBES2
			return Promise.reject(`Unknown "contentEncryptionAlgorithm": ${parameters.encryptedContentInfo.contentEncryptionAlgorithm.algorithmId}`);
		//endregion
		
		//region Initial variables
		let sequence = Promise.resolve();
		
		let pbes2Parameters;
		
		try
		{
			pbes2Parameters = new PBES2Params({ schema: parameters.encryptedContentInfo.contentEncryptionAlgorithm.algorithmParams });
		}
		catch(ex)
		{
			return Promise.reject("Incorrectly encoded \"pbes2Parameters\"");
		}
		
		let pbkdf2Params;
		
		try
		{
			pbkdf2Params = new PBKDF2Params({ schema: pbes2Parameters.keyDerivationFunc.algorithmParams });
		}
		catch(ex)
		{
			return Promise.reject("Incorrectly encoded \"pbkdf2Params\"");
		}
		
		const contentEncryptionAlgorithm = this.getAlgorithmByOID(pbes2Parameters.encryptionScheme.algorithmId);
		if(("name" in contentEncryptionAlgorithm) === false)
			return Promise.reject(`Incorrect OID for "contentEncryptionAlgorithm": ${pbes2Parameters.encryptionScheme.algorithmId}`);
		
		const ivBuffer = pbes2Parameters.encryptionScheme.algorithmParams.valueBlock.valueHex;
		const ivView = new Uint8Array(ivBuffer);
		
		const saltBuffer = pbkdf2Params.salt.valueBlock.valueHex;
		const saltView = new Uint8Array(saltBuffer);
		
		const iterationCount = pbkdf2Params.iterationCount;
		
		let hmacHashAlgorithm = "SHA-1";
		
		if("prf" in pbkdf2Params)
		{
			const algorithm = this.getAlgorithmByOID(pbkdf2Params.prf.algorithmId);
			if(("name" in algorithm) === false)
				return Promise.reject("Incorrect OID for HMAC hash algorithm");
			
			hmacHashAlgorithm = algorithm.hash.name;
		}
		//endregion
		
		//region Derive PBKDF2 key from "password" buffer
		sequence = sequence.then(() =>
			this.importKey("raw",
				parameters.password,
				"PBKDF2",
				false,
				["deriveKey"]),
		error =>
			Promise.reject(error)
		);
		//endregion
		
		//region Derive key for "contentEncryptionAlgorithm"
		sequence = sequence.then(result =>
			this.deriveKey({
				name: "PBKDF2",
				hash: {
					name: hmacHashAlgorithm
				},
				salt: saltView,
				iterations: iterationCount
			},
			result,
			contentEncryptionAlgorithm,
			false,
			["decrypt"]),
		error =>
			Promise.reject(error)
		);
		//endregion
		
		//region Decrypt internal content using derived key
		sequence = sequence.then(result =>
		{
			//region Create correct data block for decryption
			let dataBuffer = new ArrayBuffer(0);
			
			if(parameters.encryptedContentInfo.encryptedContent.idBlock.isConstructed === false)
				dataBuffer = parameters.encryptedContentInfo.encryptedContent.valueBlock.valueHex;
			else
			{
				for(const content of parameters.encryptedContentInfo.encryptedContent.valueBlock.value)
					dataBuffer = utilConcatBuf(dataBuffer, content.valueBlock.valueHex);
			}
			//endregion
			
			return this.decrypt({
				name: contentEncryptionAlgorithm.name,
				iv: ivView
			},
			result,
			dataBuffer);
		}, error =>
			Promise.reject(error)
		);
		//endregion
		
		return sequence;
	}
	//**********************************************************************************
	/**
	 * Stamping (signing) data using algorithm simular to HMAC
	 * @param {Object} parameters
	 * @return {Promise.<T>|Promise}
	 */
	stampDataWithPassword(parameters)
	{
		//region Check for input parameters
		if((parameters instanceof Object) === false)
			return Promise.reject("Parameters must have type \"Object\"");
		
		if(("password" in parameters) === false)
			return Promise.reject("Absent mandatory parameter \"password\"");
		
		if(("hashAlgorithm" in parameters) === false)
			return Promise.reject("Absent mandatory parameter \"hashAlgorithm\"");
		
		if(("salt" in parameters) === false)
			return Promise.reject("Absent mandatory parameter \"iterationCount\"");
		
		if(("iterationCount" in parameters) === false)
			return Promise.reject("Absent mandatory parameter \"salt\"");
		
		if(("contentToStamp" in parameters) === false)
			return Promise.reject("Absent mandatory parameter \"contentToStamp\"");
		//endregion
		
		//region Choose correct length for HMAC key
		let length;
		
		switch(parameters.hashAlgorithm.toLowerCase())
		{
			case "sha-1":
				length = 160;
				break;
			case "sha-256":
				length = 256;
				break;
			case "sha-384":
				length = 384;
				break;
			case "sha-512":
				length = 512;
				break;
			default:
				return Promise.reject(`Incorrect "parameters.hashAlgorithm" parameter: ${parameters.hashAlgorithm}`);
		}
		//endregion
		
		//region Initial variables
		let sequence = Promise.resolve();
		
		const hmacAlgorithm = {
			name: "HMAC",
			length,
			hash: {
				name: parameters.hashAlgorithm
			}
		};
		//endregion

		//region Create PKCS#12 key for integrity checking
		sequence = sequence.then(() => makePKCS12B2Key(this, parameters.hashAlgorithm, length, parameters.password, parameters.salt, parameters.iterationCount));
		//endregion
		
		//region Import HMAC key
		// noinspection JSCheckFunctionSignatures
		sequence = sequence.then(
			result =>
				this.importKey("raw",
					new Uint8Array(result),
					hmacAlgorithm,
					false,
					["sign"])
		);
		//endregion
		
		//region Make signed HMAC value
		sequence = sequence.then(
			result =>
				this.sign(hmacAlgorithm, result, new Uint8Array(parameters.contentToStamp)),
			error => Promise.reject(error)
		);
		//endregion

		return sequence;
	}
	//**********************************************************************************
	verifyDataStampedWithPassword(parameters)
	{
		//region Check for input parameters
		if((parameters instanceof Object) === false)
			return Promise.reject("Parameters must have type \"Object\"");
		
		if(("password" in parameters) === false)
			return Promise.reject("Absent mandatory parameter \"password\"");
		
		if(("hashAlgorithm" in parameters) === false)
			return Promise.reject("Absent mandatory parameter \"hashAlgorithm\"");
		
		if(("salt" in parameters) === false)
			return Promise.reject("Absent mandatory parameter \"iterationCount\"");
		
		if(("iterationCount" in parameters) === false)
			return Promise.reject("Absent mandatory parameter \"salt\"");
		
		if(("contentToVerify" in parameters) === false)
			return Promise.reject("Absent mandatory parameter \"contentToVerify\"");
		
		if(("signatureToVerify" in parameters) === false)
			return Promise.reject("Absent mandatory parameter \"signatureToVerify\"");
		//endregion
		
		//region Choose correct length for HMAC key
		let length;
		
		switch(parameters.hashAlgorithm.toLowerCase())
		{
			case "sha-1":
				length = 160;
				break;
			case "sha-256":
				length = 256;
				break;
			case "sha-384":
				length = 384;
				break;
			case "sha-512":
				length = 512;
				break;
			default:
				return Promise.reject(`Incorrect "parameters.hashAlgorithm" parameter: ${parameters.hashAlgorithm}`);
		}
		//endregion
		
		//region Initial variables
		let sequence = Promise.resolve();
		
		const hmacAlgorithm = {
			name: "HMAC",
			length,
			hash: {
				name: parameters.hashAlgorithm
			}
		};
		//endregion
		
		//region Create PKCS#12 key for integrity checking
		sequence = sequence.then(() => makePKCS12B2Key(this, parameters.hashAlgorithm, length, parameters.password, parameters.salt, parameters.iterationCount));
		//endregion
		
		//region Import HMAC key
		// noinspection JSCheckFunctionSignatures
		sequence = sequence.then(result =>
			this.importKey("raw",
				new Uint8Array(result),
				hmacAlgorithm,
				false,
				["verify"])
		);
		//endregion
		
		//region Make signed HMAC value
		sequence = sequence.then(
			result =>
				this.verify(hmacAlgorithm, result, new Uint8Array(parameters.signatureToVerify), new Uint8Array(parameters.contentToVerify)),
			error => Promise.reject(error)
		);
		//endregion
		
		return sequence;
	}
	//**********************************************************************************
	/**
	 * Get signature parameters by analyzing private key algorithm
	 * @param {Object} privateKey The private key user would like to use
	 * @param {string} [hashAlgorithm="SHA-1"] Hash algorithm user would like to use
	 * @return {Promise.<T>|Promise}
	 */
	getSignatureParameters(privateKey, hashAlgorithm = "SHA-1")
	{
		//region Check hashing algorithm
		const oid = this.getOIDByAlgorithm({ name: hashAlgorithm });
		if(oid === "")
			return Promise.reject(`Unsupported hash algorithm: ${hashAlgorithm}`);
		//endregion
		
		//region Initial variables
		const signatureAlgorithm = new AlgorithmIdentifier();
		//endregion
		
		//region Get a "default parameters" for current algorithm
		const parameters = this.getAlgorithmParameters(privateKey.algorithm.name, "sign");
		parameters.algorithm.hash.name = hashAlgorithm;
		//endregion
		
		//region Fill internal structures base on "privateKey" and "hashAlgorithm"
		switch(privateKey.algorithm.name.toUpperCase())
		{
			case "RSASSA-PKCS1-V1_5":
			case "ECDSA":
				signatureAlgorithm.algorithmId = this.getOIDByAlgorithm(parameters.algorithm);
				break;
			case "RSA-PSS":
				{
					//region Set "saltLength" as a length (in octets) of hash function result
					switch(hashAlgorithm.toUpperCase())
					{
						case "SHA-256":
							parameters.algorithm.saltLength = 32;
							break;
						case "SHA-384":
							parameters.algorithm.saltLength = 48;
							break;
						case "SHA-512":
							parameters.algorithm.saltLength = 64;
							break;
						default:
					}
					//endregion
					
					//region Fill "RSASSA_PSS_params" object
					const paramsObject = {};
					
					if(hashAlgorithm.toUpperCase() !== "SHA-1")
					{
						const hashAlgorithmOID = this.getOIDByAlgorithm({ name: hashAlgorithm });
						if(hashAlgorithmOID === "")
							return Promise.reject(`Unsupported hash algorithm: ${hashAlgorithm}`);
						
						paramsObject.hashAlgorithm = new AlgorithmIdentifier({
							algorithmId: hashAlgorithmOID,
							algorithmParams: new Null()
						});
						
						paramsObject.maskGenAlgorithm = new AlgorithmIdentifier({
							algorithmId: "1.2.840.113549.1.1.8", // MGF1
							algorithmParams: paramsObject.hashAlgorithm.toSchema()
						});
					}
					
					if(parameters.algorithm.saltLength !== 20)
						paramsObject.saltLength = parameters.algorithm.saltLength;
					
					const pssParameters = new RSASSAPSSParams(paramsObject);
					//endregion
					
					//region Automatically set signature algorithm
					signatureAlgorithm.algorithmId = "1.2.840.113549.1.1.10";
					signatureAlgorithm.algorithmParams = pssParameters.toSchema();
					//endregion
				}
				break;
			default:
				return Promise.reject(`Unsupported signature algorithm: ${privateKey.algorithm.name}`);
		}
		//endregion

		return Promise.resolve().then(() => ({
			signatureAlgorithm,
			parameters
		}));
	}
	//**********************************************************************************
	/**
	 * Sign data with pre-defined private key
	 * @param {ArrayBuffer} data Data to be signed
	 * @param {Object} privateKey Private key to use
	 * @param {Object} parameters Parameters for used algorithm
	 * @return {Promise.<T>|Promise}
	 */
	signWithPrivateKey(data, privateKey, parameters)
	{
		return this.sign(parameters.algorithm,
			privateKey,
			new Uint8Array(data))
			.then(result =>
			{
				//region Special case for ECDSA algorithm
				if(parameters.algorithm.name === "ECDSA")
					result = createCMSECDSASignature(result);
				//endregion
				
				return result;
			}, error =>
				Promise.reject(`Signing error: ${error}`)
			);
	}
	//**********************************************************************************
	fillPublicKeyParameters(publicKeyInfo, signatureAlgorithm)
	{
		const parameters = {};
		
		//region Find signer's hashing algorithm
		const shaAlgorithm = this.getHashAlgorithm(signatureAlgorithm);
		if(shaAlgorithm === "")
			return Promise.reject(`Unsupported signature algorithm: ${signatureAlgorithm.algorithmId}`);
		//endregion
		
		//region Get information about public key algorithm and default parameters for import
		let algorithmId;
		if(signatureAlgorithm.algorithmId === "1.2.840.113549.1.1.10")
			algorithmId = signatureAlgorithm.algorithmId;
		else
			algorithmId = publicKeyInfo.algorithm.algorithmId;
		
		const algorithmObject = this.getAlgorithmByOID(algorithmId);
		if(("name" in algorithmObject) === "")
			return Promise.reject(`Unsupported public key algorithm: ${signatureAlgorithm.algorithmId}`);
		
		parameters.algorithm = this.getAlgorithmParameters(algorithmObject.name, "importkey");
		if("hash" in parameters.algorithm.algorithm)
			parameters.algorithm.algorithm.hash.name = shaAlgorithm;
		
		//region Special case for ECDSA
		if(algorithmObject.name === "ECDSA")
		{
			//region Get information about named curve
			let algorithmParamsChecked = false;
			
			if(("algorithmParams" in publicKeyInfo.algorithm) === true)
			{
				if("idBlock" in publicKeyInfo.algorithm.algorithmParams)
				{
					if((publicKeyInfo.algorithm.algorithmParams.idBlock.tagClass === 1) && (publicKeyInfo.algorithm.algorithmParams.idBlock.tagNumber === 6))
						algorithmParamsChecked = true;
				}
			}
			
			if(algorithmParamsChecked === false)
				return Promise.reject("Incorrect type for ECDSA public key parameters");
			
			const curveObject = this.getAlgorithmByOID(publicKeyInfo.algorithm.algorithmParams.valueBlock.toString());
			if(("name" in curveObject) === false)
				return Promise.reject(`Unsupported named curve algorithm: ${publicKeyInfo.algorithm.algorithmParams.valueBlock.toString()}`);
			//endregion
			
			parameters.algorithm.algorithm.namedCurve = curveObject.name;
		}
		//endregion
		//endregion
		
		return parameters;
	}
	//**********************************************************************************
	getPublicKey(publicKeyInfo, signatureAlgorithm, parameters = null)
	{
		if(parameters === null)
			parameters = this.fillPublicKeyParameters(publicKeyInfo, signatureAlgorithm);
		
		const publicKeyInfoSchema = publicKeyInfo.toSchema();
		const publicKeyInfoBuffer = publicKeyInfoSchema.toBER(false);
		const publicKeyInfoView = new Uint8Array(publicKeyInfoBuffer);
		
		return this.importKey("spki",
			publicKeyInfoView,
			parameters.algorithm.algorithm,
			true,
			parameters.algorithm.usages
		);
	}
	//**********************************************************************************
	verifyWithPublicKey(data, signature, publicKeyInfo, signatureAlgorithm, shaAlgorithm = null)
	{
		//region Initial variables
		let sequence = Promise.resolve();
		//endregion
		
		//region Find signer's hashing algorithm
		if(shaAlgorithm === null)
		{
			shaAlgorithm = this.getHashAlgorithm(signatureAlgorithm);
			if(shaAlgorithm === "")
				return Promise.reject(`Unsupported signature algorithm: ${signatureAlgorithm.algorithmId}`);
			
			//region Import public key
			sequence = sequence.then(() =>
				this.getPublicKey(publicKeyInfo, signatureAlgorithm));
			//endregion
		}
		else
		{
			const parameters = {};
			
			//region Get information about public key algorithm and default parameters for import
			let algorithmId;
			if(signatureAlgorithm.algorithmId === "1.2.840.113549.1.1.10")
				algorithmId = signatureAlgorithm.algorithmId;
			else
				algorithmId = publicKeyInfo.algorithm.algorithmId;
			
			const algorithmObject = this.getAlgorithmByOID(algorithmId);
			if(("name" in algorithmObject) === "")
				return Promise.reject(`Unsupported public key algorithm: ${signatureAlgorithm.algorithmId}`);
			
			parameters.algorithm = this.getAlgorithmParameters(algorithmObject.name, "importkey");
			if("hash" in parameters.algorithm.algorithm)
				parameters.algorithm.algorithm.hash.name = shaAlgorithm;
			
			//region Special case for ECDSA
			if(algorithmObject.name === "ECDSA")
			{
				//region Get information about named curve
				let algorithmParamsChecked = false;
				
				if(("algorithmParams" in publicKeyInfo.algorithm) === true)
				{
					if("idBlock" in publicKeyInfo.algorithm.algorithmParams)
					{
						if((publicKeyInfo.algorithm.algorithmParams.idBlock.tagClass === 1) && (publicKeyInfo.algorithm.algorithmParams.idBlock.tagNumber === 6))
							algorithmParamsChecked = true;
					}
				}
				
				if(algorithmParamsChecked === false)
					return Promise.reject("Incorrect type for ECDSA public key parameters");
				
				const curveObject = this.getAlgorithmByOID(publicKeyInfo.algorithm.algorithmParams.valueBlock.toString());
				if(("name" in curveObject) === false)
					return Promise.reject(`Unsupported named curve algorithm: ${publicKeyInfo.algorithm.algorithmParams.valueBlock.toString()}`);
				//endregion
				
				parameters.algorithm.algorithm.namedCurve = curveObject.name;
			}
			//endregion
			//endregion

			//region Import public key
			sequence = sequence.then(() =>
				this.getPublicKey(publicKeyInfo, null, parameters));
			//endregion
		}
		//endregion
		
		//region Verify signature
		sequence = sequence.then(publicKey =>
		{
			//region Get default algorithm parameters for verification
			const algorithm = this.getAlgorithmParameters(publicKey.algorithm.name, "verify");
			if("hash" in algorithm.algorithm)
				algorithm.algorithm.hash.name = shaAlgorithm;
			//endregion
			
			//region Special case for ECDSA signatures
			let signatureValue = signature.valueBlock.valueHex;
			
			if(publicKey.algorithm.name === "ECDSA")
			{
				const asn1 = fromBER(signatureValue);
				// noinspection JSCheckFunctionSignatures
				signatureValue = createECDSASignatureFromCMS(asn1.result);
			}
			//endregion
			
			//region Special case for RSA-PSS
			if(publicKey.algorithm.name === "RSA-PSS")
			{
				let pssParameters;
				
				try
				{
					pssParameters = new RSASSAPSSParams({ schema: signatureAlgorithm.algorithmParams });
				}
				catch(ex)
				{
					return Promise.reject(ex);
				}
				
				if("saltLength" in pssParameters)
					algorithm.algorithm.saltLength = pssParameters.saltLength;
				else
					algorithm.algorithm.saltLength = 20;
				
				let hashAlgo = "SHA-1";
				
				if("hashAlgorithm" in pssParameters)
				{
					const hashAlgorithm = this.getAlgorithmByOID(pssParameters.hashAlgorithm.algorithmId);
					if(("name" in hashAlgorithm) === false)
						return Promise.reject(`Unrecognized hash algorithm: ${pssParameters.hashAlgorithm.algorithmId}`);
					
					hashAlgo = hashAlgorithm.name;
				}
				
				algorithm.algorithm.hash.name = hashAlgo;
			}
			//endregion
			
			return this.verify(algorithm.algorithm,
				publicKey,
				new Uint8Array(signatureValue),
				new Uint8Array(data)
			);
		});
		//endregion
		
		return sequence;
	}
	//**********************************************************************************
}
//**************************************************************************************

//**************************************************************************************
//region Crypto engine related function
//**************************************************************************************
let engine = {
	name: "none",
	crypto: null,
	subtle: null
};
//**************************************************************************************
function setEngine(name, crypto, subtle)
{
	//region We are in Node
	// noinspection JSUnresolvedVariable
	if((typeof process !== "undefined") && ("pid" in process) && (typeof global !== "undefined") && (typeof window === "undefined"))
	{
		// noinspection ES6ModulesDependencies, JSUnresolvedVariable
		if(typeof global[process.pid] === "undefined")
		{
			// noinspection JSUnresolvedVariable
			global[process.pid] = {};
		}
		else
		{
			// noinspection JSUnresolvedVariable
			if(typeof global[process.pid] !== "object")
			{
				// noinspection JSUnresolvedVariable
				throw new Error(`Name global.${process.pid} already exists and it is not an object`);
			}
		}
		
		// noinspection JSUnresolvedVariable
		if(typeof global[process.pid].pkijs === "undefined")
		{
			// noinspection JSUnresolvedVariable
			global[process.pid].pkijs = {};
		}
		else
		{
			// noinspection JSUnresolvedVariable
			if(typeof global[process.pid].pkijs !== "object")
			{
				// noinspection JSUnresolvedVariable
				throw new Error(`Name global.${process.pid}.pkijs already exists and it is not an object`);
			}
		}
		
		// noinspection JSUnresolvedVariable
		global[process.pid].pkijs.engine = {
			name: name,
			crypto: crypto,
			subtle: subtle
		};
	}
	//endregion
	//region We are in browser
	else
	{
		engine = {
			name: name,
			crypto: crypto,
			subtle: subtle
		};
	}
	//endregion
}
//**************************************************************************************
function getEngine()
{
	//region We are in Node
	// noinspection JSUnresolvedVariable
	if((typeof process !== "undefined") && ("pid" in process) && (typeof global !== "undefined") && (typeof window === "undefined"))
	{
		let _engine;
		
		try
		{
			// noinspection JSUnresolvedVariable
			_engine = global[process.pid].pkijs.engine;
		}
		catch(ex)
		{
			throw new Error("Please call \"setEngine\" before call to \"getEngine\"");
		}
		
		return _engine;
	}
	//endregion
	
	return engine;
}
//**************************************************************************************
(function initCryptoEngine()
{
	if(typeof self !== "undefined")
	{
		if("crypto" in self)
		{
			let engineName = "webcrypto";
			
			/**
			 * Standard crypto object
			 * @type {Object}
			 * @property {Object} [webkitSubtle] Subtle object from Apple
			 */
			const cryptoObject = self.crypto;
			let subtleObject;
			
			// Apple Safari support
			if("webkitSubtle" in self.crypto)
			{
				try
				{
					subtleObject = self.crypto.webkitSubtle;
				}
				catch(ex)
				{
					subtleObject = self.crypto.subtle;
				}
				
				engineName = "safari";
			}
			
			if("subtle" in self.crypto)
				subtleObject = self.crypto.subtle;


			if(typeof subtleObject === "undefined")
			{
				engine = {
					name: engineName,
					crypto: cryptoObject,
					subtle: null
				};
			}
			else
			{
				engine = {
					name: engineName,
					crypto: cryptoObject,
					subtle: new CryptoEngine({name: engineName, crypto: self.crypto, subtle: subtleObject})
				};
			}
		}
	}
	
	setEngine(engine.name, engine.crypto, engine.subtle);
})();
//**************************************************************************************
//endregion
//**************************************************************************************
//region Declaration of common functions
//**************************************************************************************
/**
 * Get crypto subtle from current "crypto engine" or "undefined"
 * @returns {({decrypt, deriveKey, digest, encrypt, exportKey, generateKey, importKey, sign, unwrapKey, verify, wrapKey}|null)}
 */
function getCrypto()
{
	const _engine = getEngine();
	
	if(_engine.subtle !== null)
		return _engine.subtle;
	
	return undefined;
}
//**************************************************************************************
/**
 * Initialize input Uint8Array by random values (with help from current "crypto engine")
 * @param {!Uint8Array} view
 * @returns {*}
 */
function getRandomValues(view)
{
	return getEngine().subtle.getRandomValues(view);
}
//**************************************************************************************
/**
 * Get OID for each specific algorithm
 * @param {Object} algorithm
 * @returns {string}
 */
function getOIDByAlgorithm(algorithm)
{
	return getEngine().subtle.getOIDByAlgorithm(algorithm);
}
//**************************************************************************************
/**
 * Get default algorithm parameters for each kind of operation
 * @param {string} algorithmName Algorithm name to get common parameters for
 * @param {string} operation Kind of operation: "sign", "encrypt", "generatekey", "importkey", "exportkey", "verify"
 * @returns {*}
 */
function getAlgorithmParameters(algorithmName, operation)
{
	return getEngine().subtle.getAlgorithmParameters(algorithmName, operation);
}
//**************************************************************************************
/**
 * Create CMS ECDSA signature from WebCrypto ECDSA signature
 * @param {ArrayBuffer} signatureBuffer WebCrypto result of "sign" function
 * @returns {ArrayBuffer}
 */
function createCMSECDSASignature(signatureBuffer)
{
	//region Initial check for correct length
	if((signatureBuffer.byteLength % 2) !== 0)
		return new ArrayBuffer(0);
	//endregion
	
	//region Initial variables
	const length = signatureBuffer.byteLength / 2; // There are two equal parts inside incoming ArrayBuffer
	
	const rBuffer = new ArrayBuffer(length);
	const rView = new Uint8Array(rBuffer);
	rView.set(new Uint8Array(signatureBuffer, 0, length));
	
	const rInteger = new Integer({ valueHex: rBuffer });
	
	const sBuffer = new ArrayBuffer(length);
	const sView = new Uint8Array(sBuffer);
	sView.set(new Uint8Array(signatureBuffer, length, length));
	
	const sInteger = new Integer({ valueHex: sBuffer });
	//endregion
	
	return (new Sequence({
		value: [
			rInteger.convertToDER(),
			sInteger.convertToDER()
		]
	})).toBER(false);
}
//**************************************************************************************
/**
 * String preparation function. In a future here will be realization of algorithm from RFC4518
 * @param {string} inputString JavaScript string. As soon as for each ASN.1 string type we have a specific transformation function here we will work with pure JavaScript string
 * @returns {string} Formated string
 */
function stringPrep(inputString)
{
	//region Initial variables
	let isSpace = false;
	let cuttedResult = "";
	//endregion
	
	const result = inputString.trim(); // Trim input string
	
	//region Change all sequence of SPACE down to SPACE char
	for(let i = 0; i < result.length; i++)
	{
		if(result.charCodeAt(i) === 32)
		{
			if(isSpace === false)
				isSpace = true;
		}
		else
		{
			if(isSpace)
			{
				cuttedResult += " ";
				isSpace = false;
			}
			
			cuttedResult += result[i];
		}
	}
	//endregion
	
	return cuttedResult.toLowerCase();
}
//**************************************************************************************
/**
 * Create a single ArrayBuffer from CMS ECDSA signature
 * @param {Sequence} cmsSignature ASN.1 SEQUENCE contains CMS ECDSA signature
 * @returns {ArrayBuffer}
 */
function createECDSASignatureFromCMS(cmsSignature)
{
	//region Check input variables
	if((cmsSignature instanceof Sequence) === false)
		return new ArrayBuffer(0);
	
	if(cmsSignature.valueBlock.value.length !== 2)
		return new ArrayBuffer(0);
	
	if((cmsSignature.valueBlock.value[0] instanceof Integer) === false)
		return new ArrayBuffer(0);
	
	if((cmsSignature.valueBlock.value[1] instanceof Integer) === false)
		return new ArrayBuffer(0);
	//endregion
	
	const rValue = cmsSignature.valueBlock.value[0].convertFromDER();
	const sValue = cmsSignature.valueBlock.value[1].convertFromDER();
	
	//region Check the lengths of two parts are equal
	switch(true)
	{
		case (rValue.valueBlock.valueHex.byteLength < sValue.valueBlock.valueHex.byteLength):
			{
				if((sValue.valueBlock.valueHex.byteLength - rValue.valueBlock.valueHex.byteLength) !== 1)
					throw new Error("Incorrect DER integer decoding");
				
				const correctedLength = sValue.valueBlock.valueHex.byteLength;
				
				const rValueView = new Uint8Array(rValue.valueBlock.valueHex);
				
				const rValueBufferCorrected = new ArrayBuffer(correctedLength);
				const rValueViewCorrected = new Uint8Array(rValueBufferCorrected);
				
				rValueViewCorrected.set(rValueView, 1);
				rValueViewCorrected[0] = 0x00; // In order to be sure we do not have any garbage here
				
				return utilConcatBuf(rValueBufferCorrected, sValue.valueBlock.valueHex);
			}
		case (rValue.valueBlock.valueHex.byteLength > sValue.valueBlock.valueHex.byteLength):
			{
				if((rValue.valueBlock.valueHex.byteLength - sValue.valueBlock.valueHex.byteLength) !== 1)
					throw new Error("Incorrect DER integer decoding");
				
				const correctedLength = rValue.valueBlock.valueHex.byteLength;
				
				const sValueView = new Uint8Array(sValue.valueBlock.valueHex);
				
				const sValueBufferCorrected = new ArrayBuffer(correctedLength);
				const sValueViewCorrected = new Uint8Array(sValueBufferCorrected);
				
				sValueViewCorrected.set(sValueView, 1);
				sValueViewCorrected[0] = 0x00; // In order to be sure we do not have any garbage here
				
				return utilConcatBuf(rValue.valueBlock.valueHex, sValueBufferCorrected);
			}
		default:
			{
				//region In case we have equal length and the length is not even with 2
				if(rValue.valueBlock.valueHex.byteLength % 2)
				{
					const correctedLength = (rValue.valueBlock.valueHex.byteLength + 1);
					
					const rValueView = new Uint8Array(rValue.valueBlock.valueHex);
					
					const rValueBufferCorrected = new ArrayBuffer(correctedLength);
					const rValueViewCorrected = new Uint8Array(rValueBufferCorrected);
					
					rValueViewCorrected.set(rValueView, 1);
					rValueViewCorrected[0] = 0x00; // In order to be sure we do not have any garbage here
					
					const sValueView = new Uint8Array(sValue.valueBlock.valueHex);
					
					const sValueBufferCorrected = new ArrayBuffer(correctedLength);
					const sValueViewCorrected = new Uint8Array(sValueBufferCorrected);
					
					sValueViewCorrected.set(sValueView, 1);
					sValueViewCorrected[0] = 0x00; // In order to be sure we do not have any garbage here
					
					return utilConcatBuf(rValueBufferCorrected, sValueBufferCorrected);
				}
				//endregion
			}
	}
	//endregion
	
	return utilConcatBuf(rValue.valueBlock.valueHex, sValue.valueBlock.valueHex);
}
//**************************************************************************************
/**
 * Get WebCrypto algorithm by wel-known OID
 * @param {string} oid well-known OID to search for
 * @returns {Object}
 */
function getAlgorithmByOID(oid)
{
	return getEngine().subtle.getAlgorithmByOID(oid);
}
//**************************************************************************************
/**
 * Getting hash algorithm by signature algorithm
 * @param {AlgorithmIdentifier} signatureAlgorithm Signature algorithm
 * @returns {string}
 */
function getHashAlgorithm(signatureAlgorithm)
{
	return getEngine().subtle.getHashAlgorithm(signatureAlgorithm);
}
//**************************************************************************************
/**
 * ANS X9.63 Key Derivation Function having a "Counter" as a parameter
 * @param {string} hashFunction Used hash function
 * @param {ArrayBuffer} Zbuffer ArrayBuffer containing ECDH shared secret to derive from
 * @param {number} Counter
 * @param {ArrayBuffer} SharedInfo Usually DER encoded "ECC_CMS_SharedInfo" structure
 */
function kdfWithCounter(hashFunction, Zbuffer, Counter, SharedInfo)
{
	//region Check of input parameters
	switch(hashFunction.toUpperCase())
	{
		case "SHA-1":
		case "SHA-256":
		case "SHA-384":
		case "SHA-512":
			break;
		default:
			return Promise.reject(`Unknown hash function: ${hashFunction}`);
	}
	
	if((Zbuffer instanceof ArrayBuffer) === false)
		return Promise.reject("Please set \"Zbuffer\" as \"ArrayBuffer\"");
	
	if(Zbuffer.byteLength === 0)
		return Promise.reject("\"Zbuffer\" has zero length, error");
	
	if((SharedInfo instanceof ArrayBuffer) === false)
		return Promise.reject("Please set \"SharedInfo\" as \"ArrayBuffer\"");
	
	if(Counter > 255)
		return Promise.reject("Please set \"Counter\" variable to value less or equal to 255");
	//endregion
	
	//region Initial variables
	const counterBuffer = new ArrayBuffer(4);
	const counterView = new Uint8Array(counterBuffer);
	counterView[0] = 0x00;
	counterView[1] = 0x00;
	counterView[2] = 0x00;
	counterView[3] = Counter;
	
	let combinedBuffer = new ArrayBuffer(0);
	//endregion
	
	//region Get a "crypto" extension
	const crypto = getCrypto();
	if(typeof crypto === "undefined")
		return Promise.reject("Unable to create WebCrypto object");
	//endregion
	
	//region Create a combined ArrayBuffer for digesting
	combinedBuffer = utilConcatBuf(combinedBuffer, Zbuffer);
	combinedBuffer = utilConcatBuf(combinedBuffer, counterBuffer);
	combinedBuffer = utilConcatBuf(combinedBuffer, SharedInfo);
	//endregion
	
	//region Return digest of combined ArrayBuffer and information about current counter
	return crypto.digest({
		name: hashFunction
	},
	combinedBuffer)
		.then(result =>
			({
				counter: Counter,
				result
			}));
	//endregion
}
//**************************************************************************************
/**
 * ANS X9.63 Key Derivation Function
 * @param {string} hashFunction Used hash function
 * @param {ArrayBuffer} Zbuffer ArrayBuffer containing ECDH shared secret to derive from
 * @param {number} keydatalen Length (!!! in BITS !!!) of used kew derivation function
 * @param {ArrayBuffer} SharedInfo Usually DER encoded "ECC_CMS_SharedInfo" structure
 */
function kdf(hashFunction, Zbuffer, keydatalen, SharedInfo)
{
	//region Initial variables
	let hashLength = 0;
	let maxCounter = 1;
	
	const kdfArray = [];
	//endregion
	
	//region Check of input parameters
	switch(hashFunction.toUpperCase())
	{
		case "SHA-1":
			hashLength = 160; // In bits
			break;
		case "SHA-256":
			hashLength = 256; // In bits
			break;
		case "SHA-384":
			hashLength = 384; // In bits
			break;
		case "SHA-512":
			hashLength = 512; // In bits
			break;
		default:
			return Promise.reject(`Unknown hash function: ${hashFunction}`);
	}
	
	if((Zbuffer instanceof ArrayBuffer) === false)
		return Promise.reject("Please set \"Zbuffer\" as \"ArrayBuffer\"");
	
	if(Zbuffer.byteLength === 0)
		return Promise.reject("\"Zbuffer\" has zero length, error");
	
	if((SharedInfo instanceof ArrayBuffer) === false)
		return Promise.reject("Please set \"SharedInfo\" as \"ArrayBuffer\"");
	//endregion
	
	//region Calculated maximum value of "Counter" variable
	const quotient = keydatalen / hashLength;
	
	if(Math.floor(quotient) > 0)
	{
		maxCounter = Math.floor(quotient);
		
		if((quotient - maxCounter) > 0)
			maxCounter++;
	}
	//endregion
	
	//region Create an array of "kdfWithCounter"
	for(let i = 1; i <= maxCounter; i++)
		kdfArray.push(kdfWithCounter(hashFunction, Zbuffer, i, SharedInfo));
	//endregion
	
	//region Return combined digest with specified length
	return Promise.all(kdfArray).then(incomingResult =>
	{
		//region Initial variables
		let combinedBuffer = new ArrayBuffer(0);
		let currentCounter = 1;
		let found = true;
		//endregion
		
		//region Combine all buffer together
		while(found)
		{
			found = false;
			
			for(const result of incomingResult)
			{
				if(result.counter === currentCounter)
				{
					combinedBuffer = utilConcatBuf(combinedBuffer, result.result);
					found = true;
					break;
				}
			}
			
			currentCounter++;
		}
		//endregion
		
		//region Create output buffer with specified length
		keydatalen >>= 3; // Divide by 8 since "keydatalen" is in bits
		
		if(combinedBuffer.byteLength > keydatalen)
		{
			const newBuffer = new ArrayBuffer(keydatalen);
			const newView = new Uint8Array(newBuffer);
			const combinedView = new Uint8Array(combinedBuffer);
			
			for(let i = 0; i < keydatalen; i++)
				newView[i] = combinedView[i];
			
			return newBuffer;
		}
		
		return combinedBuffer; // Since the situation when "combinedBuffer.byteLength < keydatalen" here we have only "combinedBuffer.byteLength === keydatalen"
		//endregion
	});
	//endregion
}
//**************************************************************************************
//endregion
//**************************************************************************************

//**************************************************************************************
/**
 * Class from RFC5280
 */
class AttributeTypeAndValue
{
	//**********************************************************************************
	/**
	 * Constructor for AttributeTypeAndValue class
	 * @param {Object} [parameters={}]
	 * @param {Object} [parameters.schema] asn1js parsed value to initialize the class from
	 */
	constructor(parameters = {})
	{
		//region Internal properties of the object
		/**
		 * @type {string}
		 * @desc type
		 */
		this.type = getParametersValue(parameters, "type", AttributeTypeAndValue.defaultValues("type"));
		/**
		 * @type {Object}
		 * @desc Value of the AttributeTypeAndValue class
		 */
		this.value = getParametersValue(parameters, "value", AttributeTypeAndValue.defaultValues("value"));
		//endregion

		//region If input argument array contains "schema" for this object
		if("schema" in parameters)
			this.fromSchema(parameters.schema);
		//endregion
	}
	//**********************************************************************************
	/**
	 * Return default values for all class members
	 * @param {string} memberName String name for a class member
	 */
	static defaultValues(memberName)
	{
		switch(memberName)
		{
			case "type":
				return "";
			case "value":
				return {};
			default:
				throw new Error(`Invalid member name for AttributeTypeAndValue class: ${memberName}`);
		}
	}
	//**********************************************************************************
	/**
	 * Return value of pre-defined ASN.1 schema for current class
	 *
	 * ASN.1 schema:
	 * ```asn1
	 * AttributeTypeAndValue ::= Sequence {
	 *    type     AttributeType,
	 *    value    AttributeValue }
	 *
	 * AttributeType ::= OBJECT IDENTIFIER
	 *
	 * AttributeValue ::= ANY -- DEFINED BY AttributeType
	 * ```
	 *
	 * @param {Object} parameters Input parameters for the schema
	 * @returns {Object} asn1js schema object
	 */
	static schema(parameters = {})
	{
		/**
		 * @type {Object}
		 * @property {string} [blockName] Name for entire block
		 * @property {string} [type] Name for "type" element
		 * @property {string} [value] Name for "value" element
		 */
		const names = getParametersValue(parameters, "names", {});

		return (new Sequence({
			name: (names.blockName || ""),
			value: [
				new ObjectIdentifier({ name: (names.type || "") }),
				new Any({ name: (names.value || "") })
			]
		}));
	}
	//**********************************************************************************
	static blockName()
	{
		return "AttributeTypeAndValue";
	}
	//**********************************************************************************
	/**
	 * Convert parsed asn1js object into current class
	 * @param {!Object} schema
	 */
	fromSchema(schema)
	{
		//region Clear input data first
		clearProps(schema, [
			"type",
			"typeValue"
		]);
		//endregion
		
		//region Check the schema is valid
		const asn1 = compareSchema(schema,
			schema,
			AttributeTypeAndValue.schema({
				names: {
					type: "type",
					value: "typeValue"
				}
			})
		);

		if(asn1.verified === false)
			throw new Error("Object's schema was not verified against input data for AttributeTypeAndValue");
		//endregion

		//region Get internal properties from parsed schema
		this.type = asn1.result.type.valueBlock.toString();
		// noinspection JSUnresolvedVariable
		this.value = asn1.result.typeValue;
		//endregion
	}
	//**********************************************************************************
	/**
	 * Convert current object to asn1js object and set correct values
	 * @returns {Object} asn1js object
	 */
	toSchema()
	{
		//region Construct and return new ASN.1 schema for this object
		return (new Sequence({
			value: [
				new ObjectIdentifier({ value: this.type }),
				this.value
			]
		}));
		//endregion
	}
	//**********************************************************************************
	/**
	 * Convertion for the class to JSON object
	 * @returns {Object}
	 */
	toJSON()
	{
		const _object = {
			type: this.type
		};

		if(Object.keys(this.value).length !== 0)
			_object.value = this.value.toJSON();
		else
			_object.value = this.value;

		return _object;
	}
	//**********************************************************************************
	/**
	 * Compare two AttributeTypeAndValue values, or AttributeTypeAndValue with ArrayBuffer value
	 * @param {(AttributeTypeAndValue|ArrayBuffer)} compareTo The value compare to current
	 * @returns {boolean}
	 */
	isEqual(compareTo)
	{
		const stringBlockNames = [
			Utf8String.blockName(),
			BmpString.blockName(),
			UniversalString.blockName(),
			NumericString.blockName(),
			PrintableString.blockName(),
			TeletexString.blockName(),
			VideotexString.blockName(),
			IA5String.blockName(),
			GraphicString.blockName(),
			VisibleString.blockName(),
			GeneralString.blockName(),
			CharacterString.blockName()
		];

		if(compareTo.constructor.blockName() === AttributeTypeAndValue.blockName())
		{
			if(this.type !== compareTo.type)
				return false;

			//region Check we do have both strings
			let isString = false;
			const thisName = this.value.constructor.blockName();

			if(thisName === compareTo.value.constructor.blockName())
			{
				for(const name of stringBlockNames)
				{
					if(thisName === name)
					{
						isString = true;
						break;
					}
				}
			}
			//endregion

			if(isString)
			{
				const value1 = stringPrep(this.value.valueBlock.value);
				const value2 = stringPrep(compareTo.value.valueBlock.value);

				if(value1.localeCompare(value2) !== 0)
					return false;
			}
			else // Comparing as two ArrayBuffers
			{
				if(isEqualBuffer(this.value.valueBeforeDecode, compareTo.value.valueBeforeDecode) === false)
					return false;
			}

			return true;
		}

		if(compareTo instanceof ArrayBuffer)
			return isEqualBuffer(this.value.valueBeforeDecode, compareTo);

		return false;
	}
	//**********************************************************************************
}
//**************************************************************************************

//**************************************************************************************
/**
 * Class from RFC5280
 */
class RelativeDistinguishedNames
{
	//**********************************************************************************
	/**
	 * Constructor for RelativeDistinguishedNames class
	 * @param {Object} [parameters={}]
	 * @param {Object} [parameters.schema] asn1js parsed value to initialize the class from
	 * @property {Array.<AttributeTypeAndValue>} [typesAndValues] Array of "type and value" objects
	 * @property {ArrayBuffer} [valueBeforeDecode] Value of the RDN before decoding from schema
	 */
	constructor(parameters = {})
	{
		//region Internal properties of the object
		/**
		 * @type {Array.<AttributeTypeAndValue>}
		 * @desc Array of "type and value" objects
		 */
		this.typesAndValues = getParametersValue(parameters, "typesAndValues", RelativeDistinguishedNames.defaultValues("typesAndValues"));
		/**
		 * @type {ArrayBuffer}
		 * @desc Value of the RDN before decoding from schema
		 */
		this.valueBeforeDecode = getParametersValue(parameters, "valueBeforeDecode", RelativeDistinguishedNames.defaultValues("valueBeforeDecode"));
		//endregion

		//region If input argument array contains "schema" for this object
		if("schema" in parameters)
			this.fromSchema(parameters.schema);
		//endregion
	}
	//**********************************************************************************
	/**
	 * Return default values for all class members
	 * @param {string} memberName String name for a class member
	 */
	static defaultValues(memberName)
	{
		switch(memberName)
		{
			case "typesAndValues":
				return [];
			case "valueBeforeDecode":
				return new ArrayBuffer(0);
			default:
				throw new Error(`Invalid member name for RelativeDistinguishedNames class: ${memberName}`);
		}
	}
	//**********************************************************************************
	/**
	 * Compare values with default values for all class members
	 * @param {string} memberName String name for a class member
	 * @param {*} memberValue Value to compare with default value
	 */
	static compareWithDefault(memberName, memberValue)
	{
		switch(memberName)
		{
			case "typesAndValues":
				return (memberValue.length === 0);
			case "valueBeforeDecode":
				return (memberValue.byteLength === 0);
			default:
				throw new Error(`Invalid member name for RelativeDistinguishedNames class: ${memberName}`);
		}
	}
	//**********************************************************************************
	/**
	 * Return value of pre-defined ASN.1 schema for current class
	 *
	 * ASN.1 schema:
	 * ```asn1
	 * RDNSequence ::= Sequence OF RelativeDistinguishedName
	 *
	 * RelativeDistinguishedName ::=
	 * SET SIZE (1..MAX) OF AttributeTypeAndValue
	 * ```
	 *
	 * @param {Object} parameters Input parameters for the schema
	 * @returns {Object} asn1js schema object
	 */
	static schema(parameters = {})
	{
		/**
		 * @type {Object}
		 * @property {string} [blockName] Name for entire block
		 * @property {string} [repeatedSequence] Name for "repeatedSequence" block
		 * @property {string} [repeatedSet] Name for "repeatedSet" block
		 * @property {string} [typeAndValue] Name for "typeAndValue" block
		 */
		const names = getParametersValue(parameters, "names", {});

		return (new Sequence({
			name: (names.blockName || ""),
			value: [
				new Repeated({
					name: (names.repeatedSequence || ""),
					value: new Set({
						value: [
							new Repeated({
								name: (names.repeatedSet || ""),
								value: AttributeTypeAndValue.schema(names.typeAndValue || {})
							})
						]
					})
				})
			]
		}));
	}
	//**********************************************************************************
	/**
	 * Convert parsed asn1js object into current class
	 * @param {!Object} schema
	 */
	fromSchema(schema)
	{
		//region Clear input data first
		clearProps(schema, [
			"RDN",
			"typesAndValues"
		]);
		//endregion
		
		//region Check the schema is valid
		const asn1 = compareSchema(schema,
			schema,
			RelativeDistinguishedNames.schema({
				names: {
					blockName: "RDN",
					repeatedSet: "typesAndValues"
				}
			})
		);

		if(asn1.verified === false)
			throw new Error("Object's schema was not verified against input data for RelativeDistinguishedNames");
		//endregion

		//region Get internal properties from parsed schema
		if("typesAndValues" in asn1.result) // Could be a case when there is no "types and values"
			this.typesAndValues = Array.from(asn1.result.typesAndValues, element => new AttributeTypeAndValue({ schema: element }));

		// noinspection JSUnresolvedVariable
		this.valueBeforeDecode = asn1.result.RDN.valueBeforeDecode;
		//endregion
	}
	//**********************************************************************************
	/**
	 * Convert current object to asn1js object and set correct values
	 * @returns {Object} asn1js object
	 */
	toSchema()
	{
		//region Decode stored TBS value
		if(this.valueBeforeDecode.byteLength === 0) // No stored encoded array, create "from scratch"
		{
			return (new Sequence({
				value: [new Set({
					value: Array.from(this.typesAndValues, element => element.toSchema())
				})]
			}));
		}

		const asn1 = fromBER(this.valueBeforeDecode);
		//endregion

		//region Construct and return new ASN.1 schema for this object
		return asn1.result;
		//endregion
	}
	//**********************************************************************************
	/**
	 * Convertion for the class to JSON object
	 * @returns {Object}
	 */
	toJSON()
	{
		return {
			typesAndValues: Array.from(this.typesAndValues, element => element.toJSON())
		};
	}
	//**********************************************************************************
	/**
	 * Compare two RDN values, or RDN with ArrayBuffer value
	 * @param {(RelativeDistinguishedNames|ArrayBuffer)} compareTo The value compare to current
	 * @returns {boolean}
	 */
	isEqual(compareTo)
	{
		if(compareTo instanceof RelativeDistinguishedNames)
		{
			if(this.typesAndValues.length !== compareTo.typesAndValues.length)
				return false;

			for(const [index, typeAndValue] of this.typesAndValues.entries())
			{
				if(typeAndValue.isEqual(compareTo.typesAndValues[index]) === false)
					return false;
			}

			return true;
		}

		if(compareTo instanceof ArrayBuffer)
			return isEqualBuffer(this.valueBeforeDecode, compareTo);

		return false;
	}
	//**********************************************************************************
}
//**************************************************************************************

//**************************************************************************************
/**
 * Class from RFC5280
 */
class Time
{
	//**********************************************************************************
	/**
	 * Constructor for Time class
	 * @param {Object} [parameters={}]
	 * @param {Object} [parameters.schema] asn1js parsed value to initialize the class from
	 * @property {number} [type] 0 - UTCTime; 1 - GeneralizedTime; 2 - empty value
	 * @property {Date} [value] Value of the TIME class
	 */
	constructor(parameters = {})
	{
		//region Internal properties of the object
		/**
		 * @type {number}
		 * @desc 0 - UTCTime; 1 - GeneralizedTime; 2 - empty value
		 */
		this.type = getParametersValue(parameters, "type", Time.defaultValues("type"));
		/**
		 * @type {Date}
		 * @desc Value of the TIME class
		 */
		this.value = getParametersValue(parameters, "value", Time.defaultValues("value"));
		//endregion

		//region If input argument array contains "schema" for this object
		if("schema" in parameters)
			this.fromSchema(parameters.schema);
		//endregion
	}
	//**********************************************************************************
	/**
	 * Return default values for all class members
	 * @param {string} memberName String name for a class member
	 */
	static defaultValues(memberName)
	{
		switch(memberName)
		{
			case "type":
				return 0;
			case "value":
				return new Date(0, 0, 0);
			default:
				throw new Error(`Invalid member name for Time class: ${memberName}`);
		}
	}
	//**********************************************************************************
	/**
	 * Return value of pre-defined ASN.1 schema for current class
	 *
	 * ASN.1 schema:
	 * ```asn1
	 * Time ::= CHOICE {
     *   utcTime        UTCTime,
     *   generalTime    GeneralizedTime }
	 * ```
	 *
	 * @param {Object} parameters Input parameters for the schema
	 * @param {boolean} optional Flag that current schema should be optional
	 * @returns {Object} asn1js schema object
	 */
	static schema(parameters = {}, optional = false)
	{
		/**
		 * @type {Object}
		 * @property {string} [blockName]
		 * @property {string} [utcTimeName] Name for "utcTimeName" choice
		 * @property {string} [generalTimeName] Name for "generalTimeName" choice
		 */
		const names = getParametersValue(parameters, "names", {});

		return (new Choice({
			optional,
			value: [
				new UTCTime({ name: (names.utcTimeName || "") }),
				new GeneralizedTime({ name: (names.generalTimeName || "") })
			]
		}));
	}
	//**********************************************************************************
	/**
	 * Convert parsed asn1js object into current class
	 * @param {!Object} schema
	 */
	fromSchema(schema)
	{
		//region Clear input data first
		clearProps(schema, [
			"utcTimeName",
			"generalTimeName"
		]);
		//endregion
		
		//region Check the schema is valid
		const asn1 = compareSchema(schema, schema, Time.schema({
			names: {
				utcTimeName: "utcTimeName",
				generalTimeName: "generalTimeName"
			}
		}));

		if(asn1.verified === false)
			throw new Error("Object's schema was not verified against input data for Time");
		//endregion

		//region Get internal properties from parsed schema
		if("utcTimeName" in asn1.result)
		{
			this.type = 0;
			this.value = asn1.result.utcTimeName.toDate();
		}
		if("generalTimeName" in asn1.result)
		{
			this.type = 1;
			this.value = asn1.result.generalTimeName.toDate();
		}
		//endregion
	}
	//**********************************************************************************
	/**
	 * Convert current object to asn1js object and set correct values
	 * @returns {Object} asn1js object
	 */
	toSchema()
	{
		//region Construct and return new ASN.1 schema for this object
		let result = {};

		if(this.type === 0)
			result = new UTCTime({ valueDate: this.value });
		if(this.type === 1)
			result = new GeneralizedTime({ valueDate: this.value });

		return result;
		//endregion
	}
	//**********************************************************************************
	/**
	 * Convertion for the class to JSON object
	 * @returns {Object}
	 */
	toJSON()
	{
		return {
			type: this.type,
			value: this.value
		};
	}
	//**********************************************************************************
}
//**************************************************************************************

//**************************************************************************************
/**
 * Class from RFC5280
 */
class SubjectDirectoryAttributes
{
	//**********************************************************************************
	/**
	 * Constructor for SubjectDirectoryAttributes class
	 * @param {Object} [parameters={}]
	 * @param {Object} [parameters.schema] asn1js parsed value to initialize the class from
	 */
	constructor(parameters = {})
	{
		//region Internal properties of the object
		/**
		 * @type {Array.<Attribute>}
		 * @desc attributes
		 */
		this.attributes = getParametersValue(parameters, "attributes", SubjectDirectoryAttributes.defaultValues("attributes"));
		//endregion

		//region If input argument array contains "schema" for this object
		if("schema" in parameters)
			this.fromSchema(parameters.schema);
		//endregion
	}
	//**********************************************************************************
	/**
	 * Return default values for all class members
	 * @param {string} memberName String name for a class member
	 */
	static defaultValues(memberName)
	{
		switch(memberName)
		{
			case "attributes":
				return [];
			default:
				throw new Error(`Invalid member name for SubjectDirectoryAttributes class: ${memberName}`);
		}
	}
	//**********************************************************************************
	/**
	 * Return value of pre-defined ASN.1 schema for current class
	 *
	 * ASN.1 schema:
	 * ```asn1
	 * SubjectDirectoryAttributes ::= SEQUENCE SIZE (1..MAX) OF Attribute
	 * ```
	 *
	 * @param {Object} parameters Input parameters for the schema
	 * @returns {Object} asn1js schema object
	 */
	static schema(parameters = {})
	{
		/**
		 * @type {Object}
		 * @property {string} [blockName]
		 * @property {string} [utcTimeName] Name for "utcTimeName" choice
		 * @property {string} [generalTimeName] Name for "generalTimeName" choice
		 */
		const names = getParametersValue(parameters, "names", {});

		return (new Sequence({
			name: (names.blockName || ""),
			value: [
				new Repeated({
					name: (names.attributes || ""),
					value: Attribute.schema()
				})
			]
		}));
	}
	//**********************************************************************************
	/**
	 * Convert parsed asn1js object into current class
	 * @param {!Object} schema
	 */
	fromSchema(schema)
	{
		//region Clear input data first
		clearProps(schema, [
			"attributes"
		]);
		//endregion
		
		//region Check the schema is valid
		const asn1 = compareSchema(schema,
			schema,
			SubjectDirectoryAttributes.schema({
				names: {
					attributes: "attributes"
				}
			})
		);

		if(asn1.verified === false)
			throw new Error("Object's schema was not verified against input data for SubjectDirectoryAttributes");
		//endregion

		//region Get internal properties from parsed schema
		this.attributes = Array.from(asn1.result.attributes, element => new Attribute({ schema: element }));
		//endregion
	}
	//**********************************************************************************
	/**
	 * Convert current object to asn1js object and set correct values
	 * @returns {Object} asn1js object
	 */
	toSchema()
	{
		//region Construct and return new ASN.1 schema for this object
		return (new Sequence({
			value: Array.from(this.attributes, element => element.toSchema())
		}));
		//endregion
	}
	//**********************************************************************************
	/**
	 * Convertion for the class to JSON object
	 * @returns {Object}
	 */
	toJSON()
	{
		return {
			attributes: Array.from(this.attributes, element => element.toJSON())
		};
	}
	//**********************************************************************************
}
//**************************************************************************************

//**************************************************************************************
/**
 * Class from RFC5280
 */
class PrivateKeyUsagePeriod
{
	//**********************************************************************************
	/**
	 * Constructor for PrivateKeyUsagePeriod class
	 * @param {Object} [parameters={}]
	 * @param {Object} [parameters.schema] asn1js parsed value to initialize the class from
	 */
	constructor(parameters = {})
	{
		//region Internal properties of the object
		if("notBefore" in parameters)
			/**
			 * @type {Date}
			 * @desc notBefore
			 */
			this.notBefore = getParametersValue(parameters, "notBefore", PrivateKeyUsagePeriod.defaultValues("notBefore"));

		if("notAfter" in parameters)
			/**
			 * @type {Date}
			 * @desc notAfter
			 */
			this.notAfter = getParametersValue(parameters, "notAfter", PrivateKeyUsagePeriod.defaultValues("notAfter"));
		//endregion

		//region If input argument array contains "schema" for this object
		if("schema" in parameters)
			this.fromSchema(parameters.schema);
		//endregion
	}
	//**********************************************************************************
	/**
	 * Return default values for all class members
	 * @param {string} memberName String name for a class member
	 */
	static defaultValues(memberName)
	{
		switch(memberName)
		{
			case "notBefore":
				return new Date();
			case "notAfter":
				return new Date();
			default:
				throw new Error(`Invalid member name for PrivateKeyUsagePeriod class: ${memberName}`);
		}
	}
	//**********************************************************************************
	/**
	 * Return value of pre-defined ASN.1 schema for current class
	 *
	 * ASN.1 schema:
	 * ```asn1
	 * PrivateKeyUsagePeriod OID ::= 2.5.29.16
	 *
	 * PrivateKeyUsagePeriod ::= SEQUENCE {
	 *    notBefore       [0]     GeneralizedTime OPTIONAL,
	 *    notAfter        [1]     GeneralizedTime OPTIONAL }
	 * -- either notBefore or notAfter MUST be present
	 * ```
	 *
	 * @param {Object} parameters Input parameters for the schema
	 * @returns {Object} asn1js schema object
	 */
	static schema(parameters = {})
	{
		/**
		 * @type {Object}
		 * @property {string} [blockName]
		 * @property {string} [notBefore]
		 * @property {string} [notAfter]
		 */
		const names = getParametersValue(parameters, "names", {});

		return (new Sequence({
			name: (names.blockName || ""),
			value: [
				new Primitive({
					name: (names.notBefore || ""),
					optional: true,
					idBlock: {
						tagClass: 3, // CONTEXT-SPECIFIC
						tagNumber: 0 // [0]
					}
				}),
				new Primitive({
					name: (names.notAfter || ""),
					optional: true,
					idBlock: {
						tagClass: 3, // CONTEXT-SPECIFIC
						tagNumber: 1 // [1]
					}
				})
			]
		}));
	}
	//**********************************************************************************
	/**
	 * Convert parsed asn1js object into current class
	 * @param {!Object} schema
	 */
	fromSchema(schema)
	{
		//region Clear input data first
		clearProps(schema, [
			"notBefore",
			"notAfter"
		]);
		//endregion
		
		//region Check the schema is valid
		const asn1 = compareSchema(schema,
			schema,
			PrivateKeyUsagePeriod.schema({
				names: {
					notBefore: "notBefore",
					notAfter: "notAfter"
				}
			})
		);

		if(asn1.verified === false)
			throw new Error("Object's schema was not verified against input data for PrivateKeyUsagePeriod");
		//endregion

		//region Get internal properties from parsed schema
		if("notBefore" in asn1.result)
		{
			const localNotBefore = new GeneralizedTime();
			localNotBefore.fromBuffer(asn1.result.notBefore.valueBlock.valueHex);
			this.notBefore = localNotBefore.toDate();
		}

		if("notAfter" in asn1.result)
		{
			const localNotAfter = new GeneralizedTime({ valueHex: asn1.result.notAfter.valueBlock.valueHex });
			localNotAfter.fromBuffer(asn1.result.notAfter.valueBlock.valueHex);
			this.notAfter = localNotAfter.toDate();
		}
		//endregion
	}
	//**********************************************************************************
	/**
	 * Convert current object to asn1js object and set correct values
	 * @returns {Object} asn1js object
	 */
	toSchema()
	{
		//region Create array for output sequence
		const outputArray = [];
		
		if("notBefore" in this)
		{
			outputArray.push(new Primitive({
				idBlock: {
					tagClass: 3, // CONTEXT-SPECIFIC
					tagNumber: 0 // [0]
				},
				valueHex: (new GeneralizedTime({ valueDate: this.notBefore })).valueBlock.valueHex
			}));
		}
		
		if("notAfter" in this)
		{
			outputArray.push(new Primitive({
				idBlock: {
					tagClass: 3, // CONTEXT-SPECIFIC
					tagNumber: 1 // [1]
				},
				valueHex: (new GeneralizedTime({ valueDate: this.notAfter })).valueBlock.valueHex
			}));
		}
		//endregion
		
		//region Construct and return new ASN.1 schema for this object
		return (new Sequence({
			value: outputArray
		}));
		//endregion
	}
	//**********************************************************************************
	/**
	 * Convertion for the class to JSON object
	 * @returns {Object}
	 */
	toJSON()
	{
		const object = {};

		if("notBefore" in this)
			object.notBefore = this.notBefore;

		if("notAfter" in this)
			object.notAfter = this.notAfter;

		return object;
	}
	//**********************************************************************************
}
//**************************************************************************************

//**************************************************************************************
//region Additional asn1js schema elements existing inside GeneralName schema
//**************************************************************************************
/**
 * Schema for "builtInStandardAttributes" of "ORAddress"
 * @param {Object} parameters
 * @property {Object} [names]
 * @param {boolean} optional
 * @returns {Sequence}
 */
function builtInStandardAttributes(parameters = {}, optional = false)
{
	//builtInStandardAttributes ::= Sequence {
	//    country-name                  CountryName OPTIONAL,
	//    administration-domain-name    AdministrationDomainName OPTIONAL,
	//    network-address           [0] IMPLICIT NetworkAddress OPTIONAL,
	//    terminal-identifier       [1] IMPLICIT TerminalIdentifier OPTIONAL,
	//    private-domain-name       [2] PrivateDomainName OPTIONAL,
	//    organization-name         [3] IMPLICIT OrganizationName OPTIONAL,
	//    numeric-user-identifier   [4] IMPLICIT NumericUserIdentifier OPTIONAL,
	//    personal-name             [5] IMPLICIT PersonalName OPTIONAL,
	//    organizational-unit-names [6] IMPLICIT OrganizationalUnitNames OPTIONAL }

	/**
	 * @type {Object}
	 * @property {string} [country_name]
	 * @property {string} [administration_domain_name]
	 * @property {string} [network_address]
	 * @property {string} [terminal_identifier]
	 * @property {string} [private_domain_name]
	 * @property {string} [organization_name]
	 * @property {string} [numeric_user_identifier]
	 * @property {string} [personal_name]
	 * @property {string} [organizational_unit_names]
	 */
	const names = getParametersValue(parameters, "names", {});

	return (new Sequence({
		optional,
		value: [
			new Constructed({
				optional: true,
				idBlock: {
					tagClass: 2, // APPLICATION-SPECIFIC
					tagNumber: 1 // [1]
				},
				name: (names.country_name || ""),
				value: [
					new Choice({
						value: [
							new NumericString(),
							new PrintableString()
						]
					})
				]
			}),
			new Constructed({
				optional: true,
				idBlock: {
					tagClass: 2, // APPLICATION-SPECIFIC
					tagNumber: 2 // [2]
				},
				name: (names.administration_domain_name || ""),
				value: [
					new Choice({
						value: [
							new NumericString(),
							new PrintableString()
						]
					})
				]
			}),
			new Primitive({
				optional: true,
				idBlock: {
					tagClass: 3, // CONTEXT-SPECIFIC
					tagNumber: 0 // [0]
				},
				name: (names.network_address || ""),
				isHexOnly: true
			}),
			new Primitive({
				optional: true,
				idBlock: {
					tagClass: 3, // CONTEXT-SPECIFIC
					tagNumber: 1 // [1]
				},
				name: (names.terminal_identifier || ""),
				isHexOnly: true
			}),
			new Constructed({
				optional: true,
				idBlock: {
					tagClass: 3, // CONTEXT-SPECIFIC
					tagNumber: 2 // [2]
				},
				name: (names.private_domain_name || ""),
				value: [
					new Choice({
						value: [
							new NumericString(),
							new PrintableString()
						]
					})
				]
			}),
			new Primitive({
				optional: true,
				idBlock: {
					tagClass: 3, // CONTEXT-SPECIFIC
					tagNumber: 3 // [3]
				},
				name: (names.organization_name || ""),
				isHexOnly: true
			}),
			new Primitive({
				optional: true,
				name: (names.numeric_user_identifier || ""),
				idBlock: {
					tagClass: 3, // CONTEXT-SPECIFIC
					tagNumber: 4 // [4]
				},
				isHexOnly: true
			}),
			new Constructed({
				optional: true,
				name: (names.personal_name || ""),
				idBlock: {
					tagClass: 3, // CONTEXT-SPECIFIC
					tagNumber: 5 // [5]
				},
				value: [
					new Primitive({
						idBlock: {
							tagClass: 3, // CONTEXT-SPECIFIC
							tagNumber: 0 // [0]
						},
						isHexOnly: true
					}),
					new Primitive({
						optional: true,
						idBlock: {
							tagClass: 3, // CONTEXT-SPECIFIC
							tagNumber: 1 // [1]
						},
						isHexOnly: true
					}),
					new Primitive({
						optional: true,
						idBlock: {
							tagClass: 3, // CONTEXT-SPECIFIC
							tagNumber: 2 // [2]
						},
						isHexOnly: true
					}),
					new Primitive({
						optional: true,
						idBlock: {
							tagClass: 3, // CONTEXT-SPECIFIC
							tagNumber: 3 // [3]
						},
						isHexOnly: true
					})
				]
			}),
			new Constructed({
				optional: true,
				name: (names.organizational_unit_names || ""),
				idBlock: {
					tagClass: 3, // CONTEXT-SPECIFIC
					tagNumber: 6 // [6]
				},
				value: [
					new Repeated({
						value: new PrintableString()
					})
				]
			})
		]
	}));
}
//**************************************************************************************
/**
 * Schema for "builtInDomainDefinedAttributes" of "ORAddress"
 * @param {boolean} optional
 * @returns {Sequence}
 */
function builtInDomainDefinedAttributes(optional = false)
{
	return (new Sequence({
		optional,
		value: [
			new PrintableString(),
			new PrintableString()
		]
	}));
}
//**************************************************************************************
/**
 * Schema for "builtInDomainDefinedAttributes" of "ORAddress"
 * @param {boolean} optional
 * @returns {Set}
 */
function extensionAttributes(optional = false)
{
	return (new Set({
		optional,
		value: [
			new Primitive({
				optional: true,
				idBlock: {
					tagClass: 3, // CONTEXT-SPECIFIC
					tagNumber: 0 // [0]
				},
				isHexOnly: true
			}),
			new Constructed({
				optional: true,
				idBlock: {
					tagClass: 3, // CONTEXT-SPECIFIC
					tagNumber: 1 // [1]
				},
				value: [new Any()]
			})
		]
	}));
}
//**************************************************************************************
//endregion
//**************************************************************************************
/**
 * Class from RFC5280
 */
class GeneralName
{
	//**********************************************************************************
	/**
	 * Constructor for GeneralName class
	 * @param {Object} [parameters={}]
	 * @param {Object} [parameters.schema] asn1js parsed value to initialize the class from
	 * @property {number} [type] value type - from a tagged value (0 for "otherName", 1 for "rfc822Name" etc.)
	 * @property {Object} [value] asn1js object having GeneralName value (type depends on "type" value)
	 */
	constructor(parameters = {})
	{
		//region Internal properties of the object
		/**
		 * @type {number}
		 * @desc value type - from a tagged value (0 for "otherName", 1 for "rfc822Name" etc.)
		 */
		this.type = getParametersValue(parameters, "type", GeneralName.defaultValues("type"));
		/**
		 * @type {Object}
		 * @desc asn1js object having GeneralName value (type depends on "type" value)
		 */
		this.value = getParametersValue(parameters, "value", GeneralName.defaultValues("value"));
		//endregion

		//region If input argument array contains "schema" for this object
		if("schema" in parameters)
			this.fromSchema(parameters.schema);
		//endregion
	}
	//**********************************************************************************
	/**
	 * Return default values for all class members
	 * @param {string} memberName String name for a class member
	 */
	static defaultValues(memberName)
	{
		switch(memberName)
		{
			case "type":
				return 9;
			case "value":
				return {};
			default:
				throw new Error(`Invalid member name for GeneralName class: ${memberName}`);
		}
	}
	//**********************************************************************************
	/**
	 * Compare values with default values for all class members
	 * @param {string} memberName String name for a class member
	 * @param {*} memberValue Value to compare with default value
	 */
	static compareWithDefault(memberName, memberValue)
	{
		switch(memberName)
		{
			case "type":
				return (memberValue === GeneralName.defaultValues(memberName));
			case "value":
				return (Object.keys(memberValue).length === 0);
			default:
				throw new Error(`Invalid member name for GeneralName class: ${memberName}`);
		}
	}
	//**********************************************************************************
	/**
	 * Return value of pre-defined ASN.1 schema for current class
	 *
	 * ASN.1 schema:
	 * ```asn1
	 * GeneralName ::= Choice {
	 *    otherName                       [0]     OtherName,
	 *    rfc822Name                      [1]     IA5String,
	 *    dNSName                         [2]     IA5String,
	 *    x400Address                     [3]     ORAddress,
	 *    directoryName                   [4]     value,
	 *    ediPartyName                    [5]     EDIPartyName,
	 *    uniformResourceIdentifier       [6]     IA5String,
	 *    iPAddress                       [7]     OCTET STRING,
	 *    registeredID                    [8]     OBJECT IDENTIFIER }
	 * ```
	 *
	 * @param {Object} parameters Input parameters for the schema
	 * @returns {Object} asn1js schema object
	 */
	static schema(parameters = {})
	{
		/**
		 * @type {Object}
		 * @property {string} [blockName]
		 * @property {Object} [directoryName]
		 * @property {Object} [builtInStandardAttributes]
		 */
		const names = getParametersValue(parameters, "names", {});

		return (new Choice({
			value: [
				new Constructed({
					idBlock: {
						tagClass: 3, // CONTEXT-SPECIFIC
						tagNumber: 0 // [0]
					},
					name: (names.blockName || ""),
					value: [
						new ObjectIdentifier(),
						new Constructed({
							idBlock: {
								tagClass: 3, // CONTEXT-SPECIFIC
								tagNumber: 0 // [0]
							},
							value: [new Any()]
						})
					]
				}),
				new Primitive({
					name: (names.blockName || ""),
					idBlock: {
						tagClass: 3, // CONTEXT-SPECIFIC
						tagNumber: 1 // [1]
					}
				}),
				new Primitive({
					name: (names.blockName || ""),
					idBlock: {
						tagClass: 3, // CONTEXT-SPECIFIC
						tagNumber: 2 // [2]
					}
				}),
				new Constructed({
					idBlock: {
						tagClass: 3, // CONTEXT-SPECIFIC
						tagNumber: 3 // [3]
					},
					name: (names.blockName || ""),
					value: [
						builtInStandardAttributes((names.builtInStandardAttributes || {}), false),
						builtInDomainDefinedAttributes(true),
						extensionAttributes(true)
					]
				}),
				new Constructed({
					idBlock: {
						tagClass: 3, // CONTEXT-SPECIFIC
						tagNumber: 4 // [4]
					},
					name: (names.blockName || ""),
					value: [RelativeDistinguishedNames.schema(names.directoryName || {})]
				}),
				new Constructed({
					idBlock: {
						tagClass: 3, // CONTEXT-SPECIFIC
						tagNumber: 5 // [5]
					},
					name: (names.blockName || ""),
					value: [
						new Constructed({
							optional: true,
							idBlock: {
								tagClass: 3, // CONTEXT-SPECIFIC
								tagNumber: 0 // [0]
							},
							value: [
								new Choice({
									value: [
										new TeletexString(),
										new PrintableString(),
										new UniversalString(),
										new Utf8String(),
										new BmpString()
									]
								})
							]
						}),
						new Constructed({
							idBlock: {
								tagClass: 3, // CONTEXT-SPECIFIC
								tagNumber: 1 // [1]
							},
							value: [
								new Choice({
									value: [
										new TeletexString(),
										new PrintableString(),
										new UniversalString(),
										new Utf8String(),
										new BmpString()
									]
								})
							]
						})
					]
				}),
				new Primitive({
					name: (names.blockName || ""),
					idBlock: {
						tagClass: 3, // CONTEXT-SPECIFIC
						tagNumber: 6 // [6]
					}
				}),
				new Primitive({
					name: (names.blockName || ""),
					idBlock: {
						tagClass: 3, // CONTEXT-SPECIFIC
						tagNumber: 7 // [7]
					}
				}),
				new Primitive({
					name: (names.blockName || ""),
					idBlock: {
						tagClass: 3, // CONTEXT-SPECIFIC
						tagNumber: 8 // [8]
					}
				})
			]
		}));
	}
	//**********************************************************************************
	/**
	 * Convert parsed asn1js object into current class
	 * @param {!Object} schema
	 */
	fromSchema(schema)
	{
		//region Clear input data first
		clearProps(schema, [
			"blockName",
			"otherName",
			"rfc822Name",
			"dNSName",
			"x400Address",
			"directoryName",
			"ediPartyName",
			"uniformResourceIdentifier",
			"iPAddress",
			"registeredID"
		]);
		//endregion
		
		//region Check the schema is valid
		const asn1 = compareSchema(schema,
			schema,
			GeneralName.schema({
				names: {
					blockName: "blockName",
					otherName: "otherName",
					rfc822Name: "rfc822Name",
					dNSName: "dNSName",
					x400Address: "x400Address",
					directoryName: {
						names: {
							blockName: "directoryName"
						}
					},
					ediPartyName: "ediPartyName",
					uniformResourceIdentifier: "uniformResourceIdentifier",
					iPAddress: "iPAddress",
					registeredID: "registeredID"
				}
			})
		);

		if(asn1.verified === false)
			throw new Error("Object's schema was not verified against input data for GeneralName");
		//endregion

		//region Get internal properties from parsed schema
		this.type = asn1.result.blockName.idBlock.tagNumber;

		switch(this.type)
		{
			case 0: // otherName
				this.value = asn1.result.blockName;
				break;
			case 1: // rfc822Name + dNSName + uniformResourceIdentifier
			case 2:
			case 6:
				{
					const value = asn1.result.blockName;

					value.idBlock.tagClass = 1; // UNIVERSAL
					value.idBlock.tagNumber = 22; // IA5STRING

					const valueBER = value.toBER(false);

					this.value = fromBER(valueBER).result.valueBlock.value;
				}
				break;
			case 3: // x400Address
				this.value = asn1.result.blockName;
				break;
			case 4: // directoryName
				this.value = new RelativeDistinguishedNames({ schema: asn1.result.directoryName });
				break;
			case 5: // ediPartyName
				this.value = asn1.result.ediPartyName;
				break;
			case 7: // iPAddress
				this.value = new OctetString({ valueHex: asn1.result.blockName.valueBlock.valueHex });
				break;
			case 8: // registeredID
				{
					const value = asn1.result.blockName;

					value.idBlock.tagClass = 1; // UNIVERSAL
					value.idBlock.tagNumber = 6; // ObjectIdentifier

					const valueBER = value.toBER(false);

					this.value = fromBER(valueBER).result.valueBlock.toString(); // Getting a string representation of the ObjectIdentifier
				}
				break;
			default:
		}
		//endregion
	}
	//**********************************************************************************
	/**
	 * Convert current object to asn1js object and set correct values
	 * @returns {Object} asn1js object
	 */
	toSchema()
	{
		//region Construct and return new ASN.1 schema for this object
		switch(this.type)
		{
			case 0:
			case 3:
			case 5:
				return new Constructed({
					idBlock: {
						tagClass: 3, // CONTEXT-SPECIFIC
						tagNumber: this.type
					},
					value: [
						this.value
					]
				});
			case 1:
			case 2:
			case 6:
				{
					const value = new IA5String({ value: this.value });

					value.idBlock.tagClass = 3;
					value.idBlock.tagNumber = this.type;

					return value;
				}
			case 4:
				return new Constructed({
					idBlock: {
						tagClass: 3, // CONTEXT-SPECIFIC
						tagNumber: 4
					},
					value: [this.value.toSchema()]
				});
			case 7:
				{
					const value = this.value;

					value.idBlock.tagClass = 3;
					value.idBlock.tagNumber = this.type;

					return value;
				}
			case 8:
				{
					const value = new ObjectIdentifier({ value: this.value });

					value.idBlock.tagClass = 3;
					value.idBlock.tagNumber = this.type;

					return value;
				}
			default:
				return GeneralName.schema();
		}
		//endregion
	}
	//**********************************************************************************
	/**
	 * Convertion for the class to JSON object
	 * @returns {Object}
	 */
	toJSON()
	{
		const _object = {
			type: this.type,
			value: ""
		};

		if((typeof this.value) === "string")
			_object.value = this.value;
		else
		{
			try
			{
				_object.value = this.value.toJSON();
			}
			catch(ex){}
		}

		return _object;
	}
	//**********************************************************************************
}
//**************************************************************************************

//**************************************************************************************
/**
 * Class from RFC5280
 */
class AltName
{
	//**********************************************************************************
	/**
	 * Constructor for AltName class
	 * @param {Object} [parameters={}]
	 * @param {Object} [parameters.schema] asn1js parsed value to initialize the class from
	 */
	constructor(parameters = {})
	{
		//region Internal properties of the object
		/**
		 * @type {Array.<GeneralName>}
		 * @desc Array of alternative names in GeneralName type
		 */
		this.altNames = getParametersValue(parameters, "altNames", AltName.defaultValues("altNames"));
		//endregion

		//region If input argument array contains "schema" for this object
		if("schema" in parameters)
			this.fromSchema(parameters.schema);
		//endregion
	}
	//**********************************************************************************
	/**
	 * Return default values for all class members
	 * @param {string} memberName String name for a class member
	 */
	static defaultValues(memberName)
	{
		switch(memberName)
		{
			case "altNames":
				return [];
			default:
				throw new Error(`Invalid member name for AltName class: ${memberName}`);
		}
	}
	//**********************************************************************************
	/**
	 * Return value of pre-defined ASN.1 schema for current class
	 *
	 * ASN.1 schema:
	 * ```asn1
	 * AltName ::= GeneralNames
	 * ```
	 *
	 * @param {Object} parameters Input parameters for the schema
	 * @returns {Object} asn1js schema object
	 */
	static schema(parameters = {})
	{
		/**
		 * @type {Object}
		 * @property {string} [blockName]
		 * @property {string} [altNames]
		 */
		const names = getParametersValue(parameters, "names", {});

		return (new Sequence({
			name: (names.blockName || ""),
			value: [
				new Repeated({
					name: (names.altNames || ""),
					value: GeneralName.schema()
				})
			]
		}));
	}
	//**********************************************************************************
	/**
	 * Convert parsed asn1js object into current class
	 * @param {!Object} schema
	 */
	fromSchema(schema)
	{
		//region Clear input data first
		clearProps(schema, [
			"altNames"
		]);
		//endregion
		
		//region Check the schema is valid
		const asn1 = compareSchema(schema,
			schema,
			AltName.schema({
				names: {
					altNames: "altNames"
				}
			})
		);

		if(asn1.verified === false)
			throw new Error("Object's schema was not verified against input data for AltName");
		//endregion

		//region Get internal properties from parsed schema
		if("altNames" in asn1.result)
			this.altNames = Array.from(asn1.result.altNames, element => new GeneralName({ schema: element }));
		//endregion
	}
	//**********************************************************************************
	/**
	 * Convert current object to asn1js object and set correct values
	 * @returns {Object} asn1js object
	 */
	toSchema()
	{
		//region Construct and return new ASN.1 schema for this object
		return (new Sequence({
			value: Array.from(this.altNames, element => element.toSchema())
		}));
		//endregion
	}
	//**********************************************************************************
	/**
	 * Convertion for the class to JSON object
	 * @returns {Object}
	 */
	toJSON()
	{
		return {
			altNames: Array.from(this.altNames, element => element.toJSON())
		};
	}
	//**********************************************************************************
}
//**************************************************************************************

//**************************************************************************************
/**
 * Class from RFC5280
 */
class BasicConstraints
{
	//**********************************************************************************
	/**
	 * Constructor for BasicConstraints class
	 * @param {Object} [parameters={}]
	 * @param {Object} [parameters.schema] asn1js parsed value to initialize the class from
	 * @property {Object} [cA]
	 * @property {Object} [pathLenConstraint]
	 */
	constructor(parameters = {})
	{
		//region Internal properties of the object
		/**
		 * @type {boolean}
		 * @desc cA
		 */
		this.cA = getParametersValue(parameters, "cA", false);

		if("pathLenConstraint" in parameters)
			/**
			 * @type {number|Integer}
			 * @desc pathLenConstraint
			 */
			this.pathLenConstraint = getParametersValue(parameters, "pathLenConstraint", 0);
		//endregion

		//region If input argument array contains "schema" for this object
		if("schema" in parameters)
			this.fromSchema(parameters.schema);
		//endregion
	}
	//**********************************************************************************
	/**
	 * Return default values for all class members
	 * @param {string} memberName String name for a class member
	 */
	static defaultValues(memberName)
	{
		switch(memberName)
		{
			case "cA":
				return false;
			default:
				throw new Error(`Invalid member name for BasicConstraints class: ${memberName}`);
		}
	}
	//**********************************************************************************
	/**
	 * Return value of pre-defined ASN.1 schema for current class
	 *
	 * ASN.1 schema:
	 * ```asn1
	 * BasicConstraints ::= SEQUENCE {
	 *    cA                      BOOLEAN DEFAULT FALSE,
	 *    pathLenConstraint       INTEGER (0..MAX) OPTIONAL }
	 * ```
	 *
	 * @param {Object} parameters Input parameters for the schema
	 * @returns {Object} asn1js schema object
	 */
	static schema(parameters = {})
	{
		/**
		 * @type {Object}
		 * @property {string} [blockName]
		 * @property {string} [cA]
		 * @property {string} [pathLenConstraint]
		 */
		const names = getParametersValue(parameters, "names", {});

		return (new Sequence({
			name: (names.blockName || ""),
			value: [
				new Boolean({
					optional: true,
					name: (names.cA || "")
				}),
				new Integer({
					optional: true,
					name: (names.pathLenConstraint || "")
				})
			]
		}));
	}
	//**********************************************************************************
	/**
	 * Convert parsed asn1js object into current class
	 * @param {!Object} schema
	 */
	fromSchema(schema)
	{
		//region Clear input data first
		clearProps(schema, [
			"cA",
			"pathLenConstraint"
		]);
		//endregion
		
		//region Check the schema is valid
		const asn1 = compareSchema(schema,
			schema,
			BasicConstraints.schema({
				names: {
					cA: "cA",
					pathLenConstraint: "pathLenConstraint"
				}
			})
		);

		if(asn1.verified === false)
			throw new Error("Object's schema was not verified against input data for BasicConstraints");
		//endregion

		//region Get internal properties from parsed schema
		if("cA" in asn1.result)
			this.cA = asn1.result.cA.valueBlock.value;

		if("pathLenConstraint" in asn1.result)
		{
			if(asn1.result.pathLenConstraint.valueBlock.isHexOnly)
				this.pathLenConstraint = asn1.result.pathLenConstraint;
			else
				this.pathLenConstraint = asn1.result.pathLenConstraint.valueBlock.valueDec;
		}
		//endregion
	}
	//**********************************************************************************
	/**
	 * Convert current object to asn1js object and set correct values
	 * @returns {Object} asn1js object
	 */
	toSchema()
	{
		//region Create array for output sequence
		const outputArray = [];
		
		if(this.cA !== BasicConstraints.defaultValues("cA"))
			outputArray.push(new Boolean({ value: this.cA }));
		
		if("pathLenConstraint" in this)
		{
			if(this.pathLenConstraint instanceof Integer)
				outputArray.push(this.pathLenConstraint);
			else
				outputArray.push(new Integer({ value: this.pathLenConstraint }));
		}
		//endregion
		
		//region Construct and return new ASN.1 schema for this object
		return (new Sequence({
			value: outputArray
		}));
		//endregion
	}
	//**********************************************************************************
	/**
	 * Convertion for the class to JSON object
	 * @returns {Object}
	 */
	toJSON()
	{
		const object = {};

		if(this.cA !== BasicConstraints.defaultValues("cA"))
			object.cA = this.cA;

		if("pathLenConstraint" in this)
		{
			if(this.pathLenConstraint instanceof Integer)
				object.pathLenConstraint = this.pathLenConstraint.toJSON();
			else
				object.pathLenConstraint = this.pathLenConstraint;
		}

		return object;
	}
	//**********************************************************************************
}
//**************************************************************************************

//**************************************************************************************
/**
 * Class from RFC5280
 */
class IssuingDistributionPoint
{
	//**********************************************************************************
	/**
	 * Constructor for IssuingDistributionPoint class
	 * @param {Object} [parameters={}]
	 * @param {Object} [parameters.schema] asn1js parsed value to initialize the class from
	 */
	constructor(parameters = {})
	{
		//region Internal properties of the object
		if("distributionPoint" in parameters)
			/**
			 * @type {Array.<GeneralName>|RelativeDistinguishedNames}
			 * @desc distributionPoint
			 */
			this.distributionPoint = getParametersValue(parameters, "distributionPoint", IssuingDistributionPoint.defaultValues("distributionPoint"));

		/**
		 * @type {boolean}
		 * @desc onlyContainsUserCerts
		 */
		this.onlyContainsUserCerts = getParametersValue(parameters, "onlyContainsUserCerts", IssuingDistributionPoint.defaultValues("onlyContainsUserCerts"));

		/**
		 * @type {boolean}
		 * @desc onlyContainsCACerts
		 */
		this.onlyContainsCACerts = getParametersValue(parameters, "onlyContainsCACerts", IssuingDistributionPoint.defaultValues("onlyContainsCACerts"));

		if("onlySomeReasons" in parameters)
			/**
			 * @type {number}
			 * @desc onlySomeReasons
			 */
			this.onlySomeReasons = getParametersValue(parameters, "onlySomeReasons", IssuingDistributionPoint.defaultValues("onlySomeReasons"));

		/**
		 * @type {boolean}
		 * @desc indirectCRL
		 */
		this.indirectCRL = getParametersValue(parameters, "indirectCRL", IssuingDistributionPoint.defaultValues("indirectCRL"));

		/**
		 * @type {boolean}
		 * @desc onlyContainsAttributeCerts
		 */
		this.onlyContainsAttributeCerts = getParametersValue(parameters, "onlyContainsAttributeCerts", IssuingDistributionPoint.defaultValues("onlyContainsAttributeCerts"));
		//endregion

		//region If input argument array contains "schema" for this object
		if("schema" in parameters)
			this.fromSchema(parameters.schema);
		//endregion
	}
	//**********************************************************************************
	/**
	 * Return default values for all class members
	 * @param {string} memberName String name for a class member
	 */
	static defaultValues(memberName)
	{
		switch(memberName)
		{
			case "distributionPoint":
				return [];
			case "onlyContainsUserCerts":
				return false;
			case "onlyContainsCACerts":
				return false;
			case "onlySomeReasons":
				return 0;
			case "indirectCRL":
				return false;
			case "onlyContainsAttributeCerts":
				return false;
			default:
				throw new Error(`Invalid member name for IssuingDistributionPoint class: ${memberName}`);
		}
	}
	//**********************************************************************************
	/**
	 * Return value of pre-defined ASN.1 schema for current class
	 *
	 * ASN.1 schema:
	 * ```asn1
	 * IssuingDistributionPoint ::= SEQUENCE {
	 *    distributionPoint          [0] DistributionPointName OPTIONAL,
	 *    onlyContainsUserCerts      [1] BOOLEAN DEFAULT FALSE,
	 *    onlyContainsCACerts        [2] BOOLEAN DEFAULT FALSE,
	 *    onlySomeReasons            [3] ReasonFlags OPTIONAL,
	 *    indirectCRL                [4] BOOLEAN DEFAULT FALSE,
	 *    onlyContainsAttributeCerts [5] BOOLEAN DEFAULT FALSE }
	 *
	 * ReasonFlags ::= BIT STRING {
	 *    unused                  (0),
	 *    keyCompromise           (1),
	 *    cACompromise            (2),
	 *    affiliationChanged      (3),
	 *    superseded              (4),
	 *    cessationOfOperation    (5),
	 *    certificateHold         (6),
	 *    privilegeWithdrawn      (7),
	 *    aACompromise            (8) }
	 * ```
	 *
	 * @param {Object} parameters Input parameters for the schema
	 * @returns {Object} asn1js schema object
	 */
	static schema(parameters = {})
	{
		/**
		 * @type {Object}
		 * @property {string} [blockName]
		 * @property {string} [distributionPoint]
		 * @property {string} [distributionPointNames]
		 * @property {string} [onlyContainsUserCerts]
		 * @property {string} [onlyContainsCACerts]
		 * @property {string} [onlySomeReasons]
		 * @property {string} [indirectCRL]
		 * @property {string} [onlyContainsAttributeCerts]
		 */
		const names = getParametersValue(parameters, "names", {});
		
		return (new Sequence({
			name: (names.blockName || ""),
			value: [
				new Constructed({
					optional: true,
					idBlock: {
						tagClass: 3, // CONTEXT-SPECIFIC
						tagNumber: 0 // [0]
					},
					value: [
						new Choice({
							value: [
								new Constructed({
									name: (names.distributionPoint || ""),
									idBlock: {
										tagClass: 3, // CONTEXT-SPECIFIC
										tagNumber: 0 // [0]
									},
									value: [
										new Repeated({
											name: (names.distributionPointNames || ""),
											value: GeneralName.schema()
										})
									]
								}),
								new Constructed({
									name: (names.distributionPoint || ""),
									idBlock: {
										tagClass: 3, // CONTEXT-SPECIFIC
										tagNumber: 1 // [1]
									},
									value: RelativeDistinguishedNames.schema().valueBlock.value
								})
							]
						})
					]
				}),
				new Primitive({
					name: (names.onlyContainsUserCerts || ""),
					optional: true,
					idBlock: {
						tagClass: 3, // CONTEXT-SPECIFIC
						tagNumber: 1 // [1]
					}
				}), // IMPLICIT boolean value
				new Primitive({
					name: (names.onlyContainsCACerts || ""),
					optional: true,
					idBlock: {
						tagClass: 3, // CONTEXT-SPECIFIC
						tagNumber: 2 // [2]
					}
				}), // IMPLICIT boolean value
				new Primitive({
					name: (names.onlySomeReasons || ""),
					optional: true,
					idBlock: {
						tagClass: 3, // CONTEXT-SPECIFIC
						tagNumber: 3 // [3]
					}
				}), // IMPLICIT bitstring value
				new Primitive({
					name: (names.indirectCRL || ""),
					optional: true,
					idBlock: {
						tagClass: 3, // CONTEXT-SPECIFIC
						tagNumber: 4 // [4]
					}
				}), // IMPLICIT boolean value
				new Primitive({
					name: (names.onlyContainsAttributeCerts || ""),
					optional: true,
					idBlock: {
						tagClass: 3, // CONTEXT-SPECIFIC
						tagNumber: 5 // [5]
					}
				}) // IMPLICIT boolean value
			]
		}));
	}
	//**********************************************************************************
	/**
	 * Convert parsed asn1js object into current class
	 * @param {!Object} schema
	 */
	fromSchema(schema)
	{
		//region Clear input data first
		clearProps(schema, [
			"distributionPoint",
			"distributionPointNames",
			"onlyContainsUserCerts",
			"onlyContainsCACerts",
			"onlySomeReasons",
			"indirectCRL",
			"onlyContainsAttributeCerts"
		]);
		//endregion
		
		//region Check the schema is valid
		const asn1 = compareSchema(schema,
			schema,
			IssuingDistributionPoint.schema({
				names: {
					distributionPoint: "distributionPoint",
					distributionPointNames: "distributionPointNames",
					onlyContainsUserCerts: "onlyContainsUserCerts",
					onlyContainsCACerts: "onlyContainsCACerts",
					onlySomeReasons: "onlySomeReasons",
					indirectCRL: "indirectCRL",
					onlyContainsAttributeCerts: "onlyContainsAttributeCerts"
				}
			})
		);
		
		if(asn1.verified === false)
			throw new Error("Object's schema was not verified against input data for IssuingDistributionPoint");
		//endregion
		
		//region Get internal properties from parsed schema
		if("distributionPoint" in asn1.result)
		{
			switch(true)
			{
				case (asn1.result.distributionPoint.idBlock.tagNumber === 0): // GENERAL_NAMES variant
					this.distributionPoint = Array.from(asn1.result.distributionPointNames, element => new GeneralName({ schema: element }));
					break;
				case (asn1.result.distributionPoint.idBlock.tagNumber === 1): // RDN variant
					{
						this.distributionPoint = new RelativeDistinguishedNames({
							schema: new Sequence({
								value: asn1.result.distributionPoint.valueBlock.value
							})
						});
					}
					break;
				default:
					throw new Error("Unknown tagNumber for distributionPoint: {$asn1.result.distributionPoint.idBlock.tagNumber}");
			}
		}
		
		if("onlyContainsUserCerts" in asn1.result)
		{
			const view = new Uint8Array(asn1.result.onlyContainsUserCerts.valueBlock.valueHex);
			this.onlyContainsUserCerts = (view[0] !== 0x00);
		}
		
		if("onlyContainsCACerts" in asn1.result)
		{
			const view = new Uint8Array(asn1.result.onlyContainsCACerts.valueBlock.valueHex);
			this.onlyContainsCACerts = (view[0] !== 0x00);
		}
		
		if("onlySomeReasons" in asn1.result)
		{
			const view = new Uint8Array(asn1.result.onlySomeReasons.valueBlock.valueHex);
			this.onlySomeReasons = view[0];
		}
		
		if("indirectCRL" in asn1.result)
		{
			const view = new Uint8Array(asn1.result.indirectCRL.valueBlock.valueHex);
			this.indirectCRL = (view[0] !== 0x00);
		}
		
		if("onlyContainsAttributeCerts" in asn1.result)
		{
			const view = new Uint8Array(asn1.result.onlyContainsAttributeCerts.valueBlock.valueHex);
			this.onlyContainsAttributeCerts = (view[0] !== 0x00);
		}
		//endregion
	}
	//**********************************************************************************
	/**
	 * Convert current object to asn1js object and set correct values
	 * @returns {Object} asn1js object
	 */
	toSchema()
	{
		//region Create array for output sequence
		const outputArray = [];
		
		if("distributionPoint" in this)
		{
			let value;
			
			if(this.distributionPoint instanceof Array)
			{
				value = new Constructed({
					idBlock: {
						tagClass: 3, // CONTEXT-SPECIFIC
						tagNumber: 0 // [0]
					},
					value: Array.from(this.distributionPoint, element => element.toSchema())
				});
			}
			else
			{
				value = this.distributionPoint.toSchema();
				
				value.idBlock.tagClass = 3; // CONTEXT - SPECIFIC
				value.idBlock.tagNumber = 1; // [1]
			}
			
			outputArray.push(new Constructed({
				idBlock: {
					tagClass: 3, // CONTEXT-SPECIFIC
					tagNumber: 0 // [0]
				},
				value: [value]
			}));
		}
		
		if(this.onlyContainsUserCerts !== IssuingDistributionPoint.defaultValues("onlyContainsUserCerts"))
		{
			outputArray.push(new Primitive({
				idBlock: {
					tagClass: 3, // CONTEXT-SPECIFIC
					tagNumber: 1 // [1]
				},
				valueHex: (new Uint8Array([0xFF])).buffer
			}));
		}
		
		if(this.onlyContainsCACerts !== IssuingDistributionPoint.defaultValues("onlyContainsCACerts"))
		{
			outputArray.push(new Primitive({
				idBlock: {
					tagClass: 3, // CONTEXT-SPECIFIC
					tagNumber: 2 // [2]
				},
				valueHex: (new Uint8Array([0xFF])).buffer
			}));
		}
		
		if("onlySomeReasons" in this)
		{
			const buffer = new ArrayBuffer(1);
			const view = new Uint8Array(buffer);
			
			view[0] = this.onlySomeReasons;
			
			outputArray.push(new Primitive({
				idBlock: {
					tagClass: 3, // CONTEXT-SPECIFIC
					tagNumber: 3 // [3]
				},
				valueHex: buffer
			}));
		}
		
		if(this.indirectCRL !== IssuingDistributionPoint.defaultValues("indirectCRL"))
		{
			outputArray.push(new Primitive({
				idBlock: {
					tagClass: 3, // CONTEXT-SPECIFIC
					tagNumber: 4 // [4]
				},
				valueHex: (new Uint8Array([0xFF])).buffer
			}));
		}
		
		if(this.onlyContainsAttributeCerts !== IssuingDistributionPoint.defaultValues("onlyContainsAttributeCerts"))
		{
			outputArray.push(new Primitive({
				idBlock: {
					tagClass: 3, // CONTEXT-SPECIFIC
					tagNumber: 5 // [5]
				},
				valueHex: (new Uint8Array([0xFF])).buffer
			}));
		}
		//endregion
		
		//region Construct and return new ASN.1 schema for this object
		return (new Sequence({
			value: outputArray
		}));
		//endregion
	}
	//**********************************************************************************
	/**
	 * Convertion for the class to JSON object
	 * @returns {Object}
	 */
	toJSON()
	{
		const object = {};
		
		if("distributionPoint" in this)
		{
			if(this.distributionPoint instanceof Array)
				object.distributionPoint = Array.from(this.distributionPoint, element => element.toJSON());
			else
				object.distributionPoint = this.distributionPoint.toJSON();
		}
		
		if(this.onlyContainsUserCerts !== IssuingDistributionPoint.defaultValues("onlyContainsUserCerts"))
			object.onlyContainsUserCerts = this.onlyContainsUserCerts;
		
		if(this.onlyContainsCACerts !== IssuingDistributionPoint.defaultValues("onlyContainsCACerts"))
			object.onlyContainsCACerts = this.onlyContainsCACerts;
		
		if("onlySomeReasons" in this)
			object.onlySomeReasons = this.onlySomeReasons;
		
		if(this.indirectCRL !== IssuingDistributionPoint.defaultValues("indirectCRL"))
			object.indirectCRL = this.indirectCRL;
		
		if(this.onlyContainsAttributeCerts !== IssuingDistributionPoint.defaultValues("onlyContainsAttributeCerts"))
			object.onlyContainsAttributeCerts = this.onlyContainsAttributeCerts;
		
		return object;
	}
	//**********************************************************************************
}
//**************************************************************************************

//**************************************************************************************
/**
 * Class from RFC5280
 */
class GeneralNames
{
	//**********************************************************************************
	/**
	 * Constructor for GeneralNames class
	 * @param {Object} [parameters={}]
	 * @param {Object} [parameters.schema] asn1js parsed value to initialize the class from
	 */
	constructor(parameters = {})
	{
		//region Internal properties of the object
		/**
		 * @type {Array.<GeneralName>}
		 * @desc Array of "general names"
		 */
		this.names = getParametersValue(parameters, "names", GeneralNames.defaultValues("names"));
		//endregion

		//region If input argument array contains "schema" for this object
		if("schema" in parameters)
			this.fromSchema(parameters.schema);
		//endregion
	}
	//**********************************************************************************
	/**
	 * Return default values for all class members
	 * @param {string} memberName String name for a class member
	 */
	static defaultValues(memberName)
	{
		switch(memberName)
		{
			case "names":
				return [];
			default:
				throw new Error(`Invalid member name for GeneralNames class: ${memberName}`);
		}
	}
	//**********************************************************************************
	/**
	 * Return value of pre-defined ASN.1 schema for current class
	 *
	 * ASN.1 schema:
	 * ```asn1
	 * GeneralNames ::= SEQUENCE SIZE (1..MAX) OF GeneralName
	 * ```
	 *
	 * @param {Object} parameters Input parameters for the schema
	 * @param {boolean} [optional=false] Flag would be element optional or not
	 * @returns {Object} asn1js schema object
	 */
	static schema(parameters = {}, optional = false)
	{
		/**
		 * @type {Object}
		 * @property {string} utcTimeName Name for "utcTimeName" choice
		 * @property {string} generalTimeName Name for "generalTimeName" choice
		 */
		const names = getParametersValue(parameters, "names", {});
		
		return (new Sequence({
			optional,
			name: (names.blockName || ""),
			value: [
				new Repeated({
					name: (names.generalNames || ""),
					value: GeneralName.schema()
				})
			]
		}));
	}
	//**********************************************************************************
	/**
	 * Convert parsed asn1js object into current class
	 * @param {!Object} schema
	 */
	fromSchema(schema)
	{
		//region Clear input data first
		clearProps(schema, [
			"names",
			"generalNames"
		]);
		//endregion
		
		//region Check the schema is valid
		const asn1 = compareSchema(schema,
			schema,
			GeneralNames.schema({
				names: {
					blockName: "names",
					generalNames: "generalNames"
				}
			})
		);

		if(asn1.verified === false)
			throw new Error("Object's schema was not verified against input data for GeneralNames");
		//endregion

		//region Get internal properties from parsed schema
		this.names = Array.from(asn1.result.generalNames, element => new GeneralName({ schema: element }));
		//endregion
	}
	//**********************************************************************************
	/**
	 * Convert current object to asn1js object and set correct values
	 * @returns {Object} asn1js object
	 */
	toSchema()
	{
		//region Construct and return new ASN.1 schema for this object
		return (new Sequence({
			value: Array.from(this.names, element => element.toSchema())
		}));
		//endregion
	}
	//**********************************************************************************
	/**
	 * Convertion for the class to JSON object
	 * @returns {Object}
	 */
	toJSON()
	{
		return {
			names: Array.from(this.names, element => element.toJSON())
		};
	}
	//**********************************************************************************
}
//**************************************************************************************

//**************************************************************************************
/**
 * Class from RFC5280
 */
class GeneralSubtree
{
	//**********************************************************************************
	/**
	 * Constructor for GeneralSubtree class
	 * @param {Object} [parameters={}]
	 * @param {Object} [parameters.schema] asn1js parsed value to initialize the class from
	 */
	constructor(parameters = {})
	{
		//region Internal properties of the object
		/**
		 * @type {GeneralName}
		 * @desc base
		 */
		this.base = getParametersValue(parameters, "base", GeneralSubtree.defaultValues("base"));

		/**
		 * @type {number|Integer}
		 * @desc base
		 */
		this.minimum = getParametersValue(parameters, "minimum", GeneralSubtree.defaultValues("minimum"));

		if("maximum" in parameters)
			/**
			 * @type {number|Integer}
			 * @desc minimum
			 */
			this.maximum = getParametersValue(parameters, "maximum", GeneralSubtree.defaultValues("maximum"));
		//endregion

		//region If input argument array contains "schema" for this object
		if("schema" in parameters)
			this.fromSchema(parameters.schema);
		//endregion
	}
	//**********************************************************************************
	/**
	 * Return default values for all class members
	 * @param {string} memberName String name for a class member
	 */
	static defaultValues(memberName)
	{
		switch(memberName)
		{
			case "base":
				return new GeneralName();
			case "minimum":
				return 0;
			case "maximum":
				return 0;
			default:
				throw new Error(`Invalid member name for GeneralSubtree class: ${memberName}`);
		}
	}
	//**********************************************************************************
	/**
	 * Return value of pre-defined ASN.1 schema for current class
	 *
	 * ASN.1 schema:
	 * ```asn1
	 * GeneralSubtree ::= SEQUENCE {
	 *    base                    GeneralName,
	 *    minimum         [0]     BaseDistance DEFAULT 0,
	 *    maximum         [1]     BaseDistance OPTIONAL }
	 *
	 * BaseDistance ::= INTEGER (0..MAX)
	 * ```
	 *
	 * @param {Object} parameters Input parameters for the schema
	 * @returns {Object} asn1js schema object
	 */
	static schema(parameters = {})
	{
		/**
		 * @type {Object}
		 * @property {string} [blockName]
		 * @property {string} [base]
		 * @property {string} [minimum]
		 * @property {string} [maximum]
		 */
		const names = getParametersValue(parameters, "names", {});

		return (new Sequence({
			name: (names.blockName || ""),
			value: [
				GeneralName.schema(names.base || {}),
				new Constructed({
					optional: true,
					idBlock: {
						tagClass: 3, // CONTEXT-SPECIFIC
						tagNumber: 0 // [0]
					},
					value: [new Integer({ name: (names.minimum || "") })]
				}),
				new Constructed({
					optional: true,
					idBlock: {
						tagClass: 3, // CONTEXT-SPECIFIC
						tagNumber: 1 // [1]
					},
					value: [new Integer({ name: (names.maximum || "") })]
				})
			]
		}));
	}
	//**********************************************************************************
	/**
	 * Convert parsed asn1js object into current class
	 * @param {!Object} schema
	 */
	fromSchema(schema)
	{
		//region Clear input data first
		clearProps(schema, [
			"base",
			"minimum",
			"maximum"
		]);
		//endregion
		
		//region Check the schema is valid
		const asn1 = compareSchema(schema,
			schema,
			GeneralSubtree.schema({
				names: {
					base: {
						names: {
							blockName: "base"
						}
					},
					minimum: "minimum",
					maximum: "maximum"
				}
			})
		);

		if(asn1.verified === false)
			throw new Error("Object's schema was not verified against input data for GeneralSubtree");
		//endregion

		//region Get internal properties from parsed schema
		this.base = new GeneralName({ schema: asn1.result.base });

		if("minimum" in asn1.result)
		{
			if(asn1.result.minimum.valueBlock.isHexOnly)
				this.minimum = asn1.result.minimum;
			else
				this.minimum = asn1.result.minimum.valueBlock.valueDec;
		}

		if("maximum" in asn1.result)
		{
			if(asn1.result.maximum.valueBlock.isHexOnly)
				this.maximum = asn1.result.maximum;
			else
				this.maximum = asn1.result.maximum.valueBlock.valueDec;
		}
		//endregion
	}
	//**********************************************************************************
	/**
	 * Convert current object to asn1js object and set correct values
	 * @returns {Object} asn1js object
	 */
	toSchema()
	{
		//region Create array for output sequence
		const outputArray = [];
		
		outputArray.push(this.base.toSchema());
		
		if(this.minimum !== 0)
		{
			let valueMinimum = 0;
			
			if(this.minimum instanceof Integer)
				valueMinimum = this.minimum;
			else
				valueMinimum = new Integer({ value: this.minimum });
			
			outputArray.push(new Constructed({
				optional: true,
				idBlock: {
					tagClass: 3, // CONTEXT-SPECIFIC
					tagNumber: 0 // [0]
				},
				value: [valueMinimum]
			}));
		}
		
		if("maximum" in this)
		{
			let valueMaximum = 0;
			
			if(this.maximum instanceof Integer)
				valueMaximum = this.maximum;
			else
				valueMaximum = new Integer({ value: this.maximum });
			
			outputArray.push(new Constructed({
				optional: true,
				idBlock: {
					tagClass: 3, // CONTEXT-SPECIFIC
					tagNumber: 1 // [1]
				},
				value: [valueMaximum]
			}));
		}
		//endregion
		
		//region Construct and return new ASN.1 schema for this object
		return (new Sequence({
			value: outputArray
		}));
		//endregion
	}
	//**********************************************************************************
	/**
	 * Convertion for the class to JSON object
	 * @returns {Object}
	 */
	toJSON()
	{
		const object = {
			base: this.base.toJSON()
		};
		
		if(this.minimum !== 0)
		{
			if((typeof this.minimum) === "number")
				object.minimum = this.minimum;
			else
				object.minimum = this.minimum.toJSON();
		}
		
		if("maximum" in this)
		{
			if((typeof this.maximum) === "number")
				object.maximum = this.maximum;
			else
				object.maximum = this.maximum.toJSON();
		}
		
		return object;
	}
	//**********************************************************************************
}
//**************************************************************************************

//**************************************************************************************
/**
 * Class from RFC5280
 */
class NameConstraints
{
	//**********************************************************************************
	/**
	 * Constructor for NameConstraints class
	 * @param {Object} [parameters={}]
	 * @param {Object} [parameters.schema] asn1js parsed value to initialize the class from
	 */
	constructor(parameters = {})
	{
		//region Internal properties of the object
		if("permittedSubtrees" in parameters)
			/**
			 * @type {Array.<GeneralSubtree>}
			 * @desc permittedSubtrees
			 */
			this.permittedSubtrees = getParametersValue(parameters, "permittedSubtrees", NameConstraints.defaultValues("permittedSubtrees"));

		if("excludedSubtrees" in parameters)
			/**
			 * @type {Array.<GeneralSubtree>}
			 * @desc excludedSubtrees
			 */
			this.excludedSubtrees = getParametersValue(parameters, "excludedSubtrees", NameConstraints.defaultValues("excludedSubtrees"));
		//endregion

		//region If input argument array contains "schema" for this object
		if("schema" in parameters)
			this.fromSchema(parameters.schema);
		//endregion
	}
	//**********************************************************************************
	/**
	 * Return default values for all class members
	 * @param {string} memberName String name for a class member
	 */
	static defaultValues(memberName)
	{
		switch(memberName)
		{
			case "permittedSubtrees":
				return [];
			case "excludedSubtrees":
				return [];
			default:
				throw new Error(`Invalid member name for NameConstraints class: ${memberName}`);
		}
	}
	//**********************************************************************************
	/**
	 * Return value of pre-defined ASN.1 schema for current class
	 *
	 * ASN.1 schema:
	 * ```asn1
	 * NameConstraints ::= SEQUENCE {
	 *    permittedSubtrees       [0]     GeneralSubtrees OPTIONAL,
	 *    excludedSubtrees        [1]     GeneralSubtrees OPTIONAL }
	 * ```
	 *
	 * @param {Object} parameters Input parameters for the schema
	 * @returns {Object} asn1js schema object
	 */
	static schema(parameters = {})
	{
		/**
		 * @type {Object}
		 * @property {string} [blockName]
		 * @property {string} [permittedSubtrees]
		 * @property {string} [excludedSubtrees]
		 */
		const names = getParametersValue(parameters, "names", {});

		return (new Sequence({
			name: (names.blockName || ""),
			value: [
				new Constructed({
					optional: true,
					idBlock: {
						tagClass: 3, // CONTEXT-SPECIFIC
						tagNumber: 0 // [0]
					},
					value: [
						new Repeated({
							name: (names.permittedSubtrees || ""),
							value: GeneralSubtree.schema()
						})
					]
				}),
				new Constructed({
					optional: true,
					idBlock: {
						tagClass: 3, // CONTEXT-SPECIFIC
						tagNumber: 1 // [1]
					},
					value: [
						new Repeated({
							name: (names.excludedSubtrees || ""),
							value: GeneralSubtree.schema()
						})
					]
				})
			]
		}));
	}
	//**********************************************************************************
	/**
	 * Convert parsed asn1js object into current class
	 * @param {!Object} schema
	 */
	fromSchema(schema)
	{
		//region Clear input data first
		clearProps(schema, [
			"permittedSubtrees",
			"excludedSubtrees"
		]);
		//endregion
		
		//region Check the schema is valid
		const asn1 = compareSchema(schema,
			schema,
			NameConstraints.schema({
				names: {
					permittedSubtrees: "permittedSubtrees",
					excludedSubtrees: "excludedSubtrees"
				}
			})
		);

		if(asn1.verified === false)
			throw new Error("Object's schema was not verified against input data for NameConstraints");
		//endregion

		//region Get internal properties from parsed schema
		if("permittedSubtrees" in asn1.result)
			this.permittedSubtrees = Array.from(asn1.result.permittedSubtrees, element => new GeneralSubtree({ schema: element }));

		if("excludedSubtrees" in asn1.result)
			this.excludedSubtrees = Array.from(asn1.result.excludedSubtrees, element => new GeneralSubtree({ schema: element }));
		//endregion
	}
	//**********************************************************************************
	/**
	 * Convert current object to asn1js object and set correct values
	 * @returns {Object} asn1js object
	 */
	toSchema()
	{
		//region Create array for output sequence
		const outputArray = [];
		
		if("permittedSubtrees" in this)
		{
			outputArray.push(new Constructed({
				idBlock: {
					tagClass: 3, // CONTEXT-SPECIFIC
					tagNumber: 0 // [0]
				},
				value: Array.from(this.permittedSubtrees, element => element.toSchema())
			}));
		}
		
		if("excludedSubtrees" in this)
		{
			outputArray.push(new Constructed({
				idBlock: {
					tagClass: 3, // CONTEXT-SPECIFIC
					tagNumber: 1 // [1]
				},
				value: Array.from(this.excludedSubtrees, element => element.toSchema())
			}));
		}
		//endregion
		
		//region Construct and return new ASN.1 schema for this object
		return (new Sequence({
			value: outputArray
		}));
		//endregion
	}
	//**********************************************************************************
	/**
	 * Convertion for the class to JSON object
	 * @returns {Object}
	 */
	toJSON()
	{
		const object = {};
		
		if("permittedSubtrees" in this)
			object.permittedSubtrees = Array.from(this.permittedSubtrees, element => element.toJSON());

		if("excludedSubtrees" in this)
			object.excludedSubtrees = Array.from(this.excludedSubtrees, element => element.toJSON());

		return object;
	}
	//**********************************************************************************
}
//**************************************************************************************

//**************************************************************************************
/**
 * Class from RFC5280
 */
class DistributionPoint
{
	//**********************************************************************************
	/**
	 * Constructor for DistributionPoint class
	 * @param {Object} [parameters={}]
	 * @param {Object} [parameters.schema] asn1js parsed value to initialize the class from
	 * @property {Object} [distributionPoint]
	 * @property {Object} [reasons]
	 * @property {Object} [cRLIssuer]
	 */
	constructor(parameters = {})
	{
		//region Internal properties of the object
		if("distributionPoint" in parameters)
			/**
			 * @type {Array.<GeneralName>}
			 * @desc distributionPoint
			 */
			this.distributionPoint = getParametersValue(parameters, "distributionPoint", DistributionPoint.defaultValues("distributionPoint"));

		if("reasons" in parameters)
			/**
			 * @type {BitString}
			 * @desc values
			 */
			this.reasons = getParametersValue(parameters, "reasons", DistributionPoint.defaultValues("reasons"));

		if("cRLIssuer" in parameters)
			/**
			 * @type {Array.<GeneralName>}
			 * @desc cRLIssuer
			 */
			this.cRLIssuer = getParametersValue(parameters, "cRLIssuer", DistributionPoint.defaultValues("cRLIssuer"));
		//endregion

		//region If input argument array contains "schema" for this object
		if("schema" in parameters)
			this.fromSchema(parameters.schema);
		//endregion
	}
	//**********************************************************************************
	/**
	 * Return default values for all class members
	 * @param {string} memberName String name for a class member
	 */
	static defaultValues(memberName)
	{
		switch(memberName)
		{
			case "distributionPoint":
				return [];
			case "reasons":
				return new BitString();
			case "cRLIssuer":
				return [];
			default:
				throw new Error(`Invalid member name for DistributionPoint class: ${memberName}`);
		}
	}
	//**********************************************************************************
	/**
	 * Return value of pre-defined ASN.1 schema for current class
	 *
	 * ASN.1 schema:
	 * ```asn1
	 * DistributionPoint ::= SEQUENCE {
	 *    distributionPoint       [0]     DistributionPointName OPTIONAL,
	 *    reasons                 [1]     ReasonFlags OPTIONAL,
	 *    cRLIssuer               [2]     GeneralNames OPTIONAL }
	 *
	 * DistributionPointName ::= CHOICE {
	 *    fullName                [0]     GeneralNames,
	 *    nameRelativeToCRLIssuer [1]     RelativeDistinguishedName }
	 *
	 * ReasonFlags ::= BIT STRING {
	 *    unused                  (0),
	 *    keyCompromise           (1),
	 *    cACompromise            (2),
	 *    affiliationChanged      (3),
	 *    superseded              (4),
	 *    cessationOfOperation    (5),
	 *    certificateHold         (6),
	 *    privilegeWithdrawn      (7),
	 *    aACompromise            (8) }
	 * ```
	 *
	 * @param {Object} parameters Input parameters for the schema
	 * @returns {Object} asn1js schema object
	 */
	static schema(parameters = {})
	{
		/**
		 * @type {Object}
		 * @property {string} [blockName]
		 * @property {string} [distributionPoint]
		 * @property {string} [distributionPointNames]
		 * @property {string} [reasons]
		 * @property {string} [cRLIssuer]
		 * @property {string} [cRLIssuerNames]
		 */
		const names = getParametersValue(parameters, "names", {});

		return (new Sequence({
			name: (names.blockName || ""),
			value: [
				new Constructed({
					optional: true,
					idBlock: {
						tagClass: 3, // CONTEXT-SPECIFIC
						tagNumber: 0 // [0]
					},
					value: [
						new Choice({
							value: [
								new Constructed({
									name: (names.distributionPoint || ""),
									optional: true,
									idBlock: {
										tagClass: 3, // CONTEXT-SPECIFIC
										tagNumber: 0 // [0]
									},
									value: [
										new Repeated({
											name: (names.distributionPointNames || ""),
											value: GeneralName.schema()
										})
									]
								}),
								new Constructed({
									name: (names.distributionPoint || ""),
									optional: true,
									idBlock: {
										tagClass: 3, // CONTEXT-SPECIFIC
										tagNumber: 1 // [1]
									},
									value: RelativeDistinguishedNames.schema().valueBlock.value
								})
							]
						})
					]
				}),
				new Primitive({
					name: (names.reasons || ""),
					optional: true,
					idBlock: {
						tagClass: 3, // CONTEXT-SPECIFIC
						tagNumber: 1 // [1]
					}
				}), // IMPLICIT bitstring value
				new Constructed({
					name: (names.cRLIssuer || ""),
					optional: true,
					idBlock: {
						tagClass: 3, // CONTEXT-SPECIFIC
						tagNumber: 2 // [2]
					},
					value: [
						new Repeated({
							name: (names.cRLIssuerNames || ""),
							value: GeneralName.schema()
						})
					]
				}) // IMPLICIT bitstring value
			]
		}));
	}
	//**********************************************************************************
	/**
	 * Convert parsed asn1js object into current class
	 * @param {!Object} schema
	 */
	fromSchema(schema)
	{
		//region Clear input data first
		clearProps(schema, [
			"distributionPoint",
			"distributionPointNames",
			"reasons",
			"cRLIssuer",
			"cRLIssuerNames"
		]);
		//endregion
		
		//region Check the schema is valid
		const asn1 = compareSchema(schema,
			schema,
			DistributionPoint.schema({
				names: {
					distributionPoint: "distributionPoint",
					distributionPointNames: "distributionPointNames",
					reasons: "reasons",
					cRLIssuer: "cRLIssuer",
					cRLIssuerNames: "cRLIssuerNames"
				}
			})
		);

		if(asn1.verified === false)
			throw new Error("Object's schema was not verified against input data for DistributionPoint");
		//endregion

		//region Get internal properties from parsed schema
		if("distributionPoint" in asn1.result)
		{
			if(asn1.result.distributionPoint.idBlock.tagNumber === 0) // GENERAL_NAMES variant
				this.distributionPoint = Array.from(asn1.result.distributionPointNames, element => new GeneralName({ schema: element }));

			if(asn1.result.distributionPoint.idBlock.tagNumber === 1) // RDN variant
			{
				this.distributionPoint = new RelativeDistinguishedNames({
					schema: new Sequence({
						value: asn1.result.distributionPoint.valueBlock.value
					})
				});
			}
		}

		if("reasons" in asn1.result)
			this.reasons = new BitString({ valueHex: asn1.result.reasons.valueBlock.valueHex });

		if("cRLIssuer" in asn1.result)
			this.cRLIssuer = Array.from(asn1.result.cRLIssuerNames, element => new GeneralName({ schema: element }));
		//endregion
	}
	//**********************************************************************************
	/**
	 * Convert current object to asn1js object and set correct values
	 * @returns {Object} asn1js object
	 */
	toSchema()
	{
		//region Create array for output sequence
		const outputArray = [];
		
		if("distributionPoint" in this)
		{
			let internalValue;
			
			if(this.distributionPoint instanceof Array)
			{
				internalValue = new Constructed({
					idBlock: {
						tagClass: 3, // CONTEXT-SPECIFIC
						tagNumber: 0 // [0]
					},
					value: Array.from(this.distributionPoint, element => element.toSchema())
				});
			}
			else
			{
				internalValue = new Constructed({
					idBlock: {
						tagClass: 3, // CONTEXT-SPECIFIC
						tagNumber: 1 // [1]
					},
					value: [this.distributionPoint.toSchema()]
				});
			}
			
			outputArray.push(new Constructed({
				idBlock: {
					tagClass: 3, // CONTEXT-SPECIFIC
					tagNumber: 0 // [0]
				},
				value: [internalValue]
			}));
		}
		
		if("reasons" in this)
		{
			outputArray.push(new Primitive({
				idBlock: {
					tagClass: 3, // CONTEXT-SPECIFIC
					tagNumber: 1 // [1]
				},
				valueHex: this.reasons.valueBlock.valueHex
			}));
		}
		
		if("cRLIssuer" in this)
		{
			outputArray.push(new Constructed({
				idBlock: {
					tagClass: 3, // CONTEXT-SPECIFIC
					tagNumber: 2 // [2]
				},
				value: Array.from(this.cRLIssuer, element => element.toSchema())
			}));
		}
		//endregion
		
		//region Construct and return new ASN.1 schema for this object
		return (new Sequence({
			value: outputArray
		}));
		//endregion
	}
	//**********************************************************************************
	/**
	 * Convertion for the class to JSON object
	 * @returns {Object}
	 */
	toJSON()
	{
		const object = {};

		if("distributionPoint" in this)
		{
			if(this.distributionPoint instanceof Array)
				object.distributionPoint = Array.from(this.distributionPoint, element => element.toJSON());
			else
				object.distributionPoint = this.distributionPoint.toJSON();
		}

		if("reasons" in this)
			object.reasons = this.reasons.toJSON();

		if("cRLIssuer" in this)
			object.cRLIssuer = Array.from(this.cRLIssuer, element => element.toJSON());

		return object;
	}
	//**********************************************************************************
}
//**************************************************************************************

//**************************************************************************************
/**
 * Class from RFC5280
 */
class CRLDistributionPoints
{
	//**********************************************************************************
	/**
	 * Constructor for CRLDistributionPoints class
	 * @param {Object} [parameters={}]
	 * @param {Object} [parameters.schema] asn1js parsed value to initialize the class from
	 */
	constructor(parameters = {})
	{
		//region Internal properties of the object
		/**
		 * @type {Array.<DistributionPoint>}
		 * @desc distributionPoints
		 */
		this.distributionPoints = getParametersValue(parameters, "distributionPoints", CRLDistributionPoints.defaultValues("distributionPoints"));
		//endregion

		//region If input argument array contains "schema" for this object
		if("schema" in parameters)
			this.fromSchema(parameters.schema);
		//endregion
	}
	//**********************************************************************************
	/**
	 * Return default values for all class members
	 * @param {string} memberName String name for a class member
	 */
	static defaultValues(memberName)
	{
		switch(memberName)
		{
			case "distributionPoints":
				return [];
			default:
				throw new Error(`Invalid member name for CRLDistributionPoints class: ${memberName}`);
		}
	}
	//**********************************************************************************
	/**
	 * Return value of pre-defined ASN.1 schema for current class
	 *
	 * ASN.1 schema:
	 * ```asn1
	 * CRLDistributionPoints ::= SEQUENCE SIZE (1..MAX) OF DistributionPoint
	 * ```
	 *
	 * @param {Object} parameters Input parameters for the schema
	 * @returns {Object} asn1js schema object
	 */
	static schema(parameters = {})
	{
		/**
		 * @type {Object}
		 * @property {string} [blockName]
		 * @property {string} [distributionPoints]
		 */
		const names = getParametersValue(parameters, "names", {});

		return (new Sequence({
			name: (names.blockName || ""),
			value: [
				new Repeated({
					name: (names.distributionPoints || ""),
					value: DistributionPoint.schema()
				})
			]
		}));
	}
	//**********************************************************************************
	/**
	 * Convert parsed asn1js object into current class
	 * @param {!Object} schema
	 */
	fromSchema(schema)
	{
		//region Clear input data first
		clearProps(schema, [
			"distributionPoints"
		]);
		//endregion
		
		//region Check the schema is valid
		const asn1 = compareSchema(schema,
			schema,
			CRLDistributionPoints.schema({
				names: {
					distributionPoints: "distributionPoints"
				}
			})
		);

		if(asn1.verified === false)
			throw new Error("Object's schema was not verified against input data for CRLDistributionPoints");
		//endregion

		//region Get internal properties from parsed schema
		this.distributionPoints = Array.from(asn1.result.distributionPoints, element => new DistributionPoint({ schema: element }));
		//endregion
	}
	//**********************************************************************************
	/**
	 * Convert current object to asn1js object and set correct values
	 * @returns {Object} asn1js object
	 */
	toSchema()
	{
		//region Construct and return new ASN.1 schema for this object
		return (new Sequence({
			value: Array.from(this.distributionPoints, element => element.toSchema())
		}));
		//endregion
	}
	//**********************************************************************************
	/**
	 * Convertion for the class to JSON object
	 * @returns {Object}
	 */
	toJSON()
	{
		return {
			distributionPoints: Array.from(this.distributionPoints, element => element.toJSON())
		};
	}
	//**********************************************************************************
}
//**************************************************************************************

//**************************************************************************************
/**
 * Class from RFC5280
 */
class PolicyQualifierInfo
{
	//**********************************************************************************
	/**
	 * Constructor for PolicyQualifierInfo class
	 * @param {Object} [parameters={}]
	 * @param {Object} [parameters.schema] asn1js parsed value to initialize the class from
	 */
	constructor(parameters = {})
	{
		//region Internal properties of the object
		/**
		 * @type {string}
		 * @desc policyQualifierId
		 */
		this.policyQualifierId = getParametersValue(parameters, "policyQualifierId", PolicyQualifierInfo.defaultValues("policyQualifierId"));
		/**
		 * @type {Object}
		 * @desc qualifier
		 */
		this.qualifier = getParametersValue(parameters, "qualifier", PolicyQualifierInfo.defaultValues("qualifier"));
		//endregion

		//region If input argument array contains "schema" for this object
		if("schema" in parameters)
			this.fromSchema(parameters.schema);
		//endregion
	}
	//**********************************************************************************
	/**
	 * Return default values for all class members
	 * @param {string} memberName String name for a class member
	 */
	static defaultValues(memberName)
	{
		switch(memberName)
		{
			case "policyQualifierId":
				return "";
			case "qualifier":
				return new Any();
			default:
				throw new Error(`Invalid member name for PolicyQualifierInfo class: ${memberName}`);
		}
	}
	//**********************************************************************************
	/**
	 * Return value of pre-defined ASN.1 schema for current class
	 *
	 * ASN.1 schema:
	 * ```asn1
	 * PolicyQualifierInfo ::= SEQUENCE {
	 *    policyQualifierId  PolicyQualifierId,
	 *    qualifier          ANY DEFINED BY policyQualifierId }
	 *
	 * id-qt          OBJECT IDENTIFIER ::=  { id-pkix 2 }
	 * id-qt-cps      OBJECT IDENTIFIER ::=  { id-qt 1 }
	 * id-qt-unotice  OBJECT IDENTIFIER ::=  { id-qt 2 }
	 *
	 * PolicyQualifierId ::= OBJECT IDENTIFIER ( id-qt-cps | id-qt-unotice )
	 * ```
	 *
	 * @param {Object} parameters Input parameters for the schema
	 * @returns {Object} asn1js schema object
	 */
	static schema(parameters = {})
	{
		/**
		 * @type {Object}
		 * @property {string} [blockName]
		 * @property {string} [policyQualifierId]
		 * @property {string} [qualifier]
		 */
		const names = getParametersValue(parameters, "names", {});

		return (new Sequence({
			name: (names.blockName || ""),
			value: [
				new ObjectIdentifier({ name: (names.policyQualifierId || "") }),
				new Any({ name: (names.qualifier || "") })
			]
		}));
	}
	//**********************************************************************************
	/**
	 * Convert parsed asn1js object into current class
	 * @param {!Object} schema
	 */
	fromSchema(schema)
	{
		//region Clear input data first
		clearProps(schema, [
			"policyQualifierId",
			"qualifier"
		]);
		//endregion
		
		//region Check the schema is valid
		const asn1 = compareSchema(schema,
			schema,
			PolicyQualifierInfo.schema({
				names: {
					policyQualifierId: "policyQualifierId",
					qualifier: "qualifier"
				}
			})
		);

		if(asn1.verified === false)
			throw new Error("Object's schema was not verified against input data for PolicyQualifierInfo");
		//endregion

		//region Get internal properties from parsed schema
		this.policyQualifierId = asn1.result.policyQualifierId.valueBlock.toString();
		this.qualifier = asn1.result.qualifier;
		//endregion
	}
	//**********************************************************************************
	/**
	 * Convert current object to asn1js object and set correct values
	 * @returns {Object} asn1js object
	 */
	toSchema()
	{
		//region Construct and return new ASN.1 schema for this object
		return (new Sequence({
			value: [
				new ObjectIdentifier({ value: this.policyQualifierId }),
				this.qualifier
			]
		}));
		//endregion
	}
	//**********************************************************************************
	/**
	 * Convertion for the class to JSON object
	 * @returns {Object}
	 */
	toJSON()
	{
		return {
			policyQualifierId: this.policyQualifierId,
			qualifier: this.qualifier.toJSON()
		};
	}
	//**********************************************************************************
}
//**************************************************************************************

//**************************************************************************************
/**
 * Class from RFC5280
 */
class PolicyInformation
{
	//**********************************************************************************
	/**
	 * Constructor for PolicyInformation class
	 * @param {Object} [parameters={}]
	 * @param {Object} [parameters.schema] asn1js parsed value to initialize the class from
	 */
	constructor(parameters = {})
	{
		//region Internal properties of the object
		/**
		 * @type {string}
		 * @desc policyIdentifier
		 */
		this.policyIdentifier = getParametersValue(parameters, "policyIdentifier", PolicyInformation.defaultValues("policyIdentifier"));

		if("policyQualifiers" in parameters)
			/**
			 * @type {Array.<PolicyQualifierInfo>}
			 * @desc Value of the TIME class
			 */
			this.policyQualifiers = getParametersValue(parameters, "policyQualifiers", PolicyInformation.defaultValues("policyQualifiers"));
		//endregion

		//region If input argument array contains "schema" for this object
		if("schema" in parameters)
			this.fromSchema(parameters.schema);
		//endregion
	}
	//**********************************************************************************
	/**
	 * Return default values for all class members
	 * @param {string} memberName String name for a class member
	 */
	static defaultValues(memberName)
	{
		switch(memberName)
		{
			case "policyIdentifier":
				return "";
			case "policyQualifiers":
				return [];
			default:
				throw new Error(`Invalid member name for PolicyInformation class: ${memberName}`);
		}
	}
	//**********************************************************************************
	/**
	 * Return value of pre-defined ASN.1 schema for current class
	 *
	 * ASN.1 schema:
	 * ```asn1
	 * PolicyInformation ::= SEQUENCE {
	 *    policyIdentifier   CertPolicyId,
	 *    policyQualifiers   SEQUENCE SIZE (1..MAX) OF
	 *    PolicyQualifierInfo OPTIONAL }
	 *
	 * CertPolicyId ::= OBJECT IDENTIFIER
	 * ```
	 *
	 * @param {Object} parameters Input parameters for the schema
	 * @returns {Object} asn1js schema object
	 */
	static schema(parameters = {})
	{
		/**
		 * @type {Object}
		 * @property {string} [blockName]
		 * @property {string} [policyIdentifier]
		 * @property {string} [policyQualifiers]
		 */
		const names = getParametersValue(parameters, "names", {});

		return (new Sequence({
			name: (names.blockName || ""),
			value: [
				new ObjectIdentifier({ name: (names.policyIdentifier || "") }),
				new Sequence({
					optional: true,
					value: [
						new Repeated({
							name: (names.policyQualifiers || ""),
							value: PolicyQualifierInfo.schema()
						})
					]
				})
			]
		}));
	}
	//**********************************************************************************
	/**
	 * Convert parsed asn1js object into current class
	 * @param {!Object} schema
	 */
	fromSchema(schema)
	{
		//region Clear input data first
		clearProps(schema, [
			"policyIdentifier",
			"policyQualifiers"
		]);
		//endregion
		
		//region Check the schema is valid
		const asn1 = compareSchema(schema,
			schema,
			PolicyInformation.schema({
				names: {
					policyIdentifier: "policyIdentifier",
					policyQualifiers: "policyQualifiers"
				}
			})
		);

		if(asn1.verified === false)
			throw new Error("Object's schema was not verified against input data for PolicyInformation");
		//endregion

		//region Get internal properties from parsed schema
		this.policyIdentifier = asn1.result.policyIdentifier.valueBlock.toString();

		if("policyQualifiers" in asn1.result)
			this.policyQualifiers = Array.from(asn1.result.policyQualifiers, element => new PolicyQualifierInfo({ schema: element }));
		//endregion
	}
	//**********************************************************************************
	/**
	 * Convert current object to asn1js object and set correct values
	 * @returns {Object} asn1js object
	 */
	toSchema()
	{
		//region Create array for output sequence
		const outputArray = [];
		
		outputArray.push(new ObjectIdentifier({ value: this.policyIdentifier }));
		
		if("policyQualifiers" in this)
		{
			outputArray.push(new Sequence({
				value: Array.from(this.policyQualifiers, element => element.toSchema())
			}));
		}
		//endregion
		
		//region Construct and return new ASN.1 schema for this object
		return (new Sequence({
			value: outputArray
		}));
		//endregion
	}
	//**********************************************************************************
	/**
	 * Convertion for the class to JSON object
	 * @returns {Object}
	 */
	toJSON()
	{
		const object = {
			policyIdentifier: this.policyIdentifier
		};

		if("policyQualifiers" in this)
			object.policyQualifiers = Array.from(this.policyQualifiers, element => element.toJSON());

		return object;
	}
	//**********************************************************************************
}
//**************************************************************************************

//**************************************************************************************
/**
 * Class from RFC5280
 */
class CertificatePolicies
{
	//**********************************************************************************
	/**
	 * Constructor for CertificatePolicies class
	 * @param {Object} [parameters={}]
	 * @param {Object} [parameters.schema] asn1js parsed value to initialize the class from
	 */
	constructor(parameters = {})
	{
		//region Internal properties of the object
		/**
		 * @type {Array.<PolicyInformation>}
		 * @desc certificatePolicies
		 */
		this.certificatePolicies = getParametersValue(parameters, "certificatePolicies", CertificatePolicies.defaultValues("certificatePolicies"));
		//endregion

		//region If input argument array contains "schema" for this object
		if("schema" in parameters)
			this.fromSchema(parameters.schema);
		//endregion
	}
	//**********************************************************************************
	/**
	 * Return default values for all class members
	 * @param {string} memberName String name for a class member
	 */
	static defaultValues(memberName)
	{
		switch(memberName)
		{
			case "certificatePolicies":
				return [];
			default:
				throw new Error(`Invalid member name for CertificatePolicies class: ${memberName}`);
		}
	}
	//**********************************************************************************
	/**
	 * Return value of pre-defined ASN.1 schema for current class
	 *
	 * ASN.1 schema:
	 * ```asn1
	 * certificatePolicies ::= SEQUENCE SIZE (1..MAX) OF PolicyInformation
	 * ```
	 *
	 * @param {Object} parameters Input parameters for the schema
	 * @returns {Object} asn1js schema object
	 */
	static schema(parameters = {})
	{
		/**
		 * @type {Object}
		 * @property {string} [blockName]
		 * @property {string} [certificatePolicies]
		 */
		const names = getParametersValue(parameters, "names", {});

		return (new Sequence({
			name: (names.blockName || ""),
			value: [
				new Repeated({
					name: (names.certificatePolicies || ""),
					value: PolicyInformation.schema()
				})
			]
		}));
	}
	//**********************************************************************************
	/**
	 * Convert parsed asn1js object into current class
	 * @param {!Object} schema
	 */
	fromSchema(schema)
	{
		//region Clear input data first
		clearProps(schema, [
			"certificatePolicies"
		]);
		//endregion
		
		//region Check the schema is valid
		const asn1 = compareSchema(schema,
			schema,
			CertificatePolicies.schema({
				names: {
					certificatePolicies: "certificatePolicies"
				}
			})
		);

		if(asn1.verified === false)
			throw new Error("Object's schema was not verified against input data for CertificatePolicies");
		//endregion

		//region Get internal properties from parsed schema
		this.certificatePolicies = Array.from(asn1.result.certificatePolicies, element => new PolicyInformation({ schema: element }));
		//endregion
	}
	//**********************************************************************************
	/**
	 * Convert current object to asn1js object and set correct values
	 * @returns {Object} asn1js object
	 */
	toSchema()
	{
		//region Construct and return new ASN.1 schema for this object
		return (new Sequence({
			value: Array.from(this.certificatePolicies, element => element.toSchema())
		}));
		//endregion
	}
	//**********************************************************************************
	/**
	 * Convertion for the class to JSON object
	 * @returns {Object}
	 */
	toJSON()
	{
		return {
			certificatePolicies: Array.from(this.certificatePolicies, element => element.toJSON())
		};
	}
	//**********************************************************************************
}
//**************************************************************************************

//**************************************************************************************
/**
 * Class from RFC5280
 */
class PolicyMapping
{
	//**********************************************************************************
	/**
	 * Constructor for PolicyMapping class
	 * @param {Object} [parameters={}]
	 * @param {Object} [parameters.schema] asn1js parsed value to initialize the class from
	 */
	constructor(parameters = {})
	{
		//region Internal properties of the object
		/**
		 * @type {string}
		 * @desc issuerDomainPolicy
		 */
		this.issuerDomainPolicy = getParametersValue(parameters, "issuerDomainPolicy", PolicyMapping.defaultValues("issuerDomainPolicy"));
		/**
		 * @type {string}
		 * @desc subjectDomainPolicy
		 */
		this.subjectDomainPolicy = getParametersValue(parameters, "subjectDomainPolicy", PolicyMapping.defaultValues("subjectDomainPolicy"));
		//endregion

		//region If input argument array contains "schema" for this object
		if("schema" in parameters)
			this.fromSchema(parameters.schema);
		//endregion
	}
	//**********************************************************************************
	/**
	 * Return default values for all class members
	 * @param {string} memberName String name for a class member
	 */
	static defaultValues(memberName)
	{
		switch(memberName)
		{
			case "issuerDomainPolicy":
				return "";
			case "subjectDomainPolicy":
				return "";
			default:
				throw new Error(`Invalid member name for PolicyMapping class: ${memberName}`);
		}
	}
	//**********************************************************************************
	/**
	 * Return value of pre-defined ASN.1 schema for current class
	 *
	 * ASN.1 schema:
	 * ```asn1
	 * PolicyMapping ::= SEQUENCE {
	 *    issuerDomainPolicy      CertPolicyId,
	 *    subjectDomainPolicy     CertPolicyId }
	 * ```
	 *
	 * @param {Object} parameters Input parameters for the schema
	 * @returns {Object} asn1js schema object
	 */
	static schema(parameters = {})
	{
		/**
		 * @type {Object}
		 * @property {string} [blockName]
		 * @property {string} [issuerDomainPolicy]
		 * @property {string} [subjectDomainPolicy]
		 */
		const names = getParametersValue(parameters, "names", {});

		return (new Sequence({
			name: (names.blockName || ""),
			value: [
				new ObjectIdentifier({ name: (names.issuerDomainPolicy || "") }),
				new ObjectIdentifier({ name: (names.subjectDomainPolicy || "") })
			]
		}));
	}
	//**********************************************************************************
	/**
	 * Convert parsed asn1js object into current class
	 * @param {!Object} schema
	 */
	fromSchema(schema)
	{
		//region Clear input data first
		clearProps(schema, [
			"issuerDomainPolicy",
			"subjectDomainPolicy"
		]);
		//endregion
		
		//region Check the schema is valid
		const asn1 = compareSchema(schema,
			schema,
			PolicyMapping.schema({
				names: {
					issuerDomainPolicy: "issuerDomainPolicy",
					subjectDomainPolicy: "subjectDomainPolicy"
				}
			})
		);

		if(asn1.verified === false)
			throw new Error("Object's schema was not verified against input data for PolicyMapping");
		//endregion

		//region Get internal properties from parsed schema
		this.issuerDomainPolicy = asn1.result.issuerDomainPolicy.valueBlock.toString();
		this.subjectDomainPolicy = asn1.result.subjectDomainPolicy.valueBlock.toString();
		//endregion
	}
	//**********************************************************************************
	/**
	 * Convert current object to asn1js object and set correct values
	 * @returns {Object} asn1js object
	 */
	toSchema()
	{
		//region Construct and return new ASN.1 schema for this object
		return (new Sequence({
			value: [
				new ObjectIdentifier({ value: this.issuerDomainPolicy }),
				new ObjectIdentifier({ value: this.subjectDomainPolicy })
			]
		}));
		//endregion
	}
	//**********************************************************************************
	/**
	 * Convertion for the class to JSON object
	 * @returns {Object}
	 */
	toJSON()
	{
		return {
			issuerDomainPolicy: this.issuerDomainPolicy,
			subjectDomainPolicy: this.subjectDomainPolicy
		};
	}
	//**********************************************************************************
}
//**************************************************************************************

//**************************************************************************************
/**
 * Class from RFC5280
 */
class PolicyMappings
{
	//**********************************************************************************
	/**
	 * Constructor for PolicyMappings class
	 * @param {Object} [parameters={}]
	 * @param {Object} [parameters.schema] asn1js parsed value to initialize the class from
	 */
	constructor(parameters = {})
	{
		//region Internal properties of the object
		/**
		 * @type {Array.<PolicyMapping>}
		 * @desc mappings
		 */
		this.mappings = getParametersValue(parameters, "mappings", PolicyMappings.defaultValues("mappings"));
		//endregion

		//region If input argument array contains "schema" for this object
		if("schema" in parameters)
			this.fromSchema(parameters.schema);
		//endregion
	}
	//**********************************************************************************
	/**
	 * Return default values for all class members
	 * @param {string} memberName String name for a class member
	 */
	static defaultValues(memberName)
	{
		switch(memberName)
		{
			case "mappings":
				return [];
			default:
				throw new Error(`Invalid member name for PolicyMappings class: ${memberName}`);
		}
	}
	//**********************************************************************************
	/**
	 * Return value of pre-defined ASN.1 schema for current class
	 *
	 * ASN.1 schema:
	 * ```asn1
	 * PolicyMappings ::= SEQUENCE SIZE (1..MAX) OF PolicyMapping
	 * ```
	 *
	 * @param {Object} parameters Input parameters for the schema
	 * @returns {Object} asn1js schema object
	 */
	static schema(parameters = {})
	{
		/**
		 * @type {Object}
		 * @property {string} [blockName]
		 * @property {string} [utcTimeName] Name for "utcTimeName" choice
		 * @property {string} [generalTimeName] Name for "generalTimeName" choice
		 */
		const names = getParametersValue(parameters, "names", {});

		return (new Sequence({
			name: (names.blockName || ""),
			value: [
				new Repeated({
					name: (names.mappings || ""),
					value: PolicyMapping.schema()
				})
			]
		}));
	}
	//**********************************************************************************
	/**
	 * Convert parsed asn1js object into current class
	 * @param {!Object} schema
	 */
	fromSchema(schema)
	{
		//region Clear input data first
		clearProps(schema, [
			"mappings"
		]);
		//endregion
		
		//region Check the schema is valid
		const asn1 = compareSchema(schema,
			schema,
			PolicyMappings.schema({
				names: {
					mappings: "mappings"
				}
			})
		);

		if(asn1.verified === false)
			throw new Error("Object's schema was not verified against input data for PolicyMappings");
		//endregion

		//region Get internal properties from parsed schema
		this.mappings = Array.from(asn1.result.mappings, element => new PolicyMapping({ schema: element }));
		//endregion
	}
	//**********************************************************************************
	/**
	 * Convert current object to asn1js object and set correct values
	 * @returns {Object} asn1js object
	 */
	toSchema()
	{
		//region Construct and return new ASN.1 schema for this object
		return (new Sequence({
			value: Array.from(this.mappings, element => element.toSchema())
		}));
		//endregion
	}
	//**********************************************************************************
	/**
	 * Convertion for the class to JSON object
	 * @returns {Object}
	 */
	toJSON()
	{
		return {
			mappings: Array.from(this.mappings, element => element.toJSON())
		};
	}
	//**********************************************************************************
}
//**************************************************************************************

//**************************************************************************************
/**
 * Class from RFC5280
 */
class AuthorityKeyIdentifier
{
	//**********************************************************************************
	/**
	 * Constructor for AuthorityKeyIdentifier class
	 * @param {Object} [parameters={}]
	 * @param {Object} [parameters.schema] asn1js parsed value to initialize the class from
	 */
	constructor(parameters = {})
	{
		//region Internal properties of the object
		if("keyIdentifier" in parameters)
			/**
			 * @type {OctetString}
			 * @desc keyIdentifier
			 */
			this.keyIdentifier = getParametersValue(parameters, "keyIdentifier", AuthorityKeyIdentifier.defaultValues("keyIdentifier"));

		if("authorityCertIssuer" in parameters)
			/**
			 * @type {Array.<GeneralName>}
			 * @desc authorityCertIssuer
			 */
			this.authorityCertIssuer = getParametersValue(parameters, "authorityCertIssuer", AuthorityKeyIdentifier.defaultValues("authorityCertIssuer"));

		if("authorityCertSerialNumber" in parameters)
			/**
			 * @type {Integer}
			 * @desc authorityCertIssuer
			 */
			this.authorityCertSerialNumber = getParametersValue(parameters, "authorityCertSerialNumber", AuthorityKeyIdentifier.defaultValues("authorityCertSerialNumber"));
		//endregion

		//region If input argument array contains "schema" for this object
		if("schema" in parameters)
			this.fromSchema(parameters.schema);
		//endregion
	}
	//**********************************************************************************
	/**
	 * Return default values for all class members
	 * @param {string} memberName String name for a class member
	 */
	static defaultValues(memberName)
	{
		switch(memberName)
		{
			case "keyIdentifier":
				return new OctetString();
			case "authorityCertIssuer":
				return [];
			case "authorityCertSerialNumber":
				return new Integer();
			default:
				throw new Error(`Invalid member name for AuthorityKeyIdentifier class: ${memberName}`);
		}
	}
	//**********************************************************************************
	/**
	 * Return value of pre-defined ASN.1 schema for current class
	 *
	 * ASN.1 schema:
	 * ```asn1
	 * AuthorityKeyIdentifier OID ::= 2.5.29.35
	 *
	 * AuthorityKeyIdentifier ::= SEQUENCE {
	 *    keyIdentifier             [0] KeyIdentifier           OPTIONAL,
	 *    authorityCertIssuer       [1] GeneralNames            OPTIONAL,
	 *    authorityCertSerialNumber [2] CertificateSerialNumber OPTIONAL  }
	 *
	 * KeyIdentifier ::= OCTET STRING
	 * ```
	 *
	 * @param {Object} parameters Input parameters for the schema
	 * @returns {Object} asn1js schema object
	 */
	static schema(parameters = {})
	{
		/**
		 * @type {Object}
		 * @property {string} [blockName]
		 * @property {string} [keyIdentifier]
		 * @property {string} [authorityCertIssuer]
		 * @property {string} [authorityCertSerialNumber]
		 */
		const names = getParametersValue(parameters, "names", {});

		return (new Sequence({
			name: (names.blockName || ""),
			value: [
				new Primitive({
					name: (names.keyIdentifier || ""),
					optional: true,
					idBlock: {
						tagClass: 3, // CONTEXT-SPECIFIC
						tagNumber: 0 // [0]
					}
				}),
				new Constructed({
					optional: true,
					idBlock: {
						tagClass: 3, // CONTEXT-SPECIFIC
						tagNumber: 1 // [1]
					},
					value: [
						new Repeated({
							name: (names.authorityCertIssuer || ""),
							value: GeneralName.schema()
						})
					]
				}),
				new Primitive({
					name: (names.authorityCertSerialNumber || ""),
					optional: true,
					idBlock: {
						tagClass: 3, // CONTEXT-SPECIFIC
						tagNumber: 2 // [2]
					}
				})
			]
		}));
	}
	//**********************************************************************************
	/**
	 * Convert parsed asn1js object into current class
	 * @param {!Object} schema
	 */
	fromSchema(schema)
	{
		//region Clear input data first
		clearProps(schema, [
			"keyIdentifier",
			"authorityCertIssuer",
			"authorityCertSerialNumber"
		]);
		//endregion
		
		//region Check the schema is valid
		const asn1 = compareSchema(schema,
			schema,
			AuthorityKeyIdentifier.schema({
				names: {
					keyIdentifier: "keyIdentifier",
					authorityCertIssuer: "authorityCertIssuer",
					authorityCertSerialNumber: "authorityCertSerialNumber"
				}
			})
		);

		if(asn1.verified === false)
			throw new Error("Object's schema was not verified against input data for AuthorityKeyIdentifier");
		//endregion

		//region Get internal properties from parsed schema
		if("keyIdentifier" in asn1.result)
			this.keyIdentifier = new OctetString({ valueHex: asn1.result.keyIdentifier.valueBlock.valueHex });

		if("authorityCertIssuer" in asn1.result)
			this.authorityCertIssuer = Array.from(asn1.result.authorityCertIssuer, element => new GeneralName({ schema: element }));

		if("authorityCertSerialNumber" in asn1.result)
			this.authorityCertSerialNumber = new Integer({ valueHex: asn1.result.authorityCertSerialNumber.valueBlock.valueHex });
		//endregion
	}
	//**********************************************************************************
	/**
	 * Convert current object to asn1js object and set correct values
	 * @returns {Object} asn1js object
	 */
	toSchema()
	{
		//region Create array for output sequence
		const outputArray = [];
		
		if("keyIdentifier" in this)
		{
			outputArray.push(new Primitive({
				idBlock: {
					tagClass: 3, // CONTEXT-SPECIFIC
					tagNumber: 0 // [0]
				},
				valueHex: this.keyIdentifier.valueBlock.valueHex
			}));
		}
		
		if("authorityCertIssuer" in this)
		{
			outputArray.push(new Constructed({
				idBlock: {
					tagClass: 3, // CONTEXT-SPECIFIC
					tagNumber: 1 // [1]
				},
				value: Array.from(this.authorityCertIssuer, element => element.toSchema())
			}));
		}
		
		if("authorityCertSerialNumber" in this)
		{
			outputArray.push(new Primitive({
				idBlock: {
					tagClass: 3, // CONTEXT-SPECIFIC
					tagNumber: 2 // [2]
				},
				valueHex: this.authorityCertSerialNumber.valueBlock.valueHex
			}));
		}
		//endregion
		
		//region Construct and return new ASN.1 schema for this object
		return (new Sequence({
			value: outputArray
		}));
		//endregion
	}
	//**********************************************************************************
	/**
	 * Convertion for the class to JSON object
	 * @returns {Object}
	 */
	toJSON()
	{
		const object = {};

		if("keyIdentifier" in this)
			object.keyIdentifier = this.keyIdentifier.toJSON();

		if("authorityCertIssuer" in this)
			object.authorityCertIssuer = Array.from(this.authorityCertIssuer, element => element.toJSON());

		if("authorityCertSerialNumber" in this)
			object.authorityCertSerialNumber = this.authorityCertSerialNumber.toJSON();

		return object;
	}
	//**********************************************************************************
}
//**************************************************************************************

//**************************************************************************************
/**
 * Class from RFC5280
 */
class PolicyConstraints
{
	//**********************************************************************************
	/**
	 * Constructor for PolicyConstraints class
	 * @param {Object} [parameters={}]
	 * @param {Object} [parameters.schema] asn1js parsed value to initialize the class from
	 */
	constructor(parameters = {})
	{
		//region Internal properties of the object
		if("requireExplicitPolicy" in parameters)
			/**
			 * @type {number}
			 * @desc requireExplicitPolicy
			 */
			this.requireExplicitPolicy = getParametersValue(parameters, "requireExplicitPolicy", PolicyConstraints.defaultValues("requireExplicitPolicy"));

		if("inhibitPolicyMapping" in parameters)
			/**
			 * @type {number}
			 * @desc Value of the TIME class
			 */
			this.inhibitPolicyMapping = getParametersValue(parameters, "inhibitPolicyMapping", PolicyConstraints.defaultValues("inhibitPolicyMapping"));
		//endregion

		//region If input argument array contains "schema" for this object
		if("schema" in parameters)
			this.fromSchema(parameters.schema);
		//endregion
	}
	//**********************************************************************************
	/**
	 * Return default values for all class members
	 * @param {string} memberName String name for a class member
	 */
	static defaultValues(memberName)
	{
		switch(memberName)
		{
			case "requireExplicitPolicy":
				return 0;
			case "inhibitPolicyMapping":
				return 0;
			default:
				throw new Error(`Invalid member name for PolicyConstraints class: ${memberName}`);
		}
	}
	//**********************************************************************************
	/**
	 * Return value of pre-defined ASN.1 schema for current class
	 *
	 * ASN.1 schema:
	 * ```asn1
	 * PolicyConstraints ::= SEQUENCE {
	 *    requireExplicitPolicy           [0] SkipCerts OPTIONAL,
	 *    inhibitPolicyMapping            [1] SkipCerts OPTIONAL }
	 *
	 * SkipCerts ::= INTEGER (0..MAX)
	 * ```
	 *
	 * @param {Object} parameters Input parameters for the schema
	 * @returns {Object} asn1js schema object
	 */
	static schema(parameters = {})
	{
		/**
		 * @type {Object}
		 * @property {string} [blockName]
		 * @property {string} [requireExplicitPolicy]
		 * @property {string} [inhibitPolicyMapping]
		 */
		const names = getParametersValue(parameters, "names", {});

		return (new Sequence({
			name: (names.blockName || ""),
			value: [
				new Primitive({
					name: (names.requireExplicitPolicy || ""),
					optional: true,
					idBlock: {
						tagClass: 3, // CONTEXT-SPECIFIC
						tagNumber: 0 // [0]
					}
				}), // IMPLICIT integer value
				new Primitive({
					name: (names.inhibitPolicyMapping || ""),
					optional: true,
					idBlock: {
						tagClass: 3, // CONTEXT-SPECIFIC
						tagNumber: 1 // [1]
					}
				}) // IMPLICIT integer value
			]
		}));
	}
	//**********************************************************************************
	/**
	 * Convert parsed asn1js object into current class
	 * @param {!Object} schema
	 */
	fromSchema(schema)
	{
		//region Clear input data first
		clearProps(schema, [
			"requireExplicitPolicy",
			"inhibitPolicyMapping"
		]);
		//endregion
		
		//region Check the schema is valid
		const asn1 = compareSchema(schema,
			schema,
			PolicyConstraints.schema({
				names: {
					requireExplicitPolicy: "requireExplicitPolicy",
					inhibitPolicyMapping: "inhibitPolicyMapping"
				}
			})
		);

		if(asn1.verified === false)
			throw new Error("Object's schema was not verified against input data for PolicyConstraints");
		//endregion

		//region Get internal properties from parsed schema
		if("requireExplicitPolicy" in asn1.result)
		{
			const field1 = asn1.result.requireExplicitPolicy;

			field1.idBlock.tagClass = 1; // UNIVERSAL
			field1.idBlock.tagNumber = 2; // INTEGER

			const ber1 = field1.toBER(false);
			const int1 = fromBER(ber1);

			this.requireExplicitPolicy = int1.result.valueBlock.valueDec;
		}

		if("inhibitPolicyMapping" in asn1.result)
		{
			const field2 = asn1.result.inhibitPolicyMapping;

			field2.idBlock.tagClass = 1; // UNIVERSAL
			field2.idBlock.tagNumber = 2; // INTEGER

			const ber2 = field2.toBER(false);
			const int2 = fromBER(ber2);

			this.inhibitPolicyMapping = int2.result.valueBlock.valueDec;
		}
		//endregion
	}
	//**********************************************************************************
	/**
	 * Convert current object to asn1js object and set correct values
	 * @returns {Object} asn1js object
	 */
	toSchema()
	{
		//region Create correct values for output sequence
		const outputArray = [];
		
		if("requireExplicitPolicy" in this)
		{
			const int1 = new Integer({ value: this.requireExplicitPolicy });
			
			int1.idBlock.tagClass = 3; // CONTEXT-SPECIFIC
			int1.idBlock.tagNumber = 0; // [0]
			
			outputArray.push(int1);
		}
		
		if("inhibitPolicyMapping" in this)
		{
			const int2 = new Integer({ value: this.inhibitPolicyMapping });
			
			int2.idBlock.tagClass = 3; // CONTEXT-SPECIFIC
			int2.idBlock.tagNumber = 1; // [1]
			
			outputArray.push(int2);
		}
		//endregion
		
		//region Construct and return new ASN.1 schema for this object
		return (new Sequence({
			value: outputArray
		}));
		//endregion
	}
	//**********************************************************************************
	/**
	 * Convertion for the class to JSON object
	 * @returns {Object}
	 */
	toJSON()
	{
		const object = {};

		if("requireExplicitPolicy" in this)
			object.requireExplicitPolicy = this.requireExplicitPolicy;

		if("inhibitPolicyMapping" in this)
			object.inhibitPolicyMapping = this.inhibitPolicyMapping;

		return object;
	}
	//**********************************************************************************
}
//**************************************************************************************

//**************************************************************************************
/**
 * Class from RFC5280
 */
class ExtKeyUsage
{
	//**********************************************************************************
	/**
	 * Constructor for ExtKeyUsage class
	 * @param {Object} [parameters={}]
	 * @param {Object} [parameters.schema] asn1js parsed value to initialize the class from
	 */
	constructor(parameters = {})
	{
		//region Internal properties of the object
		/**
		 * @type {Array.<string>}
		 * @desc keyPurposes
		 */
		this.keyPurposes = getParametersValue(parameters, "keyPurposes", ExtKeyUsage.defaultValues("keyPurposes"));
		//endregion

		//region If input argument array contains "schema" for this object
		if("schema" in parameters)
			this.fromSchema(parameters.schema);
		//endregion
	}
	//**********************************************************************************
	/**
	 * Return default values for all class members
	 * @param {string} memberName String name for a class member
	 */
	static defaultValues(memberName)
	{
		switch(memberName)
		{
			case "keyPurposes":
				return [];
			default:
				throw new Error(`Invalid member name for ExtKeyUsage class: ${memberName}`);
		}
	}
	//**********************************************************************************
	/**
	 * Return value of pre-defined ASN.1 schema for current class
	 *
	 * ASN.1 schema:
	 * ```asn1
	 * ExtKeyUsage ::= SEQUENCE SIZE (1..MAX) OF KeyPurposeId
	 *
	 * KeyPurposeId ::= OBJECT IDENTIFIER
	 * ```
	 *
	 * @param {Object} parameters Input parameters for the schema
	 * @returns {Object} asn1js schema object
	 */
	static schema(parameters = {})
	{
		/**
		 * @type {Object}
		 * @property {string} [blockName]
		 * @property {string} [keyPurposes]
		 */
		const names = getParametersValue(parameters, "names", {});

		return (new Sequence({
			name: (names.blockName || ""),
			value: [
				new Repeated({
					name: (names.keyPurposes || ""),
					value: new ObjectIdentifier()
				})
			]
		}));
	}
	//**********************************************************************************
	/**
	 * Convert parsed asn1js object into current class
	 * @param {!Object} schema
	 */
	fromSchema(schema)
	{
		//region Clear input data first
		clearProps(schema, [
			"keyPurposes"
		]);
		//endregion
		
		//region Check the schema is valid
		const asn1 = compareSchema(schema,
			schema,
			ExtKeyUsage.schema({
				names: {
					keyPurposes: "keyPurposes"
				}
			})
		);

		if(asn1.verified === false)
			throw new Error("Object's schema was not verified against input data for ExtKeyUsage");
		//endregion

		//region Get internal properties from parsed schema
		this.keyPurposes = Array.from(asn1.result.keyPurposes, element => element.valueBlock.toString());
		//endregion
	}
	//**********************************************************************************
	/**
	 * Convert current object to asn1js object and set correct values
	 * @returns {Object} asn1js object
	 */
	toSchema()
	{
		//region Construct and return new ASN.1 schema for this object
		return (new Sequence({
			value: Array.from(this.keyPurposes, element => new ObjectIdentifier({ value: element }))
		}));
		//endregion
	}
	//**********************************************************************************
	/**
	 * Convertion for the class to JSON object
	 * @returns {Object}
	 */
	toJSON()
	{
		return {
			keyPurposes: Array.from(this.keyPurposes)
		};
	}
	//**********************************************************************************
}
//**************************************************************************************

//**************************************************************************************
/**
 * Class from RFC5280
 */
class AccessDescription
{
	//**********************************************************************************
	/**
	 * Constructor for AccessDescription class
	 * @param {Object} [parameters={}]
	 * @param {Object} [parameters.schema] asn1js parsed value to initialize the class from
	 */
	constructor(parameters = {})
	{
		//region Internal properties of the object
		/**
		 * @type {string}
		 * @desc The type and format of the information are specified by the accessMethod field. This profile defines two accessMethod OIDs: id-ad-caIssuers and id-ad-ocsp
		 */
		this.accessMethod = getParametersValue(parameters, "accessMethod", AccessDescription.defaultValues("accessMethod"));
		/**
		 * @type {GeneralName}
		 * @desc The accessLocation field specifies the location of the information
		 */
		this.accessLocation = getParametersValue(parameters, "accessLocation", AccessDescription.defaultValues("accessLocation"));
		//endregion

		//region If input argument array contains "schema" for this object
		if("schema" in parameters)
			this.fromSchema(parameters.schema);
		//endregion
	}
	//**********************************************************************************
	/**
	 * Return default values for all class members
	 * @param {string} memberName String name for a class member
	 */
	static defaultValues(memberName)
	{
		switch(memberName)
		{
			case "accessMethod":
				return "";
			case "accessLocation":
				return new GeneralName();
			default:
				throw new Error(`Invalid member name for AccessDescription class: ${memberName}`);
		}
	}
	//**********************************************************************************
	/**
	 * Return value of pre-defined ASN.1 schema for current class
	 *
	 * ASN.1 schema:
	 * ```asn1
	 * AccessDescription  ::=  SEQUENCE {
	 *    accessMethod          OBJECT IDENTIFIER,
	 *    accessLocation        GeneralName  }
	 * ```
	 *
	 * @param {Object} parameters Input parameters for the schema
	 * @returns {Object} asn1js schema object
	 */
	static schema(parameters = {})
	{
		/**
		 * @type {Object}
		 * @property {string} [blockName]
		 * @property {string} [accessMethod]
		 * @property {string} [accessLocation]
		 */
		const names = getParametersValue(parameters, "names", {});

		return (new Sequence({
			name: (names.blockName || ""),
			value: [
				new ObjectIdentifier({ name: (names.accessMethod || "") }),
				GeneralName.schema(names.accessLocation || {})
			]
		}));
	}
	//**********************************************************************************
	/**
	 * Convert parsed asn1js object into current class
	 * @param {!Object} schema
	 */
	fromSchema(schema)
	{
		//region Clear input data first
		clearProps(schema, [
			"accessMethod",
			"accessLocation"
		]);
		//endregion
		
		//region Check the schema is valid
		const asn1 = compareSchema(schema,
			schema,
			AccessDescription.schema({
				names: {
					accessMethod: "accessMethod",
					accessLocation: {
						names: {
							blockName: "accessLocation"
						}
					}
				}
			})
		);

		if(asn1.verified === false)
			throw new Error("Object's schema was not verified against input data for AccessDescription");
		//endregion

		//region Get internal properties from parsed schema
		this.accessMethod = asn1.result.accessMethod.valueBlock.toString();
		this.accessLocation = new GeneralName({ schema: asn1.result.accessLocation });
		//endregion
	}
	//**********************************************************************************
	/**
	 * Convert current object to asn1js object and set correct values
	 * @returns {Object} asn1js object
	 */
	toSchema()
	{
		//region Construct and return new ASN.1 schema for this object
		return (new Sequence({
			value: [
				new ObjectIdentifier({ value: this.accessMethod }),
				this.accessLocation.toSchema()
			]
		}));
		//endregion
	}
	//**********************************************************************************
	/**
	 * Convertion for the class to JSON object
	 * @returns {Object}
	 */
	toJSON()
	{
		return {
			accessMethod: this.accessMethod,
			accessLocation: this.accessLocation.toJSON()
		};
	}
	//**********************************************************************************
}
//**************************************************************************************

//**************************************************************************************
/**
 * Class from RFC5280
 */
class InfoAccess
{
	//**********************************************************************************
	/**
	 * Constructor for InfoAccess class
	 * @param {Object} [parameters={}]
	 * @param {Object} [parameters.schema] asn1js parsed value to initialize the class from
	 */
	constructor(parameters = {})
	{
		//region Internal properties of the object
		/**
		 * @type {Array.<AccessDescription>}
		 * @desc accessDescriptions
		 */
		this.accessDescriptions = getParametersValue(parameters, "accessDescriptions", InfoAccess.defaultValues("accessDescriptions"));
		//endregion

		//region If input argument array contains "schema" for this object
		if("schema" in parameters)
			this.fromSchema(parameters.schema);
		//endregion
	}
	//**********************************************************************************
	/**
	 * Return default values for all class members
	 * @param {string} memberName String name for a class member
	 */
	static defaultValues(memberName)
	{
		switch(memberName)
		{
			case "accessDescriptions":
				return [];
			default:
				throw new Error(`Invalid member name for InfoAccess class: ${memberName}`);
		}
	}
	//**********************************************************************************
	/**
	 * Return value of pre-defined ASN.1 schema for current class
	 *
	 * ASN.1 schema:
	 * ```asn1
	 * AuthorityInfoAccessSyntax  ::=
	 * SEQUENCE SIZE (1..MAX) OF AccessDescription
	 * ```
	 *
	 * @param {Object} parameters Input parameters for the schema
	 * @returns {Object} asn1js schema object
	 */
	static schema(parameters = {})
	{
		/**
		 * @type {Object}
		 * @property {string} [blockName]
		 * @property {string} [accessDescriptions]
		 */
		const names = getParametersValue(parameters, "names", {});

		return (new Sequence({
			name: (names.blockName || ""),
			value: [
				new Repeated({
					name: (names.accessDescriptions || ""),
					value: AccessDescription.schema()
				})
			]
		}));
	}
	//**********************************************************************************
	/**
	 * Convert parsed asn1js object into current class
	 * @param {!Object} schema
	 */
	fromSchema(schema)
	{
		//region Clear input data first
		clearProps(schema, [
			"accessDescriptions"
		]);
		//endregion
		
		//region Check the schema is valid
		const asn1 = compareSchema(schema,
			schema,
			InfoAccess.schema({
				names: {
					accessDescriptions: "accessDescriptions"
				}
			})
		);

		if(asn1.verified === false)
			throw new Error("Object's schema was not verified against input data for InfoAccess");
		//endregion

		//region Get internal properties from parsed schema
		this.accessDescriptions = Array.from(asn1.result.accessDescriptions, element => new AccessDescription({ schema: element }));
		//endregion
	}
	//**********************************************************************************
	/**
	 * Convert current object to asn1js object and set correct values
	 * @returns {Object} asn1js object
	 */
	toSchema()
	{
		//region Construct and return new ASN.1 schema for this object
		return (new Sequence({
			value: Array.from(this.accessDescriptions, element => element.toSchema())
		}));
		//endregion
	}
	//**********************************************************************************
	/**
	 * Convertion for the class to JSON object
	 * @returns {Object}
	 */
	toJSON()
	{
		return {
			accessDescriptions: Array.from(this.accessDescriptions, element => element.toJSON())
		};
	}
	//**********************************************************************************
}
//**************************************************************************************

/*
 * Copyright (c) 2016-2018, Peculiar Ventures
 * All rights reserved.
 *
 * Author 2016-2018, Yury Strozhevsky <www.strozhevsky.com>.
 *
 */
//**************************************************************************************
class ByteStream
{
	//**********************************************************************************
	// noinspection FunctionWithMultipleLoopsJS
	/**
	 * Constructor for ByteStream class
	 * @param {{[length]: number, [stub]: number, [view]: Uint8Array, [buffer]: ArrayBuffer, [string]: string, [hexstring]: string}} parameters
	 */
	constructor(parameters = {})
	{
		this.clear();
		
		for(const key of Object.keys(parameters))
		{
			switch(key)
			{
				case "length":
					this.length = parameters.length;
					break;
				case "stub":
					// noinspection NonBlockStatementBodyJS
					for(let i = 0; i < this._view.length; i++)
						this._view[i] = parameters.stub;
					break;
				case "view":
					this.fromUint8Array(parameters.view);
					break;
				case "buffer":
					this.fromArrayBuffer(parameters.buffer);
					break;
				case "string":
					this.fromString(parameters.string);
					break;
				case "hexstring":
					this.fromHexString(parameters.hexstring);
					break;
				default:
			}
		}
	}
	//**********************************************************************************
	/**
	 * Setter for "buffer"
	 * @param {ArrayBuffer} value
	 */
	set buffer(value)
	{
		this._buffer = value.slice(0);
		this._view = new Uint8Array(this._buffer);
	}
	//**********************************************************************************
	/**
	 * Getter for "buffer"
	 * @returns {ArrayBuffer}
	 */
	get buffer()
	{
		return this._buffer;
	}
	//**********************************************************************************
	/**
	 * Setter for "view"
	 * @param {Uint8Array} value
	 */
	set view(value)
	{
		this._buffer = new ArrayBuffer(value.length);
		this._view = new Uint8Array(this._buffer);
		
		this._view.set(value);
	}
	//**********************************************************************************
	/**
	 * Getter for "view"
	 * @returns {Uint8Array}
	 */
	get view()
	{
		return this._view;
	}
	//**********************************************************************************
	/**
	 * Getter for "length"
	 * @returns {number}
	 */
	get length()
	{
		return this._buffer.byteLength;
	}
	//**********************************************************************************
	/**
	 * Setter for "length"
	 * @param {number} value
	 */
	set length(value)
	{
		this._buffer = new ArrayBuffer(value);
		this._view = new Uint8Array(this._buffer);
	}
	//**********************************************************************************
	/**
	 * Clear existing stream
	 */
	clear()
	{
		this._buffer = new ArrayBuffer(0);
		this._view = new Uint8Array(this._buffer);
	}
	//**********************************************************************************
	/**
	 * Initialize "Stream" object from existing "ArrayBuffer"
	 * @param {!ArrayBuffer} array The ArrayBuffer to copy from
	 */
	fromArrayBuffer(array)
	{
		this.buffer = array;
	}
	//**********************************************************************************
	// noinspection FunctionNamingConventionJS
	/**
	 * Initialize "Stream" object from existing "Uint8Array"
	 * @param {!Uint8Array} array The Uint8Array to copy from
	 */
	fromUint8Array(array)
	{
		this._buffer = new ArrayBuffer(array.length);
		this._view = new Uint8Array(this._buffer);
		
		this._view.set(array);
	}
	//**********************************************************************************
	/**
	 * Initialize "Stream" object from existing string
	 * @param {string} string The string to initialize from
	 */
	fromString(string)
	{
		const stringLength = string.length;
		
		this.length = stringLength;
		
		// noinspection NonBlockStatementBodyJS
		for(let i = 0; i < stringLength; i++)
			this.view[i] = string.charCodeAt(i);
	}
	//**********************************************************************************
	/**
	 * Represent "Stream" object content as a string
	 * @param {number} [start] Start position to convert to string
	 * @param {number} [length] Length of array to convert to string
	 * @returns {string}
	 */
	toString(start = 0, length = (this.view.length - start))
	{
		//region Initial variables
		let result = "";
		//endregion
		
		//region Check input parameters
		// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS
		if((start >= this.view.length) || (start < 0))
		{
			// noinspection AssignmentToFunctionParameterJS
			start = 0;
		}
		
		// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS
		if((length >= this.view.length) || (length < 0))
		{
			// noinspection AssignmentToFunctionParameterJS
			length = this.view.length - start;
		}
		//endregion
		
		//region Convert array of bytes to string
		// noinspection NonBlockStatementBodyJS
		for(let i = start; i < (start + length); i++)
			result += String.fromCharCode(this.view[i]);
		//endregion
		
		return result;
	}
	//**********************************************************************************
	// noinspection FunctionTooLongJS
	/**
	 * Initialize "Stream" object from existing hexdecimal string
	 * @param {string} hexString String to initialize from
	 */
	fromHexString(hexString)
	{
		//region Initial variables
		const stringLength = hexString.length;
		
		this.buffer = new ArrayBuffer(stringLength >> 1);
		this.view = new Uint8Array(this.buffer);
		
		const hexMap = new Map();
		
		// noinspection MagicNumberJS
		hexMap.set("0", 0x00);
		// noinspection MagicNumberJS
		hexMap.set("1", 0x01);
		// noinspection MagicNumberJS
		hexMap.set("2", 0x02);
		// noinspection MagicNumberJS
		hexMap.set("3", 0x03);
		// noinspection MagicNumberJS
		hexMap.set("4", 0x04);
		// noinspection MagicNumberJS
		hexMap.set("5", 0x05);
		// noinspection MagicNumberJS
		hexMap.set("6", 0x06);
		// noinspection MagicNumberJS
		hexMap.set("7", 0x07);
		// noinspection MagicNumberJS
		hexMap.set("8", 0x08);
		// noinspection MagicNumberJS
		hexMap.set("9", 0x09);
		// noinspection MagicNumberJS
		hexMap.set("A", 0x0A);
		// noinspection MagicNumberJS
		hexMap.set("a", 0x0A);
		// noinspection MagicNumberJS
		hexMap.set("B", 0x0B);
		// noinspection MagicNumberJS
		hexMap.set("b", 0x0B);
		// noinspection MagicNumberJS
		hexMap.set("C", 0x0C);
		// noinspection MagicNumberJS
		hexMap.set("c", 0x0C);
		// noinspection MagicNumberJS
		hexMap.set("D", 0x0D);
		// noinspection MagicNumberJS
		hexMap.set("d", 0x0D);
		// noinspection MagicNumberJS
		hexMap.set("E", 0x0E);
		// noinspection MagicNumberJS
		hexMap.set("e", 0x0E);
		// noinspection MagicNumberJS
		hexMap.set("F", 0x0F);
		// noinspection MagicNumberJS
		hexMap.set("f", 0x0F);
		
		let j = 0;
		// noinspection MagicNumberJS
		let temp = 0x00;
		//endregion
		
		//region Convert char-by-char
		for(let i = 0; i < stringLength; i++)
		{
			// noinspection NegatedIfStatementJS
			if(!(i % 2))
			{
				// noinspection NestedFunctionCallJS
				temp = hexMap.get(hexString.charAt(i)) << 4;
			}
			else
			{
				// noinspection NestedFunctionCallJS
				temp |= hexMap.get(hexString.charAt(i));
				
				this.view[j] = temp;
				j++;
			}
		}
		//endregion
	}
	//**********************************************************************************
	// noinspection JSUnusedGlobalSymbols
	/**
	 * Represent "Stream" object content as a hexdecimal string
	 * @param {number} [start=0] Start position to convert to string
	 * @param {number} [length=(this.view.length - start)] Length of array to convert to string
	 * @returns {string}
	 */
	toHexString(start = 0, length = (this.view.length - start))
	{
		//region Initial variables
		let result = "";
		//endregion
		
		//region Check input parameters
		// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS
		if((start >= this.view.length) || (start < 0))
		{
			// noinspection AssignmentToFunctionParameterJS
			start = 0;
		}
		
		// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS
		if((length >= this.view.length) || (length < 0))
		{
			// noinspection AssignmentToFunctionParameterJS
			length = this.view.length - start;
		}
		//endregion

		for(let i = start; i < (start + length); i++)
		{
			// noinspection ChainedFunctionCallJS
			const str = this.view[i].toString(16).toUpperCase();
			// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS, ConditionalExpressionJS, EqualityComparisonWithCoercionJS
			result = result + ((str.length == 1) ? "0" : "") + str;
		}
		
		return result;
	}
	//**********************************************************************************
	// noinspection FunctionWithMultipleReturnPointsJS
	/**
	 * Return copy of existing "Stream"
	 * @param {number} [start=0] Start position of the copy
	 * @param {number} [length=this.view.length] Length of the copy
	 * @returns {ByteStream}
	 */
	copy(start = 0, length = (this._buffer.byteLength - start))
	{
		//region Check input parameters
		// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS, NonBlockStatementBodyJS
		if((start === 0) && (this._buffer.byteLength === 0))
			return new ByteStream();
		
		// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS, NonBlockStatementBodyJS
		if((start < 0) || (start > (this._buffer.byteLength - 1)))
			throw new Error(`Wrong start position: ${start}`);
		//endregion
		
		const stream = new ByteStream();
		
		stream._buffer = this._buffer.slice(start, start + length);
		stream._view = new Uint8Array(stream._buffer);
		
		return stream;
	}
	//**********************************************************************************
	// noinspection JSUnusedGlobalSymbols, FunctionWithMultipleReturnPointsJS
	/**
	 * Return slice of existing "Stream"
	 * @param {number} [start=0] Start position of the slice
	 * @param {number} [end=this._buffer.byteLength] End position of the slice
	 * @returns {ByteStream}
	 */
	slice(start = 0, end = this._buffer.byteLength)
	{
		//region Check input parameters
		// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS, NonBlockStatementBodyJS
		if((start === 0) && (this._buffer.byteLength === 0))
			return new ByteStream();
		
		// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS, NonBlockStatementBodyJS
		if((start < 0) || (start > (this._buffer.byteLength - 1)))
			throw new Error(`Wrong start position: ${start}`);
		//endregion
		
		const stream = new ByteStream();
		
		stream._buffer = this._buffer.slice(start, end);
		stream._view = new Uint8Array(stream._buffer);
		
		return stream;
	}
	//**********************************************************************************
	/**
	 * Change size of existing "Stream"
	 * @param {!number} size Size for new "Stream"
	 */
	realloc(size)
	{
		//region Initial variables
		const buffer = new ArrayBuffer(size);
		const view = new Uint8Array(buffer);
		//endregion
		
		//region Create a new ArrayBuffer content
		// noinspection NonBlockStatementBodyJS
		if(size > this._view.length)
			view.set(this._view);
		else
		{
			// noinspection NestedFunctionCallJS
			view.set(new Uint8Array(this._buffer, 0, size));
		}
		//endregion
		
		//region Initialize "Stream" with new "ArrayBuffer"
		this._buffer = buffer.slice(0);
		this._view = new Uint8Array(this._buffer);
		//endregion
	}
	//**********************************************************************************
	// noinspection JSUnusedGlobalSymbols
	/**
	 * Append a new "Stream" content to the current "Stream"
	 * @param {ByteStream} stream A new "stream" to append to current "stream"
	 */
	append(stream)
	{
		//region Initial variables
		const initialSize = this._buffer.byteLength;
		const streamViewLength = stream._buffer.byteLength;
		
		const copyView = stream._view.slice();
		//endregion
		
		//region Re-allocate current internal buffer
		this.realloc(initialSize + streamViewLength);
		//endregion
		
		//region Copy input stream content to a new place
		this._view.set(copyView, initialSize);
		//endregion
	}
	//**********************************************************************************
	// noinspection JSUnusedGlobalSymbols, FunctionWithMultipleReturnPointsJS
	/**
	 * Insert "Stream" content to the current "Stream" at specific position
	 * @param {ByteStream} stream A new "stream" to insert to current "stream"
	 * @param {number} [start=0] Start position to insert to
	 * @param {number} [length]
	 * @returns {boolean}
	 */
	insert(stream, start = 0, length = (this._buffer.byteLength - start))
	{
		//region Initial variables
		// noinspection NonBlockStatementBodyJS
		if(start > (this._buffer.byteLength - 1))
			return false;
		
		if(length > (this._buffer.byteLength - start))
		{
			// noinspection AssignmentToFunctionParameterJS
			length = this._buffer.byteLength - start;
		}
		//endregion
		
		//region Check input variables
		if(length > stream._buffer.byteLength)
		{
			// noinspection AssignmentToFunctionParameterJS
			length = stream._buffer.byteLength;
		}
		//endregion
		
		//region Update content of the current stream
		// noinspection NonBlockStatementBodyJS, EqualityComparisonWithCoercionJS
		if(length == stream._buffer.byteLength)
			this._view.set(stream._view, start);
		else
		{
			// noinspection NestedFunctionCallJS
			this._view.set(stream._view.slice(0, length), start);
		}
		//endregion
		
		return true;
	}
	//**********************************************************************************
	// noinspection FunctionWithMultipleReturnPointsJS
	/**
	 * Check that two "Stream" objects has equal content
	 * @param {ByteStream} stream Stream to compare with
	 * @returns {boolean}
	 */
	isEqual(stream)
	{
		//region Check length of both buffers
		// noinspection NonBlockStatementBodyJS, EqualityComparisonWithCoercionJS
		if(this._buffer.byteLength != stream._buffer.byteLength)
			return false;
		//endregion
		
		//region Compare each byte of both buffers
		for(let i = 0; i < stream._buffer.byteLength; i++)
		{
			// noinspection NonBlockStatementBodyJS, EqualityComparisonWithCoercionJS
			if(this.view[i] != stream.view[i])
				return false;
		}
		//endregion
		
		return true;
	}
	//**********************************************************************************
	// noinspection JSUnusedGlobalSymbols, FunctionWithMultipleReturnPointsJS
	/**
	 * Check that current "Stream" objects has equal content with input "Uint8Array"
	 * @param {Uint8Array} view View to compare with
	 * @returns {boolean}
	 */
	isEqualView(view)
	{
		//region Check length of both buffers
		// noinspection NonBlockStatementBodyJS, EqualityComparisonWithCoercionJS
		if(view.length != this.view.length)
			return false;
		//endregion
		
		//region Compare each byte of both buffers
		for(let i = 0; i < view.length; i++)
		{
			// noinspection NonBlockStatementBodyJS, EqualityComparisonWithCoercionJS
			if(this.view[i] != view[i])
				return false;
		}
		//endregion
		
		return true;
	}
	//**********************************************************************************
	// noinspection JSUnusedGlobalSymbols, FunctionWithMultipleLoopsJS, FunctionWithMultipleReturnPointsJS, OverlyComplexFunctionJS, FunctionTooLongJS
	/**
	 * Find any byte pattern in "Stream"
	 * @param {ByteStream} pattern Stream having pattern value
	 * @param {?number} [start] Start position to search from
	 * @param {?number} [length] Length of byte block to search at
	 * @param {boolean} [backward] Flag to search in backward order
	 * @returns {number}
	 */
	findPattern(pattern, start = null, length = null, backward = false)
	{
		//region Check input variables
		// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS
		if(start == null)
		{
			// noinspection AssignmentToFunctionParameterJS, ConditionalExpressionJS
			start = (backward) ? this.buffer.byteLength : 0;
		}
		
		if(start > this.buffer.byteLength)
		{
			// noinspection AssignmentToFunctionParameterJS
			start = this.buffer.byteLength;
		}
		
		if(backward)
		{
			// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS
			if(length == null)
			{
				// noinspection AssignmentToFunctionParameterJS
				length = start;
			}
			
			if(length > start)
			{
				// noinspection AssignmentToFunctionParameterJS
				length = start;
			}
		}
		else
		{
			// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS
			if(length == null)
			{
				// noinspection AssignmentToFunctionParameterJS
				length = this.buffer.byteLength - start;
			}
			
			if(length > (this.buffer.byteLength - start))
			{
				// noinspection AssignmentToFunctionParameterJS
				length = this.buffer.byteLength - start;
			}
		}
		//endregion
		
		//region Initial variables
		const patternLength = pattern.buffer.byteLength;
		// noinspection NonBlockStatementBodyJS
		if(patternLength > length)
			return (-1);
		//endregion
		
		//region Make a "pre-read" array for pattern
		const patternArray = [];
		// noinspection NonBlockStatementBodyJS
		for(let i = 0; i < patternLength; i++)
			patternArray.push(pattern.view[i]);
		//endregion
		
		//region Search for pattern
		for(let i = 0; i <= (length - patternLength); i++)
		{
			let equal = true;
			// noinspection ConditionalExpressionJS
			const equalStart = (backward) ? (start - patternLength - i) : (start + i);
			
			for(let j = 0; j < patternLength; j++)
			{
				// noinspection EqualityComparisonWithCoercionJS
				if(this.view[j + equalStart] != patternArray[j])
				{
					equal = false;
					// noinspection BreakStatementJS
					break;
				}
			}
			
			if(equal)
			{
				// noinspection ConditionalExpressionJS
				return (backward) ? (start - patternLength - i) : (start + patternLength + i); // Position after the pattern found
			}
		}
		//endregion
		
		return (-1);
	}
	//**********************************************************************************
	// noinspection OverlyComplexFunctionJS
	/**
	 * Find first position of any pattern from input array
	 * @param {Array.<ByteStream>} patterns Array with patterns which should be found
	 * @param {?number} [start] Start position to search from
	 * @param {?number} [length] Length of byte block to search at
	 * @param {boolean} [backward=false] Flag to search in backward order
	 * @returns {{id: number, position: number}}
	 */
	findFirstIn(patterns, start = null, length = null, backward = false)
	{
		//region Initial variables
		// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS
		if(start == null)
		{
			// noinspection AssignmentToFunctionParameterJS, ConditionalExpressionJS
			start = (backward) ? this.buffer.byteLength : 0;
		}
		
		if(start > this.buffer.byteLength)
		{
			// noinspection AssignmentToFunctionParameterJS
			start = this.buffer.byteLength;
		}
		
		if(backward)
		{
			// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS
			if(length == null)
			{
				// noinspection AssignmentToFunctionParameterJS
				length = start;
			}
			
			if(length > start)
			{
				// noinspection AssignmentToFunctionParameterJS
				length = start;
			}
		}
		else
		{
			// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS
			if(length == null)
			{
				// noinspection AssignmentToFunctionParameterJS
				length = this.buffer.byteLength - start;
			}
			
			if(length > (this.buffer.byteLength - start))
			{
				// noinspection AssignmentToFunctionParameterJS
				length = this.buffer.byteLength - start;
			}
		}
		
		// noinspection ConditionalExpressionJS
		const result = {
			id: (-1),
			position: (backward) ? 0 : (start + length),
			length: 0
		};
		//endregion
		
		for(let i = 0; i < patterns.length; i++)
		{
			const position = this.findPattern(patterns[i], start, length, backward);
			// noinspection EqualityComparisonWithCoercionJS
			if(position != (-1))
			{
				let valid = false;
				const patternLength = patterns[i].length;

				if(backward)
				{
					// noinspection NonBlockStatementBodyJS
					if((position - patternLength) >= (result.position - result.length))
						valid = true;
				}
				else
				{
					// noinspection NonBlockStatementBodyJS
					if((position - patternLength) <= (result.position - result.length))
						valid = true;
				}
				
				if(valid)
				{
					result.position = position;
					result.id = i;
					result.length = patternLength;
				}
			}
		}
		
		return result;
	}
	//**********************************************************************************
	// noinspection FunctionWithMultipleReturnPointsJS
	/**
	 * Find all positions of any pattern from input array
	 * @param {Array.<ByteStream>} patterns Array with patterns which should be found
	 * @param {?number} [start] Start position to search from
	 * @param {?number} [length] Length of byte block to search at
	 * @returns {Array}
	 */
	findAllIn(patterns, start = 0, length = (this.buffer.byteLength - start))
	{
		//region Initial variables
		const result = [];
		
		// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS
		if(start == null)
		{
			// noinspection AssignmentToFunctionParameterJS
			start = 0;
		}
		
		// noinspection NonBlockStatementBodyJS
		if(start > (this.buffer.byteLength - 1))
			return result;
		
		// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS
		if(length == null)
		{
			// noinspection AssignmentToFunctionParameterJS
			length = this.buffer.byteLength - start;
		}

		if(length > (this.buffer.byteLength - start))
		{
			// noinspection AssignmentToFunctionParameterJS
			length = this.buffer.byteLength - start;
		}
		
		let patternFound = {
			id: (-1),
			position: start
		};
		//endregion
		
		//region Find all accurences of patterns
		do
		{
			const position = patternFound.position;
			
			patternFound = this.findFirstIn(patterns, patternFound.position, length);
			
			// noinspection EqualityComparisonWithCoercionJS
			if(patternFound.id == (-1))
			{
				// noinspection BreakStatementJS
				break;
			}
			
			// noinspection AssignmentToFunctionParameterJS
			length -= (patternFound.position - position);
			
			result.push({
				id: patternFound.id,
				position: patternFound.position
			});
		} while(true); // eslint-disable-line
		//endregion
		
		return result;
	}
	//**********************************************************************************
	// noinspection FunctionWithMultipleLoopsJS, FunctionWithMultipleReturnPointsJS
	/**
	 * Find all positions of a pattern
	 * @param {ByteStream} pattern Stream having pattern value
	 * @param {?number} [start] Start position to search from
	 * @param {?number} [length] Length of byte block to search at
	 * @returns {Array|number} Array with all pattern positions or (-1) if failed
	 */
	findAllPatternIn(pattern, start = 0, length = (this.buffer.byteLength - start))
	{
		//region Check input variables
		// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS
		if(start == null)
		{
			// noinspection AssignmentToFunctionParameterJS
			start = 0;
		}
		
		if(start > this.buffer.byteLength)
		{
			// noinspection AssignmentToFunctionParameterJS
			start = this.buffer.byteLength;
		}
		
		// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS
		if(length == null)
		{
			// noinspection AssignmentToFunctionParameterJS
			length = this.buffer.byteLength - start;
		}
		
		if(length > (this.buffer.byteLength - start))
		{
			// noinspection AssignmentToFunctionParameterJS
			length = this.buffer.byteLength - start;
		}
		//endregion
		
		//region Initial variables
		const result = [];
		
		const patternLength = pattern.buffer.byteLength;
		// noinspection NonBlockStatementBodyJS
		if(patternLength > length)
			return (-1);
		//endregion
		
		//region Make a "pre-read" array for pattern
		const patternArray = Array.from(pattern.view);
		//endregion
		
		//region Search for pattern
		for(let i = 0; i <= (length - patternLength); i++)
		{
			let equal = true;
			const equalStart = start + i;
			
			for(let j = 0; j < patternLength; j++)
			{
				// noinspection EqualityComparisonWithCoercionJS
				if(this.view[j + equalStart] != patternArray[j])
				{
					equal = false;
					// noinspection BreakStatementJS
					break;
				}
			}
			
			if(equal)
			{
				result.push(start + patternLength + i); // Position after the pattern found
				i += (patternLength - 1); // On next step of "for" we will have "i++"
			}
		}
		//endregion
		
		return result;
	}
	//**********************************************************************************
	// noinspection OverlyComplexFunctionJS, FunctionTooLongJS
	/**
	 * Find first position of data, not included in patterns from input array
	 * @param {Array.<ByteStream>} patterns Array with patterns which should be ommited
	 * @param {?number} [start] Start position to search from
	 * @param {?number} [length] Length of byte block to search at
	 * @param {boolean} [backward=false] Flag to search in backward order
	 * @returns {{left: {id: number, position: *}, right: {id: number, position: number}, value: ByteStream}}
	 */
	findFirstNotIn(patterns, start = null, length = null, backward = false)
	{
		//region Initial variables
		// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS
		if(start == null)
		{
			// noinspection AssignmentToFunctionParameterJS, ConditionalExpressionJS
			start = (backward) ? this.buffer.byteLength : 0;
		}
		
		if(start > this.buffer.byteLength)
		{
			// noinspection AssignmentToFunctionParameterJS
			start = this.buffer.byteLength;
		}
		
		if(backward)
		{
			// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS
			if(length == null)
			{
				// noinspection AssignmentToFunctionParameterJS
				length = start;
			}
			
			if(length > start)
			{
				// noinspection AssignmentToFunctionParameterJS
				length = start;
			}
		}
		else
		{
			// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS
			if(length == null)
			{
				// noinspection AssignmentToFunctionParameterJS
				length = this.buffer.byteLength - start;
			}
			
			if(length > (this.buffer.byteLength - start))
			{
				// noinspection AssignmentToFunctionParameterJS
				length = this.buffer.byteLength - start;
			}
		}
		
		const result = {
			left: {
				id: (-1),
				position: start
			},
			right: {
				id: (-1),
				position: 0
			},
			value: new ByteStream()
		};
		
		let currentLength = length;
		//endregion
		
		// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS
		while(currentLength > 0)
		{
			//region Search for nearest "pattern"
			// noinspection ConditionalExpressionJS
			result.right = this.findFirstIn(patterns,
				(backward) ? (start - length + currentLength) : (start + length - currentLength),
				currentLength,
				backward);
			//endregion
			
			//region No pattern at all
			// noinspection EqualityComparisonWithCoercionJS
			if(result.right.id == (-1))
			{
				// noinspection AssignmentToFunctionParameterJS
				length = currentLength;
				
				if(backward)
				{
					// noinspection AssignmentToFunctionParameterJS
					start -= length;
				}
				else
				{
					// noinspection AssignmentToFunctionParameterJS
					start = result.left.position;
				}
				
				result.value = new ByteStream();
				
				result.value._buffer = this._buffer.slice(start, start + length);
				result.value._view = new Uint8Array(result.value._buffer);
				
				// noinspection BreakStatementJS
				break;
			}
			//endregion
			
			//region Check distance between two patterns
			// noinspection ConditionalExpressionJS, EqualityComparisonWithCoercionJS
			if(result.right.position != ((backward) ? (result.left.position - patterns[result.right.id].buffer.byteLength) : (result.left.position + patterns[result.right.id].buffer.byteLength)))
			{
				if(backward)
				{
					// noinspection AssignmentToFunctionParameterJS
					start = result.right.position + patterns[result.right.id].buffer.byteLength;
					// noinspection AssignmentToFunctionParameterJS
					length = result.left.position - result.right.position - patterns[result.right.id].buffer.byteLength;
				}
				else
				{
					// noinspection AssignmentToFunctionParameterJS
					start = result.left.position;
					// noinspection AssignmentToFunctionParameterJS
					length = result.right.position - result.left.position - patterns[result.right.id].buffer.byteLength;
				}
				
				result.value = new ByteStream();
				
				result.value._buffer = this._buffer.slice(start, start + length);
				result.value._view = new Uint8Array(result.value._buffer);
				
				// noinspection BreakStatementJS
				break;
			}
			//endregion
			
			//region Store information about previous pattern
			result.left = result.right;
			//endregion
			
			//region Change current length
			currentLength -= patterns[result.right.id]._buffer.byteLength;
			//endregion
		}
		
		//region Swap "patterns" in case of backward order
		if(backward)
		{
			const temp = result.right;
			result.right = result.left;
			result.left = temp;
		}
		//endregion
		
		return result;
	}
	//**********************************************************************************
	// noinspection FunctionWithMultipleReturnPointsJS
	/**
	 * Find all positions of data, not included in patterns from input array
	 * @param {Array.<ByteStream>} patterns Array with patterns which should be ommited
	 * @param {?number} [start] Start position to search from
	 * @param {?number} [length] Length of byte block to search at
	 * @returns {Array}
	 */
	findAllNotIn(patterns, start = null, length = null)
	{
		//region Initial variables
		const result = [];
		
		// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS
		if(start == null)
		{
			// noinspection AssignmentToFunctionParameterJS
			start = 0;
		}
		
		// noinspection NonBlockStatementBodyJS
		if(start > (this.buffer.byteLength - 1))
			return result;
		
		// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS
		if(length == null)
		{
			// noinspection AssignmentToFunctionParameterJS
			length = this.buffer.byteLength - start;
		}
		
		if(length > (this.buffer.byteLength - start))
		{
			// noinspection AssignmentToFunctionParameterJS
			length = this.buffer.byteLength - start;
		}
		
		let patternFound = {
			left: {
				id: (-1),
				position: start
			},
			right: {
				id: (-1),
				position: start
			},
			value: new ByteStream()
		};
		//endregion
		
		//region Find all accurences of patterns
		// noinspection EqualityComparisonWithCoercionJS
		do
		{
			const position = patternFound.right.position;
			
			patternFound = this.findFirstNotIn(patterns, patternFound.right.position, length);
			
			// noinspection AssignmentToFunctionParameterJS
			length -= (patternFound.right.position - position);
			
			result.push({
				left: {
					id: patternFound.left.id,
					position: patternFound.left.position
				},
				right: {
					id: patternFound.right.id,
					position: patternFound.right.position
				},
				value: patternFound.value
			});
		} while(patternFound.right.id != (-1));
		//endregion
		
		return result;
	}
	//**********************************************************************************
	// noinspection FunctionWithMultipleReturnPointsJS, OverlyComplexFunctionJS
	/**
	 * Find position of a sequence of any patterns from input array
	 * @param {Array.<ByteStream>} patterns Array of pattern to look for
	 * @param {?number} [start] Start position to search from
	 * @param {?number} [length] Length of byte block to search at
	 * @param {boolean} [backward=false] Flag to search in backward order
	 * @returns {*}
	 */
	findFirstSequence(patterns, start = null, length = null, backward = false)
	{
		//region Initial variables
		// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS
		if(start == null)
		{
			// noinspection AssignmentToFunctionParameterJS, ConditionalExpressionJS
			start = (backward) ? this.buffer.byteLength : 0;
		}
		
		if(start > this.buffer.byteLength)
		{
			// noinspection AssignmentToFunctionParameterJS
			start = this.buffer.byteLength;
		}
		
		if(backward)
		{
			// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS
			if(length == null)
			{
				// noinspection AssignmentToFunctionParameterJS
				length = start;
			}
			
			if(length > start)
			{
				// noinspection AssignmentToFunctionParameterJS
				length = start;
			}
		}
		else
		{
			// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS
			if(length == null)
			{
				// noinspection AssignmentToFunctionParameterJS
				length = this.buffer.byteLength - start;
			}
			
			if(length > (this.buffer.byteLength - start))
			{
				// noinspection AssignmentToFunctionParameterJS
				length = this.buffer.byteLength - start;
			}
		}
		//endregion
		
		//region Find first byte from sequence
		const firstIn = this.skipNotPatterns(patterns, start, length, backward);
		// noinspection EqualityComparisonWithCoercionJS
		if(firstIn == (-1))
		{
			return {
				position: (-1),
				value: new ByteStream()
			};
		}
		//endregion
		
		//region Find first byte not in sequence
		// noinspection ConditionalExpressionJS
		const firstNotIn = this.skipPatterns(patterns,
			firstIn,
			length - ((backward) ? (start - firstIn) : (firstIn - start)),
			backward);
		//endregion
		
		//region Make output value
		if(backward)
		{
			// noinspection AssignmentToFunctionParameterJS
			start = firstNotIn;
			// noinspection AssignmentToFunctionParameterJS
			length = (firstIn - firstNotIn);
		}
		else
		{
			// noinspection AssignmentToFunctionParameterJS
			start = firstIn;
			// noinspection AssignmentToFunctionParameterJS
			length = (firstNotIn - firstIn);
		}
		
		const value = new ByteStream();
		
		value._buffer = this._buffer.slice(start, start + length);
		value._view = new Uint8Array(value._buffer);
		//endregion
		
		return {
			position: firstNotIn,
			value
		};
	}
	//**********************************************************************************
	// noinspection FunctionWithMultipleReturnPointsJS
	/**
	 * Find all positions of a sequence of any patterns from input array
	 * @param {Array.<ByteStream>} patterns Array of patterns to search for
	 * @param {?number} [start] Start position to search from
	 * @param {?number} [length] Length of byte block to search at
	 * @returns {Array}
	 */
	findAllSequences(patterns, start = null, length = null)
	{
		//region Initial variables
		const result = [];
		
		// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS
		if(start == null)
		{
			// noinspection AssignmentToFunctionParameterJS
			start = 0;
		}
		
		// noinspection NonBlockStatementBodyJS
		if(start > (this.buffer.byteLength - 1))
			return result;
		
		// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS
		if(length == null)
		{
			// noinspection AssignmentToFunctionParameterJS
			length = this.buffer.byteLength - start;
		}
		
		if(length > (this.buffer.byteLength - start))
		{
			// noinspection AssignmentToFunctionParameterJS
			length = this.buffer.byteLength - start;
		}
		
		let patternFound = {
			position: start,
			value: new ByteStream()
		};
		//endregion
		
		//region Find all accurences of patterns
		// noinspection EqualityComparisonWithCoercionJS
		do
		{
			const position = patternFound.position;
			
			patternFound = this.findFirstSequence(patterns, patternFound.position, length);
			
			// noinspection EqualityComparisonWithCoercionJS
			if(patternFound.position != (-1))
			{
				// noinspection AssignmentToFunctionParameterJS
				length -= (patternFound.position - position);
				
				result.push({
					position: patternFound.position,
					value: patternFound.value
				});
			}
			
		} while(patternFound.position != (-1));
		//endregion
		
		return result;
	}
	//**********************************************************************************
	// noinspection FunctionWithMultipleLoopsJS, FunctionWithMultipleReturnPointsJS, OverlyComplexFunctionJS, FunctionTooLongJS
	/**
	 * Find all paired patterns in the stream
	 * @param {ByteStream} leftPattern Left pattern to search for
	 * @param {ByteStream} rightPattern Right pattern to search for
	 * @param {?number} [start=null] Start position to search from
	 * @param {?number} [length=null] Length of byte block to search at
	 * @returns {Array}
	 */
	findPairedPatterns(leftPattern, rightPattern, start = null, length = null)
	{
		//region Initial variables
		const result = [];
		
		// noinspection NonBlockStatementBodyJS
		if(leftPattern.isEqual(rightPattern))
			return result;
		
		// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS
		if(start == null)
		{
			// noinspection AssignmentToFunctionParameterJS
			start = 0;
		}
		
		// noinspection NonBlockStatementBodyJS
		if(start > (this.buffer.byteLength - 1))
			return result;
		
		// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS
		if(length == null)
		{
			// noinspection AssignmentToFunctionParameterJS
			length = this.buffer.byteLength - start;
		}
		
		if(length > (this.buffer.byteLength - start))
		{
			// noinspection AssignmentToFunctionParameterJS
			length = this.buffer.byteLength - start;
		}
		
		let currentPositionLeft = 0;
		//endregion
		
		//region Find all "left patterns" as sorted array
		const leftPatterns = this.findAllPatternIn(leftPattern, start, length);
		// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS, NonBlockStatementBodyJS, EqualityComparisonWithCoercionJS
		if(leftPatterns.length == 0)
			return result;
		//endregion
		
		//region Find all "right patterns" as sorted array
		const rightPatterns = this.findAllPatternIn(rightPattern, start, length);
		// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS, NonBlockStatementBodyJS, EqualityComparisonWithCoercionJS
		if(rightPatterns.length == 0)
			return result;
		//endregion
		
		//region Combine patterns
		while(currentPositionLeft < leftPatterns.length)
		{
			// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS, EqualityComparisonWithCoercionJS
			if(rightPatterns.length == 0)
			{
				// noinspection BreakStatementJS
				break;
			}
			
			// noinspection EqualityComparisonWithCoercionJS
			if(leftPatterns[0] == rightPatterns[0])
			{
				// Possible situation when one pattern is a part of another
				// For example "stream" and "endstream"
				// In case when we have only "endstream" in fact "stream" will be also found at the same position
				// (position of the pattern is an index AFTER the pattern)
				
				result.push({
					left: leftPatterns[0],
					right: rightPatterns[0]
				});
				
				leftPatterns.splice(0, 1);
				rightPatterns.splice(0, 1);
				
				// noinspection ContinueStatementJS
				continue;
			}
			
			if(leftPatterns[currentPositionLeft] > rightPatterns[0])
			{
				// noinspection BreakStatementJS
				break;
			}
			
			while(leftPatterns[currentPositionLeft] < rightPatterns[0])
			{
				currentPositionLeft++;
				
				if(currentPositionLeft >= leftPatterns.length)
				{
					// noinspection BreakStatementJS
					break;
				}
			}
			
			result.push({
				left: leftPatterns[currentPositionLeft - 1],
				right: rightPatterns[0]
			});
			
			leftPatterns.splice(currentPositionLeft - 1, 1);
			rightPatterns.splice(0, 1);
			
			currentPositionLeft = 0;
		}
		//endregion
		
		//region Sort result
		result.sort((a, b) => (a.left - b.left));
		//endregion
		
		return result;
	}
	//**********************************************************************************
	// noinspection FunctionWithMultipleLoopsJS, FunctionWithMultipleReturnPointsJS, OverlyComplexFunctionJS, FunctionTooLongJS
	/**
	 * Find all paired patterns in the stream
	 * @param {Array.<ByteStream>} inputLeftPatterns Array of left patterns to search for
	 * @param {Array.<ByteStream>} inputRightPatterns Array of right patterns to search for
	 * @param {?number} [start=null] Start position to search from
	 * @param {?number} [length=null] Length of byte block to search at
	 * @returns {Array}
	 */
	findPairedArrays(inputLeftPatterns, inputRightPatterns, start = null, length = null)
	{
		//region Initial variables
		const result = [];
		
		// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS
		if(start == null)
		{
			// noinspection AssignmentToFunctionParameterJS
			start = 0;
		}
		
		// noinspection NonBlockStatementBodyJS
		if(start > (this.buffer.byteLength - 1))
			return result;
		
		// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS
		if(length == null)
		{
			// noinspection AssignmentToFunctionParameterJS
			length = this.buffer.byteLength - start;
		}
		
		if(length > (this.buffer.byteLength - start))
		{
			// noinspection AssignmentToFunctionParameterJS
			length = this.buffer.byteLength - start;
		}
		
		let currentPositionLeft = 0;
		//endregion
		
		//region Find all "left patterns" as sorted array
		const leftPatterns = this.findAllIn(inputLeftPatterns, start, length);
		// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS, NonBlockStatementBodyJS, EqualityComparisonWithCoercionJS
		if(leftPatterns.length == 0)
			return result;
		//endregion
		
		//region Find all "right patterns" as sorted array
		const rightPatterns = this.findAllIn(inputRightPatterns, start, length);
		// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS, NonBlockStatementBodyJS, EqualityComparisonWithCoercionJS
		if(rightPatterns.length == 0)
			return result;
		//endregion
		
		//region Combine patterns
		while(currentPositionLeft < leftPatterns.length)
		{
			// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS, EqualityComparisonWithCoercionJS
			if(rightPatterns.length == 0)
			{
				// noinspection BreakStatementJS
				break;
			}
			
			// noinspection EqualityComparisonWithCoercionJS
			if(leftPatterns[0].position == rightPatterns[0].position)
			{
				// Possible situation when one pattern is a part of another
				// For example "stream" and "endstream"
				// In case when we have only "endstream" in fact "stream" will be also found at the same position
				// (position of the pattern is an index AFTER the pattern)
				
				result.push({
					left: leftPatterns[0],
					right: rightPatterns[0]
				});
				
				leftPatterns.splice(0, 1);
				rightPatterns.splice(0, 1);
				
				// noinspection ContinueStatementJS
				continue;
			}
			
			if(leftPatterns[currentPositionLeft].position > rightPatterns[0].position)
			{
				// noinspection BreakStatementJS
				break;
			}
			
			while(leftPatterns[currentPositionLeft].position < rightPatterns[0].position)
			{
				currentPositionLeft++;
				
				if(currentPositionLeft >= leftPatterns.length)
				{
					// noinspection BreakStatementJS
					break;
				}
			}
			
			result.push({
				left: leftPatterns[currentPositionLeft - 1],
				right: rightPatterns[0]
			});
			
			leftPatterns.splice(currentPositionLeft - 1, 1);
			rightPatterns.splice(0, 1);
			
			currentPositionLeft = 0;
		}
		//endregion
		
		//region Sort result
		result.sort((a, b) => (a.left.position - b.left.position));
		//endregion
		
		return result;
	}
	//**********************************************************************************
	// noinspection FunctionWithMultipleReturnPointsJS, FunctionTooLongJS
	/**
	 * Replace one patter with other
	 * @param {ByteStream} searchPattern The pattern to search for
	 * @param {ByteStream} replacePattern The pattern to replace initial pattern
	 * @param {?number} [start=null] Start position to search from
	 * @param {?number} [length=null] Length of byte block to search at
	 * @param {Array|null} [findAllResult=null] Pre-calculated results of "findAllIn"
	 * @returns {*}
	 */
	replacePattern(searchPattern, replacePattern, start = null, length = null, findAllResult = null)
	{
		//region Initial variables
		let result;
		
		let i;
		const output = {
			status: (-1),
			searchPatternPositions: [],
			replacePatternPositions: []
		};
		
		// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS
		if(start == null)
		{
			// noinspection AssignmentToFunctionParameterJS
			start = 0;
		}
		
		// noinspection NonBlockStatementBodyJS
		if(start > (this.buffer.byteLength - 1))
			return false;
		
		// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS
		if(length == null)
		{
			// noinspection AssignmentToFunctionParameterJS
			length = this.buffer.byteLength - start;
		}
		
		if(length > (this.buffer.byteLength - start))
		{
			// noinspection AssignmentToFunctionParameterJS
			length = this.buffer.byteLength - start;
		}
		//endregion
		
		//region Find a pattern to search for
		// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS, NonBlockStatementBodyJS
		if(findAllResult == null)
		{
			result = this.findAllIn([searchPattern], start, length);
			// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS, NonBlockStatementBodyJS, EqualityComparisonWithCoercionJS
			if(result.length == 0)
				return output;
		}
		else
			result = findAllResult;
		
		// noinspection NestedFunctionCallJS
		output.searchPatternPositions.push(...Array.from(result, element => element.position));
		//endregion
		
		//region Variables for new buffer initialization
		const patternDifference = searchPattern.buffer.byteLength - replacePattern.buffer.byteLength;
		
		const changedBuffer = new ArrayBuffer(this.view.length - (result.length * patternDifference));
		const changedView = new Uint8Array(changedBuffer);
		//endregion
		
		//region Copy data from 0 to start
		// noinspection NestedFunctionCallJS
		changedView.set(new Uint8Array(this.buffer, 0, start));
		//endregion
		
		//region Replace pattern
		for(i = 0; i < result.length; i++)
		{
			//region Initial variables
			// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS, ConditionalExpressionJS, EqualityComparisonWithCoercionJS
			const currentPosition = (i == 0) ? start : result[i - 1].position;
			//endregion
			
			//region Copy bytes other then search pattern
			// noinspection NestedFunctionCallJS
			changedView.set(new Uint8Array(this.buffer, currentPosition, result[i].position - searchPattern.buffer.byteLength - currentPosition), currentPosition - i * patternDifference);
			//endregion
			
			//region Put replace pattern in a new buffer
			changedView.set(replacePattern.view, result[i].position - searchPattern.buffer.byteLength - i * patternDifference);
			
			output.replacePatternPositions.push(result[i].position - searchPattern.buffer.byteLength - i * patternDifference);
			//endregion
		}
		//endregion
		
		//region Copy data from the end of old buffer
		i--;
		// noinspection NestedFunctionCallJS
		changedView.set(new Uint8Array(this.buffer, result[i].position, this.buffer.byteLength - result[i].position), result[i].position - searchPattern.buffer.byteLength + replacePattern.buffer.byteLength - i * patternDifference);
		//endregion
		
		//region Re-initialize existing buffer
		this.buffer = changedBuffer;
		this.view = new Uint8Array(this.buffer);
		//endregion
		
		output.status = 1;
		
		return output;
	}
	//**********************************************************************************
	// noinspection FunctionWithMultipleLoopsJS, FunctionWithMultipleReturnPointsJS, OverlyComplexFunctionJS, FunctionTooLongJS
	/**
	 * Skip any pattern from input array
	 * @param {Array.<ByteStream>} patterns Array with patterns which should be ommited
	 * @param {?number} [start=null] Start position to search from
	 * @param {?number} [length=null] Length of byte block to search at
	 * @param {boolean} [backward=false] Flag to search in backward order
	 * @returns {*}
	 */
	skipPatterns(patterns, start = null, length = null, backward = false)
	{
		//region Initial variables
		// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS
		if(start == null)
		{
			// noinspection AssignmentToFunctionParameterJS, ConditionalExpressionJS
			start = (backward) ? this.buffer.byteLength : 0;
		}
		
		if(start > this.buffer.byteLength)
		{
			// noinspection AssignmentToFunctionParameterJS
			start = this.buffer.byteLength;
		}
		
		if(backward)
		{
			// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS
			if(length == null)
			{
				// noinspection AssignmentToFunctionParameterJS
				length = start;
			}
			
			if(length > start)
			{
				// noinspection AssignmentToFunctionParameterJS
				length = start;
			}
		}
		else
		{
			// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS
			if(length == null)
			{
				// noinspection AssignmentToFunctionParameterJS
				length = this.buffer.byteLength - start;
			}
			
			if(length > (this.buffer.byteLength - start))
			{
				// noinspection AssignmentToFunctionParameterJS
				length = this.buffer.byteLength - start;
			}
		}
		
		let result = start;
		//endregion
		
		//region Search for pattern
		for(let k = 0; k < patterns.length; k++)
		{
			const patternLength = patterns[k].buffer.byteLength;
			// noinspection ConditionalExpressionJS
			const equalStart = (backward) ? (result - patternLength) : (result);
			let equal = true;
			
			for(let j = 0; j < patternLength; j++)
			{
				// noinspection EqualityComparisonWithCoercionJS
				if(this.view[j + equalStart] != patterns[k].view[j])
				{
					equal = false;
					// noinspection BreakStatementJS
					break;
				}
			}
			
			if(equal)
			{
				k = (-1);
				
				if(backward)
				{
					result -= patternLength;
					// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS, NonBlockStatementBodyJS
					if(result <= 0)
						return result;
				}
				else
				{
					result += patternLength;
					// noinspection NonBlockStatementBodyJS
					if(result >= (start + length))
						return result;
				}
			}
		}
		//endregion
		
		return result;
	}
	//**********************************************************************************
	// noinspection FunctionWithMultipleLoopsJS, OverlyComplexFunctionJS, FunctionTooLongJS
	/**
	 * Skip any pattern not from input array
	 * @param {Array.<ByteStream>} patterns Array with patterns which should not be ommited
	 * @param start
	 * @param length
	 * @param backward
	 * @returns {number}
	 */
	skipNotPatterns(patterns, start = null, length = null, backward = false)
	{
		//region Initial variables
		// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS
		if(start == null)
		{
			// noinspection AssignmentToFunctionParameterJS, ConditionalExpressionJS
			start = (backward) ? this.buffer.byteLength : 0;
		}
		
		if(start > this.buffer.byteLength)
		{
			// noinspection AssignmentToFunctionParameterJS
			start = this.buffer.byteLength;
		}
		
		if(backward)
		{
			// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS
			if(length == null)
			{
				// noinspection AssignmentToFunctionParameterJS
				length = start;
			}
			
			if(length > start)
			{
				// noinspection AssignmentToFunctionParameterJS
				length = start;
			}
		}
		else
		{
			// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS
			if(length == null)
			{
				// noinspection AssignmentToFunctionParameterJS
				length = this.buffer.byteLength - start;
			}
			
			if(length > (this.buffer.byteLength - start))
			{
				// noinspection AssignmentToFunctionParameterJS
				length = this.buffer.byteLength - start;
			}
		}
		
		let result = (-1);
		//endregion
		
		//region Search for pattern
		for(let i = 0; i < length; i++)
		{
			for(let k = 0; k < patterns.length; k++)
			{
				const patternLength = patterns[k].buffer.byteLength;
				// noinspection ConditionalExpressionJS
				const equalStart = (backward) ? (start - i - patternLength) : (start + i);
				let equal = true;
				
				for(let j = 0; j < patternLength; j++)
				{
					// noinspection EqualityComparisonWithCoercionJS
					if(this.view[j + equalStart] != patterns[k].view[j])
					{
						equal = false;
						// noinspection BreakStatementJS
						break;
					}
				}
				
				if(equal)
				{
					// noinspection ConditionalExpressionJS
					result = (backward) ? (start - i) : (start + i); // Exact position of pattern found
					// noinspection BreakStatementJS
					break;
				}
			}
			
			// noinspection EqualityComparisonWithCoercionJS
			if(result != (-1))
			{
				// noinspection BreakStatementJS
				break;
			}
		}
		//endregion
		
		return result;
	}
	//**********************************************************************************
}
//**************************************************************************************
class SeqStream 
{
	//**********************************************************************************
	/**
	 * Constructor for "SeqStream" class
	 * @param {{[stream]: ByteStream, [length]: number, [backward]: boolean, [start]: number, [appendBlock]: number}} parameters
	 */
	constructor(parameters = {})
	{
		/**
		 * Major stream
		 * @type {ByteStream}
		 */
		this.stream = new ByteStream();
		/**
		 * Length of the major stream
		 * @type {number}
		 */
		this._length = 0;
		/**
		 * Flag to search in backward direction
		 * @type {boolean}
		 */
		this.backward = false;
		/**
		 * Start position to search
		 * @type {number}
		 */
		this._start = 0;
		/**
		 * Length of a block when append information to major stream
		 * @type {number}
		 */
		this.appendBlock = 0;
		
		this.prevLength = 0;
		this.prevStart = 0;
		
		for(const key of Object.keys(parameters))
		{
			switch(key)
			{
				case "stream":
					this.stream = parameters.stream;
					break;
				case "backward":
					this.backward = parameters.backward;
					// noinspection JSUnusedGlobalSymbols
					this._start = this.stream.buffer.byteLength;
					break;
				case "length":
					// noinspection JSUnusedGlobalSymbols
					this._length = parameters.length;
					break;
				case "start":
					// noinspection JSUnusedGlobalSymbols
					this._start = parameters.start;
					break;
				case "appendBlock":
					this.appendBlock = parameters.appendBlock;
					break;
				case "view":
					this.stream = new ByteStream({ view: parameters.view});
					break;
				case "buffer":
					this.stream = new ByteStream({ buffer: parameters.buffer});
					break;
				case "string":
					this.stream = new ByteStream({ string: parameters.string});
					break;
				case "hexstring":
					this.stream = new ByteStream({ hexstring: parameters.hexstring});
					break;
				default:
			}
		}
	}
	//**********************************************************************************
	/**
	 * Setter for "stream" property
	 * @param {ByteStream} value
	 */
	set stream(value)
	{
		this._stream = value;
		
		this.prevLength = this._length;
		// noinspection JSUnusedGlobalSymbols
		this._length = value._buffer.byteLength;
		
		this.prevStart = this._start;
		// noinspection JSUnusedGlobalSymbols
		this._start = 0;
	}
	//**********************************************************************************
	/**
	 * Getter for "stream" property
	 * @returns {ByteStream}
	 */
	get stream()
	{
		return this._stream;
	}
	//**********************************************************************************
	/**
	 * Setter for "length" property
	 * @param {number} value
	 */
	set length(value)
	{
		this.prevLength = this._length;
		// noinspection JSUnusedGlobalSymbols
		this._length = value;
	}
	//**********************************************************************************
	// noinspection FunctionWithMultipleReturnPointsJS
	/**
	 * Getter for "length" property
	 * @returns {number}
	 */
	get length()
	{
		// noinspection NonBlockStatementBodyJS
		if(this.appendBlock)
			return this.start;
		
		return this._length;
	}
	//**********************************************************************************
	// noinspection FunctionWithMultipleReturnPointsJS
	/**
	 * Setter for "start" property
	 * @param {number} value
	 */
	set start(value)
	{
		// noinspection NonBlockStatementBodyJS
		if(value > this.stream.buffer.byteLength)
			return;
		
		//region Initialization of "prev" internal variables
		this.prevStart = this._start;
		this.prevLength = this._length;
		//endregion
		
		// noinspection JSUnusedGlobalSymbols, ConditionalExpressionJS
		this._length -= ((this.backward) ? (this._start - value) : (value - this._start));
		// noinspection JSUnusedGlobalSymbols
		this._start = value;
	}
	//**********************************************************************************
	/**
	 * Getter for "start" property
	 * @returns {number}
	 */
	get start()
	{
		return this._start;
	}
	//**********************************************************************************
	/**
	 * Return ArrayBuffer with having value of existing SeqStream length
	 * @return {ArrayBuffer}
	 */
	get buffer()
	{
		return this._stream._buffer.slice(0, this._length);
	}
	//**********************************************************************************
	// noinspection JSUnusedGlobalSymbols
	/**
	 * Reset current position of the "SeqStream"
	 */
	resetPosition()
	{
		// noinspection JSUnusedGlobalSymbols
		this._start = this.prevStart;
		// noinspection JSUnusedGlobalSymbols
		this._length = this.prevLength;
	}
	//**********************************************************************************
	// noinspection JSUnusedGlobalSymbols, FunctionWithMultipleReturnPointsJS
	/**
	 * Find any byte pattern in "ByteStream"
	 * @param {ByteStream} pattern Stream having pattern value
	 * @param {?number} [gap] Maximum gap between start position and position of nearest object
	 * @returns {number}
	 */
	findPattern(pattern, gap = null)
	{
		//region Initial variables
		// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS
		if((gap == null) || (gap > this.length))
		{
			// noinspection AssignmentToFunctionParameterJS
			gap = this.length;
		}
		//endregion
		
		//region Find pattern
		const result = this.stream.findPattern(pattern, this.start, this.length, this.backward);
		// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS, NonBlockStatementBodyJS, EqualityComparisonWithCoercionJS
		if(result == (-1))
			return result;
		
		if(this.backward)
		{
			// noinspection NonBlockStatementBodyJS
			if(result < (this.start - pattern.buffer.byteLength - gap))
				return (-1);
		}
		else
		{
			// noinspection NonBlockStatementBodyJS
			if(result > (this.start + pattern.buffer.byteLength + gap))
				return (-1);
		}
		//endregion
		
		//region Create new values
		this.start = result;
		//endregion ;
		
		return result;
	}
	//**********************************************************************************
	// noinspection JSUnusedGlobalSymbols, FunctionWithMultipleReturnPointsJS
	/**
	 * Find first position of any pattern from input array
	 * @param {Array.<ByteStream>} patterns Array with patterns which should be found
	 * @param {?number} [gap] Maximum gap between start position and position of nearest object
	 * @returns {{id: number, position: number}}
	 */
	findFirstIn(patterns, gap = null)
	{
		//region Initial variables
		// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS
		if((gap == null) || (gap > this.length))
		{
			// noinspection AssignmentToFunctionParameterJS
			gap = this.length;
		}
		//endregion
		
		//region Search for patterns
		const result = this.stream.findFirstIn(patterns, this.start, this.length, this.backward);
		// noinspection NonBlockStatementBodyJS, EqualityComparisonWithCoercionJS
		if(result.id == (-1))
			return result;
		
		if(this.backward)
		{
			if(result.position < (this.start - patterns[result.id].buffer.byteLength - gap))
			{
				// noinspection ConditionalExpressionJS
				return {
					id: (-1),
					position: (this.backward) ? 0 : (this.start + this.length)
				};
			}
		}
		else
		{
			if(result.position > (this.start + patterns[result.id].buffer.byteLength + gap))
			{
				// noinspection ConditionalExpressionJS
				return {
					id: (-1),
					position: (this.backward) ? 0 : (this.start + this.length)
				};
			}
		}
		//endregion
		
		//region Create new values
		this.start = result.position;
		//endregion ;
		
		return result;
	}
	//**********************************************************************************
	// noinspection JSUnusedGlobalSymbols
	/**
	 * Find all positions of any pattern from input array
	 * @param {Array.<ByteStream>} patterns Array with patterns which should be found
	 * @returns {Array}
	 */
	findAllIn(patterns)
	{
		// In case of "backward order" the start position is at the end on stream.
		// In case of "normal order" the start position is at the begging of the stream.
		// But in fact for search for all patterns we need to have start position in "normal order".
		// noinspection ConditionalExpressionJS
		const start = (this.backward) ? (this.start - this.length) : this.start;
		
		return this.stream.findAllIn(patterns, start, this.length);
	}
	//**********************************************************************************
	// noinspection JSUnusedGlobalSymbols, FunctionWithMultipleReturnPointsJS, OverlyComplexFunctionJS
	/**
	 * Find first position of data, not included in patterns from input array
	 * @param {Array.<ByteStream>} patterns Array with patterns which should be ommited
	 * @param {?number} gap Maximum gap between start position and position of nearest object
	 * @returns {*}
	 */
	findFirstNotIn(patterns, gap = null)
	{
		//region Initial variables
		// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS
		if((gap == null) || (gap > this._length))
		{
			// noinspection AssignmentToFunctionParameterJS
			gap = this._length;
		}
		//endregion
		
		//region Search for patterns
		const result = this._stream.findFirstNotIn(patterns, this._start, this._length, this.backward);
		// noinspection NonBlockStatementBodyJS, EqualityComparisonWithCoercionJS
		if((result.left.id == (-1)) && (result.right.id == (-1)))
			return result;
		
		if(this.backward)
		{
			// noinspection EqualityComparisonWithCoercionJS
			if(result.right.id != (-1))
			{
				if(result.right.position < (this._start - patterns[result.right.id]._buffer.byteLength - gap))
				{
					return {
						left: {
							id: (-1),
							position: this._start
						},
						right: {
							id: (-1),
							position: 0
						},
						value: new ByteStream()
					};
				}
			}
		}
		else
		{
			// noinspection EqualityComparisonWithCoercionJS
			if(result.left.id != (-1))
			{
				if(result.left.position > (this._start + patterns[result.left.id]._buffer.byteLength + gap))
				{
					return {
						left: {
							id: (-1),
							position: this._start
						},
						right: {
							id: (-1),
							position: 0
						},
						value: new ByteStream()
					};
				}
			}
		}
		//endregion
		
		//region Create new values
		if(this.backward)
		{
			// noinspection NonBlockStatementBodyJS, EqualityComparisonWithCoercionJS
			if(result.left.id == (-1))
				this.start = 0;
			else
				this.start = result.left.position;
		}
		else
		{
			// noinspection NonBlockStatementBodyJS, EqualityComparisonWithCoercionJS
			if(result.right.id == (-1))
				this.start = (this._start + this._length);
			else
				this.start = result.right.position;
		}
		//endregion ;
		
		return result;
	}
	//**********************************************************************************
	// noinspection JSUnusedGlobalSymbols
	/**
	 * Find all positions of data, not included in patterns from input array
	 * @param {Array.<ByteStream>} patterns Array with patterns which should be ommited
	 * @returns {Array}
	 */
	findAllNotIn(patterns)
	{
		// In case of "backward order" the start position is at the end on stream.
		// In case of "normal order" the start position is at the begging of the stream.
		// But in fact for search for all patterns we need to have start position in "normal order".
		// noinspection ConditionalExpressionJS
		const start = (this.backward) ? (this._start - this._length) : this._start;
		
		return this._stream.findAllNotIn(patterns, start, this._length);
	}
	//**********************************************************************************
	// noinspection JSUnusedGlobalSymbols, FunctionWithMultipleReturnPointsJS
	/**
	 * Find position of a sequence of any patterns from input array
	 * @param {Array.<ByteStream>} patterns Array with patterns which should be ommited
	 * @param {?number} [length] Length to search sequence for
	 * @param {?number} [gap] Maximum gap between start position and position of nearest object
	 * @returns {*}
	 */
	findFirstSequence(patterns, length = null, gap = null)
	{
		//region Initial variables
		// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS
		if((length == null) || (length > this._length))
		{
			// noinspection AssignmentToFunctionParameterJS
			length = this._length;
		}
		
		// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS
		if((gap == null) || (gap > length))
		{
			// noinspection AssignmentToFunctionParameterJS
			gap = length;
		}
		//endregion
		
		//region Search for sequence
		const result = this._stream.findFirstSequence(patterns, this._start, length, this.backward);
		// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS, NonBlockStatementBodyJS, EqualityComparisonWithCoercionJS
		if(result.value.buffer.byteLength == 0)
			return result;
		
		if(this.backward)
		{
			if(result.position < (this._start - result.value._buffer.byteLength - gap))
			{
				return {
					position: (-1),
					value: new ByteStream()
				};
			}
		}
		else
		{
			if(result.position > (this._start + result.value._buffer.byteLength + gap))
			{
				return {
					position: (-1),
					value: new ByteStream()
				};
			}
		}
		//endregion
		
		//region Create new values
		this.start = result.position;
		//endregion ;
		
		return result;
	}
	//**********************************************************************************
	// noinspection JSUnusedGlobalSymbols
	/**
	 * Find position of a sequence of any patterns from input array
	 * @param {Array.<ByteStream>} patterns Array with patterns which should be found
	 * @returns {Array}
	 */
	findAllSequences(patterns)
	{
		// In case of "backward order" the start position is at the end on stream.
		// In case of "normal order" the start position is at the begging of the stream.
		// But in fact for search for all patterns we need to have start position in "normal order".
		// noinspection ConditionalExpressionJS
		const start = (this.backward) ? (this.start - this.length) : this.start;
		
		return this.stream.findAllSequences(patterns, start, this.length);
	}
	//**********************************************************************************
	// noinspection JSUnusedGlobalSymbols, FunctionWithMultipleReturnPointsJS
	/**
	 * Find all paired patterns in the stream
	 * @param {ByteStream} leftPattern Left pattern to search for
	 * @param {ByteStream} rightPattern Right pattern to search for
	 * @param {?number} [gap] Maximum gap between start position and position of nearest object
	 * @returns {Array}
	 */
	findPairedPatterns(leftPattern, rightPattern, gap = null)
	{
		//region Initial variables
		// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS
		if((gap == null) || (gap > this.length))
		{
			// noinspection AssignmentToFunctionParameterJS
			gap = this.length;
		}
		//endregion
		
		// In case of "backward order" the start position is at the end on stream.
		// In case of "normal order" the start position is at the begging of the stream.
		// But in fact for search for all patterns we need to have start position in "normal order".
		// noinspection ConditionalExpressionJS
		const start = (this.backward) ? (this.start - this.length) : this.start;
		
		//region Search for patterns
		const result = this.stream.findPairedPatterns(leftPattern, rightPattern, start, this.length);
		if(result.length)
		{
			if(this.backward)
			{
				// noinspection NonBlockStatementBodyJS
				if(result[0].right < (this.start - rightPattern.buffer.byteLength - gap))
					return [];
			}
			else
			{
				// noinspection NonBlockStatementBodyJS
				if(result[0].left > (this.start + leftPattern.buffer.byteLength + gap))
					return [];
			}
		}
		//endregion
		
		return result;
	}
	//**********************************************************************************
	// noinspection JSUnusedGlobalSymbols, FunctionWithMultipleReturnPointsJS
	/**
	 * Find all paired patterns in the stream
	 * @param {Array.<ByteStream>} leftPatterns Array of left patterns to search for
	 * @param {Array.<ByteStream>} rightPatterns Array of right patterns to search for
	 * @param {?number} [gap] Maximum gap between start position and position of nearest object
	 * @returns {Array}
	 */
	findPairedArrays(leftPatterns, rightPatterns, gap = null)
	{
		//region Initial variables
		// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS
		if((gap == null) || (gap > this.length))
		{
			// noinspection AssignmentToFunctionParameterJS
			gap = this.length;
		}
		//endregion
		
		// In case of "backward order" the start position is at the end on stream.
		// In case of "normal order" the start position is at the begging of the stream.
		// But in fact for search for all patterns we need to have start position in "normal order".
		// noinspection ConditionalExpressionJS
		const start = (this.backward) ? (this.start - this.length) : this.start;
		
		//region Search for patterns
		const result = this.stream.findPairedArrays(leftPatterns, rightPatterns, start, this.length);
		if(result.length)
		{
			if(this.backward)
			{
				// noinspection NonBlockStatementBodyJS
				if(result[0].right.position < (this.start - rightPatterns[result[0].right.id].buffer.byteLength - gap))
					return [];
			}
			else
			{
				// noinspection NonBlockStatementBodyJS
				if(result[0].left.position > (this.start + leftPatterns[result[0].left.id].buffer.byteLength + gap))
					return [];
			}
		}
		//endregion
		
		return result;
	}
	//**********************************************************************************
	// noinspection JSUnusedGlobalSymbols
	/**
	 * Replace one patter with other
	 * @param {ByteStream} searchPattern The pattern to search for
	 * @param {ByteStream} replacePattern The pattern to replace initial pattern
	 * @returns {*}
	 */
	replacePattern(searchPattern, replacePattern)
	{
		// In case of "backward order" the start position is at the end on stream.
		// In case of "normal order" the start position is at the begging of the stream.
		// But in fact for search for all patterns we need to have start position in "normal order".
		// noinspection ConditionalExpressionJS
		const start = (this.backward) ? (this.start - this.length) : this.start;
		
		return this.stream.replacePattern(searchPattern, replacePattern, start, this.length);
	}
	//**********************************************************************************
	// noinspection JSUnusedGlobalSymbols
	/**
	 * Skip of any pattern from input array
	 * @param {Array.<ByteStream>} patterns Array with patterns which should be ommited
	 * @returns {*}
	 */
	skipPatterns(patterns)
	{
		const result = this.stream.skipPatterns(patterns, this.start, this.length, this.backward);
		
		//region Create new values
		this.start = result;
		//endregion ;
		
		return result;
	}
	//**********************************************************************************
	// noinspection JSUnusedGlobalSymbols, FunctionWithMultipleReturnPointsJS
	/**
	 * Skip of any pattern from input array
	 * @param {Array.<ByteStream>} patterns Array with patterns which should be ommited
	 * @returns {number}
	 */
	skipNotPatterns(patterns)
	{
		const result = this.stream.skipNotPatterns(patterns, this.start, this.length, this.backward);
		// noinspection NonBlockStatementBodyJS, EqualityComparisonWithCoercionJS
		if(result == (-1))
			return (-1);
		
		//region Create new values
		this.start = result;
		//endregion ;
		
		return result;
	}
	//**********************************************************************************
	// noinspection JSUnusedGlobalSymbols
	/**
	 * Append a new "Stream" content to the current "Stream"
	 * @param {ByteStream} stream A new "stream" to append to current "stream"
	 */
	append(stream)
	{
		if((this._start + stream._buffer.byteLength) > this._stream._buffer.byteLength)
		{
			if(stream._buffer.byteLength > this.appendBlock)
			{
				// noinspection MagicNumberJS
				this.appendBlock = (stream._buffer.byteLength + 1000);
			}
			
			this._stream.realloc(this._stream._buffer.byteLength + this.appendBlock);
		}
		
		this._stream._view.set(stream._view, this._start);
		
		this._length += (stream._buffer.byteLength * 2);
		this.start = (this._start + stream._buffer.byteLength);
		this.prevLength -= (stream._buffer.byteLength * 2);
	}
	//**********************************************************************************
	// noinspection JSUnusedGlobalSymbols
	/**
	 * Append a "view" content to the current "Stream"
	 * @param {Uint8Array} view A new "view" to append to current "stream"
	 */
	appendView(view)
	{
		if((this._start + view.length) > this._stream._buffer.byteLength)
		{
			if(view.length > this.appendBlock)
			{
				// noinspection MagicNumberJS
				this.appendBlock = (view.length + 1000);
			}
			
			this._stream.realloc(this._stream._buffer.byteLength + this.appendBlock);
		}
		
		this._stream._view.set(view, this._start);
		
		this._length += (view.length * 2);
		this.start = (this._start + view.length);
		this.prevLength -= (view.length * 2);
	}
	//**********************************************************************************
	// noinspection JSUnusedGlobalSymbols
	/**
	 * Append a new char to the current "Stream"
	 * @param {number} char A new char to append to current "stream"
	 */
	appendChar(char)
	{
		if((this._start + 1) > this._stream._buffer.byteLength)
		{
			// noinspection ConstantOnLefSideOfComparisonJS
			if(1 > this.appendBlock)
			{
				// noinspection MagicNumberJS
				this.appendBlock = 1000;
			}
			
			this._stream.realloc(this._stream._buffer.byteLength + this.appendBlock);
		}
		
		this._stream._view[this._start] = char;
		
		this._length += 2;
		this.start = (this._start + 1);
		this.prevLength -= 2;
	}
	//**********************************************************************************
	// noinspection FunctionNamingConventionJS
	/**
	 * Append a new number to the current "Stream"
	 * @param {number} number A new unsigned 16-bit integer to append to current "stream"
	 */
	appendUint16(number)
	{
		if((this._start + 2) > this._stream._buffer.byteLength)
		{
			// noinspection ConstantOnLefSideOfComparisonJS
			if(2 > this.appendBlock)
			{
				// noinspection MagicNumberJS
				this.appendBlock = 1000;
			}
			
			this._stream.realloc(this._stream._buffer.byteLength + this.appendBlock);
		}
		
		const value = new Uint16Array([number]);
		const view = new Uint8Array(value.buffer);
		
		this._stream._view[this._start] = view[1];
		this._stream._view[this._start + 1] = view[0];
		
		this._length += 4;
		this.start = (this._start + 2);
		this.prevLength -= 4;
	}
	//**********************************************************************************
	// noinspection FunctionNamingConventionJS
	/**
	 * Append a new number to the current "Stream"
	 * @param {number} number A new unsigned 24-bit integer to append to current "stream"
	 */
	appendUint24(number)
	{
		if((this._start + 3) > this._stream._buffer.byteLength)
		{
			// noinspection ConstantOnLefSideOfComparisonJS
			if(3 > this.appendBlock)
			{
				// noinspection MagicNumberJS
				this.appendBlock = 1000;
			}
			
			this._stream.realloc(this._stream._buffer.byteLength + this.appendBlock);
		}
		
		const value = new Uint32Array([number]);
		const view = new Uint8Array(value.buffer);
		
		this._stream._view[this._start] = view[2];
		this._stream._view[this._start + 1] = view[1];
		this._stream._view[this._start + 2] = view[0];
		
		this._length += 6;
		this.start = (this._start + 3);
		this.prevLength -= 6;
	}
	//**********************************************************************************
	// noinspection FunctionNamingConventionJS
	/**
	 * Append a new number to the current "Stream"
	 * @param {number} number A new unsigned 32-bit integer to append to current "stream"
	 */
	appendUint32(number)
	{
		if((this._start + 4) > this._stream._buffer.byteLength)
		{
			// noinspection ConstantOnLefSideOfComparisonJS
			if(4 > this.appendBlock)
			{
				// noinspection MagicNumberJS
				this.appendBlock = 1000;
			}
			
			this._stream.realloc(this._stream._buffer.byteLength + this.appendBlock);
		}
		
		const value = new Uint32Array([number]);
		const view = new Uint8Array(value.buffer);
		
		this._stream._view[this._start] = view[3];
		this._stream._view[this._start + 1] = view[2];
		this._stream._view[this._start + 2] = view[1];
		this._stream._view[this._start + 3] = view[0];
		
		this._length += 8;
		this.start = (this._start + 4);
		this.prevLength -= 8;
	}
	//**********************************************************************************
	// noinspection FunctionWithMultipleReturnPointsJS
	/**
	 * Get a block of data
	 * @param {number} size Size of the data block to get
	 * @param {boolean} [changeLength=true] Should we change "length" and "start" value after reading the data block
	 * @returns {Array}
	 */
	getBlock(size, changeLength = true)
	{
		//region Check input parameters
		// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS, NonBlockStatementBodyJS
		if(this._length <= 0)
			return [];
		
		if(this._length < size)
		{
			// noinspection AssignmentToFunctionParameterJS
			size = this._length;
		}
		//endregion
		
		//region Initial variables
		let result;
		//endregion
		
		//region Getting result depends on "backward" flag
		if(this.backward)
		{
			const buffer = this._stream._buffer.slice(this._length - size, this._length);
			const view = new Uint8Array(buffer);
			
			result = new Array(size);
			
			// noinspection NonBlockStatementBodyJS
			for(let i = 0; i < size; i++)
				result[size - 1 - i] = view[i];
		}
		else
		{
			const buffer = this._stream._buffer.slice(this._start, this._start + size);
			
			// noinspection NestedFunctionCallJS
			result = Array.from(new Uint8Array(buffer));
		}
		//endregion
		
		//region Change "length" value if needed
		if(changeLength)
		{
			// noinspection ConditionalExpressionJS
			this.start += ((this.backward) ? ((-1) * size) : size);
		}
		//endregion
		
		return result;
	}
	//**********************************************************************************
	// noinspection JSUnusedGlobalSymbols, FunctionWithMultipleReturnPointsJS, FunctionNamingConventionJS
	/**
	 * Get 2-byte unsigned integer value
	 * @param {boolean} [changeLength=true] Should we change "length" and "start" value after reading the data block
	 * @returns {number}
	 */
	getUint16(changeLength = true)
	{
		const block = this.getBlock(2, changeLength);
		
		//region Check posibility for convertion
		// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS, NonBlockStatementBodyJS
		if(block.length < 2)
			return 0;
		//endregion
		
		//region Convert byte array to "Uint16Array" value
		const value = new Uint16Array(1);
		const view = new Uint8Array(value.buffer);
		
		view[0] = block[1];
		view[1] = block[0];
		//endregion
		
		return value[0];
	}
	//**********************************************************************************
	// noinspection JSUnusedGlobalSymbols, FunctionWithMultipleReturnPointsJS, FunctionNamingConventionJS
	/**
	 * Get 2-byte signed integer value
	 * @param {boolean} [changeLength=true] Should we change "length" and "start" value after reading the data block
	 * @returns {number}
	 */
	getInt16(changeLength = true)
	{
		const block = this.getBlock(2, changeLength);

		//region Check posibility for convertion
		// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS, NonBlockStatementBodyJS
		if(block.length < 2)
			return 0;
		//endregion

		//region Convert byte array to "Int16Array" value
		const value = new Int16Array(1);
		const view = new Uint8Array(value.buffer);

		view[0] = block[1];
		view[1] = block[0];
		//endregion

		return value[0];
	}
	//**********************************************************************************
	// noinspection JSUnusedGlobalSymbols, FunctionWithMultipleReturnPointsJS, FunctionNamingConventionJS
	/**
	 * Get 3-byte unsigned integer value
	 * @param {boolean} [changeLength=true] Should we change "length" and "start" value after reading the data block
	 * @returns {number}
	 */
	getUint24(changeLength = true)
	{
		const block = this.getBlock(3, changeLength);
		
		//region Check posibility for convertion
		// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS, NonBlockStatementBodyJS
		if(block.length < 3)
			return 0;
		//endregion
		
		//region Convert byte array to "Uint32Array" value
		const value = new Uint32Array(1);
		const view = new Uint8Array(value.buffer);
		
		// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS, NonBlockStatementBodyJS
		for(let i = 3; i >= 1; i--)
			view[3 - i] = block[i - 1];
		//endregion
		
		return value[0];
	}
	//**********************************************************************************
	// noinspection JSUnusedGlobalSymbols, FunctionWithMultipleReturnPointsJS, FunctionNamingConventionJS
	/**
	 * Get 4-byte unsigned integer value
	 * @param {boolean} [changeLength=true] Should we change "length" and "start" value after reading the data block
	 * @returns {number}
	 */
	getUint32(changeLength = true)
	{
		const block = this.getBlock(4, changeLength);
		
		//region Check posibility for convertion
		// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS, NonBlockStatementBodyJS
		if(block.length < 4)
			return 0;
		//endregion
		
		//region Convert byte array to "Uint32Array" value
		const value = new Uint32Array(1);
		const view = new Uint8Array(value.buffer);
		
		// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS, NonBlockStatementBodyJS
		for(let i = 3; i >= 0; i--)
			view[3 - i] = block[i];
		//endregion
		
		return value[0];
	}
	//**********************************************************************************
	/**
	 * Get 4-byte signed integer value
	 * @param {boolean} [changeLength=true] Should we change "length" and "start" value after reading the data block
	 * @returns {number}
	 */
	getInt32(changeLength = true)
	{
		const block = this.getBlock(4, changeLength);

		//region Check posibility for convertion
		// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS, NonBlockStatementBodyJS
		if(block.length < 4)
			return 0;
		//endregion

		//region Convert byte array to "Int32Array" value
		const value = new Int32Array(1);
		const view = new Uint8Array(value.buffer);

		// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS, NonBlockStatementBodyJS
		for(let i = 3; i >= 0; i--)
			view[3 - i] = block[i];
		//endregion

		return value[0];
	}
	//**********************************************************************************
}
//**************************************************************************************
// noinspection FunctionWithMultipleLoopsJS, FunctionWithMultipleReturnPointsJS, OverlyComplexFunctionJS, FunctionTooLongJS
/**
 * Get parsed values from "byte map"
 * @param {ByteStream} stream Stream to parse data from
 * @param {Object} map Object with information how to parse "byte map"
 * @param {number} elements Number of elements in parsing byte map
 * @param {?number} [start=null] Start position to parse from
 * @param {?number} [length=null] Length of byte block to parse from
 * @returns {*}
 */
function parseByteMap(stream, map, elements, start = null, length = null)
{
	/*
	 Map example:
	 
	 let map = [
	 {
	 type: "string",
	 name: "type",
	 minlength: 1,
	 maxlength: 1,
	 func: function(array)
	 {
	 let result = {
	 status: (-1),
	 length: 1
	 };
	 
	 switch(array[0])
	 {
	 case 0x6E: // "n"
	 result.value = "n";
	 break;
	 case 0x66: // "f"
	 result.value = "f";
	 break;
	 default:
	 return result;
	 }
	 
	 result.status = 1;
	 
	 return result;
	 }
	 },
	 {
	 type: "check",
	 minlength: 1,
	 maxlength: 2,
	 func: function(array)
	 {
	 let position = (-1);
	 
	 if(array[0] == 0x0A)
	 position = 1;
	 if(array[1] == 0x0A)
	 position = 2;
	 
	 return {
	 status: (position > 0) ? 1 : (-1),
	 length: position
	 };
	 }
	 }
	 ];
	 */
	
	//region Initial variables
	// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS
	if(start === null)
	{
		// noinspection AssignmentToFunctionParameterJS
		start = 0;
	}
	
	// noinspection NonBlockStatementBodyJS
	if(start > (stream.buffer.byteLength - 1))
		return false;
	
	// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS
	if(length === null)
	{
		// noinspection AssignmentToFunctionParameterJS
		length = stream.buffer.byteLength - start;
	}
	
	if(length > (stream.buffer.byteLength - start))
	{
		// noinspection AssignmentToFunctionParameterJS
		length = stream.buffer.byteLength - start;
	}
	
	let dataView;
	
	// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS, EqualityComparisonWithCoercionJS, NonBlockStatementBodyJS
	if((start == 0) && (length == stream.buffer.byteLength))
		dataView = stream.view;
	else
		dataView = new Uint8Array(stream.buffer, start, length);
	
	const resultArray = new Array(elements);
	let elementsCount = 0;
	
	let count = 0;
	const mapLength = map.length;
	//endregion
	
	//region Parse all byte, structure by structure
	while(count < length)
	{
		let structureLength = 0;
		
		resultArray[elementsCount] = {};
		
		for(let i = 0; i < mapLength; i++)
		{
			// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS, JSUnresolvedVariable, EqualityComparisonWithCoercionJS
			if(map[i].maxlength == 0)
			{
				// noinspection NonBlockStatementBodyJS
				if("defaultValue" in map[i])
					(resultArray[elementsCount])[map[i].name] = map[i].defaultValue;
				
				// noinspection ContinueStatementJS
				continue;
			}
			
			// noinspection JSUnresolvedVariable
			const array = new Array(map[i].maxlength);
			
			// noinspection JSUnresolvedVariable
			for(let j = 0; j < map[i].maxlength; j++)
			{
				// noinspection IncrementDecrementResultUsedJS
				array[j] = dataView[count++];
			}
			
			// noinspection JSUnresolvedVariable
			const result = (map[i].func)(array);
			// noinspection EqualityComparisonWithCoercionJS, NonBlockStatementBodyJS
			if(result.status == (-1))
			{
				// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS, NonBlockStatementBodyJS, EqualityComparisonWithCoercionJS
				if(resultArray.length == 1)
					return [];

				return resultArray.slice(0, resultArray.length - 1);
			}
			
			// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS, EqualityComparisonWithCoercionJS, NonBlockStatementBodyJS
			if(map[i].type != "check")
				(resultArray[elementsCount])[map[i].name] = result.value;
			
			// noinspection JSUnresolvedVariable
			count -= (map[i].maxlength - result.length);
			structureLength += result.length;
		}
		
		// noinspection IncrementDecrementResultUsedJS
		(resultArray[elementsCount++]).structureLength = structureLength;
	}
	//endregion
	
	return resultArray;
}
//**************************************************************************************
//region "Bits-to-string" array
const bitsToStringArray = [
	"00000000", "00000001", "00000010",
	"00000011", "00000100", "00000101",
	"00000110", "00000111", "00001000",
	"00001001", "00001010", "00001011",
	"00001100", "00001101", "00001110",
	"00001111", "00010000", "00010001",
	"00010010", "00010011", "00010100",
	"00010101", "00010110", "00010111",
	"00011000", "00011001", "00011010",
	"00011011", "00011100", "00011101",
	"00011110", "00011111", "00100000",
	"00100001", "00100010", "00100011",
	"00100100", "00100101", "00100110",
	"00100111", "00101000", "00101001",
	"00101010", "00101011", "00101100",
	"00101101", "00101110", "00101111",
	"00110000", "00110001", "00110010",
	"00110011", "00110100", "00110101",
	"00110110", "00110111", "00111000",
	"00111001", "00111010", "00111011",
	"00111100", "00111101", "00111110",
	"00111111", "01000000", "01000001",
	"01000010", "01000011", "01000100",
	"01000101", "01000110", "01000111",
	"01001000", "01001001", "01001010",
	"01001011", "01001100", "01001101",
	"01001110", "01001111", "01010000",
	"01010001", "01010010", "01010011",
	"01010100", "01010101", "01010110",
	"01010111", "01011000", "01011001",
	"01011010", "01011011", "01011100",
	"01011101", "01011110", "01011111",
	"01100000", "01100001", "01100010",
	"01100011", "01100100", "01100101",
	"01100110", "01100111", "01101000",
	"01101001", "01101010", "01101011",
	"01101100", "01101101", "01101110",
	"01101111", "01110000", "01110001",
	"01110010", "01110011", "01110100",
	"01110101", "01110110", "01110111",
	"01111000", "01111001", "01111010",
	"01111011", "01111100", "01111101",
	"01111110", "01111111", "10000000",
	"10000001", "10000010", "10000011",
	"10000100", "10000101", "10000110",
	"10000111", "10001000", "10001001",
	"10001010", "10001011", "10001100",
	"10001101", "10001110", "10001111",
	"10010000", "10010001", "10010010",
	"10010011", "10010100", "10010101",
	"10010110", "10010111", "10011000",
	"10011001", "10011010", "10011011",
	"10011100", "10011101", "10011110",
	"10011111", "10100000", "10100001",
	"10100010", "10100011", "10100100",
	"10100101", "10100110", "10100111",
	"10101000", "10101001", "10101010",
	"10101011", "10101100", "10101101",
	"10101110", "10101111", "10110000",
	"10110001", "10110010", "10110011",
	"10110100", "10110101", "10110110",
	"10110111", "10111000", "10111001",
	"10111010", "10111011", "10111100",
	"10111101", "10111110", "10111111",
	"11000000", "11000001", "11000010",
	"11000011", "11000100", "11000101",
	"11000110", "11000111", "11001000",
	"11001001", "11001010", "11001011",
	"11001100", "11001101", "11001110",
	"11001111", "11010000", "11010001",
	"11010010", "11010011", "11010100",
	"11010101", "11010110", "11010111",
	"11011000", "11011001", "11011010",
	"11011011", "11011100", "11011101",
	"11011110", "11011111", "11100000",
	"11100001", "11100010", "11100011",
	"11100100", "11100101", "11100110",
	"11100111", "11101000", "11101001",
	"11101010", "11101011", "11101100",
	"11101101", "11101110", "11101111",
	"11110000", "11110001", "11110010",
	"11110011", "11110100", "11110101",
	"11110110", "11110111", "11111000",
	"11111001", "11111010", "11111011",
	"11111100", "11111101", "11111110",
	"11111111"
];
//endregion
//**************************************************************************************
class BitStream
{
	//**********************************************************************************
	/**
	 * Constructor for "BitStream" class
	 * @param {{[byteStream]: ByteStream, [view]: Uint8Array, [buffer]: ArrayBuffer, [string]: string, [bitsCount]: number}} parameters
	 */
	constructor(parameters = {})
	{
		this.buffer = new ArrayBuffer(0);
		this.view = new Uint8Array(this.buffer);
		
		this.bitsCount = 0; // Number of bits stored in current "BitStream"
		
		for(const key of Object.keys(parameters))
		{
			switch(key)
			{
				case "byteStream":
					this.fromByteStream(parameters.byteStream);
					break;
				case "view":
					this.fromUint8Array(parameters.view);
					break;
				case "buffer":
					this.fromArrayBuffer(parameters.buffer);
					break;
				case "string":
					this.fromString(parameters.string);
					break;
				case "uint32":
					this.fromUint32(parameters.uint32);
					break;
				case "bitsCount":
					this.bitsCount = parameters.bitsCount;
					break;
				default:
			}
		}
	}
	//**********************************************************************************
	/**
	 * Clear existing stream
	 */
	clear()
	{
		this.buffer = new ArrayBuffer(0);
		this.view = new Uint8Array(this.buffer);
		
		this.bitsCount = 0;
	}
	//**********************************************************************************
	/**
	 * Initialize "BitStream" by data from existing "ByteStream"
	 * @param {ByteStream} stream
	 */
	fromByteStream(stream)
	{
		this.buffer = stream.buffer.slice(0);
		this.view = new Uint8Array(this.buffer);
		
		this.bitsCount = this.view.length << 3;
	}
	//**********************************************************************************
	/**
	 * Initialize "BitStream" object from existing "ArrayBuffer"
	 * @param {ArrayBuffer} array The ArrayBuffer to copy from
	 */
	fromArrayBuffer(array)
	{
		this.buffer = array.slice(0);
		this.view = new Uint8Array(this.buffer);
		
		this.bitsCount = this.view.length << 3;
	}
	//**********************************************************************************
	// noinspection FunctionNamingConventionJS
	/**
	 * Initialize "BitStream" object from existing "Uint8Array"
	 * @param {Uint8Array} array The Uint8Array to copy from
	 */
	fromUint8Array(array)
	{
		this.buffer = new ArrayBuffer(array.length);
		this.view = new Uint8Array(this.buffer);
		
		this.view.set(array);
		
		this.bitsCount = this.view.length << 3;
	}
	//**********************************************************************************
	/**
	 * Initialize "BitStream" object from existing bit string
	 * @param {string} string The string to initialize from
	 */
	fromString(string)
	{
		//region Initial variables
		const stringLength = string.length;
		
		// noinspection ConditionalExpressionJS
		this.buffer = new ArrayBuffer((stringLength >> 3) + ((stringLength % 8) ? 1 : 0));
		this.view = new Uint8Array(this.buffer);
		
		this.bitsCount = ((stringLength >> 3) + 1) << 3; // In order to handle correct shifting
		
		let byteIndex = 0;
		//endregion
		
		//region Convert from "bit string" to bytes
		for(let i = 0; i < stringLength; i++)
		{
			// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS, EqualityComparisonWithCoercionJS, NonBlockStatementBodyJS
			if(string[i] == "1")
				this.view[byteIndex] |= 1 << (7 - (i % 8));
			
			// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS, EqualityComparisonWithCoercionJS, NonBlockStatementBodyJS
			if(i && (((i + 1) % 8) == 0))
				byteIndex++;
		}
		//endregion
		
		//region Shift "BitStream" into correct position
		// noinspection NonBlockStatementBodyJS
		if(stringLength % 8)
			this.shiftRight(8 - (stringLength % 8));
		//endregion
		
		//region Change "bitsCount"
		this.bitsCount = stringLength;
		//endregion
	}
	//**********************************************************************************
	/**
	 * Initialize "BitStream" object from existing uint32 number
	 * @param {Number} number The string to initialize from
	 */
	fromUint32(uint32)
	{
		this.buffer = new ArrayBuffer(4);
		this.view = new Uint8Array(this.buffer);

		const value = new Uint32Array([uint32]);
		const view = new Uint8Array(value.buffer);
		
		for(let i = 3; i >= 0; i--)
			this.view[i] = view[3 - i];

		this.bitsCount = 32;
	}
	//**********************************************************************************
	/**
	 * Represent "BitStream" object content as a string
	 * @param {?number} [start=null] Start number to convert to string from
	 * @param {?number} [length=null] Length of BitStream to convert to string
	 * @returns {string}
	 */
	toString(start = null, length = null)
	{
		//region Check input parameters
		// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS
		if(start == null)
		{
			// noinspection AssignmentToFunctionParameterJS
			start = 0;
		}
		
		// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS
		if((start >= this.view.length) || (start < 0))
		{
			// noinspection AssignmentToFunctionParameterJS
			start = 0;
		}
		
		// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS
		if(length == null)
		{
			// noinspection AssignmentToFunctionParameterJS
			length = this.view.length - start;
		}
		
		// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS
		if((length >= this.view.length) || (length < 0))
		{
			// noinspection AssignmentToFunctionParameterJS
			length = this.view.length - start;
		}
		//endregion
		
		//region Initial variables
		const result = [];
		//endregion
		
		//region Convert from bytes to "bit string"
		// noinspection NonBlockStatementBodyJS
		for(let i = start; i < (start + length); i++)
			result.push(bitsToStringArray[this.view[i]]);
		//endregion
		
		// noinspection ChainedFunctionCallJS
		return result.join("").slice((this.view.length << 3) - this.bitsCount);
	}
	//**********************************************************************************
	// noinspection FunctionWithMultipleReturnPointsJS
	/**
	 * Shift entire "BitStream" value right to number of bits
	 * @param {number} shift Number of bits to shift value
	 * @param {boolean} [needShrink=true] Need to shrink result or not
	 */
	shiftRight(shift, needShrink = true)
	{
		//region Check parameters
		// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS, EqualityComparisonWithCoercionJS, NonBlockStatementBodyJS
		if(this.view.length == 0)
			return;
		
		// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS, NonBlockStatementBodyJS
		if((shift < 0) || (shift > 8))
			throw new Error("The \"shift\" parameter must be in range 0-8");
		
		// noinspection NonBlockStatementBodyJS
		if(shift > this.bitsCount)
			throw new Error("The \"shift\" parameter can not be bigger than \"this.bitsCount\"");
		//endregion
		
		//region Initial variables
		// noinspection MagicNumberJS
		const shiftMask = 0xFF >> (8 - shift);
		this.view[this.view.length - 1] >>= shift;
		//endregion
		
		//region Shift value
		// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS
		for(let i = (this.view.length - 2); i >= 0; i--)
		{
			// noinspection NonShortCircuitBooleanExpressionJS
			this.view[i + 1] |= (this.view[i] & shiftMask) << (8 - shift);
			this.view[i] >>= shift;
		}
		//endregion
		
		//region Decrease number of bits stored into value
		this.bitsCount -= shift;
		// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS, EqualityComparisonWithCoercionJS, NonBlockStatementBodyJS
		if(this.bitsCount == 0)
			this.clear();
		//endregion
		
		//region Change stream size if needed
		// noinspection NonBlockStatementBodyJS
		if(needShrink)
			this.shrink();
		//endregion
	}
	//**********************************************************************************
	// noinspection JSUnusedGlobalSymbols, FunctionWithMultipleReturnPointsJS
	/**
	 * Shift entire "BitStream" value left to number of bits
	 * @param {number} shift Number of bits to shift value
	 */
	shiftLeft(shift)
	{
		/*
		 NOTE: We do not really shift value because of internal structure of "BitStream":
		 all bytes inside "BitStream" are aligned to right position. So, even if we will
		 really shift value to left after that we will need again shift it right to the
		 same number of bits. Thus all that we do here is hiding of left bits and descresing
		 the "bitsCount" number.
		 */
		
		//region Check parameters
		// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS, EqualityComparisonWithCoercionJS, NonBlockStatementBodyJS
		if(this.view.length == 0)
			return;
		
		// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS, NonBlockStatementBodyJS
		if((shift < 0) || (shift > 8))
			throw new Error("The \"shift\" parameter must be in range 0-8");
		
		// noinspection NonBlockStatementBodyJS
		if(shift > this.bitsCount)
			throw new Error("The \"shift\" parameter can not be bigger than \"this.bitsCount\"");
		//endregion
		
		//region Remove shifted bits
		// noinspection MagicNumberJS, NonShortCircuitBooleanExpressionJS
		const bitsOffset = this.bitsCount & 0x07;
		if(bitsOffset > shift)
		{
			// noinspection MagicNumberJS
			this.view[0] &= 0xFF >> (bitsOffset + shift);
		}
		else
		{
			//region Change size of buffer
			const buffer = new ArrayBuffer(this.buffer.byteLength - 1);
			const view = new Uint8Array(buffer);
			
			// noinspection NestedFunctionCallJS
			view.set(new Uint8Array(this.buffer, 1, this.buffer.byteLength - 1));
			//endregion
			
			//region Mask item with index 0
			// noinspection MagicNumberJS
			view[0] &= 0xFF >> (shift - bitsOffset);
			//endregion
			
			//region Store final array into current stream
			this.buffer = buffer.slice(0);
			this.view = new Uint8Array(this.buffer);
			//endregion
		}
		//endregion
		
		//region Decrease number of bits stored into value
		this.bitsCount -= shift;
		// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS, EqualityComparisonWithCoercionJS, NonBlockStatementBodyJS
		if(this.bitsCount == 0)
			this.clear();
		//endregion
	}
	//**********************************************************************************
	// noinspection FunctionWithMultipleReturnPointsJS, FunctionTooLongJS
	/**
	 * Return slice of existing "BitStream"
	 * @param {?number} [start=null] Start position of the slice (in bits)
	 * @param {?number} [end=null] End position of the slice (in bits)
	 * @returns {BitStream}
	 */
	slice(start = null, end = null)
	{
		//region Make ability to pass non-value bits
		let valueShift = 0;
		// noinspection NonBlockStatementBodyJS
		if(this.bitsCount % 8)
			valueShift = (8 - (this.bitsCount % 8));
		
		// noinspection AssignmentToFunctionParameterJS
		start += valueShift;
		// noinspection AssignmentToFunctionParameterJS
		end += valueShift;
		//endregion
		
		//region Initial variables
		// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS
		if(start == null)
		{
			// noinspection AssignmentToFunctionParameterJS
			start = 0;
		}
		
		// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS, NonBlockStatementBodyJS
		if((start < 0) || (start > ((this.view.length << 3) - 1)))
			return new BitStream(); //("Wrong start position: " + start);
		
		// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS
		if(end == null)
		{
			// noinspection AssignmentToFunctionParameterJS
			end = (this.view.length << 3) - 1;
		}
		
		// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS, NonBlockStatementBodyJS
		if((end < 0) || (end > ((this.view.length << 3) - 1)))
			return new BitStream(); //("Wrong end position: " + end);
		
		// noinspection NonBlockStatementBodyJS
		if((end - start + 1) > this.bitsCount)
			return new BitStream(); //("Maximum length is " + this.bitsCount);
		
		const startIndex = start >> 3;
		// noinspection MagicNumberJS, NonShortCircuitBooleanExpressionJS
		const startOffset = start & 0x07;
		
		const endIndex = end >> 3;
		// noinspection MagicNumberJS, NonShortCircuitBooleanExpressionJS
		const endOffset = end & 0x07;
		
		// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS, ConditionalExpressionJS, EqualityComparisonWithCoercionJS
		const bitsLength = ((endIndex - startIndex) == 0) ? 1 : (endIndex - startIndex + 1);
		
		const result = new BitStream();
		//endregion
		
		//region Store "primary bytes"
		result.buffer = new ArrayBuffer(bitsLength);
		result.view = new Uint8Array(result.buffer);
		result.bitsCount = bitsLength << 3;
		
		// noinspection NestedFunctionCallJS
		result.view.set(new Uint8Array(this.buffer, startIndex, bitsLength));
		//endregion
		
		//region Change "start byte"
		// noinspection MagicNumberJS
		result.view[0] &= (0xFF >> startOffset);
		//endregion
		
		//region Change "end byte"
		// noinspection MagicNumberJS
		result.view[bitsLength] &= (0xFF << (7 - endOffset));
		//endregion
		
		//region Shift result array to right
		// noinspection NonBlockStatementBodyJS
		if(7 - endOffset)
			result.shiftRight(7 - endOffset, false);
		//endregion
		
		//region Set final number of bits
		result.bitsCount = (end - start + 1);
		//endregion
		
		//region Cut unnecessary bytes from result
		result.shrink();
		//endregion
		
		return result;
	}
	//**********************************************************************************
	// noinspection FunctionWithMultipleReturnPointsJS
	/**
	 * Return copy of existing "BitStream"
	 * @param {?number} [start=null] Start position of the copy (in bits)
	 * @param {?number} [length=null] Length of the copy (in bits)
	 * @returns {BitStream}
	 */
	copy(start = null, length = null)
	{
		//region Check input parameters
		// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS, NonBlockStatementBodyJS
		if((start < 0) || (start > ((this.view.length << 3) - 1)))
			return new BitStream(); //("Wrong start position: " + start);
		
		// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS
		if(length === null)
		{
			// noinspection AssignmentToFunctionParameterJS
			length = (this.view.length << 3) - start - 1;
		}
		
		// noinspection NonBlockStatementBodyJS
		if(length > this.bitsCount)
			return new BitStream(); //("Maximum length is " + this.bitsCount);
		//endregion
		
		return this.slice(start, start + length - 1);
	}
	//**********************************************************************************
	/**
	 * Shrink unnecessary bytes in current stream accordingly to "bitsCount" value
	 */
	shrink()
	{
		// noinspection ConditionalExpressionJS
		const currentLength = (this.bitsCount >> 3) + ((this.bitsCount % 8) ? 1 : 0);
		if(currentLength < this.buffer.byteLength)
		{
			//region Change size of buffer
			const buffer = new ArrayBuffer(currentLength);
			const view = new Uint8Array(buffer);
			
			// noinspection NestedFunctionCallJS
			view.set(new Uint8Array(this.buffer, this.buffer.byteLength - currentLength, currentLength));
			//endregion
			
			//region Store final array into current stream
			this.buffer = buffer.slice(0);
			this.view = new Uint8Array(this.buffer);
			//endregion
		}
	}
	//**********************************************************************************
	// noinspection JSUnusedGlobalSymbols
	/**
	 * Reverse bits order in each byte in the stream
	 * Got it from here: http://graphics.stanford.edu/~seander/bithacks.html#ReverseByteWith32Bits
	 */
	reverseBytes()
	{
		//region Reverse bits order in each byte in the stream
		for(let i = 0; i < this.view.length; i++)
		{
			// noinspection MagicNumberJS, NonShortCircuitBooleanExpressionJS
			this.view[i] = ((this.view[i] * 0x0802 & 0x22110) | (this.view[i] * 0x8020 & 0x88440)) * 0x10101 >> 16;
		}
		//endregion
		
		//region Shift "most significant" byte
		if(this.bitsCount % 8)
		{
			// noinspection ConditionalExpressionJS
			const currentLength = (this.bitsCount >> 3) + ((this.bitsCount % 8) ? 1 : 0);
			// noinspection MagicNumberJS, NonShortCircuitBooleanExpressionJS
			this.view[this.view.length - currentLength] >>= (8 - (this.bitsCount & 0x07));
		}
		//endregion
	}
	//**********************************************************************************
	// noinspection JSUnusedGlobalSymbols
	/**
	 * Reverse all bits in entire "BitStream"
	 */
	reverseValue()
	{
		const initialValue = this.toString();
		const initialValueLength = initialValue.length;
		
		const reversedValue = new Array(initialValueLength);
		
		// noinspection NonBlockStatementBodyJS
		for(let i = 0; i < initialValueLength; i++)
			reversedValue[initialValueLength - 1 - i] = initialValue[i];
		
		// noinspection NestedFunctionCallJS
		this.fromString(reversedValue.join(""));
	}
	//**********************************************************************************
	// noinspection JSUnusedGlobalSymbols, FunctionWithMultipleReturnPointsJS
	/**
	 * Trying to represent entire "BitStream" as an unsigned integer.
	 * @return {number}
	 */
	getNumberValue()
	{
		//region Initial variables
		const byteLength = (this.buffer.byteLength - 1);
		//endregion
		
		//region Check posibility for convertion
		// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS, NonBlockStatementBodyJS
		if(byteLength > 3)
			return (-1);
		
		// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS, EqualityComparisonWithCoercionJS, NonBlockStatementBodyJS
		if(byteLength == (-1))
			return 0;
		//endregion
		
		//region Convert byte array to "Uint32Array" value
		const value = new Uint32Array(1);
		const view = new Uint8Array(value.buffer);
		
		// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS, NonBlockStatementBodyJS
		for(let i = byteLength; i >= 0; i--)
			view[byteLength - i] = this.view[i];
		//endregion
		
		return value[0];
	}
	//**********************************************************************************
	// noinspection JSUnusedGlobalSymbols
	/**
	 * Find any bit pattern in "BitStream"
	 * @param {BitStream} pattern Stream having pattern value
	 * @param {?number} [start=null] Start position to search from
	 * @param {?number} [length=null] Length of byte block to search at
	 * @param {boolean} [backward=false] Flag to search in backward order
	 * @returns {number}
	 */
	findPattern(pattern, start = null, length = null, backward = false)
	{
		//region Convert "BitStream" values to "ByteStream"
		const stringStream = new ByteStream({
			string: this.toString()
		});
		const stringPattern = new ByteStream({
			string: pattern.toString()
		});
		//endregion
		
		return stringStream.findPattern(stringPattern, start, length, backward);
	}
	//**********************************************************************************
	// noinspection JSUnusedGlobalSymbols
	/**
	 * Find first position of any pattern from input array
	 * @param {Array.<BitStream>} patterns Array with patterns which should be found
	 * @param {?number} [start=null] Start position to search from
	 * @param {?number} [length=null] Length of byte block to search at
	 * @param {boolean} [backward=false] Flag to search in backward order
	 * @returns {{id: number, position: number}}
	 */
	findFirstIn(patterns, start = null, length = null, backward = false)
	{
		//region Convert "BitStream" values to "ByteStream"
		const stringStream = new ByteStream({
			string: this.toString()
		});
		
		const stringPatterns = new Array(patterns.length);
		
		for(let i = 0; i < patterns.length; i++)
		{
			stringPatterns[i] = new ByteStream({
				string: patterns[i].toString()
			});
		}
		//endregion
		
		return stringStream.findFirstIn(stringPatterns, start, length, backward);
	}
	//**********************************************************************************
	// noinspection JSUnusedGlobalSymbols
	/**
	 * Find all positions of any pattern from input array
	 * @param {Array.<BitStream>} patterns Array with patterns which should be found
	 * @param {?number} [start=null] Start position to search from
	 * @param {?number} [length=null] Length of byte block to search at
	 * @returns {Array}
	 */
	findAllIn(patterns, start = null, length = null)
	{
		//region Convert "BitStream" values to "ByteStream"
		const stringStream = new ByteStream({
			string: this.toString()
		});
		
		const stringPatterns = new Array(patterns.length);
		
		for(let i = 0; i < patterns.length; i++)
		{
			stringPatterns[i] = new ByteStream({
				string: patterns[i].toString()
			});
		}
		//endregion
		
		return stringStream.findAllIn(stringPatterns, start, length);
	}
	//**********************************************************************************
	// noinspection JSUnusedGlobalSymbols
	/**
	 * Find all positions of a pattern
	 * @param {BitStream} pattern Stream having pattern value
	 * @param {?number} [start=null] Start position to search from
	 * @param {?number} [length=null] Length of byte block to search at
	 * @returns {Array|number}
	 */
	findAllPatternIn(pattern, start = null, length = null)
	{
		//region Convert "BitStream" values to "ByteStream" 
		const stringStream = new ByteStream({
			string: this.toString()
		});
		const stringPattern = new ByteStream({
			string: pattern.toString()
		});
		//endregion 
		
		return stringStream.findAllPatternIn(stringPattern, start, length);
	}
	//**********************************************************************************
	// noinspection JSUnusedGlobalSymbols
	/**
	 * Find first position of data, not included in patterns from input array
	 * @param {Array.<BitStream>} patterns Array with patterns which should be found
	 * @param {?number} [start=null] Start position to search from
	 * @param {?number} [length=null] Length of byte block to search at
	 * @param {boolean} [backward=false] Flag to search in backward order
	 * @returns {{left: {id: number, position: *}, right: {id: number, position: number}, value: ByteStream}}
	 */
	findFirstNotIn(patterns, start = null, length = null, backward = false)
	{
		//region Convert "BitStream" values to "ByteStream"
		const stringStream = new ByteStream({
			string: this.toString()
		});
		
		const stringPatterns = new Array(patterns.length);
		
		for(let i = 0; i < patterns.length; i++)
		{
			stringPatterns[i] = new ByteStream({
				string: patterns[i].toString()
			});
		}
		//endregion
		
		return stringStream.findFirstNotIn(stringPatterns, start, length, backward);
	}
	//**********************************************************************************
	// noinspection JSUnusedGlobalSymbols
	/**
	 * Find all positions of data, not included in patterns from input array
	 * @param {Array.<BitStream>} patterns Array with patterns which should be found
	 * @param {?number} [start=null] Start position to search from
	 * @param {?number} [length=null] Length of byte block to search at
	 * @returns {Array}
	 */
	findAllNotIn(patterns, start = null, length = null)
	{
		//region Convert "BitStream" values to "ByteStream"
		const stringStream = new ByteStream({
			string: this.toString()
		});
		
		const stringPatterns = new Array(patterns.length);
		
		for(let i = 0; i < patterns.length; i++)
		{
			stringPatterns[i] = new ByteStream({
				string: patterns[i].toString()
			});
		}
		//endregion
		
		return stringStream.findAllNotIn(stringPatterns, start, length);
	}
	//**********************************************************************************
	// noinspection JSUnusedGlobalSymbols
	/**
	 * Find position of a sequence of any patterns from input array
	 * @param {Array.<BitStream>} patterns Array with patterns which should be found
	 * @param {?number} [start=null] Start position to search from
	 * @param {?number} [length=null] Length of byte block to search at
	 * @param {boolean} [backward=false] Flag to search in backward order
	 * @returns {{position, value}|*}
	 */
	findFirstSequence(patterns, start = null, length = null, backward = false)
	{
		//region Convert "BitStream" values to "ByteStream"
		const stringStream = new ByteStream({
			string: this.toString()
		});
		
		const stringPatterns = new Array(patterns.length);
		
		for(let i = 0; i < patterns.length; i++)
		{
			stringPatterns[i] = new ByteStream({
				string: patterns[i].toString()
			});
		}
		//endregion
		
		return stringStream.findFirstSequence(stringPatterns, start, length, backward);
	}
	//**********************************************************************************
	// noinspection JSUnusedGlobalSymbols
	/**
	 * Find position of a sequence of any patterns from input array
	 * @param {Array.<BitStream>} patterns Array with patterns which should be found
	 * @param {?number} [start=null] Start position to search from
	 * @param {?number} [length=null] Length of byte block to search at
	 * @returns {Array}
	 */
	findAllSequences(patterns, start, length)
	{
		//region Convert "BitStream" values to "ByteStream"
		const stringStream = new ByteStream({
			string: this.toString()
		});
		
		const stringPatterns = new Array(patterns.length);
		
		for(let i = 0; i < patterns.length; i++)
		{
			stringPatterns[i] = new ByteStream({
				string: patterns[i].toString()
			});
		}
		//endregion
		
		return stringStream.findAllSequences(stringPatterns, start, length);
	}
	//**********************************************************************************
	// noinspection JSUnusedGlobalSymbols
	/**
	 * Find all paired patterns in the stream
	 * @param {BitStream} leftPattern Left pattern to search for
	 * @param {BitStream} rightPattern Right pattern to search for
	 * @param {?number} [start=null] Start position to search from
	 * @param {?number} [length=null] Length of byte block to search at
	 * @returns {Array}
	 */
	findPairedPatterns(leftPattern, rightPattern, start = null, length = null)
	{
		//region Convert "BitStream" values to "ByteStream"
		const stringStream = new ByteStream({
			string: this.toString()
		});
		const stringLeftPattern = new ByteStream({
			string: leftPattern.toString()
		});
		const stringRightPattern = new ByteStream({
			string: rightPattern.toString()
		});
		//endregion
		
		return stringStream.findPairedPatterns(stringLeftPattern, stringRightPattern, start, length);
	}
	//**********************************************************************************
	// noinspection JSUnusedGlobalSymbols, FunctionWithMultipleLoopsJS
	/**
	 * Find all paired patterns in the stream
	 * @param {Array.<BitStream>} inputLeftPatterns Array of left patterns to search for
	 * @param {Array.<BitStream>} inputRightPatterns Array of right patterns to search for
	 * @param {?number} [start=null] Start position to search from
	 * @param {?number} [length=null] Length of byte block to search at
	 * @returns {Array}
	 */
	findPairedArrays(inputLeftPatterns, inputRightPatterns, start = null, length = null)
	{
		//region Convert "BitStream" values to "ByteStream"
		const stringStream = new ByteStream({
			string: this.toString()
		});
		
		const stringLeftPatterns = new Array(inputLeftPatterns.length);
		
		for(let i = 0; i < inputLeftPatterns.length; i++)
		{
			stringLeftPatterns[i] = new ByteStream({
				string: inputLeftPatterns[i].toString()
			});
		}
		
		const stringRightPatterns = new Array(inputRightPatterns.length);
		
		for(let i = 0; i < inputRightPatterns.length; i++)
		{
			stringRightPatterns[i] = new ByteStream({
				string: inputRightPatterns[i].toString()
			});
		}
		//endregion
		
		return stringStream.findPairedArrays(stringLeftPatterns, stringRightPatterns, start, length);
	}
	//**********************************************************************************
	// noinspection JSUnusedGlobalSymbols, FunctionWithMultipleReturnPointsJS
	/**
	 * Replace one pattern with other
	 * @param {BitStream} searchPattern The pattern to search for
	 * @param {BitStream} replacePattern The pattern to replace initial pattern
	 * @param {?number} [start=null] Start position to search from
	 * @param {?number} [length=null] Length of byte block to search at
	 * @returns {boolean}
	 */
	replacePattern(searchPattern, replacePattern, start = null, length = null)
	{
		//region Convert "BitStream" values to "ByteStream"
		const stringStream = new ByteStream({
			string: this.toString()
		});
		const stringSearchPattern = new ByteStream({
			string: searchPattern.toString()
		});
		const stringReplacePattern = new ByteStream({
			string: replacePattern.toString()
		});
		//endregion
		
		//region Re-initialize existing data
		if(stringStream.findPairedPatterns(stringSearchPattern, stringReplacePattern, start, length))
		{
			// noinspection NestedFunctionCallJS
			this.fromString(stringStream.toString());
			return true;
		}
		//endregion
		
		return false;
	}
	//**********************************************************************************
	// noinspection JSUnusedGlobalSymbols
	/**
	 * Skip any pattern from input array
	 * @param {Array.<BitStream>} patterns Array with patterns which should be ommited
	 * @param {?number} [start=null] Start position to search from
	 * @param {?number} [length=null] Length of byte block to search at
	 * @param {boolean} [backward=false] Flag to search in backward order
	 * @returns {*}
	 */
	skipPatterns(patterns, start, length, backward)
	{
		//region Convert "BitStream" values to "ByteStream"
		const stringStream = new ByteStream({
			string: this.toString()
		});
		
		const stringPatterns = new Array(patterns.length);
		
		for(let i = 0; i < patterns.length; i++)
		{
			stringPatterns[i] = new ByteStream({
				string: patterns[i].toString()
			});
		}
		//endregion
		
		return stringStream.skipPatterns(stringPatterns, start, length, backward);
	}
	//**********************************************************************************
	// noinspection JSUnusedGlobalSymbols
	/**
	 * Skip any pattern not from input array
	 * @param {Array.<BitStream>} patterns Array with patterns which should be ommited
	 * @param {?number} [start=null] Start position to search from
	 * @param {?number} [length=null] Length of byte block to search at
	 * @param {boolean} [backward=false] Flag to search in backward order
	 * @returns {number}
	 */
	skipNotPatterns(patterns, start, length, backward)
	{
		//region Convert "BitStream" values to "ByteStream"
		const stringStream = new ByteStream({
			string: this.toString()
		});
		
		const stringPatterns = new Array(patterns.length);
		
		for(let i = 0; i < patterns.length; i++)
		{
			stringPatterns[i] = new ByteStream({
				string: patterns[i].toString()
			});
		}
		//endregion
		
		return stringStream.skipNotPatterns(stringPatterns, start, length, backward);
	}
	//**********************************************************************************
	// noinspection JSUnusedGlobalSymbols
	/**
	 * Append a new "BitStream" content to the current "BitStream"
	 * @param {BitStream} stream A new "stream" to append to current "stream"
	 */
	append(stream)
	{
		//region Initialize current stream with new data
		// noinspection NestedFunctionCallJS
		this.fromString([
			this.toString(),
			stream.toString()
		].join(""));
		//endregion
	}
	//**********************************************************************************
}
//**************************************************************************************
class SeqBitStream
{
	//**********************************************************************************
	constructor(parameters = {})
	{
		//region Internal variables
		this.stream = new BitStream();
		
		this._start = 0;
		this._length = this.stream.bitsCount;
		
		this.backward = false;
		
		this.appendBlock = 0;
		//endregion
		
		for(const key of Object.keys(parameters))
		{
			switch(key)
			{
				case "stream":
				case "start":
				case "length":
				case "backward":
				case "appendBlock":
					this[key] = parameters[key];
					break;
				default:
			}
		}
	}
	//**********************************************************************************
	// noinspection FunctionWithMultipleReturnPointsJS
	set start(value)
	{
		// noinspection NonBlockStatementBodyJS
		if(value > this.stream.bitsCount)
			return;
		
		// noinspection ConditionalExpressionJS
		this._length -= ((this.backward) ? (this._start - value) : (value - this._start));
		this._start = value;
		
		//region Initialization of "prev" internal variables
		// noinspection JSUnusedGlobalSymbols
		this.prevStart = this._start;
		// noinspection JSUnusedGlobalSymbols
		this.prevLength = this._length;
		//endregion
	}
	//**********************************************************************************
	get start()
	{
		return this._start;
	}
	//**********************************************************************************
	// noinspection FunctionWithMultipleReturnPointsJS
	set length(value)
	{
		// noinspection NonBlockStatementBodyJS
		if(value > this.stream.bitsCount)
			return;
		
		// noinspection JSUnusedGlobalSymbols
		this.prevLength = this._length;
		this._length = value;
	}
	//**********************************************************************************
	get length()
	{
		return this._length;
	}
	//**********************************************************************************
	set stream(value)
	{
		this._stream = value;
		
		// noinspection JSUnusedGlobalSymbols
		this.prevLength = this._length;
		this._length = value.bitsCount;
		
		// noinspection JSUnusedGlobalSymbols
		this.prevStart = this._start;
		// noinspection ConditionalExpressionJS
		this._start = (this.backward) ? this.length : 0;
	}
	//**********************************************************************************
	get stream()
	{
		return this._stream;
	}
	//**********************************************************************************
	// noinspection JSUnusedGlobalSymbols
	/**
	 * Get next "length" bits from the stream
	 * @param {number} length Number of bits to read
	 * @returns {*}
	 */
	getBits(length)
	{
		//region Check input parameters 
		if((this.start + length) > this.stream.bitsCount)
		{
			// noinspection AssignmentToFunctionParameterJS
			length = (this.stream.bitsCount - this.start);
		}
		//endregion 
		
		//region Initial variables 
		let result;
		//endregion 
		
		//region Copy necessary length of bits
		if(this.backward)
		{
			result = this.stream.copy(this.start - length, length);
			this.start -= result.bitsCount;
		}
		else
		{
			result = this.stream.copy(this.start, length);
			this.start += result.bitsCount;
		}
		//endregion
		
		return result;
	}
	//**********************************************************************************
	// noinspection FunctionTooLongJS
	/**
	 * Get string representation for the next "length" bits from the stream
	 * @param {number} length Number of bits to read
	 * @returns {string}
	 */
	getBitsString(length)
	{
		//region Check input parameters
		if((this.start + length) > this.stream.bitsCount)
		{
			// noinspection AssignmentToFunctionParameterJS
			length = (this.stream.bitsCount - this.start);
		}
		//endregion
		
		//region Initial variables
		let result = [];
		
		let start;
		
		// noinspection NonBlockStatementBodyJS
		if(this.backward)
			start = this.start - length;
		else
			start = this.start;
		
		let end = this.start + length - 1;
		
		//region Make ability to pass non-value bits
		let valueShift = 0;
		// noinspection NonBlockStatementBodyJS
		if(this.stream.bitsCount % 8)
			valueShift = (8 - (this.stream.bitsCount % 8));
		
		start += valueShift;
		end += valueShift;
		//endregion
		
		const startIndex = start >> 3;
		// noinspection MagicNumberJS, NonShortCircuitBooleanExpressionJS
		const startOffset = start & 0x07;
		
		const endIndex = end >> 3;
		// noinspection MagicNumberJS, NonShortCircuitBooleanExpressionJS
		const endOffset = end & 0x07;
		
		// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS, ConditionalExpressionJS, EqualityComparisonWithCoercionJS
		const bitsLengthIndex = startIndex + (((endIndex - startIndex) == 0) ? 1 : (endIndex - startIndex + 1));
		//endregion
		
		//region Get string representation of bits
		for(let i = startIndex; i < bitsLengthIndex; i++)
		{
			let value = bitsToStringArray[this.stream.view[i]];
			
			// noinspection EqualityComparisonWithCoercionJS, NonBlockStatementBodyJS
			if(i == startIndex)
				value = value.slice(startOffset);
			
			// noinspection EqualityComparisonWithCoercionJS, NonBlockStatementBodyJS
			if(i == (bitsLengthIndex - 1))
				value = value.slice(0, endOffset - 7 + value.length);
			
			result.push(value);
		}
		
		result = result.join("");
		//endregion
		
		//region Change internal values
		// noinspection NonBlockStatementBodyJS
		if(this.backward)
			this.start -= result.length;
		else
			this.start += result.length;
		//endregion
		
		return result;
	}
	//**********************************************************************************
	// noinspection JSUnusedGlobalSymbols, FunctionWithMultipleLoopsJS, FunctionWithMultipleReturnPointsJS
	/**
	 * Get number value representation of the next "length" bits from the stream, preliminary reversed
	 * @param {number} length Number of bits to read
	 * @returns {*}
	 */
	getBitsReversedValue(length)
	{
		//region Initial variables 
		const initialValue = this.getBitsString(length);
		const initialValueLength = initialValue.length;
		
		let byteIndex;
		
		const initialOffset = 8 - (initialValueLength % 8);
		
		const reversedValue = new Array(initialValueLength);
		
		const value = new Uint32Array(1);
		const valueView = new Uint8Array(value.buffer, 0, 4);
		
		let i;

		// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS, MagicNumberJS, NonBlockStatementBodyJS
		if(initialValueLength > 32)
			return (-1);
		
		// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS, MagicNumberJS, EqualityComparisonWithCoercionJS, NonBlockStatementBodyJS
		if(length == 32)
			byteIndex = 3;
		else
			byteIndex = ((initialValueLength - 1) >> 3);
		//endregion
		
		//region Reverse value 
		// noinspection NonBlockStatementBodyJS
		for(i = 0; i < initialValueLength; i++)
			reversedValue[initialValueLength - 1 - i] = initialValue[i];
		//endregion 
		
		//region Convert byte array to "Uint32Array" value 
		for(i = initialOffset; i < (initialOffset + initialValueLength); i++)
		{
			// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS, EqualityComparisonWithCoercionJS
			if(reversedValue[i - initialOffset] == "1")
			{
				// noinspection MagicNumberJS
				valueView[byteIndex] |= 0x01 << (7 - (i % 8));
			}
			
			// noinspection ConstantOnRightSideOfComparisonJS, ConstantOnLeftSideOfComparisonJS, EqualityComparisonWithCoercionJS, NonBlockStatementBodyJS
			if(i && (((i + 1) % 8) == 0))
				byteIndex--;
		}
		//endregion 
		
		return value[0];
	}
	//**********************************************************************************
	/**
	 * Represent remaining bits in "BitStream" as a string
	 * @return {string}
	 */
	toString()
	{
		const streamToDisplay = this.stream.copy(this.start, this.length);
		return streamToDisplay.toString();
	}
	//**********************************************************************************
}
//**************************************************************************************

//**************************************************************************************
class SignedCertificateTimestamp
{
	//**********************************************************************************
	/**
	 * Constructor for SignedCertificateTimestamp class
	 * @param {Object} [parameters={}]
	 * @param {Object} [parameters.schema] asn1js parsed value to initialize the class from
	 */
	constructor(parameters = {})
	{
		//region Internal properties of the object
		/**
		 * @type {number}
		 * @desc version
		 */
		this.version = getParametersValue(parameters, "version", SignedCertificateTimestamp.defaultValues("version"));
		/**
		 * @type {ArrayBuffer}
		 * @desc logID
		 */
		this.logID = getParametersValue(parameters, "logID", SignedCertificateTimestamp.defaultValues("logID"));
		/**
		 * @type {Date}
		 * @desc timestamp
		 */
		this.timestamp = getParametersValue(parameters, "timestamp", SignedCertificateTimestamp.defaultValues("timestamp"));
		/**
		 * @type {ArrayBuffer}
		 * @desc extensions
		 */
		this.extensions = getParametersValue(parameters, "extensions", SignedCertificateTimestamp.defaultValues("extensions"));
		/**
		 * @type {string}
		 * @desc hashAlgorithm
		 */
		this.hashAlgorithm = getParametersValue(parameters, "hashAlgorithm", SignedCertificateTimestamp.defaultValues("hashAlgorithm"));
		/**
		 * @type {string}
		 * @desc signatureAlgorithm
		 */
		this.signatureAlgorithm = getParametersValue(parameters, "signatureAlgorithm", SignedCertificateTimestamp.defaultValues("signatureAlgorithm"));
		/**
		 * @type {Object}
		 * @desc signature
		 */
		this.signature = getParametersValue(parameters, "signature", SignedCertificateTimestamp.defaultValues("signature"));
		//endregion
		
		//region If input argument array contains "schema" for this object
		if("schema" in parameters)
			this.fromSchema(parameters.schema);
		//endregion
		
		//region If input argument array contains "stream"
		if("stream" in parameters)
			this.fromStream(parameters.stream);
		//endregion
	}
	//**********************************************************************************
	/**
	 * Return default values for all class members
	 * @param {string} memberName String name for a class member
	 */
	static defaultValues(memberName)
	{
		switch(memberName)
		{
			case "version":
				return 0;
			case "logID":
			case "extensions":
				return new ArrayBuffer(0);
			case "timestamp":
				return new Date(0);
			case "hashAlgorithm":
			case "signatureAlgorithm":
				return "";
			case "signature":
				return new Any();
			default:
				throw new Error(`Invalid member name for SignedCertificateTimestamp class: ${memberName}`);
		}
	}
	//**********************************************************************************
	/**
	 * Convert parsed asn1js object into current class
	 * @param {!Object} schema
	 */
	fromSchema(schema)
	{
		if((schema instanceof RawData) === false)
			throw new Error("Object's schema was not verified against input data for SignedCertificateTimestamp");
		
		const seqStream = new SeqStream({
			stream: new ByteStream({
				buffer: schema.data
			})
		});
		
		this.fromStream(seqStream);
	}
	//**********************************************************************************
	/**
	 * Convert SeqStream data into current class
	 * @param {!SeqStream} stream
	 */
	fromStream(stream)
	{
		const blockLength = stream.getUint16();
		
		this.version = (stream.getBlock(1))[0];
		
		if(this.version === 0)
		{
			this.logID = (new Uint8Array(stream.getBlock(32))).buffer.slice(0);
			this.timestamp = new Date(utilFromBase(new Uint8Array(stream.getBlock(8)), 8));
			
			//region Extensions
			const extensionsLength = stream.getUint16();
			this.extensions = (new Uint8Array(stream.getBlock(extensionsLength))).buffer.slice(0);
			//endregion
			
			//region Hash algorithm
			switch((stream.getBlock(1))[0])
			{
				case 0:
					this.hashAlgorithm = "none";
					break;
				case 1:
					this.hashAlgorithm = "md5";
					break;
				case 2:
					this.hashAlgorithm = "sha1";
					break;
				case 3:
					this.hashAlgorithm = "sha224";
					break;
				case 4:
					this.hashAlgorithm = "sha256";
					break;
				case 5:
					this.hashAlgorithm = "sha384";
					break;
				case 6:
					this.hashAlgorithm = "sha512";
					break;
				default:
					throw new Error("Object's stream was not correct for SignedCertificateTimestamp");
			}
			//endregion
			
			//region Signature algorithm
			switch((stream.getBlock(1))[0])
			{
				case 0:
					this.signatureAlgorithm = "anonymous";
					break;
				case 1:
					this.signatureAlgorithm = "rsa";
					break;
				case 2:
					this.signatureAlgorithm = "dsa";
					break;
				case 3:
					this.signatureAlgorithm = "ecdsa";
					break;
				default:
					throw new Error("Object's stream was not correct for SignedCertificateTimestamp");
			}
			//endregion
			
			//region Signature
			const signatureLength = stream.getUint16();
			const signatureData = (new Uint8Array(stream.getBlock(signatureLength))).buffer.slice(0);
			
			const asn1 = fromBER(signatureData);
			if(asn1.offset === (-1))
				throw new Error("Object's stream was not correct for SignedCertificateTimestamp");
			
			this.signature = asn1.result;
			//endregion
			
			if(blockLength !== (47 + extensionsLength + signatureLength))
				throw new Error("Object's stream was not correct for SignedCertificateTimestamp");
		}
	}
	//**********************************************************************************
	/**
	 * Convert current object to asn1js object and set correct values
	 * @returns {Object} asn1js object
	 */
	toSchema()
	{
		const stream = this.toStream();
		
		return new RawData({ data: stream.stream.buffer });
	}
	//**********************************************************************************
	/**
	 * Convert current object to SeqStream data
	 * @returns {SeqStream} SeqStream object
	 */
	toStream()
	{
		const stream = new SeqStream();
		
		stream.appendUint16(47 + this.extensions.byteLength + this.signature.valueBeforeDecode.byteLength);
		stream.appendChar(this.version);
		stream.appendView(new Uint8Array(this.logID));
		
		const timeBuffer = new ArrayBuffer(8);
		const timeView = new Uint8Array(timeBuffer);
		
		const baseArray = utilToBase(this.timestamp.valueOf(), 8);
		timeView.set(new Uint8Array(baseArray), 8 - baseArray.byteLength);
		
		stream.appendView(timeView);
		stream.appendUint16(this.extensions.byteLength);
		
		if(this.extensions.byteLength)
			stream.appendView(new Uint8Array(this.extensions));
		
		let _hashAlgorithm;
		
		switch(this.hashAlgorithm.toLowerCase())
		{
			case "none":
				_hashAlgorithm = 0;
				break;
			case "md5":
				_hashAlgorithm = 1;
				break;
			case "sha1":
				_hashAlgorithm = 2;
				break;
			case "sha224":
				_hashAlgorithm = 3;
				break;
			case "sha256":
				_hashAlgorithm = 4;
				break;
			case "sha384":
				_hashAlgorithm = 5;
				break;
			case "sha512":
				_hashAlgorithm = 6;
				break;
			default:
				throw new Error(`Incorrect data for hashAlgorithm: ${this.hashAlgorithm}`);
		}
		
		stream.appendChar(_hashAlgorithm);
		
		let _signatureAlgorithm;
		
		switch(this.signatureAlgorithm.toLowerCase())
		{
			case "anonymous":
				_signatureAlgorithm = 0;
				break;
			case "rsa":
				_signatureAlgorithm = 1;
				break;
			case "dsa":
				_signatureAlgorithm = 2;
				break;
			case "ecdsa":
				_signatureAlgorithm = 3;
				break;
			default:
				throw new Error(`Incorrect data for signatureAlgorithm: ${this.signatureAlgorithm}`);
		}
		
		stream.appendChar(_signatureAlgorithm);
		
		const _signature = this.signature.toBER(false);
		
		stream.appendUint16(_signature.byteLength);
		stream.appendView(new Uint8Array(_signature));
		
		return stream;
	}
	//**********************************************************************************
	/**
	 * Convertion for the class to JSON object
	 * @returns {Object}
	 */
	toJSON()
	{
		return {
			version: this.version,
			logID: bufferToHexCodes(this.logID),
			timestamp: this.timestamp,
			extensions: bufferToHexCodes(this.extensions),
			hashAlgorithm: this.hashAlgorithm,
			signatureAlgorithm: this.signatureAlgorithm,
			signature: this.signature.toJSON()
		};
	}
	//**********************************************************************************
	/**
	 * Verify SignedCertificateTimestamp for specific input data
	 * @param {Object[]} logs Array of objects with information about each CT Log (like here: https://ct.grahamedgecombe.com/logs.json)
	 * @param {String} logs.log_id Identifier of the CT Log encoded in BASE-64 format
	 * @param {String} logs.key Public key of the CT Log encoded in BASE-64 format
	 * @param {ArrayBuffer} data Data to verify signature against. Could be encoded Certificate or encoded PreCert
	 * @param {Number} [dataType=0] Type = 0 (data is encoded Certificate), type = 1 (data is encoded PreCert)
	 * @return {Promise<void>}
	 */
	async verify(logs, data, dataType = 0)
	{
		//region Initial variables
		let logId = toBase64(arrayBufferToString(this.logID));
		
		let publicKeyBase64 = null;
		let publicKeyInfo;
		
		let stream = new SeqStream();
		//endregion
		
		//region Found and init public key
		for(const log of logs)
		{
			if(log.log_id === logId)
			{
				publicKeyBase64 = log.key;
				break;
			}
		}
		
		if(publicKeyBase64 === null)
			throw new Error(`Public key not found for CT with logId: ${logId}`);
		
		const asn1 = fromBER(stringToArrayBuffer(fromBase64(publicKeyBase64)));
		if(asn1.offset === (-1))
			throw new Error(`Incorrect key value for CT Log with logId: ${logId}`);
		
		publicKeyInfo = new PublicKeyInfo({ schema: asn1.result });
		//endregion
		
		//region Initialize signed data block
		stream.appendChar(0x00); // sct_version
		stream.appendChar(0x00); // signature_type = certificate_timestamp
		
		const timeBuffer = new ArrayBuffer(8);
		const timeView = new Uint8Array(timeBuffer);
		
		const baseArray = utilToBase(this.timestamp.valueOf(), 8);
		timeView.set(new Uint8Array(baseArray), 8 - baseArray.byteLength);
		
		stream.appendView(timeView);
		
		stream.appendUint16(dataType);
		
		if(dataType === 0)
			stream.appendUint24(data.byteLength);
		
		stream.appendView(new Uint8Array(data));
		
		stream.appendUint16(this.extensions.byteLength);
		
		if(this.extensions.byteLength !== 0)
			stream.appendView(new Uint8Array(this.extensions));
		//endregion
		
		//region Perform verification
		return getEngine().subtle.verifyWithPublicKey(
			stream._stream._buffer.slice(0, stream._length),
			{ valueBlock: { valueHex: this.signature.toBER(false) } },
			publicKeyInfo,
			{ algorithmId: "" },
			"SHA-256"
		);
		//endregion
	}
	//**********************************************************************************
}
//**************************************************************************************
/**
 * Class from RFC6962
 */
class SignedCertificateTimestampList
{
	//**********************************************************************************
	/**
	 * Constructor for SignedCertificateTimestampList class
	 * @param {Object} [parameters={}]
	 * @param {Object} [parameters.schema] asn1js parsed value to initialize the class from
	 */
	constructor(parameters = {})
	{
		//region Internal properties of the object
		/**
		 * @type {Array.<SignedCertificateTimestamp>}
		 * @desc timestamps
		 */
		this.timestamps = getParametersValue(parameters, "timestamps", SignedCertificateTimestampList.defaultValues("timestamps"));
		//endregion
		
		//region If input argument array contains "schema" for this object
		if("schema" in parameters)
			this.fromSchema(parameters.schema);
		//endregion
	}
	//**********************************************************************************
	/**
	 * Return default values for all class members
	 * @param {string} memberName String name for a class member
	 */
	static defaultValues(memberName)
	{
		switch(memberName)
		{
			case "timestamps":
				return [];
			default:
				throw new Error(`Invalid member name for SignedCertificateTimestampList class: ${memberName}`);
		}
	}
	//**********************************************************************************
	/**
	 * Compare values with default values for all class members
	 * @param {string} memberName String name for a class member
	 * @param {*} memberValue Value to compare with default value
	 */
	static compareWithDefault(memberName, memberValue)
	{
		switch(memberName)
		{
			case "timestamps":
				return (memberValue.length === 0);
			default:
				throw new Error(`Invalid member name for SignedCertificateTimestampList class: ${memberName}`);
		}
	}
	//**********************************************************************************
	/**
	 * Return value of pre-defined ASN.1 schema for current class
	 *
	 * ASN.1 schema:
	 * ```asn1
	 * SignedCertificateTimestampList ::= OCTET STRING
	 * ```
	 *
	 * @param {Object} parameters Input parameters for the schema
	 * @returns {Object} asn1js schema object
	 */
	static schema(parameters = {})
	{
		/**
		 * @type {Object}
		 * @property {string} [blockName]
		 * @property {string} [optional]
		 */
		const names = getParametersValue(parameters, "names", {});
		
		if(("optional" in names) === false)
			names.optional = false;
		
		return (new OctetString({
			name: (names.blockName || "SignedCertificateTimestampList"),
			optional: names.optional
		}));
	}
	//**********************************************************************************
	/**
	 * Convert parsed asn1js object into current class
	 * @param {!Object} schema
	 */
	fromSchema(schema)
	{
		//region Check the schema is valid
		if((schema instanceof OctetString) === false)
			throw new Error("Object's schema was not verified against input data for SignedCertificateTimestampList");
		//endregion
		
		//region Get internal properties from parsed schema
		const seqStream = new SeqStream({
			stream: new ByteStream({
				buffer: schema.valueBlock.valueHex
			})
		});
		
		let dataLength = seqStream.getUint16();
		if(dataLength !== seqStream.length)
			throw new Error("Object's schema was not verified against input data for SignedCertificateTimestampList");
		
		while(seqStream.length)
			this.timestamps.push(new SignedCertificateTimestamp({ stream: seqStream }));
		//endregion
	}
	//**********************************************************************************
	/**
	 * Convert current object to asn1js object and set correct values
	 * @returns {Object} asn1js object
	 */
	toSchema()
	{
		//region Initial variables
		const stream = new SeqStream();
		
		let overallLength = 0;
		
		const timestampsData = [];
		//endregion
		
		//region Get overall length
		for(const timestamp of this.timestamps)
		{
			const timestampStream = timestamp.toStream();
			timestampsData.push(timestampStream);
			overallLength += timestampStream.stream.buffer.byteLength;
		}
		//endregion
		
		stream.appendUint16(overallLength);
		
		//region Set data from all timestamps
		for(const timestamp of timestampsData)
			stream.appendView(timestamp.stream.view);
		//endregion
		
		return new OctetString({ valueHex: stream.stream.buffer.slice(0) });
	}
	//**********************************************************************************
	/**
	 * Convertion for the class to JSON object
	 * @returns {Object}
	 */
	toJSON()
	{
		return {
			timestamps: Array.from(this.timestamps, element => element.toJSON())
		};
	}
	//**********************************************************************************
}
//**************************************************************************************
/**
 * Verify SignedCertificateTimestamp for specific certificate content
 * @param {Certificate} certificate Certificate for which verification would be performed
 * @param {Certificate} issuerCertificate Certificate of the issuer of target certificate
 * @param {Object[]} logs Array of objects with information about each CT Log (like here: https://ct.grahamedgecombe.com/logs.json)
 * @param {String} logs.log_id Identifier of the CT Log encoded in BASE-64 format
 * @param {String} logs.key Public key of the CT Log encoded in BASE-64 format
 * @param {Number} [index=-1] Index of SignedCertificateTimestamp inside SignedCertificateTimestampList (for -1 would verify all)
 * @return {Array} Array of verification results
 */
async function verifySCTsForCertificate(certificate, issuerCertificate, logs, index = (-1))
{
	//region Initial variables
	let parsedValue = null;
	let tbs;
	let issuerId;
	
	const stream = new SeqStream();
	
	let preCert;
	//endregion
	
	//region Get a "crypto" extension
	const crypto = getCrypto();
	if(typeof crypto === "undefined")
		return Promise.reject("Unable to create WebCrypto object");
	//endregion
	
	//region Remove certificate extension
	for(let i = 0; i < certificate.extensions.length; i++)
	{
		switch(certificate.extensions[i].extnID)
		{
			case "1.3.6.1.4.1.11129.2.4.2":
				{
					parsedValue = certificate.extensions[i].parsedValue;
					
					if(parsedValue.timestamps.length === 0)
						throw new Error("Nothing to verify in the certificate");
					
					certificate.extensions.splice(i, 1);
				}
				break;
			default:
		}
	}
	//endregion
	
	//region Check we do have what to verify
	if(parsedValue === null)
		throw new Error("No SignedCertificateTimestampList extension in the specified certificate");
	//endregion
	
	//region Prepare modifier TBS value
	tbs = certificate.encodeTBS().toBER(false);
	//endregion
	
	//region Initialize "issuer_key_hash" value
	issuerId = await crypto.digest({ name: "SHA-256" }, new Uint8Array(issuerCertificate.subjectPublicKeyInfo.toSchema().toBER(false)));
	//endregion
	
	//region Make final "PreCert" value
	stream.appendView(new Uint8Array(issuerId));
	stream.appendUint24(tbs.byteLength);
	stream.appendView(new Uint8Array(tbs));
	
	preCert = stream._stream._buffer.slice(0, stream._length);
	//endregion
	
	//region Call verification function for specified index
	if(index === (-1))
	{
		const verifyArray = [];
		
		for(const timestamp of parsedValue.timestamps)
		{
			const verifyResult = await timestamp.verify(logs, preCert, 1);
			verifyArray.push(verifyResult);
		}
		
		return verifyArray;
	}
	
	if(index >= parsedValue.timestamps.length)
		index = (parsedValue.timestamps.length - 1);
	
	return [await parsedValue.timestamps[index].verify(logs, preCert, 1)];
	//endregion
}
//**********************************************************************************

//**************************************************************************************
/**
 * Class from "[MS-WCCE]: Windows Client Certificate Enrollment Protocol"
 */
class CertificateTemplate
{
	//**********************************************************************************
	/**
	 * Constructor for CertificateTemplate class
	 * @param {Object} [parameters={}]
	 * @param {Object} [parameters.schema] asn1js parsed value to initialize the class from
	 */
	constructor(parameters = {})
	{
		//region Internal properties of the object
		/**
		 * @type {string}
		 * @desc templateID
		 */
		this.templateID = getParametersValue(parameters, "templateID", CertificateTemplate.defaultValues("templateID"));

		if("templateMajorVersion" in parameters)
			/**
			 * @type {number}
			 * @desc templateMajorVersion
			 */
			this.templateMajorVersion = getParametersValue(parameters, "templateMajorVersion", CertificateTemplate.defaultValues("templateMajorVersion"));

		if("templateMinorVersion" in parameters)
			/**
			 * @type {number}
			 * @desc templateMinorVersion
			 */
			this.templateMinorVersion = getParametersValue(parameters, "templateMinorVersion", CertificateTemplate.defaultValues("templateMinorVersion"));
		//endregion

		//region If input argument array contains "schema" for this object
		if("schema" in parameters)
			this.fromSchema(parameters.schema);
		//endregion
	}
	//**********************************************************************************
	/**
	 * Return default values for all class members
	 * @param {string} memberName String name for a class member
	 */
	static defaultValues(memberName)
	{
		switch(memberName)
		{
			case "templateID":
				return "";
			case "templateMajorVersion":
			case "templateMinorVersion":
				return 0;
			default:
				throw new Error(`Invalid member name for CertificateTemplate class: ${memberName}`);
		}
	}
	//**********************************************************************************
	/**
	 * Return value of pre-defined ASN.1 schema for current class
	 *
	 * ASN.1 schema:
	 * ```asn1
	 * CertificateTemplateOID ::= SEQUENCE {
     *    templateID              OBJECT IDENTIFIER,
     *    templateMajorVersion    INTEGER (0..4294967295) OPTIONAL,
     *    templateMinorVersion    INTEGER (0..4294967295) OPTIONAL
     * }
	 * ```
	 *
	 * @param {Object} parameters Input parameters for the schema
	 * @returns {Object} asn1js schema object
	 */
	static schema(parameters = {})
	{
		/**
		 * @type {Object}
		 * @property {string} [blockName]
		 * @property {string} [templateID]
		 * @property {string} [templateMajorVersion]
		 * @property {string} [templateMinorVersion]
		 */
		const names = getParametersValue(parameters, "names", {});

		return (new Sequence({
			name: (names.blockName || ""),
			value: [
				new ObjectIdentifier({ name: (names.templateID || "") }),
				new Integer({
					name: (names.templateMajorVersion || ""),
					optional: true
				}),
				new Integer({
					name: (names.templateMinorVersion || ""),
					optional: true
				}),
			]
		}));
	}
	//**********************************************************************************
	/**
	 * Convert parsed asn1js object into current class
	 * @param {!Object} schema
	 */
	fromSchema(schema)
	{
		//region Clear input data first
		clearProps(schema, [
			"templateID",
			"templateMajorVersion",
			"templateMinorVersion"
		]);
		//endregion

		//region Check the schema is valid
		let asn1 = compareSchema(schema,
			schema,
			CertificateTemplate.schema({
				names: {
					templateID: "templateID",
					templateMajorVersion: "templateMajorVersion",
					templateMinorVersion: "templateMinorVersion"
				}
			})
		);

		if(asn1.verified === false)
			throw new Error("Object's schema was not verified against input data for CertificateTemplate");
		//endregion

		//region Get internal properties from parsed schema
		this.templateID = asn1.result.templateID.valueBlock.toString();

		if("templateMajorVersion" in asn1.result)
			this.templateMajorVersion = asn1.result.templateMajorVersion.valueBlock.valueDec;

		if("templateMinorVersion" in asn1.result)
			this.templateMinorVersion = asn1.result.templateMinorVersion.valueBlock.valueDec;
		//endregion
	}
	//**********************************************************************************
	/**
	 * Convert current object to asn1js object and set correct values
	 * @returns {Object} asn1js object
	 */
	toSchema()
	{
		//region Create array for output sequence
		const outputArray = [];

		outputArray.push(new ObjectIdentifier({ value: this.templateID }));

		if("templateMajorVersion" in this)
			outputArray.push(new Integer({ value: this.templateMajorVersion }));

		if("templateMinorVersion" in this)
			outputArray.push(new Integer({ value: this.templateMinorVersion }));
		//endregion

		//region Construct and return new ASN.1 schema for this object
		return (new Sequence({
			value: outputArray
		}));
		//endregion
	}
	//**********************************************************************************
	/**
	 * Convertion for the class to JSON object
	 * @returns {Object}
	 */
	toJSON()
	{
		const object = {
			extnID: this.templateID
		};

		if("templateMajorVersion" in this)
			object.templateMajorVersion = this.templateMajorVersion;

		if("templateMinorVersion" in this)
			object.templateMinorVersion = this.templateMinorVersion;

		return object;
	}
	//**********************************************************************************
}
//**************************************************************************************

//**************************************************************************************
/**
 * Class from https://docs.microsoft.com/en-us/windows/desktop/seccrypto/certification-authority-renewal
 */
class CAVersion
{
	//**********************************************************************************
	/**
	 * Constructor for CAVersion class
	 * @param {Object} [parameters={}]
	 * @param {Object} [parameters.schema] asn1js parsed value to initialize the class from
	 */
	constructor(parameters = {})
	{
		//region Internal properties of the object
		/**
		 * @type {number}
		 * @desc certificateIndex
		 */
		this.certificateIndex = getParametersValue(parameters, "certificateIndex", CAVersion.defaultValues("certificateIndex"));

		/**
		 * @type {number}
		 * @desc keyIndex
		 */
		this.keyIndex = getParametersValue(parameters, "keyIndex", CAVersion.defaultValues("keyIndex"));
		//endregion

		//region If input argument array contains "schema" for this object
		if("schema" in parameters)
			this.fromSchema(parameters.schema);
		//endregion
	}
	//**********************************************************************************
	/**
	 * Return default values for all class members
	 * @param {string} memberName String name for a class member
	 */
	static defaultValues(memberName)
	{
		switch(memberName)
		{
			case "certificateIndex":
			case "keyIndex":
				return 0;
			default:
				throw new Error(`Invalid member name for CAVersion class: ${memberName}`);
		}
	}
	//**********************************************************************************
	/**
	 * Return value of pre-defined ASN.1 schema for current class
	 *
	 * ASN.1 schema:
	 * ```asn1
	 * CAVersion ::= INTEGER
	 * ```
	 *
	 * @param {Object} parameters Input parameters for the schema
	 * @returns {Object} asn1js schema object
	 */
	static schema(parameters = {})
	{
		return (new Integer());
	}
	//**********************************************************************************
	/**
	 * Convert parsed asn1js object into current class
	 * @param {!Object} schema
	 */
	fromSchema(schema)
	{
		//region Check the schema is valid
		if(schema.constructor.blockName() !== Integer.blockName())
			throw new Error("Object's schema was not verified against input data for CAVersion");
		//endregion

		//region Check length of the input value and correct it if needed
		let value = schema.valueBlock.valueHex.slice(0);
		const valueView = new Uint8Array(value);

		switch(true)
		{
			case (value.byteLength < 4):
				{
					const tempValue = new ArrayBuffer(4);
					const tempValueView = new Uint8Array(tempValue);

					tempValueView.set(valueView, 4 - value.byteLength);

					value = tempValue.slice(0);
				}
				break;
			case (value.byteLength > 4):
				{
					const tempValue = new ArrayBuffer(4);
					const tempValueView = new Uint8Array(tempValue);

					tempValueView.set(valueView.slice(0, 4));

					value = tempValue.slice(0);
				}
				break;
			default:
		}
		//endregion

		//region Get internal properties from parsed schema
		const keyIndexBuffer = value.slice(0, 2);
		const keyIndexView8 = new Uint8Array(keyIndexBuffer);
		let temp = keyIndexView8[0];
		keyIndexView8[0] = keyIndexView8[1];
		keyIndexView8[1] = temp;

		const keyIndexView16 = new Uint16Array(keyIndexBuffer);

		this.keyIndex = keyIndexView16[0];

		const certificateIndexBuffer = value.slice(2);
		const certificateIndexView8 = new Uint8Array(certificateIndexBuffer);
		temp = certificateIndexView8[0];
		certificateIndexView8[0] = certificateIndexView8[1];
		certificateIndexView8[1] = temp;

		const certificateIndexView16 = new Uint16Array(certificateIndexBuffer);

		this.certificateIndex = certificateIndexView16[0];
		//endregion
	}
	//**********************************************************************************
	/**
	 * Convert current object to asn1js object and set correct values
	 * @returns {Object} asn1js object
	 */
	toSchema()
	{
		//region Create raw values
		const certificateIndexBuffer = new ArrayBuffer(2);
		const certificateIndexView = new Uint16Array(certificateIndexBuffer);

		certificateIndexView[0] = this.certificateIndex;

		const certificateIndexView8 = new Uint8Array(certificateIndexBuffer);
		let temp = certificateIndexView8[0];
		certificateIndexView8[0] = certificateIndexView8[1];
		certificateIndexView8[1] = temp;

		const keyIndexBuffer = new ArrayBuffer(2);
		const keyIndexView = new Uint16Array(keyIndexBuffer);

		keyIndexView[0] = this.keyIndex;

		const keyIndexView8 = new Uint8Array(keyIndexBuffer);
		temp = keyIndexView8[0];
		keyIndexView8[0] = keyIndexView8[1];
		keyIndexView8[1] = temp;
		//endregion

		//region Construct and return new ASN.1 schema for this object
		return (new Integer({
			valueHex: utilConcatBuf(keyIndexBuffer, certificateIndexBuffer)
		}));
		//endregion
	}
	//**********************************************************************************
	/**
	 * Convertion for the class to JSON object
	 * @returns {Object}
	 */
	toJSON()
	{
		return {
			certificateIndex: this.certificateIndex,
			keyIndex: this.keyIndex
		};
	}
	//**********************************************************************************
}
//**************************************************************************************

//**************************************************************************************
/**
 * Class from RFC3739
 */
class QCStatement
{
	//**********************************************************************************
	/**
	 * Constructor for QCStatement class
	 * @param {Object} [parameters={}]
	 * @param {Object} [parameters.schema] asn1js parsed value to initialize the class from
	 */
	constructor(parameters = {})
	{
		//region Internal properties of the object
		/**
		 * @type {string}
		 */
		this.id = getParametersValue(parameters, "id", QCStatement.defaultValues("id"));

		if("type" in parameters)
		{
			/**
			 * @type {*} Any data described by "id"
			 */
			this.type = getParametersValue(parameters, "type", QCStatement.defaultValues("type"));
		}
		//endregion

		//region If input argument array contains "schema" for this object
		if("schema" in parameters)
			this.fromSchema(parameters.schema);
		//endregion
	}
	//**********************************************************************************
	/**
	 * Return default values for all class members
	 * @param {string} memberName String name for a class member
	 */
	static defaultValues(memberName)
	{
		switch(memberName)
		{
			case "id":
				return "";
			case "type":
				return new Null();
			default:
				throw new Error(`Invalid member name for QCStatement class: ${memberName}`);
		}
	}
	//**********************************************************************************
	/**
	 * Compare values with default values for all class members
	 * @param {string} memberName String name for a class member
	 * @param {*} memberValue Value to compare with default value
	 */
	static compareWithDefault(memberName, memberValue)
	{
		switch(memberName)
		{
			case "id":
				return (memberValue === "");
			case "type":
				return (memberValue instanceof Null);
			default:
				throw new Error(`Invalid member name for QCStatement class: ${memberName}`);
		}
	}
	//**********************************************************************************
	/**
	 * Return value of pre-defined ASN.1 schema for current class
	 *
	 * ASN.1 schema:
	 * ```asn1
 	 *	 QCStatement ::= SEQUENCE {
	 *       statementId   QC-STATEMENT.&id({SupportedStatements}),
	 *       statementInfo QC-STATEMENT.&Type({SupportedStatements}{@statementId}) OPTIONAL
	 *   }
	 * ```
	 *
	 * @param {Object} parameters Input parameters for the schema
	 * @returns {Object} asn1js schema object
	 */
	static schema(parameters = {})
	{
		/**
		 * @type {Object}
		 * @property {string} [blockName]
		 * @property {string} [id]
		 * @property {string} [type]
		 */
		const names = getParametersValue(parameters, "names", {});

		return (new Sequence({
			name: (names.blockName || ""),
			value: [
				new ObjectIdentifier({ name: (names.id || "") }),
				new Any({
					name: (names.type || ""),
					optional: true
				})
			]
		}));
	}
	//**********************************************************************************
	/**
	 * Convert parsed asn1js object into current class
	 * @param {!Object} schema
	 */
	fromSchema(schema)
	{
		//region Clear input data first
		clearProps(schema, [
			"id",
			"type"
		]);
		//endregion

		//region Check the schema is valid
		const asn1 = compareSchema(schema,
			schema,
			QCStatement.schema({
				names: {
					id: "id",
					type: "type"
				}
			})
		);

		if(asn1.verified === false)
			throw new Error("Object's schema was not verified against input data for QCStatement");
		//endregion

		//region Get internal properties from parsed schema
		this.id = asn1.result.id.valueBlock.toString();

		if("type" in asn1.result)
			this.type = asn1.result.type;
		//endregion
	}
	//**********************************************************************************
	/**
	 * Convert current object to asn1js object and set correct values
	 * @returns {Object} asn1js object
	 */
	toSchema()
	{
		const value = [
			new ObjectIdentifier({ value: this.id })
		];

		if("type" in this)
			value.push(this.type);

		//region Construct and return new ASN.1 schema for this object
		return (new Sequence({
			value
		}));
		//endregion
	}
	//**********************************************************************************
	/**
	 * Convertion for the class to JSON object
	 * @returns {Object}
	 */
	toJSON()
	{
		const object = {
			id: this.id
		};

		if("type" in this)
			object.type = this.type.toJSON();

		return object;
	}
	//**********************************************************************************
}
//**************************************************************************************
/**
 * Class from RFC3739
 */
class QCStatements
{
	//**********************************************************************************
	/**
	 * Constructor for QCStatements class
	 * @param {Object} [parameters={}]
	 * @param {Object} [parameters.schema] asn1js parsed value to initialize the class from
	 */
	constructor(parameters = {})
	{
		//region Internal properties of the object
		/**
		 * @type {Array<QCStatement>}
		 */
		this.values = getParametersValue(parameters, "values", QCStatements.defaultValues("values"));
		//endregion

		//region If input argument array contains "schema" for this object
		if("schema" in parameters)
			this.fromSchema(parameters.schema);
		//endregion
	}
	//**********************************************************************************
	/**
	 * Return default values for all class members
	 * @param {string} memberName String name for a class member
	 */
	static defaultValues(memberName)
	{
		switch(memberName)
		{
			case "values":
				return [];
			default:
				throw new Error(`Invalid member name for QCStatements class: ${memberName}`);
		}
	}
	//**********************************************************************************
	/**
	 * Compare values with default values for all class members
	 * @param {string} memberName String name for a class member
	 * @param {*} memberValue Value to compare with default value
	 */
	static compareWithDefault(memberName, memberValue)
	{
		switch(memberName)
		{
			case "values":
				return (memberValue.length === 0);
			default:
				throw new Error(`Invalid member name for QCStatements class: ${memberName}`);
		}
	}
	//**********************************************************************************
	/**
	 * Return value of pre-defined ASN.1 schema for current class
	 *
	 * ASN.1 schema:
	 * ```asn1
	 * QCStatements ::= SEQUENCE OF QCStatement
	 * ```
	 *
	 * @param {Object} parameters Input parameters for the schema
	 * @returns {Object} asn1js schema object
	 */
	static schema(parameters = {})
	{
		/**
		 * @type {Object}
		 * @property {string} [blockName]
		 * @property {string} [values]
		 */
		const names = getParametersValue(parameters, "names", {});

		return (new Sequence({
			name: (names.blockName || ""),
			value: [
				new Repeated({
					name: (names.values || ""),
					value: QCStatement.schema(names.value || {})
				}),
			]
		}));
	}
	//**********************************************************************************
	/**
	 * Convert parsed asn1js object into current class
	 * @param {!Object} schema
	 */
	fromSchema(schema)
	{
		//region Clear input data first
		clearProps(schema, [
			"values"
		]);
		//endregion

		//region Check the schema is valid
		const asn1 = compareSchema(schema,
			schema,
			QCStatements.schema({
				names: {
					values: "values"
				}
			})
		);

		if(asn1.verified === false)
			throw new Error("Object's schema was not verified against input data for QCStatements");
		//endregion

		//region Get internal properties from parsed schema
		this.values = Array.from(asn1.result.values, element => new QCStatement({ schema: element }));
		//endregion
	}
	//**********************************************************************************
	/**
	 * Convert current object to asn1js object and set correct values
	 * @returns {Object} asn1js object
	 */
	toSchema()
	{
		//region Construct and return new ASN.1 schema for this object
		return (new Sequence({
			value: Array.from(this.values, element => element.toSchema())
		}));
		//endregion
	}
	//**********************************************************************************
	/**
	 * Convertion for the class to JSON object
	 * @returns {Object}
	 */
	toJSON()
	{
		return {
			extensions: Array.from(this.values, element => element.toJSON())
		};
	}
	//**********************************************************************************
}
//**************************************************************************************

//**************************************************************************************
/**
 * Class from RFC5280
 */
class Extension
{
	//**********************************************************************************
	/**
	 * Constructor for Extension class
	 * @param {Object} [parameters={}]
	 * @param {Object} [parameters.schema] asn1js parsed value to initialize the class from
	 */
	constructor(parameters = {})
	{
		//region Internal properties of the object
		/**
		 * @type {string}
		 * @desc extnID
		 */
		this.extnID = getParametersValue(parameters, "extnID", Extension.defaultValues("extnID"));
		/**
		 * @type {boolean}
		 * @desc critical
		 */
		this.critical = getParametersValue(parameters, "critical", Extension.defaultValues("critical"));
		/**
		 * @type {OctetString}
		 * @desc extnValue
		 */
		if("extnValue" in parameters)
			this.extnValue = new OctetString({ valueHex: parameters.extnValue });
		else
			this.extnValue = Extension.defaultValues("extnValue");

		if("parsedValue" in parameters)
			/**
			 * @type {Object}
			 * @desc parsedValue
			 */
			this.parsedValue = getParametersValue(parameters, "parsedValue", Extension.defaultValues("parsedValue"));
		//endregion

		//region If input argument array contains "schema" for this object
		if("schema" in parameters)
			this.fromSchema(parameters.schema);
		//endregion
	}
	//**********************************************************************************
	/**
	 * Return default values for all class members
	 * @param {string} memberName String name for a class member
	 */
	static defaultValues(memberName)
	{
		switch(memberName)
		{
			case "extnID":
				return "";
			case "critical":
				return false;
			case "extnValue":
				return new OctetString();
			case "parsedValue":
				return {};
			default:
				throw new Error(`Invalid member name for Extension class: ${memberName}`);
		}
	}
	//**********************************************************************************
	/**
	 * Return value of pre-defined ASN.1 schema for current class
	 *
	 * ASN.1 schema:
	 * ```asn1
	 * Extension  ::=  SEQUENCE  {
	 *    extnID      OBJECT IDENTIFIER,
	 *    critical    BOOLEAN DEFAULT FALSE,
	 *    extnValue   OCTET STRING
	 * }
	 * ```
	 *
	 * @param {Object} parameters Input parameters for the schema
	 * @returns {Object} asn1js schema object
	 */
	static schema(parameters = {})
	{
		/**
		 * @type {Object}
		 * @property {string} [blockName]
		 * @property {string} [extnID]
		 * @property {string} [critical]
		 * @property {string} [extnValue]
		 */
		const names = getParametersValue(parameters, "names", {});

		return (new Sequence({
			name: (names.blockName || ""),
			value: [
				new ObjectIdentifier({ name: (names.extnID || "") }),
				new Boolean({
					name: (names.critical || ""),
					optional: true
				}),
				new OctetString({ name: (names.extnValue || "") })
			]
		}));
	}
	//**********************************************************************************
	/**
	 * Convert parsed asn1js object into current class
	 * @param {!Object} schema
	 */
	fromSchema(schema)
	{
		//region Clear input data first
		clearProps(schema, [
			"extnID",
			"critical",
			"extnValue"
		]);
		//endregion
		
		//region Check the schema is valid
		let asn1 = compareSchema(schema,
			schema,
			Extension.schema({
				names: {
					extnID: "extnID",
					critical: "critical",
					extnValue: "extnValue"
				}
			})
		);

		if(asn1.verified === false)
			throw new Error("Object's schema was not verified against input data for Extension");
		//endregion

		//region Get internal properties from parsed schema
		this.extnID = asn1.result.extnID.valueBlock.toString();
		if("critical" in asn1.result)
			this.critical = asn1.result.critical.valueBlock.value;
		this.extnValue = asn1.result.extnValue;

		//region Get "parsedValue" for well-known extensions
		asn1 = fromBER(this.extnValue.valueBlock.valueHex);
		if(asn1.offset === (-1))
			return;

		switch(this.extnID)
		{
			case "2.5.29.9": // SubjectDirectoryAttributes
				try
				{
					this.parsedValue = new SubjectDirectoryAttributes({ schema: asn1.result });
				}
				catch(ex)
				{
					this.parsedValue = new SubjectDirectoryAttributes();
					this.parsedValue.parsingError = "Incorrectly formated SubjectDirectoryAttributes";
				}
				break;
			case "2.5.29.14": // SubjectKeyIdentifier
				this.parsedValue = asn1.result; // Should be just a simple OCTETSTRING
				break;
			case "2.5.29.15": // KeyUsage
				this.parsedValue = asn1.result; // Should be just a simple BITSTRING
				break;
			case "2.5.29.16": // PrivateKeyUsagePeriod
				try
				{
					this.parsedValue = new PrivateKeyUsagePeriod({ schema: asn1.result });
				}
				catch(ex)
				{
					this.parsedValue = new PrivateKeyUsagePeriod();
					this.parsedValue.parsingError = "Incorrectly formated PrivateKeyUsagePeriod";
				}
				break;
			case "2.5.29.17": // SubjectAltName
			case "2.5.29.18": // IssuerAltName
				try
				{
					this.parsedValue = new AltName({ schema: asn1.result });
				}
				catch(ex)
				{
					this.parsedValue = new AltName();
					this.parsedValue.parsingError = "Incorrectly formated AltName";
				}
				break;
			case "2.5.29.19": // BasicConstraints
				try
				{
					this.parsedValue = new BasicConstraints({ schema: asn1.result });
				}
				catch(ex)
				{
					this.parsedValue = new BasicConstraints();
					this.parsedValue.parsingError = "Incorrectly formated BasicConstraints";
				}
				break;
			case "2.5.29.20": // CRLNumber
			case "2.5.29.27": // BaseCRLNumber (delta CRL indicator)
				this.parsedValue = asn1.result; // Should be just a simple INTEGER
				break;
			case "2.5.29.21": // CRLReason
				this.parsedValue = asn1.result; // Should be just a simple ENUMERATED
				break;
			case "2.5.29.24": // InvalidityDate
				this.parsedValue = asn1.result; // Should be just a simple GeneralizedTime
				break;
			case "2.5.29.28": // IssuingDistributionPoint
				try
				{
					this.parsedValue = new IssuingDistributionPoint({ schema: asn1.result });
				}
				catch(ex)
				{
					this.parsedValue = new IssuingDistributionPoint();
					this.parsedValue.parsingError = "Incorrectly formated IssuingDistributionPoint";
				}
				break;
			case "2.5.29.29": // CertificateIssuer
				try
				{
					this.parsedValue = new GeneralNames({ schema: asn1.result }); // Should be just a simple
				}
				catch(ex)
				{
					this.parsedValue = new GeneralNames();
					this.parsedValue.parsingError = "Incorrectly formated GeneralNames";
				}
				break;
			case "2.5.29.30": // NameConstraints
				try
				{
					this.parsedValue = new NameConstraints({ schema: asn1.result });
				}
				catch(ex)
				{
					this.parsedValue = new NameConstraints();
					this.parsedValue.parsingError = "Incorrectly formated NameConstraints";
				}
				break;
			case "2.5.29.31": // CRLDistributionPoints
			case "2.5.29.46": // FreshestCRL
				try
				{
					this.parsedValue = new CRLDistributionPoints({ schema: asn1.result });
				}
				catch(ex)
				{
					this.parsedValue = new CRLDistributionPoints();
					this.parsedValue.parsingError = "Incorrectly formated CRLDistributionPoints";
				}
				break;
			case "2.5.29.32": // CertificatePolicies
			case "1.3.6.1.4.1.311.21.10": // szOID_APPLICATION_CERT_POLICIES - Microsoft-specific OID
				try
				{
					this.parsedValue = new CertificatePolicies({ schema: asn1.result });
				}
				catch(ex)
				{
					this.parsedValue = new CertificatePolicies();
					this.parsedValue.parsingError = "Incorrectly formated CertificatePolicies";
				}
				break;
			case "2.5.29.33": // PolicyMappings
				try
				{
					this.parsedValue = new PolicyMappings({ schema: asn1.result });
				}
				catch(ex)
				{
					this.parsedValue = new PolicyMappings();
					this.parsedValue.parsingError = "Incorrectly formated CertificatePolicies";
				}
				break;
			case "2.5.29.35": // AuthorityKeyIdentifier
				try
				{
					this.parsedValue = new AuthorityKeyIdentifier({ schema: asn1.result });
				}
				catch(ex)
				{
					this.parsedValue = new AuthorityKeyIdentifier();
					this.parsedValue.parsingError = "Incorrectly formated AuthorityKeyIdentifier";
				}
				break;
			case "2.5.29.36": // PolicyConstraints
				try
				{
					this.parsedValue = new PolicyConstraints({ schema: asn1.result });
				}
				catch(ex)
				{
					this.parsedValue = new PolicyConstraints();
					this.parsedValue.parsingError = "Incorrectly formated PolicyConstraints";
				}
				break;
			case "2.5.29.37": // ExtKeyUsage
				try
				{
					this.parsedValue = new ExtKeyUsage({ schema: asn1.result });
				}
				catch(ex)
				{
					this.parsedValue = new ExtKeyUsage();
					this.parsedValue.parsingError = "Incorrectly formated ExtKeyUsage";
				}
				break;
			case "2.5.29.54": // InhibitAnyPolicy
				this.parsedValue = asn1.result; // Should be just a simple INTEGER
				break;
			case "1.3.6.1.5.5.7.1.1": // AuthorityInfoAccess
			case "1.3.6.1.5.5.7.1.11": // SubjectInfoAccess
				try
				{
					this.parsedValue = new InfoAccess({ schema: asn1.result });
				}
				catch(ex)
				{
					this.parsedValue = new InfoAccess();
					this.parsedValue.parsingError = "Incorrectly formated InfoAccess";
				}
				break;
			case "1.3.6.1.4.1.11129.2.4.2": // SignedCertificateTimestampList
				try
				{
					this.parsedValue = new SignedCertificateTimestampList({ schema: asn1.result });
				}
				catch(ex)
				{
					this.parsedValue = new SignedCertificateTimestampList();
					this.parsedValue.parsingError = "Incorrectly formated SignedCertificateTimestampList";
				}
				break;
			case "1.3.6.1.4.1.311.20.2": // szOID_ENROLL_CERTTYPE_EXTENSION - Microsoft-specific extension
				this.parsedValue = asn1.result; // Used to be simple Unicode string
				break;
			case "1.3.6.1.4.1.311.21.2": // szOID_CERTSRV_PREVIOUS_CERT_HASH - Microsoft-specific extension
				this.parsedValue = asn1.result; // Used to be simple OctetString
				break;
			case "1.3.6.1.4.1.311.21.7": // szOID_CERTIFICATE_TEMPLATE - Microsoft-specific extension
				try
				{
					this.parsedValue = new CertificateTemplate({ schema: asn1.result });
				}
				catch(ex)
				{
					this.parsedValue = new CertificateTemplate();
					this.parsedValue.parsingError = "Incorrectly formated CertificateTemplate";
				}
				break;
			case "1.3.6.1.4.1.311.21.1": // szOID_CERTSRV_CA_VERSION - Microsoft-specific extension
				try
				{
					this.parsedValue = new CAVersion({ schema: asn1.result });
				}
				catch(ex)
				{
					this.parsedValue = new CAVersion();
					this.parsedValue.parsingError = "Incorrectly formated CAVersion";
				}
				break;
			case "1.3.6.1.5.5.7.1.3": // QCStatements
				try
				{
					this.parsedValue = new QCStatements({ schema: asn1.result });
				}
				catch(ex)
				{
					this.parsedValue = new QCStatements();
					this.parsedValue.parsingError = "Incorrectly formated QCStatements";
				}
				break;
			default:
		}
		//endregion
		//endregion
	}
	//**********************************************************************************
	/**
	 * Convert current object to asn1js object and set correct values
	 * @returns {Object} asn1js object
	 */
	toSchema()
	{
		//region Create array for output sequence
		const outputArray = [];

		outputArray.push(new ObjectIdentifier({ value: this.extnID }));

		if(this.critical !== Extension.defaultValues("critical"))
			outputArray.push(new Boolean({ value: this.critical }));

		outputArray.push(this.extnValue);
		//endregion

		//region Construct and return new ASN.1 schema for this object
		return (new Sequence({
			value: outputArray
		}));
		//endregion
	}
	//**********************************************************************************
	/**
	 * Convertion for the class to JSON object
	 * @returns {Object}
	 */
	toJSON()
	{
		const object = {
			extnID: this.extnID,
			extnValue: this.extnValue.toJSON()
		};

		if(this.critical !== Extension.defaultValues("critical"))
			object.critical = this.critical;

		if("parsedValue" in this)
		{
			if("toJSON" in this.parsedValue)
				object.parsedValue = this.parsedValue.toJSON();
		}

		return object;
	}
	//**********************************************************************************
}
//**************************************************************************************

//**************************************************************************************
/**
 * Class from RFC5280
 */
class Extensions
{
	//**********************************************************************************
	/**
	 * Constructor for Extensions class
	 * @param {Object} [parameters={}]
	 * @param {Object} [parameters.schema] asn1js parsed value to initialize the class from
	 */
	constructor(parameters = {})
	{
		//region Internal properties of the object
		/**
		 * @type {Array.<Extension>}
		 * @desc type
		 */
		this.extensions = getParametersValue(parameters, "extensions", Extensions.defaultValues("extensions"));
		//endregion

		//region If input argument array contains "schema" for this object
		if("schema" in parameters)
			this.fromSchema(parameters.schema);
		//endregion
	}
	//**********************************************************************************
	/**
	 * Return default values for all class members
	 * @param {string} memberName String name for a class member
	 */
	static defaultValues(memberName)
	{
		switch(memberName)
		{
			case "extensions":
				return [];
			default:
				throw new Error(`Invalid member name for Extensions class: ${memberName}`);
		}
	}
	//**********************************************************************************
	/**
	 * Return value of pre-defined ASN.1 schema for current class
	 *
	 * ASN.1 schema:
	 * ```asn1
	 * Extensions  ::=  SEQUENCE SIZE (1..MAX) OF Extension
	 * ```
	 *
	 * @param {Object} parameters Input parameters for the schema
	 * @param {boolean} optional Flag that current schema should be optional
	 * @returns {Object} asn1js schema object
	 */
	static schema(parameters = {}, optional = false)
	{
		/**
		 * @type {Object}
		 * @property {string} [blockName]
		 * @property {string} [extensions]
		 * @property {string} [extension]
		 */
		const names = getParametersValue(parameters, "names", {});

		return (new Sequence({
			optional,
			name: (names.blockName || ""),
			value: [
				new Repeated({
					name: (names.extensions || ""),
					value: Extension.schema(names.extension || {})
				})
			]
		}));
	}
	//**********************************************************************************
	/**
	 * Convert parsed asn1js object into current class
	 * @param {!Object} schema
	 */
	fromSchema(schema)
	{
		//region Clear input data first
		clearProps(schema, [
			"extensions"
		]);
		//endregion
		
		//region Check the schema is valid
		const asn1 = compareSchema(schema,
			schema,
			Extensions.schema({
				names: {
					extensions: "extensions"
				}
			})
		);

		if(asn1.verified === false)
			throw new Error("Object's schema was not verified against input data for Extensions");
		//endregion

		//region Get internal properties from parsed schema
		this.extensions = Array.from(asn1.result.extensions, element => new Extension({ schema: element }));
		//endregion
	}
	//**********************************************************************************
	/**
	 * Convert current object to asn1js object and set correct values
	 * @returns {Object} asn1js object
	 */
	toSchema()
	{
		//region Construct and return new ASN.1 schema for this object
		return (new Sequence({
			value: Array.from(this.extensions, element => element.toSchema())
		}));
		//endregion
	}
	//**********************************************************************************
	/**
	 * Convertion for the class to JSON object
	 * @returns {Object}
	 */
	toJSON()
	{
		return {
			extensions: Array.from(this.extensions, element => element.toJSON())
		};
	}
	//**********************************************************************************
}
//**************************************************************************************

//**************************************************************************************
function tbsCertificate(parameters = {})
{
	//TBSCertificate  ::=  SEQUENCE  {
	//    version         [0]  EXPLICIT Version DEFAULT v1,
	//    serialNumber         CertificateSerialNumber,
	//    signature            AlgorithmIdentifier,
	//    issuer               Name,
	//    validity             Validity,
	//    subject              Name,
	//    subjectPublicKeyInfo SubjectPublicKeyInfo,
	//    issuerUniqueID  [1]  IMPLICIT UniqueIdentifier OPTIONAL,
	//                         -- If present, version MUST be v2 or v3
	//    subjectUniqueID [2]  IMPLICIT UniqueIdentifier OPTIONAL,
	//                         -- If present, version MUST be v2 or v3
	//    extensions      [3]  EXPLICIT Extensions OPTIONAL
	//    -- If present, version MUST be v3
	//}
	
	/**
	 * @type {Object}
	 * @property {string} [blockName]
	 * @property {string} [tbsCertificateVersion]
	 * @property {string} [tbsCertificateSerialNumber]
	 * @property {string} [signature]
	 * @property {string} [issuer]
	 * @property {string} [tbsCertificateValidity]
	 * @property {string} [notBefore]
	 * @property {string} [notAfter]
	 * @property {string} [subject]
	 * @property {string} [subjectPublicKeyInfo]
	 * @property {string} [tbsCertificateIssuerUniqueID]
	 * @property {string} [tbsCertificateSubjectUniqueID]
	 * @property {string} [extensions]
	 */
	const names = getParametersValue(parameters, "names", {});
	
	return (new Sequence({
		name: (names.blockName || "tbsCertificate"),
		value: [
			new Constructed({
				optional: true,
				idBlock: {
					tagClass: 3, // CONTEXT-SPECIFIC
					tagNumber: 0 // [0]
				},
				value: [
					new Integer({ name: (names.tbsCertificateVersion || "tbsCertificate.version") }) // EXPLICIT integer value
				]
			}),
			new Integer({ name: (names.tbsCertificateSerialNumber || "tbsCertificate.serialNumber") }),
			AlgorithmIdentifier.schema(names.signature || {
				names: {
					blockName: "tbsCertificate.signature"
				}
			}),
			RelativeDistinguishedNames.schema(names.issuer || {
				names: {
					blockName: "tbsCertificate.issuer"
				}
			}),
			new Sequence({
				name: (names.tbsCertificateValidity || "tbsCertificate.validity"),
				value: [
					Time.schema(names.notBefore || {
						names: {
							utcTimeName: "tbsCertificate.notBefore",
							generalTimeName: "tbsCertificate.notBefore"
						}
					}),
					Time.schema(names.notAfter || {
						names: {
							utcTimeName: "tbsCertificate.notAfter",
							generalTimeName: "tbsCertificate.notAfter"
						}
					})
				]
			}),
			RelativeDistinguishedNames.schema(names.subject || {
				names: {
					blockName: "tbsCertificate.subject"
				}
			}),
			PublicKeyInfo.schema(names.subjectPublicKeyInfo || {
				names: {
					blockName: "tbsCertificate.subjectPublicKeyInfo"
				}
			}),
			new Primitive({
				name: (names.tbsCertificateIssuerUniqueID || "tbsCertificate.issuerUniqueID"),
				optional: true,
				idBlock: {
					tagClass: 3, // CONTEXT-SPECIFIC
					tagNumber: 1 // [1]
				}
			}), // IMPLICIT bistring value
			new Primitive({
				name: (names.tbsCertificateSubjectUniqueID || "tbsCertificate.subjectUniqueID"),
				optional: true,
				idBlock: {
					tagClass: 3, // CONTEXT-SPECIFIC
					tagNumber: 2 // [2]
				}
			}), // IMPLICIT bistring value
			new Constructed({
				optional: true,
				idBlock: {
					tagClass: 3, // CONTEXT-SPECIFIC
					tagNumber: 3 // [3]
				},
				value: [Extensions.schema(names.extensions || {
					names: {
						blockName: "tbsCertificate.extensions"
					}
				})]
			}) // EXPLICIT SEQUENCE value
		]
	}));
}
//**************************************************************************************
/**
 * Class from RFC5280
 */
class Certificate
{
	//**********************************************************************************
	/**
	 * Constructor for Certificate class
	 * @param {Object} [parameters={}]
	 * @param {Object} [parameters.schema] asn1js parsed value to initialize the class from
	 */
	constructor(parameters = {})
	{
		//region Internal properties of the object
		/**
		 * @type {ArrayBuffer}
		 * @desc ToBeSigned (TBS) part of the certificate
		 */
		this.tbs = getParametersValue(parameters, "tbs", Certificate.defaultValues("tbs"));
		/**
		 * @type {number}
		 * @desc Version number
		 */
		this.version = getParametersValue(parameters, "version", Certificate.defaultValues("version"));
		/**
		 * @type {Integer}
		 * @desc Serial number of the certificate
		 */
		this.serialNumber = getParametersValue(parameters, "serialNumber", Certificate.defaultValues("serialNumber"));
		/**
		 * @type {AlgorithmIdentifier}
		 * @desc This field contains the algorithm identifier for the algorithm used by the CA to sign the certificate
		 */
		this.signature = getParametersValue(parameters, "signature", Certificate.defaultValues("signature"));
		/**
		 * @type {RelativeDistinguishedNames}
		 * @desc The issuer field identifies the entity that has signed and issued the certificate
		 */
		this.issuer = getParametersValue(parameters, "issuer", Certificate.defaultValues("issuer"));
		/**
		 * @type {Time}
		 * @desc The date on which the certificate validity period begins
		 */
		this.notBefore = getParametersValue(parameters, "notBefore", Certificate.defaultValues("notBefore"));
		/**
		 * @type {Time}
		 * @desc The date on which the certificate validity period ends
		 */
		this.notAfter = getParametersValue(parameters, "notAfter", Certificate.defaultValues("notAfter"));
		/**
		 * @type {RelativeDistinguishedNames}
		 * @desc The subject field identifies the entity associated with the public key stored in the subject public key field
		 */
		this.subject = getParametersValue(parameters, "subject", Certificate.defaultValues("subject"));
		/**
		 * @type {PublicKeyInfo}
		 * @desc This field is used to carry the public key and identify the algorithm with which the key is used
		 */
		this.subjectPublicKeyInfo = getParametersValue(parameters, "subjectPublicKeyInfo", Certificate.defaultValues("subjectPublicKeyInfo"));
		
		if("issuerUniqueID" in parameters)
			/**
			 * @type {ArrayBuffer}
			 * @desc The subject and issuer unique identifiers are present in the certificate to handle the possibility of reuse of subject and/or issuer names over time
			 */
			this.issuerUniqueID = getParametersValue(parameters, "issuerUniqueID", Certificate.defaultValues("issuerUniqueID"));
		
		if("subjectUniqueID" in parameters)
			/**
			 * @type {ArrayBuffer}
			 * @desc The subject and issuer unique identifiers are present in the certificate to handle the possibility of reuse of subject and/or issuer names over time
			 */
			this.subjectUniqueID = getParametersValue(parameters, "subjectUniqueID", Certificate.defaultValues("subjectUniqueID"));
		
		if("extensions" in parameters)
			/**
			 * @type {Array}
			 * @desc If present, this field is a SEQUENCE of one or more certificate extensions
			 */
			this.extensions = getParametersValue(parameters, "extensions", Certificate.defaultValues("extensions"));
		
		/**
		 * @type {AlgorithmIdentifier}
		 * @desc The signatureAlgorithm field contains the identifier for the cryptographic algorithm used by the CA to sign this certificate
		 */
		this.signatureAlgorithm = getParametersValue(parameters, "signatureAlgorithm", Certificate.defaultValues("signatureAlgorithm"));
		/**
		 * @type {BitString}
		 * @desc The signatureValue field contains a digital signature computed upon the ASN.1 DER encoded tbsCertificate
		 */
		this.signatureValue = getParametersValue(parameters, "signatureValue", Certificate.defaultValues("signatureValue"));
		//endregion
		
		//region If input argument array contains "schema" for this object
		if("schema" in parameters)
			this.fromSchema(parameters.schema);
		//endregion
	}
	//**********************************************************************************
	/**
	 * Return default values for all class members
	 * @param {string} memberName String name for a class member
	 */
	static defaultValues(memberName)
	{
		switch(memberName)
		{
			case "tbs":
				return new ArrayBuffer(0);
			case "version":
				return 0;
			case "serialNumber":
				return new Integer();
			case "signature":
				return new AlgorithmIdentifier();
			case "issuer":
				return new RelativeDistinguishedNames();
			case "notBefore":
				return new Time();
			case "notAfter":
				return new Time();
			case "subject":
				return new RelativeDistinguishedNames();
			case "subjectPublicKeyInfo":
				return new PublicKeyInfo();
			case "issuerUniqueID":
				return new ArrayBuffer(0);
			case "subjectUniqueID":
				return new ArrayBuffer(0);
			case "extensions":
				return [];
			case "signatureAlgorithm":
				return new AlgorithmIdentifier();
			case "signatureValue":
				return new BitString();
			default:
				throw new Error(`Invalid member name for Certificate class: ${memberName}`);
		}
	}
	//**********************************************************************************
	/**
	 * Return value of pre-defined ASN.1 schema for current class
	 *
	 * ASN.1 schema:
	 * ```asn1
	 * Certificate  ::=  SEQUENCE  {
	 *    tbsCertificate       TBSCertificate,
	 *    signatureAlgorithm   AlgorithmIdentifier,
	 *    signatureValue       BIT STRING  }
	 * ```
	 *
	 * @param {Object} parameters Input parameters for the schema
	 * @returns {Object} asn1js schema object
	 */
	static schema(parameters = {})
	{
		/**
		 * @type {Object}
		 * @property {string} [blockName]
		 * @property {string} [tbsCertificate]
		 * @property {string} [signatureAlgorithm]
		 * @property {string} [signatureValue]
		 */
		const names = getParametersValue(parameters, "names", {});
		
		return (new Sequence({
			name: (names.blockName || ""),
			value: [
				tbsCertificate(names.tbsCertificate),
				AlgorithmIdentifier.schema(names.signatureAlgorithm || {
					names: {
						blockName: "signatureAlgorithm"
					}
				}),
				new BitString({ name: (names.signatureValue || "signatureValue") })
			]
		}));
	}
	//**********************************************************************************
	/**
	 * Convert parsed asn1js object into current class
	 * @param {!Object} schema
	 */
	fromSchema(schema)
	{
		//region Clear input data first
		clearProps(schema, [
			"tbsCertificate",
			"tbsCertificate.extensions",
			"tbsCertificate.version",
			"tbsCertificate.serialNumber",
			"tbsCertificate.signature",
			"tbsCertificate.issuer",
			"tbsCertificate.notBefore",
			"tbsCertificate.notAfter",
			"tbsCertificate.subject",
			"tbsCertificate.subjectPublicKeyInfo",
			"tbsCertificate.issuerUniqueID",
			"tbsCertificate.subjectUniqueID",
			"signatureAlgorithm",
			"signatureValue"
		]);
		//endregion
		
		//region Check the schema is valid
		const asn1 = compareSchema(schema,
			schema,
			Certificate.schema({
				names: {
					tbsCertificate: {
						names: {
							extensions: {
								names: {
									extensions: "tbsCertificate.extensions"
								}
							}
						}
					}
				}
			})
		);
		
		if(asn1.verified === false)
			throw new Error("Object's schema was not verified against input data for Certificate");
		//endregion
		
		//region Get internal properties from parsed schema
		this.tbs = asn1.result.tbsCertificate.valueBeforeDecode;
		
		if("tbsCertificate.version" in asn1.result)
			this.version = asn1.result["tbsCertificate.version"].valueBlock.valueDec;
		this.serialNumber = asn1.result["tbsCertificate.serialNumber"];
		this.signature = new AlgorithmIdentifier({ schema: asn1.result["tbsCertificate.signature"] });
		this.issuer = new RelativeDistinguishedNames({ schema: asn1.result["tbsCertificate.issuer"] });
		this.notBefore = new Time({ schema: asn1.result["tbsCertificate.notBefore"] });
		this.notAfter = new Time({ schema: asn1.result["tbsCertificate.notAfter"] });
		this.subject = new RelativeDistinguishedNames({ schema: asn1.result["tbsCertificate.subject"] });
		this.subjectPublicKeyInfo = new PublicKeyInfo({ schema: asn1.result["tbsCertificate.subjectPublicKeyInfo"] });
		if("tbsCertificate.issuerUniqueID" in asn1.result)
			this.issuerUniqueID = asn1.result["tbsCertificate.issuerUniqueID"].valueBlock.valueHex;
		if("tbsCertificate.subjectUniqueID" in asn1.result)
			this.subjectUniqueID = asn1.result["tbsCertificate.subjectUniqueID"].valueBlock.valueHex;
		if("tbsCertificate.extensions" in asn1.result)
			this.extensions = Array.from(asn1.result["tbsCertificate.extensions"], element => new Extension({ schema: element }));
		
		this.signatureAlgorithm = new AlgorithmIdentifier({ schema: asn1.result.signatureAlgorithm });
		this.signatureValue = asn1.result.signatureValue;
		//endregion
	}
	//**********************************************************************************
	/**
	 * Create ASN.1 schema for existing values of TBS part for the certificate
	 */
	encodeTBS()
	{
		//region Create array for output sequence
		const outputArray = [];
		
		if(("version" in this) && (this.version !== Certificate.defaultValues("version")))
		{
			outputArray.push(new Constructed({
				optional: true,
				idBlock: {
					tagClass: 3, // CONTEXT-SPECIFIC
					tagNumber: 0 // [0]
				},
				value: [
					new Integer({ value: this.version }) // EXPLICIT integer value
				]
			}));
		}
		
		outputArray.push(this.serialNumber);
		outputArray.push(this.signature.toSchema());
		outputArray.push(this.issuer.toSchema());
		
		outputArray.push(new Sequence({
			value: [
				this.notBefore.toSchema(),
				this.notAfter.toSchema()
			]
		}));
		
		outputArray.push(this.subject.toSchema());
		outputArray.push(this.subjectPublicKeyInfo.toSchema());
		
		if("issuerUniqueID" in this)
		{
			outputArray.push(new Primitive({
				optional: true,
				idBlock: {
					tagClass: 3, // CONTEXT-SPECIFIC
					tagNumber: 1 // [1]
				},
				valueHex: this.issuerUniqueID
			}));
		}
		if("subjectUniqueID" in this)
		{
			outputArray.push(new Primitive({
				optional: true,
				idBlock: {
					tagClass: 3, // CONTEXT-SPECIFIC
					tagNumber: 2 // [2]
				},
				valueHex: this.subjectUniqueID
			}));
		}
		
		if("extensions" in this)
		{
			outputArray.push(new Constructed({
				optional: true,
				idBlock: {
					tagClass: 3, // CONTEXT-SPECIFIC
					tagNumber: 3 // [3]
				},
				value: [new Sequence({
					value: Array.from(this.extensions, element => element.toSchema())
				})]
			}));
		}
		//endregion
		
		//region Create and return output sequence
		return (new Sequence({
			value: outputArray
		}));
		//endregion
	}
	//**********************************************************************************
	/**
	 * Convert current object to asn1js object and set correct values
	 * @returns {Object} asn1js object
	 */
	toSchema(encodeFlag = false)
	{
		let tbsSchema = {};
		
		//region Decode stored TBS value
		if(encodeFlag === false)
		{
			if(this.tbs.length === 0) // No stored certificate TBS part
				return Certificate.schema().value[0];
			
			tbsSchema = fromBER(this.tbs).result;
		}
		//endregion
		//region Create TBS schema via assembling from TBS parts
		else
			tbsSchema = this.encodeTBS();
		//endregion
		
		//region Construct and return new ASN.1 schema for this object
		return (new Sequence({
			value: [
				tbsSchema,
				this.signatureAlgorithm.toSchema(),
				this.signatureValue
			]
		}));
		//endregion
	}
	//**********************************************************************************
	/**
	 * Convertion for the class to JSON object
	 * @returns {Object}
	 */
	toJSON()
	{
		const object = {
			tbs: bufferToHexCodes(this.tbs, 0, this.tbs.byteLength),
			serialNumber: this.serialNumber.toJSON(),
			signature: this.signature.toJSON(),
			issuer: this.issuer.toJSON(),
			notBefore: this.notBefore.toJSON(),
			notAfter: this.notAfter.toJSON(),
			subject: this.subject.toJSON(),
			subjectPublicKeyInfo: this.subjectPublicKeyInfo.toJSON(),
			signatureAlgorithm: this.signatureAlgorithm.toJSON(),
			signatureValue: this.signatureValue.toJSON()
		};
		
		if(("version" in this) && (this.version !== Certificate.defaultValues("version")))
			object.version = this.version;
		
		if("issuerUniqueID" in this)
			object.issuerUniqueID = bufferToHexCodes(this.issuerUniqueID, 0, this.issuerUniqueID.byteLength);
		
		if("subjectUniqueID" in this)
			object.subjectUniqueID = bufferToHexCodes(this.subjectUniqueID, 0, this.subjectUniqueID.byteLength);
		
		if("extensions" in this)
			object.extensions = Array.from(this.extensions, element => element.toJSON());
		
		return object;
	}
	//**********************************************************************************
	/**
	 * Importing public key for current certificate
	 */
	getPublicKey(parameters = null)
	{
		return getEngine().subtle.getPublicKey(this.subjectPublicKeyInfo, this.signatureAlgorithm, parameters);
	}
	//**********************************************************************************
	/**
	 * Get hash value for subject public key (default SHA-1)
	 * @param {String} [hashAlgorithm=SHA-1] Hashing algorithm name
	 */
	getKeyHash(hashAlgorithm = "SHA-1")
	{
		//region Get a "crypto" extension
		const crypto = getCrypto();
		if(typeof crypto === "undefined")
			return Promise.reject("Unable to create WebCrypto object");
		//endregion
		
		return crypto.digest({ name: hashAlgorithm }, new Uint8Array(this.subjectPublicKeyInfo.subjectPublicKey.valueBlock.valueHex));
	}
	//**********************************************************************************
	/**
	 * Make a signature for current value from TBS section
	 * @param {Object} privateKey Private key for "subjectPublicKeyInfo" structure
	 * @param {string} [hashAlgorithm="SHA-1"] Hashing algorithm
	 */
	sign(privateKey, hashAlgorithm = "SHA-1")
	{
		//region Initial checking
		//region Check private key
		if(typeof privateKey === "undefined")
			return Promise.reject("Need to provide a private key for signing");
		//endregion
		//endregion
		
		//region Initial variables
		let sequence = Promise.resolve();
		let parameters;
		
		const engine = getEngine();
		//endregion
		
		//region Get a "default parameters" for current algorithm and set correct signature algorithm
		sequence = sequence.then(() => engine.subtle.getSignatureParameters(privateKey, hashAlgorithm));
		
		sequence = sequence.then(result =>
		{
			parameters = result.parameters;
			this.signature = result.signatureAlgorithm;
			this.signatureAlgorithm = result.signatureAlgorithm;
		});
		//endregion
		
		//region Create TBS data for signing
		sequence = sequence.then(() =>
		{
			this.tbs = this.encodeTBS().toBER(false);
		});
		//endregion
		
		//region Signing TBS data on provided private key
		sequence = sequence.then(() => engine.subtle.signWithPrivateKey(this.tbs, privateKey, parameters));
		
		sequence = sequence.then(result =>
		{
			this.signatureValue = new BitString({ valueHex: result });
		});
		//endregion
		
		return sequence;
	}
	//**********************************************************************************
	verify(issuerCertificate = null)
	{
		//region Global variables
		let subjectPublicKeyInfo = {};
		//endregion
		
		//region Set correct "subjectPublicKeyInfo" value
		if(issuerCertificate !== null)
			subjectPublicKeyInfo = issuerCertificate.subjectPublicKeyInfo;
		else
		{
			if(this.issuer.isEqual(this.subject)) // Self-signed certificate
				subjectPublicKeyInfo = this.subjectPublicKeyInfo;
		}
		
		if((subjectPublicKeyInfo instanceof PublicKeyInfo) === false)
			return Promise.reject("Please provide issuer certificate as a parameter");
		//endregion
		
		return getEngine().subtle.verifyWithPublicKey(this.tbs, this.signatureValue, subjectPublicKeyInfo, this.signatureAlgorithm);
	}
	//**********************************************************************************
}
//**************************************************************************************

/**
 * Download from buffer
 *
 * @example
 * ```js
 *    import { downloadFromBuffer } from 'ui-utils';
 *
 *    downloadFromBuffer(arrayBufferValue, 'applciation/pdf', 'myFile', 'pdf', 100);
 * ```
 */
function downloadFromBuffer(value, mime, name, extension, delay) {
    const fileName = `${name}.${extension}`;
    let key = '';
    if (typeof value !== 'string') {
        const blob = new Blob([value], { type: mime });
        if (navigator.msSaveBlob) { // IE10+ : (has Blob, but not a[download] or URL)
            navigator.msSaveBlob(blob, fileName);
            return new Promise(res => setTimeout(res, delay || 0));
        }
        key = window.URL.createObjectURL(blob);
    }
    else {
        key = `data:${mime};charset=utf-8,${encodeURIComponent(value)}`;
    }
    const link = document.createElement('a');
    link.style.display = 'none';
    link.href = key;
    link.download = fileName;
    document.body.appendChild(link);
    link.dispatchEvent(new MouseEvent('click'));
    document.body.removeChild(link);
    const revokeObjectURL = (resolve) => {
        if (/^blob:/.test(key)) {
            window.URL.revokeObjectURL(key);
        }
        resolve();
    };
    return new Promise(resolve => setTimeout(() => revokeObjectURL(resolve), delay || 0));
}

const OIDs = {
    '0.2.262.1.10': 'Telesec',
    '0.2.262.1.10.0': 'Extension',
    '0.2.262.1.10.1': 'Mechanism',
    '0.2.262.1.10.1.0': 'Authentication',
    '0.2.262.1.10.1.0.1': 'Password Authentication',
    '0.2.262.1.10.1.0.2': 'Protected Password Authentication',
    '0.2.262.1.10.1.0.3': 'One Way x509 Authentication',
    '0.2.262.1.10.1.0.4': 'Two Way x509 Authentication',
    '0.2.262.1.10.1.0.5': 'Three Way x509 Authentication',
    '0.2.262.1.10.1.0.6': 'One Way IS O9798 Authentication',
    '0.2.262.1.10.1.0.7': 'Two Way IS O9798 Authentication',
    '0.2.262.1.10.1.0.8': 'Telekom Authentication',
    '0.2.262.1.10.1.1': 'Signature',
    '0.2.262.1.10.1.1.1': 'MD4 With RSA And IS O9697',
    '0.2.262.1.10.1.1.2': 'MD4 With RSA And Telesec Signature Standard',
    '0.2.262.1.10.1.1.3': 'MD5 With RSA And IS O9697',
    '0.2.262.1.10.1.1.4': 'MD5 With RSA And Telesec Signature Standard',
    '0.2.262.1.10.1.1.5': 'Ripemd160 With RSA And Telekom Signature Standard',
    '0.2.262.1.10.1.1.9': 'HBCI RSA Signature',
    '0.2.262.1.10.1.2': 'Encryption',
    '0.2.262.1.10.1.2.0': 'None',
    '0.2.262.1.10.1.2.1': 'RSA Telesec',
    '0.2.262.1.10.1.2.2': 'DES',
    '0.2.262.1.10.1.2.2.1': 'DES ECB',
    '0.2.262.1.10.1.2.2.2': 'DES CBC',
    '0.2.262.1.10.1.2.2.3': 'DES OFB',
    '0.2.262.1.10.1.2.2.4': 'DES CFB8',
    '0.2.262.1.10.1.2.2.5': 'DES CFB64',
    '0.2.262.1.10.1.2.3': 'DES3',
    '0.2.262.1.10.1.2.3.1': 'DES3 ECB',
    '0.2.262.1.10.1.2.3.2': 'DES3 CBC',
    '0.2.262.1.10.1.2.3.3': 'DES3 OFB',
    '0.2.262.1.10.1.2.3.4': 'DES3 CFB8',
    '0.2.262.1.10.1.2.3.5': 'DES3 CFB64',
    '0.2.262.1.10.1.2.4': 'Magenta',
    '0.2.262.1.10.1.2.5': 'Idea',
    '0.2.262.1.10.1.2.5.1': 'Idea ECB',
    '0.2.262.1.10.1.2.5.2': 'Idea CBC',
    '0.2.262.1.10.1.2.5.3': 'Idea OFB',
    '0.2.262.1.10.1.2.5.4': 'Idea CFB8',
    '0.2.262.1.10.1.2.5.5': 'Idea CFB64',
    '0.2.262.1.10.1.3': 'One Way Function',
    '0.2.262.1.10.1.3.1': 'MD4',
    '0.2.262.1.10.1.3.2': 'MD5',
    '0.2.262.1.10.1.3.3': 'SQ ModNx509',
    '0.2.262.1.10.1.3.4': 'SQ ModNISO',
    '0.2.262.1.10.1.3.5': 'Ripemd128',
    '0.2.262.1.10.1.3.6': 'Hash Using Block Cipher',
    '0.2.262.1.10.1.3.7': 'Mac',
    '0.2.262.1.10.1.3.8': 'Ripemd160',
    '0.2.262.1.10.1.4': 'Fec Function',
    '0.2.262.1.10.1.4.1': 'Reed Solomon',
    '0.2.262.1.10.2': 'Module',
    '0.2.262.1.10.2.0': 'Algorithms',
    '0.2.262.1.10.2.1': 'Attribute Types',
    '0.2.262.1.10.2.2': 'Certificate Types',
    '0.2.262.1.10.2.3': 'Message Types',
    '0.2.262.1.10.2.4': 'Pl Protocol',
    '0.2.262.1.10.2.5': 'Sme And Components Of Sme',
    '0.2.262.1.10.2.6': 'Fec',
    '0.2.262.1.10.2.7': 'Useful Definitions',
    '0.2.262.1.10.2.8': 'Stefiles',
    '0.2.262.1.10.2.9': 'Sadmib',
    '0.2.262.1.10.2.10': 'Electronic Order',
    '0.2.262.1.10.2.11': 'Telesec Ttp Asymmetric Application',
    '0.2.262.1.10.2.12': 'Telesec Ttp Basis Application',
    '0.2.262.1.10.2.13': 'Telesec Ttp Messages',
    '0.2.262.1.10.2.14': 'Telesec Ttp Time Stamp Application',
    '0.2.262.1.10.3': 'Object Class',
    '0.2.262.1.10.3.0': 'Telesec Other Name',
    '0.2.262.1.10.3.1': 'Directory',
    '0.2.262.1.10.3.2': 'Directory Type',
    '0.2.262.1.10.3.3': 'Directory Group',
    '0.2.262.1.10.3.4': 'Directory User',
    '0.2.262.1.10.3.5': 'Symmetric Key Entry',
    '0.2.262.1.10.4': 'Package',
    '0.2.262.1.10.5': 'Parameter',
    '0.2.262.1.10.6': 'Name Binding',
    '0.2.262.1.10.7': 'Attribute',
    '0.2.262.1.10.7.0': 'Application Group Identifier',
    '0.2.262.1.10.7.1': 'Certificate Type',
    '0.2.262.1.10.7.2': 'Telesec Certificate',
    '0.2.262.1.10.7.3': 'Certificate Number',
    '0.2.262.1.10.7.4': 'Certificate Revocation List',
    '0.2.262.1.10.7.5': 'Creation Date',
    '0.2.262.1.10.7.6': 'Issuer',
    '0.2.262.1.10.7.7': 'Naming Authority',
    '0.2.262.1.10.7.8': 'Public Key Directory',
    '0.2.262.1.10.7.9': 'Security Domain',
    '0.2.262.1.10.7.10': 'Subject',
    '0.2.262.1.10.7.11': 'Time Of Revocation',
    '0.2.262.1.10.7.12': 'User Group Reference',
    '0.2.262.1.10.7.13': 'alidity',
    '0.2.262.1.10.7.14': 'Zert93',
    '0.2.262.1.10.7.15': 'Security Mess Env',
    '0.2.262.1.10.7.16': 'Anonymized Public Key Directory',
    '0.2.262.1.10.7.17': 'Telesec Given Name',
    '0.2.262.1.10.7.18': 'Name Additions',
    '0.2.262.1.10.7.19': 'Telesec Postal Code',
    '0.2.262.1.10.7.20': 'Name Distinguisher',
    '0.2.262.1.10.7.21': 'Telesec Certificate List',
    '0.2.262.1.10.7.22': 'Teletrust Certificate List',
    '0.2.262.1.10.7.23': 'x509 Certificate List',
    '0.2.262.1.10.7.24': 'Time Of Issue',
    '0.2.262.1.10.7.25': 'Physical Card Number',
    '0.2.262.1.10.7.26': 'File Type',
    '0.2.262.1.10.7.27': 'Ctl File Is Archive',
    '0.2.262.1.10.7.28': 'Email Address',
    '0.2.262.1.10.7.29': 'Certificate Template List',
    '0.2.262.1.10.7.30': 'Directory Name',
    '0.2.262.1.10.7.31': 'Directory Type Name',
    '0.2.262.1.10.7.32': 'Directory Group Name',
    '0.2.262.1.10.7.33': 'Directory User Name',
    '0.2.262.1.10.7.34': 'Revocation Flag',
    '0.2.262.1.10.7.35': 'Symmetric Key Entry Name',
    '0.2.262.1.10.7.36': 'Gl Number',
    '0.2.262.1.10.7.37': 'Go Number',
    '0.2.262.1.10.7.38': 'G Key Data',
    '0.2.262.1.10.7.39': 'Z Key Data',
    '0.2.262.1.10.7.40': 'Kt Key Data',
    '0.2.262.1.10.7.41': 'Kt Key Number',
    '0.2.262.1.10.7.51': 'Time Of Revocation Gen',
    '0.2.262.1.10.7.52': 'Liability Text',
    '0.2.262.1.10.8': 'Attribute Group',
    '0.2.262.1.10.9': 'Action',
    '0.2.262.1.10.10': 'Notification',
    '0.2.262.1.10.11': 'Snmp-mibs',
    '0.2.262.1.10.11.1': 'Security Application',
    '0.2.262.1.10.12': 'Cert And Crl Extension Definitions',
    '0.2.262.1.10.12.0': 'Liability Limitation Flag',
    '0.2.262.1.10.12.1': 'Telesec Cert Id Ext',
    '0.2.262.1.10.12.2': 'Telesec policy Identifier',
    '0.2.262.1.10.12.3': 'Telesec Policy Qualifier I D',
    '0.2.262.1.10.12.4': 'Telesec CRL Filtered Ext',
    '0.2.262.1.10.12.5': 'Telesec CRL Filter Ext',
    '0.2.262.1.10.12.6': 'Telesec Naming Authority Ext',
    '0.4.0.127.0.7': 'Bsi',
    '0.4.0.127.0.7.1': 'Bsi Ecc',
    '0.4.0.127.0.7.1.1': 'Bsifield Type',
    '0.4.0.127.0.7.1.1.1': 'Bsi Prime Field',
    '0.4.0.127.0.7.1.1.2': 'Bsi Characteristic Two Field',
    '0.4.0.127.0.7.1.1.2.2': 'Bsi ECTLV Key Format',
    '0.4.0.127.0.7.1.1.2.2.1': 'Bsi ECTLV Public Key',
    '0.4.0.127.0.7.1.1.2.3': 'Bsi Characteristic Two Basis',
    '0.4.0.127.0.7.1.1.2.3.1': 'Bsi Gn Basis',
    '0.4.0.127.0.7.1.1.2.3.2': 'Bsi Tp Basis',
    '0.4.0.127.0.7.1.1.2.3.3': 'Bsi Pp Basis',
    '0.4.0.127.0.7.1.1.4.1': 'Bsi Ecdsa Signatures',
    '0.4.0.127.0.7.1.1.4.1.1': 'Bsi Ecdsa With SHA1',
    '0.4.0.127.0.7.1.1.4.1.2': 'Bsi Ecdsa With SHA224',
    '0.4.0.127.0.7.1.1.4.1.3': 'Bsi Ecdsa With SHA256',
    '0.4.0.127.0.7.1.1.4.1.4': 'Bsi Ecdsa With SHA384',
    '0.4.0.127.0.7.1.1.4.1.5': 'Bsi Ecdsa With SHA512',
    '0.4.0.127.0.7.1.1.4.1.6': 'Bsi Ecdsa With RIPEMD160',
    '0.4.0.127.0.7.1.1.5.1.1': 'Bsi Ecka Eg x963KDF',
    '0.4.0.127.0.7.1.1.5.1.1.1': 'Bsi Ecka Eg x963KDF With SHA1',
    '0.4.0.127.0.7.1.1.5.1.1.2': 'Bsi Ecka Eg x963KDF With SHA224',
    '0.4.0.127.0.7.1.1.5.1.1.3': 'Bsi Ecka Eg x963KDF With SHA256',
    '0.4.0.127.0.7.1.1.5.1.1.4': 'Bsi Ecka Eg x963KDF With SHA384',
    '0.4.0.127.0.7.1.1.5.1.1.5': 'Bsi Ecka Eg x963KDF With SHA512',
    '0.4.0.127.0.7.1.1.5.1.1.6': 'Bsi Ecka Eg x963KDF With RIPEMD160',
    '0.4.0.127.0.7.1.1.5.1.2': 'Bsi Ecka Eg Session KDF',
    '0.4.0.127.0.7.1.1.5.1.2.1': 'Bsi Ecka Eg Session KDF With3DES',
    '0.4.0.127.0.7.1.1.5.1.2.2': 'Bsi Ecka Eg Session KDF With AES128',
    '0.4.0.127.0.7.1.1.5.1.2.3': 'Bsi Ecka Eg Session KDF With AES192',
    '0.4.0.127.0.7.1.1.5.1.2.4': 'Bsi Ecka Eg Session KDF With AES256',
    '0.4.0.127.0.7.1.1.5.2': 'Bsi Ecka DH',
    '0.4.0.127.0.7.1.1.5.2.1': 'Bsi Ecka DH x963KDF',
    '0.4.0.127.0.7.1.1.5.2.1.1': 'Bsi Ecka DHx963KDF With SHA1',
    '0.4.0.127.0.7.1.1.5.2.1.2': 'Bsi Ecka DHx963KDF With SHA224',
    '0.4.0.127.0.7.1.1.5.2.1.3': 'Bsi Ecka DHx963KDF With SHA256',
    '0.4.0.127.0.7.1.1.5.2.1.4': 'Bsi Ecka DHx963KDF With SHA384',
    '0.4.0.127.0.7.1.1.5.2.1.5': 'Bsi Ecka DHx963KDF With SHA512',
    '0.4.0.127.0.7.1.1.5.2.1.6': 'Bsi Ecka DHx963KDF With RIPEMD160',
    '0.4.0.127.0.7.1.1.5.2.2': 'Bsi Ecka DHSessionKDF',
    '0.4.0.127.0.7.1.1.5.2.2.1': 'Bsi Ecka DH Session KDF With3 DES',
    '0.4.0.127.0.7.1.1.5.2.2.2': 'Bsi Ecka DH Session KDF With AES128',
    '0.4.0.127.0.7.1.1.5.2.2.3': 'Bsi Ecka DH Session KDF With AES192',
    '0.4.0.127.0.7.1.1.5.2.2.4': 'Bsi Ecka DH Session KDF With AES256',
    '0.4.0.127.0.7.1.2': 'Bsi Ec Key Type',
    '0.4.0.127.0.7.1.2.1': 'Bsi Ec Public Key',
    '0.4.0.127.0.7.1.5.1': 'Bsi Kaeg',
    '0.4.0.127.0.7.1.5.1.1': 'Bsi Kaeg With x963KDF',
    '0.4.0.127.0.7.1.5.1.2': 'Bsi Kaeg With 3DESKDF',
    '0.4.0.127.0.7.2.2.1': 'Bsi PK',
    '0.4.0.127.0.7.2.2.1.1': 'Bsi PK_DH',
    '0.4.0.127.0.7.2.2.1.2': 'Bsi PK_ECDH',
    '0.4.0.127.0.7.2.2.2': 'Bsi TA',
    '0.4.0.127.0.7.2.2.2.1': 'Bsi TA_RSA',
    '0.4.0.127.0.7.2.2.2.1.1': 'Bsi TA_RSAv1_5_SHA1',
    '0.4.0.127.0.7.2.2.2.1.2': 'Bsi TA_RSAv1_5_SHA256',
    '0.4.0.127.0.7.2.2.2.1.3': 'Bsi TA_RSAPSS_SHA1',
    '0.4.0.127.0.7.2.2.2.1.4': 'Bsi TA_RSAPSS_SHA256',
    '0.4.0.127.0.7.2.2.2.1.5': 'Bsi TA_RSAv1_5_SHA512',
    '0.4.0.127.0.7.2.2.2.1.6': 'Bsi TA_RSAPSS_SHA512',
    '0.4.0.127.0.7.2.2.2.2': 'Bsi TA_ECDSA',
    '0.4.0.127.0.7.2.2.2.2.1': 'Bsi TA_ECDSA_SHA1',
    '0.4.0.127.0.7.2.2.2.2.2': 'Bsi TA_ECDSA_SHA224',
    '0.4.0.127.0.7.2.2.2.2.3': 'Bsi TA_ECDSA_SHA256',
    '0.4.0.127.0.7.2.2.2.2.4': 'Bsi TA_ECDSA_SHA384',
    '0.4.0.127.0.7.2.2.2.2.5': 'Bsi TA_ECDSA_SHA512',
    '0.4.0.127.0.7.2.2.3': 'Bsi CA',
    '0.4.0.127.0.7.2.2.3.1': 'Bsi CA_DH',
    '0.4.0.127.0.7.2.2.3.1.1': 'Bsi CA_DH_3DES_CBC_CBC',
    '0.4.0.127.0.7.2.2.3.1.2': 'Bsi CA_DH_AES_CBC_CMAC_128',
    '0.4.0.127.0.7.2.2.3.1.3': 'Bsi CA_DH_AES_CBC_CMAC_192',
    '0.4.0.127.0.7.2.2.3.1.4': 'Bsi CA_DH_AES_CBC_CMAC_256',
    '0.4.0.127.0.7.2.2.3.2': 'Bsi CA_ECDH',
    '0.4.0.127.0.7.2.2.3.2.1': 'Bsi CA_ECDH_3DES_CBC_CBC',
    '0.4.0.127.0.7.2.2.3.2.2': 'Bsi CA_ECDH_AES_CBC_CMAC_128',
    '0.4.0.127.0.7.2.2.3.2.3': 'Bsi CA_ECDH_AES_CBC_CMAC_192',
    '0.4.0.127.0.7.2.2.3.2.4': 'Bsi CA_ECDH_AES_CBC_CMAC_256',
    '0.4.0.127.0.7.2.2.4': 'Bsi PACE',
    '0.4.0.127.0.7.2.2.4.1': 'Bsi PACE_DH_GM',
    '0.4.0.127.0.7.2.2.4.1.1': 'Bsi PACE_DH_GM_3DES_CBC_CBC',
    '0.4.0.127.0.7.2.2.4.1.2': 'Bsi PACE_DH_GM_AES_CBC_CMAC_128',
    '0.4.0.127.0.7.2.2.4.1.3': 'Bsi PACE_DH_GM_AES_CBC_CMAC_192',
    '0.4.0.127.0.7.2.2.4.1.4': 'Bsi PACE_DH_GM_AES_CBC_CMAC_256',
    '0.4.0.127.0.7.2.2.4.2': 'Bsi PACE_ECDH_GM',
    '0.4.0.127.0.7.2.2.4.2.1': 'Bsi PACE_ECDH_GM_3DES_CBC_CBC',
    '0.4.0.127.0.7.2.2.4.2.2': 'Bsi PACE_ECDH_GM_AES_CBC_CMAC_128',
    '0.4.0.127.0.7.2.2.4.2.3': 'Bsi PACE_ECDH_GM_AES_CBC_CMAC_192',
    '0.4.0.127.0.7.2.2.4.2.4': 'Bsi PACE_ECDH_GM_AES_CBC_CMAC_256',
    '0.4.0.127.0.7.2.2.4.3': 'Bsi PACE_DH_IM',
    '0.4.0.127.0.7.2.2.4.3.1': 'Bsi PACE_DH_IM_3DES_CBC_CBC',
    '0.4.0.127.0.7.2.2.4.3.2': 'Bsi PACE_DH_IM_AES_CBC_CMAC_128',
    '0.4.0.127.0.7.2.2.4.3.3': 'Bsi PACE_DH_IM_AES_CBC_CMAC_192',
    '0.4.0.127.0.7.2.2.4.3.4': 'Bsi PACE_DH_IM_AES_CBC_CMAC_256',
    '0.4.0.127.0.7.2.2.4.4': 'Bsi PACE_ECDH_IM',
    '0.4.0.127.0.7.2.2.4.4.1': 'Bsi PACE_ECDH_IM_3DES_CBC_CBC',
    '0.4.0.127.0.7.2.2.4.4.2': 'Bsi PACE_ECDH_IM_AES_CBC_CMAC_128',
    '0.4.0.127.0.7.2.2.4.4.3': 'Bsi PACE_ECDH_IM_AES_CBC_CMAC_192',
    '0.4.0.127.0.7.2.2.4.4.4': 'Bsi PACE_ECDH_IM_AES_CBC_CMAC_256',
    '0.4.0.127.0.7.2.2.5': 'Bsi RI',
    '0.4.0.127.0.7.2.2.5.1': 'Bsi RI_DH',
    '0.4.0.127.0.7.2.2.5.1.1': 'Bsi RI_DH_SHA1',
    '0.4.0.127.0.7.2.2.5.1.2': 'Bsi RI_DH_SHA224',
    '0.4.0.127.0.7.2.2.5.1.3': 'Bsi RI_DH_SHA256',
    '0.4.0.127.0.7.2.2.5.1.4': 'Bsi RI_DH_SHA384',
    '0.4.0.127.0.7.2.2.5.1.5': 'Bsi RI_DH_SHA512',
    '0.4.0.127.0.7.2.2.5.2': 'Bsi RI_ECDH',
    '0.4.0.127.0.7.2.2.5.2.1': 'Bsi RI_ECDH_SHA1',
    '0.4.0.127.0.7.2.2.5.2.2': 'Bsi RI_ECDH_SHA224',
    '0.4.0.127.0.7.2.2.5.2.3': 'Bsi RI_ECDH_SHA256',
    '0.4.0.127.0.7.2.2.5.2.4': 'Bsi RI_ECDH_SHA384',
    '0.4.0.127.0.7.2.2.5.2.5': 'Bsi RI_ECDH_SHA512',
    '0.4.0.127.0.7.2.2.6': 'Bsi Card Info',
    '0.4.0.127.0.7.2.2.7': 'Bsi Eid Security',
    '0.4.0.127.0.7.2.2.8': 'Bsi PT',
    '0.4.0.127.0.7.3.1.2': 'Bsi EAC Roles',
    '0.4.0.127.0.7.3.1.2.1': 'Bsi EAC Roles IS',
    '0.4.0.127.0.7.3.1.2.2': 'Bsi EAC Roles AT',
    '0.4.0.127.0.7.3.1.2.3': 'Bsi EAC Roles ST',
    '0.4.0.127.0.7.3.1.3': 'Bsi TAv2ce',
    '0.4.0.127.0.7.3.1.3.1': 'Bsi TAv2ce Description',
    '0.4.0.127.0.7.3.1.3.1.1': 'Bsi TAv2ce Description Plain Text',
    '0.4.0.127.0.7.3.1.3.1.2': 'Bsi TAv2ce Description IA5 String',
    '0.4.0.127.0.7.3.1.3.1.3': 'Bsi TAv2ce Description Octet String',
    '0.4.0.127.0.7.3.1.3.2': 'Bsi TAv2ce Terminal Sector',
    '0.4.0.127.0.7.3.1.4': 'Bsi Aux Data',
    '0.4.0.127.0.7.3.1.4.1': 'Bsi Aux Data Birthday',
    '0.4.0.127.0.7.3.1.4.2': 'Bsi Aux Data Expire Date',
    '0.4.0.127.0.7.3.1.4.3': 'Bsi Aux Data Community ID',
    '0.4.0.127.0.7.3.1.5': 'Bsi Defect List',
    '0.4.0.127.0.7.3.1.5.1': 'Bsi Defect Auth Defect',
    '0.4.0.127.0.7.3.1.5.1.1': 'Bsi Defect Cert Revoked',
    '0.4.0.127.0.7.3.1.5.1.2': 'Bsi Defect Cert Replaced',
    '0.4.0.127.0.7.3.1.5.1.3': 'Bsi Defect Chip Auth Key Revoked',
    '0.4.0.127.0.7.3.1.5.1.4': 'Bsi Defect Active Auth Key Revoked',
    '0.4.0.127.0.7.3.1.5.2': 'Bsi Defect EPassport Defect',
    '0.4.0.127.0.7.3.1.5.2.1': 'Bsi Defect EPassport DG Malformed',
    '0.4.0.127.0.7.3.1.5.2.2': 'Bsi Defect SOD Invalid',
    '0.4.0.127.0.7.3.1.5.3': 'Bsi Defect EID Defect',
    '0.4.0.127.0.7.3.1.5.3.1': 'Bsi Defect EIDDG Malformed',
    '0.4.0.127.0.7.3.1.5.3.2': 'Bsi Defect EID Integrity',
    '0.4.0.127.0.7.3.1.5.4': 'Bsi Defect Document Defect',
    '0.4.0.127.0.7.3.1.5.4.1': 'Bsi Defect Card Security Malformed',
    '0.4.0.127.0.7.3.1.5.4.2': 'Bsi Defect Chip Security Malformed',
    '0.4.0.127.0.7.3.1.5.4.3': 'Bsi Defect Power Down Req',
    '0.4.0.127.0.7.3.1.6': 'Bsi List Content Description',
    '0.4.0.127.0.7.3.2.1': 'Bsi Security Object',
    '0.4.0.127.0.7.3.2.2': 'Bsi Black List',
    '0.4.0.1862': 'Etsi Qcs Profile',
    '0.4.0.1862.1': 'Etsi Qcs',
    '0.4.0.1862.1.1': 'Etsi Qcs Compliance',
    '0.4.0.1862.1.2': 'Etsi Qcs Limit Value',
    '0.4.0.1862.1.3': 'Etsi Qcs Retention Period',
    '0.4.0.1862.1.4': 'Etsi Qcs QcSSCD',
    '0.9.2342.19200300.100.1.1': 'User ID',
    '0.9.2342.19200300.100.1.3': 'Rfc822 Mailbox',
    '0.9.2342.19200300.100.1.25': 'Domain Component',
    '1.0.10118.3.0.49': 'Ripemd160',
    '1.0.10118.3.0.50': 'Ripemd128',
    '1.0.10118.3.0.55': 'Whirlpool',
    '1.2.36.1.3.1.1.1': 'Qgpki',
    '1.2.36.1.3.1.1.1.1': 'Qgpki Policies',
    '1.2.36.1.3.1.1.1.1.1': 'Qgpki Med Intermed CA',
    '1.2.36.1.3.1.1.1.1.1.1': 'Qgpki Med Intermed Individual',
    '1.2.36.1.3.1.1.1.1.1.2': 'Qgpki Med Intermed Device Control',
    '1.2.36.1.3.1.1.1.1.1.3': 'Qgpki Med Intermed Device',
    '1.2.36.1.3.1.1.1.1.1.4': 'Qgpki Med Intermed Authorised Party',
    '1.2.36.1.3.1.1.1.1.1.5': 'Qgpki Med Intermed Device System',
    '1.2.36.1.3.1.1.1.1.2': 'Qgpki Med Issuing CA',
    '1.2.36.1.3.1.1.1.1.2.1': 'Qgpki Med Issuing Individual',
    '1.2.36.1.3.1.1.1.1.2.2': 'Qgpki Med Issuing Device Control',
    '1.2.36.1.3.1.1.1.1.2.3': 'Qgpki Med Issuing Device',
    '1.2.36.1.3.1.1.1.1.2.4': 'Qgpki Med Issuing Authorised Party',
    '1.2.36.1.3.1.1.1.1.2.5': 'Qgpki Med Issuing Client Auth',
    '1.2.36.1.3.1.1.1.1.2.6': 'Qgpki Med Issuing Server Auth',
    '1.2.36.1.3.1.1.1.1.2.7': 'Qgpki Med Issuing Data Prot',
    '1.2.36.1.3.1.1.1.1.2.8': 'Qgpki Med Issuing Token Auth',
    '1.2.36.1.3.1.1.1.1.3': 'Qgpki Basic Intermed CA',
    '1.2.36.1.3.1.1.1.1.3.1': 'Qgpki Basic Intermed Device System',
    '1.2.36.1.3.1.1.1.1.4': 'Qgpki Basic Issuing CA',
    '1.2.36.1.3.1.1.1.1.4.1': 'Qgpki Basic Issuing Client Auth',
    '1.2.36.1.3.1.1.1.1.4.2': 'Qgpki Basic Issuing Server Auth',
    '1.2.36.1.3.1.1.1.1.4.3': 'Qgpki Basic Issuing Data Signing',
    '1.2.36.1.3.1.1.1.2': 'Qgpki Assurance Level',
    '1.2.36.1.3.1.1.1.2.1': 'Qgpki Assurance Rudimentary',
    '1.2.36.1.3.1.1.1.2.2': 'Qgpki Assurance Basic',
    '1.2.36.1.3.1.1.1.2.3': 'Qgpki Assurance Medium',
    '1.2.36.1.3.1.1.1.2.4': 'Qgpki Assurance High',
    '1.2.36.1.3.1.1.1.3': 'Qgpki Cert Function',
    '1.2.36.1.3.1.1.1.3.1': 'Qgpki Function Individual',
    '1.2.36.1.3.1.1.1.3.2': 'Qgpki Function Device',
    '1.2.36.1.3.1.1.1.3.3': 'Qgpki Function Authorised Party',
    '1.2.36.1.3.1.1.1.3.4': 'Qgpki Function Device Control',
    '1.2.36.1.3.1.2': 'Qpspki',
    '1.2.36.1.3.1.2.1': 'Qpspki Policies',
    '1.2.36.1.3.1.2.1.2': 'Qpspki Policy Basic',
    '1.2.36.1.3.1.2.1.3': 'Qpspki Policy Medium',
    '1.2.36.1.3.1.2.1.4': 'Qpspki Policy High',
    '1.2.36.1.3.1.3.2': 'Qtmrpki',
    '1.2.36.1.3.1.3.2.1': 'Qtmrpki Policies',
    '1.2.36.1.3.1.3.2.2': 'Qtmrpki Purpose',
    '1.2.36.1.3.1.3.2.2.1': 'Qtmrpki Individual',
    '1.2.36.1.3.1.3.2.2.2': 'Qtmrpki Device Control',
    '1.2.36.1.3.1.3.2.2.3': 'Qtmrpki Device',
    '1.2.36.1.3.1.3.2.2.4': 'Qtmrpki Authorised Party',
    '1.2.36.1.3.1.3.2.2.5': 'Qtmrpki Device System',
    '1.2.36.1.3.1.3.2.3': 'Qtmrpki Device',
    '1.2.36.1.3.1.3.2.3.1': 'Qtmrpki Driver License',
    '1.2.36.1.3.1.3.2.3.2': 'Qtmrpki Industry Authority',
    '1.2.36.1.3.1.3.2.3.3': 'Qtmrpki Marine License',
    '1.2.36.1.3.1.3.2.3.4': 'Qtmrpki Adult Proof Of Age',
    '1.2.36.1.3.1.3.2.3.5': 'Qtmrpki Sam',
    '1.2.36.1.3.1.3.2.4': 'Qtmrpki Authorised Party',
    '1.2.36.1.3.1.3.2.4.1': 'Qtmrpki Transport Inspector',
    '1.2.36.1.3.1.3.2.4.2': 'Qtmrpki Police Officer',
    '1.2.36.1.3.1.3.2.4.3': 'Qtmrpki System',
    '1.2.36.1.3.1.3.2.4.4': 'Qtmrpki Liquor Licensing Inspector',
    '1.2.36.1.3.1.3.2.4.5': 'Qtmrpki Marine Enforcement Officer',
    '1.2.36.1.333.1': 'Australian Business Number',
    '1.2.36.68980861.1.1.2': 'Signet Personal',
    '1.2.36.68980861.1.1.3': 'Signet Business',
    '1.2.36.68980861.1.1.4': 'Signet Legal',
    '1.2.36.68980861.1.1.10': 'Signet Pilot',
    '1.2.36.68980861.1.1.11': 'Signet Intra Net',
    '1.2.36.68980861.1.1.20': 'Signet Policy',
    '1.2.36.75878867.1.100.1.1': 'Certificates Australia Policy',
    '1.2.40.0.17.1.22': 'A-Trust  EV policy',
    '1.2.392.200011.61.1.1.1': 'Mitsubishi Security Algorithm',
    '1.2.392.200011.61.1.1.1.1': 'Misty1-cbc',
    '1.2.392.200091.100.721.1': 'Security Communication (SECOM) EV policy',
    '1.2.410.200004.1': 'Kisa Algorithm',
    '1.2.410.200004.1.1': 'Kcdsa',
    '1.2.410.200004.1.2': 'Has160',
    '1.2.410.200004.1.3': 'Seed ECB',
    '1.2.410.200004.1.4': 'Seed CBC',
    '1.2.410.200004.1.5': 'Seed OFB',
    '1.2.410.200004.1.6': 'Seed CFB',
    '1.2.410.200004.1.7': 'Seed MAC',
    '1.2.410.200004.1.8': 'Kcdsa With HAS160',
    '1.2.410.200004.1.9': 'Kcdsa With SHA1',
    '1.2.410.200004.1.10': 'PBE With HAS160 And SEED-ECB',
    '1.2.410.200004.1.11': 'PBE With HAS160 And SEED-CBC',
    '1.2.410.200004.1.12': 'PBE With HAS160 And SEED-CFB',
    '1.2.410.200004.1.13': 'PBE With HAS160 And SEED-OFB',
    '1.2.410.200004.1.14': 'PBE With SHA1 And SEED-ECB',
    '1.2.410.200004.1.15': 'PBE With SHA1 And SEED-CBC',
    '1.2.410.200004.1.16': 'PBE With SHA1 And SEED-CFB',
    '1.2.410.200004.1.17': 'PBE With SHA1 And SEED-OFB',
    '1.2.410.200004.1.20': 'RSA With HAS160',
    '1.2.410.200004.1.21': 'Kcdsa1',
    '1.2.410.200004.2': 'Npki CP',
    '1.2.410.200004.2.1': 'Npki Signature Policy',
    '1.2.410.200004.3': 'Npki KP',
    '1.2.410.200004.4': 'Npki AT',
    '1.2.410.200004.5': 'Npki LCA',
    '1.2.410.200004.5.1': 'Npki Sign Korea',
    '1.2.410.200004.5.2': 'Npki Sign Gate',
    '1.2.410.200004.5.3': 'Npki Nca Sign',
    '1.2.410.200004.6': 'Npki ON',
    '1.2.410.200004.7': 'Npki APP',
    '1.2.410.200004.7.1': 'Npki SMIME',
    '1.2.410.200004.7.1.1': 'Npki SMIME Algo',
    '1.2.410.200004.7.1.1.1': 'Npki Cms SEED Wrap',
    '1.2.410.200004.10': 'Npki',
    '1.2.410.200004.10.1': 'Npki Attribute',
    '1.2.410.200004.10.1.1': 'Npki Identify Data',
    '1.2.410.200004.10.1.1.1': 'Npki VID',
    '1.2.410.200004.10.1.1.2': 'Npki Encrypted VID',
    '1.2.410.200004.10.1.1.3': 'Npki Random Num',
    '1.2.410.200004.10.1.1.4': 'Npki VID',
    '1.2.410.200046.1.1': 'Aria1 Algorithm Modes',
    '1.2.410.200046.1.1.1': 'Aria128-ecb',
    '1.2.410.200046.1.1.2': 'Aria128-cbc',
    '1.2.410.200046.1.1.3': 'Aria128-cfb',
    '1.2.410.200046.1.1.4': 'Aria128-ofb',
    '1.2.410.200046.1.1.5': 'Aria128-ctr',
    '1.2.410.200046.1.1.6': 'Aria192-ecb',
    '1.2.410.200046.1.1.7': 'Aria192-cbc',
    '1.2.410.200046.1.1.8': 'Aria192-cfb',
    '1.2.410.200046.1.1.9': 'Aria192-ofb',
    '1.2.410.200046.1.1.10': 'Aria192-ctr',
    '1.2.410.200046.1.1.11': 'Aria256-ecb',
    '1.2.410.200046.1.1.12': 'Aria256-cbc',
    '1.2.410.200046.1.1.13': 'Aria256-cfb',
    '1.2.410.200046.1.1.14': 'Aria256-ofb',
    '1.2.410.200046.1.1.15': 'Aria256-ctr',
    '1.2.410.200046.1.1.21': 'Aria128-cmac',
    '1.2.410.200046.1.1.22': 'Aria192-cmac',
    '1.2.410.200046.1.1.23': 'Aria256-cmac',
    '1.2.410.200046.1.1.31': 'Aria128-ocb2',
    '1.2.410.200046.1.1.32': 'Aria192-ocb2',
    '1.2.410.200046.1.1.33': 'Aria256-ocb2',
    '1.2.410.200046.1.1.34': 'Aria128-gcm',
    '1.2.410.200046.1.1.35': 'Aria192-gcm',
    '1.2.410.200046.1.1.36': 'Aria256-gcm',
    '1.2.410.200046.1.1.37': 'Aria128-ccm',
    '1.2.410.200046.1.1.38': 'Aria192-ccm',
    '1.2.410.200046.1.1.39': 'Aria256-ccm',
    '1.2.410.200046.1.1.40': 'Aria128-keywrap',
    '1.2.410.200046.1.1.41': 'Aria192-keywrap',
    '1.2.410.200046.1.1.42': 'Aria256-keywrap',
    '1.2.410.200046.1.1.43': 'Aria128-keywrap With Pad',
    '1.2.410.200046.1.1.44': 'Aria192-keywrap With Pad',
    '1.2.410.200046.1.1.45': 'Aria256-keywrap With Pad',
    '1.2.643.2.2.3': 'Gost Signature',
    '1.2.643.2.2.4': 'Gost94 Signature',
    '1.2.643.2.2.9': 'Gost Digest',
    '1.2.643.2.2.10': 'Hmac Gost',
    '1.2.643.2.2.13.0': 'Gost Wrap',
    '1.2.643.2.2.13.1': 'Crypto Pro Wrap',
    '1.2.643.2.2.14.0': 'Null Meshing',
    '1.2.643.2.2.14.1': 'Crypto Pro Meshing',
    '1.2.643.2.2.19': 'Gost Public Key',
    '1.2.643.2.2.20': 'Gost94 Public Key',
    '1.2.643.2.2.21': 'Gost Cipher',
    '1.2.643.2.2.30.0': 'Test Digest Params',
    '1.2.643.2.2.30.1': 'Crypto Pro Digest A',
    '1.2.643.2.2.31.0': 'Test Cipher Params',
    '1.2.643.2.2.31.1': 'Crypto Pro Cipher A',
    '1.2.643.2.2.31.2': 'Crypto Pro Cipher B',
    '1.2.643.2.2.31.3': 'Crypto Pro Cipher C',
    '1.2.643.2.2.31.4': 'Crypto Pro Cipher D',
    '1.2.643.2.2.31.5': 'Oscar11 Cipher',
    '1.2.643.2.2.31.6': 'Oscar10 Cipher',
    '1.2.643.2.2.31.7': 'Ric1 Cipher',
    '1.2.643.2.2.35.0': 'Test Sign Params',
    '1.2.643.2.2.35.1': 'Crypto Pro Sign A',
    '1.2.643.2.2.35.2': 'Crypto Pro Sign B',
    '1.2.643.2.2.35.3': 'Crypto Pro Sign C',
    '1.2.643.2.2.36.0': 'Crypto Pro Sign XA',
    '1.2.643.2.2.36.1': 'Crypto Pro Sign XB',
    '1.2.643.2.2.96': 'Crypto Pro ECDH Wrap',
    '1.2.752.34.1': 'Seis-cp',
    '1.2.752.34.1.1': 'SEIS high-assurance policy Identifier',
    '1.2.752.34.1.2': 'SEIS GAK policy Identifier',
    '1.2.752.34.2': 'SEI Spe',
    '1.2.752.34.3': 'SEI Sat',
    '1.2.752.34.3.1': 'SEI Sat-personal Identifier',
    '1.2.840.10040.1': 'Module',
    '1.2.840.10040.1.1': 'x9f1-cert-mgmt',
    '1.2.840.10040.2': 'Holdinstruction',
    '1.2.840.10040.2.1': 'Holdinstruction-none',
    '1.2.840.10040.2.2': 'Callissuer',
    '1.2.840.10040.2.3': 'Reject',
    '1.2.840.10040.2.4': 'Pickup Token',
    '1.2.840.10040.3': 'Attribute',
    '1.2.840.10040.3.1': 'Countersignature',
    '1.2.840.10040.3.2': 'Attribute-cert',
    '1.2.840.10040.4': 'Algorithm',
    '1.2.840.10040.4.1': 'DSA',
    '1.2.840.10040.4.2': 'DSA-match',
    '1.2.840.10040.4.3': 'DSA With SHA1',
    '1.2.840.10045.1': 'Field Type',
    '1.2.840.10045.1.1': 'Prime-field',
    '1.2.840.10045.1.2': 'Characteristic-two-field',
    '1.2.840.10045.1.2.3': 'Characteristic-two-basis',
    '1.2.840.10045.1.2.3.1': 'ON Basis',
    '1.2.840.10045.1.2.3.2': 'TP Basis',
    '1.2.840.10045.1.2.3.3': 'PP Basis',
    '1.2.840.10045.2': 'Public Key Type',
    '1.2.840.10045.2.1': 'EC Public Key',
    '1.2.840.10045.3.0.1': 'C2pnb163v1',
    '1.2.840.10045.3.0.2': 'C2pnb163v2',
    '1.2.840.10045.3.0.3': 'C2pnb163v3',
    '1.2.840.10045.3.0.5': 'C2tnb191v1',
    '1.2.840.10045.3.0.6': 'C2tnb191v2',
    '1.2.840.10045.3.0.7': 'C2tnb191v3',
    '1.2.840.10045.3.0.10': 'C2pnb208w1',
    '1.2.840.10045.3.0.11': 'C2tnb239v1',
    '1.2.840.10045.3.0.12': 'C2tnb239v2',
    '1.2.840.10045.3.0.13': 'C2tnb239v3',
    '1.2.840.10045.3.0.16': 'C2pnb272w1',
    '1.2.840.10045.3.0.18': 'C2tnb359v1',
    '1.2.840.10045.3.0.19': 'C2pnb368w1',
    '1.2.840.10045.3.0.20': 'C2tnb431r1',
    '1.2.840.10045.3.1.1': 'Prime192v1',
    '1.2.840.10045.3.1.2': 'Prime192v2',
    '1.2.840.10045.3.1.3': 'Prime192v3',
    '1.2.840.10045.3.1.4': 'Prime239v1',
    '1.2.840.10045.3.1.5': 'Prime239v2',
    '1.2.840.10045.3.1.6': 'Prime239v3',
    '1.2.840.10045.3.1.7': 'Prime256v1',
    '1.2.840.10045.4.1': 'ECDSA With SHA1',
    '1.2.840.10045.4.2': 'ECDSA With Recommended',
    '1.2.840.10045.4.3': 'ECDSA With Specified',
    '1.2.840.10045.4.3.1': 'ECDSA With SHA224',
    '1.2.840.10045.4.3.2': 'ECDSA With SHA256',
    '1.2.840.10045.4.3.3': 'ECDSA With SHA384',
    '1.2.840.10045.4.3.4': 'ECDSA With SHA512',
    '1.2.840.10046.1': 'Field Type',
    '1.2.840.10046.1.1': 'Gf-prime',
    '1.2.840.10046.2': 'Number Type',
    '1.2.840.10046.2.1': 'DH Public Key',
    '1.2.840.10046.3': 'Scheme',
    '1.2.840.10046.3.1': 'DH Static',
    '1.2.840.10046.3.2': 'DH Ephem',
    '1.2.840.10046.3.3': 'DH Hybrid1',
    '1.2.840.10046.3.4': 'DH Hybrid2',
    '1.2.840.10046.3.5': 'Mqv2',
    '1.2.840.10046.3.6': 'Mqv1',
    '1.2.840.10065.2.2': '?',
    '1.2.840.10065.2.3': 'Healthcare License',
    '1.2.840.10065.2.3.1.1': 'License?',
    '1.2.840.10070.': 'Iec62351',
    '1.2.840.10070.8': 'Iec62351_8',
    '1.2.840.10070.8.1': 'Iec User Roles',
    '1.2.840.113533.7': 'NSN',
    '1.2.840.113533.7.65': 'NSN-ce',
    '1.2.840.113533.7.65.0': 'Entrust Vers Info',
    '1.2.840.113533.7.66': 'NSN-alg',
    '1.2.840.113533.7.66.3': 'Cast3 CBC',
    '1.2.840.113533.7.66.10': 'Cast5 CBC',
    '1.2.840.113533.7.66.11': 'Cast5 MAC',
    '1.2.840.113533.7.66.12': 'PBE With MD5 And CAST5-CBC',
    '1.2.840.113533.7.66.13': 'Password Based Mac',
    '1.2.840.113533.7.67': 'NSN-oc',
    '1.2.840.113533.7.67.0': 'Entrust User',
    '1.2.840.113533.7.68': 'NSN-at',
    '1.2.840.113533.7.68.0': 'Entrust CA Info',
    '1.2.840.113533.7.68.10': 'Attribute Certificate',
    '1.2.840.113549.1.1': 'PKCS-1',
    '1.2.840.113549.1.1.1': 'RSA Encryption',
    '1.2.840.113549.1.1.2': 'MD2 With RSA Encryption',
    '1.2.840.113549.1.1.3': 'MD4 With RSA Encryption',
    '1.2.840.113549.1.1.4': 'MD5 With RSA Encryption',
    '1.2.840.113549.1.1.5': 'SHA1 With RSA Encryption',
    '1.2.840.113549.1.1.6': 'RSA OAEP Encryption SET',
    '1.2.840.113549.1.1.7': 'RSA OAEP',
    '1.2.840.113549.1.1.8': 'PKCS1-MGF',
    '1.2.840.113549.1.1.9': 'RSA OAEP-p Specified',
    '1.2.840.113549.1.1.10': 'RSA PSS',
    '1.2.840.113549.1.1.11': 'SHA256 With RSA Encryption',
    '1.2.840.113549.1.1.12': 'SHA384 With RSA Encryption',
    '1.2.840.113549.1.1.13': 'SHA512 With RSA Encryption',
    '1.2.840.113549.1.1.14': 'SHA224 With RSA Encryption',
    '1.2.840.113549.1.2': 'Bsafe Rsa Encr',
    '1.2.840.113549.1.3': 'PKCS-3',
    '1.2.840.113549.1.3.1': 'Dh Key Agreement',
    '1.2.840.113549.1.5': 'PKCS-5',
    '1.2.840.113549.1.5.1': 'PBE With MD2 And DES-CBC',
    '1.2.840.113549.1.5.3': 'PBE With MD5 And DES-CBC',
    '1.2.840.113549.1.5.4': 'PBE With MD2 And RC2-CBC',
    '1.2.840.113549.1.5.6': 'PBE With MD5 And RC2-CBC',
    '1.2.840.113549.1.5.9': 'PBE With MD5 And XOR',
    '1.2.840.113549.1.5.10': 'PBE With SHA And DES-CBC',
    '1.2.840.113549.1.5.12': 'PKCS5 PBKDF2',
    '1.2.840.113549.1.5.13': 'PKCS5 PBES2',
    '1.2.840.113549.1.5.14': 'PKCS5 PBMAC1',
    '1.2.840.113549.1.7': 'PKCS-7',
    '1.2.840.113549.1.7.1': 'Data',
    '1.2.840.113549.1.7.2': 'Signed Data',
    '1.2.840.113549.1.7.3': 'Enveloped Data',
    '1.2.840.113549.1.7.4': 'Signed And Enveloped Data',
    '1.2.840.113549.1.7.5': 'Digested Data',
    '1.2.840.113549.1.7.6': 'Encrypted Data',
    '1.2.840.113549.1.7.7': 'Data With Attributes',
    '1.2.840.113549.1.7.8': 'Encrypted Private Key Info',
    '1.2.840.113549.1.9': 'PKCS-9',
    '1.2.840.113549.1.9.1': 'Email',
    '1.2.840.113549.1.9.2': 'Unstructured Name',
    '1.2.840.113549.1.9.3': 'Content Type',
    '1.2.840.113549.1.9.4': 'Message Digest',
    '1.2.840.113549.1.9.5': 'Signing Time',
    '1.2.840.113549.1.9.6': 'Countersignature',
    '1.2.840.113549.1.9.7': 'Challenge Password',
    '1.2.840.113549.1.9.8': 'Unstructured Address',
    '1.2.840.113549.1.9.9': 'Extended Certificate Attributes',
    '1.2.840.113549.1.9.10': 'Issuer And Serial Number',
    '1.2.840.113549.1.9.11': 'Password Check',
    '1.2.840.113549.1.9.12': 'Public Key',
    '1.2.840.113549.1.9.13': 'Signing Description',
    '1.2.840.113549.1.9.14': 'Extension Request',
    '1.2.840.113549.1.9.15': 'S/MIME Capabilities',
    '1.2.840.113549.1.9.15.1': 'Prefer Signed Data',
    '1.2.840.113549.1.9.15.2': 'Can Not Decrypt Any',
    '1.2.840.113549.1.9.15.3': 'Receipt Request',
    '1.2.840.113549.1.9.15.4': 'Receipt',
    '1.2.840.113549.1.9.15.5': 'Content Hints',
    '1.2.840.113549.1.9.15.6': 'Ml Expansion History',
    '1.2.840.113549.1.9.16': 'Id-sMIME',
    '1.2.840.113549.1.9.16.0': 'Id-mod',
    '1.2.840.113549.1.9.16.0.1': 'Id-mod-cms',
    '1.2.840.113549.1.9.16.0.2': 'Id-mod-ess',
    '1.2.840.113549.1.9.16.0.3': 'Id-mod-oid',
    '1.2.840.113549.1.9.16.0.4': 'Id-mod-msg-v3',
    '1.2.840.113549.1.9.16.0.5': 'Id-mod-ets-e Signature-88',
    '1.2.840.113549.1.9.16.0.6': 'Id-mod-ets-e Signature-97',
    '1.2.840.113549.1.9.16.0.7': 'Id-mod-ets-e Sig Policy-88',
    '1.2.840.113549.1.9.16.0.8': 'Id-mod-ets-e Sig Policy-88',
    '1.2.840.113549.1.9.16.1': 'Content Type',
    '1.2.840.113549.1.9.16.1.1': 'Receipt',
    '1.2.840.113549.1.9.16.1.2': 'Auth Data',
    '1.2.840.113549.1.9.16.1.3': 'Publish Cert',
    '1.2.840.113549.1.9.16.1.4': 'TST Info',
    '1.2.840.113549.1.9.16.1.5': 'TDT Info',
    '1.2.840.113549.1.9.16.1.6': 'Content Info',
    '1.2.840.113549.1.9.16.1.7': 'DVCS Request Data',
    '1.2.840.113549.1.9.16.1.8': 'DVCS Response Data',
    '1.2.840.113549.1.9.16.1.9': 'Compressed Data',
    '1.2.840.113549.1.9.16.1.10': 'SCVP Cert Val Request',
    '1.2.840.113549.1.9.16.1.11': 'SCVP Cert Val Response',
    '1.2.840.113549.1.9.16.1.12': 'SCVP Val Pol Request',
    '1.2.840.113549.1.9.16.1.13': 'SCVP Val Pol Response',
    '1.2.840.113549.1.9.16.1.14': 'Attr Cert Enc Attrs',
    '1.2.840.113549.1.9.16.1.15': 'TS Req',
    '1.2.840.113549.1.9.16.1.16': 'Firmware Package',
    '1.2.840.113549.1.9.16.1.17': 'Firmware Load Receipt',
    '1.2.840.113549.1.9.16.1.18': 'Firmware Load Error',
    '1.2.840.113549.1.9.16.1.19': 'Content Collection',
    '1.2.840.113549.1.9.16.1.20': 'Content With Attrs',
    '1.2.840.113549.1.9.16.1.21': 'Enc Key With I D',
    '1.2.840.113549.1.9.16.1.22': 'Enc PEPSI',
    '1.2.840.113549.1.9.16.1.23': 'Auth Enveloped Data',
    '1.2.840.113549.1.9.16.1.24': 'Route Origin Attest',
    '1.2.840.113549.1.9.16.1.25': 'Symmetric Key Package',
    '1.2.840.113549.1.9.16.1.26': 'Rpki Manifest',
    '1.2.840.113549.1.9.16.1.27': 'Ascii Text With CRLF',
    '1.2.840.113549.1.9.16.1.28': 'XML',
    '1.2.840.113549.1.9.16.1.29': 'PDF',
    '1.2.840.113549.1.9.16.1.30': 'Postscript',
    '1.2.840.113549.1.9.16.1.31': 'Timestamped Data',
    '1.2.840.113549.1.9.16.1.32': 'As Adjacency Attest',
    '1.2.840.113549.1.9.16.1.33': 'Rpki Trust Anchor',
    '1.2.840.113549.1.9.16.1.34': 'Trust Anchor List',
    '1.2.840.113549.1.9.16.2': 'Authenticated Attributes',
    '1.2.840.113549.1.9.16.2.1': 'Receipt Request',
    '1.2.840.113549.1.9.16.2.2': 'Security Label',
    '1.2.840.113549.1.9.16.2.3': 'Ml Expand History',
    '1.2.840.113549.1.9.16.2.4': 'Content Hint',
    '1.2.840.113549.1.9.16.2.5': 'Msg Sig Digest',
    '1.2.840.113549.1.9.16.2.6': 'Encap Content Type',
    '1.2.840.113549.1.9.16.2.7': 'Content Identifier',
    '1.2.840.113549.1.9.16.2.8': 'Mac Value',
    '1.2.840.113549.1.9.16.2.9': 'Equivalent Labels',
    '1.2.840.113549.1.9.16.2.10': 'Content Reference',
    '1.2.840.113549.1.9.16.2.11': 'Encryp Key Pref',
    '1.2.840.113549.1.9.16.2.12': 'Signing Certificate',
    '1.2.840.113549.1.9.16.2.13': 'Smime Encrypt Certs',
    '1.2.840.113549.1.9.16.2.14': 'Time Stamp Token',
    '1.2.840.113549.1.9.16.2.15': 'Sig Policy Id',
    '1.2.840.113549.1.9.16.2.16': 'Commitment Type',
    '1.2.840.113549.1.9.16.2.17': 'Signer Location',
    '1.2.840.113549.1.9.16.2.18': 'Signer Attr',
    '1.2.840.113549.1.9.16.2.19': 'Other Sig Cert',
    '1.2.840.113549.1.9.16.2.20': 'Content Timestamp',
    '1.2.840.113549.1.9.16.2.21': 'Certificate Refs',
    '1.2.840.113549.1.9.16.2.22': 'Revocation Refs',
    '1.2.840.113549.1.9.16.2.23': 'Cert Values',
    '1.2.840.113549.1.9.16.2.24': 'Revocation Values',
    '1.2.840.113549.1.9.16.2.25': 'Esc Time Stamp',
    '1.2.840.113549.1.9.16.2.26': 'Cert CRL Timestamp',
    '1.2.840.113549.1.9.16.2.27': 'Archive Time Stamp',
    '1.2.840.113549.1.9.16.2.28': 'Signature Type',
    '1.2.840.113549.1.9.16.2.29': 'Dvcs Dvc',
    '1.2.840.113549.1.9.16.2.30': 'Cek Reference',
    '1.2.840.113549.1.9.16.2.31': 'Max CEK Decrypts',
    '1.2.840.113549.1.9.16.2.32': 'Kek Derivation Alg',
    '1.2.840.113549.1.9.16.2.33': 'Intended Recipients',
    '1.2.840.113549.1.9.16.2.34': 'Cmc Unsigned Data',
    '1.2.840.113549.1.9.16.2.35': 'Fw Package ID',
    '1.2.840.113549.1.9.16.2.36': 'Fw Target Hardware IDs',
    '1.2.840.113549.1.9.16.2.37': 'Fw Decrypt Key ID',
    '1.2.840.113549.1.9.16.2.38': 'Fw Impl Crypt Algs',
    '1.2.840.113549.1.9.16.2.39': 'Fw Wrapped Firmware Key',
    '1.2.840.113549.1.9.16.2.40': 'Fw Community Identifiers',
    '1.2.840.113549.1.9.16.2.41': 'Fw Pkg Message Digest',
    '1.2.840.113549.1.9.16.2.42': 'Fw Package Info',
    '1.2.840.113549.1.9.16.2.43': 'Fw Impl Compress Algs',
    '1.2.840.113549.1.9.16.2.44': 'Ets Attr Certificate Refs',
    '1.2.840.113549.1.9.16.2.45': 'Ets Attr Revocation Refs',
    '1.2.840.113549.1.9.16.2.46': 'Binary Signing Time',
    '1.2.840.113549.1.9.16.2.47': 'Signing Certificate V2',
    '1.2.840.113549.1.9.16.2.48': 'Ets Archive Time Stamp V2',
    '1.2.840.113549.1.9.16.2.49': 'Er Internal',
    '1.2.840.113549.1.9.16.2.50': 'Er External',
    '1.2.840.113549.1.9.16.2.51': 'Multiple Signatures',
    '1.2.840.113549.1.9.16.3.1': 'Es DHwith3 DES',
    '1.2.840.113549.1.9.16.3.2': 'Es DHwith RC2',
    '1.2.840.113549.1.9.16.3.3': '3des Wrap',
    '1.2.840.113549.1.9.16.3.4': 'Rc2 Wrap',
    '1.2.840.113549.1.9.16.3.5': 'Es DH',
    '1.2.840.113549.1.9.16.3.6': 'Cms3 DESwrap',
    '1.2.840.113549.1.9.16.3.7': 'Cms RC2wrap',
    '1.2.840.113549.1.9.16.3.8': 'Zlib',
    '1.2.840.113549.1.9.16.3.9': 'Pwri KEK',
    '1.2.840.113549.1.9.16.3.10': 'Ss DH',
    '1.2.840.113549.1.9.16.3.11': 'Hmac With3 DE Swrap',
    '1.2.840.113549.1.9.16.3.12': 'Hmac With AE Swrap',
    '1.2.840.113549.1.9.16.3.13': 'MD5 Xor Experiment',
    '1.2.840.113549.1.9.16.3.14': 'RSA KEM',
    '1.2.840.113549.1.9.16.3.15': 'Auth Enc128',
    '1.2.840.113549.1.9.16.3.16': 'Auth Enc256',
    '1.2.840.113549.1.9.16.4.1': 'Cert Dist-ldap',
    '1.2.840.113549.1.9.16.5.1': 'Sig Policy Qualifier-spuri x',
    '1.2.840.113549.1.9.16.5.2': 'Sig Policy Qualifier-sp User Notice',
    '1.2.840.113549.1.9.16.6.1': 'Proof Of Origin',
    '1.2.840.113549.1.9.16.6.2': 'Proof Of Receipt',
    '1.2.840.113549.1.9.16.6.3': 'Proof Of Delivery',
    '1.2.840.113549.1.9.16.6.4': 'Proof Of Sender',
    '1.2.840.113549.1.9.16.6.5': 'Proof Of Approval',
    '1.2.840.113549.1.9.16.6.6': 'Proof Of Creation',
    '1.2.840.113549.1.9.16.8.1': 'Gl Use KEK',
    '1.2.840.113549.1.9.16.8.2': 'Gl Delete',
    '1.2.840.113549.1.9.16.8.3': 'Gl Add Member',
    '1.2.840.113549.1.9.16.8.4': 'Gl Delete Member',
    '1.2.840.113549.1.9.16.8.5': 'Gl Rekey',
    '1.2.840.113549.1.9.16.8.6': 'Gl Add Owner',
    '1.2.840.113549.1.9.16.8.7': 'Gl Remove Owner',
    '1.2.840.113549.1.9.16.8.8': 'Glk Compromise',
    '1.2.840.113549.1.9.16.8.9': 'Glk Refresh',
    '1.2.840.113549.1.9.16.8.10': 'Gl Fail Info',
    '1.2.840.113549.1.9.16.8.11': 'Gla Query Request',
    '1.2.840.113549.1.9.16.8.12': 'Gla Query Response',
    '1.2.840.113549.1.9.16.8.13': 'Gl Provide Cert',
    '1.2.840.113549.1.9.16.8.14': 'Gl Update Cert',
    '1.2.840.113549.1.9.16.8.15': 'Gl Key',
    '1.2.840.113549.1.9.16.9': 'Signature Type Identifier',
    '1.2.840.113549.1.9.16.9.1': 'Originator Sig',
    '1.2.840.113549.1.9.16.9.2': 'Domain Sig',
    '1.2.840.113549.1.9.16.9.3': 'Additional Attributes Sig',
    '1.2.840.113549.1.9.16.9.4': 'Review Sig',
    '1.2.840.113549.1.9.16.11': 'Capabilities',
    '1.2.840.113549.1.9.16.11.1': 'Prefer Binary Inside',
    '1.2.840.113549.1.9.20': 'Friendly Name (for PKCS #12)',
    '1.2.840.113549.1.9.21': 'Local Key I D (for PKCS #12)',
    '1.2.840.113549.1.9.22': 'Cert Types (for PKCS #12)',
    '1.2.840.113549.1.9.22.1': 'x509 Certificate (for PKCS #12)',
    '1.2.840.113549.1.9.22.2': 'SDSI Certificate (for PKCS #12)',
    '1.2.840.113549.1.9.23': 'CRL Types (for PKCS #12)',
    '1.2.840.113549.1.9.23.1': 'x509 Crl (for PKCS #12)',
    '1.2.840.113549.1.9.24': 'PKCS9object Class',
    '1.2.840.113549.1.9.25': 'PKCS9attributes',
    '1.2.840.113549.1.9.25.1': 'PKCS15 Token',
    '1.2.840.113549.1.9.25.2': 'Encrypted Private Key Info',
    '1.2.840.113549.1.9.25.3': 'Random Nonce',
    '1.2.840.113549.1.9.25.4': 'Sequence Number',
    '1.2.840.113549.1.9.25.5': 'PKCS7 PDU',
    '1.2.840.113549.1.9.26': 'PKCS9syntax',
    '1.2.840.113549.1.9.27': 'PKCS9matching Rules',
    '1.2.840.113549.1.12': 'PKCS-12',
    '1.2.840.113549.1.12.1': 'PKCS-12- Pbe Ids#12 mode ID',
    '1.2.840.113549.1.12.1.1': 'PBE With SHA And128 Bit RC4',
    '1.2.840.113549.1.12.1.2': 'PBE With SHA And40 Bit RC4',
    '1.2.840.113549.1.12.1.3': 'PBE With SHA And3-Key Triple DES-CBC',
    '1.2.840.113549.1.12.1.4': 'PBE With SHA And2-Key Triple DES-CBC',
    '1.2.840.113549.1.12.1.5': 'PBE With SHA And128 Bit RC2-CBC',
    '1.2.840.113549.1.12.1.6': 'PBE With SHA And40 Bit RC2-CBC',
    '1.2.840.113549.1.12.2': 'PKCS-12-ESPVKID',
    '1.2.840.113549.1.12.2.1': 'PKCS-12-PKCS8 Key Shrouding(1284011354911235) instead',
    '1.2.840.113549.1.12.3': 'PKCS-12-Bag Ids',
    '1.2.840.113549.1.12.3.1': 'PKCS-12-key Bag Id',
    '1.2.840.113549.1.12.3.2': 'PKCS-12-cert And CRL Bag Id',
    '1.2.840.113549.1.12.3.3': 'PKCS-12-secret Bag Id',
    '1.2.840.113549.1.12.3.4': 'PKCS-12-safe Contents Id',
    '1.2.840.113549.1.12.3.5': 'PKCS-12-pkcs',
    '1.2.840.113549.1.12.4': 'PKCS-12-Cert Bag ID',
    '1.2.840.113549.1.12.4.1': 'PKCS-12-x509 Cert CRL Bag I Dformerly assigned as pkcs-12-x509 Cert CRL Bag',
    '1.2.840.113549.1.12.4.2': 'PKCS-12-SDSI Cert Bag I Dformerly assigned as pkcs-12-SDSI Cert Bag',
    '1.2.840.113549.1.12.5': 'PKCS-12-OID',
    '1.2.840.113549.1.12.5.1': 'PKCS-12-PBEI Dthe partially compatible (128401135491121) OIDs instead',
    '1.2.840.113549.1.12.5.1.1': 'PKCS-12-PBE With SHA1 And128 Bit RC4use (1284011354911211) instead',
    '1.2.840.113549.1.12.5.1.2': 'PKCS-12-PBE With SHA1 And40 Bit RC4use (1284011354911212) instead',
    '1.2.840.113549.1.12.5.1.3': 'PKCS-12-PBE With SHA1 And Triple DESCB Cuse the incompatible but similar (1284011354911213) or (1284011354911214) instead',
    '1.2.840.113549.1.12.5.1.4': 'PKCS-12-PBE With SHA1 And128 Bit RC2CB Cuse (1284011354911215) instead',
    '1.2.840.113549.1.12.5.1.5': 'PKCS-12-PBE With SHA1 And40 Bit RC2CB Cuse (1284011354911216) instead',
    '1.2.840.113549.1.12.5.1.6': 'PKCS-12-PBE With SHA1 And RC4use the incompatible but similar (1284011354911211) or (1284011354911212) instead',
    '1.2.840.113549.1.12.5.1.7': 'PKCS-12-PBE With SHA1 And RC2CB Cuse the incompatible but similar (1284011354911215) or (1284011354911216) instead',
    '1.2.840.113549.1.12.5.2': 'PKCS-12-Enveloping I Dthe conventional  PKCS#1OIDs instead',
    '1.2.840.113549.1.12.5.2.1': 'PKCS-12-RSA Encryption With128 Bit RC4use the conventional  PKCS#1OIDs instead',
    '1.2.840.113549.1.12.5.2.2': 'PKCS-12-RSA Encryption With40 Bit RC4use the conventional  PKCS#1OIDs instead',
    '1.2.840.113549.1.12.5.2.3': 'PKCS-12-RSA Encryption With Triple DESuse the conventional  PKCS#1OIDs instead',
    '1.2.840.113549.1.12.5.3': 'PKCS-12-Signature IDuse the conventional  PKCS#1OIDs instead',
    '1.2.840.113549.1.12.5.3.1': 'PKCS-12-RSA Signature With SHA1 Digestuse the conventional  PKCS#1OIDs instead',
    '1.2.840.113549.1.12.10': 'PKCS-12 Version1',
    '1.2.840.113549.1.12.10.1': 'PKCS-12 Bad Ids',
    '1.2.840.113549.1.12.10.1.1': 'PKCS-12-key Bag',
    '1.2.840.113549.1.12.10.1.2': 'PKCS-12-pkcs',
    '1.2.840.113549.1.12.10.1.3': 'PKCS-12-cert Bag',
    '1.2.840.113549.1.12.10.1.4': 'PKCS-12-crl Bag',
    '1.2.840.113549.1.12.10.1.5': 'PKCS-12-secret Bag',
    '1.2.840.113549.1.12.10.1.6': 'PKCS-12-safe Contents Bag',
    '1.2.840.113549.1.15.1': 'PKCS15modules',
    '1.2.840.113549.1.15.2': 'PKCS15attributes',
    '1.2.840.113549.1.15.3': 'PKCS15content Type',
    '1.2.840.113549.1.15.3.1': 'PKCS15content',
    '1.2.840.113549.2': 'Digest Algorithm',
    '1.2.840.113549.2.2': 'MD2',
    '1.2.840.113549.2.4': 'MD4',
    '1.2.840.113549.2.5': 'MD5',
    '1.2.840.113549.2.7': 'HMAC With SHA1',
    '1.2.840.113549.2.8': 'HMAC With SHA224',
    '1.2.840.113549.2.9': 'HMAC With SHA256',
    '1.2.840.113549.2.10': 'HMAC With SHA384',
    '1.2.840.113549.2.11': 'HMAC With SHA512',
    '1.2.840.113549.3': 'Encryption Algorithm',
    '1.2.840.113549.3.2': 'Rc2CBC',
    '1.2.840.113549.3.3': 'Rc2ECB',
    '1.2.840.113549.3.4': 'Rc4',
    '1.2.840.113549.3.5': 'Rc4 With MAC',
    '1.2.840.113549.3.6': 'Desx-CBC',
    '1.2.840.113549.3.7': 'Des-EDE3-CBC',
    '1.2.840.113549.3.8': 'Rc5CBC',
    '1.2.840.113549.3.9': 'Rc5-CBCPad',
    '1.2.840.113549.3.10': 'DesCDMF',
    '1.2.840.113556.1.2.241': 'Delivery Mechanism',
    '1.2.840.113556.1.2.281': 'Nt Security Descriptor',
    '1.2.840.113556.1.3.0': 'Site-Addressing',
    '1.2.840.113556.1.3.13': 'Class Schema',
    '1.2.840.113556.1.3.14': 'Attribute Schema',
    '1.2.840.113556.1.3.17': 'Mailbox- Agent',
    '1.2.840.113556.1.3.22': 'Mailbox',
    '1.2.840.113556.1.3.23': 'Container',
    '1.2.840.113556.1.3.46': 'Mail Recipient',
    '1.2.840.113556.1.4.145': 'Revision',
    '1.2.840.113556.1.4.1327': 'PKI Default Key Spec',
    '1.2.840.113556.1.4.1328': 'PKI Key Usage',
    '1.2.840.113556.1.4.1329': 'PKI Max Issuing Depth',
    '1.2.840.113556.1.4.1330': 'PKI Critical Extensions',
    '1.2.840.113556.1.4.1331': 'PKI Expiration Period',
    '1.2.840.113556.1.4.1332': 'PKI Overlap Period',
    '1.2.840.113556.1.4.1333': 'PKI Extended Key Usage',
    '1.2.840.113556.1.4.1334': 'PKI Default CSPs',
    '1.2.840.113556.1.4.1335': 'PKI Enrollment Access',
    '1.2.840.113556.1.4.1429': 'MsPKI-RA-Signature',
    '1.2.840.113556.1.4.1430': 'MsPKI-Enrollment-Flag',
    '1.2.840.113556.1.4.1431': 'MsPKI-Private-Key',
    '1.2.840.113556.1.4.1432': 'MsPKI-Certificate-Name',
    '1.2.840.113556.1.4.1433': 'MsPKI-Minimal-Key',
    '1.2.840.113556.1.4.1434': 'MsPKI-Template-Schema',
    '1.2.840.113556.1.4.1435': 'MsPKI-Template-Minor',
    '1.2.840.113556.1.4.1436': 'MsPKI-Cert-Template',
    '1.2.840.113556.1.4.1437': 'MsPKI-Supersede-Templates',
    '1.2.840.113556.1.4.1438': 'MsPKI-RA-Policies',
    '1.2.840.113556.1.4.1439': 'MsPKI-Certificate-Policy',
    '1.2.840.113556.1.4.1674': 'MsPKI-Certificate-Application',
    '1.2.840.113556.1.4.1675': 'MsPKI-R A- Application',
    '1.2.840.113556.4.3': 'Microsoft Excel',
    '1.2.840.113556.4.4': 'Titled With OID',
    '1.2.840.113556.4.5': 'Microsoft Power Point',
    '1.2.840.113583.1': 'Adobe Acrobat',
    '1.2.840.113583.1.1': 'Acrobat Security',
    '1.2.840.113583.1.1.1': 'PDF Password',
    '1.2.840.113583.1.1.2': 'PDF Default Signing Credential',
    '1.2.840.113583.1.1.3': 'PDF Default Encryption Credential',
    '1.2.840.113583.1.1.4': 'PDF Password Timeout',
    '1.2.840.113583.1.1.5': 'PDF Authentic Documents Trust',
    '1.2.840.113583.1.1.6': 'PDF Dynamic Content Trust',
    '1.2.840.113583.1.1.7': 'PDF Ubiquity Trust',
    '1.2.840.113583.1.1.8': 'PDF Revocation Info Archival',
    '1.2.840.113583.1.1.9': 'PDF x509 Extension',
    '1.2.840.113583.1.1.9.1': 'PDF Time Stamp',
    '1.2.840.113583.1.1.9.2': 'PDF Archive Rev Info',
    '1.2.840.113583.1.1.10': 'PDF PPLK Lite Credential',
    '1.2.840.113583.1.2.': 'Acrobat CPS',
    '1.2.840.113583.1.2.1': 'PDF Authentic Documents CPS',
    '1.2.840.113583.1.2.2': 'PDF Test CPS',
    '1.2.840.113583.1.2.3': 'PDF Ubiquity CPS',
    '1.2.840.113583.1.2.4': 'PDF Adhoc CPS',
    '1.2.840.113583.1.7': 'Acrobat Ubiquity',
    '1.2.840.113583.1.7.1': 'PDF Ubiquity Sub Rights',
    '1.2.840.113583.1.9': 'Acrobat Extension',
    '1.2.840.113628.114.1.7': 'Adobe PKCS7',
    '1.2.840.113635.100': 'Apple Data Security',
    '1.2.840.113635.100.1': 'Apple Trust Policy',
    '1.2.840.113635.100.1.1': 'Apple I Sign TP',
    '1.2.840.113635.100.1.2': 'Apple x509 Basic',
    '1.2.840.113635.100.1.3': 'Apple SSL Policy',
    '1.2.840.113635.100.1.4': 'Apple Local Cert Gen Policy',
    '1.2.840.113635.100.1.5': 'Apple CSR Gen Policy',
    '1.2.840.113635.100.1.6': 'Apple CRL Policy',
    '1.2.840.113635.100.1.7': 'Apple OCSP Policy',
    '1.2.840.113635.100.1.8': 'Apple SMIME Policy',
    '1.2.840.113635.100.1.9': 'Apple EAP Policy',
    '1.2.840.113635.100.1.10': 'Apple SW Update Signing Policy',
    '1.2.840.113635.100.1.11': 'Apple IPSec Policy',
    '1.2.840.113635.100.1.12': 'Apple IChat Policy',
    '1.2.840.113635.100.1.13': 'Apple Resource Sign Policy',
    '1.2.840.113635.100.1.14': 'Apple PKINIT Client Policy',
    '1.2.840.113635.100.1.15': 'Apple PKINIT Server Policy',
    '1.2.840.113635.100.1.16': 'Apple Code Signing Policy',
    '1.2.840.113635.100.1.17': 'Apple Package Signing Policy',
    '1.2.840.113635.100.2': 'Apple Security Algorithm',
    '1.2.840.113635.100.2.1': 'Apple FEE',
    '1.2.840.113635.100.2.2': 'Apple ASC',
    '1.2.840.113635.100.2.3': 'Apple FEE_MD5',
    '1.2.840.113635.100.2.4': 'Apple FEE_SHA1',
    '1.2.840.113635.100.2.5': 'Apple FEED',
    '1.2.840.113635.100.2.6': 'Apple FEEDEXP',
    '1.2.840.113635.100.2.7': 'Apple ECDSA',
    '1.2.840.113635.100.3': 'Apple Dot Mac Certificate',
    '1.2.840.113635.100.3.1': 'Apple Dot Mac Certificate Request',
    '1.2.840.113635.100.3.2': 'Apple Dot Mac Certificate Extension',
    '1.2.840.113635.100.3.3': 'Apple Dot Mac Certificate Request Values',
    '1.2.840.113635.100.4': 'Apple Extended Key Usage',
    '1.2.840.113635.100.4.1': 'Apple Code Signing',
    '1.2.840.113635.100.4.1.1': 'Apple Code Signing Development',
    '1.2.840.113635.100.4.1.2': 'Apple Software Update Signing',
    '1.2.840.113635.100.4.1.3': 'Apple Code Signing Third Party',
    '1.2.840.113635.100.4.1.4': 'Apple Resource Signing',
    '1.2.840.113635.100.4.2': 'Apple I Chat Signing',
    '1.2.840.113635.100.4.3': 'Apple I Chat Encryption',
    '1.2.840.113635.100.4.4': 'Apple System Identity',
    '1.2.840.113635.100.4.5': 'Apple Crypto Env',
    '1.2.840.113635.100.4.5.1': 'Apple Crypto Production Env',
    '1.2.840.113635.100.4.5.2': 'Apple Crypto Maintenance Env',
    '1.2.840.113635.100.4.5.3': 'Apple Crypto Test Env',
    '1.2.840.113635.100.4.5.4': 'Apple Crypto Development Env',
    '1.2.840.113635.100.4.6': 'Apple Crypto Qo S',
    '1.2.840.113635.100.4.6.1': 'Apple Crypto Tier0 QoS',
    '1.2.840.113635.100.4.6.2': 'Apple Crypto Tier1 QoS',
    '1.2.840.113635.100.4.6.3': 'Apple Crypto Tier2 QoS',
    '1.2.840.113635.100.4.6.4': 'Apple Crypto Tier3 QoS',
    '1.2.840.113635.100.4.7': 'Apple ID Sharing Certificate',
    '1.2.840.113635.100.5': 'Apple Certificate Policies',
    '1.2.840.113635.100.5.1': 'Apple Certificate Policy ID',
    '1.2.840.113635.100.5.2': 'Apple Dot Mac Certificate Policy ID',
    '1.2.840.113635.100.5.3': 'Apple ADC Certificate Policy ID',
    '1.2.840.113635.100.6': 'Apple Certificate Extensions',
    '1.2.840.113635.100.6.1': 'Apple Certificate Extension Code Signing',
    '1.2.840.113635.100.6.1.1': 'Apple Certificate Extension Apple Signing',
    '1.2.840.113635.100.6.1.2': 'Apple Certificate Extension ADC Developer Signing',
    '1.2.840.113635.100.6.1.3': 'Apple Certificate Extension ADC Apple Signing',
    '1.2.840.114021.1.6.1': 'Identrus unknown policy Identifier',
    '1.2.840.114021.4.1': 'Identrus OCSP',
    '1.3.6.1.4.1.188.7.1.1': 'Ascom',
    '1.3.6.1.4.1.188.7.1.1.1': 'Idea ECB',
    '1.3.6.1.4.1.188.7.1.1.2': 'Idea CBC',
    '1.3.6.1.4.1.188.7.1.1.3': 'Idea CFB',
    '1.3.6.1.4.1.188.7.1.1.4': 'Idea OFB',
    '1.3.6.1.4.1.311.2.1.4': 'Spc Indirect Data Context',
    '1.3.6.1.4.1.311.2.1.10': 'Spc Agency Info',
    '1.3.6.1.4.1.311.2.1.11': 'Spc Statement Type',
    '1.3.6.1.4.1.311.2.1.12': 'Spc Sp Opus Info',
    '1.3.6.1.4.1.311.2.1.14': 'Cert Req Extensions',
    '1.3.6.1.4.1.311.2.1.15': 'Spc P E Image Data',
    '1.3.6.1.4.1.311.2.1.18': 'Spc Raw File Data',
    '1.3.6.1.4.1.311.2.1.19': 'Spc Structured Storage Data',
    '1.3.6.1.4.1.311.2.1.20': 'Spc Java ClassData (type 1extension\',aka \'Glue extension)',
    '1.3.6.1.4.1.311.2.1.21': 'Individual Code Signing',
    '1.3.6.1.4.1.311.2.1.22': 'Commercial Code Signing',
    '1.3.6.1.4.1.311.2.1.25': 'Spc Link (type 2as \'Glue extension)',
    '1.3.6.1.4.1.311.2.1.26': 'Spc Minimal Criteria Info',
    '1.3.6.1.4.1.311.2.1.27': 'Spc Financial Criteria Info',
    '1.3.6.1.4.1.311.2.1.28': 'SpcLink (type 3as \'Glue extension)',
    '1.3.6.1.4.1.311.2.1.29': 'Spc Hash Info Obj ID',
    '1.3.6.1.4.1.311.2.1.30': 'Spc Sip Info Obj ID',
    '1.3.6.1.4.1.311.2.2': 'Ctl',
    '1.3.6.1.4.1.311.2.2.1': 'Ctl Trusted Codesigning CAList',
    '1.3.6.1.4.1.311.2.2.2': 'Ctl Trusted Client Auth CAList',
    '1.3.6.1.4.1.311.2.2.3': 'Ctl Trusted Server Auth CAList',
    '1.3.6.1.4.1.311.3.2.1': 'Timestamp Request',
    '1.3.6.1.4.1.311.10.1': 'Cert Trust List',
    '1.3.6.1.4.1.311.10.1.1': 'Sorted Ctl',
    '1.3.6.1.4.1.311.10.2': 'Next Update Location',
    '1.3.6.1.4.1.311.10.3.1': 'Cert Trust List Signing',
    '1.3.6.1.4.1.311.10.3.2': 'Time Stamp Signing',
    '1.3.6.1.4.1.311.10.3.3': 'Server Gated Crypto',
    '1.3.6.1.4.1.311.10.3.3.1': 'Serialized',
    '1.3.6.1.4.1.311.10.3.4': 'Encrypted File System',
    '1.3.6.1.4.1.311.10.3.4.1': 'Efs Recovery',
    '1.3.6.1.4.1.311.10.3.5': 'Whql Crypto',
    '1.3.6.1.4.1.311.10.3.6': 'Nt5 Crypto',
    '1.3.6.1.4.1.311.10.3.7': 'Oem WHQL Crypto',
    '1.3.6.1.4.1.311.10.3.8': 'Embedded NT Crypto',
    '1.3.6.1.4.1.311.10.3.9': 'Root List Signer',
    '1.3.6.1.4.1.311.10.3.10': 'Qualified Subordination',
    '1.3.6.1.4.1.311.10.3.11': 'Key Recovery',
    '1.3.6.1.4.1.311.10.3.12': 'Document Signing',
    '1.3.6.1.4.1.311.10.3.13': 'Lifetime Signing',
    '1.3.6.1.4.1.311.10.3.14': 'Mobile Device Software',
    '1.3.6.1.4.1.311.10.3.15': 'Smart Display',
    '1.3.6.1.4.1.311.10.3.16': 'Csp Signature',
    '1.3.6.1.4.1.311.10.4.1': 'yesno Trust Attr',
    '1.3.6.1.4.1.311.10.5.1': 'Drm',
    '1.3.6.1.4.1.311.10.5.2': 'Drm Individualization',
    '1.3.6.1.4.1.311.10.6.1': 'Licenses',
    '1.3.6.1.4.1.311.10.6.2': 'License Server',
    '1.3.6.1.4.1.311.10.7.1': 'Keyid Rdn',
    '1.3.6.1.4.1.311.10.8.1': 'Remove Certificate',
    '1.3.6.1.4.1.311.10.9.1': 'Cross Cert Dist Points',
    '1.3.6.1.4.1.311.10.10.1': 'Cmc Add Attributes',
    '1.3.6.1.4.1.311.10.11': 'Cert Prop Id Prefix',
    '1.3.6.1.4.1.311.10.11.4': 'Cert Md5 Hash Prop Id',
    '1.3.6.1.4.1.311.10.11.20': 'Cert Key Identifier Prop Id',
    '1.3.6.1.4.1.311.10.11.28': 'Cert Issuer Serial Number Md5 Hash Prop Id',
    '1.3.6.1.4.1.311.10.11.29': 'Cert Subject Name MD5 Hash Prop Id',
    '1.3.6.1.4.1.311.10.12.1': 'Any Application Policy',
    '1.3.6.1.4.1.311.12': 'Catalog',
    '1.3.6.1.4.1.311.12.1.1': 'Catalog List',
    '1.3.6.1.4.1.311.12.1.2': 'Catalog List Member',
    '1.3.6.1.4.1.311.12.2.1': 'Catalog Name Value Obj ID',
    '1.3.6.1.4.1.311.12.2.2': 'Catalog Member Info Obj ID',
    '1.3.6.1.4.1.311.13.1': 'Renewal Certificate',
    '1.3.6.1.4.1.311.13.2.1': 'Enrolment Name Value Pair',
    '1.3.6.1.4.1.311.13.2.2': 'Enrolment CSP',
    '1.3.6.1.4.1.311.13.2.3': 'Os Version',
    '1.3.6.1.4.1.311.16.4': 'Microsoft Recipient Info',
    '1.3.6.1.4.1.311.17.1': 'PKCS12 Key Provider Name Attr',
    '1.3.6.1.4.1.311.17.2': 'Local Machine Keyset',
    '1.3.6.1.4.1.311.17.3': 'PKCS12 Extended Attributes',
    '1.3.6.1.4.1.311.20.1': 'Auto Enroll Ctl Usage',
    '1.3.6.1.4.1.311.20.2': 'Enroll Certtype Extension',
    '1.3.6.1.4.1.311.20.2.1': 'Enrollment Agent',
    '1.3.6.1.4.1.311.20.2.2': 'Smartcard Logon',
    '1.3.6.1.4.1.311.20.2.3': 'Universal Principal Name',
    '1.3.6.1.4.1.311.20.3': 'Cert Manifold',
    '1.3.6.1.4.1.311.21.1': 'CA Key Cert Index Pair',
    '1.3.6.1.4.1.311.21.2': 'Cert Srv Previous Cert Hash',
    '1.3.6.1.4.1.311.21.3': 'CRL Virtual Base',
    '1.3.6.1.4.1.311.21.4': 'CRL Next Publish',
    '1.3.6.1.4.1.311.21.5': 'Ca Exchange',
    '1.3.6.1.4.1.311.21.6': 'Key Recovery',
    '1.3.6.1.4.1.311.21.7': 'Certificate Template',
    '1.3.6.1.4.1.311.21.8': 'Enterprize OID Root',
    '1.3.6.1.4.1.311.21.9': 'Rdn Dummy Signer',
    '1.3.6.1.4.1.311.21.10': 'Application Cert Policies',
    '1.3.6.1.4.1.311.21.11': 'Application Policy Mappings',
    '1.3.6.1.4.1.311.21.12': 'Application Policy Constraints',
    '1.3.6.1.4.1.311.21.13': 'Archived Key',
    '1.3.6.1.4.1.311.21.14': 'CRL Self CDP',
    '1.3.6.1.4.1.311.21.15': 'Require Cert Chain Policy',
    '1.3.6.1.4.1.311.21.16': 'Archived Key Cert Hash',
    '1.3.6.1.4.1.311.21.17': 'Issued Cert Hash',
    '1.3.6.1.4.1.311.21.19': 'DS Email Replication',
    '1.3.6.1.4.1.311.21.20': 'Request Client Info',
    '1.3.6.1.4.1.311.21.21': 'Encrypted Key Hash',
    '1.3.6.1.4.1.311.21.22': 'Certsrv Cross CA Version',
    '1.3.6.1.4.1.311.25.1': 'Ntds Replication',
    '1.3.6.1.4.1.311.31.1': 'Product Update',
    '1.3.6.1.4.1.311.47.1.1': 'System Health',
    '1.3.6.1.4.1.311.47.1.3': 'System Health Loophole',
    '1.3.6.1.4.1.311.60.1.1': 'Root Program Flags',
    '1.3.6.1.4.1.311.60.2.1.1': 'Jurisdiction Of Incorporation L',
    '1.3.6.1.4.1.311.60.2.1.2': 'Jurisdiction Of Incorporation SP',
    '1.3.6.1.4.1.311.60.2.1.3': 'Jurisdiction Of Incorporation C',
    '1.3.6.1.4.1.311.61.1.1': 'Kernel Mode Code Signing',
    '1.3.6.1.4.1.311.88': 'Capi Com',
    '1.3.6.1.4.1.311.88.1': 'Capi Com Version',
    '1.3.6.1.4.1.311.88.2': 'Capi Com Attribute',
    '1.3.6.1.4.1.311.88.2.1': 'Capi Com Document Name',
    '1.3.6.1.4.1.311.88.2.2': 'Capi Com Document Description',
    '1.3.6.1.4.1.311.88.3': 'Capi Com Encrypted Data',
    '1.3.6.1.4.1.311.88.3.1': 'Capi Com Encrypted Content',
    '1.3.6.1.4.1.782.1.2.1.8.1': 'Network  Solutions  EV policy',
    '1.3.6.1.4.1.2428.10.1.1': 'UNINETT policy Identifier',
    '1.3.6.1.4.1.2712.10': 'ICE-TEL policy Identifier',
    '1.3.6.1.4.1.2786.1.1.1': 'ICE-TEL  Italian',
    '1.3.6.1.4.1.3029.1.1.1': 'Blowfish ECB',
    '1.3.6.1.4.1.3029.1.1.2': 'Blowfish CBC',
    '1.3.6.1.4.1.3029.1.1.3': 'Blowfish CFB',
    '1.3.6.1.4.1.3029.1.1.4': 'Blowfish OFB',
    '1.3.6.1.4.1.3029.1.2.1': 'Elgamal',
    '1.3.6.1.4.1.3029.1.2.1.1': 'Elgamal With SHA-1',
    '1.3.6.1.4.1.3029.1.2.1.2': 'Elgamal With RIPEMD-160',
    '1.3.6.1.4.1.3029.3.1.1': 'Cryptlib Presence Check',
    '1.3.6.1.4.1.3029.3.1.2': 'Pki Boot',
    '1.3.6.1.4.1.3029.3.1.4': 'CRL Ext Reason',
    '1.3.6.1.4.1.3029.3.1.5': 'Key Features',
    '1.3.6.1.4.1.3029.4.1': 'Cryptlib Content',
    '1.3.6.1.4.1.3029.4.1.1': 'Cryptlib Config Data',
    '1.3.6.1.4.1.3029.4.1.2': 'Cryptlib User Index',
    '1.3.6.1.4.1.3029.4.1.3': 'Cryptlib User Info',
    '1.3.6.1.4.1.3029.4.1.4': 'Rtcs Request',
    '1.3.6.1.4.1.3029.4.1.5': 'Rtcs Response',
    '1.3.6.1.4.1.3029.4.1.6': 'Rtcs Response Ext',
    '1.3.6.1.4.1.3029.42.11172.1': 'Mpeg-1',
    '1.3.6.1.4.1.3029.54.11940.54': 'TSA policy \'Anythingpolicy',
    '1.3.6.1.4.1.3029.88.89.90.90.89': 'XYZZY policy Identifier',
    '1.3.6.1.4.1.3401.8.1.1': 'Pgp Extension',
    '1.3.6.1.4.1.3576.7': 'Ecia Asc X12 Edi',
    '1.3.6.1.4.1.3576.7.1': 'Plain ED Imessage',
    '1.3.6.1.4.1.3576.7.2': 'Signed ED Imessage',
    '1.3.6.1.4.1.3576.7.5': 'Integrity ED Imessage',
    '1.3.6.1.4.1.3576.7.65': 'Ia Receipt Message',
    '1.3.6.1.4.1.3576.7.97': 'Ia Status Message',
    '1.3.6.1.4.1.3576.8': 'Ecia Edifact',
    '1.3.6.1.4.1.3576.9': 'Ecia Non Edi',
    '1.3.6.1.4.1.4146': 'Globalsign',
    '1.3.6.1.4.1.4146.1': 'Globalsign Policy',
    '1.3.6.1.4.1.4146.1.1': 'Global Sign  EV policy',
    '1.3.6.1.4.1.4146.1.10': 'Globalsign DV Policy',
    '1.3.6.1.4.1.4146.1.20': 'Globalsign OV Policy',
    '1.3.6.1.4.1.4146.1.30': 'Globalsign TSA Policy',
    '1.3.6.1.4.1.4146.1.40': 'Globalsign Client Cert Policy',
    '1.3.6.1.4.1.4146.1.50': 'Globalsign Code Sign Policy',
    '1.3.6.1.4.1.4146.1.60': 'Globalsign Root Sign Policy',
    '1.3.6.1.4.1.4146.1.70': 'Globalsign Trusted Root Policy',
    '1.3.6.1.4.1.4146.1.80': 'Globalsign EDI Client Policy',
    '1.3.6.1.4.1.4146.1.81': 'Globalsign EDI Server Policy',
    '1.3.6.1.4.1.4146.1.90': 'Globalsign TPM Root Policy',
    '1.3.6.1.4.1.4146.1.95': 'Globalsign OCSP Policy',
    '1.3.6.1.4.1.4788.2.202.1': 'D-TRUSTEV policy',
    '1.3.6.1.4.1.5309.1': 'Edel Web Policy',
    '1.3.6.1.4.1.5309.1.2': 'Edel Web Customer Policy',
    '1.3.6.1.4.1.5309.1.2.1': 'Edel Web Clepsydre Policy',
    '1.3.6.1.4.1.5309.1.2.2': 'Edel Web Experimental TSA Policy',
    '1.3.6.1.4.1.5309.1.2.3': 'Edel Web Open Evidence TSA Policy',
    '1.3.6.1.4.1.5472': 'Timeproof',
    '1.3.6.1.4.1.5472.1': 'TSS',
    '1.3.6.1.4.1.5472.1.1': 'TSS80',
    '1.3.6.1.4.1.5472.1.2': 'TSS380',
    '1.3.6.1.4.1.5472.1.3': 'TSS400',
    '1.3.6.1.4.1.5770.0.3': 'Secondary Practices',
    '1.3.6.1.4.1.5770.0.4': 'Physician Identifiers',
    '1.3.6.1.4.1.6334.1.100.1': 'Cybertrust  EV policy',
    '1.3.6.1.4.1.6449.1.2.1.3.1': 'Comodo Policy',
    '1.3.6.1.4.1.6449.1.2.1.5.1': 'Comodo  EV policy',
    '1.3.6.1.4.1.6449.1.2.2.15': 'Wotrust Policy',
    '1.3.6.1.4.1.6449.1.3.5.2': 'Comodo Certified Delivery Service',
    '1.3.6.1.4.1.6449.2.1.1': 'Comodo Timestamping Policy',
    '1.3.6.1.4.1.7879.13.24.1': 'T-Tele Sec  EV policy',
    '1.3.6.1.4.1.8024.0.2.100.1.2': 'Quo Vadis  EV policy',
    '1.3.6.1.4.1.8231.1': 'Rol Unico Nacional',
    '1.3.6.1.4.1.8301.3.5.1': 'alidity Model Chain',
    '1.3.6.1.4.1.8301.3.5.2': 'alidity Model Shell',
    '1.3.6.1.4.1.11129.2.4.2': 'Certificate Transparency',
    '1.3.6.1.4.1.11591': 'Gnu',
    '1.3.6.1.4.1.11591.1': 'Gnu Radius',
    '1.3.6.1.4.1.11591.3': 'Gnu Radar',
    '1.3.6.1.4.1.11591.12': 'Gnu Digest Algorithm',
    '1.3.6.1.4.1.11591.12.2': 'Tiger',
    '1.3.6.1.4.1.11591.13': 'Gnu Encryption Algorithm',
    '1.3.6.1.4.1.11591.13.2': 'Serpent',
    '1.3.6.1.4.1.11591.13.2.1': 'Serpent128_ECB',
    '1.3.6.1.4.1.11591.13.2.2': 'Serpent128_CBC',
    '1.3.6.1.4.1.11591.13.2.3': 'Serpent128_OFB',
    '1.3.6.1.4.1.11591.13.2.4': 'Serpent128_CFB',
    '1.3.6.1.4.1.11591.13.2.21': 'Serpent192_ECB',
    '1.3.6.1.4.1.11591.13.2.22': 'Serpent192_CBC',
    '1.3.6.1.4.1.11591.13.2.23': 'Serpent192_OFB',
    '1.3.6.1.4.1.11591.13.2.24': 'Serpent192_CFB',
    '1.3.6.1.4.1.11591.13.2.41': 'Serpent256_ECB',
    '1.3.6.1.4.1.11591.13.2.42': 'Serpent256_CBC',
    '1.3.6.1.4.1.11591.13.2.43': 'Serpent256_OFB',
    '1.3.6.1.4.1.11591.13.2.44': 'Serpent256_CFB',
    '1.3.6.1.4.1.14370.1.6': 'Geo Trust EV policy',
    '1.3.6.1.4.1.14777.6.1.1': 'Izenpe EV policy',
    '1.3.6.1.4.1.14777.6.1.2': 'Izenpe EV policy',
    '1.3.6.1.4.1.16334.509.1.1': 'Northrop Grumman ext Key Usage?',
    '1.3.6.1.4.1.16334.509.2.1': 'Ngc Class1',
    '1.3.6.1.4.1.16334.509.2.2': 'Ngc Class2',
    '1.3.6.1.4.1.16334.509.2.3': 'Ngc Class3',
    '1.3.6.1.4.1.17326.10.8.12.1.2': 'Camerfirma EV policy',
    '1.3.6.1.4.1.17326.10.14.2.1.2': 'Camerfirma EV policy',
    '1.3.6.1.4.1.22234.2.5.2.3.1': 'Cert Plus EV policy',
    '1.3.6.1.4.1.23223.1.1.1': 'Start Com EV policy',
    '1.3.6.1.4.1.23629.1.4.2.1.1': 'Safenet Usage Limit',
    '1.3.6.1.4.1.23629.1.4.2.1.2': 'Safenet End Date',
    '1.3.6.1.4.1.23629.1.4.2.1.3': 'Safenet Start Date',
    '1.3.6.1.4.1.23629.1.4.2.1.4': 'Safenet Admin Cert',
    '1.3.6.1.4.1.23629.1.4.2.2.1': 'Safenet Key Digest',
    '1.3.6.1.4.1.34697.2.1': 'Affirm Trust EV policy',
    '1.3.6.1.4.1.34697.2.2': 'Affirm Trust EV policy',
    '1.3.6.1.4.1.34697.2.3': 'Affirm Trust EV policy',
    '1.3.6.1.4.1.34697.2.4': 'Affirm Trust EV policy',
    '1.3.6.1.4.1.40869.1.1.22.3': 'TWCAEV policy',
    '1.3.6.1.5.5.7': 'PKIX',
    '1.3.6.1.5.5.7.0.12': 'Attribute Cert',
    '1.3.6.1.5.5.7.1': 'Private Extension',
    '1.3.6.1.5.5.7.1.1': 'Certificate Authority Information Access',
    '1.3.6.1.5.5.7.1.2': 'Biometric Info',
    '1.3.6.1.5.5.7.1.3': 'Qualified Certificate Statements',
    '1.3.6.1.5.5.7.1.4': 'Ac Audit Identity',
    '1.3.6.1.5.5.7.1.5': 'Ac Targeting',
    '1.3.6.1.5.5.7.1.6': 'Ac Aa Controls',
    '1.3.6.1.5.5.7.1.7': 'Ip Addr Blocks',
    '1.3.6.1.5.5.7.1.8': 'Autonomous Sys Ids',
    '1.3.6.1.5.5.7.1.9': 'Router Identifier',
    '1.3.6.1.5.5.7.1.10': 'Ac Proxying',
    '1.3.6.1.5.5.7.1.11': 'Subject Info Access',
    '1.3.6.1.5.5.7.1.12': 'Logo Type',
    '1.3.6.1.5.5.7.1.13': 'Wlan SSID',
    '1.3.6.1.5.5.7.2': 'Policy Qualifier Ids',
    '1.3.6.1.5.5.7.2.1': 'CPS',
    '1.3.6.1.5.5.7.2.2': 'Unotice',
    '1.3.6.1.5.5.7.2.3': 'Text Notice',
    '1.3.6.1.5.5.7.3': 'Key Purpose',
    '1.3.6.1.5.5.7.3.1': 'Server Authentication',
    '1.3.6.1.5.5.7.3.2': 'Client Authentication',
    '1.3.6.1.5.5.7.3.3': 'Code Signing',
    '1.3.6.1.5.5.7.3.4': 'Email Protection',
    '1.3.6.1.5.5.7.3.5': 'Ipsec End System',
    '1.3.6.1.5.5.7.3.6': 'Ipsec Tunnel',
    '1.3.6.1.5.5.7.3.7': 'Ipsec User',
    '1.3.6.1.5.5.7.3.8': 'Time Stamping',
    '1.3.6.1.5.5.7.3.9': 'OCSP Signing',
    '1.3.6.1.5.5.7.3.10': 'DVCS',
    '1.3.6.1.5.5.7.3.11': 'Sbgp Cert AA Server Auth',
    '1.3.6.1.5.5.7.3.13': 'Eap Over PPP',
    '1.3.6.1.5.5.7.3.14': 'Eap Over LAN',
    '1.3.6.1.5.5.7.4': 'Cmp Information Types',
    '1.3.6.1.5.5.7.4.1': 'Ca Prot Enc Cert',
    '1.3.6.1.5.5.7.4.2': 'Sign Key Pair Types',
    '1.3.6.1.5.5.7.4.3': 'Enc Key Pair Types',
    '1.3.6.1.5.5.7.4.4': 'Preferred Symm Alg',
    '1.3.6.1.5.5.7.4.5': 'CA Key Update Info',
    '1.3.6.1.5.5.7.4.6': 'Current CRL',
    '1.3.6.1.5.5.7.4.7': 'Unsupported OIDs',
    '1.3.6.1.5.5.7.4.10': 'Key Pair Param Req',
    '1.3.6.1.5.5.7.4.11': 'Key Pair Param Rep',
    '1.3.6.1.5.5.7.4.12': 'Rev Passphrase',
    '1.3.6.1.5.5.7.4.13': 'Implicit Confirm',
    '1.3.6.1.5.5.7.4.14': 'Confirm Wait Time',
    '1.3.6.1.5.5.7.4.15': 'Orig PKI Message',
    '1.3.6.1.5.5.7.4.16': 'Supp Lang Tags',
    '1.3.6.1.5.5.7.5': 'Crmf Registration',
    '1.3.6.1.5.5.7.5.1': 'Reg Ctrl',
    '1.3.6.1.5.5.7.5.1.1': 'Reg Token',
    '1.3.6.1.5.5.7.5.1.2': 'Authenticator',
    '1.3.6.1.5.5.7.5.1.3': 'Pki Publication Info',
    '1.3.6.1.5.5.7.5.1.4': 'Pki Archive Options',
    '1.3.6.1.5.5.7.5.1.5': 'Old Cert ID',
    '1.3.6.1.5.5.7.5.1.6': 'Protocol Encr Key',
    '1.3.6.1.5.5.7.5.1.7': 'Alt Cert Template',
    '1.3.6.1.5.5.7.5.1.8': 'Wtls Template',
    '1.3.6.1.5.5.7.5.2': 'Utf8 Pairs',
    '1.3.6.1.5.5.7.5.2.1': 'Utf8 Pairs',
    '1.3.6.1.5.5.7.5.2.2': 'Cert Req',
    '1.3.6.1.5.5.7.6': 'Algorithms',
    '1.3.6.1.5.5.7.6.1': 'Des40',
    '1.3.6.1.5.5.7.6.2': 'No Signature',
    '1.3.6.1.5.5.7.6.3': 'Dh-sig-hmac',
    '1.3.6.1.5.5.7.6.4': 'Dh-pop',
    '1.3.6.1.5.5.7.7': 'CMC Controls',
    '1.3.6.1.5.5.7.8': 'Other Names',
    '1.3.6.1.5.5.7.8.1': 'Personal Data',
    '1.3.6.1.5.5.7.8.2': 'User Group',
    '1.3.6.1.5.5.7.8.5': 'Xmpp Addr',
    '1.3.6.1.5.5.7.9': 'Personal Data',
    '1.3.6.1.5.5.7.9.1': 'Date Of Birth',
    '1.3.6.1.5.5.7.9.2': 'Place Of Birth',
    '1.3.6.1.5.5.7.9.3': 'Gender',
    '1.3.6.1.5.5.7.9.4': 'Country Of Citizenship',
    '1.3.6.1.5.5.7.9.5': 'Country Of Residence',
    '1.3.6.1.5.5.7.10': 'Attribute Certificate',
    '1.3.6.1.5.5.7.10.1': 'Authentication Info',
    '1.3.6.1.5.5.7.10.2': 'Access Identity',
    '1.3.6.1.5.5.7.10.3': 'Charging Identity',
    '1.3.6.1.5.5.7.10.4': 'Group',
    '1.3.6.1.5.5.7.10.5': 'Role',
    '1.3.6.1.5.5.7.10.6': 'Wlan SSID',
    '1.3.6.1.5.5.7.11': 'Personal Data',
    '1.3.6.1.5.5.7.11.1': 'Pkix Q C Syntax-v1',
    '1.3.6.1.5.5.7.14.2': 'Resource Certificate Policy',
    '1.3.6.1.5.5.7.20': 'Logo',
    '1.3.6.1.5.5.7.20.1': 'Logo Loyalty',
    '1.3.6.1.5.5.7.20.2': 'Logo Background',
    '1.3.6.1.5.5.7.48.1': 'OCSP',
    '1.3.6.1.5.5.7.48.1.1': 'OCSP Basic',
    '1.3.6.1.5.5.7.48.1.2': 'OCSP Nonce',
    '1.3.6.1.5.5.7.48.1.3': 'OCSP CRL',
    '1.3.6.1.5.5.7.48.1.4': 'OCSP Response',
    '1.3.6.1.5.5.7.48.1.5': 'OCSP No Check',
    '1.3.6.1.5.5.7.48.1.6': 'OCSP Archive Cutoff',
    '1.3.6.1.5.5.7.48.1.7': 'OCSP Service Locator',
    '1.3.6.1.5.5.7.48.2': 'CA Issuers',
    '1.3.6.1.5.5.7.48.3': 'Time Stamping',
    '1.3.6.1.5.5.7.48.4': 'DVCS',
    '1.3.6.1.5.5.7.48.5': 'CA Repository',
    '1.3.6.1.5.5.7.48.7': 'Signed Object Repository',
    '1.3.6.1.5.5.7.48.10': 'Rpki Manifest',
    '1.3.6.1.5.5.7.48.11': 'Signed Object',
    '1.3.6.1.5.5.8.1.1': 'HMAC MD5',
    '1.3.6.1.5.5.8.1.2': 'HMAC SHA',
    '1.3.6.1.5.5.8.1.3': 'HMAC Tiger',
    '1.3.6.1.5.5.8.2.2': 'IKE Intermediate',
    '1.3.12.2.1011.7.1': 'DEC Encryption Algorithm',
    '1.3.12.2.1011.7.1.2': 'DEC DEA',
    '1.3.12.2.1011.7.2': 'DEC Hash Algorithm',
    '1.3.12.2.1011.7.2.1': 'DECMD2',
    '1.3.12.2.1011.7.2.2': 'DECMD4',
    '1.3.12.2.1011.7.3': 'DEC Signature Algorithm',
    '1.3.12.2.1011.7.3.1': 'DEC MD2 With RSA',
    '1.3.12.2.1011.7.3.2': 'DEC MD4 With RSA',
    '1.3.12.2.1011.7.3.3': 'DEC DEAMAC',
    '1.3.14.2.26.5': 'SHA',
    '1.3.14.3.2.1.1': 'RSA',
    '1.3.14.3.2.2': 'MD4 With RSA',
    '1.3.14.3.2.2.1': 'Sqmod-N',
    '1.3.14.3.2.3': 'MD5 With RSA',
    '1.3.14.3.2.3.1': 'Sqmod-Nwith RSA',
    '1.3.14.3.2.4': 'MD4 With RSA Encryption',
    '1.3.14.3.2.6': 'DES ECB',
    '1.3.14.3.2.7': 'DES CBC',
    '1.3.14.3.2.8': 'DES OFB',
    '1.3.14.3.2.9': 'DES CFB',
    '1.3.14.3.2.10': 'DES MAC',
    '1.3.14.3.2.11': 'RSA Signature',
    '1.3.14.3.2.12': 'DSA',
    '1.3.14.3.2.13': 'DSA With SHA',
    '1.3.14.3.2.14': 'MDC2 With RSA Signature',
    '1.3.14.3.2.15': 'SHA With RSA Signature',
    '1.3.14.3.2.16': 'DH With Common Modulus',
    '1.3.14.3.2.17': 'Des EDE',
    '1.3.14.3.2.18': 'SHA',
    '1.3.14.3.2.19': 'MDC-2',
    '1.3.14.3.2.20': 'DSA Common',
    '1.3.14.3.2.21': 'DSA Common With SHA',
    '1.3.14.3.2.22': 'RSA Key Transport',
    '1.3.14.3.2.23': 'Keyed-hash-seal',
    '1.3.14.3.2.24': 'MD2 With RSA Signature',
    '1.3.14.3.2.25': 'MD5 With RSA Signature',
    '1.3.14.3.2.26': 'SHA1',
    '1.3.14.3.2.27': 'DSA With SHA1',
    '1.3.14.3.2.28': 'DSA With Common SHA1',
    '1.3.14.3.2.29': 'SHA-1 With RSA Encryption',
    '1.3.14.3.3.1': 'Simple-strong-auth',
    '1.3.14.7.2.1.1': 'El Gamal',
    '1.3.14.7.2.3.1': 'MD2 With RSA',
    '1.3.14.7.2.3.2': 'MD2 With El Gamal',
    '1.3.36.1': 'Document',
    '1.3.36.1.1': 'Final Version',
    '1.3.36.1.2': 'Draft',
    '1.3.36.2': 'Sio',
    '1.3.36.2.1': 'Sedu',
    '1.3.36.3': 'Algorithm',
    '1.3.36.3.1': 'Encryption Algorithm',
    '1.3.36.3.1.1': 'DES',
    '1.3.36.3.1.1.1': 'DES ECB_pad',
    '1.3.36.3.1.1.1.1': 'DES ECB_ISOpad',
    '1.3.36.3.1.1.2.1': 'DES CBC_pad',
    '1.3.36.3.1.1.2.1.1': 'DES CBC_ISOpad',
    '1.3.36.3.1.2': 'IDEA',
    '1.3.36.3.1.2.1': 'IDEA ECB',
    '1.3.36.3.1.2.1.1': 'IDEA ECB_pad',
    '1.3.36.3.1.2.1.1.1': 'IDEA ECB_ISOpad',
    '1.3.36.3.1.2.2': 'IDEA CBC',
    '1.3.36.3.1.2.2.1': 'IDEA CBC_pad',
    '1.3.36.3.1.2.2.1.1': 'IDEA CBC_ISOpad',
    '1.3.36.3.1.2.3': 'IDEA OFB',
    '1.3.36.3.1.2.4': 'IDEA CFB',
    '1.3.36.3.1.3': 'DES_3',
    '1.3.36.3.1.3.1.1': 'DES_3 ECB_pad',
    '1.3.36.3.1.3.1.1.1': 'DES_3 ECB_ISOpad',
    '1.3.36.3.1.3.2.1': 'DES_3 CBC_pad',
    '1.3.36.3.1.3.2.1.1': 'DES_3 CBC_ISOpad',
    '1.3.36.3.1.4': 'RSA Encryption',
    '1.3.36.3.1.4.512.17': 'RSA Encryption Withlmod512expe17',
    '1.3.36.3.1.5': 'BSI-1',
    '1.3.36.3.1.5.1': 'BSI_1 ECB_pad',
    '1.3.36.3.1.5.2': 'BSI_1 CBC_pad',
    '1.3.36.3.1.5.2.1': 'BSI_1 CBC_PEMpad',
    '1.3.36.3.2': 'Hash Algorithm',
    '1.3.36.3.2.1': 'Ripemd160',
    '1.3.36.3.2.2': 'Ripemd128',
    '1.3.36.3.2.3': 'Ripemd256',
    '1.3.36.3.2.4': 'Mdc2single Length',
    '1.3.36.3.2.5': 'Mdc2double Length',
    '1.3.36.3.3': 'Signature Algorithm',
    '1.3.36.3.3.1': 'RSA Signature',
    '1.3.36.3.3.1.1': 'RSA Signature WithSHA1',
    '1.3.36.3.3.1.1.1024.11': 'RSA Signature WithSHA1_l1024_l11',
    '1.3.36.3.3.1.2': 'RSA Signature Withripemd160',
    '1.3.36.3.3.1.2.1024.11': 'RSA Signature Withripemd160_l1024_l11',
    '1.3.36.3.3.1.3': 'RSA Signature Withrimpemd128',
    '1.3.36.3.3.1.4': 'RSA Signature Withrimpemd256',
    '1.3.36.3.3.2': 'Ecsie Sign',
    '1.3.36.3.3.2.1': 'Ecsie Sign WithSHA1',
    '1.3.36.3.3.2.2': 'Ecsie Sign Withripemd160',
    '1.3.36.3.3.2.3': 'Ecsie Sign Withmd2',
    '1.3.36.3.3.2.4': 'Ecsie Sign Withmd5',
    '1.3.36.3.3.2.8.1.1.1': 'Brainpool P160r1',
    '1.3.36.3.3.2.8.1.1.2': 'Brainpool P160t1',
    '1.3.36.3.3.2.8.1.1.3': 'Brainpool P192r1',
    '1.3.36.3.3.2.8.1.1.4': 'Brainpool P192t1',
    '1.3.36.3.3.2.8.1.1.5': 'Brainpool P224r1',
    '1.3.36.3.3.2.8.1.1.6': 'Brainpool P224t1',
    '1.3.36.3.3.2.8.1.1.7': 'Brainpool P256r1',
    '1.3.36.3.3.2.8.1.1.8': 'Brainpool P256t1',
    '1.3.36.3.3.2.8.1.1.9': 'Brainpool P320r1',
    '1.3.36.3.3.2.8.1.1.10': 'Brainpool P320t1',
    '1.3.36.3.3.2.8.1.1.11': 'Brainpool P384r1',
    '1.3.36.3.3.2.8.1.1.12': 'Brainpool P384t1',
    '1.3.36.3.3.2.8.1.1.13': 'Brainpool P512r1',
    '1.3.36.3.3.2.8.1.1.14': 'Brainpool P512t1',
    '1.3.36.3.4': 'Signature Scheme',
    '1.3.36.3.4.1': 'Sig S_ISO9796-1',
    '1.3.36.3.4.2': 'Sig S_ISO9796-2',
    '1.3.36.3.4.2.1': 'Sig S_ISO9796-2 With RED',
    '1.3.36.3.4.2.2': 'Sig S_ISO9796-2 With RSA',
    '1.3.36.3.4.2.3': 'Sig S_ISO9796-2 With RDN',
    '1.3.36.4': 'Attribute',
    '1.3.36.5': 'Policy',
    '1.3.36.6': 'Api',
    '1.3.36.6.1': 'Manufacturer-specific_api',
    '1.3.36.6.1.1': 'Utimaco-api',
    '1.3.36.6.2': 'Functionality-specific_api',
    '1.3.36.7': 'Keymgmnt',
    '1.3.36.7.1': 'Keyagree',
    '1.3.36.7.1.1': 'Bsi PKE',
    '1.3.36.7.2': 'Keytrans',
    '1.3.36.7.2.1': 'Enc ISO9796-2 Withrsa',
    '1.3.36.8.1.1': 'Teletrust  Sig G Conform policy Identifier',
    '1.3.36.8.2.1': 'Directory Service',
    '1.3.36.8.3.1': 'Date Of Cert Gen',
    '1.3.36.8.3.2': 'Procuration',
    '1.3.36.8.3.3': 'Admission',
    '1.3.36.8.3.4': 'Monetary Limit',
    '1.3.36.8.3.5': 'Declaration Of Majority',
    '1.3.36.8.3.6': 'Integrated Circuit Card Serial Number',
    '1.3.36.8.3.7': 'PK Reference',
    '1.3.36.8.3.8': 'Restriction',
    '1.3.36.8.3.9': 'Retrieve If Allowed',
    '1.3.36.8.3.10': 'Requested Certificate',
    '1.3.36.8.3.11': 'Naming Authorities',
    '1.3.36.8.3.11.1': 'Recht Wirtschaft Steuern',
    '1.3.36.8.3.11.1.1': 'Rechtsanwaeltin',
    '1.3.36.8.3.11.1.2': 'Rechtsanwalt',
    '1.3.36.8.3.11.1.3': 'Rechts Beistand',
    '1.3.36.8.3.11.1.4': 'Steuer Beraterin',
    '1.3.36.8.3.11.1.5': 'Steuer Berater',
    '1.3.36.8.3.11.1.6': 'Steuer Bevollmaechtigte',
    '1.3.36.8.3.11.1.7': 'Steuer Bevollmaechtigter',
    '1.3.36.8.3.11.1.8': 'Notarin',
    '1.3.36.8.3.11.1.9': 'Notar',
    '1.3.36.8.3.11.1.10': 'Notar Vertreterin',
    '1.3.36.8.3.11.1.11': 'Notar Vertreter',
    '1.3.36.8.3.11.1.12': 'Notariats Verwalterin',
    '1.3.36.8.3.11.1.13': 'Notariats Verwalter',
    '1.3.36.8.3.11.1.14': 'Wirtschafts Prueferin',
    '1.3.36.8.3.11.1.15': 'Wirtschafts Pruefer',
    '1.3.36.8.3.11.1.16': 'ereidigte Buchprueferin',
    '1.3.36.8.3.11.1.17': 'ereidigter Buchpruefer',
    '1.3.36.8.3.11.1.18': 'Patent Anwaeltin',
    '1.3.36.8.3.11.1.19': 'Patent Anwalt',
    '1.3.36.8.3.12': 'Cert In Dir Since',
    '1.3.36.8.3.13': 'Cert Hash',
    '1.3.36.8.3.14': 'Name At Birth',
    '1.3.36.8.3.15': 'Additional Information',
    '1.3.36.8.4.1': 'Personal Data',
    '1.3.36.8.4.8': 'Restriction',
    '1.3.36.8.5.1.1.1': 'RSA Indicate SHA1',
    '1.3.36.8.5.1.1.2': 'RSA Indicate RIPEMD160',
    '1.3.36.8.5.1.1.3': 'RSA With SHA1',
    '1.3.36.8.5.1.1.4': 'RSA With RIPEMD160',
    '1.3.36.8.5.1.2.1': 'Dsa Extended',
    '1.3.36.8.5.1.2.2': 'Dsa With RIPEMD160',
    '1.3.36.8.6.1': 'Cert',
    '1.3.36.8.6.2': 'Cert Ref',
    '1.3.36.8.6.3': 'Attr Cert',
    '1.3.36.8.6.4': 'Attr Ref',
    '1.3.36.8.6.5': 'File Name',
    '1.3.36.8.6.6': 'Storage Time',
    '1.3.36.8.6.7': 'File Size',
    '1.3.36.8.6.8': 'Location',
    '1.3.36.8.6.9': 'Sig Number',
    '1.3.36.8.6.10': 'Auto Gen',
    '1.3.36.8.7.1.1': 'Pt Adobe ILL',
    '1.3.36.8.7.1.2': 'Pt Ami Pro',
    '1.3.36.8.7.1.3': 'Pt Auto CAD',
    '1.3.36.8.7.1.4': 'Pt Binary',
    '1.3.36.8.7.1.5': 'Pt BMP',
    '1.3.36.8.7.1.6': 'Pt CGM',
    '1.3.36.8.7.1.7': 'Pt Corel CRT',
    '1.3.36.8.7.1.8': 'Pt Corel DRW',
    '1.3.36.8.7.1.9': 'Pt Corel EXC',
    '1.3.36.8.7.1.10': 'Pt Corel PHT',
    '1.3.36.8.7.1.11': 'Pt Draw',
    '1.3.36.8.7.1.12': 'Pt DVI',
    '1.3.36.8.7.1.13': 'Pt EPS',
    '1.3.36.8.7.1.14': 'Pt Excel',
    '1.3.36.8.7.1.15': 'Pt GEM',
    '1.3.36.8.7.1.16': 'Pt GIF',
    '1.3.36.8.7.1.17': 'Pt HPGL',
    '1.3.36.8.7.1.18': 'Pt JPEG',
    '1.3.36.8.7.1.19': 'Pt Kodak',
    '1.3.36.8.7.1.20': 'Pt LaTeX',
    '1.3.36.8.7.1.21': 'Pt Lotus',
    '1.3.36.8.7.1.22': 'Pt Lotus PIC',
    '1.3.36.8.7.1.23': 'Pt Mac PICT',
    '1.3.36.8.7.1.24': 'Pt Mac Word',
    '1.3.36.8.7.1.25': 'Pt MSWfD',
    '1.3.36.8.7.1.26': 'Pt MSWord',
    '1.3.36.8.7.1.27': 'Pt MSWord2',
    '1.3.36.8.7.1.28': 'Pt MSWord6',
    '1.3.36.8.7.1.29': 'Pt MSWord8',
    '1.3.36.8.7.1.30': 'Pt PDF',
    '1.3.36.8.7.1.31': 'Pt PIF',
    '1.3.36.8.7.1.32': 'Pt Postscript',
    '1.3.36.8.7.1.33': 'Pt RTF',
    '1.3.36.8.7.1.34': 'Pt SCITEX',
    '1.3.36.8.7.1.35': 'Pt TAR',
    '1.3.36.8.7.1.36': 'Pt Targa',
    '1.3.36.8.7.1.37': 'Pt TeX',
    '1.3.36.8.7.1.38': 'Pt Text',
    '1.3.36.8.7.1.39': 'Pt TIFF',
    '1.3.36.8.7.1.40': 'Pt TIFF-FC',
    '1.3.36.8.7.1.41': 'Pt UID',
    '1.3.36.8.7.1.42': 'Pt UU Encode',
    '1.3.36.8.7.1.43': 'Pt WMF',
    '1.3.36.8.7.1.44': 'Pt Word Perfect',
    '1.3.36.8.7.1.45': 'Pt WP Grph',
    '1.3.101.1.4': 'Thawte-ce',
    '1.3.101.1.4.1': 'Strong Extranet',
    '1.3.132.0.1': 'Sect163k1',
    '1.3.132.0.2': 'Sect163r1',
    '1.3.132.0.3': 'Sect239k1',
    '1.3.132.0.4': 'Sect113r1',
    '1.3.132.0.5': 'Sect113r2',
    '1.3.132.0.6': 'Secp112r1',
    '1.3.132.0.7': 'Secp112r2',
    '1.3.132.0.8': 'Secp160r1',
    '1.3.132.0.9': 'Secp160k1',
    '1.3.132.0.10': 'Secp256k1',
    '1.3.132.0.15': 'Sect163r2',
    '1.3.132.0.16': 'Sect283k1',
    '1.3.132.0.17': 'Sect283r1',
    '1.3.132.0.22': 'Sect131r1',
    '1.3.132.0.23': 'Sect131r2',
    '1.3.132.0.24': 'Sect193r1',
    '1.3.132.0.25': 'Sect193r2',
    '1.3.132.0.26': 'Sect233k1',
    '1.3.132.0.27': 'Sect233r1',
    '1.3.132.0.28': 'Secp128r1',
    '1.3.132.0.29': 'Secp128r2',
    '1.3.132.0.30': 'Secp160r2',
    '1.3.132.0.31': 'Secp192k1',
    '1.3.132.0.32': 'Secp224k1',
    '1.3.132.0.33': 'Secp224r1',
    '1.3.132.0.34': 'Secp384r1',
    '1.3.132.0.35': 'Secp521r1',
    '1.3.132.0.36': 'Sect409k1',
    '1.3.132.0.37': 'Sect409r1',
    '1.3.132.0.38': 'Sect571k1',
    '1.3.132.0.39': 'Sect571r1',
    '1.3.133.16.840.9.84': 'x984',
    '1.3.133.16.840.9.84.0': 'x984 Module',
    '1.3.133.16.840.9.84.0.1': 'x984 Biometrics',
    '1.3.133.16.840.9.84.0.2': 'x984 CMS',
    '1.3.133.16.840.9.84.0.3': 'x984 Identifiers',
    '1.3.133.16.840.9.84.1': 'x984 Biometric',
    '1.3.133.16.840.9.84.1.0': 'Biometric Unknown Type',
    '1.3.133.16.840.9.84.1.1': 'Biometric Body Odor',
    '1.3.133.16.840.9.84.1.2': 'Biometric DNA',
    '1.3.133.16.840.9.84.1.3': 'Biometric Ear Shape',
    '1.3.133.16.840.9.84.1.4': 'Biometric Facial Features',
    '1.3.133.16.840.9.84.1.5': 'Biometric Finger Image',
    '1.3.133.16.840.9.84.1.6': 'Biometric Finger Geometry',
    '1.3.133.16.840.9.84.1.7': 'Biometric Hand Geometry',
    '1.3.133.16.840.9.84.1.8': 'Biometric Iris Features',
    '1.3.133.16.840.9.84.1.9': 'Biometric Keystroke Dynamics',
    '1.3.133.16.840.9.84.1.10': 'Biometric Palm',
    '1.3.133.16.840.9.84.1.11': 'Biometric Retina',
    '1.3.133.16.840.9.84.1.12': 'Biometric Signature',
    '1.3.133.16.840.9.84.1.13': 'Biometric Speech Pattern',
    '1.3.133.16.840.9.84.1.14': 'Biometric Thermal Image',
    '1.3.133.16.840.9.84.1.15': 'Biometric Vein Pattern',
    '1.3.133.16.840.9.84.1.16': 'Biometric Thermal Face Image',
    '1.3.133.16.840.9.84.1.17': 'Biometric Thermal Hand Image',
    '1.3.133.16.840.9.84.1.18': 'Biometric Lip Movement',
    '1.3.133.16.840.9.84.1.19': 'Biometric Gait',
    '1.3.133.16.840.9.84.3': 'x984 Matching Method',
    '1.3.133.16.840.9.84.4': 'x984 Format Owner',
    '1.3.133.16.840.9.84.4.0': 'x984 Cbeff Owner',
    '1.3.133.16.840.9.84.4.1': 'x984 Ibia Owner',
    '1.3.133.16.840.9.84.4.1.1': 'Ibia Owner SAFLINK',
    '1.3.133.16.840.9.84.4.1.2': 'Ibia Owner Bioscrypt',
    '1.3.133.16.840.9.84.4.1.3': 'Ibia Owner Visionics',
    '1.3.133.16.840.9.84.4.1.4': 'Ibia Owner Infineon Technologies AG',
    '1.3.133.16.840.9.84.4.1.5': 'Ibia Owner Iridian Technologies',
    '1.3.133.16.840.9.84.4.1.6': 'Ibia Owner Veridicom',
    '1.3.133.16.840.9.84.4.1.7': 'Ibia Owner Cyber SIGN',
    '1.3.133.16.840.9.84.4.1.8': 'Ibia Ownere Cryp',
    '1.3.133.16.840.9.84.4.1.9': 'Ibia Owner Fingerprint Cards AB',
    '1.3.133.16.840.9.84.4.1.10': 'Ibia Owner Secu Gen',
    '1.3.133.16.840.9.84.4.1.11': 'Ibia Owner Precise Biometric',
    '1.3.133.16.840.9.84.4.1.12': 'Ibia Owner Identix',
    '1.3.133.16.840.9.84.4.1.13': 'Ibia Owner DERMALOG',
    '1.3.133.16.840.9.84.4.1.14': 'Ibia Owner LOGICO',
    '1.3.133.16.840.9.84.4.1.15': 'Ibia Owner NIST',
    '1.3.133.16.840.9.84.4.1.16': 'Ibia Owner A3 Vision',
    '1.3.133.16.840.9.84.4.1.17': 'Ibia Owner NEC',
    '1.3.133.16.840.9.84.4.1.18': 'Ibia Owner ST Microelectronics',
    '2.5.4.0': 'Object Class',
    '2.5.4.1': 'Aliased Entry Name',
    '2.5.4.2': 'Knowledge Information',
    '2.5.4.3': 'Common Name',
    '2.5.4.4': 'Surname',
    '2.5.4.5': 'Serial Number',
    '2.5.4.6': 'Country Name',
    '2.5.4.7': 'Locality',
    '2.5.4.7.1': 'Collective Locality Name',
    '2.5.4.8': 'State',
    '2.5.4.8.1': 'Collective State Or Province Name',
    '2.5.4.9': 'Street Address',
    '2.5.4.9.1': 'Collective Street Address',
    '2.5.4.10': 'Organization',
    '2.5.4.10.1': 'Collective Organization Name',
    '2.5.4.11': 'Organization Unit',
    '2.5.4.11.1': 'Collective Organization Unit Name',
    '2.5.4.12': 'Title',
    '2.5.4.13': 'Description',
    '2.5.4.14': 'Search Guide',
    '2.5.4.15': 'Business Category',
    '2.5.4.16': 'Postal Address',
    '2.5.4.16.1': 'Collective Postal Address',
    '2.5.4.17': 'Postal Code',
    '2.5.4.17.1': 'Collective Postal Code',
    '2.5.4.18': 'Post Office Box',
    '2.5.4.18.1': 'Collective Post Office Box',
    '2.5.4.19': 'Physical Delivery Office Name',
    '2.5.4.19.1': 'Collective Physical Delivery Office Name',
    '2.5.4.20': 'Telephone Number',
    '2.5.4.20.1': 'Collective Telephone Number',
    '2.5.4.21': 'Telex Number',
    '2.5.4.21.1': 'Collective Telex Number',
    '2.5.4.22': 'Teletex Terminal Identifier',
    '2.5.4.22.1': 'Collective Teletex Terminal Identifier',
    '2.5.4.23': 'Facsimile Telephone Number',
    '2.5.4.23.1': 'Collective Facsimile Telephone Number',
    '2.5.4.24': 'x121 Address',
    '2.5.4.25': 'International ISDN Number',
    '2.5.4.25.1': 'Collective International ISDN Number',
    '2.5.4.26': 'Registered Address',
    '2.5.4.27': 'Destination Indicator',
    '2.5.4.28': 'Preferred Delivery Mehtod',
    '2.5.4.29': 'Presentation Address',
    '2.5.4.30': 'Supported Application Context',
    '2.5.4.31': 'Member',
    '2.5.4.32': 'Owner',
    '2.5.4.33': 'Role Occupant',
    '2.5.4.34': 'See Also',
    '2.5.4.35': 'User Password',
    '2.5.4.36': 'User Certificate',
    '2.5.4.37': 'Ca Certificate',
    '2.5.4.38': 'Authority Revocation List',
    '2.5.4.39': 'Certificate Revocation List',
    '2.5.4.40': 'Cross Certificate Pair',
    '2.5.4.41': 'Name',
    '2.5.4.42': 'Given Name',
    '2.5.4.43': 'Initials',
    '2.5.4.44': 'Generation Qualifier',
    '2.5.4.45': 'Unique Identifier',
    '2.5.4.46': 'Dn Qualifier',
    '2.5.4.47': 'Enhanced Search Guide',
    '2.5.4.48': 'Protocol Information',
    '2.5.4.49': 'Distinguished Name',
    '2.5.4.50': 'Unique Member',
    '2.5.4.51': 'House Identifier',
    '2.5.4.52': 'Supported Algorithms',
    '2.5.4.53': 'Delta Revocation List',
    '2.5.4.54': 'DMD Name',
    '2.5.4.55': 'Clearance',
    '2.5.4.56': 'Default Dir Qop',
    '2.5.4.57': 'Attribute Integrity Info',
    '2.5.4.58': 'Attribute Certificate',
    '2.5.4.59': 'Attribute Certificate Revocation List',
    '2.5.4.60': 'Conf Key Info',
    '2.5.4.61': 'AA Certificate',
    '2.5.4.62': 'Attribute Descriptor Certificate',
    '2.5.4.63': 'Attribute Authority Revocation List',
    '2.5.4.64': 'Family Information',
    '2.5.4.65': 'Pseudonym',
    '2.5.4.66': 'Communications Service',
    '2.5.4.67': 'Communications Network',
    '2.5.4.68': 'Certification Practice Stmt',
    '2.5.4.69': 'Certificate Policy',
    '2.5.4.70': 'Pki Path',
    '2.5.4.71': 'Priv Policy',
    '2.5.4.72': 'Role',
    '2.5.4.73': 'Delegation Path',
    '2.5.4.74': 'Prot Priv Policy',
    '2.5.4.75': 'XML Privilege Info',
    '2.5.4.76': 'XML Priv Policy',
    '2.5.4.82': 'Permission',
    '2.5.6.0': 'Top',
    '2.5.6.1': 'Alias',
    '2.5.6.2': 'Country',
    '2.5.6.3': 'Locality',
    '2.5.6.4': 'Organization',
    '2.5.6.5': 'Organization Unit',
    '2.5.6.6': 'Person',
    '2.5.6.7': 'Organization Person',
    '2.5.6.8': 'Organization Role',
    '2.5.6.9': 'Group Of Names',
    '2.5.6.10': 'Residential Person',
    '2.5.6.11': 'Application Process',
    '2.5.6.12': 'Application Entity',
    '2.5.6.13': 'DSA',
    '2.5.6.14': 'Device',
    '2.5.6.15': 'Strong Authentication User',
    '2.5.6.16': 'Certificate Authority',
    '2.5.6.17': 'Group Of Unique Names',
    '2.5.6.21': 'Pki User',
    '2.5.6.22': 'Pki CA',
    '2.5.8.1.1': 'RSA',
    '2.5.29.1': 'Authority Key Identifier',
    '2.5.29.2': 'Key Attributes',
    '2.5.29.3': 'Certificate Policies',
    '2.5.29.4': 'Key Usage Restriction',
    '2.5.29.5': 'Policy Mapping',
    '2.5.29.6': 'Subtrees Constraint',
    '2.5.29.7': 'Subject Alt Name',
    '2.5.29.8': 'Issuer Alt Name',
    '2.5.29.9': 'Subject Directory Attributes',
    '2.5.29.10': 'Basic Constraints',
    '2.5.29.11': 'Name Constraints',
    '2.5.29.12': 'Policy Constraints',
    '2.5.29.13': 'Basic Constraints',
    '2.5.29.14': 'Subject Key Identifier',
    '2.5.29.15': 'Key Usage',
    '2.5.29.16': 'Private Key Usage Period',
    '2.5.29.17': 'Subject Alternative Name',
    '2.5.29.18': 'Issuer Alternative Name',
    '2.5.29.19': 'Basic Constraints',
    '2.5.29.20': 'CRL Number',
    '2.5.29.21': 'CRL Reason',
    '2.5.29.22': 'Expiration Date',
    '2.5.29.23': 'Instruction Code',
    '2.5.29.24': 'Invalidity Date',
    '2.5.29.25': 'CRL Distribution Points',
    '2.5.29.26': 'Issuing Distribution Point',
    '2.5.29.27': 'Delta CRL Indicator',
    '2.5.29.28': 'Issuing Distribution Point',
    '2.5.29.29': 'Certificate Issuer',
    '2.5.29.30': 'Name Constraints',
    '2.5.29.31': 'CRL Distribution Points',
    '2.5.29.32': 'Certificate Policies',
    '2.5.29.32.0': 'Any Policy',
    '2.5.29.33': 'Policy Mappings',
    '2.5.29.34': 'Policy Constraints',
    '2.5.29.35': 'Authority Key Identifier',
    '2.5.29.36': 'Policy Constraints',
    '2.5.29.37': 'Extended Key Usage',
    '2.5.29.37.0': 'Any Extended Key Usage',
    '2.5.29.38': 'Authority Attribute Identifier',
    '2.5.29.39': 'Role Spec Cert Identifier',
    '2.5.29.40': 'CRL Stream Identifier',
    '2.5.29.41': 'Basic Att Constraints',
    '2.5.29.42': 'Delegated Name Constraints',
    '2.5.29.43': 'Time Specification',
    '2.5.29.44': 'CRL Scope',
    '2.5.29.45': 'Status Referrals',
    '2.5.29.46': 'Freshest CRL',
    '2.5.29.47': 'Ordered List',
    '2.5.29.48': 'Attribute Descriptor',
    '2.5.29.49': 'User Notice',
    '2.5.29.50': 'SOA Identifier',
    '2.5.29.51': 'Base Update Time',
    '2.5.29.52': 'Acceptable Cert Policies',
    '2.5.29.53': 'Delta Info',
    '2.5.29.54': 'Inhibit Any Policy',
    '2.5.29.55': 'Target Information',
    '2.5.29.56': 'No Rev Avail',
    '2.5.29.57': 'Acceptable Privilege Policies',
    '2.5.29.58': 'To Be Revoked',
    '2.5.29.59': 'Revoked Groups',
    '2.5.29.60': 'Expired Certs On CRL',
    '2.5.29.61': 'Indirect Issuer',
    '2.5.29.62': 'No Assertion',
    '2.5.29.63': 'A Aissuing Distribution Point',
    '2.5.29.64': 'Issued On Behalf Of',
    '2.5.29.65': 'Single Use',
    '2.5.29.66': 'Group AC',
    '2.5.29.67': 'Allowed Att Ass',
    '2.5.29.68': 'Attribute Mappings',
    '2.5.29.69': 'Holder Name Constraints',
    '2.16.528.1.1001.1.1.1.12.6.1.1.1': 'Digi Notar EV policy',
    '2.16.578.1.26.1.3.3': 'Buy Pass EV policy',
    '2.16.724.1.2.2.4.1': 'Personal Data Info',
    '2.16.756.1.89.1.2.1.1': 'Swiss Sign EV policy',
    '2.16.840.1.101.2.1.1.1': 'Sdns Signature Algorithm',
    '2.16.840.1.101.2.1.1.2': 'Fortezza Signature Algorithm',
    '2.16.840.1.101.2.1.1.3': 'Sdns Confidentiality Algorithm',
    '2.16.840.1.101.2.1.1.4': 'Fortezza Confidentiality Algorithm',
    '2.16.840.1.101.2.1.1.5': 'Sdns Integrity Algorithm',
    '2.16.840.1.101.2.1.1.6': 'Fortezza Integrity Algorithm',
    '2.16.840.1.101.2.1.1.7': 'Sdns Token Protection Algorithm',
    '2.16.840.1.101.2.1.1.8': 'Fortezza Token Protection Algorithm',
    '2.16.840.1.101.2.1.1.9': 'Sdns Key Management Algorithm',
    '2.16.840.1.101.2.1.1.10': 'Fortezza Key Management Algorithm',
    '2.16.840.1.101.2.1.1.11': 'Sdns K Mand Sig Algorithm',
    '2.16.840.1.101.2.1.1.12': 'Fortezza K Mand Sig Algorithm',
    '2.16.840.1.101.2.1.1.13': 'Suite A Signature Algorithm',
    '2.16.840.1.101.2.1.1.14': 'Suite A Confidentiality Algorithm',
    '2.16.840.1.101.2.1.1.15': 'Suite A Integrity Algorithm',
    '2.16.840.1.101.2.1.1.16': 'Suite A Token Protection Algorithm',
    '2.16.840.1.101.2.1.1.17': 'Suite A Key Management Algorithm',
    '2.16.840.1.101.2.1.1.18': 'Suite AK Mand Sig Algorithm',
    '2.16.840.1.101.2.1.1.19': 'Fortezza Updated Sig Algorithm',
    '2.16.840.1.101.2.1.1.20': 'Fortezza K Mand Upd Sig Algorithms',
    '2.16.840.1.101.2.1.1.21': 'Fortezza Updated Integ Algorithm',
    '2.16.840.1.101.2.1.1.22': 'Key Exchange Algorithm',
    '2.16.840.1.101.2.1.1.23': 'Fortezza Wrap80 Algorithm',
    '2.16.840.1.101.2.1.1.24': 'KEA Key Encryption Algorithm',
    '2.16.840.1.101.2.1.2.1': 'Rfc822 Message Format',
    '2.16.840.1.101.2.1.2.2': 'Empty Content',
    '2.16.840.1.101.2.1.2.3': 'Csp Content Type',
    '2.16.840.1.101.2.1.2.42': 'MSP Rev3 Content Type',
    '2.16.840.1.101.2.1.2.48': 'MSP Content Type',
    '2.16.840.1.101.2.1.2.49': 'MSP Rekey Agent Protocol',
    '2.16.840.1.101.2.1.2.50': 'MSP MMP',
    '2.16.840.1.101.2.1.2.66': 'MSP Rev3-1 Content Type',
    '2.16.840.1.101.2.1.2.72': 'Forwarded MSP Message Body Part',
    '2.16.840.1.101.2.1.2.73': 'MSP Forwarded Message Parameters',
    '2.16.840.1.101.2.1.2.74': 'Forwarded CSP Msg Body Part',
    '2.16.840.1.101.2.1.2.75': 'CSP Forwarded Message Parameters',
    '2.16.840.1.101.2.1.2.76': 'MSP MMP2',
    '2.16.840.1.101.2.1.3.1': 'SDNS Security Policy',
    '2.16.840.1.101.2.1.3.2': 'SDNS PRBAC',
    '2.16.840.1.101.2.1.3.3': 'Mosaic PRBAC',
    '2.16.840.1.101.2.1.3.10': 'SI Security Policy',
    '2.16.840.1.101.2.1.3.10.0': 'SI NASP',
    '2.16.840.1.101.2.1.3.10.1': 'SI ELCO',
    '2.16.840.1.101.2.1.3.10.2': 'SI TK',
    '2.16.840.1.101.2.1.3.10.3': 'SI DSAP',
    '2.16.840.1.101.2.1.3.10.4': 'SI SSSS',
    '2.16.840.1.101.2.1.3.10.5': 'SI DNASP',
    '2.16.840.1.101.2.1.3.10.6': 'SI BYEMAN',
    '2.16.840.1.101.2.1.3.10.7': 'SI REL-US',
    '2.16.840.1.101.2.1.3.10.8': 'SI REL-AUS',
    '2.16.840.1.101.2.1.3.10.9': 'SI REL-CAN',
    '2.16.840.1.101.2.1.3.10.10': 'SI REL_UK',
    '2.16.840.1.101.2.1.3.10.11': 'SI REL-NZ',
    '2.16.840.1.101.2.1.3.10.12': 'SI Generic',
    '2.16.840.1.101.2.1.3.11': 'Genser',
    '2.16.840.1.101.2.1.3.11.0': 'Genser Nations',
    '2.16.840.1.101.2.1.3.11.1': 'Genser Comsec',
    '2.16.840.1.101.2.1.3.11.2': 'Genser Acquisition',
    '2.16.840.1.101.2.1.3.11.3': 'Genser Security Categories',
    '2.16.840.1.101.2.1.3.11.3.0': 'Genser Tag Set Name',
    '2.16.840.1.101.2.1.3.12': 'Default Security Policy',
    '2.16.840.1.101.2.1.3.13': 'Capco Markings',
    '2.16.840.1.101.2.1.3.13.0': 'Capco Security Categories',
    '2.16.840.1.101.2.1.3.13.0.1': 'Capco Tag Set Name1',
    '2.16.840.1.101.2.1.3.13.0.2': 'Capco Tag Set Name2',
    '2.16.840.1.101.2.1.3.13.0.3': 'Capco Tag Set Name3',
    '2.16.840.1.101.2.1.3.13.0.4': 'Capco Tag Set Name4',
    '2.16.840.1.101.2.1.5.1': 'SDNS Key Management Certificate',
    '2.16.840.1.101.2.1.5.2': 'SDNS User Signature Certificate',
    '2.16.840.1.101.2.1.5.3': 'SDNS K Mand Sig Certificate',
    '2.16.840.1.101.2.1.5.4': 'Fortezza Key Management Certificate',
    '2.16.840.1.101.2.1.5.5': 'Fortezza K Mand Sig Certificate',
    '2.16.840.1.101.2.1.5.6': 'Fortezza User Signature Certificate',
    '2.16.840.1.101.2.1.5.7': 'Fortezza CA Signature Certificate',
    '2.16.840.1.101.2.1.5.8': 'SDNS CA Signature Certificate',
    '2.16.840.1.101.2.1.5.10': 'Auxiliary Vector',
    '2.16.840.1.101.2.1.5.11': 'Ml Receipt Policy',
    '2.16.840.1.101.2.1.5.12': 'Ml Membership',
    '2.16.840.1.101.2.1.5.13': 'Ml Administrators',
    '2.16.840.1.101.2.1.5.14': 'Alid',
    '2.16.840.1.101.2.1.5.20': 'Jan UKMs',
    '2.16.840.1.101.2.1.5.21': 'Feb UKMs',
    '2.16.840.1.101.2.1.5.22': 'Mar UKMs',
    '2.16.840.1.101.2.1.5.23': 'Apr UKMs',
    '2.16.840.1.101.2.1.5.24': 'May UKMs',
    '2.16.840.1.101.2.1.5.25': 'Jun UKMs',
    '2.16.840.1.101.2.1.5.26': 'Jul UKMs',
    '2.16.840.1.101.2.1.5.27': 'Aug UKMs',
    '2.16.840.1.101.2.1.5.28': 'Sep UKMs',
    '2.16.840.1.101.2.1.5.29': 'Oct UKMs',
    '2.16.840.1.101.2.1.5.30': 'Nov UKMs',
    '2.16.840.1.101.2.1.5.31': 'Dec UKMs',
    '2.16.840.1.101.2.1.5.40': 'Meta SDN Sckl',
    '2.16.840.1.101.2.1.5.41': 'Sdns CKL',
    '2.16.840.1.101.2.1.5.42': 'Meta SDN Ssignature CKL',
    '2.16.840.1.101.2.1.5.43': 'Sdns Signature CKL',
    '2.16.840.1.101.2.1.5.44': 'Sdns Certificate Revocation List',
    '2.16.840.1.101.2.1.5.45': 'Fortezza Certificate Revocation List',
    '2.16.840.1.101.2.1.5.46': 'Fortezza CKL',
    '2.16.840.1.101.2.1.5.47': 'Al Exempted Address Processor',
    '2.16.840.1.101.2.1.5.48': 'Guard',
    '2.16.840.1.101.2.1.5.49': 'Algorithms Supported',
    '2.16.840.1.101.2.1.5.50': 'Suite A Key Management Certificate',
    '2.16.840.1.101.2.1.5.51': 'Suite AK Mand Sig Certificate',
    '2.16.840.1.101.2.1.5.52': 'Suite A User Signature Certificate',
    '2.16.840.1.101.2.1.5.53': 'Prbac Info',
    '2.16.840.1.101.2.1.5.54': 'Prbac CA Constraints',
    '2.16.840.1.101.2.1.5.55': 'Sig Or KM Privileges',
    '2.16.840.1.101.2.1.5.56': 'Comm Privileges',
    '2.16.840.1.101.2.1.5.57': 'Labeled Attribute',
    '2.16.840.1.101.2.1.5.58': 'Policy Information File',
    '2.16.840.1.101.2.1.5.59': 'Sec Policy Information File',
    '2.16.840.1.101.2.1.5.60': 'CA Clearance Constraint',
    '2.16.840.1.101.2.1.7.1': 'CSP Extns',
    '2.16.840.1.101.2.1.7.1.0': 'CSP Cs Extn',
    '2.16.840.1.101.2.1.8.1': 'MISSI Security Categories',
    '2.16.840.1.101.2.1.8.2': 'Standard Security Label Privileges',
    '2.16.840.1.101.2.1.10.1': 'SIG Privileges',
    '2.16.840.1.101.2.1.10.2': 'KM Privileges',
    '2.16.840.1.101.2.1.10.3': 'Named Tag Set Privilege',
    '2.16.840.1.101.2.1.11.1': 'UK Demo',
    '2.16.840.1.101.2.1.11.2': 'US DOD Class2',
    '2.16.840.1.101.2.1.11.3': 'US Medium Pilot',
    '2.16.840.1.101.2.1.11.4': 'US DOD Class4',
    '2.16.840.1.101.2.1.11.5': 'US DOD Class3',
    '2.16.840.1.101.2.1.11.6': 'US DOD Class5',
    '2.16.840.1.101.2.1.12.0': 'Test Security Policy',
    '2.16.840.1.101.2.1.12.0.1': 'TSP1',
    '2.16.840.1.101.2.1.12.0.1.0': 'TSP1 Security Categories',
    '2.16.840.1.101.2.1.12.0.1.0.0': 'TSP1 Tag Set Zero',
    '2.16.840.1.101.2.1.12.0.1.0.1': 'TSP1 Tag Set One',
    '2.16.840.1.101.2.1.12.0.1.0.2': 'TSP1 Tag Set Two',
    '2.16.840.1.101.2.1.12.0.2': 'TSP2',
    '2.16.840.1.101.2.1.12.0.2.0': 'TSP2 Security Categories',
    '2.16.840.1.101.2.1.12.0.2.0.0': 'TSP2 Tag Set Zero',
    '2.16.840.1.101.2.1.12.0.2.0.1': 'TSP2 Tag Set One',
    '2.16.840.1.101.2.1.12.0.2.0.2': 'TSP2 Tag Set Two',
    '2.16.840.1.101.2.1.12.0.3': 'Kafka',
    '2.16.840.1.101.2.1.12.0.3.0': 'Kafka Security Categories',
    '2.16.840.1.101.2.1.12.0.3.0.1': 'Kafka Tag Set Name1',
    '2.16.840.1.101.2.1.12.0.3.0.2': 'Kafka Tag Set Name2',
    '2.16.840.1.101.2.1.12.0.3.0.3': 'Kafka Tag Set Name3',
    '2.16.840.1.101.2.1.12.1.1': 'TCp1',
    '2.16.840.1.101.3.1': 'Slabel',
    '2.16.840.1.101.3.2': 'PKI',
    '2.16.840.1.101.3.2.1': 'NIST policy Identifier',
    '2.16.840.1.101.3.2.1.3.1': 'Fbca Rudimentary Policy',
    '2.16.840.1.101.3.2.1.3.2': 'Fbca Basic Policy',
    '2.16.840.1.101.3.2.1.3.3': 'Fbca Medium Policy',
    '2.16.840.1.101.3.2.1.3.4': 'Fbca High Policy',
    '2.16.840.1.101.3.2.1.48.1': 'Nist Test Policy1',
    '2.16.840.1.101.3.2.1.48.2': 'Nist Test Policy2',
    '2.16.840.1.101.3.2.1.48.3': 'Nist Test Policy3',
    '2.16.840.1.101.3.2.1.48.4': 'Nist Test Policy4',
    '2.16.840.1.101.3.2.1.48.5': 'Nist Test Policy5',
    '2.16.840.1.101.3.2.1.48.6': 'Nist Test Policy6',
    '2.16.840.1.101.3.2.2': 'GAK',
    '2.16.840.1.101.3.2.2.1': 'KRA Key',
    '2.16.840.1.101.3.2.3': 'Extensions',
    '2.16.840.1.101.3.2.3.1': 'KR Technique',
    '2.16.840.1.101.3.2.3.2': 'K Recovery Capable',
    '2.16.840.1.101.3.2.3.3': 'KR',
    '2.16.840.1.101.3.2.4': 'Key Recovery Schemes',
    '2.16.840.1.101.3.2.5': 'Krapola',
    '2.16.840.1.101.3.3': 'ARPA',
    '2.16.840.1.101.3.4': 'Nist Algorithm',
    '2.16.840.1.101.3.4.1': 'AES',
    '2.16.840.1.101.3.4.1.1': 'AES128-ECB',
    '2.16.840.1.101.3.4.1.2': 'AES128-CBC',
    '2.16.840.1.101.3.4.1.3': 'AES128-OFB',
    '2.16.840.1.101.3.4.1.4': 'AES128-CFB',
    '2.16.840.1.101.3.4.1.5': 'AES128-wrap',
    '2.16.840.1.101.3.4.1.6': 'AES128-GCM',
    '2.16.840.1.101.3.4.1.7': 'AES128-CCM',
    '2.16.840.1.101.3.4.1.8': 'AES128-wrap-pad',
    '2.16.840.1.101.3.4.1.21': 'AES192-ECB',
    '2.16.840.1.101.3.4.1.22': 'AES192-CBC',
    '2.16.840.1.101.3.4.1.23': 'AES192-OFB',
    '2.16.840.1.101.3.4.1.24': 'AES192-CFB',
    '2.16.840.1.101.3.4.1.25': 'AES192-wrap',
    '2.16.840.1.101.3.4.1.26': 'AES192-GCM',
    '2.16.840.1.101.3.4.1.27': 'AES192-CCM',
    '2.16.840.1.101.3.4.1.28': 'AES192-wrap-pad',
    '2.16.840.1.101.3.4.1.41': 'AES256-ECB',
    '2.16.840.1.101.3.4.1.42': 'AES256-CBC',
    '2.16.840.1.101.3.4.1.43': 'AES256-OFB',
    '2.16.840.1.101.3.4.1.44': 'AES256-CFB',
    '2.16.840.1.101.3.4.1.45': 'AES256-wrap',
    '2.16.840.1.101.3.4.1.46': 'AES256-GCM',
    '2.16.840.1.101.3.4.1.47': 'AES256-CCM',
    '2.16.840.1.101.3.4.1.48': 'AES256-wrap-pad',
    '2.16.840.1.101.3.4.2': 'Hash Algos',
    '2.16.840.1.101.3.4.2.1': 'SHA-256',
    '2.16.840.1.101.3.4.2.2': 'SHA-384',
    '2.16.840.1.101.3.4.2.3': 'SHA-512',
    '2.16.840.1.101.3.4.2.4': 'SHA-224',
    '2.16.840.1.101.3.4.3.1': 'DSA With Sha224',
    '2.16.840.1.101.3.4.3.2': 'DSA With Sha256',
    '2.16.840.1.113719.1.2.8': 'Novell Algorithm',
    '2.16.840.1.113719.1.2.8.22': 'DES Cbc IV8',
    '2.16.840.1.113719.1.2.8.23': 'DES Cbc Pad IV8',
    '2.16.840.1.113719.1.2.8.24': 'DES EDE2 Cbc IV8',
    '2.16.840.1.113719.1.2.8.25': 'DES EDE2 Cbc Pad IV8',
    '2.16.840.1.113719.1.2.8.26': 'DES EDE3 Cbc IV8',
    '2.16.840.1.113719.1.2.8.27': 'DES EDE3 Cbc Pad IV8',
    '2.16.840.1.113719.1.2.8.28': 'Rc5 Cbc Pad',
    '2.16.840.1.113719.1.2.8.29': 'MD2 With RSA Encryption B Safe1',
    '2.16.840.1.113719.1.2.8.30': 'MD5 With RSA Encryption B Safe1',
    '2.16.840.1.113719.1.2.8.31': 'SHA1 With RSA Encryption B Safe1',
    '2.16.840.1.113719.1.2.8.32': 'Lm Digest',
    '2.16.840.1.113719.1.2.8.40': 'MD2',
    '2.16.840.1.113719.1.2.8.50': 'MD5',
    '2.16.840.1.113719.1.2.8.51': 'Ike Hmac With SHA1-RSA',
    '2.16.840.1.113719.1.2.8.52': 'Ike Hmac With MD5-RSA',
    '2.16.840.1.113719.1.2.8.69': 'RC2 Cbc Pad',
    '2.16.840.1.113719.1.2.8.82': 'SHA-1',
    '2.16.840.1.113719.1.2.8.92': 'RC2 B Safe1 Cbc',
    '2.16.840.1.113719.1.2.8.95': 'MD4',
    '2.16.840.1.113719.1.2.8.130': 'MD4 Packet',
    '2.16.840.1.113719.1.2.8.131': 'RSA Encryption Bsafe1',
    '2.16.840.1.113719.1.2.8.132': 'Nw Password',
    '2.16.840.1.113719.1.2.8.133': 'Novell Obfuscate-1',
    '2.16.840.1.113719.1.9': 'PKI',
    '2.16.840.1.113719.1.9.4': 'PKI Attribute Type',
    '2.16.840.1.113719.1.9.4.1': 'Security Attributes',
    '2.16.840.1.113719.1.9.4.2': 'Reliance Limit',
    '2.16.840.1.113730.1': 'Certificate Extension',
    '2.16.840.1.113730.1.1': 'Netscape Certificate Type',
    '2.16.840.1.113730.1.2': 'Netscape Base Url',
    '2.16.840.1.113730.1.3': 'Netscape Revocation Url',
    '2.16.840.1.113730.1.4': 'Netscape CA Revocation',
    '2.16.840.1.113730.1.7': 'Netscape Certificate Renewal',
    '2.16.840.1.113730.1.8': 'Netscape CA Policy',
    '2.16.840.1.113730.1.9': 'Home Page Url',
    '2.16.840.1.113730.1.10': 'Entity Logo',
    '2.16.840.1.113730.1.11': 'User Picture',
    '2.16.840.1.113730.1.12': 'Netscape Ssl Server',
    '2.16.840.1.113730.1.13': 'Netscape Comment',
    '2.16.840.1.113730.2': 'Data-type',
    '2.16.840.1.113730.2.1': 'Data GIF',
    '2.16.840.1.113730.2.2': 'Data JPEG',
    '2.16.840.1.113730.2.3': 'Data URL',
    '2.16.840.1.113730.2.4': 'Data HTML',
    '2.16.840.1.113730.2.5': 'Cert Sequence',
    '2.16.840.1.113730.2.6': 'Cert URL',
    '2.16.840.1.113730.3': 'Directory',
    '2.16.840.1.113730.3.1': 'Ldap Definitions',
    '2.16.840.1.113730.3.1.1': 'Car License',
    '2.16.840.1.113730.3.1.2': 'Department Number',
    '2.16.840.1.113730.3.1.3': 'Employee Number',
    '2.16.840.1.113730.3.1.4': 'Employee Type',
    '2.16.840.1.113730.3.2.2': 'Inet Org Person',
    '2.16.840.1.113730.4.1': 'Server Gated Crypto',
    '2.16.840.1.113733.1': 'PKI',
    '2.16.840.1.113733.1.6.3': 'Verisign CZAG',
    '2.16.840.1.113733.1.6.6': 'Verisign In Box',
    '2.16.840.1.113733.1.6.11': 'Verisign Onsite Jurisdiction Hash',
    '2.16.840.1.113733.1.6.13': 'Unknown  Verisign  VPN extension',
    '2.16.840.1.113733.1.6.15': 'Verisign Server ID',
    '2.16.840.1.113733.1.7.1.1': 'Verisign Cert Policies95 Qualifier1',
    '2.16.840.1.113733.1.7.1.1.1': 'Verisign CP Sv1notice',
    '2.16.840.1.113733.1.7.1.1.2': 'Verisign CP Sv1nsi',
    '2.16.840.1.113733.1.7.23.6': 'Veri Sign EV policy',
    '2.16.840.1.113733.1.7.48.1': 'Thawte EV policy',
    '2.16.840.1.113733.1.8.1': 'erisign ISS Strong Crypto',
    '2.16.840.1.113733.1.9': 'PKCS7 Attribute',
    '2.16.840.1.113733.1.9.2': 'Message Type',
    '2.16.840.1.113733.1.9.3': 'PKI Status',
    '2.16.840.1.113733.1.9.4': 'Fail Info',
    '2.16.840.1.113733.1.9.5': 'Sender Nonce',
    '2.16.840.1.113733.1.9.6': 'Recipient Nonce',
    '2.16.840.1.113733.1.9.7': 'Trans ID',
    '2.16.840.1.113733.1.9.8': 'Extension Req',
    '2.16.840.1.113741.2': 'Intel CDSA',
    '2.16.840.1.114028.10.1.2': 'Entrust EV policy',
    '2.16.840.1.114171.500.9': 'Wells Fargo EV policy',
    '2.16.840.1.114404.1.1.2.4.1': 'Trust Wave EV policy',
    '2.16.840.1.114412.1': 'Digi Cert Non EV Certs',
    '2.16.840.1.114412.1.1': 'Digi Cert OV Cert',
    '2.16.840.1.114412.1.2': 'Digi Cert DV Cert',
    '2.16.840.1.114412.1.3.0.1': 'Digi Cert Global CA Policy',
    '2.16.840.1.114412.1.3.0.2': 'Digi Cert High Assurance EVCA Policy',
    '2.16.840.1.114412.1.3.0.3': 'Digi Cert Global Root CA Policy',
    '2.16.840.1.114412.1.3.0.4': 'Digi Cert Assured ID Root CA Policy',
    '2.16.840.1.114412.1.11': 'Digi Cert Federated Device Cert',
    '2.16.840.1.114412.2.1': 'Digi Cert EV policy',
    '2.16.840.1.114412.2.2': 'Digi Cert EV Cert',
    '2.23.140.1.1': 'EV guidelines certificate policy',
    '2.16.840.1.114412.2.3': 'Digi Cert Object Signing Cert',
    '2.16.840.1.114412.2.3.1': 'Digi Cert Code Signing Cert',
    '2.16.840.1.114412.2.3.2': 'Digi Cert EV Code Signing Cert',
    '2.16.840.1.114412.2.3.11': 'Digi Cert Kernel Code Signing Cert',
    '2.16.840.1.114412.2.3.21': 'Digi Cert Document Signing Cert',
    '2.16.840.1.114412.2.4': 'Digi Cert Client Cert',
    '2.16.840.1.114412.2.4.1.1': 'Digi Cert Level1 Personal Client Cert',
    '2.16.840.1.114412.2.4.1.2': 'Digi Cert Level1 Enterprise Client Cert',
    '2.16.840.1.114412.2.4.2': 'Digi Cert Level2 Client Cert',
    '2.16.840.1.114412.2.4.3.1': 'Digi Cert Level3 US Client Cert',
    '2.16.840.1.114412.2.4.3.2': 'Digi Cert Level3 CBP Client Cert',
    '2.16.840.1.114412.2.4.4.1': 'Digi Cert Level4 US Client Cert',
    '2.16.840.1.114412.2.4.4.2': 'Digi Cert Level4 CBP Client Cert',
    '2.16.840.1.114412.2.4.5.1': 'Digi Cert PIV Hardware Cert',
    '2.16.840.1.114412.2.4.5.2': 'Digi Cert PIV Card Auth Cert',
    '2.16.840.1.114412.2.4.5.3': 'Digi Cert PIV Content Signing Cert',
    '2.16.840.1.114412.4.31': 'Digi Cert Grid Classic Cert',
    '2.16.840.1.114412.4.31.5': 'Digi Cert Grid Integrated Cert',
    '2.16.840.1.114412.31.4.31.1': 'Digi Cert Grid Host Cert',
    '2.16.840.1.114413.1.7.23.3': 'Go Daddy EV policy',
    '2.16.840.1.114414.1.7.23.3': 'Starfield EV policy',
    '2.23.42.0': 'Content Type',
    '2.23.42.0.0': 'Pan Data',
    '2.23.42.0.1': 'Pan Token',
    '2.23.42.0.2': 'Pan Only',
    '2.23.42.1': 'Msg Ext',
    '2.23.42.2': 'Field',
    '2.23.42.2.0': 'Full Name',
    '2.23.42.2.1': 'Given Name',
    '2.23.42.2.2': 'Family Name',
    '2.23.42.2.3': 'Birth Family Name',
    '2.23.42.2.4': 'Place Name',
    '2.23.42.2.5': 'Identification Number',
    '2.23.42.2.6': 'Month',
    '2.23.42.2.7': 'Date',
    '2.23.42.2.8': 'Address',
    '2.23.42.2.9': 'Telephone',
    '2.23.42.2.10': 'Amount',
    '2.23.42.2.11': 'Account Number',
    '2.23.42.2.12': 'Pass Phrase',
    '2.23.42.3': 'Attribute',
    '2.23.42.3.0': 'Cert',
    '2.23.42.3.0.0': 'Root Key Thumb',
    '2.23.42.3.0.1': 'Additional Policy',
    '2.23.42.4': 'Algorithm',
    '2.23.42.5': 'Policy',
    '2.23.42.5.0': 'Root',
    '2.23.42.6': 'Module',
    '2.23.42.7': 'Cert Ext',
    '2.23.42.7.0': 'Hashed Root Key',
    '2.23.42.7.1': 'Certificate Type',
    '2.23.42.7.2': 'Merchant Data',
    '2.23.42.7.3': 'Card Cert Required',
    '2.23.42.7.4': 'Tunneling',
    '2.23.42.7.5': 'Set Extensions',
    '2.23.42.7.6': 'Set Qualifier',
    '2.23.42.8': 'Brand',
    '2.23.42.8.1': 'IATA-ATA',
    '2.23.42.8.4': ' ISA',
    '2.23.42.8.5': 'Master Card',
    '2.23.42.8.30': 'Diners',
    '2.23.42.8.34': 'American Express',
    '2.23.42.8.6011': 'Novus',
    '2.23.42.9': 'Vendor',
    '2.23.42.9.0': 'Globe Set',
    '2.23.42.9.1': 'IBM',
    '2.23.42.9.2': 'Cyber Cash',
    '2.23.42.9.3': 'Terisa',
    '2.23.42.9.4': 'RSADSI',
    '2.23.42.9.5': 'Veri Fone',
    '2.23.42.9.6': 'Trin Tech',
    '2.23.42.9.7': 'Bank Gate',
    '2.23.42.9.8': 'GTE',
    '2.23.42.9.9': 'Compu Source',
    '2.23.42.9.10': 'Griffin',
    '2.23.42.9.11': 'Certicom',
    '2.23.42.9.12': 'OSS',
    '2.23.42.9.13': 'Tenth Mountain',
    '2.23.42.9.14': 'Antares',
    '2.23.42.9.15': 'ECC',
    '2.23.42.9.16': 'Maithean',
    '2.23.42.9.17': 'Netscape',
    '2.23.42.9.18': 'erisign',
    '2.23.42.9.19': 'Blue Money',
    '2.23.42.9.20': 'Lacerte',
    '2.23.42.9.21': 'Fujitsu',
    '2.23.42.9.22': 'E Lab',
    '2.23.42.9.23': 'Entrust',
    '2.23.42.9.24': 'VI Anet',
    '2.23.42.9.25': 'III',
    '2.23.42.9.26': 'Open Market',
    '2.23.42.9.27': 'Lexem',
    '2.23.42.9.28': 'Intertrader',
    '2.23.42.9.29': 'Persimmon',
    '2.23.42.9.30': 'NABLE',
    '2.23.42.9.31': 'Espace-net',
    '2.23.42.9.32': 'Hitachi',
    '2.23.42.9.33': 'Microsoft',
    '2.23.42.9.34': 'NEC',
    '2.23.42.9.35': 'Mitsubishi',
    '2.23.42.9.36': 'NCR',
    '2.23.42.9.37': 'E-COMM',
    '2.23.42.9.38': 'Gemplus',
    '2.23.42.10': 'National',
    '2.23.42.10.392': 'Japan',
    '2.23.43.1.4': 'WTLS-ECC',
    '2.23.43.1.4.1': 'WTLS-ECC-curve1',
    '2.23.43.1.4.6': 'WTLS-ECC-curve6',
    '2.23.43.1.4.8': 'WTLS-ECC-curve8',
    '2.23.43.1.4.9': 'WTLS-ECC-curve9',
    '2.23.133': 'TCPA',
    '2.23.133.1': 'TCPA Spec Version',
    '2.23.133.2': 'TCPA Attribute',
    '2.23.133.2.1': 'TCPA Tpm Manufacturer',
    '2.23.133.2.2': 'TCPA Tpm Model',
    '2.23.133.2.3': 'TCPA Tpm Version',
    '2.23.133.2.4': 'TCPA Platform Manufacturer',
    '2.23.133.2.5': 'TCPA Platform Model',
    '2.23.133.2.6': 'TCPA Platform Version',
    '2.23.133.2.7': 'TCPA Component Manufacturer',
    '2.23.133.2.8': 'TCPA Component Model',
    '2.23.133.2.9': 'TCPA Component Version',
    '2.23.133.2.10': 'TCPA Security Qualities',
    '2.23.133.2.11': 'TCPA Tpm Protection Profile',
    '2.23.133.2.12': 'TCPA Tpm Security Target',
    '2.23.133.2.13': 'TCPA Foundation Protection Profile',
    '2.23.133.2.14': 'TCPA Foundation Security Target',
    '2.23.133.2.15': 'TCPA Tpm Id Label',
    '2.23.133.3': 'TCPA Protocol',
    '2.23.133.3.1': 'TCPA Prtt Tpm Id Protocol',
    '2.23.134.1.2.1.8.210': 'Post Signum Commercial Server Policy',
    '2.23.134.1.2.2.3': 'Post Signum Public CA',
    '2.23.134.1.4.2.1': 'Post Signum Root QCA',
    '2.23.136.1.1.1': 'MRTD Signature Data',
    '2.54.1775.2': 'Hashed Root Key',
    '2.54.1775.3': 'Certificate Type',
    '2.54.1775.4': 'Merchant Data',
    '2.54.1775.5': 'Card Cert Required',
    '2.54.1775.6': 'Tunneling',
    '2.54.1775.7': 'Set Qualifier',
    '2.54.1775.99': 'Set Data',
    '1.3.6.1.4.1.11129.2.4.3': 'CT Pre-Certificate Poison',
    '2.23.140.1.2.2': 'CA/B Forum Organization Validated',
    '2.23.140.1.2.1': 'CA/B Forum Domain Validated',
    '1.3.6.1.4.1.44947.1.1.1': 'Let\'s Encrypt',
    '1.3.6.1.4.1.4329.7.2.4': 'SslTlsCerts',
    '1.3.6.1.4.1.4329.7': 'Siemens Public Key Infrastructure',
};

const SANs = {
    0: 'Other Name',
    1: 'Email Address',
    2: 'DNS Name',
    3: 'X400 Address',
    4: 'Directory Name',
    5: 'Edi Party Name',
    6: 'Uniform Resource Identifier',
    7: 'IP Address',
    8: 'Registered ID',
};

var EnumOIDs;
(function (EnumOIDs) {
    EnumOIDs["BasicConstraints"] = "2.5.29.19";
    EnumOIDs["KeyUsage"] = "2.5.29.15";
    EnumOIDs["ExtendedKeyUsage"] = "2.5.29.37";
    EnumOIDs["CertificatePolicies"] = "2.5.29.32";
    EnumOIDs["AuthorityKeyIdentifier"] = "2.5.29.35";
    EnumOIDs["CertificateAuthorityInformationAccess"] = "1.3.6.1.5.5.7.1.1";
    EnumOIDs["CRLDistributionPoints"] = "2.5.29.31";
    EnumOIDs["SubjectAlternativeName"] = "2.5.29.17";
    EnumOIDs["NetscapeCertificateType"] = "2.16.840.1.113730.1.1";
    EnumOIDs["NameConstraints"] = "2.5.29.30";
    EnumOIDs["CertificateTransparency"] = "1.3.6.1.4.1.11129.2.4.2";
    EnumOIDs["CertificateTemplate"] = "1.3.6.1.4.1.311.21.7";
    EnumOIDs["ANY"] = "";
})(EnumOIDs || (EnumOIDs = {}));
class Certificate$1 extends Basic {
    constructor(value, name, fullDecode = false) {
        super(value, name);
        this.validity = '';
        this.extensions = [];
        this.version = 0;
        this.isRoot = false;
        this.downloadAsPEM = () => {
            downloadFromBuffer(this.pem, 'text/plain', this.commonName, 'crt');
        };
        this.downloadAsDER = () => {
            downloadFromBuffer(this.hex, 'application/octet-stream', this.commonName, 'crt');
        };
        this.decode(fullDecode);
    }
    static base64ToPem(base64) {
        return Certificate$1.pemTagCertificate(base64.replace(/(.{64})/g, '$1\n'));
    }
    static getExtensionNetscapeCertType(extension) {
        const usages = [];
        // parse key usage BitString
        const bitString = fromBER(extension.extnValue.valueBlock.valueHex).result;
        const unusedBits = bitString.valueBlock.unusedBits;
        let byte = new Uint8Array(bitString.valueBlock.valueHex)[0];
        byte >>= unusedBits;
        byte <<= unusedBits;
        /**
         * bit-0 SSL client - this cert is certified for SSL client authentication use
         * bit-1 SSL server - this cert is certified for SSL server authentication use
         * bit-2 S/MIME - this cert is certified for use by clients (New in PR3)
         * bit-3 Object Signing - this cert is certified for signing objects such as Java
         * applets and plugins(New in PR3)
         * bit-4 Reserved - this bit is reserved for future use
         * bit-5 SSL CA - this cert is certified for issuing certs for SSL use
         * bit-6 S/MIME CA - this cert is certified for issuing certs for S/MIME use (New in PR3)
         * bit-7 Object Signing CA - this cert is certified for issuing
         * certs for Object Signing (New in PR3)
         */
        if (byte & 0x80) {
            usages.push('SSL client');
        }
        if (byte & 0x40) {
            usages.push('SSL server');
        }
        if (byte & 0x20) {
            usages.push('S/MIME');
        }
        if (byte & 0x10) {
            usages.push('Object Signing');
        }
        if (byte & 0x08) {
            usages.push('Reserved');
        }
        if (byte & 0x04) {
            usages.push('SSL CA');
        }
        if (byte & 0x02) {
            usages.push('S/MIME CA');
        }
        if (byte & 0x01) {
            usages.push('Object Signing CA');
        }
        return usages;
    }
    static getExtensionKeyUsage(extension) {
        const usages = [];
        // parse key usage BitString
        const valueHex = new Uint8Array(extension.parsedValue.valueBlock.valueHex);
        const unusedBits = extension.parsedValue.valueBlock.unusedBits;
        let keyUsageByte1 = valueHex[0];
        let keyUsageByte2 = valueHex.byteLength > 1 ? valueHex[1] : 0;
        if (valueHex.byteLength === 1) {
            keyUsageByte1 >>= unusedBits;
            keyUsageByte1 <<= unusedBits;
        }
        if (valueHex.byteLength === 2) {
            keyUsageByte2 >>= unusedBits;
            keyUsageByte2 <<= unusedBits;
        }
        if (keyUsageByte1 & 0x80) {
            usages.push('Digital Signature');
        }
        if (keyUsageByte1 & 0x40) {
            usages.push('Non Repudiation');
        }
        if (keyUsageByte1 & 0x20) {
            usages.push('Key Encipherment');
        }
        if (keyUsageByte1 & 0x10) {
            usages.push('Data Encipherment');
        }
        if (keyUsageByte1 & 0x08) {
            usages.push('Key Agreement');
        }
        if (keyUsageByte1 & 0x04) {
            usages.push('Key Cert Sign');
        }
        if (keyUsageByte1 & 0x02) {
            usages.push('cRL Sign');
        }
        if (keyUsageByte1 & 0x01) {
            usages.push('Encipher Only');
        }
        if (keyUsageByte2 & 0x80) {
            usages.push('Decipher Only');
        }
        return usages;
    }
    static decodeIP(value) {
        if (value.length === 64 && parseInt(value, 16) === 0) {
            return '::/0';
        }
        if (value.length !== 16) {
            return value;
        }
        const mask = parseInt(value.slice(8), 16)
            .toString(2)
            .split('')
            .reduce((a, k) => a + (+k), 0);
        let ip = value.slice(0, 8)
            .replace(/(.{2})/g, match => `${parseInt(match, 16)}.`);
        ip = ip.slice(0, -1);
        return `${ip}/${mask}`;
    }
    static decodeSANs(altNames) {
        return altNames.map((altName) => {
            const altNameBase = 'base' in altName ? altName.base : altName;
            const item = {
                value: undefined,
                name: SANs[altNameBase.type] || `need handler for this type - ${altNameBase.type}`,
                type: altNameBase.type,
            };
            switch (item.type) {
                case 4: {
                    item.value = altNameBase.value.typesAndValues.map(i => ({
                        name: OIDs[i.type],
                        oid: i.type,
                        value: i.value.valueBlock.value,
                    }));
                    break;
                }
                case 7: {
                    item.value = Certificate$1.decodeIP(Convert.ToHex(altNameBase.value.valueBlock.valueHex));
                    break;
                }
                default: {
                    item.value = typeof altNameBase.value === 'string'
                        ? altNameBase.value
                        : item.type;
                }
            }
            return item;
        });
    }
    decode(fullDecode = false) {
        this.pem = Certificate$1.base64ToPem(this.base64);
        const pkijsSchema = new Certificate({
            schema: this.schema,
        });
        // Start decode
        // decode subject
        if (pkijsSchema.subject) {
            if (Array.isArray(pkijsSchema.subject)) {
                this.subject = Certificate$1.prepareSubject(pkijsSchema.subject);
            }
            if (Array.isArray(pkijsSchema.subject.typesAndValues)) {
                this.subject = Certificate$1.prepareSubject(pkijsSchema.subject.typesAndValues);
            }
        }
        // decode issuer
        if (pkijsSchema.issuer) {
            if (Array.isArray(pkijsSchema.issuer)) {
                this.issuer = Certificate$1.prepareSubject(pkijsSchema.issuer);
            }
            if (Array.isArray(pkijsSchema.issuer.typesAndValues)) {
                this.issuer = Certificate$1.prepareSubject(pkijsSchema.issuer.typesAndValues);
            }
        }
        // decode isRoot
        this.isRoot = JSON.stringify(this.issuer) === JSON.stringify(this.subject);
        // decode notBefore date
        if (pkijsSchema.notBefore && pkijsSchema.notBefore.value) {
            this.notBefore = pkijsSchema.notBefore.value;
        }
        // decode notAfter date
        if (pkijsSchema.notAfter && pkijsSchema.notAfter.value) {
            this.notAfter = pkijsSchema.notAfter.value;
        }
        // decode validity days
        if (this.notAfter) {
            this.validity = fromNow(this.notAfter);
        }
        // decode public key
        this.publicKey = {
            algorithm: {
                name: '',
            },
            value: Convert
                .ToHex(pkijsSchema
                .subjectPublicKeyInfo
                .subjectPublicKey
                .valueBeforeDecode)
                .toLowerCase(),
            oid: pkijsSchema
                .subjectPublicKeyInfo
                .algorithm
                .algorithmId,
        };
        if (pkijsSchema.subjectPublicKeyInfo.parsedKey) {
            if (pkijsSchema.subjectPublicKeyInfo.algorithm.algorithmId === '1.2.840.10045.2.1') {
                this.publicKey.algorithm.name = 'EC';
                this.publicKey.algorithm.namedCurve = pkijsSchema
                    .subjectPublicKeyInfo
                    .toJSON()
                    .crv;
            }
            else {
                this.publicKey.algorithm.name = 'RSA';
                if ('modulus' in pkijsSchema.subjectPublicKeyInfo.parsedKey) {
                    this.publicKey.algorithm.modulusBits = pkijsSchema
                        .subjectPublicKeyInfo
                        .parsedKey
                        .modulus
                        .valueBlock
                        .valueHex
                        .byteLength << 3;
                }
                if ('publicExponent' in pkijsSchema.subjectPublicKeyInfo.parsedKey) {
                    this.publicKey.algorithm.publicExponent = pkijsSchema
                        .subjectPublicKeyInfo
                        .parsedKey
                        .publicExponent
                        .valueBlock
                        .valueHex
                        .byteLength === 3
                        ? 65537
                        : 3;
                }
            }
        }
        // decode signature
        this.signature = {
            algorithm: Certificate$1.prepareAlgorithm(pkijsSchema.signatureAlgorithm),
            value: Convert.ToHex(pkijsSchema
                .signatureValue
                .valueBlock
                .valueHex),
            oid: pkijsSchema
                .signatureAlgorithm
                .algorithmId,
        };
        // decode serial number
        this.serialNumber = pkijsSchema.serialNumber
            ? Convert.ToHex(pkijsSchema
                .serialNumber
                .valueBlock
                .valueHex)
            : undefined;
        /**
         * Decode version
         *
         * for value 2 - version 3
         * for value 1 - version 2
         *
         * https://tools.ietf.org/html/rfc5280#section-4.1.2.1
         */
        this.version = pkijsSchema.version + 1;
        if (fullDecode) {
            // decode extensions
            if (pkijsSchema.extensions) {
                pkijsSchema.extensions.forEach((ext) => {
                    if (ext.parsedValue instanceof BasicConstraints) {
                        const extension = {
                            name: OIDs[ext.extnID] || '',
                            critical: ext.critical,
                            oid: EnumOIDs.BasicConstraints,
                            value: {
                                cA: false,
                                pathLenConstraint: typeof ext.parsedValue.pathLenConstraint === 'number'
                                    ? ext.parsedValue.pathLenConstraint
                                    : undefined,
                            },
                        };
                        return this.extensions.push(extension);
                    }
                    if (ext.parsedValue instanceof ExtKeyUsage) {
                        const extension = {
                            name: OIDs[ext.extnID] || '',
                            critical: ext.critical,
                            oid: EnumOIDs.ExtendedKeyUsage,
                            value: ext.parsedValue.keyPurposes.map(oid => ({
                                oid,
                                name: OIDs[oid],
                            })),
                        };
                        return this.extensions.push(extension);
                    }
                    if (ext.parsedValue instanceof CertificatePolicies) {
                        // TODO: Need to complete extension parse
                        const extension = {
                            name: OIDs[ext.extnID] || '',
                            critical: ext.critical,
                            oid: EnumOIDs.CertificatePolicies,
                            value: ext.parsedValue.certificatePolicies.map(certificatePolicy => {
                                var _a;
                                return ({
                                    oid: certificatePolicy.policyIdentifier,
                                    name: OIDs[certificatePolicy.policyIdentifier],
                                    value: (_a = certificatePolicy.policyQualifiers) === null || _a === void 0 ? void 0 : _a.map(qualifier => ({
                                        oid: qualifier.policyQualifierId,
                                        name: OIDs[qualifier.policyQualifierId],
                                        value: qualifier.qualifier.valueBlock.value,
                                    })),
                                });
                            }),
                        };
                        return this.extensions.push(extension);
                    }
                    if (ext.parsedValue instanceof AuthorityKeyIdentifier) {
                        const extension = {
                            name: OIDs[ext.extnID] || '',
                            critical: ext.critical,
                            oid: EnumOIDs.AuthorityKeyIdentifier,
                            value: {
                                keyIdentifier: Convert.ToHex(ext
                                    .parsedValue
                                    .keyIdentifier
                                    .valueBlock
                                    .valueHex),
                                authorityCertSerialNumber: ext.parsedValue.authorityCertSerialNumber
                                    ? Convert.ToHex(ext
                                        .parsedValue
                                        .authorityCertSerialNumber
                                        .valueBlock
                                        .valueHex)
                                    : undefined,
                            },
                        };
                        return this.extensions.push(extension);
                    }
                    if (ext.parsedValue instanceof CRLDistributionPoints) {
                        const extension = {
                            name: OIDs[ext.extnID] || '',
                            critical: ext.critical,
                            oid: EnumOIDs.CRLDistributionPoints,
                            value: ext.parsedValue.distributionPoints,
                        };
                        return this.extensions.push(extension);
                    }
                    if (ext.parsedValue instanceof InfoAccess) {
                        const extension = {
                            name: OIDs[ext.extnID] || '',
                            critical: ext.critical,
                            oid: EnumOIDs.CertificateAuthorityInformationAccess,
                            value: ext.parsedValue.accessDescriptions.map(accessDescription => ({
                                name: OIDs[accessDescription.accessMethod],
                                oid: accessDescription.accessMethod,
                                type: accessDescription.accessLocation['type'],
                                value: accessDescription.accessLocation['value'],
                            })),
                        };
                        return this.extensions.push(extension);
                    }
                    if (ext.parsedValue instanceof AltName) {
                        const extension = {
                            name: OIDs[ext.extnID] || '',
                            critical: ext.critical,
                            oid: EnumOIDs.SubjectAlternativeName,
                            value: Certificate$1.decodeSANs(ext.parsedValue.altNames),
                        };
                        return this.extensions.push(extension);
                    }
                    if (ext.parsedValue instanceof NameConstraints) {
                        const extension = {
                            name: OIDs[ext.extnID] || '',
                            critical: ext.critical,
                            oid: EnumOIDs.NameConstraints,
                            value: {
                                permitted: Certificate$1.decodeSANs(ext.parsedValue.permittedSubtrees || []),
                                excluded: Certificate$1.decodeSANs(ext.parsedValue.excludedSubtrees || []),
                            },
                        };
                        return this.extensions.push(extension);
                    }
                    if (ext.parsedValue instanceof OctetString) {
                        const extension = {
                            name: OIDs[ext.extnID] || '',
                            critical: ext.critical,
                            oid: ext.extnID,
                            value: Convert.ToHex(ext
                                .extnValue
                                .valueBlock
                                .valueHex),
                        };
                        return this.extensions.push(extension);
                    }
                    if (ext.extnID === EnumOIDs.KeyUsage) {
                        const extension = {
                            name: OIDs[ext.extnID] || '',
                            critical: ext.critical,
                            oid: EnumOIDs.KeyUsage,
                            value: Certificate$1.getExtensionKeyUsage(ext),
                        };
                        return this.extensions.push(extension);
                    }
                    if (ext.extnID === EnumOIDs.NetscapeCertificateType) {
                        const extension = {
                            name: OIDs[ext.extnID] || '',
                            critical: ext.critical,
                            oid: EnumOIDs.NetscapeCertificateType,
                            value: Certificate$1.getExtensionNetscapeCertType(ext),
                        };
                        return this.extensions.push(extension);
                    }
                    if (ext.extnID === EnumOIDs.CertificateTemplate) {
                        const extension = {
                            name: OIDs[ext.extnID] || '',
                            critical: ext.critical,
                            oid: EnumOIDs.CertificateTemplate,
                            value: ext.parsedValue,
                        };
                        return this.extensions.push(extension);
                    }
                    // TODO: Need to complete extension parce
                    if (ext.extnID === EnumOIDs.CertificateTransparency) {
                        const extension = {
                            name: OIDs[ext.extnID] || '',
                            critical: ext.critical,
                            oid: EnumOIDs.CertificateTransparency,
                            value: ext.parsedValue.timestamps.map((timestamp) => {
                                const logID = Convert.ToHex(timestamp.logID);
                                return {
                                    logID,
                                    name: Certificate$1.logs[logID],
                                    timestamp: timestamp.timestamp,
                                    version: timestamp.version + 1,
                                    hashAlgorithm: timestamp.hashAlgorithm,
                                    signatureAlgorithm: timestamp.signatureAlgorithm,
                                };
                            }),
                        };
                        return this.extensions.push(extension);
                    }
                    const extension = {
                        name: OIDs[ext.extnID] || '',
                        critical: ext.critical,
                        oid: ext.extnID,
                        value: Convert.ToHex(ext
                            .extnValue
                            .valueBlock
                            .valueHex),
                    };
                    this.extensions.push(extension);
                });
            }
        }
    }
    get commonName() {
        if (this.name) {
            return this.name;
        }
        if (this.subject) {
            if (this.subject.CN) {
                return this.subject.CN.value;
            }
            if (this.subject.E) {
                return this.subject.E.value;
            }
        }
        return;
    }
}

export { Certificate$1 as C, EnumOIDs as E };
