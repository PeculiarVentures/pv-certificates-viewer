import { r as registerInstance, h, H as Host } from './index-d38ac7fc.js';
import { s as short } from './dateFormatter-5adc0276.js';

const certificateSummaryCss = ".sc-peculiar-certificate-summary-h{display:block;width:100%}th.sc-peculiar-certificate-summary,td.sc-peculiar-certificate-summary{border:none}td.sc-peculiar-certificate-summary{padding:0}.basic_wrapper.sc-peculiar-certificate-summary{position:relative}.basic_wrapper.sc-peculiar-certificate-summary::before,.basic_wrapper.sc-peculiar-certificate-summary::after{content:\"\";display:block;position:absolute;width:1px;top:0;bottom:0;background-color:rgba(var(--peculiar-color-grey_3-rgb), 0.5)}.basic_wrapper.sc-peculiar-certificate-summary::before{left:calc(30% - 20px)}.basic_wrapper.sc-peculiar-certificate-summary::after{left:calc(60% - 20px)}.is_only.basic_wrapper.sc-peculiar-certificate-summary::before{content:none}.basic_col.sc-peculiar-certificate-summary{vertical-align:top;display:inline-block;width:30%;padding-right:40px;position:relative}.is_only.sc-peculiar-certificate-summary .basic_col.sc-peculiar-certificate-summary{width:60%}.basic_meta.sc-peculiar-certificate-summary{vertical-align:top;display:inline-block;width:40%}.dn_name.sc-peculiar-certificate-summary{min-width:30px;vertical-align:top;padding-right:5px}.dn_value.sc-peculiar-certificate-summary{vertical-align:top}.dn_row.sc-peculiar-certificate-summary:not(:last-child){margin-bottom:10px}.meta_row.sc-peculiar-certificate-summary:not(:last-child){margin-bottom:10px}.meta_name.sc-peculiar-certificate-summary{display:inline-block;width:120px;padding-right:5px;vertical-align:top}.meta_value.sc-peculiar-certificate-summary{display:inline-block;vertical-align:top;width:calc(100% - 120px)}.table_attributes.sc-peculiar-certificate-summary{width:100%}@media (max-width: 767px){.basic_wrapper.sc-peculiar-certificate-summary::before,.basic_wrapper.sc-peculiar-certificate-summary::after{content:none}.basic_col.sc-peculiar-certificate-summary{padding:20px 0;width:100% !important;border-bottom:1px solid rgba(var(--peculiar-color-grey_3-rgb), 0.5)}.basic_col.sc-peculiar-certificate-summary::after{top:auto;bottom:0;left:0;right:0;height:1px;width:100%}.basic_meta.sc-peculiar-certificate-summary{width:100%;padding:20px 0;min-width:auto}.basic_wrapper.sc-peculiar-certificate-summary::before,.basic_wrapper.sc-peculiar-certificate-summary::after{content:none}.meta_row.sc-peculiar-certificate-summary:not(:last-child){margin-bottom:0}.meta_name.sc-peculiar-certificate-summary,.meta_value.sc-peculiar-certificate-summary{width:100%;padding:5px 0}}[data-view=mobile].sc-peculiar-certificate-summary-h .basic_wrapper.sc-peculiar-certificate-summary::before,[data-view=mobile].sc-peculiar-certificate-summary-h .basic_wrapper.sc-peculiar-certificate-summary::after{content:none}[data-view=mobile].sc-peculiar-certificate-summary-h .basic_col.sc-peculiar-certificate-summary{padding:20px 0;width:100% !important;border-bottom:1px solid rgba(var(--peculiar-color-grey_3-rgb), 0.5)}[data-view=mobile].sc-peculiar-certificate-summary-h .basic_col.sc-peculiar-certificate-summary::after{top:auto;bottom:0;left:0;right:0;height:1px;width:100%}[data-view=mobile].sc-peculiar-certificate-summary-h .basic_meta.sc-peculiar-certificate-summary{width:100%;padding:20px 0;min-width:auto}[data-view=mobile].sc-peculiar-certificate-summary-h .basic_wrapper.sc-peculiar-certificate-summary::before,[data-view=mobile].sc-peculiar-certificate-summary-h .basic_wrapper.sc-peculiar-certificate-summary::after{content:none}[data-view=mobile].sc-peculiar-certificate-summary-h .meta_row.sc-peculiar-certificate-summary:not(:last-child){margin-bottom:0}[data-view=mobile].sc-peculiar-certificate-summary-h .meta_name.sc-peculiar-certificate-summary,[data-view=mobile].sc-peculiar-certificate-summary-h .meta_value.sc-peculiar-certificate-summary{width:100%;padding:5px 0}";

const CertificateSummary = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.showIssuer = true;
    }
    renderDN(item) {
        return Object.keys(item).map((keyName) => {
            return (h("tr", { class: "dn_row" }, h("td", { class: "dn_name" }, h("peculiar-typography", null, keyName)), h("td", { class: "dn_value" }, h("peculiar-typography", null, item[keyName].value))));
        });
    }
    renderMetaData(item) {
        return ([
            h("div", { class: "meta_row" }, h("peculiar-typography", { class: "meta_name", color: "grey_5" }, "Serial number:"), h("peculiar-typography", { class: "meta_value", monospace: true }, item.serialNumber)),
            h("div", { class: "meta_row" }, h("peculiar-typography", { class: "meta_name", color: "grey_5" }, "Version:"), h("peculiar-typography", { class: "meta_value" }, item.version)),
            h("div", { class: "meta_row" }, h("peculiar-typography", { class: "meta_name", color: "grey_5" }, "Validity:"), h("peculiar-typography", { class: "meta_value" }, item.validity)),
            h("div", { class: "meta_row" }, h("peculiar-typography", { class: "meta_name", color: "grey_5" }, "Issued:"), h("peculiar-typography", { class: "meta_value" }, short(item.notBefore))),
            h("div", { class: "meta_row" }, h("peculiar-typography", { class: "meta_name", color: "grey_5" }, "Expired:"), h("peculiar-typography", { class: "meta_value" }, short(item.notAfter))),
        ]);
    }
    render() {
        return (h(Host, { "data-view": this.view }, h("div", { class: {
                basic_wrapper: true,
                is_only: !this.showIssuer,
            } }, h("div", { class: "basic_col" }, h("peculiar-typography", { class: "dn_row", color: "grey_5" }, "Subject DN:"), h("table", { class: "table_attributes" }, h("tbody", null, this.renderDN(this.certificate.subject)))), this.showIssuer && (h("div", { class: "basic_col peculiar_stroke_grey_3" }, h("peculiar-typography", { class: "dn_row", color: "grey_5" }, this.issuerDnLink ? (h("a", { href: this.issuerDnLink, target: "_blank", class: "peculiar_color_primary" }, "Issuer DN")) : ('Issuer DN'), ":"), h("table", { class: "table_attributes" }, h("tbody", null, this.renderDN(this.certificate.issuer))))), h("div", { class: "basic_meta" }, this.renderMetaData(this.certificate)))));
    }
};
CertificateSummary.style = certificateSummaryCss;

export { CertificateSummary as peculiar_certificate_summary };
