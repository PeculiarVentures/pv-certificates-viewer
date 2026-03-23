/*!
 * © Peculiar Ventures https://peculiarventures.com/ - MIT License
 */
import{$ as a,a7 as s,a8 as t,A as e,a9 as b,q as n,aa as r,ab as o,ac as i,ad as c,ae as h,af as u,ag as l,ah as p,ai as x,aj as d,ak as f,al as m,am as j,an as w,ao as A,ap as E,aq as N,ar as $,as as g,at as S,au as k,av as q,aw as y,ax as C,ay as D,az as J,aA as O,aB as Q,aC as V,aD as W,aE as X,aF as v,aG as z,aH as B,aI as F,aJ as G,aK as H,aL as I,aM as K,b as L,aN as M,aO as P,aP as R,aQ as T,aR as U,aS as Y,aT as Z,aU as _,aV as aa,aW as sa,aX as ta,aY as ea,aZ as ba,a_ as na,a$ as ra,b0 as oa,b1 as ia,b2 as ca,b3 as ha,b4 as ua,b5 as la,b6 as pa,b7 as xa,b8 as da,b9 as fa,ba as ma,bb as ja,bc as wa,bd as Aa,be as Ea,bf as Na,bg as $a,bh as ga,bi as Sa,bj as ka,bk as qa,bl as ya,bm as Ca}from"./p-W3NjaQ7X.js";const Da="1.3.6.1.4.1.11129.2.4.2";class Ja extends a{constructor(){super(...arguments);this.items=[]}fromASN(a){super.fromASN(a);const e=new s(this.buffer);const b=e.readNumber(2);this.items=[];while(e.position<b){this.items.push(new t(e))}return this}toJSON(){return this.items.map((a=>a.toJSON()))}}const Oa="1.3.6.1.5.5.7.1.12";
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */const Qa={[Ca]:K,[ya]:I,[qa]:H,[ka]:G,[Sa]:F,[ga]:B,"2.5.29.46":B,[$a]:z,[Na]:v,[Ea]:X,[Aa]:W,[wa]:V,[ja]:Q,[ma]:O,[fa]:J,[da]:D,[xa]:C,[pa]:y,[la]:q,[ua]:k,[ha]:S,[ca]:g,[ia]:$,[oa]:N,[ra]:E,[na]:A,[Da]:Ja,[ba]:w,[ea]:j,[ta]:m,[sa]:f,[aa]:d,[_]:x,"2.16.724.1.2.2.4.1":p,[Z]:p,[Oa]:l,[Y]:u,[U]:h,[T]:c,[R]:i,[P]:o,[M]:r};class Va extends e{getAsnExtnValue(){return this.asn.extnValue.buffer}constructor(a){super(a,b);const s=this.getAsnExtnValue();try{const a=Qa[this.asn.extnID];if(a){this.value=n.parse(s,a)}else{console.warn(`Didn't detect parser for "${this.asn.extnID}" extension.`);this.value=L.Convert.ToHex(s)}}catch(a){console.error(`Error parse "${this.asn.extnID}" extension:`,a.message);this.value=L.Convert.ToHex(s)}}}export{Ja as C,Va as E};
//# sourceMappingURL=p-CLH6WW-E.js.map