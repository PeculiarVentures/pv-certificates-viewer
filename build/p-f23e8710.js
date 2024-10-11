/*!
 * © Peculiar Ventures https://peculiarventures.com/ - MIT License
 */
import{A as t,v as s,S as i,P as e,C as r,J as n,G as a,y as o,F as h,D as c,X as u,N as l}from"./p-2804e9d7.js";import{A as m}from"./p-0d085429.js";
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */class f extends t{constructor(t){var a;super(s(t),i);this.thumbprints={};this.type="X.509 Attribute Certificate";this.tag=e.AttributeCertificateTag;const{acinfo:o}=this.asn;this.serialNumber=r.ToHex(o.serialNumber);this.version=o.version;const h=o.attrCertValidityPeriod.notBeforeTime;if(!h){throw new Error("Cannot get 'notBefore' value")}this.notBefore=h;const c=o.attrCertValidityPeriod.notAfterTime;if(!c){throw new Error("Cannot get 'notAfter' value")}this.notAfter=c;this.validity=n(this.notBefore,this.notAfter);this.issuer=o.issuer.v1Form||((a=o.issuer.v2Form)===null||a===void 0?void 0:a.issuerName);this.holder=o.holder}get signature(){const{signatureValue:t,signatureAlgorithm:s}=this.asn;return{value:t,algorithm:s.algorithm}}parseExtensions(){const{acinfo:t}=this.asn;if(t.extensions){this.extensions=t.extensions.map((t=>new a(o.serialize(t))))}}parseAttributes(){const{acinfo:t}=this.asn;if(t.attributes){this.attributes=t.attributes.map((t=>new m(o.serialize(t))))}}async getThumbprint(t="SHA-1"){try{const s=await h(t,this.raw);if(s){this.thumbprints[t]=r.ToHex(s)}}catch(t){console.error("Error thumbprint get:",t)}}get commonName(){return`attribute-certificate-${this.thumbprints["SHA-1"]}`}toString(t="pem"){switch(t){case"pem":return e.encode(this.raw,this.tag);case"base64url":return r.ToBase64Url(this.raw);default:return r.ToBase64(this.raw)}}downloadAsPEM(t){c.attrCert.asPEM(this.toString("pem"),t||this.commonName)}downloadAsDER(t){c.attrCert.asDER(this.raw,t||this.commonName)}}
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */class g extends t{constructor(t){super(s(t),u);this.thumbprints={};this.type="X.509 Certificate Revocation List";this.tag=e.CrlTag;const{tbsCertList:i}=this.asn;this.issuer=new l(i.issuer).toJSON();this.version=i.version+1;this.lastUpdate=i.thisUpdate.getTime();this.nextUpdate=i.nextUpdate.getTime();this.revokedCertificates=(i.revokedCertificates||[]).map((t=>{var s;return{revocationDate:t.revocationDate,userCertificate:t.userCertificate,crlEntryExtensions:(s=t.crlEntryExtensions)===null||s===void 0?void 0:s.map((t=>new a(o.serialize(t))))}}))}async getThumbprint(t="SHA-1"){try{const s=await h(t,this.raw);if(s){this.thumbprints[t]=r.ToHex(s)}}catch(t){console.error("Error thumbprint get:",t)}}get signature(){const{signature:t,signatureAlgorithm:s}=this.asn;return{value:t,algorithm:s.algorithm}}get commonName(){if(!this.issuer){return""}for(let t=0;t<this.issuer.length;t+=1){const s=this.issuer[t];if(s.shortName==="CN"||s.shortName==="E"||s.shortName==="O"){return s.value}}return""}parseExtensions(){const{tbsCertList:t}=this.asn;if(t.crlExtensions){this.extensions=t.crlExtensions.map((t=>new a(o.serialize(t))))}}toString(t="pem"){switch(t){case"pem":return e.encode(this.raw,this.tag);case"base64url":return r.ToBase64Url(this.raw);default:return r.ToBase64(this.raw)}}downloadAsPEM(t){c.crl.asPEM(this.toString("pem"),t||this.commonName)}downloadAsDER(t){c.crl.asDER(this.raw,t||this.commonName)}}export{f as X,g as a};
//# sourceMappingURL=p-f23e8710.js.map