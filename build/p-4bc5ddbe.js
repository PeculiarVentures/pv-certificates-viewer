/*!
 * © Peculiar Ventures https://peculiarventures.com/ - MIT License
 */
import{h as n}from"./p-3cb79cd9.js";
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var t=undefined&&undefined.__rest||function(n,t){var o={};for(var c in n)if(Object.prototype.hasOwnProperty.call(n,c)&&t.indexOf(c)<0)o[c]=n[c];if(n!=null&&typeof Object.getOwnPropertySymbols==="function")for(var r=0,c=Object.getOwnPropertySymbols(n);r<c.length;r++){if(t.indexOf(c[r])<0&&Object.prototype.propertyIsEnumerable.call(n,c[r]))o[c[r]]=n[c[r]]}return o};const o={h1:"h1",h2:"h2",h3:"h3",h4:"h4",h5:"h5",s1:"h6",s2:"h6",b1:"p",b2:"p",b3:"p",btn1:"span",btn2:"span",c1:"p",c2:"p"};const c=(c,r)=>{const{component:e,variant:a="b2",color:s="black",class:p}=c,b=t(c,["component","variant","color","class"]);const l=e||o[a]||"p";return n(l,Object.assign({},b,{class:{typography:true,[`t-${a}`]:true,[`c-${s}`]:true,[p]:Boolean(p)}}),r)};
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */const r=(t,o)=>{const{href:r,class:e,startIcon:a,onClick:s}=t;const p=!!r;const b=p?"a":"button";return n(b,{type:!p&&"button",href:p&&r,target:p&&"_blank",rel:p&&"noreferrer noopener",onClick:s,class:{button:true,m_no_padding:o.length===0,[e]:Boolean(e)}},a,o.length>0&&n(c,{variant:"b3",color:"black",component:"span"},o))};export{r as B,c as T};
//# sourceMappingURL=p-4bc5ddbe.js.map