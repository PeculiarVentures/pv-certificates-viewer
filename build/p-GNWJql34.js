/*!
 * © Peculiar Ventures https://peculiarventures.com/ - MIT License
 */
import{y as t,z as s,B as i,e,F as r,A as n,c as a,G as o,P as h,h as c,j as u,p as f,g,D as l,H as m,N as p}from"./p-BVyFAnRr.js";
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */function d(n){const a=[];const{baseCertificateID:o,entityName:h,objectDigestInfo:c}=n;if(o){const{issuer:r,serial:n,issuerUID:h}=o;const c=[t("Issuer",[...r].map(i)),s("Serial Number",e.Convert.ToHex(n))];if(h&&h.byteLength>0){c.push(s("Issuer UID",e.Convert.ToHex(h)))}a.push(t("Base Certificate ID",c))}if(h){a.push(t("Entity Name",[...h].map(i)))}if(c){const{digestedObjectType:i,digestAlgorithm:n,objectDigest:o,otherObjectTypeID:h}=c;const u=[s("Type",r[i]),s("Algorithm",n.algorithm),s("Digest",e.Convert.ToHex(o))];if(h){u.push(s("Other Type ID",h))}a.push(t("Digest Info",u))}return a}
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */function b(t){var s;if(t.v1Form){return t.v1Form.map(i)}if((s=t.v2Form)===null||s===void 0?void 0:s.issuerName){return[...t.v2Form.issuerName].map(i)}return[]}
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */class A extends n{constructor(t){super(a(t),o);this.thumbprints={};this.type="X.509 Attribute Certificate";this.tag=h.AttributeCertificateTag;const{acinfo:s}=this.asn;this.serialNumber=e.Convert.ToHex(s.serialNumber);this.version=s.version;const i=s.attrCertValidityPeriod.notBeforeTime;if(!i){throw new Error("Cannot get 'notBefore' value")}this.notBefore=i;const r=s.attrCertValidityPeriod.notAfterTime;if(!r){throw new Error("Cannot get 'notAfter' value")}this.notAfter=r;this.validity=c(this.notBefore,this.notAfter);this.issuer=b(s.issuer);this.holder=d(s.holder)}get signature(){const{signatureValue:t,signatureAlgorithm:s}=this.asn;return{value:t,algorithm:s.algorithm}}parseExtensions(){const{acinfo:t}=this.asn;if(t.extensions){this.extensions=t.extensions.map(u)}}parseAttributes(){const{acinfo:t}=this.asn;if(t.attributes){this.attributes=t.attributes.map(f)}}async getThumbprint(t="SHA-1"){try{const s=await g(t,this.raw);if(s){this.thumbprints[t]=e.Convert.ToHex(s)}}catch(t){console.error("Error thumbprint get:",t)}}get commonName(){return`attribute-certificate-${this.thumbprints["SHA-1"]}`}toString(t="pem"){switch(t){case"pem":return h.encode(this.raw,this.tag);case"base64url":return e.Convert.ToBase64Url(this.raw);default:return e.Convert.ToBase64(this.raw)}}downloadAsPEM(t){l.attrCert.asPEM(this.toString("pem"),t||this.commonName)}downloadAsDER(t){l.attrCert.asDER(this.raw,t||this.commonName)}}
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */class D extends n{constructor(t){super(a(t),m);this.thumbprints={};this.type="X.509 Certificate Revocation List";this.tag=h.CrlTag;const{tbsCertList:s}=this.asn;this.issuer=p.parse(s.issuer);this.version=s.version+1;this.lastUpdate=s.thisUpdate.getTime();this.nextUpdate=s.nextUpdate.getTime();this.revokedCertificates=(s.revokedCertificates||[]).map((t=>{var s;return{revocationDate:t.revocationDate,userCertificate:t.userCertificate,crlEntryExtensions:(s=t.crlEntryExtensions)===null||s===void 0?void 0:s.map(u)}}))}async getThumbprint(t="SHA-1"){try{const s=await g(t,this.raw);if(s){this.thumbprints[t]=e.Convert.ToHex(s)}}catch(t){console.error("Error thumbprint get:",t)}}get signature(){const{signature:t,signatureAlgorithm:s}=this.asn;return{value:t,algorithm:s.algorithm}}get commonName(){if(!this.issuer){return""}for(let t=0;t<this.issuer.length;t+=1){const s=this.issuer[t];if(s.short==="CN"||s.short==="E"||s.short==="O"){return s.value}}return""}parseExtensions(){const{tbsCertList:t}=this.asn;if(t.crlExtensions){this.extensions=t.crlExtensions.map(u)}}toString(t="pem"){switch(t){case"pem":return h.encode(this.raw,this.tag);case"base64url":return e.Convert.ToBase64Url(this.raw);default:return e.Convert.ToBase64(this.raw)}}downloadAsPEM(t){l.crl.asPEM(this.toString("pem"),t||this.commonName)}downloadAsDER(t){l.crl.asDER(this.raw,t||this.commonName)}}export{A as X,D as a};
//# sourceMappingURL=p-GNWJql34.js.map