/*!
 * © Peculiar Ventures https://peculiarventures.com/ - MIT License
 */
import{h as n}from"./p-Dpo1Lsuj.js";import{x as e,v as t,w as r,e as l}from"./p-DGgAC8AG.js";import{L as u}from"./p-BoVBJ09p.js";import{T as a,B as o}from"./p-GTlYmF1j.js";import{D as s}from"./p-DzEcDVLW.js";
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
 */const v=(e,t)=>n("tr",null,n("td",{colSpan:2},n("table",null,t)));const f=e=>{const{value:t}=e;if(!t){return null}return[n("tr",{class:"title"},n("td",{colSpan:2},n(a,{variant:"s1",color:"black"},t))),n("tr",null,n("td",{colSpan:2,class:"divider"},n("span",null)))]};const p=e=>{const{name:t,value:r,monospace:l,collapse:o,href:s,extraValue:i}=e;if(!t){return null}if(r===undefined||r===null){return null}let c;if(o){c=n("peculiar-text-hider",null,r)}else{c=r}const v=!!r.toString();return n("tr",null,n("td",{colSpan:v?1:2},n(a,{variant:"b2",color:"gray-9"},t)),v&&n("td",{class:{monospace:l}},d(r.toString())||s?n(u,{variant:"b2",href:s||r.toString()},r):n(a,{variant:"b2",color:"black"},c,i)))};
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */const m=e=>{const{serialNumber:l,version:u,validity:a,notBefore:o,notAfter:s,lastUpdate:i,nextUpdate:c,type:d}=e;return[n(f,{value:t.getString("basicInformation")}),n(p,{name:t.getString("type"),value:d}),n(p,{name:t.getString("serialNumber"),value:l,monospace:true}),n(p,{name:t.getString("version"),value:u}),n(p,{name:t.getString("validity"),value:a}),n(p,{name:t.getString("issued"),value:o?r(o):undefined}),n(p,{name:t.getString("expired"),value:s?r(s):undefined}),n(p,{name:t.getString("lastUpdate"),value:i?r(i):undefined}),n(p,{name:t.getString("nextUpdate"),value:c?r(c):undefined})]};
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */function h(n){if(n.params&&"modulus"in n.params){let e=n.params.modulus.byteLength;if(e%2){e-=1}return e*8}return null}function b(n){if(n.params&&"publicExponent"in n.params){return n.params.publicExponent.byteLength===3?65537:3}return null}const y=e=>{const{publicKey:r}=e;if(!r){return null}function u(e){return[n(p,{name:t.getString("algorithm"),value:i(e.algorithm)}),n(p,{name:t.getString("namedCurve"),value:i(e.params&&"namedCurve"in e.params?e.params.namedCurve:undefined)}),n(p,{name:t.getString("exponent"),value:b(e)}),n(p,{name:t.getString("modulus"),value:h(e)}),n(p,{name:t.getString("value"),value:l.Convert.ToHex(e.value),monospace:true,collapse:true})]}return[n(f,{value:t.getString("publicKeyInfo")}),u(r),Array.isArray(r.params)&&r.params.length&&r.params.map((e=>n(v,null,u(e))))]};
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */const g=e=>{const{name:r}=e;return[n(f,{value:t.getString("subjectName")}),r.map((e=>n(p,{name:i(e.type,true),value:e.value})))]};
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */const j=e=>{const{name:r,issuerDnLink:l}=e;const a=t.getString("issuerName");return[n(f,{value:l?n(u,{href:l},a):a}),r.map((e=>n(p,{name:i(e.type,true),value:e.value})))]};
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */const S=e=>{const{signature:r}=e;if(!r){return null}function u(e){return[n(p,{name:t.getString("algorithm"),value:i(e.algorithm)}),n(p,{name:t.getString("value"),value:l.Convert.ToHex(e.value),monospace:true,collapse:true})]}return[n(f,{value:t.getString("signature")}),u(r),r.params&&r.params.length&&r.params.map((e=>n(v,null,u(e))))]};
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */const I=e=>{const{thumbprints:r}=e;if(!r){return null}const l=Object.keys(r);if(!l.length){return null}return[n(f,{value:t.getString("fingerprints")}),l.map((e=>n(p,{name:e,value:r[e],monospace:true})))]};
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */const x=e=>{const{certificate:r}=e;return[n(f,{value:t.getString("miscellaneous")}),n("tr",null,n("td",null,n(o,{startIcon:n(s,null),onClick:()=>r.downloadAsPEM()},t.getString("download.pem")))),n("tr",null,n("td",null,n(o,{startIcon:n(s,null),onClick:()=>r.downloadAsDER()},t.getString("download.der"))))]};
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */const K=n=>`https://search.gleif.org/#/record/${n}`;const k=n=>`https://search.censys.io/search?resource=hosts&q=dns.names%3A${n}`;const A=n=>`https://search.censys.io/search?resource=hosts&q=ip%3A${n}`
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */;function L(n){if(!n._type||n.value==null)return undefined;const e=String(n.value);switch(n._type){case"dNSName":return k(e);case"iPAddress":return A(e);case"lei":return K(e);default:return undefined}}function N(e,t){var r,l,a,o;const s=i(e.title,true);const c=L(e);const d=e.value!=null?i(String(e.value)):"";if(e._type==="authorityKeyId"&&e.value!=null){const e=(r=t.getAuthKeyIdParentLink)===null||r===void 0?void 0:r.call(t,d);const a=(l=t.getAuthKeyIdSiblingsLink)===null||l===void 0?void 0:l.call(t,d);return n(p,{name:s,value:d,monospace:true,extraValue:[e&&n("span",null," [",n(u,{href:e},"parents"),"]"),a&&n("span",null," [",n(u,{href:a},"siblings"),"]")]})}if(e._type==="subjectKeyId"&&e.value!=null){const e=(a=t.getSubjectKeyIdChildrenLink)===null||a===void 0?void 0:a.call(t,d);const r=(o=t.getSubjectKeyIdSiblingsLink)===null||o===void 0?void 0:o.call(t,d);return n(p,{name:s,value:d,monospace:true,extraValue:[e&&n("span",null," [",n(u,{href:e},"children"),"]"),r&&n("span",null," [",n(u,{href:r},"siblings"),"]")]})}return n(p,{name:s,value:typeof e.value==="boolean"?e.value?"YES":"NO":d,href:c})}function C(e,t){var r,l,u;if(e.title&&!((r=e.value)===null||r===void 0?void 0:r.toString())){return[n(p,{name:i(e.title),value:""}),n(v,null,(l=e.children)===null||l===void 0?void 0:l.map((n=>C(n,t))))]}if((u=e.children)===null||u===void 0?void 0:u.length){return n(v,null,e.title&&n("tr",null,n("td",{colSpan:2},n(a,{variant:"b2",color:"gray-9"},i(e.title)))),e.children.map((n=>C(n,t))))}return N(e,t)}
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var D=undefined&&undefined.__rest||function(n,e){var t={};for(var r in n)if(Object.prototype.hasOwnProperty.call(n,r)&&e.indexOf(r)<0)t[r]=n[r];if(n!=null&&typeof Object.getOwnPropertySymbols==="function")for(var l=0,r=Object.getOwnPropertySymbols(n);l<r.length;l++){if(e.indexOf(r[l])<0&&Object.prototype.propertyIsEnumerable.call(n,r[l]))t[r[l]]=n[r[l]]}return t};const O=e=>{const{extensions:t,title:r="Extensions"}=e,l=D(e,["extensions","title"]);if(!(t===null||t===void 0?void 0:t.length)){return null}return[n(f,{value:r}),t.map((e=>[n("tr",null,n("td",{colSpan:2},n(a,{variant:"s2",color:"gray-9"},i(e.oid)))),n(p,{name:"Critical",value:e.critical?"YES":"NO"}),e.children.map((n=>C(n,l))),n("tr",null,n("td",{colSpan:2,class:"divider"},n("span",null)))]))]};async function w(n){var e;n.setLoading(true);(e=n.onStart)===null||e===void 0?void 0:e.call(n);try{const e=await n.run();if(typeof e==="undefined"){return}await n.onSuccess(e)}catch(e){n.onError(e)}finally{n.setLoading(false)}}export{m as B,j as I,x as M,y as P,f as R,g as S,I as T,S as a,c as b,O as c,p as d,v as e,C as f,i as g,w as r};
//# sourceMappingURL=p-W3nQR4lM.js.map