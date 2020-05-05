import { r as registerInstance, h, H as Host } from './index-f2b7af1d.js';
import { s as short } from './dateFormatter-5adc0276.js';

const certificateSummaryCss = "*{margin:0;padding:0;box-sizing:border-box;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;text-size-adjust:none;-webkit-text-size-adjust:none;-webkit-tap-highlight-color:transparent;word-break:break-word}*:focus:not(:active):not(:hover){outline-width:2px;outline-style:solid;outline-offset:-1px}input:focus,textarea:focus,*:active,*:hover{outline:none !important}a{text-decoration:none}textarea{resize:none}input,textarea{-webkit-appearance:none !important;-moz-appearance:none;-ms-appearance:none;appearance:none !important;font-family:inherit}table{cellspacing:0 !important;border-spacing:0 !important}.b1{font-family:inherit;font-size:15px;line-height:1.46;letter-spacing:0.3px}.b3{font-family:inherit;font-size:13px;line-height:1.53;letter-spacing:0.5px;font-weight:400}.h4{font-family:inherit;font-style:normal;font-weight:bold;font-size:18px;line-height:25px}.h6{font-family:inherit;font-weight:600;font-size:15px;line-height:20px;letter-spacing:0.3px}.h7{font-family:inherit;font-weight:600;font-size:14px;line-height:1.35}.monospace{font-family:monospace}.text_black{color:rgb(var(--peculiar-color-black-rgb))}.text_white{color:rgb(var(--peculiar-color-white-rgb))}.text_grey{color:rgb(var(--peculiar-color-grey-rgb))}.text_primary{color:rgb(var(--peculiar-color-primary-rgb))}.align_center{text-align:center}.align_left{text-align:left}.align_right{text-align:right}.fill_grey{background-color:rgb(var(--peculiar-color-grey-rgb))}.fill_white{background-color:rgb(var(--peculiar-color-white-rgb))}.fill_primary{background-color:rgb(var(--peculiar-color-primary-rgb))}.svg_fill_black{fill:rgb(var(--peculiar-color-black-rgb))}.svg_fill_white{fill:rgb(var(--peculiar-color-white-rgb))}.svg_fill_primary{fill:rgb(var(--peculiar-color-primary-rgb))}.stroke_border{border-color:rgb(var(--peculiar-color-border-rgb))}:host{display:block;width:100%}.basic_wrapper{position:relative}.basic_wrapper::before,.basic_wrapper::after{content:'';display:block;position:absolute;width:1px;top:0;bottom:0;background-color:rgba(var(--peculiar-color-border-rgb), 0.5)}.basic_wrapper::before{left:calc(30% - 20px)}.basic_wrapper::after{left:calc(60% - 20px)}.is_only.basic_wrapper::before{content:none}.basic_col{vertical-align:top;display:inline-block;width:30%;padding-right:40px;position:relative}.is_only .basic_col{width:60%}.basic_meta{vertical-align:top;display:inline-block;width:40%}.dn_name{min-width:30px;vertical-align:top;padding-right:5px}.dn_value{vertical-align:top}.dn_row:not(:last-child){margin-bottom:10px}.meta_row:not(:last-child){margin-bottom:10px}.meta_name{display:inline-block;width:120px;padding-right:5px;vertical-align:top}.meta_value{display:inline-block;vertical-align:top;width:calc(100% - 120px)}.table_attributes{width:100%}@media (max-width: 767px){.basic_wrapper::before,.basic_wrapper::after{content:none}.basic_col{padding:20px 0;width:100% !important;border-bottom:1px solid rgba(var(--peculiar-color-border-rgb), 0.5)}.basic_col::after{top:auto;bottom:0;left:0;right:0;height:1px;width:100%}.basic_meta{width:100%;padding:20px 0;min-width:auto}.basic_wrapper::before,.basic_wrapper::after{content:none}.meta_row:not(:last-child){margin-bottom:0}.meta_name,.meta_value{width:100%;padding:5px 0}}";

const CertificateSummary = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.showIssuer = true;
    }
    renderDN(item) {
        return Object.keys(item).map((keyName) => {
            return (h("tr", { class: "dn_row" }, h("td", { class: "dn_name b3 text_black" }, keyName), h("td", { class: "dn_value b3 text_black" }, item[keyName].value)));
        });
    }
    renderMetaData(item) {
        return ([
            h("p", { class: "meta_row" }, h("span", { class: "meta_name text_grey b3" }, "Serial number:"), h("span", { class: "meta_value b3 text_black monospace" }, item.serialNumber)),
            h("p", { class: "meta_row" }, h("span", { class: "meta_name text_grey b3" }, "Version:"), h("span", { class: "meta_value b3 text_black" }, item.version)),
            h("p", { class: "meta_row" }, h("span", { class: "meta_name text_grey b3" }, "Validity:"), h("span", { class: "meta_value b3 text_black" }, item.validity)),
            h("p", { class: "meta_row" }, h("span", { class: "meta_name text_grey b3" }, "Issued:"), h("span", { class: "meta_value b3 text_black" }, short(item.notBefore))),
            h("p", { class: "meta_row" }, h("span", { class: "meta_name text_grey b3" }, "Expired:"), h("span", { class: "meta_value b3 text_black" }, short(item.notAfter))),
        ]);
    }
    render() {
        return (h(Host, null, h("div", { class: {
                basic_wrapper: true,
                is_only: !this.showIssuer,
            } }, h("div", { class: "basic_col" }, h("p", { class: "text_grey b3 dn_row" }, "Subject DN:"), h("table", { class: "table_attributes" }, h("tbody", null, this.renderDN(this.certificate.subject)))), this.showIssuer && (h("div", { class: "basic_col stroke_border" }, h("p", { class: "text_grey b3 dn_row" }, this.issuerDnLink ? (h("a", { href: this.issuerDnLink, target: "_blank", class: "text_primary" }, "Issuer DN")) : ('Issuer DN'), ":"), h("table", { class: "table_attributes" }, h("tbody", null, this.renderDN(this.certificate.issuer))))), h("div", { class: "basic_meta" }, this.renderMetaData(this.certificate)))));
    }
};
CertificateSummary.style = certificateSummaryCss;

export { CertificateSummary as peculiar_certificate_summary };
