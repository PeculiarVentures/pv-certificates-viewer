/*!
 * © Peculiar Ventures https://peculiarventures.com/ - MIT License
 */
import{A as t,c as s,C as i,P as e,N as r,i as a,a as h,E as n,b as o,R as c,g as u,e as l,p as m,D as g}from"./p-B7MG4079.js";
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */class p extends t{constructor(t){super(s(t),i),this.thumbprints={},this.type="PKCS#10 Certificate Request",this.tag=e.CertificateRequestTag;const{certificationRequestInfo:a}=this.asn;this.subject=r.parse(a.subject),this.version=a.version}get publicKey(){const{subjectPublicKey:t,algorithm:s}=this.asn.certificationRequestInfo.subjectPKInfo;let i;return s.algorithm===a&&s.parameters&&(i=h.parse(s.parameters,n)),s.algorithm===o&&(i=h.parse(t,c)),{params:i,value:h.serialize(this.asn.certificationRequestInfo.subjectPKInfo),algorithm:s.algorithm}}get signature(){const{signature:t,signatureAlgorithm:s}=this.asn;return{value:t,algorithm:s.algorithm}}get commonName(){if(!this.subject)return"";for(let t=0;t<this.subject.length;t+=1){const s=this.subject[t];if("CN"===s.short||"E"===s.short||"O"===s.short)return s.value}return""}async getThumbprint(t="SHA-1"){try{const s=await u(t,this.raw);s&&(this.thumbprints[t]=l.Convert.ToHex(s))}catch(t){console.error("Error thumbprint get:",t)}}parseAttributes(){const{certificationRequestInfo:t}=this.asn;t.attributes&&(this.attributes=t.attributes.map(m))}toString(t="pem"){switch(t){case"pem":return e.encode(this.raw,this.tag);case"base64url":return l.Convert.ToBase64Url(this.raw);default:return l.Convert.ToBase64(this.raw)}}downloadAsPEM(t){g.csr.asPEM(this.toString("pem"),t||this.commonName)}downloadAsDER(t){g.csr.asDER(this.raw,t||this.commonName)}}export{p as P}