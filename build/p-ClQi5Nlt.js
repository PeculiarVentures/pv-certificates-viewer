/*!
 * © Peculiar Ventures https://peculiarventures.com/ - MIT License
 */
import{A as t,c as s,q as i,P as r,e,h as n,j as a,p as h,g as o,D as c,r as u,N as l}from"./p-BMLZ9T_R.js";
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */class g extends t{constructor(t){var a;super(s(t),i);this.thumbprints={};this.type="X.509 Attribute Certificate";this.tag=r.AttributeCertificateTag;const{acinfo:h}=this.asn;this.serialNumber=e.Convert.ToHex(h.serialNumber);this.version=h.version;const o=h.attrCertValidityPeriod.notBeforeTime;if(!o){throw new Error("Cannot get 'notBefore' value")}this.notBefore=o;const c=h.attrCertValidityPeriod.notAfterTime;if(!c){throw new Error("Cannot get 'notAfter' value")}this.notAfter=c;this.validity=n(this.notBefore,this.notAfter);this.issuer=h.issuer.v1Form||((a=h.issuer.v2Form)===null||a===void 0?void 0:a.issuerName);this.holder=h.holder}get signature(){const{signatureValue:t,signatureAlgorithm:s}=this.asn;return{value:t,algorithm:s.algorithm}}parseExtensions(){const{acinfo:t}=this.asn;if(t.extensions){this.extensions=t.extensions.map(a)}}parseAttributes(){const{acinfo:t}=this.asn;if(t.attributes){this.attributes=t.attributes.map(h)}}async getThumbprint(t="SHA-1"){try{const s=await o(t,this.raw);if(s){this.thumbprints[t]=e.Convert.ToHex(s)}}catch(t){console.error("Error thumbprint get:",t)}}get commonName(){return`attribute-certificate-${this.thumbprints["SHA-1"]}`}toString(t="pem"){switch(t){case"pem":return r.encode(this.raw,this.tag);case"base64url":return e.Convert.ToBase64Url(this.raw);default:return e.Convert.ToBase64(this.raw)}}downloadAsPEM(t){c.attrCert.asPEM(this.toString("pem"),t||this.commonName)}downloadAsDER(t){c.attrCert.asDER(this.raw,t||this.commonName)}}
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */class f extends t{constructor(t){super(s(t),u);this.thumbprints={};this.type="X.509 Certificate Revocation List";this.tag=r.CrlTag;const{tbsCertList:i}=this.asn;this.issuer=l.parse(i.issuer);this.version=i.version+1;this.lastUpdate=i.thisUpdate.getTime();this.nextUpdate=i.nextUpdate.getTime();this.revokedCertificates=(i.revokedCertificates||[]).map((t=>{var s;return{revocationDate:t.revocationDate,userCertificate:t.userCertificate,crlEntryExtensions:(s=t.crlEntryExtensions)===null||s===void 0?void 0:s.map(a)}}))}async getThumbprint(t="SHA-1"){try{const s=await o(t,this.raw);if(s){this.thumbprints[t]=e.Convert.ToHex(s)}}catch(t){console.error("Error thumbprint get:",t)}}get signature(){const{signature:t,signatureAlgorithm:s}=this.asn;return{value:t,algorithm:s.algorithm}}get commonName(){if(!this.issuer){return""}for(let t=0;t<this.issuer.length;t+=1){const s=this.issuer[t];if(s.short==="CN"||s.short==="E"||s.short==="O"){return s.value}}return""}parseExtensions(){const{tbsCertList:t}=this.asn;if(t.crlExtensions){this.extensions=t.crlExtensions.map(a)}}toString(t="pem"){switch(t){case"pem":return r.encode(this.raw,this.tag);case"base64url":return e.Convert.ToBase64Url(this.raw);default:return e.Convert.ToBase64(this.raw)}}downloadAsPEM(t){c.crl.asPEM(this.toString("pem"),t||this.commonName)}downloadAsDER(t){c.crl.asDER(this.raw,t||this.commonName)}}export{g as X,f as a};
//# sourceMappingURL=p-ClQi5Nlt.js.map