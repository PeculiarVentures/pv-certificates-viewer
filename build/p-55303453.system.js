/*!
 * © Peculiar Ventures https://peculiarventures.com/ - MIT License
 */
System.register([],(function(e){"use strict";return{execute:function(){e({a:n,b:i,c:u,r:r});
/**
             * @license
             * Copyright (c) Peculiar Ventures, LLC.
             *
             * This source code is licensed under the MIT license found in the
             * LICENSE file in the root directory of this source tree.
             */function n(e){return new Promise((function(n,r){var i=new FileReader;i.onload=function(){return n({value:i.result,fileName:e.name,fileSize:e.size,sourceMime:e.type})};i.onerror=function(){return r(i.error)};i.readAsBinaryString(e)}))}function r(e){return new Promise((function(n,r){var i=new FileReader;i.onload=function(){return n({value:i.result,fileName:e.name,fileSize:e.size,sourceMime:e.type})};i.onerror=function(){return r(i.error)};i.readAsArrayBuffer(e)}))}function i(e){return new Promise((function(n,r){var i=new FileReader;i.onload=function(){return n({value:i.result,fileName:e.name,fileSize:e.size,sourceMime:e.type})};i.onerror=function(){return r(i.error)};i.readAsDataURL(e)}))}function u(e,n){return new Promise((function(r,i){var u=new FileReader;u.onload=function(){return r({value:u.result,fileName:e.name,fileSize:e.size,sourceMime:e.type})};u.onerror=function(){return i(u.error)};u.readAsText(e,n)}))}}}}));
//# sourceMappingURL=p-55303453.system.js.map