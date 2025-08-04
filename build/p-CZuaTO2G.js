/*!
 * © Peculiar Ventures https://peculiarventures.com/ - MIT License
 */
import{a0 as a,a1 as s,a2 as t,A as e,a3 as n,q as r,a4 as o,a5 as i,a6 as b,a7 as c,a8 as h,a9 as u,aa as p,ab as l,ac as x,ad as d,ae as f,af as S,ag as m,ah as w,ai as A,aj as E,ak as g,al as q,am as C,an as N,ao as O,ap as $,aq as j,ar as y,as as D,at as J,au as V,av as Z,aw as k,ax as v,ay as z,az as B,aA as F,aB as G,aC as H,aD as I,aE as K,aF as L,aG as M,b as P,aH as Q,aI as R,aJ as T,aK as U,aL as W,aM as X,aN as Y,aO as _,aP as aa,aQ as sa,aR as ta,aS as ea,aT as na,aU as ra,aV as oa,aW as ia,aX as ba,aY as ca,aZ as ha,a_ as ua,a$ as pa,b0 as la,b1 as xa,b2 as da,b3 as fa,b4 as Sa,b5 as ma,b6 as wa,b7 as Aa,b8 as Ea,b9 as ga,ba as qa,bb as Ca,bc as Na,bd as Oa,be as $a,bf as ja,bg as ya}from"./p-CSS3OhZq.js";const Da="1.3.6.1.4.1.11129.2.4.2";class Ja extends a{constructor(){super(...arguments);this.items=[]}fromASN(a){super.fromASN(a);const e=new s(this.buffer);const n=e.readNumber(2);this.items=[];while(e.position<n){this.items.push(new t(e))}return this}toJSON(){return this.items.map((a=>a.toJSON()))}}const Va="1.3.6.1.5.5.7.1.12";
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */const Za={[ya]:M,[ja]:L,[$a]:K,[Oa]:I,[Na]:H,[Ca]:G,"2.5.29.46":G,[qa]:F,[ga]:B,[Ea]:z,[Aa]:v,[wa]:k,[ma]:Z,[Sa]:V,[fa]:J,[da]:D,[xa]:y,[la]:j,[pa]:$,[ua]:O,[ha]:N,[ca]:C,[ba]:q,[ia]:g,[oa]:E,[ra]:A,[Da]:Ja,[na]:w,[ea]:m,[ta]:S,[sa]:f,[aa]:d,[_]:x,"2.16.724.1.2.2.4.1":l,[Y]:l,[Va]:p,[X]:u,[W]:h,[U]:c,[T]:b,[R]:i,[Q]:o};class ka extends e{getAsnExtnValue(){return this.asn.extnValue.buffer}constructor(a){super(a,n);const s=this.getAsnExtnValue();try{const a=Za[this.asn.extnID];if(a){this.value=r.parse(s,a)}else{console.warn(`Didn't detect parser for "${this.asn.extnID}" extension.`);this.value=P.Convert.ToHex(s)}}catch(a){console.error(`Error parse "${this.asn.extnID}" extension:`,a.message);this.value=P.Convert.ToHex(s)}}}export{Ja as C,ka as E};
//# sourceMappingURL=p-CZuaTO2G.js.map