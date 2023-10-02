/*!
 * © Peculiar Ventures https://peculiarventures.com/ - MIT License
 */
System.register(["./p-5aabeba7.system.js","./p-2fcad8cb.system.js"],(function(t){"use strict";var r,e,o,i,s,a;return{setters:[function(t){r=t.h;e=t.r;o=t.H;i=t.g},function(t){s=t.T;a=t.B}],execute:function(){
/**
       * @license
       * Copyright (c) Peculiar Ventures, LLC.
       *
       * This source code is licensed under the MIT license found in the
       * LICENSE file in the root directory of this source tree.
       */
var n=function(t){var e=t.color,o=e===void 0?"gray-10":e;return r("svg",{xmlns:"http://www.w3.org/2000/svg",width:"30",height:"31",fill:"none"},r("path",{fill:"var(--pv-color-".concat(o,")"),d:"M15 13.5a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm14 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z"}))};var c='.sc-peculiar-button-menu-h{display:-ms-inline-flexbox;display:inline-flex;position:relative}.is_shown.sc-peculiar-button-menu-h .button_popover.sc-peculiar-button-menu:before{position:fixed;width:100%;height:100%;top:0;left:0;content:""}.is_shown.sc-peculiar-button-menu-h .popover.sc-peculiar-button-menu{display:block}.popover.sc-peculiar-button-menu{min-width:200px;position:absolute;top:100%;right:0;border-radius:4px;z-index:1;-webkit-box-shadow:var(--pv-shadow-light-medium);box-shadow:var(--pv-shadow-light-medium);background:var(--pv-color-white);padding:var(--pv-size-base-2) 0;margin:var(--pv-size-base) 0;display:none}.button_option.sc-peculiar-button-menu{width:100%;-ms-flex-pack:start;justify-content:flex-start;border-radius:0}.group.sc-peculiar-button-menu:not(:last-child){border-bottom:1px solid var(--pv-color-gray-5);padding-bottom:var(--pv-size-base-2);margin-bottom:var(--pv-size-base)}.group_title.sc-peculiar-button-menu{line-height:var(--pv-size-base-6);padding:0 var(--pv-size-base-2)}';var l=t("peculiar_button_menu",function(){function t(t){var r=this;e(this,t);this.handleClick=function(){r.open=!r.open};this.groups=[];this.open=false}t.prototype.render=function(){var t=this;return r(o,{class:{is_shown:this.open}},r(a,{class:"button_popover",onClick:this.handleClick,startIcon:r(n,null)}),r("div",{role:"dialog",tabIndex:-1,class:"popover","aria-hidden":String(this.open)},this.groups.map((function(e){return r("div",{class:"group"},r(s,{variant:"c2",color:"gray-9",class:"group_title"},e.title),e.options.map((function(e){return r(a,{class:"button_option",startIcon:e.startIcon,href:e.href,onClick:function(r){r.stopPropagation();t.handleClick();if(e.onClick){e.onClick(r)}}},e.text)})))}))))};return t}());l.style=c;var h=":host{display:block;width:100%}@-webkit-keyframes circular-rotate{to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}@keyframes circular-rotate{to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}@-webkit-keyframes circular-dash{0%{stroke-dasharray:1, 200;stroke-dashoffset:0}50%{stroke-dasharray:100, 200;stroke-dashoffset:-15}to{stroke-dasharray:100, 200;stroke-dashoffset:-120}}@keyframes circular-dash{0%{stroke-dasharray:1, 200;stroke-dashoffset:0}50%{stroke-dasharray:100, 200;stroke-dashoffset:-15}to{stroke-dasharray:100, 200;stroke-dashoffset:-120}}.circle_progress{margin:0 auto}.circle_progress_svg{-webkit-animation:circular-rotate 1.4s linear infinite;animation:circular-rotate 1.4s linear infinite}.circle_progress_circle{stroke-linecap:round;-webkit-animation:circular-dash 1.4s ease-in-out infinite;animation:circular-dash 1.4s ease-in-out infinite;stroke-dasharray:80, 200;stroke-dashoffset:0;stroke:var(--pv-color-secondary)}.circle_progress_backdrop{stroke:var(--pv-color-gray-3)}";var p=t("peculiar_circular_progress",function(){function t(t){e(this,t);this.box=50;this.size=24;this.width=4}t.prototype.render=function(){return r(o,null,r("div",{class:"circle_progress",style:{width:"".concat(this.size,"px"),height:"".concat(this.size,"px")}},r("svg",{class:"circle_progress_svg",viewBox:"0 0 ".concat(this.box," ").concat(this.box)},r("circle",{class:"circle_progress_backdrop",cx:this.box/2,cy:this.box/2,r:this.box/2-5,fill:"none",style:{strokeWidth:"".concat(this.width,"px")}}),r("circle",{class:"circle_progress_circle",cx:this.box/2,cy:this.box/2,r:this.box/2-5,fill:"none",style:{strokeWidth:"".concat(this.width,"px")}}))))};return t}());p.style=h;var u=":host{display:inline}::slotted(mark){background-color:var(--pv-color-attention-tint-4)}";var d=t("peculiar_highlight_words",function(){function t(t){e(this,t);this.tag="mark";this.search=undefined}t.prototype.componentDidLoad=function(){this.handleHighlightSearch()};t.prototype.componentDidUpdate=function(){this.handleHighlightSearch()};t.prototype.handleHighlightSearch=function(){var t=this.resetHighlightSearch(this.host.innerHTML);var r=t;if(this.search){var e=new RegExp("(".concat(this.search,")"),"gi");r=t.replace(e,"<".concat(this.tag,">$1</").concat(this.tag,">"))}this.host.innerHTML=r};t.prototype.resetHighlightSearch=function(t){var r=new RegExp("</?".concat(this.tag,">"),"g");return t.replace(r,"")};t.prototype.render=function(){return r(o,null,r("slot",null))};Object.defineProperty(t.prototype,"host",{get:function(){return i(this)},enumerable:false,configurable:true});return t}());d.style=u}}}));
//# sourceMappingURL=p-bd485115.system.entry.js.map