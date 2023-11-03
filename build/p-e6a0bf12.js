/*!
 * © Peculiar Ventures https://peculiarventures.com/ - MIT License
 */
import{a9 as t,ad as s,D as i,b1 as e}from"./p-5b9ad1b8.js";import{A as r,s as a,t as n,D as o,u as h,v as c,w as u,x as l,y as E,z as f,B as m,T as g,F as p,G as A,H as d,W as b,I as w,J as x,K as C,V as T,L as R,M as I,O as v,U as N,P as y,Q as F,e as B,S as D,f as P,E as H,g as S,r as L,p as X,q as $,X as U,N as j,h as q,j as G,k as K,R as M}from"./p-b37f6bb8.js";
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */const O={[n]:o,[h]:c,[u]:l,[E]:f,[m]:g,[p]:A,[d]:b,[w]:x,[C]:T,[R]:I,[v]:N,[y]:F};class Q extends r{getAsnExtnValue(){return this.asn.values[0]}constructor(i){super(i,t);const e=this.getAsnExtnValue();try{const t=O[this.asn.type];if(t){this.value=a.parse(e,t)}else{console.warn(`Didn't detect parser for "${this.asn.type}" attribute.`);this.value=s.ToHex(e)}}catch(t){console.error(`Error parse "${this.asn.type}" attribute:`,t.message);this.value=s.ToHex(e)}}}
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */class V extends r{constructor(t){var i;super(B(t),D);this.thumbprints={};this.type="X.509 Attribute Certificate";const{acinfo:e}=this.asn;this.serialNumber=s.ToHex(e.serialNumber);this.version=e.version;const r=e.attrCertValidityPeriod.notBeforeTime;if(!r){throw new Error("Cannot get 'notBefore' value")}this.notBefore=r;const a=e.attrCertValidityPeriod.notAfterTime;if(!a){throw new Error("Cannot get 'notAfter' value")}this.notAfter=a;this.validity=P(this.notBefore,this.notAfter);this.issuer=e.issuer.v1Form||((i=e.issuer.v2Form)===null||i===void 0?void 0:i.issuerName);this.holder=e.holder}get signature(){const{signatureValue:t,signatureAlgorithm:s}=this.asn;return{value:t,algorithm:s.algorithm}}parseExtensions(){const{acinfo:t}=this.asn;if(t.extensions){this.extensions=t.extensions.map((t=>new H(S.serialize(t))))}}parseAttributes(){const{acinfo:t}=this.asn;if(t.attributes){this.attributes=t.attributes.map((t=>new Q(S.serialize(t))))}}async getThumbprint(t="SHA-1"){try{const i=await L(t,this.raw);if(i){this.thumbprints[t]=s.ToHex(i)}}catch(t){console.error("Error thumbprint get:",t)}}exportAsBase64(){return s.ToBase64(this.raw)}exportAsHexFormatted(){return X(s.ToHex(this.raw))}exportAsPemFormatted(){return`-----BEGIN ATTRIBUTE CERTIFICATE-----\n${$(this.exportAsBase64())}\n-----END ATTRIBUTE CERTIFICATE-----`}get commonName(){return`attribute-certificate-${this.thumbprints["SHA-1"]}`}downloadAsPEM(t){i.attrCert.asPEM(this.exportAsPemFormatted(),t||this.commonName)}downloadAsDER(t){i.attrCert.asDER(this.exportAsHexFormatted(),t||this.commonName)}}
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */class k extends r{constructor(t){super(B(t),U);this.thumbprints={};this.type="PKCS#10 Certificate Request";const{certificationRequestInfo:s}=this.asn;this.subject=new j(s.subject).toJSON();this.version=s.version}get publicKey(){const{subjectPublicKey:t,algorithm:s}=this.asn.certificationRequestInfo.subjectPKInfo;let i;if(s.algorithm===q&&s.parameters){i=S.parse(s.parameters,G)}if(s.algorithm===K){i=S.parse(t,M)}const e=S.serialize(this.asn.certificationRequestInfo.subjectPKInfo);return{params:i,value:e,algorithm:s.algorithm}}get signature(){const{signature:t,signatureAlgorithm:s}=this.asn;return{value:t,algorithm:s.algorithm}}get commonName(){if(!this.subject){return""}for(let t=0;t<this.subject.length;t+=1){const s=this.subject[t];if(s.shortName==="CN"||s.shortName==="E"||s.shortName==="O"){return s.value}}return""}async getThumbprint(t="SHA-1"){try{const i=await L(t,this.raw);if(i){this.thumbprints[t]=s.ToHex(i)}}catch(t){console.error("Error thumbprint get:",t)}}parseAttributes(){const{certificationRequestInfo:t}=this.asn;if(t.attributes){this.attributes=t.attributes.map((t=>new Q(S.serialize(t))));const s=this.attributes.find((t=>t.asn.type===y));if(s){this.extensions=s.value.map((t=>new H(S.serialize(t))))}}}exportAsBase64(){return s.ToBase64(this.raw)}exportAsHexFormatted(){return X(s.ToHex(this.raw))}exportAsPemFormatted(){return`-----BEGIN CERTIFICATE REQUEST-----\n${$(this.exportAsBase64())}\n-----END CERTIFICATE REQUEST-----`}downloadAsPEM(t){i.csr.asPEM(this.exportAsPemFormatted(),t||this.commonName)}downloadAsDER(t){i.csr.asDER(this.exportAsHexFormatted(),t||this.commonName)}}
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */class z extends r{constructor(t){super(B(t),e);this.thumbprints={};this.type="X.509 Certificate Revocation List";const{tbsCertList:s}=this.asn;this.issuer=new j(s.issuer).toJSON();this.version=s.version+1;this.lastUpdate=s.thisUpdate.getTime();this.nextUpdate=s.nextUpdate.getTime();this.revokedCertificates=(s.revokedCertificates||[]).map((t=>{var s;return{revocationDate:t.revocationDate,userCertificate:t.userCertificate,crlEntryExtensions:(s=t.crlEntryExtensions)===null||s===void 0?void 0:s.map((t=>new H(S.serialize(t))))}}))}async getThumbprint(t="SHA-1"){try{const i=await L(t,this.raw);if(i){this.thumbprints[t]=s.ToHex(i)}}catch(t){console.error("Error thumbprint get:",t)}}get signature(){const{signature:t,signatureAlgorithm:s}=this.asn;return{value:t,algorithm:s.algorithm}}get commonName(){if(!this.issuer){return""}for(let t=0;t<this.issuer.length;t+=1){const s=this.issuer[t];if(s.shortName==="CN"||s.shortName==="E"||s.shortName==="O"){return s.value}}return""}parseExtensions(){const{tbsCertList:t}=this.asn;if(t.crlExtensions){this.extensions=t.crlExtensions.map((t=>new H(S.serialize(t))))}}exportAsBase64(){return s.ToBase64(this.raw)}exportAsHexFormatted(){return X(s.ToHex(this.raw))}exportAsPemFormatted(){return`-----BEGIN X509 CRL-----\n${$(this.exportAsBase64())}\n-----END X509 CRL-----`}downloadAsPEM(t){i.crl.asPEM(this.exportAsPemFormatted(),t||this.commonName)}downloadAsDER(t){i.crl.asDER(this.exportAsHexFormatted(),t||this.commonName)}}export{k as C,V as X,z as a};
//# sourceMappingURL=p-e6a0bf12.js.map