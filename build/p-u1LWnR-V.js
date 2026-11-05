/*!
 * © Peculiar Ventures https://peculiarventures.com/ - MIT License
 */
import{h as e,H as n}from"./p-BkaKMuue.js";import{i as a,E as l}from"./p-BQXR598Z.js";import{L as t}from"./p-Dp_Iv2lE.js";import{T as r,B as s}from"./p-BHtICQkh.js";import{A as u,D as o}from"./p-DFxDzKOD.js";
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */function i(e){return{getAuthKeyIdParentLink:n=>e.authKeyIdParentLink?.replace("{{authKeyId}}",n),getAuthKeyIdSiblingsLink:n=>e.authKeyIdSiblingsLink?.replace("{{authKeyId}}",n),getSubjectKeyIdChildrenLink:n=>e.subjectKeyIdChildrenLink?.replace("{{subjectKeyId}}",n),getSubjectKeyIdSiblingsLink:n=>e.subjectKeyIdSiblingsLink?.replace("{{subjectKeyId}}",n),getIssuerDnLink:()=>e.issuerDnLink}}
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
const c=(n,a)=>e("tr",null,e("td",{colSpan:2},e("table",null,a))),d=n=>{const{value:a}=n;return a?[e("tr",{class:"title"},e("td",{colSpan:2},e(r,{variant:"s1",color:"black"},a))),e("tr",null,e("td",{colSpan:2,class:"divider"},e("span",null)))]:null},p=n=>{const{name:a,value:l,monospace:s,collapse:o,href:i,extraValue:c}=n;if(!a)return null;if(null==l)return null;let d;d=o?e("span",{class:"text_hider"},e("span",{class:"text_hider_content"},l),e("details",{class:"text_hider_toggle"},e("summary",{class:"button m_no_padding","aria-label":"Show full value"},e(u,{color:"secondary"})))):l;const p=!!l.toString();return e("tr",null,e("td",{colSpan:p?1:2},e(r,{variant:"b2",color:"gray-9"},a)),p&&e("td",{class:{monospace:Boolean(s)}},function(e){return 0===e.indexOf("http")}(l.toString())||i?e(t,{variant:"b2",href:i||l.toString()},l):e(r,{variant:"b2",color:"black"},d,c)))},m=n=>{const{serialNumber:l,version:t,validity:r,notBefore:s,notAfter:u,lastUpdate:o,nextUpdate:i,type:c}=n;return[e(d,{value:"Basic Information"}),e(p,{name:"Type",value:c}),e(p,{name:"Serial Number",value:l,monospace:!0}),e(p,{name:"Version",value:t}),e(p,{name:"Validity",value:r}),e(p,{name:"Issued",value:s?a(s):void 0}),e(p,{name:"Expired",value:u?a(u):void 0}),e(p,{name:"Last Update",value:o?a(o):void 0}),e(p,{name:"Next Update",value:i?a(i):void 0})]},v=n=>[e(p,{name:"Algorithm",value:l(n.algorithm)}),e(p,{name:"Named Curve",value:n.namedCurve?l(n.namedCurve):void 0}),e(p,{name:"Exponent",value:n.exponent}),e(p,{name:"Modulus",value:n.modulusBits}),e(p,{name:"Value",value:n.value,monospace:!0,collapse:!0})],f=({publicKey:n})=>n?[e(d,{value:"Public Key Info"}),v(n),n.parts?.map((n=>e(c,null,v(n))))]:null,h=({title:n,name:a,href:r})=>[e(d,{value:r?e(t,{href:r},n):n}),a.map((n=>e(p,{name:l(n.type,!0),value:n.value})))]
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */,b=n=>[e(p,{name:"Algorithm",value:l(n.algorithm)}),n.mtcProofError&&e(p,{name:"MTC Proof Error",value:n.mtcProofError}),!n.mtcProof&&e(p,{name:"Value",value:n.value||"(none)",monospace:!0,collapse:!0})],y=({signature:n})=>{if(!n)return null;const a=n.mtcProof;return[e(d,{value:"Signature"}),b(n),a&&[e(p,{name:"Start",value:a.start}),e(p,{name:"End",value:a.end}),e(p,{name:"Subtree Size",value:a.subtreeSize}),e(p,{name:"Landmark Relative",value:a.isLandmarkRelative?"YES":"NO"}),a.inclusionProof.length>0&&e(p,{name:"Inclusion Proof",value:a.inclusionProof.join("\n"),monospace:!0,collapse:!0}),a.signatures.map((n=>e(c,null,e(p,{name:"Cosigner ID",value:n.cosignerId}),e(p,{name:"Signature",value:n.signature,monospace:!0,collapse:!0}))))],n.parts?.map((n=>e(c,null,b(n))))]},g=n=>{const{thumbprints:a}=n;if(!a)return null;const l=Object.keys(a);return l.length?[e(d,{value:"Fingerprints"}),l.map((n=>e(p,{name:n,value:a[n],monospace:!0})))]:null},S=n=>{const{certificate:a}=n;return[e(d,{value:"Miscellaneous"}),e("tr",null,e("td",null,e(s,{startIcon:e(o,null),onClick:()=>a.download("pem")},"Download PEM"))),e("tr",null,e("td",null,e(s,{startIcon:e(o,null),onClick:()=>a.download("der")},"Download DER")))]};function I(n,a,l){return e(p,{name:n,value:a,monospace:!0,extraValue:l.map((([n,a])=>a&&e("span",null," [",e(t,{href:a},n),"]")))})}function E(n,a){return n.title&&!n.value?.toString()?[e(p,{name:l(n.title),value:""}),e(c,null,n.children?.map((e=>E(e,a))))]:n.children?.length?e(c,null,n.title&&e("tr",null,e("td",{colSpan:2},e(r,{variant:"b2",color:"gray-9"},l(n.title)))),n.children.map((e=>E(e,a)))):function(n,a){const t=l(n.title??"",!0),r=
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
function(e){if(!e._type||null==e.value)return;const n=String(e.value);switch(e._type){case"dNSName":return`https://search.censys.io/search?resource=hosts&q=dns.names%3A${n}`;case"iPAddress":return`https://search.censys.io/search?resource=hosts&q=ip%3A${n}`;case"lei":return`https://search.gleif.org/#/record/${n}`;default:return}}(n),s=null!=n.value?l(String(n.value)):"";return null!=n.value&&"authorityKeyId"===n._type?I(t,s,[["parents",a.getAuthKeyIdParentLink?.(s)],["siblings",a.getAuthKeyIdSiblingsLink?.(s)]]):null!=n.value&&"subjectKeyId"===n._type?I(t,s,[["children",a.getSubjectKeyIdChildrenLink?.(s)],["siblings",a.getSubjectKeyIdSiblingsLink?.(s)]]):e(p,{name:t,value:"boolean"==typeof n.value?n.value?"YES":"NO":s,href:r})}(n,a)}
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */const K=n=>{const{extensions:a,title:t="Extensions",...s}=n;return a?.length?[e(d,{value:t}),a.map((n=>[e("tr",null,e("td",{colSpan:2},e(r,{variant:"s2",color:"gray-9"},l(n.oid)))),e(p,{name:"Critical",value:n.critical?"YES":"NO"}),n.children.map((e=>E(e,s))),e("tr",null,e("td",{colSpan:2,class:"divider"},e("span",null)))]))]:null},k=new WeakMap;function x(e,n){return async function(e,n){const a=(k.get(e)??0)+1,l=()=>k.get(e)===a;k.set(e,a),n.onStart?.();try{const e=await n.run();l()&&void 0!==e&&n.onSuccess(e)}catch(e){l()&&n.onError(e)}}(e,{onStart:()=>{e.certificateDecodeError=void 0},run:n,onSuccess:n=>{e.certificateDecoded=n},onError:n=>{e.certificateDecodeError=n,console.error("Error certificate parse:",n)}})}function j(e,n){return e instanceof n?e:"string"==typeof e?new n(e):void 0}
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */function w({viewer:a,subject:l,body:t}){return a.certificateDecodeError?e("div",{class:"status_wrapper"},e(r,null,"There was an error decoding this ",l,".")):a.certificateDecoded?e(n,null,e("table",null,t(a.certificateDecoded))):e("div",{class:"status_wrapper"},e(r,null,"There is no ",l," available."))}export{m as B,S as M,h as N,f as P,d as R,y as S,g as T,K as a,i as b,p as c,x as d,c as e,E as f,w as r,j as t}