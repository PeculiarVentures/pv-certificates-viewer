let e,t,n,l=!1,o=!1,s=!1,r=!1,i=0,c=!1;const a="undefined"!=typeof window?window:{},f=a.CSS,u=a.document||{head:{}},p={t:0,l:"",jmp:e=>e(),raf:e=>requestAnimationFrame(e),ael:(e,t,n,l)=>e.addEventListener(t,n,l),rel:(e,t,n,l)=>e.removeEventListener(t,n,l)},m=(()=>(u.head.attachShadow+"").indexOf("[native")>-1)(),d=e=>Promise.resolve(e),$=(()=>{try{return new CSSStyleSheet,!0}catch(e){}return!1})(),w=(e,t,n)=>{n&&n.map(([n,l,o])=>{const s=e,r=h(t,o),i=y(n);p.ael(s,l,r,i),(t.o=t.o||[]).push(()=>p.rel(s,l,r,i))})},h=(e,t)=>n=>{256&e.t?e.s[t](n):(e.u=e.u||[]).push([t,n])},y=e=>0!=(2&e),b="http://www.w3.org/1999/xlink",v=new WeakMap,g=e=>"sc-"+e,_={},j=e=>"object"==(e=typeof e)||"function"===e,k=(e,t,...n)=>{let l=null,o=null,s=null,r=!1,i=!1,c=[];const a=t=>{for(let n=0;n<t.length;n++)l=t[n],Array.isArray(l)?a(l):null!=l&&"boolean"!=typeof l&&((r="function"!=typeof e&&!j(l))&&(l+=""),r&&i?c[c.length-1].p+=l:c.push(r?M(null,l):l),i=r)};if(a(n),t){t.key&&(o=t.key),t.name&&(s=t.name);{const e=t.className||t.class;e&&(t.class="object"!=typeof e?e:Object.keys(e).filter(t=>e[t]).join(" "))}}if("function"==typeof e)return e(null===t?{}:t,c,O);const f=M(e,null);return f.$=t,c.length>0&&(f.h=c),f.v=o,f.g=s,f},M=(e,t)=>({t:0,_:e,p:t,j:null,h:null,$:null,v:null,g:null}),R={},O={forEach:(e,t)=>e.map(S).forEach(t),map:(e,t)=>e.map(S).map(t).map(L)},S=e=>({vattrs:e.$,vchildren:e.h,vkey:e.v,vname:e.g,vtag:e._,vtext:e.p}),L=e=>{const t=M(e.vtag,e.vtext);return t.$=e.vattrs,t.h=e.vchildren,t.v=e.vkey,t.g=e.vname,t},U=(e,t,n,l,o,s)=>{if(n!==l){let i=ue(e,t),c=t.toLowerCase();if("class"===t){const t=e.classList,o=C(n),s=C(l);t.remove(...o.filter(e=>e&&!s.includes(e))),t.add(...s.filter(e=>e&&!o.includes(e)))}else if("style"===t){for(const t in n)l&&null!=l[t]||(t.includes("-")?e.style.removeProperty(t):e.style[t]="");for(const t in l)n&&l[t]===n[t]||(t.includes("-")?e.style.setProperty(t,l[t]):e.style[t]=l[t])}else if("key"===t);else if("ref"===t)l&&l(e);else if(i||"o"!==t[0]||"n"!==t[1]){const a=j(l);if((i||a&&null!==l)&&!o)try{if(e.tagName.includes("-"))e[t]=l;else{let o=null==l?"":l;"list"===t?i=!1:null!=n&&e[t]==o||(e[t]=o)}}catch(r){}let f=!1;c!==(c=c.replace(/^xlink\:?/,""))&&(t=c,f=!0),null==l||!1===l?f?e.removeAttributeNS(b,t):e.removeAttribute(t):(!i||4&s||o)&&!a&&(l=!0===l?"":l,f?e.setAttributeNS(b,t,l):e.setAttribute(t,l))}else t="-"===t[2]?t.slice(3):ue(a,c)?c.slice(2):c[2]+t.slice(3),n&&p.rel(e,t,n,!1),l&&p.ael(e,t,l,!1)}},x=/\s/,C=e=>e?e.split(x):[],P=(e,t,n,l)=>{const o=11===t.j.nodeType&&t.j.host?t.j.host:t.j,s=e&&e.$||_,r=t.$||_;for(l in s)l in r||U(o,l,s[l],void 0,n,t.t);for(l in r)U(o,l,s[l],r[l],n,t.t)},T=(o,i,c,a)=>{let f,p,m,d=i.h[c],$=0;if(l||(s=!0,"slot"===d._&&(e&&a.classList.add(e+"-s"),d.t|=d.h?2:1)),null!==d.p)f=d.j=u.createTextNode(d.p);else if(1&d.t)f=d.j=u.createTextNode("");else{if(r||(r="svg"===d._),f=d.j=u.createElementNS(r?"http://www.w3.org/2000/svg":"http://www.w3.org/1999/xhtml",2&d.t?"slot-fb":d._),r&&"foreignObject"===d._&&(r=!1),P(null,d,r),null!=e&&f["s-si"]!==e&&f.classList.add(f["s-si"]=e),d.h)for($=0;$<d.h.length;++$)p=T(o,d,$,f),p&&f.appendChild(p);"svg"===d._?r=!1:"foreignObject"===f.tagName&&(r=!0)}return f["s-hn"]=n,3&d.t&&(f["s-sr"]=!0,f["s-cr"]=t,f["s-sn"]=d.g||"",m=o&&o.h&&o.h[c],m&&m._===d._&&o.j&&E(o.j,!1)),f},E=(e,t)=>{p.t|=1;const l=e.childNodes;for(let o=l.length-1;o>=0;o--){const e=l[o];e["s-hn"]!==n&&e["s-ol"]&&(H(e).insertBefore(e,D(e)),e["s-ol"].remove(),e["s-ol"]=void 0,s=!0),t&&E(e,t)}p.t&=-2},A=(e,t,l,o,s,r)=>{let i,c=e["s-cr"]&&e["s-cr"].parentNode||e;for(c.shadowRoot&&c.tagName===n&&(c=c.shadowRoot);s<=r;++s)o[s]&&(i=T(null,l,s,e),i&&(o[s].j=i,c.insertBefore(i,D(t))))},F=(e,t,n,l,s)=>{for(;t<=n;++t)(l=e[t])&&(s=l.j,G(l),o=!0,s["s-ol"]?s["s-ol"].remove():E(s,!0),s.remove())},W=(e,t)=>e._===t._&&("slot"===e._?e.g===t.g:e.v===t.v),D=e=>e&&e["s-ol"]||e,H=e=>(e["s-ol"]?e["s-ol"]:e).parentNode,N=(e,t)=>{const n=t.j=e.j,l=e.h,o=t.h,s=t._,i=t.p;let c;null===i?(r="svg"===s||"foreignObject"!==s&&r,"slot"===s||P(e,t,r),null!==l&&null!==o?((e,t,n,l)=>{let o,s,r=0,i=0,c=0,a=0,f=t.length-1,u=t[0],p=t[f],m=l.length-1,d=l[0],$=l[m];for(;r<=f&&i<=m;)if(null==u)u=t[++r];else if(null==p)p=t[--f];else if(null==d)d=l[++i];else if(null==$)$=l[--m];else if(W(u,d))N(u,d),u=t[++r],d=l[++i];else if(W(p,$))N(p,$),p=t[--f],$=l[--m];else if(W(u,$))"slot"!==u._&&"slot"!==$._||E(u.j.parentNode,!1),N(u,$),e.insertBefore(u.j,p.j.nextSibling),u=t[++r],$=l[--m];else if(W(p,d))"slot"!==u._&&"slot"!==$._||E(p.j.parentNode,!1),N(p,d),e.insertBefore(p.j,u.j),p=t[--f],d=l[++i];else{for(c=-1,a=r;a<=f;++a)if(t[a]&&null!==t[a].v&&t[a].v===d.v){c=a;break}c>=0?(s=t[c],s._!==d._?o=T(t&&t[i],n,c,e):(N(s,d),t[c]=void 0,o=s.j),d=l[++i]):(o=T(t&&t[i],n,i,e),d=l[++i]),o&&H(u.j).insertBefore(o,D(u.j))}r>f?A(e,null==l[m+1]?null:l[m+1].j,n,l,i,m):i>m&&F(t,r,f)})(n,l,t,o):null!==o?(null!==e.p&&(n.textContent=""),A(n,null,t,o,0,o.length-1)):null!==l&&F(l,0,l.length-1),r&&"svg"===s&&(r=!1)):(c=n["s-cr"])?c.parentNode.textContent=i:e.p!==i&&(n.data=i)},q=e=>{let t,n,l,o,s,r,i=e.childNodes;for(n=0,l=i.length;n<l;n++)if(t=i[n],1===t.nodeType){if(t["s-sr"])for(s=t["s-sn"],t.hidden=!1,o=0;o<l;o++)if(i[o]["s-hn"]!==t["s-hn"])if(r=i[o].nodeType,""!==s){if(1===r&&s===i[o].getAttribute("slot")){t.hidden=!0;break}}else if(1===r||3===r&&""!==i[o].textContent.trim()){t.hidden=!0;break}q(t)}},B=[],V=e=>{let t,n,l,s,r,i,c=0,a=e.childNodes,f=a.length;for(;c<f;c++){if(t=a[c],t["s-sr"]&&(n=t["s-cr"]))for(l=n.parentNode.childNodes,s=t["s-sn"],i=l.length-1;i>=0;i--)n=l[i],n["s-cn"]||n["s-nr"]||n["s-hn"]===t["s-hn"]||(z(n,s)?(r=B.find(e=>e.k===n),o=!0,n["s-sn"]=n["s-sn"]||s,r?r.M=t:B.push({M:t,k:n}),n["s-sr"]&&B.map(e=>{z(e.k,n["s-sn"])&&(r=B.find(e=>e.k===n),r&&!e.M&&(e.M=r.M))})):B.some(e=>e.k===n)||B.push({k:n}));1===t.nodeType&&V(t)}},z=(e,t)=>1===e.nodeType?null===e.getAttribute("slot")&&""===t||e.getAttribute("slot")===t:e["s-sn"]===t||""===t,G=e=>{e.$&&e.$.ref&&e.$.ref(null),e.h&&e.h.map(G)},I=e=>ce(e).R,J=(e,t,n)=>{const l=I(e);return{emit:e=>K(l,t,{bubbles:!!(4&n),composed:!!(2&n),cancelable:!!(1&n),detail:e})}},K=(e,t,n)=>{const l=new CustomEvent(t,n);return e.dispatchEvent(l),l},Q=(e,t)=>{t&&!e.O&&t["s-p"].push(new Promise(t=>e.O=t))},X=(e,t)=>{if(e.t|=16,4&e.t)return void(e.t|=512);const n=e.s,l=()=>Y(e,n,t);let o;return Q(e,e.S),t&&(e.t|=256,e.u&&(e.u.map(([e,t])=>ne(n,e,t)),e.u=null),o=ne(n,"componentWillLoad")),le(o,()=>je(l))},Y=(r,i,c)=>{const a=r.R,f=a["s-rc"];c&&(e=>{const t=e.L,n=e.R,l=t.t,o=((e,t)=>{let n=g(t.U),l=$e.get(n);if(e=11===e.nodeType?e:u,l)if("string"==typeof l){let t,o=v.get(e=e.head||e);o||v.set(e,o=new Set),o.has(n)||(t=u.createElement("style"),t.innerHTML=l,e.insertBefore(t,e.querySelector("link")),o&&o.add(n))}else e.adoptedStyleSheets.includes(l)||(e.adoptedStyleSheets=[...e.adoptedStyleSheets,l]);return n})(m&&n.shadowRoot?n.shadowRoot:n.getRootNode(),t);10&l&&(n["s-sc"]=o,n.classList.add(o+"-h"))})(r),((r,i)=>{const c=r.R,a=r.L,f=r.C||M(null,null),d=(e=>e&&e._===R)(i)?i:k(null,null,i);if(n=c.tagName,a.P&&(d.$=d.$||{},a.P.map(([e,t])=>d.$[t]=c[e])),d._=null,d.t|=4,r.C=d,d.j=f.j=c.shadowRoot||c,e=c["s-sc"],t=c["s-cr"],l=m&&0!=(1&a.t),o=!1,N(f,d),p.t|=1,s){let e,t,n,l,o,s;V(d.j);let r=0;for(;r<B.length;r++)e=B[r],t=e.k,t["s-ol"]||(n=u.createTextNode(""),n["s-nr"]=t,t.parentNode.insertBefore(t["s-ol"]=n,t));for(r=0;r<B.length;r++)if(e=B[r],t=e.k,e.M){for(l=e.M.parentNode,o=e.M.nextSibling,n=t["s-ol"];n=n.previousSibling;)if(s=n["s-nr"],s&&s["s-sn"]===t["s-sn"]&&l===s.parentNode&&(s=s.nextSibling,!s||!s["s-nr"])){o=s;break}(!o&&l!==t.parentNode||t.nextSibling!==o)&&t!==o&&(!t["s-hn"]&&t["s-ol"]&&(t["s-hn"]=t["s-ol"].parentNode.nodeName),l.insertBefore(t,o))}else 1===t.nodeType&&(t.hidden=!0)}o&&q(d.j),p.t&=-2,B.length=0})(r,Z(i)),r.t&=-17,r.t|=2,f&&(f.map(e=>e()),a["s-rc"]=void 0);{const e=a["s-p"],t=()=>ee(r);0===e.length?t():(Promise.all(e).then(t),r.t|=4,e.length=0)}},Z=e=>{try{e=e.render()}catch(t){pe(t)}return e},ee=e=>{const t=e.R,n=e.s,l=e.S;64&e.t?ne(n,"componentDidUpdate"):(e.t|=64,oe(t),ne(n,"componentDidLoad"),e.T(t),l||te()),e.O&&(e.O(),e.O=void 0),512&e.t&&_e(()=>X(e,!1)),e.t&=-517},te=()=>{oe(u.documentElement),p.t|=2,_e(()=>K(a,"appload",{detail:{namespace:"peculiar"}}))},ne=(e,t,n)=>{if(e&&e[t])try{return e[t](n)}catch(l){pe(l)}},le=(e,t)=>e&&e.then?e.then(t):t(),oe=e=>e.classList.add("hydrated"),se=(e,t,n)=>{if(t.A){e.watchers&&(t.F=e.watchers);const l=Object.entries(t.A),o=e.prototype;if(l.map(([e,[l]])=>{(31&l||2&n&&32&l)&&Object.defineProperty(o,e,{get(){return((e,t)=>ce(this).W.get(t))(0,e)},set(n){((e,t,n,l)=>{const o=ce(this),s=o.W.get(t),r=o.t,i=o.s;if(n=((e,t)=>null==e||j(e)?e:4&t?"false"!==e&&(""===e||!!e):2&t?parseFloat(e):1&t?e+"":e)(n,l.A[t][0]),!(8&r&&void 0!==s||n===s)&&(o.W.set(t,n),i)){if(l.F&&128&r){const e=l.F[t];e&&e.map(e=>{try{i[e](n,s,t)}catch(l){pe(l)}})}2==(18&r)&&X(o,!1)}})(0,e,n,t)},configurable:!0,enumerable:!0})}),1&n){const n=new Map;o.attributeChangedCallback=function(e,t,l){p.jmp(()=>{const t=n.get(e);this[t]=(null!==l||"boolean"!=typeof this[t])&&l})},e.observedAttributes=l.filter(([e,t])=>15&t[0]).map(([e,l])=>{const o=l[1]||e;return n.set(o,e),512&l[0]&&t.P.push([e,o]),o})}}return e},re=(e,t={})=>{const n=[],l=t.exclude||[],o=a.customElements,s=u.head,r=s.querySelector("meta[charset]"),i=u.createElement("style"),c=[];let f,d=!0;Object.assign(p,t),p.l=new URL(t.resourcesUrl||"./",u.baseURI).href,t.syncQueue&&(p.t|=4),e.map(e=>e[1].map(t=>{const s={t:t[0],U:t[1],A:t[2],D:t[3]};s.A=t[2],s.D=t[3],s.P=[],s.F={},!m&&1&s.t&&(s.t|=8);const r=s.U,i=class extends HTMLElement{constructor(e){super(e),fe(e=this,s),1&s.t&&(m?e.attachShadow({mode:"open"}):"shadowRoot"in e||(e.shadowRoot=e))}connectedCallback(){f&&(clearTimeout(f),f=null),d?c.push(this):p.jmp(()=>(e=>{if(0==(1&p.t)){const t=ce(e),n=t.L,l=()=>{};if(1&t.t)w(e,t,n.D);else{t.t|=1,12&n.t&&(e=>{const t=e["s-cr"]=u.createComment("");t["s-cn"]=!0,e.insertBefore(t,e.firstChild)})(e);{let n=e;for(;n=n.parentNode||n.host;)if(n["s-p"]){Q(t,t.S=n);break}}n.A&&Object.entries(n.A).map(([t,[n]])=>{if(31&n&&e.hasOwnProperty(t)){const n=e[t];delete e[t],e[t]=n}}),_e(()=>(async(e,t,n,l,o)=>{if(0==(32&t.t)){t.t|=32;{if((o=de(n)).then){const e=()=>{};o=await o,e()}o.isProxied||(n.F=o.watchers,se(o,n,2),o.isProxied=!0);const e=()=>{};t.t|=8;try{new o(t)}catch(i){pe(i)}t.t&=-9,t.t|=128,e()}const e=g(n.U);if(!$e.has(e)&&o.style){const t=()=>{};let l=o.style;8&n.t&&(l=await __sc_import_peculiar("./p-f40f26f5.js").then(t=>t.scopeCss(l,e,!1))),((e,t,n)=>{let l=$e.get(e);$&&n?(l=l||new CSSStyleSheet,l.replace(t)):l=t,$e.set(e,l)})(e,l,!!(1&n.t)),t()}}const s=t.S,r=()=>X(t,!0);s&&s["s-rc"]?s["s-rc"].push(r):r()})(0,t,n))}l()}})(this))}disconnectedCallback(){p.jmp(()=>(()=>{if(0==(1&p.t)){const e=ce(this);e.o&&(e.o.map(e=>e()),e.o=void 0)}})())}forceUpdate(){(()=>{{const e=ce(this);e.R.isConnected&&2==(18&e.t)&&X(e,!1)}})()}componentOnReady(){return ce(this).H}};s.N=e[0],l.includes(r)||o.get(r)||(n.push(r),o.define(r,se(i,s,1)))})),i.innerHTML=n+"{visibility:hidden}.hydrated{visibility:inherit}",i.setAttribute("data-styles",""),s.insertBefore(i,r?r.nextSibling:s.firstChild),d=!1,c.length?c.map(e=>e.connectedCallback()):p.jmp(()=>f=setTimeout(te,30))},ie=new WeakMap,ce=e=>ie.get(e),ae=(e,t)=>ie.set(t.s=e,t),fe=(e,t)=>{const n={t:0,R:e,L:t,W:new Map};return n.H=new Promise(e=>n.T=e),e["s-p"]=[],e["s-rc"]=[],w(e,n,t.D),ie.set(e,n)},ue=(e,t)=>t in e,pe=e=>console.error(e),me=new Map,de=e=>{const t=e.U.replace(/-/g,"_"),n=e.N,l=me.get(n);return l?l[t]:__sc_import_peculiar(`./${n}.entry.js`).then(e=>(me.set(n,e),e[t]),pe)},$e=new Map,we=[],he=[],ye=[],be=(e,t)=>n=>{e.push(n),c||(c=!0,t&&4&p.t?_e(ge):p.raf(ge))},ve=(e,t)=>{let n=0,l=0;for(;n<e.length&&(l=performance.now())<t;)try{e[n++](l)}catch(o){pe(o)}n===e.length?e.length=0:0!==n&&e.splice(0,n)},ge=()=>{i++,(e=>{for(let n=0;n<e.length;n++)try{e[n](performance.now())}catch(t){pe(t)}e.length=0})(we);{const e=2==(6&p.t)?performance.now()+14*Math.ceil(.1*i):1/0;ve(he,e),ve(ye,e),he.length>0&&(ye.push(...he),he.length=0),(c=we.length+he.length+ye.length>0)?p.raf(ge):i=0}},_e=e=>d().then(e),je=be(he,!0),ke=()=>f&&f.supports&&f.supports("color","var(--c)")?d():__sc_import_peculiar("./p-e75178b0.js").then(()=>(p.q=a.__cssshim)?(!1).i():0),Me=()=>{p.q=a.__cssshim;const e=Array.from(u.querySelectorAll("script")).find(e=>/\/peculiar(\.esm)?\.js($|\?|#)/.test(e.src)||"peculiar"===e.getAttribute("data-stencil-namespace")),t=e["data-opts"]||{};return"onbeforeload"in e&&!history.scrollRestoration?{then(){}}:(t.resourcesUrl=new URL(".",new URL(e.getAttribute("data-resources-url")||e.src,a.location.href)).href,Re(t.resourcesUrl,e),a.customElements?d(t):__sc_import_peculiar("./p-50baaf6b.js").then(()=>t))},Re=(e,t)=>{try{a.__sc_import_peculiar=Function("w","return import(w);//"+Math.random())}catch(n){const l=new Map;a.__sc_import_peculiar=n=>{const o=new URL(n,e).href;let s=l.get(o);if(!s){const e=u.createElement("script");e.type="module",e.crossOrigin=t.crossOrigin,e.src=URL.createObjectURL(new Blob([`import * as m from '${o}'; window.__sc_import_peculiar.m = m;`],{type:"application/javascript"})),s=new Promise(t=>{e.onload=()=>{t(a.__sc_import_peculiar.m),e.remove()}}),l.set(o,s),u.head.appendChild(e)}return s}}};export{R as H,ke as a,re as b,J as c,I as g,k as h,Me as p,ae as r}