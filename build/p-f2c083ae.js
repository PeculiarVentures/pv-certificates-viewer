const e="pv-certificates-viewer";let t,n,l,s=0,o=!1,r=!1,i=!1,c=!1,a=!1;const f=window,u=document,p={t:0,l:"",jmp:e=>e(),raf:e=>requestAnimationFrame(e),ael:(e,t,n,l)=>e.addEventListener(t,n,l),rel:(e,t,n,l)=>e.removeEventListener(t,n,l)},w=(()=>!!u.documentElement.attachShadow)(),$=(()=>{try{return new CSSStyleSheet,!0}catch(e){}return!1})(),m=new WeakMap,d=e=>m.get(e),h=(e,t)=>m.set(t.s=e,t),y=(e,t)=>t in e,b=e=>console.error(e),_=new Map,v=new Map,g=[],j=[],k=[],O=(e,t)=>n=>{e.push(n),o||(o=!0,t&&4&p.t?R(M):p.raf(M))},S=(e,t)=>{let n=0,l=0;for(;n<e.length&&(l=performance.now())<t;)try{e[n++](l)}catch(s){b(s)}n===e.length?e.length=0:0!==n&&e.splice(0,n)},M=()=>{s++,(e=>{for(let n=0;n<e.length;n++)try{e[n](performance.now())}catch(t){b(t)}e.length=0})(g);const e=2==(6&p.t)?performance.now()+10*Math.ceil(s*(1/22)):1/0;S(j,e),S(k,e),j.length>0&&(k.push(...j),j.length=0),(o=g.length+j.length+k.length>0)?p.raf(M):s=0},R=e=>Promise.resolve().then(e),U=O(j,!0),L={},P=e=>"object"==(e=typeof e)||"function"===e,x=()=>f.CSS&&f.CSS.supports&&f.CSS.supports("color","var(--c)")?Promise.resolve():__sc_import_pv_certificates_viewer("./p-d8631f0b.js").then(()=>{p.o=f.__stencil_cssshim}),C=async()=>{p.o=f.__stencil_cssshim;const t=new RegExp(`/${e}(\\.esm)?\\.js($|\\?|#)`),n=Array.from(u.querySelectorAll("script")).find(n=>t.test(n.src)||n.getAttribute("data-stencil-namespace")===e),l=n["data-opts"];{const e=new URL(".",new URL(n.getAttribute("data-resources-url")||n.src,f.location.href));return T(e.href),window.customElements||await __sc_import_pv_certificates_viewer("./p-d0882b30.js"),Object.assign(Object.assign({},l),{resourcesUrl:e.href})}},T=t=>{const n=(e=>`__sc_import_${e.replace(/\s|-/g,"_")}`)(e);try{f[n]=new Function("w",`return import(w);//${Math.random()}`)}catch(l){const e=new Map;f[n]=l=>{const s=new URL(l,t).href;let o=e.get(s);if(!o){const t=u.createElement("script");t.type="module",t.src=URL.createObjectURL(new Blob([`import * as m from '${s}'; window.${n}.m = m;`],{type:"application/javascript"})),o=new Promise(e=>{t.onload=()=>{e(f[n].m),t.remove()}}),e.set(s,o),u.head.appendChild(t)}return o}}},A=new WeakMap,E=e=>"sc-"+e,W=(e,t,...n)=>{let l=null,s=null,o=null,r=!1,i=!1,c=[];const a=t=>{for(let n=0;n<t.length;n++)l=t[n],Array.isArray(l)?a(l):null!=l&&"boolean"!=typeof l&&((r="function"!=typeof e&&!P(l))&&(l=String(l)),r&&i?c[c.length-1].i+=l:c.push(r?F(null,l):l),i=r)};if(a(n),t){t.key&&(s=t.key),t.name&&(o=t.name);{const e=t.className||t.class;e&&(t.class="object"!=typeof e?e:Object.keys(e).filter(t=>e[t]).join(" "))}}const f=F(e,null);return f.u=t,c.length>0&&(f.p=c),f.$=s,f.h=o,f},F=(e,t)=>({t:0,_:e,i:t,v:null,p:null,u:null,$:null,h:null}),H={},N=(e,t,n,l,s,o)=>{if(n===l)return;let r=y(e,t),i=t.toLowerCase();if("class"===t){const t=e.classList,s=B(n),o=B(l);t.remove(...s.filter(e=>e&&!o.includes(e))),t.add(...o.filter(e=>e&&!s.includes(e)))}else if("key"===t);else if(r||"o"!==t[0]||"n"!==t[1]){const i=P(l);if((r||i&&null!==l)&&!s)try{if(e.tagName.includes("-"))e[t]=l;else{let s=null==l?"":l;"list"===t?r=!1:null!=n&&e[t]==s||(e[t]=s)}}catch(c){}null==l||!1===l?e.removeAttribute(t):(!r||4&o||s)&&!i&&e.setAttribute(t,l=!0===l?"":l)}else t="-"===t[2]?t.slice(3):y(f,i)?i.slice(2):i[2]+t.slice(3),n&&p.rel(e,t,n,!1),l&&p.ael(e,t,l,!1)},q=/\s/,B=e=>e?e.split(q):[],V=(e,t,n,l)=>{const s=11===t.v.nodeType&&t.v.host?t.v.host:t.v,o=e&&e.u||L,r=t.u||L;for(l in o)l in r||N(s,l,o[l],void 0,n,t.t);for(l in r)N(s,l,o[l],r[l],n,t.t)},z=(e,s,o,i)=>{let f,p,w,$=s.p[o],m=0;if(r||(c=!0,"slot"===$._&&(t&&i.classList.add(t+"-s"),$.t|=$.p?2:1)),null!==$.i)f=$.v=u.createTextNode($.i);else if(1&$.t)f=$.v=u.createTextNode("");else{if(a||(a="svg"===$._),f=$.v=u.createElementNS(a?"http://www.w3.org/2000/svg":"http://www.w3.org/1999/xhtml",2&$.t?"slot-fb":$._),a&&"foreignObject"===$._&&(a=!1),V(null,$,a),(e=>null!=e)(t)&&f["s-si"]!==t&&f.classList.add(f["s-si"]=t),$.p)for(m=0;m<$.p.length;++m)(p=z(e,$,m,f))&&f.appendChild(p);"svg"===$._?a=!1:"foreignObject"===f.tagName&&(a=!0)}return f["s-hn"]=l,3&$.t&&(f["s-sr"]=!0,f["s-cr"]=n,f["s-sn"]=$.h||"",(w=e&&e.p&&e.p[o])&&w._===$._&&e.v&&D(e.v,!1)),f},D=(e,t)=>{p.t|=1;const n=e.childNodes;for(let s=n.length-1;s>=0;s--){const e=n[s];e["s-hn"]!==l&&e["s-ol"]&&(Q(e).insertBefore(e,K(e)),e["s-ol"].remove(),e["s-ol"]=void 0,c=!0),t&&D(e,t)}p.t&=-2},G=(e,t,n,s,o,r)=>{let i,c=e["s-cr"]&&e["s-cr"].parentNode||e;for(c.shadowRoot&&c.tagName===l&&(c=c.shadowRoot);o<=r;++o)s[o]&&(i=z(null,n,o,e))&&(s[o].v=i,c.insertBefore(i,K(t)))},I=(e,t,n,l,s)=>{for(;t<=n;++t)(l=e[t])&&(i=!0,(s=l.v)["s-ol"]?s["s-ol"].remove():D(s,!0),s.remove())},J=(e,t)=>e._===t._&&("slot"===e._?e.h===t.h:e.$===t.$),K=e=>e&&e["s-ol"]||e,Q=e=>(e["s-ol"]?e["s-ol"]:e).parentNode,X=(e,t)=>{const n=t.v=e.v,l=e.p,s=t.p;let o;a=n&&n.parentNode&&void 0!==n.ownerSVGElement,a="svg"===t._||"foreignObject"!==t._&&a,null===t.i?("slot"===t._||V(e,t,a),null!==l&&null!==s?((e,t,n,l)=>{let s,o,r=0,i=0,c=0,a=0,f=t.length-1,u=t[0],p=t[f],w=l.length-1,$=l[0],m=l[w];for(;r<=f&&i<=w;)if(null==u)u=t[++r];else if(null==p)p=t[--f];else if(null==$)$=l[++i];else if(null==m)m=l[--w];else if(J(u,$))X(u,$),u=t[++r],$=l[++i];else if(J(p,m))X(p,m),p=t[--f],m=l[--w];else if(J(u,m))"slot"!==u._&&"slot"!==m._||D(u.v.parentNode,!1),X(u,m),e.insertBefore(u.v,p.v.nextSibling),u=t[++r],m=l[--w];else if(J(p,$))"slot"!==u._&&"slot"!==m._||D(p.v.parentNode,!1),X(p,$),e.insertBefore(p.v,u.v),p=t[--f],$=l[++i];else{for(c=-1,a=r;a<=f;++a)if(t[a]&&null!==t[a].$&&t[a].$===$.$){c=a;break}c>=0?((o=t[c])._!==$._?s=z(t&&t[i],n,c,e):(X(o,$),t[c]=void 0,s=o.v),$=l[++i]):(s=z(t&&t[i],n,i,e),$=l[++i]),s&&Q(u.v).insertBefore(s,K(u.v))}r>f?G(e,null==l[w+1]?null:l[w+1].v,n,l,i,w):i>w&&I(t,r,f)})(n,l,t,s):null!==s?(null!==e.i&&(n.textContent=""),G(n,null,t,s,0,s.length-1)):null!==l&&I(l,0,l.length-1)):(o=n["s-cr"])?o.parentNode.textContent=t.i:e.i!==t.i&&(n.data=t.i),a&&"svg"===t._&&(a=!1)},Y=e=>{let t,n,l,s,o,r,i=e.childNodes;for(n=0,l=i.length;n<l;n++)if(1===(t=i[n]).nodeType){if(t["s-sr"])for(o=t["s-sn"],t.hidden=!1,s=0;s<l;s++)if(i[s]["s-hn"]!==t["s-hn"])if(r=i[s].nodeType,""!==o){if(1===r&&o===i[s].getAttribute("slot")){t.hidden=!0;break}}else if(1===r||3===r&&""!==i[s].textContent.trim()){t.hidden=!0;break}Y(t)}},Z=[],ee=e=>{let t,n,l,s,o=e.childNodes,r=o.length,c=0,a=0,f=0;for(r=o.length;c<r;c++){if((t=o[c])["s-sr"]&&(n=t["s-cr"]))for(s=t["s-sn"],a=(l=n.parentNode.childNodes).length-1;a>=0;a--)(n=l[a])["s-cn"]||n["s-nr"]||n["s-hn"]===t["s-hn"]||((3===(f=n.nodeType)||8===f)&&""===s||1===f&&null===n.getAttribute("slot")&&""===s||1===f&&n.getAttribute("slot")===s)&&(Z.some(e=>e.g===n)||(i=!0,n["s-sn"]=s,Z.push({j:t,g:n})));1===t.nodeType&&ee(t)}},te=(e,t)=>{t&&!e.k&&t["s-p"].push(new Promise(t=>e.k=t))},ne=(e,t,n,l)=>{if(t.t|=16,4&t.t)return void(t.t|=512);const s=t.s,o=()=>le(e,t,n,s,l);let r;return te(t,t.O),l&&(r=re(s,"componentWillLoad")),ie(r,()=>U(o))},le=(e,s,o,a,f)=>{const $=e["s-rc"];f&&((e,t)=>{const n=((e,t)=>{let n=E(t.S),l=v.get(n);if(e=11===e.nodeType?e:u,l)if("string"==typeof l){let t,s=A.get(e=e.head||e);s||A.set(e,s=new Set),s.has(n)||((t=u.createElement("style")).innerHTML=l,e.insertBefore(t,e.querySelector("link")),s&&s.add(n))}else e.adoptedStyleSheets.includes(l)||(e.adoptedStyleSheets=[...e.adoptedStyleSheets,l]);return n})(w&&e.shadowRoot?e.shadowRoot:e.getRootNode(),t);10&t.t&&(e["s-sc"]=n,e.classList.add(n+"-h"))})(e,o);try{((e,s,o,a)=>{l=e.tagName;const f=s.M||F(null,null),$=(e=>e&&e._===H)(a)?a:W(null,null,a);if($._=null,$.t|=4,s.M=$,$.v=f.v=e.shadowRoot||e,t=e["s-sc"],n=e["s-cr"],r=w&&0!=(1&o.t),i=!1,X(f,$),c){ee($.v);for(let e=0;e<Z.length;e++){const t=Z[e];if(!t.g["s-ol"]){const e=u.createTextNode("");e["s-nr"]=t.g,t.g.parentNode.insertBefore(t.g["s-ol"]=e,t.g)}}p.t|=1;for(let e=0;e<Z.length;e++){const t=Z[e],n=t.j.parentNode;let l=t.j.nextSibling,s=t.g["s-ol"];for(;s=s.previousSibling;){let e=s["s-nr"];if(e&&e["s-sn"]===t.g["s-sn"]&&n===e.parentNode&&(!(e=e.nextSibling)||!e["s-nr"])){l=e;break}}(!l&&n!==t.g.parentNode||t.g.nextSibling!==l)&&t.g!==l&&n.insertBefore(t.g,l)}p.t&=-2}i&&Y($.v),Z.length=0})(e,s,o,a.render())}catch(m){b(m)}s.t&=-17,s.t|=2,$&&($.forEach(e=>e()),e["s-rc"]=void 0);{const t=e["s-p"],n=()=>se(e,s,o);0===t.length?n():(Promise.all(t).then(n),s.t|=4,t.length=0)}},se=(e,t,n)=>{const l=t.O;64&t.t||(t.t|=64,e.classList.add("hydrated"),t.R(e),l||oe()),t.k&&(t.k(),t.k=void 0),512&t.t&&R(()=>ne(e,t,n,!1)),t.t&=-517},oe=()=>{u.documentElement.classList.add("hydrated"),p.t|=2},re=(e,t,n)=>{if(e&&e[t])try{return e[t](n)}catch(l){b(l)}},ie=(e,t)=>e&&e.then?e.then(t):t(),ce=(e,t,n)=>{if(t.U){e.watchers&&(t.L=e.watchers);const l=Object.entries(t.U),s=e.prototype;if(l.forEach(([e,[l]])=>{(31&l||2&n&&32&l)&&Object.defineProperty(s,e,{get(){return((e,t)=>d(e).P.get(t))(this,e)},set(n){((e,t,n,l)=>{const s=d(this),o=s.C,r=s.P.get(t),i=s.t,c=s.s;if(!((n=((e,t)=>null==e||P(e)?e:4&t?"false"!==e&&(""===e||!!e):1&t?String(e):e)(n,l.U[t][0]))===r||8&i&&void 0!==r)&&(s.P.set(t,n),c)){if(l.L&&128&i){const e=l.L[t];e&&e.forEach(e=>{try{c[e](n,r,t)}catch(l){b(l)}})}2==(18&i)&&ne(o,s,l,!1)}})(0,e,n,t)},configurable:!0,enumerable:!0})}),1&n){const t=new Map;s.attributeChangedCallback=function(e,n,l){p.jmp(()=>{const n=t.get(e);this[n]=(null!==l||"boolean"!=typeof this[n])&&l})},e.observedAttributes=l.filter(([e,t])=>15&t[0]).map(([e,n])=>{const l=n[1]||e;return t.set(l,e),l})}}return e},ae=(e,t={})=>{const n=[],l=t.exclude||[],s=u.head,o=f.customElements,r=s.querySelector("meta[charset]"),i=u.createElement("style"),c=[];let a,h=!0;Object.assign(p,t),p.l=new URL(t.resourcesUrl||"./",u.baseURI).href,t.syncQueue&&(p.t|=4),e.forEach(e=>e[1].forEach(t=>{const s={t:t[0],S:t[1],U:t[2],T:t[3]};s.U=t[2],s.L={},!w&&1&s.t&&(s.t|=8);const r=s.S,i=class extends HTMLElement{constructor(e){super(e),(e=>{const t={t:0,C:e,P:new Map};t.A=new Promise(e=>t.R=e),e["s-p"]=[],e["s-rc"]=[],m.set(e,t)})(e=this),1&s.t&&(w?e.attachShadow({mode:"open"}):"shadowRoot"in e||(e.shadowRoot=e))}connectedCallback(){a&&(clearTimeout(a),a=null),h?c.push(this):p.jmp(()=>((e,t)=>{if(0==(1&p.t)){const n=()=>{},l=d(e);if(!(1&l.t)){let n;l.t|=1,n||(4&t.t||8&t.t)&&(e=>{const t=e["s-cr"]=u.createComment("");t["s-cn"]=!0,e.insertBefore(t,e.firstChild)})(e);{let t=e;for(;t=t.parentNode||t.host;)if(t["s-p"]){te(l,l.O=t);break}}t.U&&Object.entries(t.U).forEach(([t,[n]])=>{if(31&n&&e.hasOwnProperty(t)){const n=e[t];delete e[t],e[t]=n}}),R(()=>(async(e,t,n,l,s)=>{if(0==(32&t.t)){t.t|=32;{if((s=(e=>{const t=e.S.replace(/-/g,"_"),n=e.W,l=_.get(n);return l?l[t]:__sc_import_pv_certificates_viewer(`./${n}.entry.js`).then(e=>(_.set(n,e),e[t]),b)})(n)).then){const e=()=>{};s=await s,e()}s.isProxied||(n.L=s.watchers,ce(s,n,2),s.isProxied=!0);const e=()=>{};t.t|=8;try{new s(t)}catch(i){b(i)}t.t&=-9,t.t|=128,e()}const e=E(n.S);if(!v.has(e)&&s.style){const t=()=>{};let l=s.style;8&n.t&&(l=await __sc_import_pv_certificates_viewer("./p-affe7c09.js").then(t=>t.scopeCss(l,e,!1))),((e,t,n)=>{let l=v.get(e);$&&n?(l=l||new CSSStyleSheet).replace(t):l=t,v.set(e,l)})(e,l,!!(1&n.t)),t()}}const o=t.O,r=()=>ne(e,t,n,!0);o&&o["s-rc"]?o["s-rc"].push(r):r()})(e,l,t))}n()}})(this,s))}disconnectedCallback(){p.jmp(()=>void 0)}"s-hmr"(e){}forceUpdate(){((e,t)=>{{const n=d(e);2==(18&n.t)&&ne(e,n,t,!1)}})(this,s)}componentOnReady(){return d(this).A}};s.W=e[0],l.includes(r)||o.get(r)||(n.push(r),o.define(r,ce(i,s,1)))})),i.innerHTML=n+"{visibility:hidden}.hydrated{visibility:inherit}",i.setAttribute("data-styles",""),s.insertBefore(i,r?r.nextSibling:s.firstChild),h=!1,c.length>0?c.forEach(e=>e.connectedCallback()):p.jmp(()=>a=setTimeout(oe,30,"timeout"))};export{H,x as a,ae as b,W as h,C as p,h as r};