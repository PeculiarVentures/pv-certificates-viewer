/*!
 * © Peculiar Ventures https://peculiarventures.com/ - MIT License
 */
import{h as n}from"./p-0b356bb5.js";
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var t=undefined&&undefined.__rest||function(n,t){var o={};for(var r in n)if(Object.prototype.hasOwnProperty.call(n,r)&&t.indexOf(r)<0)o[r]=n[r];if(n!=null&&typeof Object.getOwnPropertySymbols==="function")for(var c=0,r=Object.getOwnPropertySymbols(n);c<r.length;c++){if(t.indexOf(r[c])<0&&Object.prototype.propertyIsEnumerable.call(n,r[c]))o[r[c]]=n[r[c]]}return o};const o={h1:"h1",h2:"h2",h3:"h3",h4:"h4",h5:"h5",s1:"h6",s2:"h6",b1:"p",b2:"p",b3:"p",btn1:"span",btn2:"span",c1:"p",c2:"p"};const r=(r,c)=>{const{component:e,variant:a="b2",color:s="black",class:b}=r,p=t(r,["component","variant","color","class"]);const l=e||o[a]||"p";return n(l,Object.assign({},p,{class:{typography:true,[`t-${a}`]:true,[`c-${s}`]:true,[b]:Boolean(b)}}),c)};
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */const c=(t,o)=>{const{href:c,class:e,startIcon:a,onClick:s}=t;const b=!!c;const p=b?"a":"button";return n(p,{type:!b&&"button",href:b&&c,target:b&&"_blank",rel:b&&"noreferrer noopener",onClick:s,class:{button:true,m_no_padding:o.length===0,[e]:Boolean(e)}},a,o.length>0&&n(r,{variant:"b3",color:"black",component:"span"},o))};export{c as B,r as T};
//# sourceMappingURL=p-7f9beaa8.js.map