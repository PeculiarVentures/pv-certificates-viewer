/*!
 * © Peculiar Ventures https://peculiarventures.com/ - MIT License
 */
import{z as t,F as s,G as i,e,H as r,A as h,c as a,I as n,P as o,j as c,k as u,p as g,g as l,D as m,J as p,N as f,K as b,L as w}from"./p-DentHfOz.js";
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
class y extends h{constructor(h){super(a(h),n),this.thumbprints={},this.type="X.509 Attribute Certificate",this.tag=o.AttributeCertificateTag;const{acinfo:u}=this.asn;this.serialNumber=e.Convert.ToHex(u.serialNumber),this.version=u.version;const g=u.attrCertValidityPeriod.notBeforeTime;if(!g)throw new Error("Cannot get 'notBefore' value");this.notBefore=g;const l=u.attrCertValidityPeriod.notAfterTime;if(!l)throw new Error("Cannot get 'notAfter' value");
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var m;this.notAfter=l,this.validity=c(this.notBefore,this.notAfter),this.issuer=(m=u.issuer).v1Form?m.v1Form.map(i):m.v2Form?.issuerName?[...m.v2Form.issuerName].map(i):[],this.holder=function(h){const a=[],{baseCertificateID:n,entityName:o,objectDigestInfo:c}=h;if(n){const{issuer:r,serial:h,issuerUID:o}=n,c=[t("Issuer",[...r].map(i)),s("Serial Number",e.Convert.ToHex(h))];o&&o.byteLength>0&&c.push(s("Issuer UID",e.Convert.ToHex(o))),a.push(t("Base Certificate ID",c))}if(o&&a.push(t("Entity Name",[...o].map(i))),c){const{digestedObjectType:i,digestAlgorithm:h,objectDigest:n,otherObjectTypeID:o}=c,u=[s("Type",r[i]),s("Algorithm",h.algorithm),s("Digest",e.Convert.ToHex(n))];o&&u.push(s("Other Type ID",o)),a.push(t("Digest Info",u))}return a}(u.holder)}get signature(){const{signatureValue:t,signatureAlgorithm:s}=this.asn;return{value:t,algorithm:s.algorithm}}parseExtensions(){const{acinfo:t}=this.asn;t.extensions&&(this.extensions=t.extensions.map(u))}parseAttributes(){const{acinfo:t}=this.asn;t.attributes&&(this.attributes=t.attributes.map(g))}async getThumbprint(t="SHA-1"){try{const s=await l(t,this.raw);s&&(this.thumbprints[t]=e.Convert.ToHex(s))}catch(t){console.error("Error thumbprint get:",t)}}get commonName(){return`attribute-certificate-${this.thumbprints["SHA-1"]}`}toString(t="pem"){switch(t){case"pem":return o.encode(this.raw,this.tag);case"base64url":return e.Convert.ToBase64Url(this.raw);default:return e.Convert.ToBase64(this.raw)}}downloadAsPEM(t){m.attrCert.asPEM(this.toString("pem"),t||this.commonName)}downloadAsDER(t){m.attrCert.asDER(this.raw,t||this.commonName)}}
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */class d extends h{constructor(t){super(a(t),p),this.thumbprints={},this.type="X.509 Certificate Revocation List",this.tag=o.CrlTag;const{tbsCertList:s}=this.asn;this.issuer=f.parse(s.issuer),this.version=(s.version??1)+1,this.lastUpdate=s.thisUpdate.getTime(),this.nextUpdate=s.nextUpdate?.getTime()??this.lastUpdate,this.revokedCertificates=(s.revokedCertificates||[]).map((t=>({revocationDate:t.revocationDate,userCertificate:t.userCertificate,crlEntryExtensions:t.crlEntryExtensions?.map(u)})))}async getThumbprint(t="SHA-1"){try{const s=await l(t,this.raw);s&&(this.thumbprints[t]=e.Convert.ToHex(s))}catch(t){console.error("Error thumbprint get:",t)}}get signature(){const{signature:t,signatureAlgorithm:s}=this.asn;return{value:t,algorithm:s.algorithm}}get commonName(){if(!this.issuer)return"";for(let t=0;t<this.issuer.length;t+=1){const s=this.issuer[t];if("CN"===s.short||"E"===s.short||"O"===s.short)return s.value}return""}parseExtensions(){const{tbsCertList:t}=this.asn;t.crlExtensions&&(this.extensions=t.crlExtensions.map(u))}toString(t="pem"){switch(t){case"pem":return o.encode(this.raw,this.tag);case"base64url":return e.Convert.ToBase64Url(this.raw);default:return e.Convert.ToBase64(this.raw)}}downloadAsPEM(t){m.crl.asPEM(this.toString("pem"),t||this.commonName)}downloadAsDER(t){m.crl.asDER(this.raw,t||this.commonName)}}class A{#t;constructor(t){const s=b(e.Convert.isBase64Url(t.trim())?e.Convert.ToString(e.Convert.FromBase64Url(t.trim())):t.trim());this.#t=new w(s),this.notBefore=this.#t.validAfter,this.notAfter=this.#t.validBefore,this.validity=c(this.notBefore,this.notAfter),this.type=[this.#t.blob.type,this.#t.certType,this.#t.type].join(" "),this.serialNumber=this.#t.serial.toString(),this.keyId=this.#t.keyId,this.principals=this.#t.principals,this.extensions=this.#t.extensions,this.criticalOptions=this.#t.criticalOptions}async parseSignatureKey(){const t=await this.#t.signatureKey.toWebCrypto(),s=this.#t.signatureKey.getBlob(),i=await this.#t.signatureKey.thumbprint("sha256");this.signatureKey={algorithm:t.algorithm.name,type:s.type,value:await this.#t.signatureKey.toSSH(),thumbprint:e.Convert.ToBase64(i)}}async parsePublicKey(){const t=await this.#t.publicKey.toWebCrypto(),s=this.#t.publicKey.getBlob(),i=await this.#t.publicKey.thumbprint("sha256");this.publicKey={algorithm:t.algorithm.name,type:s.type,value:await this.#t.publicKey.toSSH(),thumbprint:e.Convert.ToBase64(i)}}async toString(t="pem"){if("base64url"===t){const t=await this.#t.toSSH();return e.Convert.ToBase64Url(e.Convert.FromString(t))}return this.#t.toSSH()}get commonName(){return this.#t.principals.join("_")||this.#t.keyId||this.#t.certType}async downloadAsPub(t){m.certSSH.asPub(await this.toString(),t||[this.commonName,"cert"].join("-"))}}export{A as S,y as X,d as a}