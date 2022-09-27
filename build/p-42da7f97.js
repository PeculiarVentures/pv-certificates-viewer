/*!
 * © Peculiar Ventures https://peculiarventures.com/ - MIT License
 */
import{A as t,d as s,m as r,E as e,e as i,l as o,j as a,k as n}from"./p-464e0943.js";import{b as h}from"./p-006865d7.js";import{d as c}from"./p-4f4c1d30.js";import{A as u}from"./p-6c510523.js";
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */class m extends t{constructor(t){var e;super(s(t),r),this.thumbprints={},this.type="X.509 Attribute Certificate";const{acinfo:i}=this.asn;this.serialNumber=h.Convert.ToHex(i.serialNumber),this.version=i.version;const o=i.attrCertValidityPeriod.notBeforeTime;if(!o)throw new Error("Cannot get 'notBefore' value");this.notBefore=o;const a=i.attrCertValidityPeriod.notAfterTime;if(!a)throw new Error("Cannot get 'notAfter' value");this.notAfter=a,this.validity=c(this.notBefore,this.notAfter),this.issuer=i.issuer.v1Form||(null===(e=i.issuer.v2Form)||void 0===e?void 0:e.issuerName),this.holder=i.holder}get signature(){const{signatureValue:t,signatureAlgorithm:s}=this.asn;return{value:t,algorithm:s.algorithm}}parseExtensions(){const{acinfo:t}=this.asn;t.extensions&&(this.extensions=t.extensions.map((t=>new e(i.serialize(t)))))}parseAttributes(){const{acinfo:t}=this.asn;t.attributes&&(this.attributes=t.attributes.map((t=>new u(i.serialize(t)))))}async getThumbprint(t="SHA-1"){try{const s=await o(t,this.raw);s&&(this.thumbprints[t.name||t]=h.Convert.ToHex(s))}catch(t){console.error("Error thumbprint get:",t)}}exportAsBase64(){return h.Convert.ToBase64(this.raw)}exportAsHexFormatted(){return a(h.Convert.ToHex(this.raw))}exportAsPemFormatted(){return`-----BEGIN ATTRIBUTE CERTIFICATE-----\n${n(this.exportAsBase64())}\n-----END ATTRIBUTE CERTIFICATE-----`}get commonName(){return`attribute-certificate-${this.thumbprints["SHA-1"]}`}}export{m as X}