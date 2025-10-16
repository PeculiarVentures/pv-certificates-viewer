/*!
 * © Peculiar Ventures https://peculiarventures.com/ - MIT License
 */
import{a0 as a,a1 as s,a2 as t,A as e,a3 as r,q as n,a4 as o,a5 as i,a6 as b,a7 as c,a8 as h,a9 as u,aa as p,ab as l,ac as x,ad as d,ae as f,af as m,ag as w,ah as A,ai as E,aj as g,ak as C,al as N,am as S,an as $,ao as j,ap as q,aq as y,ar as D,as as J,at as O,au as V,av as k,aw as v,ax as z,ay as B,az as F,aA as G,aB as H,aC as I,aD as K,aE as L,aF as M,aG as P,b as Q,aH as R,aI as T,aJ as U,aK as W,aL as X,aM as Y,aN as Z,aO as _,aP as aa,aQ as sa,aR as ta,aS as ea,aT as ra,aU as na,aV as oa,aW as ia,aX as ba,aY as ca,aZ as ha,a_ as ua,a$ as pa,b0 as la,b1 as xa,b2 as da,b3 as fa,b4 as ma,b5 as wa,b6 as Aa,b7 as Ea,b8 as ga,b9 as Ca,ba as Na,bb as Sa,bc as $a,bd as ja,be as qa,bf as ya,bg as Da}from"./p-Ct-r021h.js";const Ja="1.3.6.1.4.1.11129.2.4.2";class Oa extends a{constructor(){super(...arguments);this.items=[]}fromASN(a){super.fromASN(a);const e=new s(this.buffer);const r=e.readNumber(2);this.items=[];while(e.position<r){this.items.push(new t(e))}return this}toJSON(){return this.items.map((a=>a.toJSON()))}}const Va="1.3.6.1.5.5.7.1.12";
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */const ka={[Da]:P,[ya]:M,[qa]:L,[ja]:K,[$a]:I,[Sa]:H,"2.5.29.46":H,[Na]:G,[Ca]:F,[ga]:B,[Ea]:z,[Aa]:v,[wa]:k,[ma]:V,[fa]:O,[da]:J,[xa]:D,[la]:y,[pa]:q,[ua]:j,[ha]:$,[ca]:S,[ba]:N,[ia]:C,[oa]:g,[na]:E,[Ja]:Oa,[ra]:A,[ea]:w,[ta]:m,[sa]:f,[aa]:d,[_]:x,"2.16.724.1.2.2.4.1":l,[Z]:l,[Va]:p,[Y]:u,[X]:h,[W]:c,[U]:b,[T]:i,[R]:o};class va extends e{getAsnExtnValue(){return this.asn.extnValue.buffer}constructor(a){super(a,r);const s=this.getAsnExtnValue();try{const a=ka[this.asn.extnID];if(a){this.value=n.parse(s,a)}else{console.warn(`Didn't detect parser for "${this.asn.extnID}" extension.`);this.value=Q.Convert.ToHex(s)}}catch(a){console.error(`Error parse "${this.asn.extnID}" extension:`,a.message);this.value=Q.Convert.ToHex(s)}}}export{Oa as C,va as E};
//# sourceMappingURL=p-BGIWeG8l.js.map