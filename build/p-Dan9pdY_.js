/*!
 * © Peculiar Ventures https://peculiarventures.com/ - MIT License
 */
import{A as t,c as s,C as i,P as e,h as r,N as h,a as n,s as o,p as a,b as u,D as c,e as g,f,g as l,n as m}from"./p-BQXR598Z.js";
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */class p extends t{constructor(t){super(s(t),i),this.type="X.509 Certificate",this.tag=e.CertificateTag;const{tbsCertificate:o}=this.asn;this.serialNumber=r.encode(o.serialNumber),this.subject=h.parse(o.subject),this.issuer=h.parse(o.issuer),this.version=o.version+1;const a=o.validity.notBefore.utcTime||o.validity.notBefore.generalTime;if(!a)throw new Error("Cannot get 'notBefore' value");this.notBefore=a;const u=o.validity.notAfter.utcTime||o.validity.notAfter.generalTime;if(!u)throw new Error("Cannot get 'notAfter' value");this.notAfter=u,this.validity=n(this.notBefore,this.notAfter)}buildJSON(){return{type:this.type,version:this.version,serialNumber:this.serialNumber,subject:this.subject,issuer:this.issuer,notBefore:this.notBefore,notAfter:this.notAfter,validity:this.validity,publicKey:a(this.publicKey),signature:o(this.signature),extensions:(this.asn.tbsCertificate.extensions??[]).map(u),isRoot:this.isRoot}}downloader(){return c.cert}parseExtensions(){this.asn.tbsCertificate.extensions&&(this.extensions=this.toJSON().extensions)}get publicKey(){return g(this.asn.tbsCertificate.subjectPublicKeyInfo)}get signature(){return f(this.asn.signatureAlgorithm,this.asn.signatureValue)}get commonName(){return l(this.subject)}get issuerCommonName(){return l(this.issuer)}get isRoot(){return JSON.stringify(this.issuer)===JSON.stringify(this.subject)}subjectToString(){return m(this.subject)}issuerToString(){return m(this.issuer)}}export{p as X}