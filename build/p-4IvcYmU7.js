/*!
 * © Peculiar Ventures https://peculiarventures.com/ - MIT License
 */
import{A as s,q as t,r as a,s as i,U as e,t as r,V as n,I as h,W as o,u as c,T as u,v as l,w as f,x as m,y as g,b as p,z as b,B as d,F as w,G as A,H as y,J as E,K as x,L as P,M as R,O as q,Q as K,S,c as v,X as B,P as C,N as D,i as I,e as N,f as T,g as j,R as H,n as M,E as O,D as V}from"./p-BTbyumBe.js";
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */const $={[S]:g,[K]:m,[q]:f,[R]:l,[P]:u,[x]:c,[E]:o,[y]:h,[A]:n,[w]:r,[d]:e,[b]:i};class z extends s{getAsnExtnValue(){return this.asn.values[0]}constructor(s){super(s,t);const i=this.getAsnExtnValue();try{const s=$[this.asn.type];if(s){this.value=a.parse(i,s)}else{console.warn(`Didn't detect parser for "${this.asn.type}" attribute.`);this.value=p.Convert.ToHex(i)}}catch(s){console.error(`Error parse "${this.asn.type}" attribute:`,s.message);this.value=p.Convert.ToHex(i)}}}
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */class F extends s{constructor(s){super(v(s),B);this.thumbprints={};this.type="PKCS#10 Certificate Request";this.tag=C.CertificateRequestTag;const{certificationRequestInfo:t}=this.asn;this.subject=new D(t.subject).toJSON();this.version=t.version}get publicKey(){const{subjectPublicKey:s,algorithm:t}=this.asn.certificationRequestInfo.subjectPKInfo;let a;if(t.algorithm===I&&t.parameters){a=N.parse(t.parameters,T)}if(t.algorithm===j){a=N.parse(s,H)}const i=N.serialize(this.asn.certificationRequestInfo.subjectPKInfo);return{params:a,value:i,algorithm:t.algorithm}}get signature(){const{signature:s,signatureAlgorithm:t}=this.asn;return{value:s,algorithm:t.algorithm}}get commonName(){if(!this.subject){return""}for(let s=0;s<this.subject.length;s+=1){const t=this.subject[s];if(t.shortName==="CN"||t.shortName==="E"||t.shortName==="O"){return t.value}}return""}async getThumbprint(s="SHA-1"){try{const t=await M(s,this.raw);if(t){this.thumbprints[s]=p.Convert.ToHex(t)}}catch(s){console.error("Error thumbprint get:",s)}}parseAttributes(){const{certificationRequestInfo:s}=this.asn;if(s.attributes){this.attributes=s.attributes.map((s=>new z(N.serialize(s))));const t=this.attributes.find((s=>s.asn.type===b));if(t){this.extensions=t.value.map((s=>new O(N.serialize(s))))}}}toString(s="pem"){switch(s){case"pem":return C.encode(this.raw,this.tag);case"base64url":return p.Convert.ToBase64Url(this.raw);default:return p.Convert.ToBase64(this.raw)}}downloadAsPEM(s){V.csr.asPEM(this.toString("pem"),s||this.commonName)}downloadAsDER(s){V.csr.asDER(this.raw,s||this.commonName)}}export{z as A,F as P};
//# sourceMappingURL=p-4IvcYmU7.js.map