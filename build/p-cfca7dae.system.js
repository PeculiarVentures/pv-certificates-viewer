var __extends=this&&this.__extends||function(){var t=function(e,r){t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)if(Object.prototype.hasOwnProperty.call(e,r))t[r]=e[r]};return t(e,r)};return function(e,r){if(typeof r!=="function"&&r!==null)throw new TypeError("Class extends value "+String(r)+" is not a constructor or null");t(e,r);function n(){this.constructor=e}e.prototype=r===null?Object.create(r):(n.prototype=r.prototype,new n)}}();var __awaiter=this&&this.__awaiter||function(t,e,r,n){function o(t){return t instanceof r?t:new r((function(e){e(t)}))}return new(r||(r=Promise))((function(r,i){function a(t){try{u(n.next(t))}catch(t){i(t)}}function s(t){try{u(n["throw"](t))}catch(t){i(t)}}function u(t){t.done?r(t.value):o(t.value).then(a,s)}u((n=n.apply(t,e||[])).next())}))};var __generator=this&&this.__generator||function(t,e){var r={label:0,sent:function(){if(i[0]&1)throw i[1];return i[1]},trys:[],ops:[]},n,o,i,a;return a={next:s(0),throw:s(1),return:s(2)},typeof Symbol==="function"&&(a[Symbol.iterator]=function(){return this}),a;function s(t){return function(e){return u([t,e])}}function u(s){if(n)throw new TypeError("Generator is already executing.");while(a&&(a=0,s[0]&&(r=0)),r)try{if(n=1,o&&(i=s[0]&2?o["return"]:s[0]?o["throw"]||((i=o["return"])&&i.call(o),0):o.next)&&!(i=i.call(o,s[1])).done)return i;if(o=0,i)s=[s[0]&2,i.value];switch(s[0]){case 0:case 1:i=s;break;case 4:r.label++;return{value:s[1],done:false};case 5:r.label++;o=s[1];s=[0];continue;case 7:s=r.ops.pop();r.trys.pop();continue;default:if(!(i=r.trys,i=i.length>0&&i[i.length-1])&&(s[0]===6||s[0]===2)){r=0;continue}if(s[0]===3&&(!i||s[1]>i[0]&&s[1]<i[3])){r.label=s[1];break}if(s[0]===6&&r.label<i[1]){r.label=i[1];i=s;break}if(i&&r.label<i[2]){r.label=i[2];r.ops.push(s);break}if(i[2])r.ops.pop();r.trys.pop();continue}s=e.call(t,r)}catch(t){s=[6,t];o=0}finally{n=i=0}if(s[0]&5)throw s[1];return{value:s[0]?s[1]:void 0,done:true}}};
/*!
 * © Peculiar Ventures https://peculiarventures.com/ - MIT License
 */System.register(["./p-15cb92b5.system.js","./p-14f281b0.system.js"],(function(t){"use strict";var e,r,n,o,i,a,s,u,c,f,l,p,h,m,b,y,v,g,d,w,j;return{setters:[function(t){e=t.A;r=t.e;n=t.C;o=t.N;i=t.f;a=t.E;s=t.g;u=t.h;c=t.j;f=t.k;l=t.R;p=t.l;h=t.m;m=t.n;b=t.o;y=t.p;v=t.q;g=t.r;d=t.s},function(t){w=t.C;j=t.D}],execute:function(){
/**
       * @license
       * Copyright (c) Peculiar Ventures, LLC.
       *
       * This source code is licensed under the MIT license found in the
       * LICENSE file in the root directory of this source tree.
       */
var _=function(t){__extends(e,t);function e(e){var a=t.call(this,r(e),n)||this;a.thumbprints={};a.type="X.509 Certificate";var s=a.asn.tbsCertificate;a.serialNumber=w.ToHex(s.serialNumber);a.subject=new o(s.subject).toJSON();a.issuer=new o(s.issuer).toJSON();a.version=s.version+1;var u=s.validity.notBefore.utcTime||s.validity.notBefore.generalTime;if(!u){throw new Error("Cannot get 'notBefore' value")}a.notBefore=u;var c=s.validity.notAfter.utcTime||s.validity.notAfter.generalTime;if(!c){throw new Error("Cannot get 'notAfter' value")}a.notAfter=c;a.validity=i(a.notBefore,a.notAfter);return a}e.prototype.parseExtensions=function(){var t=this.asn.tbsCertificate;if(t.extensions){this.extensions=t.extensions.map((function(t){return new a(s.serialize(t))}))}};e.prototype.getPublicKeyInfo=function(t){var e=this;var r=t.subjectPublicKey,n=t.algorithm;var o;if(n.algorithm===u&&n.parameters){o=s.parse(n.parameters,c)}if(n.algorithm===f){o=s.parse(r,l)}if(n.algorithm===p){o=s.parse(r,h);o=o.map((function(t){return e.getPublicKeyInfo(t)}))}var i=s.serialize(t);return{params:o,value:i,algorithm:n.algorithm}};Object.defineProperty(e.prototype,"publicKey",{get:function(){return this.getPublicKeyInfo(this.asn.tbsCertificate.subjectPublicKeyInfo)},enumerable:false,configurable:true});Object.defineProperty(e.prototype,"signature",{get:function(){var t=this.asn,e=t.signatureValue,r=t.signatureAlgorithm;var n;if(r.algorithm===m){var o=s.parse(e,b);var i=s.parse(r.parameters,y);n=i.map((function(t,e){return Object.assign(Object.assign({},t),{value:o[e]})}))}return{params:n,value:e,algorithm:r.algorithm}},enumerable:false,configurable:true});e.prototype.exportAsBase64=function(){return w.ToBase64(this.raw)};e.prototype.exportAsHexFormatted=function(){return v(w.ToHex(this.raw))};e.prototype.exportAsPemFormatted=function(){return"-----BEGIN CERTIFICATE-----\n".concat(g(this.exportAsBase64()),"\n-----END CERTIFICATE-----")};e.prototype.getThumbprint=function(t){if(t===void 0){t="SHA-1"}return __awaiter(this,void 0,void 0,(function(){var e,r;return __generator(this,(function(n){switch(n.label){case 0:n.trys.push([0,2,,3]);return[4,d(t,this.raw)];case 1:e=n.sent();if(e){this.thumbprints[t]=w.ToHex(e)}return[3,3];case 2:r=n.sent();console.error("Error thumbprint get:",r);return[3,3];case 3:return[2]}}))}))};Object.defineProperty(e.prototype,"commonName",{get:function(){if(!this.subject){return""}for(var t=0;t<this.subject.length;t+=1){var e=this.subject[t];if(e.shortName==="CN"||e.shortName==="E"||e.shortName==="O"){return e.value}}return""},enumerable:false,configurable:true});Object.defineProperty(e.prototype,"issuerCommonName",{get:function(){if(!this.issuer){return""}for(var t=0;t<this.issuer.length;t+=1){var e=this.issuer[t];if(e.shortName==="CN"){return e.value}if(e.shortName==="E"){return e.value}}return""},enumerable:false,configurable:true});Object.defineProperty(e.prototype,"isRoot",{get:function(){return JSON.stringify(this.issuer)===JSON.stringify(this.subject)},enumerable:false,configurable:true});e.prototype.subjectToString=function(){if(!this.subject){return""}return this.subject.map((function(t){return"".concat(t.shortName,"=").concat(t.value)})).join(", ")};e.prototype.issuerToString=function(){if(!this.issuer){return""}return this.issuer.map((function(t){return"".concat(t.shortName,"=").concat(t.value)})).join(", ")};e.prototype.downloadAsPEM=function(t){j.cert.asPEM(this.exportAsPemFormatted(),t||this.commonName)};e.prototype.downloadAsDER=function(t){j.cert.asDER(this.exportAsHexFormatted(),t||this.commonName)};return e}(e);t("X",_)}}}));
//# sourceMappingURL=p-cfca7dae.system.js.map