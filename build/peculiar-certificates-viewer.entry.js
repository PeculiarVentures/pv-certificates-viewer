import { r as registerInstance, h, H as Host } from './index-f2b7af1d.js';
import { C as Certificate } from './index-74f2f11e.js';
import './dateFormatter-5adc0276.js';

const certificatesViewerCss = "*{margin:0;padding:0;box-sizing:border-box;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;text-size-adjust:none;-webkit-text-size-adjust:none;-webkit-tap-highlight-color:transparent;word-break:break-word}*:focus:not(:active):not(:hover){outline-width:2px;outline-style:solid;outline-offset:-1px}input:focus,textarea:focus,*:active,*:hover{outline:none !important}a{text-decoration:none}textarea{resize:none}input,textarea{-webkit-appearance:none !important;-moz-appearance:none;-ms-appearance:none;appearance:none !important;font-family:inherit}table{cellspacing:0 !important;border-spacing:0 !important}.b1{font-family:inherit;font-size:15px;line-height:1.46;letter-spacing:0.3px}.b3{font-family:inherit;font-size:13px;line-height:1.53;letter-spacing:0.5px;font-weight:400}.h4{font-family:inherit;font-style:normal;font-weight:bold;font-size:18px;line-height:25px}.h6{font-family:inherit;font-weight:600;font-size:15px;line-height:20px;letter-spacing:0.3px}.h7{font-family:inherit;font-weight:600;font-size:14px;line-height:1.35}.monospace{font-family:monospace}.text_black{color:rgb(var(--peculiar-color-black-rgb))}.text_white{color:rgb(var(--peculiar-color-white-rgb))}.text_grey{color:rgb(var(--peculiar-color-grey-rgb))}.text_primary{color:rgb(var(--peculiar-color-primary-rgb))}.align_center{text-align:center}.align_left{text-align:left}.align_right{text-align:right}.fill_grey{background-color:rgb(var(--peculiar-color-grey-rgb))}.fill_white{background-color:rgb(var(--peculiar-color-white-rgb))}.fill_primary{background-color:rgb(var(--peculiar-color-primary-rgb))}.svg_fill_black{fill:rgb(var(--peculiar-color-black-rgb))}.svg_fill_white{fill:rgb(var(--peculiar-color-white-rgb))}.svg_fill_primary{fill:rgb(var(--peculiar-color-primary-rgb))}.stroke_border{border-color:rgb(var(--peculiar-color-border-rgb))}:host{display:block;width:100%;word-wrap:break-word;min-width:300px;overflow:auto;position:relative;background:rgb(var(--peculiar-color-white-rgb))}table{width:100%;table-layout:fixed;border-collapse:collapse}table thead{background-color:rgba(var(--peculiar-color-primary-rgb), 0.07)}table tr td{vertical-align:middle}table tbody tr:not(.expanded_summary){cursor:pointer}table th{padding:15px 10px;text-align:left;border-width:1px;border-style:solid}table td{padding:8px 10px;text-align:left;border-width:1px;border-style:solid}table .col_issuer,table .col_name,table .col_public_key{width:16%}table .col_actions,table .col_tests{width:18%}table.m_extra .col_issuer,table.m_extra .col_name,table.m_extra .col_public_key{width:12%}table.m_extra .col_actions,table.m_extra .col_tests{width:17%}table tr.expanded td:not(:last-child){border-right-color:transparent}table tr.expanded td{border-bottom-color:transparent}.expanded{border-bottom-color:transparent;background-color:rgba(var(--peculiar-color-primary-rgb), 0.04)}table tr.expanded_summary{background-color:rgba(var(--peculiar-color-primary-rgb), 0.04)}table tr.expanded_summary td{vertical-align:top;padding:10px 20px 26px}@keyframes fadeIn{0%{opacity:0.001}100%{opacity:1}}.modal_wrapper{position:fixed;top:0;left:0;width:100%;height:100%;z-index:1;overflow:auto;padding:10px;text-align:center;background:rgba(var(--peculiar-color-black-rgb), 0.9);animation:fadeIn 300ms}.modal_wrapper:before{display:inline-block;vertical-align:middle;width:0;height:100%;content:''}.modal_content{position:relative;display:inline-block;vertical-align:middle;width:100%;max-width:900px;text-align:left;border-radius:3px;overflow:hidden}.modal_title{background-color:rgba(var(--peculiar-color-primary-rgb), 0.07);border-bottom-width:1px;border-bottom-style:solid;padding:17px 60px 17px 20px;position:relative;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.modal_close{cursor:pointer;border:none;background-color:transparent;position:absolute;top:0;bottom:0;right:0;padding:0 12px;transition:opacity 100ms}.modal_close:hover{opacity:0.6}.button_table_action{margin:2px}.mobile_title{display:none}.status_wrapper{height:85px;text-align:center;pointer-events:none}.search_section{background-color:rgba(var(--peculiar-color-primary-rgb), 0.07);height:50px;padding:10px;border-width:1px 1px 0 1px;border-style:solid}.input_search{height:100%;width:100%;border-radius:3px;border-width:1px;border-style:solid;padding:0 14px;font-size:12px}.input_search::placeholder{color:rgb(var(--peculiar-color-border-rgb))}.loading_container{position:absolute;top:0;left:0;width:100%;height:100%;background:rgba(var(--peculiar-color-black-rgb), 0.3);display:flex;align-items:center}@media (hover: hover){table tbody tr:not(.expanded_summary):hover{background-color:rgba(var(--peculiar-color-primary-rgb), 0.04)}}@media (max-width: 900px){table,tbody,tr,td{display:block}thead{display:none}tr{padding:0 15px;border-width:1px;border-style:solid}tr:not(:first-child){margin-top:-1px}tr:not(.expanded_summary) td:first-child{border:none! important}table td{padding-left:0;padding-right:0;border-width:1px 0 0 0 ! important;border-color:rgba(var(--peculiar-color-border-rgb), 0.5) ! important}table tr.expanded_summary td{padding:15px 0}.mobile_title{display:inline-block;width:90px;vertical-align:middle}.modal_title{padding:17px 60px 17px 15px}.content{display:inline-block;width:calc(100% - 90px);vertical-align:middle;text-align:left}.expanded_summary{border-top-color:transparent;padding-bottom:10px}.expanded_summary td:before{content:none}.status_wrapper{height:266px;display:table-cell}.search_section{height:60px;padding:15px}}";

const CertificatesViewer = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        /**
         * List of certificates values for decode and show in the list.
         * <br />
         * **NOTE**: If you do not provide a `name` value when
         * invocing the component it will take the first Subject CN value.
         * <br />
         * **NOTE**: If you do not provide a `tests` this column will be ommited from the rendered page.
         * <br />
         * **NOTE**: If the supplied certificates are self-signed the issuer column will be ommited.
         */
        this.certificates = [];
        /**
         * Use filter in the list when search is changed.
         */
        this.filterWithSearch = true;
        /**
         * Use highlight chapters in the list when search is changed.
         */
        this.highlightWithSearch = true;
        this.search = '';
        this.certificatesDecoded = [];
        this.isDecodeInProcess = true;
        this.isHasTests = false;
        this.isHasRoots = false;
        this.onClickDetails = (value, event) => {
            event.stopPropagation();
            this.certificateSelectedForDetails = value;
        };
        this.onClickModalClose = () => {
            this.certificateSelectedForDetails = null;
        };
        this.onSearchChange = (e) => {
            this.search = e.target.value
                .trim();
        };
    }
    componentWillLoad() {
        this.certificatesDecodeAndSet();
    }
    watchCertificates() {
        this.certificatesDecodeAndSet();
    }
    async certificatesDecodeAndSet() {
        const timeStart = performance.now();
        this.isHasTests = false;
        this.isHasRoots = false;
        if (!Array.isArray(this.certificates)) {
            return [];
        }
        const data = [];
        for (const certificate of this.certificates) {
            try {
                const cert = new Certificate(certificate.value, certificate.name);
                await cert.getFingerprint('SHA-1');
                data.push(Object.assign(cert, { tests: certificate.tests }));
                if (!this.isHasRoots && cert.isRoot) {
                    this.isHasRoots = true;
                }
                if (!this.isHasTests) {
                    if (certificate.tests &&
                        (certificate.tests.expired || certificate.tests.revoked || certificate.tests.valid)) {
                        this.isHasTests = true;
                    }
                }
            }
            catch (error) {
                console.error(error);
            }
        }
        const timeEnd = performance.now();
        const timeDuration = timeEnd - timeStart;
        const minimumTimeDuration = 800;
        /**
         * Check decode time duration and change `isDecodeInProcess` to `false`
         * only after `minimumTimeDuration` time for prevent quickly hide loading state
         */
        if (timeDuration < minimumTimeDuration) {
            setTimeout(() => this.isDecodeInProcess = false, minimumTimeDuration - timeDuration);
        }
        else {
            this.isDecodeInProcess = false;
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
        let colSpan = 4;
        if (this.isHasTests) {
            colSpan += 1;
        }
        if (!this.isHasRoots) {
            colSpan += 1;
        }
        return (h("tr", { class: "expanded_summary stroke_border" }, h("td", { colSpan: colSpan, class: "stroke_border" }, h("peculiar-certificate-summary", { certificate: certificate, showIssuer: !certificate.isRoot }))));
    }
    renderCertificateTests(tests) {
        if (!tests) {
            return null;
        }
        const elems = [];
        if (tests.valid) {
            elems.push((h("peculiar-button", { class: "button_table_action", href: tests.valid, target: "_blank" }, "Valid")));
        }
        if (tests.revoked) {
            elems.push((h("peculiar-button", { class: "button_table_action", href: tests.revoked, target: "_blank" }, "Revoked")));
        }
        if (tests.expired) {
            elems.push((h("peculiar-button", { class: "button_table_action", href: tests.expired, target: "_blank" }, "Expired")));
        }
        return elems;
    }
    renderContentState() {
        const searchHighlight = this.highlightWithSearch
            ? this.search
            : '';
        const content = [];
        this.certificatesDecoded.forEach((certificate) => {
            const isExpandedRow = certificate.serialNumber === this.expandedRow;
            const publicKeyValue = `${certificate.publicKey.algorithm.name} ${certificate.publicKey.algorithm.modulusBits || certificate.publicKey.algorithm.namedCurve}`;
            const issuerValue = certificate.issuer && certificate.issuer.CN
                ? certificate.issuer.CN.value
                : '';
            if (this.filterWithSearch && this.search) {
                const certificateStringForSearch = [
                    publicKeyValue,
                    issuerValue,
                    certificate.commonName,
                    certificate.fingerprints['SHA-1'],
                ]
                    .join(' ')
                    .toLowerCase();
                if (certificateStringForSearch.indexOf(this.search.toLowerCase()) === -1) {
                    return;
                }
            }
            content.push([
                h("tr", { class: {
                        stroke_border: true,
                        expanded: isExpandedRow,
                    }, onClick: this.onClickRow.bind(this, certificate.serialNumber), key: certificate.serialNumber }, !this.isHasRoots && (h("td", { class: "b3 stroke_border" }, h("span", { class: "mobile_title text_grey align_left b3" }, "Issuer:"), h("span", { class: "content" }, h("peculiar-highlight-words", { search: searchHighlight }, issuerValue)))), h("td", { class: "b3 stroke_border" }, h("span", { class: "mobile_title text_grey align_left b3" }, "Name:"), h("span", { class: "content" }, h("peculiar-highlight-words", { search: searchHighlight }, certificate.commonName))), h("td", { class: "b3 stroke_border" }, h("span", { class: "mobile_title text_grey align_left b3" }, "Public Key:"), h("span", { class: "content" }, h("peculiar-highlight-words", { search: searchHighlight }, publicKeyValue))), h("td", { class: "b3 stroke_border" }, h("span", { class: "mobile_title text_grey align_left b3" }, "Fingerprint (SHA-1):"), h("span", { class: "content monospace" }, h("peculiar-highlight-words", { search: searchHighlight }, certificate.fingerprints['SHA-1']))), h("td", { class: "align_center stroke_border" }, h("span", { class: "mobile_title text_grey align_left b3" }, "Actions:"), h("span", { class: "content" }, h("peculiar-button", { onClick: this.onClickDetails.bind(this, certificate.base64), class: "button_table_action" }, "Details"), h("peculiar-button-split", { onClick: this.onClickDownload.bind(this, certificate, 'PEM'), actions: [{
                            text: 'Download DER',
                            onClick: this.onClickDownload.bind(this, certificate, 'DER'),
                        }], class: "button_table_action" }, "Download PEM"))), this.isHasTests && (h("td", { class: "align_center stroke_border" }, h("span", { class: "mobile_title text_grey align_left b3" }, "Test URLs:"), h("span", { class: "content" }, this.renderCertificateTests(certificate.tests))))),
                isExpandedRow && this.renderExpandedRow(certificate),
            ]);
        });
        return content;
    }
    renderCertificateDetailsModal() {
        if (!this.certificateSelectedForDetails) {
            return null;
        }
        return (h("div", { class: "modal_wrapper" }, h("div", { class: "modal_content fill_white" }, h("div", { class: "modal_title stroke_border" }, h("h4", { class: "h4 text_black" }, "Certificate details"), h("button", { class: "modal_close", onClick: this.onClickModalClose }, h("svg", { width: "30", height: "30", viewBox: "0 0 30 30", xmlns: "http://www.w3.org/2000/svg", class: "svg_fill_black" }, h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M15.7204 14.375L21.0654 19.7185C21.3115 19.9658 21.3115 20.3693 21.0654 20.6154L20.615 21.0645C20.3689 21.3118 19.9667 21.3118 19.7181 21.0645L14.3744 15.721L9.03194 21.0645C8.78327 21.3118 8.3811 21.3118 8.13371 21.0645L7.68459 20.6154C7.43847 20.3693 7.43847 19.9658 7.68459 19.7185L13.0296 14.375L7.68459 9.03155C7.43847 8.78417 7.43847 8.38074 7.68459 8.13463L8.13371 7.68554C8.3811 7.43815 8.78327 7.43815 9.03194 7.68554L14.3744 13.029L19.7181 7.68554C19.9667 7.43815 20.3689 7.43815 20.615 7.68554L21.0654 8.13463C21.3115 8.38074 21.3115 8.78417 21.0654 9.03155L15.7204 14.375Z" })))), h("peculiar-certificate-viewer", { certificate: this.certificateSelectedForDetails }))));
    }
    renderSearch() {
        if (!this.filterWithSearch && !this.highlightWithSearch) {
            return null;
        }
        return (h("div", { class: "search_section stroke_border" }, h("input", { onInput: this.onSearchChange, type: "search", value: "", class: "input_search fill_white stroke_border text_black", disabled: !this.certificatesDecoded.length, placeholder: "Search" })));
    }
    renderEmptyState() {
        return (h("tr", { class: "stroke_border" }, h("td", { class: "b1 text_black stroke_border status_wrapper", colSpan: 5 }, "There are no certificates available.")));
    }
    renderEmptySearchState() {
        return (h("tr", { class: "stroke_border" }, h("td", { class: "b1 text_black stroke_border status_wrapper", colSpan: 5 }, "No results found for \"", this.search, "\"")));
    }
    renderLoadingState() {
        return (h("div", { class: "loading_container" }, h("peculiar-circular-progress", null)));
    }
    renderBody() {
        if (this.isDecodeInProcess) {
            return null;
        }
        if (!this.certificatesDecoded.length) {
            return this.renderEmptyState();
        }
        const contentState = this.renderContentState();
        if (this.search && !contentState.length) {
            return this.renderEmptySearchState();
        }
        return contentState;
    }
    render() {
        return (h(Host, null, this.renderSearch(), h("table", { class: {
                text_black: true,
                m_extra: this.isHasTests || !this.isHasRoots,
            } }, h("thead", null, h("tr", { class: "stroke_border" }, !this.isHasRoots && (h("th", { class: "h7 stroke_border col_issuer" }, "Issuer")), h("th", { class: "h7 stroke_border col_name" }, "Name"), h("th", { class: "h7 stroke_border col_public_key" }, "Public Key"), h("th", { class: "h7 stroke_border col_fingerprint" }, "Fingerprint (SHA-1)"), h("th", { class: "align_center h7 stroke_border col_actions" }, "Actions"), this.isHasTests && (h("th", { class: "align_center h7 stroke_border col_tests" }, "Test URLs")))), h("tbody", null, this.renderBody())), this.renderCertificateDetailsModal(), this.isDecodeInProcess && this.renderLoadingState()));
    }
    static get watchers() { return {
        "certificates": ["watchCertificates"]
    }; }
};
CertificatesViewer.style = certificatesViewerCss;

export { CertificatesViewer as peculiar_certificates_viewer };
