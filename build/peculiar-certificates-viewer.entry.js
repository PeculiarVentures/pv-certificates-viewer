import { r as registerInstance, h, H as Host } from './index-d38ac7fc.js';
import { C as Certificate } from './index-7d5b3293.js';
import './dateFormatter-5adc0276.js';

const certificatesViewerCss = ".sc-peculiar-certificates-viewer-h{display:block;width:100%;word-wrap:break-word;min-width:280px;overflow:auto;position:relative;background:rgb(var(--peculiar-color-light-rgb))}table.sc-peculiar-certificates-viewer{width:100%;table-layout:fixed;border-collapse:collapse}table.sc-peculiar-certificates-viewer thead.sc-peculiar-certificates-viewer{background-color:rgba(var(--peculiar-color-primary-rgb), 0.07)}table.sc-peculiar-certificates-viewer tr.sc-peculiar-certificates-viewer td.sc-peculiar-certificates-viewer{vertical-align:middle}table.sc-peculiar-certificates-viewer tbody.sc-peculiar-certificates-viewer tr.sc-peculiar-certificates-viewer:not(.expanded_summary){cursor:pointer}table.sc-peculiar-certificates-viewer th.sc-peculiar-certificates-viewer{padding:15px 10px;border-width:1px;border-style:solid}table.sc-peculiar-certificates-viewer td.sc-peculiar-certificates-viewer{padding:8px 10px;border-width:1px;border-style:solid}table.sc-peculiar-certificates-viewer .col_issuer.sc-peculiar-certificates-viewer,table.sc-peculiar-certificates-viewer .col_name.sc-peculiar-certificates-viewer,table.sc-peculiar-certificates-viewer .col_public_key.sc-peculiar-certificates-viewer{width:16%}table.sc-peculiar-certificates-viewer .col_actions.sc-peculiar-certificates-viewer,table.sc-peculiar-certificates-viewer .col_tests.sc-peculiar-certificates-viewer{width:18%}table.m_extra.sc-peculiar-certificates-viewer .col_issuer.sc-peculiar-certificates-viewer,table.m_extra.sc-peculiar-certificates-viewer .col_name.sc-peculiar-certificates-viewer,table.m_extra.sc-peculiar-certificates-viewer .col_public_key.sc-peculiar-certificates-viewer{width:12%}table.m_extra.sc-peculiar-certificates-viewer .col_actions.sc-peculiar-certificates-viewer,table.m_extra.sc-peculiar-certificates-viewer .col_tests.sc-peculiar-certificates-viewer{width:17%}table.sc-peculiar-certificates-viewer tr.expanded.sc-peculiar-certificates-viewer td.sc-peculiar-certificates-viewer:not(:last-child){border-right-color:transparent}table.sc-peculiar-certificates-viewer tr.expanded.sc-peculiar-certificates-viewer td.sc-peculiar-certificates-viewer{border-bottom-color:transparent}.expanded.sc-peculiar-certificates-viewer{border-bottom-color:transparent;background-color:rgba(var(--peculiar-color-primary-rgb), 0.04)}table.sc-peculiar-certificates-viewer tr.expanded_summary.sc-peculiar-certificates-viewer{background-color:rgba(var(--peculiar-color-primary-rgb), 0.04)}table.sc-peculiar-certificates-viewer tr.expanded_summary.sc-peculiar-certificates-viewer td.sc-peculiar-certificates-viewer{vertical-align:top;padding:10px 20px 26px}@keyframes fadeIn{0%{opacity:0.001}100%{opacity:1}}.modal_wrapper.sc-peculiar-certificates-viewer{position:fixed;top:0;left:0;width:100%;height:100%;z-index:1;overflow:auto;padding:10px;text-align:center;background:rgba(var(--peculiar-color-dark-rgb), 0.9);animation:fadeIn 300ms}.modal_wrapper.sc-peculiar-certificates-viewer:before{display:inline-block;vertical-align:middle;width:0;height:100%;content:\"\"}.modal_content.sc-peculiar-certificates-viewer{position:relative;display:inline-block;vertical-align:middle;width:100%;max-width:900px;text-align:left;border-radius:3px;overflow:hidden}.modal_title.sc-peculiar-certificates-viewer{background-color:rgba(var(--peculiar-color-primary-rgb), 0.07);border-bottom-width:1px;border-bottom-style:solid;padding:17px 60px 17px 20px;position:relative;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.modal_close.sc-peculiar-certificates-viewer{cursor:pointer;border:none;background-color:transparent;position:absolute;top:0;bottom:0;right:0;padding:0 12px;transition:opacity 100ms;outline:none}.modal_close.sc-peculiar-certificates-viewer:hover{opacity:0.6}.modal_close.sc-peculiar-certificates-viewer svg.sc-peculiar-certificates-viewer{fill:rgb(var(--peculiar-color-dark-rgb))}.button_table_action.sc-peculiar-certificates-viewer{margin:2px}.mobile_title.sc-peculiar-certificates-viewer{display:none}.status_wrapper.sc-peculiar-certificates-viewer{height:85px;text-align:center;pointer-events:none}.search_section.sc-peculiar-certificates-viewer{background-color:rgba(var(--peculiar-color-primary-rgb), 0.07);height:50px;padding:10px;border-width:1px 1px 0 1px;border-style:solid}.input_search.sc-peculiar-certificates-viewer{height:100%;width:100%;border-radius:3px;border-width:1px;border-style:solid;padding:0 14px;font-size:12px;outline:none}.input_search.sc-peculiar-certificates-viewer::placeholder{color:rgb(var(--peculiar-color-grey_3-rgb))}.loading_container.sc-peculiar-certificates-viewer{position:absolute;top:0;left:0;width:100%;height:100%;background:rgba(var(--peculiar-color-dark-rgb), 0.3);display:flex;align-items:center}.align_center.sc-peculiar-certificates-viewer{text-align:center}@media (hover: hover){table.sc-peculiar-certificates-viewer tbody.sc-peculiar-certificates-viewer tr.sc-peculiar-certificates-viewer:not(.expanded_summary):hover{background-color:rgba(var(--peculiar-color-primary-rgb), 0.04)}}@media (max-width: 900px){table.sc-peculiar-certificates-viewer,tbody.sc-peculiar-certificates-viewer,tr.sc-peculiar-certificates-viewer,td.sc-peculiar-certificates-viewer{display:block}thead.sc-peculiar-certificates-viewer{display:none}tr.sc-peculiar-certificates-viewer{padding:0 15px;border-width:1px;border-style:solid}tr.sc-peculiar-certificates-viewer:not(:first-child){margin-top:-1px}tr.sc-peculiar-certificates-viewer:not(.expanded_summary) td.sc-peculiar-certificates-viewer:first-child{border:none !important}table.sc-peculiar-certificates-viewer td.sc-peculiar-certificates-viewer{padding-left:0;padding-right:0;border-width:1px 0 0 0 !important;border-color:rgba(var(--peculiar-color-grey_3-rgb), 0.5) !important}table.sc-peculiar-certificates-viewer tr.expanded_summary.sc-peculiar-certificates-viewer td.sc-peculiar-certificates-viewer{padding:15px 0}.mobile_title.sc-peculiar-certificates-viewer{display:inline-block;width:90px;vertical-align:middle}.modal_title.sc-peculiar-certificates-viewer{padding:17px 60px 17px 15px}.content.sc-peculiar-certificates-viewer{display:inline-block;width:calc(100% - 90px);vertical-align:middle;text-align:left}.expanded_summary.sc-peculiar-certificates-viewer{border-top-color:transparent;padding-bottom:10px}.expanded_summary.sc-peculiar-certificates-viewer td.sc-peculiar-certificates-viewer:before{content:none}.status_wrapper.sc-peculiar-certificates-viewer{height:266px;display:table-cell}.search_section.sc-peculiar-certificates-viewer{height:60px;padding:15px}.align_center.sc-peculiar-certificates-viewer{text-align:inherit}}";

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
        return (h("tr", { class: "expanded_summary peculiar_stroke_grey_3" }, h("td", { colSpan: colSpan, class: "peculiar_stroke_grey_3" }, h("peculiar-certificate-summary", { certificate: certificate, showIssuer: !certificate.isRoot }))));
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
                        peculiar_stroke_grey_3: true,
                        expanded: isExpandedRow,
                    }, onClick: this.onClickRow.bind(this, certificate.serialNumber), key: certificate.serialNumber }, !this.isHasRoots && (h("td", { class: "peculiar_stroke_grey_3" }, h("peculiar-typography", { class: "mobile_title", color: "grey_5" }, "Issuer:"), h("peculiar-typography", { class: "content" }, h("peculiar-highlight-words", { search: searchHighlight }, issuerValue)))), h("td", { class: "peculiar_stroke_grey_3" }, h("peculiar-typography", { class: "mobile_title", color: "grey_5" }, "Name:"), h("peculiar-typography", { class: "content" }, h("peculiar-highlight-words", { search: searchHighlight }, certificate.commonName))), h("td", { class: "peculiar_stroke_grey_3" }, h("peculiar-typography", { class: "mobile_title", color: "grey_5" }, "Public Key:"), h("peculiar-typography", { class: "content" }, h("peculiar-highlight-words", { search: searchHighlight }, publicKeyValue))), h("td", { class: "peculiar_stroke_grey_3" }, h("peculiar-typography", { class: "mobile_title", color: "grey_5" }, "Fingerprint (SHA-1):"), h("peculiar-typography", { class: "content", monospace: true }, h("peculiar-highlight-words", { search: searchHighlight }, certificate.fingerprints['SHA-1']))), h("td", { class: "align_center peculiar_stroke_grey_3" }, h("peculiar-typography", { class: "mobile_title", color: "grey_5" }, "Actions:"), h("span", { class: "content" }, h("peculiar-button", { onClick: this.onClickDetails.bind(this, certificate.base64), class: "button_table_action" }, "Details"), h("peculiar-button-split", { onClick: this.onClickDownload.bind(this, certificate, 'PEM'), actions: [{
                            text: 'Download DER',
                            onClick: this.onClickDownload.bind(this, certificate, 'DER'),
                        }], class: "button_table_action" }, "Download PEM"))), this.isHasTests && (h("td", { class: "align_center peculiar_stroke_grey_3" }, h("peculiar-typography", { class: "mobile_title", color: "grey_5" }, "Test URLs:"), h("span", { class: "content" }, this.renderCertificateTests(certificate.tests))))),
                isExpandedRow && this.renderExpandedRow(certificate),
            ]);
        });
        return content;
    }
    renderCertificateDetailsModal() {
        if (!this.certificateSelectedForDetails) {
            return null;
        }
        return (h("div", { class: "modal_wrapper" }, h("div", { class: "modal_content peculiar_fill_light" }, h("div", { class: "modal_title peculiar_stroke_grey_3" }, h("peculiar-typography", { type: "h4" }, "Certificate details"), h("button", { class: "modal_close", onClick: this.onClickModalClose }, h("svg", { width: "30", height: "30", viewBox: "0 0 30 30", xmlns: "http://www.w3.org/2000/svg" }, h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M15.7204 14.375L21.0654 19.7185C21.3115 19.9658 21.3115 20.3693 21.0654 20.6154L20.615 21.0645C20.3689 21.3118 19.9667 21.3118 19.7181 21.0645L14.3744 15.721L9.03194 21.0645C8.78327 21.3118 8.3811 21.3118 8.13371 21.0645L7.68459 20.6154C7.43847 20.3693 7.43847 19.9658 7.68459 19.7185L13.0296 14.375L7.68459 9.03155C7.43847 8.78417 7.43847 8.38074 7.68459 8.13463L8.13371 7.68554C8.3811 7.43815 8.78327 7.43815 9.03194 7.68554L14.3744 13.029L19.7181 7.68554C19.9667 7.43815 20.3689 7.43815 20.615 7.68554L21.0654 8.13463C21.3115 8.38074 21.3115 8.78417 21.0654 9.03155L15.7204 14.375Z" })))), h("peculiar-certificate-viewer", { certificate: this.certificateSelectedForDetails }))));
    }
    renderSearch() {
        if (!this.filterWithSearch && !this.highlightWithSearch) {
            return null;
        }
        return (h("div", { class: "search_section peculiar_stroke_grey_3" }, h("input", { onInput: this.onSearchChange, type: "search", value: "", class: "input_search peculiar_fill_light peculiar_stroke_grey_3 peculiar_color_dark", disabled: !this.certificatesDecoded.length, placeholder: "Search" })));
    }
    renderEmptyState() {
        return (h("tr", { class: "peculiar_stroke_grey_3" }, h("td", { class: "peculiar_stroke_grey_3 status_wrapper", colSpan: 5 }, h("peculiar-typography", { type: "b1", align: "center" }, "There are no certificates available."))));
    }
    renderEmptySearchState() {
        return (h("tr", { class: "peculiar_stroke_grey_3" }, h("td", { class: "peculiar_stroke_grey_3 status_wrapper", colSpan: 5 }, h("peculiar-typography", { type: "b1", align: "center" }, "No results found for \"", this.search, "\""))));
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
                peculiar_color_dark: true,
                m_extra: this.isHasTests || !this.isHasRoots,
            } }, h("thead", null, h("tr", { class: "peculiar_stroke_grey_3" }, !this.isHasRoots && (h("th", { class: "peculiar_stroke_grey_3 col_issuer" }, h("peculiar-typography", { type: "h7", align: "left" }, "Issuer"))), h("th", { class: "peculiar_stroke_grey_3 col_name" }, h("peculiar-typography", { type: "h7", align: "left" }, "Name")), h("th", { class: "peculiar_stroke_grey_3 col_public_key" }, h("peculiar-typography", { type: "h7", align: "left" }, "Public Key")), h("th", { class: "peculiar_stroke_grey_3 col_fingerprint" }, h("peculiar-typography", { type: "h7", align: "left" }, "Fingerprint (SHA-1)")), h("th", { class: "peculiar_stroke_grey_3 col_actions" }, h("peculiar-typography", { type: "h7", align: "center" }, "Actions")), this.isHasTests && (h("th", { class: "peculiar_stroke_grey_3 col_tests" }, h("peculiar-typography", { type: "h7", align: "center" }, "Test URLs"))))), h("tbody", null, this.renderBody())), this.renderCertificateDetailsModal(), this.isDecodeInProcess && this.renderLoadingState()));
    }
    static get watchers() { return {
        "certificates": ["watchCertificates"]
    }; }
};
CertificatesViewer.style = certificatesViewerCss;

export { CertificatesViewer as peculiar_certificates_viewer };
