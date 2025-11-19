/*!
 * © Peculiar Ventures https://peculiarventures.com/ - MIT License
 */
import{a0 as a,a1 as s,a2 as t,A as e,a3 as n,q as r,a4 as o,a5 as i,a6 as b,a7 as c,a8 as h,a9 as u,aa as p,ab as l,ac as x,ad as d,ae as f,af as m,ag as w,ah as A,ai as E,aj as g,ak as C,al as N,am as O,an as S,ao as V,ap as $,aq as j,ar as q,as as y,at as D,au as F,av as H,aw as J,ax as Z,ay as _,az as k,aA as v,aB as z,aC as B,aD as G,aE as I,aF as K,aG as L,b as M,aH as P,aI as Q,aJ as R,aK as T,aL as U,aM as W,aN as X,aO as Y,aP as aa,aQ as sa,aR as ta,aS as ea,aT as na,aU as ra,aV as oa,aW as ia,aX as ba,aY as ca,aZ as ha,a_ as ua,a$ as pa,b0 as la,b1 as xa,b2 as da,b3 as fa,b4 as ma,b5 as wa,b6 as Aa,b7 as Ea,b8 as ga,b9 as Ca,ba as Na,bb as Oa,bc as Sa,bd as Va,be as $a,bf as ja,bg as qa}from"./p-CmOVFH_Z.js";const ya="1.3.6.1.4.1.11129.2.4.2";class Da extends a{constructor(){super(...arguments);this.items=[]}fromASN(a){super.fromASN(a);const e=new s(this.buffer);const n=e.readNumber(2);this.items=[];while(e.position<n){this.items.push(new t(e))}return this}toJSON(){return this.items.map((a=>a.toJSON()))}}const Fa="1.3.6.1.5.5.7.1.12";
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */const Ha={[qa]:L,[ja]:K,[$a]:I,[Va]:G,[Sa]:B,[Oa]:z,"2.5.29.46":z,[Na]:v,[Ca]:k,[ga]:_,[Ea]:Z,[Aa]:J,[wa]:H,[ma]:F,[fa]:D,[da]:y,[xa]:q,[la]:j,[pa]:$,[ua]:V,[ha]:S,[ca]:O,[ba]:N,[ia]:C,[oa]:g,[ra]:E,[ya]:Da,[na]:A,[ea]:w,[ta]:m,[sa]:f,[aa]:d,[Y]:x,"2.16.724.1.2.2.4.1":l,[X]:l,[Fa]:p,[W]:u,[U]:h,[T]:c,[R]:b,[Q]:i,[P]:o};class Ja extends e{getAsnExtnValue(){return this.asn.extnValue.buffer}constructor(a){super(a,n);const s=this.getAsnExtnValue();try{const a=Ha[this.asn.extnID];if(a){this.value=r.parse(s,a)}else{console.warn(`Didn't detect parser for "${this.asn.extnID}" extension.`);this.value=M.Convert.ToHex(s)}}catch(a){console.error(`Error parse "${this.asn.extnID}" extension:`,a.message);this.value=M.Convert.ToHex(s)}}}export{Da as C,Ja as E};
//# sourceMappingURL=p-DXA1451q.js.map