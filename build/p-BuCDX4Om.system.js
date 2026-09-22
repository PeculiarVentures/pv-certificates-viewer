var __assign=this&&this.__assign||function(){__assign=Object.assign||function(n){for(var t,r=1,e=arguments.length;r<e;r++){t=arguments[r];for(var a in t)if(Object.prototype.hasOwnProperty.call(t,a))n[a]=t[a]}return n};return __assign.apply(this,arguments)};var __rest=this&&this.__rest||function(n,t){var r={};for(var e in n)if(Object.prototype.hasOwnProperty.call(n,e)&&t.indexOf(e)<0)r[e]=n[e];if(n!=null&&typeof Object.getOwnPropertySymbols==="function")for(var a=0,e=Object.getOwnPropertySymbols(n);a<e.length;a++){if(t.indexOf(e[a])<0&&Object.prototype.propertyIsEnumerable.call(n,e[a]))r[e[a]]=n[e[a]]}return r};
/*!
 * © Peculiar Ventures https://peculiarventures.com/ - MIT License
 */System.register(["./p-B4fjN6sg.system.js"],(function(n){"use strict";var t;return{setters:[function(n){t=n.h}],execute:function(){
/**
             * @license
             * Copyright (c) Peculiar Ventures, LLC.
             *
             * This source code is licensed under the MIT license found in the
             * LICENSE file in the root directory of this source tree.
             */
var r={h1:"h1",h2:"h2",h3:"h3",h4:"h4",h5:"h5",s1:"h6",s2:"h6",b1:"p",b2:"p",b3:"p",btn1:"span",btn2:"span",c1:"p",c2:"p"};var e=n("T",(function(n,e){var a,s;var i=n.component,o=n.variant,u=o===void 0?"b2":o,c=n.color,f=c===void 0?"black":c,v=n.class,_=__rest(n,["component","variant","color","class"]);var b=i||r[u]||"p";return t(b,__assign(__assign({},_),{class:__assign((a={typography:true},a["t-".concat(u)]=true,a["c-".concat(f)]=true,a),v?(s={},s[v]=true,s):{})}),t("span",null),e)}));
/**
             * @license
             * Copyright (c) Peculiar Ventures, LLC.
             *
             * This source code is licensed under the MIT license found in the
             * LICENSE file in the root directory of this source tree.
             */var a=n("B",(function(n,r){var a;var s=n.href,i=n.class,o=n.startIcon,u=n.onClick;var c=!!s;var f=c?"a":"button";return t(f,{type:c?undefined:"button",href:c?s:undefined,target:c?"_blank":undefined,rel:c?"noreferrer noopener":undefined,class:__assign({button:true,
// eslint-disable-next-line react/destructuring-assignment
m_no_padding:r.length===0},i?(a={},a[i]=true,a):{}),onClick:u},o,r.length>0&&t(e,{variant:"b3",color:"black",component:"span"},r))}))}}}));