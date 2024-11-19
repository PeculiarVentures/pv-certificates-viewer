var __extends=this&&this.__extends||function(){var r=function(e,n){r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(r,e){r.__proto__=e}||function(r,e){for(var n in e)if(Object.prototype.hasOwnProperty.call(e,n))r[n]=e[n]};return r(e,n)};return function(e,n){if(typeof n!=="function"&&n!==null)throw new TypeError("Class extends value "+String(n)+" is not a constructor or null");r(e,n);function t(){this.constructor=e}e.prototype=n===null?Object.create(n):(t.prototype=n.prototype,new t)}}();var __awaiter=this&&this.__awaiter||function(r,e,n,t){function i(r){return r instanceof n?r:new n((function(e){e(r)}))}return new(n||(n=Promise))((function(n,a){function f(r){try{l(t.next(r))}catch(r){a(r)}}function u(r){try{l(t["throw"](r))}catch(r){a(r)}}function l(r){r.done?n(r.value):i(r.value).then(f,u)}l((t=t.apply(r,e||[])).next())}))};var __generator=this&&this.__generator||function(r,e){var n={label:0,sent:function(){if(a[0]&1)throw a[1];return a[1]},trys:[],ops:[]},t,i,a,f;return f={next:u(0),throw:u(1),return:u(2)},typeof Symbol==="function"&&(f[Symbol.iterator]=function(){return this}),f;function u(r){return function(e){return l([r,e])}}function l(u){if(t)throw new TypeError("Generator is already executing.");while(f&&(f=0,u[0]&&(n=0)),n)try{if(t=1,i&&(a=u[0]&2?i["return"]:u[0]?i["throw"]||((a=i["return"])&&a.call(i),0):i.next)&&!(a=a.call(i,u[1])).done)return a;if(i=0,a)u=[u[0]&2,a.value];switch(u[0]){case 0:case 1:a=u;break;case 4:n.label++;return{value:u[1],done:false};case 5:n.label++;i=u[1];u=[0];continue;case 7:u=n.ops.pop();n.trys.pop();continue;default:if(!(a=n.trys,a=a.length>0&&a[a.length-1])&&(u[0]===6||u[0]===2)){n=0;continue}if(u[0]===3&&(!a||u[1]>a[0]&&u[1]<a[3])){n.label=u[1];break}if(u[0]===6&&n.label<a[1]){n.label=a[1];a=u;break}if(a&&n.label<a[2]){n.label=a[2];n.ops.push(u);break}if(a[2])n.ops.pop();n.trys.pop();continue}u=e.call(r,n)}catch(r){u=[6,r];i=0}finally{t=a=0}if(u[0]&5)throw u[1];return{value:u[0]?u[1]:void 0,done:true}}};var __spreadArray=this&&this.__spreadArray||function(r,e,n){if(n||arguments.length===2)for(var t=0,i=e.length,a;t<i;t++){if(a||!(t in e)){if(!a)a=Array.prototype.slice.call(e,0,t);a[t]=e[t]}}return r.concat(a||Array.prototype.slice.call(e))};
/*!
 * © Peculiar Ventures https://peculiarventures.com/ - MIT License
 */System.register([],(function(r,e){"use strict";return{execute:function(){var n=this;var t="peculiar";var i={allRenderFn:true,appendChildSlotFix:false,asyncLoading:true,asyncQueue:false,attachStyles:true,cloneNodeFix:false,cmpDidLoad:true,cmpDidRender:false,cmpDidUnload:false,cmpDidUpdate:true,cmpShouldUpdate:false,cmpWillLoad:true,cmpWillRender:false,cmpWillUpdate:false,connectedCallback:false,constructableCSS:true,cssAnnotations:true,devTools:false,disconnectedCallback:true,element:false,event:true,experimentalScopedSlotChanges:false,experimentalSlotFixes:false,formAssociated:false,hasRenderFn:true,hostListener:false,hostListenerTarget:false,hostListenerTargetBody:false,hostListenerTargetDocument:false,hostListenerTargetParent:false,hostListenerTargetWindow:false,hotModuleReplacement:false,hydrateClientSide:true,hydrateServerSide:false,hydratedAttribute:false,hydratedClass:true,initializeNextTick:false,invisiblePrehydration:true,isDebug:false,isDev:false,isTesting:false,lazyLoad:true,lifecycle:true,lifecycleDOMEvents:false,member:true,method:false,mode:false,observeAttribute:true,profile:false,prop:true,propBoolean:true,propMutable:false,propNumber:true,propString:true,reflect:true,scoped:true,scopedSlotTextContentFix:false,scriptDataOpts:false,shadowDelegatesFocus:false,shadowDom:true,slot:true,slotChildNodesFix:false,slotRelocation:true,state:true,style:true,svg:true,taskQueue:true,transformTagName:false,updatable:true,vdomAttribute:true,vdomClass:true,vdomFunctional:true,vdomKey:true,vdomListener:true,vdomPropOrAttr:true,vdomRef:true,vdomRender:true,vdomStyle:true,vdomText:true,vdomXlink:true,watchCallback:true};var a;var f;var u;var l=false;var o=false;var v=false;var s=false;var c=false;var d=function(r,e){if(e===void 0){e=""}{return function(){return}}};var h=function(r,e){{return function(){return}}};var p="r";var y="o";var $="s";var m="t";var b="s-id";var w="sty-id";var g="c-id";var _="{visibility:hidden}.hydrated{visibility:inherit}";var S="slot-fb{display:contents}slot-fb[hidden]{display:none}";var k="http://www.w3.org/1999/xlink";var x={};var C="http://www.w3.org/2000/svg";var A="http://www.w3.org/1999/xhtml";var j=function(r){return r!=null};var T=function(r){r=typeof r;return r==="object"||r==="function"};function O(r){var e,n,t;return(t=(n=(e=r.head)===null||e===void 0?void 0:e.querySelector('meta[name="csp-nonce"]'))===null||n===void 0?void 0:n.getAttribute("content"))!==null&&t!==void 0?t:undefined}var L=r("h",(function(r,e){var n=[];for(var t=2;t<arguments.length;t++){n[t-2]=arguments[t]}var i=null;var a=null;var f=null;var u=false;var l=false;var o=[];var v=function(e){for(var n=0;n<e.length;n++){i=e[n];if(Array.isArray(i)){v(i)}else if(i!=null&&typeof i!=="boolean"){if(u=typeof r!=="function"&&!T(i)){i=String(i)}if(u&&l){o[o.length-1].t+=i}else{o.push(u?D(null,i):i)}l=u}}};v(n);if(e){if(e.key){a=e.key}if(e.name){f=e.name}{var s=e.className||e.class;if(s){e.class=typeof s!=="object"?s:Object.keys(s).filter((function(r){return s[r]})).join(" ")}}}if(typeof r==="function"){return r(e===null?{}:e,o,F)}var c=D(r,null);c.i=e;if(o.length>0){c.u=o}{c.l=a}{c.o=f}return c}));var D=function(r,e){var n={v:0,h:r,t:e,p:null,u:null};{n.i=null}{n.l=null}{n.o=null}return n};var R=r("H",{});var M=function(r){return r&&r.h===R};var F={forEach:function(r,e){return r.map(E).forEach(e)},map:function(r,e){return r.map(E).map(e).map(N)}};var E=function(r){return{vattrs:r.i,vchildren:r.u,vkey:r.l,vname:r.o,vtag:r.h,vtext:r.t}};var N=function(r){if(typeof r.vtag==="function"){var e=Object.assign({},r.vattrs);if(r.vkey){e.key=r.vkey}if(r.vname){e.name=r.vname}return L.apply(void 0,__spreadArray([r.vtag,e],r.vchildren||[],false))}var n=D(r.vtag,r.vtext);n.i=r.vattrs;n.u=r.vchildren;n.l=r.vkey;n.o=r.vname;return n};var P=function(r,e,n,t){var i=d("hydrateClient",e);var a=r.shadowRoot;var f=[];var u=[];var l=a?[]:null;var o=t.$=D(e,null);if(!Jr.m){W(Xr.body,Jr.m=new Map)}r[b]=n;r.removeAttribute(b);U(o,f,u,l,r,r,n);f.map((function(r){var n=r._+"."+r.S;var t=Jr.m.get(n);var i=r.p;if(t&&Yr&&t["s-en"]===""){t.parentNode.insertBefore(i,t.nextSibling)}if(!a){i["s-hn"]=e;if(t){i["s-ol"]=t;i["s-ol"]["s-nr"]=i}}Jr.m.delete(n)}));if(a){l.map((function(r){if(r){a.appendChild(r)}}))}i()};var U=function(r,e,n,t,i,a,f){var u;var l;var o;var v;if(a.nodeType===1){u=a.getAttribute(g);if(u){l=u.split(".");if(l[0]===f||l[0]==="0"){o={v:0,_:l[0],S:l[1],k:l[2],C:l[3],h:a.tagName.toLowerCase(),p:a,i:null,u:null,l:null,o:null,t:null};e.push(o);a.removeAttribute(g);if(!r.u){r.u=[]}r.u[o.C]=o;r=o;if(t&&o.k==="0"){t[o.C]=o.p}}}for(v=a.childNodes.length-1;v>=0;v--){U(r,e,n,t,i,a.childNodes[v],f)}if(a.shadowRoot){for(v=a.shadowRoot.childNodes.length-1;v>=0;v--){U(r,e,n,t,i,a.shadowRoot.childNodes[v],f)}}}else if(a.nodeType===8){l=a.nodeValue.split(".");if(l[1]===f||l[1]==="0"){u=l[0];o={v:0,_:l[1],S:l[2],k:l[3],C:l[4],p:a,i:null,u:null,l:null,o:null,h:null,t:null};if(u===m){o.p=a.nextSibling;if(o.p&&o.p.nodeType===3){o.t=o.p.textContent;e.push(o);a.remove();if(!r.u){r.u=[]}r.u[o.C]=o;if(t&&o.k==="0"){t[o.C]=o.p}}}else if(o._===f){if(u===$){o.h="slot";if(l[5]){a["s-sn"]=o.o=l[5]}else{a["s-sn"]=""}a["s-sr"]=true;if(t){o.p=Xr.createElement(o.h);if(o.o){o.p.setAttribute("name",o.o)}a.parentNode.insertBefore(o.p,a);a.remove();if(o.k==="0"){t[o.C]=o.p}}n.push(o);if(!r.u){r.u=[]}r.u[o.C]=o}else if(u===p){if(t){a.remove()}else{i["s-cr"]=a;a["s-cn"]=true}}}}}else if(r&&r.h==="style"){var s=D(null,a.textContent);s.p=a;s.C="0";r.u=[s]}};var W=function(r,e){if(r.nodeType===1){var n=0;for(;n<r.childNodes.length;n++){W(r.childNodes[n],e)}if(r.shadowRoot){for(n=0;n<r.shadowRoot.childNodes.length;n++){W(r.shadowRoot.childNodes[n],e)}}}else if(r.nodeType===8){var t=r.nodeValue.split(".");if(t[0]===y){e.set(t[1]+"."+t[2],r);r.nodeValue="";r["s-en"]=t[3]}}};var I=function(r,e){if(r!=null&&!T(r)){if(e&4){return r==="false"?false:r===""||!!r}if(e&2){return parseFloat(r)}if(e&1){return String(r)}return r}return r};var z=r("g",(function(r){return Ir(r).$hostElement$}));var B=r("c",(function(r,e,n){var t=z(r);return{emit:function(r){return H(t,e,{bubbles:!!(n&4),composed:!!(n&2),cancelable:!!(n&1),detail:r})}}}));var H=function(r,e,n){var t=Jr.ce(e,n);r.dispatchEvent(t);return t};var Q=new WeakMap;var q=function(r,e,n){var t=Kr.get(r);if(re&&n){t=t||new CSSStyleSheet;if(typeof t==="string"){t=e}else{t.replaceSync(e)}}else{t=e}Kr.set(r,t)};var G=function(r,e,n){var t;var i=V(e);var a=Kr.get(i);r=r.nodeType===11?r:Xr;if(a){if(typeof a==="string"){r=r.head||r;var f=Q.get(r);var u=void 0;if(!f){Q.set(r,f=new Set)}if(!f.has(i)){if(r.host&&(u=r.querySelector("[".concat(w,'="').concat(i,'"]')))){u.innerHTML=a}else{u=Xr.createElement("style");u.innerHTML=a;var l=(t=Jr.A)!==null&&t!==void 0?t:O(Xr);if(l!=null){u.setAttribute("nonce",l)}r.insertBefore(u,r.querySelector("link"))}if(e.v&4){u.innerHTML+=S}if(f){f.add(i)}}}else if(!r.adoptedStyleSheets.includes(a)){r.adoptedStyleSheets=__spreadArray(__spreadArray([],r.adoptedStyleSheets,true),[a],false)}}return i};var K=function(r){var e=r.j;var n=r.$hostElement$;var t=e.v;var i=d("attachStyles",e.T);var a=G(n.shadowRoot?n.shadowRoot:n.getRootNode(),e);if(t&10){n["s-sc"]=a;n.classList.add(a+"-h");if(t&2){n.classList.add(a+"-s")}}i()};var V=function(r,e){return"sc-"+r.T};var X=function(r){return r.replace(/\/\*!@([^\/]+)\*\/[^\{]+\{/g,"$1{")};var J=function(r,e,n,t,i,a){if(n!==t){var f=Hr(r,e);var u=e.toLowerCase();if(e==="class"){var l=r.classList;var o=Z(n);var v=Z(t);l.remove.apply(l,o.filter((function(r){return r&&!v.includes(r)})));l.add.apply(l,v.filter((function(r){return r&&!o.includes(r)})))}else if(e==="style"){{for(var s in n){if(!t||t[s]==null){if(s.includes("-")){r.style.removeProperty(s)}else{r.style[s]=""}}}}for(var s in t){if(!n||t[s]!==n[s]){if(s.includes("-")){r.style.setProperty(s,t[s])}else{r.style[s]=t[s]}}}}else if(e==="key");else if(e==="ref"){if(t){t(r)}}else if(!f&&e[0]==="o"&&e[1]==="n"){if(e[2]==="-"){e=e.slice(3)}else if(Hr(Vr,u)){e=u.slice(2)}else{e=u[2]+e.slice(3)}if(n||t){var c=e.endsWith(rr);e=e.replace(er,"");if(n){Jr.rel(r,e,n,c)}if(t){Jr.ael(r,e,t,c)}}}else{var d=T(t);if((f||d&&t!==null)&&!i){try{if(!r.tagName.includes("-")){var h=t==null?"":t;if(e==="list"){f=false}else if(n==null||r[e]!=h){r[e]=h}}else{r[e]=t}}catch(r){}}var p=false;{if(u!==(u=u.replace(/^xlink\:?/,""))){e=u;p=true}}if(t==null||t===false){if(t!==false||r.getAttribute(e)===""){if(p){r.removeAttributeNS(k,e)}else{r.removeAttribute(e)}}}else if((!f||a&4||i)&&!d){t=t===true?"":t;if(p){r.setAttributeNS(k,e,t)}else{r.setAttribute(e,t)}}}}};var Y=/\s/;var Z=function(r){return!r?[]:r.split(Y)};var rr="Capture";var er=new RegExp(rr+"$");var nr=function(r,e,n,t){var i=e.p.nodeType===11&&e.p.host?e.p.host:e.p;var a=r&&r.i||x;var f=e.i||x;{for(t in a){if(!(t in f)){J(i,t,a[t],undefined,n,e.v)}}}for(t in f){J(i,t,a[t],f[t],n,e.v)}};var tr=function(r,e,n,t){var i;var o=e.u[n];var c=0;var d;var h;var p;if(!l){v=true;if(o.h==="slot"){if(a){t.classList.add(a+"-s")}o.v|=o.u?2:1}}if(o.t!==null){d=o.p=Xr.createTextNode(o.t)}else if(o.v&1){d=o.p=Xr.createTextNode("")}else{if(!s){s=o.h==="svg"}d=o.p=Xr.createElementNS(s?C:A,o.v&2?"slot-fb":o.h);if(s&&o.h==="foreignObject"){s=false}{nr(null,o,s)}if(j(a)&&d["s-si"]!==a){d.classList.add(d["s-si"]=a)}if(o.u){for(c=0;c<o.u.length;++c){h=tr(r,o,c,d);if(h){d.appendChild(h)}}}{if(o.h==="svg"){s=false}else if(d.tagName==="foreignObject"){s=true}}}d["s-hn"]=u;{if(o.v&(2|1)){d["s-sr"]=true;d["s-cr"]=f;d["s-sn"]=o.o||"";d["s-rf"]=(i=o.i)===null||i===void 0?void 0:i.ref;p=r&&r.u&&r.u[n];if(p&&p.h===o.h&&r.p){{ir(r.p,false)}}}}return d};var ir=function(r,e){Jr.v|=1;var n=Array.from(r.childNodes);if(r["s-sr"]&&i.experimentalSlotFixes){var t=r;while(t=t.nextSibling){if(t&&t["s-sn"]===r["s-sn"]&&t["s-sh"]===u){n.push(t)}}}for(var a=n.length-1;a>=0;a--){var f=n[a];if(f["s-hn"]!==u&&f["s-ol"]){vr(f).insertBefore(f,or(f));f["s-ol"].remove();f["s-ol"]=undefined;f["s-sh"]=undefined;v=true}if(e){ir(f,e)}}Jr.v&=~1};var ar=function(r,e,n,t,i,a){var f=r["s-cr"]&&r["s-cr"].parentNode||r;var l;if(f.shadowRoot&&f.tagName===u){f=f.shadowRoot}for(;i<=a;++i){if(t[i]){l=tr(null,n,i,r);if(l){t[i].p=l;f.insertBefore(l,or(e))}}}};var fr=function(r,e,n){for(var t=e;t<=n;++t){var i=r[t];if(i){var a=i.p;yr(i);if(a){{o=true;if(a["s-ol"]){a["s-ol"].remove()}else{ir(a,true)}}a.remove()}}}};var ur=function(r,e,n,t,i){if(i===void 0){i=false}var a=0;var f=0;var u=0;var l=0;var o=e.length-1;var v=e[0];var s=e[o];var c=t.length-1;var d=t[0];var h=t[c];var p;var y;while(a<=o&&f<=c){if(v==null){v=e[++a]}else if(s==null){s=e[--o]}else if(d==null){d=t[++f]}else if(h==null){h=t[--c]}else if(lr(v,d,i)){sr(v,d,i);v=e[++a];d=t[++f]}else if(lr(s,h,i)){sr(s,h,i);s=e[--o];h=t[--c]}else if(lr(v,h,i)){if(v.h==="slot"||h.h==="slot"){ir(v.p.parentNode,false)}sr(v,h,i);r.insertBefore(v.p,s.p.nextSibling);v=e[++a];h=t[--c]}else if(lr(s,d,i)){if(v.h==="slot"||h.h==="slot"){ir(s.p.parentNode,false)}sr(s,d,i);r.insertBefore(s.p,v.p);s=e[--o];d=t[++f]}else{u=-1;{for(l=a;l<=o;++l){if(e[l]&&e[l].l!==null&&e[l].l===d.l){u=l;break}}}if(u>=0){y=e[u];if(y.h!==d.h){p=tr(e&&e[f],n,u,r)}else{sr(y,d,i);e[u]=undefined;p=y.p}d=t[++f]}else{p=tr(e&&e[f],n,f,r);d=t[++f]}if(p){{vr(v.p).insertBefore(p,or(v.p))}}}}if(a>o){ar(r,t[c+1]==null?null:t[c+1].p,n,t,f,c)}else if(f>c){fr(e,a,o)}};var lr=function(r,e,n){if(n===void 0){n=false}if(r.h===e.h){if(r.h==="slot"){return r.o===e.o}if(!n){return r.l===e.l}return true}return false};var or=function(r){return r&&r["s-ol"]||r};var vr=function(r){return(r["s-ol"]?r["s-ol"]:r).parentNode};var sr=function(r,e,n){if(n===void 0){n=false}var t=e.p=r.p;var i=r.u;var a=e.u;var f=e.h;var u=e.t;var o;if(u===null){{s=f==="svg"?true:f==="foreignObject"?false:s}{if(f==="slot"&&!l);else{nr(r,e,s)}}if(i!==null&&a!==null){ur(t,i,e,a,n)}else if(a!==null){if(r.t!==null){t.textContent=""}ar(t,null,e,a,0,a.length-1)}else if(i!==null){fr(i,0,i.length-1)}if(s&&f==="svg"){s=false}}else if(o=t["s-cr"]){o.parentNode.textContent=u}else if(r.t!==u){t.data=u}};var cr=function(r){var e=r.childNodes;for(var n=0,t=e;n<t.length;n++){var i=t[n];if(i.nodeType===1){if(i["s-sr"]){var a=i["s-sn"];i.hidden=false;for(var f=0,u=e;f<u.length;f++){var l=u[f];if(l!==i){if(l["s-hn"]!==i["s-hn"]||a!==""){if(l.nodeType===1&&(a===l.getAttribute("slot")||a===l["s-sn"])){i.hidden=true;break}}else{if(l.nodeType===1||l.nodeType===3&&l.textContent.trim()!==""){i.hidden=true;break}}}}}cr(i)}}};var dr=[];var hr=function(r){var e;var n;var t;for(var a=0,f=r.childNodes;a<f.length;a++){var u=f[a];if(u["s-sr"]&&(e=u["s-cr"])&&e.parentNode){n=e.parentNode.childNodes;var l=u["s-sn"];var v=function(){e=n[t];if(!e["s-cn"]&&!e["s-nr"]&&e["s-hn"]!==u["s-hn"]&&!i.experimentalSlotFixes){if(pr(e,l)){var r=dr.find((function(r){return r.O===e}));o=true;e["s-sn"]=e["s-sn"]||l;if(r){r.O["s-sh"]=u["s-hn"];r.L=u}else{e["s-sh"]=u["s-hn"];dr.push({L:u,O:e})}if(e["s-sr"]){dr.map((function(n){if(pr(n.O,e["s-sn"])){r=dr.find((function(r){return r.O===e}));if(r&&!n.L){n.L=r.L}}}))}}else if(!dr.some((function(r){return r.O===e}))){dr.push({O:e})}}};for(t=n.length-1;t>=0;t--){v()}}if(u.nodeType===1){hr(u)}}};var pr=function(r,e){if(r.nodeType===1){if(r.getAttribute("slot")===null&&e===""){return true}if(r.getAttribute("slot")===e){return true}return false}if(r["s-sn"]===e){return true}return e===""};var yr=function(r){{r.i&&r.i.ref&&r.i.ref(null);r.u&&r.u.map(yr)}};var $r=function(r,e,n){if(n===void 0){n=false}var t,i,s,c;var d=r.$hostElement$;var h=r.j;var p=r.$||D(null,null);var y=M(e)?e:L(null,null,e);u=d.tagName;if(h.D){y.i=y.i||{};h.D.map((function(r){var e=r[0],n=r[1];return y.i[n]=d[e]}))}if(n&&y.i){for(var $=0,m=Object.keys(y.i);$<m.length;$++){var b=m[$];if(d.hasAttribute(b)&&!["key","ref","style","class"].includes(b)){y.i[b]=d[b]}}}y.h=null;y.v|=4;r.$=y;y.p=p.p=d.shadowRoot||d;{a=d["s-sc"]}l=(h.v&1)!==0;{f=d["s-cr"];o=false}sr(p,y,n);{Jr.v|=1;if(v){hr(y.p);for(var w=0,g=dr;w<g.length;w++){var _=g[w];var S=_.O;if(!S["s-ol"]){var k=Xr.createTextNode("");k["s-nr"]=S;S.parentNode.insertBefore(S["s-ol"]=k,S)}}for(var x=0,C=dr;x<C.length;x++){var _=C[x];var S=_.O;var A=_.L;if(A){var j=A.parentNode;var T=A.nextSibling;{var k=(t=S["s-ol"])===null||t===void 0?void 0:t.previousSibling;while(k){var O=(i=k["s-nr"])!==null&&i!==void 0?i:null;if(O&&O["s-sn"]===S["s-sn"]&&j===O.parentNode){O=O.nextSibling;if(!O||!O["s-nr"]){T=O;break}}k=k.previousSibling}}if(!T&&j!==S.parentNode||S.nextSibling!==T){if(S!==T){if(!S["s-hn"]&&S["s-ol"]){S["s-hn"]=S["s-ol"].parentNode.nodeName}j.insertBefore(S,T);if(S.nodeType===1){S.hidden=(s=S["s-ih"])!==null&&s!==void 0?s:false}}}S&&typeof A["s-rf"]==="function"&&A["s-rf"](S)}else{if(S.nodeType===1){if(n){S["s-ih"]=(c=S.hidden)!==null&&c!==void 0?c:false}S.hidden=true}}}}if(o){cr(y.p)}Jr.v&=~1;dr.length=0}f=undefined};var mr=function(r,e){if(e&&!r.R&&e["s-p"]){e["s-p"].push(new Promise((function(e){return r.R=e})))}};var br=function(r,e){{r.v|=16}if(r.v&4){r.v|=512;return}mr(r,r.M);var n=function(){return wr(r,e)};return ue(n)};var wr=function(r,e){var n=d("scheduleUpdate",r.j.T);var t=r.F;var i;if(e){{i=Ar(t,"componentWillLoad")}}n();return gr(i,(function(){return Sr(r,t,e)}))};var gr=function(r,e){return _r(r)?r.then(e):e()};var _r=function(r){return r instanceof Promise||r&&r.then&&typeof r.then==="function"};var Sr=function(r,e,t){return __awaiter(n,void 0,void 0,(function(){var n,i,a,f,u,l,o;return __generator(this,(function(v){i=r.$hostElement$;a=d("update",r.j.T);f=i["s-rc"];if(t){K(r)}u=d("render",r.j.T);{kr(r,e,i,t)}if(f){f.map((function(r){return r()}));i["s-rc"]=undefined}u();a();{l=(n=i["s-p"])!==null&&n!==void 0?n:[];o=function(){return xr(r)};if(l.length===0){o()}else{Promise.all(l).then(o);r.v|=4;l.length=0}}return[2]}))}))};var kr=function(r,e,n,t){try{e=e.render();{r.v&=~16}{r.v|=2}{{{$r(r,e,t)}}}}catch(e){Qr(e,r.$hostElement$)}return null};var xr=function(r){var e=r.j.T;var n=r.$hostElement$;var t=d("postUpdate",e);var i=r.F;var a=r.M;if(!(r.v&64)){r.v|=64;{jr(n)}{Ar(i,"componentDidLoad")}t();{r.N(n);if(!a){Cr()}}}else{{Ar(i,"componentDidUpdate")}t()}{if(r.R){r.R();r.R=undefined}if(r.v&512){fe((function(){return br(r,false)}))}r.v&=~(4|512)}};var Cr=function(r){{jr(Xr.documentElement)}fe((function(){return H(Vr,"appload",{detail:{namespace:t}})}))};var Ar=function(r,e,n){if(r&&r[e]){try{return r[e](n)}catch(r){Qr(r)}}return undefined};var jr=function(r){return r.classList.add("hydrated")};var Tr=function(r,e){return Ir(r).P.get(e)};var Or=function(r,e,n,t){var i=Ir(r);var a=i.$hostElement$;var f=i.P.get(e);var u=i.v;var l=i.F;n=I(n,t.U[e][0]);var o=Number.isNaN(f)&&Number.isNaN(n);var v=n!==f&&!o;if((!(u&8)||f===undefined)&&v){i.P.set(e,n);if(l){if(t.W&&u&128){var s=t.W[e];if(s){s.map((function(r){try{l[r](n,f,e)}catch(r){Qr(r,a)}}))}}if((u&(2|16))===2){br(i,false)}}}};var Lr=function(r,e,n){var t;var i=r.prototype;if(e.U){if(r.watchers){e.W=r.watchers}var a=Object.entries(e.U);a.map((function(r){var t=r[0],a=r[1][0];if(a&31||n&2&&a&32){Object.defineProperty(i,t,{get:function(){return Tr(this,t)},set:function(r){Or(this,t,r,e)},configurable:true,enumerable:true})}}));if(n&1){var f=new Map;i.attributeChangedCallback=function(r,n,t){var a=this;Jr.jmp((function(){var u;var l=f.get(r);if(a.hasOwnProperty(l)){t=a[l];delete a[l]}else if(i.hasOwnProperty(l)&&typeof a[l]==="number"&&a[l]==t){return}else if(l==null){var o=Ir(a);var v=o===null||o===void 0?void 0:o.v;if(v&&!(v&8)&&v&128&&t!==n){var s=o.F;var c=(u=e.W)===null||u===void 0?void 0:u[r];c===null||c===void 0?void 0:c.forEach((function(e){if(s[e]!=null){s[e].call(s,t,n,r)}}))}return}a[l]=t===null&&typeof a[l]==="boolean"?false:t}))};r.observedAttributes=Array.from(new Set(__spreadArray(__spreadArray([],Object.keys((t=e.W)!==null&&t!==void 0?t:{}),true),a.filter((function(r){var e=r[0],n=r[1];return n[0]&15})).map((function(r){var n=r[0],t=r[1];var i;var a=t[1]||n;f.set(a,n);if(t[0]&512){(i=e.D)===null||i===void 0?void 0:i.push([n,a])}return a})),true)))}}return r};var Dr=function(r,e,t,i){return __awaiter(n,void 0,void 0,(function(){var n,i,a,f,u,l,o,v,s;return __generator(this,(function(c){switch(c.label){case 0:if(!((e.v&32)===0))return[3,5];e.v|=32;i=t.I;if(!i)return[3,3];n=Gr(t);if(!n.then)return[3,2];a=h();return[4,n];case 1:n=c.sent();a();c.label=2;case 2:if(!n.isProxied){{t.W=n.watchers}Lr(n,t,2);n.isProxied=true}f=d("createInstance",t.T);{e.v|=8}try{new n(e)}catch(r){Qr(r)}{e.v&=~8}{e.v|=128}f();return[3,4];case 3:n=r.constructor;customElements.whenDefined(t.T).then((function(){return e.v|=128}));c.label=4;case 4:if(n.style){u=n.style;l=V(t);if(!Kr.has(l)){o=d("registerStyles",t.T);q(l,u,!!(t.v&1));o()}}c.label=5;case 5:v=e.M;s=function(){return br(e,true)};if(v&&v["s-rc"]){v["s-rc"].push(s)}else{s()}return[2]}}))}))};var Rr=function(r){};var Mr=function(r){if((Jr.v&1)===0){var e=Ir(r);var n=e.j;var t=d("connectedCallback",n.T);if(!(e.v&1)){e.v|=1;var i=void 0;{i=r.getAttribute(b);if(i){if(n.v&1){var a=G(r.shadowRoot,n);r.classList.remove(a+"-h",a+"-s")}P(r,n.T,i,e)}}if(!i){if(n.v&(4|8)){Fr(r)}}{var f=r;while(f=f.parentNode||f.host){if(f.nodeType===1&&f.hasAttribute("s-id")&&f["s-p"]||f["s-p"]){mr(e,e.M=f);break}}}if(n.U){Object.entries(n.U).map((function(e){var n=e[0],t=e[1][0];if(t&31&&r.hasOwnProperty(n)){var i=r[n];delete r[n];r[n]=i}}))}{Dr(r,e,n)}}else{if(e===null||e===void 0?void 0:e.F);else if(e===null||e===void 0?void 0:e.B){e.B.then((function(){return Rr()}))}}t()}};var Fr=function(r){var e=r["s-cr"]=Xr.createComment("");e["s-cn"]=true;r.insertBefore(e,r.firstChild)};var Er=function(r){{Ar(r,"disconnectedCallback")}};var Nr=function(r){return __awaiter(n,void 0,void 0,(function(){var e;return __generator(this,(function(n){if((Jr.v&1)===0){e=Ir(r);if(e===null||e===void 0?void 0:e.F){Er(e.F)}else if(e===null||e===void 0?void 0:e.B){e.B.then((function(){return Er(e.F)}))}}return[2]}))}))};var Pr=r("b",(function(r,e){if(e===void 0){e={}}var n;var t=d();var i=[];var a=e.exclude||[];var f=Vr.customElements;var u=Xr.head;var l=u.querySelector("meta[charset]");var o=Xr.createElement("style");var v=[];var s=Xr.querySelectorAll("[".concat(w,"]"));var c;var h=true;var p=0;Object.assign(Jr,e);Jr.H=new URL(e.resourcesUrl||"./",Xr.baseURI).href;{Jr.v|=2}{for(;p<s.length;p++){q(s[p].getAttribute(w),X(s[p].innerHTML),true)}}var y=false;r.map((function(r){r[1].map((function(e){var n;var t={v:e[0],T:e[1],U:e[2],q:e[3]};if(t.v&4){y=true}{t.U=e[2]}{t.D=[]}{t.W=(n=e[4])!==null&&n!==void 0?n:{}}var u=t.T;var l=function(r){__extends(e,r);function e(e){var n=r.call(this,e)||this;e=n;Br(e,t);if(t.v&1){{{e.attachShadow({mode:"open"})}}}return n}e.prototype.connectedCallback=function(){var r=this;if(c){clearTimeout(c);c=null}if(h){v.push(this)}else{Jr.jmp((function(){return Mr(r)}))}};e.prototype.disconnectedCallback=function(){var r=this;Jr.jmp((function(){return Nr(r)}))};e.prototype.componentOnReady=function(){return Ir(this).B};return e}(HTMLElement);t.I=r[0];if(!a.includes(u)&&!f.get(u)){i.push(u);f.define(u,Lr(l,t,1))}}))}));if(i.length>0){if(y){o.textContent+=S}{o.textContent+=i+_}if(o.innerHTML.length){o.setAttribute("data-styles","");var $=(n=Jr.A)!==null&&n!==void 0?n:O(Xr);if($!=null){o.setAttribute("nonce",$)}u.insertBefore(o,l?l.nextSibling:u.firstChild)}}h=false;if(v.length){v.map((function(r){return r.connectedCallback()}))}else{{Jr.jmp((function(){return c=setTimeout(Cr,30)}))}}t()}));var Ur=r("s",(function(r){return Jr.A=r}));var Wr=new WeakMap;var Ir=function(r){return Wr.get(r)};var zr=r("r",(function(r,e){return Wr.set(e.F=r,e)}));var Br=function(r,e){var n={v:0,$hostElement$:r,j:e,P:new Map};{n.B=new Promise((function(r){return n.N=r}));r["s-p"]=[];r["s-rc"]=[]}return Wr.set(r,n)};var Hr=function(r,e){return e in r};var Qr=function(r,e){return(0,console.error)(r,e)};var qr=new Map;var Gr=function(r,n,t){var i=r.T.replace(/-/g,"_");var a=r.I;var f=qr.get(a);if(f){return f[i]}
/*!__STENCIL_STATIC_IMPORT_SWITCH__*/return e.import("./".concat(a,".entry.js").concat("")).then((function(r){{qr.set(a,r)}return r[i]}),Qr)};var Kr=new Map;var Vr=typeof window!=="undefined"?window:{};var Xr=Vr.document||{head:{}};var Jr={v:0,H:"",jmp:function(r){return r()},raf:function(r){return requestAnimationFrame(r)},ael:function(r,e,n,t){return r.addEventListener(e,n,t)},rel:function(r,e,n,t){return r.removeEventListener(e,n,t)},ce:function(r,e){return new CustomEvent(r,e)}};var Yr=true;var Zr=r("p",(function(r){return Promise.resolve(r)}));var re=function(){try{new CSSStyleSheet;return typeof(new CSSStyleSheet).replaceSync==="function"}catch(r){}return false}();var ee=[];var ne=[];var te=function(r,e){return function(n){r.push(n);if(!c){c=true;if(e&&Jr.v&4){fe(ae)}else{Jr.raf(ae)}}}};var ie=function(r){for(var e=0;e<r.length;e++){try{r[e](performance.now())}catch(r){Qr(r)}}r.length=0};var ae=function(){ie(ee);{ie(ne);if(c=ee.length>0){Jr.raf(ae)}}};var fe=function(r){return Zr().then(r)};var ue=te(ne,true)}}}));
//# sourceMappingURL=p-821bdcdc.system.js.map