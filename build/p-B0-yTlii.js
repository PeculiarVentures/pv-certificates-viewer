/*!
 * © Peculiar Ventures https://peculiarventures.com/ - MIT License
 */
import{A as s,p as t,q as a,r as e,s as i,U as r,t as n,V as o,I as h,W as c,u,T as l,v as f,w as m,x as p,y as g,b,z as d,B as A,F as w,G as E,H as y,J as x,K as P,L as R,M as q,O as D,Q as K,S,X as v,c as C,Y as I,P as N,N as j,i as F,e as H,E as M,f as O,R as Q,m as T,D as V}from"./p-DlZsmFQf.js";
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */const $={[v]:g,[S]:p,[K]:m,[D]:f,[q]:l,[R]:u,[P]:c,[x]:h,[y]:o,[E]:n,[w]:r,[A]:i,[d]:e};class z extends s{getAsnExtnValue(){return this.asn.values[0]}constructor(s){super(s,t);const e=this.getAsnExtnValue();try{const s=$[this.asn.type];if(s){this.value=a.parse(e,s)}else{console.warn(`Didn't detect parser for "${this.asn.type}" attribute.`);this.value=b.Convert.ToHex(e)}}catch(s){console.error(`Error parse "${this.asn.type}" attribute:`,s.message);this.value=b.Convert.ToHex(e)}}}
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */class B extends s{constructor(s){super(C(s),I);this.thumbprints={};this.type="PKCS#10 Certificate Request";this.tag=N.CertificateRequestTag;const{certificationRequestInfo:t}=this.asn;this.subject=new j(t.subject).toJSON();this.version=t.version}get publicKey(){const{subjectPublicKey:s,algorithm:t}=this.asn.certificationRequestInfo.subjectPKInfo;let a;if(t.algorithm===F&&t.parameters){a=H.parse(t.parameters,M)}if(t.algorithm===O){a=H.parse(s,Q)}const e=H.serialize(this.asn.certificationRequestInfo.subjectPKInfo);return{params:a,value:e,algorithm:t.algorithm}}get signature(){const{signature:s,signatureAlgorithm:t}=this.asn;return{value:s,algorithm:t.algorithm}}get commonName(){if(!this.subject){return""}for(let s=0;s<this.subject.length;s+=1){const t=this.subject[s];if(t.shortName==="CN"||t.shortName==="E"||t.shortName==="O"){return t.value}}return""}async getThumbprint(s="SHA-1"){try{const t=await T(s,this.raw);if(t){this.thumbprints[s]=b.Convert.ToHex(t)}}catch(s){console.error("Error thumbprint get:",s)}}parseAttributes(){const{certificationRequestInfo:s}=this.asn;if(s.attributes){this.attributes=s.attributes.map((s=>new z(H.serialize(s))))}}toString(s="pem"){switch(s){case"pem":return N.encode(this.raw,this.tag);case"base64url":return b.Convert.ToBase64Url(this.raw);default:return b.Convert.ToBase64(this.raw)}}downloadAsPEM(s){V.csr.asPEM(this.toString("pem"),s||this.commonName)}downloadAsDER(s){V.csr.asDER(this.raw,s||this.commonName)}}export{z as A,B as P};
//# sourceMappingURL=p-B0-yTlii.js.map