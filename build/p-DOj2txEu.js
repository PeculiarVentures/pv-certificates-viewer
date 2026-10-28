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
 */function c(e){return{getAuthKeyIdParentLink:n=>e.authKeyIdParentLink?.replace("{{authKeyId}}",n),getAuthKeyIdSiblingsLink:n=>e.authKeyIdSiblingsLink?.replace("{{authKeyId}}",n),getSubjectKeyIdChildrenLink:n=>e.subjectKeyIdChildrenLink?.replace("{{subjectKeyId}}",n),getSubjectKeyIdSiblingsLink:n=>e.subjectKeyIdSiblingsLink?.replace("{{subjectKeyId}}",n),getIssuerDnLink:()=>e.issuerDnLink}}async function m(e){e.setLoading(!0),e.onStart?.();try{const n=await e.run();if(void 0===n)return;await e.onSuccess(n)}catch(n){e.onError(n)}finally{e.setLoading(!1)}}
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
const v=(n,a)=>e("tr",null,e("td",{colSpan:2},e("table",null,a))),p=n=>{const{value:a}=n;return a?[e("tr",{class:"title"},e("td",{colSpan:2},e(s,{variant:"s1",color:"black"},a))),e("tr",null,e("td",{colSpan:2,class:"divider"},e("span",null)))]:null},d=n=>{const{name:a,value:l,monospace:t,collapse:r,href:o,extraValue:i}=n;if(!a)return null;if(null==l)return null;let c;c=r?e("peculiar-text-hider",null,l):l;const m=!!l.toString();return e("tr",null,e("td",{colSpan:m?1:2},e(s,{variant:"b2",color:"gray-9"},a)),m&&e("td",{class:{monospace:Boolean(t)}},function(e){return 0===e.indexOf("http")}(l.toString())||o?e(u,{variant:"b2",href:o||l.toString()},l):e(s,{variant:"b2",color:"black"},c,i)))},f=l=>{const{serialNumber:t,version:r,validity:u,notBefore:s,notAfter:o,lastUpdate:i,nextUpdate:c,type:m}=l;return[e(p,{value:n.getString("basicInformation")}),e(d,{name:n.getString("type"),value:m}),e(d,{name:n.getString("serialNumber"),value:t,monospace:!0}),e(d,{name:n.getString("version"),value:r}),e(d,{name:n.getString("validity"),value:u}),e(d,{name:n.getString("issued"),value:s?a(s):void 0}),e(d,{name:n.getString("expired"),value:o?a(o):void 0}),e(d,{name:n.getString("lastUpdate"),value:i?a(i):void 0}),e(d,{name:n.getString("nextUpdate"),value:c?a(c):void 0})]};
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
function h(e){if(e.params&&"modulus"in e.params){let n=e.params.modulus.byteLength;return n%2&&(n-=1),8*n}return null}function b(e){return e.params&&"publicExponent"in e.params?3===e.params.publicExponent.byteLength?65537:3:null}const y=a=>{const{publicKey:r}=a;if(!r)return null;function u(a){const r=a.params&&"namedCurve"in a.params?a.params.namedCurve??"":"";return[e(d,{name:n.getString("algorithm"),value:l(a.algorithm)}),e(d,{name:n.getString("namedCurve"),value:r?l(r):void 0}),e(d,{name:n.getString("exponent"),value:b(a)}),e(d,{name:n.getString("modulus"),value:h(a)}),e(d,{name:n.getString("value"),value:t.encode(a.value),monospace:!0,collapse:!0})]}return[e(p,{value:n.getString("publicKeyInfo")}),u(r),Array.isArray(r.params)&&r.params.length&&r.params.map((n=>e(v,null,u(n))))]},g=a=>{const{name:t}=a;return[e(p,{value:n.getString("subjectName")}),t.map((n=>e(d,{name:l(n.type,!0),value:n.value})))]},S=a=>{const{name:t,issuerDnLink:r}=a,s=n.getString("issuerName");return[e(p,{value:r?e(u,{href:r},s):s}),t.map((n=>e(d,{name:l(n.type,!0),value:n.value})))]},I=a=>{const{signature:u}=a;if(!u)return null;function s(a){return[e(d,{name:n.getString("algorithm"),value:l(a.algorithm)}),a.mtcProofError&&e(d,{name:"MTC Proof Error",value:a.mtcProofError}),!a.mtcProof&&e(d,{name:n.getString("value"),value:a.value&&r(a.value).length?t.encode(a.value):"(none)",monospace:!0,collapse:!0})]}return[e(p,{value:n.getString("signature")}),s(u),function(){const n=u.mtcProof;return n?[e(d,{name:"Start",value:n.start}),e(d,{name:"End",value:n.end}),e(d,{name:"Subtree Size",value:n.subtreeSize}),e(d,{name:"Landmark Relative",value:n.isLandmarkRelative?"YES":"NO"}),n.inclusionProof.length>0&&e(d,{name:"Inclusion Proof",value:n.inclusionProof.join("\n"),monospace:!0,collapse:!0}),n.signatures.length>0&&n.signatures.map((n=>e(v,null,e(d,{name:"Cosigner ID",value:n.cosignerId}),e(d,{name:"Signature",value:n.signature,monospace:!0,collapse:!0}))))]:null}(),u.params&&u.params.length&&u.params.map((n=>e(v,null,s(n))))]},x=a=>{const{thumbprints:l}=a;if(!l)return null;const t=Object.keys(l);return t.length?[e(p,{value:n.getString("fingerprints")}),t.map((n=>e(d,{name:n,value:l[n],monospace:!0})))]:null},j=a=>{const{certificate:l}=a;return[e(p,{value:n.getString("miscellaneous")}),e("tr",null,e("td",null,e(o,{startIcon:e(i,null),onClick:()=>l.downloadAsPEM()},n.getString("download.pem")))),e("tr",null,e("td",null,e(o,{startIcon:e(i,null),onClick:()=>l.downloadAsDER()},n.getString("download.der"))))]};
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */function K(n,a){return n.title&&!n.value?.toString()?[e(d,{name:l(n.title),value:""}),e(v,null,n.children?.map((e=>K(e,a))))]:n.children?.length?e(v,null,n.title&&e("tr",null,e("td",{colSpan:2},e(s,{variant:"b2",color:"gray-9"},l(n.title)))),n.children.map((e=>K(e,a)))):function(n,a){const t=l(n.title??"",!0),r=
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
function(e){if(!e._type||null==e.value)return;const n=String(e.value);switch(e._type){case"dNSName":return`https://search.censys.io/search?resource=hosts&q=dns.names%3A${n}`;case"iPAddress":return`https://search.censys.io/search?resource=hosts&q=ip%3A${n}`;case"lei":return`https://search.gleif.org/#/record/${n}`;default:return}}(n),s=null!=n.value?l(String(n.value)):"";if("authorityKeyId"===n._type&&null!=n.value){const n=a.getAuthKeyIdParentLink?.(s),l=a.getAuthKeyIdSiblingsLink?.(s);return e(d,{name:t,value:s,monospace:!0,extraValue:[n&&e("span",null," [",e(u,{href:n},"parents"),"]"),l&&e("span",null," [",e(u,{href:l},"siblings"),"]")]})}if("subjectKeyId"===n._type&&null!=n.value){const n=a.getSubjectKeyIdChildrenLink?.(s),l=a.getSubjectKeyIdSiblingsLink?.(s);return e(d,{name:t,value:s,monospace:!0,extraValue:[n&&e("span",null," [",e(u,{href:n},"children"),"]"),l&&e("span",null," [",e(u,{href:l},"siblings"),"]")]})}return e(d,{name:t,value:"boolean"==typeof n.value?n.value?"YES":"NO":s,href:r})}(n,a)}
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */const k=n=>{const{extensions:a,title:t="Extensions",...r}=n;return a?.length?[e(p,{value:t}),a.map((n=>[e("tr",null,e("td",{colSpan:2},e(s,{variant:"s2",color:"gray-9"},l(n.oid)))),e(d,{name:"Critical",value:n.critical?"YES":"NO"}),n.children.map((e=>K(e,r))),e("tr",null,e("td",{colSpan:2,class:"divider"},e("span",null)))]))]:null};export{f as B,S as I,j as M,y as P,p as R,g as S,x as T,I as a,c as b,k as c,d,v as e,K as f,m as r}