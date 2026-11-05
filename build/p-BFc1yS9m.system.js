var __awaiter=this&&this.__awaiter||function(n,e,r,t){function u(n){return n instanceof r?n:new r((function(e){e(n)}))}return new(r||(r=Promise))((function(r,a){function i(n){try{o(t.next(n))}catch(n){a(n)}}function l(n){try{o(t["throw"](n))}catch(n){a(n)}}function o(n){n.done?r(n.value):u(n.value).then(i,l)}o((t=t.apply(n,e||[])).next())}))};var __generator=this&&this.__generator||function(n,e){var r={label:0,sent:function(){if(a[0]&1)throw a[1];return a[1]},trys:[],ops:[]},t,u,a,i=Object.create((typeof Iterator==="function"?Iterator:Object).prototype);return i.next=l(0),i["throw"]=l(1),i["return"]=l(2),typeof Symbol==="function"&&(i[Symbol.iterator]=function(){return this}),i;function l(n){return function(e){return o([n,e])}}function o(l){if(t)throw new TypeError("Generator is already executing.");while(i&&(i=0,l[0]&&(r=0)),r)try{if(t=1,u&&(a=l[0]&2?u["return"]:l[0]?u["throw"]||((a=u["return"])&&a.call(u),0):u.next)&&!(a=a.call(u,l[1])).done)return a;if(u=0,a)l=[l[0]&2,a.value];switch(l[0]){case 0:case 1:a=l;break;case 4:r.label++;return{value:l[1],done:false};case 5:r.label++;u=l[1];l=[0];continue;case 7:l=r.ops.pop();r.trys.pop();continue;default:if(!(a=r.trys,a=a.length>0&&a[a.length-1])&&(l[0]===6||l[0]===2)){r=0;continue}if(l[0]===3&&(!a||l[1]>a[0]&&l[1]<a[3])){r.label=l[1];break}if(l[0]===6&&r.label<a[1]){r.label=a[1];a=l;break}if(a&&r.label<a[2]){r.label=a[2];r.ops.push(l);break}if(a[2])r.ops.pop();r.trys.pop();continue}l=e.call(n,r)}catch(n){l=[6,n];u=0}finally{t=a=0}if(l[0]&5)throw l[1];return{value:l[0]?l[1]:void 0,done:true}}};var __rest=this&&this.__rest||function(n,e){var r={};for(var t in n)if(Object.prototype.hasOwnProperty.call(n,t)&&e.indexOf(t)<0)r[t]=n[t];if(n!=null&&typeof Object.getOwnPropertySymbols==="function")for(var u=0,t=Object.getOwnPropertySymbols(n);u<t.length;u++){if(e.indexOf(t[u])<0&&Object.prototype.propertyIsEnumerable.call(n,t[u]))r[t[u]]=n[t[u]]}return r};
/*!
 * © Peculiar Ventures https://peculiarventures.com/ - MIT License
 */System.register(["./p-B8av1M7B.system.js","./p-Du6q1H02.system.js","./p-Bj4Jbmep.system.js","./p-DkCgQOBd.system.js","./p-CCKxSL0M.system.js"],(function(n){"use strict";var e,r,t,u,a,i,l,o,c;return{setters:[function(n){e=n.h;r=n.H},function(n){t=n.i;u=n.E},function(n){a=n.L},function(n){i=n.T;l=n.B},function(n){o=n.A;c=n.D}],execute:function(){n({b:s,d:M,f:O,r:A,t:P});
/**
             * @license
             * Copyright (c) Peculiar Ventures, LLC.
             *
             * This source code is licensed under the MIT license found in the
             * LICENSE file in the root directory of this source tree.
             */function s(n){return{getAuthKeyIdParentLink:function(e){var r;return(r=n.authKeyIdParentLink)===null||r===void 0?void 0:r.replace("{{authKeyId}}",e)},getAuthKeyIdSiblingsLink:function(e){var r;return(r=n.authKeyIdSiblingsLink)===null||r===void 0?void 0:r.replace("{{authKeyId}}",e)},getSubjectKeyIdChildrenLink:function(e){var r;return(r=n.subjectKeyIdChildrenLink)===null||r===void 0?void 0:r.replace("{{subjectKeyId}}",e)},getSubjectKeyIdSiblingsLink:function(e){var r;return(r=n.subjectKeyIdSiblingsLink)===null||r===void 0?void 0:r.replace("{{subjectKeyId}}",e)},getIssuerDnLink:function(){return n.issuerDnLink}}}
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
             */var v=n("e",(function(n,r){return e("tr",null,e("td",{colSpan:2},e("table",null,r)))}));var d=n("R",(function(n){var r=n.value;if(!r){return null}return[e("tr",{class:"title"},e("td",{colSpan:2},e(i,{variant:"s1",color:"black"},r))),e("tr",null,e("td",{colSpan:2,class:"divider"},e("span",null)))]}));var m=n("c",(function(n){var r=n.name,t=n.value,u=n.monospace,l=n.collapse,c=n.href,s=n.extraValue;if(!r){return null}if(t===undefined||t===null){return null}var v;if(l){
// The value stays outside <details> so it can be selected without toggling; see `.text_hider` styles.
v=e("span",{class:"text_hider"},e("span",{class:"text_hider_content"},t),e("details",{class:"text_hider_toggle"},e("summary",{class:"button m_no_padding","aria-label":"Show full value"},e(o,{color:"secondary"}))))}else{v=t}var d=!!t.toString();return e("tr",null,e("td",{colSpan:d?1:2},e(i,{variant:"b2",color:"gray-9"},r)),d&&e("td",{class:{monospace:Boolean(u)}},f(t.toString())||c?e(a,{variant:"b2",href:c||t.toString()},t):e(i,{variant:"b2",color:"black"},v,s)))}));
/**
             * @license
             * Copyright (c) Peculiar Ventures, LLC.
             *
             * This source code is licensed under the MIT license found in the
             * LICENSE file in the root directory of this source tree.
             */var p=n("B",(function(n){var r=n.serialNumber,u=n.version,a=n.validity,i=n.notBefore,l=n.notAfter,o=n.lastUpdate,c=n.nextUpdate,s=n.type;return[e(d,{value:"Basic Information"}),e(m,{name:"Type",value:s}),e(m,{name:"Serial Number",value:r,monospace:true}),e(m,{name:"Version",value:u}),e(m,{name:"Validity",value:a}),e(m,{name:"Issued",value:i?t(i):undefined}),e(m,{name:"Expired",value:l?t(l):undefined}),e(m,{name:"Last Update",value:o?t(o):undefined}),e(m,{name:"Next Update",value:c?t(c):undefined})]}));
/**
             * @license
             * Copyright (c) Peculiar Ventures, LLC.
             *
             * This source code is licensed under the MIT license found in the
             * LICENSE file in the root directory of this source tree.
             */var h=function(n){return[e(m,{name:"Algorithm",value:u(n.algorithm)}),e(m,{name:"Named Curve",value:n.namedCurve?u(n.namedCurve):undefined}),e(m,{name:"Exponent",value:n.exponent}),e(m,{name:"Modulus",value:n.modulusBits}),e(m,{name:"Value",value:n.value,monospace:true,collapse:true})]};var y=n("P",(function(n){var r;var t=n.publicKey;if(!t){return null}return[e(d,{value:"Public Key Info"}),h(t),(r=t.parts)===null||r===void 0?void 0:r.map((function(n){return e(v,null,h(n))}))]}));
/**
             * @license
             * Copyright (c) Peculiar Ventures, LLC.
             *
             * This source code is licensed under the MIT license found in the
             * LICENSE file in the root directory of this source tree.
             */var b=n("N",(function(n){var r=n.title,t=n.name,i=n.href;return[e(d,{value:i?e(a,{href:i},r):r}),t.map((function(n){return e(m,{name:u(n.type,true),value:n.value})}))]}));
/**
             * @license
             * Copyright (c) Peculiar Ventures, LLC.
             *
             * This source code is licensed under the MIT license found in the
             * LICENSE file in the root directory of this source tree.
             */var g=function(n){return[e(m,{name:"Algorithm",value:u(n.algorithm)}),n.mtcProofError&&e(m,{name:"MTC Proof Error",value:n.mtcProofError}),!n.mtcProof&&e(m,{name:"Value",value:n.value||"(none)",monospace:true,collapse:true})]};var S=n("S",(function(n){var r;var t=n.signature;if(!t){return null}var u=t.mtcProof;return[e(d,{value:"Signature"}),g(t),u&&[e(m,{name:"Start",value:u.start}),e(m,{name:"End",value:u.end}),e(m,{name:"Subtree Size",value:u.subtreeSize}),e(m,{name:"Landmark Relative",value:u.isLandmarkRelative?"YES":"NO"}),u.inclusionProof.length>0&&e(m,{name:"Inclusion Proof",value:u.inclusionProof.join("\n"),monospace:true,collapse:true}),u.signatures.map((function(n){return e(v,null,e(m,{name:"Cosigner ID",value:n.cosignerId}),e(m,{name:"Signature",value:n.signature,monospace:true,collapse:true}))}))],(r=t.parts)===null||r===void 0?void 0:r.map((function(n){return e(v,null,g(n))}))]}));
/**
             * @license
             * Copyright (c) Peculiar Ventures, LLC.
             *
             * This source code is licensed under the MIT license found in the
             * LICENSE file in the root directory of this source tree.
             */var _=n("T",(function(n){var r=n.thumbprints;if(!r){return null}var t=Object.keys(r);if(!t.length){return null}return[e(d,{value:"Fingerprints"}),t.map((function(n){return e(m,{name:n,value:r[n],monospace:true})}))]}));
/**
             * @license
             * Copyright (c) Peculiar Ventures, LLC.
             *
             * This source code is licensed under the MIT license found in the
             * LICENSE file in the root directory of this source tree.
             */var w=n("M",(function(n){var r=n.certificate;return[e(d,{value:"Miscellaneous"}),e("tr",null,e("td",null,e(l,{startIcon:e(c,null),onClick:function(){return r.download("pem")}},"Download PEM"))),e("tr",null,e("td",null,e(l,{startIcon:e(c,null),onClick:function(){return r.download("der")}},"Download DER")))]}));
/**
             * @license
             * Copyright (c) Peculiar Ventures, LLC.
             *
             * This source code is licensed under the MIT license found in the
             * LICENSE file in the root directory of this source tree.
             */var I=function(n){return"https://search.gleif.org/#/record/".concat(n)};var j=function(n){return"https://search.censys.io/search?resource=hosts&q=dns.names%3A".concat(n)};var k=function(n){return"https://search.censys.io/search?resource=hosts&q=ip%3A".concat(n)};
/**
             * @license
             * Copyright (c) Peculiar Ventures, LLC.
             *
             * This source code is licensed under the MIT license found in the
             * LICENSE file in the root directory of this source tree.
             */function E(n){if(!n._type||n.value==null)return undefined;var e=String(n.value);switch(n._type){case"dNSName":return j(e);case"iPAddress":return k(e);case"lei":return I(e);default:return undefined}}
/** A key identifier row followed by optional "[parents]"-style links. */function x(n,r,t){return e(m,{name:n,value:r,monospace:true,extraValue:t.map((function(n){var r=n[0],t=n[1];return t&&e("span",null," [",e(a,{href:t},r),"]")}))})}function K(n,r){var t,a,i,l,o;var c=u((t=n.title)!==null&&t!==void 0?t:"",true);var s=E(n);var f=n.value!=null?u(String(n.value)):"";if(n.value!=null&&n._type==="authorityKeyId"){return x(c,f,[["parents",(a=r.getAuthKeyIdParentLink)===null||a===void 0?void 0:a.call(r,f)],["siblings",(i=r.getAuthKeyIdSiblingsLink)===null||i===void 0?void 0:i.call(r,f)]])}if(n.value!=null&&n._type==="subjectKeyId"){return x(c,f,[["children",(l=r.getSubjectKeyIdChildrenLink)===null||l===void 0?void 0:l.call(r,f)],["siblings",(o=r.getSubjectKeyIdSiblingsLink)===null||o===void 0?void 0:o.call(r,f)]])}return e(m,{name:c,
// eslint-disable-next-line no-nested-ternary
value:typeof n.value==="boolean"?n.value?"YES":"NO":f,href:s})}function O(n,r){var t,a,l;if(n.title&&!((t=n.value)===null||t===void 0?void 0:t.toString())){return[e(m,{name:u(n.title),value:""}),e(v,null,(a=n.children)===null||a===void 0?void 0:a.map((function(n){return O(n,r)})))]}if((l=n.children)===null||l===void 0?void 0:l.length){return e(v,null,n.title&&e("tr",null,e("td",{colSpan:2},e(i,{variant:"b2",color:"gray-9"},u(n.title)))),n.children.map((function(n){return O(n,r)})))}return K(n,r)}
/**
             * @license
             * Copyright (c) Peculiar Ventures, LLC.
             *
             * This source code is licensed under the MIT license found in the
             * LICENSE file in the root directory of this source tree.
             */var C=n("a",(function(n){var r=n.extensions,t=n.title,a=t===void 0?"Extensions":t,l=__rest(n,["extensions","title"]);if(!(r===null||r===void 0?void 0:r.length)){return null}return[e(d,{value:a}),r.map((function(n){return[e("tr",null,e("td",{colSpan:2},e(i,{variant:"s2",color:"gray-9"},u(n.oid)))),e(m,{name:"Critical",value:n.critical?"YES":"NO"}),n.children.map((function(n){return O(n,l)})),e("tr",null,e("td",{colSpan:2,class:"divider"},e("span",null)))]}))]}));var N=new WeakMap;
/**
             * Runs a decode for `owner` (the component instance). Only the latest call per owner may report its
             * result, so a slow earlier decode can't overwrite a newer one.
             */function L(n,e){return __awaiter(this,void 0,void 0,(function(){var r,t,u,a;var i,l;return __generator(this,(function(o){switch(o.label){case 0:r=((i=N.get(n))!==null&&i!==void 0?i:0)+1;t=function(){return N.get(n)===r};N.set(n,r);(l=e.onStart)===null||l===void 0?void 0:l.call(e);o.label=1;case 1:o.trys.push([1,3,,4]);return[4/*yield*/,e.run()];case 2:u=o.sent();if(t()&&typeof u!=="undefined"){e.onSuccess(u)}return[3/*break*/,4];case 3:a=o.sent();if(t()){e.onError(a)}return[3/*break*/,4];case 4:return[2/*return*/]}}))}))}
/** Decodes into `viewer.certificateDecoded`, or sets `viewer.certificateDecodeError`. */function M(n,e){return L(n,{onStart:function(){n.certificateDecodeError=undefined},run:e,onSuccess:function(e){n.certificateDecoded=e},onError:function(e){n.certificateDecodeError=e;console.error("Error certificate parse:",e)}})}
/** An instance is used as is, a string is decoded, anything else means "nothing to show". */function P(n,e){if(n instanceof e){return n}if(typeof n==="string"){return new e(n)}return undefined}
/**
             * @license
             * Copyright (c) Peculiar Ventures, LLC.
             *
             * This source code is licensed under the MIT license found in the
             * LICENSE file in the root directory of this source tree.
             */
/** Error and empty states, then the viewer table. Shared by all detail viewers. */function A(n){var t=n.viewer,u=n.subject,a=n.body;if(t.certificateDecodeError){return e("div",{class:"status_wrapper"},e(i,null,"There was an error decoding this ",u,"."))}if(!t.certificateDecoded){return e("div",{class:"status_wrapper"},e(i,null,"There is no ",u," available."))}return e(r,null,e("table",null,a(t.certificateDecoded)))}}}}));