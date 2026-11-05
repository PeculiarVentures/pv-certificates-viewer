/*!
 * © Peculiar Ventures https://peculiarventures.com/ - MIT License
 */
import{h as e}from"./p-UZLUj4zt.js";import{a as n,I as a,p as l,H as t}from"./p-DR7M9pZW.js";import{L as r}from"./p-DapaQua0.js";import{T as u,B as s}from"./p-C8xWu-wE.js";import{D as o}from"./p-C8x0ew5S.js";
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
const c=(n,a)=>e("tr",null,e("td",{colSpan:2},e("table",null,a))),m=n=>{const{value:a}=n;return a?[e("tr",{class:"title"},e("td",{colSpan:2},e(u,{variant:"s1",color:"black"},a))),e("tr",null,e("td",{colSpan:2,class:"divider"},e("span",null)))]:null},p=n=>{const{name:a,value:l,monospace:t,collapse:s,href:o,extraValue:i}=n;if(!a)return null;if(null==l)return null;let c;c=s?e("peculiar-text-hider",null,l):l;const m=!!l.toString();return e("tr",null,e("td",{colSpan:m?1:2},e(u,{variant:"b2",color:"gray-9"},a)),m&&e("td",{class:{monospace:Boolean(t)}},function(e){return 0===e.indexOf("http")}(l.toString())||o?e(r,{variant:"b2",href:o||l.toString()},l):e(u,{variant:"b2",color:"black"},c,i)))},v=e=>"number"==typeof e?e+1:void 0,d=a=>{const{serialNumber:l,version:t,validity:r,notBefore:u,notAfter:s,lastUpdate:o,nextUpdate:i,type:c}=a;return[e(m,{value:"Basic Information"}),e(p,{name:"Type",value:c}),e(p,{name:"Serial Number",value:l,monospace:!0}),e(p,{name:"Version",value:t}),e(p,{name:"Validity",value:r}),e(p,{name:"Issued",value:u?n(u):void 0}),e(p,{name:"Expired",value:s?n(s):void 0}),e(p,{name:"Last Update",value:o?n(o):void 0}),e(p,{name:"Next Update",value:i?n(i):void 0})]};
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
function f(e){if(e.params&&"modulus"in e.params){let n=e.params.modulus.byteLength;return n%2&&(n-=1),8*n}return null}function h(e){return e.params&&"publicExponent"in e.params?3===e.params.publicExponent.byteLength?65537:3:null}const b=n=>{const{publicKey:t}=n;if(!t)return null;function r(n){const t=n.params&&"namedCurve"in n.params?n.params.namedCurve??"":"";return[e(p,{name:"Algorithm",value:a(n.algorithm)}),e(p,{name:"Named Curve",value:t?a(t):void 0}),e(p,{name:"Exponent",value:h(n)}),e(p,{name:"Modulus",value:f(n)}),e(p,{name:"Value",value:l.encode(n.value),monospace:!0,collapse:!0})]}return[e(m,{value:"Public Key Info"}),r(t),Array.isArray(t.params)&&t.params.length&&t.params.map((n=>e(c,null,r(n))))]},y=n=>{const{name:l}=n;return[e(m,{value:"Subject Name"}),l.map((n=>e(p,{name:a(n.type,!0),value:n.value})))]},S=n=>{const{name:l,issuerDnLink:t}=n,u="Issuer Name";return[e(m,{value:t?e(r,{href:t},u):u}),l.map((n=>e(p,{name:a(n.type,!0),value:n.value})))]},g=n=>{const{signature:r}=n;if(!r)return null;function u(n){return[e(p,{name:"Algorithm",value:a(n.algorithm)}),n.mtcProofError&&e(p,{name:"MTC Proof Error",value:n.mtcProofError}),!n.mtcProof&&e(p,{name:"Value",value:n.value&&t(n.value).length?l.encode(n.value):"(none)",monospace:!0,collapse:!0})]}return[e(m,{value:"Signature"}),u(r),function(){const n=r.mtcProof;return n?[e(p,{name:"Start",value:n.start}),e(p,{name:"End",value:n.end}),e(p,{name:"Subtree Size",value:n.subtreeSize}),e(p,{name:"Landmark Relative",value:n.isLandmarkRelative?"YES":"NO"}),n.inclusionProof.length>0&&e(p,{name:"Inclusion Proof",value:n.inclusionProof.join("\n"),monospace:!0,collapse:!0}),n.signatures.length>0&&n.signatures.map((n=>e(c,null,e(p,{name:"Cosigner ID",value:n.cosignerId}),e(p,{name:"Signature",value:n.signature,monospace:!0,collapse:!0}))))]:null}(),r.params&&r.params.length&&r.params.map((n=>e(c,null,u(n))))]},I=n=>{const{thumbprints:a}=n;if(!a)return null;const l=Object.keys(a);return l.length?[e(m,{value:"Fingerprints"}),l.map((n=>e(p,{name:n,value:a[n],monospace:!0})))]:null},x=n=>{const{certificate:a}=n;return[e(m,{value:"Miscellaneous"}),e("tr",null,e("td",null,e(s,{startIcon:e(o,null),onClick:()=>a.downloadAsPEM()},"Download PEM"))),e("tr",null,e("td",null,e(s,{startIcon:e(o,null),onClick:()=>a.downloadAsDER()},"Download DER")))]};
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */function j(n,l){return n.title&&!n.value?.toString()?[e(p,{name:a(n.title),value:""}),e(c,null,n.children?.map((e=>j(e,l))))]:n.children?.length?e(c,null,n.title&&e("tr",null,e("td",{colSpan:2},e(u,{variant:"b2",color:"gray-9"},a(n.title)))),n.children.map((e=>j(e,l)))):function(n,l){const t=a(n.title??"",!0),u=
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
function(e){if(!e._type||null==e.value)return;const n=String(e.value);switch(e._type){case"dNSName":return`https://search.censys.io/search?resource=hosts&q=dns.names%3A${n}`;case"iPAddress":return`https://search.censys.io/search?resource=hosts&q=ip%3A${n}`;case"lei":return`https://search.gleif.org/#/record/${n}`;default:return}}(n),s=null!=n.value?a(String(n.value)):"";if("authorityKeyId"===n._type&&null!=n.value){const n=l.getAuthKeyIdParentLink?.(s),a=l.getAuthKeyIdSiblingsLink?.(s);return e(p,{name:t,value:s,monospace:!0,extraValue:[n&&e("span",null," [",e(r,{href:n},"parents"),"]"),a&&e("span",null," [",e(r,{href:a},"siblings"),"]")]})}if("subjectKeyId"===n._type&&null!=n.value){const n=l.getSubjectKeyIdChildrenLink?.(s),a=l.getSubjectKeyIdSiblingsLink?.(s);return e(p,{name:t,value:s,monospace:!0,extraValue:[n&&e("span",null," [",e(r,{href:n},"children"),"]"),a&&e("span",null," [",e(r,{href:a},"siblings"),"]")]})}return e(p,{name:t,value:"boolean"==typeof n.value?n.value?"YES":"NO":s,href:u})}(n,l)}
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */const k=n=>{const{extensions:l,title:t="Extensions",...r}=n;return l?.length?[e(m,{value:t}),l.map((n=>[e("tr",null,e("td",{colSpan:2},e(u,{variant:"s2",color:"gray-9"},a(n.oid)))),e(p,{name:"Critical",value:n.critical?"YES":"NO"}),n.children.map((e=>j(e,r))),e("tr",null,e("td",{colSpan:2,class:"divider"},e("span",null)))]))]:null},E=new WeakMap;async function K(e,n){const a=(E.get(e)??0)+1,l=()=>E.get(e)===a;E.set(e,a),n.onStart?.();try{const e=await n.run();l()&&void 0!==e&&n.onSuccess(e)}catch(e){l()&&n.onError(e)}}export{d as B,S as I,x as M,b as P,m as R,y as S,I as T,g as a,i as b,k as c,p as d,c as e,j as f,K as r,v as t}