/*!
 * © Peculiar Ventures https://peculiarventures.com/ - MIT License
 */
import{h as e}from"./p-UZLUj4zt.js";import{l as n,a,J as l,q as t,I as r}from"./p-BACBwd1c.js";import{L as u}from"./p-DapaQua0.js";import{T as s,B as o}from"./p-C8xWu-wE.js";import{D as i}from"./p-C8x0ew5S.js";
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */function c(e){return{getAuthKeyIdParentLink:n=>e.authKeyIdParentLink?.replace("{{authKeyId}}",n),getAuthKeyIdSiblingsLink:n=>e.authKeyIdSiblingsLink?.replace("{{authKeyId}}",n),getSubjectKeyIdChildrenLink:n=>e.subjectKeyIdChildrenLink?.replace("{{subjectKeyId}}",n),getSubjectKeyIdSiblingsLink:n=>e.subjectKeyIdSiblingsLink?.replace("{{subjectKeyId}}",n),getIssuerDnLink:()=>e.issuerDnLink}}const m=new WeakMap;async function p(e,n){const a=(m.get(e)??0)+1,l=()=>m.get(e)===a;m.set(e,a),n.onStart?.();try{const e=await n.run();l()&&void 0!==e&&n.onSuccess(e)}catch(e){l()&&n.onError(e)}}
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
const v=(n,a)=>e("tr",null,e("td",{colSpan:2},e("table",null,a))),d=n=>{const{value:a}=n;return a?[e("tr",{class:"title"},e("td",{colSpan:2},e(s,{variant:"s1",color:"black"},a))),e("tr",null,e("td",{colSpan:2,class:"divider"},e("span",null)))]:null},f=n=>{const{name:a,value:l,monospace:t,collapse:r,href:o,extraValue:i}=n;if(!a)return null;if(null==l)return null;let c;c=r?e("peculiar-text-hider",null,l):l;const m=!!l.toString();return e("tr",null,e("td",{colSpan:m?1:2},e(s,{variant:"b2",color:"gray-9"},a)),m&&e("td",{class:{monospace:Boolean(t)}},function(e){return 0===e.indexOf("http")}(l.toString())||o?e(u,{variant:"b2",href:o||l.toString()},l):e(s,{variant:"b2",color:"black"},c,i)))},h=e=>"number"==typeof e?e+1:void 0,b=l=>{const{serialNumber:t,version:r,validity:u,notBefore:s,notAfter:o,lastUpdate:i,nextUpdate:c,type:m}=l;return[e(d,{value:n.getString("basicInformation")}),e(f,{name:n.getString("type"),value:m}),e(f,{name:n.getString("serialNumber"),value:t,monospace:!0}),e(f,{name:n.getString("version"),value:r}),e(f,{name:n.getString("validity"),value:u}),e(f,{name:n.getString("issued"),value:s?a(s):void 0}),e(f,{name:n.getString("expired"),value:o?a(o):void 0}),e(f,{name:n.getString("lastUpdate"),value:i?a(i):void 0}),e(f,{name:n.getString("nextUpdate"),value:c?a(c):void 0})]};
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
function y(e){if(e.params&&"modulus"in e.params){let n=e.params.modulus.byteLength;return n%2&&(n-=1),8*n}return null}function g(e){return e.params&&"publicExponent"in e.params?3===e.params.publicExponent.byteLength?65537:3:null}const S=a=>{const{publicKey:r}=a;if(!r)return null;function u(a){const r=a.params&&"namedCurve"in a.params?a.params.namedCurve??"":"";return[e(f,{name:n.getString("algorithm"),value:l(a.algorithm)}),e(f,{name:n.getString("namedCurve"),value:r?l(r):void 0}),e(f,{name:n.getString("exponent"),value:g(a)}),e(f,{name:n.getString("modulus"),value:y(a)}),e(f,{name:n.getString("value"),value:t.encode(a.value),monospace:!0,collapse:!0})]}return[e(d,{value:n.getString("publicKeyInfo")}),u(r),Array.isArray(r.params)&&r.params.length&&r.params.map((n=>e(v,null,u(n))))]},I=a=>{const{name:t}=a;return[e(d,{value:n.getString("subjectName")}),t.map((n=>e(f,{name:l(n.type,!0),value:n.value})))]},x=a=>{const{name:t,issuerDnLink:r}=a,s=n.getString("issuerName");return[e(d,{value:r?e(u,{href:r},s):s}),t.map((n=>e(f,{name:l(n.type,!0),value:n.value})))]},j=a=>{const{signature:u}=a;if(!u)return null;function s(a){return[e(f,{name:n.getString("algorithm"),value:l(a.algorithm)}),a.mtcProofError&&e(f,{name:"MTC Proof Error",value:a.mtcProofError}),!a.mtcProof&&e(f,{name:n.getString("value"),value:a.value&&r(a.value).length?t.encode(a.value):"(none)",monospace:!0,collapse:!0})]}return[e(d,{value:n.getString("signature")}),s(u),function(){const n=u.mtcProof;return n?[e(f,{name:"Start",value:n.start}),e(f,{name:"End",value:n.end}),e(f,{name:"Subtree Size",value:n.subtreeSize}),e(f,{name:"Landmark Relative",value:n.isLandmarkRelative?"YES":"NO"}),n.inclusionProof.length>0&&e(f,{name:"Inclusion Proof",value:n.inclusionProof.join("\n"),monospace:!0,collapse:!0}),n.signatures.length>0&&n.signatures.map((n=>e(v,null,e(f,{name:"Cosigner ID",value:n.cosignerId}),e(f,{name:"Signature",value:n.signature,monospace:!0,collapse:!0}))))]:null}(),u.params&&u.params.length&&u.params.map((n=>e(v,null,s(n))))]},k=a=>{const{thumbprints:l}=a;if(!l)return null;const t=Object.keys(l);return t.length?[e(d,{value:n.getString("fingerprints")}),t.map((n=>e(f,{name:n,value:l[n],monospace:!0})))]:null},K=a=>{const{certificate:l}=a;return[e(d,{value:n.getString("miscellaneous")}),e("tr",null,e("td",null,e(o,{startIcon:e(i,null),onClick:()=>l.downloadAsPEM()},n.getString("download.pem")))),e("tr",null,e("td",null,e(o,{startIcon:e(i,null),onClick:()=>l.downloadAsDER()},n.getString("download.der"))))]};
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */function C(n,a){return n.title&&!n.value?.toString()?[e(f,{name:l(n.title),value:""}),e(v,null,n.children?.map((e=>C(e,a))))]:n.children?.length?e(v,null,n.title&&e("tr",null,e("td",{colSpan:2},e(s,{variant:"b2",color:"gray-9"},l(n.title)))),n.children.map((e=>C(e,a)))):function(n,a){const t=l(n.title??"",!0),r=
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
function(e){if(!e._type||null==e.value)return;const n=String(e.value);switch(e._type){case"dNSName":return`https://search.censys.io/search?resource=hosts&q=dns.names%3A${n}`;case"iPAddress":return`https://search.censys.io/search?resource=hosts&q=ip%3A${n}`;case"lei":return`https://search.gleif.org/#/record/${n}`;default:return}}(n),s=null!=n.value?l(String(n.value)):"";if("authorityKeyId"===n._type&&null!=n.value){const n=a.getAuthKeyIdParentLink?.(s),l=a.getAuthKeyIdSiblingsLink?.(s);return e(f,{name:t,value:s,monospace:!0,extraValue:[n&&e("span",null," [",e(u,{href:n},"parents"),"]"),l&&e("span",null," [",e(u,{href:l},"siblings"),"]")]})}if("subjectKeyId"===n._type&&null!=n.value){const n=a.getSubjectKeyIdChildrenLink?.(s),l=a.getSubjectKeyIdSiblingsLink?.(s);return e(f,{name:t,value:s,monospace:!0,extraValue:[n&&e("span",null," [",e(u,{href:n},"children"),"]"),l&&e("span",null," [",e(u,{href:l},"siblings"),"]")]})}return e(f,{name:t,value:"boolean"==typeof n.value?n.value?"YES":"NO":s,href:r})}(n,a)}
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */const L=n=>{const{extensions:a,title:t="Extensions",...r}=n;return a?.length?[e(d,{value:t}),a.map((n=>[e("tr",null,e("td",{colSpan:2},e(s,{variant:"s2",color:"gray-9"},l(n.oid)))),e(f,{name:"Critical",value:n.critical?"YES":"NO"}),n.children.map((e=>C(e,r))),e("tr",null,e("td",{colSpan:2,class:"divider"},e("span",null)))]))]:null};export{b as B,x as I,K as M,S as P,d as R,I as S,k as T,j as a,c as b,L as c,f as d,v as e,C as f,p as r,h as t}