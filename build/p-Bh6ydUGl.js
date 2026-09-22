/*!
 * © Peculiar Ventures https://peculiarventures.com/ - MIT License
 */
import{h as n}from"./p-UZLUj4zt.js";
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */const o={h1:"h1",h2:"h2",h3:"h3",h4:"h4",h5:"h5",s1:"h6",s2:"h6",b1:"p",b2:"p",b3:"p",btn1:"span",btn2:"span",c1:"p",c2:"p"},t=(t,r)=>{const{component:a,variant:c="b2",color:e="black",class:s}=t,p=function(n,o){var t={};for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&o.indexOf(r)<0&&(t[r]=n[r]);if(null!=n&&"function"==typeof Object.getOwnPropertySymbols){var a=0;for(r=Object.getOwnPropertySymbols(n);a<r.length;a++)o.indexOf(r[a])<0&&Object.prototype.propertyIsEnumerable.call(n,r[a])&&(t[r[a]]=n[r[a]])}return t}(t,["component","variant","color","class"]);return n(a||o[c]||"p",Object.assign({},p,{class:{typography:!0,[`t-${c}`]:!0,[`c-${e}`]:!0,[s]:Boolean(s)}}),n("span",null),r)},r=(o,r)=>{const{href:a,class:c,startIcon:e,onClick:s}=o,p=!!a;return n(p?"a":"button",{type:!p&&"button",href:p&&a,target:p&&"_blank",rel:p&&"noreferrer noopener",class:{button:!0,m_no_padding:0===r.length,[c]:Boolean(c)},onClick:s},e,r.length>0&&n(t,{variant:"b3",color:"black",component:"span"},r))};export{r as B,t as T}