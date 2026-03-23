/*!
 * © Peculiar Ventures https://peculiarventures.com/ - MIT License
 */
import{$ as a,a7 as s,a8 as t,A as e,a9 as r,q as b,aa as n,ab as o,ac as i,ad as c,ae as h,af as u,ag as l,ah as p,ai as x,aj as d,ak as f,al as m,am as w,an as A,ao as E,ap as $,aq as g,ar as j,as as k,at as D,au as N,av as S,aw as q,ax as y,ay as C,az as J,aA as O,aB as V,aC as v,aD as z,aE as B,aF as F,aG as G,aH as H,aI as I,aJ as K,aK as L,aL as M,aM as P,b as Q,aN as R,aO as T,aP as U,aQ as W,aR as X,aS as Y,aT as Z,aU as _,aV as aa,aW as sa,aX as ta,aY as ea,aZ as ra,a_ as ba,a$ as na,b0 as oa,b1 as ia,b2 as ca,b3 as ha,b4 as ua,b5 as la,b6 as pa,b7 as xa,b8 as da,b9 as fa,ba as ma,bb as wa,bc as Aa,bd as Ea,be as $a,bf as ga,bg as ja,bh as ka,bi as Da,bj as Na,bk as Sa,bl as qa,bm as ya}from"./p-Dxkusr7u.js";const Ca="1.3.6.1.4.1.11129.2.4.2";class Ja extends a{constructor(){super(...arguments);this.items=[]}fromASN(a){super.fromASN(a);const e=new s(this.buffer);const r=e.readNumber(2);this.items=[];while(e.position<r){this.items.push(new t(e))}return this}toJSON(){return this.items.map((a=>a.toJSON()))}}const Oa="1.3.6.1.5.5.7.1.12";
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */const Va={[ya]:P,[qa]:M,[Sa]:L,[Na]:K,[Da]:I,[ka]:H,"2.5.29.46":H,[ja]:G,[ga]:F,[$a]:B,[Ea]:z,[Aa]:v,[wa]:V,[ma]:O,[fa]:J,[da]:C,[xa]:y,[pa]:q,[la]:S,[ua]:N,[ha]:D,[ca]:k,[ia]:j,[oa]:g,[na]:$,[ba]:E,[Ca]:Ja,[ra]:A,[ea]:w,[ta]:m,[sa]:f,[aa]:d,[_]:x,"2.16.724.1.2.2.4.1":p,[Z]:p,[Oa]:l,[Y]:u,[X]:h,[W]:c,[U]:i,[T]:o,[R]:n};class va extends e{getAsnExtnValue(){return this.asn.extnValue.buffer}constructor(a){super(a,r);const s=this.getAsnExtnValue();try{const a=Va[this.asn.extnID];if(a){this.value=b.parse(s,a)}else{console.warn(`Didn't detect parser for "${this.asn.extnID}" extension.`);this.value=Q.Convert.ToHex(s)}}catch(a){console.error(`Error parse "${this.asn.extnID}" extension:`,a.message);this.value=Q.Convert.ToHex(s)}}}export{Ja as C,va as E};
//# sourceMappingURL=p-CQVTZZNu.js.map