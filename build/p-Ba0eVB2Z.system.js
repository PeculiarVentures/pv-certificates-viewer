var __awaiter=this&&this.__awaiter||function(n,e,r,t){function u(n){return n instanceof r?n:new r((function(e){e(n)}))}return new(r||(r=Promise))((function(r,a){function i(n){try{o(t.next(n))}catch(n){a(n)}}function l(n){try{o(t["throw"](n))}catch(n){a(n)}}function o(n){n.done?r(n.value):u(n.value).then(i,l)}o((t=t.apply(n,e||[])).next())}))};var __generator=this&&this.__generator||function(n,e){var r={label:0,sent:function(){if(a[0]&1)throw a[1];return a[1]},trys:[],ops:[]},t,u,a,i=Object.create((typeof Iterator==="function"?Iterator:Object).prototype);return i.next=l(0),i["throw"]=l(1),i["return"]=l(2),typeof Symbol==="function"&&(i[Symbol.iterator]=function(){return this}),i;function l(n){return function(e){return o([n,e])}}function o(l){if(t)throw new TypeError("Generator is already executing.");while(i&&(i=0,l[0]&&(r=0)),r)try{if(t=1,u&&(a=l[0]&2?u["return"]:l[0]?u["throw"]||((a=u["return"])&&a.call(u),0):u.next)&&!(a=a.call(u,l[1])).done)return a;if(u=0,a)l=[l[0]&2,a.value];switch(l[0]){case 0:case 1:a=l;break;case 4:r.label++;return{value:l[1],done:false};case 5:r.label++;u=l[1];l=[0];continue;case 7:l=r.ops.pop();r.trys.pop();continue;default:if(!(a=r.trys,a=a.length>0&&a[a.length-1])&&(l[0]===6||l[0]===2)){r=0;continue}if(l[0]===3&&(!a||l[1]>a[0]&&l[1]<a[3])){r.label=l[1];break}if(l[0]===6&&r.label<a[1]){r.label=a[1];a=l;break}if(a&&r.label<a[2]){r.label=a[2];r.ops.push(l);break}if(a[2])r.ops.pop();r.trys.pop();continue}l=e.call(n,r)}catch(n){l=[6,n];u=0}finally{t=a=0}if(l[0]&5)throw l[1];return{value:l[0]?l[1]:void 0,done:true}}};var __rest=this&&this.__rest||function(n,e){var r={};for(var t in n)if(Object.prototype.hasOwnProperty.call(n,t)&&e.indexOf(t)<0)r[t]=n[t];if(n!=null&&typeof Object.getOwnPropertySymbols==="function")for(var u=0,t=Object.getOwnPropertySymbols(n);u<t.length;u++){if(e.indexOf(t[u])<0&&Object.prototype.propertyIsEnumerable.call(n,t[u]))r[t[u]]=n[t[u]]}return r};
/*!
 * © Peculiar Ventures https://peculiarventures.com/ - MIT License
 */System.register(["./p-B4fjN6sg.system.js","./p-CfggFLd8.system.js","./p-D7-IlnyS.system.js","./p-BuCDX4Om.system.js","./p-C2WHFTgD.system.js"],(function(n){"use strict";var e,r,t,u,a,i,l,o,c,s;return{setters:[function(n){e=n.h},function(n){r=n.l;t=n.a;u=n.J;a=n.q;i=n.I},function(n){l=n.L},function(n){o=n.T;c=n.B},function(n){s=n.D}],execute:function(){n({b:v,f:E,r:f});
/**
             * @license
             * Copyright (c) Peculiar Ventures, LLC.
             *
             * This source code is licensed under the MIT license found in the
             * LICENSE file in the root directory of this source tree.
             */function v(n){return{getAuthKeyIdParentLink:function(e){var r;return(r=n.authKeyIdParentLink)===null||r===void 0?void 0:r.replace("{{authKeyId}}",e)},getAuthKeyIdSiblingsLink:function(e){var r;return(r=n.authKeyIdSiblingsLink)===null||r===void 0?void 0:r.replace("{{authKeyId}}",e)},getSubjectKeyIdChildrenLink:function(e){var r;return(r=n.subjectKeyIdChildrenLink)===null||r===void 0?void 0:r.replace("{{subjectKeyId}}",e)},getSubjectKeyIdSiblingsLink:function(e){var r;return(r=n.subjectKeyIdSiblingsLink)===null||r===void 0?void 0:r.replace("{{subjectKeyId}}",e)},getIssuerDnLink:function(){return n.issuerDnLink}}}function f(n){return __awaiter(this,void 0,void 0,(function(){var e,r;var t;return __generator(this,(function(u){switch(u.label){case 0:n.setLoading(true);(t=n.onStart)===null||t===void 0?void 0:t.call(n);u.label=1;case 1:u.trys.push([1,4,5,6]);return[4/*yield*/,n.run()];case 2:e=u.sent();if(typeof e==="undefined"){return[2/*return*/]}return[4/*yield*/,n.onSuccess(e)];case 3:u.sent();return[3/*break*/,6];case 4:r=u.sent();n.onError(r);return[3/*break*/,6];case 5:n.setLoading(false);return[7/*endfinally*/];case 6:return[2/*return*/]}}))}))}
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
             */var m=n("e",(function(n,r){return e("tr",null,e("td",{colSpan:2},e("table",null,r)))}));var p=n("R",(function(n){var r=n.value;if(!r){return null}return[e("tr",{class:"title"},e("td",{colSpan:2},e(o,{variant:"s1",color:"black"},r))),e("tr",null,e("td",{colSpan:2,class:"divider"},e("span",null)))]}));var h=n("d",(function(n){var r=n.name,t=n.value,u=n.monospace,a=n.collapse,i=n.href,c=n.extraValue;if(!r){return null}if(t===undefined||t===null){return null}var s;if(a){s=e("peculiar-text-hider",null,t)}else{s=t}var v=!!t.toString();return e("tr",null,e("td",{colSpan:v?1:2},e(o,{variant:"b2",color:"gray-9"},r)),v&&e("td",{class:{monospace:Boolean(u)}},d(t.toString())||i?e(l,{variant:"b2",href:i||t.toString()},t):e(o,{variant:"b2",color:"black"},s,c)))}));
/**
             * @license
             * Copyright (c) Peculiar Ventures, LLC.
             *
             * This source code is licensed under the MIT license found in the
             * LICENSE file in the root directory of this source tree.
             */var y=n("B",(function(n){var u=n.serialNumber,a=n.version,i=n.validity,l=n.notBefore,o=n.notAfter,c=n.lastUpdate,s=n.nextUpdate,v=n.type;return[e(p,{value:r.getString("basicInformation")}),e(h,{name:r.getString("type"),value:v}),e(h,{name:r.getString("serialNumber"),value:u,monospace:true}),e(h,{name:r.getString("version"),value:a}),e(h,{name:r.getString("validity"),value:i}),e(h,{name:r.getString("issued"),value:l?t(l):undefined}),e(h,{name:r.getString("expired"),value:o?t(o):undefined}),e(h,{name:r.getString("lastUpdate"),value:c?t(c):undefined}),e(h,{name:r.getString("nextUpdate"),value:s?t(s):undefined})]}));
/**
             * @license
             * Copyright (c) Peculiar Ventures, LLC.
             *
             * This source code is licensed under the MIT license found in the
             * LICENSE file in the root directory of this source tree.
             */function b(n){if(n.params&&"modulus"in n.params){var e=n.params.modulus.byteLength;if(e%2){e-=1}return e*8}return null}function g(n){if(n.params&&"publicExponent"in n.params){return n.params.publicExponent.byteLength===3?65537:3}return null}var S=n("P",(function(n){var t=n.publicKey;if(!t){return null}function i(n){var t;var i=n.params&&"namedCurve"in n.params?(t=n.params.namedCurve)!==null&&t!==void 0?t:"":"";return[e(h,{name:r.getString("algorithm"),value:u(n.algorithm)}),e(h,{name:r.getString("namedCurve"),value:i?u(i):undefined}),e(h,{name:r.getString("exponent"),value:g(n)}),e(h,{name:r.getString("modulus"),value:b(n)}),e(h,{name:r.getString("value"),value:a.encode(n.value),monospace:true,collapse:true})]}return[e(p,{value:r.getString("publicKeyInfo")}),i(t),Array.isArray(t.params)&&t.params.length&&t.params.map((function(n){return e(m,null,i(n))}))]}));
/**
             * @license
             * Copyright (c) Peculiar Ventures, LLC.
             *
             * This source code is licensed under the MIT license found in the
             * LICENSE file in the root directory of this source tree.
             */var I=n("S",(function(n){var t=n.name;return[e(p,{value:r.getString("subjectName")}),t.map((function(n){return e(h,{name:u(n.type,true),value:n.value})}))]}));
/**
             * @license
             * Copyright (c) Peculiar Ventures, LLC.
             *
             * This source code is licensed under the MIT license found in the
             * LICENSE file in the root directory of this source tree.
             */var j=n("I",(function(n){var t=n.name,a=n.issuerDnLink;var i=r.getString("issuerName");return[e(p,{value:a?e(l,{href:a},i):i}),t.map((function(n){return e(h,{name:u(n.type,true),value:n.value})}))]}));
/**
             * @license
             * Copyright (c) Peculiar Ventures, LLC.
             *
             * This source code is licensed under the MIT license found in the
             * LICENSE file in the root directory of this source tree.
             */var k=n("a",(function(n){var t=n.signature;if(!t){return null}function l(n){return[e(h,{name:r.getString("algorithm"),value:u(n.algorithm)}),n.mtcProofError&&e(h,{name:"MTC Proof Error",value:n.mtcProofError}),!n.mtcProof&&e(h,{name:r.getString("value"),value:n.value&&i(n.value).length?a.encode(n.value):"(none)",monospace:true,collapse:true})]}function o(){var n=t.mtcProof;if(!n){return null}return[e(h,{name:"Start",value:n.start}),e(h,{name:"End",value:n.end}),e(h,{name:"Subtree Size",value:n.subtreeSize}),e(h,{name:"Landmark Relative",value:n.isLandmarkRelative?"YES":"NO"}),n.inclusionProof.length>0&&e(h,{name:"Inclusion Proof",value:n.inclusionProof.join("\n"),monospace:true,collapse:true}),n.signatures.length>0&&n.signatures.map((function(n){return e(m,null,e(h,{name:"Cosigner ID",value:n.cosignerId}),e(h,{name:"Signature",value:n.signature,monospace:true,collapse:true}))}))]}return[e(p,{value:r.getString("signature")}),l(t),o(),t.params&&t.params.length&&t.params.map((function(n){return e(m,null,l(n))}))]}));
/**
             * @license
             * Copyright (c) Peculiar Ventures, LLC.
             *
             * This source code is licensed under the MIT license found in the
             * LICENSE file in the root directory of this source tree.
             */var w=n("T",(function(n){var t=n.thumbprints;if(!t){return null}var u=Object.keys(t);if(!u.length){return null}return[e(p,{value:r.getString("fingerprints")}),u.map((function(n){return e(h,{name:n,value:t[n],monospace:true})}))]}));
/**
             * @license
             * Copyright (c) Peculiar Ventures, LLC.
             *
             * This source code is licensed under the MIT license found in the
             * LICENSE file in the root directory of this source tree.
             */var _=n("M",(function(n){var t=n.certificate;return[e(p,{value:r.getString("miscellaneous")}),e("tr",null,e("td",null,e(c,{startIcon:e(s,null),onClick:function(){return t.downloadAsPEM()}},r.getString("download.pem")))),e("tr",null,e("td",null,e(c,{startIcon:e(s,null),onClick:function(){return t.downloadAsDER()}},r.getString("download.der"))))]}));
/**
             * @license
             * Copyright (c) Peculiar Ventures, LLC.
             *
             * This source code is licensed under the MIT license found in the
             * LICENSE file in the root directory of this source tree.
             */var x=function(n){return"https://search.gleif.org/#/record/".concat(n)};var C=function(n){return"https://search.censys.io/search?resource=hosts&q=dns.names%3A".concat(n)};var K=function(n){return"https://search.censys.io/search?resource=hosts&q=ip%3A".concat(n)};
/**
             * @license
             * Copyright (c) Peculiar Ventures, LLC.
             *
             * This source code is licensed under the MIT license found in the
             * LICENSE file in the root directory of this source tree.
             */function O(n){if(!n._type||n.value==null)return undefined;var e=String(n.value);switch(n._type){case"dNSName":return C(e);case"iPAddress":return K(e);case"lei":return x(e);default:return undefined}}function N(n,r){var t,a,i,o,c;var s=u((t=n.title)!==null&&t!==void 0?t:"",true);var v=O(n);var f=n.value!=null?u(String(n.value)):"";if(n._type==="authorityKeyId"&&n.value!=null){var d=(a=r.getAuthKeyIdParentLink)===null||a===void 0?void 0:a.call(r,f);var m=(i=r.getAuthKeyIdSiblingsLink)===null||i===void 0?void 0:i.call(r,f);return e(h,{name:s,value:f,monospace:true,extraValue:[d&&e("span",null," [",e(l,{href:d},"parents"),"]"),m&&e("span",null," [",e(l,{href:m},"siblings"),"]")]})}if(n._type==="subjectKeyId"&&n.value!=null){var p=(o=r.getSubjectKeyIdChildrenLink)===null||o===void 0?void 0:o.call(r,f);var m=(c=r.getSubjectKeyIdSiblingsLink)===null||c===void 0?void 0:c.call(r,f);return e(h,{name:s,value:f,monospace:true,extraValue:[p&&e("span",null," [",e(l,{href:p},"children"),"]"),m&&e("span",null," [",e(l,{href:m},"siblings"),"]")]})}return e(h,{name:s,
// eslint-disable-next-line no-nested-ternary
value:typeof n.value==="boolean"?n.value?"YES":"NO":f,href:v})}function E(n,r){var t,a,i;if(n.title&&!((t=n.value)===null||t===void 0?void 0:t.toString())){return[e(h,{name:u(n.title),value:""}),e(m,null,(a=n.children)===null||a===void 0?void 0:a.map((function(n){return E(n,r)})))]}if((i=n.children)===null||i===void 0?void 0:i.length){return e(m,null,n.title&&e("tr",null,e("td",{colSpan:2},e(o,{variant:"b2",color:"gray-9"},u(n.title)))),n.children.map((function(n){return E(n,r)})))}return N(n,r)}
/**
             * @license
             * Copyright (c) Peculiar Ventures, LLC.
             *
             * This source code is licensed under the MIT license found in the
             * LICENSE file in the root directory of this source tree.
             */var L=n("c",(function(n){var r=n.extensions,t=n.title,a=t===void 0?"Extensions":t,i=__rest(n,["extensions","title"]);if(!(r===null||r===void 0?void 0:r.length)){return null}return[e(p,{value:a}),r.map((function(n){return[e("tr",null,e("td",{colSpan:2},e(o,{variant:"s2",color:"gray-9"},u(n.oid)))),e(h,{name:"Critical",value:n.critical?"YES":"NO"}),n.children.map((function(n){return E(n,i)})),e("tr",null,e("td",{colSpan:2,class:"divider"},e("span",null)))]}))]}))}}}));