import { r as registerInstance, h, H as Host } from './index-d38ac7fc.js';
import { C as Certificate, E as EnumOIDs, v as validator } from './index-7d5b3293.js';
import { s as short } from './dateFormatter-5adc0276.js';

const certificateViewerCss = ".sc-peculiar-certificate-viewer-h{display:block;width:100%;word-wrap:break-word;position:relative;min-width:280px;min-height:300px;background:rgb(var(--peculiar-color-light-rgb))}th.sc-peculiar-certificate-viewer,td.sc-peculiar-certificate-viewer{border:none}table.sc-peculiar-certificate-viewer{width:100%;margin-bottom:30px}table.sc-peculiar-certificate-viewer .title.sc-peculiar-certificate-viewer td.sc-peculiar-certificate-viewer{border-color:rgba(var(--peculiar-color-grey_3-rgb), 0.5);padding-top:60px;padding-bottom:15px;border-bottom-width:1px;border-bottom-style:solid}table.sc-peculiar-certificate-viewer td.sc-peculiar-certificate-viewer:first-child{padding-left:30px;width:130px;padding-right:10px}table.sc-peculiar-certificate-viewer td.sc-peculiar-certificate-viewer:last-child{padding-right:30px;width:calc(100% - 130px)}table.sc-peculiar-certificate-viewer td.sc-peculiar-certificate-viewer{vertical-align:top;padding-top:5px;padding-bottom:5px}.vertical_align_top.sc-peculiar-certificate-viewer{vertical-align:top}.vertical_align_middle.sc-peculiar-certificate-viewer{vertical-align:middle}table.sc-peculiar-certificate-viewer .title.sc-peculiar-certificate-viewer:first-child td.sc-peculiar-certificate-viewer{padding-top:15px}table.sc-peculiar-certificate-viewer .title.sc-peculiar-certificate-viewer+tr.sc-peculiar-certificate-viewer td.sc-peculiar-certificate-viewer{padding-top:15px}table.sc-peculiar-certificate-viewer td.monospace.sc-peculiar-certificate-viewer{max-width:0}table.sc-peculiar-certificate-viewer .divider.sc-peculiar-certificate-viewer{padding-top:15px;padding-bottom:15px}.divider.sc-peculiar-certificate-viewer .bg_fill.sc-peculiar-certificate-viewer{background-color:rgba(var(--peculiar-color-grey_3-rgb), 0.5)}table.sc-peculiar-certificate-viewer tr.sc-peculiar-certificate-viewer:last-child .divider.sc-peculiar-certificate-viewer{padding-top:0;opacity:0}.divider.sc-peculiar-certificate-viewer span.sc-peculiar-certificate-viewer{display:block;height:1px}.status_wrapper.sc-peculiar-certificate-viewer{min-height:inherit;display:flex;justify-content:center;align-items:center}.interaction_text.sc-peculiar-certificate-viewer{padding:15px 0;width:300px;margin:auto;text-align:center}@media (max-width: 900px){table.sc-peculiar-certificate-viewer,tr.sc-peculiar-certificate-viewer,td.sc-peculiar-certificate-viewer{display:block}table.sc-peculiar-certificate-viewer td.sc-peculiar-certificate-viewer:last-child,table.sc-peculiar-certificate-viewer td.sc-peculiar-certificate-viewer:first-child{padding-right:15px;padding-left:15px;width:100%}table.sc-peculiar-certificate-viewer .title.sc-peculiar-certificate-viewer+tr.sc-peculiar-certificate-viewer td.sc-peculiar-certificate-viewer{padding-top:5px}table.sc-peculiar-certificate-viewer .title.sc-peculiar-certificate-viewer+tr.sc-peculiar-certificate-viewer td.sc-peculiar-certificate-viewer:first-child{padding-top:15px}table.sc-peculiar-certificate-viewer td.monospace.sc-peculiar-certificate-viewer{width:100%;max-width:none}}[data-view=mobile].sc-peculiar-certificate-viewer-h table.sc-peculiar-certificate-viewer,[data-view=mobile].sc-peculiar-certificate-viewer-h tr.sc-peculiar-certificate-viewer,[data-view=mobile].sc-peculiar-certificate-viewer-h td.sc-peculiar-certificate-viewer{display:block}[data-view=mobile].sc-peculiar-certificate-viewer-h table.sc-peculiar-certificate-viewer td.sc-peculiar-certificate-viewer:last-child,[data-view=mobile].sc-peculiar-certificate-viewer-h table.sc-peculiar-certificate-viewer td.sc-peculiar-certificate-viewer:first-child{padding-right:15px;padding-left:15px;width:100%}[data-view=mobile].sc-peculiar-certificate-viewer-h table.sc-peculiar-certificate-viewer .title.sc-peculiar-certificate-viewer+tr.sc-peculiar-certificate-viewer td.sc-peculiar-certificate-viewer{padding-top:5px}[data-view=mobile].sc-peculiar-certificate-viewer-h table.sc-peculiar-certificate-viewer .title.sc-peculiar-certificate-viewer+tr.sc-peculiar-certificate-viewer td.sc-peculiar-certificate-viewer:first-child{padding-top:15px}[data-view=mobile].sc-peculiar-certificate-viewer-h table.sc-peculiar-certificate-viewer td.monospace.sc-peculiar-certificate-viewer{width:100%;max-width:none}";

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
    getLEILink(extension) {
        return `https://www.gleif.org/lei/${extension.value}`;
    }
    renderRowTitle(title) {
        return (h("tr", { class: "title" }, h("td", { colSpan: 2 }, h("peculiar-typography", { type: "h6" }, title))));
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
                vertical_align_top: options.align !== 'middle',
                vertical_align_middle: options.align === 'middle',
            } }, h("peculiar-typography", { color: "grey_5" }, title, ":")), h("td", { class: {
                monospace: options.monospace,
            } }, h("peculiar-typography", { monospace: options.monospace }, valueElem))));
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
                return this.renderRowValue('Values', extension.value.map(value => (h("peculiar-typography", null, value.name, " (", value.oid, ")"))));
            }
            case EnumOIDs.CertificatePolicies: {
                return [
                    extension.value.policies.map((value, index) => (this.renderRowValue(`Policy ${index + 1}`, [
                        h("peculiar-typography", null, value.name, " (", value.oid, ")"),
                    ]))),
                    extension.value.qualifiers.map((value, index) => (this.renderRowValue(`Qualifier ${index + 1}`, [
                        h("peculiar-typography", null, value.name, " (", value.oid, ")"),
                        validator.isUrl(value.value) ? (h("a", { class: "peculiar_color_primary", href: value.value, target: "_blank" }, value.value)) : (h("peculiar-typography", null, value.value)),
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
                            return (h("peculiar-typography", null, h("a", { class: "peculiar_color_primary", href: valuePoint.value, target: "_blank" }, valuePoint.value)));
                        }
                        return (h("peculiar-typography", null, valuePoint.value));
                    });
                }));
            }
            case EnumOIDs.CertificateAuthorityInformationAccess: {
                return extension.value
                    .map((value, index) => (this.renderRowValue(`Method ${index + 1}`, [
                    h("peculiar-typography", null, value.name, " (", value.oid, ")"),
                    value.type === 6 ? (h("a", { class: "peculiar_color_primary", href: value.value, target: "_blank" }, value.value)) : (value.value),
                ])));
            }
            case EnumOIDs.NameConstraints: {
                return [
                    this.renderRowValue('Permitted Values', extension.value.permitted.map((value) => {
                        if (value.type === 2) {
                            return (h("peculiar-typography", null, h("a", { class: "peculiar_color_primary", href: `https://censys.io/ipv4?q=${value.value}`, target: "_blank" }, value.value)));
                        }
                        if (value.type === 7) {
                            return (h("peculiar-typography", null, h("a", { class: "peculiar_color_primary", href: `https://censys.io/ipv4?q=${value.value}`, target: "_blank" }, value.value)));
                        }
                        if (value.type === 4) {
                            return (h("peculiar-typography", null, value.value
                                .map(valueType => `${valueType.name}=${valueType.value}`).join(', ')));
                        }
                        return (h("peculiar-typography", null, value.value));
                    })),
                ];
            }
            case EnumOIDs.SubjectAlternativeName: {
                return [
                    this.renderRowValue('Values', extension.value.map((value) => {
                        if (value.type === 2) {
                            return (h("peculiar-typography", null, h("a", { class: "peculiar_color_primary", href: `https://censys.io/ipv4?q=${value.value}`, target: "_blank" }, value.value)));
                        }
                        if (value.type === 7) {
                            return (h("peculiar-typography", null, h("a", { class: "peculiar_color_primary", href: `https://censys.io/ipv4?q=${value.value}`, target: "_blank" }, value.value)));
                        }
                        if (value.type === 4) {
                            return (h("peculiar-typography", null, value.value
                                .map(valueType => `${valueType.name}=${valueType.value}`).join(', ')));
                        }
                        return (h("peculiar-typography", null, value.value));
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
                        parentLink && (h("span", null, "\u00A0[", h("a", { class: "peculiar_color_primary", href: parentLink, target: "_blank" }, "parents"), "]")),
                        siblingsLink && (h("span", null, "\u00A0[", h("a", { class: "peculiar_color_primary", href: siblingsLink, target: "_blank" }, "siblings"), "]")),
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
                    childrenLink && (h("span", null, "\u00A0[", h("a", { class: "peculiar_color_primary", href: childrenLink, target: "_blank" }, "children"), "]")),
                    siblingsLink && (h("span", null, "\u00A0[", h("a", { class: "peculiar_color_primary", href: siblingsLink, target: "_blank" }, "siblings"), "]")),
                ], { monospace: true });
            }
            case EnumOIDs.QualifiedCertificateStatements: {
                return extension.value.map((statement, index) => (this.renderRowValue(`Statement ${index + 1}`, [
                    h("peculiar-typography", null, statement.name, " (", statement.oid, ")"),
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
                    h("peculiar-typography", null, attribute.name, " (", attribute.oid, ")"),
                    attribute.value.map(value => (h("peculiar-typography", null, short(value)))),
                ])));
            }
            case EnumOIDs.AdobeTimestamp: {
                return [
                    this.renderRowValue('Version', extension.value.version),
                    this.renderRowValue('Location', [(h("a", { class: "peculiar_color_primary", href: extension.value.location, target: "_blank" }, extension.value.location))]),
                    this.renderRowValue('Require Auth', (extension.value.requiresAuth || false).toString()),
                ];
            }
            case EnumOIDs.LEI: {
                const leiLink = this.getLEILink(extension);
                return this.renderRowValue('Value', [(h("a", { class: "peculiar_color_primary", href: leiLink, target: "_blank" }, extension.value))]);
            }
            case EnumOIDs.Role: {
                return this.renderRowValue('Value', extension.value);
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
        return (h("div", { class: "status_wrapper" }, h("peculiar-typography", { type: "b1", class: "interaction_text" }, "There is error for certificate decode.")));
    }
    renderEmptyState() {
        return (h("div", { class: "status_wrapper" }, h("peculiar-typography", { type: "b1", class: "interaction_text" }, "There is no certificate available.")));
    }
    render() {
        if (this.certificateDecodeError) {
            return this.renderErrorState();
        }
        if (!this.certificateDecoded) {
            return this.renderEmptyState();
        }
        return (h(Host, { "data-view": this.view }, h("table", null, this.renderRowTitle('Basic Information'), h("tr", null, h("td", { colSpan: 2 }, h("peculiar-certificate-summary", { certificate: this.certificateDecoded, issuerDnLink: this.issuerDnLink, view: this.view }))), this.renderRowTitle('Public Key Info'), this.renderRowValue('Algorithm', this.certificateDecoded.publicKey.algorithm.name), this.renderRowValue('Modulus Bits', this.certificateDecoded.publicKey.algorithm.modulusBits), this.renderRowValue('Public Exponent', this.certificateDecoded.publicKey.algorithm.publicExponent), this.renderRowValue('Named Curve', this.certificateDecoded.publicKey.algorithm.namedCurve), this.renderRowValue('Value', this.certificateDecoded.publicKey.value, { monospace: true, collapse: true }), this.renderRowTitle('Signature'), this.renderRowValue('Algorithm', this.certificateDecoded.signature.algorithm.name), this.renderRowValue('Hash', this.certificateDecoded.signature.algorithm.hash), this.renderRowValue('Value', this.certificateDecoded.signature.value, { monospace: true, collapse: true }), this.renderRowTitle('Fingerprints'), this.renderRowValue('SHA-256', this.certificateDecoded.fingerprints['SHA-256'], { monospace: true }), this.renderRowValue('SHA-1', this.certificateDecoded.fingerprints['SHA-1'], { monospace: true }), this.renderRowTitle('Extensions'), this.certificateDecoded.extensions.map(extension => ([
            this.renderRowValue('Name', extension.name ? `${extension.name} (${extension.oid})` : extension.oid),
            this.renderRowValue('Critical', String(extension.critical)),
            this.renderRowExtensionValue(extension),
            h("tr", null, h("td", { colSpan: 2, class: "divider" }, h("span", { class: "bg_fill" }))),
        ])), this.renderMiscellaneous())));
    }
    static get watchers() { return {
        "certificate": ["watchCertificateAndDecode"]
    }; }
};
CertificateViewer.style = certificateViewerCss;

export { CertificateViewer as peculiar_certificate_viewer };
