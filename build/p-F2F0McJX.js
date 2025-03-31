/*!
 * © Peculiar Ventures https://peculiarventures.com/ - MIT License
 */
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
function e(e){return new Promise(((i,n)=>{const r=new FileReader;r.onload=()=>i({value:r.result,fileName:e.name,fileSize:e.size,sourceMime:e.type});r.onerror=()=>n(r.error);r.readAsBinaryString(e)}))}function i(e){return new Promise(((i,n)=>{const r=new FileReader;r.onload=()=>i({value:r.result,fileName:e.name,fileSize:e.size,sourceMime:e.type});r.onerror=()=>n(r.error);r.readAsArrayBuffer(e)}))}function n(e){return new Promise(((i,n)=>{const r=new FileReader;r.onload=()=>i({value:r.result,fileName:e.name,fileSize:e.size,sourceMime:e.type});r.onerror=()=>n(r.error);r.readAsDataURL(e)}))}function r(e,i){return new Promise(((n,r)=>{const a=new FileReader;a.onload=()=>n({value:a.result,fileName:e.name,fileSize:e.size,sourceMime:e.type});a.onerror=()=>r(a.error);a.readAsText(e,i)}))}export{e as a,n as b,r as c,i as r};
//# sourceMappingURL=p-F2F0McJX.js.map