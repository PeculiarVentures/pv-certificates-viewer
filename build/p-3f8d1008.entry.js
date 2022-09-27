/*!
 * © Peculiar Ventures https://peculiarventures.com/ - MIT License
 */
import{r as t,c as r,h as e,H as o}from"./p-f7683ba5.js";import{X as a}from"./p-17c4da7b.js";import{O as i}from"./p-464e0943.js";import"./p-006865d7.js";import{l}from"./p-4f4c1d30.js";import{D as s}from"./p-d7a13cb4.js";import"./p-d0b55fbb.js";const c=class{constructor(e){t(this,e),this.detailsOpen=r(this,"detailsOpen",7),this.detailsClose=r(this,"detailsClose",7),this.certificates=[],this.filterWithSearch=!0,this.highlightWithSearch=!0,this.search="",this.certificatesDecoded=[],this.isDecodeInProcess=!0,this.isHasTests=!1,this.isHasRoots=!1,this.handleClickDetails=(t,r)=>{r.stopPropagation(),this.certificateSelectedForDetails=t,this.detailsOpen.emit(t)},this.handleModalClose=()=>{this.certificateSelectedForDetails=void 0,this.detailsClose.emit()},this.handleSearch=t=>{this.search=t.target.value.trim()}}componentWillLoad(){this.certificatesDecodeAndSet()}watchCertificates(t,r){JSON.stringify(t)!==JSON.stringify(r)&&this.certificatesDecodeAndSet()}async certificatesDecodeAndSet(){let t=!1,r=!1;if(!Array.isArray(this.certificates))return;const e=[];for(const o of this.certificates)try{const i=new a(o.value);await i.getThumbprint("SHA-1"),e.push({body:i,tests:o.tests,name:o.name}),!r&&i.isRoot&&(r=!0),t||o.tests&&(o.tests.expired||o.tests.revoked||o.tests.valid)&&(t=!0)}catch(t){console.error("Error certificate parse:",t)}this.isHasTests=t,this.isHasRoots=r,this.isDecodeInProcess=!1,this.certificatesDecoded=e}handleClickDownloadAsPem(t,r){r.stopPropagation(),s.x509.asPEM(t.body.exportAsPemFormatted(),t.name||t.body.commonName)}handleClickDownloadAsDer(t,r){r.stopPropagation(),s.x509.asPEM(t.body.exportAsHexFormatted(),t.name||t.body.commonName)}handleClickRow(t){this.expandedRow=this.expandedRow===t?void 0:t}getMaxColSpanValue(){let t=4;return this.isHasTests&&(t+=1),this.isHasRoots||(t+=1),t}renderExpandedRow(t){const r=this.getMaxColSpanValue();return e("tr",{class:"expanded_summary"},e("td",{colSpan:r},e("peculiar-certificate-summary",{certificate:t,showIssuer:!t.isRoot})))}renderCertificateTests(t){if(!t)return null;const r=[];return t.valid&&r.push(e("peculiar-button",{class:"button_table_action",href:t.valid,target:"_blank"},l.getString("valid"))),t.revoked&&r.push(e("peculiar-button",{class:"button_table_action",href:t.revoked,target:"_blank"},l.getString("revoked"))),t.expired&&r.push(e("peculiar-button",{class:"button_table_action",href:t.expired,target:"_blank"},l.getString("expired"))),r}renderContentState(){const t=this.highlightWithSearch?this.search:"",r=[];return this.certificatesDecoded.forEach(((o,a)=>{const s=a===this.expandedRow,c=i[o.body.signature.algorithm]||o.body.signature.algorithm;this.filterWithSearch&&this.search&&-1===[c,o.body.issuerCommonName,o.name,o.body.commonName,o.body.thumbprints["SHA-1"]].join(" ").toLowerCase().indexOf(this.search.toLowerCase())||r.push([e("tr",{class:{expanded:s},onClick:this.handleClickRow.bind(this,a),key:o.body.thumbprints["SHA-1"]},!this.isHasRoots&&e("td",null,e("peculiar-typography",{class:"mobile_title",color:"grey_5"},l.getString("issuer"),":"),e("peculiar-typography",{class:"content"},e("peculiar-highlight-words",{search:t},o.body.issuerCommonName))),e("td",null,e("peculiar-typography",{class:"mobile_title",color:"grey_5"},l.getString("name"),":"),e("peculiar-typography",{class:"content"},e("peculiar-highlight-words",{search:t},o.name||o.body.commonName))),e("td",null,e("peculiar-typography",{class:"mobile_title",color:"grey_5"},l.getString("publicKey"),":"),e("peculiar-typography",{class:"content"},e("peculiar-highlight-words",{search:t},c))),e("td",null,e("peculiar-typography",{class:"mobile_title",color:"grey_5"},l.getString("fingerprint"),"  (SHA-1):"),e("peculiar-typography",{class:"content",monospace:!0},e("peculiar-highlight-words",{search:t},o.body.thumbprints["SHA-1"]))),e("td",{class:"align_center"},e("peculiar-typography",{class:"mobile_title",color:"grey_5"},l.getString("actions"),":"),e("span",{class:"content"},e("peculiar-button",{onClick:this.handleClickDetails.bind(this,o.body),class:"button_table_action"},l.getString("details")),e("peculiar-button-split",{onClick:this.handleClickDownloadAsPem.bind(this,o),actions:[{text:l.getString("download.der"),onClick:this.handleClickDownloadAsDer.bind(this,o)}],class:"button_table_action"},l.getString("download.pem")))),this.isHasTests&&e("td",{class:"align_center"},e("peculiar-typography",{class:"mobile_title",color:"grey_5"},l.getString("testURLs"),":"),e("span",{class:"content"},this.renderCertificateTests(o.tests)))),s&&this.renderExpandedRow(o.body)])})),r}renderCertificateDetailsModal(){return this.certificateSelectedForDetails?e("div",{class:"modal_wrapper",role:"presentation","aria-hidden":"false",part:"presentation"},e("div",{class:"modal_backdrop",onClick:this.handleModalClose,"aria-hidden":"true"}),e("div",{class:"modal_container",role:"dialog",part:"presentation_container"},e("header",{class:"modal_title"},e("peculiar-typography",{type:"h4"},l.getString("certificateDetails")),e("button",{class:"modal_close",onClick:this.handleModalClose,type:"button","aria-label":"Close",title:"Close"},e("svg",{width:"30",height:"30",viewBox:"0 0 30 30",xmlns:"http://www.w3.org/2000/svg"},e("path",{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M15.7204 14.375L21.0654 19.7185C21.3115 19.9658 21.3115 20.3693 21.0654 20.6154L20.615 21.0645C20.3689 21.3118 19.9667 21.3118 19.7181 21.0645L14.3744 15.721L9.03194 21.0645C8.78327 21.3118 8.3811 21.3118 8.13371 21.0645L7.68459 20.6154C7.43847 20.3693 7.43847 19.9658 7.68459 19.7185L13.0296 14.375L7.68459 9.03155C7.43847 8.78417 7.43847 8.38074 7.68459 8.13463L8.13371 7.68554C8.3811 7.43815 8.78327 7.43815 9.03194 7.68554L14.3744 13.029L19.7181 7.68554C19.9667 7.43815 20.3689 7.43815 20.615 7.68554L21.0654 8.13463C21.3115 8.38074 21.3115 8.78417 21.0654 9.03155L15.7204 14.375Z"})))),e("div",{class:"modal_content"},e("peculiar-certificate-viewer",{certificate:this.certificateSelectedForDetails})))):null}renderSearch(){return this.filterWithSearch||this.highlightWithSearch?e("div",{class:"search_section"},e("input",{onInput:this.handleSearch,type:"search",value:"",class:"input_search",disabled:!this.certificatesDecoded.length,placeholder:"Search"})):null}renderEmptyState(){const t=this.getMaxColSpanValue();return e("tr",null,e("td",{class:"status_wrapper",colSpan:t},e("peculiar-typography",{type:"b1",align:"center"},"There are no certificates available.")))}renderEmptySearchState(){const t=this.getMaxColSpanValue();return e("tr",null,e("td",{class:"status_wrapper",colSpan:t},e("peculiar-typography",{type:"b1",align:"center"},"No results found for “",this.search,"“")))}renderLoadingState(){return e("div",{class:"loading_container"},e("peculiar-circular-progress",null))}renderBody(){if(this.isDecodeInProcess)return null;if(!this.certificatesDecoded.length)return this.renderEmptyState();const t=this.renderContentState();return this.search&&!t.length?this.renderEmptySearchState():t}render(){return e(o,null,this.renderSearch(),e("table",{class:{m_extra:this.isHasTests||!this.isHasRoots}},e("thead",null,e("tr",null,!this.isHasRoots&&e("th",{class:"col_issuer"},e("peculiar-typography",{type:"h7",align:"left"},l.getString("issuer"))),e("th",{class:"col_name"},e("peculiar-typography",{type:"h7",align:"left"},l.getString("name"))),e("th",{class:"col_public_key"},e("peculiar-typography",{type:"h7",align:"left"},l.getString("publicKey"))),e("th",{class:"col_fingerprint"},e("peculiar-typography",{type:"h7",align:"left"},l.getString("fingerprint"),"  (SHA-1)")),e("th",{class:"col_actions"},e("peculiar-typography",{type:"h7",align:"center"},l.getString("actions"))),this.isHasTests&&e("th",{class:"col_tests"},e("peculiar-typography",{type:"h7",align:"center"},l.getString("testURLs"))))),e("tbody",null,this.renderBody())),this.renderCertificateDetailsModal(),this.isDecodeInProcess&&this.renderLoadingState())}static get watchers(){return{certificates:["watchCertificates"]}}};c.style=':host{-webkit-box-sizing:border-box;box-sizing:border-box}:host *,:host *:before,:host *:after{-webkit-box-sizing:inherit;box-sizing:inherit}:host{display:block;width:100%;word-wrap:break-word;min-width:280px;overflow:auto;position:relative;background:white;background:rgba(var(--pv-color-light-rgb), 1)}table{width:100%;table-layout:fixed;border-collapse:collapse;border-spacing:0}table thead{background-color:rgba(53, 132, 247, 0.07);background-color:rgba(var(--pv-color-primary-rgb), 0.07)}table tr td{vertical-align:middle}table tbody tr:not(.expanded_summary){cursor:pointer}table tr{border-color:#d1d5d9;border-color:rgba(var(--pv-color-grey_3-rgb), 1)}table th{padding:15px 10px;border-width:1px;border-style:solid;border-color:#d1d5d9;border-color:rgba(var(--pv-color-grey_3-rgb), 1)}table td{padding:8px 10px;border-width:1px;border-style:solid;border-color:#d1d5d9;border-color:rgba(var(--pv-color-grey_3-rgb), 1)}table .col_issuer,table .col_name,table .col_public_key{width:16%}table .col_actions,table .col_tests{width:18%}table.m_extra .col_issuer,table.m_extra .col_name,table.m_extra .col_public_key{width:12%}table.m_extra .col_actions,table.m_extra .col_tests{width:17%}table tr.expanded td:not(:last-child){border-right-color:transparent}table tr.expanded td{border-bottom-color:transparent}.expanded{border-bottom-color:transparent;background-color:rgba(53, 132, 247, 0.04);background-color:rgba(var(--pv-color-primary-rgb), 0.04)}table tr.expanded_summary{background-color:rgba(53, 132, 247, 0.04);background-color:rgba(var(--pv-color-primary-rgb), 0.04)}table tr.expanded_summary td{vertical-align:top;padding:10px 20px 26px}@-webkit-keyframes fadeIn{0%{opacity:0.001}100%{opacity:1}}@keyframes fadeIn{0%{opacity:0.001}100%{opacity:1}}.modal_wrapper{position:fixed;top:0;left:0;width:100%;height:100%;z-index:1;overflow:auto;text-align:center;-webkit-animation:fadeIn 200ms;animation:fadeIn 200ms;padding:30px 10px}.modal_wrapper:before{display:inline-block;vertical-align:middle;width:0;height:100%;content:""}.modal_backdrop{background:rgba(42, 49, 52, 0.5);background:rgba(var(--pv-color-dark-rgb), 0.5);z-index:-1;position:fixed;top:0;right:0;bottom:0;left:0}.modal_container{position:relative;display:inline-block;vertical-align:middle;width:100%;max-width:900px;text-align:left;border-radius:3px;overflow:hidden;background-color:white;background-color:rgba(var(--pv-color-light-rgb), 1);height:100%}.modal_title{background-color:rgba(53, 132, 247, 0.07);background-color:rgba(var(--pv-color-primary-rgb), 0.07);border-color:#d1d5d9;border-color:rgba(var(--pv-color-grey_3-rgb), 1);border-bottom-width:1px;border-bottom-style:solid;padding:20px 60px 16px 20px;position:relative;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;height:60px}.modal_content{height:calc(100% - 60px);overflow-y:auto}.modal_close{cursor:pointer;border:none;background-color:transparent;position:absolute;top:0;bottom:0;right:0;padding:0 12px;-webkit-transition:opacity 100ms;transition:opacity 100ms;outline:none}.modal_close:hover{opacity:0.6}.modal_close svg{fill:#2a3134;fill:rgba(var(--pv-color-dark-rgb), 1)}.button_table_action{margin:2px}.mobile_title{display:none}.status_wrapper{height:85px;text-align:center;pointer-events:none}.search_section{background-color:rgba(53, 132, 247, 0.07);background-color:rgba(var(--pv-color-primary-rgb), 0.07);border-color:#d1d5d9;border-color:rgba(var(--pv-color-grey_3-rgb), 1);height:50px;padding:10px;border-width:1px 1px 0 1px;border-style:solid}.input_search{height:100%;width:100%;border-radius:3px;border-width:1px;border-style:solid;padding:0 14px;font-size:12px;outline:none;border-color:#d1d5d9;border-color:rgba(var(--pv-color-grey_3-rgb), 1);color:#2a3134;color:rgba(var(--pv-color-dark-rgb), 1)}.input_search::-webkit-input-placeholder{color:#d1d5d9;color:rgba(var(--pv-color-grey_3-rgb), 1)}.input_search::-moz-placeholder{color:#d1d5d9;color:rgba(var(--pv-color-grey_3-rgb), 1)}.input_search:-ms-input-placeholder{color:#d1d5d9;color:rgba(var(--pv-color-grey_3-rgb), 1)}.input_search::-ms-input-placeholder{color:#d1d5d9;color:rgba(var(--pv-color-grey_3-rgb), 1)}.input_search::placeholder{color:#d1d5d9;color:rgba(var(--pv-color-grey_3-rgb), 1)}.loading_container{position:absolute;top:0;left:0;width:100%;height:100%;background:rgba(42, 49, 52, 0.3);background:rgba(var(--pv-color-dark-rgb), 0.3);display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center}.align_center{text-align:center}@media (hover: hover){table tbody tr:not(.expanded_summary):hover{background-color:rgba(53, 132, 247, 0.04);background-color:rgba(var(--pv-color-primary-rgb), 0.04)}}@media (max-width: 900px){table,tbody,tr,td{display:block}thead{display:none}tr{padding:0 15px;border-width:1px;border-style:solid}tr:not(:first-child){margin-top:-1px}tr:not(.expanded_summary) td:first-child{border:none !important}table td{padding-left:0;padding-right:0;border-width:1px 0 0 0 !important;border-color:rgba(209, 213, 217, 0.5);border-color:rgba(var(--pv-color-grey_3-rgb), 0.5)}table tr.expanded_summary td{padding:15px 0}.mobile_title{display:inline-block;width:90px;vertical-align:middle}.modal_title{padding:17px 60px 17px 15px}.content{display:inline-block;width:calc(100% - 90px);vertical-align:middle;text-align:left}.expanded_summary{border-top-color:transparent;padding-bottom:10px}.expanded_summary td:before{content:none}.status_wrapper{height:266px;display:table-cell}.search_section{height:60px;padding:15px}.align_center{text-align:inherit}}';export{c as peculiar_certificates_viewer}