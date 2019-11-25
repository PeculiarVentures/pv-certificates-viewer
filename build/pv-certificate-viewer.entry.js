import { r as registerInstance, h } from './core-facd9e82.js';
import { C as Certificate, E as EnumOIDs } from './index-b8f78dc7.js';
import './date_formatter-80b284a6.js';

const CertificateViewer = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    componentWillLoad() {
        try {
            this.cert = new Certificate(this.certificate, undefined, true);
        }
        catch (error) {
            console.error(error);
        }
    }
    renderRowTitle(title) {
        return (h("tr", { class: "title" }, h("td", { colSpan: 2, class: "h6 stroke_grey_3_border text_black" }, title)));
    }
    renderRowValue(title, value, valueMonospace, collapseValue) {
        if (typeof value !== 'string'
            && typeof value !== 'number'
            && !Array.isArray(value)) {
            return null;
        }
        let valueElem;
        if (collapseValue) {
            valueElem = (h("pv-text-hider", null, value));
        }
        else {
            valueElem = Array.isArray(value)
                ? value
                : value.toString();
        }
        return (h("tr", null, h("td", { class: "b3 text_grey_5" }, title, ":"), h("td", { class: {
                b3: true,
                text_black: true,
                monospace: valueMonospace,
            } }, valueElem)));
    }
    renderRowExtensionValue(extension) {
        if (typeof extension.value === 'string') {
            return this.renderRowValue('Value', extension.value, true);
        }
        switch (extension.oid) {
            case EnumOIDs.BasicConstraints: {
                return [
                    this.renderRowValue('cA', String(extension.value.cA)),
                    this.renderRowValue('pathLenConstraint', extension.value.pathLenConstraint),
                ];
            }
            case EnumOIDs.NetscapeCertificateType:
            case EnumOIDs.KeyUsage: {
                return this.renderRowValue('Value', extension.value.join(', '));
            }
            case EnumOIDs.ExtendedKeyUsage: {
                return this.renderRowValue('Values', extension.value.map((value) => (h("p", { class: "b3 text_black" }, value.name, " (", value.oid, ")"))));
            }
            case EnumOIDs.CertificatePolicies: {
                return this.renderRowValue('Values', extension.value.map((value) => (h("p", { class: "b3 text_black" }, value.name
                    ? `${value.name} (${value.oid})`
                    : value.oid))));
            }
            case EnumOIDs.CRLDistributionPoints: {
                return this.renderRowValue('Paths', extension.value.map((value) => {
                    if (!value.distributionPoint) {
                        return null;
                    }
                    return value.distributionPoint.map((valuePoint) => {
                        if (valuePoint.type === 6) {
                            return (h("p", { class: "b3" }, h("a", { class: "text_secondary", href: valuePoint.value, target: "_blank" }, valuePoint.value)));
                        }
                        return (h("p", { class: "b3 text_black" }, valuePoint.value));
                    });
                }));
            }
            case EnumOIDs.CertificateAuthorityInformationAccess: {
                return this.renderRowValue('Paths', extension.value.map((value) => {
                    const accessLocation = value.accessLocation;
                    if (accessLocation.type === 6) {
                        return (h("p", { class: "b3 text_black" }, value.accessMethod, ": ", h("a", { class: "text_secondary", href: accessLocation.value, target: "_blank" }, accessLocation.value)));
                    }
                    return (h("p", { class: "b3 text_black" }, value.accessMethod, ": ", accessLocation.value));
                }));
            }
            case EnumOIDs.NameConstraints: {
                return [
                    this.renderRowValue('Permitted Values', extension.value.permitted.map((value) => {
                        if (value.type === 2) {
                            return (h("p", { class: "b3" }, h("a", { class: "text_secondary", href: `https://censys.io/ipv4?q=${value.value}`, target: "_blank" }, value.value)));
                        }
                        if (value.type === 7) {
                            return (h("p", { class: "b3" }, h("a", { class: "text_secondary", href: `https://censys.io/ipv4?q=${value.value}`, target: "_blank" }, value.value)));
                        }
                        if (value.type === 4) {
                            return (h("p", { class: "b3" }, value.value.map((valueType) => `${valueType.name}=${valueType.value}`).join(', ')));
                        }
                        return (h("p", { class: "b3 text_black" }, value.value));
                    })),
                ];
            }
            case EnumOIDs.SubjectAlternativeName: {
                return [
                    this.renderRowValue('Values', extension.value.map((value) => {
                        if (value.type === 2) {
                            return (h("p", { class: "b3" }, h("a", { class: "text_secondary", href: `https://censys.io/ipv4?q=${value.value}`, target: "_blank" }, value.value)));
                        }
                        if (value.type === 7) {
                            return (h("p", { class: "b3" }, h("a", { class: "text_secondary", href: `https://censys.io/ipv4?q=${value.value}`, target: "_blank" }, value.value)));
                        }
                        if (value.type === 4) {
                            return (h("p", { class: "b3" }, value.value.map((valueType) => `${valueType.name}=${valueType.value}`).join(', ')));
                        }
                        return (h("p", { class: "b3 text_black" }, value.value));
                    })),
                ];
            }
            case EnumOIDs.CertificateTemplate: {
                return [
                    this.renderRowValue('Template Id', extension.value.templateID),
                    this.renderRowValue('Template Major Version', extension.value.templateMajorVersion),
                    this.renderRowValue('Template Minor Version', extension.value.templateMinorVersion),
                ];
            }
            case EnumOIDs.AuthorityKeyIdentifier: {
                return [
                    this.renderRowValue('Key Identifier', extension.value.keyIdentifier, true),
                    this.renderRowValue('Authority Cert Issuer', extension.value.authorityCertIssuer),
                    this.renderRowValue('Authority Cert Serial Number', extension.value.authorityCertSerialNumber),
                ];
            }
        }
        return this.renderRowValue('Value', extension.value);
    }
    render() {
        if (!this.cert) {
            return null;
        }
        return (h("table", null, this.renderRowTitle('Basic Information'), h("tr", null, h("td", { colSpan: 2 }, h("pv-certificate-summary", { certificate: this.cert }))), this.renderRowTitle('Public Key Info'), this.renderRowValue('Algorithm', this.cert.publicKey.algorithm.name), this.renderRowValue('Modulus Bits', this.cert.publicKey.algorithm.modulusBits), this.renderRowValue('Public Exponent', this.cert.publicKey.algorithm.publicExponent), this.renderRowValue('Named Curve', this.cert.publicKey.algorithm.namedCurve), this.renderRowValue('Value', this.cert.publicKey.value, true, true), this.renderRowTitle('Signature'), this.renderRowValue('Algorithm', this.cert.signature.algorithm.name), this.renderRowValue('Hash', this.cert.signature.algorithm.hash), this.renderRowValue('Value', this.cert.signature.value, true, true), this.renderRowTitle('Extensions'), this.cert.extensions.map((extension) => ([
            this.renderRowValue('Name', extension.name ? `${extension.name} (${extension.oid})` : extension.oid),
            this.renderRowValue('Critical', String(extension.critical)),
            this.renderRowExtensionValue(extension),
            h("tr", null, h("td", { colSpan: 2, class: "divider" }, h("span", { class: "fill_grey_3_opacity_border" }))),
        ]))));
    }
    static get style() { return "* {\n  margin: 0;\n  padding: 0;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n  -moz-text-size-adjust: none;\n  -ms-text-size-adjust: none;\n  text-size-adjust: none;\n  -webkit-text-size-adjust: none;\n  -webkit-tap-highlight-color: transparent;\n  word-break: break-word;\n}\n\n*:focus:not(:active):not(:hover) {\n  outline-width: 2px;\n  outline-style: solid;\n  outline-offset: -1px;\n}\n\ninput:focus, textarea:focus, *:active, *:hover {\n  outline: none !important;\n}\n\na {\n  text-decoration: none;\n}\n\ntextarea {\n  resize: none;\n}\n\ninput, textarea {\n  -webkit-appearance: none !important;\n  -moz-appearance: none;\n  -ms-appearance: none;\n  appearance: none !important;\n  font-family: inherit;\n}\n\ntable {\n  cellspacing: 0 !important;\n  border-spacing: 0 !important;\n}\n\n\n/* Text type */\n.b3 {\n  font-family: inherit;\n  font-size: 13px;\n  line-height: 1.53;\n  letter-spacing: 0.5px;\n  font-weight: 400;\n}\n\n.h4 {\n  font-family: inherit;\n  font-style: normal;\n  font-weight: bold;\n  font-size: 18px;\n  line-height: 25px;\n}\n\n.h6 {\n  font-family: inherit;\n  font-weight: 600;\n  font-size: 15px;\n  line-height: 20px;\n  letter-spacing: 0.3px;\n}\n\n.h7 {\n  font-family: inherit;\n  font-weight: 600;\n  font-size: 14px;\n  line-height: 1.35;\n}\n\n/* Text color */\n.text_black {\n  color: #2A3134;\n}\n\n.text_white {\n  color: white;\n}\n\n.text_grey_5 {\n  color: #869196;\n}\n\n.text_secondary {\n  color: #3584F7;\n}\n\n/* Text aligance */\n.align-center {\n  text-align: center;\n}\n\n.align-left {\n  text-align: left;\n}\n\n/* Background color */\n.fill_grey_2 {\n  background-color: #F4F7FC;\n}\n\n.fill_grey_1_opacity {\n  background-color: rgba(251, 252, 253, 0.8);\n}\n\n.fill_grey_3_opacity_border {\n  background-color: rgba(209, 213, 217, 0.5);\n}\n\n.fill_grey_5 {\n  background-color: #869196;\n}\n\n.fill_white {\n  background-color: white;\n}\n\n.fill_secondary {\n  background-color: #3584F7;\n}\n\n/* Border color */\n.stroke_grey_3_border {\n  border-color: #D1D5D9;\n}\n\n.stroke_grey_3_opcity_border {\n  border-color: rgba(209, 213, 217, 0.5);\n}\n\n.stroke_secondary_border {\n  border-color: rgba(50, 124, 232, 0.3);\n}\n\n.monospace {\n  font-family: monospace;\n}\n\n\n:host {\n  display: block;\n  width: 100%;\n  word-wrap: break-word;\n  background: white;\n}\n\ntable {\n  width: 100%;\n}\n\ntable .title td {\n  padding-top: 60px;\n  padding-bottom: 15px;\n  border-bottom-width: 1px;\n  border-bottom-style: solid;\n}\n\ntable td:first-child {\n  padding-left: 30px;\n  width: 130px;\n  padding-right: 10px;\n}\n\ntable td:last-child {\n  padding-right: 30px;\n  width: calc(100% - 130px);\n}\n\ntable td {\n  vertical-align: top;\n  padding-top: 5px;\n  padding-bottom: 5px;\n}\n\ntable .title:first-child td {\n  padding-top: 15px;\n}\n\ntable .title + tr td {\n  padding-top: 15px;\n}\n\ntable td.monospace {\n  max-width: 0;\n}\n\n/* Extentions */\n.divider {\n  padding-top: 15px;\n  padding-bottom: 15px;\n}\n\ntable tr:last-child .divider {\n  padding-top: 0;\n  opacity: 0;\n}\n\n.divider span {\n  display: block;\n  height: 1px;\n}\n\n/* Adaptivity */\n\@media (max-width: 767px) {\n  tr, td {\n    display: block;\n  }\n\n  table td:last-child,\n  table td:first-child {\n    padding-right: 15px;\n    padding-left: 15px;\n    width: 100%;\n  }\n\n  table .title + tr td {\n    padding-top: 5px;\n  }\n\n  table .title + tr td:first-child {\n    padding-top: 15px;\n  }\n\n  table td.monospace {\n    max-width: calc(100vw - 20px);\n  }\n}"; }
};

export { CertificateViewer as pv_certificate_viewer };
