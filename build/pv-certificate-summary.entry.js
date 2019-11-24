import { r as registerInstance, h, H as Host } from './core-facd9e82.js';
import { s as short } from './date_formatter-80b284a6.js';

const CertificateSummary = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.showIssuer = true;
    }
    renderDN(item) {
        return Object.keys(item).map(subject => {
            return (h("p", { class: "dn_row" }, h("span", { class: "dn_name b3 text_black" }, subject), h("span", { class: "dn_value b3 text_black" }, item[subject].value)));
        });
    }
    renderMetaData(item) {
        return ([
            h("p", { class: "meta_row" }, h("span", { class: "meta_name text_grey_5 b3" }, "Public key:"), h("span", { class: "meta_value b3 text_black" }, item.publicKey.algorithm.name, " ", item.publicKey.algorithm.modulusBits || item.publicKey.algorithm.namedCurve)),
            h("p", { class: "meta_row" }, h("span", { class: "meta_name text_grey_5 b3" }, "Serial number:"), h("span", { class: "meta_value b3 text_black monospace" }, item.serialNumber)),
            h("p", { class: "meta_row" }, h("span", { class: "meta_name text_grey_5 b3" }, "Version:"), h("span", { class: "meta_value b3 text_black" }, item.version)),
            h("p", { class: "meta_row" }, h("span", { class: "meta_name text_grey_5 b3" }, "Validity:"), h("span", { class: "meta_value b3 text_black" }, item.validity)),
            h("p", { class: "meta_row" }, h("span", { class: "meta_name text_grey_5 b3" }, "Issued:"), h("span", { class: "meta_value b3 text_black" }, short(item.notBefore))),
            h("p", { class: "meta_row" }, h("span", { class: "meta_name text_grey_5 b3" }, "Expired:"), h("span", { class: "meta_value b3 text_black" }, short(item.notAfter))),
        ]);
    }
    renderCertificateSummary() {
        return (h("div", { class: {
                basic_wrapper: true,
                is_only: !this.showIssuer,
            } }, h("div", { class: "basic_col" }, h("p", { class: "text_grey_5 b3 dn_row" }, "Subject DN:"), this.renderDN(this.certificate.subject)), this.showIssuer && (h("div", { class: "basic_col stroke_grey_3_border" }, h("p", { class: "text_grey_5 b3 dn_row" }, "Issuer DN:"), this.renderDN(this.certificate.issuer))), h("div", { class: "basic_meta" }, this.renderMetaData(this.certificate))));
    }
    render() {
        return (h(Host, null, this.renderCertificateSummary()));
    }
    static get style() { return "* {\n  margin: 0;\n  padding: 0;\n  box-sizing: border-box;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n  text-size-adjust: none;\n  -webkit-text-size-adjust: none;\n  -webkit-tap-highlight-color: transparent;\n  word-break: break-word;\n}\n\n*:focus:not(:active):not(:hover) {\n  outline-width: 2px;\n  outline-style: solid;\n  outline-offset: -1px;\n}\n\ninput:focus, textarea:focus, *:active, *:hover {\n  outline: none !important;\n}\n\na {\n  text-decoration: none;\n}\n\ntextarea {\n  resize: none;\n}\n\ninput, textarea {\n  -webkit-appearance: none !important;\n  -moz-appearance: none;\n  -ms-appearance: none;\n  appearance: none !important;\n  font-family: inherit;\n}\n\ntable {\n  cellspacing: 0 !important;\n  border-spacing: 0 !important;\n}\n\n\n/* Text type */\n.b3 {\n  font-family: inherit;\n  font-size: 13px;\n  line-height: 1.53;\n  letter-spacing: 0.5px;\n  font-weight: 400;\n}\n\n.h4 {\n  font-family: inherit;\n  font-style: normal;\n  font-weight: bold;\n  font-size: 18px;\n  line-height: 25px;\n}\n\n.h6 {\n  font-family: inherit;\n  font-weight: 600;\n  font-size: 15px;\n  line-height: 20px;\n  letter-spacing: 0.3px;\n}\n\n.h7 {\n  font-family: inherit;\n  font-weight: 600;\n  font-size: 14px;\n  line-height: 1.35;\n}\n\n/* Text color */\n.text_black {\n  color: #2A3134;\n}\n\n.text_white {\n  color: white;\n}\n\n.text_grey_5 {\n  color: #869196;\n}\n\n.text_secondary {\n  color: #3584F7;\n}\n\n/* Text aligance */\n.align-center {\n  text-align: center;\n}\n\n.align-left {\n  text-align: left;\n}\n\n/* Background color */\n.fill_grey_2 {\n  background-color: #F4F7FC;\n}\n\n.fill_grey_1_opacity {\n  background-color: rgba(251, 252, 253, 0.8);\n}\n\n.fill_grey_3_opacity_border {\n  background-color: rgba(209, 213, 217, 0.5);\n}\n\n.fill_grey_5 {\n  background-color: #869196;\n}\n\n.fill_white {\n  background-color: white;\n}\n\n.fill_secondary {\n  background-color: #3584F7;\n}\n\n/* Border color */\n.stroke_grey_3_border {\n  border-color: #D1D5D9;\n}\n\n.stroke_grey_3_opcity_border {\n  border-color: rgba(209, 213, 217, 0.5);\n}\n\n.stroke_secondary_border {\n  border-color: rgba(50, 124, 232, 0.3);\n}\n\n.monospace {\n  font-family: monospace;\n}\n\n\n:host {\n  display: block;\n  width: 100%;\n}\n\n.basic_wrapper {\n  position: relative;\n}\n\n.basic_wrapper::before,\n.basic_wrapper::after {\n  content: \'\';\n  display: block;\n  position: absolute;\n  width: 1px;\n  top: 0;\n  bottom: 0;\n  background-color: rgba(209, 213, 217, 0.5);\n}\n\n.basic_wrapper::before {\n  left: calc(30% - 20px);\n}\n\n.basic_wrapper::after {\n  left: calc(60% - 20px);\n}\n\n.is_only.basic_wrapper::before {\n  content: none;\n}\n\n/* Basic information */\n.basic_col {\n  vertical-align: top;\n  display: inline-block;\n  width: 30%;\n  padding-right: 40px;\n  position: relative;\n}\n\n.is_only .basic_col {\n  width: 60%;\n}\n\n.basic_meta {\n  vertical-align: top;\n  display: inline-block;\n  width: 40%;\n}\n/* DN styles */\n.dn_name {\n  display: inline-block;\n  width: 30px;\n  vertical-align: top;\n  padding-right: 5px;\n}\n\n.dn_value {\n  display: inline-block;\n  vertical-align: top;\n  width: calc(100% - 30px);\n}\n\n.dn_row:not(:last-child) {\n  margin-bottom: 10px;\n}\n\n/* Meta styles */\n.meta_row:not(:last-child) {\n  margin-bottom: 10px;\n}\n\n.meta_name {\n  display: inline-block;\n  width: 120px;\n  padding-right: 5px;\n  vertical-align: top;\n}\n\n.meta_value {\n  display: inline-block;\n  vertical-align: top;\n  width: calc(100% - 120px);\n}\n\n/* Adaptivity */\n\@media (max-width: 767px) {\n  .basic_wrapper::before,\n  .basic_wrapper::after {\n    content: none;\n  }\n\n  .basic_col {\n    padding: 20px 0;\n    width: 100%;\n    border-bottom: 1px solid rgba(209, 213, 217, 0.5);\n  }\n\n  .basic_col::after {\n    top: auto;\n    bottom: 0;\n    left: 0;\n    right: 0;\n    height: 1px;\n    width: 100%;\n  }\n\n  .basic_meta {\n    width: 100%;\n    padding: 20px 0;\n    min-width: auto;\n  }\n\n  .basic_wrapper::before,\n  .basic_wrapper::after {\n    content: none;\n  }\n}"; }
};

export { CertificateSummary as pv_certificate_summary };
