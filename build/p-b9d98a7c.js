/*!
 * © Peculiar Ventures https://peculiarventures.com/ - MIT License
 */
import{A as s,a as t,b as a,C as i,i as e,c as r,e as n,f as h,g as o,h as c,j as u,k as l,l as f,T as m,m as p,n as g,o as E,W as b,p as d,I as A,q as w,V as x,r as R,s as y,t as C,U as I,u as N,E as T,v as $,w as q,N as D,x as P,y as S,z as j,B as v,R as K,F as B,G as F,H as G,J as H,D as U}from"./p-63baaa17.js";
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */const V={[e]:r,[n]:h,[o]:c,[u]:l,[f]:m,[p]:g,[E]:b,[d]:A,[w]:x,[R]:y,[C]:I,[N]:T};class k extends s{getAsnExtnValue(){return this.asn.values[0]}constructor(s){super(s,t);const e=this.getAsnExtnValue();try{const s=V[this.asn.type];if(s){this.value=a.parse(e,s)}else{console.warn(`Didn't detect parser for "${this.asn.type}" attribute.`);this.value=i.ToHex(e)}}catch(s){console.error(`Error parse "${this.asn.type}" attribute:`,s.message);this.value=i.ToHex(e)}}}
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */class z extends s{constructor(s){super($(s),q);this.thumbprints={};this.type="PKCS#10 Certificate Request";this.tag="CERTIFICATE REQUEST";const{certificationRequestInfo:t}=this.asn;this.subject=new D(t.subject).toJSON();this.version=t.version}get publicKey(){const{subjectPublicKey:s,algorithm:t}=this.asn.certificationRequestInfo.subjectPKInfo;let a;if(t.algorithm===P&&t.parameters){a=S.parse(t.parameters,j)}if(t.algorithm===v){a=S.parse(s,K)}const i=S.serialize(this.asn.certificationRequestInfo.subjectPKInfo);return{params:a,value:i,algorithm:t.algorithm}}get signature(){const{signature:s,signatureAlgorithm:t}=this.asn;return{value:s,algorithm:t.algorithm}}get commonName(){if(!this.subject){return""}for(let s=0;s<this.subject.length;s+=1){const t=this.subject[s];if(t.shortName==="CN"||t.shortName==="E"||t.shortName==="O"){return t.value}}return""}async getThumbprint(s="SHA-1"){try{const t=await B(s,this.raw);if(t){this.thumbprints[s]=i.ToHex(t)}}catch(s){console.error("Error thumbprint get:",s)}}parseAttributes(){const{certificationRequestInfo:s}=this.asn;if(s.attributes){this.attributes=s.attributes.map((s=>new k(S.serialize(s))));const t=this.attributes.find((s=>s.asn.type===N));if(t){this.extensions=t.value.map((s=>new F(S.serialize(s))))}}}toString(s="pem"){switch(s){case"hex":return H(i.ToHex(this.raw));case"pem":return`-----BEGIN ${this.tag}-----\n${G(this.toString("base64"))}\n-----END ${this.tag}-----`;default:return i.ToBase64(this.raw)}}downloadAsPEM(s){U.csr.asPEM(this.toString("pem"),s||this.commonName)}downloadAsDER(s){U.csr.asDER(this.toString("hex"),s||this.commonName)}}export{k as A,z as P};
//# sourceMappingURL=p-b9d98a7c.js.map