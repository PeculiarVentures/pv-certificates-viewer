/*!
 * © Peculiar Ventures https://peculiarventures.com/ - MIT License
 */
import{h as e}from"./p-0b356bb5.js";import{a1 as a,$ as n,a0 as t,a2 as c,a6 as o,v as s,a7 as r,a8 as i,a9 as f,aa as u,ab as l,ac as d,ad as b,ae as m,af as v,ag as x,ah as p,ai as g,aj as y,ak as h,al as C,am as S,an as N,ao as A,ap as I,aq as D,ar as j,as as O,at as T,au as G,av as k,aw as L,ax as P,ay as R,az as V,aA as B,aB as $,aC as E,aD as U,aE as K,aF as H,aG as M,aH as q,a3 as w,aI as X,aJ as Y,aK as Q,aL as z,aM as F,aN as W,aO as J,aP as Z,aQ as _,aR as ee,aS as ae,aT as ne}from"./p-a650174a.js";import{C as te,B as ce}from"./p-59e5ac12.js";import{L as oe}from"./p-94a453d7.js";import{T as se,B as re}from"./p-7f9beaa8.js";import{D as ie}from"./p-17e3c47b.js";
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */function fe(e){const n=a[e];if(n){return`${n} (${e})`}return e}
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */function ue(e){const a=e.replace(/([A-Z])/g," $1");return a.charAt(0).toUpperCase()+a.slice(1)}
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */const le=e=>`https://search.gleif.org/#/record/${e}`;const de=e=>`https://search.censys.io/search?resource=hosts&q=dns.names%3A${e}`;const be=e=>`https://search.censys.io/search?resource=hosts&q=ip%3A${e}`
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */;function me(e){return e.indexOf("http")===0}
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */const ve=(a,n)=>e("tr",null,e("td",{colSpan:2},e("table",null,n)));const xe=a=>{const{value:n}=a;if(!n){return null}return[e("tr",{class:"title"},e("td",{colSpan:2},e(se,{variant:"s1",color:"black"},n))),e("tr",null,e("td",{colSpan:2,class:"divider"},e("span",null)))]};const pe=a=>{const{name:n,value:t,monospace:c,collapse:o,href:s,extraValue:r}=a;if(!n){return null}if(t===undefined||t===null){return null}let i;if(o){i=e("peculiar-text-hider",null,t)}else{i=t}const f=!!t.toString();return e("tr",null,e("td",{colSpan:f?1:2},e(se,{variant:"b2",color:"gray-9"},n)),f&&e("td",{class:{monospace:c}},me(t.toString())||s?e(oe,{variant:"b2",href:s||t.toString()},t):e(se,{variant:"b2",color:"black"},i,r)))};
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */const ge=a=>{const{serialNumber:c,version:o,validity:s,notBefore:r,notAfter:i,lastUpdate:f,nextUpdate:u,type:l}=a;return[e(xe,{value:n.getString("basicInformation")}),e(pe,{name:n.getString("type"),value:l}),e(pe,{name:n.getString("serialNumber"),value:c,monospace:true}),e(pe,{name:n.getString("version"),value:o}),e(pe,{name:n.getString("validity"),value:s}),e(pe,{name:n.getString("issued"),value:r?t(r):undefined}),e(pe,{name:n.getString("expired"),value:i?t(i):undefined}),e(pe,{name:n.getString("lastUpdate"),value:f?t(f):undefined}),e(pe,{name:n.getString("nextUpdate"),value:u?t(u):undefined})]};
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */function ye(e){if(e.params&&"modulus"in e.params){let a=e.params.modulus.byteLength;if(a%2){a-=1}return a*8}return null}function he(e){if(e.params&&"publicExponent"in e.params){return e.params.publicExponent.byteLength===3?65537:3}return null}const Ce=a=>{const{publicKey:t}=a;if(!t){return null}function c(a){return[e(pe,{name:n.getString("algorithm"),value:fe(a.algorithm)}),e(pe,{name:n.getString("namedCurve"),value:fe(a.params&&"namedCurve"in a.params?a.params.namedCurve:undefined)}),e(pe,{name:n.getString("exponent"),value:he(a)}),e(pe,{name:n.getString("modulus"),value:ye(a)}),e(pe,{name:n.getString("value"),value:te.ToHex(a.value),monospace:true,collapse:true})]}return[e(xe,{value:n.getString("publicKeyInfo")}),c(t),Array.isArray(t.params)&&t.params.length&&t.params.map((a=>e(ve,null,c(a))))]};
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */const Se=a=>{const{name:t}=a;return[e(xe,{value:n.getString("subjectName")}),t.map((a=>e(pe,{name:a.name||a.type,value:a.value})))]};
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */const Ne=a=>{const{name:t,issuerDnLink:c}=a;const o=n.getString("issuerName");return[e(xe,{value:c?e(oe,{href:c},o):o}),t.map((a=>e(pe,{name:a.name||a.type,value:a.value})))]};
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */const Ae=a=>{const{signature:t}=a;if(!t){return null}function c(a){return[e(pe,{name:n.getString("algorithm"),value:fe(a.algorithm)}),e(pe,{name:n.getString("value"),value:te.ToHex(a.value),monospace:true,collapse:true})]}return[e(xe,{value:n.getString("signature")}),c(t),t.params&&t.params.length&&t.params.map((a=>e(ve,null,c(a))))]};
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */const Ie=a=>{const{thumbprints:t}=a;if(!t){return null}const c=Object.keys(t);if(!c.length){return null}return[e(xe,{value:n.getString("fingerprints")}),c.map((a=>e(pe,{name:a,value:t[a],monospace:true})))]};
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */const De=(a,t)=>{const{extension:c}=a;return[e(pe,{name:"Name",value:fe(c.asn.extnID)}),e(pe,{name:"Critical",value:c.asn.critical?n.getString("yes"):n.getString("no")}),t,e("tr",null,e("td",{colSpan:2,class:"divider"},e("span",null)))]};
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */const je=a=>{const{extension:n}=a;return e(De,{extension:n},e(pe,{name:"Usage",value:n.value.toJSON().join(", ")}))};
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */const Oe=a=>{const{extension:t}=a;return e(De,{extension:t},e(pe,{name:"Certificate Authority",value:t.value.cA?n.getString("yes"):n.getString("no")}),e(pe,{name:"Path Length Constraint",value:t.value.pathLenConstraint}))};
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */const Te=a=>{const{extension:n}=a;return e(De,{extension:n},Boolean(n.value.length)&&[e(pe,{name:"Purposes",value:""}),n.value.map((a=>e(ve,null,e(pe,{name:"Purpose",value:fe(a)}))))])};
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */const Ge=a=>{const{extension:n,getSubjectKeyIdChildrenLink:t,getSubjectKeyIdSiblingsLink:c}=a;const o=te.ToHex(n.value.buffer);const s=t(o);const r=c(o);return e(De,{extension:n},e(pe,{name:"Key ID",value:o,monospace:true,extraValue:[s&&e("span",null," [",e(oe,{href:s},"children"),"]"),r&&e("span",null," [",e(oe,{href:r},"siblings"),"]")]}))};
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */const ke=a=>{const{extension:n,getAuthKeyIdParentLink:t,getAuthKeyIdSiblingsLink:c}=a;const o=te.ToHex(n.value.keyIdentifier.buffer);const s=t(o);const r=c(o);return e(De,{extension:n},e(pe,{name:"Key ID",value:o,monospace:true,extraValue:[s&&e("span",null," [",e(oe,{href:s},"parents"),"]"),r&&e("span",null," [",e(oe,{href:r},"siblings"),"]")]}))};
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */const Le={otherName:"Other Name",rfc822Name:"RFC 822 Name",dNSName:"DNS Name",x400Address:"X400 Address",directoryName:"Directory Name",ediPartyName:"Edi Party Name ",uniformResourceIdentifier:"URI",iPAddress:"IP Address",registeredID:"Registered ID"};const Pe=n=>{const{generalName:t,getDNSNameLink:u,getIPAddressLink:l}=n;if(!t){return null}return Object.keys(t).map((n=>{const d=t[n];if(d instanceof c){return[e(pe,{name:Le[n]||n,value:""}),e(ve,null,d.map((n=>n.map((n=>e(pe,{name:a[n.type]||n.type,value:n.value.toString()}))))))]}if(d instanceof o){try{const n=s.parse(d.value,r);return e(pe,{name:a[d.typeId]||d.typeId,value:n.toString()})}catch(e){}try{const n=s.parse(d.value,i);if(n.explicitText){return e(pe,{name:a[d.typeId]||d.typeId,value:n.explicitText.toString()})}}catch(e){}return e(pe,{name:a[d.typeId]||d.typeId,value:te.ToHex(d.value),monospace:true})}if(ce.isBufferSource(d)){return e(pe,{name:Le[n]||n,value:te.ToString(d)})}if(d instanceof f){return e(pe,{name:Le[n]||n,value:d.partyName.toString()})}if(n==="dNSName"){return e(pe,{name:Le[n]||n,value:d,href:u(d)})}if(n==="iPAddress"){return e(pe,{name:Le[n]||n,value:d,href:l(d)})}return e(pe,{name:Le[n]||n,value:d})}))};
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */const Re=a=>{const{extension:n}=a;return e(De,{extension:n},n.value.map((n=>{var t,c;return[(t=n.distributionPoint)===null||t===void 0?void 0:t.fullName.map((n=>e(Pe,Object.assign({generalName:n},a)))),(c=n.cRLIssuer)===null||c===void 0?void 0:c.map((n=>e(Pe,Object.assign({generalName:n},a))))]})))};
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */const Ve=a=>{const{extension:n}=a;return e(De,{extension:n},Boolean(n.value.length)&&[e(pe,{name:"Descriptions",value:""}),n.value.map((n=>e(ve,null,e(pe,{name:"Method",value:fe(n.accessMethod)}),e(Pe,Object.assign({generalName:n.accessLocation},a)))))])};
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */const Be=a=>{const{extension:n}=a;return e(De,{extension:n},n.value.map((n=>e(Pe,Object.assign({generalName:n},a)))))};
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */const $e=a=>{const{extension:n}=a;return e(De,{extension:n},Boolean(n.value.length)&&[e(pe,{name:"Policies",value:""}),n.value.map((a=>e(ve,null,e(pe,{name:"Policy ID",value:fe(a.policyIdentifier)}),a.policyQualifiers&&Boolean(a.policyQualifiers.length)&&[e(pe,{name:"Qualifiers",value:""}),a.policyQualifiers.map((a=>{const n=[e(pe,{name:"Qualifier ID",value:fe(a.policyQualifierId)})];if(a.policyQualifierId==="1.3.6.1.5.5.7.2.1"){const t=s.parse(a.qualifier,r);n.push(e(pe,{name:"Value",value:t.toString()}))}if(a.policyQualifierId==="1.3.6.1.5.5.7.2.2"){const t=s.parse(a.qualifier,i);if(t.explicitText){n.push(e(pe,{name:"Value",value:t.explicitText.toString()}))}}return e(ve,null,n)}))])))])};
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */const Ee={"9606c02c690033aa1d145f59c6e2648d0549f0df96aab8db915a70d8ecf390a5":"Akamai CT","39376f545f7b4607f59742d768cd5d2437bf3473b6534a4834bcf72e681c83c9":"Alpha CT",a577ac9ced7548dd8f025b67a241089df86e0f476ec203c2ecbedb185f282638:"CNNIC CT",cdb5179b7fc1c046feea31136a3f8f002e6182faf8896fecc8b2f5b5ab604900:"Certly.IO","1fbc36e002ede97f40199e86b3573b8a4217d80187746ad0da03a06054d20df4":"Cloudflare “Nimbus2017”",db74afeecb29ecb1feca3e716d2ce5b9aabb36f7847183c75d9d4f37b61fbf64:"Cloudflare “Nimbus2018”","747eda8331ad331091219cce254f4270c2bffd5e422008c6373579e6107bcc56":"Cloudflare “Nimbus2019”","5ea773f9df56c0e7b536487dd049e0327a919a0c84a112128418759681714558":"Cloudflare “Nimbus2020”","4494652eb0eeceafc44007d8a8fe28c0dae682bed8cb31b53fd33396b5b681a8":"Cloudflare “Nimbus2021”","41c8cab1df22464a10c6a13a0942875e4e318b1b03ebeb4bc768f090629606f6":"Cloudflare “Nimbus2022”","7a328c54d8b72db620ea38e0521ee98416703213854d3bd22bc13a57a352eb52":"Cloudflare “Nimbus2023”","6ff141b5647e4222f7ef052cefae7c21fd608e27d2af5a6e9f4b8a37d6633ee5":"DigiCert Nessie2018",fe446108b1d01ab78a62ccfeab6ab2b2babff3abdad80a4d8b30df2d0008830c:"DigiCert Nessie2019",c652a0ec48ceb3fcab170992c43a87413309e80065a26252401ba3362a17c565:"DigiCert Nessie2020",eec095ee8d72640f92e3c3b91bc712a3696a097b4b6a1a1438e647b2cbedc5f9:"DigiCert Nessie2021","51a3b0f5fd01799c566db837788f0ca47acc1b27cbf79e88429a0dfed48b05e5":"DigiCert Nessie2022",b3737707e18450f86386d605a9dc11094a792db1670c0b87dcf0030e7936a59a:"DigiCert Nessie2023","5614069a2fd7c2ecd3f5e1bd44b23ec74676b9bc99115cc0ef949855d689d0dd":"DigiCert Server","8775bfe7597cf88c43995fbdf36eff568d475636ff4ab560c1b4eaff5ea0830f":"DigiCert Server 2",c1164ae0a772d2d4392dc80ac10770d4f0c49bde991a4840c1fa075164f63360:"DigiCert Yeti2018",e2694bae26e8e94009e8861bb63b83d43ee7fe7488fba48f2893019dddf1dbfe:"DigiCert Yeti2019",f095a459f200d18240102d2f93888ead4bfe1d47e399e1d034a6b0a8aa8eb273:"DigiCert Yeti2020","5cdc4392fee6ab4544b15e9ad456e61037fbd5fa47dca17394b25ee6f6c70eca":"DigiCert Yeti2021","2245450759552456963fa12ff1f76d86e0232663adc04b7f5dc6835c6ee20f02":"DigiCert Yeti2022","35cf191bbfb16c57bf0fad4c6d42cbbbb627202651ea3fe12aefa803c33bd64c":"DigiCert Yeti2023","717ea7420975be84a2723553f1777c26dd51af4e102144094d9019b462fb6668":"GDCA 1","14308d90ccd030135005c01ca526d81e84e87624e39b6248e08f724aea3bb42a":"GDCA 2",c9cf890a21109c666cc17a3ed065c930d0e0135a9feba85af14210b8072421aa:"GDCA CT #1","924a30f909336ff435d6993a10ac75a2c641728e7fc2d659ae6188ffad40ce01":"GDCA CT #2",fad4c97cc49ee2f8ac85c5ea5cea09d0220dbbf4e49c6b50662ff868f86b8c28:"Google “Argon2017”",a4501269055a15545e6211ab37bc103f62ae5576a45e4b1714453e1b22106a25:"Google “Argon2018”","63f2dbcde83bcc2ccf0b728427576b33a48d61778fbd75a638b1c768544bd88d":"Google “Argon2019”",b21e05cc8ba2cd8a204e8766f92bb98a2520676bdafa70e7b249532def8b905e:"Google “Argon2020”",f65c942fd1773022145418083094568ee34d131933bfdf0c2f200bcc4ef164e3:"Google “Argon2021”","2979bef09e393921f056739f63a577e5be577d9c600af8f94d5d265c255dc784":"Google “Argon2022”",e83ed0da3ef5063532e75728bc896bc903d3cbd1116beceb69e1777d6d06bd6e:"Google “Argon2023”","68f698f81f6482be3a8ceeb9281d4cfc71515d6793d444d10a67acbb4f4ffbc4":"Google “Aviator”",c3bf03a7e1ca8841c607bae3ff4270fca5ec45b186ebbe4e2cf3fc778630f5f6:"Google “Crucible”","1d024b8eb1498b344dfd87ea3efc0996f7506f235d1d497061a4773c439c25fb":"Google “Daedalus”","293c519654c83965baaa50fc5807d4b76fbf587a2972dca4c30cf4e54547f478":"Google “Icarus”",a4b90990b418581487bb13a2cc67700a3c359804f91bdfb8e377cd0ec80ddc10:"Google “Pilot”",ee4bbdb775ce60bae142691fabe19e66a30f7e5fb072d88300c47b897aa8fdcb:"Google “Rocketeer”",bbd9dfbc1f8a71b593942397aa927b473857950aab52e81a909664368e1ed185:"Google “Skydiver”","52eb4b225ec896974850675f23e43bc1d021e3214ce52ecd5fa87c203cdfca03":"Google “Solera2018”","0b760e9a8b9a682f88985b15e947501a56446bba8830785c3842994386450c00":"Google “Solera2019”","1fc72ce5a1b799f400c359bff96ca3913548e8644220610952e9ba1774f7bac7":"Google “Solera2020”",a3c99845e80ab7ce00157b3742df0207dd272b2b602ecf98ee2c12db9c5ae7e7:"Google “Solera2021”","697aafca1a6b536fae21205046debad7e0eaea13d2432e6e9d8fb379f2b9aaf3":"Google “Solera2022”",a899d8780c9290aaf462f31880ccfbd52451e970d0fbf591ef75b0d99b645681:"Google “Submariner”",b0cc83e5a5f97d6baf7c09cc284904872ac7e88b132c6350b7c6fd26e16c6c77:"Google “Testtube”",b10cd559a6d67846811f7df9a51532739ac48d703bea0323da5d38755bc0ad4e:"Google “Xenon2018”","084114980071532c16190460bcfc47fdc2653afa292c72b37ff863ae29ccc9f0":"Google “Xenon2019”","07b75c1be57d68fff1b0c61d2315c7bae6577c5794b76aeebc613a1a69d3a21c":"Google “Xenon2020”","7d3ef2f88fff88556824c2c0ca9e5289792bc50e78097f2e6a9768997e22f0d7":"Google “Xenon2021”","46a555eb75fa912030b5a28969f4f37d112c4174befd49b885abf2fc70fe6d47":"Google “Xenon2022”","7461b4a09cfb3d41d75159575b2e7649a445a8d27709b0cc564a6482b7eb41a3":"Izenpe","8941449c70742e06b9fc9ce7b116ba0024aa36d59af44f0204404f00f7ea8566":"Izenpe “Argi”","296afa2d568bca0d2ea844956ae9721fc35fa355ecda99693aafd458a71aefdd":"Let“s Encrypt ”Clicky”","537b69a3564335a9c04904e39593b2c298eb8d7a6e83023635c627248cd6b440":"Nordu “flimsy”",aae70b7f3cb8d566c86c2f16979c9f445f69ab0eb4535589b2f77a030104f3cd:"Nordu “plausible”",e0127629e90496564e3d0147984498aa48f8adb16600eb7902a1ef9909906273:"PuChuangSiDa CT",cf55e28923497c340d5206d05353aeb25834b52f1f8dc9526809f212efdd7ca6:"SHECA CT 1","32dc59c2d4c41968d56e14bc61ac8f0e45db39faf3c155aa4252f5001fa0c623":"SHECA CT 2",db76fdadac65e7d09508886e2159bd8b90352f5fead3e3dc5e22eb350acc7b98:"Sectigo (Comodo) “Dodo” CT","6f5376ac31f03119d89900a45115ff77151c11d902c10029068db2089a37d913":"Sectigo (Comodo) “Mammoth” CT","5581d4c2169036014aea0b9b573c53f0c0e43878702508172fa3aa1d0713d30c":"Sectigo (Comodo) “Sabre” CT","34bb6ad6c3df9c03eea8a499ff7891486c9d5e5cac92d01f7bfd1bce19db48ef":"StartCom",ddeb1d2b7a0d4fa6208b81ad8168707e2e8e9d01d55c888d3d11c4cdb6ecbecc:"Symantec",a7ce4a4e6207e0addee5fdaa4b1f86768767b5d002a55d47310e7e670a95eab2:"Symantec Deneb","15970488d7b997a05beb52512adee8d2e8b4a3165264121a9fabfbd5f85ad93f":"Symantec “Sirius”",bc78e1dfc5f63c684649334da10fa15f0979692009c081b4f3f6917f3ed9b8a5:"Symantec “Vega”",b0b784bc81c0ddc47544e883f05985bb9077d134d8ab88b2b2e533980b8e508b:"Up In The Air “Behind the Sofa”",ac3b9aed7fa9674757159e6d7d575672f9d98100941e9bdeffeca1313b75782d:"Venafi","03019df3fd85a69a8ebd1facc6da9ba73e469774fe77f579fc5a08b8328c1d6b":"Venafi Gen2 CT","41b2dc2e89e63ce4af1ba7bb29bf68c6dee6f9f1cc047e30dffae3b3ba259263":"WoSign","63d0006026dde10bb0601f452446965ee2b6ea2cd4fbc95ac866a550af9075b7":"WoSign 2","9e4ff73dc3ce220b69217c899e468076abf8d78636d5ccfc85a31a75628ba88b":"WoSign CT #1"};
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */const Ue=a=>{const{extension:n}=a;return e(De,{extension:n},Boolean(n.value.items.length)&&[e(pe,{name:"Signed Certificate Timestamps",value:""}),n.value.toJSON().map((a=>e(ve,null,e(pe,{name:"Version",value:a.version+1}),e(pe,{name:"Log Operator",value:Ee[a.logId]||a.logId}),e(pe,{name:"Log Key ID",value:a.logId,monospace:true}),e(pe,{name:"Timestamp",value:t(a.timestamp)}),e(pe,{name:"Signature Algorithm",value:`${a.hashAlgorithm} ${a.signatureAlgorithm}`.toUpperCase()}),e(pe,{name:"Signature",value:a.signature,monospace:true}))))])};
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */const Ke=a=>{var n,t;const{extension:c}=a;return e(De,{extension:c},(n=c.value.excludedSubtrees)===null||n===void 0?void 0:n.map((n=>e(Pe,Object.assign({generalName:n.base},a)))),(t=c.value.permittedSubtrees)===null||t===void 0?void 0:t.map((n=>e(Pe,Object.assign({generalName:n.base},a)))))};
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */const He=a=>{const{extension:n}=a;return e(De,{extension:n},e(pe,{name:"Template ID",value:n.value.templateID}),e(pe,{name:"Template Major Version",value:n.value.templateMajorVersion}),e(pe,{name:"Template Minor Version",value:n.value.templateMinorVersion}))};
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */const Me=a=>{const{extension:n}=a;return e(De,{extension:n},e(pe,{name:"Name",value:n.value.toString()}))};
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */const qe=a=>{const{extension:n}=a;const t=n.value.getVersion();return e(De,{extension:n},e(pe,{name:"Certificate Index",value:t.certificateIndex}),e(pe,{name:"Key Index",value:t.keyIndex}))};var we,Xe,Ye,Qe;let ze=class e{constructor(e){if(typeof e==="string"){this.alphabetic=e}else if(typeof e==="number"){this.numeric=e}}};u([l({type:d.PrintableString})],ze.prototype,"alphabetic",void 0);u([l({type:d.PrintableString})],ze.prototype,"numeric",void 0);ze=u([b({type:m.Choice})],ze);class Fe{constructor(e={}){this.currency=new ze;this.amount=0;this.exponent=0;Object.assign(this,e)}}u([l({type:ze})],Fe.prototype,"currency",void 0);u([l({type:d.Integer})],Fe.prototype,"amount",void 0);u([l({type:d.Integer})],Fe.prototype,"exponent",void 0);let We=class e extends Fe{};We=u([b({type:m.Sequence})],We);let Je=class e{constructor(e=0){this.value=e}};u([l({type:d.Integer})],Je.prototype,"value",void 0);Je=u([b({type:m.Choice})],Je);let Ze=class e{constructor(e={}){this.url="";this.language="";Object.assign(this,e)}};u([l({type:d.IA5String})],Ze.prototype,"url",void 0);u([l({type:d.PrintableString})],Ze.prototype,"language",void 0);Ze=u([b({type:m.Sequence})],Ze);let _e=we=class e extends v{constructor(e){super(e);Object.setPrototypeOf(this,we.prototype)}};_e=we=u([b({type:m.Sequence,itemType:Ze})],_e);let ea=Xe=class e extends _e{constructor(e){super(e);Object.setPrototypeOf(this,Xe.prototype)}};ea=Xe=u([b({type:m.Sequence,itemType:Ze})],ea);let aa=Ye=class e extends v{constructor(e){super(e);Object.setPrototypeOf(this,Ye.prototype)}};aa=Ye=u([b({type:m.Sequence,itemType:d.ObjectIdentifier})],aa);let na=Qe=class e extends v{constructor(e){super(e);Object.setPrototypeOf(this,Qe.prototype)}};na=Qe=u([b({type:m.Sequence,itemType:d.PrintableString})],na);const ta="0.4.0.1862.1";const ca=`${ta}.3`;const oa=`${ta}.5`;const sa=`${ta}.6`
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */;const ra=a=>{const{extension:n}=a;function t(a,n){if(!n.byteLength){return null}if(a===x){const a=s.parse(n,p);return e(pe,{name:"Semantics Identifier",value:fe(a.semanticsIdentifier)})}if(a===sa){const a=s.parse(n,aa);return e(pe,{name:"QC Types",value:a.map((e=>fe(e))).join(", ")})}if(a===ca){const a=s.parse(n,Je);return e(pe,{name:"Retention Period",value:`${a.value} years`})}if(a===oa){const a=s.parse(n,_e);return[e(pe,{name:"PDS Locations",value:""}),a.map((a=>e(ve,null,e(pe,{name:"URL",value:a.url}),e(pe,{name:"Language",value:a.language}))))]}return e(pe,{name:"Info",value:te.ToHex(n),monospace:true})}return e(De,{extension:n},Boolean(n.value.length)&&[e(pe,{name:"Statements",value:""}),n.value.map((a=>e(ve,null,e(pe,{name:"Statement ID",value:fe(a.statementId)}),t(a.statementId,a.statementInfo))))])};
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */const ia=a=>{const{extension:n}=a;return e(De,{extension:n},e(pe,{name:"Comment",value:n.value.value}))};
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */const fa=a=>{const{extension:n}=a;return e(De,{extension:n},e(pe,{name:"Type",value:n.value.toJSON().join(", ")}))};
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */const ua=a=>{const{extension:n}=a;return e(De,{extension:n},e(pe,{name:"Role",value:n.value.text}))};
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */const la=a=>{const{extension:n,getLEILink:t}=a;return e(De,{extension:n},e(pe,{name:"Identifier",value:n.value.text,href:t(n.value.text)}))};
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */const da=a=>{const{extension:t}=a;return e(De,{extension:t},e(pe,{name:"Version",value:t.value.version}),e(Pe,Object.assign({generalName:t.value.location},a)),e(pe,{name:"Requires Auth",value:t.value.requiresAuth?n.getString("yes"):n.getString("no")}))};
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */const ba=a=>{const{extension:n}=a;return e(De,{extension:n},e(pe,{name:"Version",value:n.value.version}))};
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */const ma=a=>{const{extension:n}=a;return e(De,{extension:n},e(pe,{name:"Reason",value:n.value.toJSON()}))};
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */function va(e){return te.ToString(e.values[0])}
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */const xa=a=>{const{extension:n}=a;return e(De,{extension:n},Boolean(n.value.length)&&[e(pe,{name:"Attributes",value:""}),n.value.map((a=>e(ve,null,e(pe,{name:"Type",value:fe(a.type)}),e(pe,{name:"Value",value:va(a)}))))])};
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */const pa=a=>{const{extension:n}=a;return e(De,{extension:n},e(pe,{name:"Value",value:n.value,monospace:true}))};
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */const ga=a=>{const{extension:n}=a;return e(De,{extension:n},e(pe,{name:"Not Before",value:t(n.value.notBefore)}),e(pe,{name:"Not After",value:t(n.value.notAfter)}))};
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */const ya=a=>{const{extension:n}=a;return e(De,{extension:n},e(pe,{name:"Version",value:n.value.entrustVers}),e(pe,{name:"Info Flags",value:n.value.entrustInfoFlags.toJSON().join(", ")}))};
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */const ha=a=>{const{extension:n}=a;return e(De,{extension:n},Boolean(n.value.length)&&[e(pe,{name:"Biometrics",value:""}),n.value.map((a=>e(ve,null,e(pe,{name:"OID",value:fe(a.typeOfBiometricData.biometricDataOid)}),e(pe,{name:"Type",value:a.typeOfBiometricData.predefinedBiometricType}),e(pe,{name:"Algorithm",value:fe(a.hashAlgorithm.algorithm)}),e(pe,{name:"Hash",value:te.ToHex(a.biometricDataHash.buffer),monospace:true}),e(pe,{name:"Source Uri",value:a.sourceDataUri}))))])};
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */const Ca=a=>{const{extension:n}=a;const t=a=>{if(!a){return null}return a.map((a=>{const{imageDetails:n}=a;return[e(pe,{name:"Image Type",value:n.mediaType}),e(pe,{name:"Image Hash",value:te.ToHex(n.logotypeHash[0].hashValue),monospace:true}),e(pe,{name:"Image URL",value:n.logotypeURI[0],monospace:true,collapse:true}),e(pe,{name:"Image Hash Algorithm",value:fe(n.logotypeHash[0].hashAlg.algorithm)})]}))};const c=a=>{if(!a){return null}return a.map((a=>{const{audioDetails:n}=a;return[e(pe,{name:"Audio Type",value:n.mediaType}),e(pe,{name:"Audio Hash",value:te.ToHex(n.logotypeHash[0].hashValue),monospace:true}),e(pe,{name:"Audio URL",value:n.logotypeURI[0],monospace:true,collapse:true}),e(pe,{name:"Audio Hash Algorithm",value:fe(n.logotypeHash[0].hashAlg.algorithm)})]}))};const o=(a,n)=>{if(!n||!n.direct){return null}const{image:o,audio:s}=n.direct;return[e(pe,{name:"Type",value:a}),t(o),c(s),e("tr",null,e("td",null),e("td",null))]};return e(De,{extension:n},o("Subject",n.value.subjectLogo),o("Issuer",n.value.issuerLogo))};
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */const Sa=a=>{const{extension:n}=a;return e(De,{extension:n},n.value.map(((a,n)=>[e(pe,{name:`Entry #${n+1}`,value:""}),e(pe,{name:"SPC",value:a.spc}),e(pe,{name:"Range",value:a.range?`start=${a.range.start} count==${a.range.count}`:null}),e(pe,{name:"One",value:a.one})])))};
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */const Na=a=>{const{extension:n}=a;return e(De,{extension:n},n.value.requireExplicitPolicy&&e(pe,{name:"Require Explicit Policy",value:g.toASN(n.value.requireExplicitPolicy).valueBlock.toString()}),n.value.inhibitPolicyMapping&&e(pe,{name:"Inhibit Policy Mapping",value:g.toASN(n.value.inhibitPolicyMapping).valueBlock.toString()}))};
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */const Aa=a=>{const{extension:n}=a;return e(De,{extension:n},n.value.map(((a,n)=>[e(pe,{name:`Policy #${n+1}`,value:""}),e(pe,{name:"Issuer Domain",value:fe(a.issuerDomainPolicy)}),e(pe,{name:"Subject Domain",value:fe(a.subjectDomainPolicy)})])))};
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */const Ia=a=>{const{extension:t}=a;return e(De,{extension:t},e(pe,{name:n.getString("value"),value:t.value.value}))};
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */const Da=a=>{var t;const{extension:c}=a;return e(De,{extension:c},(t=c.value.distributionPoint)===null||t===void 0?void 0:t.fullName.map((n=>e(Pe,Object.assign({generalName:n},a)))),c.value.onlySomeReasons&&e(pe,{name:n.getString("onlyReasons"),value:c.value.onlySomeReasons.toJSON().join(", ")}),c.value.indirectCRL&&e(pe,{name:n.getString("indirectCRL"),value:n.getString("yes")}),c.value.onlyContainsUserCerts&&e(pe,{name:n.getString("onlyUserCertificates"),value:n.getString("yes")}),c.value.onlyContainsAttributeCerts&&e(pe,{name:n.getString("onlyAttributeCertificates"),value:n.getString("yes")}),c.value.onlyContainsCACerts&&e(pe,{name:n.getString("onlyCACertificates"),value:n.getString("yes")}))};
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */const ja=a=>{const{extension:t}=a;const c=a=>Object.keys(a).map((t=>{const o=a[t];let r="";switch(true){case typeof o==="string"||typeof o==="number":r=o;break;case o instanceof C:r=o.join(", ");break;case typeof o==="boolean":r=o?n.getString("yes"):n.getString("no");break;case Object.is(o,null):r="NULL";break;case o instanceof h:return[e(pe,{name:ue(t),value:""}),e(ve,null,c(o))];case ce.isBufferSource(o):if(t==="attestationApplicationId"){try{const a=s.parse(o,y);if(a.packageInfos.length||a.signatureDigests.length){return[e(pe,{name:ue(t),value:""}),Boolean(a.packageInfos)&&e(ve,null,e(pe,{name:ue("packageInfos"),value:""}),a.packageInfos.map((a=>e(ve,null,c(a)))))]}}catch(e){}}try{r=te.ToString(o)}catch(e){r=te.ToHex(o)}break}return e(pe,{name:ue(t),value:r})}));const o=(a,n)=>{if(n.length===0){return null}return[e(pe,{name:a,value:""}),e(ve,null,n.map(c))]};return e(De,{extension:t},e(pe,{name:ue("attestationVersion"),value:t.value.attestationVersion}),e(pe,{name:ue("attestationSecurityLevel"),value:t.value.attestationSecurityLevel}),e(pe,{name:ue("keymasterVersion"),value:t.value.keymasterVersion}),e(pe,{name:ue("keymasterSecurityLevel"),value:t.value.keymasterSecurityLevel}),e(pe,{name:ue("attestationChallenge"),value:te.ToString(t.value.attestationChallenge)}),e(pe,{name:ue("uniqueId"),value:te.ToString(t.value.uniqueId)||undefined}),o(ue("softwareEnforced"),t.value.softwareEnforced),o(ue("teeEnforced"),t.value.teeEnforced))};
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */const Oa=a=>{const{extension:n}=a;return e(De,{extension:n},Object.keys(n.value).map((a=>e(pe,{name:ue(a),value:n.value[a]}))))};
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */const Ta=a=>{const{extensions:n,title:t}=a;if(!n||!n.length){return null}return[e(xe,{value:t||"Extensions"}),n.map((n=>{try{if(n.value instanceof S){return e(je,{extension:n})}if(n.value instanceof N){return e(Oe,{extension:n})}if(n.value instanceof A){return e(Te,{extension:n})}if(n.value instanceof I){return e(Ge,Object.assign({extension:n},a))}if(n.value instanceof D){return e(ke,Object.assign({extension:n},a))}if(n.value instanceof j){return e(Re,Object.assign({extension:n},a))}if(n.value instanceof O||n.value instanceof T){return e(Ve,Object.assign({extension:n},a))}if(n.value instanceof G){return e(Be,Object.assign({extension:n},a))}if(n.value instanceof k){return e($e,{extension:n})}if(n.value instanceof L){return e(Ue,{extension:n})}if(n.value instanceof P){return e(Ke,Object.assign({extension:n},a))}if(n.value instanceof R){return e(He,{extension:n})}if(n.value instanceof V){return e(Me,{extension:n})}if(n.value instanceof B){return e(qe,{extension:n})}if(n.value instanceof $){return e(ra,{extension:n})}if(n.value instanceof E){return e(ia,{extension:n})}if(n.value instanceof U){return e(fa,{extension:n})}if(n.value instanceof K){return e(ua,{extension:n})}if(n.value instanceof H){return e(la,Object.assign({extension:n},a))}if(n.value instanceof M){return e(da,Object.assign({extension:n},a))}if(n.value instanceof q){return e(ba,{extension:n})}if(n.value instanceof w){return e(ma,{extension:n})}if(n.value instanceof X){return e(xa,{extension:n})}if(n.value instanceof Y){return e(ga,{extension:n})}if(n.value instanceof Q){return e(ya,{extension:n})}if(n.value instanceof z){return e(ha,{extension:n})}if(n.value instanceof F){return e(Ca,{extension:n})}if(n.value instanceof W){return e(Sa,{extension:n})}if(n.value instanceof J){return e(Na,{extension:n})}if(n.value instanceof Z){return e(Aa,{extension:n})}if(n.value instanceof _){return e(Ia,{extension:n})}if(n.value instanceof ee){return e(Da,Object.assign({extension:n},a))}if(n.value instanceof ae){return e(ja,Object.assign({extension:n},a))}if(n.value instanceof ne){return e(Oa,Object.assign({extension:n},a))}if(typeof n.value==="string"){return e(pa,{extension:n})}return e(De,{extension:n})}catch(e){console.error("Error render extension:",n.asn.extnID);return null}}))]};
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */const Ga=a=>{const{certificate:t}=a;return[e(xe,{value:n.getString("miscellaneous")}),e("tr",null,e("td",null,e(re,{onClick:()=>t.downloadAsPEM(),startIcon:e(ie,null)},n.getString("download.pem")))),e("tr",null,e("td",null,e(re,{onClick:()=>t.downloadAsDER(),startIcon:e(ie,null)},n.getString("download.der"))))]};export{ge as B,Ta as E,Pe as G,Ne as I,Ga as M,Ce as P,pe as R,Ae as S,ve as T,xe as a,Ie as b,ue as c,le as d,de as e,be as f,fe as g,Se as h};
//# sourceMappingURL=p-7b04a526.js.map