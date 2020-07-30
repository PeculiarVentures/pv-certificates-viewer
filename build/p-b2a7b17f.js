//**************************************************************************************
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

const asn1 = /*#__PURE__*/Object.freeze({
	__proto__: null,
	HexBlock: HexBlock,
	ValueBlock: ValueBlock,
	BaseBlock: BaseBlock,
	Primitive: Primitive,
	Constructed: Constructed,
	EndOfContent: EndOfContent,
	Boolean: Boolean,
	Sequence: Sequence,
	Set: Set,
	Null: Null,
	OctetString: OctetString,
	BitString: BitString,
	Integer: Integer,
	Enumerated: Enumerated,
	ObjectIdentifier: ObjectIdentifier,
	Utf8String: Utf8String,
	RelativeObjectIdentifier: RelativeObjectIdentifier,
	BmpString: BmpString,
	UniversalString: UniversalString,
	NumericString: NumericString,
	PrintableString: PrintableString,
	TeletexString: TeletexString,
	VideotexString: VideotexString,
	IA5String: IA5String,
	GraphicString: GraphicString,
	VisibleString: VisibleString,
	GeneralString: GeneralString,
	CharacterString: CharacterString,
	UTCTime: UTCTime,
	GeneralizedTime: GeneralizedTime,
	DATE: DATE,
	TimeOfDay: TimeOfDay,
	DateTime: DateTime,
	Duration: Duration,
	TIME: TIME,
	Choice: Choice,
	Any: Any,
	Repeated: Repeated,
	RawData: RawData,
	fromBER: fromBER,
	compareSchema: compareSchema,
	verifySchema: verifySchema,
	fromJSON: fromJSON
});

var AsnTypeTypes;
(function (AsnTypeTypes) {
    AsnTypeTypes[AsnTypeTypes["Sequence"] = 0] = "Sequence";
    AsnTypeTypes[AsnTypeTypes["Set"] = 1] = "Set";
    AsnTypeTypes[AsnTypeTypes["Choice"] = 2] = "Choice";
})(AsnTypeTypes || (AsnTypeTypes = {}));
var AsnPropTypes;
(function (AsnPropTypes) {
    AsnPropTypes[AsnPropTypes["Any"] = 1] = "Any";
    AsnPropTypes[AsnPropTypes["Boolean"] = 2] = "Boolean";
    AsnPropTypes[AsnPropTypes["OctetString"] = 3] = "OctetString";
    AsnPropTypes[AsnPropTypes["BitString"] = 4] = "BitString";
    AsnPropTypes[AsnPropTypes["Integer"] = 5] = "Integer";
    AsnPropTypes[AsnPropTypes["Enumerated"] = 6] = "Enumerated";
    AsnPropTypes[AsnPropTypes["ObjectIdentifier"] = 7] = "ObjectIdentifier";
    AsnPropTypes[AsnPropTypes["Utf8String"] = 8] = "Utf8String";
    AsnPropTypes[AsnPropTypes["BmpString"] = 9] = "BmpString";
    AsnPropTypes[AsnPropTypes["UniversalString"] = 10] = "UniversalString";
    AsnPropTypes[AsnPropTypes["NumericString"] = 11] = "NumericString";
    AsnPropTypes[AsnPropTypes["PrintableString"] = 12] = "PrintableString";
    AsnPropTypes[AsnPropTypes["TeletexString"] = 13] = "TeletexString";
    AsnPropTypes[AsnPropTypes["VideotexString"] = 14] = "VideotexString";
    AsnPropTypes[AsnPropTypes["IA5String"] = 15] = "IA5String";
    AsnPropTypes[AsnPropTypes["GraphicString"] = 16] = "GraphicString";
    AsnPropTypes[AsnPropTypes["VisibleString"] = 17] = "VisibleString";
    AsnPropTypes[AsnPropTypes["GeneralString"] = 18] = "GeneralString";
    AsnPropTypes[AsnPropTypes["CharacterString"] = 19] = "CharacterString";
    AsnPropTypes[AsnPropTypes["UTCTime"] = 20] = "UTCTime";
    AsnPropTypes[AsnPropTypes["GeneralizedTime"] = 21] = "GeneralizedTime";
    AsnPropTypes[AsnPropTypes["DATE"] = 22] = "DATE";
    AsnPropTypes[AsnPropTypes["TimeOfDay"] = 23] = "TimeOfDay";
    AsnPropTypes[AsnPropTypes["DateTime"] = 24] = "DateTime";
    AsnPropTypes[AsnPropTypes["Duration"] = 25] = "Duration";
    AsnPropTypes[AsnPropTypes["TIME"] = 26] = "TIME";
    AsnPropTypes[AsnPropTypes["Null"] = 27] = "Null";
})(AsnPropTypes || (AsnPropTypes = {}));

const AsnAnyConverter = {
    fromASN: (value) => value instanceof Null ? null : value.valueBeforeDecode,
    toASN: (value) => {
        if (value === null) {
            return new Null();
        }
        const schema = fromBER(value);
        if (schema.result.error) {
            throw new Error(schema.result.error);
        }
        return schema.result;
    },
};
const AsnIntegerConverter = {
    fromASN: (value) => value.valueBlock.valueHex.byteLength > 4
        ? value.valueBlock.toString()
        : value.valueBlock.valueDec,
    toASN: (value) => new Integer({ value: value }),
};
const AsnEnumeratedConverter = {
    fromASN: (value) => value.valueBlock.valueDec,
    toASN: (value) => new Enumerated({ value }),
};
const AsnIntegerArrayBufferConverter = {
    fromASN: (value) => value.valueBlock.valueHex,
    toASN: (value) => new Integer({ valueHex: value }),
};
const AsnBitStringConverter = {
    fromASN: (value) => value.valueBlock.valueHex,
    toASN: (value) => new BitString({ valueHex: value }),
};
const AsnObjectIdentifierConverter = {
    fromASN: (value) => value.valueBlock.toString(),
    toASN: (value) => new ObjectIdentifier({ value }),
};
const AsnBooleanConverter = {
    fromASN: (value) => value.valueBlock.value,
    toASN: (value) => new Boolean({ value }),
};
const AsnOctetStringConverter = {
    fromASN: (value) => value.valueBlock.valueHex,
    toASN: (value) => new OctetString({ valueHex: value }),
};
function createStringConverter(Asn1Type) {
    return {
        fromASN: (value) => value.valueBlock.value,
        toASN: (value) => new Asn1Type({ value }),
    };
}
const AsnUtf8StringConverter = createStringConverter(Utf8String);
const AsnBmpStringConverter = createStringConverter(BmpString);
const AsnUniversalStringConverter = createStringConverter(UniversalString);
const AsnNumericStringConverter = createStringConverter(NumericString);
const AsnPrintableStringConverter = createStringConverter(PrintableString);
const AsnTeletexStringConverter = createStringConverter(TeletexString);
const AsnVideotexStringConverter = createStringConverter(VideotexString);
const AsnIA5StringConverter = createStringConverter(IA5String);
const AsnGraphicStringConverter = createStringConverter(GraphicString);
const AsnVisibleStringConverter = createStringConverter(VisibleString);
const AsnGeneralStringConverter = createStringConverter(GeneralString);
const AsnCharacterStringConverter = createStringConverter(CharacterString);
const AsnUTCTimeConverter = {
    fromASN: (value) => value.toDate(),
    toASN: (value) => new UTCTime({ valueDate: value }),
};
const AsnGeneralizedTimeConverter = {
    fromASN: (value) => value.toDate(),
    toASN: (value) => new GeneralizedTime({ valueDate: value }),
};
const AsnNullConverter = {
    fromASN: (value) => null,
    toASN: (value) => {
        return new Null();
    },
};
function defaultConverter(type) {
    switch (type) {
        case AsnPropTypes.Any:
            return AsnAnyConverter;
        case AsnPropTypes.BitString:
            return AsnBitStringConverter;
        case AsnPropTypes.BmpString:
            return AsnBmpStringConverter;
        case AsnPropTypes.Boolean:
            return AsnBooleanConverter;
        case AsnPropTypes.CharacterString:
            return AsnCharacterStringConverter;
        case AsnPropTypes.Enumerated:
            return AsnEnumeratedConverter;
        case AsnPropTypes.GeneralString:
            return AsnGeneralStringConverter;
        case AsnPropTypes.GeneralizedTime:
            return AsnGeneralizedTimeConverter;
        case AsnPropTypes.GraphicString:
            return AsnGraphicStringConverter;
        case AsnPropTypes.IA5String:
            return AsnIA5StringConverter;
        case AsnPropTypes.Integer:
            return AsnIntegerConverter;
        case AsnPropTypes.Null:
            return AsnNullConverter;
        case AsnPropTypes.NumericString:
            return AsnNumericStringConverter;
        case AsnPropTypes.ObjectIdentifier:
            return AsnObjectIdentifierConverter;
        case AsnPropTypes.OctetString:
            return AsnOctetStringConverter;
        case AsnPropTypes.PrintableString:
            return AsnPrintableStringConverter;
        case AsnPropTypes.TeletexString:
            return AsnTeletexStringConverter;
        case AsnPropTypes.UTCTime:
            return AsnUTCTimeConverter;
        case AsnPropTypes.UniversalString:
            return AsnUniversalStringConverter;
        case AsnPropTypes.Utf8String:
            return AsnUtf8StringConverter;
        case AsnPropTypes.VideotexString:
            return AsnVideotexStringConverter;
        case AsnPropTypes.VisibleString:
            return AsnVisibleStringConverter;
        default:
            return null;
    }
}

/**
 * Copyright (c) 2019, Peculiar Ventures, All rights reserved.
 */

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

class BufferSourceConverter {
    static toArrayBuffer(data) {
        const buf = this.toUint8Array(data);
        if (buf.byteOffset || buf.length) {
            return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.length);
        }
        return buf.buffer;
    }
    static toUint8Array(data) {
        if (typeof Buffer !== "undefined" && Buffer.isBuffer(data)) {
            return new Uint8Array(data);
        }
        if (ArrayBuffer.isView(data)) {
            return new Uint8Array(data.buffer, data.byteOffset, data.byteLength);
        }
        if (data instanceof ArrayBuffer) {
            return new Uint8Array(data);
        }
        throw new TypeError("The provided value is not of type '(ArrayBuffer or ArrayBufferView)'");
    }
    static isBufferSource(data) {
        return ArrayBuffer.isView(data) || data instanceof ArrayBuffer;
    }
}

class BitString$1 {
    constructor(params, unusedBits = 0) {
        this.unusedBits = 0;
        this.value = new ArrayBuffer(0);
        if (params) {
            if (typeof params === "number") {
                this.fromNumber(params);
            }
            else if (BufferSourceConverter.isBufferSource(params)) {
                this.unusedBits = unusedBits;
                this.value = BufferSourceConverter.toArrayBuffer(params);
            }
            else {
                throw TypeError("Unsupported type of 'params' argument for BitString");
            }
        }
    }
    fromASN(asn) {
        if (!(asn instanceof BitString)) {
            throw new TypeError("Argument 'asn' is not instance of ASN.1 BitString");
        }
        this.unusedBits = asn.valueBlock.unusedBits;
        this.value = asn.valueBlock.valueHex;
        return this;
    }
    toASN() {
        return new BitString({ unusedBits: this.unusedBits, valueHex: this.value });
    }
    toSchema(name) {
        return new BitString({ name });
    }
    toNumber() {
        let res = "";
        const uintArray = new Uint8Array(this.value);
        for (const octet of uintArray) {
            res += octet.toString(2).padStart(8, "0");
        }
        res = res.split("").reverse().join("");
        if (this.unusedBits) {
            res = res.slice(this.unusedBits).padStart(this.unusedBits, "0");
        }
        return parseInt(res, 2);
    }
    fromNumber(value) {
        let bits = value.toString(2);
        const octetSize = (bits.length + 7) >> 3;
        this.unusedBits = (octetSize << 3) - bits.length;
        const octets = new Uint8Array(octetSize);
        bits = bits.padStart(octetSize << 3, "0").split("").reverse().join("");
        let index = 0;
        while (index < octetSize) {
            octets[index] = parseInt(bits.slice(index << 3, (index << 3) + 8), 2);
            index++;
        }
        this.value = octets.buffer;
    }
}

class OctetString$1 {
    constructor(param) {
        if (typeof param === "number") {
            this.buffer = new ArrayBuffer(param);
        }
        else {
            if (BufferSourceConverter.isBufferSource(param)) {
                this.buffer = BufferSourceConverter.toArrayBuffer(param);
            }
            else if (Array.isArray(param)) {
                this.buffer = new Uint8Array(param);
            }
            else {
                this.buffer = new ArrayBuffer(0);
            }
        }
    }
    get byteLength() {
        return this.buffer.byteLength;
    }
    get byteOffset() {
        return 0;
    }
    fromASN(asn) {
        if (!(asn instanceof OctetString)) {
            throw new TypeError("Argument 'asn' is not instance of ASN.1 OctetString");
        }
        this.buffer = asn.valueBlock.valueHex;
        return this;
    }
    toASN() {
        return new OctetString({ valueHex: this.buffer });
    }
    toSchema(name) {
        return new OctetString({ name });
    }
}

function isConvertible(target) {
    if (target && target.prototype) {
        if (target.prototype.toASN && target.prototype.fromASN) {
            return true;
        }
        else {
            return isConvertible(target.prototype);
        }
    }
    else {
        return !!(target && target.toASN && target.fromASN);
    }
}
function isTypeOfArray(target) {
    var _a;
    if (target) {
        const proto = Object.getPrototypeOf(target);
        if (((_a = proto === null || proto === void 0 ? void 0 : proto.prototype) === null || _a === void 0 ? void 0 : _a.constructor) === Array) {
            return true;
        }
        return isTypeOfArray(proto);
    }
    return false;
}
function isArrayEqual(bytes1, bytes2) {
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

class AsnSchemaStorage {
    constructor() {
        this.items = new WeakMap();
    }
    has(target) {
        return this.items.has(target);
    }
    get(target) {
        var _a, _b, _c, _d;
        const schema = this.items.get(target);
        if (!schema) {
            throw new Error(`Cannot get schema for '${(_d = (_c = (_b = (_a = target) === null || _a === void 0 ? void 0 : _a.prototype) === null || _b === void 0 ? void 0 : _b.constructor) === null || _c === void 0 ? void 0 : _c.name) !== null && _d !== void 0 ? _d : target}' target`);
        }
        return schema;
    }
    cache(target) {
        const schema = this.get(target);
        if (!schema.schema) {
            schema.schema = this.create(target, true);
        }
    }
    createDefault(target) {
        const schema = {
            type: AsnTypeTypes.Sequence,
            items: {},
        };
        const parentSchema = this.findParentSchema(target);
        if (parentSchema) {
            Object.assign(schema, parentSchema);
            schema.items = Object.assign({}, schema.items, parentSchema.items);
        }
        return schema;
    }
    create(target, useNames) {
        const schema = this.items.get(target) || this.createDefault(target);
        const asn1Value = [];
        for (const key in schema.items) {
            const item = schema.items[key];
            const name = useNames ? key : "";
            let asn1Item;
            if (typeof (item.type) === "number") {
                const Asn1TypeName = AsnPropTypes[item.type];
                const Asn1Type = asn1[Asn1TypeName];
                if (!Asn1Type) {
                    throw new Error(`Cannot get ASN1 class by name '${Asn1TypeName}'`);
                }
                asn1Item = new Asn1Type({ name });
            }
            else if (isConvertible(item.type)) {
                const instance = new item.type();
                asn1Item = instance.toSchema(name);
            }
            else if (item.optional) {
                const itemSchema = this.get(item.type);
                if (itemSchema.type === AsnTypeTypes.Choice) {
                    asn1Item = new Any({ name });
                }
                else {
                    asn1Item = this.create(item.type, false);
                    asn1Item.name = name;
                }
            }
            else {
                asn1Item = new Any({ name });
            }
            const optional = !!item.optional || item.defaultValue !== undefined;
            if (item.repeated) {
                asn1Item.name = "";
                const Container = item.repeated === "set"
                    ? Set
                    : Sequence;
                asn1Item = new Container({
                    name: "",
                    value: [
                        new Repeated({
                            name,
                            value: asn1Item,
                        }),
                    ],
                });
            }
            if (item.context !== null && item.context !== undefined) {
                if (item.implicit) {
                    if (typeof item.type === "number" || isConvertible(item.type)) {
                        const Container = item.repeated
                            ? Constructed
                            : Primitive;
                        asn1Value.push(new Container({
                            name,
                            optional,
                            idBlock: {
                                tagClass: 3,
                                tagNumber: item.context,
                            },
                        }));
                    }
                    else {
                        this.cache(item.type);
                        const isRepeated = !!item.repeated;
                        let value = !isRepeated
                            ? this.get(item.type).schema
                            : asn1Item;
                        value = value.valueBlock ? value.valueBlock.value : value.value;
                        asn1Value.push(new Constructed({
                            name: !isRepeated ? name : "",
                            optional,
                            idBlock: {
                                tagClass: 3,
                                tagNumber: item.context,
                            },
                            value,
                        }));
                    }
                }
                else {
                    asn1Value.push(new Constructed({
                        optional,
                        idBlock: {
                            tagClass: 3,
                            tagNumber: item.context,
                        },
                        value: [asn1Item],
                    }));
                }
            }
            else {
                asn1Item.optional = optional;
                asn1Value.push(asn1Item);
            }
        }
        switch (schema.type) {
            case AsnTypeTypes.Sequence:
                return new Sequence({ value: asn1Value, name: "" });
            case AsnTypeTypes.Set:
                return new Set({ value: asn1Value, name: "" });
            case AsnTypeTypes.Choice:
                return new Choice({ value: asn1Value, name: "" });
            default:
                throw new Error(`Unsupported ASN1 type in use`);
        }
    }
    set(target, schema) {
        this.items.set(target, schema);
        return this;
    }
    findParentSchema(target) {
        const parent = target.__proto__;
        if (parent) {
            const schema = this.items.get(parent);
            return schema || this.findParentSchema(parent);
        }
        return null;
    }
}

const schemaStorage = new AsnSchemaStorage();

const AsnType = (options) => (target) => {
    let schema;
    if (!schemaStorage.has(target)) {
        schema = schemaStorage.createDefault(target);
        schemaStorage.set(target, schema);
    }
    else {
        schema = schemaStorage.get(target);
    }
    Object.assign(schema, options);
};
const AsnProp = (options) => (target, propertyKey) => {
    let schema;
    if (!schemaStorage.has(target.constructor)) {
        schema = schemaStorage.createDefault(target.constructor);
        schemaStorage.set(target.constructor, schema);
    }
    else {
        schema = schemaStorage.get(target.constructor);
    }
    const copyOptions = Object.assign({}, options);
    if (typeof copyOptions.type === "number" && !copyOptions.converter) {
        const defaultConverter$1 = defaultConverter(options.type);
        if (!defaultConverter$1) {
            throw new Error(`Cannot get default converter for property '${propertyKey}' of ${target.constructor.name}`);
        }
        copyOptions.converter = defaultConverter$1;
    }
    schema.items[propertyKey] = copyOptions;
};

class AsnSchemaValidationError extends Error {
    constructor() {
        super(...arguments);
        this.schemas = [];
    }
}

class AsnParser {
    static parse(data, target) {
        let buf;
        if (data instanceof ArrayBuffer) {
            buf = data;
        }
        else if (typeof Buffer !== "undefined" && Buffer.isBuffer(data)) {
            buf = new Uint8Array(data).buffer;
        }
        else if (ArrayBuffer.isView(data) || data.buffer instanceof ArrayBuffer) {
            buf = data.buffer;
        }
        else {
            throw new TypeError("Wrong type of 'data' argument");
        }
        const asn1Parsed = fromBER(buf);
        if (asn1Parsed.result.error) {
            throw new Error(asn1Parsed.result.error);
        }
        const res = this.fromASN(asn1Parsed.result, target);
        return res;
    }
    static fromASN(asn1Schema, target) {
        var _a;
        try {
            if (isConvertible(target)) {
                const value = new target();
                return value.fromASN(asn1Schema);
            }
            const schema = schemaStorage.get(target);
            schemaStorage.cache(target);
            let targetSchema = schema.schema;
            if (asn1Schema.constructor === Constructed && schema.type !== AsnTypeTypes.Choice) {
                targetSchema = new Constructed({
                    idBlock: {
                        tagClass: 3,
                        tagNumber: asn1Schema.idBlock.tagNumber,
                    },
                    value: schema.schema.valueBlock.value,
                });
                for (const key in schema.items) {
                    delete asn1Schema[key];
                }
            }
            const asn1ComparedSchema = compareSchema(asn1Schema, asn1Schema, targetSchema);
            if (!asn1ComparedSchema.verified) {
                throw new AsnSchemaValidationError(`Data does not match to ${target.name} ASN1 schema. ${asn1ComparedSchema.result.error}`);
            }
            const res = new target();
            if (isTypeOfArray(target)) {
                if (typeof schema.itemType === "number") {
                    const converter = defaultConverter(schema.itemType);
                    if (!converter) {
                        throw new Error(`Cannot get default converter for array item of ${target.name} ASN1 schema`);
                    }
                    return target.from(asn1Schema.valueBlock.value, (element) => converter.fromASN(element));
                }
                else {
                    return target.from(asn1Schema.valueBlock.value, (element) => this.fromASN(element, schema.itemType));
                }
            }
            for (const key in schema.items) {
                if (!asn1Schema[key]) {
                    continue;
                }
                const schemaItem = schema.items[key];
                if (typeof (schemaItem.type) === "number" || isConvertible(schemaItem.type)) {
                    const converter = (_a = schemaItem.converter) !== null && _a !== void 0 ? _a : (isConvertible(schemaItem.type)
                        ? new schemaItem.type()
                        : null);
                    if (!converter) {
                        throw new Error("Converter is empty");
                    }
                    if (schemaItem.repeated) {
                        if (schemaItem.implicit) {
                            const Container = schemaItem.repeated === "sequence"
                                ? Sequence
                                : Set;
                            const newItem = new Container();
                            newItem.valueBlock = asn1Schema[key].valueBlock;
                            const value = fromBER(newItem.toBER(false)).result.valueBlock.value;
                            res[key] = Array.from(value, (element) => converter.fromASN(element));
                        }
                        else {
                            res[key] = Array.from(asn1Schema[key], (element) => converter.fromASN(element));
                        }
                    }
                    else {
                        let value = asn1Schema[key];
                        if (schemaItem.implicit) {
                            let newItem;
                            if (isConvertible(schemaItem.type)) {
                                newItem = new schemaItem.type().toSchema("");
                            }
                            else {
                                const Asn1TypeName = AsnPropTypes[schemaItem.type];
                                const Asn1Type = asn1[Asn1TypeName];
                                if (!Asn1Type) {
                                    throw new Error(`Cannot get '${Asn1TypeName}' class from asn1js module`);
                                }
                                newItem = new Asn1Type();
                            }
                            newItem.valueBlock = value.valueBlock;
                            value = fromBER(newItem.toBER(false)).result;
                        }
                        res[key] = converter.fromASN(value);
                    }
                }
                else {
                    if (schemaItem.repeated) {
                        res[key] = Array.from(asn1Schema[key], (element) => this.fromASN(element, schemaItem.type));
                    }
                    else {
                        res[key] = this.fromASN(asn1Schema[key], schemaItem.type);
                    }
                }
            }
            return res;
        }
        catch (error) {
            if (error instanceof AsnSchemaValidationError) {
                error.schemas.push(target.name);
            }
            throw error;
        }
    }
}

class AsnSerializer {
    static serialize(obj) {
        if (obj instanceof BaseBlock) {
            return obj.toBER(false);
        }
        return this.toASN(obj).toBER(false);
    }
    static toASN(obj) {
        if (obj && isConvertible(obj.constructor)) {
            return obj.toASN();
        }
        const target = obj.constructor;
        const schema = schemaStorage.get(target);
        schemaStorage.cache(target);
        let asn1Value = [];
        if (schema.itemType) {
            if (typeof schema.itemType === "number") {
                const converter = defaultConverter(schema.itemType);
                if (!converter) {
                    throw new Error(`Cannot get default converter for array item of ${target.name} ASN1 schema`);
                }
                asn1Value = obj.map((o) => converter.toASN(o));
            }
            else {
                asn1Value = obj.map((o) => this.toAsnItem({ type: schema.itemType }, "[]", target, o));
            }
        }
        else {
            for (const key in schema.items) {
                const schemaItem = schema.items[key];
                const objProp = obj[key];
                if (objProp === undefined
                    || schemaItem.defaultValue === objProp
                    || (typeof schemaItem.defaultValue === "object" && typeof objProp === "object"
                        && isArrayEqual(this.serialize(schemaItem.defaultValue), this.serialize(objProp)))) {
                    continue;
                }
                let asn1Item = AsnSerializer.toAsnItem(schemaItem, key, target, objProp);
                if (typeof schemaItem.context === "number") {
                    if (schemaItem.implicit) {
                        if (!schemaItem.repeated
                            && (typeof schemaItem.type === "number" || isConvertible(schemaItem.type))) {
                            const value = {};
                            value.valueHex = asn1Item.valueBlock.toBER();
                            asn1Value.push(new Primitive(Object.assign({ optional: schemaItem.optional, idBlock: {
                                    tagClass: 3,
                                    tagNumber: schemaItem.context,
                                } }, value)));
                        }
                        else {
                            asn1Value.push(new Constructed({
                                optional: schemaItem.optional,
                                idBlock: {
                                    tagClass: 3,
                                    tagNumber: schemaItem.context,
                                },
                                value: asn1Item.valueBlock.value,
                            }));
                        }
                    }
                    else {
                        asn1Value.push(new Constructed({
                            optional: schemaItem.optional,
                            idBlock: {
                                tagClass: 3,
                                tagNumber: schemaItem.context,
                            },
                            value: [asn1Item],
                        }));
                    }
                }
                else if (schemaItem.repeated) {
                    asn1Value = asn1Value.concat(asn1Item);
                }
                else {
                    asn1Value.push(asn1Item);
                }
            }
        }
        let asnSchema;
        switch (schema.type) {
            case AsnTypeTypes.Sequence:
                asnSchema = new Sequence({ value: asn1Value });
                break;
            case AsnTypeTypes.Set:
                asnSchema = new Set({ value: asn1Value });
                break;
            case AsnTypeTypes.Choice:
                if (!asn1Value[0]) {
                    throw new Error(`Schema '${target.name}' has wrong data. Choice cannot be empty.`);
                }
                asnSchema = asn1Value[0];
                break;
        }
        return asnSchema;
    }
    static toAsnItem(schemaItem, key, target, objProp) {
        let asn1Item;
        if (typeof (schemaItem.type) === "number") {
            const converter = schemaItem.converter;
            if (!converter) {
                throw new Error(`Property '${key}' doesn't have converter for type ${AsnPropTypes[schemaItem.type]} in schema '${target.name}'`);
            }
            if (schemaItem.repeated) {
                const items = Array.from(objProp, (element) => converter.toASN(element));
                const Container = schemaItem.repeated === "sequence"
                    ? Sequence
                    : Set;
                asn1Item = new Container({
                    value: items,
                });
            }
            else {
                asn1Item = converter.toASN(objProp);
            }
        }
        else {
            if (schemaItem.repeated) {
                const items = Array.from(objProp, (element) => this.toASN(element));
                const Container = schemaItem.repeated === "sequence"
                    ? Sequence
                    : Set;
                asn1Item = new Container({
                    value: items,
                });
            }
            else {
                asn1Item = this.toASN(objProp);
            }
        }
        return asn1Item;
    }
}

class AsnArray extends Array {
    constructor(items = []) {
        if (typeof items === "number") {
            super(items);
        }
        else {
            super();
            for (const item of items) {
                this.push(item);
            }
        }
    }
}

class AsnConvert {
    static serialize(obj) {
        return AsnSerializer.serialize(obj);
    }
    static parse(data, target) {
        return AsnParser.parse(data, target);
    }
}

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

let ECParameters = class ECParameters {
    constructor(params = {}) {
        Object.assign(this, params);
    }
};
__decorate([
    AsnProp({ type: AsnPropTypes.ObjectIdentifier })
], ECParameters.prototype, "namedCurve", void 0);
ECParameters = __decorate([
    AsnType({ type: AsnTypeTypes.Choice })
], ECParameters);

class ECPrivateKey {
    constructor(params = {}) {
        this.version = 1;
        this.privateKey = new OctetString$1();
        Object.assign(this, params);
    }
}
__decorate([
    AsnProp({ type: AsnPropTypes.Integer })
], ECPrivateKey.prototype, "version", void 0);
__decorate([
    AsnProp({ type: OctetString$1 })
], ECPrivateKey.prototype, "privateKey", void 0);
__decorate([
    AsnProp({ type: ECParameters, context: 0, optional: true })
], ECPrivateKey.prototype, "parameters", void 0);
__decorate([
    AsnProp({ type: AsnPropTypes.BitString, context: 1, optional: true })
], ECPrivateKey.prototype, "publicKey", void 0);

class ECDSASigValue {
    constructor(params = {}) {
        this.r = new ArrayBuffer(0);
        this.s = new ArrayBuffer(0);
        Object.assign(this, params);
    }
}
__decorate([
    AsnProp({ type: AsnPropTypes.Integer, converter: AsnIntegerArrayBufferConverter })
], ECDSASigValue.prototype, "r", void 0);
__decorate([
    AsnProp({ type: AsnPropTypes.Integer, converter: AsnIntegerArrayBufferConverter })
], ECDSASigValue.prototype, "s", void 0);

const id_ecPublicKey = "1.2.840.10045.2.1";

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function createCommonjsModule(fn, basedir, module) {
	return module = {
	  path: basedir,
	  exports: {},
	  require: function (path, base) {
    return commonjsRequire();
  }
	}, fn(module, module.exports), module.exports;
}

function commonjsRequire () {
	throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs');
}

var ipaddr = createCommonjsModule(function (module) {
(function() {
  var expandIPv6, ipaddr, ipv4Part, ipv4Regexes, ipv6Part, ipv6Regexes, matchCIDR, root, zoneIndex;

  ipaddr = {};

  root = this;

  if (( module !== null) && module.exports) {
    module.exports = ipaddr;
  } else {
    root['ipaddr'] = ipaddr;
  }

  matchCIDR = function(first, second, partSize, cidrBits) {
    var part, shift;
    if (first.length !== second.length) {
      throw new Error("ipaddr: cannot match CIDR for objects with different lengths");
    }
    part = 0;
    while (cidrBits > 0) {
      shift = partSize - cidrBits;
      if (shift < 0) {
        shift = 0;
      }
      if (first[part] >> shift !== second[part] >> shift) {
        return false;
      }
      cidrBits -= partSize;
      part += 1;
    }
    return true;
  };

  ipaddr.subnetMatch = function(address, rangeList, defaultName) {
    var k, len, rangeName, rangeSubnets, subnet;
    if (defaultName == null) {
      defaultName = 'unicast';
    }
    for (rangeName in rangeList) {
      rangeSubnets = rangeList[rangeName];
      if (rangeSubnets[0] && !(rangeSubnets[0] instanceof Array)) {
        rangeSubnets = [rangeSubnets];
      }
      for (k = 0, len = rangeSubnets.length; k < len; k++) {
        subnet = rangeSubnets[k];
        if (address.kind() === subnet[0].kind()) {
          if (address.match.apply(address, subnet)) {
            return rangeName;
          }
        }
      }
    }
    return defaultName;
  };

  ipaddr.IPv4 = (function() {
    function IPv4(octets) {
      var k, len, octet;
      if (octets.length !== 4) {
        throw new Error("ipaddr: ipv4 octet count should be 4");
      }
      for (k = 0, len = octets.length; k < len; k++) {
        octet = octets[k];
        if (!((0 <= octet && octet <= 255))) {
          throw new Error("ipaddr: ipv4 octet should fit in 8 bits");
        }
      }
      this.octets = octets;
    }

    IPv4.prototype.kind = function() {
      return 'ipv4';
    };

    IPv4.prototype.toString = function() {
      return this.octets.join(".");
    };

    IPv4.prototype.toNormalizedString = function() {
      return this.toString();
    };

    IPv4.prototype.toByteArray = function() {
      return this.octets.slice(0);
    };

    IPv4.prototype.match = function(other, cidrRange) {
      var ref;
      if (cidrRange === void 0) {
        ref = other, other = ref[0], cidrRange = ref[1];
      }
      if (other.kind() !== 'ipv4') {
        throw new Error("ipaddr: cannot match ipv4 address with non-ipv4 one");
      }
      return matchCIDR(this.octets, other.octets, 8, cidrRange);
    };

    IPv4.prototype.SpecialRanges = {
      unspecified: [[new IPv4([0, 0, 0, 0]), 8]],
      broadcast: [[new IPv4([255, 255, 255, 255]), 32]],
      multicast: [[new IPv4([224, 0, 0, 0]), 4]],
      linkLocal: [[new IPv4([169, 254, 0, 0]), 16]],
      loopback: [[new IPv4([127, 0, 0, 0]), 8]],
      carrierGradeNat: [[new IPv4([100, 64, 0, 0]), 10]],
      "private": [[new IPv4([10, 0, 0, 0]), 8], [new IPv4([172, 16, 0, 0]), 12], [new IPv4([192, 168, 0, 0]), 16]],
      reserved: [[new IPv4([192, 0, 0, 0]), 24], [new IPv4([192, 0, 2, 0]), 24], [new IPv4([192, 88, 99, 0]), 24], [new IPv4([198, 51, 100, 0]), 24], [new IPv4([203, 0, 113, 0]), 24], [new IPv4([240, 0, 0, 0]), 4]]
    };

    IPv4.prototype.range = function() {
      return ipaddr.subnetMatch(this, this.SpecialRanges);
    };

    IPv4.prototype.toIPv4MappedAddress = function() {
      return ipaddr.IPv6.parse("::ffff:" + (this.toString()));
    };

    IPv4.prototype.prefixLengthFromSubnetMask = function() {
      var cidr, i, k, octet, stop, zeros, zerotable;
      zerotable = {
        0: 8,
        128: 7,
        192: 6,
        224: 5,
        240: 4,
        248: 3,
        252: 2,
        254: 1,
        255: 0
      };
      cidr = 0;
      stop = false;
      for (i = k = 3; k >= 0; i = k += -1) {
        octet = this.octets[i];
        if (octet in zerotable) {
          zeros = zerotable[octet];
          if (stop && zeros !== 0) {
            return null;
          }
          if (zeros !== 8) {
            stop = true;
          }
          cidr += zeros;
        } else {
          return null;
        }
      }
      return 32 - cidr;
    };

    return IPv4;

  })();

  ipv4Part = "(0?\\d+|0x[a-f0-9]+)";

  ipv4Regexes = {
    fourOctet: new RegExp("^" + ipv4Part + "\\." + ipv4Part + "\\." + ipv4Part + "\\." + ipv4Part + "$", 'i'),
    longValue: new RegExp("^" + ipv4Part + "$", 'i')
  };

  ipaddr.IPv4.parser = function(string) {
    var match, parseIntAuto, part, shift, value;
    parseIntAuto = function(string) {
      if (string[0] === "0" && string[1] !== "x") {
        return parseInt(string, 8);
      } else {
        return parseInt(string);
      }
    };
    if (match = string.match(ipv4Regexes.fourOctet)) {
      return (function() {
        var k, len, ref, results;
        ref = match.slice(1, 6);
        results = [];
        for (k = 0, len = ref.length; k < len; k++) {
          part = ref[k];
          results.push(parseIntAuto(part));
        }
        return results;
      })();
    } else if (match = string.match(ipv4Regexes.longValue)) {
      value = parseIntAuto(match[1]);
      if (value > 0xffffffff || value < 0) {
        throw new Error("ipaddr: address outside defined range");
      }
      return ((function() {
        var k, results;
        results = [];
        for (shift = k = 0; k <= 24; shift = k += 8) {
          results.push((value >> shift) & 0xff);
        }
        return results;
      })()).reverse();
    } else {
      return null;
    }
  };

  ipaddr.IPv6 = (function() {
    function IPv6(parts, zoneId) {
      var i, k, l, len, part, ref;
      if (parts.length === 16) {
        this.parts = [];
        for (i = k = 0; k <= 14; i = k += 2) {
          this.parts.push((parts[i] << 8) | parts[i + 1]);
        }
      } else if (parts.length === 8) {
        this.parts = parts;
      } else {
        throw new Error("ipaddr: ipv6 part count should be 8 or 16");
      }
      ref = this.parts;
      for (l = 0, len = ref.length; l < len; l++) {
        part = ref[l];
        if (!((0 <= part && part <= 0xffff))) {
          throw new Error("ipaddr: ipv6 part should fit in 16 bits");
        }
      }
      if (zoneId) {
        this.zoneId = zoneId;
      }
    }

    IPv6.prototype.kind = function() {
      return 'ipv6';
    };

    IPv6.prototype.toString = function() {
      return this.toNormalizedString().replace(/((^|:)(0(:|$))+)/, '::');
    };

    IPv6.prototype.toRFC5952String = function() {
      var bestMatchIndex, bestMatchLength, match, regex, string;
      regex = /((^|:)(0(:|$)){2,})/g;
      string = this.toNormalizedString();
      bestMatchIndex = 0;
      bestMatchLength = -1;
      while ((match = regex.exec(string))) {
        if (match[0].length > bestMatchLength) {
          bestMatchIndex = match.index;
          bestMatchLength = match[0].length;
        }
      }
      if (bestMatchLength < 0) {
        return string;
      }
      return string.substring(0, bestMatchIndex) + '::' + string.substring(bestMatchIndex + bestMatchLength);
    };

    IPv6.prototype.toByteArray = function() {
      var bytes, k, len, part, ref;
      bytes = [];
      ref = this.parts;
      for (k = 0, len = ref.length; k < len; k++) {
        part = ref[k];
        bytes.push(part >> 8);
        bytes.push(part & 0xff);
      }
      return bytes;
    };

    IPv6.prototype.toNormalizedString = function() {
      var addr, part, suffix;
      addr = ((function() {
        var k, len, ref, results;
        ref = this.parts;
        results = [];
        for (k = 0, len = ref.length; k < len; k++) {
          part = ref[k];
          results.push(part.toString(16));
        }
        return results;
      }).call(this)).join(":");
      suffix = '';
      if (this.zoneId) {
        suffix = '%' + this.zoneId;
      }
      return addr + suffix;
    };

    IPv6.prototype.toFixedLengthString = function() {
      var addr, part, suffix;
      addr = ((function() {
        var k, len, ref, results;
        ref = this.parts;
        results = [];
        for (k = 0, len = ref.length; k < len; k++) {
          part = ref[k];
          results.push(part.toString(16).padStart(4, '0'));
        }
        return results;
      }).call(this)).join(":");
      suffix = '';
      if (this.zoneId) {
        suffix = '%' + this.zoneId;
      }
      return addr + suffix;
    };

    IPv6.prototype.match = function(other, cidrRange) {
      var ref;
      if (cidrRange === void 0) {
        ref = other, other = ref[0], cidrRange = ref[1];
      }
      if (other.kind() !== 'ipv6') {
        throw new Error("ipaddr: cannot match ipv6 address with non-ipv6 one");
      }
      return matchCIDR(this.parts, other.parts, 16, cidrRange);
    };

    IPv6.prototype.SpecialRanges = {
      unspecified: [new IPv6([0, 0, 0, 0, 0, 0, 0, 0]), 128],
      linkLocal: [new IPv6([0xfe80, 0, 0, 0, 0, 0, 0, 0]), 10],
      multicast: [new IPv6([0xff00, 0, 0, 0, 0, 0, 0, 0]), 8],
      loopback: [new IPv6([0, 0, 0, 0, 0, 0, 0, 1]), 128],
      uniqueLocal: [new IPv6([0xfc00, 0, 0, 0, 0, 0, 0, 0]), 7],
      ipv4Mapped: [new IPv6([0, 0, 0, 0, 0, 0xffff, 0, 0]), 96],
      rfc6145: [new IPv6([0, 0, 0, 0, 0xffff, 0, 0, 0]), 96],
      rfc6052: [new IPv6([0x64, 0xff9b, 0, 0, 0, 0, 0, 0]), 96],
      '6to4': [new IPv6([0x2002, 0, 0, 0, 0, 0, 0, 0]), 16],
      teredo: [new IPv6([0x2001, 0, 0, 0, 0, 0, 0, 0]), 32],
      reserved: [[new IPv6([0x2001, 0xdb8, 0, 0, 0, 0, 0, 0]), 32]]
    };

    IPv6.prototype.range = function() {
      return ipaddr.subnetMatch(this, this.SpecialRanges);
    };

    IPv6.prototype.isIPv4MappedAddress = function() {
      return this.range() === 'ipv4Mapped';
    };

    IPv6.prototype.toIPv4Address = function() {
      var high, low, ref;
      if (!this.isIPv4MappedAddress()) {
        throw new Error("ipaddr: trying to convert a generic ipv6 address to ipv4");
      }
      ref = this.parts.slice(-2), high = ref[0], low = ref[1];
      return new ipaddr.IPv4([high >> 8, high & 0xff, low >> 8, low & 0xff]);
    };

    IPv6.prototype.prefixLengthFromSubnetMask = function() {
      var cidr, i, k, part, stop, zeros, zerotable;
      zerotable = {
        0: 16,
        32768: 15,
        49152: 14,
        57344: 13,
        61440: 12,
        63488: 11,
        64512: 10,
        65024: 9,
        65280: 8,
        65408: 7,
        65472: 6,
        65504: 5,
        65520: 4,
        65528: 3,
        65532: 2,
        65534: 1,
        65535: 0
      };
      cidr = 0;
      stop = false;
      for (i = k = 7; k >= 0; i = k += -1) {
        part = this.parts[i];
        if (part in zerotable) {
          zeros = zerotable[part];
          if (stop && zeros !== 0) {
            return null;
          }
          if (zeros !== 16) {
            stop = true;
          }
          cidr += zeros;
        } else {
          return null;
        }
      }
      return 128 - cidr;
    };

    return IPv6;

  })();

  ipv6Part = "(?:[0-9a-f]+::?)+";

  zoneIndex = "%[0-9a-z]{1,}";

  ipv6Regexes = {
    zoneIndex: new RegExp(zoneIndex, 'i'),
    "native": new RegExp("^(::)?(" + ipv6Part + ")?([0-9a-f]+)?(::)?(" + zoneIndex + ")?$", 'i'),
    transitional: new RegExp(("^((?:" + ipv6Part + ")|(?:::)(?:" + ipv6Part + ")?)") + (ipv4Part + "\\." + ipv4Part + "\\." + ipv4Part + "\\." + ipv4Part) + ("(" + zoneIndex + ")?$"), 'i')
  };

  expandIPv6 = function(string, parts) {
    var colonCount, lastColon, part, replacement, replacementCount, zoneId;
    if (string.indexOf('::') !== string.lastIndexOf('::')) {
      return null;
    }
    zoneId = (string.match(ipv6Regexes['zoneIndex']) || [])[0];
    if (zoneId) {
      zoneId = zoneId.substring(1);
      string = string.replace(/%.+$/, '');
    }
    colonCount = 0;
    lastColon = -1;
    while ((lastColon = string.indexOf(':', lastColon + 1)) >= 0) {
      colonCount++;
    }
    if (string.substr(0, 2) === '::') {
      colonCount--;
    }
    if (string.substr(-2, 2) === '::') {
      colonCount--;
    }
    if (colonCount > parts) {
      return null;
    }
    replacementCount = parts - colonCount;
    replacement = ':';
    while (replacementCount--) {
      replacement += '0:';
    }
    string = string.replace('::', replacement);
    if (string[0] === ':') {
      string = string.slice(1);
    }
    if (string[string.length - 1] === ':') {
      string = string.slice(0, -1);
    }
    parts = (function() {
      var k, len, ref, results;
      ref = string.split(":");
      results = [];
      for (k = 0, len = ref.length; k < len; k++) {
        part = ref[k];
        results.push(parseInt(part, 16));
      }
      return results;
    })();
    return {
      parts: parts,
      zoneId: zoneId
    };
  };

  ipaddr.IPv6.parser = function(string) {
    var addr, k, len, match, octet, octets, zoneId;
    if (ipv6Regexes['native'].test(string)) {
      return expandIPv6(string, 8);
    } else if (match = string.match(ipv6Regexes['transitional'])) {
      zoneId = match[6] || '';
      addr = expandIPv6(match[1].slice(0, -1) + zoneId, 6);
      if (addr.parts) {
        octets = [parseInt(match[2]), parseInt(match[3]), parseInt(match[4]), parseInt(match[5])];
        for (k = 0, len = octets.length; k < len; k++) {
          octet = octets[k];
          if (!((0 <= octet && octet <= 255))) {
            return null;
          }
        }
        addr.parts.push(octets[0] << 8 | octets[1]);
        addr.parts.push(octets[2] << 8 | octets[3]);
        return {
          parts: addr.parts,
          zoneId: addr.zoneId
        };
      }
    }
    return null;
  };

  ipaddr.IPv4.isIPv4 = ipaddr.IPv6.isIPv6 = function(string) {
    return this.parser(string) !== null;
  };

  ipaddr.IPv4.isValid = function(string) {
    try {
      new this(this.parser(string));
      return true;
    } catch (error1) {
      return false;
    }
  };

  ipaddr.IPv4.isValidFourPartDecimal = function(string) {
    if (ipaddr.IPv4.isValid(string) && string.match(/^(0|[1-9]\d*)(\.(0|[1-9]\d*)){3}$/)) {
      return true;
    } else {
      return false;
    }
  };

  ipaddr.IPv6.isValid = function(string) {
    var addr;
    if (typeof string === "string" && string.indexOf(":") === -1) {
      return false;
    }
    try {
      addr = this.parser(string);
      new this(addr.parts, addr.zoneId);
      return true;
    } catch (error1) {
      return false;
    }
  };

  ipaddr.IPv4.parse = function(string) {
    var parts;
    parts = this.parser(string);
    if (parts === null) {
      throw new Error("ipaddr: string is not formatted like ip address");
    }
    return new this(parts);
  };

  ipaddr.IPv6.parse = function(string) {
    var addr;
    addr = this.parser(string);
    if (addr.parts === null) {
      throw new Error("ipaddr: string is not formatted like ip address");
    }
    return new this(addr.parts, addr.zoneId);
  };

  ipaddr.IPv4.parseCIDR = function(string) {
    var maskLength, match, parsed;
    if (match = string.match(/^(.+)\/(\d+)$/)) {
      maskLength = parseInt(match[2]);
      if (maskLength >= 0 && maskLength <= 32) {
        parsed = [this.parse(match[1]), maskLength];
        Object.defineProperty(parsed, 'toString', {
          value: function() {
            return this.join('/');
          }
        });
        return parsed;
      }
    }
    throw new Error("ipaddr: string is not formatted like an IPv4 CIDR range");
  };

  ipaddr.IPv4.subnetMaskFromPrefixLength = function(prefix) {
    var filledOctetCount, j, octets;
    prefix = parseInt(prefix);
    if (prefix < 0 || prefix > 32) {
      throw new Error('ipaddr: invalid IPv4 prefix length');
    }
    octets = [0, 0, 0, 0];
    j = 0;
    filledOctetCount = Math.floor(prefix / 8);
    while (j < filledOctetCount) {
      octets[j] = 255;
      j++;
    }
    if (filledOctetCount < 4) {
      octets[filledOctetCount] = Math.pow(2, prefix % 8) - 1 << 8 - (prefix % 8);
    }
    return new this(octets);
  };

  ipaddr.IPv4.broadcastAddressFromCIDR = function(string) {
    var cidr, i, ipInterfaceOctets, octets, subnetMaskOctets;
    try {
      cidr = this.parseCIDR(string);
      ipInterfaceOctets = cidr[0].toByteArray();
      subnetMaskOctets = this.subnetMaskFromPrefixLength(cidr[1]).toByteArray();
      octets = [];
      i = 0;
      while (i < 4) {
        octets.push(parseInt(ipInterfaceOctets[i], 10) | parseInt(subnetMaskOctets[i], 10) ^ 255);
        i++;
      }
      return new this(octets);
    } catch (error1) {
      throw new Error('ipaddr: the address does not have IPv4 CIDR format');
    }
  };

  ipaddr.IPv4.networkAddressFromCIDR = function(string) {
    var cidr, i, ipInterfaceOctets, octets, subnetMaskOctets;
    try {
      cidr = this.parseCIDR(string);
      ipInterfaceOctets = cidr[0].toByteArray();
      subnetMaskOctets = this.subnetMaskFromPrefixLength(cidr[1]).toByteArray();
      octets = [];
      i = 0;
      while (i < 4) {
        octets.push(parseInt(ipInterfaceOctets[i], 10) & parseInt(subnetMaskOctets[i], 10));
        i++;
      }
      return new this(octets);
    } catch (error1) {
      throw new Error('ipaddr: the address does not have IPv4 CIDR format');
    }
  };

  ipaddr.IPv6.parseCIDR = function(string) {
    var maskLength, match, parsed;
    if (match = string.match(/^(.+)\/(\d+)$/)) {
      maskLength = parseInt(match[2]);
      if (maskLength >= 0 && maskLength <= 128) {
        parsed = [this.parse(match[1]), maskLength];
        Object.defineProperty(parsed, 'toString', {
          value: function() {
            return this.join('/');
          }
        });
        return parsed;
      }
    }
    throw new Error("ipaddr: string is not formatted like an IPv6 CIDR range");
  };

  ipaddr.isValid = function(string) {
    return ipaddr.IPv6.isValid(string) || ipaddr.IPv4.isValid(string);
  };

  ipaddr.parse = function(string) {
    if (ipaddr.IPv6.isValid(string)) {
      return ipaddr.IPv6.parse(string);
    } else if (ipaddr.IPv4.isValid(string)) {
      return ipaddr.IPv4.parse(string);
    } else {
      throw new Error("ipaddr: the address has neither IPv6 nor IPv4 format");
    }
  };

  ipaddr.parseCIDR = function(string) {
    try {
      return ipaddr.IPv6.parseCIDR(string);
    } catch (error1) {
      try {
        return ipaddr.IPv4.parseCIDR(string);
      } catch (error1) {
        throw new Error("ipaddr: the address has neither IPv6 nor IPv4 CIDR format");
      }
    }
  };

  ipaddr.fromByteArray = function(bytes) {
    var length;
    length = bytes.length;
    if (length === 4) {
      return new ipaddr.IPv4(bytes);
    } else if (length === 16) {
      return new ipaddr.IPv6(bytes);
    } else {
      throw new Error("ipaddr: the binary input is neither an IPv6 nor IPv4 address");
    }
  };

  ipaddr.process = function(string) {
    var addr;
    addr = this.parse(string);
    if (addr.kind() === 'ipv6' && addr.isIPv4MappedAddress()) {
      return addr.toIPv4Address();
    } else {
      return addr;
    }
  };

}).call(commonjsGlobal);
});

class IpConverter {
    static decodeIP(value) {
        if (value.length === 64 && parseInt(value, 16) === 0) {
            return "::/0";
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
    static toString(buf) {
        if (buf.byteLength === 4 || buf.byteLength === 16) {
            const uint8 = new Uint8Array(buf);
            const addr = ipaddr.fromByteArray(Array.from(uint8));
            return addr.toString();
        }
        return this.decodeIP(Convert.ToHex(buf));
    }
    static fromString(text) {
        const addr = ipaddr.parse(text);
        return new Uint8Array(addr.toByteArray()).buffer;
    }
}

let DirectoryString = class DirectoryString {
    constructor(params = {}) {
        Object.assign(this, params);
    }
    toString() {
        return this.bmpString || this.printableString || this.teletexString || this.universalString
            || this.utf8String || "";
    }
};
__decorate([
    AsnProp({ type: AsnPropTypes.TeletexString })
], DirectoryString.prototype, "teletexString", void 0);
__decorate([
    AsnProp({ type: AsnPropTypes.PrintableString })
], DirectoryString.prototype, "printableString", void 0);
__decorate([
    AsnProp({ type: AsnPropTypes.UniversalString })
], DirectoryString.prototype, "universalString", void 0);
__decorate([
    AsnProp({ type: AsnPropTypes.Utf8String })
], DirectoryString.prototype, "utf8String", void 0);
__decorate([
    AsnProp({ type: AsnPropTypes.BmpString })
], DirectoryString.prototype, "bmpString", void 0);
DirectoryString = __decorate([
    AsnType({ type: AsnTypeTypes.Choice })
], DirectoryString);
let AttributeValue = class AttributeValue extends DirectoryString {
    constructor(params = {}) {
        super(params);
        Object.assign(this, params);
    }
    toString() {
        return this.ia5String || (this.anyValue ? Convert.ToHex(this.anyValue) : super.toString());
    }
};
__decorate([
    AsnProp({ type: AsnPropTypes.IA5String })
], AttributeValue.prototype, "ia5String", void 0);
__decorate([
    AsnProp({ type: AsnPropTypes.Any })
], AttributeValue.prototype, "anyValue", void 0);
AttributeValue = __decorate([
    AsnType({ type: AsnTypeTypes.Choice })
], AttributeValue);
class AttributeTypeAndValue {
    constructor(params = {}) {
        this.type = "";
        this.value = new AttributeValue();
        Object.assign(this, params);
    }
}
__decorate([
    AsnProp({ type: AsnPropTypes.ObjectIdentifier })
], AttributeTypeAndValue.prototype, "type", void 0);
__decorate([
    AsnProp({ type: AttributeValue })
], AttributeTypeAndValue.prototype, "value", void 0);
let RelativeDistinguishedName = class RelativeDistinguishedName extends AsnArray {
};
RelativeDistinguishedName = __decorate([
    AsnType({ type: AsnTypeTypes.Set, itemType: AttributeTypeAndValue })
], RelativeDistinguishedName);
let RDNSequence = class RDNSequence extends AsnArray {
};
RDNSequence = __decorate([
    AsnType({ type: AsnTypeTypes.Sequence, itemType: RelativeDistinguishedName })
], RDNSequence);
let Name = class Name extends RDNSequence {
};
Name = __decorate([
    AsnType({ type: AsnTypeTypes.Sequence })
], Name);

const AsnIpConverter = {
    fromASN: (value) => IpConverter.toString(AsnOctetStringConverter.fromASN(value)),
    toASN: (value) => AsnOctetStringConverter.toASN(IpConverter.fromString(value)),
};
class OtherName {
    constructor(params = {}) {
        this.typeId = "";
        this.value = new ArrayBuffer(0);
        Object.assign(this, params);
    }
}
__decorate([
    AsnProp({ type: AsnPropTypes.ObjectIdentifier })
], OtherName.prototype, "typeId", void 0);
__decorate([
    AsnProp({ type: AsnPropTypes.Any, context: 0 })
], OtherName.prototype, "value", void 0);
class EDIPartyName {
    constructor(params = {}) {
        this.partyName = new ArrayBuffer(0);
        Object.assign(this, params);
    }
}
__decorate([
    AsnProp({ type: DirectoryString, optional: true, context: 0, implicit: true })
], EDIPartyName.prototype, "nameAssigner", void 0);
__decorate([
    AsnProp({ type: DirectoryString, context: 1, implicit: true })
], EDIPartyName.prototype, "partyName", void 0);
let GeneralName = class GeneralName {
    constructor(params = {}) {
        Object.assign(this, params);
    }
};
__decorate([
    AsnProp({ type: OtherName, context: 0, implicit: true })
], GeneralName.prototype, "otherName", void 0);
__decorate([
    AsnProp({ type: AsnPropTypes.IA5String, context: 1, implicit: true })
], GeneralName.prototype, "rfc822Name", void 0);
__decorate([
    AsnProp({ type: AsnPropTypes.IA5String, context: 2, implicit: true })
], GeneralName.prototype, "dNSName", void 0);
__decorate([
    AsnProp({ type: AsnPropTypes.Any, context: 3, implicit: true })
], GeneralName.prototype, "x400Address", void 0);
__decorate([
    AsnProp({ type: Name, context: 4, implicit: false })
], GeneralName.prototype, "directoryName", void 0);
__decorate([
    AsnProp({ type: EDIPartyName, context: 5 })
], GeneralName.prototype, "ediPartyName", void 0);
__decorate([
    AsnProp({ type: AsnPropTypes.IA5String, context: 6, implicit: true })
], GeneralName.prototype, "uniformResourceIdentifier", void 0);
__decorate([
    AsnProp({ type: AsnPropTypes.OctetString, context: 7, implicit: true, converter: AsnIpConverter })
], GeneralName.prototype, "iPAddress", void 0);
__decorate([
    AsnProp({ type: AsnPropTypes.ObjectIdentifier, context: 8, implicit: true })
], GeneralName.prototype, "registeredID", void 0);
GeneralName = __decorate([
    AsnType({ type: AsnTypeTypes.Choice })
], GeneralName);

const id_pkix = "1.3.6.1.5.5.7";
const id_pe = `${id_pkix}.1`;
const id_ce = "2.5.29";

const id_pe_authorityInfoAccess = `${id_pe}.1`;
class AccessDescription {
    constructor(params = {}) {
        this.accessMethod = "";
        this.accessLocation = new GeneralName();
        Object.assign(this, params);
    }
}
__decorate([
    AsnProp({ type: AsnPropTypes.ObjectIdentifier })
], AccessDescription.prototype, "accessMethod", void 0);
__decorate([
    AsnProp({ type: GeneralName })
], AccessDescription.prototype, "accessLocation", void 0);
let AuthorityInfoAccessSyntax = class AuthorityInfoAccessSyntax extends AsnArray {
};
AuthorityInfoAccessSyntax = __decorate([
    AsnType({ type: AsnTypeTypes.Sequence, itemType: AccessDescription })
], AuthorityInfoAccessSyntax);

const id_ce_authorityKeyIdentifier = `${id_ce}.35`;
class KeyIdentifier extends OctetString$1 {
}
class AuthorityKeyIdentifier {
    constructor(params = {}) {
        if (params) {
            Object.assign(this, params);
        }
    }
}
__decorate([
    AsnProp({ type: KeyIdentifier, context: 0, optional: true, implicit: true })
], AuthorityKeyIdentifier.prototype, "keyIdentifier", void 0);
__decorate([
    AsnProp({ type: GeneralName, context: 1, optional: true, implicit: true, repeated: "sequence" })
], AuthorityKeyIdentifier.prototype, "authorityCertIssuer", void 0);
__decorate([
    AsnProp({
        type: AsnPropTypes.Integer,
        context: 2,
        optional: true,
        implicit: true,
        converter: AsnIntegerArrayBufferConverter,
    })
], AuthorityKeyIdentifier.prototype, "authorityCertSerialNumber", void 0);

const id_ce_basicConstraints = `${id_ce}.19`;
class BasicConstraints {
    constructor(params = {}) {
        this.cA = false;
        Object.assign(this, params);
    }
}
__decorate([
    AsnProp({ type: AsnPropTypes.Boolean, defaultValue: false })
], BasicConstraints.prototype, "cA", void 0);
__decorate([
    AsnProp({ type: AsnPropTypes.Integer, optional: true })
], BasicConstraints.prototype, "pathLenConstraint", void 0);

let GeneralNames = class GeneralNames extends AsnArray {
};
GeneralNames = __decorate([
    AsnType({ type: AsnTypeTypes.Sequence, itemType: GeneralName })
], GeneralNames);

const id_ce_certificateIssuer = `${id_ce}.29`;
let CertificateIssuer = class CertificateIssuer extends GeneralNames {
};
CertificateIssuer = __decorate([
    AsnType({ type: AsnTypeTypes.Sequence })
], CertificateIssuer);

const id_ce_certificatePolicies = `${id_ce}.32`;
let DisplayText = class DisplayText {
    constructor(params = {}) {
        Object.assign(this, params);
    }
    toString() {
        return this.ia5String || this.visibleString || this.bmpString || this.utf8String;
    }
};
__decorate([
    AsnProp({ type: AsnPropTypes.IA5String })
], DisplayText.prototype, "ia5String", void 0);
__decorate([
    AsnProp({ type: AsnPropTypes.VisibleString })
], DisplayText.prototype, "visibleString", void 0);
__decorate([
    AsnProp({ type: AsnPropTypes.BmpString })
], DisplayText.prototype, "bmpString", void 0);
__decorate([
    AsnProp({ type: AsnPropTypes.Utf8String })
], DisplayText.prototype, "utf8String", void 0);
DisplayText = __decorate([
    AsnType({ type: AsnTypeTypes.Choice })
], DisplayText);
class NoticeReference {
    constructor(params = {}) {
        this.organization = new DisplayText();
        this.noticeNumbers = [];
        Object.assign(this, params);
    }
}
__decorate([
    AsnProp({ type: DisplayText })
], NoticeReference.prototype, "organization", void 0);
__decorate([
    AsnProp({ type: AsnPropTypes.Integer, repeated: "sequence" })
], NoticeReference.prototype, "noticeNumbers", void 0);
class UserNotice {
    constructor(params = {}) {
        Object.assign(this, params);
    }
}
__decorate([
    AsnProp({ type: NoticeReference, optional: true })
], UserNotice.prototype, "noticeRef", void 0);
__decorate([
    AsnProp({ type: DisplayText, optional: true })
], UserNotice.prototype, "explicitText", void 0);
let Qualifier = class Qualifier {
    constructor(params = {}) {
        Object.assign(this, params);
    }
};
__decorate([
    AsnProp({ type: AsnPropTypes.IA5String })
], Qualifier.prototype, "cPSuri", void 0);
__decorate([
    AsnProp({ type: UserNotice })
], Qualifier.prototype, "userNotice", void 0);
Qualifier = __decorate([
    AsnType({ type: AsnTypeTypes.Choice })
], Qualifier);
class PolicyQualifierInfo {
    constructor(params = {}) {
        this.policyQualifierId = "";
        this.qualifier = new ArrayBuffer(0);
        Object.assign(this, params);
    }
}
__decorate([
    AsnProp({ type: AsnPropTypes.ObjectIdentifier })
], PolicyQualifierInfo.prototype, "policyQualifierId", void 0);
__decorate([
    AsnProp({ type: AsnPropTypes.Any })
], PolicyQualifierInfo.prototype, "qualifier", void 0);
class PolicyInformation {
    constructor(params = {}) {
        this.policyIdentifier = "";
        Object.assign(this, params);
    }
}
__decorate([
    AsnProp({ type: AsnPropTypes.ObjectIdentifier })
], PolicyInformation.prototype, "policyIdentifier", void 0);
__decorate([
    AsnProp({ type: PolicyQualifierInfo, repeated: "sequence", optional: true })
], PolicyInformation.prototype, "policyQualifiers", void 0);
let CertificatePolicies = class CertificatePolicies extends AsnArray {
};
CertificatePolicies = __decorate([
    AsnType({ type: AsnTypeTypes.Sequence, itemType: PolicyInformation })
], CertificatePolicies);

const id_ce_cRLDistributionPoints = `${id_ce}.31`;
var ReasonFlags;
(function (ReasonFlags) {
    ReasonFlags[ReasonFlags["unused"] = 1] = "unused";
    ReasonFlags[ReasonFlags["keyCompromise"] = 2] = "keyCompromise";
    ReasonFlags[ReasonFlags["cACompromise"] = 4] = "cACompromise";
    ReasonFlags[ReasonFlags["affiliationChanged"] = 8] = "affiliationChanged";
    ReasonFlags[ReasonFlags["superseded"] = 16] = "superseded";
    ReasonFlags[ReasonFlags["cessationOfOperation"] = 32] = "cessationOfOperation";
    ReasonFlags[ReasonFlags["certificateHold"] = 64] = "certificateHold";
    ReasonFlags[ReasonFlags["privilegeWithdrawn"] = 128] = "privilegeWithdrawn";
    ReasonFlags[ReasonFlags["aACompromise"] = 256] = "aACompromise";
})(ReasonFlags || (ReasonFlags = {}));
class Reason extends BitString$1 {
    toJSON() {
        const res = [];
        const flags = this.toNumber();
        if (flags & ReasonFlags.aACompromise) {
            res.push("aACompromise");
        }
        if (flags & ReasonFlags.affiliationChanged) {
            res.push("affiliationChanged");
        }
        if (flags & ReasonFlags.cACompromise) {
            res.push("cACompromise");
        }
        if (flags & ReasonFlags.certificateHold) {
            res.push("certificateHold");
        }
        if (flags & ReasonFlags.cessationOfOperation) {
            res.push("cessationOfOperation");
        }
        if (flags & ReasonFlags.keyCompromise) {
            res.push("keyCompromise");
        }
        if (flags & ReasonFlags.privilegeWithdrawn) {
            res.push("privilegeWithdrawn");
        }
        if (flags & ReasonFlags.superseded) {
            res.push("superseded");
        }
        if (flags & ReasonFlags.unused) {
            res.push("unused");
        }
        return res;
    }
    toString() {
        return `[${this.toJSON().join(", ")}]`;
    }
}
let DistributionPointName = class DistributionPointName {
    constructor(params = {}) {
        Object.assign(this, params);
    }
};
__decorate([
    AsnProp({ type: GeneralName, context: 0, repeated: "sequence", implicit: true })
], DistributionPointName.prototype, "fullName", void 0);
__decorate([
    AsnProp({ type: RelativeDistinguishedName, context: 1, implicit: true })
], DistributionPointName.prototype, "nameRelativeToCRLIssuer", void 0);
DistributionPointName = __decorate([
    AsnType({ type: AsnTypeTypes.Choice })
], DistributionPointName);
class DistributionPoint {
    constructor(params = {}) {
        Object.assign(this, params);
    }
}
__decorate([
    AsnProp({ type: DistributionPointName, context: 0, optional: true })
], DistributionPoint.prototype, "distributionPoint", void 0);
__decorate([
    AsnProp({ type: Reason, context: 1, optional: true, implicit: true })
], DistributionPoint.prototype, "reasons", void 0);
__decorate([
    AsnProp({ type: GeneralName, context: 2, optional: true, repeated: "sequence", implicit: true })
], DistributionPoint.prototype, "cRLIssuer", void 0);
let CRLDistributionPoints = class CRLDistributionPoints extends AsnArray {
};
CRLDistributionPoints = __decorate([
    AsnType({ type: AsnTypeTypes.Sequence, itemType: DistributionPoint })
], CRLDistributionPoints);

const id_ce_cRLReasons = `${id_ce}.21`;
var CRLReasons;
(function (CRLReasons) {
    CRLReasons[CRLReasons["unspecified"] = 0] = "unspecified";
    CRLReasons[CRLReasons["keyCompromise"] = 1] = "keyCompromise";
    CRLReasons[CRLReasons["cACompromise"] = 2] = "cACompromise";
    CRLReasons[CRLReasons["affiliationChanged"] = 3] = "affiliationChanged";
    CRLReasons[CRLReasons["superseded"] = 4] = "superseded";
    CRLReasons[CRLReasons["cessationOfOperation"] = 5] = "cessationOfOperation";
    CRLReasons[CRLReasons["certificateHold"] = 6] = "certificateHold";
    CRLReasons[CRLReasons["removeFromCRL"] = 8] = "removeFromCRL";
    CRLReasons[CRLReasons["privilegeWithdrawn"] = 9] = "privilegeWithdrawn";
    CRLReasons[CRLReasons["aACompromise"] = 10] = "aACompromise";
})(CRLReasons || (CRLReasons = {}));
let CRLReason = class CRLReason {
    constructor(reason = CRLReasons.unspecified) {
        this.reason = CRLReasons.unspecified;
        this.reason = reason;
    }
    toJSON() {
        return CRLReasons[this.reason];
    }
    toString() {
        return this.toJSON();
    }
};
__decorate([
    AsnProp({ type: AsnPropTypes.Enumerated })
], CRLReason.prototype, "reason", void 0);
CRLReason = __decorate([
    AsnType({ type: AsnTypeTypes.Choice })
], CRLReason);

const id_ce_extKeyUsage = `${id_ce}.37`;
let ExtendedKeyUsage = class ExtendedKeyUsage extends AsnArray {
};
ExtendedKeyUsage = __decorate([
    AsnType({ type: AsnTypeTypes.Sequence, itemType: AsnPropTypes.ObjectIdentifier })
], ExtendedKeyUsage);

const id_ce_inhibitAnyPolicy = `${id_ce}.54`;
let InhibitAnyPolicy = class InhibitAnyPolicy {
    constructor(value = new ArrayBuffer(0)) {
        this.value = value;
    }
};
__decorate([
    AsnProp({ type: AsnPropTypes.Integer, converter: AsnIntegerArrayBufferConverter })
], InhibitAnyPolicy.prototype, "value", void 0);
InhibitAnyPolicy = __decorate([
    AsnType({ type: AsnTypeTypes.Choice })
], InhibitAnyPolicy);

const id_ce_invalidityDate = `${id_ce}.24`;
let InvalidityDate = class InvalidityDate {
    constructor(value) {
        this.value = new Date();
        if (value) {
            this.value = value;
        }
    }
};
__decorate([
    AsnProp({ type: AsnPropTypes.GeneralizedTime })
], InvalidityDate.prototype, "value", void 0);
InvalidityDate = __decorate([
    AsnType({ type: AsnTypeTypes.Choice })
], InvalidityDate);

const id_ce_issuerAltName = `${id_ce}.18`;
let IssueAlternativeName = class IssueAlternativeName extends GeneralNames {
};
IssueAlternativeName = __decorate([
    AsnType({ type: AsnTypeTypes.Sequence })
], IssueAlternativeName);

const id_ce_keyUsage = `${id_ce}.15`;
var KeyUsageFlags;
(function (KeyUsageFlags) {
    KeyUsageFlags[KeyUsageFlags["digitalSignature"] = 1] = "digitalSignature";
    KeyUsageFlags[KeyUsageFlags["nonRepudiation"] = 2] = "nonRepudiation";
    KeyUsageFlags[KeyUsageFlags["keyEncipherment"] = 4] = "keyEncipherment";
    KeyUsageFlags[KeyUsageFlags["dataEncipherment"] = 8] = "dataEncipherment";
    KeyUsageFlags[KeyUsageFlags["keyAgreement"] = 16] = "keyAgreement";
    KeyUsageFlags[KeyUsageFlags["keyCertSign"] = 32] = "keyCertSign";
    KeyUsageFlags[KeyUsageFlags["cRLSign"] = 64] = "cRLSign";
    KeyUsageFlags[KeyUsageFlags["encipherOnly"] = 128] = "encipherOnly";
    KeyUsageFlags[KeyUsageFlags["decipherOnly"] = 256] = "decipherOnly";
})(KeyUsageFlags || (KeyUsageFlags = {}));
class KeyUsage extends BitString$1 {
    toJSON() {
        const flag = this.toNumber();
        const res = [];
        if (flag & KeyUsageFlags.cRLSign) {
            res.push("crlSign");
        }
        if (flag & KeyUsageFlags.dataEncipherment) {
            res.push("dataEncipherment");
        }
        if (flag & KeyUsageFlags.decipherOnly) {
            res.push("decipherOnly");
        }
        if (flag & KeyUsageFlags.digitalSignature) {
            res.push("digitalSignature");
        }
        if (flag & KeyUsageFlags.encipherOnly) {
            res.push("encipherOnly");
        }
        if (flag & KeyUsageFlags.keyAgreement) {
            res.push("keyAgreement");
        }
        if (flag & KeyUsageFlags.keyCertSign) {
            res.push("keyCertSign");
        }
        if (flag & KeyUsageFlags.keyEncipherment) {
            res.push("keyEncipherment");
        }
        if (flag & KeyUsageFlags.nonRepudiation) {
            res.push("nonRepudiation");
        }
        return res;
    }
    toString() {
        return `[${this.toJSON().join(", ")}]`;
    }
}

const id_ce_nameConstraints = `${id_ce}.30`;
class GeneralSubtree {
    constructor(params = {}) {
        this.base = new GeneralName();
        this.minimum = 0;
        Object.assign(this, params);
    }
}
__decorate([
    AsnProp({ type: GeneralName })
], GeneralSubtree.prototype, "base", void 0);
__decorate([
    AsnProp({ type: AsnPropTypes.Integer, context: 0, defaultValue: 0, implicit: true })
], GeneralSubtree.prototype, "minimum", void 0);
__decorate([
    AsnProp({ type: AsnPropTypes.Integer, context: 1, optional: true, implicit: true })
], GeneralSubtree.prototype, "maximum", void 0);
let GeneralSubtrees = class GeneralSubtrees extends AsnArray {
};
GeneralSubtrees = __decorate([
    AsnType({ type: AsnTypeTypes.Sequence, itemType: GeneralSubtree })
], GeneralSubtrees);
class NameConstraints {
    constructor(params = {}) {
        Object.assign(this, params);
    }
}
__decorate([
    AsnProp({ type: GeneralSubtrees, context: 0, optional: true, implicit: true })
], NameConstraints.prototype, "permittedSubtrees", void 0);
__decorate([
    AsnProp({ type: GeneralSubtrees, context: 1, optional: true, implicit: true })
], NameConstraints.prototype, "excludedSubtrees", void 0);

const id_ce_policyConstraints = `${id_ce}.36`;
class PolicyConstraints {
    constructor(params = {}) {
        Object.assign(this, params);
    }
}
__decorate([
    AsnProp({
        type: AsnPropTypes.Integer, context: 0, implicit: true, optional: true,
        converter: AsnIntegerArrayBufferConverter,
    })
], PolicyConstraints.prototype, "requireExplicitPolicy", void 0);
__decorate([
    AsnProp({
        type: AsnPropTypes.Integer, context: 1, implicit: true, optional: true,
        converter: AsnIntegerArrayBufferConverter,
    })
], PolicyConstraints.prototype, "inhibitPolicyMapping", void 0);

const id_ce_policyMappings = `${id_ce}.33`;
class PolicyMappings {
    constructor(params = {}) {
        this.issuerDomainPolicy = "";
        this.subjectDomainPolicy = "";
        Object.assign(this, params);
    }
}
__decorate([
    AsnProp({ type: AsnPropTypes.ObjectIdentifier })
], PolicyMappings.prototype, "issuerDomainPolicy", void 0);
__decorate([
    AsnProp({ type: AsnPropTypes.ObjectIdentifier })
], PolicyMappings.prototype, "subjectDomainPolicy", void 0);

const id_ce_subjectAltName = `${id_ce}.17`;
let SubjectAlternativeName = class SubjectAlternativeName extends GeneralNames {
};
SubjectAlternativeName = __decorate([
    AsnType({ type: AsnTypeTypes.Sequence })
], SubjectAlternativeName);

class Attribute {
    constructor(params = {}) {
        this.type = "";
        this.values = [];
        Object.assign(this, params);
    }
}
__decorate([
    AsnProp({ type: AsnPropTypes.ObjectIdentifier })
], Attribute.prototype, "type", void 0);
__decorate([
    AsnProp({ type: AsnPropTypes.Any, repeated: "set" })
], Attribute.prototype, "values", void 0);

const id_ce_subjectDirectoryAttributes = `${id_ce}.9`;
let SubjectDirectoryAttributes = class SubjectDirectoryAttributes extends AsnArray {
};
SubjectDirectoryAttributes = __decorate([
    AsnType({ type: AsnTypeTypes.Sequence, itemType: Attribute })
], SubjectDirectoryAttributes);

const id_ce_subjectKeyIdentifier = `${id_ce}.14`;
class SubjectKeyIdentifier extends KeyIdentifier {
}

class AlgorithmIdentifier {
    constructor(params = {}) {
        this.algorithm = "";
        Object.assign(this, params);
    }
}
__decorate([
    AsnProp({
        type: AsnPropTypes.ObjectIdentifier,
    })
], AlgorithmIdentifier.prototype, "algorithm", void 0);
__decorate([
    AsnProp({
        type: AsnPropTypes.Any,
        optional: true,
    })
], AlgorithmIdentifier.prototype, "parameters", void 0);

class SubjectPublicKeyInfo {
    constructor(params = {}) {
        this.algorithm = new AlgorithmIdentifier();
        this.subjectPublicKey = new ArrayBuffer(0);
        Object.assign(this, params);
    }
}
__decorate([
    AsnProp({ type: AlgorithmIdentifier })
], SubjectPublicKeyInfo.prototype, "algorithm", void 0);
__decorate([
    AsnProp({ type: AsnPropTypes.BitString })
], SubjectPublicKeyInfo.prototype, "subjectPublicKey", void 0);

let Time = class Time {
    constructor(time) {
        if (time) {
            if (typeof time === "string" || typeof time === "number") {
                this.utcTime = new Date(time);
            }
            else if (time instanceof Date) {
                this.utcTime = time;
            }
            else {
                Object.assign(this, time);
            }
        }
    }
    getTime() {
        const time = this.utcTime || this.generalTime;
        if (!time) {
            throw new Error("Cannot get time from CHOICE object");
        }
        return time;
    }
};
__decorate([
    AsnProp({
        type: AsnPropTypes.UTCTime,
    })
], Time.prototype, "utcTime", void 0);
__decorate([
    AsnProp({
        type: AsnPropTypes.GeneralizedTime,
    })
], Time.prototype, "generalTime", void 0);
Time = __decorate([
    AsnType({ type: AsnTypeTypes.Choice })
], Time);

class Validity {
    constructor(params) {
        this.notBefore = new Time(new Date());
        this.notAfter = new Time(new Date());
        if (params) {
            this.notBefore = new Time(params.notBefore);
            this.notAfter = new Time(params.notAfter);
        }
    }
}
__decorate([
    AsnProp({ type: Time })
], Validity.prototype, "notBefore", void 0);
__decorate([
    AsnProp({ type: Time })
], Validity.prototype, "notAfter", void 0);

class Extension {
    constructor(params = {}) {
        this.extnID = "";
        this.critical = Extension.CRITICAL;
        this.extnValue = new OctetString$1();
        Object.assign(this, params);
    }
}
Extension.CRITICAL = false;
__decorate([
    AsnProp({ type: AsnPropTypes.ObjectIdentifier })
], Extension.prototype, "extnID", void 0);
__decorate([
    AsnProp({
        type: AsnPropTypes.Boolean,
        defaultValue: Extension.CRITICAL,
    })
], Extension.prototype, "critical", void 0);
__decorate([
    AsnProp({ type: OctetString$1 })
], Extension.prototype, "extnValue", void 0);
let Extensions = class Extensions extends AsnArray {
};
Extensions = __decorate([
    AsnType({ type: AsnTypeTypes.Sequence, itemType: Extension })
], Extensions);

var Version;
(function (Version) {
    Version[Version["v1"] = 0] = "v1";
    Version[Version["v2"] = 1] = "v2";
    Version[Version["v3"] = 2] = "v3";
})(Version || (Version = {}));

class TBSCertificate {
    constructor(params = {}) {
        this.version = Version.v1;
        this.serialNumber = new ArrayBuffer(0);
        this.signature = new AlgorithmIdentifier();
        this.issuer = new Name();
        this.validity = new Validity();
        this.subject = new Name();
        this.subjectPublicKeyInfo = new SubjectPublicKeyInfo();
        Object.assign(this, params);
    }
}
__decorate([
    AsnProp({
        type: AsnPropTypes.Integer,
        context: 0,
        defaultValue: Version.v1,
    })
], TBSCertificate.prototype, "version", void 0);
__decorate([
    AsnProp({
        type: AsnPropTypes.Integer,
        converter: AsnIntegerArrayBufferConverter,
    })
], TBSCertificate.prototype, "serialNumber", void 0);
__decorate([
    AsnProp({ type: AlgorithmIdentifier })
], TBSCertificate.prototype, "signature", void 0);
__decorate([
    AsnProp({ type: Name })
], TBSCertificate.prototype, "issuer", void 0);
__decorate([
    AsnProp({ type: Validity })
], TBSCertificate.prototype, "validity", void 0);
__decorate([
    AsnProp({ type: Name })
], TBSCertificate.prototype, "subject", void 0);
__decorate([
    AsnProp({ type: SubjectPublicKeyInfo })
], TBSCertificate.prototype, "subjectPublicKeyInfo", void 0);
__decorate([
    AsnProp({
        type: AsnPropTypes.BitString,
        context: 1,
        implicit: true,
        optional: true,
    })
], TBSCertificate.prototype, "issuerUniqueID", void 0);
__decorate([
    AsnProp({ type: AsnPropTypes.BitString, context: 2, implicit: true, optional: true })
], TBSCertificate.prototype, "subjectUniqueID", void 0);
__decorate([
    AsnProp({ type: Extension, context: 3, optional: true, repeated: "sequence" })
], TBSCertificate.prototype, "extensions", void 0);

class Certificate {
    constructor(params = {}) {
        this.tbsCertificate = new TBSCertificate();
        this.signatureAlgorithm = new AlgorithmIdentifier();
        this.signatureValue = new ArrayBuffer(0);
        Object.assign(this, params);
    }
}
__decorate([
    AsnProp({ type: TBSCertificate })
], Certificate.prototype, "tbsCertificate", void 0);
__decorate([
    AsnProp({ type: AlgorithmIdentifier })
], Certificate.prototype, "signatureAlgorithm", void 0);
__decorate([
    AsnProp({ type: AsnPropTypes.BitString })
], Certificate.prototype, "signatureValue", void 0);

class RevokedCertificate {
    constructor(params = {}) {
        this.userCertificate = new ArrayBuffer(0);
        this.revocationDate = new Time();
        Object.assign(this, params);
    }
}
__decorate([
    AsnProp({ type: AsnPropTypes.Integer, converter: AsnIntegerArrayBufferConverter })
], RevokedCertificate.prototype, "userCertificate", void 0);
__decorate([
    AsnProp({ type: Time })
], RevokedCertificate.prototype, "revocationDate", void 0);
__decorate([
    AsnProp({ type: Extension, optional: true, repeated: "sequence" })
], RevokedCertificate.prototype, "crlEntryExtensions", void 0);
class TBSCertList {
    constructor(params = {}) {
        this.signature = new AlgorithmIdentifier();
        this.issuer = new Name();
        this.thisUpdate = new Time();
        Object.assign(this, params);
    }
}
__decorate([
    AsnProp({ type: AsnPropTypes.Integer, optional: true })
], TBSCertList.prototype, "version", void 0);
__decorate([
    AsnProp({ type: AlgorithmIdentifier })
], TBSCertList.prototype, "signature", void 0);
__decorate([
    AsnProp({ type: Name })
], TBSCertList.prototype, "issuer", void 0);
__decorate([
    AsnProp({ type: Time })
], TBSCertList.prototype, "thisUpdate", void 0);
__decorate([
    AsnProp({ type: Time, optional: true })
], TBSCertList.prototype, "nextUpdate", void 0);
__decorate([
    AsnProp({ type: RevokedCertificate, repeated: "sequence", optional: true })
], TBSCertList.prototype, "revokedCertificates", void 0);
__decorate([
    AsnProp({ type: Extension, optional: true, context: 0, repeated: "sequence" })
], TBSCertList.prototype, "crlExtensions", void 0);

class CertificateList {
    constructor(params = {}) {
        this.tbsCertList = new TBSCertList();
        this.signatureAlgorithm = new AlgorithmIdentifier();
        this.signature = new ArrayBuffer(0);
        Object.assign(this, params);
    }
}
__decorate([
    AsnProp({ type: TBSCertList })
], CertificateList.prototype, "tbsCertList", void 0);
__decorate([
    AsnProp({ type: AlgorithmIdentifier })
], CertificateList.prototype, "signatureAlgorithm", void 0);
__decorate([
    AsnProp({ type: AsnPropTypes.BitString })
], CertificateList.prototype, "signature", void 0);

const id_pkcs_1 = "1.2.840.113549.1.1";
const id_rsaEncryption = `${id_pkcs_1}.1`;
const id_RSAES_OAEP = `${id_pkcs_1}.7`;
const id_pSpecified = `${id_pkcs_1}.9`;
const id_RSASSA_PSS = `${id_pkcs_1}.10`;
const id_md2WithRSAEncryption = `${id_pkcs_1}.2`;
const id_md5WithRSAEncryption = `${id_pkcs_1}.4`;
const id_sha1WithRSAEncryption = `${id_pkcs_1}.5`;
const id_sha384WithRSAEncryption = `${id_pkcs_1}.12`;
const id_sha512WithRSAEncryption = `${id_pkcs_1}.13`;
const id_sha512_224WithRSAEncryption = `${id_pkcs_1}.15`;
const id_sha512_256WithRSAEncryption = `${id_pkcs_1}.16`;
const id_sha1 = "1.3.14.3.2.26";
const id_sha224 = "2.16.840.1.101.3.4.2.4";
const id_sha256 = "2.16.840.1.101.3.4.2.1";
const id_sha384 = "2.16.840.1.101.3.4.2.2";
const id_sha512 = "2.16.840.1.101.3.4.2.3";
const id_sha512_224 = "2.16.840.1.101.3.4.2.5";
const id_sha512_256 = "2.16.840.1.101.3.4.2.6";
const id_md2 = "1.2.840.113549.2.2";
const id_md5 = "1.2.840.113549.2.5";
const id_mgf1 = `${id_pkcs_1}.8`;

function create(algorithm) {
    return new AlgorithmIdentifier({ algorithm, parameters: null });
}
const md2 = create(id_md2);
const md4 = create(id_md5);
const sha1 = create(id_sha1);
const sha224 = create(id_sha224);
const sha256 = create(id_sha256);
const sha384 = create(id_sha384);
const sha512 = create(id_sha512);
const sha512_224 = create(id_sha512_224);
const sha512_256 = create(id_sha512_256);
const mgf1SHA1 = new AlgorithmIdentifier({
    algorithm: id_mgf1,
    parameters: AsnConvert.serialize(sha1),
});
const pSpecifiedEmpty = new AlgorithmIdentifier({
    algorithm: id_pSpecified,
    parameters: AsnConvert.serialize(AsnOctetStringConverter.toASN(new Uint8Array([0xda, 0x39, 0xa3, 0xee, 0x5e, 0x6b, 0x4b, 0x0d, 0x32, 0x55, 0xbf, 0xef, 0x95, 0x60, 0x18, 0x90, 0xaf, 0xd8, 0x07, 0x09]).buffer)),
});
const rsaEncryption = create(id_rsaEncryption);
const md2WithRSAEncryption = create(id_md2WithRSAEncryption);
const md5WithRSAEncryption = create(id_md5WithRSAEncryption);
const sha1WithRSAEncryption = create(id_sha1WithRSAEncryption);
const sha224WithRSAEncryption = create(id_sha512_224WithRSAEncryption);
const sha256WithRSAEncryption = create(id_sha512_256WithRSAEncryption);
const sha384WithRSAEncryption = create(id_sha384WithRSAEncryption);
const sha512WithRSAEncryption = create(id_sha512WithRSAEncryption);
const sha512_224WithRSAEncryption = create(id_sha512_224WithRSAEncryption);
const sha512_256WithRSAEncryption = create(id_sha512_256WithRSAEncryption);

class RsaEsOaepParams {
    constructor(params = {}) {
        this.hashAlgorithm = new AlgorithmIdentifier(sha1);
        this.maskGenAlgorithm = new AlgorithmIdentifier({
            algorithm: id_mgf1,
            parameters: AsnConvert.serialize(sha1),
        });
        this.pSourceAlgorithm = new AlgorithmIdentifier(pSpecifiedEmpty);
        Object.assign(this, params);
    }
}
__decorate([
    AsnProp({ type: AlgorithmIdentifier, context: 0, defaultValue: sha1 })
], RsaEsOaepParams.prototype, "hashAlgorithm", void 0);
__decorate([
    AsnProp({ type: AlgorithmIdentifier, context: 1, defaultValue: mgf1SHA1 })
], RsaEsOaepParams.prototype, "maskGenAlgorithm", void 0);
__decorate([
    AsnProp({ type: AlgorithmIdentifier, context: 2, defaultValue: pSpecifiedEmpty })
], RsaEsOaepParams.prototype, "pSourceAlgorithm", void 0);
const RSAES_OAEP = new AlgorithmIdentifier({
    algorithm: id_RSAES_OAEP,
    parameters: AsnConvert.serialize(new RsaEsOaepParams()),
});

class RsaSaPssParams {
    constructor(params = {}) {
        this.hashAlgorithm = new AlgorithmIdentifier(sha1);
        this.maskGenAlgorithm = new AlgorithmIdentifier({
            algorithm: id_mgf1,
            parameters: AsnConvert.serialize(sha1),
        });
        this.saltLength = 20;
        this.trailerField = 1;
        Object.assign(this, params);
    }
}
__decorate([
    AsnProp({ type: AlgorithmIdentifier, context: 0, defaultValue: sha1 })
], RsaSaPssParams.prototype, "hashAlgorithm", void 0);
__decorate([
    AsnProp({ type: AlgorithmIdentifier, context: 1, defaultValue: mgf1SHA1 })
], RsaSaPssParams.prototype, "maskGenAlgorithm", void 0);
__decorate([
    AsnProp({ type: AsnPropTypes.Integer, context: 2, defaultValue: 20 })
], RsaSaPssParams.prototype, "saltLength", void 0);
__decorate([
    AsnProp({ type: AsnPropTypes.Integer, context: 3, defaultValue: 1 })
], RsaSaPssParams.prototype, "trailerField", void 0);
const RSASSA_PSS = new AlgorithmIdentifier({
    algorithm: id_RSASSA_PSS,
    parameters: AsnConvert.serialize(new RsaSaPssParams()),
});

class DigestInfo {
    constructor(params = {}) {
        this.digestAlgorithm = new AlgorithmIdentifier();
        this.digest = new OctetString$1();
        Object.assign(this, params);
    }
}
__decorate([
    AsnProp({ type: AlgorithmIdentifier })
], DigestInfo.prototype, "digestAlgorithm", void 0);
__decorate([
    AsnProp({ type: OctetString$1 })
], DigestInfo.prototype, "digest", void 0);

class OtherPrimeInfo {
    constructor(params = {}) {
        this.prime = new ArrayBuffer(0);
        this.exponent = new ArrayBuffer(0);
        this.coefficient = new ArrayBuffer(0);
        Object.assign(this, params);
    }
}
__decorate([
    AsnProp({ type: AsnPropTypes.Integer, converter: AsnIntegerArrayBufferConverter })
], OtherPrimeInfo.prototype, "prime", void 0);
__decorate([
    AsnProp({ type: AsnPropTypes.Integer, converter: AsnIntegerArrayBufferConverter })
], OtherPrimeInfo.prototype, "exponent", void 0);
__decorate([
    AsnProp({ type: AsnPropTypes.Integer, converter: AsnIntegerArrayBufferConverter })
], OtherPrimeInfo.prototype, "coefficient", void 0);
let OtherPrimeInfos = class OtherPrimeInfos extends AsnArray {
};
OtherPrimeInfos = __decorate([
    AsnType({ type: AsnTypeTypes.Sequence, itemType: OtherPrimeInfo })
], OtherPrimeInfos);

class RSAPrivateKey {
    constructor(params = {}) {
        this.version = 0;
        this.modulus = new ArrayBuffer(0);
        this.publicExponent = new ArrayBuffer(0);
        this.privateExponent = new ArrayBuffer(0);
        this.prime1 = new ArrayBuffer(0);
        this.prime2 = new ArrayBuffer(0);
        this.exponent1 = new ArrayBuffer(0);
        this.exponent2 = new ArrayBuffer(0);
        this.coefficient = new ArrayBuffer(0);
        Object.assign(this, params);
    }
}
__decorate([
    AsnProp({ type: AsnPropTypes.Integer })
], RSAPrivateKey.prototype, "version", void 0);
__decorate([
    AsnProp({ type: AsnPropTypes.Integer, converter: AsnIntegerArrayBufferConverter })
], RSAPrivateKey.prototype, "modulus", void 0);
__decorate([
    AsnProp({ type: AsnPropTypes.Integer, converter: AsnIntegerArrayBufferConverter })
], RSAPrivateKey.prototype, "publicExponent", void 0);
__decorate([
    AsnProp({ type: AsnPropTypes.Integer, converter: AsnIntegerArrayBufferConverter })
], RSAPrivateKey.prototype, "privateExponent", void 0);
__decorate([
    AsnProp({ type: AsnPropTypes.Integer, converter: AsnIntegerArrayBufferConverter })
], RSAPrivateKey.prototype, "prime1", void 0);
__decorate([
    AsnProp({ type: AsnPropTypes.Integer, converter: AsnIntegerArrayBufferConverter })
], RSAPrivateKey.prototype, "prime2", void 0);
__decorate([
    AsnProp({ type: AsnPropTypes.Integer, converter: AsnIntegerArrayBufferConverter })
], RSAPrivateKey.prototype, "exponent1", void 0);
__decorate([
    AsnProp({ type: AsnPropTypes.Integer, converter: AsnIntegerArrayBufferConverter })
], RSAPrivateKey.prototype, "exponent2", void 0);
__decorate([
    AsnProp({ type: AsnPropTypes.Integer, converter: AsnIntegerArrayBufferConverter })
], RSAPrivateKey.prototype, "coefficient", void 0);
__decorate([
    AsnProp({ type: OtherPrimeInfos, optional: true })
], RSAPrivateKey.prototype, "otherPrimeInfos", void 0);

class RSAPublicKey {
    constructor(params = {}) {
        this.modulus = new ArrayBuffer(0);
        this.publicExponent = new ArrayBuffer(0);
        Object.assign(this, params);
    }
}
__decorate([
    AsnProp({ type: AsnPropTypes.Integer, converter: AsnIntegerArrayBufferConverter })
], RSAPublicKey.prototype, "modulus", void 0);
__decorate([
    AsnProp({ type: AsnPropTypes.Integer, converter: AsnIntegerArrayBufferConverter })
], RSAPublicKey.prototype, "publicExponent", void 0);

var dayjs_min = createCommonjsModule(function (module, exports) {
!function(t,e){module.exports=e();}(commonjsGlobal,function(){var t="millisecond",e="second",n="minute",r="hour",i="day",s="week",u="month",a="quarter",o="year",h=/^(\d{4})-?(\d{1,2})?-?(\d{0,2})[^0-9]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?.?(\d{1,3})?$/,f=/\[([^\]]+)]|Y{2,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,c=function(t,e,n){var r=String(t);return !r||r.length>=e?t:""+Array(e+1-r.length).join(n)+t},d={s:c,z:function(t){var e=-t.utcOffset(),n=Math.abs(e),r=Math.floor(n/60),i=n%60;return (e<=0?"+":"-")+c(r,2,"0")+":"+c(i,2,"0")},m:function(t,e){var n=12*(e.year()-t.year())+(e.month()-t.month()),r=t.clone().add(n,u),i=e-r<0,s=t.clone().add(n+(i?-1:1),u);return Number(-(n+(e-r)/(i?r-s:s-r))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(h){return {M:u,y:o,w:s,d:i,D:"date",h:r,m:n,s:e,ms:t,Q:a}[h]||String(h||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}},$={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_")},l="en",m={};m[l]=$;var y=function(t){return t instanceof v},M=function(t,e,n){var r;if(!t)return l;if("string"==typeof t)m[t]&&(r=t),e&&(m[t]=e,r=t);else {var i=t.name;m[i]=t,r=i;}return !n&&r&&(l=r),r||!n&&l},g=function(t,e){if(y(t))return t.clone();var n="object"==typeof e?e:{};return n.date=t,n.args=arguments,new v(n)},D=d;D.l=M,D.i=y,D.w=function(t,e){return g(t,{locale:e.$L,utc:e.$u,$offset:e.$offset})};var v=function(){function c(t){this.$L=this.$L||M(t.locale,null,!0),this.parse(t);}var d=c.prototype;return d.parse=function(t){this.$d=function(t){var e=t.date,n=t.utc;if(null===e)return new Date(NaN);if(D.u(e))return new Date;if(e instanceof Date)return new Date(e);if("string"==typeof e&&!/Z$/i.test(e)){var r=e.match(h);if(r){var i=r[2]-1||0;return n?new Date(Date.UTC(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,r[7]||0)):new Date(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,r[7]||0)}}return new Date(e)}(t),this.init();},d.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds();},d.$utils=function(){return D},d.isValid=function(){return !("Invalid Date"===this.$d.toString())},d.isSame=function(t,e){var n=g(t);return this.startOf(e)<=n&&n<=this.endOf(e)},d.isAfter=function(t,e){return g(t)<this.startOf(e)},d.isBefore=function(t,e){return this.endOf(e)<g(t)},d.$g=function(t,e,n){return D.u(t)?this[e]:this.set(n,t)},d.year=function(t){return this.$g(t,"$y",o)},d.month=function(t){return this.$g(t,"$M",u)},d.day=function(t){return this.$g(t,"$W",i)},d.date=function(t){return this.$g(t,"$D","date")},d.hour=function(t){return this.$g(t,"$H",r)},d.minute=function(t){return this.$g(t,"$m",n)},d.second=function(t){return this.$g(t,"$s",e)},d.millisecond=function(e){return this.$g(e,"$ms",t)},d.unix=function(){return Math.floor(this.valueOf()/1e3)},d.valueOf=function(){return this.$d.getTime()},d.startOf=function(t,a){var h=this,f=!!D.u(a)||a,c=D.p(t),d=function(t,e){var n=D.w(h.$u?Date.UTC(h.$y,e,t):new Date(h.$y,e,t),h);return f?n:n.endOf(i)},$=function(t,e){return D.w(h.toDate()[t].apply(h.toDate("s"),(f?[0,0,0,0]:[23,59,59,999]).slice(e)),h)},l=this.$W,m=this.$M,y=this.$D,M="set"+(this.$u?"UTC":"");switch(c){case o:return f?d(1,0):d(31,11);case u:return f?d(1,m):d(0,m+1);case s:var g=this.$locale().weekStart||0,v=(l<g?l+7:l)-g;return d(f?y-v:y+(6-v),m);case i:case"date":return $(M+"Hours",0);case r:return $(M+"Minutes",1);case n:return $(M+"Seconds",2);case e:return $(M+"Milliseconds",3);default:return this.clone()}},d.endOf=function(t){return this.startOf(t,!1)},d.$set=function(s,a){var h,f=D.p(s),c="set"+(this.$u?"UTC":""),d=(h={},h[i]=c+"Date",h.date=c+"Date",h[u]=c+"Month",h[o]=c+"FullYear",h[r]=c+"Hours",h[n]=c+"Minutes",h[e]=c+"Seconds",h[t]=c+"Milliseconds",h)[f],$=f===i?this.$D+(a-this.$W):a;if(f===u||f===o){var l=this.clone().set("date",1);l.$d[d]($),l.init(),this.$d=l.set("date",Math.min(this.$D,l.daysInMonth())).$d;}else d&&this.$d[d]($);return this.init(),this},d.set=function(t,e){return this.clone().$set(t,e)},d.get=function(t){return this[D.p(t)]()},d.add=function(t,a){var h,f=this;t=Number(t);var c=D.p(a),d=function(e){var n=g(f);return D.w(n.date(n.date()+Math.round(e*t)),f)};if(c===u)return this.set(u,this.$M+t);if(c===o)return this.set(o,this.$y+t);if(c===i)return d(1);if(c===s)return d(7);var $=(h={},h[n]=6e4,h[r]=36e5,h[e]=1e3,h)[c]||1,l=this.$d.getTime()+t*$;return D.w(l,this)},d.subtract=function(t,e){return this.add(-1*t,e)},d.format=function(t){var e=this;if(!this.isValid())return "Invalid Date";var n=t||"YYYY-MM-DDTHH:mm:ssZ",r=D.z(this),i=this.$locale(),s=this.$H,u=this.$m,a=this.$M,o=i.weekdays,h=i.months,c=function(t,r,i,s){return t&&(t[r]||t(e,n))||i[r].substr(0,s)},d=function(t){return D.s(s%12||12,t,"0")},$=i.meridiem||function(t,e,n){var r=t<12?"AM":"PM";return n?r.toLowerCase():r},l={YY:String(this.$y).slice(-2),YYYY:this.$y,M:a+1,MM:D.s(a+1,2,"0"),MMM:c(i.monthsShort,a,h,3),MMMM:c(h,a),D:this.$D,DD:D.s(this.$D,2,"0"),d:String(this.$W),dd:c(i.weekdaysMin,this.$W,o,2),ddd:c(i.weekdaysShort,this.$W,o,3),dddd:o[this.$W],H:String(s),HH:D.s(s,2,"0"),h:d(1),hh:d(2),a:$(s,u,!0),A:$(s,u,!1),m:String(u),mm:D.s(u,2,"0"),s:String(this.$s),ss:D.s(this.$s,2,"0"),SSS:D.s(this.$ms,3,"0"),Z:r};return n.replace(f,function(t,e){return e||l[t]||r.replace(":","")})},d.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},d.diff=function(t,h,f){var c,d=D.p(h),$=g(t),l=6e4*($.utcOffset()-this.utcOffset()),m=this-$,y=D.m(this,$);return y=(c={},c[o]=y/12,c[u]=y,c[a]=y/3,c[s]=(m-l)/6048e5,c[i]=(m-l)/864e5,c[r]=m/36e5,c[n]=m/6e4,c[e]=m/1e3,c)[d]||m,f?y:D.a(y)},d.daysInMonth=function(){return this.endOf(u).$D},d.$locale=function(){return m[this.$L]},d.locale=function(t,e){if(!t)return this.$L;var n=this.clone(),r=M(t,e,!0);return r&&(n.$L=r),n},d.clone=function(){return D.w(this.$d,this)},d.toDate=function(){return new Date(this.valueOf())},d.toJSON=function(){return this.isValid()?this.toISOString():null},d.toISOString=function(){return this.$d.toISOString()},d.toString=function(){return this.$d.toUTCString()},c}();return g.prototype=v.prototype,g.extend=function(t,e){return t(e,v,g),g},g.locale=M,g.isDayjs=y,g.unix=function(t){return g(1e3*t)},g.en=m[l],g.Ls=m,g});
});

const short = (date) => (new Date(date).toUTCString());
const diff = (dateStart, dateEnd) => {
    if (!dateStart || !dateEnd) {
        return '';
    }
    const start = dayjs_min(dateStart);
    const end = dayjs_min(dateEnd);
    const ending = (value) => value === 1 ? '' : 's';
    const diffYears = end.diff(start, 'year', true);
    if (Number.isInteger(diffYears)) {
        return `${diffYears} year${ending(diffYears)}`;
    }
    const diffMonth = end.diff(start, 'month', true);
    if (Number.isInteger(diffMonth)) {
        return `${diffMonth} month${ending(diffMonth)}`;
    }
    const diffDays = end.diff(start, 'day');
    return `${diffDays} day${ending(diffDays)}`;
};

const validator = {
    isHex: (value) => /^\s*(?:[0-9A-Fa-f][0-9A-Fa-f]\s*)+$/
        .test(value),
    isPem: (value) => /-----BEGIN [^-]+-----([A-Za-z0-9+\/=\s]+)-----END [^-]+-----|begin-base64[^\n]+\n([A-Za-z0-9+\/=\s]+)====/
        .test(value),
    isBase64: (value) => /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/
        .test(value),
};

class CryptoProvider {
    constructor() {
        this.providers = new Map();
        if (typeof crypto !== 'undefined') {
            this.set(CryptoProvider.DEFAULT, crypto);
        }
    }
    static isCryptoKeyPair(data) {
        return data && data.privateKey && data.publicKey;
    }
    get(key = CryptoProvider.DEFAULT) {
        const crypto = this.providers.get(key.toLowerCase());
        if (!crypto) {
            throw new Error(`Cannot get Crypto by name '${key}'`);
        }
        return crypto;
    }
    set(key, value) {
        if (typeof key === 'string') {
            if (!value) {
                throw new TypeError("Argument 'value' is required");
            }
            this.providers.set(key.toLowerCase(), value);
        }
        else {
            this.providers.set(CryptoProvider.DEFAULT, key);
        }
        return this;
    }
}
CryptoProvider.DEFAULT = 'default';
const cryptoProvider = new CryptoProvider();

var __classPrivateFieldSet = (undefined && undefined.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var __classPrivateFieldGet = (undefined && undefined.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _asn;
const names = {
    '2.5.4.3': 'CN',
    '2.5.4.6': 'C',
    '0.9.2342.19200300.100.1.25': 'DC',
    '1.2.840.113549.1.9.1': 'E',
    '2.5.4.42': 'G',
    '2.5.4.43': 'I',
    '2.5.4.7': 'L',
    '2.5.4.10': 'O',
    '2.5.4.11': 'OU',
    '2.5.4.8': 'ST',
    '2.5.4.4': 'SN',
    '2.5.4.12': 'T',
    '2.5.4.15': 'businessCategory',
    '1.3.6.1.4.1.311.60.2.1.3': 'jurisdictionCountry',
    '2.5.4.5': 'serialNumber',
    '2.5.4.97': 'OI',
};
class Name$1 {
    constructor(data) {
        _asn.set(this, new Name());
        __classPrivateFieldSet(this, _asn, data instanceof Name
            ? data
            : AsnConvert.parse(data, Name));
    }
    toJSON() {
        const res = [];
        __classPrivateFieldGet(this, _asn).forEach(o => (o.forEach((a) => {
            res.push({
                type: a.type,
                name: names[a.type],
                value: a.value.toString(),
            });
        })));
        return res;
    }
}
_asn = new WeakMap();

var PredefinedBiometricType;
(function (PredefinedBiometricType) {
    PredefinedBiometricType[PredefinedBiometricType["picture"] = 0] = "picture";
    PredefinedBiometricType[PredefinedBiometricType["handwrittenSignature"] = 1] = "handwrittenSignature";
})(PredefinedBiometricType || (PredefinedBiometricType = {}));
let TypeOfBiometricData = class TypeOfBiometricData {
    constructor(params = {}) {
        Object.assign(this, params);
    }
};
__decorate([
    AsnProp({ type: AsnPropTypes.Integer })
], TypeOfBiometricData.prototype, "predefinedBiometricType", void 0);
__decorate([
    AsnProp({ type: AsnPropTypes.ObjectIdentifier })
], TypeOfBiometricData.prototype, "biometricDataOid", void 0);
TypeOfBiometricData = __decorate([
    AsnType({ type: AsnTypeTypes.Choice })
], TypeOfBiometricData);
class BiometricData {
    constructor(params = {}) {
        this.typeOfBiometricData = new TypeOfBiometricData();
        this.hashAlgorithm = new AlgorithmIdentifier();
        this.biometricDataHash = new OctetString$1();
        Object.assign(this, params);
    }
}
__decorate([
    AsnProp({ type: TypeOfBiometricData })
], BiometricData.prototype, "typeOfBiometricData", void 0);
__decorate([
    AsnProp({ type: AlgorithmIdentifier })
], BiometricData.prototype, "hashAlgorithm", void 0);
__decorate([
    AsnProp({ type: OctetString$1 })
], BiometricData.prototype, "biometricDataHash", void 0);
__decorate([
    AsnProp({ type: AsnPropTypes.IA5String, optional: true })
], BiometricData.prototype, "sourceDataUri", void 0);
let BiometricSyntax = class BiometricSyntax extends AsnArray {
};
BiometricSyntax = __decorate([
    AsnType({ type: AsnTypeTypes.Sequence, itemType: BiometricData })
], BiometricSyntax);

const id_pe_qcStatements = `${id_pe}.3`;
class QCStatement {
    constructor() {
        this.statementId = "";
        this.statementInfo = new ArrayBuffer(0);
    }
}
__decorate([
    AsnProp({ type: AsnPropTypes.ObjectIdentifier })
], QCStatement.prototype, "statementId", void 0);
__decorate([
    AsnProp({ type: AsnPropTypes.Any, optional: true })
], QCStatement.prototype, "statementInfo", void 0);
let NameRegistrationAuthorities = class NameRegistrationAuthorities extends AsnArray {
};
NameRegistrationAuthorities = __decorate([
    AsnType({ type: AsnTypeTypes.Sequence, itemType: GeneralName })
], NameRegistrationAuthorities);
class SemanticsInformation {
    constructor(params = {}) {
        Object.assign(this, params);
    }
}
__decorate([
    AsnProp({ type: AsnPropTypes.ObjectIdentifier, optional: true })
], SemanticsInformation.prototype, "semanticsIdentifier", void 0);
__decorate([
    AsnProp({ type: NameRegistrationAuthorities, optional: true })
], SemanticsInformation.prototype, "nameRegistrationAuthorities", void 0);
let QCStatements = class QCStatements extends AsnArray {
};
QCStatements = __decorate([
    AsnType({ type: AsnTypeTypes.Sequence, itemType: QCStatement })
], QCStatements);

let PlaceOfBirth = class PlaceOfBirth extends DirectoryString {
};
PlaceOfBirth = __decorate([
    AsnType({ type: AsnTypeTypes.Choice })
], PlaceOfBirth);
var Gender;
(function (Gender) {
    Gender["M"] = "M";
    Gender["F"] = "F";
    Gender["m"] = "m";
    Gender["f"] = "f";
})(Gender || (Gender = {}));

let CertificateApplicationPolicies = class CertificateApplicationPolicies extends CertificatePolicies {
};
CertificateApplicationPolicies = __decorate([
    AsnType({ type: AsnTypeTypes.Sequence })
], CertificateApplicationPolicies);

const id_certificateTemplate = "1.3.6.1.4.1.311.21.7";
class CertificateTemplate {
    constructor(params = {}) {
        this.templateID = "";
        this.templateMajorVersion = 0;
        this.templateMinorVersion = 0;
        Object.assign(this, params);
    }
}
__decorate([
    AsnProp({ type: AsnPropTypes.ObjectIdentifier })
], CertificateTemplate.prototype, "templateID", void 0);
__decorate([
    AsnProp({ type: AsnPropTypes.Integer })
], CertificateTemplate.prototype, "templateMajorVersion", void 0);
__decorate([
    AsnProp({ type: AsnPropTypes.Integer })
], CertificateTemplate.prototype, "templateMinorVersion", void 0);

const id_enrollCertType = "1.3.6.1.4.1.311.20.2";
class EnrollCertType {
    constructor(params = {}) {
        this.name = "";
        Object.assign(this, params);
    }
}
__decorate([
    AsnProp({ type: AsnPropTypes.Utf8String })
], EnrollCertType.prototype, "name", void 0);
let EnrollCertTypeChoice = class EnrollCertTypeChoice {
    constructor(params = {}) {
        Object.assign(this, params);
    }
};
__decorate([
    AsnProp({ type: AsnPropTypes.BmpString })
], EnrollCertTypeChoice.prototype, "name", void 0);
__decorate([
    AsnProp({ type: EnrollCertType })
], EnrollCertTypeChoice.prototype, "spec", void 0);
EnrollCertTypeChoice = __decorate([
    AsnType({ type: AsnTypeTypes.Choice })
], EnrollCertTypeChoice);

const id_caVersion = "1.3.6.1.4.1.311.21.1";
let CaVersion = class CaVersion {
    constructor() {
        this.value = new ArrayBuffer(0);
    }
    toString() {
        const version = this.getVersion();
        return `V${version.certificateIndex}.${version.keyIndex}`;
    }
    getVersion() {
        let data = new Uint8Array(this.value);
        if (this.value.byteLength < 4) {
            data = new Uint8Array(4);
            data.set(new Uint8Array(this.value), 4 - this.value.byteLength);
        }
        return {
            keyIndex: parseInt(Convert.ToHex(data.slice(0, 2)), 16),
            certificateIndex: parseInt(Convert.ToHex(data.slice(2)), 16),
        };
    }
};
__decorate([
    AsnProp({ type: AsnPropTypes.Integer, converter: AsnIntegerArrayBufferConverter })
], CaVersion.prototype, "value", void 0);
CaVersion = __decorate([
    AsnType({ type: AsnTypeTypes.Choice })
], CaVersion);

let AnyString = class AnyString {
    constructor(params = {}) {
        Object.assign(this, params);
    }
};
__decorate([
    AsnProp({ type: AsnPropTypes.NumericString })
], AnyString.prototype, "numericString", void 0);
__decorate([
    AsnProp({ type: AsnPropTypes.PrintableString })
], AnyString.prototype, "printableString", void 0);
__decorate([
    AsnProp({ type: AsnPropTypes.TeletexString })
], AnyString.prototype, "teletexString", void 0);
__decorate([
    AsnProp({ type: AsnPropTypes.VideotexString })
], AnyString.prototype, "videotexString", void 0);
__decorate([
    AsnProp({ type: AsnPropTypes.IA5String })
], AnyString.prototype, "ia5String", void 0);
__decorate([
    AsnProp({ type: AsnPropTypes.GraphicString })
], AnyString.prototype, "graphicString", void 0);
__decorate([
    AsnProp({ type: AsnPropTypes.VisibleString })
], AnyString.prototype, "visibleString", void 0);
__decorate([
    AsnProp({ type: AsnPropTypes.GeneralString })
], AnyString.prototype, "generalString", void 0);
__decorate([
    AsnProp({ type: AsnPropTypes.UniversalString })
], AnyString.prototype, "universalString", void 0);
__decorate([
    AsnProp({ type: AsnPropTypes.BmpString })
], AnyString.prototype, "bmpString", void 0);
AnyString = __decorate([
    AsnType({ type: AsnTypeTypes.Choice })
], AnyString);

let ArchivedKey = class ArchivedKey {
    constructor(value = new ArrayBuffer(0)) {
        this.value = value;
    }
};
__decorate([
    AsnProp({ type: AsnPropTypes.Any })
], ArchivedKey.prototype, "value", void 0);
ArchivedKey = __decorate([
    AsnType({ type: AsnTypeTypes.Choice })
], ArchivedKey);

let CertExtensions = class CertExtensions extends Extensions {
};
CertExtensions = __decorate([
    AsnType({ type: AsnTypeTypes.Sequence })
], CertExtensions);

class CSPProvider {
    constructor(params = {}) {
        this.keySpec = 0;
        this.cspName = "";
        this.signature = new ArrayBuffer(0);
        Object.assign(this, params);
    }
}
__decorate([
    AsnProp({ type: AsnPropTypes.Integer })
], CSPProvider.prototype, "keySpec", void 0);
__decorate([
    AsnProp({ type: AsnPropTypes.BmpString })
], CSPProvider.prototype, "cspName", void 0);
__decorate([
    AsnProp({ type: AsnPropTypes.BitString })
], CSPProvider.prototype, "signature", void 0);

let AttestationIdentityKeyInfo = class AttestationIdentityKeyInfo extends AsnArray {
};
AttestationIdentityKeyInfo = __decorate([
    AsnType({ type: AsnTypeTypes.Sequence, itemType: AsnPropTypes.Any })
], AttestationIdentityKeyInfo);

let EndorsementKeyInfo = class EndorsementKeyInfo extends AsnArray {
};
EndorsementKeyInfo = __decorate([
    AsnType({ type: AsnTypeTypes.Sequence, itemType: AsnPropTypes.Any })
], EndorsementKeyInfo);

class EnrollmentNameValuePair {
    constructor(params = {}) {
        this.name = "";
        this.value = "";
        Object.assign(this, params);
    }
}
__decorate([
    AsnProp({ type: AsnPropTypes.BmpString })
], EnrollmentNameValuePair.prototype, "name", void 0);
__decorate([
    AsnProp({ type: AsnPropTypes.BmpString })
], EnrollmentNameValuePair.prototype, "value", void 0);
let EnrollmentNameValuePairs = class EnrollmentNameValuePairs extends AsnArray {
};
EnrollmentNameValuePairs = __decorate([
    AsnType({ type: AsnTypeTypes.Sequence, itemType: EnrollmentNameValuePair })
], EnrollmentNameValuePairs);

let NTPrincipalName = class NTPrincipalName extends OtherName {
};
NTPrincipalName = __decorate([
    AsnType({ type: AsnTypeTypes.Sequence })
], NTPrincipalName);

let NTDSReplication = class NTDSReplication extends OtherName {
};
NTDSReplication = __decorate([
    AsnType({ type: AsnTypeTypes.Sequence })
], NTDSReplication);

let RenewalCertificate = class RenewalCertificate extends Certificate {
};
RenewalCertificate = __decorate([
    AsnType({ type: AsnTypeTypes.Sequence })
], RenewalCertificate);

class RequestClientInfo {
    constructor(params = {}) {
        this.clientId = 0;
        this.machineName = "";
        this.userName = "";
        this.processName = "";
        Object.assign(this, params);
    }
}
__decorate([
    AsnProp({ type: AsnPropTypes.Integer })
], RequestClientInfo.prototype, "clientId", void 0);
__decorate([
    AsnProp({ type: AsnPropTypes.Utf8String })
], RequestClientInfo.prototype, "machineName", void 0);
__decorate([
    AsnProp({ type: AsnPropTypes.Utf8String })
], RequestClientInfo.prototype, "userName", void 0);
__decorate([
    AsnProp({ type: AsnPropTypes.Utf8String })
], RequestClientInfo.prototype, "processName", void 0);

const id_netscape = "2.16.840.1.113730";
const id_netscapeCertExtension = `${id_netscape}.1`;

let NetscapeBaseUrl = class NetscapeBaseUrl {
    constructor(value) {
        this.value = "";
        if (value) {
            this.value = value;
        }
    }
};
__decorate([
    AsnProp({ type: AsnPropTypes.IA5String })
], NetscapeBaseUrl.prototype, "value", void 0);
NetscapeBaseUrl = __decorate([
    AsnType({ type: AsnTypeTypes.Choice })
], NetscapeBaseUrl);

let NetscapeCaPolicyUrl = class NetscapeCaPolicyUrl {
    constructor(value) {
        this.value = "";
        if (value) {
            this.value = value;
        }
    }
};
__decorate([
    AsnProp({ type: AsnPropTypes.IA5String })
], NetscapeCaPolicyUrl.prototype, "value", void 0);
NetscapeCaPolicyUrl = __decorate([
    AsnType({ type: AsnTypeTypes.Choice })
], NetscapeCaPolicyUrl);

let NetscapeCaRevocationUrl = class NetscapeCaRevocationUrl {
    constructor(value) {
        this.value = "";
        if (value) {
            this.value = value;
        }
    }
};
__decorate([
    AsnProp({ type: AsnPropTypes.IA5String })
], NetscapeCaRevocationUrl.prototype, "value", void 0);
NetscapeCaRevocationUrl = __decorate([
    AsnType({ type: AsnTypeTypes.Choice })
], NetscapeCaRevocationUrl);

let NetscapeCertRenewUrl = class NetscapeCertRenewUrl {
    constructor(value) {
        this.value = "";
        if (value) {
            this.value = value;
        }
    }
};
__decorate([
    AsnProp({ type: AsnPropTypes.IA5String })
], NetscapeCertRenewUrl.prototype, "value", void 0);
NetscapeCertRenewUrl = __decorate([
    AsnType({ type: AsnTypeTypes.Choice })
], NetscapeCertRenewUrl);

const id_netscapeCertType = `${id_netscapeCertExtension}.1`;
var NetscapeCertTypeFlags;
(function (NetscapeCertTypeFlags) {
    NetscapeCertTypeFlags[NetscapeCertTypeFlags["sslClient"] = 1] = "sslClient";
    NetscapeCertTypeFlags[NetscapeCertTypeFlags["sslServer"] = 2] = "sslServer";
    NetscapeCertTypeFlags[NetscapeCertTypeFlags["sMime"] = 4] = "sMime";
    NetscapeCertTypeFlags[NetscapeCertTypeFlags["objectSigning"] = 8] = "objectSigning";
    NetscapeCertTypeFlags[NetscapeCertTypeFlags["sslCa"] = 32] = "sslCa";
    NetscapeCertTypeFlags[NetscapeCertTypeFlags["sMimeCa"] = 64] = "sMimeCa";
    NetscapeCertTypeFlags[NetscapeCertTypeFlags["objectSigningCa"] = 128] = "objectSigningCa";
})(NetscapeCertTypeFlags || (NetscapeCertTypeFlags = {}));
class NetscapeCertType extends BitString$1 {
    toJSON() {
        const flag = this.toNumber();
        const res = [];
        if (flag & NetscapeCertTypeFlags.objectSigning) {
            res.push("objectSigning");
        }
        if (flag & NetscapeCertTypeFlags.objectSigningCa) {
            res.push("objectSigningCa");
        }
        if (flag & NetscapeCertTypeFlags.sMime) {
            res.push("sMime");
        }
        if (flag & NetscapeCertTypeFlags.sMimeCa) {
            res.push("sMimeCa");
        }
        if (flag & NetscapeCertTypeFlags.sslCa) {
            res.push("sslCa");
        }
        if (flag & NetscapeCertTypeFlags.sslClient) {
            res.push("sslClient");
        }
        if (flag & NetscapeCertTypeFlags.sslServer) {
            res.push("sslServer");
        }
        return res;
    }
    toString() {
        return `[${this.toJSON().join(", ")}]`;
    }
}

const id_netscapeComment = `${id_netscapeCertExtension}.13`;
let NetscapeComment = class NetscapeComment {
    constructor(value) {
        this.value = "";
        if (value) {
            this.value = value;
        }
    }
};
__decorate([
    AsnProp({ type: AsnPropTypes.IA5String })
], NetscapeComment.prototype, "value", void 0);
NetscapeComment = __decorate([
    AsnType({ type: AsnTypeTypes.Choice })
], NetscapeComment);

let NetscapeRevocationUrl = class NetscapeRevocationUrl {
    constructor(value) {
        this.value = "";
        if (value) {
            this.value = value;
        }
    }
};
__decorate([
    AsnProp({ type: AsnPropTypes.IA5String })
], NetscapeRevocationUrl.prototype, "value", void 0);
NetscapeRevocationUrl = __decorate([
    AsnType({ type: AsnTypeTypes.Choice })
], NetscapeRevocationUrl);

let NetscapeSSLServerName = class NetscapeSSLServerName {
    constructor(value) {
        this.value = "";
        if (value) {
            this.value = value;
        }
    }
};
__decorate([
    AsnProp({ type: AsnPropTypes.IA5String })
], NetscapeSSLServerName.prototype, "value", void 0);
NetscapeSSLServerName = __decorate([
    AsnType({ type: AsnTypeTypes.Choice })
], NetscapeSSLServerName);

const id_lei = "1.3.6.1.4.1.52266.1";
let Lei = class Lei {
    constructor(params = {}) {
        this.leiCode = "";
        Object.assign(this, params);
    }
};
__decorate([
    AsnProp({ type: PrintableString })
], Lei.prototype, "leiCode", void 0);
__decorate([
    AsnProp({ type: PrintableString, context: 0, optional: true })
], Lei.prototype, "leiRole", void 0);
Lei = __decorate([
    AsnType({ type: AsnTypeTypes.Sequence })
], Lei);
let LeiChoice = class LeiChoice {
    constructor(value) {
        if (typeof value === "string") {
            this.text = value;
        }
        else if (value instanceof Lei) {
            this.struct = value;
        }
    }
};
__decorate([
    AsnProp({ type: AsnPropTypes.Utf8String })
], LeiChoice.prototype, "text", void 0);
__decorate([
    AsnProp({ type: Lei })
], LeiChoice.prototype, "struct", void 0);
LeiChoice = __decorate([
    AsnType({ type: AsnTypeTypes.Choice })
], LeiChoice);
const id_lei_roles = "1.3.6.1.4.1.52266.2";
let LeiRoles = class LeiRoles {
    constructor(value) {
        this.text = "";
        if (value) {
            this.text = value;
        }
    }
};
__decorate([
    AsnProp({ type: AsnPropTypes.Utf8String })
], LeiRoles.prototype, "text", void 0);
LeiRoles = __decorate([
    AsnType({ type: AsnTypeTypes.Choice })
], LeiRoles);

class ByteStream {
    constructor(bytes) {
        this.offset = 0;
        this.view = BufferSourceConverter.toUint8Array(bytes);
    }
    get position() {
        return this.offset;
    }
    read(size = 1) {
        const res = this.view.slice(this.offset, this.offset + size);
        this.offset = this.offset + res.length;
        return res;
    }
    readByte() {
        const bytes = this.read();
        if (!bytes.length) {
            throw new Error("End of stream");
        }
        return bytes[0];
    }
    readNumber(size) {
        const bytes = this.read(size);
        const hex = Convert.ToHex(bytes);
        return parseInt(hex, 16);
    }
    readEnd() {
        return this.read(this.view.length - this.offset);
    }
    reset() {
        this.offset = 0;
    }
}

class Structure {
    static createStream(bytes) {
        const view = BufferSourceConverter.toUint8Array(bytes);
        return new ByteStream(view);
    }
}

var SignatureType;
(function (SignatureType) {
    SignatureType[SignatureType["certificateTimestamp"] = 0] = "certificateTimestamp";
    SignatureType[SignatureType["treeHash"] = 1] = "treeHash";
})(SignatureType || (SignatureType = {}));
var HashAlgorithm;
(function (HashAlgorithm) {
    HashAlgorithm[HashAlgorithm["none"] = 0] = "none";
    HashAlgorithm[HashAlgorithm["md5"] = 1] = "md5";
    HashAlgorithm[HashAlgorithm["sha1"] = 2] = "sha1";
    HashAlgorithm[HashAlgorithm["sha224"] = 3] = "sha224";
    HashAlgorithm[HashAlgorithm["sha256"] = 4] = "sha256";
    HashAlgorithm[HashAlgorithm["sha384"] = 5] = "sha384";
    HashAlgorithm[HashAlgorithm["sha512"] = 6] = "sha512";
})(HashAlgorithm || (HashAlgorithm = {}));
var SignatureAlgorithm;
(function (SignatureAlgorithm) {
    SignatureAlgorithm[SignatureAlgorithm["anonymous"] = 0] = "anonymous";
    SignatureAlgorithm[SignatureAlgorithm["rsa"] = 1] = "rsa";
    SignatureAlgorithm[SignatureAlgorithm["dsa"] = 2] = "dsa";
    SignatureAlgorithm[SignatureAlgorithm["ecdsa"] = 3] = "ecdsa";
})(SignatureAlgorithm || (SignatureAlgorithm = {}));
class SignedCertificateTimestamp extends Structure {
    constructor(stream) {
        super();
        this.version = 0;
        this.logId = new ArrayBuffer(32);
        this.timestamp = new Date();
        this.extensions = new ArrayBuffer(0);
        this.hashAlgorithm = 0;
        this.signatureAlgorithm = 0;
        this.signature = new ArrayBuffer(0);
        if (stream) {
            this.parse(stream);
        }
    }
    parse(stream) {
        this.version = stream.readByte();
        stream.read(2);
        this.logId = BufferSourceConverter.toArrayBuffer(stream.read(32));
        this.timestamp = new Date(stream.readNumber(8));
        const extLen = stream.readNumber(2);
        this.extensions = stream.read(extLen).buffer;
        this.hashAlgorithm = stream.readByte();
        this.signatureAlgorithm = stream.readByte();
        this.signature = stream.read(stream.readNumber(2)).buffer;
    }
    toJSON() {
        return {
            version: this.version,
            logId: Convert.ToHex(this.logId),
            timestamp: this.timestamp,
            extensions: Convert.ToBase64(this.extensions),
            hashAlgorithm: HashAlgorithm[this.hashAlgorithm] || "undefined",
            signatureAlgorithm: SignatureAlgorithm[this.signatureAlgorithm] || "undefined",
            signature: Convert.ToBase64(this.signature),
        };
    }
}

const id_certificateTransparency = "1.3.6.1.4.1.11129.2.4.2";
class CertificateTransparency extends OctetString$1 {
    constructor() {
        super(...arguments);
        this.items = [];
    }
    fromASN(asn) {
        super.fromASN(asn);
        const stream = new ByteStream(this.buffer);
        const len = stream.readNumber(2);
        this.items = [];
        while (stream.position < len) {
            this.items.push(new SignedCertificateTimestamp(stream));
        }
        return this;
    }
    toJSON() {
        return this.items.map(o => o.toJSON());
    }
}

var Version$1;
(function (Version) {
    Version[Version["v1"] = 1] = "v1";
})(Version$1 || (Version$1 = {}));

const id_adbe_archiveRevInfo = "1.2.840.113583.1.1.9.2";
class ArchiveRevInfo {
    constructor(params = {}) {
        this.version = Version$1.v1;
        Object.assign(this, params);
    }
}
__decorate([
    AsnProp({ type: AsnPropTypes.Integer })
], ArchiveRevInfo.prototype, "version", void 0);

const id_adbe_timestamp = "1.2.840.113583.1.1.9.1";
class Timestamp {
    constructor(params = {}) {
        this.version = Version$1.v1;
        this.location = new GeneralName();
        this.requiresAuth = false;
        Object.assign(this, params);
    }
}
__decorate([
    AsnProp({ type: AsnPropTypes.Integer })
], Timestamp.prototype, "version", void 0);
__decorate([
    AsnProp({ type: GeneralName })
], Timestamp.prototype, "location", void 0);
__decorate([
    AsnProp({ type: AsnPropTypes.Boolean, defaultValue: false, optional: true })
], Timestamp.prototype, "requiresAuth", void 0);

var __classPrivateFieldSet$1 = (undefined && undefined.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var __classPrivateFieldGet$1 = (undefined && undefined.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _asn$1, _raw;
class AsnData {
    constructor(...args) {
        _asn$1.set(this, void 0);
        _raw.set(this, void 0);
        if (args.length === 1) {
            // asn
            __classPrivateFieldSet$1(this, _asn$1, args[0]);
            __classPrivateFieldSet$1(this, _raw, AsnConvert.serialize(__classPrivateFieldGet$1(this, _asn$1)));
        }
        else {
            // raw, type
            __classPrivateFieldSet$1(this, _asn$1, AsnConvert.parse(args[0], args[1]));
            __classPrivateFieldSet$1(this, _raw, BufferSourceConverter.toArrayBuffer(args[0]));
        }
    }
    get asn() {
        return __classPrivateFieldGet$1(this, _asn$1);
    }
    get raw() {
        return __classPrivateFieldGet$1(this, _raw);
    }
}
_asn$1 = new WeakMap(), _raw = new WeakMap();

class Extension$1 extends AsnData {
    constructor(raw) {
        super(raw, Extension);
        const asnExtnValue = this.getAsnExtnValue();
        switch (this.asn.extnID) {
            case id_pe_authorityInfoAccess:
                this.value = AsnParser.parse(asnExtnValue, AuthorityInfoAccessSyntax);
                break;
            case id_ce_authorityKeyIdentifier:
                this.value = AsnParser.parse(asnExtnValue, AuthorityKeyIdentifier);
                break;
            case id_ce_basicConstraints:
                this.value = AsnParser.parse(asnExtnValue, BasicConstraints);
                break;
            case id_ce_certificateIssuer:
                this.value = AsnParser.parse(asnExtnValue, CertificateIssuer);
                break;
            case id_ce_certificatePolicies:
                this.value = AsnParser.parse(asnExtnValue, CertificatePolicies);
                break;
            case id_ce_cRLDistributionPoints:
            case '2.5.29.46':
                this.value = AsnParser.parse(asnExtnValue, CRLDistributionPoints);
                break;
            case id_ce_cRLReasons:
                this.value = AsnParser.parse(asnExtnValue, CRLReason);
                break;
            case id_ce_extKeyUsage:
                this.value = AsnParser.parse(asnExtnValue, ExtendedKeyUsage);
                break;
            case id_ce_inhibitAnyPolicy:
                this.value = AsnParser.parse(asnExtnValue, InhibitAnyPolicy);
                break;
            case id_ce_invalidityDate:
                this.value = AsnParser.parse(asnExtnValue, InvalidityDate);
                break;
            case id_ce_issuerAltName:
                this.value = AsnParser.parse(asnExtnValue, IssueAlternativeName);
                break;
            case id_ce_keyUsage:
                this.value = AsnParser.parse(asnExtnValue, KeyUsage);
                break;
            case id_ce_nameConstraints:
                this.value = AsnParser.parse(asnExtnValue, NameConstraints);
                break;
            case id_ce_policyConstraints:
                this.value = AsnParser.parse(asnExtnValue, PolicyConstraints);
                break;
            case id_ce_policyMappings:
                this.value = AsnParser.parse(asnExtnValue, PolicyMappings);
                break;
            case id_ce_subjectAltName:
                this.value = AsnParser.parse(asnExtnValue, SubjectAlternativeName);
                break;
            case id_ce_subjectDirectoryAttributes:
                this.value = AsnParser.parse(asnExtnValue, SubjectDirectoryAttributes);
                break;
            case id_ce_subjectKeyIdentifier:
                this.value = AsnParser.parse(asnExtnValue, SubjectKeyIdentifier);
                break;
            case id_pe_qcStatements:
                this.value = AsnParser.parse(asnExtnValue, QCStatements);
                break;
            case id_certificateTemplate:
                this.value = AsnParser.parse(asnExtnValue, CertificateTemplate);
                break;
            case id_enrollCertType:
                this.value = AsnParser.parse(asnExtnValue, EnrollCertTypeChoice);
                break;
            case id_netscapeComment:
                this.value = AsnParser.parse(asnExtnValue, NetscapeComment);
                break;
            case id_netscapeCertType:
                this.value = AsnParser.parse(asnExtnValue, NetscapeCertType);
                break;
            case id_caVersion:
                this.value = AsnParser.parse(asnExtnValue, CaVersion);
                break;
            case id_certificateTransparency:
                this.value = AsnParser.parse(asnExtnValue, CertificateTransparency);
                break;
            case id_lei:
                this.value = AsnParser.parse(asnExtnValue, LeiChoice);
                break;
            case id_lei_roles:
                this.value = AsnParser.parse(asnExtnValue, LeiRoles);
                break;
            case id_adbe_timestamp:
                this.value = AsnParser.parse(asnExtnValue, Timestamp);
                break;
            case id_adbe_archiveRevInfo:
                this.value = AsnParser.parse(asnExtnValue, ArchiveRevInfo);
                break;
            default:
                this.value = Convert.ToHex(asnExtnValue);
                console.warn('Didn\'t detect parser for extension:', this.asn.extnID);
        }
    }
    getAsnExtnValue() {
        return this.asn.extnValue.buffer;
    }
}

class X509Certificate extends AsnData {
    constructor(raw) {
        super(X509Certificate.rawClarify(raw), Certificate);
        this.thumbprints = {};
        const { tbsCertificate } = this.asn;
        this.serialNumber = Convert.ToHex(tbsCertificate.serialNumber);
        this.subject = new Name$1(tbsCertificate.subject).toJSON();
        this.issuer = new Name$1(tbsCertificate.issuer).toJSON();
        this.version = tbsCertificate.version + 1;
        const notBefore = tbsCertificate.validity.notBefore.utcTime
            || tbsCertificate.validity.notBefore.generalTime;
        if (!notBefore) {
            throw new Error("Cannot get 'notBefore' value");
        }
        this.notBefore = notBefore;
        const notAfter = tbsCertificate.validity.notAfter.utcTime
            || tbsCertificate.validity.notAfter.generalTime;
        if (!notAfter) {
            throw new Error("Cannot get 'notAfter' value");
        }
        this.notAfter = notAfter;
        this.validity = diff(this.notBefore, this.notAfter);
    }
    static base64Clear(base64) {
        return base64
            .replace(/.*base64,/, '')
            .replace(/-----.+-----/g, '')
            .replace(/[\s\r\n]/g, '');
    }
    static rawClarify(raw) {
        const value = X509Certificate.base64Clear(raw);
        let certificateBuffer;
        if (validator.isHex(value)) {
            certificateBuffer = Convert.FromHex(value);
        }
        else if (validator.isBase64(value) || validator.isPem(value)) {
            certificateBuffer = Convert.FromBase64(value);
        }
        else {
            certificateBuffer = Convert.FromBinary(raw);
        }
        return certificateBuffer;
    }
    parseExtensions() {
        const { tbsCertificate } = this.asn;
        if (tbsCertificate.extensions) {
            this.extensions = tbsCertificate.extensions
                .map(e => new Extension$1(AsnConvert.serialize(e)));
        }
    }
    get publicKey() {
        const { subjectPublicKey, algorithm } = this.asn.tbsCertificate.subjectPublicKeyInfo;
        let params;
        if (algorithm.algorithm === id_ecPublicKey && algorithm.parameters) {
            params = AsnConvert.parse(algorithm.parameters, ECParameters);
        }
        if (algorithm.algorithm === id_rsaEncryption) {
            params = AsnConvert.parse(subjectPublicKey, RSAPublicKey);
        }
        const spki = AsnConvert.serialize(this.asn.tbsCertificate.subjectPublicKeyInfo);
        return {
            params,
            value: spki,
            algorithm: algorithm.algorithm,
        };
    }
    get signature() {
        const { signatureValue, signatureAlgorithm } = this.asn;
        return {
            value: signatureValue,
            algorithm: signatureAlgorithm.algorithm,
        };
    }
    export(type) {
        if (type === 'base64') {
            return Convert.ToBase64(this.raw);
        }
        if (type === 'hex') {
            return this.stringToHex(Convert.ToHex(this.raw));
        }
        if (type === 'pem') {
            return this.base64ToPem(Convert.ToBase64(this.raw));
        }
    }
    base64ToPem(base64) {
        return `-----BEGIN CERTIFICATE-----\n${base64.replace(/(.{64})/g, '$1\n')}\n-----END CERTIFICATE-----`;
    }
    stringToHex(value) {
        return value
            .replace(/(.{32})/g, '$1\n')
            .replace(/(.{4})/g, '$1 ')
            .trim();
    }
    async getThumbprint(algorithm = 'SHA-1') {
        const crypto = cryptoProvider.get();
        const thumbprint = await crypto.subtle.digest(algorithm, this.raw);
        this.thumbprints[algorithm] = Convert.ToHex(thumbprint);
    }
    get commonName() {
        if (!this.subject) {
            return '';
        }
        for (let i = 0; i < this.subject.length; i += 1) {
            const name = this.subject[i];
            if (name.name === 'CN') {
                return name.value;
            }
            if (name.name === 'E') {
                return name.value;
            }
        }
        return;
    }
    get issuerCommonName() {
        if (!this.issuer) {
            return '';
        }
        for (let i = 0; i < this.issuer.length; i += 1) {
            const name = this.issuer[i];
            if (name.name === 'CN') {
                return name.value;
            }
            if (name.name === 'E') {
                return name.value;
            }
        }
        return;
    }
    get isRoot() {
        return JSON.stringify(this.issuer) === JSON.stringify(this.subject);
    }
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
    '0.2.262.1.10.1.1.1': 'MD4 with RSA And IS O9697',
    '0.2.262.1.10.1.1.2': 'MD4 with RSA And Telesec Signature Standard',
    '0.2.262.1.10.1.1.3': 'MD5 with RSA And IS O9697',
    '0.2.262.1.10.1.1.4': 'MD5 with RSA And Telesec Signature Standard',
    '0.2.262.1.10.1.1.5': 'Ripemd160 with RSA And Telekom Signature Standard',
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
    '0.4.0.127.0.7.1.1.4.1.1': 'Bsi Ecdsa with SHA1',
    '0.4.0.127.0.7.1.1.4.1.2': 'Bsi Ecdsa with SHA224',
    '0.4.0.127.0.7.1.1.4.1.3': 'Bsi Ecdsa with SHA256',
    '0.4.0.127.0.7.1.1.4.1.4': 'Bsi Ecdsa with SHA384',
    '0.4.0.127.0.7.1.1.4.1.5': 'Bsi Ecdsa with SHA512',
    '0.4.0.127.0.7.1.1.4.1.6': 'Bsi Ecdsa with RIPEMD160',
    '0.4.0.127.0.7.1.1.5.1.1': 'Bsi Ecka Eg x963KDF',
    '0.4.0.127.0.7.1.1.5.1.1.1': 'Bsi Ecka Eg x963KDF with SHA1',
    '0.4.0.127.0.7.1.1.5.1.1.2': 'Bsi Ecka Eg x963KDF with SHA224',
    '0.4.0.127.0.7.1.1.5.1.1.3': 'Bsi Ecka Eg x963KDF with SHA256',
    '0.4.0.127.0.7.1.1.5.1.1.4': 'Bsi Ecka Eg x963KDF with SHA384',
    '0.4.0.127.0.7.1.1.5.1.1.5': 'Bsi Ecka Eg x963KDF with SHA512',
    '0.4.0.127.0.7.1.1.5.1.1.6': 'Bsi Ecka Eg x963KDF with RIPEMD160',
    '0.4.0.127.0.7.1.1.5.1.2': 'Bsi Ecka Eg Session KDF',
    '0.4.0.127.0.7.1.1.5.1.2.1': 'Bsi Ecka Eg Session KDF With3DES',
    '0.4.0.127.0.7.1.1.5.1.2.2': 'Bsi Ecka Eg Session KDF with AES128',
    '0.4.0.127.0.7.1.1.5.1.2.3': 'Bsi Ecka Eg Session KDF with AES192',
    '0.4.0.127.0.7.1.1.5.1.2.4': 'Bsi Ecka Eg Session KDF with AES256',
    '0.4.0.127.0.7.1.1.5.2': 'Bsi Ecka DH',
    '0.4.0.127.0.7.1.1.5.2.1': 'Bsi Ecka DH x963KDF',
    '0.4.0.127.0.7.1.1.5.2.1.1': 'Bsi Ecka DHx963KDF with SHA1',
    '0.4.0.127.0.7.1.1.5.2.1.2': 'Bsi Ecka DHx963KDF with SHA224',
    '0.4.0.127.0.7.1.1.5.2.1.3': 'Bsi Ecka DHx963KDF with SHA256',
    '0.4.0.127.0.7.1.1.5.2.1.4': 'Bsi Ecka DHx963KDF with SHA384',
    '0.4.0.127.0.7.1.1.5.2.1.5': 'Bsi Ecka DHx963KDF with SHA512',
    '0.4.0.127.0.7.1.1.5.2.1.6': 'Bsi Ecka DHx963KDF with RIPEMD160',
    '0.4.0.127.0.7.1.1.5.2.2': 'Bsi Ecka DHSessionKDF',
    '0.4.0.127.0.7.1.1.5.2.2.1': 'Bsi Ecka DH Session KDF With3 DES',
    '0.4.0.127.0.7.1.1.5.2.2.2': 'Bsi Ecka DH Session KDF with AES128',
    '0.4.0.127.0.7.1.1.5.2.2.3': 'Bsi Ecka DH Session KDF with AES192',
    '0.4.0.127.0.7.1.1.5.2.2.4': 'Bsi Ecka DH Session KDF with AES256',
    '0.4.0.127.0.7.1.2': 'Bsi Ec Key Type',
    '0.4.0.127.0.7.1.2.1': 'Bsi Ec Public Key',
    '0.4.0.127.0.7.1.5.1': 'Bsi Kaeg',
    '0.4.0.127.0.7.1.5.1.1': 'Bsi Kaeg with x963KDF',
    '0.4.0.127.0.7.1.5.1.2': 'Bsi Kaeg with 3DESKDF',
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
    '0.4.0.1862.1.4': 'Etsi Qcs SSCD',
    '0.4.0.1862.1.5': 'Etsi Qcs PDS',
    '0.4.0.1862.1.6': 'Etsi Qcs Type',
    '0.4.0.194112.1.0': 'QCP Natural Person',
    '0.4.0.194112.1.1': 'QCP Legal Person',
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
    '1.2.410.200004.1.8': 'Kcdsa with HAS160',
    '1.2.410.200004.1.9': 'Kcdsa with SHA1',
    '1.2.410.200004.1.10': 'PBE with HAS160 And SEED-ECB',
    '1.2.410.200004.1.11': 'PBE with HAS160 And SEED-CBC',
    '1.2.410.200004.1.12': 'PBE with HAS160 And SEED-CFB',
    '1.2.410.200004.1.13': 'PBE with HAS160 And SEED-OFB',
    '1.2.410.200004.1.14': 'PBE with SHA1 And SEED-ECB',
    '1.2.410.200004.1.15': 'PBE with SHA1 And SEED-CBC',
    '1.2.410.200004.1.16': 'PBE with SHA1 And SEED-CFB',
    '1.2.410.200004.1.17': 'PBE with SHA1 And SEED-OFB',
    '1.2.410.200004.1.20': 'RSA with HAS160',
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
    '1.2.410.200046.1.1.43': 'Aria128-keywrap with Pad',
    '1.2.410.200046.1.1.44': 'Aria192-keywrap with Pad',
    '1.2.410.200046.1.1.45': 'Aria256-keywrap with Pad',
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
    '1.2.840.10040.4.3': 'DSA with SHA1',
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
    '1.2.840.10045.4.1': 'ECDSA with SHA1',
    '1.2.840.10045.4.2': 'ECDSA with Recommended',
    '1.2.840.10045.4.3': 'ECDSA with Specified',
    '1.2.840.10045.4.3.1': 'ECDSA with SHA224',
    '1.2.840.10045.4.3.2': 'ECDSA with SHA256',
    '1.2.840.10045.4.3.3': 'ECDSA with SHA384',
    '1.2.840.10045.4.3.4': 'ECDSA with SHA512',
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
    '1.2.840.113533.7.66.12': 'PBE with MD5 And CAST5-CBC',
    '1.2.840.113533.7.66.13': 'Password Based Mac',
    '1.2.840.113533.7.67': 'NSN-oc',
    '1.2.840.113533.7.67.0': 'Entrust User',
    '1.2.840.113533.7.68': 'NSN-at',
    '1.2.840.113533.7.68.0': 'Entrust CA Info',
    '1.2.840.113533.7.68.10': 'Attribute Certificate',
    '1.2.840.113549.1.1': 'PKCS-1',
    '1.2.840.113549.1.1.1': 'RSA Encryption',
    '1.2.840.113549.1.1.2': 'MD2 with RSA Encryption',
    '1.2.840.113549.1.1.3': 'MD4 with RSA Encryption',
    '1.2.840.113549.1.1.4': 'MD5 with RSA Encryption',
    '1.2.840.113549.1.1.5': 'SHA1 with RSA Encryption',
    '1.2.840.113549.1.1.6': 'RSA OAEP Encryption SET',
    '1.2.840.113549.1.1.7': 'RSA OAEP',
    '1.2.840.113549.1.1.8': 'PKCS1-MGF',
    '1.2.840.113549.1.1.9': 'RSA OAEP-p Specified',
    '1.2.840.113549.1.1.10': 'RSA PSS',
    '1.2.840.113549.1.1.11': 'SHA256 with RSA Encryption',
    '1.2.840.113549.1.1.12': 'SHA384 with RSA Encryption',
    '1.2.840.113549.1.1.13': 'SHA512 with RSA Encryption',
    '1.2.840.113549.1.1.14': 'SHA224 with RSA Encryption',
    '1.2.840.113549.1.2': 'Bsafe Rsa Encr',
    '1.2.840.113549.1.3': 'PKCS-3',
    '1.2.840.113549.1.3.1': 'Dh Key Agreement',
    '1.2.840.113549.1.5': 'PKCS-5',
    '1.2.840.113549.1.5.1': 'PBE with MD2 And DES-CBC',
    '1.2.840.113549.1.5.3': 'PBE with MD5 And DES-CBC',
    '1.2.840.113549.1.5.4': 'PBE with MD2 And RC2-CBC',
    '1.2.840.113549.1.5.6': 'PBE with MD5 And RC2-CBC',
    '1.2.840.113549.1.5.9': 'PBE with MD5 And XOR',
    '1.2.840.113549.1.5.10': 'PBE with SHA And DES-CBC',
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
    '1.2.840.113549.1.7.7': 'Data with Attributes',
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
    '1.2.840.113549.1.9.16.1.20': 'Content with Attrs',
    '1.2.840.113549.1.9.16.1.21': 'Enc Key with I D',
    '1.2.840.113549.1.9.16.1.22': 'Enc PEPSI',
    '1.2.840.113549.1.9.16.1.23': 'Auth Enveloped Data',
    '1.2.840.113549.1.9.16.1.24': 'Route Origin Attest',
    '1.2.840.113549.1.9.16.1.25': 'Symmetric Key Package',
    '1.2.840.113549.1.9.16.1.26': 'Rpki Manifest',
    '1.2.840.113549.1.9.16.1.27': 'Ascii Text with CRLF',
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
    '1.2.840.113549.1.9.16.3.12': 'Hmac with AE Swrap',
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
    '1.2.840.113549.1.12.1.1': 'PBE with SHA And128 Bit RC4',
    '1.2.840.113549.1.12.1.2': 'PBE with SHA And40 Bit RC4',
    '1.2.840.113549.1.12.1.3': 'PBE with SHA And3-Key Triple DES-CBC',
    '1.2.840.113549.1.12.1.4': 'PBE with SHA And2-Key Triple DES-CBC',
    '1.2.840.113549.1.12.1.5': 'PBE with SHA And128 Bit RC2-CBC',
    '1.2.840.113549.1.12.1.6': 'PBE with SHA And40 Bit RC2-CBC',
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
    '1.2.840.113549.1.12.5.1.1': 'PKCS-12-PBE with SHA1 And128 Bit RC4use (1284011354911211) instead',
    '1.2.840.113549.1.12.5.1.2': 'PKCS-12-PBE with SHA1 And40 Bit RC4use (1284011354911212) instead',
    '1.2.840.113549.1.12.5.1.3': 'PKCS-12-PBE with SHA1 And Triple DESCB Cuse the incompatible but similar (1284011354911213) or (1284011354911214) instead',
    '1.2.840.113549.1.12.5.1.4': 'PKCS-12-PBE with SHA1 And128 Bit RC2CB Cuse (1284011354911215) instead',
    '1.2.840.113549.1.12.5.1.5': 'PKCS-12-PBE with SHA1 And40 Bit RC2CB Cuse (1284011354911216) instead',
    '1.2.840.113549.1.12.5.1.6': 'PKCS-12-PBE with SHA1 And RC4use the incompatible but similar (1284011354911211) or (1284011354911212) instead',
    '1.2.840.113549.1.12.5.1.7': 'PKCS-12-PBE with SHA1 And RC2CB Cuse the incompatible but similar (1284011354911215) or (1284011354911216) instead',
    '1.2.840.113549.1.12.5.2': 'PKCS-12-Enveloping I Dthe conventional  PKCS#1OIDs instead',
    '1.2.840.113549.1.12.5.2.1': 'PKCS-12-RSA Encryption With128 Bit RC4use the conventional  PKCS#1OIDs instead',
    '1.2.840.113549.1.12.5.2.2': 'PKCS-12-RSA Encryption With40 Bit RC4use the conventional  PKCS#1OIDs instead',
    '1.2.840.113549.1.12.5.2.3': 'PKCS-12-RSA Encryption with Triple DESuse the conventional  PKCS#1OIDs instead',
    '1.2.840.113549.1.12.5.3': 'PKCS-12-Signature IDuse the conventional  PKCS#1OIDs instead',
    '1.2.840.113549.1.12.5.3.1': 'PKCS-12-RSA Signature with SHA1 Digestuse the conventional  PKCS#1OIDs instead',
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
    '1.2.840.113549.2.7': 'HMAC with SHA1',
    '1.2.840.113549.2.8': 'HMAC with SHA224',
    '1.2.840.113549.2.9': 'HMAC with SHA256',
    '1.2.840.113549.2.10': 'HMAC with SHA384',
    '1.2.840.113549.2.11': 'HMAC with SHA512',
    '1.2.840.113549.3': 'Encryption Algorithm',
    '1.2.840.113549.3.2': 'Rc2CBC',
    '1.2.840.113549.3.3': 'Rc2ECB',
    '1.2.840.113549.3.4': 'Rc4',
    '1.2.840.113549.3.5': 'Rc4 with MAC',
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
    '1.2.840.113556.4.4': 'Titled with OID',
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
    '1.2.840.113583.1.1.9.1': 'Adobe Time-stamp',
    '1.2.840.113583.1.1.9.2': 'Adobe Archive Rev Info',
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
    '1.2.840.113635.100.5.7.1': 'Apple ID Sharing Certificate Policy',
    '1.2.840.113635.100.6': 'Apple Certificate Extensions',
    '1.2.840.113635.100.6.1': 'Apple Certificate Extension Code Signing',
    '1.2.840.113635.100.6.1.1': 'Apple Certificate Extension Apple Signing',
    '1.2.840.113635.100.6.1.2': 'Apple Certificate Extension ADC Developer Signing',
    '1.2.840.113635.100.6.1.3': 'Apple Certificate Extension ADC Apple Signing',
    '1.2.840.113635.100.6.2.3': 'Apple Application Integration',
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
    '1.3.6.1.4.1.311.20.2': 'Microsoft Certificate Type',
    '1.3.6.1.4.1.311.20.2.1': 'Enrollment Agent',
    '1.3.6.1.4.1.311.20.2.2': 'Smartcard Logon',
    '1.3.6.1.4.1.311.20.2.3': 'NP Principal Name',
    '1.3.6.1.4.1.311.20.3': 'Cert Manifold',
    '1.3.6.1.4.1.311.21.1': 'Microsoft Certification Authority Renewal',
    '1.3.6.1.4.1.311.21.2': 'Microsoft Certificate Previous Hash',
    '1.3.6.1.4.1.311.21.3': 'CRL Virtual Base',
    '1.3.6.1.4.1.311.21.4': 'CRL Next Publish',
    '1.3.6.1.4.1.311.21.5': 'Ca Exchange',
    '1.3.6.1.4.1.311.21.6': 'Key Recovery',
    '1.3.6.1.4.1.311.21.7': 'Microsoft Certificate Template',
    '1.3.6.1.4.1.311.21.8': 'Enterprize OID Root',
    '1.3.6.1.4.1.311.21.9': 'Rdn Dummy Signer',
    '1.3.6.1.4.1.311.21.10': 'Microsoft Certificate Policies',
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
    '1.3.6.1.4.1.311.84.1.1': 'ASP.NET HTTPS Development certificate',
    '1.3.6.1.4.1.311.88': 'CAPICOM',
    '1.3.6.1.4.1.311.88.1': 'CAPICOM version',
    '1.3.6.1.4.1.311.88.2': 'CAPICOM attribute',
    '1.3.6.1.4.1.311.88.2.1': 'Document type attribute',
    '1.3.6.1.4.1.311.88.2.2': 'Document description attribute',
    '1.3.6.1.4.1.311.88.3': 'CAPICOM encrypted data message',
    '1.3.6.1.4.1.311.88.3.1': 'CAPICOM content of encrypted data',
    '1.3.6.1.4.1.782.1.2.1.8.1': 'Network  Solutions  EV policy',
    '1.3.6.1.4.1.2428.10.1.1': 'UNINETT policy Identifier',
    '1.3.6.1.4.1.2712.10': 'ICE-TEL policy Identifier',
    '1.3.6.1.4.1.2786.1.1.1': 'ICE-TEL  Italian',
    '1.3.6.1.4.1.3029.1.1.1': 'Blowfish ECB',
    '1.3.6.1.4.1.3029.1.1.2': 'Blowfish CBC',
    '1.3.6.1.4.1.3029.1.1.3': 'Blowfish CFB',
    '1.3.6.1.4.1.3029.1.1.4': 'Blowfish OFB',
    '1.3.6.1.4.1.3029.1.2.1': 'Elgamal',
    '1.3.6.1.4.1.3029.1.2.1.1': 'Elgamal with SHA-1',
    '1.3.6.1.4.1.3029.1.2.1.2': 'Elgamal with RIPEMD-160',
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
    // https://www.globalsign.com/en/repository/GlobalSign_CP_v5.3.pdf
    '1.3.6.1.4.1.4146': 'GlobalSign',
    '1.3.6.1.4.1.4146.1': 'GlobalSign Policy',
    '1.3.6.1.4.1.4146.1.1': 'GlobalSign EV policy',
    '1.3.6.1.4.1.4146.1.10': 'GlobalSign DV Policy',
    '1.3.6.1.4.1.4146.1.20': 'GlobalSign OV Policy',
    '1.3.6.1.4.1.4146.1.30': 'GlobalSign TSA Policy',
    '1.3.6.1.4.1.4146.1.40': 'GlobalSign Client Certificates Policy',
    '1.3.6.1.4.1.4146.1.40.10': 'GlobalSign Client Certificates Enterprise PKI Policy',
    '1.3.6.1.4.1.4146.1.50': 'GlobalSign Code Signing Certificates Policy',
    '1.3.6.1.4.1.4146.1.60': 'GlobalSign Root Sign Policy',
    '1.3.6.1.4.1.4146.1.70': 'GlobalSign Trusted Root Policy',
    '1.3.6.1.4.1.4146.1.80': 'GlobalSign EDI Client Policy',
    '1.3.6.1.4.1.4146.1.81': 'GlobalSign EDI Server Policy',
    '1.3.6.1.4.1.4146.1.90': 'GlobalSign TPM Root Policy',
    '1.3.6.1.4.1.4146.1.95': 'GlobalSign OCSP Policy',
    //
    // https://developers.yubico.com/PIV/Introduction/PIV_attestation.html
    '1.3.6.1.4.1.41482.3.3': 'YubiKey Firmware Version',
    '1.3.6.1.4.1.41482.3.7': 'YubiKey Serial Number',
    '1.3.6.1.4.1.41482.3.8': 'YubiKey PIN Touch Policy',
    '1.3.6.1.4.1.41482.3.9': 'YubiKey Formfactor',
    //
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
    '1.3.6.1.4.1.6334.1.100.1': 'Cybertrust EV policy',
    '1.3.6.1.4.1.6449.1.2.1.3.1': 'Comodo Policy',
    '1.3.6.1.4.1.6449.1.2.1.5.1': 'Comodo  EV policy',
    '1.3.6.1.4.1.6449.1.2.2.7': 'Comodo TLS DV',
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
    '1.3.6.1.4.1.13177.10.1.2.2': 'Corporate certificates for Natural Person',
    '1.3.6.1.5.2.3.5': 'KCD Authentication',
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
    '1.3.6.1.5.5.7.2.1': 'Certificate Policy Statement',
    '1.3.6.1.5.5.7.2.2': 'User Notice',
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
    '1.3.12.2.1011.7.3.1': 'DEC MD2 with RSA',
    '1.3.12.2.1011.7.3.2': 'DEC MD4 with RSA',
    '1.3.12.2.1011.7.3.3': 'DEC DEAMAC',
    '1.3.14.2.26.5': 'SHA',
    '1.3.14.3.2.1.1': 'RSA',
    '1.3.14.3.2.2': 'MD4 with RSA',
    '1.3.14.3.2.2.1': 'Sqmod-N',
    '1.3.14.3.2.3': 'MD5 with RSA',
    '1.3.14.3.2.3.1': 'Sqmod-Nwith RSA',
    '1.3.14.3.2.4': 'MD4 with RSA Encryption',
    '1.3.14.3.2.6': 'DES ECB',
    '1.3.14.3.2.7': 'DES CBC',
    '1.3.14.3.2.8': 'DES OFB',
    '1.3.14.3.2.9': 'DES CFB',
    '1.3.14.3.2.10': 'DES MAC',
    '1.3.14.3.2.11': 'RSA Signature',
    '1.3.14.3.2.12': 'DSA',
    '1.3.14.3.2.13': 'DSA with SHA',
    '1.3.14.3.2.14': 'MDC2 with RSA Signature',
    '1.3.14.3.2.15': 'SHA with RSA Signature',
    '1.3.14.3.2.16': 'DH with Common Modulus',
    '1.3.14.3.2.17': 'Des EDE',
    '1.3.14.3.2.18': 'SHA',
    '1.3.14.3.2.19': 'MDC-2',
    '1.3.14.3.2.20': 'DSA Common',
    '1.3.14.3.2.21': 'DSA Common with SHA',
    '1.3.14.3.2.22': 'RSA Key Transport',
    '1.3.14.3.2.23': 'Keyed-hash-seal',
    '1.3.14.3.2.24': 'MD2 with RSA Signature',
    '1.3.14.3.2.25': 'MD5 with RSA Signature',
    '1.3.14.3.2.26': 'SHA1',
    '1.3.14.3.2.27': 'DSA with SHA1',
    '1.3.14.3.2.28': 'DSA with Common SHA1',
    '1.3.14.3.2.29': 'SHA-1 with RSA Encryption',
    '1.3.14.3.3.1': 'Simple-strong-auth',
    '1.3.14.7.2.1.1': 'El Gamal',
    '1.3.14.7.2.3.1': 'MD2 with RSA',
    '1.3.14.7.2.3.2': 'MD2 with El Gamal',
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
    '1.3.36.3.4.2.1': 'Sig S_ISO9796-2 with RED',
    '1.3.36.3.4.2.2': 'Sig S_ISO9796-2 with RSA',
    '1.3.36.3.4.2.3': 'Sig S_ISO9796-2 with RDN',
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
    '1.3.36.8.5.1.1.3': 'RSA with SHA1',
    '1.3.36.8.5.1.1.4': 'RSA with RIPEMD160',
    '1.3.36.8.5.1.2.1': 'Dsa Extended',
    '1.3.36.8.5.1.2.2': 'Dsa with RIPEMD160',
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
    '2.16.840.1.101.3.4.3.1': 'DSA with Sha224',
    '2.16.840.1.101.3.4.3.2': 'DSA with Sha256',
    '2.16.840.1.113719.1.2.8': 'Novell Algorithm',
    '2.16.840.1.113719.1.2.8.22': 'DES Cbc IV8',
    '2.16.840.1.113719.1.2.8.23': 'DES Cbc Pad IV8',
    '2.16.840.1.113719.1.2.8.24': 'DES EDE2 Cbc IV8',
    '2.16.840.1.113719.1.2.8.25': 'DES EDE2 Cbc Pad IV8',
    '2.16.840.1.113719.1.2.8.26': 'DES EDE3 Cbc IV8',
    '2.16.840.1.113719.1.2.8.27': 'DES EDE3 Cbc Pad IV8',
    '2.16.840.1.113719.1.2.8.28': 'Rc5 Cbc Pad',
    '2.16.840.1.113719.1.2.8.29': 'MD2 with RSA Encryption B Safe1',
    '2.16.840.1.113719.1.2.8.30': 'MD5 with RSA Encryption B Safe1',
    '2.16.840.1.113719.1.2.8.31': 'SHA1 with RSA Encryption B Safe1',
    '2.16.840.1.113719.1.2.8.32': 'Lm Digest',
    '2.16.840.1.113719.1.2.8.40': 'MD2',
    '2.16.840.1.113719.1.2.8.50': 'MD5',
    '2.16.840.1.113719.1.2.8.51': 'Ike Hmac with SHA1-RSA',
    '2.16.840.1.113719.1.2.8.52': 'Ike Hmac with MD5-RSA',
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
    '2.16.840.1.113733.1.7.54': 'Symantec',
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
    '1.3.6.1.4.1.52266.1': 'Legal Entity Identifier',
    '1.3.6.1.4.1.52266.2': 'Role',
};

/**
 * Download from buffer
 *
 * @example
 * ```js
 *    import { downloadFromBuffer } from 'ui-utils';
 *
 *    downloadFromBuffer(arrayBufferValue, 'applciation/pdf', 'myFile', 'pdf');
 * ```
 */
function downloadFromBuffer(value, mime = 'application/octet-stream', name, extension) {
    const blob = new Blob([value], { type: mime });
    if (navigator.msSaveBlob) { // IE10+ : (has Blob, but not a[download] or URL)
        navigator.msSaveBlob(blob, `${name}.${extension}`);
        return new Promise(res => setTimeout(res, 100));
    }
    const blobURL = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    const frame = document.createElement('iframe');
    link.style.display = 'none';
    frame.style.display = 'none';
    frame.name = blobURL;
    document.body.appendChild(frame);
    link.href = blobURL;
    link.target = blobURL;
    link.download = `${name}.${extension}`;
    document.body.appendChild(link);
    link.dispatchEvent(new MouseEvent('click'));
    document.body.removeChild(link);
    return new Promise(res => setTimeout(() => {
        document.body.removeChild(frame);
        res();
    }, 100));
}

class Download {
}
Download.certificate = {
    asPEM: (pem, name) => {
        downloadFromBuffer(Convert.FromString(pem), 'application/pkix-cert', name, 'cer');
    },
    asDER: (hex, name) => {
        downloadFromBuffer(Convert.FromString(hex), 'application/pkix-cert', name, 'cer');
    },
};
Download.certificateRequest = {
    asPEM: (pem, name) => {
        downloadFromBuffer(Convert.FromString(pem), 'application/pkcs10', name, 'csr');
    },
    asDER: (hex, name) => {
        downloadFromBuffer(Convert.FromString(hex), 'application/pkcs10', name, 'csr');
    },
};

export { AsnParser as A, BasicConstraints as B, Convert as C, DisplayText as D, EDIPartyName as E, KeyUsage as K, LeiRoles as L, Name as N, OIDs as O, QCStatements as Q, SubjectKeyIdentifier as S, Timestamp as T, UserNotice as U, X509Certificate as X, OtherName as a, ExtendedKeyUsage as b, AuthorityKeyIdentifier as c, CRLDistributionPoints as d, AuthorityInfoAccessSyntax as e, SubjectAlternativeName as f, CertificatePolicies as g, CertificateTransparency as h, NameConstraints as i, CertificateTemplate as j, EnrollCertTypeChoice as k, CaVersion as l, NetscapeComment as m, NetscapeCertType as n, LeiChoice as o, ArchiveRevInfo as p, CRLReason as q, Download as r, short as s };
