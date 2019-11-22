import { r as registerInstance, h, H as Host } from './core-d6f9181b.js';
import { C as Certificate } from './index-bc177fd4.js';
import './dayjs.min-21a180a8.js';

const CertificatesViewer = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.certificates = [];
        this.certificatesDecoded = [];
        this.onClickDetails = (value, event) => {
            event.stopPropagation();
            this.certificateSelectedForDetails = value;
        };
        this.onClickModalClose = () => {
            this.certificateSelectedForDetails = null;
        };
    }
    componentWillLoad() {
        this.certificatesDecodeAndSet();
    }
    watchCertificates() {
        this.certificatesDecodeAndSet();
    }
    async certificatesDecodeAndSet() {
        if (!Array.isArray(this.certificates)) {
            return [];
        }
        const data = [];
        for (let value of this.certificates) {
            const certificate = new Certificate(value);
            await certificate.getFingerprint();
            try {
                data.push(certificate);
            }
            catch (error) {
                console.error(error);
            }
        }
        this.certificatesDecoded = data;
    }
    onClickDownload(certificate, downloadType, event) {
        event.stopPropagation();
        if (downloadType === 'PEM') {
            return certificate.downloadAsPEM();
        }
        return certificate.downloadAsDER();
    }
    onClickRow(serialNumber) {
        const isExpandedRowClicked = this.expandedRow === serialNumber;
        this.expandedRow = isExpandedRowClicked
            ? null
            : serialNumber;
    }
    renderExpandedRow(certificate) {
        return (h("tr", { class: "expanded_summary fill_grey_1_opacity" }, h("td", { colSpan: 5, class: "stroke_grey_3_border" }, h("pv-certificate-summary", { certificate: certificate, showIssuer: !certificate.isRoot }))));
    }
    renderCertificates() {
        return this.certificatesDecoded.map(certificate => {
            const isExpandedRow = certificate.serialNumber === this.expandedRow;
            return ([
                h("tr", { class: isExpandedRow && 'expanded fill_grey_1_opacity', onClick: this.onClickRow.bind(this, certificate.serialNumber), key: certificate.serialNumber }, h("td", { class: "b3 stroke_grey_3_border" }, h("span", { class: "mobile_title text_grey_5 align-left b3" }, "Subject:"), h("span", { class: "content" }, certificate.commonName)), h("td", { colSpan: 3, class: "b3 stroke_grey_3_border" }, h("span", { class: "mobile_title text_grey_5 align-left b3" }, "Hash (SHA-256):"), h("span", { class: "content monospace" }, certificate.fingerprint)), h("td", { class: "align-center stroke_grey_3_border" }, h("span", { class: "mobile_title text_grey_5 align-left b3" }, "Action:"), h("span", { class: "content" }, h("pv-button", { onClick: this.onClickDetails.bind(this, certificate.base64), class: "button_table_action" }, "Details"), h("pv-button-split", { onClick: this.onClickDownload.bind(this, certificate, 'PEM'), actions: [{
                            text: 'Download DER',
                            onClick: this.onClickDownload.bind(this, certificate, 'DER'),
                        }], class: "button_table_action" }, "Download PEM")))),
                isExpandedRow && this.renderExpandedRow(certificate),
            ]);
        });
    }
    renderCertificateDetailsModal() {
        if (!this.certificateSelectedForDetails) {
            return null;
        }
        return (h("div", { class: "modal_wrapper" }, h("div", { class: "modal_content" }, h("div", { class: "fill_grey_2 modal_title stroke_grey_3_border" }, h("h4", { class: "h4 text_black" }, "Certificate details"), h("button", { class: "modal_close", onClick: this.onClickModalClose }, h("svg", { width: "30", height: "30", viewBox: "0 0 30 30", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M15.7204 14.375L21.0654 19.7185C21.3115 19.9658 21.3115 20.3693 21.0654 20.6154L20.615 21.0645C20.3689 21.3118 19.9667 21.3118 19.7181 21.0645L14.3744 15.721L9.03194 21.0645C8.78327 21.3118 8.3811 21.3118 8.13371 21.0645L7.68459 20.6154C7.43847 20.3693 7.43847 19.9658 7.68459 19.7185L13.0296 14.375L7.68459 9.03155C7.43847 8.78417 7.43847 8.38074 7.68459 8.13463L8.13371 7.68554C8.3811 7.43815 8.78327 7.43815 9.03194 7.68554L14.3744 13.029L19.7181 7.68554C19.9667 7.43815 20.3689 7.43815 20.615 7.68554L21.0654 8.13463C21.3115 8.38074 21.3115 8.78417 21.0654 9.03155L15.7204 14.375Z", fill: "#2A3134" })))), h("div", { class: "fill_white" }, h("pv-certificate-viewer", { certificate: this.certificateSelectedForDetails })))));
    }
    render() {
        return (h(Host, null, h("table", { class: "text_black" }, h("thead", { class: "fill_grey_2" }, h("tr", null, h("th", { class: "h7 stroke_grey_3_border" }, "Name"), h("th", { colSpan: 3, class: "h7 stroke_grey_3_border" }, "Fingerprint (SHA-1)"), h("th", { class: "align-center h7 stroke_grey_3_border" }, "Actions"))), h("tbody", null, this.renderCertificates())), this.renderCertificateDetailsModal()));
    }
    static get watchers() { return {
        "certificates": ["watchCertificates"]
    }; }
    static get style() { return "* {\n  margin: 0;\n  padding: 0;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n  -moz-text-size-adjust: none;\n  -ms-text-size-adjust: none;\n  text-size-adjust: none;\n  -webkit-text-size-adjust: none;\n  -webkit-tap-highlight-color: transparent;\n  word-break: break-word;\n}\n\n*:focus:not(:active):not(:hover) {\n  outline-width: 2px;\n  outline-style: solid;\n  outline-offset: -1px;\n}\n\ninput:focus, textarea:focus, *:active, *:hover {\n  outline: none !important;\n}\n\na {\n  text-decoration: none;\n}\n\ntextarea {\n  resize: none;\n}\n\ninput, textarea {\n  -webkit-appearance: none !important;\n  -moz-appearance: none;\n  -ms-appearance: none;\n  appearance: none !important;\n  font-family: inherit;\n}\n\ntable {\n  cellspacing: 0 !important;\n  border-spacing: 0 !important;\n}\n\n\n:host {\n  --pv-button-padding-end: 5px;\n  --pv-button-padding-start: 5px\n}\n\n\n/* Text type */\n.b3 {\n  font-family: inherit;\n  font-size: 13px;\n  line-height: 1.53;\n  letter-spacing: 0.5px;\n  font-weight: 400;\n}\n\n.h4 {\n  font-family: inherit;\n  font-style: normal;\n  font-weight: bold;\n  font-size: 18px;\n  line-height: 25px;\n}\n\n.h6 {\n  font-family: inherit;\n  font-weight: 600;\n  font-size: 15px;\n  line-height: 20px;\n  letter-spacing: 0.3px;\n}\n\n.h7 {\n  font-family: inherit;\n  font-weight: 600;\n  font-size: 14px;\n  line-height: 1.35;\n}\n\n/* Text color */\n.text_black {\n  color: #2A3134;\n}\n\n.text_white {\n  color: white;\n}\n\n.text_grey_5 {\n  color: #869196;\n}\n\n.text_secondary {\n  color: #3584F7;\n}\n\n/* Text aligance */\n.align-center {\n  text-align: center;\n}\n\n.align-left {\n  text-align: left;\n}\n\n/* Background color */\n.fill_grey_2 {\n  background-color: #F4F7FC;\n}\n\n.fill_grey_1_opacity {\n  background-color: rgba(251, 252, 253, 0.8);\n}\n\n.fill_grey_3_opacity_border {\n  background-color: rgba(209, 213, 217, 0.5);\n}\n\n.fill_grey_5 {\n  background-color: #869196;\n}\n\n.fill_white {\n  background-color: white;\n}\n\n.fill_secondary {\n  background-color: #3584F7;\n}\n\n/* Border color */\n.stroke_grey_3_border {\n  border-color: #D1D5D9;\n}\n\n.stroke_grey_3_opcity_border {\n  border-color: rgba(209, 213, 217, 0.5);\n}\n\n.stroke_secondary_border {\n  border-color: rgba(50, 124, 232, 0.3);\n}\n\n.monospace {\n  font-family: monospace;\n}\n\n\n:host {\n  display: block;\n  width: 100%;\n  word-wrap: break-word;\n  background: white;\n  min-width: 300px;\n  min-height: 400px;\n  overflow: auto;\n}\n\ntable {\n  width: 100%;\n  table-layout: fixed;\n  border-collapse: collapse;\n}\n\ntable tr {\n  vertical-align: middle;\n}\n\ntable th {\n  padding: 15px 10px;\n  text-align: left;\n  border-width: 1px;\n  border-style: solid;\n}\n\ntable td {\n  padding: 8px 10px;\n  text-align: left;\n  border-width: 1px;\n  border-style: solid;\n}\n\ntable th:nth-child(1) {\n  width: 20%;\n}\n\ntable th:nth-child(2) {\n  width: 58%;\n}\n\n/* Expande rows styles */\n/* First row */\ntable tr.expanded td:not(:last-child) {\n  border-right-color: transparent;\n}\n\ntable tr.expanded td {\n  border-bottom-color: transparent;\n}\n\n/* Second row */\ntable tr.expanded_summary td {\n  vertical-align: top;\n  padding: 10px 20px 26px;\n}\n\n\@-webkit-keyframes fadeIn {\n  0% {\n    opacity: 0.001;\n  }\n  100% {\n    opacity: 1;\n  }\n}\n\n\@keyframes fadeIn {\n  0% {\n    opacity: 0.001;\n  }\n  100% {\n    opacity: 1;\n  }\n}\n\n.modal_wrapper {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  z-index: 1;\n  overflow: auto;\n  padding: 10px;\n  text-align: center;\n  background: rgba(42, 49, 52, 0.9);\n  -webkit-animation: fadeIn 300ms;\n  animation: fadeIn 300ms;\n}\n\n.modal_wrapper:before {\n  display: inline-block;\n  vertical-align: middle;\n  width: 0;\n  height: 100%;\n  content: \'\';\n}\n\n.modal_content {\n  position: relative;\n  display: inline-block;\n  vertical-align: middle;\n  width: 100%;\n  max-width: 900px;\n  text-align: left;\n  border-radius: 3px;\n  overflow: hidden;\n}\n\n.modal_title {\n  border-bottom-width: 1px;\n  border-bottom-style: solid;\n  padding: 17px 60px 17px 20px;\n  position: relative;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n\n.modal_close {\n  cursor: pointer;\n  border: none;\n  background-color: transparent;\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  right: 0;\n  padding: 0 12px;\n  -webkit-transition: opacity 100ms;\n  transition: opacity 100ms;\n}\n\n.modal_close:hover {\n  opacity: 0.6;\n}\n\n.button_table_action {\n  margin: 2px;\n}\n\n/* Adaptivity styles */\n.mobile_title {\n  display: none;\n}\n\n\@media (max-width: 767px) {\n  pv-button {\n    --pv-button-padding-start: 8px;\n    --pv-button-padding-end: 8px;\n  }\n\n  pv-button-split {\n    --pv-button-padding-start: 8px;\n    --pv-button-padding-end: 8px;\n  }\n\n  table, tbody, tr, td {\n    display: block;\n  }\n\n  thead {\n    display: none;\n  }\n\n  tr {\n    padding: 0 15px;\n    border: 1px solid #D1D5D9;\n    margin-top: -1px;\n  }\n\n  tr:not(.expanded_summary) td:first-child {\n    border: none! important;\n  }\n\n  table td {\n    padding-left: 0;\n    padding-right: 0;\n    border-width: 1px 0 0 0 ! important;\n    border-color: rgba(209, 213, 217, 0.5) ! important;\n  }\n\n  table tr.expanded_summary td {\n    padding: 15px 0\n  }\n\n  .mobile_title {\n    display: inline-block;\n    width: 90px;\n    vertical-align: middle;\n  }\n\n  .modal_title {\n    padding: 17px 60px 17px 15px;\n  }\n\n  .content {\n    display: inline-block;\n    width: calc(100% - 90px);\n    vertical-align: middle;\n    text-align: left;\n  }\n\n  .expanded {\n    border-bottom-color: transparent;\n  }\n  .expanded_summary {\n    border-top-color: transparent;\n    padding-bottom: 10px;\n  }\n\n  .expanded_summary td:before {\n    content: none;\n  }\n}"; }
};

export { CertificatesViewer as pv_certificates_viewer };
