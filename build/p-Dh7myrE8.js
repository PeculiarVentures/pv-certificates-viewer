/*!
 * © Peculiar Ventures https://peculiarventures.com/ - MIT License
 */
import{h as n}from"./p-Dpo1Lsuj.js";import{z as e,x as t,y as r,e as l}from"./p-BMLZ9T_R.js";import{L as u}from"./p-BoVBJ09p.js";import{T as a,B as s}from"./p-GTlYmF1j.js";import{D as o}from"./p-DzEcDVLW.js";
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */function i(n,t=false){const r=e[n];if(t){return r||n}if(r){return`${r} (${n})`}return n}
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */function c(n){return{getAuthKeyIdParentLink:e=>{var t;return(t=n.authKeyIdParentLink)===null||t===void 0?void 0:t.replace("{{authKeyId}}",e)},getAuthKeyIdSiblingsLink:e=>{var t;return(t=n.authKeyIdSiblingsLink)===null||t===void 0?void 0:t.replace("{{authKeyId}}",e)},getSubjectKeyIdChildrenLink:e=>{var t;return(t=n.subjectKeyIdChildrenLink)===null||t===void 0?void 0:t.replace("{{subjectKeyId}}",e)},getSubjectKeyIdSiblingsLink:e=>{var t;return(t=n.subjectKeyIdSiblingsLink)===null||t===void 0?void 0:t.replace("{{subjectKeyId}}",e)},getIssuerDnLink:()=>n.issuerDnLink}}
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
 */const v=(e,t)=>n("tr",null,n("td",{colSpan:2},n("table",null,t)));const f=e=>{const{value:t}=e;if(!t){return null}return[n("tr",{class:"title"},n("td",{colSpan:2},n(a,{variant:"s1",color:"black"},t))),n("tr",null,n("td",{colSpan:2,class:"divider"},n("span",null)))]};const m=e=>{const{name:t,value:r,monospace:l,collapse:s,href:o,extraValue:i}=e;if(!t){return null}if(r===undefined||r===null){return null}let c;if(s){c=n("peculiar-text-hider",null,r)}else{c=r}const v=!!r.toString();return n("tr",null,n("td",{colSpan:v?1:2},n(a,{variant:"b2",color:"gray-9"},t)),v&&n("td",{class:{monospace:l}},d(r.toString())||o?n(u,{variant:"b2",href:o||r.toString()},r):n(a,{variant:"b2",color:"black"},c,i)))};
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */const p=e=>{const{serialNumber:l,version:u,validity:a,notBefore:s,notAfter:o,lastUpdate:i,nextUpdate:c,type:d}=e;return[n(f,{value:t.getString("basicInformation")}),n(m,{name:t.getString("type"),value:d}),n(m,{name:t.getString("serialNumber"),value:l,monospace:true}),n(m,{name:t.getString("version"),value:u}),n(m,{name:t.getString("validity"),value:a}),n(m,{name:t.getString("issued"),value:s?r(s):undefined}),n(m,{name:t.getString("expired"),value:o?r(o):undefined}),n(m,{name:t.getString("lastUpdate"),value:i?r(i):undefined}),n(m,{name:t.getString("nextUpdate"),value:c?r(c):undefined})]};
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */function h(n){if(n.params&&"modulus"in n.params){let e=n.params.modulus.byteLength;if(e%2){e-=1}return e*8}return null}function b(n){if(n.params&&"publicExponent"in n.params){return n.params.publicExponent.byteLength===3?65537:3}return null}const y=e=>{const{publicKey:r}=e;if(!r){return null}function u(e){return[n(m,{name:t.getString("algorithm"),value:i(e.algorithm)}),n(m,{name:t.getString("namedCurve"),value:i(e.params&&"namedCurve"in e.params?e.params.namedCurve:undefined)}),n(m,{name:t.getString("exponent"),value:b(e)}),n(m,{name:t.getString("modulus"),value:h(e)}),n(m,{name:t.getString("value"),value:l.Convert.ToHex(e.value),monospace:true,collapse:true})]}return[n(f,{value:t.getString("publicKeyInfo")}),u(r),Array.isArray(r.params)&&r.params.length&&r.params.map((e=>n(v,null,u(e))))]};
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */const g=e=>{const{name:r}=e;return[n(f,{value:t.getString("subjectName")}),r.map((e=>n(m,{name:i(e.type,true),value:e.value})))]};
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */const j=e=>{const{name:r,issuerDnLink:l}=e;const a=t.getString("issuerName");return[n(f,{value:l?n(u,{href:l},a):a}),r.map((e=>n(m,{name:i(e.type,true),value:e.value})))]};
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */const I=e=>{const{signature:r}=e;if(!r){return null}function u(e){return[n(m,{name:t.getString("algorithm"),value:i(e.algorithm)}),n(m,{name:t.getString("value"),value:l.Convert.ToHex(e.value),monospace:true,collapse:true})]}return[n(f,{value:t.getString("signature")}),u(r),r.params&&r.params.length&&r.params.map((e=>n(v,null,u(e))))]};
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */const S=e=>{const{thumbprints:r}=e;if(!r){return null}const l=Object.keys(r);if(!l.length){return null}return[n(f,{value:t.getString("fingerprints")}),l.map((e=>n(m,{name:e,value:r[e],monospace:true})))]};
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */const x=e=>{const{certificate:r}=e;return[n(f,{value:t.getString("miscellaneous")}),n("tr",null,n("td",null,n(s,{startIcon:n(o,null),onClick:()=>r.downloadAsPEM()},t.getString("download.pem")))),n("tr",null,n("td",null,n(s,{startIcon:n(o,null),onClick:()=>r.downloadAsDER()},t.getString("download.der"))))]};
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */const K=n=>`https://search.gleif.org/#/record/${n}`;const k=n=>`https://search.censys.io/search?resource=hosts&q=dns.names%3A${n}`;const L=n=>`https://search.censys.io/search?resource=hosts&q=ip%3A${n}`
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */;function A(n){if(!n._type||n.value==null)return undefined;const e=String(n.value);switch(n._type){case"dNSName":return k(e);case"iPAddress":return L(e);case"lei":return K(e);default:return undefined}}function N(e,t){var r,l,a,s;const o=i(e.title,true);const c=A(e);const d=e.value!=null?i(String(e.value)):"";if(e._type==="authorityKeyId"&&e.value!=null){const e=(r=t.getAuthKeyIdParentLink)===null||r===void 0?void 0:r.call(t,d);const a=(l=t.getAuthKeyIdSiblingsLink)===null||l===void 0?void 0:l.call(t,d);return n(m,{name:o,value:d,monospace:true,extraValue:[e&&n("span",null," [",n(u,{href:e},"parents"),"]"),a&&n("span",null," [",n(u,{href:a},"siblings"),"]")]})}if(e._type==="subjectKeyId"&&e.value!=null){const e=(a=t.getSubjectKeyIdChildrenLink)===null||a===void 0?void 0:a.call(t,d);const r=(s=t.getSubjectKeyIdSiblingsLink)===null||s===void 0?void 0:s.call(t,d);return n(m,{name:o,value:d,monospace:true,extraValue:[e&&n("span",null," [",n(u,{href:e},"children"),"]"),r&&n("span",null," [",n(u,{href:r},"siblings"),"]")]})}return n(m,{name:o,value:d,href:c})}function B(e,t){var r,l,u;if(e.title&&!((r=e.value)===null||r===void 0?void 0:r.toString())){return[n(m,{name:i(e.title),value:""}),n(v,null,(l=e.children)===null||l===void 0?void 0:l.map((n=>B(n,t))))]}if((u=e.children)===null||u===void 0?void 0:u.length){return n(v,null,e.title&&n("tr",null,n("td",{colSpan:2},n(a,{variant:"b2",color:"gray-9"},i(e.title)))),e.children.map((n=>B(n,t))))}return N(e,t)}
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var C=undefined&&undefined.__rest||function(n,e){var t={};for(var r in n)if(Object.prototype.hasOwnProperty.call(n,r)&&e.indexOf(r)<0)t[r]=n[r];if(n!=null&&typeof Object.getOwnPropertySymbols==="function")for(var l=0,r=Object.getOwnPropertySymbols(n);l<r.length;l++){if(e.indexOf(r[l])<0&&Object.prototype.propertyIsEnumerable.call(n,r[l]))t[r[l]]=n[r[l]]}return t};const D=e=>{const{extensions:t,title:r="Extensions"}=e,l=C(e,["extensions","title"]);if(!(t===null||t===void 0?void 0:t.length)){return null}return[n(f,{value:r}),t.map((e=>[n("tr",null,n("td",{colSpan:2},n(a,{variant:"s2",color:"gray-9"},i(e.oid)))),n(m,{name:"Critical",value:e.critical?"YES":"NO"}),e.children.map((n=>B(n,l))),n("tr",null,n("td",{colSpan:2,class:"divider"},n("span",null)))]))]};export{p as B,j as I,x as M,y as P,f as R,g as S,S as T,I as a,c as b,D as c,m as d,v as e,i as g,B as r};
//# sourceMappingURL=p-Dh7myrE8.js.map