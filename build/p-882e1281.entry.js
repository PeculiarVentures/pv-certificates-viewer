/*!
 * © Peculiar Ventures https://peculiarventures.com/ - MIT License
 */
import{r as t,c as e,h as r,H as o}from"./p-0b356bb5.js";import{i as a,a as s,b as c,c as i,d as n}from"./p-74c241e7.js";import"./p-a053c132.js";import{X as v}from"./p-6e79b9c8.js";import{X as p,C as l,a as h}from"./p-43eb3721.js";import{T as g,B as d}from"./p-7f9beaa8.js";
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */function b(t){return new Promise(((e,r)=>{const o=new FileReader;o.onload=()=>e({value:o.result,fileName:t.name,fileSize:t.size,sourceMime:t.type});o.onerror=()=>r(o.error);o.readAsBinaryString(t)}))}const f="*{-webkit-box-sizing:border-box;box-sizing:border-box;margin:0;padding:0;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;-moz-text-size-adjust:none;-ms-text-size-adjust:none;text-size-adjust:none;-webkit-text-size-adjust:none;-webkit-tap-highlight-color:transparent;font-family:var(--pv-font-family, inherit)}.t-h1{font-weight:var(--pv-text-h1-weight);font-size:var(--pv-text-h1-size);line-height:var(--pv-text-h1-height);letter-spacing:var(--pv-text-h1-spacing)}.t-h2{font-weight:var(--pv-text-h2-weight);font-size:var(--pv-text-h2-size);line-height:var(--pv-text-h2-height);letter-spacing:var(--pv-text-h2-spacing)}.t-h3{font-weight:var(--pv-text-h3-weight);font-size:var(--pv-text-h3-size);line-height:var(--pv-text-h3-height);letter-spacing:var(--pv-text-h3-spacing)}.t-h4{font-weight:var(--pv-text-h4-weight);font-size:var(--pv-text-h4-size);line-height:var(--pv-text-h4-height);letter-spacing:var(--pv-text-h4-spacing)}.t-h5{font-weight:var(--pv-text-h5-weight);font-size:var(--pv-text-h5-size);line-height:var(--pv-text-h5-height);letter-spacing:var(--pv-text-h5-spacing)}.t-s1{font-weight:var(--pv-text-s1-weight);font-size:var(--pv-text-s1-size);line-height:var(--pv-text-s1-height);letter-spacing:var(--pv-text-s1-spacing)}.t-s2{font-weight:var(--pv-text-s2-weight);font-size:var(--pv-text-s2-size);line-height:var(--pv-text-s2-height);letter-spacing:var(--pv-text-s2-spacing)}.t-b1{font-weight:var(--pv-text-b1-weight);font-size:var(--pv-text-b1-size);line-height:var(--pv-text-b1-height);letter-spacing:var(--pv-text-b1-spacing)}.t-b2{font-weight:var(--pv-text-b2-weight);font-size:var(--pv-text-b2-size);line-height:var(--pv-text-b2-height);letter-spacing:var(--pv-text-b2-spacing)}.t-b3{font-weight:var(--pv-text-b3-weight);font-size:var(--pv-text-b3-size);line-height:var(--pv-text-b3-height);letter-spacing:var(--pv-text-b3-spacing)}.t-btn1{font-weight:var(--pv-text-btn1-weight);font-size:var(--pv-text-btn1-size);line-height:var(--pv-text-btn1-height);letter-spacing:var(--pv-text-btn1-spacing)}.t-btn2{font-weight:var(--pv-text-btn2-weight);font-size:var(--pv-text-btn2-size);line-height:var(--pv-text-btn2-height);letter-spacing:var(--pv-text-btn2-spacing)}.t-c1{font-weight:var(--pv-text-c1-weight);font-size:var(--pv-text-c1-size);line-height:var(--pv-text-c1-height);letter-spacing:var(--pv-text-c1-spacing)}.t-c2{font-weight:var(--pv-text-c2-weight);font-size:var(--pv-text-c2-size);line-height:var(--pv-text-c2-height);letter-spacing:var(--pv-text-c2-spacing)}.c-primary-tint-5{--pv-color-base:var(--pv-color-primary-tint-5)}.c-primary-tint-4{--pv-color-base:var(--pv-color-primary-tint-4)}.c-primary-tint-3{--pv-color-base:var(--pv-color-primary-tint-3)}.c-primary-tint-2{--pv-color-base:var(--pv-color-primary-tint-2)}.c-primary-tint-1{--pv-color-base:var(--pv-color-primary-tint-1)}.c-primary{--pv-color-base:var(--pv-color-primary)}.c-primary-shade-1{--pv-color-base:var(--pv-color-primary-shade-1)}.c-primary-shade-2{--pv-color-base:var(--pv-color-primary-shade-2)}.c-primary-shade-3{--pv-color-base:var(--pv-color-primary-shade-3)}.c-primary-shade-4{--pv-color-base:var(--pv-color-primary-shade-4)}.c-primary-shade-5{--pv-color-base:var(--pv-color-primary-shade-5)}.c-primary-contrast{--pv-color-base:var(--pv-color-primary-contrast)}.c-secondary-tint-5{--pv-color-base:var(--pv-color-secondary-tint-5)}.c-secondary-tint-4{--pv-color-base:var(--pv-color-secondary-tint-4)}.c-secondary-tint-3{--pv-color-base:var(--pv-color-secondary-tint-3)}.c-secondary-tint-2{--pv-color-base:var(--pv-color-secondary-tint-2)}.c-secondary-tint-1{--pv-color-base:var(--pv-color-secondary-tint-1)}.c-secondary{--pv-color-base:var(--pv-color-secondary)}.c-secondary-shade-1{--pv-color-base:var(--pv-color-secondary-shade-1)}.c-secondary-shade-2{--pv-color-base:var(--pv-color-secondary-shade-2)}.c-secondary-shade-3{--pv-color-base:var(--pv-color-secondary-shade-3)}.c-secondary-shade-4{--pv-color-base:var(--pv-color-secondary-shade-4)}.c-secondary-shade-5{--pv-color-base:var(--pv-color-secondary-shade-5)}.c-secondary-contrast{--pv-color-base:var(--pv-color-secondary-contrast)}.c-wrong-tint-5{--pv-color-base:var(--pv-color-wrong-tint-5)}.c-wrong-tint-4{--pv-color-base:var(--pv-color-wrong-tint-4)}.c-wrong-tint-3{--pv-color-base:var(--pv-color-wrong-tint-3)}.c-wrong-tint-2{--pv-color-base:var(--pv-color-wrong-tint-2)}.c-wrong-tint-1{--pv-color-base:var(--pv-color-wrong-tint-1)}.c-wrong{--pv-color-base:var(--pv-color-wrong)}.c-wrong-shade-1{--pv-color-base:var(--pv-color-wrong-shade-1)}.c-wrong-shade-2{--pv-color-base:var(--pv-color-wrong-shade-2)}.c-wrong-shade-3{--pv-color-base:var(--pv-color-wrong-shade-3)}.c-wrong-shade-4{--pv-color-base:var(--pv-color-wrong-shade-4)}.c-wrong-shade-5{--pv-color-base:var(--pv-color-wrong-shade-5)}.c-wrong-contrast{--pv-color-base:var(--pv-color-wrong-contrast)}.c-attention-tint-5{--pv-color-base:var(--pv-color-attention-tint-5)}.c-attention-tint-4{--pv-color-base:var(--pv-color-attention-tint-4)}.c-attention-tint-3{--pv-color-base:var(--pv-color-attention-tint-3)}.c-attention-tint-2{--pv-color-base:var(--pv-color-attention-tint-2)}.c-attention-tint-1{--pv-color-base:var(--pv-color-attention-tint-1)}.c-attention{--pv-color-base:var(--pv-color-attention)}.c-attention-shade-1{--pv-color-base:var(--pv-color-attention-shade-1)}.c-attention-shade-2{--pv-color-base:var(--pv-color-attention-shade-2)}.c-attention-shade-3{--pv-color-base:var(--pv-color-attention-shade-3)}.c-attention-shade-4{--pv-color-base:var(--pv-color-attention-shade-4)}.c-attention-shade-5{--pv-color-base:var(--pv-color-attention-shade-5)}.c-success-tint-5{--pv-color-base:var(--pv-color-success-tint-5)}.c-success-tint-4{--pv-color-base:var(--pv-color-success-tint-4)}.c-success-tint-3{--pv-color-base:var(--pv-color-success-tint-3)}.c-success-tint-2{--pv-color-base:var(--pv-color-success-tint-2)}.c-success-tint-1{--pv-color-base:var(--pv-color-success-tint-1)}.c-success{--pv-color-base:var(--pv-color-success)}.c-success-shade-1{--pv-color-base:var(--pv-color-success-shade-1)}.c-success-shade-2{--pv-color-base:var(--pv-color-success-shade-2)}.c-success-shade-3{--pv-color-base:var(--pv-color-success-shade-3)}.c-success-shade-4{--pv-color-base:var(--pv-color-success-shade-4)}.c-success-shade-5{--pv-color-base:var(--pv-color-success-shade-5)}.c-black{--pv-color-base:var(--pv-color-black)}.c-gray-10{--pv-color-base:var(--pv-color-gray-10)}.c-gray-9{--pv-color-base:var(--pv-color-gray-9)}.c-gray-8{--pv-color-base:var(--pv-color-gray-8)}.c-gray-7{--pv-color-base:var(--pv-color-gray-7)}.c-gray-6{--pv-color-base:var(--pv-color-gray-6)}.c-gray-5{--pv-color-base:var(--pv-color-gray-5)}.c-gray-4{--pv-color-base:var(--pv-color-gray-4)}.c-gray-3{--pv-color-base:var(--pv-color-gray-3)}.c-gray-2{--pv-color-base:var(--pv-color-gray-2)}.c-gray-1{--pv-color-base:var(--pv-color-gray-1)}.c-white{--pv-color-base:var(--pv-color-white)}.c-extra-1{--pv-color-base:var(--pv-color-extra-1)}.c-extra-2{--pv-color-base:var(--pv-color-extra-2)}.typography{color:var(--pv-color-base)}.button{display:-ms-inline-flexbox;display:inline-flex;cursor:pointer;background:transparent;border:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;white-space:nowrap;text-decoration:none;outline:none;font-family:inherit;border-radius:4px;height:var(--pv-size-base-6);min-width:var(--pv-size-base-6);padding:0 var(--pv-size-base-2);-webkit-transition:background-color 200ms ease 0s;transition:background-color 200ms ease 0s;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;gap:var(--pv-size-base-2);font-size:0}.button.m_no_padding{padding:0}.button:hover{background-color:var(--pv-color-gray-3)}.button:focus{background-color:var(--pv-color-gray-4)}.button:active{background-color:var(--pv-color-gray-5)}:host{display:block;width:100%}.textarea{min-height:300px;width:100%;border-radius:4px;border:1px solid var(--pv-color-gray-5);padding:14px;font-family:monospace;resize:vertical}.viewer{margin-top:var(--pv-size-base-12)}.controls{margin-top:var(--pv-size-base-2);display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;gap:var(--pv-size-base-2)}.control_row{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;gap:var(--pv-size-base)}";const y=class{constructor(r){t(this,r);this.successParse=e(this,"successParse",7);this.clearCertificate=e(this,"clearCertificate",7);this.handleClickDecode=()=>{const{value:t}=this.inputPaste;if(t){this.decode(t)}};this.handleClickClear=()=>{this.clearValue()};this.handleChangeInputFile=async t=>{const e=t.target;if(e.files){const t=await b(e.files[0]);if(typeof t.value==="string"){this.decode(t.value)}e.value=""}};this.handleChangeExample=t=>{if(t.target.value){this.decode(t.target.value)}else{this.clearValue()}};this.handleDropFile=async t=>{t.stopPropagation();t.preventDefault();const e=t.dataTransfer;if(e.files){const t=await b(e.files[0]);if(typeof t.value==="string"){this.decode(t.value)}}};this.certificateExamples=undefined;this.defaultCertificate=undefined;this.certificateDecoded=undefined}componentDidLoad(){if(this.defaultCertificate){setTimeout((()=>this.decode(this.defaultCertificate)),100)}}clearValue(){this.inputPaste.value="";this.certificateDecoded=null;this.clearCertificate.emit()}setValue(t){this.certificateDecoded=t;this.inputPaste.value=t.exportAsPemFormatted();this.successParse.emit(t.exportAsBase64())}decode(t){const e=a(t);const r=s(t);const o=c(t);const g=i(t);const d=n(t);let b;let f;if(e&&!(r||g||o||d)){this.clearValue();alert("Unsupported file type. Please try to use Certificate/AttributeCertificate/CertificateRequest/CRL.");return}try{if(r){b=new v(t)}if(g){b=new p(t)}if(o){b=new l(t)}if(d){b=new h(t)}}catch(t){f=t}if(!b){try{b=new v(t)}catch(t){f=t}}if(!b){try{b=new p(t)}catch(t){f=t}}if(!b){try{b=new l(t)}catch(t){f=t}}if(!b){try{b=new h(t)}catch(t){f=t}}if(!b){this.clearValue();console.log(f);alert("Error decoding file. Please try to use Certificate/AttributeCertificate/CertificateRequest/CRL.")}else{this.setValue(b)}}render(){var t;return r(o,null,r("textarea",{placeholder:"Certificate DER or PEM",class:"textarea t-b2 c-black",ref:t=>{this.inputPaste=t},onDrop:this.handleDropFile}),r("div",{class:"controls"},r("div",{class:"control_row"},r(g,{variant:"b3",color:"secondary-tint-2"},"Drag or load file:"),r("input",{type:"file",accept:"application/pkix-cert,application/x-x509-ca-cert,application/x-x509-user-cert,application/pkcs10,application/pkix-crl,.csr,.req,.crl",onChange:this.handleChangeInputFile,value:""})),((t=this.certificateExamples)===null||t===void 0?void 0:t.length)&&r("div",{class:"control_row"},r(g,{variant:"b3",color:"secondary-tint-2"},"Load examples:"),r("select",{onChange:this.handleChangeExample},r("option",{value:""},"None"),this.certificateExamples.map((t=>r("option",{value:t.value},t.title))))),r("div",{class:"control_row"},r(d,{onClick:this.handleClickDecode},"Decode"),r(d,{onClick:this.handleClickClear},"Clear"))),this.certificateDecoded instanceof v&&r("peculiar-certificate-viewer",{certificate:this.certificateDecoded,class:"viewer",download:true}),this.certificateDecoded instanceof p&&r("peculiar-attribute-certificate-viewer",{certificate:this.certificateDecoded,class:"viewer",download:true}),this.certificateDecoded instanceof l&&r("peculiar-csr-viewer",{certificate:this.certificateDecoded,class:"viewer",download:true}),this.certificateDecoded instanceof h&&r("peculiar-crl-viewer",{certificate:this.certificateDecoded,class:"viewer",download:true}))}};y.style=f;export{y as peculiar_certificate_decoder};
//# sourceMappingURL=p-882e1281.entry.js.map