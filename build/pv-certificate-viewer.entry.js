import { r as registerInstance, h } from './core-cdbd8562.js';
import { C as Certificate, d as dayjs } from './index-2c40cab3.js';

const CertificateViewer = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    componentWillLoad() {
        try {
            this.cert = new Certificate(this.certificate, true);
        }
        catch (error) {
            console.error(error);
        }
    }
    renderRowTitle(title) {
        return (h("tr", null, h("td", { colSpan: 2, class: "h7" }, title)));
    }
    renderRowValue(title, value) {
        if (typeof value !== 'string'
            && typeof value !== 'number') {
            return null;
        }
        return (h("tr", null, h("td", { class: "b3 text_grey_5" }, title, ":"), h("td", { class: "b3" }, value.toString())));
    }
    renderRowExtensionValue(extension) {
        if (typeof extension.value === 'string') {
            return this.renderRowValue('Value', extension.value);
        }
        if (Array.isArray(extension.value)
            && typeof extension.value[0] === 'string') {
            return this.renderRowValue('Value', extension.value.join(', '));
        }
        if (!Array.isArray(extension.value)
            && typeof extension.value === 'object') {
            return Object.keys(extension.value).map(keyName => (this.renderRowValue(keyName, JSON.stringify(extension.value[keyName]))));
        }
        return this.renderRowValue('Value', JSON.stringify(extension.value));
    }
    render() {
        if (!this.cert) {
            return null;
        }
        return (h("table", { class: "text_black" }, this.renderRowTitle('Basic Information'), this.renderRowValue('Subject DN', this.cert.subject.map(obj => `${obj.name}=${obj.value}`).join(',')), this.renderRowValue('Issuer DN', this.cert.issuer.map(obj => `${obj.name}=${obj.value}`).join(',')), this.renderRowValue('Serial Number', this.cert.serialNumber), this.renderRowValue('Version', this.cert.version), this.renderRowValue('Issued', dayjs(this.cert.notBefore).format('ddd, MMM D, YYYY h:mm A')), this.renderRowValue('Expired', dayjs(this.cert.notAfter).format('ddd, MMM D, YYYY h:mm A')), this.renderRowValue('Validity', `${this.cert.validity} days`), h("tr", null, h("td", { colSpan: 2 }, h("br", null))), this.renderRowTitle('Public Key Info'), this.renderRowValue('Algorithm', this.cert.publicKey.algorithm.name), this.renderRowValue('Modulus Bits', this.cert.publicKey.algorithm.modulusBits), this.renderRowValue('Public Exponent', this.cert.publicKey.algorithm.publicExponent), this.renderRowValue('Named Curve', this.cert.publicKey.algorithm.namedCurve), this.renderRowValue('Value', this.cert.publicKey.value), h("tr", null, h("td", { colSpan: 2 }, h("br", null))), this.renderRowTitle('Signature'), this.renderRowValue('Algorithm', this.cert.signature.algorithm.name), this.renderRowValue('Hash', this.cert.signature.algorithm.hash), this.renderRowValue('Value', this.cert.signature.value), h("tr", null, h("td", { colSpan: 2 }, h("br", null))), this.renderRowTitle('Extensions'), this.cert.extensions.map((extension) => ([
            this.renderRowValue('Name', extension.name ? `${extension.name} (${extension.oid})` : extension.oid),
            this.renderRowValue('Critical', extension.critical ? 'Yes' : 'No'),
            this.renderRowExtensionValue(extension),
            h("tr", null, h("td", { colSpan: 2 }, h("br", null))),
        ]))));
    }
    static get style() { return "* {\n  margin: 0;\n  padding: 0;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  border: 0;\n  border-radius: 0;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n  -moz-text-size-adjust: none;\n  -ms-text-size-adjust: none;\n  text-size-adjust: none;\n  -webkit-text-size-adjust: none;\n  -webkit-tap-highlight-color: transparent;\n  word-break: break-word;\n}\n\n*:focus:not(:active):not(:hover) {\n  outline-width: 2px;\n  outline-style: solid;\n  outline-offset: -1px;\n}\n\ninput:focus, textarea:focus, *:active, *:hover {\n  outline: none !important;\n}\n\na {\n  text-decoration: none;\n}\n\ntextarea {\n  resize: none;\n}\n\ninput, textarea {\n  -webkit-appearance: none !important;\n  -moz-appearance: none;\n  -ms-appearance: none;\n  appearance: none !important;\n  font-family: inherit;\n}\n\nbutton {\n  font-family: inherit;\n  background: transparent;\n}\n\ntable {\n  cellspacing: 0 !important;\n  border-spacing: 0 !important;\n}\n\n\n/* Text type */\n.b3 {\n  font-family: \'Open Sans\', Arial, sans-serif;\n  font-size: 13px;\n  line-height: 1.53;\n  letter-spacing: 0.5px;\n  font-weight: 400;\n}\n\n.h7 {\n  font-family: \'Open Sans\', Arial, sans-serif;\n  font-weight: 600;\n  font-size: 14px;\n  line-height: 1.35;\n}\n\n/* Text color */\n.text_black {\n  color: #2A3134;\n}\n\n.text_white {\n  color: white;\n}\n\n.text_grey_5 {\n  color: #869196;\n}\n\n.text_secondary {\n  color: #3584F7;\n}\n\n/* Text aligance */\n.align-center {\n  text-align: center;\n}\n\n.align-left {\n  text-align: left;\n}\n\n/* Background color */\n.fill_grey_2 {\n  background-color: #F4F7FC;\n}\n\n.fill_grey_1_opacity {\n  background-color: rgba(251, 252, 253, 0.8);\n}\n\n.fill_grey_5 {\n  background-color: #869196;\n}\n\n.fill_white {\n  background-color: white;\n}\n\n/* Border color */\n.stroke_grey_3_border {\n  border-color: #D1D5D9;\n}\n\n\n:host {\n  display: block;\n  width: 100%;\n  word-wrap: break-word;\n  background: white;\n  font-family: \'Open Sans\', Arial, sans-serif;\n}\n\ntable {\n  width: 100%;\n}\n\ntable td {\n  vertical-align: top;\n  padding: 5px;\n}\n\ntable td:first-child {\n  width: 25%;\n}"; }
};

export { CertificateViewer as pv_certificate_viewer };
