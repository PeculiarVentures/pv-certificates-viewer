/*!
 * © Peculiar Ventures https://peculiarventures.com/ - MIT License
 */
import{$ as a,a7 as s,a8 as t,A as e,a9 as b,q as n,aa as o,ab as r,ac as i,ad as c,ae as h,af as l,ag as u,ah as p,ai as x,aj as d,ak as f,al as m,am as w,an as A,ao as D,ap as E,aq as $,ar as g,as as j,at as N,au as S,av as k,aw as q,ax as y,ay as C,az as J,aA as O,aB as V,aC as v,aD as z,aE as B,aF as F,aG as G,aH as H,aI as I,aJ as K,aK as L,aL as M,aM as P,aN as Q,b as R,aO as T,aP as U,aQ as W,aR as X,aS as Y,aT as Z,aU as _,aV as aa,aW as sa,aX as ta,aY as ea,aZ as ba,a_ as na,a$ as oa,b0 as ra,b1 as ia,b2 as ca,b3 as ha,b4 as la,b5 as ua,b6 as pa,b7 as xa,b8 as da,b9 as fa,ba as ma,bb as wa,bc as Aa,bd as Da,be as Ea,bf as $a,bg as ga,bh as ja,bi as Na,bj as Sa,bk as ka,bl as qa,bm as ya,bn as Ca,bo as Ja}from"./p-Del2D5s9.js";const Oa="1.3.6.1.4.1.11129.2.4.2";class Va extends a{constructor(){super(...arguments);this.items=[]}fromASN(a){super.fromASN(a);const e=new s(this.buffer);const b=e.readNumber(2);this.items=[];while(e.position<b){this.items.push(new t(e))}return this}toJSON(){return this.items.map((a=>a.toJSON()))}}const va="1.3.6.1.5.5.7.1.12";
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */const za={[Ja]:Q,[Ca]:P,[ya]:M,[qa]:L,[ka]:K,[Sa]:I,"2.5.29.46":I,[Na]:H,[ja]:G,[ga]:F,[$a]:B,[Ea]:z,[Da]:v,[Aa]:V,[wa]:O,[ma]:J,[fa]:C,[da]:y,[xa]:q,[pa]:k,[ua]:S,[la]:N,[ha]:j,[ca]:g,[ia]:$,[ra]:E,[Oa]:Va,[oa]:D,[na]:A,[ba]:w,[ea]:m,[ta]:f,[sa]:d,"2.16.724.1.2.2.4.1":x,[aa]:x,[va]:p,[_]:u,[Z]:l,[Y]:h,[X]:c,[W]:i,[U]:r,[T]:o};class Ba extends e{getAsnExtnValue(){return this.asn.extnValue.buffer}constructor(a){super(a,b);const s=this.getAsnExtnValue();try{const a=za[this.asn.extnID];if(a){this.value=n.parse(s,a)}else{console.warn(`Didn't detect parser for "${this.asn.extnID}" extension.`);this.value=R.Convert.ToHex(s)}}catch(a){console.error(`Error parse "${this.asn.extnID}" extension:`,a.message);this.value=R.Convert.ToHex(s)}}}export{Va as C,Ba as E};
//# sourceMappingURL=p-Cp20xosi.js.map