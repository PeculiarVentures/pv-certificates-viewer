/*!
 * © Peculiar Ventures https://peculiarventures.com/ - MIT License
 */
import{c as t}from"./p-d0b55fbb.js";
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */function r(t,r,e,n="application/octet-stream"){const s=new Blob([t],{type:n});if(navigator.msSaveBlob)return navigator.msSaveBlob(s,`${r}.${e}`),new Promise((t=>setTimeout(t,100)));const i=window.URL.createObjectURL(s),a=document.createElement("a"),o=document.createElement("iframe");return a.style.display="none",o.style.display="none",o.name=i,document.body.appendChild(o),a.href=i,a.target=i,a.download=`${r}.${e}`,document.body.appendChild(a),a.dispatchEvent(new MouseEvent("click")),document.body.removeChild(a),new Promise((t=>setTimeout((()=>{document.body.removeChild(o),t(void 0)}),100)))}var e=t((function(t,r){Object.defineProperty(r,"__esModule",{value:!0});class e{static isArrayBuffer(t){return"[object ArrayBuffer]"===Object.prototype.toString.call(t)}static toArrayBuffer(t){return this.isArrayBuffer(t)?t:t.byteLength===t.buffer.byteLength?t.buffer:this.toUint8Array(t).slice().buffer}static toUint8Array(t){return this.toView(t,Uint8Array)}static toView(t,r){if(t.constructor===r)return t;if(this.isArrayBuffer(t))return new r(t);if(this.isArrayBufferView(t))return new r(t.buffer,t.byteOffset,t.byteLength);throw new TypeError("The provided value is not of type '(ArrayBuffer or ArrayBufferView)'")}static isBufferSource(t){return this.isArrayBufferView(t)||this.isArrayBuffer(t)}static isArrayBufferView(t){return ArrayBuffer.isView(t)||t&&this.isArrayBuffer(t.buffer)}static isEqual(t,r){const n=e.toUint8Array(t),s=e.toUint8Array(r);if(n.length!==s.byteLength)return!1;for(let t=0;t<n.length;t++)if(n[t]!==s[t])return!1;return!0}static concat(...t){if(Array.isArray(t[0])){const r=t[0];let e=0;for(const t of r)e+=t.byteLength;const n=new Uint8Array(e);let s=0;for(const t of r){const r=this.toUint8Array(t);n.set(r,s),s+=r.length}return t[1]?this.toView(n,t[1]):n.buffer}return this.concat(t)}}class n{static fromString(t){const r=unescape(encodeURIComponent(t)),e=new Uint8Array(r.length);for(let t=0;t<r.length;t++)e[t]=r.charCodeAt(t);return e.buffer}static toString(t){const r=e.toUint8Array(t);let n="";for(let t=0;t<r.length;t++)n+=String.fromCharCode(r[t]);return decodeURIComponent(escape(n))}}class s{static toString(t,r=!1){const n=e.toArrayBuffer(t),s=new DataView(n);let i="";for(let t=0;t<n.byteLength;t+=2){const e=s.getUint16(t,r);i+=String.fromCharCode(e)}return i}static fromString(t,r=!1){const e=new ArrayBuffer(2*t.length),n=new DataView(e);for(let e=0;e<t.length;e++)n.setUint16(2*e,t.charCodeAt(e),r);return e}}class i{static isHex(t){return"string"==typeof t&&/^[a-z0-9]+$/i.test(t)}static isBase64(t){return"string"==typeof t&&/^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(t)}static isBase64Url(t){return"string"==typeof t&&/^[a-zA-Z0-9-_]+$/i.test(t)}static ToString(t,r="utf8"){const n=e.toUint8Array(t);switch(r.toLowerCase()){case"utf8":return this.ToUtf8String(n);case"binary":return this.ToBinary(n);case"hex":return this.ToHex(n);case"base64":return this.ToBase64(n);case"base64url":return this.ToBase64Url(n);case"utf16le":return s.toString(n,!0);case"utf16":case"utf16be":return s.toString(n);default:throw new Error(`Unknown type of encoding '${r}'`)}}static FromString(t,r="utf8"){if(!t)return new ArrayBuffer(0);switch(r.toLowerCase()){case"utf8":return this.FromUtf8String(t);case"binary":return this.FromBinary(t);case"hex":return this.FromHex(t);case"base64":return this.FromBase64(t);case"base64url":return this.FromBase64Url(t);case"utf16le":return s.fromString(t,!0);case"utf16":case"utf16be":return s.fromString(t);default:throw new Error(`Unknown type of encoding '${r}'`)}}static ToBase64(t){const r=e.toUint8Array(t);if("undefined"!=typeof btoa){const t=this.ToString(r,"binary");return btoa(t)}return Buffer.from(r).toString("base64")}static FromBase64(t){const r=this.formatString(t);if(!r)return new ArrayBuffer(0);if(!i.isBase64(r))throw new TypeError("Argument 'base64Text' is not Base64 encoded");return"undefined"!=typeof atob?this.FromBinary(atob(r)):new Uint8Array(Buffer.from(r,"base64")).buffer}static FromBase64Url(t){const r=this.formatString(t);if(!r)return new ArrayBuffer(0);if(!i.isBase64Url(r))throw new TypeError("Argument 'base64url' is not Base64Url encoded");return this.FromBase64(this.Base64Padding(r.replace(/\-/g,"+").replace(/\_/g,"/")))}static ToBase64Url(t){return this.ToBase64(t).replace(/\+/g,"-").replace(/\//g,"_").replace(/\=/g,"")}static FromUtf8String(t,r=i.DEFAULT_UTF8_ENCODING){switch(r){case"ascii":return this.FromBinary(t);case"utf8":return n.fromString(t);case"utf16":case"utf16be":return s.fromString(t);case"utf16le":case"usc2":return s.fromString(t,!0);default:throw new Error(`Unknown type of encoding '${r}'`)}}static ToUtf8String(t,r=i.DEFAULT_UTF8_ENCODING){switch(r){case"ascii":return this.ToBinary(t);case"utf8":return n.toString(t);case"utf16":case"utf16be":return s.toString(t);case"utf16le":case"usc2":return s.toString(t,!0);default:throw new Error(`Unknown type of encoding '${r}'`)}}static FromBinary(t){const r=t.length,e=new Uint8Array(r);for(let n=0;n<r;n++)e[n]=t.charCodeAt(n);return e.buffer}static ToBinary(t){const r=e.toUint8Array(t);let n="";for(let t=0;t<r.length;t++)n+=String.fromCharCode(r[t]);return n}static ToHex(t){const r=e.toUint8Array(t),n=[],s=r.length;for(let t=0;t<s;t++){const e=r[t].toString(16).padStart(2,"0");n.push(e)}return n.join("")}static FromHex(t){let r=this.formatString(t);if(!r)return new ArrayBuffer(0);if(!i.isHex(r))throw new TypeError("Argument 'hexString' is not HEX encoded");r.length%2&&(r=`0${r}`);const e=new Uint8Array(r.length/2);for(let t=0;t<r.length;t+=2){const n=r.slice(t,t+2);e[t/2]=parseInt(n,16)}return e.buffer}static ToUtf16String(t,r=!1){return s.toString(t,r)}static FromUtf16String(t,r=!1){return s.fromString(t,r)}static Base64Padding(t){const r=4-t.length%4;if(r<4)for(let e=0;e<r;e++)t+="=";return t}static formatString(t){return(null==t?void 0:t.replace(/[\n\r\t ]/g,""))||""}}i.DEFAULT_UTF8_ENCODING="utf8",r.BufferSourceConverter=e,r.Convert=i,r.assign=function(t){const r=arguments[0];for(let t=1;t<arguments.length;t++){const e=arguments[t];for(const t in e)r[t]=e[t]}return r},r.combine=function(...t){const r=t.map((t=>t.byteLength)).reduce(((t,r)=>t+r)),e=new Uint8Array(r);let n=0;return t.map((t=>new Uint8Array(t))).forEach((t=>{for(const r of t)e[n++]=r})),e.buffer},r.isEqual=function(t,r){if(!t||!r)return!1;if(t.byteLength!==r.byteLength)return!1;const e=new Uint8Array(t),n=new Uint8Array(r);for(let r=0;r<t.byteLength;r++)if(e[r]!==n[r])return!1;return!0}}));
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */class n{}n.x509={asPEM:(t,n)=>{r(e.Convert.FromString(t),n,"cer","application/pkix-cert")},asDER:(t,n)=>{r(e.Convert.FromString(t),n,"cer","application/pkix-cert")}},n.pkcs10={asPEM:(t,n)=>{r(e.Convert.FromString(t),n,"csr","application/pkcs10")},asDER:(t,n)=>{r(e.Convert.FromString(t),n,"csr","application/pkcs10")}};export{n as D,e as b,r as d}