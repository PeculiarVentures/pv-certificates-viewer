var __extends=this&&this.__extends||function(){var e=function(t,i){e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var i in t)if(t.hasOwnProperty(i))e[i]=t[i]};return e(t,i)};return function(t,i){e(t,i);function r(){this.constructor=t}t.prototype=i===null?Object.create(i):(r.prototype=i.prototype,new r)}}();var __awaiter=this&&this.__awaiter||function(e,t,i,r){function a(e){return e instanceof i?e:new i((function(t){t(e)}))}return new(i||(i=Promise))((function(i,n){function c(e){try{l(r.next(e))}catch(t){n(t)}}function o(e){try{l(r["throw"](e))}catch(t){n(t)}}function l(e){e.done?i(e.value):a(e.value).then(c,o)}l((r=r.apply(e,t||[])).next())}))};var __generator=this&&this.__generator||function(e,t){var i={label:0,sent:function(){if(n[0]&1)throw n[1];return n[1]},trys:[],ops:[]},r,a,n,c;return c={next:o(0),throw:o(1),return:o(2)},typeof Symbol==="function"&&(c[Symbol.iterator]=function(){return this}),c;function o(e){return function(t){return l([e,t])}}function l(c){if(r)throw new TypeError("Generator is already executing.");while(i)try{if(r=1,a&&(n=c[0]&2?a["return"]:c[0]?a["throw"]||((n=a["return"])&&n.call(a),0):a.next)&&!(n=n.call(a,c[1])).done)return n;if(a=0,n)c=[c[0]&2,n.value];switch(c[0]){case 0:case 1:n=c;break;case 4:i.label++;return{value:c[1],done:false};case 5:i.label++;a=c[1];c=[0];continue;case 7:c=i.ops.pop();i.trys.pop();continue;default:if(!(n=i.trys,n=n.length>0&&n[n.length-1])&&(c[0]===6||c[0]===2)){i=0;continue}if(c[0]===3&&(!n||c[1]>n[0]&&c[1]<n[3])){i.label=c[1];break}if(c[0]===6&&i.label<n[1]){i.label=n[1];n=c;break}if(n&&i.label<n[2]){i.label=n[2];i.ops.push(c);break}if(n[2])i.ops.pop();i.trys.pop();continue}c=t.call(e,i)}catch(o){c=[6,o];a=0}finally{r=n=0}if(c[0]&5)throw c[1];return{value:c[0]?c[1]:void 0,done:true}}};System.register(["./p-4357b6d5.system.js","./p-b5d25b95.system.js","./p-352f9691.system.js"],(function(e){"use strict";var t,i,r,a,n,c,o,l,u,s,f,d,p,b,v,h,g,m,w,x,y,k,_,S,I,C,D,L,N,A,P,E,T,j,K,O,V,G,H,B,z,R,M,F,Y,q,X,U,Q,W,J,$,Z,ee,te,ie,re,ae,ne,ce,oe,le,ue,se,fe,de;return{setters:[function(e){t=e.h;i=e.r;r=e.H;a=e.c},function(e){n=e.A;c=e.a;o=e.C;l=e.i;u=e.b;s=e.V;f=e.c;d=e.I;p=e.d;b=e.W;v=e.e;h=e.f;g=e.g;m=e.T;w=e.h;x=e.D;y=e.j;k=e.k;_=e.l;S=e.m;I=e.n;C=e.o;D=e.p;L=e.v;N=e.E;A=e.q;P=e.r;E=e.O;T=e.N;j=e.s;K=e.t;O=e.B;V=e.u;G=e.U;H=e.K;B=e.w;z=e.x;R=e.S;M=e.y;F=e.z;Y=e.F;q=e.G;X=e.H;U=e.J;Q=e.L;W=e.M;J=e.P;$=e.Q;Z=e.R;ee=e.X;te=e.Y;ie=e.Z;re=e._;ae=e.$;ne=e.a0;ce=e.a1;oe=e.a2;le=e.a3;ue=e.a4},function(e){se=e.d;fe=e.a;de=e.h}],execute:function(){
/**
             * @license
             * Copyright (c) Peculiar Ventures, LLC.
             *
             * This source code is licensed under the MIT license found in the
             * LICENSE file in the root directory of this source tree.
             */
function pe(e){return new Promise((function(t,i){var r=new FileReader;r.onload=function(){return t({value:r.result,fileName:e.name,fileSize:e.size,sourceMime:e.type})};r.onerror=function(){return i(r.error)};r.readAsBinaryString(e)}))}
/**
             * @license
             * Copyright (c) Peculiar Ventures, LLC.
             *
             * This source code is licensed under the MIT license found in the
             * LICENSE file in the root directory of this source tree.
             */var be=function(e){__extends(t,e);function t(t){var i=e.call(this,t,c)||this;var r=i.getAsnExtnValue();switch(i.asn.type){case I:i.value=u.parse(r,C);break;case _:i.value=u.parse(r,S);break;case y:i.value=u.parse(r,k);break;case w:i.value=u.parse(r,x);break;case g:i.value=u.parse(r,m);break;case v:i.value=u.parse(r,h);break;case p:i.value=u.parse(r,b);break;case f:i.value=u.parse(r,d);break;case l:i.value=u.parse(r,s);break;default:i.value=o.ToHex(r)}return i}t.prototype.getAsnExtnValue=function(){return this.asn.values[0]};return t}(n);
/**
             * @license
             * Copyright (c) Peculiar Ventures, LLC.
             *
             * This source code is licensed under the MIT license found in the
             * LICENSE file in the root directory of this source tree.
             */var ve=function(e){__extends(t,e);function t(i){var r=this;var a;r=e.call(this,t.rawClarify(i),D)||this;r.thumbprints={};var n=r.asn.acinfo;r.serialNumber=o.ToHex(n.serialNumber);r.version=n.version;var c=n.attrCertValidityPeriod.notBeforeTime;if(!c){throw new Error("Cannot get 'notBefore' value")}r.notBefore=c;var l=n.attrCertValidityPeriod.notAfterTime;if(!l){throw new Error("Cannot get 'notAfter' value")}r.notAfter=l;r.validity=se(r.notBefore,r.notAfter);r.issuer=n.issuer.v1Form||((a=n.issuer.v2Form)===null||a===void 0?void 0:a.issuerName);r.holder=n.holder;return r}t.base64Clear=function(e){return e.replace(/.*base64,/,"").replace(/-----.+-----/g,"").replace(/[\s\r\n]/g,"")};t.rawClarify=function(e){var i=t.base64Clear(e);var r;if(L.isHex(i)){r=o.FromHex(i)}else if(L.isBase64(i)||L.isPem(i)){r=o.FromBase64(i)}else{r=o.FromBinary(e)}return r};Object.defineProperty(t.prototype,"signature",{get:function(){var e=this.asn,t=e.signatureValue,i=e.signatureAlgorithm;return{value:t,algorithm:i.algorithm}},enumerable:false,configurable:true});t.prototype.parseExtensions=function(){var e=this.asn.acinfo;if(e.extensions){this.extensions=e.extensions.map((function(e){return new N(A.serialize(e))}))}};t.prototype.parseAttributes=function(){var e=this.asn.acinfo;if(e.attributes){this.attributes=e.attributes.map((function(e){return new be(A.serialize(e))}))}};t.prototype.getThumbprint=function(e){if(e===void 0){e="SHA-1"}return __awaiter(this,void 0,void 0,(function(){var t,i,r;return __generator(this,(function(a){switch(a.label){case 0:a.trys.push([0,2,,3]);t=P.get();return[4,t.subtle.digest(e,this.raw)];case 1:i=a.sent();this.thumbprints[e["name"]||e]=o.ToHex(i);return[3,3];case 2:r=a.sent();console.error("Error thumbprint get:",r);return[3,3];case 3:return[2]}}))}))};t.prototype.export=function(e){if(e==="base64"){return o.ToBase64(this.raw)}if(e==="hex"){return t.stringToHex(o.ToHex(this.raw))}if(e==="pem"){return t.base64ToPem(o.ToBase64(this.raw))}return""};t.stringToHex=function(e){return e.replace(/(.{32})/g,"$1\n").replace(/(.{4})/g,"$1 ").trim()};t.base64ToPem=function(e){return"-----BEGIN ATTRIBUTE CERTIFICATE-----\n"+e.replace(/(.{64})/g,"$1\n")+"\n-----END ATTRIBUTE CERTIFICATE-----"};Object.defineProperty(t.prototype,"commonName",{get:function(){return"attribute-certificate-"+this.thumbprints["SHA-1"]},enumerable:false,configurable:true});return t}(n);
/**
             * @license
             * Copyright (c) Peculiar Ventures, LLC.
             *
             * This source code is licensed under the MIT license found in the
             * LICENSE file in the root directory of this source tree.
             */function he(e){var t=E[e];if(t){return t+" ("+e+")"}return e}
/**
             * @license
             * Copyright (c) Peculiar Ventures, LLC.
             *
             * This source code is licensed under the MIT license found in the
             * LICENSE file in the root directory of this source tree.
             */function ge(e){return e.indexOf("http")===0}
/**
             * @license
             * Copyright (c) Peculiar Ventures, LLC.
             *
             * This source code is licensed under the MIT license found in the
             * LICENSE file in the root directory of this source tree.
             */var me=function(e){var i=e.value;if(!i){return null}return t("tr",{class:"title"},t("td",{colSpan:2},t("peculiar-typography",{type:"h6"},i)))};var we=function(e){var i=e.name,r=e.value,a=e.monospace,n=e.collapse,c=e.href,o=e.extraValue;if(!i){return null}if(r===undefined||r===null){return null}var l;if(n){l=t("peculiar-text-hider",null,r)}else{l=r}var u=!!r.toString();return t("tr",null,t("td",{colSpan:u?1:2},t("peculiar-typography",{color:"grey_5"},i,u?":":"")),u&&t("td",{class:{monospace:a}},ge(r.toString())||c?t("peculiar-link",{href:c||r.toString()},r):t("peculiar-typography",{monospace:a},l,o)))};
/**
             * @license
             * Copyright (c) Peculiar Ventures, LLC.
             *
             * This source code is licensed under the MIT license found in the
             * LICENSE file in the root directory of this source tree.
             */var xe=function(e){var i=e.signature;if(!i){return null}return[t(me,{value:"Signature"}),t(we,{name:"Algorithm",value:he(i.algorithm)}),t(we,{name:"Value",value:o.ToHex(i.value),monospace:true,collapse:true})]};
/**
             * @license
             * Copyright (c) Peculiar Ventures, LLC.
             *
             * This source code is licensed under the MIT license found in the
             * LICENSE file in the root directory of this source tree.
             */var ye=function(e,i){var r=e.attribute;return[t(we,{name:"Name",value:he(r.asn.type)}),i,t("tr",null,t("td",{colSpan:2,class:"divider"},t("span",{class:"bg_fill"})))]};
/**
             * @license
             * Copyright (c) Peculiar Ventures, LLC.
             *
             * This source code is licensed under the MIT license found in the
             * LICENSE file in the root directory of this source tree.
             */var ke=function(e){var i=e.name;if(!i){return null}return i.map((function(e){return e.map((function(e){return t(we,{name:E[e.type]||e.type,value:e.value.toString()})}))}))};
/**
             * @license
             * Copyright (c) Peculiar Ventures, LLC.
             *
             * This source code is licensed under the MIT license found in the
             * LICENSE file in the root directory of this source tree.
             */var _e=function(e){var i=e.attribute;return t(ye,{attribute:i},t(ke,{name:i.value}))};
/**
             * @license
             * Copyright (c) Peculiar Ventures, LLC.
             *
             * This source code is licensed under the MIT license found in the
             * LICENSE file in the root directory of this source tree.
             */var Se={otherName:"Other Name",rfc822Name:"RFC 822 Name",dNSName:"DNS Name",x400Address:"X400 Address",directoryName:"Directory Name",ediPartyName:"Edi Party Name ",uniformResourceIdentifier:"URI",iPAddress:"IP Address",registeredID:"Registered ID"};var Ie=function(e){var i=e.generalName,r=e.getDNSNameLink,a=e.getIPAddressLink;if(!i){return null}return Object.keys(i).map((function(e){var n=i[e];if(n instanceof T){return[t(we,{name:Se[e]||e,value:""}),n.map((function(e){return e.map((function(e){return t(we,{name:E[e.type]||e.type,value:e.value.toString()})}))}))]}if(n instanceof j){var c=u.parse(n.value,K);return t(we,{name:E[n.typeId],value:c.toString()})}if(O.isBufferSource(n)){return t(we,{name:Se[e]||e,value:o.ToString(n)})}if(n instanceof V){return t(we,{name:Se[e]||e,value:o.ToString(n.partyName)})}if(e==="dNSName"){return t(we,{name:Se[e]||e,value:n,href:r(n)})}if(e==="iPAddress"){return t(we,{name:Se[e]||e,value:n,href:a(n)})}return t(we,{name:Se[e]||e,value:n})}))};
/**
             * @license
             * Copyright (c) Peculiar Ventures, LLC.
             *
             * This source code is licensed under the MIT license found in the
             * LICENSE file in the root directory of this source tree.
             */var Ce=function(e){var i=e.attribute;return t(ye,{attribute:i},t(we,{name:"Code Authority",value:""}),t(Ie,{generalName:i.value.codeAuthority,getDNSNameLink:function(){return""},getIPAddressLink:function(){return""}}),t(we,{name:"Code Id",value:""}),t(Ie,{generalName:i.value.codeId,getDNSNameLink:function(){return""},getIPAddressLink:function(){return""}}),t(we,{name:"Short Name",value:i.value.shortName}),t(we,{name:"Short Description",value:i.value.shortDescription}))};
/**
             * @license
             * Copyright (c) Peculiar Ventures, LLC.
             *
             * This source code is licensed under the MIT license found in the
             * LICENSE file in the root directory of this source tree.
             */var De=function(e){var i=e.attribute;return t(ye,{attribute:i},t(we,{name:"Assessment Authority",value:""}),t(Ie,{generalName:i.value.assessmentAuthority,getDNSNameLink:function(){return""},getIPAddressLink:function(){return""}}),t(we,{name:"Assessment Location",value:""}),t(Ie,{generalName:i.value.assessmentLocation,getDNSNameLink:function(){return""},getIPAddressLink:function(){return""}}),t(we,{name:"Assessment Ref",value:""}),t(Ie,{generalName:i.value.assessmentRef,getDNSNameLink:function(){return""},getIPAddressLink:function(){return""}}),t(we,{name:"Data Storage Territory",value:i.value.dataStorageTerritory}),t(we,{name:"Description",value:i.value.description}))};
/**
             * @license
             * Copyright (c) Peculiar Ventures, LLC.
             *
             * This source code is licensed under the MIT license found in the
             * LICENSE file in the root directory of this source tree.
             */var Le=function(e){var i=e.attribute;var r=i.value.base+" * 10^"+i.value.degree+" "+i.value.location;return t(ye,{attribute:i},t(we,{name:"Value",value:r}))};
/**
             * @license
             * Copyright (c) Peculiar Ventures, LLC.
             *
             * This source code is licensed under the MIT license found in the
             * LICENSE file in the root directory of this source tree.
             */var Ne=function(e){var i=e.attribute;return t(ye,{attribute:i},Object.keys(i.value).map((function(e){return t(we,{name:e,value:i.value[e].toNumber()?"YES":"NO"})})))};
/**
             * @license
             * Copyright (c) Peculiar Ventures, LLC.
             *
             * This source code is licensed under the MIT license found in the
             * LICENSE file in the root directory of this source tree.
             */var Ae=function(e){var t=1;if(e/100>1){t=100}else if(e/10>1){t=10}return e+"/"+5*t};var Pe=function(e){var i=e.attribute;var r=Object.keys(i.value).map((function(e){return[Ae(i.value[e]),t("br",null)]}));return t(ye,{attribute:i},t(we,{name:"Value",value:r}))};
/**
             * @license
             * Copyright (c) Peculiar Ventures, LLC.
             *
             * This source code is licensed under the MIT license found in the
             * LICENSE file in the root directory of this source tree.
             */var Ee=function(e){var i=e.attributes;if(!i||!i.length){return null}return[t(me,{value:"Attributes"}),i.map((function(e){try{if(e.value instanceof T){return t(_e,{attribute:e})}if(e.value instanceof h){return t(Ce,{attribute:e})}if(e.value instanceof b){return t(De,{attribute:e})}if(e.value instanceof d){return t(Le,{attribute:e})}if(e.value instanceof m){return t(Ne,{attribute:e})}if(e.value instanceof s){return t(Pe,{attribute:e})}return null}catch(i){console.error("Error render attribute:",e.asn.type);return null}}))]};
/**
             * @license
             * Copyright (c) Peculiar Ventures, LLC.
             *
             * This source code is licensed under the MIT license found in the
             * LICENSE file in the root directory of this source tree.
             */var Te=function(e){var i=e.thumbprints;if(!i){return null}var r=Object.keys(i);if(!r.length){return null}return[t(me,{value:"Thumbprints"}),r.map((function(e){return t(we,{name:e,value:i[e],monospace:true})}))]};
/**
             * @license
             * Copyright (c) Peculiar Ventures, LLC.
             *
             * This source code is licensed under the MIT license found in the
             * LICENSE file in the root directory of this source tree.
             */var je=function(e,i){var r=e.extension;return[t(we,{name:"Name",value:he(r.asn.extnID)}),t(we,{name:"Critical",value:r.asn.critical?"YES":"NO"}),i,t("tr",null,t("td",{colSpan:2,class:"divider"},t("span",{class:"bg_fill"})))]};
/**
             * @license
             * Copyright (c) Peculiar Ventures, LLC.
             *
             * This source code is licensed under the MIT license found in the
             * LICENSE file in the root directory of this source tree.
             */var Ke=function(e){var i=e.extension;return t(je,{extension:i},t(we,{name:"Usage",value:i.value.toJSON().join(", ")}))};
/**
             * @license
             * Copyright (c) Peculiar Ventures, LLC.
             *
             * This source code is licensed under the MIT license found in the
             * LICENSE file in the root directory of this source tree.
             */var Oe=function(e){var i=e.extension;return t(je,{extension:i},t(we,{name:"Certificate Authority",value:i.value.cA?"YES":"NO"}),t(we,{name:"Path Length Constraint",value:i.value.pathLenConstraint}))};
/**
             * @license
             * Copyright (c) Peculiar Ventures, LLC.
             *
             * This source code is licensed under the MIT license found in the
             * LICENSE file in the root directory of this source tree.
             */var Ve=function(e){var i=e.extension;return t(je,{extension:i},i.value.map((function(e,i){return t(we,{name:"Purpose #"+(i+1),value:he(e)})})))};
/**
             * @license
             * Copyright (c) Peculiar Ventures, LLC.
             *
             * This source code is licensed under the MIT license found in the
             * LICENSE file in the root directory of this source tree.
             */var Ge=function(e){var i=e.extension,r=e.getSubjectKeyIdChildrenLink,a=e.getSubjectKeyIdSiblingsLink;var n=o.ToHex(i.value.buffer);var c=r(n);var l=a(n);return t(je,{extension:i},t(we,{name:"Key ID",value:n,monospace:true,extraValue:[c&&t("span",null," [",t("peculiar-link",{href:c},"children"),"]"),l&&t("span",null," [",t("peculiar-link",{href:l},"siblings"),"]")]}))};
/**
             * @license
             * Copyright (c) Peculiar Ventures, LLC.
             *
             * This source code is licensed under the MIT license found in the
             * LICENSE file in the root directory of this source tree.
             */var He=function(e){var i=e.extension,r=e.getAuthKeyIdParentLink,a=e.getAuthKeyIdSiblingsLink;var n=o.ToHex(i.value.keyIdentifier.buffer);var c=r(n);var l=a(n);return t(je,{extension:i},t(we,{name:"Key ID",value:n,monospace:true,extraValue:[c&&t("span",null," [",t("peculiar-link",{href:c},"parents"),"]"),l&&t("span",null," [",t("peculiar-link",{href:l},"siblings"),"]")]}))};
/**
             * @license
             * Copyright (c) Peculiar Ventures, LLC.
             *
             * This source code is licensed under the MIT license found in the
             * LICENSE file in the root directory of this source tree.
             */var Be=function(e){var i=e.extension;return t(je,{extension:i},i.value.map((function(i){var r;return(r=i===null||i===void 0?void 0:i.distributionPoint)===null||r===void 0?void 0:r.fullName.map((function(i){return t(Ie,Object.assign({generalName:i},e))}))})))};
/**
             * @license
             * Copyright (c) Peculiar Ventures, LLC.
             *
             * This source code is licensed under the MIT license found in the
             * LICENSE file in the root directory of this source tree.
             */var ze=function(e){var i=e.extension;return t(je,{extension:i},i.value.map((function(i,r){return[t(we,{name:"Method #"+(r+1),value:he(i.accessMethod)}),t(Ie,Object.assign({generalName:i.accessLocation},e))]})))};
/**
             * @license
             * Copyright (c) Peculiar Ventures, LLC.
             *
             * This source code is licensed under the MIT license found in the
             * LICENSE file in the root directory of this source tree.
             */var Re=function(e){var i=e.extension;return t(je,{extension:i},i.value.map((function(i){return t(Ie,Object.assign({generalName:i},e))})))};
/**
             * @license
             * Copyright (c) Peculiar Ventures, LLC.
             *
             * This source code is licensed under the MIT license found in the
             * LICENSE file in the root directory of this source tree.
             */var Me=function(e){var i=e.extension;return t(je,{extension:i},i.value.map((function(e,i){var r;return[t(we,{name:"Policy ID #"+(i+1),value:he(e.policyIdentifier)}),(r=e.policyQualifiers)===null||r===void 0?void 0:r.map((function(e,i){var r=[t(we,{name:"Qualifier ID #"+(i+1),value:he(e.policyQualifierId)})];if(e.policyQualifierId==="1.3.6.1.5.5.7.2.1"){var a=u.parse(e.qualifier,K);r.push(t(we,{name:"Value",value:a.toString()}))}if(e.policyQualifierId==="1.3.6.1.5.5.7.2.2"){var a=u.parse(e.qualifier,G);if(a.explicitText){r.push(t(we,{name:"Value",value:a.explicitText.toString()}))}}return r})),t("tr",null,t("td",null),t("td",null))]})))};
/**
             * @license
             * Copyright (c) Peculiar Ventures, LLC.
             *
             * This source code is licensed under the MIT license found in the
             * LICENSE file in the root directory of this source tree.
             */var Fe={"9606c02c690033aa1d145f59c6e2648d0549f0df96aab8db915a70d8ecf390a5":"Akamai CT","39376f545f7b4607f59742d768cd5d2437bf3473b6534a4834bcf72e681c83c9":"Alpha CT",a577ac9ced7548dd8f025b67a241089df86e0f476ec203c2ecbedb185f282638:"CNNIC CT",cdb5179b7fc1c046feea31136a3f8f002e6182faf8896fecc8b2f5b5ab604900:"Certly.IO","1fbc36e002ede97f40199e86b3573b8a4217d80187746ad0da03a06054d20df4":"Cloudflare “Nimbus2017”",db74afeecb29ecb1feca3e716d2ce5b9aabb36f7847183c75d9d4f37b61fbf64:"Cloudflare “Nimbus2018”","747eda8331ad331091219cce254f4270c2bffd5e422008c6373579e6107bcc56":"Cloudflare “Nimbus2019”","5ea773f9df56c0e7b536487dd049e0327a919a0c84a112128418759681714558":"Cloudflare “Nimbus2020”","4494652eb0eeceafc44007d8a8fe28c0dae682bed8cb31b53fd33396b5b681a8":"Cloudflare “Nimbus2021”","41c8cab1df22464a10c6a13a0942875e4e318b1b03ebeb4bc768f090629606f6":"Cloudflare “Nimbus2022”","7a328c54d8b72db620ea38e0521ee98416703213854d3bd22bc13a57a352eb52":"Cloudflare “Nimbus2023”","6ff141b5647e4222f7ef052cefae7c21fd608e27d2af5a6e9f4b8a37d6633ee5":"DigiCert Nessie2018",fe446108b1d01ab78a62ccfeab6ab2b2babff3abdad80a4d8b30df2d0008830c:"DigiCert Nessie2019",c652a0ec48ceb3fcab170992c43a87413309e80065a26252401ba3362a17c565:"DigiCert Nessie2020",eec095ee8d72640f92e3c3b91bc712a3696a097b4b6a1a1438e647b2cbedc5f9:"DigiCert Nessie2021","51a3b0f5fd01799c566db837788f0ca47acc1b27cbf79e88429a0dfed48b05e5":"DigiCert Nessie2022",b3737707e18450f86386d605a9dc11094a792db1670c0b87dcf0030e7936a59a:"DigiCert Nessie2023","5614069a2fd7c2ecd3f5e1bd44b23ec74676b9bc99115cc0ef949855d689d0dd":"DigiCert Server","8775bfe7597cf88c43995fbdf36eff568d475636ff4ab560c1b4eaff5ea0830f":"DigiCert Server 2",c1164ae0a772d2d4392dc80ac10770d4f0c49bde991a4840c1fa075164f63360:"DigiCert Yeti2018",e2694bae26e8e94009e8861bb63b83d43ee7fe7488fba48f2893019dddf1dbfe:"DigiCert Yeti2019",f095a459f200d18240102d2f93888ead4bfe1d47e399e1d034a6b0a8aa8eb273:"DigiCert Yeti2020","5cdc4392fee6ab4544b15e9ad456e61037fbd5fa47dca17394b25ee6f6c70eca":"DigiCert Yeti2021","2245450759552456963fa12ff1f76d86e0232663adc04b7f5dc6835c6ee20f02":"DigiCert Yeti2022","35cf191bbfb16c57bf0fad4c6d42cbbbb627202651ea3fe12aefa803c33bd64c":"DigiCert Yeti2023","717ea7420975be84a2723553f1777c26dd51af4e102144094d9019b462fb6668":"GDCA 1","14308d90ccd030135005c01ca526d81e84e87624e39b6248e08f724aea3bb42a":"GDCA 2",c9cf890a21109c666cc17a3ed065c930d0e0135a9feba85af14210b8072421aa:"GDCA CT #1","924a30f909336ff435d6993a10ac75a2c641728e7fc2d659ae6188ffad40ce01":"GDCA CT #2",fad4c97cc49ee2f8ac85c5ea5cea09d0220dbbf4e49c6b50662ff868f86b8c28:"Google “Argon2017”",a4501269055a15545e6211ab37bc103f62ae5576a45e4b1714453e1b22106a25:"Google “Argon2018”","63f2dbcde83bcc2ccf0b728427576b33a48d61778fbd75a638b1c768544bd88d":"Google “Argon2019”",b21e05cc8ba2cd8a204e8766f92bb98a2520676bdafa70e7b249532def8b905e:"Google “Argon2020”",f65c942fd1773022145418083094568ee34d131933bfdf0c2f200bcc4ef164e3:"Google “Argon2021”","2979bef09e393921f056739f63a577e5be577d9c600af8f94d5d265c255dc784":"Google “Argon2022”","68f698f81f6482be3a8ceeb9281d4cfc71515d6793d444d10a67acbb4f4ffbc4":"Google “Aviator”",c3bf03a7e1ca8841c607bae3ff4270fca5ec45b186ebbe4e2cf3fc778630f5f6:"Google “Crucible”","1d024b8eb1498b344dfd87ea3efc0996f7506f235d1d497061a4773c439c25fb":"Google “Daedalus”","293c519654c83965baaa50fc5807d4b76fbf587a2972dca4c30cf4e54547f478":"Google “Icarus”",a4b90990b418581487bb13a2cc67700a3c359804f91bdfb8e377cd0ec80ddc10:"Google “Pilot”",ee4bbdb775ce60bae142691fabe19e66a30f7e5fb072d88300c47b897aa8fdcb:"Google “Rocketeer”",bbd9dfbc1f8a71b593942397aa927b473857950aab52e81a909664368e1ed185:"Google “Skydiver”","52eb4b225ec896974850675f23e43bc1d021e3214ce52ecd5fa87c203cdfca03":"Google “Solera2018”","0b760e9a8b9a682f88985b15e947501a56446bba8830785c3842994386450c00":"Google “Solera2019”","1fc72ce5a1b799f400c359bff96ca3913548e8644220610952e9ba1774f7bac7":"Google “Solera2020”",a3c99845e80ab7ce00157b3742df0207dd272b2b602ecf98ee2c12db9c5ae7e7:"Google “Solera2021”","697aafca1a6b536fae21205046debad7e0eaea13d2432e6e9d8fb379f2b9aaf3":"Google “Solera2022”",a899d8780c9290aaf462f31880ccfbd52451e970d0fbf591ef75b0d99b645681:"Google “Submariner”",b0cc83e5a5f97d6baf7c09cc284904872ac7e88b132c6350b7c6fd26e16c6c77:"Google “Testtube”",b10cd559a6d67846811f7df9a51532739ac48d703bea0323da5d38755bc0ad4e:"Google “Xenon2018”","084114980071532c16190460bcfc47fdc2653afa292c72b37ff863ae29ccc9f0":"Google “Xenon2019”","07b75c1be57d68fff1b0c61d2315c7bae6577c5794b76aeebc613a1a69d3a21c":"Google “Xenon2020”","7d3ef2f88fff88556824c2c0ca9e5289792bc50e78097f2e6a9768997e22f0d7":"Google “Xenon2021”","46a555eb75fa912030b5a28969f4f37d112c4174befd49b885abf2fc70fe6d47":"Google “Xenon2022”","7461b4a09cfb3d41d75159575b2e7649a445a8d27709b0cc564a6482b7eb41a3":"Izenpe","8941449c70742e06b9fc9ce7b116ba0024aa36d59af44f0204404f00f7ea8566":"Izenpe “Argi”","296afa2d568bca0d2ea844956ae9721fc35fa355ecda99693aafd458a71aefdd":"Let“s Encrypt ”Clicky”","537b69a3564335a9c04904e39593b2c298eb8d7a6e83023635c627248cd6b440":"Nordu “flimsy”",aae70b7f3cb8d566c86c2f16979c9f445f69ab0eb4535589b2f77a030104f3cd:"Nordu “plausible”",e0127629e90496564e3d0147984498aa48f8adb16600eb7902a1ef9909906273:"PuChuangSiDa CT",cf55e28923497c340d5206d05353aeb25834b52f1f8dc9526809f212efdd7ca6:"SHECA CT 1","32dc59c2d4c41968d56e14bc61ac8f0e45db39faf3c155aa4252f5001fa0c623":"SHECA CT 2",db76fdadac65e7d09508886e2159bd8b90352f5fead3e3dc5e22eb350acc7b98:"Sectigo (Comodo) “Dodo” CT","6f5376ac31f03119d89900a45115ff77151c11d902c10029068db2089a37d913":"Sectigo (Comodo) “Mammoth” CT","5581d4c2169036014aea0b9b573c53f0c0e43878702508172fa3aa1d0713d30c":"Sectigo (Comodo) “Sabre” CT","34bb6ad6c3df9c03eea8a499ff7891486c9d5e5cac92d01f7bfd1bce19db48ef":"StartCom",ddeb1d2b7a0d4fa6208b81ad8168707e2e8e9d01d55c888d3d11c4cdb6ecbecc:"Symantec",a7ce4a4e6207e0addee5fdaa4b1f86768767b5d002a55d47310e7e670a95eab2:"Symantec Deneb","15970488d7b997a05beb52512adee8d2e8b4a3165264121a9fabfbd5f85ad93f":"Symantec “Sirius”",bc78e1dfc5f63c684649334da10fa15f0979692009c081b4f3f6917f3ed9b8a5:"Symantec “Vega”",b0b784bc81c0ddc47544e883f05985bb9077d134d8ab88b2b2e533980b8e508b:"Up In The Air “Behind the Sofa”",ac3b9aed7fa9674757159e6d7d575672f9d98100941e9bdeffeca1313b75782d:"Venafi","03019df3fd85a69a8ebd1facc6da9ba73e469774fe77f579fc5a08b8328c1d6b":"Venafi Gen2 CT","41b2dc2e89e63ce4af1ba7bb29bf68c6dee6f9f1cc047e30dffae3b3ba259263":"WoSign","63d0006026dde10bb0601f452446965ee2b6ea2cd4fbc95ac866a550af9075b7":"WoSign 2","9e4ff73dc3ce220b69217c899e468076abf8d78636d5ccfc85a31a75628ba88b":"WoSign CT #1"};
/**
             * @license
             * Copyright (c) Peculiar Ventures, LLC.
             *
             * This source code is licensed under the MIT license found in the
             * LICENSE file in the root directory of this source tree.
             */var Ye=function(e){var i=e.extension;return t(je,{extension:i},i.value.toJSON().map((function(e){return[t(we,{name:"SCT Version",value:e.version+1}),t(we,{name:"Log Operator",value:Fe[e.logId]||e.logId}),t(we,{name:"Log Key ID",value:e.logId,monospace:true}),t(we,{name:"Timestamp",value:fe(e.timestamp)}),t(we,{name:"Signature Algorithm",value:(e.hashAlgorithm+" "+e.signatureAlgorithm).toUpperCase()}),t(we,{name:"Signature",value:e.signature,monospace:true}),t("tr",null,t("td",null),t("td",null))]})))};
/**
             * @license
             * Copyright (c) Peculiar Ventures, LLC.
             *
             * This source code is licensed under the MIT license found in the
             * LICENSE file in the root directory of this source tree.
             */var qe=function(e){var i,r;var a=e.extension;return t(je,{extension:a},(i=a.value.excludedSubtrees)===null||i===void 0?void 0:i.map((function(i){return t(Ie,Object.assign({generalName:i.base},e))})),(r=a.value.permittedSubtrees)===null||r===void 0?void 0:r.map((function(i){return t(Ie,Object.assign({generalName:i.base},e))})))};
/**
             * @license
             * Copyright (c) Peculiar Ventures, LLC.
             *
             * This source code is licensed under the MIT license found in the
             * LICENSE file in the root directory of this source tree.
             */var Xe=function(e){var i=e.extension;return t(je,{extension:i},t(we,{name:"Template ID",value:i.value.templateID}),t(we,{name:"Template Major Version",value:i.value.templateMajorVersion}),t(we,{name:"Template Minor Version",value:i.value.templateMinorVersion}))};
/**
             * @license
             * Copyright (c) Peculiar Ventures, LLC.
             *
             * This source code is licensed under the MIT license found in the
             * LICENSE file in the root directory of this source tree.
             */var Ue=function(e){var i=e.extension;return t(je,{extension:i},t(we,{name:"Name",value:i.value.name}))};
/**
             * @license
             * Copyright (c) Peculiar Ventures, LLC.
             *
             * This source code is licensed under the MIT license found in the
             * LICENSE file in the root directory of this source tree.
             */var Qe=function(e){var i=e.extension;var r=i.value.getVersion();return t(je,{extension:i},t(we,{name:"Certificate Index",value:r.certificateIndex}),t(we,{name:"Key Index",value:r.keyIndex}))};
/**
             * @license
             * Copyright (c) Peculiar Ventures, LLC.
             *
             * This source code is licensed under the MIT license found in the
             * LICENSE file in the root directory of this source tree.
             */var We=function(e){var i=e.extension;return t(je,{extension:i},i.value.map((function(e,i){return t(we,{name:"Statement #"+(i+1),value:he(e.statementId)})})))};
/**
             * @license
             * Copyright (c) Peculiar Ventures, LLC.
             *
             * This source code is licensed under the MIT license found in the
             * LICENSE file in the root directory of this source tree.
             */var Je=function(e){var i=e.extension;return t(je,{extension:i},t(we,{name:"Comment",value:i.value.value}))};
/**
             * @license
             * Copyright (c) Peculiar Ventures, LLC.
             *
             * This source code is licensed under the MIT license found in the
             * LICENSE file in the root directory of this source tree.
             */var $e=function(e){var i=e.extension;return t(je,{extension:i},t(we,{name:"Type",value:i.value.toJSON().join(", ")}))};
/**
             * @license
             * Copyright (c) Peculiar Ventures, LLC.
             *
             * This source code is licensed under the MIT license found in the
             * LICENSE file in the root directory of this source tree.
             */var Ze=function(e){var i=e.extension;return t(je,{extension:i},t(we,{name:"Role",value:i.value.text}))};
/**
             * @license
             * Copyright (c) Peculiar Ventures, LLC.
             *
             * This source code is licensed under the MIT license found in the
             * LICENSE file in the root directory of this source tree.
             */var et=function(e){var i=e.extension,r=e.getLEILink;return t(je,{extension:i},t(we,{name:"Identifier",value:i.value.text,href:r(i.value.text)}))};
/**
             * @license
             * Copyright (c) Peculiar Ventures, LLC.
             *
             * This source code is licensed under the MIT license found in the
             * LICENSE file in the root directory of this source tree.
             */var tt=function(e){var i=e.extension;return t(je,{extension:i},t(we,{name:"Version",value:i.value.version}),t(Ie,Object.assign({generalName:i.value.location},e)),t(we,{name:"Requires Auth",value:i.value.requiresAuth?"YES":"NO"}))};
/**
             * @license
             * Copyright (c) Peculiar Ventures, LLC.
             *
             * This source code is licensed under the MIT license found in the
             * LICENSE file in the root directory of this source tree.
             */var it=function(e){var i=e.extension;return t(je,{extension:i},t(we,{name:"Version",value:i.value.version}))};
/**
             * @license
             * Copyright (c) Peculiar Ventures, LLC.
             *
             * This source code is licensed under the MIT license found in the
             * LICENSE file in the root directory of this source tree.
             */var rt=function(e){var i=e.extension;return t(je,{extension:i},t(we,{name:"Reason",value:i.value.toJSON()}))};
/**
             * @license
             * Copyright (c) Peculiar Ventures, LLC.
             *
             * This source code is licensed under the MIT license found in the
             * LICENSE file in the root directory of this source tree.
             */function at(e){return o.ToString(e.values[0])}
/**
             * @license
             * Copyright (c) Peculiar Ventures, LLC.
             *
             * This source code is licensed under the MIT license found in the
             * LICENSE file in the root directory of this source tree.
             */var nt=function(e){var i=e.extension;return t(je,{extension:i},i.value.map((function(e,i){return[t(we,{name:"Attribute #"+(i+1),value:he(e.type)}),t(we,{name:"Value #"+(i+1),value:at(e)}),t("tr",null,t("td",null),t("td",null))]})))};
/**
             * @license
             * Copyright (c) Peculiar Ventures, LLC.
             *
             * This source code is licensed under the MIT license found in the
             * LICENSE file in the root directory of this source tree.
             */var ct=function(e){var i=e.extension;return t(je,{extension:i},t(we,{name:"Value",value:i.value,monospace:true}))};
/**
             * @license
             * Copyright (c) Peculiar Ventures, LLC.
             *
             * This source code is licensed under the MIT license found in the
             * LICENSE file in the root directory of this source tree.
             */var ot=function(e){var i=e.extensions;if(!i||!i.length){return null}return[t(me,{value:"Extensions"}),i.map((function(i){try{if(i.value instanceof H){return t(Ke,{extension:i})}if(i.value instanceof B){return t(Oe,{extension:i})}if(i.value instanceof z){return t(Ve,{extension:i})}if(i.value instanceof R){return t(Ge,Object.assign({extension:i},e))}if(i.value instanceof M){return t(He,Object.assign({extension:i},e))}if(i.value instanceof F){return t(Be,Object.assign({extension:i},e))}if(i.value instanceof Y){return t(ze,Object.assign({extension:i},e))}if(i.value instanceof q){return t(Re,Object.assign({extension:i},e))}if(i.value instanceof X){return t(Me,{extension:i})}if(i.value instanceof U){return t(Ye,{extension:i})}if(i.value instanceof Q){return t(qe,Object.assign({extension:i},e))}if(i.value instanceof W){return t(Xe,{extension:i})}if(i.value instanceof J){return t(Ue,{extension:i})}if(i.value instanceof $){return t(Qe,{extension:i})}if(i.value instanceof Z){return t(We,{extension:i})}if(i.value instanceof ee){return t(Je,{extension:i})}if(i.value instanceof te){return t($e,{extension:i})}if(i.value instanceof ie){return t(Ze,{extension:i})}if(i.value instanceof re){return t(et,Object.assign({extension:i},e))}if(i.value instanceof ae){return t(tt,Object.assign({extension:i},e))}if(i.value instanceof ne){return t(it,{extension:i})}if(i.value instanceof ce){return t(rt,{extension:i})}if(i.value instanceof oe){return t(nt,{extension:i})}if(typeof i.value==="string"){return t(ct,{extension:i})}return t(je,{extension:i})}catch(r){console.error("Error render extension:",i.asn.extnID);return null}}))]};
/**
             * @license
             * Copyright (c) Peculiar Ventures, LLC.
             *
             * This source code is licensed under the MIT license found in the
             * LICENSE file in the root directory of this source tree.
             */var lt=function(e){var i=e.serialNumber,r=e.version,a=e.validity,n=e.notBefore,c=e.notAfter;return[t(me,{value:"Basic Information"}),t(we,{name:"Serial Number",value:i,monospace:true}),t(we,{name:"Version",value:r}),t(we,{name:"Validity",value:a}),t(we,{name:"Issued",value:fe(n)}),t(we,{name:"Expired",value:fe(c)})]};
/**
             * @license
             * Copyright (c) Peculiar Ventures, LLC.
             *
             * This source code is licensed under the MIT license found in the
             * LICENSE file in the root directory of this source tree.
             */function ut(e){le.certificate.asPEM(e.export("pem"),e.commonName)}function st(e){le.certificate.asDER(e.export("hex"),e.commonName)}var ft=function(e){var i=e.certificate;return[t(me,{value:"Miscellaneous"}),t("tr",null,t("td",{class:"vertical_align_middle"},t("peculiar-typography",{color:"grey_5"},"Download:")),t("td",null,t("peculiar-button-split",{onClick:ut.bind(undefined,i),actions:[{text:"Download DER",onClick:st.bind(undefined,i)}]},"Download PEM")))]};
/**
             * @license
             * Copyright (c) Peculiar Ventures, LLC.
             *
             * This source code is licensed under the MIT license found in the
             * LICENSE file in the root directory of this source tree.
             */var dt=function(e){var i=e.issuer;if(!i){return null}return[t(me,{value:"Issuer"}),i.map((function(e){return t(Ie,{generalName:e,getDNSNameLink:function(){return""},getIPAddressLink:function(){return""}})}))]};
/**
             * @license
             * Copyright (c) Peculiar Ventures, LLC.
             *
             * This source code is licensed under the MIT license found in the
             * LICENSE file in the root directory of this source tree.
             */var pt=function(e){var i=e.holder;if(!i){return null}var r=i.baseCertificateID,a=i.objectDigestInfo;return[t(me,{value:"Holder"}),r&&[r.issuer.map((function(e){return t(Ie,{generalName:e,getDNSNameLink:function(){return""},getIPAddressLink:function(){return""}})})),t("tr",null,t("td",null),t("td",null)),t(we,{name:"Serial",value:o.ToHex(r.serial),monospace:true}),t("tr",null,t("td",null),t("td",null))],a&&[t(we,{name:"Digest Info",value:""}),t(we,{name:"Algorithm",value:he(a.digestAlgorithm.algorithm)}),t(we,{name:"Value",value:o.ToHex(a.objectDigest),monospace:true}),t(we,{name:"Type",value:a.digestedObjectType})]]};var bt=".sc-peculiar-attribute-certificate-viewer-h{display:block;width:100%;word-wrap:break-word;position:relative;min-width:280px;min-height:300px;background:rgb(var(--peculiar-color-light-rgb))}th.sc-peculiar-attribute-certificate-viewer,td.sc-peculiar-attribute-certificate-viewer{border:none}table.sc-peculiar-attribute-certificate-viewer{width:100%;margin-bottom:30px}table.sc-peculiar-attribute-certificate-viewer .title.sc-peculiar-attribute-certificate-viewer td.sc-peculiar-attribute-certificate-viewer{border-color:rgba(var(--peculiar-color-grey_3-rgb), 0.5);padding-top:60px;padding-bottom:15px;border-bottom-width:1px;border-bottom-style:solid}table.sc-peculiar-attribute-certificate-viewer td.sc-peculiar-attribute-certificate-viewer:first-child{padding-left:30px;width:130px;padding-right:10px}table.sc-peculiar-attribute-certificate-viewer td.sc-peculiar-attribute-certificate-viewer:last-child{padding-right:30px;width:calc(100% - 130px)}table.sc-peculiar-attribute-certificate-viewer td.sc-peculiar-attribute-certificate-viewer{vertical-align:top;padding-top:5px;padding-bottom:5px}table.sc-peculiar-attribute-certificate-viewer td.vertical_align_middle.sc-peculiar-attribute-certificate-viewer{vertical-align:middle}table.sc-peculiar-attribute-certificate-viewer .title.sc-peculiar-attribute-certificate-viewer:first-child td.sc-peculiar-attribute-certificate-viewer{padding-top:15px}table.sc-peculiar-attribute-certificate-viewer .title.sc-peculiar-attribute-certificate-viewer+tr.sc-peculiar-attribute-certificate-viewer td.sc-peculiar-attribute-certificate-viewer{padding-top:15px}table.sc-peculiar-attribute-certificate-viewer td.monospace.sc-peculiar-attribute-certificate-viewer{max-width:0}table.sc-peculiar-attribute-certificate-viewer .divider.sc-peculiar-attribute-certificate-viewer{padding-top:15px;padding-bottom:15px}.divider.sc-peculiar-attribute-certificate-viewer .bg_fill.sc-peculiar-attribute-certificate-viewer{background-color:rgba(var(--peculiar-color-grey_3-rgb), 0.5)}table.sc-peculiar-attribute-certificate-viewer tr.sc-peculiar-attribute-certificate-viewer:last-child .divider.sc-peculiar-attribute-certificate-viewer{padding-top:0;opacity:0}.divider.sc-peculiar-attribute-certificate-viewer span.sc-peculiar-attribute-certificate-viewer{display:block;height:1px}.status_wrapper.sc-peculiar-attribute-certificate-viewer{min-height:inherit;display:-ms-flexbox;display:flex;-ms-flex-pack:center;justify-content:center;-ms-flex-align:center;align-items:center}.interaction_text.sc-peculiar-attribute-certificate-viewer{padding:15px 0;width:300px;margin:auto;text-align:center}@media (max-width: 900px){table.sc-peculiar-attribute-certificate-viewer,tr.sc-peculiar-attribute-certificate-viewer,td.sc-peculiar-attribute-certificate-viewer{display:block}table.sc-peculiar-attribute-certificate-viewer td.sc-peculiar-attribute-certificate-viewer:last-child,table.sc-peculiar-attribute-certificate-viewer td.sc-peculiar-attribute-certificate-viewer:first-child{padding-right:15px;padding-left:15px;width:100%}table.sc-peculiar-attribute-certificate-viewer .title.sc-peculiar-attribute-certificate-viewer+tr.sc-peculiar-attribute-certificate-viewer td.sc-peculiar-attribute-certificate-viewer{padding-top:5px}table.sc-peculiar-attribute-certificate-viewer .title.sc-peculiar-attribute-certificate-viewer+tr.sc-peculiar-attribute-certificate-viewer td.sc-peculiar-attribute-certificate-viewer:first-child{padding-top:15px}table.sc-peculiar-attribute-certificate-viewer td.monospace.sc-peculiar-attribute-certificate-viewer{width:100%;max-width:none}}[data-view=mobile].sc-peculiar-attribute-certificate-viewer-h table.sc-peculiar-attribute-certificate-viewer,[data-view=mobile].sc-peculiar-attribute-certificate-viewer-h tr.sc-peculiar-attribute-certificate-viewer,[data-view=mobile].sc-peculiar-attribute-certificate-viewer-h td.sc-peculiar-attribute-certificate-viewer{display:block}[data-view=mobile].sc-peculiar-attribute-certificate-viewer-h table.sc-peculiar-attribute-certificate-viewer td.sc-peculiar-attribute-certificate-viewer:last-child,[data-view=mobile].sc-peculiar-attribute-certificate-viewer-h table.sc-peculiar-attribute-certificate-viewer td.sc-peculiar-attribute-certificate-viewer:first-child{padding-right:15px;padding-left:15px;width:100%}[data-view=mobile].sc-peculiar-attribute-certificate-viewer-h table.sc-peculiar-attribute-certificate-viewer .title.sc-peculiar-attribute-certificate-viewer+tr.sc-peculiar-attribute-certificate-viewer td.sc-peculiar-attribute-certificate-viewer{padding-top:5px}[data-view=mobile].sc-peculiar-attribute-certificate-viewer-h table.sc-peculiar-attribute-certificate-viewer .title.sc-peculiar-attribute-certificate-viewer+tr.sc-peculiar-attribute-certificate-viewer td.sc-peculiar-attribute-certificate-viewer:first-child{padding-top:15px}[data-view=mobile].sc-peculiar-attribute-certificate-viewer-h table.sc-peculiar-attribute-certificate-viewer td.monospace.sc-peculiar-attribute-certificate-viewer{width:100%;max-width:none}";var vt=e("peculiar_attribute_certificate_viewer",function(){function e(e){var t=this;i(this,e);this.isDecodeInProcess=true;this.getAuthKeyIdParentLink=function(e){var i;return(i=t.authKeyIdParentLink)===null||i===void 0?void 0:i.replace("{{authKeyId}}",e)};this.getAuthKeyIdSiblingsLink=function(e){var i;return(i=t.authKeyIdSiblingsLink)===null||i===void 0?void 0:i.replace("{{authKeyId}}",e)};this.getSubjectKeyIdChildrenLink=function(e){var i;return(i=t.subjectKeyIdChildrenLink)===null||i===void 0?void 0:i.replace("{{subjectKeyId}}",e)};this.getSubjectKeyIdSiblingsLink=function(e){var i;return(i=t.subjectKeyIdSiblingsLink)===null||i===void 0?void 0:i.replace("{{subjectKeyId}}",e)}}e.prototype.componentWillLoad=function(){this.decodeCertificate(this.certificate)};e.prototype.decodeCertificate=function(e){return __awaiter(this,void 0,void 0,(function(){var t;return __generator(this,(function(i){switch(i.label){case 0:this.isDecodeInProcess=true;i.label=1;case 1:i.trys.push([1,4,,5]);if(e instanceof ve){this.certificateDecoded=e}if(typeof e==="string"){this.certificateDecoded=new ve(e)}this.certificateDecoded.parseExtensions();this.certificateDecoded.parseAttributes();return[4,this.certificateDecoded.getThumbprint("SHA-1")];case 2:i.sent();return[4,this.certificateDecoded.getThumbprint("SHA-256")];case 3:i.sent();return[3,5];case 4:t=i.sent();this.certificateDecodeError=t;console.error("Error certificate parse:",t);return[3,5];case 5:this.isDecodeInProcess=false;return[2]}}))}))};e.prototype.watchCertificateAndDecode=function(e,t){if(typeof e==="string"&&typeof t==="string"){if(e!==t){this.decodeCertificate(e)}return}if(e instanceof ve&&t instanceof ve){if(e.serialNumber!==t.serialNumber){this.decodeCertificate(e)}}};e.prototype.getLEILink=function(e){return"https://www.gleif.org/lei/"+e};e.prototype.getDNSNameLink=function(e){return"https://censys.io/ipv4?q="+e};e.prototype.getIPAddressLink=function(e){return"https://censys.io/ipv4?q="+e};e.prototype.renderErrorState=function(){return t("div",{class:"status_wrapper"},t("peculiar-typography",{type:"b1",class:"interaction_text"},"There is error for attribute certificate decode."))};e.prototype.renderEmptyState=function(){return t("div",{class:"status_wrapper"},t("peculiar-typography",{type:"b1",class:"interaction_text"},"There is no attribute certificate available."))};e.prototype.render=function(){if(this.certificateDecodeError){return this.renderErrorState()}if(!this.certificateDecoded){return this.renderEmptyState()}return t(r,null,t("table",null,t(lt,Object.assign({},this.certificateDecoded)),t(dt,{issuer:this.certificateDecoded.issuer}),t(pt,{holder:this.certificateDecoded.holder}),t(xe,{signature:this.certificateDecoded.signature}),t(Te,{thumbprints:this.certificateDecoded.thumbprints}),t(Ee,{attributes:this.certificateDecoded.attributes,getLEILink:this.getLEILink,getDNSNameLink:this.getDNSNameLink,getIPAddressLink:this.getIPAddressLink,getAuthKeyIdParentLink:this.getAuthKeyIdParentLink,getAuthKeyIdSiblingsLink:this.getAuthKeyIdSiblingsLink,getSubjectKeyIdChildrenLink:this.getSubjectKeyIdChildrenLink,getSubjectKeyIdSiblingsLink:this.getSubjectKeyIdSiblingsLink}),t(ot,{extensions:this.certificateDecoded.extensions,getLEILink:this.getLEILink,getDNSNameLink:this.getDNSNameLink,getIPAddressLink:this.getIPAddressLink,getAuthKeyIdParentLink:this.getAuthKeyIdParentLink,getAuthKeyIdSiblingsLink:this.getAuthKeyIdSiblingsLink,getSubjectKeyIdChildrenLink:this.getSubjectKeyIdChildrenLink,getSubjectKeyIdSiblingsLink:this.getSubjectKeyIdSiblingsLink}),this.download&&t(ft,{certificate:this.certificateDecoded})))};Object.defineProperty(e,"watchers",{get:function(){return{certificate:["watchCertificateAndDecode"]}},enumerable:false,configurable:true});return e}());vt.style=bt;var ht=":host{display:inline-block;width:auto;font-family:inherit;text-align:center;text-decoration:none;text-overflow:ellipsis;white-space:nowrap;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;vertical-align:top;vertical-align:-webkit-baseline-middle;pointer-events:auto;-webkit-font-kerning:none;font-kerning:none;-webkit-box-sizing:border-box;box-sizing:border-box;--peculiar-button-padding-end:5px;--peculiar-button-padding-start:5px}:host(.peculiar_button){height:30px;border-radius:2px}:host(.peculiar_button_stroke){border-width:1px;border-style:solid}.peculiar_button_native{font-family:inherit;font-size:inherit;font-style:inherit;font-weight:inherit;letter-spacing:inherit;text-overflow:inherit;text-transform:inherit;text-align:inherit;white-space:inherit;color:inherit;display:block;position:relative;width:100%;height:100%;line-height:30px;contain:layout style;cursor:pointer;z-index:0;-webkit-box-sizing:border-box;box-sizing:border-box;-webkit-appearance:none;text-decoration:inherit;outline:none;margin:0;background:inherit;border:none;border-radius:inherit;padding:0 var(--peculiar-button-padding-end) 0 var(--peculiar-button-padding-start);-webkit-transition:-webkit-box-shadow 200ms;transition:-webkit-box-shadow 200ms;transition:box-shadow 200ms;transition:box-shadow 200ms, -webkit-box-shadow 200ms}.peculiar_button_inner{-webkit-transition:opacity 200ms;transition:opacity 200ms}:host(.peculiar_button_disabled){opacity:0.5;pointer-events:none}.peculiar_button_native:focus{-webkit-box-shadow:0 4px 10px 0 rgba(var(--peculiar-color-dark-rgb), 0.15);box-shadow:0 4px 10px 0 rgba(var(--peculiar-color-dark-rgb), 0.15)}@media (hover: hover){.peculiar_button_native:hover .peculiar_button_inner{opacity:0.6}}.peculiar_button_native:active .peculiar_button_inner{opacity:1}";var gt=e("peculiar_button",function(){function e(e){i(this,e);this.fill="stroke"}e.prototype.render=function(){var e=this.href===undefined?"button":"a";var i=e==="button"?{type:"button"}:{href:this.href,target:this.target,rel:"noreferrer noopener"};return t(r,{class:{peculiar_b3:true,peculiar_button:true,peculiar_button_stroke:this.fill==="stroke",peculiar_color_primary:this.fill==="stroke",peculiar_color_light:this.fill==="fill",peculiar_fill_primary:this.fill==="fill",peculiar_button_disabled:this.disabled}},t(e,Object.assign({},i,{disabled:this.disabled,class:"peculiar_button_native"}),t("span",{class:"peculiar_button_inner"},t("slot",null))))};return e}());gt.style=ht;var mt='.sc-peculiar-button-split-h{display:inline-block;vertical-align:top;position:relative;white-space:nowrap;font-size:0}.button_split.sc-peculiar-button-split{border-bottom-right-radius:0;border-top-right-radius:0;border-right-width:0}.button_split_icon.sc-peculiar-button-split{width:7px;height:5px;display:inline-block;vertical-align:middle;fill:rgb(var(--peculiar-color-primary-rgb))}.button_split_with_icon.sc-peculiar-button-split{width:25px;border-bottom-left-radius:0;border-top-left-radius:0}.button_split_with_icon.m_open.sc-peculiar-button-split:before{position:fixed;width:100%;height:100%;top:0;left:0;content:""}.button_split_action.sc-peculiar-button-split{width:100%}.button_split_container.sc-peculiar-button-split{position:absolute;bottom:calc(100% + 1px);left:0;width:100%;border-radius:2px;-webkit-box-shadow:0px -2px 1px rgb(var(--peculiar-color-light-rgb)), 0px 0px 10px rgba(var(--peculiar-color-dark-rgb), 0.0241168);box-shadow:0px -2px 1px rgb(var(--peculiar-color-light-rgb)), 0px 0px 10px rgba(var(--peculiar-color-dark-rgb), 0.0241168);z-index:1}';var wt=e("peculiar_button_split",function(){function e(e){var t=this;i(this,e);this.fill="stroke";this.actions=[];this.open=false;this.onClickSplitButton=function(e){e.stopPropagation();t.open=!t.open}}e.prototype.onClickActiveButton=function(e,t){this.open=false;e(t)};e.prototype.renderActiveSplitState=function(){var e=this;if(!this.open){return null}return t("div",{class:"button_split_container peculiar_fill_light"},this.actions.map((function(i){return t("peculiar-button",{fill:"fill",class:"button_split_action",onClick:e.onClickActiveButton.bind(e,i.onClick)},i.text)})))};e.prototype.render=function(){return t(r,null,t("peculiar-button",{fill:this.fill,onClick:this.onClick,class:"button_split"},t("slot",null)),t("peculiar-button",{fill:this.fill,onClick:this.onClickSplitButton,class:{button_split_with_icon:true,m_open:this.open}},t("svg",{viewBox:"0 0 7 5",xmlns:"http://www.w3.org/2000/svg",class:"button_split_icon"},t("path",{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M5.459.124c.934.001 1.442.994.84 1.644L4.425 3.794c-.44.475-1.244.475-1.684 0L.862 1.764C.26 1.115.77.12 1.705.122l3.754.003z"}))),this.renderActiveSplitState())};return e}());wt.style=mt;var xt=".sc-peculiar-certificate-decoder-h{display:block;width:100%;font-size:0}.input_paste.sc-peculiar-certificate-decoder{min-height:300px;width:100%;border-radius:3px;border-width:1px;border-style:solid;padding:14px;font-size:14px;font-family:monospace;resize:vertical}.controls.sc-peculiar-certificate-decoder{margin-top:10px}.button.sc-peculiar-certificate-decoder:not(:first-child){margin-left:10px}.viewer.sc-peculiar-certificate-decoder{margin-top:64px}.input_file.sc-peculiar-certificate-decoder{opacity:0;width:100%;height:100%;top:0;left:0;display:block;position:absolute}";var yt=e("peculiar_certificate_decoder",function(){function e(e){var t=this;i(this,e);this.onClickDecode=function(){var e=t.inputPaste.value;if(e){t.decode(e)}};this.onClickExample=function(){t.decode(t.certificateExample)};this.onClickClear=function(){t.clearValue()};this.onChangeInputFile=function(e){return __awaiter(t,void 0,void 0,(function(){var t,i;return __generator(this,(function(r){switch(r.label){case 0:t=e.target;if(!t.files)return[3,2];return[4,pe(t.files[0])];case 1:i=r.sent();if(typeof i.value==="string"){this.decode(i.value)}t.value="";r.label=2;case 2:return[2]}}))}))};this.onDropFile=function(e){return __awaiter(t,void 0,void 0,(function(){var t,i;return __generator(this,(function(r){switch(r.label){case 0:e.stopPropagation();e.preventDefault();t=e.dataTransfer;if(!t.files)return[3,2];return[4,pe(t.files[0])];case 1:i=r.sent();if(typeof i.value==="string"){this.decode(i.value)}r.label=2;case 2:return[2]}}))}))}}e.prototype.componentDidLoad=function(){var e=this;var t=de.parseHash(window.location.search);if(t.cert){setTimeout((function(){return e.decode(t.cert)}),100)}};e.prototype.clearValue=function(){this.inputPaste.value="";this.certificateDecoded=null;de.replace({search:""})};e.prototype.setValue=function(e){this.certificateDecoded=e;this.inputPaste.value=e.export("pem");de.replace({search:de.queryStringify({cert:e.export("base64")})})};e.prototype.decode=function(e){var t=L.isPem(e);var i=L.isX509Pem(e);var r=L.isX509AttributePem(e);var a;var n;if(t&&!(i||r)){this.clearValue();alert("Unsupported file type. Please try to use Certificate/AttributeCertificate.");return}try{if(i){a=new ue(e)}if(r){a=new ve(e)}}catch(c){n=c}if(!a){try{a=new ue(e)}catch(c){n=c}}if(!a){try{a=new ve(e)}catch(c){n=c}}if(!a){this.clearValue();console.log(n);alert("Error decoding file. Please try to use Certificate/AttributeCertificate.")}else{this.setValue(a)}};e.prototype.render=function(){var e=this;return t(r,null,t("textarea",{placeholder:"Certificate DER or PEM",class:"input_paste peculiar_fill_light peculiar_stroke_grey_3 peculiar_color_dark",ref:function(t){e.inputPaste=t},onDrop:this.onDropFile}),t("div",{class:"controls"},t("peculiar-button",{fill:"fill",class:"button",onClick:this.onClickDecode},"Decode"),t("peculiar-button",{class:"button"},"Choose file",t("input",{type:"file",class:"input_file",accept:"application/pkix-cert,application/x-x509-ca-cert,application/x-x509-user-cert",onChange:this.onChangeInputFile,value:""})),t("peculiar-button",{class:"button",onClick:this.onClickClear},"Clear"),this.certificateExample&&t("peculiar-button",{class:"button",onClick:this.onClickExample},"Example")),this.certificateDecoded instanceof ue&&t("peculiar-certificate-viewer",{certificate:this.certificateDecoded,class:"viewer",download:true}),this.certificateDecoded instanceof ve&&t("peculiar-attribute-certificate-viewer",{certificate:this.certificateDecoded,class:"viewer",download:true}))};return e}());yt.style=xt;
/**
             * @license
             * Copyright (c) Peculiar Ventures, LLC.
             *
             * This source code is licensed under the MIT license found in the
             * LICENSE file in the root directory of this source tree.
             */function kt(e){var t;if((t=e.params)===null||t===void 0?void 0:t["modulus"]){var i=e.params["modulus"].byteLength;if(i%2){i-=1}return i*8}return null}function _t(e){var t;if((t=e.params)===null||t===void 0?void 0:t["publicExponent"]){return e.params["publicExponent"].byteLength===3?65537:3}return null}var St=function(e){var i;var r=e.publicKey;if(!r){return null}return[t(me,{value:"Public Key Info"}),t(we,{name:"Algorithm",value:he(r.algorithm)}),t(we,{name:"Named Curve",value:he((i=r.params)===null||i===void 0?void 0:i["namedCurve"])}),t(we,{name:"Exponent",value:_t(r)}),t(we,{name:"Modulus",value:kt(r)}),t(we,{name:"Value",value:o.ToHex(r.value),monospace:true,collapse:true})]};
/**
             * @license
             * Copyright (c) Peculiar Ventures, LLC.
             *
             * This source code is licensed under the MIT license found in the
             * LICENSE file in the root directory of this source tree.
             */var It=function(e){var i=e.name;if(!i){return null}return[t(me,{value:"Subject Name"}),i.map((function(e){return t(we,{name:e.name||e.type,value:e.value})}))]};
/**
             * @license
             * Copyright (c) Peculiar Ventures, LLC.
             *
             * This source code is licensed under the MIT license found in the
             * LICENSE file in the root directory of this source tree.
             */var Ct=function(e){var i=e.name,r=e.issuerDnLink;if(!i){return null}var a="Issuer Name";return[t(me,{value:r?t("peculiar-link",{href:r,type:"h6"},a):a}),i.map((function(e){return t(we,{name:e.name||e.type,value:e.value})}))]};var Dt=".sc-peculiar-certificate-viewer-h{display:block;width:100%;word-wrap:break-word;position:relative;min-width:280px;min-height:300px;background:rgb(var(--peculiar-color-light-rgb))}th.sc-peculiar-certificate-viewer,td.sc-peculiar-certificate-viewer{border:none}table.sc-peculiar-certificate-viewer{width:100%;margin-bottom:30px}table.sc-peculiar-certificate-viewer .title.sc-peculiar-certificate-viewer td.sc-peculiar-certificate-viewer{border-color:rgba(var(--peculiar-color-grey_3-rgb), 0.5);padding-top:60px;padding-bottom:15px;border-bottom-width:1px;border-bottom-style:solid}table.sc-peculiar-certificate-viewer td.sc-peculiar-certificate-viewer:first-child{padding-left:30px;width:130px;padding-right:10px}table.sc-peculiar-certificate-viewer td.sc-peculiar-certificate-viewer:last-child{padding-right:30px;width:calc(100% - 130px)}table.sc-peculiar-certificate-viewer td.sc-peculiar-certificate-viewer{vertical-align:top;padding-top:5px;padding-bottom:5px}table.sc-peculiar-certificate-viewer td.vertical_align_middle.sc-peculiar-certificate-viewer{vertical-align:middle}table.sc-peculiar-certificate-viewer .title.sc-peculiar-certificate-viewer:first-child td.sc-peculiar-certificate-viewer{padding-top:15px}table.sc-peculiar-certificate-viewer .title.sc-peculiar-certificate-viewer+tr.sc-peculiar-certificate-viewer td.sc-peculiar-certificate-viewer{padding-top:15px}table.sc-peculiar-certificate-viewer td.monospace.sc-peculiar-certificate-viewer{max-width:0}table.sc-peculiar-certificate-viewer .divider.sc-peculiar-certificate-viewer{padding-top:15px;padding-bottom:15px}.divider.sc-peculiar-certificate-viewer .bg_fill.sc-peculiar-certificate-viewer{background-color:rgba(var(--peculiar-color-grey_3-rgb), 0.5)}table.sc-peculiar-certificate-viewer tr.sc-peculiar-certificate-viewer:last-child .divider.sc-peculiar-certificate-viewer{padding-top:0;opacity:0}.divider.sc-peculiar-certificate-viewer span.sc-peculiar-certificate-viewer{display:block;height:1px}.status_wrapper.sc-peculiar-certificate-viewer{min-height:inherit;display:-ms-flexbox;display:flex;-ms-flex-pack:center;justify-content:center;-ms-flex-align:center;align-items:center}.interaction_text.sc-peculiar-certificate-viewer{padding:15px 0;width:300px;margin:auto;text-align:center}@media (max-width: 900px){table.sc-peculiar-certificate-viewer,tr.sc-peculiar-certificate-viewer,td.sc-peculiar-certificate-viewer{display:block}table.sc-peculiar-certificate-viewer td.sc-peculiar-certificate-viewer:last-child,table.sc-peculiar-certificate-viewer td.sc-peculiar-certificate-viewer:first-child{padding-right:15px;padding-left:15px;width:100%}table.sc-peculiar-certificate-viewer .title.sc-peculiar-certificate-viewer+tr.sc-peculiar-certificate-viewer td.sc-peculiar-certificate-viewer{padding-top:5px}table.sc-peculiar-certificate-viewer .title.sc-peculiar-certificate-viewer+tr.sc-peculiar-certificate-viewer td.sc-peculiar-certificate-viewer:first-child{padding-top:15px}table.sc-peculiar-certificate-viewer td.monospace.sc-peculiar-certificate-viewer{width:100%;max-width:none}}[data-view=mobile].sc-peculiar-certificate-viewer-h table.sc-peculiar-certificate-viewer,[data-view=mobile].sc-peculiar-certificate-viewer-h tr.sc-peculiar-certificate-viewer,[data-view=mobile].sc-peculiar-certificate-viewer-h td.sc-peculiar-certificate-viewer{display:block}[data-view=mobile].sc-peculiar-certificate-viewer-h table.sc-peculiar-certificate-viewer td.sc-peculiar-certificate-viewer:last-child,[data-view=mobile].sc-peculiar-certificate-viewer-h table.sc-peculiar-certificate-viewer td.sc-peculiar-certificate-viewer:first-child{padding-right:15px;padding-left:15px;width:100%}[data-view=mobile].sc-peculiar-certificate-viewer-h table.sc-peculiar-certificate-viewer .title.sc-peculiar-certificate-viewer+tr.sc-peculiar-certificate-viewer td.sc-peculiar-certificate-viewer{padding-top:5px}[data-view=mobile].sc-peculiar-certificate-viewer-h table.sc-peculiar-certificate-viewer .title.sc-peculiar-certificate-viewer+tr.sc-peculiar-certificate-viewer td.sc-peculiar-certificate-viewer:first-child{padding-top:15px}[data-view=mobile].sc-peculiar-certificate-viewer-h table.sc-peculiar-certificate-viewer td.monospace.sc-peculiar-certificate-viewer{width:100%;max-width:none}";var Lt=e("peculiar_certificate_viewer",function(){function e(e){var t=this;i(this,e);this.isDecodeInProcess=true;this.getAuthKeyIdParentLink=function(e){var i;return(i=t.authKeyIdParentLink)===null||i===void 0?void 0:i.replace("{{authKeyId}}",e)};this.getAuthKeyIdSiblingsLink=function(e){var i;return(i=t.authKeyIdSiblingsLink)===null||i===void 0?void 0:i.replace("{{authKeyId}}",e)};this.getSubjectKeyIdChildrenLink=function(e){var i;return(i=t.subjectKeyIdChildrenLink)===null||i===void 0?void 0:i.replace("{{subjectKeyId}}",e)};this.getSubjectKeyIdSiblingsLink=function(e){var i;return(i=t.subjectKeyIdSiblingsLink)===null||i===void 0?void 0:i.replace("{{subjectKeyId}}",e)}}e.prototype.componentWillLoad=function(){this.decodeCertificate(this.certificate)};e.prototype.decodeCertificate=function(e){return __awaiter(this,void 0,void 0,(function(){var t;return __generator(this,(function(i){switch(i.label){case 0:this.isDecodeInProcess=true;i.label=1;case 1:i.trys.push([1,4,,5]);if(e instanceof ue){this.certificateDecoded=e}if(typeof e==="string"){this.certificateDecoded=new ue(e)}this.certificateDecoded.parseExtensions();return[4,this.certificateDecoded.getThumbprint("SHA-1")];case 2:i.sent();return[4,this.certificateDecoded.getThumbprint("SHA-256")];case 3:i.sent();return[3,5];case 4:t=i.sent();this.certificateDecodeError=t;console.error("Error certificate parse:",t);return[3,5];case 5:this.isDecodeInProcess=false;return[2]}}))}))};e.prototype.watchCertificateAndDecode=function(e,t){if(typeof e==="string"&&typeof t==="string"){if(e!==t){this.decodeCertificate(e)}return}if(e instanceof ue&&t instanceof ue){if(e.serialNumber!==t.serialNumber){this.decodeCertificate(e)}}};e.prototype.getLEILink=function(e){return"https://www.gleif.org/lei/"+e};e.prototype.getDNSNameLink=function(e){return"https://censys.io/ipv4?q="+e};e.prototype.getIPAddressLink=function(e){return"https://censys.io/ipv4?q="+e};e.prototype.getIssuerDnLink=function(){return this.issuerDnLink};e.prototype.renderErrorState=function(){return t("div",{class:"status_wrapper"},t("peculiar-typography",{type:"b1",class:"interaction_text"},"There is error for certificate decode."))};e.prototype.renderEmptyState=function(){return t("div",{class:"status_wrapper"},t("peculiar-typography",{type:"b1",class:"interaction_text"},"There is no certificate available."))};e.prototype.render=function(){if(this.certificateDecodeError){return this.renderErrorState()}if(!this.certificateDecoded){return this.renderEmptyState()}return t(r,{"data-view":this.view},t("table",null,t(lt,Object.assign({},this.certificateDecoded)),t(It,{name:this.certificateDecoded.subject}),t(Ct,{name:this.certificateDecoded.issuer,issuerDnLink:this.getIssuerDnLink()}),t(St,{publicKey:this.certificateDecoded.publicKey}),t(xe,{signature:this.certificateDecoded.signature}),t(Te,{thumbprints:this.certificateDecoded.thumbprints}),t(ot,{extensions:this.certificateDecoded.extensions,getLEILink:this.getLEILink,getDNSNameLink:this.getDNSNameLink,getIPAddressLink:this.getIPAddressLink,getAuthKeyIdParentLink:this.getAuthKeyIdParentLink,getAuthKeyIdSiblingsLink:this.getAuthKeyIdSiblingsLink,getSubjectKeyIdChildrenLink:this.getSubjectKeyIdChildrenLink,getSubjectKeyIdSiblingsLink:this.getSubjectKeyIdSiblingsLink}),this.download&&t(ft,{certificate:this.certificateDecoded})))};Object.defineProperty(e,"watchers",{get:function(){return{certificate:["watchCertificateAndDecode"]}},enumerable:false,configurable:true});return e}());Lt.style=Dt;var Nt=":host{display:inline-block}.link_native{margin:0;padding:0;font-family:var(--peculiar-font-family);font-size:inherit;line-height:inherit;letter-spacing:inherit;word-break:break-word;color:inherit}.link_native:hover{text-decoration:none}";var At=e("peculiar_link",function(){function e(e){i(this,e);this.type="b3"}e.prototype.render=function(){var e;return t(r,{class:(e={peculiar_color_primary:true},e["peculiar_"+(this.type||"b3")]=true,e)},t("a",{href:this.href,target:"_blank",rel:"noreferrer noopener",class:"link_native"},t("slot",null)))};return e}());At.style=Nt;var Pt=".sc-peculiar-text-hider-h{display:block;width:100%}.text.sc-peculiar-text-hider{display:inline-block;width:calc(100% - 60px);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;margin:0}.text.m_opened.sc-peculiar-text-hider{white-space:initial}.action.sc-peculiar-text-hider{vertical-align:top;display:inline-block;width:60px;text-align:right;position:relative;top:-6px}.button_action.sc-peculiar-text-hider{width:30px}.expand_icon.sc-peculiar-text-hider{width:7px;height:5px;display:inline-block;fill:rgb(var(--peculiar-color-primary-rgb))}.m_opened.sc-peculiar-text-hider .expand_icon.sc-peculiar-text-hider{-webkit-transform:rotate(180deg);transform:rotate(180deg);fill:rgb(var(--peculiar-color-light-rgb))}";var Et=e("peculiar_text_hider",function(){function e(e){i(this,e);this.textExpand=a(this,"textExpand",7);this.opened=false}e.prototype.textExpandHandler=function(){this.opened=!this.opened};e.prototype.render=function(){return t(r,null,t("div",{class:"root"},t("div",{class:{text:true,m_opened:this.opened}},t("slot",null)),t("div",{class:"action"},t("peculiar-button",{onClick:this.textExpand.emit,class:{button_action:true,m_opened:this.opened},fill:this.opened?"fill":"stroke"},t("svg",{viewBox:"0 0 7 5",xmlns:"http://www.w3.org/2000/svg",class:{expand_icon:true}},t("path",{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M5.459.124c.934.001 1.442.994.84 1.644L4.425 3.794c-.44.475-1.244.475-1.684 0L.862 1.764C.26 1.115.77.12 1.705.122l3.754.003z"}))))))};return e}());Et.style=Pt;var Tt=":host{display:block}.typography_native{margin:0;padding:0;font-family:var(--peculiar-font-family);font-size:inherit;line-height:inherit;letter-spacing:inherit;word-break:break-word}:host(.align_left){text-align:left}:host(.align_center){text-align:center}:host(.align_right){text-align:right}.ellipsis{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.monospace{font-family:monospace}";var jt=e("peculiar_typography",function(){function e(e){i(this,e);this.type="b3";this.color="dark"}e.prototype.render=function(){var e;var i=this.type&&this.type.includes("h")?this.type:"p";return t(r,{class:(e={},e["peculiar_"+(this.type||"b3")]=true,e["peculiar_color_"+(this.color||"dark")]=true,e["align_"+this.align]=!!this.align,e)},t(i,{class:{typography_native:true,ellipsis:this.ellipsis,monospace:this.monospace}},t("slot",null)))};return e}());jt.style=Tt}}}));