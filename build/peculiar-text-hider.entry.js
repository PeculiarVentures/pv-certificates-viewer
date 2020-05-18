import { r as registerInstance, c as createEvent, h, H as Host } from './index-d38ac7fc.js';

const textHiderCss = ".sc-peculiar-text-hider-h{display:block;width:100%}.text.sc-peculiar-text-hider{display:inline-block;width:calc(100% - 70px);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;margin:0}.text.m_opened.sc-peculiar-text-hider{white-space:initial}.action.sc-peculiar-text-hider{vertical-align:top;display:inline-block;width:70px;text-align:right;position:relative;top:-6px}.button_action.sc-peculiar-text-hider{width:30px}.expand_icon.sc-peculiar-text-hider{width:7px;height:5px;display:inline-block;fill:rgb(var(--peculiar-color-primary-rgb))}.m_opened.sc-peculiar-text-hider .expand_icon.sc-peculiar-text-hider{transform:rotate(180deg);fill:rgb(var(--peculiar-color-light-rgb))}";

const TextHider = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.opened = false;
        this.textExpand = createEvent(this, "textExpand", 7);
    }
    textExpandHandler() {
        this.opened = !this.opened;
    }
    render() {
        return (h(Host, null, h("div", { class: "root" }, h("div", { class: {
                text: true,
                m_opened: this.opened,
            } }, h("slot", null)), h("div", { class: "action" }, h("peculiar-button", { onClick: this.textExpand.emit, class: {
                button_action: true,
                m_opened: this.opened,
            }, fill: this.opened ? 'fill' : 'stroke' }, h("svg", { viewBox: "0 0 7 5", xmlns: "http://www.w3.org/2000/svg", class: {
                expand_icon: true,
            } }, h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M5.459.124c.934.001 1.442.994.84 1.644L4.425 3.794c-.44.475-1.244.475-1.684 0L.862 1.764C.26 1.115.77.12 1.705.122l3.754.003z" })))))));
    }
};
TextHider.style = textHiderCss;

export { TextHider as peculiar_text_hider };
