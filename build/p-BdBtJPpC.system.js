var __extends=this&&this.__extends||function(){var t=function(e,n){t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)if(Object.prototype.hasOwnProperty.call(e,n))t[n]=e[n]};return t(e,n)};return function(e,n){if(typeof n!=="function"&&n!==null)throw new TypeError("Class extends value "+String(n)+" is not a constructor or null");t(e,n);function r(){this.constructor=e}e.prototype=n===null?Object.create(n):(r.prototype=n.prototype,new r)}}();
/*!
 * © Peculiar Ventures https://peculiarventures.com/ - MIT License
 */System.register(["./p-Du6q1H02.system.js"],(function(t){"use strict";var e,n,r,i,u,s,o,c,f,a,h,l,b,v,g;return{setters:[function(t){e=t.A;n=t.c;r=t.C;i=t.P;u=t.h;s=t.N;o=t.a;c=t.s;f=t.p;a=t.b;h=t.D;l=t.e;b=t.f;v=t.g;g=t.n}],execute:function(){
/**
             * @license
             * Copyright (c) Peculiar Ventures, LLC.
             *
             * This source code is licensed under the MIT license found in the
             * LICENSE file in the root directory of this source tree.
             */
var m=/** @class */function(t){__extends(e,t);function e(e){var c=t.call(this,n(e),r)||this;c.type="X.509 Certificate";c.tag=i.CertificateTag;var f=c.asn.tbsCertificate;c.serialNumber=u.encode(f.serialNumber);c.subject=s.parse(f.subject);c.issuer=s.parse(f.issuer);c.version=f.version+1;var a=f.validity.notBefore.utcTime||f.validity.notBefore.generalTime;if(!a){throw new Error("Cannot get 'notBefore' value")}c.notBefore=a;var h=f.validity.notAfter.utcTime||f.validity.notAfter.generalTime;if(!h){throw new Error("Cannot get 'notAfter' value")}c.notAfter=h;c.validity=o(c.notBefore,c.notAfter);return c}e.prototype.buildJSON=function(){var t;return{type:this.type,version:this.version,serialNumber:this.serialNumber,subject:this.subject,issuer:this.issuer,notBefore:this.notBefore,notAfter:this.notAfter,validity:this.validity,publicKey:f(this.publicKey),signature:c(this.signature),extensions:((t=this.asn.tbsCertificate.extensions)!==null&&t!==void 0?t:[]).map(a),isRoot:this.isRoot}};e.prototype.downloader=function(){return h.cert};
/** @deprecated Use `toJSON().extensions`. */e.prototype.parseExtensions=function(){if(this.asn.tbsCertificate.extensions){this.extensions=this.toJSON().extensions}};Object.defineProperty(e.prototype,"publicKey",{
/** @deprecated Use `toJSON().publicKey`. */
get:function(){return l(this.asn.tbsCertificate.subjectPublicKeyInfo)},enumerable:false,configurable:true});Object.defineProperty(e.prototype,"signature",{
/** @deprecated Use `toJSON().signature`. */
get:function(){return b(this.asn.signatureAlgorithm,this.asn.signatureValue)},enumerable:false,configurable:true});Object.defineProperty(e.prototype,"commonName",{get:function(){return v(this.subject)},enumerable:false,configurable:true});Object.defineProperty(e.prototype,"issuerCommonName",{
/** @deprecated Use `firstCommonName(toJSON().issuer)`. */
get:function(){return v(this.issuer)},enumerable:false,configurable:true});Object.defineProperty(e.prototype,"isRoot",{
/** @deprecated Use `toJSON().isRoot`. */
get:function(){return JSON.stringify(this.issuer)===JSON.stringify(this.subject)},enumerable:false,configurable:true});
/** @deprecated Use `nameToString(toJSON().subject)`. */e.prototype.subjectToString=function(){return g(this.subject)};
/** @deprecated Use `nameToString(toJSON().issuer)`. */e.prototype.issuerToString=function(){return g(this.issuer)};return e}(e);t("X",m)}}}));