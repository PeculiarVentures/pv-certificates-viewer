/*!
 * © Peculiar Ventures https://peculiarventures.com/ - MIT License
 */
import{a0 as a,a1 as s,a2 as t,A as e,a3 as r,q as n,a4 as o,a5 as i,a6 as b,a7 as c,a8 as h,a9 as u,aa as p,ab as l,ac as x,ad as d,ae as f,af as m,ag as w,ah as A,ai as E,aj as g,ak as y,al as N,am as S,an as $,ao as j,ap as q,aq as z,ar as C,as as D,at as J,au as K,av as O,aw as T,ax as V,ay as k,az as v,aA as B,aB as F,aC as G,aD as H,aE as I,aF as L,aG as M,b as P,aH as Q,aI as R,aJ as U,aK as W,aL as X,aM as Y,aN as Z,aO as _,aP as aa,aQ as sa,aR as ta,aS as ea,aT as ra,aU as na,aV as oa,aW as ia,aX as ba,aY as ca,aZ as ha,a_ as ua,a$ as pa,b0 as la,b1 as xa,b2 as da,b3 as fa,b4 as ma,b5 as wa,b6 as Aa,b7 as Ea,b8 as ga,b9 as ya,ba as Na,bb as Sa,bc as $a,bd as ja,be as qa,bf as za,bg as Ca}from"./p-rmToyzuK.js";const Da="1.3.6.1.4.1.11129.2.4.2";class Ja extends a{constructor(){super(...arguments);this.items=[]}fromASN(a){super.fromASN(a);const e=new s(this.buffer);const r=e.readNumber(2);this.items=[];while(e.position<r){this.items.push(new t(e))}return this}toJSON(){return this.items.map((a=>a.toJSON()))}}const Ka="1.3.6.1.5.5.7.1.12";
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */const Oa={[Ca]:M,[za]:L,[qa]:I,[ja]:H,[$a]:G,[Sa]:F,"2.5.29.46":F,[Na]:B,[ya]:v,[ga]:k,[Ea]:V,[Aa]:T,[wa]:O,[ma]:K,[fa]:J,[da]:D,[xa]:C,[la]:z,[pa]:q,[ua]:j,[ha]:$,[ca]:S,[ba]:N,[ia]:y,[oa]:g,[na]:E,[Da]:Ja,[ra]:A,[ea]:w,[ta]:m,[sa]:f,[aa]:d,[_]:x,"2.16.724.1.2.2.4.1":l,[Z]:l,[Ka]:p,[Y]:u,[X]:h,[W]:c,[U]:b,[R]:i,[Q]:o};class Ta extends e{getAsnExtnValue(){return this.asn.extnValue.buffer}constructor(a){super(a,r);const s=this.getAsnExtnValue();try{const a=Oa[this.asn.extnID];if(a){this.value=n.parse(s,a)}else{console.warn(`Didn't detect parser for "${this.asn.extnID}" extension.`);this.value=P.Convert.ToHex(s)}}catch(a){console.error(`Error parse "${this.asn.extnID}" extension:`,a.message);this.value=P.Convert.ToHex(s)}}}export{Ja as C,Ta as E};
//# sourceMappingURL=p-BtqN4pgo.js.map