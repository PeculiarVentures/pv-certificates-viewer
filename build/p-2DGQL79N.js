/*!
 * © Peculiar Ventures https://peculiarventures.com/ - MIT License
 */
import{h as e}from"./p-BkaKMuue.js";import{a as n,I as a,p as l,H as t}from"./p-DR7M9pZW.js";import{L as r}from"./p-Dp_Iv2lE.js";import{T as u,B as s}from"./p-BHtICQkh.js";import{A as o,D as i}from"./p-DFxDzKOD.js";
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */function c(e){return{getAuthKeyIdParentLink:n=>e.authKeyIdParentLink?.replace("{{authKeyId}}",n),getAuthKeyIdSiblingsLink:n=>e.authKeyIdSiblingsLink?.replace("{{authKeyId}}",n),getSubjectKeyIdChildrenLink:n=>e.subjectKeyIdChildrenLink?.replace("{{subjectKeyId}}",n),getSubjectKeyIdSiblingsLink:n=>e.subjectKeyIdSiblingsLink?.replace("{{subjectKeyId}}",n),getIssuerDnLink:()=>e.issuerDnLink}}
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
const m=(n,a)=>e("tr",null,e("td",{colSpan:2},e("table",null,a))),p=n=>{const{value:a}=n;return a?[e("tr",{class:"title"},e("td",{colSpan:2},e(u,{variant:"s1",color:"black"},a))),e("tr",null,e("td",{colSpan:2,class:"divider"},e("span",null)))]:null},d=n=>{const{name:a,value:l,monospace:t,collapse:s,href:i,extraValue:c}=n;if(!a)return null;if(null==l)return null;let m;m=s?e("span",{class:"text_hider"},e("span",{class:"text_hider_content"},l),e("details",{class:"text_hider_toggle"},e("summary",{class:"button m_no_padding","aria-label":"Show full value"},e(o,{color:"secondary"})))):l;const p=!!l.toString();return e("tr",null,e("td",{colSpan:p?1:2},e(u,{variant:"b2",color:"gray-9"},a)),p&&e("td",{class:{monospace:Boolean(t)}},function(e){return 0===e.indexOf("http")}(l.toString())||i?e(r,{variant:"b2",href:i||l.toString()},l):e(u,{variant:"b2",color:"black"},m,c)))},v=e=>"number"==typeof e?e+1:void 0,f=a=>{const{serialNumber:l,version:t,validity:r,notBefore:u,notAfter:s,lastUpdate:o,nextUpdate:i,type:c}=a;return[e(p,{value:"Basic Information"}),e(d,{name:"Type",value:c}),e(d,{name:"Serial Number",value:l,monospace:!0}),e(d,{name:"Version",value:t}),e(d,{name:"Validity",value:r}),e(d,{name:"Issued",value:u?n(u):void 0}),e(d,{name:"Expired",value:s?n(s):void 0}),e(d,{name:"Last Update",value:o?n(o):void 0}),e(d,{name:"Next Update",value:i?n(i):void 0})]};
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
function h(e){if(e.params&&"modulus"in e.params){let n=e.params.modulus.byteLength;return n%2&&(n-=1),8*n}return null}function b(e){return e.params&&"publicExponent"in e.params?3===e.params.publicExponent.byteLength?65537:3:null}const y=n=>{const{publicKey:t}=n;if(!t)return null;function r(n){const t=n.params&&"namedCurve"in n.params?n.params.namedCurve??"":"";return[e(d,{name:"Algorithm",value:a(n.algorithm)}),e(d,{name:"Named Curve",value:t?a(t):void 0}),e(d,{name:"Exponent",value:b(n)}),e(d,{name:"Modulus",value:h(n)}),e(d,{name:"Value",value:l.encode(n.value),monospace:!0,collapse:!0})]}return[e(p,{value:"Public Key Info"}),r(t),Array.isArray(t.params)&&t.params.length&&t.params.map((n=>e(m,null,r(n))))]},g=n=>{const{name:l}=n;return[e(p,{value:"Subject Name"}),l.map((n=>e(d,{name:a(n.type,!0),value:n.value})))]},S=n=>{const{name:l,issuerDnLink:t}=n,u="Issuer Name";return[e(p,{value:t?e(r,{href:t},u):u}),l.map((n=>e(d,{name:a(n.type,!0),value:n.value})))]},I=n=>{const{signature:r}=n;if(!r)return null;function u(n){return[e(d,{name:"Algorithm",value:a(n.algorithm)}),n.mtcProofError&&e(d,{name:"MTC Proof Error",value:n.mtcProofError}),!n.mtcProof&&e(d,{name:"Value",value:n.value&&t(n.value).length?l.encode(n.value):"(none)",monospace:!0,collapse:!0})]}return[e(p,{value:"Signature"}),u(r),function(){const n=r.mtcProof;return n?[e(d,{name:"Start",value:n.start}),e(d,{name:"End",value:n.end}),e(d,{name:"Subtree Size",value:n.subtreeSize}),e(d,{name:"Landmark Relative",value:n.isLandmarkRelative?"YES":"NO"}),n.inclusionProof.length>0&&e(d,{name:"Inclusion Proof",value:n.inclusionProof.join("\n"),monospace:!0,collapse:!0}),n.signatures.length>0&&n.signatures.map((n=>e(m,null,e(d,{name:"Cosigner ID",value:n.cosignerId}),e(d,{name:"Signature",value:n.signature,monospace:!0,collapse:!0}))))]:null}(),r.params&&r.params.length&&r.params.map((n=>e(m,null,u(n))))]},x=n=>{const{thumbprints:a}=n;if(!a)return null;const l=Object.keys(a);return l.length?[e(p,{value:"Fingerprints"}),l.map((n=>e(d,{name:n,value:a[n],monospace:!0})))]:null},k=n=>{const{certificate:a}=n;return[e(p,{value:"Miscellaneous"}),e("tr",null,e("td",null,e(s,{startIcon:e(i,null),onClick:()=>a.downloadAsPEM()},"Download PEM"))),e("tr",null,e("td",null,e(s,{startIcon:e(i,null),onClick:()=>a.downloadAsDER()},"Download DER")))]};
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */function K(n,l){return n.title&&!n.value?.toString()?[e(d,{name:a(n.title),value:""}),e(m,null,n.children?.map((e=>K(e,l))))]:n.children?.length?e(m,null,n.title&&e("tr",null,e("td",{colSpan:2},e(u,{variant:"b2",color:"gray-9"},a(n.title)))),n.children.map((e=>K(e,l)))):function(n,l){const t=a(n.title??"",!0),u=
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
function(e){if(!e._type||null==e.value)return;const n=String(e.value);switch(e._type){case"dNSName":return`https://search.censys.io/search?resource=hosts&q=dns.names%3A${n}`;case"iPAddress":return`https://search.censys.io/search?resource=hosts&q=ip%3A${n}`;case"lei":return`https://search.gleif.org/#/record/${n}`;default:return}}(n),s=null!=n.value?a(String(n.value)):"";if("authorityKeyId"===n._type&&null!=n.value){const n=l.getAuthKeyIdParentLink?.(s),a=l.getAuthKeyIdSiblingsLink?.(s);return e(d,{name:t,value:s,monospace:!0,extraValue:[n&&e("span",null," [",e(r,{href:n},"parents"),"]"),a&&e("span",null," [",e(r,{href:a},"siblings"),"]")]})}if("subjectKeyId"===n._type&&null!=n.value){const n=l.getSubjectKeyIdChildrenLink?.(s),a=l.getSubjectKeyIdSiblingsLink?.(s);return e(d,{name:t,value:s,monospace:!0,extraValue:[n&&e("span",null," [",e(r,{href:n},"children"),"]"),a&&e("span",null," [",e(r,{href:a},"siblings"),"]")]})}return e(d,{name:t,value:"boolean"==typeof n.value?n.value?"YES":"NO":s,href:u})}(n,l)}
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */const j=n=>{const{extensions:l,title:t="Extensions",...r}=n;return l?.length?[e(p,{value:t}),l.map((n=>[e("tr",null,e("td",{colSpan:2},e(u,{variant:"s2",color:"gray-9"},a(n.oid)))),e(d,{name:"Critical",value:n.critical?"YES":"NO"}),n.children.map((e=>K(e,r))),e("tr",null,e("td",{colSpan:2,class:"divider"},e("span",null)))]))]:null},D=new WeakMap;async function E(e,n){const a=(D.get(e)??0)+1,l=()=>D.get(e)===a;D.set(e,a),n.onStart?.();try{const e=await n.run();l()&&void 0!==e&&n.onSuccess(e)}catch(e){l()&&n.onError(e)}}export{f as B,S as I,k as M,y as P,p as R,g as S,x as T,I as a,c as b,j as c,d,m as e,K as f,E as r,v as t}