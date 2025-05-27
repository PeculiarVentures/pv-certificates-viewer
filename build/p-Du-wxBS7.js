/*!
 * © Peculiar Ventures https://peculiarventures.com/ - MIT License
 */
import{A as s,q as t,r as a,s as i,U as e,t as r,V as n,I as h,W as o,u as c,T as u,v as l,w as f,x as g,y as m,b as p,z as b,B as d,F as w,G as A,H as E,J as y,K as q,L as x,M as P,O as R,Q as C,S as K,c as S,X as v,P as D,N as I,i as M,e as N,f as W,g as j,R as H,n as O,E as T,D as V}from"./p-CqWMnb1W.js";
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */const $={[K]:m,[C]:g,[R]:f,[P]:l,[x]:u,[q]:c,[y]:o,[E]:h,[A]:n,[w]:r,[d]:e,[b]:i};class z extends s{getAsnExtnValue(){return this.asn.values[0]}constructor(s){super(s,t);const i=this.getAsnExtnValue();try{const s=$[this.asn.type];if(s){this.value=a.parse(i,s)}else{console.warn(`Didn't detect parser for "${this.asn.type}" attribute.`);this.value=p.Convert.ToHex(i)}}catch(s){console.error(`Error parse "${this.asn.type}" attribute:`,s.message);this.value=p.Convert.ToHex(i)}}}
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */class B extends s{constructor(s){super(S(s),v);this.thumbprints={};this.type="PKCS#10 Certificate Request";this.tag=D.CertificateRequestTag;const{certificationRequestInfo:t}=this.asn;this.subject=new I(t.subject).toJSON();this.version=t.version}get publicKey(){const{subjectPublicKey:s,algorithm:t}=this.asn.certificationRequestInfo.subjectPKInfo;let a;if(t.algorithm===M&&t.parameters){a=N.parse(t.parameters,W)}if(t.algorithm===j){a=N.parse(s,H)}const i=N.serialize(this.asn.certificationRequestInfo.subjectPKInfo);return{params:a,value:i,algorithm:t.algorithm}}get signature(){const{signature:s,signatureAlgorithm:t}=this.asn;return{value:s,algorithm:t.algorithm}}get commonName(){if(!this.subject){return""}for(let s=0;s<this.subject.length;s+=1){const t=this.subject[s];if(t.shortName==="CN"||t.shortName==="E"||t.shortName==="O"){return t.value}}return""}async getThumbprint(s="SHA-1"){try{const t=await O(s,this.raw);if(t){this.thumbprints[s]=p.Convert.ToHex(t)}}catch(s){console.error("Error thumbprint get:",s)}}parseAttributes(){const{certificationRequestInfo:s}=this.asn;if(s.attributes){this.attributes=s.attributes.map((s=>new z(N.serialize(s))));const t=this.attributes.find((s=>s.asn.type===b));if(t){this.extensions=t.value.map((s=>new T(N.serialize(s))))}}}toString(s="pem"){switch(s){case"pem":return D.encode(this.raw,this.tag);case"base64url":return p.Convert.ToBase64Url(this.raw);default:return p.Convert.ToBase64(this.raw)}}downloadAsPEM(s){V.csr.asPEM(this.toString("pem"),s||this.commonName)}downloadAsDER(s){V.csr.asDER(this.raw,s||this.commonName)}}export{z as A,B as P};
//# sourceMappingURL=p-Du-wxBS7.js.map