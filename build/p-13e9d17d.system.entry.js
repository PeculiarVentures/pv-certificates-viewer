var __extends=this&&this.__extends||function(){var e=function(t,i){e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var i in t)if(Object.prototype.hasOwnProperty.call(t,i))e[i]=t[i]};return e(t,i)};return function(t,i){if(typeof i!=="function"&&i!==null)throw new TypeError("Class extends value "+String(i)+" is not a constructor or null");e(t,i);function n(){this.constructor=t}t.prototype=i===null?Object.create(i):(n.prototype=i.prototype,new n)}}();var __awaiter=this&&this.__awaiter||function(e,t,i,n){function r(e){return e instanceof i?e:new i((function(t){t(e)}))}return new(i||(i=Promise))((function(i,a){function o(e){try{s(n.next(e))}catch(e){a(e)}}function c(e){try{s(n["throw"](e))}catch(e){a(e)}}function s(e){e.done?i(e.value):r(e.value).then(o,c)}s((n=n.apply(e,t||[])).next())}))};var __generator=this&&this.__generator||function(e,t){var i={label:0,sent:function(){if(a[0]&1)throw a[1];return a[1]},trys:[],ops:[]},n,r,a,o;return o={next:c(0),throw:c(1),return:c(2)},typeof Symbol==="function"&&(o[Symbol.iterator]=function(){return this}),o;function c(e){return function(t){return s([e,t])}}function s(o){if(n)throw new TypeError("Generator is already executing.");while(i)try{if(n=1,r&&(a=o[0]&2?r["return"]:o[0]?r["throw"]||((a=r["return"])&&a.call(r),0):r.next)&&!(a=a.call(r,o[1])).done)return a;if(r=0,a)o=[o[0]&2,a.value];switch(o[0]){case 0:case 1:a=o;break;case 4:i.label++;return{value:o[1],done:false};case 5:i.label++;r=o[1];o=[0];continue;case 7:o=i.ops.pop();i.trys.pop();continue;default:if(!(a=i.trys,a=a.length>0&&a[a.length-1])&&(o[0]===6||o[0]===2)){i=0;continue}if(o[0]===3&&(!a||o[1]>a[0]&&o[1]<a[3])){i.label=o[1];break}if(o[0]===6&&i.label<a[1]){i.label=a[1];a=o;break}if(a&&i.label<a[2]){i.label=a[2];i.ops.push(o);break}if(a[2])i.ops.pop();i.trys.pop();continue}o=t.call(e,i)}catch(e){o=[6,e];r=0}finally{n=a=0}if(o[0]&5)throw o[1];return{value:o[0]?o[1]:void 0,done:true}}};
/*!
 * © Peculiar Ventures https://peculiarventures.com/ - MIT License
 */System.register(["./p-9837be14.system.js","./p-047b12d9.system.js","./p-29cdd256.system.js","./p-4f52a24f.system.js","./p-88fbaf05.system.js"],(function(e){"use strict";var t,i,n,r,a,o,c,s,l,u,d,f,p,b,h,g,v,m,x,y,w,k,S,_,I,C,D,A,L,N,j,z,P,T,E,K,O,H,R,V,B,G,q,F,M,U,Y,Q,X,J,W,Z,$,ee,te,ie,ne,re,ae,oe,ce,se,le,ue,de,fe,pe,be,he,ge,ve,me,xe,ye,we,ke,Se,_e,Ie,Ce,De,Ae,Le,Ne,je,ze,Pe,Te,Ee,Ke,Oe,He,Re;return{setters:[function(e){t=e.h;i=e.r;n=e.H;r=e.c},function(e){a=e.A;o=e.a;c=e.i;s=e.b;l=e.E;u=e.c;d=e.d;f=e.e;p=e.U;b=e.f;h=e.C;g=e.g;v=e.V;m=e.h;x=e.I;y=e.j;w=e.W;k=e.k;S=e.l;_=e.m;I=e.T;C=e.n;D=e.D;A=e.o;L=e.p;N=e.q;j=e.r;z=e.s;P=e.t;T=e.u;E=e.v;K=e.w;O=e.x;H=e.y;R=e.z;V=e.N;B=e.B;G=e.F;q=e.G;F=e.R;M=e.O;U=e.H;Y=e.J;Q=e.K;X=e.L;J=e.M;W=e.P;Z=e.Q;$=e.S;ee=e.X;te=e.Y;ie=e.Z;ne=e._;re=e.$;ae=e.a0;oe=e.a1;ce=e.a2;se=e.a3;le=e.a4;ue=e.a5;de=e.a6;fe=e.a7;pe=e.a8;be=e.a9;he=e.aa;ge=e.ab;ve=e.ac;me=e.ad;xe=e.ae;ye=e.af;we=e.ag;ke=e.ah;Se=e.ai;_e=e.aj;Ie=e.ak;Ce=e.al;De=e.am;Ae=e.an;Le=e.ao;Ne=e.ap;je=e.aq;ze=e.ar;Pe=e.as},function(e){Te=e.b;Ee=e.D},function(e){Ke=e.d;Oe=e.l;He=e.a;Re=e.h},function(){}],execute:function(){
/**
       * @license
       * Copyright (c) Peculiar Ventures, LLC.
       *
       * This source code is licensed under the MIT license found in the
       * LICENSE file in the root directory of this source tree.
       */
function Ve(e){return new Promise((function(t,i){var n=new FileReader;n.onload=function(){return t({value:n.result,fileName:e.name,fileSize:e.size,sourceMime:e.type})};n.onerror=function(){return i(n.error)};n.readAsBinaryString(e)}))}
/**
       * @license
       * Copyright (c) Peculiar Ventures, LLC.
       *
       * This source code is licensed under the MIT license found in the
       * LICENSE file in the root directory of this source tree.
       */var Be=function(e){__extends(t,e);function t(t){var i=e.call(this,t,o)||this;var n=i.getAsnExtnValue();switch(i.asn.type){case z:i.value=s.parse(n,P);break;case N:i.value=s.parse(n,j);break;case A:i.value=s.parse(n,L);break;case C:i.value=s.parse(n,D);break;case _:i.value=s.parse(n,I);break;case k:i.value=s.parse(n,S);break;case y:i.value=s.parse(n,w);break;case m:i.value=s.parse(n,x);break;case g:i.value=s.parse(n,v);break;case b:i.value=s.parse(n,h);break;case f:i.value=s.parse(n,p);break;case c:{var r=s.parse(n,l);i.value=r.map((function(e){return new u(d.serialize(e))}));break}default:i.value=Te.Convert.ToHex(n)}return i}t.prototype.getAsnExtnValue=function(){return this.asn.values[0]};return t}(a);
/**
       * @license
       * Copyright (c) Peculiar Ventures, LLC.
       *
       * This source code is licensed under the MIT license found in the
       * LICENSE file in the root directory of this source tree.
       */var Ge=function(e){__extends(t,e);function t(t){var i=this;var n;i=e.call(this,T(t),E)||this;i.thumbprints={};i.type="X.509 Attribute Certificate";var r=i.asn.acinfo;i.serialNumber=Te.Convert.ToHex(r.serialNumber);i.version=r.version;var a=r.attrCertValidityPeriod.notBeforeTime;if(!a){throw new Error("Cannot get 'notBefore' value")}i.notBefore=a;var o=r.attrCertValidityPeriod.notAfterTime;if(!o){throw new Error("Cannot get 'notAfter' value")}i.notAfter=o;i.validity=Ke(i.notBefore,i.notAfter);i.issuer=r.issuer.v1Form||((n=r.issuer.v2Form)===null||n===void 0?void 0:n.issuerName);i.holder=r.holder;return i}Object.defineProperty(t.prototype,"signature",{get:function(){var e=this.asn,t=e.signatureValue,i=e.signatureAlgorithm;return{value:t,algorithm:i.algorithm}},enumerable:false,configurable:true});t.prototype.parseExtensions=function(){var e=this.asn.acinfo;if(e.extensions){this.extensions=e.extensions.map((function(e){return new u(d.serialize(e))}))}};t.prototype.parseAttributes=function(){var e=this.asn.acinfo;if(e.attributes){this.attributes=e.attributes.map((function(e){return new Be(d.serialize(e))}))}};t.prototype.getThumbprint=function(e){if(e===void 0){e="SHA-1"}return __awaiter(this,void 0,void 0,(function(){var t,i;return __generator(this,(function(n){switch(n.label){case 0:n.trys.push([0,2,,3]);return[4,K(e,this.raw)];case 1:t=n.sent();this.thumbprints[e["name"]||e]=Te.Convert.ToHex(t);return[3,3];case 2:i=n.sent();console.error("Error thumbprint get:",i);return[3,3];case 3:return[2]}}))}))};t.prototype.exportAsBase64=function(){return Te.Convert.ToBase64(this.raw)};t.prototype.exportAsHexFormatted=function(){return O(Te.Convert.ToHex(this.raw))};t.prototype.exportAsPemFormatted=function(){return"-----BEGIN ATTRIBUTE CERTIFICATE-----\n".concat(H(this.exportAsBase64()),"\n-----END ATTRIBUTE CERTIFICATE-----")};Object.defineProperty(t.prototype,"commonName",{get:function(){return"attribute-certificate-".concat(this.thumbprints["SHA-1"])},enumerable:false,configurable:true});return t}(a);
/**
       * @license
       * Copyright (c) Peculiar Ventures, LLC.
       *
       * This source code is licensed under the MIT license found in the
       * LICENSE file in the root directory of this source tree.
       */var qe=function(e){__extends(t,e);function t(t){var i=e.call(this,T(t),R)||this;i.thumbprints={};i.type="PKCS#10 Certificate Request";var n=i.asn.certificationRequestInfo;i.subject=new V(n.subject).toJSON();i.version=n.version;return i}Object.defineProperty(t.prototype,"publicKey",{get:function(){var e=this.asn.certificationRequestInfo.subjectPKInfo,t=e.subjectPublicKey,i=e.algorithm;var n;if(i.algorithm===B&&i.parameters){n=d.parse(i.parameters,G)}if(i.algorithm===q){n=d.parse(t,F)}var r=d.serialize(this.asn.certificationRequestInfo.subjectPKInfo);return{params:n,value:r,algorithm:i.algorithm}},enumerable:false,configurable:true});Object.defineProperty(t.prototype,"signature",{get:function(){var e=this.asn,t=e.signature,i=e.signatureAlgorithm;return{value:t,algorithm:i.algorithm}},enumerable:false,configurable:true});Object.defineProperty(t.prototype,"commonName",{get:function(){if(!this.subject){return""}for(var e=0;e<this.subject.length;e+=1){var t=this.subject[e];if(t.shortName==="CN"||t.shortName==="E"||t.shortName==="O"){return t.value}}return""},enumerable:false,configurable:true});t.prototype.getThumbprint=function(e){if(e===void 0){e="SHA-1"}return __awaiter(this,void 0,void 0,(function(){var t,i;return __generator(this,(function(n){switch(n.label){case 0:n.trys.push([0,2,,3]);return[4,K(e,this.raw)];case 1:t=n.sent();this.thumbprints[e["name"]||e]=Te.Convert.ToHex(t);return[3,3];case 2:i=n.sent();console.error("Error thumbprint get:",i);return[3,3];case 3:return[2]}}))}))};t.prototype.parseAttributes=function(){var e=this.asn.certificationRequestInfo;if(e.attributes){this.attributes=e.attributes.map((function(e){return new Be(d.serialize(e))}))}};t.prototype.exportAsBase64=function(){return Te.Convert.ToBase64(this.raw)};t.prototype.exportAsHexFormatted=function(){return O(Te.Convert.ToHex(this.raw))};t.prototype.exportAsPemFormatted=function(){return"-----BEGIN CERTIFICATE REQUEST-----\n".concat(H(this.exportAsBase64()),"\n-----END CERTIFICATE REQUEST-----")};return t}(a);
/**
       * @license
       * Copyright (c) Peculiar Ventures, LLC.
       *
       * This source code is licensed under the MIT license found in the
       * LICENSE file in the root directory of this source tree.
       */function Fe(e){var t=M[e];if(t){return"".concat(t," (").concat(e,")")}return e}
/**
       * @license
       * Copyright (c) Peculiar Ventures, LLC.
       *
       * This source code is licensed under the MIT license found in the
       * LICENSE file in the root directory of this source tree.
       */function Me(e){return e.indexOf("http")===0}
/**
       * @license
       * Copyright (c) Peculiar Ventures, LLC.
       *
       * This source code is licensed under the MIT license found in the
       * LICENSE file in the root directory of this source tree.
       */var Ue=function(e){var i=e.value;if(!i){return null}return t("tr",{class:"title"},t("td",{colSpan:2},t("peculiar-typography",{type:"h6"},i)))};var Ye=function(e){var i=e.name,n=e.value,r=e.monospace,a=e.collapse,o=e.href,c=e.extraValue;if(!i){return null}if(n===undefined||n===null){return null}var s;if(a){s=t("peculiar-text-hider",null,n)}else{s=n}var l=!!n.toString();return t("tr",null,t("td",{colSpan:l?1:2},t("peculiar-typography",{color:"grey_5"},i,l?":":"")),l&&t("td",{class:{monospace:r}},Me(n.toString())||o?t("peculiar-link",{href:o||n.toString()},n):t("peculiar-typography",{monospace:r},s,c)))};
/**
       * @license
       * Copyright (c) Peculiar Ventures, LLC.
       *
       * This source code is licensed under the MIT license found in the
       * LICENSE file in the root directory of this source tree.
       */var Qe=function(e){var i=e.signature;if(!i){return null}return[t(Ue,{value:Oe.getString("signature")}),t(Ye,{name:Oe.getString("algorithm"),value:Fe(i.algorithm)}),t(Ye,{name:Oe.getString("value"),value:Te.Convert.ToHex(i.value),monospace:true,collapse:true})]};
/**
       * @license
       * Copyright (c) Peculiar Ventures, LLC.
       *
       * This source code is licensed under the MIT license found in the
       * LICENSE file in the root directory of this source tree.
       */var Xe=function(e,i){var n=e.attribute;return[t(Ye,{name:"Name",value:Fe(n.asn.type)}),i,t("tr",null,t("td",{colSpan:2,class:"divider"},t("span",{class:"bg_fill"})))]};
/**
       * @license
       * Copyright (c) Peculiar Ventures, LLC.
       *
       * This source code is licensed under the MIT license found in the
       * LICENSE file in the root directory of this source tree.
       */var Je=function(e){var i=e.name;if(!i){return null}return i.map((function(e){return e.map((function(e){return t(Ye,{name:M[e.type]||e.type,value:e.value.toString()})}))}))};
/**
       * @license
       * Copyright (c) Peculiar Ventures, LLC.
       *
       * This source code is licensed under the MIT license found in the
       * LICENSE file in the root directory of this source tree.
       */var We=function(e){var i=e.attribute;return t(Xe,{attribute:i},t(Je,{name:i.value}))};
/**
       * @license
       * Copyright (c) Peculiar Ventures, LLC.
       *
       * This source code is licensed under the MIT license found in the
       * LICENSE file in the root directory of this source tree.
       */var Ze={otherName:"Other Name",rfc822Name:"RFC 822 Name",dNSName:"DNS Name",x400Address:"X400 Address",directoryName:"Directory Name",ediPartyName:"Edi Party Name ",uniformResourceIdentifier:"URI",iPAddress:"IP Address",registeredID:"Registered ID"};var $e=function(e){var i=e.generalName,n=e.getDNSNameLink,r=e.getIPAddressLink;if(!i){return null}return Object.keys(i).map((function(e){var a=i[e];if(a instanceof U){return[t(Ye,{name:Ze[e]||e,value:""}),a.map((function(e){return e.map((function(e){return t(Ye,{name:M[e.type]||e.type,value:e.value.toString()})}))}))]}if(a instanceof Y){try{var o=s.parse(a.value,Q);return t(Ye,{name:M[a.typeId]||a.typeId,value:o.toString()})}catch(e){}try{var o=s.parse(a.value,X);if(o.explicitText){return t(Ye,{name:M[a.typeId]||a.typeId,value:o.explicitText.toString()})}}catch(e){}return t(Ye,{name:M[a.typeId]||a.typeId,value:Te.Convert.ToHex(a.value),monospace:true})}if(Te.BufferSourceConverter.isBufferSource(a)){return t(Ye,{name:Ze[e]||e,value:Te.Convert.ToString(a)})}if(a instanceof J){return t(Ye,{name:Ze[e]||e,value:Te.Convert.ToString(a.partyName)})}if(e==="dNSName"){return t(Ye,{name:Ze[e]||e,value:a,href:n(a)})}if(e==="iPAddress"){return t(Ye,{name:Ze[e]||e,value:a,href:r(a)})}return t(Ye,{name:Ze[e]||e,value:a})}))};
/**
       * @license
       * Copyright (c) Peculiar Ventures, LLC.
       *
       * This source code is licensed under the MIT license found in the
       * LICENSE file in the root directory of this source tree.
       */var et=function(e){var i=e.attribute;return t(Xe,{attribute:i},t(Ye,{name:"Code Authority",value:""}),t($e,{generalName:i.value.codeAuthority,getDNSNameLink:function(){return""},getIPAddressLink:function(){return""}}),t(Ye,{name:"Code Id",value:""}),t($e,{generalName:i.value.codeId,getDNSNameLink:function(){return""},getIPAddressLink:function(){return""}}),t(Ye,{name:"Short Name",value:i.value.shortName}),t(Ye,{name:"Short Description",value:i.value.shortDescription}))};
/**
       * @license
       * Copyright (c) Peculiar Ventures, LLC.
       *
       * This source code is licensed under the MIT license found in the
       * LICENSE file in the root directory of this source tree.
       */var tt=function(e){var i=e.attribute;return t(Xe,{attribute:i},t(Ye,{name:"Assessment Authority",value:""}),t($e,{generalName:i.value.assessmentAuthority,getDNSNameLink:function(){return""},getIPAddressLink:function(){return""}}),t(Ye,{name:"Assessment Location",value:""}),t($e,{generalName:i.value.assessmentLocation,getDNSNameLink:function(){return""},getIPAddressLink:function(){return""}}),t(Ye,{name:"Assessment Ref",value:""}),t($e,{generalName:i.value.assessmentRef,getDNSNameLink:function(){return""},getIPAddressLink:function(){return""}}),t(Ye,{name:"Data Storage Territory",value:i.value.dataStorageTerritory}),t(Ye,{name:"Description",value:i.value.description}))};
/**
       * @license
       * Copyright (c) Peculiar Ventures, LLC.
       *
       * This source code is licensed under the MIT license found in the
       * LICENSE file in the root directory of this source tree.
       */var it=function(e){var i=e.attribute;var n="".concat(i.value.base," * 10^").concat(i.value.degree," ").concat(i.value.location);return t(Xe,{attribute:i},t(Ye,{name:"Value",value:n}))};
/**
       * @license
       * Copyright (c) Peculiar Ventures, LLC.
       *
       * This source code is licensed under the MIT license found in the
       * LICENSE file in the root directory of this source tree.
       */var nt=function(e){var i=e.attribute;return t(Xe,{attribute:i},Object.keys(i.value).map((function(e){return t(Ye,{name:e,value:i.value[e].toNumber()?"YES":"NO"})})))};
/**
       * @license
       * Copyright (c) Peculiar Ventures, LLC.
       *
       * This source code is licensed under the MIT license found in the
       * LICENSE file in the root directory of this source tree.
       */var rt=function(e){var t=1;if(e/100>1){t=100}else if(e/10>1){t=10}return"".concat(e,"/").concat(5*t)};var at=function(e){var i=e.attribute;var n=Object.keys(i.value).map((function(e){return[rt(i.value[e]),t("br",null)]}));return t(Xe,{attribute:i},t(Ye,{name:"Value",value:n}))};
/**
       * @license
       * Copyright (c) Peculiar Ventures, LLC.
       *
       * This source code is licensed under the MIT license found in the
       * LICENSE file in the root directory of this source tree.
       */var ot=function(e){var i=e.attribute;return t(Xe,{attribute:i},t(Ye,{name:"Value",value:i.value,monospace:true}))};
/**
       * @license
       * Copyright (c) Peculiar Ventures, LLC.
       *
       * This source code is licensed under the MIT license found in the
       * LICENSE file in the root directory of this source tree.
       */var ct=function(e){var i=e.attribute;return t(Xe,{attribute:i},t(Ye,{name:"Value",value:i.value.utf8String}))};
/**
       * @license
       * Copyright (c) Peculiar Ventures, LLC.
       *
       * This source code is licensed under the MIT license found in the
       * LICENSE file in the root directory of this source tree.
       */var st=function(e){var i=e.attribute;return t(Xe,{attribute:i},t(Ye,{name:"Value",value:i.value.toString()}))};
/**
       * @license
       * Copyright (c) Peculiar Ventures, LLC.
       *
       * This source code is licensed under the MIT license found in the
       * LICENSE file in the root directory of this source tree.
       */var lt=function(e){var i=e.attributes;if(!i||!i.length){return null}return[t(Ue,{value:"Attributes"}),i.map((function(e){try{if(e.value instanceof U){return t(We,{attribute:e})}if(e.value instanceof S){return t(et,{attribute:e})}if(e.value instanceof w){return t(tt,{attribute:e})}if(e.value instanceof x){return t(it,{attribute:e})}if(e.value instanceof I){return t(nt,{attribute:e})}if(e.value instanceof v){return t(at,{attribute:e})}if(e.value instanceof p){return t(ct,{attribute:e})}if(e.value instanceof h){return t(st,{attribute:e})}if(typeof e.value==="string"){return t(ot,{attribute:e})}return t(Xe,{attribute:e})}catch(t){console.error("Error render attribute:",e.asn.type);return null}}))]};
/**
       * @license
       * Copyright (c) Peculiar Ventures, LLC.
       *
       * This source code is licensed under the MIT license found in the
       * LICENSE file in the root directory of this source tree.
       */var ut=function(e){var i=e.thumbprints;if(!i){return null}var n=Object.keys(i);if(!n.length){return null}return[t(Ue,{value:Oe.getString("fingerprints")}),n.map((function(e){return t(Ye,{name:e,value:i[e],monospace:true})}))]};
/**
       * @license
       * Copyright (c) Peculiar Ventures, LLC.
       *
       * This source code is licensed under the MIT license found in the
       * LICENSE file in the root directory of this source tree.
       */var dt=function(e,i){var n=e.extension;return[t(Ye,{name:"Name",value:Fe(n.asn.extnID)}),t(Ye,{name:"Critical",value:n.asn.critical?"YES":"NO"}),i,t("tr",null,t("td",{colSpan:2,class:"divider"},t("span",{class:"bg_fill"})))]};
/**
       * @license
       * Copyright (c) Peculiar Ventures, LLC.
       *
       * This source code is licensed under the MIT license found in the
       * LICENSE file in the root directory of this source tree.
       */var ft=function(e){var i=e.extension;return t(dt,{extension:i},t(Ye,{name:"Usage",value:i.value.toJSON().join(", ")}))};
/**
       * @license
       * Copyright (c) Peculiar Ventures, LLC.
       *
       * This source code is licensed under the MIT license found in the
       * LICENSE file in the root directory of this source tree.
       */var pt=function(e){var i=e.extension;return t(dt,{extension:i},t(Ye,{name:"Certificate Authority",value:i.value.cA?"YES":"NO"}),t(Ye,{name:"Path Length Constraint",value:i.value.pathLenConstraint}))};
/**
       * @license
       * Copyright (c) Peculiar Ventures, LLC.
       *
       * This source code is licensed under the MIT license found in the
       * LICENSE file in the root directory of this source tree.
       */var bt=function(e){var i=e.extension;return t(dt,{extension:i},i.value.map((function(e,i){return t(Ye,{name:"Purpose #".concat(i+1),value:Fe(e)})})))};
/**
       * @license
       * Copyright (c) Peculiar Ventures, LLC.
       *
       * This source code is licensed under the MIT license found in the
       * LICENSE file in the root directory of this source tree.
       */var ht=function(e){var i=e.extension,n=e.getSubjectKeyIdChildrenLink,r=e.getSubjectKeyIdSiblingsLink;var a=Te.Convert.ToHex(i.value.buffer);var o=n(a);var c=r(a);return t(dt,{extension:i},t(Ye,{name:"Key ID",value:a,monospace:true,extraValue:[o&&t("span",null," [",t("peculiar-link",{href:o},"children"),"]"),c&&t("span",null," [",t("peculiar-link",{href:c},"siblings"),"]")]}))};
/**
       * @license
       * Copyright (c) Peculiar Ventures, LLC.
       *
       * This source code is licensed under the MIT license found in the
       * LICENSE file in the root directory of this source tree.
       */var gt=function(e){var i=e.extension,n=e.getAuthKeyIdParentLink,r=e.getAuthKeyIdSiblingsLink;var a=Te.Convert.ToHex(i.value.keyIdentifier.buffer);var o=n(a);var c=r(a);return t(dt,{extension:i},t(Ye,{name:"Key ID",value:a,monospace:true,extraValue:[o&&t("span",null," [",t("peculiar-link",{href:o},"parents"),"]"),c&&t("span",null," [",t("peculiar-link",{href:c},"siblings"),"]")]}))};
/**
       * @license
       * Copyright (c) Peculiar Ventures, LLC.
       *
       * This source code is licensed under the MIT license found in the
       * LICENSE file in the root directory of this source tree.
       */var vt=function(e){var i=e.extension;return t(dt,{extension:i},i.value.map((function(i){var n,r;return[(n=i.distributionPoint)===null||n===void 0?void 0:n.fullName.map((function(i){return t($e,Object.assign({generalName:i},e))})),(r=i.cRLIssuer)===null||r===void 0?void 0:r.map((function(i){return t($e,Object.assign({generalName:i},e))}))]})))};
/**
       * @license
       * Copyright (c) Peculiar Ventures, LLC.
       *
       * This source code is licensed under the MIT license found in the
       * LICENSE file in the root directory of this source tree.
       */var mt=function(e){var i=e.extension;return t(dt,{extension:i},i.value.map((function(i,n){return[t(Ye,{name:"Description #".concat(n+1),value:""}),t(Ye,{name:"Method",value:Fe(i.accessMethod)}),t($e,Object.assign({generalName:i.accessLocation},e))]})))};
/**
       * @license
       * Copyright (c) Peculiar Ventures, LLC.
       *
       * This source code is licensed under the MIT license found in the
       * LICENSE file in the root directory of this source tree.
       */var xt=function(e){var i=e.extension;return t(dt,{extension:i},i.value.map((function(i){return t($e,Object.assign({generalName:i},e))})))};
/**
       * @license
       * Copyright (c) Peculiar Ventures, LLC.
       *
       * This source code is licensed under the MIT license found in the
       * LICENSE file in the root directory of this source tree.
       */var yt=function(e){var i=e.extension;return t(dt,{extension:i},i.value.map((function(e,i){var n;return[t(Ye,{name:"Policy #".concat(i+1),value:""}),t(Ye,{name:"ID",value:Fe(e.policyIdentifier)}),(n=e.policyQualifiers)===null||n===void 0?void 0:n.map((function(e,n){var r=[t(Ye,{name:"Qualifier #".concat(i+1,".").concat(n+1),value:""}),t(Ye,{name:"ID",value:Fe(e.policyQualifierId)})];if(e.policyQualifierId==="1.3.6.1.5.5.7.2.1"){var a=s.parse(e.qualifier,Q);r.push(t(Ye,{name:"Value",value:a.toString()}))}if(e.policyQualifierId==="1.3.6.1.5.5.7.2.2"){var a=s.parse(e.qualifier,X);if(a.explicitText){r.push(t(Ye,{name:"Value",value:a.explicitText.toString()}))}}return r}))]})))};
/**
       * @license
       * Copyright (c) Peculiar Ventures, LLC.
       *
       * This source code is licensed under the MIT license found in the
       * LICENSE file in the root directory of this source tree.
       */var wt={"9606c02c690033aa1d145f59c6e2648d0549f0df96aab8db915a70d8ecf390a5":"Akamai CT","39376f545f7b4607f59742d768cd5d2437bf3473b6534a4834bcf72e681c83c9":"Alpha CT",a577ac9ced7548dd8f025b67a241089df86e0f476ec203c2ecbedb185f282638:"CNNIC CT",cdb5179b7fc1c046feea31136a3f8f002e6182faf8896fecc8b2f5b5ab604900:"Certly.IO","1fbc36e002ede97f40199e86b3573b8a4217d80187746ad0da03a06054d20df4":"Cloudflare “Nimbus2017”",db74afeecb29ecb1feca3e716d2ce5b9aabb36f7847183c75d9d4f37b61fbf64:"Cloudflare “Nimbus2018”","747eda8331ad331091219cce254f4270c2bffd5e422008c6373579e6107bcc56":"Cloudflare “Nimbus2019”","5ea773f9df56c0e7b536487dd049e0327a919a0c84a112128418759681714558":"Cloudflare “Nimbus2020”","4494652eb0eeceafc44007d8a8fe28c0dae682bed8cb31b53fd33396b5b681a8":"Cloudflare “Nimbus2021”","41c8cab1df22464a10c6a13a0942875e4e318b1b03ebeb4bc768f090629606f6":"Cloudflare “Nimbus2022”","7a328c54d8b72db620ea38e0521ee98416703213854d3bd22bc13a57a352eb52":"Cloudflare “Nimbus2023”","6ff141b5647e4222f7ef052cefae7c21fd608e27d2af5a6e9f4b8a37d6633ee5":"DigiCert Nessie2018",fe446108b1d01ab78a62ccfeab6ab2b2babff3abdad80a4d8b30df2d0008830c:"DigiCert Nessie2019",c652a0ec48ceb3fcab170992c43a87413309e80065a26252401ba3362a17c565:"DigiCert Nessie2020",eec095ee8d72640f92e3c3b91bc712a3696a097b4b6a1a1438e647b2cbedc5f9:"DigiCert Nessie2021","51a3b0f5fd01799c566db837788f0ca47acc1b27cbf79e88429a0dfed48b05e5":"DigiCert Nessie2022",b3737707e18450f86386d605a9dc11094a792db1670c0b87dcf0030e7936a59a:"DigiCert Nessie2023","5614069a2fd7c2ecd3f5e1bd44b23ec74676b9bc99115cc0ef949855d689d0dd":"DigiCert Server","8775bfe7597cf88c43995fbdf36eff568d475636ff4ab560c1b4eaff5ea0830f":"DigiCert Server 2",c1164ae0a772d2d4392dc80ac10770d4f0c49bde991a4840c1fa075164f63360:"DigiCert Yeti2018",e2694bae26e8e94009e8861bb63b83d43ee7fe7488fba48f2893019dddf1dbfe:"DigiCert Yeti2019",f095a459f200d18240102d2f93888ead4bfe1d47e399e1d034a6b0a8aa8eb273:"DigiCert Yeti2020","5cdc4392fee6ab4544b15e9ad456e61037fbd5fa47dca17394b25ee6f6c70eca":"DigiCert Yeti2021","2245450759552456963fa12ff1f76d86e0232663adc04b7f5dc6835c6ee20f02":"DigiCert Yeti2022","35cf191bbfb16c57bf0fad4c6d42cbbbb627202651ea3fe12aefa803c33bd64c":"DigiCert Yeti2023","717ea7420975be84a2723553f1777c26dd51af4e102144094d9019b462fb6668":"GDCA 1","14308d90ccd030135005c01ca526d81e84e87624e39b6248e08f724aea3bb42a":"GDCA 2",c9cf890a21109c666cc17a3ed065c930d0e0135a9feba85af14210b8072421aa:"GDCA CT #1","924a30f909336ff435d6993a10ac75a2c641728e7fc2d659ae6188ffad40ce01":"GDCA CT #2",fad4c97cc49ee2f8ac85c5ea5cea09d0220dbbf4e49c6b50662ff868f86b8c28:"Google “Argon2017”",a4501269055a15545e6211ab37bc103f62ae5576a45e4b1714453e1b22106a25:"Google “Argon2018”","63f2dbcde83bcc2ccf0b728427576b33a48d61778fbd75a638b1c768544bd88d":"Google “Argon2019”",b21e05cc8ba2cd8a204e8766f92bb98a2520676bdafa70e7b249532def8b905e:"Google “Argon2020”",f65c942fd1773022145418083094568ee34d131933bfdf0c2f200bcc4ef164e3:"Google “Argon2021”","2979bef09e393921f056739f63a577e5be577d9c600af8f94d5d265c255dc784":"Google “Argon2022”","68f698f81f6482be3a8ceeb9281d4cfc71515d6793d444d10a67acbb4f4ffbc4":"Google “Aviator”",c3bf03a7e1ca8841c607bae3ff4270fca5ec45b186ebbe4e2cf3fc778630f5f6:"Google “Crucible”","1d024b8eb1498b344dfd87ea3efc0996f7506f235d1d497061a4773c439c25fb":"Google “Daedalus”","293c519654c83965baaa50fc5807d4b76fbf587a2972dca4c30cf4e54547f478":"Google “Icarus”",a4b90990b418581487bb13a2cc67700a3c359804f91bdfb8e377cd0ec80ddc10:"Google “Pilot”",ee4bbdb775ce60bae142691fabe19e66a30f7e5fb072d88300c47b897aa8fdcb:"Google “Rocketeer”",bbd9dfbc1f8a71b593942397aa927b473857950aab52e81a909664368e1ed185:"Google “Skydiver”","52eb4b225ec896974850675f23e43bc1d021e3214ce52ecd5fa87c203cdfca03":"Google “Solera2018”","0b760e9a8b9a682f88985b15e947501a56446bba8830785c3842994386450c00":"Google “Solera2019”","1fc72ce5a1b799f400c359bff96ca3913548e8644220610952e9ba1774f7bac7":"Google “Solera2020”",a3c99845e80ab7ce00157b3742df0207dd272b2b602ecf98ee2c12db9c5ae7e7:"Google “Solera2021”","697aafca1a6b536fae21205046debad7e0eaea13d2432e6e9d8fb379f2b9aaf3":"Google “Solera2022”",a899d8780c9290aaf462f31880ccfbd52451e970d0fbf591ef75b0d99b645681:"Google “Submariner”",b0cc83e5a5f97d6baf7c09cc284904872ac7e88b132c6350b7c6fd26e16c6c77:"Google “Testtube”",b10cd559a6d67846811f7df9a51532739ac48d703bea0323da5d38755bc0ad4e:"Google “Xenon2018”","084114980071532c16190460bcfc47fdc2653afa292c72b37ff863ae29ccc9f0":"Google “Xenon2019”","07b75c1be57d68fff1b0c61d2315c7bae6577c5794b76aeebc613a1a69d3a21c":"Google “Xenon2020”","7d3ef2f88fff88556824c2c0ca9e5289792bc50e78097f2e6a9768997e22f0d7":"Google “Xenon2021”","46a555eb75fa912030b5a28969f4f37d112c4174befd49b885abf2fc70fe6d47":"Google “Xenon2022”","7461b4a09cfb3d41d75159575b2e7649a445a8d27709b0cc564a6482b7eb41a3":"Izenpe","8941449c70742e06b9fc9ce7b116ba0024aa36d59af44f0204404f00f7ea8566":"Izenpe “Argi”","296afa2d568bca0d2ea844956ae9721fc35fa355ecda99693aafd458a71aefdd":"Let“s Encrypt ”Clicky”","537b69a3564335a9c04904e39593b2c298eb8d7a6e83023635c627248cd6b440":"Nordu “flimsy”",aae70b7f3cb8d566c86c2f16979c9f445f69ab0eb4535589b2f77a030104f3cd:"Nordu “plausible”",e0127629e90496564e3d0147984498aa48f8adb16600eb7902a1ef9909906273:"PuChuangSiDa CT",cf55e28923497c340d5206d05353aeb25834b52f1f8dc9526809f212efdd7ca6:"SHECA CT 1","32dc59c2d4c41968d56e14bc61ac8f0e45db39faf3c155aa4252f5001fa0c623":"SHECA CT 2",db76fdadac65e7d09508886e2159bd8b90352f5fead3e3dc5e22eb350acc7b98:"Sectigo (Comodo) “Dodo” CT","6f5376ac31f03119d89900a45115ff77151c11d902c10029068db2089a37d913":"Sectigo (Comodo) “Mammoth” CT","5581d4c2169036014aea0b9b573c53f0c0e43878702508172fa3aa1d0713d30c":"Sectigo (Comodo) “Sabre” CT","34bb6ad6c3df9c03eea8a499ff7891486c9d5e5cac92d01f7bfd1bce19db48ef":"StartCom",ddeb1d2b7a0d4fa6208b81ad8168707e2e8e9d01d55c888d3d11c4cdb6ecbecc:"Symantec",a7ce4a4e6207e0addee5fdaa4b1f86768767b5d002a55d47310e7e670a95eab2:"Symantec Deneb","15970488d7b997a05beb52512adee8d2e8b4a3165264121a9fabfbd5f85ad93f":"Symantec “Sirius”",bc78e1dfc5f63c684649334da10fa15f0979692009c081b4f3f6917f3ed9b8a5:"Symantec “Vega”",b0b784bc81c0ddc47544e883f05985bb9077d134d8ab88b2b2e533980b8e508b:"Up In The Air “Behind the Sofa”",ac3b9aed7fa9674757159e6d7d575672f9d98100941e9bdeffeca1313b75782d:"Venafi","03019df3fd85a69a8ebd1facc6da9ba73e469774fe77f579fc5a08b8328c1d6b":"Venafi Gen2 CT","41b2dc2e89e63ce4af1ba7bb29bf68c6dee6f9f1cc047e30dffae3b3ba259263":"WoSign","63d0006026dde10bb0601f452446965ee2b6ea2cd4fbc95ac866a550af9075b7":"WoSign 2","9e4ff73dc3ce220b69217c899e468076abf8d78636d5ccfc85a31a75628ba88b":"WoSign CT #1"};
/**
       * @license
       * Copyright (c) Peculiar Ventures, LLC.
       *
       * This source code is licensed under the MIT license found in the
       * LICENSE file in the root directory of this source tree.
       */var kt=function(e){var i=e.extension;return t(dt,{extension:i},i.value.toJSON().map((function(e,i){return[t(Ye,{name:"SCT #".concat(i+1),value:""}),t(Ye,{name:"Version",value:e.version+1}),t(Ye,{name:"Log Operator",value:wt[e.logId]||e.logId}),t(Ye,{name:"Log Key ID",value:e.logId,monospace:true}),t(Ye,{name:"Timestamp",value:He(e.timestamp)}),t(Ye,{name:"Signature Algorithm",value:"".concat(e.hashAlgorithm," ").concat(e.signatureAlgorithm).toUpperCase()}),t(Ye,{name:"Signature",value:e.signature,monospace:true})]})))};
/**
       * @license
       * Copyright (c) Peculiar Ventures, LLC.
       *
       * This source code is licensed under the MIT license found in the
       * LICENSE file in the root directory of this source tree.
       */var St=function(e){var i,n;var r=e.extension;return t(dt,{extension:r},(i=r.value.excludedSubtrees)===null||i===void 0?void 0:i.map((function(i){return t($e,Object.assign({generalName:i.base},e))})),(n=r.value.permittedSubtrees)===null||n===void 0?void 0:n.map((function(i){return t($e,Object.assign({generalName:i.base},e))})))};
/**
       * @license
       * Copyright (c) Peculiar Ventures, LLC.
       *
       * This source code is licensed under the MIT license found in the
       * LICENSE file in the root directory of this source tree.
       */var _t=function(e){var i=e.extension;return t(dt,{extension:i},t(Ye,{name:"Template ID",value:i.value.templateID}),t(Ye,{name:"Template Major Version",value:i.value.templateMajorVersion}),t(Ye,{name:"Template Minor Version",value:i.value.templateMinorVersion}))};
/**
       * @license
       * Copyright (c) Peculiar Ventures, LLC.
       *
       * This source code is licensed under the MIT license found in the
       * LICENSE file in the root directory of this source tree.
       */var It=function(e){var i=e.extension;return t(dt,{extension:i},t(Ye,{name:"Name",value:i.value.toString()}))};
/**
       * @license
       * Copyright (c) Peculiar Ventures, LLC.
       *
       * This source code is licensed under the MIT license found in the
       * LICENSE file in the root directory of this source tree.
       */var Ct=function(e){var i=e.extension;var n=i.value.getVersion();return t(dt,{extension:i},t(Ye,{name:"Certificate Index",value:n.certificateIndex}),t(Ye,{name:"Key Index",value:n.keyIndex}))};
/**
       * @license
       * Copyright (c) Peculiar Ventures, LLC.
       *
       * This source code is licensed under the MIT license found in the
       * LICENSE file in the root directory of this source tree.
       */var Dt=function(e){var i=e.extension;return t(dt,{extension:i},i.value.map((function(e,i){return[t(Ye,{name:"Statement #".concat(i+1),value:""}),t(Ye,{name:"ID",value:Fe(e.statementId)}),t(Ye,{name:"Info",value:e.statementInfo.byteLength?Te.Convert.ToHex(e.statementInfo):null,monospace:true})]})))};
/**
       * @license
       * Copyright (c) Peculiar Ventures, LLC.
       *
       * This source code is licensed under the MIT license found in the
       * LICENSE file in the root directory of this source tree.
       */var At=function(e){var i=e.extension;return t(dt,{extension:i},t(Ye,{name:"Comment",value:i.value.value}))};
/**
       * @license
       * Copyright (c) Peculiar Ventures, LLC.
       *
       * This source code is licensed under the MIT license found in the
       * LICENSE file in the root directory of this source tree.
       */var Lt=function(e){var i=e.extension;return t(dt,{extension:i},t(Ye,{name:"Type",value:i.value.toJSON().join(", ")}))};
/**
       * @license
       * Copyright (c) Peculiar Ventures, LLC.
       *
       * This source code is licensed under the MIT license found in the
       * LICENSE file in the root directory of this source tree.
       */var Nt=function(e){var i=e.extension;return t(dt,{extension:i},t(Ye,{name:"Role",value:i.value.text}))};
/**
       * @license
       * Copyright (c) Peculiar Ventures, LLC.
       *
       * This source code is licensed under the MIT license found in the
       * LICENSE file in the root directory of this source tree.
       */var jt=function(e){var i=e.extension,n=e.getLEILink;return t(dt,{extension:i},t(Ye,{name:"Identifier",value:i.value.text,href:n(i.value.text)}))};
/**
       * @license
       * Copyright (c) Peculiar Ventures, LLC.
       *
       * This source code is licensed under the MIT license found in the
       * LICENSE file in the root directory of this source tree.
       */var zt=function(e){var i=e.extension;return t(dt,{extension:i},t(Ye,{name:"Version",value:i.value.version}),t($e,Object.assign({generalName:i.value.location},e)),t(Ye,{name:"Requires Auth",value:i.value.requiresAuth?"YES":"NO"}))};
/**
       * @license
       * Copyright (c) Peculiar Ventures, LLC.
       *
       * This source code is licensed under the MIT license found in the
       * LICENSE file in the root directory of this source tree.
       */var Pt=function(e){var i=e.extension;return t(dt,{extension:i},t(Ye,{name:"Version",value:i.value.version}))};
/**
       * @license
       * Copyright (c) Peculiar Ventures, LLC.
       *
       * This source code is licensed under the MIT license found in the
       * LICENSE file in the root directory of this source tree.
       */var Tt=function(e){var i=e.extension;return t(dt,{extension:i},t(Ye,{name:"Reason",value:i.value.toJSON()}))};
/**
       * @license
       * Copyright (c) Peculiar Ventures, LLC.
       *
       * This source code is licensed under the MIT license found in the
       * LICENSE file in the root directory of this source tree.
       */function Et(e){return Te.Convert.ToString(e.values[0])}
/**
       * @license
       * Copyright (c) Peculiar Ventures, LLC.
       *
       * This source code is licensed under the MIT license found in the
       * LICENSE file in the root directory of this source tree.
       */var Kt=function(e){var i=e.extension;return t(dt,{extension:i},i.value.map((function(e,i){return[t(Ye,{name:"Attribute #".concat(i+1),value:""}),t(Ye,{name:"Type",value:Fe(e.type)}),t(Ye,{name:"Value",value:Et(e)})]})))};
/**
       * @license
       * Copyright (c) Peculiar Ventures, LLC.
       *
       * This source code is licensed under the MIT license found in the
       * LICENSE file in the root directory of this source tree.
       */var Ot=function(e){var i=e.extension;return t(dt,{extension:i},t(Ye,{name:"Value",value:i.value,monospace:true}))};
/**
       * @license
       * Copyright (c) Peculiar Ventures, LLC.
       *
       * This source code is licensed under the MIT license found in the
       * LICENSE file in the root directory of this source tree.
       */var Ht=function(e){var i=e.extension;return t(dt,{extension:i},t(Ye,{name:"Not Before",value:He(i.value.notBefore)}),t(Ye,{name:"Not After",value:He(i.value.notAfter)}))};
/**
       * @license
       * Copyright (c) Peculiar Ventures, LLC.
       *
       * This source code is licensed under the MIT license found in the
       * LICENSE file in the root directory of this source tree.
       */var Rt=function(e){var i=e.extension;return t(dt,{extension:i},t(Ye,{name:"Version",value:i.value.entrustVers}),t(Ye,{name:"Info Flags",value:i.value.entrustInfoFlags.toJSON().join(", ")}))};
/**
       * @license
       * Copyright (c) Peculiar Ventures, LLC.
       *
       * This source code is licensed under the MIT license found in the
       * LICENSE file in the root directory of this source tree.
       */var Vt=function(e){var i=e.extension;return t(dt,{extension:i},i.value.map((function(e,i){return[t(Ye,{name:"Biometric #".concat(i+1),value:""}),t(Ye,{name:"OID",value:Fe(e.typeOfBiometricData.biometricDataOid)}),t(Ye,{name:"Type",value:e.typeOfBiometricData.predefinedBiometricType}),t(Ye,{name:"Algorithm",value:Fe(e.hashAlgorithm.algorithm)}),t(Ye,{name:"Hash",value:Te.Convert.ToHex(e.biometricDataHash.buffer),monospace:true}),t(Ye,{name:"Source Uri",value:e.sourceDataUri})]})))};
/**
       * @license
       * Copyright (c) Peculiar Ventures, LLC.
       *
       * This source code is licensed under the MIT license found in the
       * LICENSE file in the root directory of this source tree.
       */var Bt=function(e){var i=e.extension;var n=function(e){if(!e){return null}return e.map((function(e){var i=e.imageDetails;return[t(Ye,{name:"Image Type",value:i.mediaType}),t(Ye,{name:"Image Hash",value:Te.Convert.ToHex(i.logotypeHash[0].hashValue),monospace:true}),t(Ye,{name:"Image URL",value:i.logotypeURI[0],monospace:true,collapse:true}),t(Ye,{name:"Image Hash Algorithm",value:Fe(i.logotypeHash[0].hashAlg.algorithm)})]}))};var r=function(e){if(!e){return null}return e.map((function(e){var i=e.audioDetails;return[t(Ye,{name:"Audio Type",value:i.mediaType}),t(Ye,{name:"Audio Hash",value:Te.Convert.ToHex(i.logotypeHash[0].hashValue),monospace:true}),t(Ye,{name:"Audio URL",value:i.logotypeURI[0],monospace:true,collapse:true}),t(Ye,{name:"Audio Hash Algorithm",value:Fe(i.logotypeHash[0].hashAlg.algorithm)})]}))};var a=function(e,i){if(!i||!i.direct){return null}var a=i.direct,o=a.image,c=a.audio;return[t(Ye,{name:"Type",value:e}),n(o),r(c),t("tr",null,t("td",null),t("td",null))]};return t(dt,{extension:i},a("Subject",i.value.subjectLogo),a("Issuer",i.value.issuerLogo))};
/**
       * @license
       * Copyright (c) Peculiar Ventures, LLC.
       *
       * This source code is licensed under the MIT license found in the
       * LICENSE file in the root directory of this source tree.
       */var Gt=function(e){var i=e.extension;return t(dt,{extension:i},i.value.map((function(e,i){return[t(Ye,{name:"Entry #".concat(i+1),value:""}),t(Ye,{name:"SPC",value:e.spc}),t(Ye,{name:"Range",value:e.range?"start=".concat(e.range.start," count==").concat(e.range.count):null}),t(Ye,{name:"One",value:e.one})]})))};
/**
       * @license
       * Copyright (c) Peculiar Ventures, LLC.
       *
       * This source code is licensed under the MIT license found in the
       * LICENSE file in the root directory of this source tree.
       */var qt=function(e){var i=e.extension;return t(dt,{extension:i},i.value.requireExplicitPolicy&&t(Ye,{name:"Require Explicit Policy",value:W.toASN(i.value.requireExplicitPolicy).valueBlock.toString()}),i.value.inhibitPolicyMapping&&t(Ye,{name:"Inhibit Policy Mapping",value:W.toASN(i.value.inhibitPolicyMapping).valueBlock.toString()}))};
/**
       * @license
       * Copyright (c) Peculiar Ventures, LLC.
       *
       * This source code is licensed under the MIT license found in the
       * LICENSE file in the root directory of this source tree.
       */var Ft=function(e){var i=e.extension;return t(dt,{extension:i},i.value.map((function(e,i){return[t(Ye,{name:"Policy #".concat(i+1),value:""}),t(Ye,{name:"Issuer Domain",value:Fe(e.issuerDomainPolicy)}),t(Ye,{name:"Subject Domain",value:Fe(e.subjectDomainPolicy)})]})))};
/**
       * @license
       * Copyright (c) Peculiar Ventures, LLC.
       *
       * This source code is licensed under the MIT license found in the
       * LICENSE file in the root directory of this source tree.
       */var Mt=function(e){var i=e.extensions,n=e.title;if(!i||!i.length){return null}return[t(Ue,{value:n||"Extensions"}),i.map((function(i){try{if(i.value instanceof Z){return t(ft,{extension:i})}if(i.value instanceof $){return t(pt,{extension:i})}if(i.value instanceof ee){return t(bt,{extension:i})}if(i.value instanceof te){return t(ht,Object.assign({extension:i},e))}if(i.value instanceof ie){return t(gt,Object.assign({extension:i},e))}if(i.value instanceof ne){return t(vt,Object.assign({extension:i},e))}if(i.value instanceof re||i.value instanceof ae){return t(mt,Object.assign({extension:i},e))}if(i.value instanceof oe){return t(xt,Object.assign({extension:i},e))}if(i.value instanceof ce){return t(yt,{extension:i})}if(i.value instanceof se){return t(kt,{extension:i})}if(i.value instanceof le){return t(St,Object.assign({extension:i},e))}if(i.value instanceof ue){return t(_t,{extension:i})}if(i.value instanceof de){return t(It,{extension:i})}if(i.value instanceof fe){return t(Ct,{extension:i})}if(i.value instanceof pe){return t(Dt,{extension:i})}if(i.value instanceof be){return t(At,{extension:i})}if(i.value instanceof he){return t(Lt,{extension:i})}if(i.value instanceof ge){return t(Nt,{extension:i})}if(i.value instanceof ve){return t(jt,Object.assign({extension:i},e))}if(i.value instanceof me){return t(zt,Object.assign({extension:i},e))}if(i.value instanceof xe){return t(Pt,{extension:i})}if(i.value instanceof ye){return t(Tt,{extension:i})}if(i.value instanceof we){return t(Kt,{extension:i})}if(i.value instanceof ke){return t(Ht,{extension:i})}if(i.value instanceof Se){return t(Rt,{extension:i})}if(i.value instanceof _e){return t(Vt,{extension:i})}if(i.value instanceof Ie){return t(Bt,{extension:i})}if(i.value instanceof Ce){return t(Gt,{extension:i})}if(i.value instanceof De){return t(qt,{extension:i})}if(i.value instanceof Ae){return t(Ft,{extension:i})}if(typeof i.value==="string"){return t(Ot,{extension:i})}return t(dt,{extension:i})}catch(e){console.error("Error render extension:",i.asn.extnID);return null}}))]};
/**
       * @license
       * Copyright (c) Peculiar Ventures, LLC.
       *
       * This source code is licensed under the MIT license found in the
       * LICENSE file in the root directory of this source tree.
       */var Ut=function(e){var i=e.serialNumber,n=e.version,r=e.validity,a=e.notBefore,o=e.notAfter,c=e.type;return[t(Ue,{value:Oe.getString("basicInformation")}),t(Ye,{name:Oe.getString("type"),value:c}),t(Ye,{name:Oe.getString("serialNumber"),value:i,monospace:true}),t(Ye,{name:Oe.getString("version"),value:n}),t(Ye,{name:Oe.getString("validity"),value:r}),t(Ye,{name:Oe.getString("issued"),value:a?He(a):undefined}),t(Ye,{name:Oe.getString("expired"),value:o?He(o):undefined})]};
/**
       * @license
       * Copyright (c) Peculiar Ventures, LLC.
       *
       * This source code is licensed under the MIT license found in the
       * LICENSE file in the root directory of this source tree.
       */function Yt(e){if(e instanceof qe){Ee.pkcs10.asPEM(e.exportAsPemFormatted(),e.commonName)}else{Ee.x509.asPEM(e.exportAsPemFormatted(),e.commonName)}}function Qt(e){if(e instanceof qe){Ee.pkcs10.asDER(e.exportAsHexFormatted(),e.commonName)}else{Ee.x509.asDER(e.exportAsHexFormatted(),e.commonName)}}var Xt=function(e){var i=e.certificate;return[t(Ue,{value:Oe.getString("miscellaneous")}),t("tr",null,t("td",{class:"vertical_align_middle"},t("peculiar-typography",{color:"grey_5"},Oe.getString("download"),":")),t("td",null,t("peculiar-button-split",{onClick:Yt.bind(undefined,i),actions:[{text:Oe.getString("download.der"),onClick:Qt.bind(undefined,i)}]},Oe.getString("download.pem"))))]};
/**
       * @license
       * Copyright (c) Peculiar Ventures, LLC.
       *
       * This source code is licensed under the MIT license found in the
       * LICENSE file in the root directory of this source tree.
       */var Jt=function(e){return"https://search.gleif.org/#/record/".concat(e)};var Wt=function(e){return"https://search.censys.io/search?resource=hosts&q=dns.names%3A".concat(e)};var Zt=function(e){return"https://search.censys.io/search?resource=hosts&q=ip%3A".concat(e)};
/**
       * @license
       * Copyright (c) Peculiar Ventures, LLC.
       *
       * This source code is licensed under the MIT license found in the
       * LICENSE file in the root directory of this source tree.
       */var $t=function(e){var i=e.issuer;if(!i){return null}return[t(Ue,{value:Oe.getString("issuer")}),i.map((function(e){return t($e,{generalName:e,getDNSNameLink:function(){return""},getIPAddressLink:function(){return""}})}))]};
/**
       * @license
       * Copyright (c) Peculiar Ventures, LLC.
       *
       * This source code is licensed under the MIT license found in the
       * LICENSE file in the root directory of this source tree.
       */var ei=function(e){var i=e.holder;if(!i){return null}var n=i.baseCertificateID,r=i.objectDigestInfo;return[t(Ue,{value:Oe.getString("holder")}),n&&[n.issuer.map((function(e){return t($e,{generalName:e,getDNSNameLink:function(){return""},getIPAddressLink:function(){return""}})})),t("tr",null,t("td",null),t("td",null)),t(Ye,{name:Oe.getString("serialNumber"),value:Te.Convert.ToHex(n.serial),monospace:true}),t("tr",null,t("td",null),t("td",null))],r&&[t(Ye,{name:Oe.getString("digestInfo"),value:""}),t(Ye,{name:Oe.getString("algorithm"),value:Fe(r.digestAlgorithm.algorithm)}),t(Ye,{name:Oe.getString("value"),value:Te.Convert.ToHex(r.objectDigest),monospace:true}),t(Ye,{name:Oe.getString("type"),value:r.digestedObjectType})]]};var ti=":host{-webkit-box-sizing:border-box;box-sizing:border-box}:host *,:host *:before,:host *:after{-webkit-box-sizing:inherit;box-sizing:inherit}:host{display:block;width:100%;word-wrap:break-word;position:relative;min-width:280px;min-height:300px;background:white;background:rgba(var(--pv-color-light-rgb), 1)}th,td{border:none}table{width:100%;margin-bottom:30px;border-spacing:0;border-collapse:collapse}table .title td{border-color:rgba(209, 213, 217, 0.5);border-color:rgba(var(--pv-color-grey_3-rgb), 0.5);padding-top:60px;padding-bottom:15px;border-bottom-width:1px;border-bottom-style:solid}table td:first-child{padding-left:30px;width:130px;padding-right:10px}table td:last-child{padding-right:30px;width:calc(100% - 130px)}table td{vertical-align:top;padding-top:5px;padding-bottom:5px}table td.vertical_align_middle{vertical-align:middle}table .title:first-child td{padding-top:15px}table .title+tr td{padding-top:15px}table td.monospace{max-width:0}table .divider{padding-top:15px;padding-bottom:15px}.divider .bg_fill{background-color:rgba(209, 213, 217, 0.5);background-color:rgba(var(--pv-color-grey_3-rgb), 0.5)}table tr:last-child .divider{padding-top:0;opacity:0}.divider span{display:block;height:1px}.status_wrapper{min-height:inherit;display:-ms-flexbox;display:flex;-ms-flex-pack:center;justify-content:center;-ms-flex-align:center;align-items:center}.interaction_text{padding:15px 0;width:300px;margin:auto;text-align:center}@media (max-width: 900px){table,tr,td{display:block}table td:last-child,table td:first-child{padding-right:15px;padding-left:15px;width:100%}table .title+tr td{padding-top:5px}table .title+tr td:first-child{padding-top:15px}table td.monospace{width:100%;max-width:none}}:host([data-view=mobile]) table,:host([data-view=mobile]) tr,:host([data-view=mobile]) td{display:block}:host([data-view=mobile]) table td:last-child,:host([data-view=mobile]) table td:first-child{padding-right:15px;padding-left:15px;width:100%}:host([data-view=mobile]) table .title+tr td{padding-top:5px}:host([data-view=mobile]) table .title+tr td:first-child{padding-top:15px}:host([data-view=mobile]) table td.monospace{width:100%;max-width:none}";var ii=e("peculiar_attribute_certificate_viewer",function(){function e(e){var t=this;i(this,e);this.isDecodeInProcess=true;this.getAuthKeyIdParentLink=function(e){var i;return(i=t.authKeyIdParentLink)===null||i===void 0?void 0:i.replace("{{authKeyId}}",e)};this.getAuthKeyIdSiblingsLink=function(e){var i;return(i=t.authKeyIdSiblingsLink)===null||i===void 0?void 0:i.replace("{{authKeyId}}",e)};this.getSubjectKeyIdChildrenLink=function(e){var i;return(i=t.subjectKeyIdChildrenLink)===null||i===void 0?void 0:i.replace("{{subjectKeyId}}",e)};this.getSubjectKeyIdSiblingsLink=function(e){var i;return(i=t.subjectKeyIdSiblingsLink)===null||i===void 0?void 0:i.replace("{{subjectKeyId}}",e)}}e.prototype.componentWillLoad=function(){this.decodeCertificate(this.certificate)};e.prototype.decodeCertificate=function(e){return __awaiter(this,void 0,void 0,(function(){var t;return __generator(this,(function(i){switch(i.label){case 0:this.isDecodeInProcess=true;i.label=1;case 1:i.trys.push([1,4,,5]);if(e instanceof Ge){this.certificateDecoded=e}else if(typeof e==="string"){this.certificateDecoded=new Ge(e)}else{return[2]}this.certificateDecoded.parseExtensions();this.certificateDecoded.parseAttributes();return[4,this.certificateDecoded.getThumbprint("SHA-1")];case 2:i.sent();return[4,this.certificateDecoded.getThumbprint("SHA-256")];case 3:i.sent();return[3,5];case 4:t=i.sent();this.certificateDecodeError=t;console.error("Error certificate parse:",t);return[3,5];case 5:this.isDecodeInProcess=false;return[2]}}))}))};e.prototype.watchCertificateAndDecode=function(e,t){if(typeof e==="string"&&typeof t==="string"){if(e!==t){this.decodeCertificate(e)}return}if(e instanceof Ge&&t instanceof Ge){if(e.serialNumber!==t.serialNumber){this.decodeCertificate(e)}}};e.prototype.renderErrorState=function(){return t("div",{class:"status_wrapper"},t("peculiar-typography",{type:"b1",class:"interaction_text"},"There was an error decoding this attribute certificate."))};e.prototype.renderEmptyState=function(){return t("div",{class:"status_wrapper"},t("peculiar-typography",{type:"b1",class:"interaction_text"},"There is no attribute certificate available."))};e.prototype.render=function(){if(this.certificateDecodeError){return this.renderErrorState()}if(!this.certificateDecoded){return this.renderEmptyState()}return t(n,null,t("table",null,t(Ut,Object.assign({},this.certificateDecoded)),t($t,{issuer:this.certificateDecoded.issuer}),t(ei,{holder:this.certificateDecoded.holder}),t(Qe,{signature:this.certificateDecoded.signature}),t(ut,{thumbprints:this.certificateDecoded.thumbprints}),t(lt,{attributes:this.certificateDecoded.attributes,getLEILink:Jt,getDNSNameLink:Wt,getIPAddressLink:Zt,getAuthKeyIdParentLink:this.getAuthKeyIdParentLink,getAuthKeyIdSiblingsLink:this.getAuthKeyIdSiblingsLink,getSubjectKeyIdChildrenLink:this.getSubjectKeyIdChildrenLink,getSubjectKeyIdSiblingsLink:this.getSubjectKeyIdSiblingsLink}),t(Mt,{extensions:this.certificateDecoded.extensions,getLEILink:Jt,getDNSNameLink:Wt,getIPAddressLink:Zt,getAuthKeyIdParentLink:this.getAuthKeyIdParentLink,getAuthKeyIdSiblingsLink:this.getAuthKeyIdSiblingsLink,getSubjectKeyIdChildrenLink:this.getSubjectKeyIdChildrenLink,getSubjectKeyIdSiblingsLink:this.getSubjectKeyIdSiblingsLink}),this.download&&t(Xt,{certificate:this.certificateDecoded})))};Object.defineProperty(e,"watchers",{get:function(){return{certificate:["watchCertificateAndDecode"]}},enumerable:false,configurable:true});return e}());ii.style=ti;var ni=':host{-webkit-box-sizing:border-box;box-sizing:border-box}:host *,:host *:before,:host *:after{-webkit-box-sizing:inherit;box-sizing:inherit}:host{display:inline-block;width:auto;cursor:pointer;position:relative;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility;-ms-touch-action:manipulation;touch-action:manipulation;-webkit-user-drag:none;-ms-content-zooming:none;word-wrap:break-word;-webkit-text-size-adjust:none;-moz-text-size-adjust:none;-ms-text-size-adjust:none;text-size-adjust:none;--pv-button-padding-end:5px;--pv-button-padding-start:5px}.button{font-family:"Open Sans", "Arial", sans-serif;font-family:var(--pv-font-family);font-size:13px;font-size:var(--pv-font-size-b3);letter-spacing:0.03em;letter-spacing:var(--pv-letter-spacing-normal);display:-ms-inline-flexbox;display:inline-flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;width:100%;border-style:solid;border-width:1px;font-weight:400;text-decoration:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;white-space:nowrap;vertical-align:middle;cursor:inherit;height:30px;line-height:30px;border-radius:2px;padding:0 5px;padding:0 var(--pv-button-padding-end) 0 var(--pv-button-padding-start)}.button::-moz-focus-inner{border:0}.button:focus{outline:none;-webkit-box-shadow:0 4px 10px 0 rgba(var(--pv-color-dark-rgb), 0.1);box-shadow:0 4px 10px 0 rgba(var(--pv-color-dark-rgb), 0.1)}.button[disabled]{opacity:0.5;cursor:not-allowed}.button_stroke{border-color:rgba(53, 132, 247, 0.3);border-color:rgba(var(--pv-color-primary-rgb), 0.3);color:#3584f7;color:rgba(var(--pv-color-primary-rgb), 1);background-color:transparent}.button_fill{border-color:#3584f7;border-color:rgba(var(--pv-color-primary-rgb), 1);background-color:#3584f7;background-color:rgba(var(--pv-color-primary-rgb), 1);color:white;color:rgba(var(--pv-color-light-rgb), 1)}.button_label{-webkit-transition:opacity 200ms;transition:opacity 200ms}.button:hover .button_label{opacity:0.7}';var ri=e("peculiar_button",function(){function e(e){var t=this;i(this,e);this.fill="stroke";this.handleClick=function(e){if(t.disabled){e.preventDefault();e.stopPropagation();return}if(t.onClick){t.onClick(e)}}}e.prototype.render=function(){var e=!!this.href;var i=e?"a":"button";return t(i,{class:{button:true,button_stroke:this.fill==="stroke",button_fill:this.fill==="fill",button_disabled:this.disabled},disabled:this.disabled,type:!e&&"button",href:e&&this.href,target:e&&this.target?this.target:null,rel:e&&"noreferrer noopener",onClick:this.handleClick,part:"base"},t("span",{part:"label",class:"button_label"},t("slot",null)))};return e}());ri.style=ni;var ai=':host{-webkit-box-sizing:border-box;box-sizing:border-box}:host *,:host *:before,:host *:after{-webkit-box-sizing:inherit;box-sizing:inherit}:host{display:inline-block;vertical-align:top;position:relative;white-space:nowrap;font-size:0}.button_split_icon{width:7px;height:5px;display:inline-block;vertical-align:middle}.button_split_with_icon{width:25px;border-bottom-left-radius:0;border-top-left-radius:0}.button_split_with_icon.m_open::part(base):before{position:fixed;width:100%;height:100%;top:0;left:0;content:""}.button_split_action{width:100%}.button_split_container{position:absolute;bottom:calc(100% + 1px);left:0;width:100%;border-radius:2px;-webkit-box-shadow:0px -2px 1px rgb(var(--pv-color-light-rgb)), 0px 0px 10px rgba(var(--pv-color-dark-rgb), 0.0241168);box-shadow:0px -2px 1px rgb(var(--pv-color-light-rgb)), 0px 0px 10px rgba(var(--pv-color-dark-rgb), 0.0241168);z-index:1}.button_split>peculiar-button:first-of-type::part(base){border-top-right-radius:0;border-bottom-right-radius:0}.button_split>peculiar-button:last-of-type::part(base){border-top-left-radius:0;border-bottom-left-radius:0}.button_split>peculiar-button:not(:first-child){margin-left:-1px}';var oi=e("peculiar_button_split",function(){function e(e){var t=this;i(this,e);this.fill="stroke";this.actions=[];this.open=false;this.onClickSplitButton=function(e){e.stopPropagation();t.open=!t.open}}e.prototype.onClickActiveButton=function(e,t){this.open=false;e(t)};e.prototype.renderActiveSplitState=function(){var e=this;if(!this.open){return null}return t("div",{class:"button_split_container"},this.actions.map((function(i){return t("peculiar-button",{fill:"fill",class:"button_split_action",onClick:e.onClickActiveButton.bind(e,i.onClick)},i.text)})))};e.prototype.render=function(){return t("div",{class:{button_split:true}},t("peculiar-button",{fill:this.fill,onClick:this.onClick},t("slot",null)),t("peculiar-button",{fill:this.fill,onClick:this.onClickSplitButton,class:{button_split_with_icon:true,m_open:this.open}},t("svg",{viewBox:"0 0 7 5",xmlns:"http://www.w3.org/2000/svg",class:"button_split_icon"},t("path",{fill:"currentColor","fill-rule":"evenodd","clip-rule":"evenodd",d:"M5.459.124c.934.001 1.442.994.84 1.644L4.425 3.794c-.44.475-1.244.475-1.684 0L.862 1.764C.26 1.115.77.12 1.705.122l3.754.003z"}))),this.renderActiveSplitState())};return e}());oi.style=ai;var ci=":host{-webkit-box-sizing:border-box;box-sizing:border-box}:host *,:host *:before,:host *:after{-webkit-box-sizing:inherit;box-sizing:inherit}:host{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility;-ms-touch-action:manipulation;touch-action:manipulation;-webkit-user-drag:none;-ms-content-zooming:none;word-wrap:break-word;-webkit-text-size-adjust:none;-moz-text-size-adjust:none;-ms-text-size-adjust:none;text-size-adjust:none;display:block;width:100%;font-size:0}.textarea{min-height:300px;width:100%;border-radius:3px;border-width:1px;border-style:solid;padding:14px;font-family:monospace;resize:vertical;background-color:white;background-color:rgba(var(--pv-color-light-rgb), 1);border-color:#d1d5d9;border-color:rgba(var(--pv-color-grey_3-rgb), 1);color:#2a3134;color:rgba(var(--pv-color-dark-rgb), 1);letter-spacing:0.03em;letter-spacing:var(--pv-letter-spacing-normal);font-size:14px;font-size:var(--pv-font-size-h7)}.controls{margin-top:10px}.button{position:relative}.button:not(:first-child){margin-left:10px}.viewer{margin-top:64px}.input_file{opacity:0;width:100%;height:100%;top:0;left:0;display:block;position:absolute}";var si=e("peculiar_certificate_decoder",function(){function e(e){var t=this;i(this,e);this.onClickDecode=function(){var e=t.inputPaste.value;if(e){t.decode(e)}};this.onClickExample=function(){t.decode(t.certificateExample)};this.onClickClear=function(){t.clearValue()};this.onChangeInputFile=function(e){return __awaiter(t,void 0,void 0,(function(){var t,i;return __generator(this,(function(n){switch(n.label){case 0:t=e.target;if(!t.files)return[3,2];return[4,Ve(t.files[0])];case 1:i=n.sent();if(typeof i.value==="string"){this.decode(i.value)}t.value="";n.label=2;case 2:return[2]}}))}))};this.onDropFile=function(e){return __awaiter(t,void 0,void 0,(function(){var t,i;return __generator(this,(function(n){switch(n.label){case 0:e.stopPropagation();e.preventDefault();t=e.dataTransfer;if(!t.files)return[3,2];return[4,Ve(t.files[0])];case 1:i=n.sent();if(typeof i.value==="string"){this.decode(i.value)}n.label=2;case 2:return[2]}}))}))}}e.prototype.componentDidLoad=function(){var e=this;var t=Re.parseHash(window.location.search);if(t.cert){setTimeout((function(){return e.decode(t.cert)}),100)}};e.prototype.clearValue=function(){this.inputPaste.value="";this.certificateDecoded=null;Re.replace({search:""})};e.prototype.setValue=function(e){this.certificateDecoded=e;this.inputPaste.value=e.exportAsPemFormatted();Re.replace({search:Re.queryStringify({cert:e.exportAsBase64()})})};e.prototype.decode=function(e){var t=Le(e);var i=Ne(e);var n=je(e);var r=ze(e);var a;var o;if(t&&!(i||r||n)){this.clearValue();alert("Unsupported file type. Please try to use Certificate/AttributeCertificate/CertificateRequest.");return}try{if(i){a=new Pe(e)}if(r){a=new Ge(e)}if(n){a=new qe(e)}}catch(e){o=e}if(!a){try{a=new Pe(e)}catch(e){o=e}}if(!a){try{a=new Ge(e)}catch(e){o=e}}if(!a){try{a=new qe(e)}catch(e){o=e}}if(!a){this.clearValue();console.log(o);alert("Error decoding file. Please try to use Certificate/AttributeCertificate/CertificateRequest.")}else{this.setValue(a)}};e.prototype.render=function(){var e=this;return t(n,null,t("textarea",{placeholder:"Certificate DER or PEM",class:"textarea",ref:function(t){e.inputPaste=t},onDrop:this.onDropFile}),t("div",{class:"controls"},t("peculiar-button",{fill:"fill",class:"button",onClick:this.onClickDecode},"Decode"),t("peculiar-button",{class:"button"},"Choose file",t("input",{type:"file",class:"input_file",accept:"application/pkix-cert,application/x-x509-ca-cert,application/x-x509-user-cert,application/pkcs10,.csr,.req",onChange:this.onChangeInputFile,value:""})),t("peculiar-button",{class:"button",onClick:this.onClickClear},"Clear"),this.certificateExample&&t("peculiar-button",{class:"button",onClick:this.onClickExample},"Example")),this.certificateDecoded instanceof Pe&&t("peculiar-certificate-viewer",{certificate:this.certificateDecoded,class:"viewer",download:true}),this.certificateDecoded instanceof Ge&&t("peculiar-attribute-certificate-viewer",{certificate:this.certificateDecoded,class:"viewer",download:true}),this.certificateDecoded instanceof qe&&t("peculiar-csr-viewer",{certificate:this.certificateDecoded,class:"viewer",download:true}))};return e}());si.style=ci;
/**
       * @license
       * Copyright (c) Peculiar Ventures, LLC.
       *
       * This source code is licensed under the MIT license found in the
       * LICENSE file in the root directory of this source tree.
       */function li(e){var t;if((t=e.params)===null||t===void 0?void 0:t["modulus"]){var i=e.params["modulus"].byteLength;if(i%2){i-=1}return i*8}return null}function ui(e){var t;if((t=e.params)===null||t===void 0?void 0:t["publicExponent"]){return e.params["publicExponent"].byteLength===3?65537:3}return null}var di=function(e){var i;var n=e.publicKey;if(!n){return null}return[t(Ue,{value:Oe.getString("publicKeyInfo")}),t(Ye,{name:Oe.getString("algorithm"),value:Fe(n.algorithm)}),t(Ye,{name:Oe.getString("namedCurve"),value:Fe((i=n.params)===null||i===void 0?void 0:i["namedCurve"])}),t(Ye,{name:Oe.getString("exponent"),value:ui(n)}),t(Ye,{name:Oe.getString("modulus"),value:li(n)}),t(Ye,{name:Oe.getString("value"),value:Te.Convert.ToHex(n.value),monospace:true,collapse:true})]};
/**
       * @license
       * Copyright (c) Peculiar Ventures, LLC.
       *
       * This source code is licensed under the MIT license found in the
       * LICENSE file in the root directory of this source tree.
       */var fi=function(e){var i=e.name;return[t(Ue,{value:Oe.getString("subjectName")}),i.map((function(e){return t(Ye,{name:e.name||e.type,value:e.value})}))]};
/**
       * @license
       * Copyright (c) Peculiar Ventures, LLC.
       *
       * This source code is licensed under the MIT license found in the
       * LICENSE file in the root directory of this source tree.
       */var pi=function(e){var i=e.name,n=e.issuerDnLink;var r=Oe.getString("issuerName");return[t(Ue,{value:n?t("peculiar-link",{href:n,type:"h6"},r):r}),i.map((function(e){return t(Ye,{name:e.name||e.type,value:e.value})}))]};var bi=":host{-webkit-box-sizing:border-box;box-sizing:border-box}:host *,:host *:before,:host *:after{-webkit-box-sizing:inherit;box-sizing:inherit}:host{display:block;width:100%;word-wrap:break-word;position:relative;min-width:280px;min-height:300px;background:white;background:rgba(var(--pv-color-light-rgb), 1)}th,td{border:none}table{width:100%;margin-bottom:30px;border-spacing:0;border-collapse:collapse}table .title td{border-color:rgba(209, 213, 217, 0.5);border-color:rgba(var(--pv-color-grey_3-rgb), 0.5);padding-top:60px;padding-bottom:15px;border-bottom-width:1px;border-bottom-style:solid}table td:first-child{padding-left:30px;width:130px;padding-right:10px}table td:last-child{padding-right:30px;width:calc(100% - 130px)}table td{vertical-align:top;padding-top:5px;padding-bottom:5px}table td.vertical_align_middle{vertical-align:middle}table .title:first-child td{padding-top:15px}table .title+tr td{padding-top:15px}table td.monospace{max-width:0}table .divider{padding-top:15px;padding-bottom:15px}.divider .bg_fill{background-color:rgba(209, 213, 217, 0.5);background-color:rgba(var(--pv-color-grey_3-rgb), 0.5)}table tr:last-child .divider{padding-top:0;opacity:0}.divider span{display:block;height:1px}.status_wrapper{min-height:inherit;display:-ms-flexbox;display:flex;-ms-flex-pack:center;justify-content:center;-ms-flex-align:center;align-items:center}.interaction_text{padding:15px 0;width:300px;margin:auto;text-align:center}@media (max-width: 900px){table,tr,td{display:block}table td:last-child,table td:first-child{padding-right:15px;padding-left:15px;width:100%}table .title+tr td{padding-top:5px}table .title+tr td:first-child{padding-top:15px}table td.monospace{width:100%;max-width:none}}:host([data-view=mobile]) table,:host([data-view=mobile]) tr,:host([data-view=mobile]) td{display:block}:host([data-view=mobile]) table td:last-child,:host([data-view=mobile]) table td:first-child{padding-right:15px;padding-left:15px;width:100%}:host([data-view=mobile]) table .title+tr td{padding-top:5px}:host([data-view=mobile]) table .title+tr td:first-child{padding-top:15px}:host([data-view=mobile]) table td.monospace{width:100%;max-width:none}";var hi=e("peculiar_certificate_viewer",function(){function e(e){var t=this;i(this,e);this.isDecodeInProcess=true;this.getAuthKeyIdParentLink=function(e){var i;return(i=t.authKeyIdParentLink)===null||i===void 0?void 0:i.replace("{{authKeyId}}",e)};this.getAuthKeyIdSiblingsLink=function(e){var i;return(i=t.authKeyIdSiblingsLink)===null||i===void 0?void 0:i.replace("{{authKeyId}}",e)};this.getSubjectKeyIdChildrenLink=function(e){var i;return(i=t.subjectKeyIdChildrenLink)===null||i===void 0?void 0:i.replace("{{subjectKeyId}}",e)};this.getSubjectKeyIdSiblingsLink=function(e){var i;return(i=t.subjectKeyIdSiblingsLink)===null||i===void 0?void 0:i.replace("{{subjectKeyId}}",e)}}e.prototype.componentWillLoad=function(){this.decodeCertificate(this.certificate)};e.prototype.decodeCertificate=function(e){return __awaiter(this,void 0,void 0,(function(){var t;return __generator(this,(function(i){switch(i.label){case 0:this.isDecodeInProcess=true;i.label=1;case 1:i.trys.push([1,4,,5]);if(e instanceof Pe){this.certificateDecoded=e}else if(typeof e==="string"){this.certificateDecoded=new Pe(e)}else{return[2]}this.certificateDecoded.parseExtensions();return[4,this.certificateDecoded.getThumbprint("SHA-1")];case 2:i.sent();return[4,this.certificateDecoded.getThumbprint("SHA-256")];case 3:i.sent();return[3,5];case 4:t=i.sent();this.certificateDecodeError=t;console.error("Error certificate parse:",t);return[3,5];case 5:this.isDecodeInProcess=false;return[2]}}))}))};e.prototype.watchCertificateAndDecode=function(e,t){if(typeof e==="string"&&typeof t==="string"){if(e!==t){this.decodeCertificate(e)}return}if(e instanceof Pe&&t instanceof Pe){if(e.serialNumber!==t.serialNumber){this.decodeCertificate(e)}}};e.prototype.getIssuerDnLink=function(){return this.issuerDnLink};e.prototype.renderErrorState=function(){return t("div",{class:"status_wrapper"},t("peculiar-typography",{type:"b1",class:"interaction_text"},"There was an error decoding this certificate."))};e.prototype.renderEmptyState=function(){return t("div",{class:"status_wrapper"},t("peculiar-typography",{type:"b1",class:"interaction_text"},"There is no certificate available."))};e.prototype.render=function(){if(this.certificateDecodeError){return this.renderErrorState()}if(!this.certificateDecoded){return this.renderEmptyState()}return t(n,{"data-view":this.view},t("table",null,t(Ut,Object.assign({},this.certificateDecoded)),t(fi,{name:this.certificateDecoded.subject}),t(pi,{name:this.certificateDecoded.issuer,issuerDnLink:this.getIssuerDnLink()}),t(di,{publicKey:this.certificateDecoded.publicKey}),t(Qe,{signature:this.certificateDecoded.signature}),t(ut,{thumbprints:this.certificateDecoded.thumbprints}),t(Mt,{extensions:this.certificateDecoded.extensions,getLEILink:Jt,getDNSNameLink:Wt,getIPAddressLink:Zt,getAuthKeyIdParentLink:this.getAuthKeyIdParentLink,getAuthKeyIdSiblingsLink:this.getAuthKeyIdSiblingsLink,getSubjectKeyIdChildrenLink:this.getSubjectKeyIdChildrenLink,getSubjectKeyIdSiblingsLink:this.getSubjectKeyIdSiblingsLink}),this.download&&t(Xt,{certificate:this.certificateDecoded})))};Object.defineProperty(e,"watchers",{get:function(){return{certificate:["watchCertificateAndDecode"]}},enumerable:false,configurable:true});return e}());hi.style=bi;var gi=":host{-webkit-box-sizing:border-box;box-sizing:border-box}:host *,:host *:before,:host *:after{-webkit-box-sizing:inherit;box-sizing:inherit}:host{display:block;width:100%;word-wrap:break-word;position:relative;min-width:280px;min-height:300px;background:white;background:rgba(var(--pv-color-light-rgb), 1)}th,td{border:none}table{width:100%;margin-bottom:30px;border-spacing:0;border-collapse:collapse}table .title td{border-color:rgba(209, 213, 217, 0.5);border-color:rgba(var(--pv-color-grey_3-rgb), 0.5);padding-top:60px;padding-bottom:15px;border-bottom-width:1px;border-bottom-style:solid}table td:first-child{padding-left:30px;width:130px;padding-right:10px}table td:last-child{padding-right:30px;width:calc(100% - 130px)}table td{vertical-align:top;padding-top:5px;padding-bottom:5px}table td.vertical_align_middle{vertical-align:middle}table .title:first-child td{padding-top:15px}table .title+tr td{padding-top:15px}table td.monospace{max-width:0}table .divider{padding-top:15px;padding-bottom:15px}.divider .bg_fill{background-color:rgba(209, 213, 217, 0.5);background-color:rgba(var(--pv-color-grey_3-rgb), 0.5)}table tr:last-child .divider{padding-top:0;opacity:0}.divider span{display:block;height:1px}.status_wrapper{min-height:inherit;display:-ms-flexbox;display:flex;-ms-flex-pack:center;justify-content:center;-ms-flex-align:center;align-items:center}.interaction_text{padding:15px 0;width:300px;margin:auto;text-align:center}@media (max-width: 900px){table,tr,td{display:block}table td:last-child,table td:first-child{padding-right:15px;padding-left:15px;width:100%}table .title+tr td{padding-top:5px}table .title+tr td:first-child{padding-top:15px}table td.monospace{width:100%;max-width:none}}:host([data-view=mobile]) table,:host([data-view=mobile]) tr,:host([data-view=mobile]) td{display:block}:host([data-view=mobile]) table td:last-child,:host([data-view=mobile]) table td:first-child{padding-right:15px;padding-left:15px;width:100%}:host([data-view=mobile]) table .title+tr td{padding-top:5px}:host([data-view=mobile]) table .title+tr td:first-child{padding-top:15px}:host([data-view=mobile]) table td.monospace{width:100%;max-width:none}";var vi=e("peculiar_csr_viewer",function(){function e(e){var t=this;i(this,e);this.isDecodeInProcess=true;this.getAuthKeyIdParentLink=function(e){return e};this.getAuthKeyIdSiblingsLink=function(e){return e};this.getSubjectKeyIdChildrenLink=function(e){var i;return(i=t.subjectKeyIdChildrenLink)===null||i===void 0?void 0:i.replace("{{subjectKeyId}}",e)};this.getSubjectKeyIdSiblingsLink=function(e){var i;return(i=t.subjectKeyIdSiblingsLink)===null||i===void 0?void 0:i.replace("{{subjectKeyId}}",e)}}e.prototype.componentWillLoad=function(){this.decodeCertificate(this.certificate)};e.prototype.decodeCertificate=function(e){return __awaiter(this,void 0,void 0,(function(){var t;return __generator(this,(function(i){switch(i.label){case 0:this.isDecodeInProcess=true;i.label=1;case 1:i.trys.push([1,4,,5]);if(e instanceof qe){this.certificateDecoded=e}else if(typeof e==="string"){this.certificateDecoded=new qe(e)}else{return[2]}this.certificateDecoded.parseAttributes();return[4,this.certificateDecoded.getThumbprint("SHA-1")];case 2:i.sent();return[4,this.certificateDecoded.getThumbprint("SHA-256")];case 3:i.sent();return[3,5];case 4:t=i.sent();this.certificateDecodeError=t;console.error("Error certificate parse:",t);return[3,5];case 5:this.isDecodeInProcess=false;return[2]}}))}))};e.prototype.watchCertificateAndDecode=function(e,t){if(typeof e==="string"&&typeof t==="string"){if(e!==t){this.decodeCertificate(e)}return}if(e instanceof qe&&t instanceof qe){if(e.commonName!==t.commonName){this.decodeCertificate(e)}}};e.prototype.renderErrorState=function(){return t("div",{class:"status_wrapper"},t("peculiar-typography",{type:"b1",class:"interaction_text"},"There was an error decoding this certificate request."))};e.prototype.renderEmptyState=function(){return t("div",{class:"status_wrapper"},t("peculiar-typography",{type:"b1",class:"interaction_text"},"There is no certificate request available."))};e.prototype.getExtensionRequestAttribute=function(){if(!this.certificateDecoded){return undefined}return this.certificateDecoded.attributes.find((function(e){return e.asn.type==="1.2.840.113549.1.9.14"}))};e.prototype.render=function(){if(this.certificateDecodeError){return this.renderErrorState()}if(!this.certificateDecoded){return this.renderEmptyState()}var e=this.getExtensionRequestAttribute();return t(n,{"data-view":this.view},t("table",null,t(Ut,Object.assign({},this.certificateDecoded)),t(fi,{name:this.certificateDecoded.subject}),t(di,{publicKey:this.certificateDecoded.publicKey}),t(Qe,{signature:this.certificateDecoded.signature}),t(ut,{thumbprints:this.certificateDecoded.thumbprints}),t(lt,{attributes:this.certificateDecoded.attributes,getLEILink:Jt,getDNSNameLink:Wt,getIPAddressLink:Zt,getAuthKeyIdParentLink:this.getAuthKeyIdParentLink,getAuthKeyIdSiblingsLink:this.getAuthKeyIdSiblingsLink,getSubjectKeyIdChildrenLink:this.getSubjectKeyIdChildrenLink,getSubjectKeyIdSiblingsLink:this.getSubjectKeyIdSiblingsLink}),t(Mt,{extensions:e===null||e===void 0?void 0:e.value,title:"Extension Request",getLEILink:Jt,getDNSNameLink:Wt,getIPAddressLink:Zt,getAuthKeyIdParentLink:this.getAuthKeyIdParentLink,getAuthKeyIdSiblingsLink:this.getAuthKeyIdSiblingsLink,getSubjectKeyIdChildrenLink:this.getSubjectKeyIdChildrenLink,getSubjectKeyIdSiblingsLink:this.getSubjectKeyIdSiblingsLink}),this.download&&t(Xt,{certificate:this.certificateDecoded})))};Object.defineProperty(e,"watchers",{get:function(){return{certificate:["watchCertificateAndDecode"]}},enumerable:false,configurable:true});return e}());vi.style=gi;var mi=':host{-webkit-box-sizing:border-box;box-sizing:border-box}:host *,:host *:before,:host *:after{-webkit-box-sizing:inherit;box-sizing:inherit}:host{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility;-ms-touch-action:manipulation;touch-action:manipulation;-webkit-user-drag:none;-ms-content-zooming:none;word-wrap:break-word;-webkit-text-size-adjust:none;-moz-text-size-adjust:none;-ms-text-size-adjust:none;text-size-adjust:none;display:inline-block}.link{font-family:"Open Sans", "Arial", sans-serif;font-family:var(--pv-font-family);letter-spacing:0.03em;letter-spacing:var(--pv-letter-spacing-normal);line-height:1.4;line-height:var(--pv-line-height-normal);color:#3584f7;color:rgba(var(--pv-color-primary-rgb), 1);font-weight:400;margin:0;padding:0;word-break:break-all}.link_type_h4{font-size:17px;font-size:var(--pv-font-size-h4);font-weight:600}.link_type_h6{font-size:15px;font-size:var(--pv-font-size-h6);font-weight:600}.link_type_h7{font-size:14px;font-size:var(--pv-font-size-h7);font-weight:600}.link_type_b1{font-size:15px;font-size:var(--pv-font-size-b1)}.link_type_b3{font-size:13px;font-size:var(--pv-font-size-b3)}.link:hover{text-decoration:none}';var xi=e("peculiar_link",function(){function e(e){i(this,e);this.type="b3"}e.prototype.render=function(){var e;return t("a",{href:this.href,target:"_blank",rel:"noreferrer noopener",class:(e={link:true},e["link_type_".concat(this.type||"b3")]=true,e)},t("slot",null))};return e}());xi.style=mi;var yi=":host{-webkit-box-sizing:border-box;box-sizing:border-box}:host *,:host *:before,:host *:after{-webkit-box-sizing:inherit;box-sizing:inherit}:host{display:block;width:100%}.text{display:inline-block;width:calc(100% - 60px);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;margin:0}.text.m_opened{white-space:initial}.action{vertical-align:top;display:inline-block;width:60px;text-align:right;position:relative;top:-6px}.button_action{width:30px}.expand_icon{width:7px;height:5px;display:inline-block}.m_opened .expand_icon{-webkit-transform:rotate(180deg);transform:rotate(180deg)}";var wi=e("peculiar_text_hider",function(){function e(e){i(this,e);this.textExpand=r(this,"textExpand",7);this.opened=false}e.prototype.textExpandHandler=function(){this.opened=!this.opened};e.prototype.render=function(){return t(n,null,t("div",{class:"root"},t("div",{class:{text:true,m_opened:this.opened}},t("slot",null)),t("div",{class:"action"},t("peculiar-button",{onClick:this.textExpand.emit,class:{button_action:true,m_opened:this.opened},fill:this.opened?"fill":"stroke"},t("svg",{viewBox:"0 0 7 5",xmlns:"http://www.w3.org/2000/svg",class:"expand_icon"},t("path",{"fill-rule":"evenodd","clip-rule":"evenodd",fill:"currentColor",d:"M5.459.124c.934.001 1.442.994.84 1.644L4.425 3.794c-.44.475-1.244.475-1.684 0L.862 1.764C.26 1.115.77.12 1.705.122l3.754.003z"}))))))};return e}());wi.style=yi;var ki=':host{-webkit-box-sizing:border-box;box-sizing:border-box}:host *,:host *:before,:host *:after{-webkit-box-sizing:inherit;box-sizing:inherit}:host{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility;-ms-touch-action:manipulation;touch-action:manipulation;-webkit-user-drag:none;-ms-content-zooming:none;word-wrap:break-word;-webkit-text-size-adjust:none;-moz-text-size-adjust:none;-ms-text-size-adjust:none;text-size-adjust:none;display:block}.typography{font-family:"Open Sans", "Arial", sans-serif;font-family:var(--pv-font-family);letter-spacing:0.03em;letter-spacing:var(--pv-letter-spacing-normal);line-height:1.4;line-height:var(--pv-line-height-normal);font-weight:400;margin:0;padding:0;display:block}.typography_type_h4{font-size:17px;font-size:var(--pv-font-size-h4);font-weight:600}.typography_type_h6{font-size:15px;font-size:var(--pv-font-size-h6);font-weight:600}.typography_type_h7{font-size:14px;font-size:var(--pv-font-size-h7);font-weight:600}.typography_type_b1{font-size:15px;font-size:var(--pv-font-size-b1)}.typography_type_b3{font-size:13px;font-size:var(--pv-font-size-b3)}.typography_color_dark{color:#2a3134;color:rgba(var(--pv-color-dark-rgb), 1)}.typography_color_light{color:white;color:rgba(var(--pv-color-light-rgb), 1)}.typography_color_grey_3{color:#d1d5d9;color:rgba(var(--pv-color-grey_3-rgb), 1)}.typography_color_grey_5{color:#869196;color:rgba(var(--pv-color-grey_5-rgb), 1)}.typography_color_attention{color:#f7a831;color:rgba(var(--pv-color-attention-rgb), 1)}.typography_color_primary{color:#3584f7;color:rgba(var(--pv-color-primary-rgb), 1)}.typography_ellipsis{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.typography_monospace{font-family:monospace}.typography_align_left{text-align:left}.typography_align_center{text-align:center}.typography_align_right{text-align:right}';var Si=e("peculiar_typography",function(){function e(e){i(this,e);this.type="b3";this.color="dark"}e.prototype.render=function(){var e;var i=this.type&&this.type.includes("h")?this.type:"p";return t(i,{class:(e={typography:true},e["typography_type_".concat(this.type||"b3")]=true,e["typography_color_".concat(this.color||"dark")]=true,e["typography_align_".concat(this.align)]=!!this.align,e.typography_ellipsis=this.ellipsis,e.typography_monospace=this.monospace,e)},t("slot",null))};return e}());Si.style=ki}}}));