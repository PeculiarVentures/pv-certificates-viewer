/*!
 * © Peculiar Ventures https://peculiarventures.com/ - MIT License
 */
import{h as e}from"./p-DDDrq3In.js";import{_ as a,Y as n,Z as t,b as c,a5 as o,a9 as s,r,aa as i,ab as f,ac as u,ad as l,ae as d,af as b,ag as m,ah as v,ai as x,aj as p,ak as g,al as y,am as h,an as C,ao as S,ap as N,aq as D,ar as I,as as A,at as j,au as O,av as T,aw as G,ax as k,ay as L,az as P,aA as B,aB as V,aC as R,aD as E,aE as U,aF as $,aG as K,aH as H,aI as w,aJ as q,aK as M,a6 as Y,aL as X,aM as z,aN as W,aO as Q,aP as F,aQ as _,aR as Z,aS as J,aT as ee,aU as ae,aV as ne,aW as te}from"./p-DazysL_f.js";import{L as ce}from"./p-CEHpBNWe.js";import{T as oe,B as se}from"./p-CkwiD_ia.js";import{D as re}from"./p-BHBizfwo.js";
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */function ie(e){const n=a[e];if(n){return`${n} (${e})`}return e}
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */function fe(e){const a=e.replace(/([A-Z])/g," $1");return a.charAt(0).toUpperCase()+a.slice(1)}
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */const ue=e=>`https://search.gleif.org/#/record/${e}`;const le=e=>`https://search.censys.io/search?resource=hosts&q=dns.names%3A${e}`;const de=e=>`https://search.censys.io/search?resource=hosts&q=ip%3A${e}`
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */;function be(e){return e.indexOf("http")===0}
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */const me=(a,n)=>e("tr",null,e("td",{colSpan:2},e("table",null,n)));const ve=a=>{const{value:n}=a;if(!n){return null}return[e("tr",{class:"title"},e("td",{colSpan:2},e(oe,{variant:"s1",color:"black"},n))),e("tr",null,e("td",{colSpan:2,class:"divider"},e("span",null)))]};const xe=a=>{const{name:n,value:t,monospace:c,collapse:o,href:s,extraValue:r}=a;if(!n){return null}if(t===undefined||t===null){return null}let i;if(o){i=e("peculiar-text-hider",null,t)}else{i=t}const f=!!t.toString();return e("tr",null,e("td",{colSpan:f?1:2},e(oe,{variant:"b2",color:"gray-9"},n)),f&&e("td",{class:{monospace:c}},be(t.toString())||s?e(ce,{variant:"b2",href:s||t.toString()},t):e(oe,{variant:"b2",color:"black"},i,r)))};
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */const pe=a=>{const{serialNumber:c,version:o,validity:s,notBefore:r,notAfter:i,lastUpdate:f,nextUpdate:u,type:l}=a;return[e(ve,{value:n.getString("basicInformation")}),e(xe,{name:n.getString("type"),value:l}),e(xe,{name:n.getString("serialNumber"),value:c,monospace:true}),e(xe,{name:n.getString("version"),value:o}),e(xe,{name:n.getString("validity"),value:s}),e(xe,{name:n.getString("issued"),value:r?t(r):undefined}),e(xe,{name:n.getString("expired"),value:i?t(i):undefined}),e(xe,{name:n.getString("lastUpdate"),value:f?t(f):undefined}),e(xe,{name:n.getString("nextUpdate"),value:u?t(u):undefined})]};
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */function ge(e){if(e.params&&"modulus"in e.params){let a=e.params.modulus.byteLength;if(a%2){a-=1}return a*8}return null}function ye(e){if(e.params&&"publicExponent"in e.params){return e.params.publicExponent.byteLength===3?65537:3}return null}const he=a=>{const{publicKey:t}=a;if(!t){return null}function o(a){return[e(xe,{name:n.getString("algorithm"),value:ie(a.algorithm)}),e(xe,{name:n.getString("namedCurve"),value:ie(a.params&&"namedCurve"in a.params?a.params.namedCurve:undefined)}),e(xe,{name:n.getString("exponent"),value:ye(a)}),e(xe,{name:n.getString("modulus"),value:ge(a)}),e(xe,{name:n.getString("value"),value:c.Convert.ToHex(a.value),monospace:true,collapse:true})]}return[e(ve,{value:n.getString("publicKeyInfo")}),o(t),Array.isArray(t.params)&&t.params.length&&t.params.map((a=>e(me,null,o(a))))]};
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */const Ce=a=>{const{name:t}=a;return[e(ve,{value:n.getString("subjectName")}),t.map((a=>e(xe,{name:a.name||a.type,value:a.value})))]};
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */const Se=a=>{const{name:t,issuerDnLink:c}=a;const o=n.getString("issuerName");return[e(ve,{value:c?e(ce,{href:c},o):o}),t.map((a=>e(xe,{name:a.name||a.type,value:a.value})))]};
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */const Ne=a=>{const{signature:t}=a;if(!t){return null}function o(a){return[e(xe,{name:n.getString("algorithm"),value:ie(a.algorithm)}),e(xe,{name:n.getString("value"),value:c.Convert.ToHex(a.value),monospace:true,collapse:true})]}return[e(ve,{value:n.getString("signature")}),o(t),t.params&&t.params.length&&t.params.map((a=>e(me,null,o(a))))]};
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */const De=a=>{const{thumbprints:t}=a;if(!t){return null}const c=Object.keys(t);if(!c.length){return null}return[e(ve,{value:n.getString("fingerprints")}),c.map((a=>e(xe,{name:a,value:t[a],monospace:true})))]};
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */const Ie=(a,t)=>{const{extension:c}=a;return[e(xe,{name:"Name",value:ie(c.asn.extnID)}),e(xe,{name:"Critical",value:c.asn.critical?n.getString("yes"):n.getString("no")}),t,e("tr",null,e("td",{colSpan:2,class:"divider"},e("span",null)))]};
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */const Ae=a=>{const{extension:n}=a;return e(Ie,{extension:n},e(xe,{name:"Usage",value:n.value.toJSON().join(", ")}))};
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */const je=a=>{const{extension:t}=a;return e(Ie,{extension:t},e(xe,{name:"Certificate Authority",value:t.value.cA?n.getString("yes"):n.getString("no")}),e(xe,{name:"Path Length Constraint",value:t.value.pathLenConstraint}))};
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */const Oe=a=>{const{extension:n}=a;return e(Ie,{extension:n},Boolean(n.value.length)&&[e(xe,{name:"Purposes",value:""}),n.value.map((a=>e(me,null,e(xe,{name:"Purpose",value:ie(a)}))))])};
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */const Te=a=>{const{extension:n,getSubjectKeyIdChildrenLink:t,getSubjectKeyIdSiblingsLink:o}=a;const s=c.Convert.ToHex(n.value.buffer);const r=t(s);const i=o(s);return e(Ie,{extension:n},e(xe,{name:"Key ID",value:s,monospace:true,extraValue:[r&&e("span",null," [",e(ce,{href:r},"children"),"]"),i&&e("span",null," [",e(ce,{href:i},"siblings"),"]")]}))};
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */const Ge=a=>{const{extension:n,getAuthKeyIdParentLink:t,getAuthKeyIdSiblingsLink:o}=a;const s=c.Convert.ToHex(n.value.keyIdentifier.buffer);const r=t(s);const i=o(s);return e(Ie,{extension:n},e(xe,{name:"Key ID",value:s,monospace:true,extraValue:[r&&e("span",null," [",e(ce,{href:r},"parents"),"]"),i&&e("span",null," [",e(ce,{href:i},"siblings"),"]")]}))};
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */const ke={otherName:"Other Name",rfc822Name:"RFC 822 Name",dNSName:"DNS Name",x400Address:"X400 Address",directoryName:"Directory Name",ediPartyName:"Edi Party Name ",uniformResourceIdentifier:"URI",iPAddress:"IP Address",registeredID:"Registered ID"};const Le=n=>{const{generalName:t,getDNSNameLink:l,getIPAddressLink:d}=n;if(!t){return null}return Object.keys(t).map((n=>{const b=t[n];if(b instanceof o){return[e(xe,{name:ke[n]||n,value:""}),e(me,null,b.map((n=>n.map((n=>e(xe,{name:a[n.type]||n.type,value:n.value.toString()}))))))]}if(b instanceof s){try{const n=r.parse(b.value,i);return e(xe,{name:a[b.typeId]||b.typeId,value:n.toString()})}catch(e){}try{const n=r.parse(b.value,f);if(n.explicitText){return e(xe,{name:a[b.typeId]||b.typeId,value:n.explicitText.toString()})}}catch(e){}return e(xe,{name:a[b.typeId]||b.typeId,value:c.Convert.ToHex(b.value),monospace:true})}if(c.BufferSourceConverter.isBufferSource(b)){return e(xe,{name:ke[n]||n,value:c.Convert.ToString(b)})}if(b instanceof u){return e(xe,{name:ke[n]||n,value:b.partyName.toString()})}if(n==="dNSName"){return e(xe,{name:ke[n]||n,value:b,href:l(b)})}if(n==="iPAddress"){return e(xe,{name:ke[n]||n,value:b,href:d(b)})}return e(xe,{name:ke[n]||n,value:b})}))};
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */const Pe=a=>{const{extension:n}=a;return e(Ie,{extension:n},n.value.map((n=>{var t,c;return[(t=n.distributionPoint)===null||t===void 0?void 0:t.fullName.map((n=>e(Le,Object.assign({generalName:n},a)))),(c=n.cRLIssuer)===null||c===void 0?void 0:c.map((n=>e(Le,Object.assign({generalName:n},a))))]})))};
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */const Be=a=>{const{extension:n}=a;return e(Ie,{extension:n},Boolean(n.value.length)&&[e(xe,{name:"Descriptions",value:""}),n.value.map((n=>e(me,null,e(xe,{name:"Method",value:ie(n.accessMethod)}),e(Le,Object.assign({generalName:n.accessLocation},a)))))])};
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */const Ve=a=>{const{extension:n}=a;return e(Ie,{extension:n},n.value.map((n=>e(Le,Object.assign({generalName:n},a)))))};
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */const Re=a=>{const{extension:n}=a;return e(Ie,{extension:n},Boolean(n.value.length)&&[e(xe,{name:"Policies",value:""}),n.value.map((a=>e(me,null,e(xe,{name:"Policy ID",value:ie(a.policyIdentifier)}),a.policyQualifiers&&Boolean(a.policyQualifiers.length)&&[e(xe,{name:"Qualifiers",value:""}),a.policyQualifiers.map((a=>{const n=[e(xe,{name:"Qualifier ID",value:ie(a.policyQualifierId)})];if(a.policyQualifierId==="1.3.6.1.5.5.7.2.1"){const t=r.parse(a.qualifier,i);n.push(e(xe,{name:"Value",value:t.toString()}))}if(a.policyQualifierId==="1.3.6.1.5.5.7.2.2"){const t=r.parse(a.qualifier,f);if(t.explicitText){n.push(e(xe,{name:"Value",value:t.explicitText.toString()}))}}return e(me,null,n)}))])))])};
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Ee={"9606c02c690033aa1d145f59c6e2648d0549f0df96aab8db915a70d8ecf390a5":"Akamai CT","39376f545f7b4607f59742d768cd5d2437bf3473b6534a4834bcf72e681c83c9":"Alpha CT",a577ac9ced7548dd8f025b67a241089df86e0f476ec203c2ecbedb185f282638:"CNNIC CT",cdb5179b7fc1c046feea31136a3f8f002e6182faf8896fecc8b2f5b5ab604900:"Certly.IO","1fbc36e002ede97f40199e86b3573b8a4217d80187746ad0da03a06054d20df4":"Cloudflare “Nimbus2017”",db74afeecb29ecb1feca3e716d2ce5b9aabb36f7847183c75d9d4f37b61fbf64:"Cloudflare “Nimbus2018”","747eda8331ad331091219cce254f4270c2bffd5e422008c6373579e6107bcc56":"Cloudflare “Nimbus2019”","5ea773f9df56c0e7b536487dd049e0327a919a0c84a112128418759681714558":"Cloudflare “Nimbus2020”","4494652eb0eeceafc44007d8a8fe28c0dae682bed8cb31b53fd33396b5b681a8":"Cloudflare “Nimbus2021”","41c8cab1df22464a10c6a13a0942875e4e318b1b03ebeb4bc768f090629606f6":"Cloudflare “Nimbus2022”","7a328c54d8b72db620ea38e0521ee98416703213854d3bd22bc13a57a352eb52":"Cloudflare “Nimbus2023”","6ff141b5647e4222f7ef052cefae7c21fd608e27d2af5a6e9f4b8a37d6633ee5":"DigiCert Nessie2018",fe446108b1d01ab78a62ccfeab6ab2b2babff3abdad80a4d8b30df2d0008830c:"DigiCert Nessie2019",c652a0ec48ceb3fcab170992c43a87413309e80065a26252401ba3362a17c565:"DigiCert Nessie2020",eec095ee8d72640f92e3c3b91bc712a3696a097b4b6a1a1438e647b2cbedc5f9:"DigiCert Nessie2021","51a3b0f5fd01799c566db837788f0ca47acc1b27cbf79e88429a0dfed48b05e5":"DigiCert Nessie2022",b3737707e18450f86386d605a9dc11094a792db1670c0b87dcf0030e7936a59a:"DigiCert Nessie2023","5614069a2fd7c2ecd3f5e1bd44b23ec74676b9bc99115cc0ef949855d689d0dd":"DigiCert Server","8775bfe7597cf88c43995fbdf36eff568d475636ff4ab560c1b4eaff5ea0830f":"DigiCert Server 2",c1164ae0a772d2d4392dc80ac10770d4f0c49bde991a4840c1fa075164f63360:"DigiCert Yeti2018",e2694bae26e8e94009e8861bb63b83d43ee7fe7488fba48f2893019dddf1dbfe:"DigiCert Yeti2019",f095a459f200d18240102d2f93888ead4bfe1d47e399e1d034a6b0a8aa8eb273:"DigiCert Yeti2020","5cdc4392fee6ab4544b15e9ad456e61037fbd5fa47dca17394b25ee6f6c70eca":"DigiCert Yeti2021","2245450759552456963fa12ff1f76d86e0232663adc04b7f5dc6835c6ee20f02":"DigiCert Yeti2022","35cf191bbfb16c57bf0fad4c6d42cbbbb627202651ea3fe12aefa803c33bd64c":"DigiCert Yeti2023","717ea7420975be84a2723553f1777c26dd51af4e102144094d9019b462fb6668":"GDCA 1","14308d90ccd030135005c01ca526d81e84e87624e39b6248e08f724aea3bb42a":"GDCA 2",c9cf890a21109c666cc17a3ed065c930d0e0135a9feba85af14210b8072421aa:"GDCA CT #1","924a30f909336ff435d6993a10ac75a2c641728e7fc2d659ae6188ffad40ce01":"GDCA CT #2",fad4c97cc49ee2f8ac85c5ea5cea09d0220dbbf4e49c6b50662ff868f86b8c28:"Google “Argon2017”",a4501269055a15545e6211ab37bc103f62ae5576a45e4b1714453e1b22106a25:"Google “Argon2018”","63f2dbcde83bcc2ccf0b728427576b33a48d61778fbd75a638b1c768544bd88d":"Google “Argon2019”",b21e05cc8ba2cd8a204e8766f92bb98a2520676bdafa70e7b249532def8b905e:"Google “Argon2020”",f65c942fd1773022145418083094568ee34d131933bfdf0c2f200bcc4ef164e3:"Google “Argon2021”","2979bef09e393921f056739f63a577e5be577d9c600af8f94d5d265c255dc784":"Google “Argon2022”",e83ed0da3ef5063532e75728bc896bc903d3cbd1116beceb69e1777d6d06bd6e:"Google “Argon2023”","68f698f81f6482be3a8ceeb9281d4cfc71515d6793d444d10a67acbb4f4ffbc4":"Google “Aviator”",c3bf03a7e1ca8841c607bae3ff4270fca5ec45b186ebbe4e2cf3fc778630f5f6:"Google “Crucible”","1d024b8eb1498b344dfd87ea3efc0996f7506f235d1d497061a4773c439c25fb":"Google “Daedalus”","293c519654c83965baaa50fc5807d4b76fbf587a2972dca4c30cf4e54547f478":"Google “Icarus”",a4b90990b418581487bb13a2cc67700a3c359804f91bdfb8e377cd0ec80ddc10:"Google “Pilot”",ee4bbdb775ce60bae142691fabe19e66a30f7e5fb072d88300c47b897aa8fdcb:"Google “Rocketeer”",bbd9dfbc1f8a71b593942397aa927b473857950aab52e81a909664368e1ed185:"Google “Skydiver”","52eb4b225ec896974850675f23e43bc1d021e3214ce52ecd5fa87c203cdfca03":"Google “Solera2018”","0b760e9a8b9a682f88985b15e947501a56446bba8830785c3842994386450c00":"Google “Solera2019”","1fc72ce5a1b799f400c359bff96ca3913548e8644220610952e9ba1774f7bac7":"Google “Solera2020”",a3c99845e80ab7ce00157b3742df0207dd272b2b602ecf98ee2c12db9c5ae7e7:"Google “Solera2021”","697aafca1a6b536fae21205046debad7e0eaea13d2432e6e9d8fb379f2b9aaf3":"Google “Solera2022”",a899d8780c9290aaf462f31880ccfbd52451e970d0fbf591ef75b0d99b645681:"Google “Submariner”",b0cc83e5a5f97d6baf7c09cc284904872ac7e88b132c6350b7c6fd26e16c6c77:"Google “Testtube”",b10cd559a6d67846811f7df9a51532739ac48d703bea0323da5d38755bc0ad4e:"Google “Xenon2018”","084114980071532c16190460bcfc47fdc2653afa292c72b37ff863ae29ccc9f0":"Google “Xenon2019”","07b75c1be57d68fff1b0c61d2315c7bae6577c5794b76aeebc613a1a69d3a21c":"Google “Xenon2020”","7d3ef2f88fff88556824c2c0ca9e5289792bc50e78097f2e6a9768997e22f0d7":"Google “Xenon2021”","46a555eb75fa912030b5a28969f4f37d112c4174befd49b885abf2fc70fe6d47":"Google “Xenon2022”","7461b4a09cfb3d41d75159575b2e7649a445a8d27709b0cc564a6482b7eb41a3":"Izenpe","8941449c70742e06b9fc9ce7b116ba0024aa36d59af44f0204404f00f7ea8566":"Izenpe “Argi”","296afa2d568bca0d2ea844956ae9721fc35fa355ecda99693aafd458a71aefdd":"Let“s Encrypt ”Clicky”","537b69a3564335a9c04904e39593b2c298eb8d7a6e83023635c627248cd6b440":"Nordu “flimsy”",aae70b7f3cb8d566c86c2f16979c9f445f69ab0eb4535589b2f77a030104f3cd:"Nordu “plausible”",e0127629e90496564e3d0147984498aa48f8adb16600eb7902a1ef9909906273:"PuChuangSiDa CT",cf55e28923497c340d5206d05353aeb25834b52f1f8dc9526809f212efdd7ca6:"SHECA CT 1","32dc59c2d4c41968d56e14bc61ac8f0e45db39faf3c155aa4252f5001fa0c623":"SHECA CT 2",db76fdadac65e7d09508886e2159bd8b90352f5fead3e3dc5e22eb350acc7b98:"Sectigo (Comodo) “Dodo” CT","6f5376ac31f03119d89900a45115ff77151c11d902c10029068db2089a37d913":"Sectigo (Comodo) “Mammoth” CT","5581d4c2169036014aea0b9b573c53f0c0e43878702508172fa3aa1d0713d30c":"Sectigo (Comodo) “Sabre” CT","34bb6ad6c3df9c03eea8a499ff7891486c9d5e5cac92d01f7bfd1bce19db48ef":"StartCom",ddeb1d2b7a0d4fa6208b81ad8168707e2e8e9d01d55c888d3d11c4cdb6ecbecc:"Symantec",a7ce4a4e6207e0addee5fdaa4b1f86768767b5d002a55d47310e7e670a95eab2:"Symantec Deneb","15970488d7b997a05beb52512adee8d2e8b4a3165264121a9fabfbd5f85ad93f":"Symantec “Sirius”",bc78e1dfc5f63c684649334da10fa15f0979692009c081b4f3f6917f3ed9b8a5:"Symantec “Vega”",b0b784bc81c0ddc47544e883f05985bb9077d134d8ab88b2b2e533980b8e508b:"Up In The Air “Behind the Sofa”",ac3b9aed7fa9674757159e6d7d575672f9d98100941e9bdeffeca1313b75782d:"Venafi","03019df3fd85a69a8ebd1facc6da9ba73e469774fe77f579fc5a08b8328c1d6b":"Venafi Gen2 CT","41b2dc2e89e63ce4af1ba7bb29bf68c6dee6f9f1cc047e30dffae3b3ba259263":"WoSign","63d0006026dde10bb0601f452446965ee2b6ea2cd4fbc95ac866a550af9075b7":"WoSign 2","9e4ff73dc3ce220b69217c899e468076abf8d78636d5ccfc85a31a75628ba88b":"WoSign CT #1"};
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */const Ue=a=>{const{extension:n}=a;return e(Ie,{extension:n},Boolean(n.value.items.length)&&[e(xe,{name:"Signed Certificate Timestamps",value:""}),n.value.toJSON().map((a=>e(me,null,e(xe,{name:"Version",value:a.version+1}),e(xe,{name:"Log Operator",value:Ee[a.logId]||a.logId}),e(xe,{name:"Log Key ID",value:a.logId,monospace:true}),e(xe,{name:"Timestamp",value:t(a.timestamp)}),e(xe,{name:"Signature Algorithm",value:`${a.hashAlgorithm} ${a.signatureAlgorithm}`.toUpperCase()}),e(xe,{name:"Signature",value:a.signature,monospace:true}))))])};
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */const $e=a=>{var n,t;const{extension:c}=a;return e(Ie,{extension:c},(n=c.value.excludedSubtrees)===null||n===void 0?void 0:n.map((n=>e(Le,Object.assign({generalName:n.base},a)))),(t=c.value.permittedSubtrees)===null||t===void 0?void 0:t.map((n=>e(Le,Object.assign({generalName:n.base},a)))))};
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */const Ke=a=>{const{extension:n}=a;return e(Ie,{extension:n},e(xe,{name:"Template ID",value:n.value.templateID}),e(xe,{name:"Template Major Version",value:n.value.templateMajorVersion}),e(xe,{name:"Template Minor Version",value:n.value.templateMinorVersion}))};
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */const He=a=>{const{extension:n}=a;return e(Ie,{extension:n},e(xe,{name:"Name",value:n.value.toString()}))};
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */const we=a=>{const{extension:n}=a;const t=n.value.getVersion();return e(Ie,{extension:n},e(xe,{name:"Certificate Index",value:t.certificateIndex}),e(xe,{name:"Key Index",value:t.keyIndex}))};var qe,Me,Ye,Xe;let ze=class e{constructor(e){if(typeof e==="string"){this.alphabetic=e}else if(typeof e==="number"){this.numeric=e}}};l([d({type:b.PrintableString})],ze.prototype,"alphabetic",void 0);l([d({type:b.PrintableString})],ze.prototype,"numeric",void 0);ze=l([m({type:v.Choice})],ze);class We{constructor(e={}){this.currency=new ze;this.amount=0;this.exponent=0;Object.assign(this,e)}}l([d({type:ze})],We.prototype,"currency",void 0);l([d({type:b.Integer})],We.prototype,"amount",void 0);l([d({type:b.Integer})],We.prototype,"exponent",void 0);let Qe=class e extends We{};Qe=l([m({type:v.Sequence})],Qe);let Fe=class e{constructor(e=0){this.value=e}};l([d({type:b.Integer})],Fe.prototype,"value",void 0);Fe=l([m({type:v.Choice})],Fe);let _e=class e{constructor(e={}){this.url="";this.language="";Object.assign(this,e)}};l([d({type:b.IA5String})],_e.prototype,"url",void 0);l([d({type:b.PrintableString})],_e.prototype,"language",void 0);_e=l([m({type:v.Sequence})],_e);let Ze=qe=class e extends x{constructor(e){super(e);Object.setPrototypeOf(this,qe.prototype)}};Ze=qe=l([m({type:v.Sequence,itemType:_e})],Ze);let Je=Me=class e extends Ze{constructor(e){super(e);Object.setPrototypeOf(this,Me.prototype)}};Je=Me=l([m({type:v.Sequence,itemType:_e})],Je);let ea=Ye=class e extends x{constructor(e){super(e);Object.setPrototypeOf(this,Ye.prototype)}};ea=Ye=l([m({type:v.Sequence,itemType:b.ObjectIdentifier})],ea);let aa=Xe=class e extends x{constructor(e){super(e);Object.setPrototypeOf(this,Xe.prototype)}};aa=Xe=l([m({type:v.Sequence,itemType:b.PrintableString})],aa);const na="0.4.0.1862.1";const ta=`${na}.3`;const ca=`${na}.5`;const oa=`${na}.6`
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */;const sa=a=>{const{extension:n}=a;function t(a,n){if(!n.byteLength){return null}if(a===p){const a=r.parse(n,g);return e(xe,{name:"Semantics Identifier",value:ie(a.semanticsIdentifier)})}if(a===oa){const a=r.parse(n,ea);return e(xe,{name:"QC Types",value:a.map((e=>ie(e))).join(", ")})}if(a===ta){const a=r.parse(n,Fe);return e(xe,{name:"Retention Period",value:`${a.value} years`})}if(a===ca){const a=r.parse(n,Ze);return[e(xe,{name:"PDS Locations",value:""}),a.map((a=>e(me,null,e(xe,{name:"URL",value:a.url}),e(xe,{name:"Language",value:a.language}))))]}return e(xe,{name:"Info",value:c.Convert.ToHex(n),monospace:true})}return e(Ie,{extension:n},Boolean(n.value.length)&&[e(xe,{name:"Statements",value:""}),n.value.map((a=>e(me,null,e(xe,{name:"Statement ID",value:ie(a.statementId)}),t(a.statementId,a.statementInfo))))])};
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */const ra=a=>{const{extension:n}=a;return e(Ie,{extension:n},e(xe,{name:"Comment",value:n.value.value}))};
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */const ia=a=>{const{extension:n}=a;return e(Ie,{extension:n},e(xe,{name:"Type",value:n.value.toJSON().join(", ")}))};
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */const fa=a=>{const{extension:n}=a;return e(Ie,{extension:n},e(xe,{name:"Role",value:n.value.text}))};
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */const ua=a=>{const{extension:n,getLEILink:t}=a;return e(Ie,{extension:n},e(xe,{name:"Identifier",value:n.value.text,href:t(n.value.text)}))};
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */const la=a=>{const{extension:t}=a;return e(Ie,{extension:t},e(xe,{name:"Version",value:t.value.version}),e(Le,Object.assign({generalName:t.value.location},a)),e(xe,{name:"Requires Auth",value:t.value.requiresAuth?n.getString("yes"):n.getString("no")}))};
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */const da=a=>{const{extension:n}=a;return e(Ie,{extension:n},e(xe,{name:"Version",value:n.value.version}))};
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */const ba=a=>{const{extension:n}=a;return e(Ie,{extension:n},e(xe,{name:"Reason",value:n.value.toJSON()}))};
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */function ma(e){return c.Convert.ToString(e.values[0])}
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */const va=a=>{const{extension:n}=a;return e(Ie,{extension:n},Boolean(n.value.length)&&[e(xe,{name:"Attributes",value:""}),n.value.map((a=>e(me,null,e(xe,{name:"Type",value:ie(a.type)}),e(xe,{name:"Value",value:ma(a)}))))])};
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */const xa=a=>{const{extension:n}=a;return e(Ie,{extension:n},e(xe,{name:"Value",value:n.value,monospace:true}))};
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */const pa=a=>{const{extension:n}=a;return e(Ie,{extension:n},e(xe,{name:"Not Before",value:t(n.value.notBefore)}),e(xe,{name:"Not After",value:t(n.value.notAfter)}))};
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */const ga=a=>{const{extension:n}=a;return e(Ie,{extension:n},e(xe,{name:"Version",value:n.value.entrustVers}),e(xe,{name:"Info Flags",value:n.value.entrustInfoFlags.toJSON().join(", ")}))};
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */const ya=a=>{const{extension:n}=a;return e(Ie,{extension:n},Boolean(n.value.length)&&[e(xe,{name:"Biometrics",value:""}),n.value.map((a=>e(me,null,e(xe,{name:"OID",value:ie(a.typeOfBiometricData.biometricDataOid)}),e(xe,{name:"Type",value:a.typeOfBiometricData.predefinedBiometricType}),e(xe,{name:"Algorithm",value:ie(a.hashAlgorithm.algorithm)}),e(xe,{name:"Hash",value:c.Convert.ToHex(a.biometricDataHash.buffer),monospace:true}),e(xe,{name:"Source Uri",value:a.sourceDataUri}))))])};
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */const ha=a=>{const{extension:n}=a;const t=a=>{if(!a){return null}return a.map((a=>{const{imageDetails:n}=a;return[e(xe,{name:"Image Type",value:n.mediaType}),e(xe,{name:"Image Hash",value:c.Convert.ToHex(n.logotypeHash[0].hashValue),monospace:true}),e(xe,{name:"Image URL",value:n.logotypeURI[0],monospace:true,collapse:true}),e(xe,{name:"Image Hash Algorithm",value:ie(n.logotypeHash[0].hashAlg.algorithm)})]}))};const o=a=>{if(!a){return null}return a.map((a=>{const{audioDetails:n}=a;return[e(xe,{name:"Audio Type",value:n.mediaType}),e(xe,{name:"Audio Hash",value:c.Convert.ToHex(n.logotypeHash[0].hashValue),monospace:true}),e(xe,{name:"Audio URL",value:n.logotypeURI[0],monospace:true,collapse:true}),e(xe,{name:"Audio Hash Algorithm",value:ie(n.logotypeHash[0].hashAlg.algorithm)})]}))};const s=(a,n)=>{if(!n||!n.direct){return null}const{image:c,audio:s}=n.direct;return[e(xe,{name:"Type",value:a}),t(c),o(s),e("tr",null,e("td",null),e("td",null))]};return e(Ie,{extension:n},s("Subject",n.value.subjectLogo),s("Issuer",n.value.issuerLogo))};
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */const Ca=a=>{const{extension:n}=a;return e(Ie,{extension:n},n.value.length>0&&[e(xe,{name:"Entries",value:""}),n.value.map((a=>e(me,null,e(xe,{name:"SPC",value:a.spc}),e(xe,{name:"Range",value:a.range?`start=${a.range.start} count==${a.range.count}`:null}),e(xe,{name:"One",value:a.one}))))])};
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */const Sa=a=>{const{extension:n}=a;return e(Ie,{extension:n},n.value.requireExplicitPolicy&&e(xe,{name:"Require Explicit Policy",value:y.toASN(n.value.requireExplicitPolicy).valueBlock.toString()}),n.value.inhibitPolicyMapping&&e(xe,{name:"Inhibit Policy Mapping",value:y.toASN(n.value.inhibitPolicyMapping).valueBlock.toString()}))};
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */const Na=a=>{const{extension:n}=a;return e(Ie,{extension:n},n.value.length>0&&[e(xe,{name:"Policies",value:""}),n.value.map((a=>e(me,null,e(xe,{name:"Issuer Domain",value:ie(a.issuerDomainPolicy)}),e(xe,{name:"Subject Domain",value:ie(a.subjectDomainPolicy)}))))])};
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */const Da=a=>{const{extension:t}=a;return e(Ie,{extension:t},e(xe,{name:n.getString("value"),value:t.value.value}))};
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */const Ia=a=>{var t;const{extension:c}=a;return e(Ie,{extension:c},(t=c.value.distributionPoint)===null||t===void 0?void 0:t.fullName.map((n=>e(Le,Object.assign({generalName:n},a)))),c.value.onlySomeReasons&&e(xe,{name:n.getString("onlyReasons"),value:c.value.onlySomeReasons.toJSON().join(", ")}),c.value.indirectCRL&&e(xe,{name:n.getString("indirectCRL"),value:n.getString("yes")}),c.value.onlyContainsUserCerts&&e(xe,{name:n.getString("onlyUserCertificates"),value:n.getString("yes")}),c.value.onlyContainsAttributeCerts&&e(xe,{name:n.getString("onlyAttributeCertificates"),value:n.getString("yes")}),c.value.onlyContainsCACerts&&e(xe,{name:n.getString("onlyCACertificates"),value:n.getString("yes")}))};
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */const Aa=a=>{const{extension:t}=a;const o=a=>Object.keys(a).map((t=>{const s=a[t];let i="";switch(true){case typeof s==="string"||typeof s==="number":i=s;break;case s instanceof S:i=s.join(", ");break;case typeof s==="boolean":i=s?n.getString("yes"):n.getString("no");break;case Object.is(s,null):i="NULL";break;case s instanceof C:return[e(xe,{name:fe(t),value:""}),e(me,null,o(s))];case c.BufferSourceConverter.isBufferSource(s):if(t==="attestationApplicationId"){try{const a=r.parse(s,h);if(a.packageInfos.length||a.signatureDigests.length){return[e(xe,{name:fe(t),value:""}),Boolean(a.packageInfos)&&e(me,null,e(xe,{name:fe("packageInfos"),value:""}),a.packageInfos.map((a=>e(me,null,o(a)))))]}}catch(e){}}try{i=c.Convert.ToString(s)}catch(e){i=c.Convert.ToHex(s)}break}return e(xe,{name:fe(t),value:i})}));const s=(a,n)=>{if(n.length===0){return null}return[e(xe,{name:a,value:""}),e(me,null,n.map(o))]};return e(Ie,{extension:t},e(xe,{name:fe("attestationVersion"),value:t.value.attestationVersion}),e(xe,{name:fe("attestationSecurityLevel"),value:t.value.attestationSecurityLevel}),e(xe,{name:fe("keymasterVersion"),value:t.value.keymasterVersion}),e(xe,{name:fe("keymasterSecurityLevel"),value:t.value.keymasterSecurityLevel}),e(xe,{name:fe("attestationChallenge"),value:c.Convert.ToString(t.value.attestationChallenge)}),e(xe,{name:fe("uniqueId"),value:c.Convert.ToString(t.value.uniqueId)||undefined}),s(fe("softwareEnforced"),t.value.softwareEnforced),s(fe("teeEnforced"),t.value.teeEnforced))};
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */const ja=a=>{const{extension:n}=a;return e(Ie,{extension:n},Object.keys(n.value).map((a=>e(xe,{name:fe(a),value:n.value[a]}))))};
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */const Oa=a=>{const{extensions:n,title:t}=a;if(!n||!n.length){return null}return[e(ve,{value:t||"Extensions"}),n.map((n=>{try{if(n.value instanceof N){return e(Ae,{extension:n})}if(n.value instanceof D){return e(je,{extension:n})}if(n.value instanceof I){return e(Oe,{extension:n})}if(n.value instanceof A){return e(Te,Object.assign({extension:n},a))}if(n.value instanceof j){return e(Ge,Object.assign({extension:n},a))}if(n.value instanceof O){return e(Pe,Object.assign({extension:n},a))}if(n.value instanceof T||n.value instanceof G){return e(Be,Object.assign({extension:n},a))}if(n.value instanceof k){return e(Ve,Object.assign({extension:n},a))}if(n.value instanceof L){return e(Re,{extension:n})}if(n.value instanceof P){return e(Ue,{extension:n})}if(n.value instanceof B){return e($e,Object.assign({extension:n},a))}if(n.value instanceof V){return e(Ke,{extension:n})}if(n.value instanceof R){return e(He,{extension:n})}if(n.value instanceof E){return e(we,{extension:n})}if(n.value instanceof U){return e(sa,{extension:n})}if(n.value instanceof $){return e(ra,{extension:n})}if(n.value instanceof K){return e(ia,{extension:n})}if(n.value instanceof H){return e(fa,{extension:n})}if(n.value instanceof w){return e(ua,Object.assign({extension:n},a))}if(n.value instanceof q){return e(la,Object.assign({extension:n},a))}if(n.value instanceof M){return e(da,{extension:n})}if(n.value instanceof Y){return e(ba,{extension:n})}if(n.value instanceof X){return e(va,{extension:n})}if(n.value instanceof z){return e(pa,{extension:n})}if(n.value instanceof W){return e(ga,{extension:n})}if(n.value instanceof Q){return e(ya,{extension:n})}if(n.value instanceof F){return e(ha,{extension:n})}if(n.value instanceof _){return e(Ca,{extension:n})}if(n.value instanceof Z){return e(Sa,{extension:n})}if(n.value instanceof J){return e(Na,{extension:n})}if(n.value instanceof ee){return e(Da,{extension:n})}if(n.value instanceof ae){return e(Ia,Object.assign({extension:n},a))}if(n.value instanceof ne){return e(Aa,Object.assign({extension:n},a))}if(n.value instanceof te){return e(ja,Object.assign({extension:n},a))}if(typeof n.value==="string"){return e(xa,{extension:n})}return e(Ie,{extension:n})}catch(e){console.error("Error render extension:",n.asn.extnID);return null}}))]};
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */const Ta=a=>{const{certificate:t}=a;return[e(ve,{value:n.getString("miscellaneous")}),e("tr",null,e("td",null,e(se,{startIcon:e(re,null),onClick:()=>t.downloadAsPEM()},n.getString("download.pem")))),e("tr",null,e("td",null,e(se,{startIcon:e(re,null),onClick:()=>t.downloadAsDER()},n.getString("download.der"))))]};export{pe as B,Oa as E,Le as G,Se as I,Ta as M,he as P,xe as R,Ce as S,De as T,Ne as a,le as b,ue as c,ie as d,fe as e,me as f,de as g,ve as h};
//# sourceMappingURL=p-CJro0Exb.js.map