/*!
 * © Peculiar Ventures https://peculiarventures.com/ - MIT License
 */
import{h as e}from"./p-Dpo1Lsuj.js";import{a6 as n,a4 as a,a5 as t,b as c,bp as s,bq as o,q as r,br as i,bs as f,bt as u,bu as l,bv as b,bw as d,bx as m,by as v,bz as x,bA as p,bB as g,bC as y,bD as h,bE as C,bF as S,aB as N,aL as D,aF as A,av as I,aM as j,aI as O,aN as G,af as T,ax as L,aJ as k,aA as P,at as V,as as B,ap as R,au as E,ar as $,aq as U,an as K,ao as q,am as H,al as w,aG as M,aw as Y,ak as X,aj as z,ai as F,ah as W,ag as Q,az as J,ay as Z,ae as _,aH as ee,ac as ne,ab as ae,aa as te}from"./p-Del2D5s9.js";import{L as ce}from"./p-BoVBJ09p.js";import{C as se}from"./p-Cp20xosi.js";import{T as oe,B as re}from"./p-GTlYmF1j.js";import{D as ie}from"./p-DzEcDVLW.js";
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */function fe(e){const a=n[e];if(a){return`${a} (${e})`}return e}
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */function ue(e){const n=e.replace(/([A-Z])/g," $1");return n.charAt(0).toUpperCase()+n.slice(1)}
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */const le=e=>`https://search.gleif.org/#/record/${e}`;const be=e=>`https://search.censys.io/search?resource=hosts&q=dns.names%3A${e}`;const de=e=>`https://search.censys.io/search?resource=hosts&q=ip%3A${e}`
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
 */const ve=(n,a)=>e("tr",null,e("td",{colSpan:2},e("table",null,a)));const xe=n=>{const{value:a}=n;if(!a){return null}return[e("tr",{class:"title"},e("td",{colSpan:2},e(oe,{variant:"s1",color:"black"},a))),e("tr",null,e("td",{colSpan:2,class:"divider"},e("span",null)))]};const pe=n=>{const{name:a,value:t,monospace:c,collapse:s,href:o,extraValue:r}=n;if(!a){return null}if(t===undefined||t===null){return null}let i;if(s){i=e("peculiar-text-hider",null,t)}else{i=t}const f=!!t.toString();return e("tr",null,e("td",{colSpan:f?1:2},e(oe,{variant:"b2",color:"gray-9"},a)),f&&e("td",{class:{monospace:c}},me(t.toString())||o?e(ce,{variant:"b2",href:o||t.toString()},t):e(oe,{variant:"b2",color:"black"},i,r)))};
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */const ge=n=>{const{serialNumber:c,version:s,validity:o,notBefore:r,notAfter:i,lastUpdate:f,nextUpdate:u,type:l}=n;return[e(xe,{value:a.getString("basicInformation")}),e(pe,{name:a.getString("type"),value:l}),e(pe,{name:a.getString("serialNumber"),value:c,monospace:true}),e(pe,{name:a.getString("version"),value:s}),e(pe,{name:a.getString("validity"),value:o}),e(pe,{name:a.getString("issued"),value:r?t(r):undefined}),e(pe,{name:a.getString("expired"),value:i?t(i):undefined}),e(pe,{name:a.getString("lastUpdate"),value:f?t(f):undefined}),e(pe,{name:a.getString("nextUpdate"),value:u?t(u):undefined})]};
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */function ye(e){if(e.params&&"modulus"in e.params){let n=e.params.modulus.byteLength;if(n%2){n-=1}return n*8}return null}function he(e){if(e.params&&"publicExponent"in e.params){return e.params.publicExponent.byteLength===3?65537:3}return null}const Ce=n=>{const{publicKey:t}=n;if(!t){return null}function s(n){return[e(pe,{name:a.getString("algorithm"),value:fe(n.algorithm)}),e(pe,{name:a.getString("namedCurve"),value:fe(n.params&&"namedCurve"in n.params?n.params.namedCurve:undefined)}),e(pe,{name:a.getString("exponent"),value:he(n)}),e(pe,{name:a.getString("modulus"),value:ye(n)}),e(pe,{name:a.getString("value"),value:c.Convert.ToHex(n.value),monospace:true,collapse:true})]}return[e(xe,{value:a.getString("publicKeyInfo")}),s(t),Array.isArray(t.params)&&t.params.length&&t.params.map((n=>e(ve,null,s(n))))]};
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */const Se=n=>{const{name:t}=n;return[e(xe,{value:a.getString("subjectName")}),t.map((n=>e(pe,{name:n.name||n.type,value:n.value})))]};
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */const Ne=n=>{const{name:t,issuerDnLink:c}=n;const s=a.getString("issuerName");return[e(xe,{value:c?e(ce,{href:c},s):s}),t.map((n=>e(pe,{name:n.name||n.type,value:n.value})))]};
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */const De=n=>{const{signature:t}=n;if(!t){return null}function s(n){return[e(pe,{name:a.getString("algorithm"),value:fe(n.algorithm)}),e(pe,{name:a.getString("value"),value:c.Convert.ToHex(n.value),monospace:true,collapse:true})]}return[e(xe,{value:a.getString("signature")}),s(t),t.params&&t.params.length&&t.params.map((n=>e(ve,null,s(n))))]};
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */const Ae=n=>{const{thumbprints:t}=n;if(!t){return null}const c=Object.keys(t);if(!c.length){return null}return[e(xe,{value:a.getString("fingerprints")}),c.map((n=>e(pe,{name:n,value:t[n],monospace:true})))]};
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */const Ie=(n,t)=>{const{extension:c}=n;return[e(pe,{name:"Name",value:fe(c.asn.extnID)}),e(pe,{name:"Critical",value:c.asn.critical?a.getString("yes"):a.getString("no")}),t,e("tr",null,e("td",{colSpan:2,class:"divider"},e("span",null)))]};
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */const je=n=>{const{extension:a}=n;return e(Ie,{extension:a},e(pe,{name:"Usage",value:a.value.toJSON().join(", ")}))};
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */const Oe=n=>{const{extension:t}=n;return e(Ie,{extension:t},e(pe,{name:"Certificate Authority",value:t.value.cA?a.getString("yes"):a.getString("no")}),e(pe,{name:"Path Length Constraint",value:t.value.pathLenConstraint}))};
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */const Ge=n=>{const{extension:a}=n;return e(Ie,{extension:a},Boolean(a.value.length)&&[e(pe,{name:"Purposes",value:""}),a.value.map((n=>e(ve,null,e(pe,{name:"Purpose",value:fe(n)}))))])};
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */const Te=n=>{const{extension:a,getSubjectKeyIdChildrenLink:t,getSubjectKeyIdSiblingsLink:s}=n;const o=c.Convert.ToHex(a.value.buffer);const r=t(o);const i=s(o);return e(Ie,{extension:a},e(pe,{name:"Key ID",value:o,monospace:true,extraValue:[r&&e("span",null," [",e(ce,{href:r},"children"),"]"),i&&e("span",null," [",e(ce,{href:i},"siblings"),"]")]}))};
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */const Le=n=>{const{extension:a,getAuthKeyIdParentLink:t,getAuthKeyIdSiblingsLink:s}=n;const o=c.Convert.ToHex(a.value.keyIdentifier.buffer);const r=t(o);const i=s(o);return e(Ie,{extension:a},e(pe,{name:"Key ID",value:o,monospace:true,extraValue:[r&&e("span",null," [",e(ce,{href:r},"parents"),"]"),i&&e("span",null," [",e(ce,{href:i},"siblings"),"]")]}))};
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */const ke={otherName:"Other Name",rfc822Name:"RFC 822 Name",dNSName:"DNS Name",x400Address:"X400 Address",directoryName:"Directory Name",ediPartyName:"Edi Party Name ",uniformResourceIdentifier:"URI",iPAddress:"IP Address",registeredID:"Registered ID"};const Pe=a=>{const{generalName:t,getDNSNameLink:l,getIPAddressLink:b}=a;if(!t){return null}return Object.keys(t).map((a=>{const d=t[a];if(d instanceof s){return[e(pe,{name:ke[a]||a,value:""}),e(ve,null,d.map((a=>a.map((a=>e(pe,{name:n[a.type]||a.type,value:a.value.toString()}))))))]}if(d instanceof o){try{const a=r.parse(d.value,i);return e(pe,{name:n[d.typeId]||d.typeId,value:a.toString()})}catch(e){}try{const a=r.parse(d.value,f);if(a.explicitText){return e(pe,{name:n[d.typeId]||d.typeId,value:a.explicitText.toString()})}}catch(e){}return e(pe,{name:n[d.typeId]||d.typeId,value:c.Convert.ToHex(d.value),monospace:true})}if(c.BufferSourceConverter.isBufferSource(d)){return e(pe,{name:ke[a]||a,value:c.Convert.ToString(d)})}if(d instanceof u){return e(pe,{name:ke[a]||a,value:d.partyName.toString()})}if(a==="dNSName"){return e(pe,{name:ke[a]||a,value:d,href:l(d)})}if(a==="iPAddress"){return e(pe,{name:ke[a]||a,value:d,href:b(d)})}return e(pe,{name:ke[a]||a,value:d})}))};
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */const Ve=n=>{const{extension:a}=n;return e(Ie,{extension:a},a.value.map((a=>{var t,c;return[(t=a.distributionPoint)===null||t===void 0?void 0:t.fullName.map((a=>e(Pe,Object.assign({generalName:a},n)))),(c=a.cRLIssuer)===null||c===void 0?void 0:c.map((a=>e(Pe,Object.assign({generalName:a},n))))]})))};
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */const Be=n=>{const{extension:a}=n;return e(Ie,{extension:a},Boolean(a.value.length)&&[e(pe,{name:"Descriptions",value:""}),a.value.map((a=>e(ve,null,e(pe,{name:"Method",value:fe(a.accessMethod)}),e(Pe,Object.assign({generalName:a.accessLocation},n)))))])};
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */const Re=n=>{const{extension:a}=n;return e(Ie,{extension:a},a.value.map((a=>e(Pe,Object.assign({generalName:a},n)))))};
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */const Ee=n=>{const{extension:a}=n;return e(Ie,{extension:a},Boolean(a.value.length)&&[e(pe,{name:"Policies",value:""}),a.value.map((n=>e(ve,null,e(pe,{name:"Policy ID",value:fe(n.policyIdentifier)}),n.policyQualifiers&&Boolean(n.policyQualifiers.length)&&[e(pe,{name:"Qualifiers",value:""}),n.policyQualifiers.map((n=>{const a=[e(pe,{name:"Qualifier ID",value:fe(n.policyQualifierId)})];if(n.policyQualifierId==="1.3.6.1.5.5.7.2.1"){const t=r.parse(n.qualifier,i);a.push(e(pe,{name:"Value",value:t.toString()}))}if(n.policyQualifierId==="1.3.6.1.5.5.7.2.2"){const t=r.parse(n.qualifier,f);if(t.explicitText){a.push(e(pe,{name:"Value",value:t.explicitText.toString()}))}}return e(ve,null,a)}))])))])};
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var $e={"9606c02c690033aa1d145f59c6e2648d0549f0df96aab8db915a70d8ecf390a5":"Akamai CT","39376f545f7b4607f59742d768cd5d2437bf3473b6534a4834bcf72e681c83c9":"Alpha CT",a577ac9ced7548dd8f025b67a241089df86e0f476ec203c2ecbedb185f282638:"CNNIC CT",cdb5179b7fc1c046feea31136a3f8f002e6182faf8896fecc8b2f5b5ab604900:"Certly.IO","1fbc36e002ede97f40199e86b3573b8a4217d80187746ad0da03a06054d20df4":"Cloudflare “Nimbus2017”",db74afeecb29ecb1feca3e716d2ce5b9aabb36f7847183c75d9d4f37b61fbf64:"Cloudflare “Nimbus2018”","747eda8331ad331091219cce254f4270c2bffd5e422008c6373579e6107bcc56":"Cloudflare “Nimbus2019”","5ea773f9df56c0e7b536487dd049e0327a919a0c84a112128418759681714558":"Cloudflare “Nimbus2020”","4494652eb0eeceafc44007d8a8fe28c0dae682bed8cb31b53fd33396b5b681a8":"Cloudflare “Nimbus2021”","41c8cab1df22464a10c6a13a0942875e4e318b1b03ebeb4bc768f090629606f6":"Cloudflare “Nimbus2022”","7a328c54d8b72db620ea38e0521ee98416703213854d3bd22bc13a57a352eb52":"Cloudflare “Nimbus2023”","6ff141b5647e4222f7ef052cefae7c21fd608e27d2af5a6e9f4b8a37d6633ee5":"DigiCert Nessie2018",fe446108b1d01ab78a62ccfeab6ab2b2babff3abdad80a4d8b30df2d0008830c:"DigiCert Nessie2019",c652a0ec48ceb3fcab170992c43a87413309e80065a26252401ba3362a17c565:"DigiCert Nessie2020",eec095ee8d72640f92e3c3b91bc712a3696a097b4b6a1a1438e647b2cbedc5f9:"DigiCert Nessie2021","51a3b0f5fd01799c566db837788f0ca47acc1b27cbf79e88429a0dfed48b05e5":"DigiCert Nessie2022",b3737707e18450f86386d605a9dc11094a792db1670c0b87dcf0030e7936a59a:"DigiCert Nessie2023","5614069a2fd7c2ecd3f5e1bd44b23ec74676b9bc99115cc0ef949855d689d0dd":"DigiCert Server","8775bfe7597cf88c43995fbdf36eff568d475636ff4ab560c1b4eaff5ea0830f":"DigiCert Server 2",c1164ae0a772d2d4392dc80ac10770d4f0c49bde991a4840c1fa075164f63360:"DigiCert Yeti2018",e2694bae26e8e94009e8861bb63b83d43ee7fe7488fba48f2893019dddf1dbfe:"DigiCert Yeti2019",f095a459f200d18240102d2f93888ead4bfe1d47e399e1d034a6b0a8aa8eb273:"DigiCert Yeti2020","5cdc4392fee6ab4544b15e9ad456e61037fbd5fa47dca17394b25ee6f6c70eca":"DigiCert Yeti2021","2245450759552456963fa12ff1f76d86e0232663adc04b7f5dc6835c6ee20f02":"DigiCert Yeti2022","35cf191bbfb16c57bf0fad4c6d42cbbbb627202651ea3fe12aefa803c33bd64c":"DigiCert Yeti2023","717ea7420975be84a2723553f1777c26dd51af4e102144094d9019b462fb6668":"GDCA 1","14308d90ccd030135005c01ca526d81e84e87624e39b6248e08f724aea3bb42a":"GDCA 2",c9cf890a21109c666cc17a3ed065c930d0e0135a9feba85af14210b8072421aa:"GDCA CT #1","924a30f909336ff435d6993a10ac75a2c641728e7fc2d659ae6188ffad40ce01":"GDCA CT #2",fad4c97cc49ee2f8ac85c5ea5cea09d0220dbbf4e49c6b50662ff868f86b8c28:"Google “Argon2017”",a4501269055a15545e6211ab37bc103f62ae5576a45e4b1714453e1b22106a25:"Google “Argon2018”","63f2dbcde83bcc2ccf0b728427576b33a48d61778fbd75a638b1c768544bd88d":"Google “Argon2019”",b21e05cc8ba2cd8a204e8766f92bb98a2520676bdafa70e7b249532def8b905e:"Google “Argon2020”",f65c942fd1773022145418083094568ee34d131933bfdf0c2f200bcc4ef164e3:"Google “Argon2021”","2979bef09e393921f056739f63a577e5be577d9c600af8f94d5d265c255dc784":"Google “Argon2022”",e83ed0da3ef5063532e75728bc896bc903d3cbd1116beceb69e1777d6d06bd6e:"Google “Argon2023”","68f698f81f6482be3a8ceeb9281d4cfc71515d6793d444d10a67acbb4f4ffbc4":"Google “Aviator”",c3bf03a7e1ca8841c607bae3ff4270fca5ec45b186ebbe4e2cf3fc778630f5f6:"Google “Crucible”","1d024b8eb1498b344dfd87ea3efc0996f7506f235d1d497061a4773c439c25fb":"Google “Daedalus”","293c519654c83965baaa50fc5807d4b76fbf587a2972dca4c30cf4e54547f478":"Google “Icarus”",a4b90990b418581487bb13a2cc67700a3c359804f91bdfb8e377cd0ec80ddc10:"Google “Pilot”",ee4bbdb775ce60bae142691fabe19e66a30f7e5fb072d88300c47b897aa8fdcb:"Google “Rocketeer”",bbd9dfbc1f8a71b593942397aa927b473857950aab52e81a909664368e1ed185:"Google “Skydiver”","52eb4b225ec896974850675f23e43bc1d021e3214ce52ecd5fa87c203cdfca03":"Google “Solera2018”","0b760e9a8b9a682f88985b15e947501a56446bba8830785c3842994386450c00":"Google “Solera2019”","1fc72ce5a1b799f400c359bff96ca3913548e8644220610952e9ba1774f7bac7":"Google “Solera2020”",a3c99845e80ab7ce00157b3742df0207dd272b2b602ecf98ee2c12db9c5ae7e7:"Google “Solera2021”","697aafca1a6b536fae21205046debad7e0eaea13d2432e6e9d8fb379f2b9aaf3":"Google “Solera2022”",a899d8780c9290aaf462f31880ccfbd52451e970d0fbf591ef75b0d99b645681:"Google “Submariner”",b0cc83e5a5f97d6baf7c09cc284904872ac7e88b132c6350b7c6fd26e16c6c77:"Google “Testtube”",b10cd559a6d67846811f7df9a51532739ac48d703bea0323da5d38755bc0ad4e:"Google “Xenon2018”","084114980071532c16190460bcfc47fdc2653afa292c72b37ff863ae29ccc9f0":"Google “Xenon2019”","07b75c1be57d68fff1b0c61d2315c7bae6577c5794b76aeebc613a1a69d3a21c":"Google “Xenon2020”","7d3ef2f88fff88556824c2c0ca9e5289792bc50e78097f2e6a9768997e22f0d7":"Google “Xenon2021”","46a555eb75fa912030b5a28969f4f37d112c4174befd49b885abf2fc70fe6d47":"Google “Xenon2022”","7461b4a09cfb3d41d75159575b2e7649a445a8d27709b0cc564a6482b7eb41a3":"Izenpe","8941449c70742e06b9fc9ce7b116ba0024aa36d59af44f0204404f00f7ea8566":"Izenpe “Argi”","296afa2d568bca0d2ea844956ae9721fc35fa355ecda99693aafd458a71aefdd":"Let“s Encrypt ”Clicky”","537b69a3564335a9c04904e39593b2c298eb8d7a6e83023635c627248cd6b440":"Nordu “flimsy”",aae70b7f3cb8d566c86c2f16979c9f445f69ab0eb4535589b2f77a030104f3cd:"Nordu “plausible”",e0127629e90496564e3d0147984498aa48f8adb16600eb7902a1ef9909906273:"PuChuangSiDa CT",cf55e28923497c340d5206d05353aeb25834b52f1f8dc9526809f212efdd7ca6:"SHECA CT 1","32dc59c2d4c41968d56e14bc61ac8f0e45db39faf3c155aa4252f5001fa0c623":"SHECA CT 2",db76fdadac65e7d09508886e2159bd8b90352f5fead3e3dc5e22eb350acc7b98:"Sectigo (Comodo) “Dodo” CT","6f5376ac31f03119d89900a45115ff77151c11d902c10029068db2089a37d913":"Sectigo (Comodo) “Mammoth” CT","5581d4c2169036014aea0b9b573c53f0c0e43878702508172fa3aa1d0713d30c":"Sectigo (Comodo) “Sabre” CT","34bb6ad6c3df9c03eea8a499ff7891486c9d5e5cac92d01f7bfd1bce19db48ef":"StartCom",ddeb1d2b7a0d4fa6208b81ad8168707e2e8e9d01d55c888d3d11c4cdb6ecbecc:"Symantec",a7ce4a4e6207e0addee5fdaa4b1f86768767b5d002a55d47310e7e670a95eab2:"Symantec Deneb","15970488d7b997a05beb52512adee8d2e8b4a3165264121a9fabfbd5f85ad93f":"Symantec “Sirius”",bc78e1dfc5f63c684649334da10fa15f0979692009c081b4f3f6917f3ed9b8a5:"Symantec “Vega”",b0b784bc81c0ddc47544e883f05985bb9077d134d8ab88b2b2e533980b8e508b:"Up In The Air “Behind the Sofa”",ac3b9aed7fa9674757159e6d7d575672f9d98100941e9bdeffeca1313b75782d:"Venafi","03019df3fd85a69a8ebd1facc6da9ba73e469774fe77f579fc5a08b8328c1d6b":"Venafi Gen2 CT","41b2dc2e89e63ce4af1ba7bb29bf68c6dee6f9f1cc047e30dffae3b3ba259263":"WoSign","63d0006026dde10bb0601f452446965ee2b6ea2cd4fbc95ac866a550af9075b7":"WoSign 2","9e4ff73dc3ce220b69217c899e468076abf8d78636d5ccfc85a31a75628ba88b":"WoSign CT #1"};
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */const Ue=n=>{const{extension:a}=n;return e(Ie,{extension:a},Boolean(a.value.items.length)&&[e(pe,{name:"Signed Certificate Timestamps",value:""}),a.value.toJSON().map((n=>e(ve,null,e(pe,{name:"Version",value:n.version+1}),e(pe,{name:"Log Operator",value:$e[n.logId]||n.logId}),e(pe,{name:"Log Key ID",value:n.logId,monospace:true}),e(pe,{name:"Timestamp",value:t(n.timestamp)}),e(pe,{name:"Signature Algorithm",value:`${n.hashAlgorithm} ${n.signatureAlgorithm}`.toUpperCase()}),e(pe,{name:"Signature",value:n.signature,monospace:true}),e(pe,{name:"Extensions",value:n.extensions||undefined,monospace:true}))))])};
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */const Ke=n=>{var a,t;const{extension:c}=n;return e(Ie,{extension:c},(a=c.value.excludedSubtrees)===null||a===void 0?void 0:a.map((a=>e(Pe,Object.assign({generalName:a.base},n)))),(t=c.value.permittedSubtrees)===null||t===void 0?void 0:t.map((a=>e(Pe,Object.assign({generalName:a.base},n)))))};
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */const qe=n=>{const{extension:a}=n;return e(Ie,{extension:a},e(pe,{name:"Template ID",value:a.value.templateID}),e(pe,{name:"Template Major Version",value:a.value.templateMajorVersion}),e(pe,{name:"Template Minor Version",value:a.value.templateMinorVersion}))};
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */const He=n=>{const{extension:a}=n;return e(Ie,{extension:a},e(pe,{name:"Name",value:a.value.toString()}))};
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */const we=n=>{const{extension:a}=n;const t=a.value.getVersion();return e(Ie,{extension:a},e(pe,{name:"Certificate Index",value:t.certificateIndex}),e(pe,{name:"Key Index",value:t.keyIndex}))};var Me,Ye,Xe,ze;let Fe=class e{constructor(e){if(typeof e==="string"){this.alphabetic=e}else if(typeof e==="number"){this.numeric=e}}};l([b({type:d.PrintableString})],Fe.prototype,"alphabetic",void 0);l([b({type:d.PrintableString})],Fe.prototype,"numeric",void 0);Fe=l([m({type:v.Choice})],Fe);class We{constructor(e={}){this.currency=new Fe;this.amount=0;this.exponent=0;Object.assign(this,e)}}l([b({type:Fe})],We.prototype,"currency",void 0);l([b({type:d.Integer})],We.prototype,"amount",void 0);l([b({type:d.Integer})],We.prototype,"exponent",void 0);let Qe=class e extends We{};Qe=l([m({type:v.Sequence})],Qe);let Je=class e{constructor(e=0){this.value=e}};l([b({type:d.Integer})],Je.prototype,"value",void 0);Je=l([m({type:v.Choice})],Je);let Ze=class e{constructor(e={}){this.url="";this.language="";Object.assign(this,e)}};l([b({type:d.IA5String})],Ze.prototype,"url",void 0);l([b({type:d.PrintableString})],Ze.prototype,"language",void 0);Ze=l([m({type:v.Sequence})],Ze);let _e=Me=class e extends x{constructor(e){super(e);Object.setPrototypeOf(this,Me.prototype)}};_e=Me=l([m({type:v.Sequence,itemType:Ze})],_e);let en=Ye=class e extends _e{constructor(e){super(e);Object.setPrototypeOf(this,Ye.prototype)}};en=Ye=l([m({type:v.Sequence,itemType:Ze})],en);let nn=Xe=class e extends x{constructor(e){super(e);Object.setPrototypeOf(this,Xe.prototype)}};nn=Xe=l([m({type:v.Sequence,itemType:d.ObjectIdentifier})],nn);let an=ze=class e extends x{constructor(e){super(e);Object.setPrototypeOf(this,ze.prototype)}};an=ze=l([m({type:v.Sequence,itemType:d.PrintableString})],an);const tn="0.4.0.1862.1";const cn=`${tn}.3`;const sn=`${tn}.5`;const on=`${tn}.6`
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */;const rn=n=>{const{extension:a}=n;function t(n,a){if(!a||!a.byteLength){return null}if(n===p){const n=r.parse(a,g);return e(pe,{name:"Semantics Identifier",value:fe(n.semanticsIdentifier)})}if(n===on){const n=r.parse(a,nn);return e(pe,{name:"QC Types",value:n.map((e=>fe(e))).join(", ")})}if(n===cn){const n=r.parse(a,Je);return e(pe,{name:"Retention Period",value:`${n.value} years`})}if(n===sn){const n=r.parse(a,_e);return[e(pe,{name:"PDS Locations",value:""}),n.map((n=>e(ve,null,e(pe,{name:"URL",value:n.url}),e(pe,{name:"Language",value:n.language}))))]}return e(pe,{name:"Info",value:c.Convert.ToHex(a),monospace:true})}return e(Ie,{extension:a},Boolean(a.value.length)&&[e(pe,{name:"Statements",value:""}),a.value.map((n=>e(ve,null,e(pe,{name:"Statement ID",value:fe(n.statementId)}),t(n.statementId,n.statementInfo))))])};
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */const fn=n=>{const{extension:a}=n;return e(Ie,{extension:a},e(pe,{name:"Comment",value:a.value.value}))};
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */const un=n=>{const{extension:a}=n;return e(Ie,{extension:a},e(pe,{name:"Type",value:a.value.toJSON().join(", ")}))};
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */const ln=n=>{const{extension:a}=n;return e(Ie,{extension:a},e(pe,{name:"Role",value:a.value.text}))};
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */const bn=n=>{const{extension:a,getLEILink:t}=n;return e(Ie,{extension:a},e(pe,{name:"Identifier",value:a.value.text,href:t(a.value.text)}))};
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */const dn=n=>{const{extension:t}=n;return e(Ie,{extension:t},e(pe,{name:"Version",value:t.value.version}),e(Pe,Object.assign({generalName:t.value.location},n)),e(pe,{name:"Requires Auth",value:t.value.requiresAuth?a.getString("yes"):a.getString("no")}))};
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */const mn=n=>{const{extension:a}=n;return e(Ie,{extension:a},e(pe,{name:"Version",value:a.value.version}))};
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */const vn=n=>{const{extension:a}=n;return e(Ie,{extension:a},e(pe,{name:"Reason",value:a.value.toJSON()}))};
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */function xn(e){return c.Convert.ToString(e.values[0])}
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */const pn=n=>{const{extension:a}=n;return e(Ie,{extension:a},Boolean(a.value.length)&&[e(pe,{name:"Attributes",value:""}),a.value.map((n=>e(ve,null,e(pe,{name:"Type",value:fe(n.type)}),e(pe,{name:"Value",value:xn(n)}))))])};
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */const gn=n=>{const{extension:a}=n;return e(Ie,{extension:a},e(pe,{name:"Value",value:a.value,monospace:true}))};
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */const yn=n=>{const{extension:a}=n;return e(Ie,{extension:a},e(pe,{name:"Not Before",value:t(a.value.notBefore)}),e(pe,{name:"Not After",value:t(a.value.notAfter)}))};
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */const hn=n=>{const{extension:a}=n;return e(Ie,{extension:a},e(pe,{name:"Version",value:a.value.entrustVers}),e(pe,{name:"Info Flags",value:a.value.entrustInfoFlags.toJSON().join(", ")}))};
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */const Cn=n=>{const{extension:a}=n;return e(Ie,{extension:a},Boolean(a.value.length)&&[e(pe,{name:"Biometrics",value:""}),a.value.map((n=>e(ve,null,e(pe,{name:"OID",value:fe(n.typeOfBiometricData.biometricDataOid)}),e(pe,{name:"Type",value:n.typeOfBiometricData.predefinedBiometricType}),e(pe,{name:"Algorithm",value:fe(n.hashAlgorithm.algorithm)}),e(pe,{name:"Hash",value:c.Convert.ToHex(n.biometricDataHash.buffer),monospace:true}),e(pe,{name:"Source Uri",value:n.sourceDataUri}))))])};
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */const Sn=n=>{const{extension:a}=n;const t=n=>{if(!n){return null}return n.map((n=>{const{imageDetails:a}=n;return[e(pe,{name:"Image Type",value:a.mediaType}),e(pe,{name:"Image Hash",value:c.Convert.ToHex(a.logotypeHash[0].hashValue),monospace:true}),e(pe,{name:"Image URL",value:a.logotypeURI[0],monospace:true,collapse:true}),e(pe,{name:"Image Hash Algorithm",value:fe(a.logotypeHash[0].hashAlg.algorithm)})]}))};const s=n=>{if(!n){return null}return n.map((n=>{const{audioDetails:a}=n;return[e(pe,{name:"Audio Type",value:a.mediaType}),e(pe,{name:"Audio Hash",value:c.Convert.ToHex(a.logotypeHash[0].hashValue),monospace:true}),e(pe,{name:"Audio URL",value:a.logotypeURI[0],monospace:true,collapse:true}),e(pe,{name:"Audio Hash Algorithm",value:fe(a.logotypeHash[0].hashAlg.algorithm)})]}))};const o=(n,a)=>{if(!a||!a.direct){return null}const{image:c,audio:o}=a.direct;return[e(pe,{name:"Type",value:n}),t(c),s(o),e("tr",null,e("td",null),e("td",null))]};return e(Ie,{extension:a},o("Subject",a.value.subjectLogo),o("Issuer",a.value.issuerLogo))};
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */const Nn=n=>{const{extension:a}=n;return e(Ie,{extension:a},a.value.length>0&&[e(pe,{name:"Entries",value:""}),a.value.map((n=>e(ve,null,e(pe,{name:"SPC",value:n.spc}),e(pe,{name:"Range",value:n.range?`start=${n.range.start} count==${n.range.count}`:null}),e(pe,{name:"One",value:n.one}))))])};
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */const Dn=n=>{const{extension:a}=n;return e(Ie,{extension:a},a.value.requireExplicitPolicy&&e(pe,{name:"Require Explicit Policy",value:y.toASN(a.value.requireExplicitPolicy).valueBlock.toString()}),a.value.inhibitPolicyMapping&&e(pe,{name:"Inhibit Policy Mapping",value:y.toASN(a.value.inhibitPolicyMapping).valueBlock.toString()}))};
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */const An=n=>{const{extension:a}=n;return e(Ie,{extension:a},a.value.length>0&&[e(pe,{name:"Policies",value:""}),a.value.map((n=>e(ve,null,e(pe,{name:"Issuer Domain",value:fe(n.issuerDomainPolicy)}),e(pe,{name:"Subject Domain",value:fe(n.subjectDomainPolicy)}))))])};
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */const In=n=>{const{extension:t}=n;return e(Ie,{extension:t},e(pe,{name:a.getString("value"),value:t.value.value}))};
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */const jn=n=>{var t;const{extension:c}=n;return e(Ie,{extension:c},(t=c.value.distributionPoint)===null||t===void 0?void 0:t.fullName.map((a=>e(Pe,Object.assign({generalName:a},n)))),c.value.onlySomeReasons&&e(pe,{name:a.getString("onlyReasons"),value:c.value.onlySomeReasons.toJSON().join(", ")}),c.value.indirectCRL&&e(pe,{name:a.getString("indirectCRL"),value:a.getString("yes")}),c.value.onlyContainsUserCerts&&e(pe,{name:a.getString("onlyUserCertificates"),value:a.getString("yes")}),c.value.onlyContainsAttributeCerts&&e(pe,{name:a.getString("onlyAttributeCertificates"),value:a.getString("yes")}),c.value.onlyContainsCACerts&&e(pe,{name:a.getString("onlyCACertificates"),value:a.getString("yes")}))};
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */const On=n=>{const{extension:t}=n;const s=n=>Object.keys(n).map((t=>{const o=n[t];let i="";switch(true){case typeof o==="string"||typeof o==="number":i=o;break;case o instanceof S:i=o.join(", ");break;case typeof o==="boolean":i=o?a.getString("yes"):a.getString("no");break;case Object.is(o,null):i="NULL";break;case o instanceof C:return[e(pe,{name:ue(t),value:""}),e(ve,null,s(o))];case c.BufferSourceConverter.isBufferSource(o):if(t==="attestationApplicationId"){try{const n=r.parse(o,h);if(n.packageInfos.length||n.signatureDigests.length){return[e(pe,{name:ue(t),value:""}),Boolean(n.packageInfos)&&e(ve,null,e(pe,{name:ue("packageInfos"),value:""}),n.packageInfos.map((n=>e(ve,null,s(n)))))]}}catch(e){}}try{i=c.Convert.ToString(o)}catch(e){i=c.Convert.ToHex(o)}break}return e(pe,{name:ue(t),value:i})}));const o=(n,a)=>{if(a.length===0){return null}return[e(pe,{name:n,value:""}),e(ve,null,a.map(s))]};return e(Ie,{extension:t},e(pe,{name:ue("attestationVersion"),value:t.value.attestationVersion}),e(pe,{name:ue("attestationSecurityLevel"),value:t.value.attestationSecurityLevel}),e(pe,{name:ue("keymasterVersion"),value:t.value.keymasterVersion}),e(pe,{name:ue("keymasterSecurityLevel"),value:t.value.keymasterSecurityLevel}),e(pe,{name:ue("attestationChallenge"),value:c.Convert.ToString(t.value.attestationChallenge)}),e(pe,{name:ue("uniqueId"),value:c.Convert.ToString(t.value.uniqueId)||undefined}),o(ue("softwareEnforced"),t.value.softwareEnforced),o(ue("teeEnforced"),t.value.teeEnforced))};
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */const Gn=n=>{const{extension:a}=n;return e(Ie,{extension:a},Object.keys(a.value).map((n=>e(pe,{name:ue(n),value:a.value[n]}))))};
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */const Tn=n=>{const{extension:a}=n;return e(Ie,{extension:a},e(pe,{name:"Date",value:t(a.value.date)}))};
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */const Ln=n=>{const{extensions:a,title:t}=n;if(!a||!a.length){return null}return[e(xe,{value:t||"Extensions"}),a.map((a=>{try{if(a.value instanceof N){return e(je,{extension:a})}if(a.value instanceof D){return e(Oe,{extension:a})}if(a.value instanceof A){return e(Ge,{extension:a})}if(a.value instanceof I){return e(Te,Object.assign({extension:a},n))}if(a.value instanceof j){return e(Le,Object.assign({extension:a},n))}if(a.value instanceof O){return e(Ve,Object.assign({extension:a},n))}if(a.value instanceof G||a.value instanceof T){return e(Be,Object.assign({extension:a},n))}if(a.value instanceof L){return e(Re,Object.assign({extension:a},n))}if(a.value instanceof k){return e(Ee,{extension:a})}if(a.value instanceof se){return e(Ue,{extension:a})}if(a.value instanceof P){return e(Ke,Object.assign({extension:a},n))}if(a.value instanceof V){return e(qe,{extension:a})}if(a.value instanceof B){return e(He,{extension:a})}if(a.value instanceof R){return e(we,{extension:a})}if(a.value instanceof E){return e(rn,{extension:a})}if(a.value instanceof $){return e(fn,{extension:a})}if(a.value instanceof U){return e(un,{extension:a})}if(a.value instanceof K){return e(ln,{extension:a})}if(a.value instanceof q){return e(bn,Object.assign({extension:a},n))}if(a.value instanceof H){return e(dn,Object.assign({extension:a},n))}if(a.value instanceof w){return e(mn,{extension:a})}if(a.value instanceof M){return e(vn,{extension:a})}if(a.value instanceof Y){return e(pn,{extension:a})}if(a.value instanceof X){return e(yn,{extension:a})}if(a.value instanceof z){return e(hn,{extension:a})}if(a.value instanceof F){return e(Cn,{extension:a})}if(a.value instanceof W){return e(Sn,{extension:a})}if(a.value instanceof Q){return e(Nn,{extension:a})}if(a.value instanceof J){return e(Dn,{extension:a})}if(a.value instanceof Z){return e(An,{extension:a})}if(a.value instanceof _){return e(In,{extension:a})}if(a.value instanceof ee){return e(jn,Object.assign({extension:a},n))}if(a.value instanceof ne){return e(On,Object.assign({extension:a},n))}if(a.value instanceof ae){return e(Gn,Object.assign({extension:a},n))}if(a.value instanceof te){return e(Tn,{extension:a})}if(typeof a.value==="string"){return e(gn,{extension:a})}return e(Ie,{extension:a})}catch(e){console.error("Error render extension:",a.asn.extnID);return null}}))]};
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */const kn=n=>{const{certificate:t}=n;return[e(xe,{value:a.getString("miscellaneous")}),e("tr",null,e("td",null,e(re,{startIcon:e(ie,null),onClick:()=>t.downloadAsPEM()},a.getString("download.pem")))),e("tr",null,e("td",null,e(re,{startIcon:e(ie,null),onClick:()=>t.downloadAsDER()},a.getString("download.der"))))]};export{ge as B,Ln as E,Pe as G,Ne as I,kn as M,Ce as P,pe as R,Se as S,Ae as T,De as a,be as b,le as c,fe as d,ue as e,ve as f,de as g,xe as h};
//# sourceMappingURL=p-Ba1oqaJ3.js.map