import { r as registerInstance, h, H as Host } from './core-b3a1a540.js';
import { C as Certificate } from './index-9e6e0ee1.js';
import './date_formatter-c4acc49f.js';

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
        return (h("tr", { class: "expanded_summary stroke_border" }, h("td", { colSpan: colSpan, class: "stroke_border" }, h("pv-certificate-summary", { certificate: certificate, showIssuer: !certificate.isRoot }))));
    }
    renderCertificateTests(tests) {
        if (!tests) {
            return null;
        }
        const elems = [];
        if (tests.valid) {
            elems.push((h("pv-button", { class: "button_table_action", href: tests.valid, target: "_blank" }, "Valid")));
        }
        if (tests.revoked) {
            elems.push((h("pv-button", { class: "button_table_action", href: tests.revoked, target: "_blank" }, "Revoked")));
        }
        if (tests.expired) {
            elems.push((h("pv-button", { class: "button_table_action", href: tests.expired, target: "_blank" }, "Expired")));
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
                    }, onClick: this.onClickRow.bind(this, certificate.serialNumber), key: certificate.serialNumber }, !this.isHasRoots && (h("td", { class: "b3 stroke_border" }, h("span", { class: "mobile_title text_grey align_left b3" }, "Issuer:"), h("span", { class: "content" }, h("pv-highlight-words", { search: searchHighlight }, issuerValue)))), h("td", { class: "b3 stroke_border" }, h("span", { class: "mobile_title text_grey align_left b3" }, "Name:"), h("span", { class: "content" }, h("pv-highlight-words", { search: searchHighlight }, certificate.commonName))), h("td", { class: "b3 stroke_border" }, h("span", { class: "mobile_title text_grey align_left b3" }, "Public Key:"), h("span", { class: "content" }, h("pv-highlight-words", { search: searchHighlight }, publicKeyValue))), h("td", { class: "b3 stroke_border" }, h("span", { class: "mobile_title text_grey align_left b3" }, "Fingerprint (SHA-1):"), h("span", { class: "content monospace" }, h("pv-highlight-words", { search: searchHighlight }, certificate.fingerprints['SHA-1']))), h("td", { class: "align_center stroke_border" }, h("span", { class: "mobile_title text_grey align_left b3" }, "Actions:"), h("span", { class: "content" }, h("pv-button", { onClick: this.onClickDetails.bind(this, certificate.base64), class: "button_table_action" }, "Details"), h("pv-button-split", { onClick: this.onClickDownload.bind(this, certificate, 'PEM'), actions: [{
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
        return (h("div", { class: "modal_wrapper" }, h("div", { class: "modal_content fill_white" }, h("div", { class: "modal_title stroke_border" }, h("h4", { class: "h4 text_black" }, "Certificate details"), h("button", { class: "modal_close", onClick: this.onClickModalClose }, h("svg", { width: "30", height: "30", viewBox: "0 0 30 30", xmlns: "http://www.w3.org/2000/svg", class: "svg_fill_black" }, h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M15.7204 14.375L21.0654 19.7185C21.3115 19.9658 21.3115 20.3693 21.0654 20.6154L20.615 21.0645C20.3689 21.3118 19.9667 21.3118 19.7181 21.0645L14.3744 15.721L9.03194 21.0645C8.78327 21.3118 8.3811 21.3118 8.13371 21.0645L7.68459 20.6154C7.43847 20.3693 7.43847 19.9658 7.68459 19.7185L13.0296 14.375L7.68459 9.03155C7.43847 8.78417 7.43847 8.38074 7.68459 8.13463L8.13371 7.68554C8.3811 7.43815 8.78327 7.43815 9.03194 7.68554L14.3744 13.029L19.7181 7.68554C19.9667 7.43815 20.3689 7.43815 20.615 7.68554L21.0654 8.13463C21.3115 8.38074 21.3115 8.78417 21.0654 9.03155L15.7204 14.375Z" })))), h("pv-certificate-viewer", { certificate: this.certificateSelectedForDetails }))));
    }
    renderSearch() {
        if (!this.filterWithSearch && !this.highlightWithSearch) {
            return null;
        }
        return (h("div", { class: "search_section stroke_border" }, h("input", { onInput: this.onSearchChange, type: "search", value: "", class: "input_search fill_white stroke_border text_black", disabled: !this.certificatesDecoded.length, placeholder: "Search" })));
    }
    renderEmptyState() {
        return (h("tr", { class: "stroke_border" }, h("td", { class: "b1 text_black stroke_border status_wrapper", colSpan: 5 }, "There is no certificates specified.")));
    }
    renderEmptySearchState() {
        return (h("tr", { class: "stroke_border" }, h("td", { class: "b1 text_black stroke_border status_wrapper", colSpan: 5 }, "No results found for \"", this.search, "\"")));
    }
    renderLoadingState() {
        return (h("div", { class: "loading_container" }, h("pv-circular-progress", null)));
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
    static get style() { return "* {\n  margin: 0;\n  padding: 0;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n  -moz-text-size-adjust: none;\n  -ms-text-size-adjust: none;\n  text-size-adjust: none;\n  -webkit-text-size-adjust: none;\n  -webkit-tap-highlight-color: transparent;\n  word-break: break-word;\n}\n\n*:focus:not(:active):not(:hover) {\n  outline-width: 2px;\n  outline-style: solid;\n  outline-offset: -1px;\n}\n\ninput:focus, textarea:focus, *:active, *:hover {\n  outline: none !important;\n}\n\na {\n  text-decoration: none;\n}\n\ntextarea {\n  resize: none;\n}\n\ninput, textarea {\n  -webkit-appearance: none !important;\n  -moz-appearance: none;\n  -ms-appearance: none;\n  appearance: none !important;\n  font-family: inherit;\n}\n\ntable {\n  cellspacing: 0 !important;\n  border-spacing: 0 !important;\n}\n\n\n/* Text type */\n.b1 {\n  font-family: inherit;\n  font-size: 15px;\n  line-height: 1.46;\n  letter-spacing: 0.3px;\n}\n\n.b3 {\n  font-family: inherit;\n  font-size: 13px;\n  line-height: 1.53;\n  letter-spacing: 0.5px;\n  font-weight: 400;\n}\n\n.h4 {\n  font-family: inherit;\n  font-style: normal;\n  font-weight: bold;\n  font-size: 18px;\n  line-height: 25px;\n}\n\n.h6 {\n  font-family: inherit;\n  font-weight: 600;\n  font-size: 15px;\n  line-height: 20px;\n  letter-spacing: 0.3px;\n}\n\n.h7 {\n  font-family: inherit;\n  font-weight: 600;\n  font-size: 14px;\n  line-height: 1.35;\n}\n\n.monospace {\n  font-family: monospace;\n}\n\n/* Text color */\n.text_black {\n  color: rgb(var(--pv-color-black-rgb));\n}\n\n.text_white {\n  color: rgb(var(--pv-color-white-rgb));\n}\n\n.text_grey {\n  color: rgb(var(--pv-color-grey-rgb));\n}\n\n.text_primary {\n  color: rgb(var(--pv-color-primary-rgb));\n}\n\n/* Text aligance */\n.align_center {\n  text-align: center;\n}\n\n.align_left {\n  text-align: left;\n}\n\n.align_right {\n  text-align: right;\n}\n\n/* Background color */\n.fill_grey {\n  background-color: rgb(var(--pv-color-grey-rgb));\n}\n\n.fill_white {\n  background-color: rgb(var(--pv-color-white-rgb));\n}\n\n.fill_primary {\n  background-color: rgb(var(--pv-color-primary-rgb));\n}\n\n/* SVG fill color */\n.svg_fill_black {\n  fill: rgb(var(--pv-color-black-rgb));\n}\n\n.svg_fill_white {\n  fill: rgb(var(--pv-color-white-rgb));\n}\n\n.svg_fill_primary {\n  fill: rgb(var(--pv-color-primary-rgb));\n}\n\n/* Border color */\n.stroke_border {\n  border-color: rgb(var(--pv-color-border-rgb));\n}\n\n\n:host {\n  display: block;\n  width: 100%;\n  word-wrap: break-word;\n  min-width: 300px;\n  overflow: auto;\n  position: relative;\n  background: rgb(var(--pv-color-white-rgb));\n}\n\ntable {\n  width: 100%;\n  table-layout: fixed;\n  border-collapse: collapse;\n}\n\ntable thead {\n  background-color: rgba(var(--pv-color-primary-rgb), 0.07);\n}\n\ntable tr td {\n  vertical-align: middle;\n}\n\ntable tbody tr:not(.expanded_summary) {\n  cursor: pointer;\n}\n\ntable th {\n  padding: 15px 10px;\n  text-align: left;\n  border-width: 1px;\n  border-style: solid;\n}\n\ntable td {\n  padding: 8px 10px;\n  text-align: left;\n  border-width: 1px;\n  border-style: solid;\n}\n\n/* For col 4 */\ntable .col_issuer,\ntable .col_name,\ntable .col_public_key {\n  width: 16%;\n}\n\ntable .col_actions,\ntable .col_tests {\n  width: 18%;\n}\n\n/* For col extra */\ntable.m_extra .col_issuer,\ntable.m_extra .col_name,\ntable.m_extra .col_public_key {\n  width: 12%;\n}\n\ntable.m_extra .col_actions,\ntable.m_extra .col_tests {\n  width: 17%;\n}\n\n/* Expande rows styles */\n/* First row */\ntable tr.expanded td:not(:last-child) {\n  border-right-color: transparent;\n}\n\ntable tr.expanded td {\n  border-bottom-color: transparent;\n}\n\n.expanded {\n  border-bottom-color: transparent;\n  background-color: rgba(var(--pv-color-primary-rgb), 0.04);\n}\n\ntable tr.expanded_summary {\n  background-color: rgba(var(--pv-color-primary-rgb), 0.04);\n}\n\n/* Second row */\ntable tr.expanded_summary td {\n  vertical-align: top;\n  padding: 10px 20px 26px;\n}\n\n\@-webkit-keyframes fadeIn {\n  0% {\n    opacity: 0.001;\n  }\n  100% {\n    opacity: 1;\n  }\n}\n\n\@keyframes fadeIn {\n  0% {\n    opacity: 0.001;\n  }\n  100% {\n    opacity: 1;\n  }\n}\n\n.modal_wrapper {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  z-index: 1;\n  overflow: auto;\n  padding: 10px;\n  text-align: center;\n  background: rgba(var(--pv-color-black-rgb), 0.9);\n  -webkit-animation: fadeIn 300ms;\n  animation: fadeIn 300ms;\n}\n\n.modal_wrapper:before {\n  display: inline-block;\n  vertical-align: middle;\n  width: 0;\n  height: 100%;\n  content: \'\';\n}\n\n.modal_content {\n  position: relative;\n  display: inline-block;\n  vertical-align: middle;\n  width: 100%;\n  max-width: 900px;\n  text-align: left;\n  border-radius: 3px;\n  overflow: hidden;\n}\n\n.modal_title {\n  background-color: rgba(var(--pv-color-primary-rgb), 0.07);\n  border-bottom-width: 1px;\n  border-bottom-style: solid;\n  padding: 17px 60px 17px 20px;\n  position: relative;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n\n.modal_close {\n  cursor: pointer;\n  border: none;\n  background-color: transparent;\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  right: 0;\n  padding: 0 12px;\n  -webkit-transition: opacity 100ms;\n  transition: opacity 100ms;\n}\n\n.modal_close:hover {\n  opacity: 0.6;\n}\n\n.button_table_action {\n  margin: 2px;\n}\n\n/* Adaptivity styles */\n.mobile_title {\n  display: none;\n}\n\n/* Empty state */\n.status_wrapper {\n  height: 85px;\n  text-align: center;\n  pointer-events: none;\n}\n\n/* Search */\n.search_section {\n  background-color: rgba(var(--pv-color-primary-rgb), 0.07);\n  height: 50px;\n  padding: 10px;\n  border-width: 1px 1px 0 1px;\n  border-style: solid;\n}\n\n.input_search {\n  height: 100%;\n  width: 100%;\n  border-radius: 3px;\n  border-width: 1px;\n  border-style: solid;\n  padding: 0 14px;\n  font-size: 12px;\n}\n\n.input_search::-webkit-input-placeholder {\n  color: rgb(var(--pv-color-border-rgb));\n}\n\n.input_search::-moz-placeholder {\n  color: rgb(var(--pv-color-border-rgb));\n}\n\n.input_search:-ms-input-placeholder {\n  color: rgb(var(--pv-color-border-rgb));\n}\n\n.input_search::-ms-input-placeholder {\n  color: rgb(var(--pv-color-border-rgb));\n}\n\n.input_search::placeholder {\n  color: rgb(var(--pv-color-border-rgb));\n}\n\n.loading_container {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background: rgba(var(--pv-color-black-rgb), 0.3);\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-align: center;\n  align-items: center;\n}\n\n\@media (hover: hover) {\n  table tbody tr:not(.expanded_summary):hover {\n    background-color: rgba(var(--pv-color-primary-rgb), 0.04);\n  }\n}\n\n\@media (max-width: 900px) {\n  table, tbody, tr, td {\n    display: block;\n  }\n\n  thead {\n    display: none;\n  }\n\n  tr {\n    padding: 0 15px;\n    border-width: 1px;\n    border-style: solid;\n  }\n\n  tr:not(:first-child) {\n    margin-top: -1px;\n  }\n\n  tr:not(.expanded_summary) td:first-child {\n    border: none! important;\n  }\n\n  table td {\n    padding-left: 0;\n    padding-right: 0;\n    border-width: 1px 0 0 0 ! important;\n    border-color: rgba(var(--pv-color-border-rgb), 0.5) ! important;\n  }\n\n  table tr.expanded_summary td {\n    padding: 15px 0\n  }\n\n  .mobile_title {\n    display: inline-block;\n    width: 90px;\n    vertical-align: middle;\n  }\n\n  .modal_title {\n    padding: 17px 60px 17px 15px;\n  }\n\n  .content {\n    display: inline-block;\n    width: calc(100% - 90px);\n    vertical-align: middle;\n    text-align: left;\n  }\n\n  .expanded_summary {\n    border-top-color: transparent;\n    padding-bottom: 10px;\n  }\n\n  .expanded_summary td:before {\n    content: none;\n  }\n\n  /* Empty state */\n  .status_wrapper {\n    height: 266px;\n    display: table-cell;\n  }\n\n  /* Search */\n  .search_section {\n    height: 60px;\n    padding: 15px;\n  }\n}"; }
};

export { CertificatesViewer as pv_certificates_viewer };
