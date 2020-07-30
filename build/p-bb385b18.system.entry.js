var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
System.register(['./p-50c6b099.system.js', './p-92deeb16.system.js'], function (exports) {
    'use strict';
    var registerInstance, h, Host, X509Certificate, Download, OIDs;
    return {
        setters: [function (module) {
                registerInstance = module.r;
                h = module.h;
                Host = module.H;
            }, function (module) {
                X509Certificate = module.X;
                Download = module.r;
                OIDs = module.O;
            }],
        execute: function () {
            var certificatesViewerCss = ".sc-peculiar-certificates-viewer-h{display:block;width:100%;word-wrap:break-word;min-width:280px;overflow:auto;position:relative;background:rgb(var(--peculiar-color-light-rgb))}table.sc-peculiar-certificates-viewer{width:100%;table-layout:fixed;border-collapse:collapse}table.sc-peculiar-certificates-viewer thead.sc-peculiar-certificates-viewer{background-color:rgba(var(--peculiar-color-primary-rgb), 0.07)}table.sc-peculiar-certificates-viewer tr.sc-peculiar-certificates-viewer td.sc-peculiar-certificates-viewer{vertical-align:middle}table.sc-peculiar-certificates-viewer tbody.sc-peculiar-certificates-viewer tr.sc-peculiar-certificates-viewer:not(.expanded_summary){cursor:pointer}table.sc-peculiar-certificates-viewer th.sc-peculiar-certificates-viewer{padding:15px 10px;border-width:1px;border-style:solid}table.sc-peculiar-certificates-viewer td.sc-peculiar-certificates-viewer{padding:8px 10px;border-width:1px;border-style:solid}table.sc-peculiar-certificates-viewer .col_issuer.sc-peculiar-certificates-viewer,table.sc-peculiar-certificates-viewer .col_name.sc-peculiar-certificates-viewer,table.sc-peculiar-certificates-viewer .col_public_key.sc-peculiar-certificates-viewer{width:16%}table.sc-peculiar-certificates-viewer .col_actions.sc-peculiar-certificates-viewer,table.sc-peculiar-certificates-viewer .col_tests.sc-peculiar-certificates-viewer{width:18%}table.m_extra.sc-peculiar-certificates-viewer .col_issuer.sc-peculiar-certificates-viewer,table.m_extra.sc-peculiar-certificates-viewer .col_name.sc-peculiar-certificates-viewer,table.m_extra.sc-peculiar-certificates-viewer .col_public_key.sc-peculiar-certificates-viewer{width:12%}table.m_extra.sc-peculiar-certificates-viewer .col_actions.sc-peculiar-certificates-viewer,table.m_extra.sc-peculiar-certificates-viewer .col_tests.sc-peculiar-certificates-viewer{width:17%}table.sc-peculiar-certificates-viewer tr.expanded.sc-peculiar-certificates-viewer td.sc-peculiar-certificates-viewer:not(:last-child){border-right-color:transparent}table.sc-peculiar-certificates-viewer tr.expanded.sc-peculiar-certificates-viewer td.sc-peculiar-certificates-viewer{border-bottom-color:transparent}.expanded.sc-peculiar-certificates-viewer{border-bottom-color:transparent;background-color:rgba(var(--peculiar-color-primary-rgb), 0.04)}table.sc-peculiar-certificates-viewer tr.expanded_summary.sc-peculiar-certificates-viewer{background-color:rgba(var(--peculiar-color-primary-rgb), 0.04)}table.sc-peculiar-certificates-viewer tr.expanded_summary.sc-peculiar-certificates-viewer td.sc-peculiar-certificates-viewer{vertical-align:top;padding:10px 20px 26px}@-webkit-keyframes fadeIn{0%{opacity:0.001}100%{opacity:1}}@keyframes fadeIn{0%{opacity:0.001}100%{opacity:1}}.modal_wrapper.sc-peculiar-certificates-viewer{position:fixed;top:0;left:0;width:100%;height:100%;z-index:1;overflow:auto;padding:10px;text-align:center;background:rgba(var(--peculiar-color-dark-rgb), 0.9);-webkit-animation:fadeIn 300ms;animation:fadeIn 300ms}.modal_wrapper.sc-peculiar-certificates-viewer:before{display:inline-block;vertical-align:middle;width:0;height:100%;content:\"\"}.modal_content.sc-peculiar-certificates-viewer{position:relative;display:inline-block;vertical-align:middle;width:100%;max-width:900px;text-align:left;border-radius:3px;overflow:hidden}.modal_title.sc-peculiar-certificates-viewer{background-color:rgba(var(--peculiar-color-primary-rgb), 0.07);border-bottom-width:1px;border-bottom-style:solid;padding:17px 60px 17px 20px;position:relative;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.modal_close.sc-peculiar-certificates-viewer{cursor:pointer;border:none;background-color:transparent;position:absolute;top:0;bottom:0;right:0;padding:0 12px;-webkit-transition:opacity 100ms;transition:opacity 100ms;outline:none}.modal_close.sc-peculiar-certificates-viewer:hover{opacity:0.6}.modal_close.sc-peculiar-certificates-viewer svg.sc-peculiar-certificates-viewer{fill:rgb(var(--peculiar-color-dark-rgb))}.button_table_action.sc-peculiar-certificates-viewer{margin:2px}.mobile_title.sc-peculiar-certificates-viewer{display:none}.status_wrapper.sc-peculiar-certificates-viewer{height:85px;text-align:center;pointer-events:none}.search_section.sc-peculiar-certificates-viewer{background-color:rgba(var(--peculiar-color-primary-rgb), 0.07);height:50px;padding:10px;border-width:1px 1px 0 1px;border-style:solid}.input_search.sc-peculiar-certificates-viewer{height:100%;width:100%;border-radius:3px;border-width:1px;border-style:solid;padding:0 14px;font-size:12px;outline:none}.input_search.sc-peculiar-certificates-viewer::-moz-placeholder{color:rgb(var(--peculiar-color-grey_3-rgb))}.input_search.sc-peculiar-certificates-viewer:-ms-input-placeholder{color:rgb(var(--peculiar-color-grey_3-rgb))}.input_search.sc-peculiar-certificates-viewer::-ms-input-placeholder{color:rgb(var(--peculiar-color-grey_3-rgb))}.input_search.sc-peculiar-certificates-viewer::-webkit-input-placeholder{color:rgb(var(--peculiar-color-grey_3-rgb))}.input_search.sc-peculiar-certificates-viewer::placeholder{color:rgb(var(--peculiar-color-grey_3-rgb))}.loading_container.sc-peculiar-certificates-viewer{position:absolute;top:0;left:0;width:100%;height:100%;background:rgba(var(--peculiar-color-dark-rgb), 0.3);display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center}.align_center.sc-peculiar-certificates-viewer{text-align:center}@media (hover: hover){table.sc-peculiar-certificates-viewer tbody.sc-peculiar-certificates-viewer tr.sc-peculiar-certificates-viewer:not(.expanded_summary):hover{background-color:rgba(var(--peculiar-color-primary-rgb), 0.04)}}@media (max-width: 900px){table.sc-peculiar-certificates-viewer,tbody.sc-peculiar-certificates-viewer,tr.sc-peculiar-certificates-viewer,td.sc-peculiar-certificates-viewer{display:block}thead.sc-peculiar-certificates-viewer{display:none}tr.sc-peculiar-certificates-viewer{padding:0 15px;border-width:1px;border-style:solid}tr.sc-peculiar-certificates-viewer:not(:first-child){margin-top:-1px}tr.sc-peculiar-certificates-viewer:not(.expanded_summary) td.sc-peculiar-certificates-viewer:first-child{border:none !important}table.sc-peculiar-certificates-viewer td.sc-peculiar-certificates-viewer{padding-left:0;padding-right:0;border-width:1px 0 0 0 !important;border-color:rgba(var(--peculiar-color-grey_3-rgb), 0.5) !important}table.sc-peculiar-certificates-viewer tr.expanded_summary.sc-peculiar-certificates-viewer td.sc-peculiar-certificates-viewer{padding:15px 0}.mobile_title.sc-peculiar-certificates-viewer{display:inline-block;width:90px;vertical-align:middle}.modal_title.sc-peculiar-certificates-viewer{padding:17px 60px 17px 15px}.content.sc-peculiar-certificates-viewer{display:inline-block;width:calc(100% - 90px);vertical-align:middle;text-align:left}.expanded_summary.sc-peculiar-certificates-viewer{border-top-color:transparent;padding-bottom:10px}.expanded_summary.sc-peculiar-certificates-viewer td.sc-peculiar-certificates-viewer:before{content:none}.status_wrapper.sc-peculiar-certificates-viewer{height:266px;display:table-cell}.search_section.sc-peculiar-certificates-viewer{height:60px;padding:15px}.align_center.sc-peculiar-certificates-viewer{text-align:inherit}}";
            var CertificatesViewer = exports('peculiar_certificates_viewer', /** @class */ (function () {
                function class_1(hostRef) {
                    var _this = this;
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
                    this.onClickDetails = function (certificate, e) {
                        e.stopPropagation();
                        _this.certificateSelectedForDetails = certificate;
                    };
                    this.onClickModalClose = function () {
                        _this.certificateSelectedForDetails = undefined;
                    };
                    this.onSearchChange = function (e) {
                        _this.search = e.target.value
                            .trim();
                    };
                }
                class_1.prototype.componentWillLoad = function () {
                    this.certificatesDecodeAndSet();
                };
                class_1.prototype.watchCertificates = function () {
                    this.certificatesDecodeAndSet();
                };
                class_1.prototype.certificatesDecodeAndSet = function () {
                    return __awaiter(this, void 0, void 0, function () {
                        var timeStart, data, _i, _a, certificate, decoded, error_1, timeEnd, timeDuration, minimumTimeDuration;
                        var _this = this;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    timeStart = performance.now();
                                    this.isHasTests = false;
                                    this.isHasRoots = false;
                                    if (!Array.isArray(this.certificates)) {
                                        return [2 /*return*/, []];
                                    }
                                    data = [];
                                    _i = 0, _a = this.certificates;
                                    _b.label = 1;
                                case 1:
                                    if (!(_i < _a.length)) return [3 /*break*/, 6];
                                    certificate = _a[_i];
                                    _b.label = 2;
                                case 2:
                                    _b.trys.push([2, 4, , 5]);
                                    decoded = new X509Certificate(certificate.value);
                                    return [4 /*yield*/, decoded.getThumbprint('SHA-1')];
                                case 3:
                                    _b.sent();
                                    data.push({
                                        body: decoded,
                                        tests: certificate.tests,
                                        name: certificate.name,
                                    });
                                    if (!this.isHasRoots && decoded.isRoot) {
                                        this.isHasRoots = true;
                                    }
                                    if (!this.isHasTests) {
                                        if (certificate.tests &&
                                            (certificate.tests.expired || certificate.tests.revoked || certificate.tests.valid)) {
                                            this.isHasTests = true;
                                        }
                                    }
                                    return [3 /*break*/, 5];
                                case 4:
                                    error_1 = _b.sent();
                                    console.error('Error certificate parse:', error_1);
                                    return [3 /*break*/, 5];
                                case 5:
                                    _i++;
                                    return [3 /*break*/, 1];
                                case 6:
                                    timeEnd = performance.now();
                                    timeDuration = timeEnd - timeStart;
                                    minimumTimeDuration = 800;
                                    /**
                                     * Check decode time duration and change `isDecodeInProcess` to `false`
                                     * only after `minimumTimeDuration` time for prevent quickly hide loading state
                                     */
                                    if (timeDuration < minimumTimeDuration) {
                                        setTimeout(function () { return _this.isDecodeInProcess = false; }, minimumTimeDuration - timeDuration);
                                    }
                                    else {
                                        this.isDecodeInProcess = false;
                                    }
                                    this.certificatesDecoded = data;
                                    return [2 /*return*/];
                            }
                        });
                    });
                };
                class_1.prototype.onClickDownloadAsPem = function (certificate, e) {
                    e.stopPropagation();
                    Download.certificate.asPEM(certificate.body.export('pem'), certificate.name || certificate.body.commonName);
                };
                class_1.prototype.onClickDownloadAsDer = function (certificate, e) {
                    e.stopPropagation();
                    Download.certificate.asPEM(certificate.body.export('hex'), certificate.name || certificate.body.commonName);
                };
                class_1.prototype.onClickRow = function (serialNumber) {
                    var isExpandedRowClicked = this.expandedRow === serialNumber;
                    this.expandedRow = isExpandedRowClicked
                        ? undefined
                        : serialNumber;
                };
                class_1.prototype.renderExpandedRow = function (certificate) {
                    var colSpan = 4;
                    if (this.isHasTests) {
                        colSpan += 1;
                    }
                    if (!this.isHasRoots) {
                        colSpan += 1;
                    }
                    return (h("tr", { class: "expanded_summary peculiar_stroke_grey_3" }, h("td", { colSpan: colSpan, class: "peculiar_stroke_grey_3" }, h("peculiar-certificate-summary", { certificate: certificate, showIssuer: !certificate.isRoot }))));
                };
                class_1.prototype.renderCertificateTests = function (tests) {
                    if (!tests) {
                        return null;
                    }
                    var elems = [];
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
                };
                class_1.prototype.renderContentState = function () {
                    var _this = this;
                    var searchHighlight = this.highlightWithSearch
                        ? this.search
                        : '';
                    var content = [];
                    this.certificatesDecoded.forEach(function (certificate) {
                        var isExpandedRow = certificate.body.serialNumber === _this.expandedRow;
                        var publicKeyValue = OIDs[certificate.body.signature.algorithm]
                            || certificate.body.signature.algorithm;
                        if (_this.filterWithSearch && _this.search) {
                            var certificateStringForSearch = [
                                publicKeyValue,
                                certificate.body.issuerCommonName,
                                certificate.name,
                                certificate.body.commonName,
                                certificate.body.thumbprints['SHA-1'],
                            ]
                                .join(' ')
                                .toLowerCase();
                            if (certificateStringForSearch.indexOf(_this.search.toLowerCase()) === -1) {
                                return;
                            }
                        }
                        content.push([
                            h("tr", { class: {
                                    peculiar_stroke_grey_3: true,
                                    expanded: isExpandedRow,
                                }, onClick: _this.onClickRow.bind(_this, certificate.body.serialNumber), key: certificate.body.serialNumber }, !_this.isHasRoots && (h("td", { class: "peculiar_stroke_grey_3" }, h("peculiar-typography", { class: "mobile_title", color: "grey_5" }, "Issuer:"), h("peculiar-typography", { class: "content" }, h("peculiar-highlight-words", { search: searchHighlight }, certificate.body.issuerCommonName)))), h("td", { class: "peculiar_stroke_grey_3" }, h("peculiar-typography", { class: "mobile_title", color: "grey_5" }, "Name:"), h("peculiar-typography", { class: "content" }, h("peculiar-highlight-words", { search: searchHighlight }, certificate.name || certificate.body.commonName))), h("td", { class: "peculiar_stroke_grey_3" }, h("peculiar-typography", { class: "mobile_title", color: "grey_5" }, "Public Key:"), h("peculiar-typography", { class: "content" }, h("peculiar-highlight-words", { search: searchHighlight }, publicKeyValue))), h("td", { class: "peculiar_stroke_grey_3" }, h("peculiar-typography", { class: "mobile_title", color: "grey_5" }, "Fingerprint (SHA-1):"), h("peculiar-typography", { class: "content", monospace: true }, h("peculiar-highlight-words", { search: searchHighlight }, certificate.body.thumbprints['SHA-1']))), h("td", { class: "align_center peculiar_stroke_grey_3" }, h("peculiar-typography", { class: "mobile_title", color: "grey_5" }, "Actions:"), h("span", { class: "content" }, h("peculiar-button", { onClick: _this.onClickDetails.bind(_this, certificate.body), class: "button_table_action" }, "Details"), h("peculiar-button-split", { onClick: _this.onClickDownloadAsPem.bind(_this, certificate), actions: [{
                                        text: 'Download DER',
                                        onClick: _this.onClickDownloadAsDer.bind(_this, certificate),
                                    }], class: "button_table_action" }, "Download PEM"))), _this.isHasTests && (h("td", { class: "align_center peculiar_stroke_grey_3" }, h("peculiar-typography", { class: "mobile_title", color: "grey_5" }, "Test URLs:"), h("span", { class: "content" }, _this.renderCertificateTests(certificate.tests))))),
                            isExpandedRow && _this.renderExpandedRow(certificate.body),
                        ]);
                    });
                    return content;
                };
                class_1.prototype.renderCertificateDetailsModal = function () {
                    if (!this.certificateSelectedForDetails) {
                        return null;
                    }
                    return (h("div", { class: "modal_wrapper" }, h("div", { class: "modal_content peculiar_fill_light" }, h("div", { class: "modal_title peculiar_stroke_grey_3" }, h("peculiar-typography", { type: "h4" }, "Certificate details"), h("button", { class: "modal_close", onClick: this.onClickModalClose }, h("svg", { width: "30", height: "30", viewBox: "0 0 30 30", xmlns: "http://www.w3.org/2000/svg" }, h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M15.7204 14.375L21.0654 19.7185C21.3115 19.9658 21.3115 20.3693 21.0654 20.6154L20.615 21.0645C20.3689 21.3118 19.9667 21.3118 19.7181 21.0645L14.3744 15.721L9.03194 21.0645C8.78327 21.3118 8.3811 21.3118 8.13371 21.0645L7.68459 20.6154C7.43847 20.3693 7.43847 19.9658 7.68459 19.7185L13.0296 14.375L7.68459 9.03155C7.43847 8.78417 7.43847 8.38074 7.68459 8.13463L8.13371 7.68554C8.3811 7.43815 8.78327 7.43815 9.03194 7.68554L14.3744 13.029L19.7181 7.68554C19.9667 7.43815 20.3689 7.43815 20.615 7.68554L21.0654 8.13463C21.3115 8.38074 21.3115 8.78417 21.0654 9.03155L15.7204 14.375Z" })))), h("peculiar-certificate-viewer", { certificate: this.certificateSelectedForDetails }))));
                };
                class_1.prototype.renderSearch = function () {
                    if (!this.filterWithSearch && !this.highlightWithSearch) {
                        return null;
                    }
                    return (h("div", { class: "search_section peculiar_stroke_grey_3" }, h("input", { onInput: this.onSearchChange, type: "search", value: "", class: "input_search peculiar_fill_light peculiar_stroke_grey_3 peculiar_color_dark", disabled: !this.certificatesDecoded.length, placeholder: "Search" })));
                };
                class_1.prototype.renderEmptyState = function () {
                    return (h("tr", { class: "peculiar_stroke_grey_3" }, h("td", { class: "peculiar_stroke_grey_3 status_wrapper", colSpan: 5 }, h("peculiar-typography", { type: "b1", align: "center" }, "There are no certificates available."))));
                };
                class_1.prototype.renderEmptySearchState = function () {
                    return (h("tr", { class: "peculiar_stroke_grey_3" }, h("td", { class: "peculiar_stroke_grey_3 status_wrapper", colSpan: 5 }, h("peculiar-typography", { type: "b1", align: "center" }, "No results found for \"", this.search, "\""))));
                };
                class_1.prototype.renderLoadingState = function () {
                    return (h("div", { class: "loading_container" }, h("peculiar-circular-progress", null)));
                };
                class_1.prototype.renderBody = function () {
                    if (this.isDecodeInProcess) {
                        return null;
                    }
                    if (!this.certificatesDecoded.length) {
                        return this.renderEmptyState();
                    }
                    var contentState = this.renderContentState();
                    if (this.search && !contentState.length) {
                        return this.renderEmptySearchState();
                    }
                    return contentState;
                };
                class_1.prototype.render = function () {
                    return (h(Host, null, this.renderSearch(), h("table", { class: {
                            peculiar_color_dark: true,
                            m_extra: this.isHasTests || !this.isHasRoots,
                        } }, h("thead", null, h("tr", { class: "peculiar_stroke_grey_3" }, !this.isHasRoots && (h("th", { class: "peculiar_stroke_grey_3 col_issuer" }, h("peculiar-typography", { type: "h7", align: "left" }, "Issuer"))), h("th", { class: "peculiar_stroke_grey_3 col_name" }, h("peculiar-typography", { type: "h7", align: "left" }, "Name")), h("th", { class: "peculiar_stroke_grey_3 col_public_key" }, h("peculiar-typography", { type: "h7", align: "left" }, "Public Key")), h("th", { class: "peculiar_stroke_grey_3 col_fingerprint" }, h("peculiar-typography", { type: "h7", align: "left" }, "Fingerprint (SHA-1)")), h("th", { class: "peculiar_stroke_grey_3 col_actions" }, h("peculiar-typography", { type: "h7", align: "center" }, "Actions")), this.isHasTests && (h("th", { class: "peculiar_stroke_grey_3 col_tests" }, h("peculiar-typography", { type: "h7", align: "center" }, "Test URLs"))))), h("tbody", null, this.renderBody())), this.renderCertificateDetailsModal(), this.isDecodeInProcess && this.renderLoadingState()));
                };
                Object.defineProperty(class_1, "watchers", {
                    get: function () {
                        return {
                            "certificates": ["watchCertificates"]
                        };
                    },
                    enumerable: false,
                    configurable: true
                });
                return class_1;
            }()));
            CertificatesViewer.style = certificatesViewerCss;
        }
    };
});
