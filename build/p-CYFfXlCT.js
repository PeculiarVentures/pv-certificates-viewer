/*!
 * © Peculiar Ventures https://peculiarventures.com/ - MIT License
 */
import{A as s,p as t,q as a,r as e,s as i,U as r,t as n,V as o,I as h,W as c,u,T as l,v as f,w as m,x as p,y as g,b,z as d,B as A,F as w,G as y,H as E,J as x,K,L as P,M as R,O as q,Q as S,S as v,X as C,c as D,Y as I,P as N,N as T,i as j,e as z,E as H,f as M,R as O,m as V,D as $}from"./p-rmToyzuK.js";
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */const B={[C]:g,[v]:p,[S]:m,[q]:f,[R]:l,[P]:u,[K]:c,[x]:h,[E]:o,[y]:n,[w]:r,[A]:i,[d]:e};class F extends s{getAsnExtnValue(){return this.asn.values[0]}constructor(s){super(s,t);const e=this.getAsnExtnValue();try{const s=B[this.asn.type];if(s){this.value=a.parse(e,s)}else{console.warn(`Didn't detect parser for "${this.asn.type}" attribute.`);this.value=b.Convert.ToHex(e)}}catch(s){console.error(`Error parse "${this.asn.type}" attribute:`,s.message);this.value=b.Convert.ToHex(e)}}}
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */class G extends s{constructor(s){super(D(s),I);this.thumbprints={};this.type="PKCS#10 Certificate Request";this.tag=N.CertificateRequestTag;const{certificationRequestInfo:t}=this.asn;this.subject=new T(t.subject).toJSON();this.version=t.version}get publicKey(){const{subjectPublicKey:s,algorithm:t}=this.asn.certificationRequestInfo.subjectPKInfo;let a;if(t.algorithm===j&&t.parameters){a=z.parse(t.parameters,H)}if(t.algorithm===M){a=z.parse(s,O)}const e=z.serialize(this.asn.certificationRequestInfo.subjectPKInfo);return{params:a,value:e,algorithm:t.algorithm}}get signature(){const{signature:s,signatureAlgorithm:t}=this.asn;return{value:s,algorithm:t.algorithm}}get commonName(){if(!this.subject){return""}for(let s=0;s<this.subject.length;s+=1){const t=this.subject[s];if(t.shortName==="CN"||t.shortName==="E"||t.shortName==="O"){return t.value}}return""}async getThumbprint(s="SHA-1"){try{const t=await V(s,this.raw);if(t){this.thumbprints[s]=b.Convert.ToHex(t)}}catch(s){console.error("Error thumbprint get:",s)}}parseAttributes(){const{certificationRequestInfo:s}=this.asn;if(s.attributes){this.attributes=s.attributes.map((s=>new F(z.serialize(s))))}}toString(s="pem"){switch(s){case"pem":return N.encode(this.raw,this.tag);case"base64url":return b.Convert.ToBase64Url(this.raw);default:return b.Convert.ToBase64(this.raw)}}downloadAsPEM(s){$.csr.asPEM(this.toString("pem"),s||this.commonName)}downloadAsDER(s){$.csr.asDER(this.raw,s||this.commonName)}}export{F as A,G as P};
//# sourceMappingURL=p-CYFfXlCT.js.map