/*!
 * © Peculiar Ventures https://peculiarventures.com/ - MIT License
 */
import{A as s,n as t,o as a,p as e,q as r,E as i,e as h,r as n,U as c,s as o,t as u,u as b,V as m,v as l,I as p,w as g,W as E,x as k,y as f,z as A,T as x,B as C,D as I,F as R,G as T,H as d,J as w,K as y,L as F,d as N,M as j,N as q,f as K,g as S,h as v,R as B,l as H,j as P,k as U}from"./p-464e0943.js";import{b as D}from"./p-006865d7.js";
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */class G extends s{constructor(s){super(s,t);const N=this.getAsnExtnValue();switch(this.asn.type){case y:this.value=e.parse(N,F);break;case d:this.value=e.parse(N,w);break;case R:this.value=e.parse(N,T);break;case C:this.value=e.parse(N,I);break;case A:this.value=e.parse(N,x);break;case k:this.value=e.parse(N,f);break;case g:this.value=e.parse(N,E);break;case l:this.value=e.parse(N,p);break;case b:this.value=e.parse(N,m);break;case o:this.value=e.parse(N,u);break;case n:this.value=e.parse(N,c);break;case a:{const s=e.parse(N,r);this.value=s.map((s=>new i(h.serialize(s))));break}default:this.value=D.Convert.ToHex(N)}}getAsnExtnValue(){return this.asn.values[0]}}
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */class Q extends s{constructor(s){super(N(s),j),this.thumbprints={},this.type="PKCS#10 Certificate Request";const{certificationRequestInfo:t}=this.asn;this.subject=new q(t.subject).toJSON(),this.version=t.version}get publicKey(){const{subjectPublicKey:s,algorithm:t}=this.asn.certificationRequestInfo.subjectPKInfo;let a;return t.algorithm===K&&t.parameters&&(a=h.parse(t.parameters,S)),t.algorithm===v&&(a=h.parse(s,B)),{params:a,value:h.serialize(this.asn.certificationRequestInfo.subjectPKInfo),algorithm:t.algorithm}}get signature(){const{signature:s,signatureAlgorithm:t}=this.asn;return{value:s,algorithm:t.algorithm}}get commonName(){if(!this.subject)return"";for(let s=0;s<this.subject.length;s+=1){const t=this.subject[s];if("CN"===t.shortName||"E"===t.shortName||"O"===t.shortName)return t.value}return""}async getThumbprint(s="SHA-1"){try{const t=await H(s,this.raw);t&&(this.thumbprints[s.name||s]=D.Convert.ToHex(t))}catch(s){console.error("Error thumbprint get:",s)}}parseAttributes(){const{certificationRequestInfo:s}=this.asn;s.attributes&&(this.attributes=s.attributes.map((s=>new G(h.serialize(s)))))}exportAsBase64(){return D.Convert.ToBase64(this.raw)}exportAsHexFormatted(){return P(D.Convert.ToHex(this.raw))}exportAsPemFormatted(){return`-----BEGIN CERTIFICATE REQUEST-----\n${U(this.exportAsBase64())}\n-----END CERTIFICATE REQUEST-----`}}export{G as A,Q as C}