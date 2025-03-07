/*!
 * © Peculiar Ventures https://peculiarventures.com/ - MIT License
 */
import{A as s,a as t,b as a,C as i,i as e,c as r,e as n,f as h,g as o,h as c,j as u,k as l,l as f,T as m,m as p,n as g,o as b,W as d,p as w,I as A,q as E,V as y,r as x,s as P,t as R,U as q,u as C,E as j,v,w as D,P as I,N as K,x as N,y as S,z as T,B as V,R as $,F as k,G as z,D as B}from"./p-03b5ad4d.js";
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */const F={[e]:r,[n]:h,[o]:c,[u]:l,[f]:m,[p]:g,[b]:d,[w]:A,[E]:y,[x]:P,[R]:q,[C]:j};class G extends s{getAsnExtnValue(){return this.asn.values[0]}constructor(s){super(s,t);const e=this.getAsnExtnValue();try{const s=F[this.asn.type];if(s){this.value=a.parse(e,s)}else{console.warn(`Didn't detect parser for "${this.asn.type}" attribute.`);this.value=i.ToHex(e)}}catch(s){console.error(`Error parse "${this.asn.type}" attribute:`,s.message);this.value=i.ToHex(e)}}}
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */class H extends s{constructor(s){super(v(s),D);this.thumbprints={};this.type="PKCS#10 Certificate Request";this.tag=I.CertificateRequestTag;const{certificationRequestInfo:t}=this.asn;this.subject=new K(t.subject).toJSON();this.version=t.version}get publicKey(){const{subjectPublicKey:s,algorithm:t}=this.asn.certificationRequestInfo.subjectPKInfo;let a;if(t.algorithm===N&&t.parameters){a=S.parse(t.parameters,T)}if(t.algorithm===V){a=S.parse(s,$)}const i=S.serialize(this.asn.certificationRequestInfo.subjectPKInfo);return{params:a,value:i,algorithm:t.algorithm}}get signature(){const{signature:s,signatureAlgorithm:t}=this.asn;return{value:s,algorithm:t.algorithm}}get commonName(){if(!this.subject){return""}for(let s=0;s<this.subject.length;s+=1){const t=this.subject[s];if(t.shortName==="CN"||t.shortName==="E"||t.shortName==="O"){return t.value}}return""}async getThumbprint(s="SHA-1"){try{const t=await k(s,this.raw);if(t){this.thumbprints[s]=i.ToHex(t)}}catch(s){console.error("Error thumbprint get:",s)}}parseAttributes(){const{certificationRequestInfo:s}=this.asn;if(s.attributes){this.attributes=s.attributes.map((s=>new G(S.serialize(s))));const t=this.attributes.find((s=>s.asn.type===C));if(t){this.extensions=t.value.map((s=>new z(S.serialize(s))))}}}toString(s="pem"){switch(s){case"pem":return I.encode(this.raw,this.tag);case"base64url":return i.ToBase64Url(this.raw);default:return i.ToBase64(this.raw)}}downloadAsPEM(s){B.csr.asPEM(this.toString("pem"),s||this.commonName)}downloadAsDER(s){B.csr.asDER(this.raw,s||this.commonName)}}export{G as A,H as P};
//# sourceMappingURL=p-d5821585.js.map