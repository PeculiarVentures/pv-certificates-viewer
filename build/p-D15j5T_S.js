/*!
 * © Peculiar Ventures https://peculiarventures.com/ - MIT License
 */
import{h as n}from"./p-UZLUj4zt.js";import{x as e,y as l,L as a,e as t}from"./p-B7MG4079.js";import{L as r}from"./p-DtCQ_sx6.js";import{T as u,B as o}from"./p-Bh6ydUGl.js";import{D as s}from"./p-C8x0ew5S.js";
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */function i(n){return{getAuthKeyIdParentLink:e=>{var l;return null===(l=n.authKeyIdParentLink)||void 0===l?void 0:l.replace("{{authKeyId}}",e)},getAuthKeyIdSiblingsLink:e=>{var l;return null===(l=n.authKeyIdSiblingsLink)||void 0===l?void 0:l.replace("{{authKeyId}}",e)},getSubjectKeyIdChildrenLink:e=>{var l;return null===(l=n.subjectKeyIdChildrenLink)||void 0===l?void 0:l.replace("{{subjectKeyId}}",e)},getSubjectKeyIdSiblingsLink:e=>{var l;return null===(l=n.subjectKeyIdSiblingsLink)||void 0===l?void 0:l.replace("{{subjectKeyId}}",e)},getIssuerDnLink:()=>n.issuerDnLink}}async function c(n){var e;n.setLoading(!0),null===(e=n.onStart)||void 0===e||e.call(n);try{const e=await n.run();if(void 0===e)return;await n.onSuccess(e)}catch(e){n.onError(e)}finally{n.setLoading(!1)}}
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
const v=(e,l)=>n("tr",null,n("td",{colSpan:2},n("table",null,l))),d=e=>{const{value:l}=e;return l?[n("tr",{class:"title"},n("td",{colSpan:2},n(u,{variant:"s1",color:"black"},l))),n("tr",null,n("td",{colSpan:2,class:"divider"},n("span",null)))]:null},m=e=>{const{name:l,value:a,monospace:t,collapse:o,href:s,extraValue:i}=e;if(!l)return null;if(null==a)return null;let c;c=o?n("peculiar-text-hider",null,a):a;const v=!!a.toString();return n("tr",null,n("td",{colSpan:v?1:2},n(u,{variant:"b2",color:"gray-9"},l)),v&&n("td",{class:{monospace:t}},function(n){return 0===n.indexOf("http")}(a.toString())||s?n(r,{variant:"b2",href:s||a.toString()},a):n(u,{variant:"b2",color:"black"},c,i)))},p=a=>{const{serialNumber:t,version:r,validity:u,notBefore:o,notAfter:s,lastUpdate:i,nextUpdate:c,type:v}=a;return[n(d,{value:e.getString("basicInformation")}),n(m,{name:e.getString("type"),value:v}),n(m,{name:e.getString("serialNumber"),value:t,monospace:!0}),n(m,{name:e.getString("version"),value:r}),n(m,{name:e.getString("validity"),value:u}),n(m,{name:e.getString("issued"),value:o?l(o):void 0}),n(m,{name:e.getString("expired"),value:s?l(s):void 0}),n(m,{name:e.getString("lastUpdate"),value:i?l(i):void 0}),n(m,{name:e.getString("nextUpdate"),value:c?l(c):void 0})]};
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
function f(n){if(n.params&&"modulus"in n.params){let e=n.params.modulus.byteLength;return e%2&&(e-=1),8*e}return null}function h(n){return n.params&&"publicExponent"in n.params?3===n.params.publicExponent.byteLength?65537:3:null}const b=l=>{const{publicKey:r}=l;if(!r)return null;function u(l){return[n(m,{name:e.getString("algorithm"),value:a(l.algorithm)}),n(m,{name:e.getString("namedCurve"),value:a(l.params&&"namedCurve"in l.params?l.params.namedCurve:void 0)}),n(m,{name:e.getString("exponent"),value:h(l)}),n(m,{name:e.getString("modulus"),value:f(l)}),n(m,{name:e.getString("value"),value:t.Convert.ToHex(l.value),monospace:!0,collapse:!0})]}return[n(d,{value:e.getString("publicKeyInfo")}),u(r),Array.isArray(r.params)&&r.params.length&&r.params.map((e=>n(v,null,u(e))))]},y=l=>{const{name:t}=l;return[n(d,{value:e.getString("subjectName")}),t.map((e=>n(m,{name:a(e.type,!0),value:e.value})))]},g=l=>{const{name:t,issuerDnLink:u}=l,o=e.getString("issuerName");return[n(d,{value:u?n(r,{href:u},o):o}),t.map((e=>n(m,{name:a(e.type,!0),value:e.value})))]},S=l=>{const{signature:r}=l;if(!r)return null;function u(l){return[n(m,{name:e.getString("algorithm"),value:a(l.algorithm)}),!l.mtcProof&&n(m,{name:e.getString("value"),value:l.value&&t.BufferSourceConverter.toUint8Array(l.value).length?t.Convert.ToHex(l.value):"(none)",monospace:!0,collapse:!0})]}return[n(d,{value:e.getString("signature")}),u(r),function(){const e=r.mtcProof;return e?[n(m,{name:"Start",value:e.start}),n(m,{name:"End",value:e.end}),n(m,{name:"Subtree Size",value:e.subtreeSize}),n(m,{name:"Landmark Relative",value:e.isLandmarkRelative?"YES":"NO"}),e.inclusionProof.length>0&&n(m,{name:"Inclusion Proof",value:e.inclusionProof.join("\n"),monospace:!0,collapse:!0}),e.signatures.length>0&&e.signatures.map((e=>n(v,null,n(m,{name:"Cosigner ID",value:e.cosignerId}),n(m,{name:"Signature",value:e.signature,monospace:!0,collapse:!0}))))]:null}(),r.params&&r.params.length&&r.params.map((e=>n(v,null,u(e))))]},I=l=>{const{thumbprints:a}=l;if(!a)return null;const t=Object.keys(a);return t.length?[n(d,{value:e.getString("fingerprints")}),t.map((e=>n(m,{name:e,value:a[e],monospace:!0})))]:null},j=l=>{const{certificate:a}=l;return[n(d,{value:e.getString("miscellaneous")}),n("tr",null,n("td",null,n(o,{startIcon:n(s,null),onClick:()=>a.downloadAsPEM()},e.getString("download.pem")))),n("tr",null,n("td",null,n(o,{startIcon:n(s,null),onClick:()=>a.downloadAsDER()},e.getString("download.der"))))]};
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */function x(e,l){var t,o,s;return e.title&&!(null===(t=e.value)||void 0===t?void 0:t.toString())?[n(m,{name:a(e.title),value:""}),n(v,null,null===(o=e.children)||void 0===o?void 0:o.map((n=>x(n,l))))]:(null===(s=e.children)||void 0===s?void 0:s.length)?n(v,null,e.title&&n("tr",null,n("td",{colSpan:2},n(u,{variant:"b2",color:"gray-9"},a(e.title)))),e.children.map((n=>x(n,l)))):function(e,l){var t,u,o,s;const i=a(e.title,!0),c=
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
function(n){if(!n._type||null==n.value)return;const e=String(n.value);switch(n._type){case"dNSName":return`https://search.censys.io/search?resource=hosts&q=dns.names%3A${e}`;case"iPAddress":return`https://search.censys.io/search?resource=hosts&q=ip%3A${e}`;case"lei":return`https://search.gleif.org/#/record/${e}`;default:return}}(e),v=null!=e.value?a(String(e.value)):"";if("authorityKeyId"===e._type&&null!=e.value){const e=null===(t=l.getAuthKeyIdParentLink)||void 0===t?void 0:t.call(l,v),a=null===(u=l.getAuthKeyIdSiblingsLink)||void 0===u?void 0:u.call(l,v);return n(m,{name:i,value:v,monospace:!0,extraValue:[e&&n("span",null," [",n(r,{href:e},"parents"),"]"),a&&n("span",null," [",n(r,{href:a},"siblings"),"]")]})}if("subjectKeyId"===e._type&&null!=e.value){const e=null===(o=l.getSubjectKeyIdChildrenLink)||void 0===o?void 0:o.call(l,v),a=null===(s=l.getSubjectKeyIdSiblingsLink)||void 0===s?void 0:s.call(l,v);return n(m,{name:i,value:v,monospace:!0,extraValue:[e&&n("span",null," [",n(r,{href:e},"children"),"]"),a&&n("span",null," [",n(r,{href:a},"siblings"),"]")]})}return n(m,{name:i,value:"boolean"==typeof e.value?e.value?"YES":"NO":v,href:c})}(e,l)}
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */const K=e=>{const{extensions:l,title:t="Extensions"}=e,r=function(n,e){var l={};for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&e.indexOf(a)<0&&(l[a]=n[a]);if(null!=n&&"function"==typeof Object.getOwnPropertySymbols){var t=0;for(a=Object.getOwnPropertySymbols(n);t<a.length;t++)e.indexOf(a[t])<0&&Object.prototype.propertyIsEnumerable.call(n,a[t])&&(l[a[t]]=n[a[t]])}return l}(e,["extensions","title"]);return(null==l?void 0:l.length)?[n(d,{value:t}),l.map((e=>[n("tr",null,n("td",{colSpan:2},n(u,{variant:"s2",color:"gray-9"},a(e.oid)))),n(m,{name:"Critical",value:e.critical?"YES":"NO"}),e.children.map((n=>x(n,r))),n("tr",null,n("td",{colSpan:2,class:"divider"},n("span",null)))]))]:null};export{p as B,g as I,j as M,b as P,d as R,y as S,I as T,S as a,i as b,K as c,m as d,v as e,x as f,c as r}