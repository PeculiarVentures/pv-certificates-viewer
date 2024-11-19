/*!
 * © Peculiar Ventures https://peculiarventures.com/ - MIT License
 */
import{A as t,v as s,H as i,P as e,C as r,N as n,J as a,G as h,y as o,x as u,z as c,B as f,R as l,K as g,L as m,M as b,O as p,Q as w,F as C,D as E}from"./p-bfbdf73e.js";
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */class d extends t{constructor(t){super(s(t),i);this.thumbprints={};this.type="X.509 Certificate";this.tag=e.CertificateTag;const{tbsCertificate:h}=this.asn;this.serialNumber=r.ToHex(h.serialNumber);this.subject=new n(h.subject).toJSON();this.issuer=new n(h.issuer).toJSON();this.version=h.version+1;const o=h.validity.notBefore.utcTime||h.validity.notBefore.generalTime;if(!o){throw new Error("Cannot get 'notBefore' value")}this.notBefore=o;const u=h.validity.notAfter.utcTime||h.validity.notAfter.generalTime;if(!u){throw new Error("Cannot get 'notAfter' value")}this.notAfter=u;this.validity=a(this.notBefore,this.notAfter)}parseExtensions(){const{tbsCertificate:t}=this.asn;if(t.extensions){this.extensions=t.extensions.map((t=>new h(o.serialize(t))))}}getPublicKeyInfo(t){const{subjectPublicKey:s,algorithm:i}=t;let e;if(i.algorithm===u&&i.parameters){e=o.parse(i.parameters,c)}if(i.algorithm===f){e=o.parse(s,l)}if(i.algorithm===g){e=o.parse(s,m);e=e.map((t=>this.getPublicKeyInfo(t)))}const r=o.serialize(t);return{params:e,value:r,algorithm:i.algorithm}}get publicKey(){return this.getPublicKeyInfo(this.asn.tbsCertificate.subjectPublicKeyInfo)}get signature(){const{signatureValue:t,signatureAlgorithm:s}=this.asn;let i;if(s.algorithm===b){const e=o.parse(t,p);const r=o.parse(s.parameters,w);i=r.map(((t,s)=>Object.assign(Object.assign({},t),{value:e[s]})))}return{params:i,value:t,algorithm:s.algorithm}}async getThumbprint(t="SHA-1"){try{const s=await C(t,this.raw);if(s){this.thumbprints[t]=r.ToHex(s)}}catch(t){console.error("Error thumbprint get:",t)}}get commonName(){if(!this.subject){return""}for(let t=0;t<this.subject.length;t+=1){const s=this.subject[t];if(s.shortName==="CN"||s.shortName==="E"||s.shortName==="O"){return s.value}}return""}get issuerCommonName(){if(!this.issuer){return""}for(let t=0;t<this.issuer.length;t+=1){const s=this.issuer[t];if(s.shortName==="CN"){return s.value}if(s.shortName==="E"){return s.value}}return""}get isRoot(){return JSON.stringify(this.issuer)===JSON.stringify(this.subject)}subjectToString(){if(!this.subject){return""}return this.subject.map((t=>`${t.shortName}=${t.value}`)).join(", ")}issuerToString(){if(!this.issuer){return""}return this.issuer.map((t=>`${t.shortName}=${t.value}`)).join(", ")}toString(t="pem"){switch(t){case"pem":return e.encode(this.raw,this.tag);case"base64url":return r.ToBase64Url(this.raw);default:return r.ToBase64(this.raw)}}downloadAsPEM(t){E.cert.asPEM(this.toString("pem"),t||this.commonName)}downloadAsDER(t){E.cert.asDER(this.raw,t||this.commonName)}}export{d as X};
//# sourceMappingURL=p-a35f15b3.js.map