/*!
 * © Peculiar Ventures https://peculiarventures.com/ - MIT License
 */
import{h as n}from"./p-BjYAOwKZ.js";import{x as e,y as t,L as l,e as r}from"./p-B7MG4079.js";import{L as a}from"./p-CC7dFfEz.js";import{T as u,B as o}from"./p-CpHL_eyb.js";import{D as s}from"./p-uB43vJAo.js";
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */function i(n){return{getAuthKeyIdParentLink:e=>{var t;return(t=n.authKeyIdParentLink)===null||t===void 0?void 0:t.replace("{{authKeyId}}",e)},getAuthKeyIdSiblingsLink:e=>{var t;return(t=n.authKeyIdSiblingsLink)===null||t===void 0?void 0:t.replace("{{authKeyId}}",e)},getSubjectKeyIdChildrenLink:e=>{var t;return(t=n.subjectKeyIdChildrenLink)===null||t===void 0?void 0:t.replace("{{subjectKeyId}}",e)},getSubjectKeyIdSiblingsLink:e=>{var t;return(t=n.subjectKeyIdSiblingsLink)===null||t===void 0?void 0:t.replace("{{subjectKeyId}}",e)},getIssuerDnLink:()=>n.issuerDnLink}}async function c(n){var e;n.setLoading(true);(e=n.onStart)===null||e===void 0?void 0:e.call(n);try{const e=await n.run();if(typeof e==="undefined"){return}await n.onSuccess(e)}catch(e){n.onError(e)}finally{n.setLoading(false)}}
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */function d(n){return n.indexOf("http")===0}
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */const v=(e,t)=>n("tr",null,n("td",{colSpan:2},n("table",null,t)));const f=e=>{const{value:t}=e;if(!t){return null}return[n("tr",{class:"title"},n("td",{colSpan:2},n(u,{variant:"s1",color:"black"},t))),n("tr",null,n("td",{colSpan:2,class:"divider"},n("span",null)))]};const m=e=>{const{name:t,value:l,monospace:r,collapse:o,href:s,extraValue:i}=e;if(!t){return null}if(l===undefined||l===null){return null}let c;if(o){c=n("peculiar-text-hider",null,l)}else{c=l}const v=!!l.toString();return n("tr",null,n("td",{colSpan:v?1:2},n(u,{variant:"b2",color:"gray-9"},t)),v&&n("td",{class:{monospace:r}},d(l.toString())||s?n(a,{variant:"b2",href:s||l.toString()},l):n(u,{variant:"b2",color:"black"},c,i)))};
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */const p=l=>{const{serialNumber:r,version:a,validity:u,notBefore:o,notAfter:s,lastUpdate:i,nextUpdate:c,type:d}=l;return[n(f,{value:e.getString("basicInformation")}),n(m,{name:e.getString("type"),value:d}),n(m,{name:e.getString("serialNumber"),value:r,monospace:true}),n(m,{name:e.getString("version"),value:a}),n(m,{name:e.getString("validity"),value:u}),n(m,{name:e.getString("issued"),value:o?t(o):undefined}),n(m,{name:e.getString("expired"),value:s?t(s):undefined}),n(m,{name:e.getString("lastUpdate"),value:i?t(i):undefined}),n(m,{name:e.getString("nextUpdate"),value:c?t(c):undefined})]};
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */function b(n){if(n.params&&"modulus"in n.params){let e=n.params.modulus.byteLength;if(e%2){e-=1}return e*8}return null}function h(n){if(n.params&&"publicExponent"in n.params){return n.params.publicExponent.byteLength===3?65537:3}return null}const y=t=>{const{publicKey:a}=t;if(!a){return null}function u(t){return[n(m,{name:e.getString("algorithm"),value:l(t.algorithm)}),n(m,{name:e.getString("namedCurve"),value:l(t.params&&"namedCurve"in t.params?t.params.namedCurve:undefined)}),n(m,{name:e.getString("exponent"),value:h(t)}),n(m,{name:e.getString("modulus"),value:b(t)}),n(m,{name:e.getString("value"),value:r.Convert.ToHex(t.value),monospace:true,collapse:true})]}return[n(f,{value:e.getString("publicKeyInfo")}),u(a),Array.isArray(a.params)&&a.params.length&&a.params.map((e=>n(v,null,u(e))))]};
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */const g=t=>{const{name:r}=t;return[n(f,{value:e.getString("subjectName")}),r.map((e=>n(m,{name:l(e.type,true),value:e.value})))]};
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */const S=t=>{const{name:r,issuerDnLink:u}=t;const o=e.getString("issuerName");return[n(f,{value:u?n(a,{href:u},o):o}),r.map((e=>n(m,{name:l(e.type,true),value:e.value})))]};
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */const I=t=>{const{signature:a}=t;if(!a){return null}function u(t){return[n(m,{name:e.getString("algorithm"),value:l(t.algorithm)}),!t.mtcProof&&n(m,{name:e.getString("value"),value:t.value&&r.BufferSourceConverter.toUint8Array(t.value).length?r.Convert.ToHex(t.value):"(none)",monospace:true,collapse:true})]}function o(){const e=a.mtcProof;if(!e){return null}return[n(m,{name:"Start",value:e.start}),n(m,{name:"End",value:e.end}),n(m,{name:"Subtree Size",value:e.subtreeSize}),n(m,{name:"Landmark Relative",value:e.isLandmarkRelative?"YES":"NO"}),e.inclusionProof.length>0&&n(m,{name:"Inclusion Proof",value:e.inclusionProof.join("\n"),monospace:true,collapse:true}),e.signatures.length>0&&e.signatures.map((e=>n(v,null,n(m,{name:"Cosigner ID",value:e.cosignerId}),n(m,{name:"Signature",value:e.signature,monospace:true,collapse:true}))))]}return[n(f,{value:e.getString("signature")}),u(a),o(),a.params&&a.params.length&&a.params.map((e=>n(v,null,u(e))))]};
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */const j=t=>{const{thumbprints:l}=t;if(!l){return null}const r=Object.keys(l);if(!r.length){return null}return[n(f,{value:e.getString("fingerprints")}),r.map((e=>n(m,{name:e,value:l[e],monospace:true})))]};
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */const x=t=>{const{certificate:l}=t;return[n(f,{value:e.getString("miscellaneous")}),n("tr",null,n("td",null,n(o,{startIcon:n(s,null),onClick:()=>l.downloadAsPEM()},e.getString("download.pem")))),n("tr",null,n("td",null,n(o,{startIcon:n(s,null),onClick:()=>l.downloadAsDER()},e.getString("download.der"))))]};
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */const K=n=>`https://search.gleif.org/#/record/${n}`;const k=n=>`https://search.censys.io/search?resource=hosts&q=dns.names%3A${n}`;const C=n=>`https://search.censys.io/search?resource=hosts&q=ip%3A${n}`
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */;function L(n){if(!n._type||n.value==null)return undefined;const e=String(n.value);switch(n._type){case"dNSName":return k(e);case"iPAddress":return C(e);case"lei":return K(e);default:return undefined}}function A(e,t){var r,u,o,s;const i=l(e.title,true);const c=L(e);const d=e.value!=null?l(String(e.value)):"";if(e._type==="authorityKeyId"&&e.value!=null){const e=(r=t.getAuthKeyIdParentLink)===null||r===void 0?void 0:r.call(t,d);const l=(u=t.getAuthKeyIdSiblingsLink)===null||u===void 0?void 0:u.call(t,d);return n(m,{name:i,value:d,monospace:true,extraValue:[e&&n("span",null," [",n(a,{href:e},"parents"),"]"),l&&n("span",null," [",n(a,{href:l},"siblings"),"]")]})}if(e._type==="subjectKeyId"&&e.value!=null){const e=(o=t.getSubjectKeyIdChildrenLink)===null||o===void 0?void 0:o.call(t,d);const l=(s=t.getSubjectKeyIdSiblingsLink)===null||s===void 0?void 0:s.call(t,d);return n(m,{name:i,value:d,monospace:true,extraValue:[e&&n("span",null," [",n(a,{href:e},"children"),"]"),l&&n("span",null," [",n(a,{href:l},"siblings"),"]")]})}return n(m,{name:i,value:typeof e.value==="boolean"?e.value?"YES":"NO":d,href:c})}function N(e,t){var r,a,o;if(e.title&&!((r=e.value)===null||r===void 0?void 0:r.toString())){return[n(m,{name:l(e.title),value:""}),n(v,null,(a=e.children)===null||a===void 0?void 0:a.map((n=>N(n,t))))]}if((o=e.children)===null||o===void 0?void 0:o.length){return n(v,null,e.title&&n("tr",null,n("td",{colSpan:2},n(u,{variant:"b2",color:"gray-9"},l(e.title)))),e.children.map((n=>N(n,t))))}return A(e,t)}
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var O=undefined&&undefined.__rest||function(n,e){var t={};for(var l in n)if(Object.prototype.hasOwnProperty.call(n,l)&&e.indexOf(l)<0)t[l]=n[l];if(n!=null&&typeof Object.getOwnPropertySymbols==="function")for(var r=0,l=Object.getOwnPropertySymbols(n);r<l.length;r++){if(e.indexOf(l[r])<0&&Object.prototype.propertyIsEnumerable.call(n,l[r]))t[l[r]]=n[l[r]]}return t};const E=e=>{const{extensions:t,title:r="Extensions"}=e,a=O(e,["extensions","title"]);if(!(t===null||t===void 0?void 0:t.length)){return null}return[n(f,{value:r}),t.map((e=>[n("tr",null,n("td",{colSpan:2},n(u,{variant:"s2",color:"gray-9"},l(e.oid)))),n(m,{name:"Critical",value:e.critical?"YES":"NO"}),e.children.map((n=>N(n,a))),n("tr",null,n("td",{colSpan:2,class:"divider"},n("span",null)))]))]};export{p as B,S as I,x as M,y as P,f as R,g as S,j as T,I as a,i as b,E as c,m as d,v as e,N as f,c as r};
//# sourceMappingURL=p-Dx7xgxNm.js.map