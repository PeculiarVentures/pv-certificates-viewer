/*!
 * © Peculiar Ventures https://peculiarventures.com/ - MIT License
 */
import{$ as a,a7 as s,a8 as t,A as e,a9 as b,q as n,aa as r,ab as o,ac as i,ad as c,ae as h,af as u,ag as l,ah as p,ai as x,aj as d,ak as f,al as m,am as A,an as w,ao as E,ap as $,aq as g,ar as j,as as N,at as S,au as k,av as q,aw as y,ax as B,ay as C,az as D,aA as J,aB as O,aC as T,aD as V,aE as W,aF as Y,aG as v,aH as z,aI as F,aJ as G,aK as H,aL as I,aM as K,b as L,aN as M,aO as P,aP as Q,aQ as R,aR as U,aS as X,aT as Z,aU as _,aV as aa,aW as sa,aX as ta,aY as ea,aZ as ba,a_ as na,a$ as ra,b0 as oa,b1 as ia,b2 as ca,b3 as ha,b4 as ua,b5 as la,b6 as pa,b7 as xa,b8 as da,b9 as fa,ba as ma,bb as Aa,bc as wa,bd as Ea,be as $a,bf as ga,bg as ja,bh as Na,bi as Sa,bj as ka,bk as qa,bl as ya,bm as Ba}from"./p-BAWY85mT.js";const Ca="1.3.6.1.4.1.11129.2.4.2";class Da extends a{constructor(){super(...arguments);this.items=[]}fromASN(a){super.fromASN(a);const e=new s(this.buffer);const b=e.readNumber(2);this.items=[];while(e.position<b){this.items.push(new t(e))}return this}toJSON(){return this.items.map((a=>a.toJSON()))}}const Ja="1.3.6.1.5.5.7.1.12";
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */const Oa={[Ba]:K,[ya]:I,[qa]:H,[ka]:G,[Sa]:F,[Na]:z,"2.5.29.46":z,[ja]:v,[ga]:Y,[$a]:W,[Ea]:V,[wa]:T,[Aa]:O,[ma]:J,[fa]:D,[da]:C,[xa]:B,[pa]:y,[la]:q,[ua]:k,[ha]:S,[ca]:N,[ia]:j,[oa]:g,[ra]:$,[na]:E,[Ca]:Da,[ba]:w,[ea]:A,[ta]:m,[sa]:f,[aa]:d,[_]:x,"2.16.724.1.2.2.4.1":p,[Z]:p,[Ja]:l,[X]:u,[U]:h,[R]:c,[Q]:i,[P]:o,[M]:r};class Ta extends e{getAsnExtnValue(){return this.asn.extnValue.buffer}constructor(a){super(a,b);const s=this.getAsnExtnValue();try{const a=Oa[this.asn.extnID];if(a){this.value=n.parse(s,a)}else{console.warn(`Didn't detect parser for "${this.asn.extnID}" extension.`);this.value=L.Convert.ToHex(s)}}catch(a){console.error(`Error parse "${this.asn.extnID}" extension:`,a.message);this.value=L.Convert.ToHex(s)}}}export{Da as C,Ta as E};
//# sourceMappingURL=p-CuRXqhnb.js.map