/*!
 * © Peculiar Ventures https://peculiarventures.com/ - MIT License
 */
System.register(["./p-BFenL1ap.system.js","./p-BRhx1gbw.system.js","./p-BOSH9vjy.system.js"],(function(t){"use strict";var e,r,s,i,a,o,n;return{setters:[function(t){e=t.r;r=t.h;s=t.H;i=t.g},function(t){a=t.T;o=t.B},function(t){n=t.A}],execute:function(){var c='.sc-peculiar-button-menu-h{display:-ms-inline-flexbox;display:inline-flex;position:relative}.is_shown.sc-peculiar-button-menu-h .button_popover.sc-peculiar-button-menu:before{position:fixed;width:100%;height:100%;top:0;left:0;content:""}.is_shown.sc-peculiar-button-menu-h .popover.sc-peculiar-button-menu{display:block}.popover.sc-peculiar-button-menu{min-width:200px;position:absolute;top:100%;right:0;border-radius:4px;z-index:1;-webkit-box-shadow:var(--pv-shadow-light-medium);box-shadow:var(--pv-shadow-light-medium);background:var(--pv-color-white);padding:var(--pv-size-base-2) 0;margin:var(--pv-size-base) 0;display:none}.button_option.sc-peculiar-button-menu{width:100%;-ms-flex-pack:start;justify-content:flex-start;border-radius:0}.group.sc-peculiar-button-menu:not(:last-child){border-bottom:1px solid var(--pv-color-gray-5);padding-bottom:var(--pv-size-base-2);margin-bottom:var(--pv-size-base)}.group_title.sc-peculiar-button-menu{line-height:var(--pv-size-base-6);padding:0 var(--pv-size-base-2)}';var u=t("peculiar_button_menu",function(){function t(t){var r=this;e(this,t);this.groups=[];this.open=false;this.handleClick=function(){r.open=!r.open}}t.prototype.render=function(){var t=this;return r(s,{key:"484c56eb147ee97b4be9d9c0c324a6192be5d1b4",class:{is_shown:this.open}},r(o,{key:"00b7864c569169633c30a69f26185891ba9c39d1",class:"button_popover",onClick:this.handleClick,startIcon:r(n,null)}),r("div",{key:"afe0500732f053c8b22c65ec11bd2010546fc5e6",role:"dialog",tabIndex:-1,class:"popover","aria-hidden":String(this.open)},this.groups.map((function(e){return r("div",{class:"group"},r(a,{variant:"c2",color:"gray-9",class:"group_title"},e.title),e.options.map((function(e){return r(o,{class:"button_option",startIcon:e.startIcon,href:e.href,onClick:function(r){r.stopPropagation();t.handleClick();if(e.onClick){e.onClick(r)}}},e.text)})))}))))};return t}());u.style=c;var l=":host{display:block;width:100%}@-webkit-keyframes circular-rotate{to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}@keyframes circular-rotate{to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}@-webkit-keyframes circular-dash{0%{stroke-dasharray:1, 200;stroke-dashoffset:0}50%{stroke-dasharray:100, 200;stroke-dashoffset:-15}to{stroke-dasharray:100, 200;stroke-dashoffset:-120}}@keyframes circular-dash{0%{stroke-dasharray:1, 200;stroke-dashoffset:0}50%{stroke-dasharray:100, 200;stroke-dashoffset:-15}to{stroke-dasharray:100, 200;stroke-dashoffset:-120}}.circle_progress{margin:0 auto}.circle_progress_svg{-webkit-animation:circular-rotate 1.4s linear infinite;animation:circular-rotate 1.4s linear infinite}.circle_progress_circle{stroke-linecap:round;-webkit-animation:circular-dash 1.4s ease-in-out infinite;animation:circular-dash 1.4s ease-in-out infinite;stroke-dasharray:80, 200;stroke-dashoffset:0;stroke:var(--pv-color-secondary)}.circle_progress_backdrop{stroke:var(--pv-color-gray-3)}";var h=t("peculiar_circular_progress",function(){function t(t){e(this,t);this.size=24;this.width=4;this.box=50}t.prototype.render=function(){return r(s,{key:"c71275c96a3abcd67c09448bbcd2bcc541500805"},r("div",{key:"f2deb4e8dc2878d0975ca9a7da9c5481e7ed01a7",class:"circle_progress",style:{width:"".concat(this.size,"px"),height:"".concat(this.size,"px")}},r("svg",{key:"3968a506d8e670a5199497ee42ae3ec99fb65de7",class:"circle_progress_svg",viewBox:"0 0 ".concat(this.box," ").concat(this.box)},r("circle",{key:"55d8b2592fb6614c38841706bd7e55ec3912b88c",class:"circle_progress_backdrop",cx:this.box/2,cy:this.box/2,r:this.box/2-5,fill:"none",style:{strokeWidth:"".concat(this.width,"px")}}),r("circle",{key:"f61b2daa3fad404e325b787d3be59c8d7f04c118",class:"circle_progress_circle",cx:this.box/2,cy:this.box/2,r:this.box/2-5,fill:"none",style:{strokeWidth:"".concat(this.width,"px")}}))))};return t}());h.style=l;var d=":host{display:inline}::slotted(mark){background-color:var(--pv-color-attention-tint-4)}";var p=t("peculiar_highlight_words",function(){function t(t){e(this,t);this.tag="mark"}t.prototype.componentDidLoad=function(){this.handleHighlightSearch()};t.prototype.componentDidUpdate=function(){this.handleHighlightSearch()};t.prototype.handleHighlightSearch=function(){var t=this.resetHighlightSearch(this.host.innerHTML);var e=t;if(this.search){var r=new RegExp("(".concat(this.search,")"),"gi");e=t.replace(r,"<".concat(this.tag,">$1</").concat(this.tag,">"))}this.host.innerHTML=e};t.prototype.resetHighlightSearch=function(t){var e=new RegExp("</?".concat(this.tag,">"),"g");return t.replace(e,"")};t.prototype.render=function(){return r(s,{key:"353abad7e2fc43ea4af75ec025e08d2ff3159ee6"},r("slot",{key:"9ac44c0a2b95ea7a778e2d6a2909c797f8c17b6d"}))};Object.defineProperty(t.prototype,"host",{get:function(){return i(this)},enumerable:false,configurable:true});return t}());p.style=d}}}));
//# sourceMappingURL=p-1af57833.system.entry.js.map