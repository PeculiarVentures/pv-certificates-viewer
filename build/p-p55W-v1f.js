/*!
 * © Peculiar Ventures https://peculiarventures.com/ - MIT License
 */
import{h as e}from"./p-UZLUj4zt.js";import{w as n,x as a,M as l,e as t}from"./p-DentHfOz.js";import{L as r}from"./p-DapaQua0.js";import{T as u,B as s}from"./p-C8xWu-wE.js";import{D as o}from"./p-C8x0ew5S.js";
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */function i(e){return{getAuthKeyIdParentLink:n=>e.authKeyIdParentLink?.replace("{{authKeyId}}",n),getAuthKeyIdSiblingsLink:n=>e.authKeyIdSiblingsLink?.replace("{{authKeyId}}",n),getSubjectKeyIdChildrenLink:n=>e.subjectKeyIdChildrenLink?.replace("{{subjectKeyId}}",n),getSubjectKeyIdSiblingsLink:n=>e.subjectKeyIdSiblingsLink?.replace("{{subjectKeyId}}",n),getIssuerDnLink:()=>e.issuerDnLink}}async function c(e){e.setLoading(!0),e.onStart?.();try{const n=await e.run();if(void 0===n)return;await e.onSuccess(n)}catch(n){e.onError(n)}finally{e.setLoading(!1)}}
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
const m=(n,a)=>e("tr",null,e("td",{colSpan:2},e("table",null,a))),p=n=>{const{value:a}=n;return a?[e("tr",{class:"title"},e("td",{colSpan:2},e(u,{variant:"s1",color:"black"},a))),e("tr",null,e("td",{colSpan:2,class:"divider"},e("span",null)))]:null},v=n=>{const{name:a,value:l,monospace:t,collapse:s,href:o,extraValue:i}=n;if(!a)return null;if(null==l)return null;let c;c=s?e("peculiar-text-hider",null,l):l;const m=!!l.toString();return e("tr",null,e("td",{colSpan:m?1:2},e(u,{variant:"b2",color:"gray-9"},a)),m&&e("td",{class:{monospace:Boolean(t)}},function(e){return 0===e.indexOf("http")}(l.toString())||o?e(r,{variant:"b2",href:o||l.toString()},l):e(u,{variant:"b2",color:"black"},c,i)))},d=l=>{const{serialNumber:t,version:r,validity:u,notBefore:s,notAfter:o,lastUpdate:i,nextUpdate:c,type:m}=l;return[e(p,{value:n.getString("basicInformation")}),e(v,{name:n.getString("type"),value:m}),e(v,{name:n.getString("serialNumber"),value:t,monospace:!0}),e(v,{name:n.getString("version"),value:r}),e(v,{name:n.getString("validity"),value:u}),e(v,{name:n.getString("issued"),value:s?a(s):void 0}),e(v,{name:n.getString("expired"),value:o?a(o):void 0}),e(v,{name:n.getString("lastUpdate"),value:i?a(i):void 0}),e(v,{name:n.getString("nextUpdate"),value:c?a(c):void 0})]};
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
function f(e){if(e.params&&"modulus"in e.params){let n=e.params.modulus.byteLength;return n%2&&(n-=1),8*n}return null}function h(e){return e.params&&"publicExponent"in e.params?3===e.params.publicExponent.byteLength?65537:3:null}const b=a=>{const{publicKey:r}=a;if(!r)return null;function u(a){return[e(v,{name:n.getString("algorithm"),value:l(a.algorithm)}),e(v,{name:n.getString("namedCurve"),value:l(a.params&&"namedCurve"in a.params?a.params.namedCurve??"":"")}),e(v,{name:n.getString("exponent"),value:h(a)}),e(v,{name:n.getString("modulus"),value:f(a)}),e(v,{name:n.getString("value"),value:t.Convert.ToHex(a.value),monospace:!0,collapse:!0})]}return[e(p,{value:n.getString("publicKeyInfo")}),u(r),Array.isArray(r.params)&&r.params.length&&r.params.map((n=>e(m,null,u(n))))]},y=a=>{const{name:t}=a;return[e(p,{value:n.getString("subjectName")}),t.map((n=>e(v,{name:l(n.type,!0),value:n.value})))]},g=a=>{const{name:t,issuerDnLink:u}=a,s=n.getString("issuerName");return[e(p,{value:u?e(r,{href:u},s):s}),t.map((n=>e(v,{name:l(n.type,!0),value:n.value})))]},S=a=>{const{signature:r}=a;if(!r)return null;function u(a){return[e(v,{name:n.getString("algorithm"),value:l(a.algorithm)}),!a.mtcProof&&e(v,{name:n.getString("value"),value:a.value&&t.BufferSourceConverter.toUint8Array(a.value).length?t.Convert.ToHex(a.value):"(none)",monospace:!0,collapse:!0})]}return[e(p,{value:n.getString("signature")}),u(r),function(){const n=r.mtcProof;return n?[e(v,{name:"Start",value:n.start}),e(v,{name:"End",value:n.end}),e(v,{name:"Subtree Size",value:n.subtreeSize}),e(v,{name:"Landmark Relative",value:n.isLandmarkRelative?"YES":"NO"}),n.inclusionProof.length>0&&e(v,{name:"Inclusion Proof",value:n.inclusionProof.join("\n"),monospace:!0,collapse:!0}),n.signatures.length>0&&n.signatures.map((n=>e(m,null,e(v,{name:"Cosigner ID",value:n.cosignerId}),e(v,{name:"Signature",value:n.signature,monospace:!0,collapse:!0}))))]:null}(),r.params&&r.params.length&&r.params.map((n=>e(m,null,u(n))))]},I=a=>{const{thumbprints:l}=a;if(!l)return null;const t=Object.keys(l);return t.length?[e(p,{value:n.getString("fingerprints")}),t.map((n=>e(v,{name:n,value:l[n],monospace:!0})))]:null},x=a=>{const{certificate:l}=a;return[e(p,{value:n.getString("miscellaneous")}),e("tr",null,e("td",null,e(s,{startIcon:e(o,null),onClick:()=>l.downloadAsPEM()},n.getString("download.pem")))),e("tr",null,e("td",null,e(s,{startIcon:e(o,null),onClick:()=>l.downloadAsDER()},n.getString("download.der"))))]};
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */function j(n,a){return n.title&&!n.value?.toString()?[e(v,{name:l(n.title),value:""}),e(m,null,n.children?.map((e=>j(e,a))))]:n.children?.length?e(m,null,n.title&&e("tr",null,e("td",{colSpan:2},e(u,{variant:"b2",color:"gray-9"},l(n.title)))),n.children.map((e=>j(e,a)))):function(n,a){const t=l(n.title??"",!0),u=
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
function(e){if(!e._type||null==e.value)return;const n=String(e.value);switch(e._type){case"dNSName":return`https://search.censys.io/search?resource=hosts&q=dns.names%3A${n}`;case"iPAddress":return`https://search.censys.io/search?resource=hosts&q=ip%3A${n}`;case"lei":return`https://search.gleif.org/#/record/${n}`;default:return}}(n),s=null!=n.value?l(String(n.value)):"";if("authorityKeyId"===n._type&&null!=n.value){const n=a.getAuthKeyIdParentLink?.(s),l=a.getAuthKeyIdSiblingsLink?.(s);return e(v,{name:t,value:s,monospace:!0,extraValue:[n&&e("span",null," [",e(r,{href:n},"parents"),"]"),l&&e("span",null," [",e(r,{href:l},"siblings"),"]")]})}if("subjectKeyId"===n._type&&null!=n.value){const n=a.getSubjectKeyIdChildrenLink?.(s),l=a.getSubjectKeyIdSiblingsLink?.(s);return e(v,{name:t,value:s,monospace:!0,extraValue:[n&&e("span",null," [",e(r,{href:n},"children"),"]"),l&&e("span",null," [",e(r,{href:l},"siblings"),"]")]})}return e(v,{name:t,value:"boolean"==typeof n.value?n.value?"YES":"NO":s,href:u})}(n,a)}
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */const K=n=>{const{extensions:a,title:t="Extensions",...r}=n;return a?.length?[e(p,{value:t}),a.map((n=>[e("tr",null,e("td",{colSpan:2},e(u,{variant:"s2",color:"gray-9"},l(n.oid)))),e(v,{name:"Critical",value:n.critical?"YES":"NO"}),n.children.map((e=>j(e,r))),e("tr",null,e("td",{colSpan:2,class:"divider"},e("span",null)))]))]:null};export{d as B,g as I,x as M,b as P,p as R,y as S,I as T,S as a,i as b,K as c,v as d,m as e,j as f,c as r}