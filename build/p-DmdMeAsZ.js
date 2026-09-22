/*!
 * © Peculiar Ventures https://peculiarventures.com/ - MIT License
 */
import{F as t,G as s,H as i,e,I as r,A as n,c as a,J as o,P as h,j as c,k as u,p as g,g as l,D as m,K as f,N as p}from"./p-B7MG4079.js";
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
class d extends n{constructor(n){super(a(n),o),this.thumbprints={},this.type="X.509 Attribute Certificate",this.tag=h.AttributeCertificateTag;const{acinfo:u}=this.asn;this.serialNumber=e.Convert.ToHex(u.serialNumber),this.version=u.version;const g=u.attrCertValidityPeriod.notBeforeTime;if(!g)throw new Error("Cannot get 'notBefore' value");this.notBefore=g;const l=u.attrCertValidityPeriod.notAfterTime;if(!l)throw new Error("Cannot get 'notAfter' value");
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var m,f;this.notAfter=l,this.validity=c(this.notBefore,this.notAfter),this.issuer=(m=u.issuer).v1Form?m.v1Form.map(i):(null===(f=m.v2Form)||void 0===f?void 0:f.issuerName)?[...m.v2Form.issuerName].map(i):[],this.holder=function(n){const a=[],{baseCertificateID:o,entityName:h,objectDigestInfo:c}=n;if(o){const{issuer:r,serial:n,issuerUID:h}=o,c=[t("Issuer",[...r].map(i)),s("Serial Number",e.Convert.ToHex(n))];h&&h.byteLength>0&&c.push(s("Issuer UID",e.Convert.ToHex(h))),a.push(t("Base Certificate ID",c))}if(h&&a.push(t("Entity Name",[...h].map(i))),c){const{digestedObjectType:i,digestAlgorithm:n,objectDigest:o,otherObjectTypeID:h}=c,u=[s("Type",r[i]),s("Algorithm",n.algorithm),s("Digest",e.Convert.ToHex(o))];h&&u.push(s("Other Type ID",h)),a.push(t("Digest Info",u))}return a}(u.holder)}get signature(){const{signatureValue:t,signatureAlgorithm:s}=this.asn;return{value:t,algorithm:s.algorithm}}parseExtensions(){const{acinfo:t}=this.asn;t.extensions&&(this.extensions=t.extensions.map(u))}parseAttributes(){const{acinfo:t}=this.asn;t.attributes&&(this.attributes=t.attributes.map(g))}async getThumbprint(t="SHA-1"){try{const s=await l(t,this.raw);s&&(this.thumbprints[t]=e.Convert.ToHex(s))}catch(t){console.error("Error thumbprint get:",t)}}get commonName(){return`attribute-certificate-${this.thumbprints["SHA-1"]}`}toString(t="pem"){switch(t){case"pem":return h.encode(this.raw,this.tag);case"base64url":return e.Convert.ToBase64Url(this.raw);default:return e.Convert.ToBase64(this.raw)}}downloadAsPEM(t){m.attrCert.asPEM(this.toString("pem"),t||this.commonName)}downloadAsDER(t){m.attrCert.asDER(this.raw,t||this.commonName)}}
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */class b extends n{constructor(t){super(a(t),f),this.thumbprints={},this.type="X.509 Certificate Revocation List",this.tag=h.CrlTag;const{tbsCertList:s}=this.asn;this.issuer=p.parse(s.issuer),this.version=s.version+1,this.lastUpdate=s.thisUpdate.getTime(),this.nextUpdate=s.nextUpdate.getTime(),this.revokedCertificates=(s.revokedCertificates||[]).map((t=>{var s;return{revocationDate:t.revocationDate,userCertificate:t.userCertificate,crlEntryExtensions:null===(s=t.crlEntryExtensions)||void 0===s?void 0:s.map(u)}}))}async getThumbprint(t="SHA-1"){try{const s=await l(t,this.raw);s&&(this.thumbprints[t]=e.Convert.ToHex(s))}catch(t){console.error("Error thumbprint get:",t)}}get signature(){const{signature:t,signatureAlgorithm:s}=this.asn;return{value:t,algorithm:s.algorithm}}get commonName(){if(!this.issuer)return"";for(let t=0;t<this.issuer.length;t+=1){const s=this.issuer[t];if("CN"===s.short||"E"===s.short||"O"===s.short)return s.value}return""}parseExtensions(){const{tbsCertList:t}=this.asn;t.crlExtensions&&(this.extensions=t.crlExtensions.map(u))}toString(t="pem"){switch(t){case"pem":return h.encode(this.raw,this.tag);case"base64url":return e.Convert.ToBase64Url(this.raw);default:return e.Convert.ToBase64(this.raw)}}downloadAsPEM(t){m.crl.asPEM(this.toString("pem"),t||this.commonName)}downloadAsDER(t){m.crl.asDER(this.raw,t||this.commonName)}}export{d as X,b as a}