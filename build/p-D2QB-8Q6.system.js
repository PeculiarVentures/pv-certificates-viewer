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
             */
/**
             * Read file as Binary string
             *
             * @example
             * ```js
             *    const file = new File(['file'], 'file.pdf', { type: 'text/plain' });
             *    readAsBinaryString(file)
             *      .then(result => console.log('Readed success', result))
             *      .catch(err => console.log('An error occured when reading file', err));
             * ```
             */function n(e){return new Promise((function(n,r){var i=new FileReader;i.onload=function(){return n({value:i.result,fileName:e.name,fileSize:e.size,sourceMime:e.type})};i.onerror=function(){return r(i.error)};i.readAsBinaryString(e)}))}
/**
             * Read file as ArrayBuffer
             *
             * @example
             * ```js
             *    const file = new File(['file'], 'file.pdf', { type: 'text/plain' });
             *    readAsArrayBuffer(file)
             *      .then(result => console.log('Readed success', result))
             *      .catch(err => console.log('An error occured when reading file', err));
             * ```
             */function r(e){return new Promise((function(n,r){var i=new FileReader;i.onload=function(){return n({value:i.result,fileName:e.name,fileSize:e.size,sourceMime:e.type})};i.onerror=function(){return r(i.error)};i.readAsArrayBuffer(e)}))}
/**
             * Read file as Data URL
             *
             * @example
             * ```js
             *    const file = new File(['file'], 'file.pdf', { type: 'text/plain' });
             *    readAsDataUrl(file)
             *      .then(result => console.log('Readed success', result))
             *      .catch(err => console.log('An error occured when reading file', err));
             * ```
             */function i(e){return new Promise((function(n,r){var i=new FileReader;i.onload=function(){return n({value:i.result,fileName:e.name,fileSize:e.size,sourceMime:e.type})};i.onerror=function(){return r(i.error)};i.readAsDataURL(e)}))}
/**
             * Read file as Text
             *
             * @example
             * ```js
             *    const file = new File(['file'], 'file.pdf', { type: 'text/plain' });
             *    readAsText(file)
             *      .then(result => console.log('Readed success', result))
             *      .catch(err => console.log('An error occured when reading file', err));
             * ```
             */function u(e,n){return new Promise((function(r,i){var u=new FileReader;u.onload=function(){return r({value:u.result,fileName:e.name,fileSize:e.size,sourceMime:e.type})};u.onerror=function(){return i(u.error)};u.readAsText(e,n)}))}}}}));