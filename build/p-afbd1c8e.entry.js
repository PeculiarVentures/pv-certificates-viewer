/*!
 * © Peculiar Ventures https://peculiarventures.com/ - MIT License
 */
import{r as t,h as s,H as e,g as r}from"./p-3cb79cd9.js";import{T as i,B as a}from"./p-4bc5ddbe.js";import{A as o}from"./p-a9487007.js";const c='.sc-peculiar-button-menu-h{display:-ms-inline-flexbox;display:inline-flex;position:relative}.is_shown.sc-peculiar-button-menu-h .button_popover.sc-peculiar-button-menu:before{position:fixed;width:100%;height:100%;top:0;left:0;content:""}.is_shown.sc-peculiar-button-menu-h .popover.sc-peculiar-button-menu{display:block}.popover.sc-peculiar-button-menu{min-width:200px;position:absolute;top:100%;right:0;border-radius:4px;z-index:1;-webkit-box-shadow:var(--pv-shadow-light-medium);box-shadow:var(--pv-shadow-light-medium);background:var(--pv-color-white);padding:var(--pv-size-base-2) 0;margin:var(--pv-size-base) 0;display:none}.button_option.sc-peculiar-button-menu{width:100%;-ms-flex-pack:start;justify-content:flex-start;border-radius:0}.group.sc-peculiar-button-menu:not(:last-child){border-bottom:1px solid var(--pv-color-gray-5);padding-bottom:var(--pv-size-base-2);margin-bottom:var(--pv-size-base)}.group_title.sc-peculiar-button-menu{line-height:var(--pv-size-base-6);padding:0 var(--pv-size-base-2)}';const n=c;const d=class{constructor(s){t(this,s);this.handleClick=()=>{this.open=!this.open};this.groups=[];this.open=false}render(){return s(e,{key:"484c56eb147ee97b4be9d9c0c324a6192be5d1b4",class:{is_shown:this.open}},s(a,{key:"00b7864c569169633c30a69f26185891ba9c39d1",class:"button_popover",onClick:this.handleClick,startIcon:s(o,null)}),s("div",{key:"afe0500732f053c8b22c65ec11bd2010546fc5e6",role:"dialog",tabIndex:-1,class:"popover","aria-hidden":String(this.open)},this.groups.map((t=>s("div",{class:"group"},s(i,{variant:"c2",color:"gray-9",class:"group_title"},t.title),t.options.map((t=>s(a,{class:"button_option",startIcon:t.startIcon,href:t.href,onClick:s=>{s.stopPropagation();this.handleClick();if(t.onClick){t.onClick(s)}}},t.text))))))))}};d.style=n;const l=":host{display:block;width:100%}@-webkit-keyframes circular-rotate{to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}@keyframes circular-rotate{to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}@-webkit-keyframes circular-dash{0%{stroke-dasharray:1, 200;stroke-dashoffset:0}50%{stroke-dasharray:100, 200;stroke-dashoffset:-15}to{stroke-dasharray:100, 200;stroke-dashoffset:-120}}@keyframes circular-dash{0%{stroke-dasharray:1, 200;stroke-dashoffset:0}50%{stroke-dasharray:100, 200;stroke-dashoffset:-15}to{stroke-dasharray:100, 200;stroke-dashoffset:-120}}.circle_progress{margin:0 auto}.circle_progress_svg{-webkit-animation:circular-rotate 1.4s linear infinite;animation:circular-rotate 1.4s linear infinite}.circle_progress_circle{stroke-linecap:round;-webkit-animation:circular-dash 1.4s ease-in-out infinite;animation:circular-dash 1.4s ease-in-out infinite;stroke-dasharray:80, 200;stroke-dashoffset:0;stroke:var(--pv-color-secondary)}.circle_progress_backdrop{stroke:var(--pv-color-gray-3)}";const h=l;const p=class{constructor(s){t(this,s);this.box=50;this.size=24;this.width=4}render(){return s(e,{key:"c53e431e95eb8d2328e4a612d678db3dbf4d98f8"},s("div",{key:"816dcbef66c4b41a68949cc61abce6fb238d6026",class:"circle_progress",style:{width:`${this.size}px`,height:`${this.size}px`}},s("svg",{key:"6858994e0d7c8166f24930dc161efb9f6f24cf5d",class:"circle_progress_svg",viewBox:`0 0 ${this.box} ${this.box}`},s("circle",{key:"721859338d69dadca5854258688263a83dcad136",class:"circle_progress_backdrop",cx:this.box/2,cy:this.box/2,r:this.box/2-5,fill:"none",style:{strokeWidth:`${this.width}px`}}),s("circle",{key:"aca038b2a6534a5c4cce604514612a48b4e25c9f",class:"circle_progress_circle",cx:this.box/2,cy:this.box/2,r:this.box/2-5,fill:"none",style:{strokeWidth:`${this.width}px`}}))))}};p.style=h;const u=":host{display:inline}::slotted(mark){background-color:var(--pv-color-attention-tint-4)}";const b=u;const f=class{constructor(s){t(this,s);this.tag="mark";this.search=undefined}componentDidLoad(){this.handleHighlightSearch()}componentDidUpdate(){this.handleHighlightSearch()}handleHighlightSearch(){const t=this.resetHighlightSearch(this.host.innerHTML);let s=t;if(this.search){const e=new RegExp(`(${this.search})`,"gi");s=t.replace(e,`<${this.tag}>$1</${this.tag}>`)}this.host.innerHTML=s}resetHighlightSearch(t){const s=new RegExp(`</?${this.tag}>`,"g");return t.replace(s,"")}render(){return s(e,{key:"138017ba171c6a5a3e9bf365cba2cb67fdd29b06"},s("slot",{key:"a1bf1fee5c437fe7e98bd954c11a5f282a5da02c"}))}get host(){return r(this)}};f.style=b;export{d as peculiar_button_menu,p as peculiar_circular_progress,f as peculiar_highlight_words};
//# sourceMappingURL=p-afbd1c8e.entry.js.map