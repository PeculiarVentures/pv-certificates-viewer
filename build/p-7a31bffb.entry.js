/*!
 * © Peculiar Ventures https://peculiarventures.com/ - MIT License
 */
import{h as t,r as e,H as i}from"./p-f7683ba5.js";import{Q as a,S as r,y as s,W as n,I as d,T as o,V as l,U as c,t as h,X as p,Y as b,Z as g}from"./p-3a4556ef.js";import{b as u}from"./p-cff9655c.js";import{l as m,a as x}from"./p-fec9d812.js";import{X as v,a as f,C as w}from"./p-7321a8d6.js";import{g as y,R as k,G as L,a as I,B as S,S as A,T as N,b as _,c as D,d as j,E as K,M as P,I as C,e as E,P as z}from"./p-1b11aa24.js";
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */const T=(e,i)=>{const{attribute:a}=e;return[t(k,{name:"Name",value:y(a.asn.type)}),i,t("tr",null,t("td",{colSpan:2,class:"divider"},t("span",{class:"bg_fill"})))]},H=e=>{const{name:i}=e;return i?i.map((e=>e.map((e=>t(k,{name:a[e.type]||e.type,value:e.value.toString()}))))):null},$=e=>{const{attribute:i}=e;return t(T,{attribute:i},t(H,{name:i.value}))},V=e=>{const{attribute:i}=e;return t(T,{attribute:i},t(k,{name:"Code Authority",value:""}),t(L,{generalName:i.value.codeAuthority,getDNSNameLink:()=>"",getIPAddressLink:()=>""}),t(k,{name:"Code Id",value:""}),t(L,{generalName:i.value.codeId,getDNSNameLink:()=>"",getIPAddressLink:()=>""}),t(k,{name:"Short Name",value:i.value.shortName}),t(k,{name:"Short Description",value:i.value.shortDescription}))},O=e=>{const{attribute:i}=e;return t(T,{attribute:i},t(k,{name:"Assessment Authority",value:""}),t(L,{generalName:i.value.assessmentAuthority,getDNSNameLink:()=>"",getIPAddressLink:()=>""}),t(k,{name:"Assessment Location",value:""}),t(L,{generalName:i.value.assessmentLocation,getDNSNameLink:()=>"",getIPAddressLink:()=>""}),t(k,{name:"Assessment Ref",value:""}),t(L,{generalName:i.value.assessmentRef,getDNSNameLink:()=>"",getIPAddressLink:()=>""}),t(k,{name:"Data Storage Territory",value:i.value.dataStorageTerritory}),t(k,{name:"Description",value:i.value.description}))},q=e=>{const{attribute:i}=e;return t(T,{attribute:i},t(k,{name:"Value",value:`${i.value.base} * 10^${i.value.degree} ${i.value.location}`}))},R=e=>{const{attribute:i}=e;return t(T,{attribute:i},Object.keys(i.value).map((e=>t(k,{name:e,value:i.value[e].toNumber()?m.getString("yes"):m.getString("no")}))))},W=t=>{let e=1;return t/100>1?e=100:t/10>1&&(e=10),`${t}/${5*e}`},X=e=>{const{attribute:i}=e,a=Object.keys(i.value).map((e=>[W(i.value[e]),t("br",null)]));return t(T,{attribute:i},t(k,{name:"Value",value:a}))},B=e=>{const{attribute:i}=e;return t(T,{attribute:i},t(k,{name:"Value",value:i.value,monospace:!0}))},G=e=>{const{attribute:i}=e;return t(T,{attribute:i},t(k,{name:"Value",value:i.value.utf8String}))},M=e=>{const{attribute:i}=e;return t(T,{attribute:i},t(k,{name:"Value",value:i.value.toString()}))},Q=e=>{const{attributes:i}=e;return i&&i.length?[t(I,{value:"Attributes"}),i.map((e=>{try{return t(e.value instanceof r?$:e.value instanceof s?V:e.value instanceof n?O:e.value instanceof d?q:e.value instanceof o?R:e.value instanceof l?X:e.value instanceof c?G:e.value instanceof h?M:"string"==typeof e.value?B:T,{attribute:e})}catch(t){return console.error("Error render attribute:",e.asn.type),null}}))]:null},U=e=>{const{issuer:i}=e;return i?[t(I,{value:m.getString("issuer")}),i.map((e=>t(L,{generalName:e,getDNSNameLink:()=>"",getIPAddressLink:()=>""})))]:null},Y=e=>{const{holder:i}=e;if(!i)return null;const{baseCertificateID:a,objectDigestInfo:r}=i;return[t(I,{value:m.getString("holder")}),a&&[a.issuer.map((e=>t(L,{generalName:e,getDNSNameLink:()=>"",getIPAddressLink:()=>""}))),t("tr",null,t("td",null),t("td",null)),t(k,{name:m.getString("serialNumber"),value:u.Convert.ToHex(a.serial),monospace:!0}),t("tr",null,t("td",null),t("td",null))],r&&[t(k,{name:m.getString("digestInfo"),value:""}),t(k,{name:m.getString("algorithm"),value:y(r.digestAlgorithm.algorithm)}),t(k,{name:m.getString("value"),value:u.Convert.ToHex(r.objectDigest),monospace:!0}),t(k,{name:m.getString("type"),value:r.digestedObjectType})]]},Z=class{constructor(t){e(this,t),this.isDecodeInProcess=!0,this.getAuthKeyIdParentLink=t=>{var e;return null===(e=this.authKeyIdParentLink)||void 0===e?void 0:e.replace("{{authKeyId}}",t)},this.getAuthKeyIdSiblingsLink=t=>{var e;return null===(e=this.authKeyIdSiblingsLink)||void 0===e?void 0:e.replace("{{authKeyId}}",t)},this.getSubjectKeyIdChildrenLink=t=>{var e;return null===(e=this.subjectKeyIdChildrenLink)||void 0===e?void 0:e.replace("{{subjectKeyId}}",t)},this.getSubjectKeyIdSiblingsLink=t=>{var e;return null===(e=this.subjectKeyIdSiblingsLink)||void 0===e?void 0:e.replace("{{subjectKeyId}}",t)}}componentWillLoad(){this.decodeCertificate(this.certificate)}async decodeCertificate(t){this.isDecodeInProcess=!0;try{if(t instanceof v)this.certificateDecoded=t;else{if("string"!=typeof t)return;this.certificateDecoded=new v(t)}this.certificateDecoded.parseExtensions(),this.certificateDecoded.parseAttributes(),await this.certificateDecoded.getThumbprint("SHA-1"),await this.certificateDecoded.getThumbprint("SHA-256")}catch(t){this.certificateDecodeError=t,console.error("Error certificate parse:",t)}this.isDecodeInProcess=!1}watchCertificateAndDecode(t,e){"string"!=typeof t||"string"!=typeof e?t instanceof v&&e instanceof v&&t.serialNumber!==e.serialNumber&&this.decodeCertificate(t):t!==e&&this.decodeCertificate(t)}renderErrorState(){return t("div",{class:"status_wrapper"},t("peculiar-typography",{type:"b1",class:"interaction_text"},"There was an error decoding this attribute certificate."))}renderEmptyState(){return t("div",{class:"status_wrapper"},t("peculiar-typography",{type:"b1",class:"interaction_text"},"There is no attribute certificate available."))}render(){return this.certificateDecodeError?this.renderErrorState():this.certificateDecoded?t(i,null,t("table",null,t(S,Object.assign({},this.certificateDecoded)),t(U,{issuer:this.certificateDecoded.issuer}),t(Y,{holder:this.certificateDecoded.holder}),t(A,{signature:this.certificateDecoded.signature}),t(N,{thumbprints:this.certificateDecoded.thumbprints}),t(Q,{attributes:this.certificateDecoded.attributes,getLEILink:_,getDNSNameLink:D,getIPAddressLink:j,getAuthKeyIdParentLink:this.getAuthKeyIdParentLink,getAuthKeyIdSiblingsLink:this.getAuthKeyIdSiblingsLink,getSubjectKeyIdChildrenLink:this.getSubjectKeyIdChildrenLink,getSubjectKeyIdSiblingsLink:this.getSubjectKeyIdSiblingsLink}),t(K,{extensions:this.certificateDecoded.extensions,getLEILink:_,getDNSNameLink:D,getIPAddressLink:j,getAuthKeyIdParentLink:this.getAuthKeyIdParentLink,getAuthKeyIdSiblingsLink:this.getAuthKeyIdSiblingsLink,getSubjectKeyIdChildrenLink:this.getSubjectKeyIdChildrenLink,getSubjectKeyIdSiblingsLink:this.getSubjectKeyIdSiblingsLink}),this.download&&t(P,{certificate:this.certificateDecoded}))):this.renderEmptyState()}static get watchers(){return{certificate:["watchCertificateAndDecode"]}}};
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */Z.style=":host{-webkit-box-sizing:border-box;box-sizing:border-box}:host *,:host *:before,:host *:after{-webkit-box-sizing:inherit;box-sizing:inherit}:host{display:block;width:100%;word-wrap:break-word;position:relative;min-width:280px;min-height:300px;background:white;background:rgba(var(--pv-color-light-rgb), 1)}th,td{border:none}table{width:100%;margin-bottom:30px;border-spacing:0;border-collapse:collapse}table .title td{border-color:rgba(209, 213, 217, 0.5);border-color:rgba(var(--pv-color-grey_3-rgb), 0.5);padding-top:60px;padding-bottom:15px;border-bottom-width:1px;border-bottom-style:solid}table td:first-child{padding-left:30px;width:130px;padding-right:10px}table td:last-child{padding-right:30px;width:calc(100% - 130px)}table td{vertical-align:top;padding-top:5px;padding-bottom:5px}table td.vertical_align_middle{vertical-align:middle}table .title:first-child td{padding-top:15px}table .title+tr td{padding-top:15px}table td.monospace{max-width:0}table .divider{padding-top:15px;padding-bottom:15px}.divider .bg_fill{background-color:rgba(209, 213, 217, 0.5);background-color:rgba(var(--pv-color-grey_3-rgb), 0.5)}table tr:last-child .divider{padding-top:0;opacity:0}.divider span{display:block;height:1px}.status_wrapper{min-height:inherit;display:-ms-flexbox;display:flex;-ms-flex-pack:center;justify-content:center;-ms-flex-align:center;align-items:center}.interaction_text{padding:15px 0;width:300px;margin:auto;text-align:center}@media (max-width: 900px){table,tr,td{display:block}table td:last-child,table td:first-child{padding-right:15px;padding-left:15px;width:100%}table .title+tr td{padding-top:5px}table .title+tr td:first-child{padding-top:15px}table td.monospace{width:100%;max-width:none}}:host([data-view=mobile]) table,:host([data-view=mobile]) tr,:host([data-view=mobile]) td{display:block}:host([data-view=mobile]) table td:last-child,:host([data-view=mobile]) table td:first-child{padding-right:15px;padding-left:15px;width:100%}:host([data-view=mobile]) table .title+tr td{padding-top:5px}:host([data-view=mobile]) table .title+tr td:first-child{padding-top:15px}:host([data-view=mobile]) table td.monospace{width:100%;max-width:none}";
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
const F=(e,i)=>t("tr",null,t("td",{colSpan:2},t("table",null,i))),J=e=>{const{revokedCertificates:i,getDNSNameLink:a,getIPAddressLink:r}=e;return i&&i.length?[t(I,{value:m.getString("revokedCertificates")}),i.map((e=>[t(k,{name:m.getString("serialNumber"),value:u.Convert.ToHex(e.userCertificate),monospace:!0}),t(k,{name:m.getString("revocationDate"),value:x(e.revocationDate.getTime())}),e.crlEntryExtensions&&e.crlEntryExtensions.length&&[t(k,{name:`${m.getString("crlEntryExtensions")}:`,value:""}),t(F,null,e.crlEntryExtensions.map((e=>e.value instanceof p?t(k,{name:y(e.asn.extnID),value:e.value.toJSON()||e.value.reason}):e.value instanceof b?t(k,{name:y(e.asn.extnID),value:e.value.value.getTime()}):e.value instanceof g&&e.value.length?[t(k,{name:`${y(e.asn.extnID)}:`,value:""}),e.value.map((e=>t(F,null,t(L,{generalName:e,getDNSNameLink:a,getIPAddressLink:r}))))]:t(k,{name:y(e.asn.extnID),value:u.Convert.ToHex(e.asn.extnValue),monospace:!0}))))],t("tr",null,t("td",{colSpan:2,class:"divider"},t("span",{class:"bg_fill"})))]))]:null},tt=class{constructor(t){e(this,t),this.isDecodeInProcess=!0,this.getAuthKeyIdParentLink=t=>{var e;return null===(e=this.authKeyIdParentLink)||void 0===e?void 0:e.replace("{{authKeyId}}",t)},this.getAuthKeyIdSiblingsLink=t=>{var e;return null===(e=this.authKeyIdSiblingsLink)||void 0===e?void 0:e.replace("{{authKeyId}}",t)}}componentWillLoad(){this.decodeCertificate(this.certificate)}async decodeCertificate(t){this.isDecodeInProcess=!0;try{if(t instanceof f)this.certificateDecoded=t;else{if("string"!=typeof t)return;this.certificateDecoded=new f(t)}this.certificateDecoded.parseExtensions(),await this.certificateDecoded.getThumbprint("SHA-1"),await this.certificateDecoded.getThumbprint("SHA-256")}catch(t){this.certificateDecodeError=t,console.error("Error certificate parse:",t)}this.isDecodeInProcess=!1}getIssuerDnLink(){return this.issuerDnLink}watchCertificateAndDecode(t,e){"string"!=typeof t||"string"!=typeof e?t instanceof f&&e instanceof f&&t.commonName!==e.commonName&&this.decodeCertificate(t):t!==e&&this.decodeCertificate(t)}renderErrorState(){return t("div",{class:"status_wrapper"},t("peculiar-typography",{type:"b1",class:"interaction_text"},"There was an error decoding this certificate revocation list."))}renderEmptyState(){return t("div",{class:"status_wrapper"},t("peculiar-typography",{type:"b1",class:"interaction_text"},"There is no certificate revocation list available."))}render(){return this.certificateDecodeError?this.renderErrorState():this.certificateDecoded?t(i,{"data-view":this.view},t("table",null,t(S,Object.assign({},this.certificateDecoded)),t(C,{name:this.certificateDecoded.issuer,issuerDnLink:this.getIssuerDnLink()}),t(A,{signature:this.certificateDecoded.signature}),t(N,{thumbprints:this.certificateDecoded.thumbprints}),t(K,{extensions:this.certificateDecoded.extensions,getLEILink:_,getDNSNameLink:D,getIPAddressLink:j,getAuthKeyIdParentLink:this.getAuthKeyIdParentLink,getAuthKeyIdSiblingsLink:this.getAuthKeyIdSiblingsLink}),t(J,{revokedCertificates:this.certificateDecoded.revokedCertificates,getDNSNameLink:D,getIPAddressLink:j}),this.download&&t(P,{certificate:this.certificateDecoded}))):this.renderEmptyState()}static get watchers(){return{certificate:["watchCertificateAndDecode"]}}};tt.style=":host{-webkit-box-sizing:border-box;box-sizing:border-box}:host *,:host *:before,:host *:after{-webkit-box-sizing:inherit;box-sizing:inherit}:host{display:block;width:100%;word-wrap:break-word;position:relative;min-width:280px;min-height:300px;background:white;background:rgba(var(--pv-color-light-rgb), 1)}th,td{border:none}table{width:100%;margin-bottom:30px;border-spacing:0;border-collapse:collapse}table .title td{border-color:rgba(209, 213, 217, 0.5);border-color:rgba(var(--pv-color-grey_3-rgb), 0.5);padding-top:60px;padding-bottom:15px;border-bottom-width:1px;border-bottom-style:solid}table td:first-child{padding-left:30px;width:130px;padding-right:10px}table td:last-child{padding-right:30px;width:calc(100% - 130px)}table td{vertical-align:top;padding-top:5px;padding-bottom:5px}table td.vertical_align_middle{vertical-align:middle}table .title:first-child td{padding-top:15px}table .title+tr td{padding-top:15px}table td.monospace{max-width:0}table .divider{padding-top:15px;padding-bottom:15px}.divider .bg_fill{background-color:rgba(209, 213, 217, 0.5);background-color:rgba(var(--pv-color-grey_3-rgb), 0.5)}table tr:last-child .divider{padding-top:0;opacity:0}.divider span{display:block;height:1px}.status_wrapper{min-height:inherit;display:-ms-flexbox;display:flex;-ms-flex-pack:center;justify-content:center;-ms-flex-align:center;align-items:center}.interaction_text{padding:15px 0;width:300px;margin:auto;text-align:center}@media (max-width: 900px){table,tr,td{display:block}table td:last-child,table td:first-child{padding-right:15px;padding-left:15px;width:100%}table .title+tr td{padding-top:5px}table .title+tr td:first-child{padding-top:15px}table td.monospace{width:100%;max-width:none}}:host([data-view=mobile]) table,:host([data-view=mobile]) tr,:host([data-view=mobile]) td{display:block}:host([data-view=mobile]) table td:last-child,:host([data-view=mobile]) table td:first-child{padding-right:15px;padding-left:15px;width:100%}:host([data-view=mobile]) table .title+tr td{padding-top:5px}:host([data-view=mobile]) table .title+tr td:first-child{padding-top:15px}:host([data-view=mobile]) table td.monospace{width:100%;max-width:none}";const et=class{constructor(t){e(this,t),this.isDecodeInProcess=!0,this.getAuthKeyIdParentLink=t=>t,this.getAuthKeyIdSiblingsLink=t=>t,this.getSubjectKeyIdChildrenLink=t=>{var e;return null===(e=this.subjectKeyIdChildrenLink)||void 0===e?void 0:e.replace("{{subjectKeyId}}",t)},this.getSubjectKeyIdSiblingsLink=t=>{var e;return null===(e=this.subjectKeyIdSiblingsLink)||void 0===e?void 0:e.replace("{{subjectKeyId}}",t)}}componentWillLoad(){this.decodeCertificate(this.certificate)}async decodeCertificate(t){this.isDecodeInProcess=!0;try{if(t instanceof w)this.certificateDecoded=t;else{if("string"!=typeof t)return;this.certificateDecoded=new w(t)}this.certificateDecoded.parseAttributes(),await this.certificateDecoded.getThumbprint("SHA-1"),await this.certificateDecoded.getThumbprint("SHA-256")}catch(t){this.certificateDecodeError=t,console.error("Error certificate parse:",t)}this.isDecodeInProcess=!1}watchCertificateAndDecode(t,e){"string"!=typeof t||"string"!=typeof e?t instanceof w&&e instanceof w&&t.commonName!==e.commonName&&this.decodeCertificate(t):t!==e&&this.decodeCertificate(t)}renderErrorState(){return t("div",{class:"status_wrapper"},t("peculiar-typography",{type:"b1",class:"interaction_text"},"There was an error decoding this certificate request."))}renderEmptyState(){return t("div",{class:"status_wrapper"},t("peculiar-typography",{type:"b1",class:"interaction_text"},"There is no certificate request available."))}getExtensionRequestAttribute(){if(this.certificateDecoded)return this.certificateDecoded.attributes.find((t=>"1.2.840.113549.1.9.14"===t.asn.type))}render(){if(this.certificateDecodeError)return this.renderErrorState();if(!this.certificateDecoded)return this.renderEmptyState();const e=this.getExtensionRequestAttribute();return t(i,{"data-view":this.view},t("table",null,t(S,Object.assign({},this.certificateDecoded)),t(E,{name:this.certificateDecoded.subject}),t(z,{publicKey:this.certificateDecoded.publicKey}),t(A,{signature:this.certificateDecoded.signature}),t(N,{thumbprints:this.certificateDecoded.thumbprints}),t(Q,{attributes:this.certificateDecoded.attributes,getLEILink:_,getDNSNameLink:D,getIPAddressLink:j,getAuthKeyIdParentLink:this.getAuthKeyIdParentLink,getAuthKeyIdSiblingsLink:this.getAuthKeyIdSiblingsLink,getSubjectKeyIdChildrenLink:this.getSubjectKeyIdChildrenLink,getSubjectKeyIdSiblingsLink:this.getSubjectKeyIdSiblingsLink}),t(K,{extensions:null==e?void 0:e.value,title:"Extension Request",getLEILink:_,getDNSNameLink:D,getIPAddressLink:j,getAuthKeyIdParentLink:this.getAuthKeyIdParentLink,getAuthKeyIdSiblingsLink:this.getAuthKeyIdSiblingsLink,getSubjectKeyIdChildrenLink:this.getSubjectKeyIdChildrenLink,getSubjectKeyIdSiblingsLink:this.getSubjectKeyIdSiblingsLink}),this.download&&t(P,{certificate:this.certificateDecoded})))}static get watchers(){return{certificate:["watchCertificateAndDecode"]}}};et.style=":host{-webkit-box-sizing:border-box;box-sizing:border-box}:host *,:host *:before,:host *:after{-webkit-box-sizing:inherit;box-sizing:inherit}:host{display:block;width:100%;word-wrap:break-word;position:relative;min-width:280px;min-height:300px;background:white;background:rgba(var(--pv-color-light-rgb), 1)}th,td{border:none}table{width:100%;margin-bottom:30px;border-spacing:0;border-collapse:collapse}table .title td{border-color:rgba(209, 213, 217, 0.5);border-color:rgba(var(--pv-color-grey_3-rgb), 0.5);padding-top:60px;padding-bottom:15px;border-bottom-width:1px;border-bottom-style:solid}table td:first-child{padding-left:30px;width:130px;padding-right:10px}table td:last-child{padding-right:30px;width:calc(100% - 130px)}table td{vertical-align:top;padding-top:5px;padding-bottom:5px}table td.vertical_align_middle{vertical-align:middle}table .title:first-child td{padding-top:15px}table .title+tr td{padding-top:15px}table td.monospace{max-width:0}table .divider{padding-top:15px;padding-bottom:15px}.divider .bg_fill{background-color:rgba(209, 213, 217, 0.5);background-color:rgba(var(--pv-color-grey_3-rgb), 0.5)}table tr:last-child .divider{padding-top:0;opacity:0}.divider span{display:block;height:1px}.status_wrapper{min-height:inherit;display:-ms-flexbox;display:flex;-ms-flex-pack:center;justify-content:center;-ms-flex-align:center;align-items:center}.interaction_text{padding:15px 0;width:300px;margin:auto;text-align:center}@media (max-width: 900px){table,tr,td{display:block}table td:last-child,table td:first-child{padding-right:15px;padding-left:15px;width:100%}table .title+tr td{padding-top:5px}table .title+tr td:first-child{padding-top:15px}table td.monospace{width:100%;max-width:none}}:host([data-view=mobile]) table,:host([data-view=mobile]) tr,:host([data-view=mobile]) td{display:block}:host([data-view=mobile]) table td:last-child,:host([data-view=mobile]) table td:first-child{padding-right:15px;padding-left:15px;width:100%}:host([data-view=mobile]) table .title+tr td{padding-top:5px}:host([data-view=mobile]) table .title+tr td:first-child{padding-top:15px}:host([data-view=mobile]) table td.monospace{width:100%;max-width:none}";export{Z as peculiar_attribute_certificate_viewer,tt as peculiar_crl_viewer,et as peculiar_csr_viewer}