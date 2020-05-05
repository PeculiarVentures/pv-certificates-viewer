import { r as registerInstance, h } from './index-f2b7af1d.js';
import { C as Certificate, E as EnumOIDs, v as validator } from './index-74f2f11e.js';
import { s as short } from './dateFormatter-5adc0276.js';

const certificateViewerCss = "*{margin:0;padding:0;box-sizing:border-box;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;text-size-adjust:none;-webkit-text-size-adjust:none;-webkit-tap-highlight-color:transparent;word-break:break-word}*:focus:not(:active):not(:hover){outline-width:2px;outline-style:solid;outline-offset:-1px}input:focus,textarea:focus,*:active,*:hover{outline:none !important}a{text-decoration:none}textarea{resize:none}input,textarea{-webkit-appearance:none !important;-moz-appearance:none;-ms-appearance:none;appearance:none !important;font-family:inherit}table{cellspacing:0 !important;border-spacing:0 !important}.b1{font-family:inherit;font-size:15px;line-height:1.46;letter-spacing:0.3px}.b3{font-family:inherit;font-size:13px;line-height:1.53;letter-spacing:0.5px;font-weight:400}.h4{font-family:inherit;font-style:normal;font-weight:bold;font-size:18px;line-height:25px}.h6{font-family:inherit;font-weight:600;font-size:15px;line-height:20px;letter-spacing:0.3px}.h7{font-family:inherit;font-weight:600;font-size:14px;line-height:1.35}.monospace{font-family:monospace}.text_black{color:rgb(var(--peculiar-color-black-rgb))}.text_white{color:rgb(var(--peculiar-color-white-rgb))}.text_grey{color:rgb(var(--peculiar-color-grey-rgb))}.text_primary{color:rgb(var(--peculiar-color-primary-rgb))}.align_center{text-align:center}.align_left{text-align:left}.align_right{text-align:right}.fill_grey{background-color:rgb(var(--peculiar-color-grey-rgb))}.fill_white{background-color:rgb(var(--peculiar-color-white-rgb))}.fill_primary{background-color:rgb(var(--peculiar-color-primary-rgb))}.svg_fill_black{fill:rgb(var(--peculiar-color-black-rgb))}.svg_fill_white{fill:rgb(var(--peculiar-color-white-rgb))}.svg_fill_primary{fill:rgb(var(--peculiar-color-primary-rgb))}.stroke_border{border-color:rgb(var(--peculiar-color-border-rgb))}:host{display:block;width:100%;word-wrap:break-word;position:relative;min-width:300px;min-height:300px;background:rgb(var(--peculiar-color-white-rgb))}table{width:100%;margin-bottom:30px}table .title td{border-color:rgba(var(--peculiar-color-border-rgb), 0.5);padding-top:60px;padding-bottom:15px;border-bottom-width:1px;border-bottom-style:solid}table td:first-child{padding-left:30px;width:130px;padding-right:10px}table td:last-child{padding-right:30px;width:calc(100% - 130px)}table td{vertical-align:top;padding-top:5px;padding-bottom:5px}.vertical_align_top{vertical-align:top}.vertical_align_middle{vertical-align:middle}table .title:first-child td{padding-top:15px}table .title+tr td{padding-top:15px}table td.monospace{max-width:0}.divider{padding-top:15px;padding-bottom:15px}.divider .bg_fill{background-color:rgba(var(--peculiar-color-border-rgb), 0.5)}table tr:last-child .divider{padding-top:0;opacity:0}.divider span{display:block;height:1px}.status_wrapper{min-height:inherit;display:flex;justify-content:center;align-items:center}.interaction_text{padding:15px 0;width:300px;margin:auto;text-align:center}@media (max-width: 900px){tr,td{display:block}table td:last-child,table td:first-child{padding-right:15px;padding-left:15px;width:100%}table .title+tr td{padding-top:5px}table .title+tr td:first-child{padding-top:15px}table td.monospace{max-width:calc(100vw - 20px)}}";

const CertificateViewer = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.isDecodeInProcess = true;
    }
    componentWillLoad() {
        this.decodeCertificate(this.certificate);
    }
    async decodeCertificate(certificate) {
        this.isDecodeInProcess = true;
        if (certificate instanceof Certificate) {
            this.certificateDecoded = certificate;
        }
        if (typeof certificate === 'string') {
            try {
                this.certificateDecoded = new Certificate(certificate, undefined, true);
            }
            catch (error) {
                this.certificateDecodeError = error;
                console.error(error);
            }
        }
        if (this.certificateDecoded) {
            await this.certificateDecoded.getFingerprint('SHA-1');
            await this.certificateDecoded.getFingerprint('SHA-256');
        }
        this.isDecodeInProcess = false;
    }
    /**
     * Rerun decodeCertificate if previuos value not equal current value
     */
    watchCertificateAndDecode(newValue, oldValue) {
        if (typeof newValue === 'string' && typeof oldValue === 'string') {
            if (newValue !== oldValue) {
                this.decodeCertificate(newValue);
            }
            return;
        }
        if (newValue instanceof Certificate && oldValue instanceof Certificate) {
            if (newValue.serialNumber !== oldValue.serialNumber) {
                this.decodeCertificate(newValue);
            }
        }
    }
    getAuthKeyIdParentLink(extension) {
        var _a;
        return (_a = this.authKeyIdParentLink) === null || _a === void 0 ? void 0 : _a.replace('{{authKeyId}}', extension.value.keyIdentifier);
    }
    getAuthKeyIdSiblingsLink(extension) {
        var _a;
        return (_a = this.authKeyIdSiblingsLink) === null || _a === void 0 ? void 0 : _a.replace('{{authKeyId}}', extension.value.keyIdentifier);
    }
    getSubjectKeyIdChildrenLink(extension) {
        var _a;
        return (_a = this.subjectKeyIdChildrenLink) === null || _a === void 0 ? void 0 : _a.replace('{{subjectKeyId}}', extension.value);
    }
    getSubjectKeyIdSiblingsLink(extension) {
        var _a;
        return (_a = this.subjectKeyIdSiblingsLink) === null || _a === void 0 ? void 0 : _a.replace('{{subjectKeyId}}', extension.value);
    }
    renderRowTitle(title) {
        return (h("tr", { class: "title" }, h("td", { colSpan: 2, class: "h6 text_black" }, title)));
    }
    renderRowValue(title, value, options = {}) {
        if (typeof value !== 'string'
            && typeof value !== 'number'
            && !Array.isArray(value)) {
            return null;
        }
        let valueElem;
        if (options.collapse) {
            valueElem = (h("peculiar-text-hider", null, value));
        }
        else {
            valueElem = Array.isArray(value)
                ? value
                : value.toString();
        }
        return (h("tr", null, h("td", { class: {
                b3: true,
                text_grey: true,
                vertical_align_top: options.align !== 'middle',
                vertical_align_middle: options.align === 'middle',
            } }, title, ":"), h("td", { class: {
                b3: true,
                text_black: true,
                monospace: options.monospace,
            } }, valueElem)));
    }
    renderRowExtensionValue(extension) {
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
                return this.renderRowValue('Values', extension.value.map(value => (h("p", { class: "b3 text_black" }, value.name, " (", value.oid, ")"))));
            }
            case EnumOIDs.CertificatePolicies: {
                return [
                    extension.value.policies.map((value, index) => (this.renderRowValue(`Policy ${index + 1}`, [
                        h("p", null, value.name, " (", value.oid, ")"),
                    ]))),
                    extension.value.qualifiers.map((value, index) => (this.renderRowValue(`Qualifier ${index + 1}`, [
                        h("p", null, value.name, " (", value.oid, ")"),
                        validator.isUrl(value.value) ? (h("a", { class: "text_primary", href: value.value, target: "_blank" }, value.value)) : (h("p", null, value.value)),
                    ]))),
                ];
            }
            case EnumOIDs.CRLDistributionPoints: {
                return this.renderRowValue('Paths', extension.value.map((value) => {
                    if (!value.distributionPoint) {
                        return null;
                    }
                    return value.distributionPoint.map((valuePoint) => {
                        if (valuePoint.type === 6) {
                            return (h("p", { class: "b3" }, h("a", { class: "text_primary", href: valuePoint.value, target: "_blank" }, valuePoint.value)));
                        }
                        return (h("p", { class: "b3 text_black" }, valuePoint.value));
                    });
                }));
            }
            case EnumOIDs.CertificateAuthorityInformationAccess: {
                return extension.value
                    .map((value, index) => (this.renderRowValue(`Method ${index + 1}`, [
                    h("p", null, value.name, " (", value.oid, ")"),
                    value.type === 6 ? (h("a", { class: "text_primary", href: value.value, target: "_blank" }, value.value)) : (value.value),
                ])));
            }
            case EnumOIDs.NameConstraints: {
                return [
                    this.renderRowValue('Permitted Values', extension.value.permitted.map((value) => {
                        if (value.type === 2) {
                            return (h("p", { class: "b3" }, h("a", { class: "text_primary", href: `https://censys.io/ipv4?q=${value.value}`, target: "_blank" }, value.value)));
                        }
                        if (value.type === 7) {
                            return (h("p", { class: "b3" }, h("a", { class: "text_primary", href: `https://censys.io/ipv4?q=${value.value}`, target: "_blank" }, value.value)));
                        }
                        if (value.type === 4) {
                            return (h("p", { class: "b3" }, value.value
                                .map(valueType => `${valueType.name}=${valueType.value}`).join(', ')));
                        }
                        return (h("p", { class: "b3 text_black" }, value.value));
                    })),
                ];
            }
            case EnumOIDs.SubjectAlternativeName: {
                return [
                    this.renderRowValue('Values', extension.value.map((value) => {
                        if (value.type === 2) {
                            return (h("p", { class: "b3" }, h("a", { class: "text_primary", href: `https://censys.io/ipv4?q=${value.value}`, target: "_blank" }, value.value)));
                        }
                        if (value.type === 7) {
                            return (h("p", { class: "b3" }, h("a", { class: "text_primary", href: `https://censys.io/ipv4?q=${value.value}`, target: "_blank" }, value.value)));
                        }
                        if (value.type === 4) {
                            return (h("p", { class: "b3" }, value.value
                                .map(valueType => `${valueType.name}=${valueType.value}`).join(', ')));
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
                const parentLink = this.getAuthKeyIdParentLink(extension);
                const siblingsLink = this.getAuthKeyIdSiblingsLink(extension);
                return [
                    this.renderRowValue('Key Identifier', [
                        h("span", null, extension.value.keyIdentifier),
                        parentLink && (h("span", null, "\u00A0[", h("a", { class: "text_primary", href: parentLink, target: "_blank" }, "parents"), "]")),
                        siblingsLink && (h("span", null, "\u00A0[", h("a", { class: "text_primary", href: siblingsLink, target: "_blank" }, "siblings"), "]")),
                    ], { monospace: true }),
                    this.renderRowValue('Authority Cert Issuer', extension.value.authorityCertIssuer),
                    this.renderRowValue('Authority Cert Serial Number', extension.value.authorityCertSerialNumber),
                ];
            }
            case EnumOIDs.CertificateTransparency: {
                return extension.value.map(timestamp => [
                    h("br", null),
                    this.renderRowValue('Log ID', timestamp.logID, { monospace: true }),
                    this.renderRowValue('Log Name', timestamp.name),
                    this.renderRowValue('Hash Algorithm', timestamp.hashAlgorithm.toUpperCase()),
                    this.renderRowValue('Signature Algorithm', timestamp.signatureAlgorithm.toUpperCase()),
                    this.renderRowValue('Timestamp', short(timestamp.timestamp)),
                ]);
            }
            case EnumOIDs.SubjectKeyIdentifier: {
                const childrenLink = this.getSubjectKeyIdChildrenLink(extension);
                const siblingsLink = this.getSubjectKeyIdSiblingsLink(extension);
                return this.renderRowValue('Value', [
                    h("span", null, extension.value),
                    childrenLink && (h("span", null, "\u00A0[", h("a", { class: "text_primary", href: childrenLink, target: "_blank" }, "children"), "]")),
                    siblingsLink && (h("span", null, "\u00A0[", h("a", { class: "text_primary", href: siblingsLink, target: "_blank" }, "siblings"), "]")),
                ], { monospace: true });
            }
            case EnumOIDs.QualifiedCertificateStatements: {
                return extension.value.map((statement, index) => (this.renderRowValue(`Statement ${index + 1}`, [
                    h("p", null, statement.name, " (", statement.oid, ")"),
                ])));
            }
            case EnumOIDs.MicrosoftCARenewal: {
                return [
                    this.renderRowValue('Certificate Index', extension.value.certificateIndex),
                    this.renderRowValue('Key Index', extension.value.keyIndex),
                ];
            }
            case EnumOIDs.MicrosoftCertificateType: {
                return this.renderRowValue('Value', extension.value);
            }
            case EnumOIDs.SubjectDirectoryAttributes: {
                return extension.value.map((attribute, index) => (this.renderRowValue(`Attribute ${index + 1}`, [
                    h("p", null, attribute.name, " (", attribute.oid, ")"),
                    attribute.value.map(value => (h("p", null, short(value)))),
                ])));
            }
            case EnumOIDs.AdobeTimestamp: {
                return [
                    this.renderRowValue('Version', extension.value.version),
                    this.renderRowValue('Location', [(h("a", { class: "text_primary", href: extension.value.location, target: "_blank" }, extension.value.location))]),
                    this.renderRowValue('Require Auth', (extension.value.requiresAuth || false).toString()),
                ];
            }
        }
        if (typeof extension.value === 'string') {
            return this.renderRowValue('Value', extension.value, { monospace: true });
        }
        return this.renderRowValue('Value', extension.value);
    }
    renderMiscellaneous() {
        if (!this.download) {
            return null;
        }
        return [
            this.renderRowTitle('Miscellaneous'),
            this.renderRowValue('Download', [(h("peculiar-button-split", { onClick: this.certificateDecoded.downloadAsPEM.bind(this), actions: [{
                            text: 'Download DER',
                            onClick: this.certificateDecoded.downloadAsDER.bind(this),
                        }] }, "Download PEM"))], { align: 'middle' }),
        ];
    }
    renderErrorState() {
        return (h("div", { class: "status_wrapper" }, h("p", { class: "b1 interaction_text text_black" }, "There is error for certificate decode.")));
    }
    renderEmptyState() {
        return (h("div", { class: "status_wrapper" }, h("p", { class: "b1 interaction_text text_black" }, "There is no certificate available.")));
    }
    render() {
        if (this.certificateDecodeError) {
            return this.renderErrorState();
        }
        if (!this.certificateDecoded) {
            return this.renderEmptyState();
        }
        return (h("table", null, this.renderRowTitle('Basic Information'), h("tr", null, h("td", { colSpan: 2 }, h("peculiar-certificate-summary", { certificate: this.certificateDecoded, issuerDnLink: this.issuerDnLink }))), this.renderRowTitle('Public Key Info'), this.renderRowValue('Algorithm', this.certificateDecoded.publicKey.algorithm.name), this.renderRowValue('Modulus Bits', this.certificateDecoded.publicKey.algorithm.modulusBits), this.renderRowValue('Public Exponent', this.certificateDecoded.publicKey.algorithm.publicExponent), this.renderRowValue('Named Curve', this.certificateDecoded.publicKey.algorithm.namedCurve), this.renderRowValue('Value', this.certificateDecoded.publicKey.value, { monospace: true, collapse: true }), this.renderRowTitle('Signature'), this.renderRowValue('Algorithm', this.certificateDecoded.signature.algorithm.name), this.renderRowValue('Hash', this.certificateDecoded.signature.algorithm.hash), this.renderRowValue('Value', this.certificateDecoded.signature.value, { monospace: true, collapse: true }), this.renderRowTitle('Fingerprints'), this.renderRowValue('SHA-256', this.certificateDecoded.fingerprints['SHA-256'], { monospace: true }), this.renderRowValue('SHA-1', this.certificateDecoded.fingerprints['SHA-1'], { monospace: true }), this.renderRowTitle('Extensions'), this.certificateDecoded.extensions.map(extension => ([
            this.renderRowValue('Name', extension.name ? `${extension.name} (${extension.oid})` : extension.oid),
            this.renderRowValue('Critical', String(extension.critical)),
            this.renderRowExtensionValue(extension),
            h("tr", null, h("td", { colSpan: 2, class: "divider" }, h("span", { class: "bg_fill" }))),
        ])), this.renderMiscellaneous()));
    }
    static get watchers() { return {
        "certificate": ["watchCertificateAndDecode"]
    }; }
};
CertificateViewer.style = certificateViewerCss;

export { CertificateViewer as peculiar_certificate_viewer };
