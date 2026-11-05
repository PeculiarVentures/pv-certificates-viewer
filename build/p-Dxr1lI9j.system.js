var __awaiter=this&&this.__awaiter||function(n,e,r,t){function u(n){return n instanceof r?n:new r((function(e){e(n)}))}return new(r||(r=Promise))((function(r,a){function i(n){try{o(t.next(n))}catch(n){a(n)}}function l(n){try{o(t["throw"](n))}catch(n){a(n)}}function o(n){n.done?r(n.value):u(n.value).then(i,l)}o((t=t.apply(n,e||[])).next())}))};var __generator=this&&this.__generator||function(n,e){var r={label:0,sent:function(){if(a[0]&1)throw a[1];return a[1]},trys:[],ops:[]},t,u,a,i=Object.create((typeof Iterator==="function"?Iterator:Object).prototype);return i.next=l(0),i["throw"]=l(1),i["return"]=l(2),typeof Symbol==="function"&&(i[Symbol.iterator]=function(){return this}),i;function l(n){return function(e){return o([n,e])}}function o(l){if(t)throw new TypeError("Generator is already executing.");while(i&&(i=0,l[0]&&(r=0)),r)try{if(t=1,u&&(a=l[0]&2?u["return"]:l[0]?u["throw"]||((a=u["return"])&&a.call(u),0):u.next)&&!(a=a.call(u,l[1])).done)return a;if(u=0,a)l=[l[0]&2,a.value];switch(l[0]){case 0:case 1:a=l;break;case 4:r.label++;return{value:l[1],done:false};case 5:r.label++;u=l[1];l=[0];continue;case 7:l=r.ops.pop();r.trys.pop();continue;default:if(!(a=r.trys,a=a.length>0&&a[a.length-1])&&(l[0]===6||l[0]===2)){r=0;continue}if(l[0]===3&&(!a||l[1]>a[0]&&l[1]<a[3])){r.label=l[1];break}if(l[0]===6&&r.label<a[1]){r.label=a[1];a=l;break}if(a&&r.label<a[2]){r.label=a[2];r.ops.push(l);break}if(a[2])r.ops.pop();r.trys.pop();continue}l=e.call(n,r)}catch(n){l=[6,n];u=0}finally{t=a=0}if(l[0]&5)throw l[1];return{value:l[0]?l[1]:void 0,done:true}}};var __rest=this&&this.__rest||function(n,e){var r={};for(var t in n)if(Object.prototype.hasOwnProperty.call(n,t)&&e.indexOf(t)<0)r[t]=n[t];if(n!=null&&typeof Object.getOwnPropertySymbols==="function")for(var u=0,t=Object.getOwnPropertySymbols(n);u<t.length;u++){if(e.indexOf(t[u])<0&&Object.prototype.propertyIsEnumerable.call(n,t[u]))r[t[u]]=n[t[u]]}return r};
/*!
 * © Peculiar Ventures https://peculiarventures.com/ - MIT License
 */System.register(["./p-DwsHQCTd.system.js","./p-CrzwWGx_.system.js","./p-DxVPYI-m.system.js","./p-2iPN08zy.system.js","./p-DMvEo0TY.system.js"],(function(n){"use strict";var e,r,t,u,a,i,l,o,c,s;return{setters:[function(n){e=n.h},function(n){r=n.i;t=n.E;u=n.h;a=n.F},function(n){i=n.L},function(n){l=n.T;o=n.B},function(n){c=n.A;s=n.D}],execute:function(){n({b:v,f:O,r:D});
/**
             * @license
             * Copyright (c) Peculiar Ventures, LLC.
             *
             * This source code is licensed under the MIT license found in the
             * LICENSE file in the root directory of this source tree.
             */function v(n){return{getAuthKeyIdParentLink:function(e){var r;return(r=n.authKeyIdParentLink)===null||r===void 0?void 0:r.replace("{{authKeyId}}",e)},getAuthKeyIdSiblingsLink:function(e){var r;return(r=n.authKeyIdSiblingsLink)===null||r===void 0?void 0:r.replace("{{authKeyId}}",e)},getSubjectKeyIdChildrenLink:function(e){var r;return(r=n.subjectKeyIdChildrenLink)===null||r===void 0?void 0:r.replace("{{subjectKeyId}}",e)},getSubjectKeyIdSiblingsLink:function(e){var r;return(r=n.subjectKeyIdSiblingsLink)===null||r===void 0?void 0:r.replace("{{subjectKeyId}}",e)},getIssuerDnLink:function(){return n.issuerDnLink}}}
/**
             * @license
             * Copyright (c) Peculiar Ventures, LLC.
             *
             * This source code is licensed under the MIT license found in the
             * LICENSE file in the root directory of this source tree.
             */function f(n){return n.indexOf("http")===0}
/**
             * @license
             * Copyright (c) Peculiar Ventures, LLC.
             *
             * This source code is licensed under the MIT license found in the
             * LICENSE file in the root directory of this source tree.
             */var d=n("e",(function(n,r){return e("tr",null,e("td",{colSpan:2},e("table",null,r)))}));var m=n("R",(function(n){var r=n.value;if(!r){return null}return[e("tr",{class:"title"},e("td",{colSpan:2},e(l,{variant:"s1",color:"black"},r))),e("tr",null,e("td",{colSpan:2,class:"divider"},e("span",null)))]}));var p=n("d",(function(n){var r=n.name,t=n.value,u=n.monospace,a=n.collapse,o=n.href,s=n.extraValue;if(!r){return null}if(t===undefined||t===null){return null}var v;if(a){
// The value stays outside <details> so it can be selected without toggling; see `.text_hider` styles.
v=e("span",{class:"text_hider"},e("span",{class:"text_hider_content"},t),e("details",{class:"text_hider_toggle"},e("summary",{class:"button m_no_padding","aria-label":"Show full value"},e(c,{color:"secondary"}))))}else{v=t}var d=!!t.toString();return e("tr",null,e("td",{colSpan:d?1:2},e(l,{variant:"b2",color:"gray-9"},r)),d&&e("td",{class:{monospace:Boolean(u)}},f(t.toString())||o?e(i,{variant:"b2",href:o||t.toString()},t):e(l,{variant:"b2",color:"black"},v,s)))}));
/**
             * @license
             * Copyright (c) Peculiar Ventures, LLC.
             *
             * This source code is licensed under the MIT license found in the
             * LICENSE file in the root directory of this source tree.
             */
/** ASN.1 versions are 0-based (`v1(0)`); show the human version, or nothing when the field is absent. */var h=n("t",(function(n){return typeof n==="number"?n+1:undefined}));var y=n("B",(function(n){var t=n.serialNumber,u=n.version,a=n.validity,i=n.notBefore,l=n.notAfter,o=n.lastUpdate,c=n.nextUpdate,s=n.type;return[e(m,{value:"Basic Information"}),e(p,{name:"Type",value:s}),e(p,{name:"Serial Number",value:t,monospace:true}),e(p,{name:"Version",value:u}),e(p,{name:"Validity",value:a}),e(p,{name:"Issued",value:i?r(i):undefined}),e(p,{name:"Expired",value:l?r(l):undefined}),e(p,{name:"Last Update",value:o?r(o):undefined}),e(p,{name:"Next Update",value:c?r(c):undefined})]}));
/**
             * @license
             * Copyright (c) Peculiar Ventures, LLC.
             *
             * This source code is licensed under the MIT license found in the
             * LICENSE file in the root directory of this source tree.
             */function b(n){if(n.params&&"modulus"in n.params){var e=n.params.modulus.byteLength;if(e%2){e-=1}return e*8}return null}function S(n){if(n.params&&"publicExponent"in n.params){return n.params.publicExponent.byteLength===3?65537:3}return null}var g=n("P",(function(n){var r=n.publicKey;if(!r){return null}function a(n){var r;var a=n.params&&"namedCurve"in n.params?(r=n.params.namedCurve)!==null&&r!==void 0?r:"":"";return[e(p,{name:"Algorithm",value:t(n.algorithm)}),e(p,{name:"Named Curve",value:a?t(a):undefined}),e(p,{name:"Exponent",value:S(n)}),e(p,{name:"Modulus",value:b(n)}),e(p,{name:"Value",value:u.encode(n.value),monospace:true,collapse:true})]}return[e(m,{value:"Public Key Info"}),a(r),Array.isArray(r.params)&&r.params.length&&r.params.map((function(n){return e(d,null,a(n))}))]}));
/**
             * @license
             * Copyright (c) Peculiar Ventures, LLC.
             *
             * This source code is licensed under the MIT license found in the
             * LICENSE file in the root directory of this source tree.
             */var I=n("S",(function(n){var r=n.name;return[e(m,{value:"Subject Name"}),r.map((function(n){return e(p,{name:t(n.type,true),value:n.value})}))]}));
/**
             * @license
             * Copyright (c) Peculiar Ventures, LLC.
             *
             * This source code is licensed under the MIT license found in the
             * LICENSE file in the root directory of this source tree.
             */var _=n("I",(function(n){var r=n.name,u=n.issuerDnLink;var a="Issuer Name";return[e(m,{value:u?e(i,{href:u},a):a}),r.map((function(n){return e(p,{name:t(n.type,true),value:n.value})}))]}));
/**
             * @license
             * Copyright (c) Peculiar Ventures, LLC.
             *
             * This source code is licensed under the MIT license found in the
             * LICENSE file in the root directory of this source tree.
             */var j=n("a",(function(n){var r=n.signature;if(!r){return null}function i(n){return[e(p,{name:"Algorithm",value:t(n.algorithm)}),n.mtcProofError&&e(p,{name:"MTC Proof Error",value:n.mtcProofError}),!n.mtcProof&&e(p,{name:"Value",value:n.value&&a(n.value).length?u.encode(n.value):"(none)",monospace:true,collapse:true})]}function l(){var n=r.mtcProof;if(!n){return null}return[e(p,{name:"Start",value:n.start}),e(p,{name:"End",value:n.end}),e(p,{name:"Subtree Size",value:n.subtreeSize}),e(p,{name:"Landmark Relative",value:n.isLandmarkRelative?"YES":"NO"}),n.inclusionProof.length>0&&e(p,{name:"Inclusion Proof",value:n.inclusionProof.join("\n"),monospace:true,collapse:true}),n.signatures.length>0&&n.signatures.map((function(n){return e(d,null,e(p,{name:"Cosigner ID",value:n.cosignerId}),e(p,{name:"Signature",value:n.signature,monospace:true,collapse:true}))}))]}return[e(m,{value:"Signature"}),i(r),l(),r.params&&r.params.length&&r.params.map((function(n){return e(d,null,i(n))}))]}));
/**
             * @license
             * Copyright (c) Peculiar Ventures, LLC.
             *
             * This source code is licensed under the MIT license found in the
             * LICENSE file in the root directory of this source tree.
             */var w=n("T",(function(n){var r=n.thumbprints;if(!r){return null}var t=Object.keys(r);if(!t.length){return null}return[e(m,{value:"Fingerprints"}),t.map((function(n){return e(p,{name:n,value:r[n],monospace:true})}))]}));
/**
             * @license
             * Copyright (c) Peculiar Ventures, LLC.
             *
             * This source code is licensed under the MIT license found in the
             * LICENSE file in the root directory of this source tree.
             */var k=n("M",(function(n){var r=n.certificate;return[e(m,{value:"Miscellaneous"}),e("tr",null,e("td",null,e(o,{startIcon:e(s,null),onClick:function(){return r.downloadAsPEM()}},"Download PEM"))),e("tr",null,e("td",null,e(o,{startIcon:e(s,null),onClick:function(){return r.downloadAsDER()}},"Download DER")))]}));
/**
             * @license
             * Copyright (c) Peculiar Ventures, LLC.
             *
             * This source code is licensed under the MIT license found in the
             * LICENSE file in the root directory of this source tree.
             */var x=function(n){return"https://search.gleif.org/#/record/".concat(n)};var E=function(n){return"https://search.censys.io/search?resource=hosts&q=dns.names%3A".concat(n)};var K=function(n){return"https://search.censys.io/search?resource=hosts&q=ip%3A".concat(n)};
/**
             * @license
             * Copyright (c) Peculiar Ventures, LLC.
             *
             * This source code is licensed under the MIT license found in the
             * LICENSE file in the root directory of this source tree.
             */function N(n){if(!n._type||n.value==null)return undefined;var e=String(n.value);switch(n._type){case"dNSName":return E(e);case"iPAddress":return K(e);case"lei":return x(e);default:return undefined}}function C(n,r){var u,a,l,o,c;var s=t((u=n.title)!==null&&u!==void 0?u:"",true);var v=N(n);var f=n.value!=null?t(String(n.value)):"";if(n._type==="authorityKeyId"&&n.value!=null){var d=(a=r.getAuthKeyIdParentLink)===null||a===void 0?void 0:a.call(r,f);var m=(l=r.getAuthKeyIdSiblingsLink)===null||l===void 0?void 0:l.call(r,f);return e(p,{name:s,value:f,monospace:true,extraValue:[d&&e("span",null," [",e(i,{href:d},"parents"),"]"),m&&e("span",null," [",e(i,{href:m},"siblings"),"]")]})}if(n._type==="subjectKeyId"&&n.value!=null){var h=(o=r.getSubjectKeyIdChildrenLink)===null||o===void 0?void 0:o.call(r,f);var m=(c=r.getSubjectKeyIdSiblingsLink)===null||c===void 0?void 0:c.call(r,f);return e(p,{name:s,value:f,monospace:true,extraValue:[h&&e("span",null," [",e(i,{href:h},"children"),"]"),m&&e("span",null," [",e(i,{href:m},"siblings"),"]")]})}return e(p,{name:s,
// eslint-disable-next-line no-nested-ternary
value:typeof n.value==="boolean"?n.value?"YES":"NO":f,href:v})}function O(n,r){var u,a,i;if(n.title&&!((u=n.value)===null||u===void 0?void 0:u.toString())){return[e(p,{name:t(n.title),value:""}),e(d,null,(a=n.children)===null||a===void 0?void 0:a.map((function(n){return O(n,r)})))]}if((i=n.children)===null||i===void 0?void 0:i.length){return e(d,null,n.title&&e("tr",null,e("td",{colSpan:2},e(l,{variant:"b2",color:"gray-9"},t(n.title)))),n.children.map((function(n){return O(n,r)})))}return C(n,r)}
/**
             * @license
             * Copyright (c) Peculiar Ventures, LLC.
             *
             * This source code is licensed under the MIT license found in the
             * LICENSE file in the root directory of this source tree.
             */var P=n("c",(function(n){var r=n.extensions,u=n.title,a=u===void 0?"Extensions":u,i=__rest(n,["extensions","title"]);if(!(r===null||r===void 0?void 0:r.length)){return null}return[e(m,{value:a}),r.map((function(n){return[e("tr",null,e("td",{colSpan:2},e(l,{variant:"s2",color:"gray-9"},t(n.oid)))),e(p,{name:"Critical",value:n.critical?"YES":"NO"}),n.children.map((function(n){return O(n,i)})),e("tr",null,e("td",{colSpan:2,class:"divider"},e("span",null)))]}))]}));var A=new WeakMap;
/**
             * Runs a decode for `owner` (the component instance). Only the latest call per owner may report its
             * result, so a slow earlier decode can't overwrite a newer one.
             */function D(n,e){return __awaiter(this,void 0,void 0,(function(){var r,t,u,a;var i,l;return __generator(this,(function(o){switch(o.label){case 0:r=((i=A.get(n))!==null&&i!==void 0?i:0)+1;t=function(){return A.get(n)===r};A.set(n,r);(l=e.onStart)===null||l===void 0?void 0:l.call(e);o.label=1;case 1:o.trys.push([1,3,,4]);return[4/*yield*/,e.run()];case 2:u=o.sent();if(t()&&typeof u!=="undefined"){e.onSuccess(u)}return[3/*break*/,4];case 3:a=o.sent();if(t()){e.onError(a)}return[3/*break*/,4];case 4:return[2/*return*/]}}))}))}}}}));