import { r as registerInstance, h, H as Host } from './core-921931c1.js';
import { C as Certificate, d as dayjs } from './index-2c40cab3.js';

const CertificatesViewer = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.certificates = '';
        this.certificatesDecoded = [];
        this.onClickDetails = (value, event) => {
            event.stopPropagation();
            this.certificateSelectedForDetails = value;
        };
        this.onClickModalOverlay = () => {
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
        const data = [];
        for (let value of this.certificatesPropParsed) {
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
    get certificatesPropParsed() {
        return this.certificates.split(',');
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
    renderDN(item) {
        return Object.keys(item).map(subject => {
            return (h("p", { class: "dn_row" }, h("span", { class: "dn_name b3" }, item[subject].name), h("span", { class: "dn_value b3" }, item[subject].value)));
        });
    }
    renderMetaData(item) {
        return ([
            h("p", { class: "meta_row" }, h("span", { class: "meta_name text_grey_5 b3" }, "Serial number:"), h("span", { class: "meta_value b3" }, item.serialNumber)),
            h("p", { class: "meta_row" }, h("span", { class: "meta_name text_grey_5 b3" }, "Version:"), h("span", { class: "meta_value b3" }, item.version)),
            h("p", { class: "meta_row" }, h("span", { class: "meta_name text_grey_5 b3" }, "Validity:"), h("span", { class: "meta_value b3" }, item.validity, " days")),
            h("p", { class: "meta_row" }, h("span", { class: "meta_name text_grey_5 b3" }, "Issued:"), h("span", { class: "meta_value b3" }, dayjs(item.notBefore).format('ddd, MMM D, YYYY h:mm A'))),
            h("p", { class: "meta_row" }, h("span", { class: "meta_name text_grey_5 b3" }, "Expired:"), h("span", { class: "meta_value b3" }, dayjs(item.notAfter).format('ddd, MMM D, YYYY h:mm A'))),
        ]);
    }
    renderExpandedRow(certificate) {
        return (h("tr", { class: "expanded_summary fill_grey_1_opacity" }, h("td", { colSpan: certificate.isRoot ? 3 : 2, class: "stroke_grey_3_border" }, h("p", { class: "text_grey_5 b3 dn_row" }, "Subject DN:"), this.renderDN(certificate.subject)), certificate.isRoot
            ? null
            : (h("td", { colSpan: 1, class: "stroke_grey_3_border" }, h("p", { class: "text_grey_5 b3 dn_row" }, "Issuer DN:"), this.renderDN(certificate.issuer))), h("td", { colSpan: 2, class: "stroke_grey_3_border" }, this.renderMetaData(certificate))));
    }
    renderCertificates() {
        return this.certificatesDecoded.map(certificate => {
            const isExpandedRow = certificate.serialNumber === this.expandedRow;
            return ([
                h("tr", { class: isExpandedRow && 'expanded fill_grey_1_opacity', onClick: this.onClickRow.bind(this, certificate.serialNumber), key: certificate.serialNumber }, h("td", { class: "b3 stroke_grey_3_border" }, certificate.commonName), h("td", { colSpan: 3, class: "b3 stroke_grey_3_border" }, certificate.fingerprint), h("td", { class: "align-center stroke_grey_3_border" }, h("pv-button", { onClick: this.onClickDetails.bind(this, certificate.base64), fill: "fill" }, "Details"), h("pv-button-split", { onClick: this.onClickDownload.bind(this, certificate, 'PEM'), actions: [{
                            text: 'Download DER',
                            onClick: this.onClickDownload.bind(this, certificate, 'DER'),
                        }] }, "Download PEM"))),
                isExpandedRow && this.renderExpandedRow(certificate),
            ]);
        });
    }
    renderCertificateDetailsModal() {
        if (!this.certificateSelectedForDetails) {
            return null;
        }
        return (h("div", { class: "modal_wrapper" }, h("div", { class: "modal_overlay", onClick: this.onClickModalOverlay }), h("div", { class: "modal_content fill_white" }, h("pv-certificate-viewer", { certificate: this.certificateSelectedForDetails }))));
    }
    render() {
        return (h(Host, null, h("table", { class: "text_black" }, h("thead", { class: "fill_grey_2" }, h("tr", null, h("th", { class: "h7 stroke_grey_3_border" }, "Name"), h("th", { colSpan: 3, class: "h7 stroke_grey_3_border" }, "Fingerprint (SHA-1)"), h("th", { class: "align-center h7 stroke_grey_3_border" }, "Actions"))), h("tbody", null, this.renderCertificates())), this.renderCertificateDetailsModal()));
    }
    static get watchers() { return {
        "certificates": ["watchCertificates"]
    }; }
    static get style() { return "* {\n  margin: 0;\n  padding: 0;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  border: 0;\n  border-radius: 0;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n  -moz-text-size-adjust: none;\n  -ms-text-size-adjust: none;\n  text-size-adjust: none;\n  -webkit-text-size-adjust: none;\n  -webkit-tap-highlight-color: transparent;\n  word-break: break-word;\n}\n\n*:focus:not(:active):not(:hover) {\n  outline-width: 2px;\n  outline-style: solid;\n  outline-offset: -1px;\n}\n\ninput:focus, textarea:focus, *:active, *:hover {\n  outline: none !important;\n}\n\na {\n  text-decoration: none;\n}\n\ntextarea {\n  resize: none;\n}\n\ninput, textarea {\n  -webkit-appearance: none !important;\n  -moz-appearance: none;\n  -ms-appearance: none;\n  appearance: none !important;\n  font-family: inherit;\n}\n\nbutton {\n  font-family: inherit;\n  background: transparent;\n}\n\ntable {\n  cellspacing: 0 !important;\n  border-spacing: 0 !important;\n}\n\n\n/* Text type */\n.b3 {\n  font-family: \'Open Sans\', Arial, sans-serif;\n  font-size: 13px;\n  line-height: 1.53;\n  letter-spacing: 0.5px;\n  font-weight: 400;\n}\n\n.h7 {\n  font-family: \'Open Sans\', Arial, sans-serif;\n  font-weight: 600;\n  font-size: 14px;\n  line-height: 1.35;\n}\n\n/* Text color */\n.text_black {\n  color: #2A3134;\n}\n\n.text_white {\n  color: white;\n}\n\n.text_grey_5 {\n  color: #869196;\n}\n\n.text_secondary {\n  color: #3584F7;\n}\n\n/* Text aligance */\n.align-center {\n  text-align: center;\n}\n\n.align-left {\n  text-align: left;\n}\n\n/* Background color */\n.fill_grey_2 {\n  background-color: #F4F7FC;\n}\n\n.fill_grey_1_opacity {\n  background-color: rgba(251, 252, 253, 0.8);\n}\n\n.fill_grey_5 {\n  background-color: #869196;\n}\n\n.fill_white {\n  background-color: white;\n}\n\n.fill_secondary {\n  background-color: #3584F7;\n}\n\n/* Border color */\n.stroke_grey_3_border {\n  border-color: #D1D5D9;\n}\n\n\n:host {\n  display: block;\n  width: 100%;\n  word-wrap: break-word;\n  background: white;\n  font-family: \'Open Sans\', Arial, sans-serif;\n}\n\ntable {\n  width: 100%;\n  table-layout: fixed;\n  border-collapse: collapse;\n}\n\ntable tr {\n  vertical-align: middle;\n}\n\ntable th {\n  padding: 15px 10px;\n  text-align: left;\n  border-width: 1px;\n  border-style: solid;\n}\n\ntable td {\n  padding: 10px;\n  text-align: left;\n  border-width: 1px;\n  border-style: solid;\n}\n\ntable th:nth-child(1) {\n  width: 20%;\n}\n\ntable th:nth-child(2) {\n  width: 58%;\n}\n\n/* Mockup particular parts styles */\n\n/* Expande rows styles */\n/* First row */\ntable tr.expanded td:not(:last-child) {\n  border-right-color: transparent;\n}\n\ntable tr.expanded td {\n  border-bottom-color: transparent;\n}\n\n/* Second row */\ntable tr.expanded_summary td {\n  vertical-align: top;\n  padding: 10px 20px 26px;\n}\n\n/* Columns styles */\n/* DN styles */\n.dn_name {\n  display: inline-block;\n  width: 40px;\n  vertical-align: top;\n  padding-right: 5px;\n}\n\n.dn_value {\n  display: inline-block;\n  vertical-align: top;\n  width: calc(100% - 40px);\n}\n\n.dn_row:not(:last-child) {\n  margin-bottom: 10px;\n}\n\n/* Meta styles */\n.meta_row:not(:last-child) {\n  margin-bottom: 10px;\n}\n\n.meta_name {\n  display: inline-block;\n  width: 120px;\n  padding-right: 5px;\n  vertical-align: top;\n}\n\n.meta_value {\n  display: inline-block;\n  vertical-align: top;\n  width: calc(100% - 120px);\n}\n\n\@-webkit-keyframes fadeIn {\n  0% {\n    opacity: 0.001;\n  }\n  100% {\n    opacity: 1;\n  }\n}\n\n\@keyframes fadeIn {\n  0% {\n    opacity: 0.001;\n  }\n  100% {\n    opacity: 1;\n  }\n}\n\n.modal_wrapper {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  z-index: 1;\n  overflow: auto;\n  padding: 20px;\n  text-align: center;\n  background: rgba(42, 49, 52, 0.8);\n  -webkit-animation: fadeIn 300ms;\n  animation: fadeIn 300ms;\n}\n\n.modal_wrapper:before {\n  display: inline-block;\n  vertical-align: middle;\n  width: 0;\n  height: 100%;\n  content: \'\';\n}\n\n.modal_overlay {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n}\n\n.modal_content {\n  position: relative;\n  display: inline-block;\n  vertical-align: middle;\n  width: 100%;\n  max-width: 800px;\n  text-align: left;\n  padding: 10px;\n  border-radius: 3px;\n}"; }
};

export { CertificatesViewer as pv_certificates_viewer };
