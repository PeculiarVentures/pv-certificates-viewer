/*!
 * © Peculiar Ventures https://peculiarventures.com/ - MIT License
 */
const e="peculiar";const t={allRenderFn:true,appendChildSlotFix:false,asyncLoading:true,asyncQueue:false,attachStyles:true,cloneNodeFix:false,cmpDidLoad:true,cmpDidRender:false,cmpDidUnload:false,cmpDidUpdate:true,cmpShouldUpdate:false,cmpWillLoad:true,cmpWillRender:false,cmpWillUpdate:false,connectedCallback:false,constructableCSS:true,cssAnnotations:true,devTools:false,disconnectedCallback:true,element:false,event:true,experimentalScopedSlotChanges:false,experimentalSlotFixes:false,formAssociated:false,hasRenderFn:true,hostListener:false,hostListenerTarget:false,hostListenerTargetBody:false,hostListenerTargetDocument:false,hostListenerTargetParent:false,hostListenerTargetWindow:false,hotModuleReplacement:false,hydrateClientSide:true,hydrateServerSide:false,hydratedAttribute:false,hydratedClass:true,initializeNextTick:false,invisiblePrehydration:true,isDebug:false,isDev:false,isTesting:false,lazyLoad:true,lifecycle:true,lifecycleDOMEvents:false,member:true,method:false,mode:false,observeAttribute:true,profile:false,prop:true,propBoolean:true,propMutable:false,propNumber:true,propString:true,reflect:true,scoped:true,scopedSlotTextContentFix:false,scriptDataOpts:false,shadowDelegatesFocus:false,shadowDom:true,slot:true,slotChildNodesFix:false,slotRelocation:true,state:true,style:true,svg:true,taskQueue:true,transformTagName:false,updatable:true,vdomAttribute:true,vdomClass:true,vdomFunctional:true,vdomKey:true,vdomListener:true,vdomPropOrAttr:true,vdomRef:true,vdomRender:true,vdomStyle:true,vdomText:true,vdomXlink:true,watchCallback:true};let n;let s;let l;let o=false;let i=false;let f=false;let c=false;let r=false;const a=(e,t="")=>{{return()=>{}}};const u=(e,t)=>{{return()=>{}}};const d="r";const $="o";const p="s";const m="t";const h="s-id";const v="sty-id";const y="c-id";const b="{visibility:hidden}.hydrated{visibility:inherit}";const g="slot-fb{display:contents}slot-fb[hidden]{display:none}";const w="http://www.w3.org/1999/xlink";const S={};const k="http://www.w3.org/2000/svg";const x="http://www.w3.org/1999/xhtml";const C=e=>e!=null;const T=e=>{e=typeof e;return e==="object"||e==="function"};function j(e){var t,n,s;return(s=(n=(t=e.head)===null||t===void 0?void 0:t.querySelector('meta[name="csp-nonce"]'))===null||n===void 0?void 0:n.getAttribute("content"))!==null&&s!==void 0?s:undefined}const L=(e,t,...n)=>{let s=null;let l=null;let o=null;let i=false;let f=false;const c=[];const r=t=>{for(let n=0;n<t.length;n++){s=t[n];if(Array.isArray(s)){r(s)}else if(s!=null&&typeof s!=="boolean"){if(i=typeof e!=="function"&&!T(s)){s=String(s)}if(i&&f){c[c.length-1].t+=s}else{c.push(i?O(null,s):s)}f=i}}};r(n);if(t){if(t.key){l=t.key}if(t.name){o=t.name}{const e=t.className||t.class;if(e){t.class=typeof e!=="object"?e:Object.keys(e).filter((t=>e[t])).join(" ")}}}if(typeof e==="function"){return e(t===null?{}:t,c,M)}const a=O(e,null);a.l=t;if(c.length>0){a.o=c}{a.i=l}{a.u=o}return a};const O=(e,t)=>{const n={$:0,p:e,t,m:null,o:null};{n.l=null}{n.i=null}{n.u=null}return n};const R={};const D=e=>e&&e.p===R;const M={forEach:(e,t)=>e.map(F).forEach(t),map:(e,t)=>e.map(F).map(t).map(A)};const F=e=>({vattrs:e.l,vchildren:e.o,vkey:e.i,vname:e.u,vtag:e.p,vtext:e.t});const A=e=>{if(typeof e.vtag==="function"){const t=Object.assign({},e.vattrs);if(e.vkey){t.key=e.vkey}if(e.vname){t.name=e.vname}return L(e.vtag,t,...e.vchildren||[])}const t=O(e.vtag,e.vtext);t.l=e.vattrs;t.o=e.vchildren;t.i=e.vkey;t.u=e.vname;return t};const N=(e,t,n,s)=>{const l=a("hydrateClient",t);const o=e.shadowRoot;const i=[];const f=[];const c=o?[]:null;const r=s.h=O(t,null);if(!Xe.v){P(Ve.body,Xe.v=new Map)}e[h]=n;e.removeAttribute(h);U(r,i,f,c,e,e,n);i.map((e=>{const n=e.S+"."+e.k;const s=Xe.v.get(n);const l=e.m;if(s&&_e&&s["s-en"]===""){s.parentNode.insertBefore(l,s.nextSibling)}if(!o){l["s-hn"]=t;if(s){l["s-ol"]=s;l["s-ol"]["s-nr"]=l}}Xe.v.delete(n)}));if(o){c.map((e=>{if(e){o.appendChild(e)}}))}l()};const U=(e,t,n,s,l,o,i)=>{let f;let c;let r;let a;if(o.nodeType===1){f=o.getAttribute(y);if(f){c=f.split(".");if(c[0]===i||c[0]==="0"){r={$:0,S:c[0],k:c[1],C:c[2],T:c[3],p:o.tagName.toLowerCase(),m:o,l:null,o:null,i:null,u:null,t:null};t.push(r);o.removeAttribute(y);if(!e.o){e.o=[]}e.o[r.T]=r;e=r;if(s&&r.C==="0"){s[r.T]=r.m}}}for(a=o.childNodes.length-1;a>=0;a--){U(e,t,n,s,l,o.childNodes[a],i)}if(o.shadowRoot){for(a=o.shadowRoot.childNodes.length-1;a>=0;a--){U(e,t,n,s,l,o.shadowRoot.childNodes[a],i)}}}else if(o.nodeType===8){c=o.nodeValue.split(".");if(c[1]===i||c[1]==="0"){f=c[0];r={$:0,S:c[1],k:c[2],C:c[3],T:c[4],m:o,l:null,o:null,i:null,u:null,p:null,t:null};if(f===m){r.m=o.nextSibling;if(r.m&&r.m.nodeType===3){r.t=r.m.textContent;t.push(r);o.remove();if(!e.o){e.o=[]}e.o[r.T]=r;if(s&&r.C==="0"){s[r.T]=r.m}}}else if(r.S===i){if(f===p){r.p="slot";if(c[5]){o["s-sn"]=r.u=c[5]}else{o["s-sn"]=""}o["s-sr"]=true;if(s){r.m=Ve.createElement(r.p);if(r.u){r.m.setAttribute("name",r.u)}o.parentNode.insertBefore(r.m,o);o.remove();if(r.C==="0"){s[r.T]=r.m}}n.push(r);if(!e.o){e.o=[]}e.o[r.T]=r}else if(f===d){if(s){o.remove()}else{l["s-cr"]=o;o["s-cn"]=true}}}}}else if(e&&e.p==="style"){const t=O(null,o.textContent);t.m=o;t.T="0";e.o=[t]}};const P=(e,t)=>{if(e.nodeType===1){let n=0;for(;n<e.childNodes.length;n++){P(e.childNodes[n],t)}if(e.shadowRoot){for(n=0;n<e.shadowRoot.childNodes.length;n++){P(e.shadowRoot.childNodes[n],t)}}}else if(e.nodeType===8){const n=e.nodeValue.split(".");if(n[0]===$){t.set(n[1]+"."+n[2],e);e.nodeValue="";e["s-en"]=n[3]}}};const E=(e,t)=>{if(e!=null&&!T(e)){if(t&4){return e==="false"?false:e===""||!!e}if(t&2){return parseFloat(e)}if(t&1){return String(e)}return e}return e};const W=e=>Ee(e).$hostElement$;const I=(e,t,n)=>{const s=W(e);return{emit:e=>z(s,t,{bubbles:!!(n&4),composed:!!(n&2),cancelable:!!(n&1),detail:e})}};const z=(e,t,n)=>{const s=Xe.ce(t,n);e.dispatchEvent(s);return s};const B=new WeakMap;const H=(e,t,n)=>{let s=qe.get(e);if(Je&&n){s=s||new CSSStyleSheet;if(typeof s==="string"){s=t}else{s.replaceSync(t)}}else{s=t}qe.set(e,s)};const Q=(e,t,n)=>{var s;const l=K(t);const o=qe.get(l);e=e.nodeType===11?e:Ve;if(o){if(typeof o==="string"){e=e.head||e;let n=B.get(e);let i;if(!n){B.set(e,n=new Set)}if(!n.has(l)){if(e.host&&(i=e.querySelector(`[${v}="${l}"]`))){i.innerHTML=o}else{i=Ve.createElement("style");i.innerHTML=o;const t=(s=Xe.j)!==null&&s!==void 0?s:j(Ve);if(t!=null){i.setAttribute("nonce",t)}e.insertBefore(i,e.querySelector("link"))}if(t.$&4){i.innerHTML+=g}if(n){n.add(l)}}}else if(!e.adoptedStyleSheets.includes(o)){e.adoptedStyleSheets=[...e.adoptedStyleSheets,o]}}return l};const q=e=>{const t=e.L;const n=e.$hostElement$;const s=t.$;const l=a("attachStyles",t.O);const o=Q(n.shadowRoot?n.shadowRoot:n.getRootNode(),t);if(s&10){n["s-sc"]=o;n.classList.add(o+"-h");if(s&2){n.classList.add(o+"-s")}}l()};const K=(e,t)=>"sc-"+e.O;const V=e=>e.replace(/\/\*!@([^\/]+)\*\/[^\{]+\{/g,"$1{");const X=(e,t,n,s,l,o)=>{if(n!==s){let i=ze(e,t);let f=t.toLowerCase();if(t==="class"){const t=e.classList;const l=G(n);const o=G(s);t.remove(...l.filter((e=>e&&!o.includes(e))));t.add(...o.filter((e=>e&&!l.includes(e))))}else if(t==="style"){{for(const t in n){if(!s||s[t]==null){if(t.includes("-")){e.style.removeProperty(t)}else{e.style[t]=""}}}}for(const t in s){if(!n||s[t]!==n[t]){if(t.includes("-")){e.style.setProperty(t,s[t])}else{e.style[t]=s[t]}}}}else if(t==="key");else if(t==="ref"){if(s){s(e)}}else if(!i&&t[0]==="o"&&t[1]==="n"){if(t[2]==="-"){t=t.slice(3)}else if(ze(Ke,f)){t=f.slice(2)}else{t=f[2]+t.slice(3)}if(n||s){const l=t.endsWith(J);t=t.replace(Y,"");if(n){Xe.rel(e,t,n,l)}if(s){Xe.ael(e,t,s,l)}}}else{const c=T(s);if((i||c&&s!==null)&&!l){try{if(!e.tagName.includes("-")){const l=s==null?"":s;if(t==="list"){i=false}else if(n==null||e[t]!=l){e[t]=l}}else{e[t]=s}}catch(e){}}let r=false;{if(f!==(f=f.replace(/^xlink\:?/,""))){t=f;r=true}}if(s==null||s===false){if(s!==false||e.getAttribute(t)===""){if(r){e.removeAttributeNS(w,t)}else{e.removeAttribute(t)}}}else if((!i||o&4||l)&&!c){s=s===true?"":s;if(r){e.setAttributeNS(w,t,s)}else{e.setAttribute(t,s)}}}}};const _=/\s/;const G=e=>!e?[]:e.split(_);const J="Capture";const Y=new RegExp(J+"$");const Z=(e,t,n,s)=>{const l=t.m.nodeType===11&&t.m.host?t.m.host:t.m;const o=e&&e.l||S;const i=t.l||S;{for(s in o){if(!(s in i)){X(l,s,o[s],undefined,n,t.$)}}}for(s in i){X(l,s,o[s],i[s],n,t.$)}};const ee=(e,t,i,r)=>{var a;const u=t.o[i];let d=0;let $;let p;let m;if(!o){f=true;if(u.p==="slot"){if(n){r.classList.add(n+"-s")}u.$|=u.o?2:1}}if(u.t!==null){$=u.m=Ve.createTextNode(u.t)}else if(u.$&1){$=u.m=Ve.createTextNode("")}else{if(!c){c=u.p==="svg"}$=u.m=Ve.createElementNS(c?k:x,u.$&2?"slot-fb":u.p);if(c&&u.p==="foreignObject"){c=false}{Z(null,u,c)}if(C(n)&&$["s-si"]!==n){$.classList.add($["s-si"]=n)}if(u.o){for(d=0;d<u.o.length;++d){p=ee(e,u,d,$);if(p){$.appendChild(p)}}}{if(u.p==="svg"){c=false}else if($.tagName==="foreignObject"){c=true}}}$["s-hn"]=l;{if(u.$&(2|1)){$["s-sr"]=true;$["s-cr"]=s;$["s-sn"]=u.u||"";$["s-rf"]=(a=u.l)===null||a===void 0?void 0:a.ref;m=e&&e.o&&e.o[i];if(m&&m.p===u.p&&e.m){{te(e.m,false)}}}}return $};const te=(e,n)=>{Xe.$|=1;const s=Array.from(e.childNodes);if(e["s-sr"]&&t.experimentalSlotFixes){let t=e;while(t=t.nextSibling){if(t&&t["s-sn"]===e["s-sn"]&&t["s-sh"]===l){s.push(t)}}}for(let e=s.length-1;e>=0;e--){const t=s[e];if(t["s-hn"]!==l&&t["s-ol"]){fe(t).insertBefore(t,ie(t));t["s-ol"].remove();t["s-ol"]=undefined;t["s-sh"]=undefined;f=true}if(n){te(t,n)}}Xe.$&=~1};const ne=(e,t,n,s,o,i)=>{let f=e["s-cr"]&&e["s-cr"].parentNode||e;let c;if(f.shadowRoot&&f.tagName===l){f=f.shadowRoot}for(;o<=i;++o){if(s[o]){c=ee(null,n,o,e);if(c){s[o].m=c;f.insertBefore(c,ie(t))}}}};const se=(e,t,n)=>{for(let s=t;s<=n;++s){const t=e[s];if(t){const e=t.m;$e(t);if(e){{i=true;if(e["s-ol"]){e["s-ol"].remove()}else{te(e,true)}}e.remove()}}}};const le=(e,t,n,s,l=false)=>{let o=0;let i=0;let f=0;let c=0;let r=t.length-1;let a=t[0];let u=t[r];let d=s.length-1;let $=s[0];let p=s[d];let m;let h;while(o<=r&&i<=d){if(a==null){a=t[++o]}else if(u==null){u=t[--r]}else if($==null){$=s[++i]}else if(p==null){p=s[--d]}else if(oe(a,$,l)){ce(a,$,l);a=t[++o];$=s[++i]}else if(oe(u,p,l)){ce(u,p,l);u=t[--r];p=s[--d]}else if(oe(a,p,l)){if(a.p==="slot"||p.p==="slot"){te(a.m.parentNode,false)}ce(a,p,l);e.insertBefore(a.m,u.m.nextSibling);a=t[++o];p=s[--d]}else if(oe(u,$,l)){if(a.p==="slot"||p.p==="slot"){te(u.m.parentNode,false)}ce(u,$,l);e.insertBefore(u.m,a.m);u=t[--r];$=s[++i]}else{f=-1;{for(c=o;c<=r;++c){if(t[c]&&t[c].i!==null&&t[c].i===$.i){f=c;break}}}if(f>=0){h=t[f];if(h.p!==$.p){m=ee(t&&t[i],n,f,e)}else{ce(h,$,l);t[f]=undefined;m=h.m}$=s[++i]}else{m=ee(t&&t[i],n,i,e);$=s[++i]}if(m){{fe(a.m).insertBefore(m,ie(a.m))}}}}if(o>r){ne(e,s[d+1]==null?null:s[d+1].m,n,s,i,d)}else if(i>d){se(t,o,r)}};const oe=(e,t,n=false)=>{if(e.p===t.p){if(e.p==="slot"){return e.u===t.u}if(!n){return e.i===t.i}return true}return false};const ie=e=>e&&e["s-ol"]||e;const fe=e=>(e["s-ol"]?e["s-ol"]:e).parentNode;const ce=(e,t,n=false)=>{const s=t.m=e.m;const l=e.o;const i=t.o;const f=t.p;const r=t.t;let a;if(r===null){{c=f==="svg"?true:f==="foreignObject"?false:c}{if(f==="slot"&&!o);else{Z(e,t,c)}}if(l!==null&&i!==null){le(s,l,t,i,n)}else if(i!==null){if(e.t!==null){s.textContent=""}ne(s,null,t,i,0,i.length-1)}else if(l!==null){se(l,0,l.length-1)}if(c&&f==="svg"){c=false}}else if(a=s["s-cr"]){a.parentNode.textContent=r}else if(e.t!==r){s.data=r}};const re=e=>{const t=e.childNodes;for(const e of t){if(e.nodeType===1){if(e["s-sr"]){const n=e["s-sn"];e.hidden=false;for(const s of t){if(s!==e){if(s["s-hn"]!==e["s-hn"]||n!==""){if(s.nodeType===1&&(n===s.getAttribute("slot")||n===s["s-sn"])){e.hidden=true;break}}else{if(s.nodeType===1||s.nodeType===3&&s.textContent.trim()!==""){e.hidden=true;break}}}}}re(e)}}};const ae=[];const ue=e=>{let n;let s;let l;for(const o of e.childNodes){if(o["s-sr"]&&(n=o["s-cr"])&&n.parentNode){s=n.parentNode.childNodes;const e=o["s-sn"];for(l=s.length-1;l>=0;l--){n=s[l];if(!n["s-cn"]&&!n["s-nr"]&&n["s-hn"]!==o["s-hn"]&&!t.experimentalSlotFixes){if(de(n,e)){let t=ae.find((e=>e.R===n));i=true;n["s-sn"]=n["s-sn"]||e;if(t){t.R["s-sh"]=o["s-hn"];t.D=o}else{n["s-sh"]=o["s-hn"];ae.push({D:o,R:n})}if(n["s-sr"]){ae.map((e=>{if(de(e.R,n["s-sn"])){t=ae.find((e=>e.R===n));if(t&&!e.D){e.D=t.D}}}))}}else if(!ae.some((e=>e.R===n))){ae.push({R:n})}}}}if(o.nodeType===1){ue(o)}}};const de=(e,t)=>{if(e.nodeType===1){if(e.getAttribute("slot")===null&&t===""){return true}if(e.getAttribute("slot")===t){return true}return false}if(e["s-sn"]===t){return true}return t===""};const $e=e=>{{e.l&&e.l.ref&&e.l.ref(null);e.o&&e.o.map($e)}};const pe=(e,t,c=false)=>{var r,a,u,d;const $=e.$hostElement$;const p=e.L;const m=e.h||O(null,null);const h=D(t)?t:L(null,null,t);l=$.tagName;if(p.M){h.l=h.l||{};p.M.map((([e,t])=>h.l[t]=$[e]))}if(c&&h.l){for(const e of Object.keys(h.l)){if($.hasAttribute(e)&&!["key","ref","style","class"].includes(e)){h.l[e]=$[e]}}}h.p=null;h.$|=4;e.h=h;h.m=m.m=$.shadowRoot||$;{n=$["s-sc"]}o=(p.$&1)!==0;{s=$["s-cr"];i=false}ce(m,h,c);{Xe.$|=1;if(f){ue(h.m);for(const e of ae){const t=e.R;if(!t["s-ol"]){const e=Ve.createTextNode("");e["s-nr"]=t;t.parentNode.insertBefore(t["s-ol"]=e,t)}}for(const e of ae){const t=e.R;const n=e.D;if(n){const e=n.parentNode;let s=n.nextSibling;{let n=(r=t["s-ol"])===null||r===void 0?void 0:r.previousSibling;while(n){let l=(a=n["s-nr"])!==null&&a!==void 0?a:null;if(l&&l["s-sn"]===t["s-sn"]&&e===l.parentNode){l=l.nextSibling;if(!l||!l["s-nr"]){s=l;break}}n=n.previousSibling}}if(!s&&e!==t.parentNode||t.nextSibling!==s){if(t!==s){if(!t["s-hn"]&&t["s-ol"]){t["s-hn"]=t["s-ol"].parentNode.nodeName}e.insertBefore(t,s);if(t.nodeType===1){t.hidden=(u=t["s-ih"])!==null&&u!==void 0?u:false}}}t&&typeof n["s-rf"]==="function"&&n["s-rf"](t)}else{if(t.nodeType===1){if(c){t["s-ih"]=(d=t.hidden)!==null&&d!==void 0?d:false}t.hidden=true}}}}if(i){re(h.m)}Xe.$&=~1;ae.length=0}s=undefined};const me=(e,t)=>{if(t&&!e.F&&t["s-p"]){t["s-p"].push(new Promise((t=>e.F=t)))}};const he=(e,t)=>{{e.$|=16}if(e.$&4){e.$|=512;return}me(e,e.A);const n=()=>ve(e,t);return lt(n)};const ve=(e,t)=>{const n=a("scheduleUpdate",e.L.O);const s=e.N;let l;if(t){{l=xe(s,"componentWillLoad")}}n();return ye(l,(()=>ge(e,s,t)))};const ye=(e,t)=>be(e)?e.then(t):t();const be=e=>e instanceof Promise||e&&e.then&&typeof e.then==="function";const ge=async(e,t,n)=>{var s;const l=e.$hostElement$;const o=a("update",e.L.O);const i=l["s-rc"];if(n){q(e)}const f=a("render",e.L.O);{we(e,t,l,n)}if(i){i.map((e=>e()));l["s-rc"]=undefined}f();o();{const t=(s=l["s-p"])!==null&&s!==void 0?s:[];const n=()=>Se(e);if(t.length===0){n()}else{Promise.all(t).then(n);e.$|=4;t.length=0}}};const we=(e,t,n,s)=>{try{t=t.render();{e.$&=~16}{e.$|=2}{{{pe(e,t,s)}}}}catch(t){Be(t,e.$hostElement$)}return null};const Se=e=>{const t=e.L.O;const n=e.$hostElement$;const s=a("postUpdate",t);const l=e.N;const o=e.A;if(!(e.$&64)){e.$|=64;{Ce(n)}{xe(l,"componentDidLoad")}s();{e.U(n);if(!o){ke()}}}else{{xe(l,"componentDidUpdate")}s()}{if(e.F){e.F();e.F=undefined}if(e.$&512){st((()=>he(e,false)))}e.$&=~(4|512)}};const ke=t=>{{Ce(Ve.documentElement)}st((()=>z(Ke,"appload",{detail:{namespace:e}})))};const xe=(e,t,n)=>{if(e&&e[t]){try{return e[t](n)}catch(e){Be(e)}}return undefined};const Ce=e=>e.classList.add("hydrated");const Te=(e,t)=>Ee(e).P.get(t);const je=(e,t,n,s)=>{const l=Ee(e);const o=l.$hostElement$;const i=l.P.get(t);const f=l.$;const c=l.N;n=E(n,s.W[t][0]);const r=Number.isNaN(i)&&Number.isNaN(n);const a=n!==i&&!r;if((!(f&8)||i===undefined)&&a){l.P.set(t,n);if(c){if(s.I&&f&128){const e=s.I[t];if(e){e.map((e=>{try{c[e](n,i,t)}catch(e){Be(e,o)}}))}}if((f&(2|16))===2){he(l,false)}}}};const Le=(e,t,n)=>{var s;const l=e.prototype;if(t.W){if(e.watchers){t.I=e.watchers}const o=Object.entries(t.W);o.map((([e,[s]])=>{if(s&31||n&2&&s&32){Object.defineProperty(l,e,{get(){return Te(this,e)},set(n){je(this,e,n,t)},configurable:true,enumerable:true})}}));if(n&1){const n=new Map;l.attributeChangedCallback=function(e,s,o){Xe.jmp((()=>{var i;const f=n.get(e);if(this.hasOwnProperty(f)){o=this[f];delete this[f]}else if(l.hasOwnProperty(f)&&typeof this[f]==="number"&&this[f]==o){return}else if(f==null){const n=Ee(this);const l=n===null||n===void 0?void 0:n.$;if(l&&!(l&8)&&l&128&&o!==s){const l=n.N;const f=(i=t.I)===null||i===void 0?void 0:i[e];f===null||f===void 0?void 0:f.forEach((t=>{if(l[t]!=null){l[t].call(l,o,s,e)}}))}return}this[f]=o===null&&typeof this[f]==="boolean"?false:o}))};e.observedAttributes=Array.from(new Set([...Object.keys((s=t.I)!==null&&s!==void 0?s:{}),...o.filter((([e,t])=>t[0]&15)).map((([e,s])=>{var l;const o=s[1]||e;n.set(o,e);if(s[0]&512){(l=t.M)===null||l===void 0?void 0:l.push([e,o])}return o}))]))}}return e};const Oe=async(e,t,n,s)=>{let l;if((t.$&32)===0){t.$|=32;const s=n.B;if(s){l=Qe(n);if(l.then){const e=u();l=await l;e()}if(!l.isProxied){{n.I=l.watchers}Le(l,n,2);l.isProxied=true}const e=a("createInstance",n.O);{t.$|=8}try{new l(t)}catch(e){Be(e)}{t.$&=~8}{t.$|=128}e()}else{l=e.constructor;customElements.whenDefined(n.O).then((()=>t.$|=128))}if(l.style){let e=l.style;const t=K(n);if(!qe.has(t)){const s=a("registerStyles",n.O);H(t,e,!!(n.$&1));s()}}}const o=t.A;const i=()=>he(t,true);if(o&&o["s-rc"]){o["s-rc"].push(i)}else{i()}};const Re=e=>{};const De=e=>{if((Xe.$&1)===0){const t=Ee(e);const n=t.L;const s=a("connectedCallback",n.O);if(!(t.$&1)){t.$|=1;let s;{s=e.getAttribute(h);if(s){if(n.$&1){const t=Q(e.shadowRoot,n);e.classList.remove(t+"-h",t+"-s")}N(e,n.O,s,t)}}if(!s){if(n.$&(4|8)){Me(e)}}{let n=e;while(n=n.parentNode||n.host){if(n.nodeType===1&&n.hasAttribute("s-id")&&n["s-p"]||n["s-p"]){me(t,t.A=n);break}}}if(n.W){Object.entries(n.W).map((([t,[n]])=>{if(n&31&&e.hasOwnProperty(t)){const n=e[t];delete e[t];e[t]=n}}))}{Oe(e,t,n)}}else{if(t===null||t===void 0?void 0:t.N);else if(t===null||t===void 0?void 0:t.H){t.H.then((()=>Re()))}}s()}};const Me=e=>{const t=e["s-cr"]=Ve.createComment("");t["s-cn"]=true;e.insertBefore(t,e.firstChild)};const Fe=e=>{{xe(e,"disconnectedCallback")}};const Ae=async e=>{if((Xe.$&1)===0){const t=Ee(e);if(t===null||t===void 0?void 0:t.N){Fe(t.N)}else if(t===null||t===void 0?void 0:t.H){t.H.then((()=>Fe(t.N)))}}};const Ne=(e,t={})=>{var n;const s=a();const l=[];const o=t.exclude||[];const i=Ke.customElements;const f=Ve.head;const c=f.querySelector("meta[charset]");const r=Ve.createElement("style");const u=[];const d=Ve.querySelectorAll(`[${v}]`);let $;let p=true;let m=0;Object.assign(Xe,t);Xe.q=new URL(t.resourcesUrl||"./",Ve.baseURI).href;{Xe.$|=2}{for(;m<d.length;m++){H(d[m].getAttribute(v),V(d[m].innerHTML),true)}}let h=false;e.map((e=>{e[1].map((t=>{var n;const s={$:t[0],O:t[1],W:t[2],K:t[3]};if(s.$&4){h=true}{s.W=t[2]}{s.M=[]}{s.I=(n=t[4])!==null&&n!==void 0?n:{}}const f=s.O;const c=class extends HTMLElement{constructor(e){super(e);e=this;Ie(e,s);if(s.$&1){{{e.attachShadow({mode:"open"})}}}}connectedCallback(){if($){clearTimeout($);$=null}if(p){u.push(this)}else{Xe.jmp((()=>De(this)))}}disconnectedCallback(){Xe.jmp((()=>Ae(this)))}componentOnReady(){return Ee(this).H}};s.B=e[0];if(!o.includes(f)&&!i.get(f)){l.push(f);i.define(f,Le(c,s,1))}}))}));if(l.length>0){if(h){r.textContent+=g}{r.textContent+=l+b}if(r.innerHTML.length){r.setAttribute("data-styles","");const e=(n=Xe.j)!==null&&n!==void 0?n:j(Ve);if(e!=null){r.setAttribute("nonce",e)}f.insertBefore(r,c?c.nextSibling:f.firstChild)}}p=false;if(u.length){u.map((e=>e.connectedCallback()))}else{{Xe.jmp((()=>$=setTimeout(ke,30)))}}s()};const Ue=e=>Xe.j=e;const Pe=new WeakMap;const Ee=e=>Pe.get(e);const We=(e,t)=>Pe.set(t.N=e,t);const Ie=(e,t)=>{const n={$:0,$hostElement$:e,L:t,P:new Map};{n.H=new Promise((e=>n.U=e));e["s-p"]=[];e["s-rc"]=[]}return Pe.set(e,n)};const ze=(e,t)=>t in e;const Be=(e,t)=>(0,console.error)(e,t);const He=new Map;const Qe=(e,t,n)=>{const s=e.O.replace(/-/g,"_");const l=e.B;const o=He.get(l);if(o){return o[s]}
/*!__STENCIL_STATIC_IMPORT_SWITCH__*/return import(`./${l}.entry.js${""}`).then((e=>{{He.set(l,e)}return e[s]}),Be)};const qe=new Map;const Ke=typeof window!=="undefined"?window:{};const Ve=Ke.document||{head:{}};const Xe={$:0,q:"",jmp:e=>e(),raf:e=>requestAnimationFrame(e),ael:(e,t,n,s)=>e.addEventListener(t,n,s),rel:(e,t,n,s)=>e.removeEventListener(t,n,s),ce:(e,t)=>new CustomEvent(e,t)};const _e=true;const Ge=e=>Promise.resolve(e);const Je=(()=>{try{new CSSStyleSheet;return typeof(new CSSStyleSheet).replaceSync==="function"}catch(e){}return false})();const Ye=[];const Ze=[];const et=(e,t)=>n=>{e.push(n);if(!r){r=true;if(t&&Xe.$&4){st(nt)}else{Xe.raf(nt)}}};const tt=e=>{for(let t=0;t<e.length;t++){try{e[t](performance.now())}catch(e){Be(e)}}e.length=0};const nt=()=>{tt(Ye);{tt(Ze);if(r=Ye.length>0){Xe.raf(nt)}}};const st=e=>Ge().then(e);const lt=et(Ze,true);export{R as H,Ne as b,I as c,W as g,L as h,Ge as p,We as r,Ue as s};
//# sourceMappingURL=p-3cb79cd9.js.map