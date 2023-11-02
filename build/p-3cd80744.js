/*!
 * © Peculiar Ventures https://peculiarventures.com/ - MIT License
 */
import{A as t,t as s,u as i,v as e,D as r,w as a,x as n,y as o,z as h,B as c,F as u,G as l,T as E,H as f,I as m,J as g,W as A,K as p,L as d,M as C,V as w,O as x,P as T,Q as b,U as R,S as I,X as v,e as N,Y as y,f as F,E as B,g as D,s as P,q as H,r as S,Z as L,N as X,h as $,j as U,k as j,R as q,_ as G}from"./p-d23bd169.js";import{C as K,D as M}from"./p-59e5ac12.js";
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */const O={[e]:r,[a]:n,[o]:h,[c]:u,[l]:E,[f]:m,[g]:A,[p]:d,[C]:w,[x]:T,[b]:R,[I]:v};class Q extends t{getAsnExtnValue(){return this.asn.values[0]}constructor(t){super(t,s);const e=this.getAsnExtnValue();try{const t=O[this.asn.type];if(t){this.value=i.parse(e,t)}else{console.warn(`Didn't detect parser for "${this.asn.type}" attribute.`);this.value=K.ToHex(e)}}catch(t){console.error(`Error parse "${this.asn.type}" attribute:`,t.message);this.value=K.ToHex(e)}}}
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */class V extends t{constructor(t){var s;super(N(t),y);this.thumbprints={};this.type="X.509 Attribute Certificate";const{acinfo:i}=this.asn;this.serialNumber=K.ToHex(i.serialNumber);this.version=i.version;const e=i.attrCertValidityPeriod.notBeforeTime;if(!e){throw new Error("Cannot get 'notBefore' value")}this.notBefore=e;const r=i.attrCertValidityPeriod.notAfterTime;if(!r){throw new Error("Cannot get 'notAfter' value")}this.notAfter=r;this.validity=F(this.notBefore,this.notAfter);this.issuer=i.issuer.v1Form||((s=i.issuer.v2Form)===null||s===void 0?void 0:s.issuerName);this.holder=i.holder}get signature(){const{signatureValue:t,signatureAlgorithm:s}=this.asn;return{value:t,algorithm:s.algorithm}}parseExtensions(){const{acinfo:t}=this.asn;if(t.extensions){this.extensions=t.extensions.map((t=>new B(D.serialize(t))))}}parseAttributes(){const{acinfo:t}=this.asn;if(t.attributes){this.attributes=t.attributes.map((t=>new Q(D.serialize(t))))}}async getThumbprint(t="SHA-1"){try{const s=await P(t,this.raw);if(s){this.thumbprints[t]=K.ToHex(s)}}catch(t){console.error("Error thumbprint get:",t)}}exportAsBase64(){return K.ToBase64(this.raw)}exportAsHexFormatted(){return H(K.ToHex(this.raw))}exportAsPemFormatted(){return`-----BEGIN ATTRIBUTE CERTIFICATE-----\n${S(this.exportAsBase64())}\n-----END ATTRIBUTE CERTIFICATE-----`}get commonName(){return`attribute-certificate-${this.thumbprints["SHA-1"]}`}downloadAsPEM(t){M.attrCert.asPEM(this.exportAsPemFormatted(),t||this.commonName)}downloadAsDER(t){M.attrCert.asDER(this.exportAsHexFormatted(),t||this.commonName)}}
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */class k extends t{constructor(t){super(N(t),L);this.thumbprints={};this.type="PKCS#10 Certificate Request";const{certificationRequestInfo:s}=this.asn;this.subject=new X(s.subject).toJSON();this.version=s.version}get publicKey(){const{subjectPublicKey:t,algorithm:s}=this.asn.certificationRequestInfo.subjectPKInfo;let i;if(s.algorithm===$&&s.parameters){i=D.parse(s.parameters,U)}if(s.algorithm===j){i=D.parse(t,q)}const e=D.serialize(this.asn.certificationRequestInfo.subjectPKInfo);return{params:i,value:e,algorithm:s.algorithm}}get signature(){const{signature:t,signatureAlgorithm:s}=this.asn;return{value:t,algorithm:s.algorithm}}get commonName(){if(!this.subject){return""}for(let t=0;t<this.subject.length;t+=1){const s=this.subject[t];if(s.shortName==="CN"||s.shortName==="E"||s.shortName==="O"){return s.value}}return""}async getThumbprint(t="SHA-1"){try{const s=await P(t,this.raw);if(s){this.thumbprints[t]=K.ToHex(s)}}catch(t){console.error("Error thumbprint get:",t)}}parseAttributes(){const{certificationRequestInfo:t}=this.asn;if(t.attributes){this.attributes=t.attributes.map((t=>new Q(D.serialize(t))));const s=this.attributes.find((t=>t.asn.type===I));if(s){this.extensions=s.value.map((t=>new B(D.serialize(t))))}}}exportAsBase64(){return K.ToBase64(this.raw)}exportAsHexFormatted(){return H(K.ToHex(this.raw))}exportAsPemFormatted(){return`-----BEGIN CERTIFICATE REQUEST-----\n${S(this.exportAsBase64())}\n-----END CERTIFICATE REQUEST-----`}downloadAsPEM(t){M.csr.asPEM(this.exportAsPemFormatted(),t||this.commonName)}downloadAsDER(t){M.csr.asDER(this.exportAsHexFormatted(),t||this.commonName)}}
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */class z extends t{constructor(t){super(N(t),G);this.thumbprints={};this.type="X.509 Certificate Revocation List";const{tbsCertList:s}=this.asn;this.issuer=new X(s.issuer).toJSON();this.version=s.version+1;this.lastUpdate=s.thisUpdate.getTime();this.nextUpdate=s.nextUpdate.getTime();this.revokedCertificates=(s.revokedCertificates||[]).map((t=>{var s;return{revocationDate:t.revocationDate,userCertificate:t.userCertificate,crlEntryExtensions:(s=t.crlEntryExtensions)===null||s===void 0?void 0:s.map((t=>new B(D.serialize(t))))}}))}async getThumbprint(t="SHA-1"){try{const s=await P(t,this.raw);if(s){this.thumbprints[t]=K.ToHex(s)}}catch(t){console.error("Error thumbprint get:",t)}}get signature(){const{signature:t,signatureAlgorithm:s}=this.asn;return{value:t,algorithm:s.algorithm}}get commonName(){if(!this.issuer){return""}for(let t=0;t<this.issuer.length;t+=1){const s=this.issuer[t];if(s.shortName==="CN"||s.shortName==="E"||s.shortName==="O"){return s.value}}return""}parseExtensions(){const{tbsCertList:t}=this.asn;if(t.crlExtensions){this.extensions=t.crlExtensions.map((t=>new B(D.serialize(t))))}}exportAsBase64(){return K.ToBase64(this.raw)}exportAsHexFormatted(){return H(K.ToHex(this.raw))}exportAsPemFormatted(){return`-----BEGIN X509 CRL-----\n${S(this.exportAsBase64())}\n-----END X509 CRL-----`}downloadAsPEM(t){M.crl.asPEM(this.exportAsPemFormatted(),t||this.commonName)}downloadAsDER(t){M.crl.asDER(this.exportAsHexFormatted(),t||this.commonName)}}export{k as C,V as X,z as a};
//# sourceMappingURL=p-3cd80744.js.map