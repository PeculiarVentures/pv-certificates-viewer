var __extends=this&&this.__extends||function(){var e=function(t,i){e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var i in t)if(t.hasOwnProperty(i))e[i]=t[i]};return e(t,i)};return function(t,i){e(t,i);function r(){this.constructor=t}t.prototype=i===null?Object.create(i):(r.prototype=i.prototype,new r)}}();var __awaiter=this&&this.__awaiter||function(e,t,i,r){function n(e){return e instanceof i?e:new i((function(t){t(e)}))}return new(i||(i=Promise))((function(i,a){function o(e){try{c(r.next(e))}catch(t){a(t)}}function s(e){try{c(r["throw"](e))}catch(t){a(t)}}function c(e){e.done?i(e.value):n(e.value).then(o,s)}c((r=r.apply(e,t||[])).next())}))};var __generator=this&&this.__generator||function(e,t){var i={label:0,sent:function(){if(a[0]&1)throw a[1];return a[1]},trys:[],ops:[]},r,n,a,o;return o={next:s(0),throw:s(1),return:s(2)},typeof Symbol==="function"&&(o[Symbol.iterator]=function(){return this}),o;function s(e){return function(t){return c([e,t])}}function c(o){if(r)throw new TypeError("Generator is already executing.");while(i)try{if(r=1,n&&(a=o[0]&2?n["return"]:o[0]?n["throw"]||((a=n["return"])&&a.call(n),0):n.next)&&!(a=a.call(n,o[1])).done)return a;if(n=0,a)o=[o[0]&2,a.value];switch(o[0]){case 0:case 1:a=o;break;case 4:i.label++;return{value:o[1],done:false};case 5:i.label++;n=o[1];o=[0];continue;case 7:o=i.ops.pop();i.trys.pop();continue;default:if(!(a=i.trys,a=a.length>0&&a[a.length-1])&&(o[0]===6||o[0]===2)){i=0;continue}if(o[0]===3&&(!a||o[1]>a[0]&&o[1]<a[3])){i.label=o[1];break}if(o[0]===6&&i.label<a[1]){i.label=a[1];a=o;break}if(a&&i.label<a[2]){i.label=a[2];i.ops.push(o);break}if(a[2])i.ops.pop();i.trys.pop();continue}o=t.call(e,i)}catch(s){o=[6,s];n=0}finally{r=a=0}if(o[0]&5)throw o[1];return{value:o[0]?o[1]:void 0,done:true}}};System.register(["./p-9f815f76.system.js","./p-bd1f9066.system.js","./p-6639fba3.system.js"],(function(e){"use strict";var t,i,r,n,a,o,s,c,l,u,d,f,p,b,h,g,v,m,x,y,w,k,S,_,I,D,C,A,L,N,z,j,P,T,E,K,O,H,R,V,B,G,q,F,M,U,Y,Q,X,J,W,Z,$,ee,te,ie,re,ne,ae,oe,se,ce,le,ue,de,fe,pe,be,he,ge,ve,me,xe,ye,we,ke,Se,_e,Ie,De,Ce,Ae,Le,Ne,ze,je,Pe,Te,Ee,Ke,Oe,He,Re,Ve;return{setters:[function(e){t=e.h;i=e.r;r=e.H;n=e.c},function(e){a=e.d;o=e.l;s=e.a;c=e.h},function(e){l=e.A;u=e.a;d=e.b;f=e.i;p=e.c;b=e.E;h=e.d;g=e.e;v=e.f;m=e.U;x=e.g;y=e.C;w=e.h;k=e.V;S=e.j;_=e.I;I=e.k;D=e.W;C=e.l;A=e.m;L=e.n;N=e.T;z=e.o;j=e.D;P=e.p;T=e.q;E=e.r;K=e.s;O=e.t;H=e.u;R=e.v;V=e.w;B=e.x;G=e.y;q=e.z;F=e.B;M=e.N;U=e.F;Y=e.G;Q=e.H;X=e.R;J=e.O;W=e.J;Z=e.K;$=e.L;ee=e.M;te=e.P;ie=e.Q;re=e.S;ne=e.X;ae=e.Y;oe=e.Z;se=e._;ce=e.$;le=e.a0;ue=e.a1;de=e.a2;fe=e.a3;pe=e.a4;be=e.a5;he=e.a6;ge=e.a7;ve=e.a8;me=e.a9;xe=e.aa;ye=e.ab;we=e.ac;ke=e.ad;Se=e.ae;_e=e.af;Ie=e.ag;De=e.ah;Ce=e.ai;Ae=e.aj;Le=e.ak;Ne=e.al;ze=e.am;je=e.an;Pe=e.ao;Te=e.ap;Ee=e.aq;Ke=e.ar;Oe=e.as;He=e.at;Re=e.au;Ve=e.av}],execute:function(){
/**
             * @license
             * Copyright (c) Peculiar Ventures, LLC.
             *
             * This source code is licensed under the MIT license found in the
             * LICENSE file in the root directory of this source tree.
             */
function Be(e){return new Promise((function(t,i){var r=new FileReader;r.onload=function(){return t({value:r.result,fileName:e.name,fileSize:e.size,sourceMime:e.type})};r.onerror=function(){return i(r.error)};r.readAsBinaryString(e)}))}
/**
             * @license
             * Copyright (c) Peculiar Ventures, LLC.
             *
             * This source code is licensed under the MIT license found in the
             * LICENSE file in the root directory of this source tree.
             */var Ge=function(e){__extends(t,e);function t(t){var i=e.call(this,t,u)||this;var r=i.getAsnExtnValue();switch(i.asn.type){case O:i.value=p.parse(r,H);break;case E:i.value=p.parse(r,K);break;case P:i.value=p.parse(r,T);break;case z:i.value=p.parse(r,j);break;case L:i.value=p.parse(r,N);break;case C:i.value=p.parse(r,A);break;case I:i.value=p.parse(r,D);break;case S:i.value=p.parse(r,_);break;case w:i.value=p.parse(r,k);break;case x:i.value=p.parse(r,y);break;case v:i.value=p.parse(r,m);break;case f:{var n=p.parse(r,b);i.value=n.map((function(e){return new h(g.serialize(e))}));break}default:i.value=d.ToHex(r)}return i}t.prototype.getAsnExtnValue=function(){return this.asn.values[0]};return t}(l);
/**
             * @license
             * Copyright (c) Peculiar Ventures, LLC.
             *
             * This source code is licensed under the MIT license found in the
             * LICENSE file in the root directory of this source tree.
             */var qe=function(e){__extends(t,e);function t(t){var i=this;var r;i=e.call(this,R(t),V)||this;i.thumbprints={};i.type="X.509 Attribute Certificate";var n=i.asn.acinfo;i.serialNumber=d.ToHex(n.serialNumber);i.version=n.version;var o=n.attrCertValidityPeriod.notBeforeTime;if(!o){throw new Error("Cannot get 'notBefore' value")}i.notBefore=o;var s=n.attrCertValidityPeriod.notAfterTime;if(!s){throw new Error("Cannot get 'notAfter' value")}i.notAfter=s;i.validity=a(i.notBefore,i.notAfter);i.issuer=n.issuer.v1Form||((r=n.issuer.v2Form)===null||r===void 0?void 0:r.issuerName);i.holder=n.holder;return i}Object.defineProperty(t.prototype,"signature",{get:function(){var e=this.asn,t=e.signatureValue,i=e.signatureAlgorithm;return{value:t,algorithm:i.algorithm}},enumerable:false,configurable:true});t.prototype.parseExtensions=function(){var e=this.asn.acinfo;if(e.extensions){this.extensions=e.extensions.map((function(e){return new h(g.serialize(e))}))}};t.prototype.parseAttributes=function(){var e=this.asn.acinfo;if(e.attributes){this.attributes=e.attributes.map((function(e){return new Ge(g.serialize(e))}))}};t.prototype.getThumbprint=function(e){if(e===void 0){e="SHA-1"}return __awaiter(this,void 0,void 0,(function(){var t,i;return __generator(this,(function(r){switch(r.label){case 0:r.trys.push([0,2,,3]);return[4,B(e,this.raw)];case 1:t=r.sent();this.thumbprints[e["name"]||e]=d.ToHex(t);return[3,3];case 2:i=r.sent();console.error("Error thumbprint get:",i);return[3,3];case 3:return[2]}}))}))};t.prototype.exportAsBase64=function(){return d.ToBase64(this.raw)};t.prototype.exportAsHexFormatted=function(){return G(d.ToHex(this.raw))};t.prototype.exportAsPemFormatted=function(){return"-----BEGIN ATTRIBUTE CERTIFICATE-----\n"+q(this.exportAsBase64())+"\n-----END ATTRIBUTE CERTIFICATE-----"};Object.defineProperty(t.prototype,"commonName",{get:function(){return"attribute-certificate-"+this.thumbprints["SHA-1"]},enumerable:false,configurable:true});return t}(l);
/**
             * @license
             * Copyright (c) Peculiar Ventures, LLC.
             *
             * This source code is licensed under the MIT license found in the
             * LICENSE file in the root directory of this source tree.
             */var Fe=function(e){__extends(t,e);function t(t){var i=e.call(this,R(t),F)||this;i.thumbprints={};i.type="PKCS#10 Certificate Request";var r=i.asn.certificationRequestInfo;i.subject=new M(r.subject).toJSON();i.version=r.version;return i}Object.defineProperty(t.prototype,"publicKey",{get:function(){var e=this.asn.certificationRequestInfo.subjectPKInfo,t=e.subjectPublicKey,i=e.algorithm;var r;if(i.algorithm===U&&i.parameters){r=g.parse(i.parameters,Y)}if(i.algorithm===Q){r=g.parse(t,X)}var n=g.serialize(this.asn.certificationRequestInfo.subjectPKInfo);return{params:r,value:n,algorithm:i.algorithm}},enumerable:false,configurable:true});Object.defineProperty(t.prototype,"signature",{get:function(){var e=this.asn,t=e.signature,i=e.signatureAlgorithm;return{value:t,algorithm:i.algorithm}},enumerable:false,configurable:true});Object.defineProperty(t.prototype,"commonName",{get:function(){if(!this.subject){return""}for(var e=0;e<this.subject.length;e+=1){var t=this.subject[e];if(t.shortName==="CN"||t.shortName==="E"||t.shortName==="O"){return t.value}}return""},enumerable:false,configurable:true});t.prototype.getThumbprint=function(e){if(e===void 0){e="SHA-1"}return __awaiter(this,void 0,void 0,(function(){var t,i;return __generator(this,(function(r){switch(r.label){case 0:r.trys.push([0,2,,3]);return[4,B(e,this.raw)];case 1:t=r.sent();this.thumbprints[e["name"]||e]=d.ToHex(t);return[3,3];case 2:i=r.sent();console.error("Error thumbprint get:",i);return[3,3];case 3:return[2]}}))}))};t.prototype.parseAttributes=function(){var e=this.asn.certificationRequestInfo;if(e.attributes){this.attributes=e.attributes.map((function(e){return new Ge(g.serialize(e))}))}};t.prototype.exportAsBase64=function(){return d.ToBase64(this.raw)};t.prototype.exportAsHexFormatted=function(){return G(d.ToHex(this.raw))};t.prototype.exportAsPemFormatted=function(){return"-----BEGIN CERTIFICATE REQUEST-----\n"+q(this.exportAsBase64())+"\n-----END CERTIFICATE REQUEST-----"};return t}(l);
/**
             * @license
             * Copyright (c) Peculiar Ventures, LLC.
             *
             * This source code is licensed under the MIT license found in the
             * LICENSE file in the root directory of this source tree.
             */function Me(e){var t=J[e];if(t){return t+" ("+e+")"}return e}
/**
             * @license
             * Copyright (c) Peculiar Ventures, LLC.
             *
             * This source code is licensed under the MIT license found in the
             * LICENSE file in the root directory of this source tree.
             */function Ue(e){return e.indexOf("http")===0}
/**
             * @license
             * Copyright (c) Peculiar Ventures, LLC.
             *
             * This source code is licensed under the MIT license found in the
             * LICENSE file in the root directory of this source tree.
             */var Ye=function(e){var i=e.value;if(!i){return null}return t("tr",{class:"title"},t("td",{colSpan:2},t("peculiar-typography",{type:"h6"},i)))};var Qe=function(e){var i=e.name,r=e.value,n=e.monospace,a=e.collapse,o=e.href,s=e.extraValue;if(!i){return null}if(r===undefined||r===null){return null}var c;if(a){c=t("peculiar-text-hider",null,r)}else{c=r}var l=!!r.toString();return t("tr",null,t("td",{colSpan:l?1:2},t("peculiar-typography",{color:"grey_5"},i,l?":":"")),l&&t("td",{class:{monospace:n}},Ue(r.toString())||o?t("peculiar-link",{href:o||r.toString()},r):t("peculiar-typography",{monospace:n},c,s)))};
/**
             * @license
             * Copyright (c) Peculiar Ventures, LLC.
             *
             * This source code is licensed under the MIT license found in the
             * LICENSE file in the root directory of this source tree.
             */var Xe=function(e){var i=e.signature;if(!i){return null}return[t(Ye,{value:o.getString("signature")}),t(Qe,{name:o.getString("algorithm"),value:Me(i.algorithm)}),t(Qe,{name:o.getString("value"),value:d.ToHex(i.value),monospace:true,collapse:true})]};
/**
             * @license
             * Copyright (c) Peculiar Ventures, LLC.
             *
             * This source code is licensed under the MIT license found in the
             * LICENSE file in the root directory of this source tree.
             */var Je=function(e,i){var r=e.attribute;return[t(Qe,{name:"Name",value:Me(r.asn.type)}),i,t("tr",null,t("td",{colSpan:2,class:"divider"},t("span",{class:"bg_fill"})))]};
/**
             * @license
             * Copyright (c) Peculiar Ventures, LLC.
             *
             * This source code is licensed under the MIT license found in the
             * LICENSE file in the root directory of this source tree.
             */var We=function(e){var i=e.name;if(!i){return null}return i.map((function(e){return e.map((function(e){return t(Qe,{name:J[e.type]||e.type,value:e.value.toString()})}))}))};
/**
             * @license
             * Copyright (c) Peculiar Ventures, LLC.
             *
             * This source code is licensed under the MIT license found in the
             * LICENSE file in the root directory of this source tree.
             */var Ze=function(e){var i=e.attribute;return t(Je,{attribute:i},t(We,{name:i.value}))};
/**
             * @license
             * Copyright (c) Peculiar Ventures, LLC.
             *
             * This source code is licensed under the MIT license found in the
             * LICENSE file in the root directory of this source tree.
             */var $e={otherName:"Other Name",rfc822Name:"RFC 822 Name",dNSName:"DNS Name",x400Address:"X400 Address",directoryName:"Directory Name",ediPartyName:"Edi Party Name ",uniformResourceIdentifier:"URI",iPAddress:"IP Address",registeredID:"Registered ID"};var et=function(e){var i=e.generalName,r=e.getDNSNameLink,n=e.getIPAddressLink;if(!i){return null}return Object.keys(i).map((function(e){var a=i[e];if(a instanceof W){return[t(Qe,{name:$e[e]||e,value:""}),a.map((function(e){return e.map((function(e){return t(Qe,{name:J[e.type]||e.type,value:e.value.toString()})}))}))]}if(a instanceof Z){try{var o=p.parse(a.value,$);return t(Qe,{name:J[a.typeId]||a.typeId,value:o.toString()})}catch(s){}try{var o=p.parse(a.value,ee);if(o.explicitText){return t(Qe,{name:J[a.typeId]||a.typeId,value:o.explicitText.toString()})}}catch(s){}return t(Qe,{name:J[a.typeId]||a.typeId,value:d.ToHex(a.value),monospace:true})}if(te.isBufferSource(a)){return t(Qe,{name:$e[e]||e,value:d.ToString(a)})}if(a instanceof ie){return t(Qe,{name:$e[e]||e,value:d.ToString(a.partyName)})}if(e==="dNSName"){return t(Qe,{name:$e[e]||e,value:a,href:r(a)})}if(e==="iPAddress"){return t(Qe,{name:$e[e]||e,value:a,href:n(a)})}return t(Qe,{name:$e[e]||e,value:a})}))};
/**
             * @license
             * Copyright (c) Peculiar Ventures, LLC.
             *
             * This source code is licensed under the MIT license found in the
             * LICENSE file in the root directory of this source tree.
             */var tt=function(e){var i=e.attribute;return t(Je,{attribute:i},t(Qe,{name:"Code Authority",value:""}),t(et,{generalName:i.value.codeAuthority,getDNSNameLink:function(){return""},getIPAddressLink:function(){return""}}),t(Qe,{name:"Code Id",value:""}),t(et,{generalName:i.value.codeId,getDNSNameLink:function(){return""},getIPAddressLink:function(){return""}}),t(Qe,{name:"Short Name",value:i.value.shortName}),t(Qe,{name:"Short Description",value:i.value.shortDescription}))};
/**
             * @license
             * Copyright (c) Peculiar Ventures, LLC.
             *
             * This source code is licensed under the MIT license found in the
             * LICENSE file in the root directory of this source tree.
             */var it=function(e){var i=e.attribute;return t(Je,{attribute:i},t(Qe,{name:"Assessment Authority",value:""}),t(et,{generalName:i.value.assessmentAuthority,getDNSNameLink:function(){return""},getIPAddressLink:function(){return""}}),t(Qe,{name:"Assessment Location",value:""}),t(et,{generalName:i.value.assessmentLocation,getDNSNameLink:function(){return""},getIPAddressLink:function(){return""}}),t(Qe,{name:"Assessment Ref",value:""}),t(et,{generalName:i.value.assessmentRef,getDNSNameLink:function(){return""},getIPAddressLink:function(){return""}}),t(Qe,{name:"Data Storage Territory",value:i.value.dataStorageTerritory}),t(Qe,{name:"Description",value:i.value.description}))};
/**
             * @license
             * Copyright (c) Peculiar Ventures, LLC.
             *
             * This source code is licensed under the MIT license found in the
             * LICENSE file in the root directory of this source tree.
             */var rt=function(e){var i=e.attribute;var r=i.value.base+" * 10^"+i.value.degree+" "+i.value.location;return t(Je,{attribute:i},t(Qe,{name:"Value",value:r}))};
/**
             * @license
             * Copyright (c) Peculiar Ventures, LLC.
             *
             * This source code is licensed under the MIT license found in the
             * LICENSE file in the root directory of this source tree.
             */var nt=function(e){var i=e.attribute;return t(Je,{attribute:i},Object.keys(i.value).map((function(e){return t(Qe,{name:e,value:i.value[e].toNumber()?"YES":"NO"})})))};
/**
             * @license
             * Copyright (c) Peculiar Ventures, LLC.
             *
             * This source code is licensed under the MIT license found in the
             * LICENSE file in the root directory of this source tree.
             */var at=function(e){var t=1;if(e/100>1){t=100}else if(e/10>1){t=10}return e+"/"+5*t};var ot=function(e){var i=e.attribute;var r=Object.keys(i.value).map((function(e){return[at(i.value[e]),t("br",null)]}));return t(Je,{attribute:i},t(Qe,{name:"Value",value:r}))};
/**
             * @license
             * Copyright (c) Peculiar Ventures, LLC.
             *
             * This source code is licensed under the MIT license found in the
             * LICENSE file in the root directory of this source tree.
             */var st=function(e){var i=e.attribute;return t(Je,{attribute:i},t(Qe,{name:"Value",value:i.value,monospace:true}))};
/**
             * @license
             * Copyright (c) Peculiar Ventures, LLC.
             *
             * This source code is licensed under the MIT license found in the
             * LICENSE file in the root directory of this source tree.
             */var ct=function(e){var i=e.attribute;return t(Je,{attribute:i},t(Qe,{name:"Value",value:i.value.utf8String}))};
/**
             * @license
             * Copyright (c) Peculiar Ventures, LLC.
             *
             * This source code is licensed under the MIT license found in the
             * LICENSE file in the root directory of this source tree.
             */var lt=function(e){var i=e.attribute;return t(Je,{attribute:i},t(Qe,{name:"Value",value:i.value.toString()}))};
/**
             * @license
             * Copyright (c) Peculiar Ventures, LLC.
             *
             * This source code is licensed under the MIT license found in the
             * LICENSE file in the root directory of this source tree.
             */var ut=function(e){var i=e.attributes;if(!i||!i.length){return null}return[t(Ye,{value:"Attributes"}),i.map((function(e){try{if(e.value instanceof W){return t(Ze,{attribute:e})}if(e.value instanceof A){return t(tt,{attribute:e})}if(e.value instanceof D){return t(it,{attribute:e})}if(e.value instanceof _){return t(rt,{attribute:e})}if(e.value instanceof N){return t(nt,{attribute:e})}if(e.value instanceof k){return t(ot,{attribute:e})}if(e.value instanceof m){return t(ct,{attribute:e})}if(e.value instanceof y){return t(lt,{attribute:e})}if(typeof e.value==="string"){return t(st,{attribute:e})}return t(Je,{attribute:e})}catch(i){console.error("Error render attribute:",e.asn.type);return null}}))]};
/**
             * @license
             * Copyright (c) Peculiar Ventures, LLC.
             *
             * This source code is licensed under the MIT license found in the
             * LICENSE file in the root directory of this source tree.
             */var dt=function(e){var i=e.thumbprints;if(!i){return null}var r=Object.keys(i);if(!r.length){return null}return[t(Ye,{value:o.getString("fingerprints")}),r.map((function(e){return t(Qe,{name:e,value:i[e],monospace:true})}))]};
/**
             * @license
             * Copyright (c) Peculiar Ventures, LLC.
             *
             * This source code is licensed under the MIT license found in the
             * LICENSE file in the root directory of this source tree.
             */var ft=function(e,i){var r=e.extension;return[t(Qe,{name:"Name",value:Me(r.asn.extnID)}),t(Qe,{name:"Critical",value:r.asn.critical?"YES":"NO"}),i,t("tr",null,t("td",{colSpan:2,class:"divider"},t("span",{class:"bg_fill"})))]};
/**
             * @license
             * Copyright (c) Peculiar Ventures, LLC.
             *
             * This source code is licensed under the MIT license found in the
             * LICENSE file in the root directory of this source tree.
             */var pt=function(e){var i=e.extension;return t(ft,{extension:i},t(Qe,{name:"Usage",value:i.value.toJSON().join(", ")}))};
/**
             * @license
             * Copyright (c) Peculiar Ventures, LLC.
             *
             * This source code is licensed under the MIT license found in the
             * LICENSE file in the root directory of this source tree.
             */var bt=function(e){var i=e.extension;return t(ft,{extension:i},t(Qe,{name:"Certificate Authority",value:i.value.cA?"YES":"NO"}),t(Qe,{name:"Path Length Constraint",value:i.value.pathLenConstraint}))};
/**
             * @license
             * Copyright (c) Peculiar Ventures, LLC.
             *
             * This source code is licensed under the MIT license found in the
             * LICENSE file in the root directory of this source tree.
             */var ht=function(e){var i=e.extension;return t(ft,{extension:i},i.value.map((function(e,i){return t(Qe,{name:"Purpose #"+(i+1),value:Me(e)})})))};
/**
             * @license
             * Copyright (c) Peculiar Ventures, LLC.
             *
             * This source code is licensed under the MIT license found in the
             * LICENSE file in the root directory of this source tree.
             */var gt=function(e){var i=e.extension,r=e.getSubjectKeyIdChildrenLink,n=e.getSubjectKeyIdSiblingsLink;var a=d.ToHex(i.value.buffer);var o=r(a);var s=n(a);return t(ft,{extension:i},t(Qe,{name:"Key ID",value:a,monospace:true,extraValue:[o&&t("span",null," [",t("peculiar-link",{href:o},"children"),"]"),s&&t("span",null," [",t("peculiar-link",{href:s},"siblings"),"]")]}))};
/**
             * @license
             * Copyright (c) Peculiar Ventures, LLC.
             *
             * This source code is licensed under the MIT license found in the
             * LICENSE file in the root directory of this source tree.
             */var vt=function(e){var i=e.extension,r=e.getAuthKeyIdParentLink,n=e.getAuthKeyIdSiblingsLink;var a=d.ToHex(i.value.keyIdentifier.buffer);var o=r(a);var s=n(a);return t(ft,{extension:i},t(Qe,{name:"Key ID",value:a,monospace:true,extraValue:[o&&t("span",null," [",t("peculiar-link",{href:o},"parents"),"]"),s&&t("span",null," [",t("peculiar-link",{href:s},"siblings"),"]")]}))};
/**
             * @license
             * Copyright (c) Peculiar Ventures, LLC.
             *
             * This source code is licensed under the MIT license found in the
             * LICENSE file in the root directory of this source tree.
             */var mt=function(e){var i=e.extension;return t(ft,{extension:i},i.value.map((function(i){var r,n;return[(r=i.distributionPoint)===null||r===void 0?void 0:r.fullName.map((function(i){return t(et,Object.assign({generalName:i},e))})),(n=i.cRLIssuer)===null||n===void 0?void 0:n.map((function(i){return t(et,Object.assign({generalName:i},e))}))]})))};
/**
             * @license
             * Copyright (c) Peculiar Ventures, LLC.
             *
             * This source code is licensed under the MIT license found in the
             * LICENSE file in the root directory of this source tree.
             */var xt=function(e){var i=e.extension;return t(ft,{extension:i},i.value.map((function(i,r){return[t(Qe,{name:"Description #"+(r+1),value:""}),t(Qe,{name:"Method",value:Me(i.accessMethod)}),t(et,Object.assign({generalName:i.accessLocation},e))]})))};
/**
             * @license
             * Copyright (c) Peculiar Ventures, LLC.
             *
             * This source code is licensed under the MIT license found in the
             * LICENSE file in the root directory of this source tree.
             */var yt=function(e){var i=e.extension;return t(ft,{extension:i},i.value.map((function(i){return t(et,Object.assign({generalName:i},e))})))};
/**
             * @license
             * Copyright (c) Peculiar Ventures, LLC.
             *
             * This source code is licensed under the MIT license found in the
             * LICENSE file in the root directory of this source tree.
             */var wt=function(e){var i=e.extension;return t(ft,{extension:i},i.value.map((function(e,i){var r;return[t(Qe,{name:"Policy #"+(i+1),value:""}),t(Qe,{name:"ID",value:Me(e.policyIdentifier)}),(r=e.policyQualifiers)===null||r===void 0?void 0:r.map((function(e,r){var n=[t(Qe,{name:"Qualifier #"+(i+1)+"."+(r+1),value:""}),t(Qe,{name:"ID",value:Me(e.policyQualifierId)})];if(e.policyQualifierId==="1.3.6.1.5.5.7.2.1"){var a=p.parse(e.qualifier,$);n.push(t(Qe,{name:"Value",value:a.toString()}))}if(e.policyQualifierId==="1.3.6.1.5.5.7.2.2"){var a=p.parse(e.qualifier,ee);if(a.explicitText){n.push(t(Qe,{name:"Value",value:a.explicitText.toString()}))}}return n}))]})))};
/**
             * @license
             * Copyright (c) Peculiar Ventures, LLC.
             *
             * This source code is licensed under the MIT license found in the
             * LICENSE file in the root directory of this source tree.
             */var kt={"9606c02c690033aa1d145f59c6e2648d0549f0df96aab8db915a70d8ecf390a5":"Akamai CT","39376f545f7b4607f59742d768cd5d2437bf3473b6534a4834bcf72e681c83c9":"Alpha CT",a577ac9ced7548dd8f025b67a241089df86e0f476ec203c2ecbedb185f282638:"CNNIC CT",cdb5179b7fc1c046feea31136a3f8f002e6182faf8896fecc8b2f5b5ab604900:"Certly.IO","1fbc36e002ede97f40199e86b3573b8a4217d80187746ad0da03a06054d20df4":"Cloudflare “Nimbus2017”",db74afeecb29ecb1feca3e716d2ce5b9aabb36f7847183c75d9d4f37b61fbf64:"Cloudflare “Nimbus2018”","747eda8331ad331091219cce254f4270c2bffd5e422008c6373579e6107bcc56":"Cloudflare “Nimbus2019”","5ea773f9df56c0e7b536487dd049e0327a919a0c84a112128418759681714558":"Cloudflare “Nimbus2020”","4494652eb0eeceafc44007d8a8fe28c0dae682bed8cb31b53fd33396b5b681a8":"Cloudflare “Nimbus2021”","41c8cab1df22464a10c6a13a0942875e4e318b1b03ebeb4bc768f090629606f6":"Cloudflare “Nimbus2022”","7a328c54d8b72db620ea38e0521ee98416703213854d3bd22bc13a57a352eb52":"Cloudflare “Nimbus2023”","6ff141b5647e4222f7ef052cefae7c21fd608e27d2af5a6e9f4b8a37d6633ee5":"DigiCert Nessie2018",fe446108b1d01ab78a62ccfeab6ab2b2babff3abdad80a4d8b30df2d0008830c:"DigiCert Nessie2019",c652a0ec48ceb3fcab170992c43a87413309e80065a26252401ba3362a17c565:"DigiCert Nessie2020",eec095ee8d72640f92e3c3b91bc712a3696a097b4b6a1a1438e647b2cbedc5f9:"DigiCert Nessie2021","51a3b0f5fd01799c566db837788f0ca47acc1b27cbf79e88429a0dfed48b05e5":"DigiCert Nessie2022",b3737707e18450f86386d605a9dc11094a792db1670c0b87dcf0030e7936a59a:"DigiCert Nessie2023","5614069a2fd7c2ecd3f5e1bd44b23ec74676b9bc99115cc0ef949855d689d0dd":"DigiCert Server","8775bfe7597cf88c43995fbdf36eff568d475636ff4ab560c1b4eaff5ea0830f":"DigiCert Server 2",c1164ae0a772d2d4392dc80ac10770d4f0c49bde991a4840c1fa075164f63360:"DigiCert Yeti2018",e2694bae26e8e94009e8861bb63b83d43ee7fe7488fba48f2893019dddf1dbfe:"DigiCert Yeti2019",f095a459f200d18240102d2f93888ead4bfe1d47e399e1d034a6b0a8aa8eb273:"DigiCert Yeti2020","5cdc4392fee6ab4544b15e9ad456e61037fbd5fa47dca17394b25ee6f6c70eca":"DigiCert Yeti2021","2245450759552456963fa12ff1f76d86e0232663adc04b7f5dc6835c6ee20f02":"DigiCert Yeti2022","35cf191bbfb16c57bf0fad4c6d42cbbbb627202651ea3fe12aefa803c33bd64c":"DigiCert Yeti2023","717ea7420975be84a2723553f1777c26dd51af4e102144094d9019b462fb6668":"GDCA 1","14308d90ccd030135005c01ca526d81e84e87624e39b6248e08f724aea3bb42a":"GDCA 2",c9cf890a21109c666cc17a3ed065c930d0e0135a9feba85af14210b8072421aa:"GDCA CT #1","924a30f909336ff435d6993a10ac75a2c641728e7fc2d659ae6188ffad40ce01":"GDCA CT #2",fad4c97cc49ee2f8ac85c5ea5cea09d0220dbbf4e49c6b50662ff868f86b8c28:"Google “Argon2017”",a4501269055a15545e6211ab37bc103f62ae5576a45e4b1714453e1b22106a25:"Google “Argon2018”","63f2dbcde83bcc2ccf0b728427576b33a48d61778fbd75a638b1c768544bd88d":"Google “Argon2019”",b21e05cc8ba2cd8a204e8766f92bb98a2520676bdafa70e7b249532def8b905e:"Google “Argon2020”",f65c942fd1773022145418083094568ee34d131933bfdf0c2f200bcc4ef164e3:"Google “Argon2021”","2979bef09e393921f056739f63a577e5be577d9c600af8f94d5d265c255dc784":"Google “Argon2022”","68f698f81f6482be3a8ceeb9281d4cfc71515d6793d444d10a67acbb4f4ffbc4":"Google “Aviator”",c3bf03a7e1ca8841c607bae3ff4270fca5ec45b186ebbe4e2cf3fc778630f5f6:"Google “Crucible”","1d024b8eb1498b344dfd87ea3efc0996f7506f235d1d497061a4773c439c25fb":"Google “Daedalus”","293c519654c83965baaa50fc5807d4b76fbf587a2972dca4c30cf4e54547f478":"Google “Icarus”",a4b90990b418581487bb13a2cc67700a3c359804f91bdfb8e377cd0ec80ddc10:"Google “Pilot”",ee4bbdb775ce60bae142691fabe19e66a30f7e5fb072d88300c47b897aa8fdcb:"Google “Rocketeer”",bbd9dfbc1f8a71b593942397aa927b473857950aab52e81a909664368e1ed185:"Google “Skydiver”","52eb4b225ec896974850675f23e43bc1d021e3214ce52ecd5fa87c203cdfca03":"Google “Solera2018”","0b760e9a8b9a682f88985b15e947501a56446bba8830785c3842994386450c00":"Google “Solera2019”","1fc72ce5a1b799f400c359bff96ca3913548e8644220610952e9ba1774f7bac7":"Google “Solera2020”",a3c99845e80ab7ce00157b3742df0207dd272b2b602ecf98ee2c12db9c5ae7e7:"Google “Solera2021”","697aafca1a6b536fae21205046debad7e0eaea13d2432e6e9d8fb379f2b9aaf3":"Google “Solera2022”",a899d8780c9290aaf462f31880ccfbd52451e970d0fbf591ef75b0d99b645681:"Google “Submariner”",b0cc83e5a5f97d6baf7c09cc284904872ac7e88b132c6350b7c6fd26e16c6c77:"Google “Testtube”",b10cd559a6d67846811f7df9a51532739ac48d703bea0323da5d38755bc0ad4e:"Google “Xenon2018”","084114980071532c16190460bcfc47fdc2653afa292c72b37ff863ae29ccc9f0":"Google “Xenon2019”","07b75c1be57d68fff1b0c61d2315c7bae6577c5794b76aeebc613a1a69d3a21c":"Google “Xenon2020”","7d3ef2f88fff88556824c2c0ca9e5289792bc50e78097f2e6a9768997e22f0d7":"Google “Xenon2021”","46a555eb75fa912030b5a28969f4f37d112c4174befd49b885abf2fc70fe6d47":"Google “Xenon2022”","7461b4a09cfb3d41d75159575b2e7649a445a8d27709b0cc564a6482b7eb41a3":"Izenpe","8941449c70742e06b9fc9ce7b116ba0024aa36d59af44f0204404f00f7ea8566":"Izenpe “Argi”","296afa2d568bca0d2ea844956ae9721fc35fa355ecda99693aafd458a71aefdd":"Let“s Encrypt ”Clicky”","537b69a3564335a9c04904e39593b2c298eb8d7a6e83023635c627248cd6b440":"Nordu “flimsy”",aae70b7f3cb8d566c86c2f16979c9f445f69ab0eb4535589b2f77a030104f3cd:"Nordu “plausible”",e0127629e90496564e3d0147984498aa48f8adb16600eb7902a1ef9909906273:"PuChuangSiDa CT",cf55e28923497c340d5206d05353aeb25834b52f1f8dc9526809f212efdd7ca6:"SHECA CT 1","32dc59c2d4c41968d56e14bc61ac8f0e45db39faf3c155aa4252f5001fa0c623":"SHECA CT 2",db76fdadac65e7d09508886e2159bd8b90352f5fead3e3dc5e22eb350acc7b98:"Sectigo (Comodo) “Dodo” CT","6f5376ac31f03119d89900a45115ff77151c11d902c10029068db2089a37d913":"Sectigo (Comodo) “Mammoth” CT","5581d4c2169036014aea0b9b573c53f0c0e43878702508172fa3aa1d0713d30c":"Sectigo (Comodo) “Sabre” CT","34bb6ad6c3df9c03eea8a499ff7891486c9d5e5cac92d01f7bfd1bce19db48ef":"StartCom",ddeb1d2b7a0d4fa6208b81ad8168707e2e8e9d01d55c888d3d11c4cdb6ecbecc:"Symantec",a7ce4a4e6207e0addee5fdaa4b1f86768767b5d002a55d47310e7e670a95eab2:"Symantec Deneb","15970488d7b997a05beb52512adee8d2e8b4a3165264121a9fabfbd5f85ad93f":"Symantec “Sirius”",bc78e1dfc5f63c684649334da10fa15f0979692009c081b4f3f6917f3ed9b8a5:"Symantec “Vega”",b0b784bc81c0ddc47544e883f05985bb9077d134d8ab88b2b2e533980b8e508b:"Up In The Air “Behind the Sofa”",ac3b9aed7fa9674757159e6d7d575672f9d98100941e9bdeffeca1313b75782d:"Venafi","03019df3fd85a69a8ebd1facc6da9ba73e469774fe77f579fc5a08b8328c1d6b":"Venafi Gen2 CT","41b2dc2e89e63ce4af1ba7bb29bf68c6dee6f9f1cc047e30dffae3b3ba259263":"WoSign","63d0006026dde10bb0601f452446965ee2b6ea2cd4fbc95ac866a550af9075b7":"WoSign 2","9e4ff73dc3ce220b69217c899e468076abf8d78636d5ccfc85a31a75628ba88b":"WoSign CT #1"};
/**
             * @license
             * Copyright (c) Peculiar Ventures, LLC.
             *
             * This source code is licensed under the MIT license found in the
             * LICENSE file in the root directory of this source tree.
             */var St=function(e){var i=e.extension;return t(ft,{extension:i},i.value.toJSON().map((function(e,i){return[t(Qe,{name:"SCT #"+(i+1),value:""}),t(Qe,{name:"Version",value:e.version+1}),t(Qe,{name:"Log Operator",value:kt[e.logId]||e.logId}),t(Qe,{name:"Log Key ID",value:e.logId,monospace:true}),t(Qe,{name:"Timestamp",value:s(e.timestamp)}),t(Qe,{name:"Signature Algorithm",value:(e.hashAlgorithm+" "+e.signatureAlgorithm).toUpperCase()}),t(Qe,{name:"Signature",value:e.signature,monospace:true})]})))};
/**
             * @license
             * Copyright (c) Peculiar Ventures, LLC.
             *
             * This source code is licensed under the MIT license found in the
             * LICENSE file in the root directory of this source tree.
             */var _t=function(e){var i,r;var n=e.extension;return t(ft,{extension:n},(i=n.value.excludedSubtrees)===null||i===void 0?void 0:i.map((function(i){return t(et,Object.assign({generalName:i.base},e))})),(r=n.value.permittedSubtrees)===null||r===void 0?void 0:r.map((function(i){return t(et,Object.assign({generalName:i.base},e))})))};
/**
             * @license
             * Copyright (c) Peculiar Ventures, LLC.
             *
             * This source code is licensed under the MIT license found in the
             * LICENSE file in the root directory of this source tree.
             */var It=function(e){var i=e.extension;return t(ft,{extension:i},t(Qe,{name:"Template ID",value:i.value.templateID}),t(Qe,{name:"Template Major Version",value:i.value.templateMajorVersion}),t(Qe,{name:"Template Minor Version",value:i.value.templateMinorVersion}))};
/**
             * @license
             * Copyright (c) Peculiar Ventures, LLC.
             *
             * This source code is licensed under the MIT license found in the
             * LICENSE file in the root directory of this source tree.
             */var Dt=function(e){var i=e.extension;return t(ft,{extension:i},t(Qe,{name:"Name",value:i.value.toString()}))};
/**
             * @license
             * Copyright (c) Peculiar Ventures, LLC.
             *
             * This source code is licensed under the MIT license found in the
             * LICENSE file in the root directory of this source tree.
             */var Ct=function(e){var i=e.extension;var r=i.value.getVersion();return t(ft,{extension:i},t(Qe,{name:"Certificate Index",value:r.certificateIndex}),t(Qe,{name:"Key Index",value:r.keyIndex}))};
/**
             * @license
             * Copyright (c) Peculiar Ventures, LLC.
             *
             * This source code is licensed under the MIT license found in the
             * LICENSE file in the root directory of this source tree.
             */var At=function(e){var i=e.extension;return t(ft,{extension:i},i.value.map((function(e,i){return[t(Qe,{name:"Statement #"+(i+1),value:""}),t(Qe,{name:"ID",value:Me(e.statementId)}),t(Qe,{name:"Info",value:e.statementInfo.byteLength?d.ToHex(e.statementInfo):null,monospace:true})]})))};
/**
             * @license
             * Copyright (c) Peculiar Ventures, LLC.
             *
             * This source code is licensed under the MIT license found in the
             * LICENSE file in the root directory of this source tree.
             */var Lt=function(e){var i=e.extension;return t(ft,{extension:i},t(Qe,{name:"Comment",value:i.value.value}))};
/**
             * @license
             * Copyright (c) Peculiar Ventures, LLC.
             *
             * This source code is licensed under the MIT license found in the
             * LICENSE file in the root directory of this source tree.
             */var Nt=function(e){var i=e.extension;return t(ft,{extension:i},t(Qe,{name:"Type",value:i.value.toJSON().join(", ")}))};
/**
             * @license
             * Copyright (c) Peculiar Ventures, LLC.
             *
             * This source code is licensed under the MIT license found in the
             * LICENSE file in the root directory of this source tree.
             */var zt=function(e){var i=e.extension;return t(ft,{extension:i},t(Qe,{name:"Role",value:i.value.text}))};
/**
             * @license
             * Copyright (c) Peculiar Ventures, LLC.
             *
             * This source code is licensed under the MIT license found in the
             * LICENSE file in the root directory of this source tree.
             */var jt=function(e){var i=e.extension,r=e.getLEILink;return t(ft,{extension:i},t(Qe,{name:"Identifier",value:i.value.text,href:r(i.value.text)}))};
/**
             * @license
             * Copyright (c) Peculiar Ventures, LLC.
             *
             * This source code is licensed under the MIT license found in the
             * LICENSE file in the root directory of this source tree.
             */var Pt=function(e){var i=e.extension;return t(ft,{extension:i},t(Qe,{name:"Version",value:i.value.version}),t(et,Object.assign({generalName:i.value.location},e)),t(Qe,{name:"Requires Auth",value:i.value.requiresAuth?"YES":"NO"}))};
/**
             * @license
             * Copyright (c) Peculiar Ventures, LLC.
             *
             * This source code is licensed under the MIT license found in the
             * LICENSE file in the root directory of this source tree.
             */var Tt=function(e){var i=e.extension;return t(ft,{extension:i},t(Qe,{name:"Version",value:i.value.version}))};
/**
             * @license
             * Copyright (c) Peculiar Ventures, LLC.
             *
             * This source code is licensed under the MIT license found in the
             * LICENSE file in the root directory of this source tree.
             */var Et=function(e){var i=e.extension;return t(ft,{extension:i},t(Qe,{name:"Reason",value:i.value.toJSON()}))};
/**
             * @license
             * Copyright (c) Peculiar Ventures, LLC.
             *
             * This source code is licensed under the MIT license found in the
             * LICENSE file in the root directory of this source tree.
             */function Kt(e){return d.ToString(e.values[0])}
/**
             * @license
             * Copyright (c) Peculiar Ventures, LLC.
             *
             * This source code is licensed under the MIT license found in the
             * LICENSE file in the root directory of this source tree.
             */var Ot=function(e){var i=e.extension;return t(ft,{extension:i},i.value.map((function(e,i){return[t(Qe,{name:"Attribute #"+(i+1),value:""}),t(Qe,{name:"Type",value:Me(e.type)}),t(Qe,{name:"Value",value:Kt(e)})]})))};
/**
             * @license
             * Copyright (c) Peculiar Ventures, LLC.
             *
             * This source code is licensed under the MIT license found in the
             * LICENSE file in the root directory of this source tree.
             */var Ht=function(e){var i=e.extension;return t(ft,{extension:i},t(Qe,{name:"Value",value:i.value,monospace:true}))};
/**
             * @license
             * Copyright (c) Peculiar Ventures, LLC.
             *
             * This source code is licensed under the MIT license found in the
             * LICENSE file in the root directory of this source tree.
             */var Rt=function(e){var i=e.extension;return t(ft,{extension:i},t(Qe,{name:"Not Before",value:s(i.value.notBefore)}),t(Qe,{name:"Not After",value:s(i.value.notAfter)}))};
/**
             * @license
             * Copyright (c) Peculiar Ventures, LLC.
             *
             * This source code is licensed under the MIT license found in the
             * LICENSE file in the root directory of this source tree.
             */var Vt=function(e){var i=e.extension;return t(ft,{extension:i},t(Qe,{name:"Version",value:i.value.entrustVers}),t(Qe,{name:"Info Flags",value:i.value.entrustInfoFlags.toJSON().join(", ")}))};
/**
             * @license
             * Copyright (c) Peculiar Ventures, LLC.
             *
             * This source code is licensed under the MIT license found in the
             * LICENSE file in the root directory of this source tree.
             */var Bt=function(e){var i=e.extension;return t(ft,{extension:i},i.value.map((function(e,i){return[t(Qe,{name:"Biometric #"+(i+1),value:""}),t(Qe,{name:"OID",value:Me(e.typeOfBiometricData.biometricDataOid)}),t(Qe,{name:"Type",value:e.typeOfBiometricData.predefinedBiometricType}),t(Qe,{name:"Algorithm",value:Me(e.hashAlgorithm.algorithm)}),t(Qe,{name:"Hash",value:d.ToHex(e.biometricDataHash.buffer),monospace:true}),t(Qe,{name:"Source Uri",value:e.sourceDataUri})]})))};
/**
             * @license
             * Copyright (c) Peculiar Ventures, LLC.
             *
             * This source code is licensed under the MIT license found in the
             * LICENSE file in the root directory of this source tree.
             */var Gt=function(e){var i=e.extension;var r=function(e){if(!e){return null}return e.map((function(e){var i=e.imageDetails;return[t(Qe,{name:"Image Type",value:i.mediaType}),t(Qe,{name:"Image Hash",value:d.ToHex(i.logotypeHash[0].hashValue),monospace:true}),t(Qe,{name:"Image URL",value:i.logotypeURI[0],monospace:true,collapse:true}),t(Qe,{name:"Image Hash Algorithm",value:Me(i.logotypeHash[0].hashAlg.algorithm)})]}))};var n=function(e){if(!e){return null}return e.map((function(e){var i=e.audioDetails;return[t(Qe,{name:"Audio Type",value:i.mediaType}),t(Qe,{name:"Audio Hash",value:d.ToHex(i.logotypeHash[0].hashValue),monospace:true}),t(Qe,{name:"Audio URL",value:i.logotypeURI[0],monospace:true,collapse:true}),t(Qe,{name:"Audio Hash Algorithm",value:Me(i.logotypeHash[0].hashAlg.algorithm)})]}))};var a=function(e,i){if(!i||!i.direct){return null}var a=i.direct,o=a.image,s=a.audio;return[t(Qe,{name:"Type",value:e}),r(o),n(s),t("tr",null,t("td",null),t("td",null))]};return t(ft,{extension:i},a("Subject",i.value.subjectLogo),a("Issuer",i.value.issuerLogo))};
/**
             * @license
             * Copyright (c) Peculiar Ventures, LLC.
             *
             * This source code is licensed under the MIT license found in the
             * LICENSE file in the root directory of this source tree.
             */var qt=function(e){var i=e.extension;return t(ft,{extension:i},i.value.map((function(e,i){return[t(Qe,{name:"Entry #"+(i+1),value:""}),t(Qe,{name:"SPC",value:e.spc}),t(Qe,{name:"Range",value:e.range?"start="+e.range.start+" count=="+e.range.count:null}),t(Qe,{name:"One",value:e.one})]})))};
/**
             * @license
             * Copyright (c) Peculiar Ventures, LLC.
             *
             * This source code is licensed under the MIT license found in the
             * LICENSE file in the root directory of this source tree.
             */var Ft=function(e){var i=e.extension;return t(ft,{extension:i},i.value.requireExplicitPolicy&&t(Qe,{name:"Require Explicit Policy",value:re.toASN(i.value.requireExplicitPolicy).valueBlock.toString()}),i.value.inhibitPolicyMapping&&t(Qe,{name:"Inhibit Policy Mapping",value:re.toASN(i.value.inhibitPolicyMapping).valueBlock.toString()}))};
/**
             * @license
             * Copyright (c) Peculiar Ventures, LLC.
             *
             * This source code is licensed under the MIT license found in the
             * LICENSE file in the root directory of this source tree.
             */var Mt=function(e){var i=e.extension;return t(ft,{extension:i},i.value.map((function(e,i){return[t(Qe,{name:"Policy #"+(i+1),value:""}),t(Qe,{name:"Issuer Domain",value:Me(e.issuerDomainPolicy)}),t(Qe,{name:"Subject Domain",value:Me(e.subjectDomainPolicy)})]})))};
/**
             * @license
             * Copyright (c) Peculiar Ventures, LLC.
             *
             * This source code is licensed under the MIT license found in the
             * LICENSE file in the root directory of this source tree.
             */var Ut=function(e){var i=e.extensions,r=e.title;if(!i||!i.length){return null}return[t(Ye,{value:r||"Extensions"}),i.map((function(i){try{if(i.value instanceof ne){return t(pt,{extension:i})}if(i.value instanceof ae){return t(bt,{extension:i})}if(i.value instanceof oe){return t(ht,{extension:i})}if(i.value instanceof se){return t(gt,Object.assign({extension:i},e))}if(i.value instanceof ce){return t(vt,Object.assign({extension:i},e))}if(i.value instanceof le){return t(mt,Object.assign({extension:i},e))}if(i.value instanceof ue||i.value instanceof de){return t(xt,Object.assign({extension:i},e))}if(i.value instanceof fe){return t(yt,Object.assign({extension:i},e))}if(i.value instanceof pe){return t(wt,{extension:i})}if(i.value instanceof be){return t(St,{extension:i})}if(i.value instanceof he){return t(_t,Object.assign({extension:i},e))}if(i.value instanceof ge){return t(It,{extension:i})}if(i.value instanceof ve){return t(Dt,{extension:i})}if(i.value instanceof me){return t(Ct,{extension:i})}if(i.value instanceof xe){return t(At,{extension:i})}if(i.value instanceof ye){return t(Lt,{extension:i})}if(i.value instanceof we){return t(Nt,{extension:i})}if(i.value instanceof ke){return t(zt,{extension:i})}if(i.value instanceof Se){return t(jt,Object.assign({extension:i},e))}if(i.value instanceof _e){return t(Pt,Object.assign({extension:i},e))}if(i.value instanceof Ie){return t(Tt,{extension:i})}if(i.value instanceof De){return t(Et,{extension:i})}if(i.value instanceof Ce){return t(Ot,{extension:i})}if(i.value instanceof Ae){return t(Rt,{extension:i})}if(i.value instanceof Le){return t(Vt,{extension:i})}if(i.value instanceof Ne){return t(Bt,{extension:i})}if(i.value instanceof ze){return t(Gt,{extension:i})}if(i.value instanceof je){return t(qt,{extension:i})}if(i.value instanceof Pe){return t(Ft,{extension:i})}if(i.value instanceof Te){return t(Mt,{extension:i})}if(typeof i.value==="string"){return t(Ht,{extension:i})}return t(ft,{extension:i})}catch(r){console.error("Error render extension:",i.asn.extnID);return null}}))]};
/**
             * @license
             * Copyright (c) Peculiar Ventures, LLC.
             *
             * This source code is licensed under the MIT license found in the
             * LICENSE file in the root directory of this source tree.
             */var Yt=function(e){var i=e.serialNumber,r=e.version,n=e.validity,a=e.notBefore,c=e.notAfter,l=e.type;return[t(Ye,{value:o.getString("basicInformation")}),t(Qe,{name:o.getString("type"),value:l}),t(Qe,{name:o.getString("serialNumber"),value:i,monospace:true}),t(Qe,{name:o.getString("version"),value:r}),t(Qe,{name:o.getString("validity"),value:n}),t(Qe,{name:o.getString("issued"),value:a?s(a):undefined}),t(Qe,{name:o.getString("expired"),value:c?s(c):undefined})]};
/**
             * @license
             * Copyright (c) Peculiar Ventures, LLC.
             *
             * This source code is licensed under the MIT license found in the
             * LICENSE file in the root directory of this source tree.
             */function Qt(e){if(e instanceof Fe){Ee.certificateRequest.asPEM(e.exportAsPemFormatted(),e.commonName)}else{Ee.certificate.asPEM(e.exportAsPemFormatted(),e.commonName)}}function Xt(e){if(e instanceof Fe){Ee.certificateRequest.asDER(e.exportAsHexFormatted(),e.commonName)}else{Ee.certificate.asDER(e.exportAsHexFormatted(),e.commonName)}}var Jt=function(e){var i=e.certificate;return[t(Ye,{value:o.getString("miscellaneous")}),t("tr",null,t("td",{class:"vertical_align_middle"},t("peculiar-typography",{color:"grey_5"},o.getString("download"),":")),t("td",null,t("peculiar-button-split",{onClick:Qt.bind(undefined,i),actions:[{text:o.getString("download.der"),onClick:Xt.bind(undefined,i)}]},o.getString("download.pem"))))]};
/**
             * @license
             * Copyright (c) Peculiar Ventures, LLC.
             *
             * This source code is licensed under the MIT license found in the
             * LICENSE file in the root directory of this source tree.
             */var Wt=function(e){return"https://search.gleif.org/#/record/"+e};var Zt=function(e){return"https://search.censys.io/search?resource=hosts&q=dns.names%3A"+e};var $t=function(e){return"https://search.censys.io/search?resource=hosts&q=ip%3A"+e};
/**
             * @license
             * Copyright (c) Peculiar Ventures, LLC.
             *
             * This source code is licensed under the MIT license found in the
             * LICENSE file in the root directory of this source tree.
             */var ei=function(e){var i=e.issuer;if(!i){return null}return[t(Ye,{value:o.getString("issuer")}),i.map((function(e){return t(et,{generalName:e,getDNSNameLink:function(){return""},getIPAddressLink:function(){return""}})}))]};
/**
             * @license
             * Copyright (c) Peculiar Ventures, LLC.
             *
             * This source code is licensed under the MIT license found in the
             * LICENSE file in the root directory of this source tree.
             */var ti=function(e){var i=e.holder;if(!i){return null}var r=i.baseCertificateID,n=i.objectDigestInfo;return[t(Ye,{value:o.getString("holder")}),r&&[r.issuer.map((function(e){return t(et,{generalName:e,getDNSNameLink:function(){return""},getIPAddressLink:function(){return""}})})),t("tr",null,t("td",null),t("td",null)),t(Qe,{name:o.getString("serialNumber"),value:d.ToHex(r.serial),monospace:true}),t("tr",null,t("td",null),t("td",null))],n&&[t(Qe,{name:o.getString("digestInfo"),value:""}),t(Qe,{name:o.getString("algorithm"),value:Me(n.digestAlgorithm.algorithm)}),t(Qe,{name:o.getString("value"),value:d.ToHex(n.objectDigest),monospace:true}),t(Qe,{name:o.getString("type"),value:n.digestedObjectType})]]};var ii=":host{-webkit-box-sizing:border-box;box-sizing:border-box}:host *,:host *:before,:host *:after{-webkit-box-sizing:inherit;box-sizing:inherit}:host{display:block;width:100%;word-wrap:break-word;position:relative;min-width:280px;min-height:300px;background:white;background:rgba(var(--pv-color-light-rgb), 1)}th,td{border:none}table{width:100%;margin-bottom:30px;border-spacing:0;border-collapse:collapse}table .title td{border-color:rgba(209, 213, 217, 0.5);border-color:rgba(var(--pv-color-grey_3-rgb), 0.5);padding-top:60px;padding-bottom:15px;border-bottom-width:1px;border-bottom-style:solid}table td:first-child{padding-left:30px;width:130px;padding-right:10px}table td:last-child{padding-right:30px;width:calc(100% - 130px)}table td{vertical-align:top;padding-top:5px;padding-bottom:5px}table td.vertical_align_middle{vertical-align:middle}table .title:first-child td{padding-top:15px}table .title+tr td{padding-top:15px}table td.monospace{max-width:0}table .divider{padding-top:15px;padding-bottom:15px}.divider .bg_fill{background-color:rgba(209, 213, 217, 0.5);background-color:rgba(var(--pv-color-grey_3-rgb), 0.5)}table tr:last-child .divider{padding-top:0;opacity:0}.divider span{display:block;height:1px}.status_wrapper{min-height:inherit;display:-ms-flexbox;display:flex;-ms-flex-pack:center;justify-content:center;-ms-flex-align:center;align-items:center}.interaction_text{padding:15px 0;width:300px;margin:auto;text-align:center}@media (max-width: 900px){table,tr,td{display:block}table td:last-child,table td:first-child{padding-right:15px;padding-left:15px;width:100%}table .title+tr td{padding-top:5px}table .title+tr td:first-child{padding-top:15px}table td.monospace{width:100%;max-width:none}}:host([data-view=mobile]) table,:host([data-view=mobile]) tr,:host([data-view=mobile]) td{display:block}:host([data-view=mobile]) table td:last-child,:host([data-view=mobile]) table td:first-child{padding-right:15px;padding-left:15px;width:100%}:host([data-view=mobile]) table .title+tr td{padding-top:5px}:host([data-view=mobile]) table .title+tr td:first-child{padding-top:15px}:host([data-view=mobile]) table td.monospace{width:100%;max-width:none}";var ri=e("peculiar_attribute_certificate_viewer",function(){function e(e){var t=this;i(this,e);this.isDecodeInProcess=true;this.getAuthKeyIdParentLink=function(e){var i;return(i=t.authKeyIdParentLink)===null||i===void 0?void 0:i.replace("{{authKeyId}}",e)};this.getAuthKeyIdSiblingsLink=function(e){var i;return(i=t.authKeyIdSiblingsLink)===null||i===void 0?void 0:i.replace("{{authKeyId}}",e)};this.getSubjectKeyIdChildrenLink=function(e){var i;return(i=t.subjectKeyIdChildrenLink)===null||i===void 0?void 0:i.replace("{{subjectKeyId}}",e)};this.getSubjectKeyIdSiblingsLink=function(e){var i;return(i=t.subjectKeyIdSiblingsLink)===null||i===void 0?void 0:i.replace("{{subjectKeyId}}",e)}}e.prototype.componentWillLoad=function(){this.decodeCertificate(this.certificate)};e.prototype.decodeCertificate=function(e){return __awaiter(this,void 0,void 0,(function(){var t;return __generator(this,(function(i){switch(i.label){case 0:this.isDecodeInProcess=true;i.label=1;case 1:i.trys.push([1,4,,5]);if(e instanceof qe){this.certificateDecoded=e}else if(typeof e==="string"){this.certificateDecoded=new qe(e)}else{return[2]}this.certificateDecoded.parseExtensions();this.certificateDecoded.parseAttributes();return[4,this.certificateDecoded.getThumbprint("SHA-1")];case 2:i.sent();return[4,this.certificateDecoded.getThumbprint("SHA-256")];case 3:i.sent();return[3,5];case 4:t=i.sent();this.certificateDecodeError=t;console.error("Error certificate parse:",t);return[3,5];case 5:this.isDecodeInProcess=false;return[2]}}))}))};e.prototype.watchCertificateAndDecode=function(e,t){if(typeof e==="string"&&typeof t==="string"){if(e!==t){this.decodeCertificate(e)}return}if(e instanceof qe&&t instanceof qe){if(e.serialNumber!==t.serialNumber){this.decodeCertificate(e)}}};e.prototype.renderErrorState=function(){return t("div",{class:"status_wrapper"},t("peculiar-typography",{type:"b1",class:"interaction_text"},"There was an error decoding this attribute certificate."))};e.prototype.renderEmptyState=function(){return t("div",{class:"status_wrapper"},t("peculiar-typography",{type:"b1",class:"interaction_text"},"There is no attribute certificate available."))};e.prototype.render=function(){if(this.certificateDecodeError){return this.renderErrorState()}if(!this.certificateDecoded){return this.renderEmptyState()}return t(r,null,t("table",null,t(Yt,Object.assign({},this.certificateDecoded)),t(ei,{issuer:this.certificateDecoded.issuer}),t(ti,{holder:this.certificateDecoded.holder}),t(Xe,{signature:this.certificateDecoded.signature}),t(dt,{thumbprints:this.certificateDecoded.thumbprints}),t(ut,{attributes:this.certificateDecoded.attributes,getLEILink:Wt,getDNSNameLink:Zt,getIPAddressLink:$t,getAuthKeyIdParentLink:this.getAuthKeyIdParentLink,getAuthKeyIdSiblingsLink:this.getAuthKeyIdSiblingsLink,getSubjectKeyIdChildrenLink:this.getSubjectKeyIdChildrenLink,getSubjectKeyIdSiblingsLink:this.getSubjectKeyIdSiblingsLink}),t(Ut,{extensions:this.certificateDecoded.extensions,getLEILink:Wt,getDNSNameLink:Zt,getIPAddressLink:$t,getAuthKeyIdParentLink:this.getAuthKeyIdParentLink,getAuthKeyIdSiblingsLink:this.getAuthKeyIdSiblingsLink,getSubjectKeyIdChildrenLink:this.getSubjectKeyIdChildrenLink,getSubjectKeyIdSiblingsLink:this.getSubjectKeyIdSiblingsLink}),this.download&&t(Jt,{certificate:this.certificateDecoded})))};Object.defineProperty(e,"watchers",{get:function(){return{certificate:["watchCertificateAndDecode"]}},enumerable:false,configurable:true});return e}());ri.style=ii;var ni=':host{-webkit-box-sizing:border-box;box-sizing:border-box}:host *,:host *:before,:host *:after{-webkit-box-sizing:inherit;box-sizing:inherit}:host{display:inline-block;width:auto;cursor:pointer;position:relative;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility;-ms-touch-action:manipulation;touch-action:manipulation;-webkit-user-drag:none;-ms-content-zooming:none;word-wrap:break-word;-webkit-text-size-adjust:none;-moz-text-size-adjust:none;-ms-text-size-adjust:none;text-size-adjust:none;--pv-button-padding-end:5px;--pv-button-padding-start:5px}.button{font-family:"Open Sans", "Arial", sans-serif;font-family:var(--pv-font-family);font-size:13px;font-size:var(--pv-font-size-b3);letter-spacing:0.03em;letter-spacing:var(--pv-letter-spacing-normal);display:-ms-inline-flexbox;display:inline-flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;width:100%;border-style:solid;border-width:1px;font-weight:400;text-decoration:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;white-space:nowrap;vertical-align:middle;cursor:inherit;height:30px;line-height:30px;border-radius:2px;padding:0 5px;padding:0 var(--pv-button-padding-end) 0 var(--pv-button-padding-start)}.button::-moz-focus-inner{border:0}.button:focus{outline:none;-webkit-box-shadow:0 4px 10px 0 rgba(var(--pv-color-dark-rgb), 0.1);box-shadow:0 4px 10px 0 rgba(var(--pv-color-dark-rgb), 0.1)}.button[disabled]{opacity:0.5;cursor:not-allowed}.button_stroke{border-color:rgba(53, 132, 247, 0.3);border-color:rgba(var(--pv-color-primary-rgb), 0.3);color:#3584f7;color:rgba(var(--pv-color-primary-rgb), 1);background-color:transparent}.button_fill{border-color:#3584f7;border-color:rgba(var(--pv-color-primary-rgb), 1);background-color:#3584f7;background-color:rgba(var(--pv-color-primary-rgb), 1);color:white;color:rgba(var(--pv-color-light-rgb), 1)}.button_label{-webkit-transition:opacity 200ms;transition:opacity 200ms}.button:hover .button_label{opacity:0.7}';var ai=e("peculiar_button",function(){function e(e){var t=this;i(this,e);this.fill="stroke";this.handleClick=function(e){if(t.disabled){e.preventDefault();e.stopPropagation();return}if(t.onClick){t.onClick(e)}}}e.prototype.render=function(){var e=!!this.href;var i=e?"a":"button";return t(i,{class:{button:true,button_stroke:this.fill==="stroke",button_fill:this.fill==="fill",button_disabled:this.disabled},disabled:this.disabled,type:!e&&"button",href:e&&this.href,target:e&&this.target?this.target:null,rel:e&&"noreferrer noopener",onClick:this.handleClick,part:"base"},t("span",{part:"label",class:"button_label"},t("slot",null)))};return e}());ai.style=ni;var oi=':host{-webkit-box-sizing:border-box;box-sizing:border-box}:host *,:host *:before,:host *:after{-webkit-box-sizing:inherit;box-sizing:inherit}:host{display:inline-block;vertical-align:top;position:relative;white-space:nowrap;font-size:0}.button_split_icon{width:7px;height:5px;display:inline-block;vertical-align:middle}.button_split_with_icon{width:25px;border-bottom-left-radius:0;border-top-left-radius:0}.button_split_with_icon.m_open::part(base):before{position:fixed;width:100%;height:100%;top:0;left:0;content:""}.button_split_action{width:100%}.button_split_container{position:absolute;bottom:calc(100% + 1px);left:0;width:100%;border-radius:2px;-webkit-box-shadow:0px -2px 1px rgb(var(--pv-color-light-rgb)), 0px 0px 10px rgba(var(--pv-color-dark-rgb), 0.0241168);box-shadow:0px -2px 1px rgb(var(--pv-color-light-rgb)), 0px 0px 10px rgba(var(--pv-color-dark-rgb), 0.0241168);z-index:1}.button_split>peculiar-button:first-of-type::part(base){border-top-right-radius:0;border-bottom-right-radius:0}.button_split>peculiar-button:last-of-type::part(base){border-top-left-radius:0;border-bottom-left-radius:0}.button_split>peculiar-button:not(:first-child){margin-left:-1px}';var si=e("peculiar_button_split",function(){function e(e){var t=this;i(this,e);this.fill="stroke";this.actions=[];this.open=false;this.onClickSplitButton=function(e){e.stopPropagation();t.open=!t.open}}e.prototype.onClickActiveButton=function(e,t){this.open=false;e(t)};e.prototype.renderActiveSplitState=function(){var e=this;if(!this.open){return null}return t("div",{class:"button_split_container"},this.actions.map((function(i){return t("peculiar-button",{fill:"fill",class:"button_split_action",onClick:e.onClickActiveButton.bind(e,i.onClick)},i.text)})))};e.prototype.render=function(){return t("div",{class:{button_split:true}},t("peculiar-button",{fill:this.fill,onClick:this.onClick},t("slot",null)),t("peculiar-button",{fill:this.fill,onClick:this.onClickSplitButton,class:{button_split_with_icon:true,m_open:this.open}},t("svg",{viewBox:"0 0 7 5",xmlns:"http://www.w3.org/2000/svg",class:"button_split_icon"},t("path",{fill:"currentColor","fill-rule":"evenodd","clip-rule":"evenodd",d:"M5.459.124c.934.001 1.442.994.84 1.644L4.425 3.794c-.44.475-1.244.475-1.684 0L.862 1.764C.26 1.115.77.12 1.705.122l3.754.003z"}))),this.renderActiveSplitState())};return e}());si.style=oi;var ci=":host{-webkit-box-sizing:border-box;box-sizing:border-box}:host *,:host *:before,:host *:after{-webkit-box-sizing:inherit;box-sizing:inherit}:host{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility;-ms-touch-action:manipulation;touch-action:manipulation;-webkit-user-drag:none;-ms-content-zooming:none;word-wrap:break-word;-webkit-text-size-adjust:none;-moz-text-size-adjust:none;-ms-text-size-adjust:none;text-size-adjust:none;display:block;width:100%;font-size:0}.textarea{min-height:300px;width:100%;border-radius:3px;border-width:1px;border-style:solid;padding:14px;font-family:monospace;resize:vertical;background-color:white;background-color:rgba(var(--pv-color-light-rgb), 1);border-color:#d1d5d9;border-color:rgba(var(--pv-color-grey_3-rgb), 1);color:#2a3134;color:rgba(var(--pv-color-dark-rgb), 1);letter-spacing:0.03em;letter-spacing:var(--pv-letter-spacing-normal);font-size:14px;font-size:var(--pv-font-size-h7)}.controls{margin-top:10px}.button{position:relative}.button:not(:first-child){margin-left:10px}.viewer{margin-top:64px}.input_file{opacity:0;width:100%;height:100%;top:0;left:0;display:block;position:absolute}";var li=e("peculiar_certificate_decoder",function(){function e(e){var t=this;i(this,e);this.onClickDecode=function(){var e=t.inputPaste.value;if(e){t.decode(e)}};this.onClickExample=function(){t.decode(t.certificateExample)};this.onClickClear=function(){t.clearValue()};this.onChangeInputFile=function(e){return __awaiter(t,void 0,void 0,(function(){var t,i;return __generator(this,(function(r){switch(r.label){case 0:t=e.target;if(!t.files)return[3,2];return[4,Be(t.files[0])];case 1:i=r.sent();if(typeof i.value==="string"){this.decode(i.value)}t.value="";r.label=2;case 2:return[2]}}))}))};this.onDropFile=function(e){return __awaiter(t,void 0,void 0,(function(){var t,i;return __generator(this,(function(r){switch(r.label){case 0:e.stopPropagation();e.preventDefault();t=e.dataTransfer;if(!t.files)return[3,2];return[4,Be(t.files[0])];case 1:i=r.sent();if(typeof i.value==="string"){this.decode(i.value)}r.label=2;case 2:return[2]}}))}))}}e.prototype.componentDidLoad=function(){var e=this;var t=c.parseHash(window.location.search);if(t.cert){setTimeout((function(){return e.decode(t.cert)}),100)}};e.prototype.clearValue=function(){this.inputPaste.value="";this.certificateDecoded=null;c.replace({search:""})};e.prototype.setValue=function(e){this.certificateDecoded=e;this.inputPaste.value=e.exportAsPemFormatted();c.replace({search:c.queryStringify({cert:e.exportAsBase64()})})};e.prototype.decode=function(e){var t=Ke(e);var i=Oe(e);var r=He(e);var n=Re(e);var a;var o;if(t&&!(i||n||r)){this.clearValue();alert("Unsupported file type. Please try to use Certificate/AttributeCertificate/CertificateRequest.");return}try{if(i){a=new Ve(e)}if(n){a=new qe(e)}if(r){a=new Fe(e)}}catch(s){o=s}if(!a){try{a=new Ve(e)}catch(s){o=s}}if(!a){try{a=new qe(e)}catch(s){o=s}}if(!a){try{a=new Fe(e)}catch(s){o=s}}if(!a){this.clearValue();console.log(o);alert("Error decoding file. Please try to use Certificate/AttributeCertificate/CertificateRequest.")}else{this.setValue(a)}};e.prototype.render=function(){var e=this;return t(r,null,t("textarea",{placeholder:"Certificate DER or PEM",class:"textarea",ref:function(t){e.inputPaste=t},onDrop:this.onDropFile}),t("div",{class:"controls"},t("peculiar-button",{fill:"fill",class:"button",onClick:this.onClickDecode},"Decode"),t("peculiar-button",{class:"button"},"Choose file",t("input",{type:"file",class:"input_file",accept:"application/pkix-cert,application/x-x509-ca-cert,application/x-x509-user-cert,application/pkcs10,.csr,.req",onChange:this.onChangeInputFile,value:""})),t("peculiar-button",{class:"button",onClick:this.onClickClear},"Clear"),this.certificateExample&&t("peculiar-button",{class:"button",onClick:this.onClickExample},"Example")),this.certificateDecoded instanceof Ve&&t("peculiar-certificate-viewer",{certificate:this.certificateDecoded,class:"viewer",download:true}),this.certificateDecoded instanceof qe&&t("peculiar-attribute-certificate-viewer",{certificate:this.certificateDecoded,class:"viewer",download:true}),this.certificateDecoded instanceof Fe&&t("peculiar-csr-viewer",{certificate:this.certificateDecoded,class:"viewer",download:true}))};return e}());li.style=ci;
/**
             * @license
             * Copyright (c) Peculiar Ventures, LLC.
             *
             * This source code is licensed under the MIT license found in the
             * LICENSE file in the root directory of this source tree.
             */function ui(e){var t;if((t=e.params)===null||t===void 0?void 0:t["modulus"]){var i=e.params["modulus"].byteLength;if(i%2){i-=1}return i*8}return null}function di(e){var t;if((t=e.params)===null||t===void 0?void 0:t["publicExponent"]){return e.params["publicExponent"].byteLength===3?65537:3}return null}var fi=function(e){var i;var r=e.publicKey;if(!r){return null}return[t(Ye,{value:o.getString("publicKeyInfo")}),t(Qe,{name:o.getString("algorithm"),value:Me(r.algorithm)}),t(Qe,{name:o.getString("namedCurve"),value:Me((i=r.params)===null||i===void 0?void 0:i["namedCurve"])}),t(Qe,{name:o.getString("exponent"),value:di(r)}),t(Qe,{name:o.getString("modulus"),value:ui(r)}),t(Qe,{name:o.getString("value"),value:d.ToHex(r.value),monospace:true,collapse:true})]};
/**
             * @license
             * Copyright (c) Peculiar Ventures, LLC.
             *
             * This source code is licensed under the MIT license found in the
             * LICENSE file in the root directory of this source tree.
             */var pi=function(e){var i=e.name;return[t(Ye,{value:o.getString("subjectName")}),i.map((function(e){return t(Qe,{name:e.name||e.type,value:e.value})}))]};
/**
             * @license
             * Copyright (c) Peculiar Ventures, LLC.
             *
             * This source code is licensed under the MIT license found in the
             * LICENSE file in the root directory of this source tree.
             */var bi=function(e){var i=e.name,r=e.issuerDnLink;var n=o.getString("issuerName");return[t(Ye,{value:r?t("peculiar-link",{href:r,type:"h6"},n):n}),i.map((function(e){return t(Qe,{name:e.name||e.type,value:e.value})}))]};var hi=":host{-webkit-box-sizing:border-box;box-sizing:border-box}:host *,:host *:before,:host *:after{-webkit-box-sizing:inherit;box-sizing:inherit}:host{display:block;width:100%;word-wrap:break-word;position:relative;min-width:280px;min-height:300px;background:white;background:rgba(var(--pv-color-light-rgb), 1)}th,td{border:none}table{width:100%;margin-bottom:30px;border-spacing:0;border-collapse:collapse}table .title td{border-color:rgba(209, 213, 217, 0.5);border-color:rgba(var(--pv-color-grey_3-rgb), 0.5);padding-top:60px;padding-bottom:15px;border-bottom-width:1px;border-bottom-style:solid}table td:first-child{padding-left:30px;width:130px;padding-right:10px}table td:last-child{padding-right:30px;width:calc(100% - 130px)}table td{vertical-align:top;padding-top:5px;padding-bottom:5px}table td.vertical_align_middle{vertical-align:middle}table .title:first-child td{padding-top:15px}table .title+tr td{padding-top:15px}table td.monospace{max-width:0}table .divider{padding-top:15px;padding-bottom:15px}.divider .bg_fill{background-color:rgba(209, 213, 217, 0.5);background-color:rgba(var(--pv-color-grey_3-rgb), 0.5)}table tr:last-child .divider{padding-top:0;opacity:0}.divider span{display:block;height:1px}.status_wrapper{min-height:inherit;display:-ms-flexbox;display:flex;-ms-flex-pack:center;justify-content:center;-ms-flex-align:center;align-items:center}.interaction_text{padding:15px 0;width:300px;margin:auto;text-align:center}@media (max-width: 900px){table,tr,td{display:block}table td:last-child,table td:first-child{padding-right:15px;padding-left:15px;width:100%}table .title+tr td{padding-top:5px}table .title+tr td:first-child{padding-top:15px}table td.monospace{width:100%;max-width:none}}:host([data-view=mobile]) table,:host([data-view=mobile]) tr,:host([data-view=mobile]) td{display:block}:host([data-view=mobile]) table td:last-child,:host([data-view=mobile]) table td:first-child{padding-right:15px;padding-left:15px;width:100%}:host([data-view=mobile]) table .title+tr td{padding-top:5px}:host([data-view=mobile]) table .title+tr td:first-child{padding-top:15px}:host([data-view=mobile]) table td.monospace{width:100%;max-width:none}";var gi=e("peculiar_certificate_viewer",function(){function e(e){var t=this;i(this,e);this.isDecodeInProcess=true;this.getAuthKeyIdParentLink=function(e){var i;return(i=t.authKeyIdParentLink)===null||i===void 0?void 0:i.replace("{{authKeyId}}",e)};this.getAuthKeyIdSiblingsLink=function(e){var i;return(i=t.authKeyIdSiblingsLink)===null||i===void 0?void 0:i.replace("{{authKeyId}}",e)};this.getSubjectKeyIdChildrenLink=function(e){var i;return(i=t.subjectKeyIdChildrenLink)===null||i===void 0?void 0:i.replace("{{subjectKeyId}}",e)};this.getSubjectKeyIdSiblingsLink=function(e){var i;return(i=t.subjectKeyIdSiblingsLink)===null||i===void 0?void 0:i.replace("{{subjectKeyId}}",e)}}e.prototype.componentWillLoad=function(){this.decodeCertificate(this.certificate)};e.prototype.decodeCertificate=function(e){return __awaiter(this,void 0,void 0,(function(){var t;return __generator(this,(function(i){switch(i.label){case 0:this.isDecodeInProcess=true;i.label=1;case 1:i.trys.push([1,4,,5]);if(e instanceof Ve){this.certificateDecoded=e}else if(typeof e==="string"){this.certificateDecoded=new Ve(e)}else{return[2]}this.certificateDecoded.parseExtensions();return[4,this.certificateDecoded.getThumbprint("SHA-1")];case 2:i.sent();return[4,this.certificateDecoded.getThumbprint("SHA-256")];case 3:i.sent();return[3,5];case 4:t=i.sent();this.certificateDecodeError=t;console.error("Error certificate parse:",t);return[3,5];case 5:this.isDecodeInProcess=false;return[2]}}))}))};e.prototype.watchCertificateAndDecode=function(e,t){if(typeof e==="string"&&typeof t==="string"){if(e!==t){this.decodeCertificate(e)}return}if(e instanceof Ve&&t instanceof Ve){if(e.serialNumber!==t.serialNumber){this.decodeCertificate(e)}}};e.prototype.getIssuerDnLink=function(){return this.issuerDnLink};e.prototype.renderErrorState=function(){return t("div",{class:"status_wrapper"},t("peculiar-typography",{type:"b1",class:"interaction_text"},"There was an error decoding this certificate."))};e.prototype.renderEmptyState=function(){return t("div",{class:"status_wrapper"},t("peculiar-typography",{type:"b1",class:"interaction_text"},"There is no certificate available."))};e.prototype.render=function(){if(this.certificateDecodeError){return this.renderErrorState()}if(!this.certificateDecoded){return this.renderEmptyState()}return t(r,{"data-view":this.view},t("table",null,t(Yt,Object.assign({},this.certificateDecoded)),t(pi,{name:this.certificateDecoded.subject}),t(bi,{name:this.certificateDecoded.issuer,issuerDnLink:this.getIssuerDnLink()}),t(fi,{publicKey:this.certificateDecoded.publicKey}),t(Xe,{signature:this.certificateDecoded.signature}),t(dt,{thumbprints:this.certificateDecoded.thumbprints}),t(Ut,{extensions:this.certificateDecoded.extensions,getLEILink:Wt,getDNSNameLink:Zt,getIPAddressLink:$t,getAuthKeyIdParentLink:this.getAuthKeyIdParentLink,getAuthKeyIdSiblingsLink:this.getAuthKeyIdSiblingsLink,getSubjectKeyIdChildrenLink:this.getSubjectKeyIdChildrenLink,getSubjectKeyIdSiblingsLink:this.getSubjectKeyIdSiblingsLink}),this.download&&t(Jt,{certificate:this.certificateDecoded})))};Object.defineProperty(e,"watchers",{get:function(){return{certificate:["watchCertificateAndDecode"]}},enumerable:false,configurable:true});return e}());gi.style=hi;var vi=":host{-webkit-box-sizing:border-box;box-sizing:border-box}:host *,:host *:before,:host *:after{-webkit-box-sizing:inherit;box-sizing:inherit}:host{display:block;width:100%;word-wrap:break-word;position:relative;min-width:280px;min-height:300px;background:white;background:rgba(var(--pv-color-light-rgb), 1)}th,td{border:none}table{width:100%;margin-bottom:30px;border-spacing:0;border-collapse:collapse}table .title td{border-color:rgba(209, 213, 217, 0.5);border-color:rgba(var(--pv-color-grey_3-rgb), 0.5);padding-top:60px;padding-bottom:15px;border-bottom-width:1px;border-bottom-style:solid}table td:first-child{padding-left:30px;width:130px;padding-right:10px}table td:last-child{padding-right:30px;width:calc(100% - 130px)}table td{vertical-align:top;padding-top:5px;padding-bottom:5px}table td.vertical_align_middle{vertical-align:middle}table .title:first-child td{padding-top:15px}table .title+tr td{padding-top:15px}table td.monospace{max-width:0}table .divider{padding-top:15px;padding-bottom:15px}.divider .bg_fill{background-color:rgba(209, 213, 217, 0.5);background-color:rgba(var(--pv-color-grey_3-rgb), 0.5)}table tr:last-child .divider{padding-top:0;opacity:0}.divider span{display:block;height:1px}.status_wrapper{min-height:inherit;display:-ms-flexbox;display:flex;-ms-flex-pack:center;justify-content:center;-ms-flex-align:center;align-items:center}.interaction_text{padding:15px 0;width:300px;margin:auto;text-align:center}@media (max-width: 900px){table,tr,td{display:block}table td:last-child,table td:first-child{padding-right:15px;padding-left:15px;width:100%}table .title+tr td{padding-top:5px}table .title+tr td:first-child{padding-top:15px}table td.monospace{width:100%;max-width:none}}:host([data-view=mobile]) table,:host([data-view=mobile]) tr,:host([data-view=mobile]) td{display:block}:host([data-view=mobile]) table td:last-child,:host([data-view=mobile]) table td:first-child{padding-right:15px;padding-left:15px;width:100%}:host([data-view=mobile]) table .title+tr td{padding-top:5px}:host([data-view=mobile]) table .title+tr td:first-child{padding-top:15px}:host([data-view=mobile]) table td.monospace{width:100%;max-width:none}";var mi=e("peculiar_csr_viewer",function(){function e(e){var t=this;i(this,e);this.isDecodeInProcess=true;this.getAuthKeyIdParentLink=function(e){return e};this.getAuthKeyIdSiblingsLink=function(e){return e};this.getSubjectKeyIdChildrenLink=function(e){var i;return(i=t.subjectKeyIdChildrenLink)===null||i===void 0?void 0:i.replace("{{subjectKeyId}}",e)};this.getSubjectKeyIdSiblingsLink=function(e){var i;return(i=t.subjectKeyIdSiblingsLink)===null||i===void 0?void 0:i.replace("{{subjectKeyId}}",e)}}e.prototype.componentWillLoad=function(){this.decodeCertificate(this.certificate)};e.prototype.decodeCertificate=function(e){return __awaiter(this,void 0,void 0,(function(){var t;return __generator(this,(function(i){switch(i.label){case 0:this.isDecodeInProcess=true;i.label=1;case 1:i.trys.push([1,4,,5]);if(e instanceof Fe){this.certificateDecoded=e}else if(typeof e==="string"){this.certificateDecoded=new Fe(e)}else{return[2]}this.certificateDecoded.parseAttributes();return[4,this.certificateDecoded.getThumbprint("SHA-1")];case 2:i.sent();return[4,this.certificateDecoded.getThumbprint("SHA-256")];case 3:i.sent();return[3,5];case 4:t=i.sent();this.certificateDecodeError=t;console.error("Error certificate parse:",t);return[3,5];case 5:this.isDecodeInProcess=false;return[2]}}))}))};e.prototype.watchCertificateAndDecode=function(e,t){if(typeof e==="string"&&typeof t==="string"){if(e!==t){this.decodeCertificate(e)}return}if(e instanceof Fe&&t instanceof Fe){if(e.commonName!==t.commonName){this.decodeCertificate(e)}}};e.prototype.renderErrorState=function(){return t("div",{class:"status_wrapper"},t("peculiar-typography",{type:"b1",class:"interaction_text"},"There was an error decoding this certificate request."))};e.prototype.renderEmptyState=function(){return t("div",{class:"status_wrapper"},t("peculiar-typography",{type:"b1",class:"interaction_text"},"There is no certificate request available."))};e.prototype.getExtensionRequestAttribute=function(){if(!this.certificateDecoded){return undefined}return this.certificateDecoded.attributes.find((function(e){return e.asn.type==="1.2.840.113549.1.9.14"}))};e.prototype.render=function(){if(this.certificateDecodeError){return this.renderErrorState()}if(!this.certificateDecoded){return this.renderEmptyState()}var e=this.getExtensionRequestAttribute();return t(r,{"data-view":this.view},t("table",null,t(Yt,Object.assign({},this.certificateDecoded)),t(pi,{name:this.certificateDecoded.subject}),t(fi,{publicKey:this.certificateDecoded.publicKey}),t(Xe,{signature:this.certificateDecoded.signature}),t(dt,{thumbprints:this.certificateDecoded.thumbprints}),t(ut,{attributes:this.certificateDecoded.attributes,getLEILink:Wt,getDNSNameLink:Zt,getIPAddressLink:$t,getAuthKeyIdParentLink:this.getAuthKeyIdParentLink,getAuthKeyIdSiblingsLink:this.getAuthKeyIdSiblingsLink,getSubjectKeyIdChildrenLink:this.getSubjectKeyIdChildrenLink,getSubjectKeyIdSiblingsLink:this.getSubjectKeyIdSiblingsLink}),t(Ut,{extensions:e===null||e===void 0?void 0:e.value,title:"Extension Request",getLEILink:Wt,getDNSNameLink:Zt,getIPAddressLink:$t,getAuthKeyIdParentLink:this.getAuthKeyIdParentLink,getAuthKeyIdSiblingsLink:this.getAuthKeyIdSiblingsLink,getSubjectKeyIdChildrenLink:this.getSubjectKeyIdChildrenLink,getSubjectKeyIdSiblingsLink:this.getSubjectKeyIdSiblingsLink}),this.download&&t(Jt,{certificate:this.certificateDecoded})))};Object.defineProperty(e,"watchers",{get:function(){return{certificate:["watchCertificateAndDecode"]}},enumerable:false,configurable:true});return e}());mi.style=vi;var xi=':host{-webkit-box-sizing:border-box;box-sizing:border-box}:host *,:host *:before,:host *:after{-webkit-box-sizing:inherit;box-sizing:inherit}:host{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility;-ms-touch-action:manipulation;touch-action:manipulation;-webkit-user-drag:none;-ms-content-zooming:none;word-wrap:break-word;-webkit-text-size-adjust:none;-moz-text-size-adjust:none;-ms-text-size-adjust:none;text-size-adjust:none;display:inline-block}.link{font-family:"Open Sans", "Arial", sans-serif;font-family:var(--pv-font-family);letter-spacing:0.03em;letter-spacing:var(--pv-letter-spacing-normal);line-height:1.4;line-height:var(--pv-line-height-normal);color:#3584f7;color:rgba(var(--pv-color-primary-rgb), 1);font-weight:400;margin:0;padding:0;word-break:break-all}.link_type_h4{font-size:17px;font-size:var(--pv-font-size-h4);font-weight:600}.link_type_h6{font-size:15px;font-size:var(--pv-font-size-h6);font-weight:600}.link_type_h7{font-size:14px;font-size:var(--pv-font-size-h7);font-weight:600}.link_type_b1{font-size:15px;font-size:var(--pv-font-size-b1)}.link_type_b3{font-size:13px;font-size:var(--pv-font-size-b3)}.link:hover{text-decoration:none}';var yi=e("peculiar_link",function(){function e(e){i(this,e);this.type="b3"}e.prototype.render=function(){var e;return t("a",{href:this.href,target:"_blank",rel:"noreferrer noopener",class:(e={link:true},e["link_type_"+(this.type||"b3")]=true,e)},t("slot",null))};return e}());yi.style=xi;var wi=":host{-webkit-box-sizing:border-box;box-sizing:border-box}:host *,:host *:before,:host *:after{-webkit-box-sizing:inherit;box-sizing:inherit}:host{display:block;width:100%}.text{display:inline-block;width:calc(100% - 60px);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;margin:0}.text.m_opened{white-space:initial}.action{vertical-align:top;display:inline-block;width:60px;text-align:right;position:relative;top:-6px}.button_action{width:30px}.expand_icon{width:7px;height:5px;display:inline-block}.m_opened .expand_icon{-webkit-transform:rotate(180deg);transform:rotate(180deg)}";var ki=e("peculiar_text_hider",function(){function e(e){i(this,e);this.textExpand=n(this,"textExpand",7);this.opened=false}e.prototype.textExpandHandler=function(){this.opened=!this.opened};e.prototype.render=function(){return t(r,null,t("div",{class:"root"},t("div",{class:{text:true,m_opened:this.opened}},t("slot",null)),t("div",{class:"action"},t("peculiar-button",{onClick:this.textExpand.emit,class:{button_action:true,m_opened:this.opened},fill:this.opened?"fill":"stroke"},t("svg",{viewBox:"0 0 7 5",xmlns:"http://www.w3.org/2000/svg",class:"expand_icon"},t("path",{"fill-rule":"evenodd","clip-rule":"evenodd",fill:"currentColor",d:"M5.459.124c.934.001 1.442.994.84 1.644L4.425 3.794c-.44.475-1.244.475-1.684 0L.862 1.764C.26 1.115.77.12 1.705.122l3.754.003z"}))))))};return e}());ki.style=wi;var Si=':host{-webkit-box-sizing:border-box;box-sizing:border-box}:host *,:host *:before,:host *:after{-webkit-box-sizing:inherit;box-sizing:inherit}:host{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility;-ms-touch-action:manipulation;touch-action:manipulation;-webkit-user-drag:none;-ms-content-zooming:none;word-wrap:break-word;-webkit-text-size-adjust:none;-moz-text-size-adjust:none;-ms-text-size-adjust:none;text-size-adjust:none;display:block}.typography{font-family:"Open Sans", "Arial", sans-serif;font-family:var(--pv-font-family);letter-spacing:0.03em;letter-spacing:var(--pv-letter-spacing-normal);line-height:1.4;line-height:var(--pv-line-height-normal);font-weight:400;margin:0;padding:0;display:block}.typography_type_h4{font-size:17px;font-size:var(--pv-font-size-h4);font-weight:600}.typography_type_h6{font-size:15px;font-size:var(--pv-font-size-h6);font-weight:600}.typography_type_h7{font-size:14px;font-size:var(--pv-font-size-h7);font-weight:600}.typography_type_b1{font-size:15px;font-size:var(--pv-font-size-b1)}.typography_type_b3{font-size:13px;font-size:var(--pv-font-size-b3)}.typography_color_dark{color:#2a3134;color:rgba(var(--pv-color-dark-rgb), 1)}.typography_color_light{color:white;color:rgba(var(--pv-color-light-rgb), 1)}.typography_color_grey_3{color:#d1d5d9;color:rgba(var(--pv-color-grey_3-rgb), 1)}.typography_color_grey_5{color:#869196;color:rgba(var(--pv-color-grey_5-rgb), 1)}.typography_color_attention{color:#f7a831;color:rgba(var(--pv-color-attention-rgb), 1)}.typography_color_primary{color:#3584f7;color:rgba(var(--pv-color-primary-rgb), 1)}.typography_ellipsis{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.typography_monospace{font-family:monospace}.typography_align_left{text-align:left}.typography_align_center{text-align:center}.typography_align_right{text-align:right}';var _i=e("peculiar_typography",function(){function e(e){i(this,e);this.type="b3";this.color="dark"}e.prototype.render=function(){var e;var i=this.type&&this.type.includes("h")?this.type:"p";return t(i,{class:(e={typography:true},e["typography_type_"+(this.type||"b3")]=true,e["typography_color_"+(this.color||"dark")]=true,e["typography_align_"+this.align]=!!this.align,e.typography_ellipsis=this.ellipsis,e.typography_monospace=this.monospace,e)},t("slot",null))};return e}());_i.style=Si}}}));