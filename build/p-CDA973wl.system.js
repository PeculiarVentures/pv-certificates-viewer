var __extends=this&&this.__extends||function(){var t=function(e,n){t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)if(Object.prototype.hasOwnProperty.call(e,n))t[n]=e[n]};return t(e,n)};return function(e,n){if(typeof n!=="function"&&n!==null)throw new TypeError("Class extends value "+String(n)+" is not a constructor or null");t(e,n);function i(){this.constructor=e}e.prototype=n===null?Object.create(n):(i.prototype=n.prototype,new i)}}();
/*!
 * © Peculiar Ventures https://peculiarventures.com/ - MIT License
 */System.register(["./p-CrzwWGx_.system.js"],(function(t){"use strict";var e,n,i,r,u,o,s,c,f,a,h,l,v,b,p,y,j,d,g,m;return{setters:[function(t){e=t.j;n=t.k;i=t.l;r=t.m;u=t.o;o=t.S;s=t.q;c=t.r;f=t.t;a=t.A;h=t.c;l=t.P;v=t.N;b=t.s;p=t.p;y=t.u;j=t.f;d=t.D;g=t.e;m=t.g}],execute:function(){
// \0@oxc-project+runtime@0.155.0/helpers/esm/decorate.js
function w(t,e,n,i){var r=arguments.length,u=r<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,n):i,o;if(typeof Reflect==="object"&&typeof Reflect.decorate==="function")u=Reflect.decorate(t,e,n,i);else for(var s=t.length-1;s>=0;s--)if(o=t[s])u=(r<3?o(u):r>3?o(e,n,u):o(e,n))||u;return r>3&&u&&Object.defineProperty(e,n,u),u}
// src/attributes.ts
var O;var _=O=/** @class */function(t){__extends(e,t);function e(e){var n=t.call(this,e)||this;Object.setPrototypeOf(n,O.prototype);return n}return e}(e);_=O=w([n({type:r.Sequence,itemType:i})],_);
// src/certification_request_info.ts
var x=/** @class */function(){function t(t){if(t===void 0){t={}}this.version=0;this.subject=new u;this.subjectPKInfo=new o;this.attributes=new _;Object.assign(this,t)}return t}();w([s({type:c.Integer})],x.prototype,"version",void 0);w([s({type:u})],x.prototype,"subject",void 0);w([s({type:o})],x.prototype,"subjectPKInfo",void 0);w([s({type:_,implicit:true,context:0,optional:true})],x.prototype,"attributes",void 0);
// src/certification_request.ts
var R=/** @class */function(){function t(t){if(t===void 0){t={}}this.certificationRequestInfo=new x;this.signatureAlgorithm=new f;this.signature=new ArrayBuffer(0);Object.assign(this,t)}return t}();w([s({type:x,raw:true})],R.prototype,"certificationRequestInfo",void 0);w([s({type:f})],R.prototype,"signatureAlgorithm",void 0);w([s({type:c.BitString})],R.prototype,"signature",void 0);
/**
             * @license
             * Copyright (c) Peculiar Ventures, LLC.
             *
             * This source code is licensed under the MIT license found in the
             * LICENSE file in the root directory of this source tree.
             */var C=/** @class */function(t){__extends(e,t);function e(e){var n=t.call(this,h(e),R)||this;n.type="PKCS#10 Certificate Request";n.tag=l.CertificateRequestTag;var i=n.asn.certificationRequestInfo;n.subject=v.parse(i.subject);n.version=i.version;return n}e.prototype.buildJSON=function(){var t;var e=this.asn.certificationRequestInfo;return{type:this.type,version:this.version+1,subject:this.subject,publicKey:p(this.publicKey),signature:b(j(this.asn.signatureAlgorithm,this.asn.signature)),attributes:((t=e.attributes)!==null&&t!==void 0?t:[]).map(y)}};e.prototype.downloader=function(){return d.csr};Object.defineProperty(e.prototype,"publicKey",{
/** @deprecated Use `toJSON().publicKey`. */
get:function(){return g(this.asn.certificationRequestInfo.subjectPKInfo)},enumerable:false,configurable:true});Object.defineProperty(e.prototype,"signature",{
/** @deprecated Use `toJSON().signature`. */
get:function(){var t=this.asn,e=t.signature,n=t.signatureAlgorithm;return{value:e,algorithm:n.algorithm}},enumerable:false,configurable:true});Object.defineProperty(e.prototype,"commonName",{get:function(){return m(this.subject)},enumerable:false,configurable:true});
/** @deprecated Use `toJSON().attributes`. */e.prototype.parseAttributes=function(){if(this.asn.certificationRequestInfo.attributes){this.attributes=this.toJSON().attributes}};return e}(a);t("P",C)}}}));