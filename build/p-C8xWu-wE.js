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
 */const o={h1:"h1",h2:"h2",h3:"h3",h4:"h4",h5:"h5",s1:"h6",s2:"h6",b1:"p",b2:"p",b3:"p",btn1:"span",btn2:"span",c1:"p",c2:"p"},t=(t,a)=>{const{component:r,variant:s="b2",color:p="black",class:c,...e}=t;return n(r||o[s]||"p",{...e,class:{typography:!0,[`t-${s}`]:!0,[`c-${p}`]:!0,...c?{[c]:!0}:{}}},n("span",null),a)},a=(o,a)=>{const{href:r,class:s,startIcon:p,onClick:c}=o,e=!!r;return n(e?"a":"button",{type:e?void 0:"button",href:e?r:void 0,target:e?"_blank":void 0,rel:e?"noreferrer noopener":void 0,class:{button:!0,m_no_padding:0===a.length,...s?{[s]:!0}:{}},onClick:c},p,a.length>0&&n(t,{variant:"b3",color:"black",component:"span"},a))};export{a as B,t as T}