/*!
 * © Peculiar Ventures https://peculiarventures.com/ - MIT License
 */
import{a0 as a,a1 as s,a2 as t,A as e,a3 as n,q as r,a4 as o,a5 as i,a6 as b,a7 as c,a8 as h,a9 as u,aa as l,ab as p,ac as f,ad as x,ae as d,af as m,ag as w,ah as A,ai as E,aj as g,ak as D,al as N,am as S,an as $,ao as j,ap as q,aq as y,ar as C,as as F,at as J,au as O,av as Q,aw as V,ax as Z,ay as k,az as v,aA as z,aB as B,aC as G,aD as H,aE as I,aF as K,aG as L,b as M,aH as P,aI as R,aJ as T,aK as U,aL as W,aM as X,aN as Y,aO as _,aP as aa,aQ as sa,aR as ta,aS as ea,aT as na,aU as ra,aV as oa,aW as ia,aX as ba,aY as ca,aZ as ha,a_ as ua,a$ as la,b0 as pa,b1 as fa,b2 as xa,b3 as da,b4 as ma,b5 as wa,b6 as Aa,b7 as Ea,b8 as ga,b9 as Da,ba as Na,bb as Sa,bc as $a,bd as ja,be as qa,bf as ya,bg as Ca}from"./p-DlZsmFQf.js";const Fa="1.3.6.1.4.1.11129.2.4.2";class Ja extends a{constructor(){super(...arguments);this.items=[]}fromASN(a){super.fromASN(a);const e=new s(this.buffer);const n=e.readNumber(2);this.items=[];while(e.position<n){this.items.push(new t(e))}return this}toJSON(){return this.items.map((a=>a.toJSON()))}}const Oa="1.3.6.1.5.5.7.1.12";
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */const Qa={[Ca]:L,[ya]:K,[qa]:I,[ja]:H,[$a]:G,[Sa]:B,"2.5.29.46":B,[Na]:z,[Da]:v,[ga]:k,[Ea]:Z,[Aa]:V,[wa]:Q,[ma]:O,[da]:J,[xa]:F,[fa]:C,[pa]:y,[la]:q,[ua]:j,[ha]:$,[ca]:S,[ba]:N,[ia]:D,[oa]:g,[ra]:E,[Fa]:Ja,[na]:A,[ea]:w,[ta]:m,[sa]:d,[aa]:x,[_]:f,"2.16.724.1.2.2.4.1":p,[Y]:p,[Oa]:l,[X]:u,[W]:h,[U]:c,[T]:b,[R]:i,[P]:o};class Va extends e{getAsnExtnValue(){return this.asn.extnValue.buffer}constructor(a){super(a,n);const s=this.getAsnExtnValue();try{const a=Qa[this.asn.extnID];if(a){this.value=r.parse(s,a)}else{console.warn(`Didn't detect parser for "${this.asn.extnID}" extension.`);this.value=M.Convert.ToHex(s)}}catch(a){console.error(`Error parse "${this.asn.extnID}" extension:`,a.message);this.value=M.Convert.ToHex(s)}}}export{Ja as C,Va as E};
//# sourceMappingURL=p-D_iUymDX.js.map