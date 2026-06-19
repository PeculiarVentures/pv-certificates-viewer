/*!
 * © Peculiar Ventures https://peculiarventures.com/ - MIT License
 */
import{A as t,c as s,C as i,P as e,N as r,i as a,a as h,E as n,b as o,R as c,g as u,e as l,p as m,D as f}from"./p-BMLZ9T_R.js";
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */class g extends t{constructor(t){super(s(t),i);this.thumbprints={};this.type="PKCS#10 Certificate Request";this.tag=e.CertificateRequestTag;const{certificationRequestInfo:a}=this.asn;this.subject=r.parse(a.subject);this.version=a.version}get publicKey(){const{subjectPublicKey:t,algorithm:s}=this.asn.certificationRequestInfo.subjectPKInfo;let i;if(s.algorithm===a&&s.parameters){i=h.parse(s.parameters,n)}if(s.algorithm===o){i=h.parse(t,c)}const e=h.serialize(this.asn.certificationRequestInfo.subjectPKInfo);return{params:i,value:e,algorithm:s.algorithm}}get signature(){const{signature:t,signatureAlgorithm:s}=this.asn;return{value:t,algorithm:s.algorithm}}get commonName(){if(!this.subject){return""}for(let t=0;t<this.subject.length;t+=1){const s=this.subject[t];if(s.short==="CN"||s.short==="E"||s.short==="O"){return s.value}}return""}async getThumbprint(t="SHA-1"){try{const s=await u(t,this.raw);if(s){this.thumbprints[t]=l.Convert.ToHex(s)}}catch(t){console.error("Error thumbprint get:",t)}}parseAttributes(){const{certificationRequestInfo:t}=this.asn;if(t.attributes){this.attributes=t.attributes.map(m)}}toString(t="pem"){switch(t){case"pem":return e.encode(this.raw,this.tag);case"base64url":return l.Convert.ToBase64Url(this.raw);default:return l.Convert.ToBase64(this.raw)}}downloadAsPEM(t){f.csr.asPEM(this.toString("pem"),t||this.commonName)}downloadAsDER(t){f.csr.asDER(this.raw,t||this.commonName)}}export{g as P};
//# sourceMappingURL=p-D91simah.js.map