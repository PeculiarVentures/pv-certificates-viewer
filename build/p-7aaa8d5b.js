const e="pv-certificates-viewer";let t,n,o,s=0,r=!1,l=!1,c=!1,i=!1;const a=window,f=document,u={t:0,o:"",jmp:e=>e(),raf:e=>requestAnimationFrame(e),ael:(e,t,n,o)=>e.addEventListener(t,n,o),rel:(e,t,n,o)=>e.removeEventListener(t,n,o)},p=(()=>!!f.documentElement.attachShadow)(),m=(()=>{try{return new CSSStyleSheet,!0}catch(e){}return!1})(),$=new WeakMap,w=e=>$.get(e),d=(e,t)=>$.set(t.s=e,t),_=e=>console.error(e),y=new Map,h=new Map,v=[],b=[],g=[],j=(e,t)=>n=>{e.push(n),r||(r=!0,t&&4&u.t?k(S):u.raf(S))},R=(e,t)=>{let n=0,o=0;for(;n<e.length&&(o=performance.now())<t;)try{e[n++](o)}catch(s){_(s)}n===e.length?e.length=0:0!==n&&e.splice(0,n)},S=()=>{s++,(e=>{for(let n=0;n<e.length;n++)try{e[n](performance.now())}catch(t){_(t)}e.length=0})(v);const e=2==(6&u.t)?performance.now()+10*Math.ceil(s*(1/22)):1/0;R(b,e),R(g,e),b.length>0&&(g.push(...b),b.length=0),(r=v.length+b.length+g.length>0)?u.raf(S):s=0},k=e=>Promise.resolve().then(e),M=j(b,!0),U=e=>"object"==(e=typeof e)||"function"===e,L=()=>a.CSS&&a.CSS.supports&&a.CSS.supports("color","var(--c)")?Promise.resolve():__sc_import_pv_certificates_viewer("./p-d8631f0b.js").then(()=>{u.l=a.__stencil_cssshim}),P=async()=>{u.l=a.__stencil_cssshim;const t=new RegExp(`/${e}(\\.esm)?\\.js($|\\?|#)`),n=Array.from(f.querySelectorAll("script")).find(n=>t.test(n.src)||n.getAttribute("data-stencil-namespace")===e),o=n["data-opts"];{const e=new URL(".",new URL(n.getAttribute("data-resources-url")||n.src,a.location.href));return x(e.href),window.customElements||await __sc_import_pv_certificates_viewer("./p-d0882b30.js"),Object.assign(Object.assign({},o),{resourcesUrl:e.href})}},x=t=>{const n=(e=>`__sc_import_${e.replace(/\s|-/g,"_")}`)(e);try{a[n]=new Function("w",`return import(w);//${Math.random()}`)}catch(o){const e=new Map;a[n]=o=>{const s=new URL(o,t).href;let r=e.get(s);if(!r){const t=f.createElement("script");t.type="module",t.src=URL.createObjectURL(new Blob([`import * as m from '${s}'; window.${n}.m = m;`],{type:"application/javascript"})),r=new Promise(e=>{t.onload=()=>{e(a[n].m),t.remove()}}),e.set(s,r),f.head.appendChild(t)}return r}}},C=new WeakMap,O=e=>"sc-"+e,T=(e,t,...n)=>{let o=null,s=null,r=!1,l=!1,c=[];const i=t=>{for(let n=0;n<t.length;n++)o=t[n],Array.isArray(o)?i(o):null!=o&&"boolean"!=typeof o&&((r="function"!=typeof e&&!U(o))&&(o=String(o)),r&&l?c[c.length-1].i+=o:c.push(r?A(null,o):o),l=r)};i(n),t&&t.name&&(s=t.name);const a=A(e,null);return a.u=t,c.length>0&&(a.p=c),a.$=s,a},A=(e,t)=>({t:0,_:e,i:t,h:null,p:null,$:null}),E={},F=(e,s,r,c)=>{let a,u,p,m=s.p[r],$=0;if(l||(i=!0,"slot"===m._&&(t&&c.classList.add(t+"-s"),m.t|=m.p?2:1)),1&m.t)a=m.h=f.createTextNode("");else if(a=m.h=f.createElement(2&m.t?"slot-fb":m._),(e=>null!=e)(t)&&a["s-si"]!==t&&a.classList.add(a["s-si"]=t),m.p)for($=0;$<m.p.length;++$)(u=F(e,m,$,a))&&a.appendChild(u);return a["s-hn"]=o,3&m.t&&(a["s-sr"]=!0,a["s-cr"]=n,a["s-sn"]=m.$||"",(p=e&&e.p&&e.p[r])&&p._===m._&&e.h&&H(e.h,!1)),a},H=(e,t)=>{u.t|=1;const n=e.childNodes;for(let s=n.length-1;s>=0;s--){const e=n[s];e["s-hn"]!==o&&e["s-ol"]&&(W(e).insertBefore(e,N(e)),e["s-ol"].remove(),e["s-ol"]=void 0,i=!0),t&&H(e,t)}u.t&=-2},N=e=>e&&e["s-ol"]||e,W=e=>(e["s-ol"]?e["s-ol"]:e).parentNode,q=e=>{let t,n,o,s,r,l,c=e.childNodes;for(n=0,o=c.length;n<o;n++)if(1===(t=c[n]).nodeType){if(t["s-sr"])for(r=t["s-sn"],t.hidden=!1,s=0;s<o;s++)if(c[s]["s-hn"]!==t["s-hn"])if(l=c[s].nodeType,""!==r){if(1===l&&r===c[s].getAttribute("slot")){t.hidden=!0;break}}else if(1===l||3===l&&""!==c[s].textContent.trim()){t.hidden=!0;break}q(t)}},B=[],V=e=>{let t,n,o,s,r=e.childNodes,l=r.length,i=0,a=0,f=0;for(l=r.length;i<l;i++){if((t=r[i])["s-sr"]&&(n=t["s-cr"]))for(s=t["s-sn"],a=(o=n.parentNode.childNodes).length-1;a>=0;a--)(n=o[a])["s-cn"]||n["s-nr"]||n["s-hn"]===t["s-hn"]||((3===(f=n.nodeType)||8===f)&&""===s||1===f&&null===n.getAttribute("slot")&&""===s||1===f&&n.getAttribute("slot")===s)&&(B.some(e=>e.v===n)||(c=!0,n["s-sn"]=s,B.push({g:t,v:n})));1===t.nodeType&&V(t)}},z=(e,t)=>{t&&!e.j&&t["s-p"].push(new Promise(t=>e.j=t))},D=(e,t,n,o)=>{if(4&t.t)return void(t.t|=512);const s=t.s,r=()=>G(e,t,n,s,o);return z(t,t.R),K(void 0,()=>M(r))},G=(e,s,r,a,m)=>{const $=e["s-rc"];m&&((e,t)=>{const n=((e,t)=>{let n=O(t.S),o=h.get(n);if(e=11===e.nodeType?e:f,o)if("string"==typeof o){let t,s=C.get(e=e.head||e);s||C.set(e,s=new Set),s.has(n)||((t=f.createElement("style")).innerHTML=o,e.insertBefore(t,e.querySelector("link")),s&&s.add(n))}else e.adoptedStyleSheets.includes(o)||(e.adoptedStyleSheets=[...e.adoptedStyleSheets,o]);return n})(p&&e.shadowRoot?e.shadowRoot:e.getRootNode(),t);10&t.t&&(e["s-sc"]=n,e.classList.add(n+"-h"))})(e,r);try{((e,s,r,a)=>{o=e.tagName;const m=s.k||A(null,null),$=(e=>e&&e._===E)(a)?a:T(null,null,a);if($._=null,$.t|=4,s.k=$,$.h=m.h=e.shadowRoot||e,t=e["s-sc"],n=e["s-cr"],l=p&&0!=(1&r.t),c=!1,((e,t)=>{const n=t.h=e.h,s=t.p;null!==s&&((e,t,n,s,r,l)=>{let c,i=e["s-cr"]&&e["s-cr"].parentNode||e;for(i.shadowRoot&&i.tagName===o&&(i=i.shadowRoot);r<=l;++r)s[r]&&(c=F(null,n,r,e))&&(s[r].h=c,i.insertBefore(c,N(null)))})(n,0,t,s,0,s.length-1)})(m,$),i){V($.h);for(let e=0;e<B.length;e++){const t=B[e];if(!t.v["s-ol"]){const e=f.createTextNode("");e["s-nr"]=t.v,t.v.parentNode.insertBefore(t.v["s-ol"]=e,t.v)}}u.t|=1;for(let e=0;e<B.length;e++){const t=B[e],n=t.g.parentNode;let o=t.g.nextSibling,s=t.v["s-ol"];for(;s=s.previousSibling;){let e=s["s-nr"];if(e&&e["s-sn"]===t.v["s-sn"]&&n===e.parentNode&&(!(e=e.nextSibling)||!e["s-nr"])){o=e;break}}(!o&&n!==t.v.parentNode||t.v.nextSibling!==o)&&t.v!==o&&n.insertBefore(t.v,o)}u.t&=-2}c&&q($.h),B.length=0})(e,s,r,a.render())}catch(w){_(w)}s.t|=2,$&&($.forEach(e=>e()),e["s-rc"]=void 0);{const t=e["s-p"],n=()=>I(e,s,r);0===t.length?n():(Promise.all(t).then(n),s.t|=4,t.length=0)}},I=(e,t,n)=>{const o=t.R;64&t.t||(t.t|=64,e.classList.add("hydrated"),t.M(e),o||J()),t.j&&(t.j(),t.j=void 0),512&t.t&&k(()=>D(e,t,n,!1)),t.t&=-517},J=()=>{f.documentElement.classList.add("hydrated"),u.t|=2},K=(e,t)=>e&&e.then?e.then(t):t(),Q=(e,t={})=>{const n=[],o=t.exclude||[],s=f.head,r=a.customElements,l=s.querySelector("meta[charset]"),c=f.createElement("style"),i=[];let d,v=!0;Object.assign(u,t),u.o=new URL(t.resourcesUrl||"./",f.baseURI).href,t.syncQueue&&(u.t|=4),e.forEach(e=>e[1].forEach(t=>{const s={t:t[0],S:t[1],U:t[2],L:t[3]};!p&&1&s.t&&(s.t|=8);const l=s.S,c=class extends HTMLElement{constructor(e){super(e),(e=>{const t={t:0,P:e,C:new Map};t.O=new Promise(e=>t.M=e),e["s-p"]=[],e["s-rc"]=[],$.set(e,t)})(e=this),1&s.t&&(p?e.attachShadow({mode:"open"}):"shadowRoot"in e||(e.shadowRoot=e))}connectedCallback(){d&&(clearTimeout(d),d=null),v?i.push(this):u.jmp(()=>((e,t)=>{if(0==(1&u.t)){const n=()=>{},o=w(e);if(!(1&o.t)){let n;o.t|=1,n||(4&t.t||8&t.t)&&(e=>{const t=e["s-cr"]=f.createComment("");t["s-cn"]=!0,e.insertBefore(t,e.firstChild)})(e);{let t=e;for(;t=t.parentNode||t.host;)if(t["s-p"]){z(o,o.R=t);break}}k(()=>(async(e,t,n,o,s)=>{if(0==(32&t.t)){t.t|=32;{if((s=(e=>{const t=e.S.replace(/-/g,"_"),n=e.T,o=y.get(n);return o?o[t]:__sc_import_pv_certificates_viewer(`./${n}.entry.js`).then(e=>(y.set(n,e),e[t]),_)})(n)).then){const e=()=>{};s=await s,e()}const e=()=>{};try{new s(t)}catch(c){_(c)}e()}const e=O(n.S);if(!h.has(e)&&s.style){const t=()=>{};let o=s.style;8&n.t&&(o=await __sc_import_pv_certificates_viewer("./p-affe7c09.js").then(t=>t.scopeCss(o,e,!1))),((e,t,n)=>{let o=h.get(e);m&&n?(o=o||new CSSStyleSheet).replace(t):o=t,h.set(e,o)})(e,o,!!(1&n.t)),t()}}const r=t.R,l=()=>D(e,t,n,!0);r&&r["s-rc"]?r["s-rc"].push(l):l()})(e,o,t))}n()}})(this,s))}disconnectedCallback(){u.jmp(()=>void 0)}"s-hmr"(e){}forceUpdate(){}componentOnReady(){return w(this).O}};s.T=e[0],o.includes(l)||r.get(l)||(n.push(l),r.define(l,(e=>e)(c)))})),c.innerHTML=n+"{visibility:hidden}.hydrated{visibility:inherit}",c.setAttribute("data-styles",""),s.insertBefore(c,l?l.nextSibling:s.firstChild),v=!1,i.length>0?i.forEach(e=>e.connectedCallback()):u.jmp(()=>d=setTimeout(J,30,"timeout"))};export{E as H,L as a,Q as b,T as h,P as p,d as r};