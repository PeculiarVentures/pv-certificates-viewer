var __awaiter=this&&this.__awaiter||function(e,t,r,o){function a(e){return e instanceof r?e:new r((function(t){t(e)}))}return new(r||(r=Promise))((function(r,i){function n(e){try{s(o.next(e))}catch(e){i(e)}}function l(e){try{s(o["throw"](e))}catch(e){i(e)}}function s(e){e.done?r(e.value):a(e.value).then(n,l)}s((o=o.apply(e,t||[])).next())}))};var __generator=this&&this.__generator||function(e,t){var r={label:0,sent:function(){if(i[0]&1)throw i[1];return i[1]},trys:[],ops:[]},o,a,i,n;return n={next:l(0),throw:l(1),return:l(2)},typeof Symbol==="function"&&(n[Symbol.iterator]=function(){return this}),n;function l(e){return function(t){return s([e,t])}}function s(n){if(o)throw new TypeError("Generator is already executing.");while(r)try{if(o=1,a&&(i=n[0]&2?a["return"]:n[0]?a["throw"]||((i=a["return"])&&i.call(a),0):a.next)&&!(i=i.call(a,n[1])).done)return i;if(a=0,i)n=[n[0]&2,i.value];switch(n[0]){case 0:case 1:i=n;break;case 4:r.label++;return{value:n[1],done:false};case 5:r.label++;a=n[1];n=[0];continue;case 7:n=r.ops.pop();r.trys.pop();continue;default:if(!(i=r.trys,i=i.length>0&&i[i.length-1])&&(n[0]===6||n[0]===2)){r=0;continue}if(n[0]===3&&(!i||n[1]>i[0]&&n[1]<i[3])){r.label=n[1];break}if(n[0]===6&&r.label<i[1]){r.label=i[1];i=n;break}if(i&&r.label<i[2]){r.label=i[2];r.ops.push(n);break}if(i[2])r.ops.pop();r.trys.pop();continue}n=t.call(e,r)}catch(e){n=[6,e];a=0}finally{o=i=0}if(n[0]&5)throw n[1];return{value:n[0]?n[1]:void 0,done:true}}};
/*!
 * © Peculiar Ventures https://peculiarventures.com/ - MIT License
 */System.register(["./p-9837be14.system.js","./p-047b12d9.system.js","./p-29cdd256.system.js","./p-4f52a24f.system.js","./p-88fbaf05.system.js"],(function(e){"use strict";var t,r,o,a,i,n,l,s;return{setters:[function(e){t=e.r;r=e.c;o=e.h;a=e.H},function(e){i=e.as;n=e.O},function(e){l=e.D},function(e){s=e.l},function(){}],execute:function(){var c=':host{-webkit-box-sizing:border-box;box-sizing:border-box}:host *,:host *:before,:host *:after{-webkit-box-sizing:inherit;box-sizing:inherit}:host{display:block;width:100%;word-wrap:break-word;min-width:280px;overflow:auto;position:relative;background:white;background:rgba(var(--pv-color-light-rgb), 1)}table{width:100%;table-layout:fixed;border-collapse:collapse;border-spacing:0}table thead{background-color:rgba(53, 132, 247, 0.07);background-color:rgba(var(--pv-color-primary-rgb), 0.07)}table tr td{vertical-align:middle}table tbody tr:not(.expanded_summary){cursor:pointer}table tr{border-color:#d1d5d9;border-color:rgba(var(--pv-color-grey_3-rgb), 1)}table th{padding:15px 10px;border-width:1px;border-style:solid;border-color:#d1d5d9;border-color:rgba(var(--pv-color-grey_3-rgb), 1)}table td{padding:8px 10px;border-width:1px;border-style:solid;border-color:#d1d5d9;border-color:rgba(var(--pv-color-grey_3-rgb), 1)}table .col_issuer,table .col_name,table .col_public_key{width:16%}table .col_actions,table .col_tests{width:18%}table.m_extra .col_issuer,table.m_extra .col_name,table.m_extra .col_public_key{width:12%}table.m_extra .col_actions,table.m_extra .col_tests{width:17%}table tr.expanded td:not(:last-child){border-right-color:transparent}table tr.expanded td{border-bottom-color:transparent}.expanded{border-bottom-color:transparent;background-color:rgba(53, 132, 247, 0.04);background-color:rgba(var(--pv-color-primary-rgb), 0.04)}table tr.expanded_summary{background-color:rgba(53, 132, 247, 0.04);background-color:rgba(var(--pv-color-primary-rgb), 0.04)}table tr.expanded_summary td{vertical-align:top;padding:10px 20px 26px}@-webkit-keyframes fadeIn{0%{opacity:0.001}100%{opacity:1}}@keyframes fadeIn{0%{opacity:0.001}100%{opacity:1}}.modal_wrapper{position:fixed;top:0;left:0;width:100%;height:100%;z-index:1;overflow:auto;text-align:center;-webkit-animation:fadeIn 200ms;animation:fadeIn 200ms;padding:30px 10px}.modal_wrapper:before{display:inline-block;vertical-align:middle;width:0;height:100%;content:""}.modal_backdrop{background:rgba(42, 49, 52, 0.5);background:rgba(var(--pv-color-dark-rgb), 0.5);z-index:-1;position:fixed;top:0;right:0;bottom:0;left:0}.modal_container{position:relative;display:inline-block;vertical-align:middle;width:100%;max-width:900px;text-align:left;border-radius:3px;overflow:hidden;background-color:white;background-color:rgba(var(--pv-color-light-rgb), 1);height:100%}.modal_title{background-color:rgba(53, 132, 247, 0.07);background-color:rgba(var(--pv-color-primary-rgb), 0.07);border-color:#d1d5d9;border-color:rgba(var(--pv-color-grey_3-rgb), 1);border-bottom-width:1px;border-bottom-style:solid;padding:20px 60px 16px 20px;position:relative;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;height:60px}.modal_content{height:calc(100% - 60px);overflow-y:auto}.modal_close{cursor:pointer;border:none;background-color:transparent;position:absolute;top:0;bottom:0;right:0;padding:0 12px;-webkit-transition:opacity 100ms;transition:opacity 100ms;outline:none}.modal_close:hover{opacity:0.6}.modal_close svg{fill:#2a3134;fill:rgba(var(--pv-color-dark-rgb), 1)}.button_table_action{margin:2px}.mobile_title{display:none}.status_wrapper{height:85px;text-align:center;pointer-events:none}.search_section{background-color:rgba(53, 132, 247, 0.07);background-color:rgba(var(--pv-color-primary-rgb), 0.07);border-color:#d1d5d9;border-color:rgba(var(--pv-color-grey_3-rgb), 1);height:50px;padding:10px;border-width:1px 1px 0 1px;border-style:solid}.input_search{height:100%;width:100%;border-radius:3px;border-width:1px;border-style:solid;padding:0 14px;font-size:12px;outline:none;border-color:#d1d5d9;border-color:rgba(var(--pv-color-grey_3-rgb), 1);color:#2a3134;color:rgba(var(--pv-color-dark-rgb), 1)}.input_search::-webkit-input-placeholder{color:#d1d5d9;color:rgba(var(--pv-color-grey_3-rgb), 1)}.input_search::-moz-placeholder{color:#d1d5d9;color:rgba(var(--pv-color-grey_3-rgb), 1)}.input_search:-ms-input-placeholder{color:#d1d5d9;color:rgba(var(--pv-color-grey_3-rgb), 1)}.input_search::-ms-input-placeholder{color:#d1d5d9;color:rgba(var(--pv-color-grey_3-rgb), 1)}.input_search::placeholder{color:#d1d5d9;color:rgba(var(--pv-color-grey_3-rgb), 1)}.loading_container{position:absolute;top:0;left:0;width:100%;height:100%;background:rgba(42, 49, 52, 0.3);background:rgba(var(--pv-color-dark-rgb), 0.3);display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center}.align_center{text-align:center}@media (hover: hover){table tbody tr:not(.expanded_summary):hover{background-color:rgba(53, 132, 247, 0.04);background-color:rgba(var(--pv-color-primary-rgb), 0.04)}}@media (max-width: 900px){table,tbody,tr,td{display:block}thead{display:none}tr{padding:0 15px;border-width:1px;border-style:solid}tr:not(:first-child){margin-top:-1px}tr:not(.expanded_summary) td:first-child{border:none !important}table td{padding-left:0;padding-right:0;border-width:1px 0 0 0 !important;border-color:rgba(209, 213, 217, 0.5);border-color:rgba(var(--pv-color-grey_3-rgb), 0.5)}table tr.expanded_summary td{padding:15px 0}.mobile_title{display:inline-block;width:90px;vertical-align:middle}.modal_title{padding:17px 60px 17px 15px}.content{display:inline-block;width:calc(100% - 90px);vertical-align:middle;text-align:left}.expanded_summary{border-top-color:transparent;padding-bottom:10px}.expanded_summary td:before{content:none}.status_wrapper{height:266px;display:table-cell}.search_section{height:60px;padding:15px}.align_center{text-align:inherit}}';var d=e("peculiar_certificates_viewer",function(){function e(e){var o=this;t(this,e);this.detailsOpen=r(this,"detailsOpen",7);this.detailsClose=r(this,"detailsClose",7);this.certificates=[];this.filterWithSearch=true;this.highlightWithSearch=true;this.search="";this.certificatesDecoded=[];this.isDecodeInProcess=true;this.isHasTests=false;this.isHasRoots=false;this.handleClickDetails=function(e,t){t.stopPropagation();o.certificateSelectedForDetails=e;o.detailsOpen.emit(e)};this.handleModalClose=function(){o.certificateSelectedForDetails=undefined;o.detailsClose.emit()};this.handleSearch=function(e){o.search=e.target.value.trim()}}e.prototype.componentWillLoad=function(){this.certificatesDecodeAndSet()};e.prototype.watchCertificates=function(e,t){if(JSON.stringify(e)!==JSON.stringify(t)){this.certificatesDecodeAndSet()}};e.prototype.certificatesDecodeAndSet=function(){return __awaiter(this,void 0,void 0,(function(){var e,t,r,o,a,n,l,s;return __generator(this,(function(c){switch(c.label){case 0:e=false;t=false;if(!Array.isArray(this.certificates)){return[2]}r=[];o=0,a=this.certificates;c.label=1;case 1:if(!(o<a.length))return[3,6];n=a[o];c.label=2;case 2:c.trys.push([2,4,,5]);l=new i(n.value);return[4,l.getThumbprint("SHA-1")];case 3:c.sent();r.push({body:l,tests:n.tests,name:n.name});if(!t&&l.isRoot){t=true}if(!e){if(n.tests&&(n.tests.expired||n.tests.revoked||n.tests.valid)){e=true}}return[3,5];case 4:s=c.sent();console.error("Error certificate parse:",s);return[3,5];case 5:o++;return[3,1];case 6:this.isHasTests=e;this.isHasRoots=t;this.isDecodeInProcess=false;this.certificatesDecoded=r;return[2]}}))}))};e.prototype.handleClickDownloadAsPem=function(e,t){t.stopPropagation();l.x509.asPEM(e.body.exportAsPemFormatted(),e.name||e.body.commonName)};e.prototype.handleClickDownloadAsDer=function(e,t){t.stopPropagation();l.x509.asPEM(e.body.exportAsHexFormatted(),e.name||e.body.commonName)};e.prototype.handleClickRow=function(e){var t=this.expandedRow===e;this.expandedRow=t?undefined:e};e.prototype.getMaxColSpanValue=function(){var e=4;if(this.isHasTests){e+=1}if(!this.isHasRoots){e+=1}return e};e.prototype.renderExpandedRow=function(e){var t=this.getMaxColSpanValue();return o("tr",{class:"expanded_summary"},o("td",{colSpan:t},o("peculiar-certificate-summary",{certificate:e,showIssuer:!e.isRoot})))};e.prototype.renderCertificateTests=function(e){if(!e){return null}var t=[];if(e.valid){t.push(o("peculiar-button",{class:"button_table_action",href:e.valid,target:"_blank"},s.getString("valid")))}if(e.revoked){t.push(o("peculiar-button",{class:"button_table_action",href:e.revoked,target:"_blank"},s.getString("revoked")))}if(e.expired){t.push(o("peculiar-button",{class:"button_table_action",href:e.expired,target:"_blank"},s.getString("expired")))}return t};e.prototype.renderContentState=function(){var e=this;var t=this.highlightWithSearch?this.search:"";var r=[];this.certificatesDecoded.forEach((function(a,i){var l=i===e.expandedRow;var c=n[a.body.signature.algorithm]||a.body.signature.algorithm;if(e.filterWithSearch&&e.search){var d=[c,a.body.issuerCommonName,a.name,a.body.commonName,a.body.thumbprints["SHA-1"]].join(" ").toLowerCase();if(d.indexOf(e.search.toLowerCase())===-1){return}}r.push([o("tr",{class:{expanded:l},onClick:e.handleClickRow.bind(e,i),key:i},!e.isHasRoots&&o("td",null,o("peculiar-typography",{class:"mobile_title",color:"grey_5"},s.getString("issuer"),":"),o("peculiar-typography",{class:"content"},o("peculiar-highlight-words",{search:t},a.body.issuerCommonName))),o("td",null,o("peculiar-typography",{class:"mobile_title",color:"grey_5"},s.getString("name"),":"),o("peculiar-typography",{class:"content"},o("peculiar-highlight-words",{search:t},a.name||a.body.commonName))),o("td",null,o("peculiar-typography",{class:"mobile_title",color:"grey_5"},s.getString("publicKey"),":"),o("peculiar-typography",{class:"content"},o("peculiar-highlight-words",{search:t},c))),o("td",null,o("peculiar-typography",{class:"mobile_title",color:"grey_5"},s.getString("fingerprint"),"  (SHA-1):"),o("peculiar-typography",{class:"content",monospace:true},o("peculiar-highlight-words",{search:t},a.body.thumbprints["SHA-1"]))),o("td",{class:"align_center"},o("peculiar-typography",{class:"mobile_title",color:"grey_5"},s.getString("actions"),":"),o("span",{class:"content"},o("peculiar-button",{onClick:e.handleClickDetails.bind(e,a.body),class:"button_table_action"},s.getString("details")),o("peculiar-button-split",{onClick:e.handleClickDownloadAsPem.bind(e,a),actions:[{text:s.getString("download.der"),onClick:e.handleClickDownloadAsDer.bind(e,a)}],class:"button_table_action"},s.getString("download.pem")))),e.isHasTests&&o("td",{class:"align_center"},o("peculiar-typography",{class:"mobile_title",color:"grey_5"},s.getString("testURLs"),":"),o("span",{class:"content"},e.renderCertificateTests(a.tests)))),l&&e.renderExpandedRow(a.body)])}));return r};e.prototype.renderCertificateDetailsModal=function(){if(!this.certificateSelectedForDetails){return null}return o("div",{class:"modal_wrapper",role:"presentation","aria-hidden":"false",part:"presentation"},o("div",{class:"modal_backdrop",onClick:this.handleModalClose,"aria-hidden":"true"}),o("div",{class:"modal_container",role:"dialog",part:"presentation_container"},o("header",{class:"modal_title"},o("peculiar-typography",{type:"h4"},s.getString("certificateDetails")),o("button",{class:"modal_close",onClick:this.handleModalClose,type:"button","aria-label":"Close",title:"Close"},o("svg",{width:"30",height:"30",viewBox:"0 0 30 30",xmlns:"http://www.w3.org/2000/svg"},o("path",{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M15.7204 14.375L21.0654 19.7185C21.3115 19.9658 21.3115 20.3693 21.0654 20.6154L20.615 21.0645C20.3689 21.3118 19.9667 21.3118 19.7181 21.0645L14.3744 15.721L9.03194 21.0645C8.78327 21.3118 8.3811 21.3118 8.13371 21.0645L7.68459 20.6154C7.43847 20.3693 7.43847 19.9658 7.68459 19.7185L13.0296 14.375L7.68459 9.03155C7.43847 8.78417 7.43847 8.38074 7.68459 8.13463L8.13371 7.68554C8.3811 7.43815 8.78327 7.43815 9.03194 7.68554L14.3744 13.029L19.7181 7.68554C19.9667 7.43815 20.3689 7.43815 20.615 7.68554L21.0654 8.13463C21.3115 8.38074 21.3115 8.78417 21.0654 9.03155L15.7204 14.375Z"})))),o("div",{class:"modal_content"},o("peculiar-certificate-viewer",{certificate:this.certificateSelectedForDetails}))))};e.prototype.renderSearch=function(){if(!this.filterWithSearch&&!this.highlightWithSearch){return null}return o("div",{class:"search_section"},o("input",{onInput:this.handleSearch,type:"search",value:"",class:"input_search",disabled:!this.certificatesDecoded.length,placeholder:"Search"}))};e.prototype.renderEmptyState=function(){var e=this.getMaxColSpanValue();return o("tr",null,o("td",{class:"status_wrapper",colSpan:e},o("peculiar-typography",{type:"b1",align:"center"},"There are no certificates available.")))};e.prototype.renderEmptySearchState=function(){var e=this.getMaxColSpanValue();return o("tr",null,o("td",{class:"status_wrapper",colSpan:e},o("peculiar-typography",{type:"b1",align:"center"},"No results found for “",this.search,"“")))};e.prototype.renderLoadingState=function(){return o("div",{class:"loading_container"},o("peculiar-circular-progress",null))};e.prototype.renderBody=function(){if(this.isDecodeInProcess){return null}if(!this.certificatesDecoded.length){return this.renderEmptyState()}var e=this.renderContentState();if(this.search&&!e.length){return this.renderEmptySearchState()}return e};e.prototype.render=function(){return o(a,null,this.renderSearch(),o("table",{class:{m_extra:this.isHasTests||!this.isHasRoots}},o("thead",null,o("tr",null,!this.isHasRoots&&o("th",{class:"col_issuer"},o("peculiar-typography",{type:"h7",align:"left"},s.getString("issuer"))),o("th",{class:"col_name"},o("peculiar-typography",{type:"h7",align:"left"},s.getString("name"))),o("th",{class:"col_public_key"},o("peculiar-typography",{type:"h7",align:"left"},s.getString("publicKey"))),o("th",{class:"col_fingerprint"},o("peculiar-typography",{type:"h7",align:"left"},s.getString("fingerprint"),"  (SHA-1)")),o("th",{class:"col_actions"},o("peculiar-typography",{type:"h7",align:"center"},s.getString("actions"))),this.isHasTests&&o("th",{class:"col_tests"},o("peculiar-typography",{type:"h7",align:"center"},s.getString("testURLs"))))),o("tbody",null,this.renderBody())),this.renderCertificateDetailsModal(),this.isDecodeInProcess&&this.renderLoadingState())};Object.defineProperty(e,"watchers",{get:function(){return{certificates:["watchCertificates"]}},enumerable:false,configurable:true});return e}());d.style=c}}}));