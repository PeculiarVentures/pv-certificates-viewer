/*!
 * © Peculiar Ventures https://peculiarventures.com/ - MIT License
 */
import{b as e}from"./p-006865d7.js";
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */function t(e,t,o,n="application/octet-stream"){const c=new Blob([e],{type:n});if(navigator.msSaveBlob)return navigator.msSaveBlob(c,`${t}.${o}`),new Promise((e=>setTimeout(e,100)));const a=window.URL.createObjectURL(c),i=document.createElement("a"),s=document.createElement("iframe");return i.style.display="none",s.style.display="none",s.name=a,document.body.appendChild(s),i.href=a,i.target=a,i.download=`${t}.${o}`,document.body.appendChild(i),i.dispatchEvent(new MouseEvent("click")),document.body.removeChild(i),new Promise((e=>setTimeout((()=>{document.body.removeChild(s),e(void 0)}),100)))}
/**
 * @license
 * Copyright (c) Peculiar Ventures, LLC.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */class o{}o.x509={asPEM:(o,n)=>{t(e.Convert.FromString(o),n,"cer","application/pkix-cert")},asDER:(o,n)=>{t(e.Convert.FromString(o),n,"cer","application/pkix-cert")}},o.pkcs10={asPEM:(o,n)=>{t(e.Convert.FromString(o),n,"csr","application/pkcs10")},asDER:(o,n)=>{t(e.Convert.FromString(o),n,"csr","application/pkcs10")}};export{o as D,t as d}