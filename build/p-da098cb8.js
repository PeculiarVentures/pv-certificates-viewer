const t="pv-certificates-viewer";let e,n,l=0,s=!1;const r=window,o=document,c={t:0,l:"",jmp:t=>t(),raf:t=>requestAnimationFrame(t),ael:(t,e,n,l)=>t.addEventListener(e,n,l),rel:(t,e,n,l)=>t.removeEventListener(e,n,l)},i=(()=>!!o.documentElement.attachShadow)(),a=(()=>{try{return new CSSStyleSheet,!0}catch(t){}return!1})(),u=new WeakMap,f=t=>u.get(t),p=(t,e)=>u.set(e.s=t,e),m=(t,e)=>e in t,w=t=>console.error(t),$=new Map,d=new Map,h=[],y=[],_=[],b=(t,e)=>n=>{t.push(n),s||(s=!0,e&&4&c.t?g(j):c.raf(j))},v=(t,e)=>{let n=0,l=0;for(;n<t.length&&(l=performance.now())<e;)try{t[n++](l)}catch(s){w(s)}n===t.length?t.length=0:0!==n&&t.splice(0,n)},j=()=>{l++,(t=>{for(let n=0;n<t.length;n++)try{t[n](performance.now())}catch(e){w(e)}t.length=0})(h);const t=2==(6&c.t)?performance.now()+10*Math.ceil(l*(1/22)):1/0;v(y,t),v(_,t),y.length>0&&(_.push(...y),y.length=0),(s=h.length+y.length+_.length>0)?c.raf(j):l=0},g=t=>Promise.resolve().then(t),S=b(y,!0),M={},O=t=>"object"==(t=typeof t)||"function"===t,R=()=>r.CSS&&r.CSS.supports&&r.CSS.supports("color","var(--c)")?Promise.resolve():__sc_import_pv_certificates_viewer("./p-d8631f0b.js").then(()=>{c.o=r.__stencil_cssshim}),U=async()=>{c.o=r.__stencil_cssshim;const e=new RegExp(`/${t}(\\.esm)?\\.js($|\\?|#)`),n=Array.from(o.querySelectorAll("script")).find(n=>e.test(n.src)||n.getAttribute("data-stencil-namespace")===t),l=n["data-opts"];{const t=new URL(".",new URL(n.getAttribute("data-resources-url")||n.src,r.location.href));return L(t.href),window.customElements||await __sc_import_pv_certificates_viewer("./p-d0882b30.js"),Object.assign(Object.assign({},l),{resourcesUrl:t.href})}},L=e=>{const n=(t=>`__sc_import_${t.replace(/\s|-/g,"_")}`)(t);try{r[n]=new Function("w",`return import(w);//${Math.random()}`)}catch(l){const t=new Map;r[n]=l=>{const s=new URL(l,e).href;let c=t.get(s);if(!c){const e=o.createElement("script");e.type="module",e.src=URL.createObjectURL(new Blob([`import * as m from '${s}'; window.${n}.m = m;`],{type:"application/javascript"})),c=new Promise(t=>{e.onload=()=>{t(r[n].m),e.remove()}}),t.set(s,c),o.head.appendChild(e)}return c}}},k=new WeakMap,P=t=>"sc-"+t,x=(t,e,...n)=>{let l=null,s=!1,r=!1,o=[];const c=e=>{for(let n=0;n<e.length;n++)l=e[n],Array.isArray(l)?c(l):null!=l&&"boolean"!=typeof l&&((s="function"!=typeof t&&!O(l))&&(l=String(l)),s&&r?o[o.length-1].i+=l:o.push(s?C(null,l):l),r=s)};if(c(n),e){const t=e.className||e.class;t&&(e.class="object"!=typeof t?t:Object.keys(t).filter(e=>t[e]).join(" "))}const i=C(t,null);return i.u=e,o.length>0&&(i.p=o),i},C=(t,e)=>({t:0,$:t,i:e,h:null,p:null,u:null}),A={},E=(t,e,n,l,s,o)=>{if(n===l)return;let i=m(t,e),a=e.toLowerCase();if("class"===e){const e=t.classList,s=W(n),r=W(l);e.remove(...s.filter(t=>t&&!r.includes(t))),e.add(...r.filter(t=>t&&!s.includes(t)))}else if(i||"o"!==e[0]||"n"!==e[1]){const r=O(l);if((i||r&&null!==l)&&!s)try{if(t.tagName.includes("-"))t[e]=l;else{let s=null==l?"":l;"list"===e?i=!1:null!=n&&t[e]==s||(t[e]=s)}}catch(u){}null==l||!1===l?t.removeAttribute(e):(!i||4&o||s)&&!r&&t.setAttribute(e,l=!0===l?"":l)}else e="-"===e[2]?e.slice(3):m(r,a)?a.slice(2):a[2]+e.slice(3),n&&c.rel(t,e,n,!1),l&&c.ael(t,e,l,!1)},T=/\s/,W=t=>t?t.split(T):[],F=(t,e,n,l)=>{const s=11===e.h.nodeType&&e.h.host?e.h.host:e.h,r=t&&t.u||M,o=e.u||M;for(l in r)l in o||E(s,l,r[l],void 0,n,e.t);for(l in o)E(s,l,r[l],o[l],n,e.t)},H=(t,n,l)=>{let s,r,c=n.p[l],i=0;if(null!==c.i)s=c.h=o.createTextNode(c.i);else if(s=c.h=o.createElement(c.$),F(null,c,!1),(t=>null!=t)(e)&&s["s-si"]!==e&&s.classList.add(s["s-si"]=e),c.p)for(i=0;i<c.p.length;++i)(r=H(t,c,i))&&s.appendChild(r);return s},q=(t,e,l,s,r,o)=>{let c,i=t;for(i.shadowRoot&&i.tagName===n&&(i=i.shadowRoot);r<=o;++r)s[r]&&(c=H(null,l,r))&&(s[r].h=c,i.insertBefore(c,e))},B=(t,e,n,l)=>{for(;e<=n;++e)(l=t[e])&&l.h.remove()},N=(t,e)=>t.$===e.$,V=(t,e)=>{const n=e.h=t.h,l=t.p,s=e.p;null===e.i?(F(t,e,!1),null!==l&&null!==s?((t,e,n,l)=>{let s,r=0,o=0,c=e.length-1,i=e[0],a=e[c],u=l.length-1,f=l[0],p=l[u];for(;r<=c&&o<=u;)null==i?i=e[++r]:null==a?a=e[--c]:null==f?f=l[++o]:null==p?p=l[--u]:N(i,f)?(V(i,f),i=e[++r],f=l[++o]):N(a,p)?(V(a,p),a=e[--c],p=l[--u]):N(i,p)?(V(i,p),t.insertBefore(i.h,a.h.nextSibling),i=e[++r],p=l[--u]):N(a,f)?(V(a,f),t.insertBefore(a.h,i.h),a=e[--c],f=l[++o]):(s=H(e&&e[o],n,o),f=l[++o],s&&i.h.parentNode.insertBefore(s,i.h));r>c?q(t,null==l[u+1]?null:l[u+1].h,n,l,o,u):o>u&&B(e,r,c)})(n,l,e,s):null!==s?(null!==t.i&&(n.textContent=""),q(n,null,e,s,0,s.length-1)):null!==l&&B(l,0,l.length-1)):t.i!==e.i&&(n.data=e.i)},z=(t,e)=>{e&&!t._&&e["s-p"].push(new Promise(e=>t._=e))},D=(t,e,n,l)=>{if(e.t|=16,4&e.t)return void(e.t|=512);const s=e.s,r=()=>G(t,e,n,s,l);let o;return z(e,e.v),l&&(o=K(s,"componentWillLoad")),Q(o,()=>S(r))},G=(t,l,s,r,c)=>{const a=t["s-rc"];c&&((t,e)=>{const n=((t,e)=>{let n=P(e.j),l=d.get(n);if(t=11===t.nodeType?t:o,l)if("string"==typeof l){let e,s=k.get(t=t.head||t);s||k.set(t,s=new Set),s.has(n)||((e=o.createElement("style")).innerHTML=l,t.insertBefore(e,t.querySelector("link")),s&&s.add(n))}else t.adoptedStyleSheets.includes(l)||(t.adoptedStyleSheets=[...t.adoptedStyleSheets,l]);return n})(i&&t.shadowRoot?t.shadowRoot:t.getRootNode(),e);10&e.t&&(t["s-sc"]=n,t.classList.add(n+"-h"))})(t,s);try{((t,l,s,r)=>{n=t.tagName;const o=l.g||C(null,null),c=(t=>t&&t.$===A)(r)?r:x(null,null,r);c.$=null,c.t|=4,l.g=c,c.h=o.h=t.shadowRoot||t,e=t["s-sc"],V(o,c)})(t,l,0,r.render())}catch(u){w(u)}l.t&=-17,l.t|=2,a&&(a.forEach(t=>t()),t["s-rc"]=void 0);{const e=t["s-p"],n=()=>I(t,l,s);0===e.length?n():(Promise.all(e).then(n),l.t|=4,e.length=0)}},I=(t,e,n)=>{const l=e.v;64&e.t||(e.t|=64,t.classList.add("hydrated"),e.S(t),l||J()),e._&&(e._(),e._=void 0),512&e.t&&g(()=>D(t,e,n,!1)),e.t&=-517},J=()=>{o.documentElement.classList.add("hydrated"),c.t|=2},K=(t,e,n)=>{if(t&&t[e])try{return t[e](n)}catch(l){w(l)}},Q=(t,e)=>t&&t.then?t.then(e):e(),X=(t,e,n)=>{if(e.M){t.watchers&&(e.O=t.watchers);const l=Object.entries(e.M),s=t.prototype;if(l.forEach(([t,[l]])=>{(31&l||2&n&&32&l)&&Object.defineProperty(s,t,{get(){return((t,e)=>f(t).R.get(e))(this,t)},set(n){((t,e,n,l)=>{const s=f(this),r=s.U,o=s.R.get(e),c=s.t,i=s.s;if(!((n=((t,e)=>null==t||O(t)?t:1&e?String(t):t)(n,l.M[e][0]))===o||8&c&&void 0!==o)&&(s.R.set(e,n),i)){if(l.O&&128&c){const t=l.O[e];t&&t.forEach(t=>{try{i[t](n,o,e)}catch(l){w(l)}})}2==(18&c)&&D(r,s,l,!1)}})(0,t,n,e)},configurable:!0,enumerable:!0})}),1&n){const e=new Map;s.attributeChangedCallback=function(t,n,l){c.jmp(()=>{const n=e.get(t);this[n]=(null!==l||"boolean"!=typeof this[n])&&l})},t.observedAttributes=l.filter(([t,e])=>15&e[0]).map(([t,n])=>{const l=n[1]||t;return e.set(l,t),l})}}return t},Y=(t,e={})=>{const n=[],l=e.exclude||[],s=o.head,p=r.customElements,m=s.querySelector("meta[charset]"),h=o.createElement("style"),y=[];let _,b=!0;Object.assign(c,e),c.l=new URL(e.resourcesUrl||"./",o.baseURI).href,e.syncQueue&&(c.t|=4),t.forEach(t=>t[1].forEach(e=>{const s={t:e[0],j:e[1],M:e[2],L:e[3]};s.M=e[2],s.O={},!i&&1&s.t&&(s.t|=8);const r=s.j,o=class extends HTMLElement{constructor(t){super(t),(t=>{const e={t:0,U:t,R:new Map};e.k=new Promise(t=>e.S=t),t["s-p"]=[],t["s-rc"]=[],u.set(t,e)})(t=this),1&s.t&&(i?t.attachShadow({mode:"open"}):"shadowRoot"in t||(t.shadowRoot=t))}connectedCallback(){_&&(clearTimeout(_),_=null),b?y.push(this):c.jmp(()=>((t,e)=>{if(0==(1&c.t)){const n=()=>{},l=f(t);if(!(1&l.t)){l.t|=1;{let e=t;for(;e=e.parentNode||e.host;)if(e["s-p"]){z(l,l.v=e);break}}e.M&&Object.entries(e.M).forEach(([e,[n]])=>{if(31&n&&t.hasOwnProperty(e)){const n=t[e];delete t[e],t[e]=n}}),g(()=>(async(t,e,n,l,s)=>{if(0==(32&e.t)){e.t|=32;{if((s=(t=>{const e=t.j.replace(/-/g,"_"),n=t.P,l=$.get(n);return l?l[e]:__sc_import_pv_certificates_viewer(`./${n}.entry.js`).then(t=>($.set(n,t),t[e]),w)})(n)).then){const t=()=>{};s=await s,t()}s.isProxied||(n.O=s.watchers,X(s,n,2),s.isProxied=!0);const t=()=>{};e.t|=8;try{new s(e)}catch(c){w(c)}e.t&=-9,e.t|=128,t()}const t=P(n.j);if(!d.has(t)&&s.style){const e=()=>{};let l=s.style;8&n.t&&(l=await __sc_import_pv_certificates_viewer("./p-affe7c09.js").then(e=>e.scopeCss(l,t,!1))),((t,e,n)=>{let l=d.get(t);a&&n?(l=l||new CSSStyleSheet).replace(e):l=e,d.set(t,l)})(t,l,!!(1&n.t)),e()}}const r=e.v,o=()=>D(t,e,n,!0);r&&r["s-rc"]?r["s-rc"].push(o):o()})(t,l,e))}n()}})(this,s))}disconnectedCallback(){c.jmp(()=>void 0)}"s-hmr"(t){}forceUpdate(){((t,e)=>{{const n=f(t);2==(18&n.t)&&D(t,n,e,!1)}})(this,s)}componentOnReady(){return f(this).k}};s.P=t[0],l.includes(r)||p.get(r)||(n.push(r),p.define(r,X(o,s,1)))})),h.innerHTML=n+"{visibility:hidden}.hydrated{visibility:inherit}",h.setAttribute("data-styles",""),s.insertBefore(h,m?m.nextSibling:s.firstChild),b=!1,y.length>0?y.forEach(t=>t.connectedCallback()):c.jmp(()=>_=setTimeout(J,30,"timeout"))};export{A as H,R as a,Y as b,x as h,U as p,p as r};