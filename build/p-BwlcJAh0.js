/*!
 * © Peculiar Ventures https://peculiarventures.com/ - MIT License
 */
import{a0 as a,a1 as s,a2 as t,A as e,a3 as n,q as r,a4 as o,a5 as i,a6 as b,a7 as c,a8 as h,a9 as u,aa as p,ab as l,ac as x,ad as d,ae as f,af as m,ag as w,ah as A,ai as E,aj as g,ak as C,al as N,am as S,an as $,ao as j,ap as q,aq as y,ar as D,as as J,at as O,au as P,av as Q,aw as V,ax as W,ay as X,az as k,aA as v,aB as z,aC as B,aD as F,aE as G,aF as H,aG as I,b as K,aH as L,aI as M,aJ as R,aK as T,aL as U,aM as Y,aN as Z,aO as _,aP as aa,aQ as sa,aR as ta,aS as ea,aT as na,aU as ra,aV as oa,aW as ia,aX as ba,aY as ca,aZ as ha,a_ as ua,a$ as pa,b0 as la,b1 as xa,b2 as da,b3 as fa,b4 as ma,b5 as wa,b6 as Aa,b7 as Ea,b8 as ga,b9 as Ca,ba as Na,bb as Sa,bc as $a,bd as ja,be as qa,bf as ya,bg as Da}from"./p-PCn0WXhQ.js";const Ja="1.3.6.1.4.1.11129.2.4.2";class Oa extends a{constructor(){super(...arguments);this.items=[]}fromASN(a){super.fromASN(a);const e=new s(this.buffer);const n=e.readNumber(2);this.items=[];while(e.position<n){this.items.push(new t(e))}return this}toJSON(){return this.items.map((a=>a.toJSON()))}}const Pa="1.3.6.1.5.5.7.1.12";
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */const Qa={[Da]:I,[ya]:H,[qa]:G,[ja]:F,[$a]:B,[Sa]:z,"2.5.29.46":z,[Na]:v,[Ca]:k,[ga]:X,[Ea]:W,[Aa]:V,[wa]:Q,[ma]:P,[fa]:O,[da]:J,[xa]:D,[la]:y,[pa]:q,[ua]:j,[ha]:$,[ca]:S,[ba]:N,[ia]:C,[oa]:g,[ra]:E,[Ja]:Oa,[na]:A,[ea]:w,[ta]:m,[sa]:f,[aa]:d,[_]:x,"2.16.724.1.2.2.4.1":l,[Z]:l,[Pa]:p,[Y]:u,[U]:h,[T]:c,[R]:b,[M]:i,[L]:o};class Va extends e{getAsnExtnValue(){return this.asn.extnValue.buffer}constructor(a){super(a,n);const s=this.getAsnExtnValue();try{const a=Qa[this.asn.extnID];if(a){this.value=r.parse(s,a)}else{console.warn(`Didn't detect parser for "${this.asn.extnID}" extension.`);this.value=K.Convert.ToHex(s)}}catch(a){console.error(`Error parse "${this.asn.extnID}" extension:`,a.message);this.value=K.Convert.ToHex(s)}}}export{Oa as C,Va as E};
//# sourceMappingURL=p-BwlcJAh0.js.map