import { r as registerInstance, c as createEvent, h, H as Host } from './index-f2b7af1d.js';

const textHiderCss = "*{margin:0;padding:0;box-sizing:border-box;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;text-size-adjust:none;-webkit-text-size-adjust:none;-webkit-tap-highlight-color:transparent;word-break:break-word}*:focus:not(:active):not(:hover){outline-width:2px;outline-style:solid;outline-offset:-1px}input:focus,textarea:focus,*:active,*:hover{outline:none !important}a{text-decoration:none}textarea{resize:none}input,textarea{-webkit-appearance:none !important;-moz-appearance:none;-ms-appearance:none;appearance:none !important;font-family:inherit}table{cellspacing:0 !important;border-spacing:0 !important}.b1{font-family:inherit;font-size:15px;line-height:1.46;letter-spacing:0.3px}.b3{font-family:inherit;font-size:13px;line-height:1.53;letter-spacing:0.5px;font-weight:400}.h4{font-family:inherit;font-style:normal;font-weight:bold;font-size:18px;line-height:25px}.h6{font-family:inherit;font-weight:600;font-size:15px;line-height:20px;letter-spacing:0.3px}.h7{font-family:inherit;font-weight:600;font-size:14px;line-height:1.35}.monospace{font-family:monospace}.text_black{color:rgb(var(--peculiar-color-black-rgb))}.text_white{color:rgb(var(--peculiar-color-white-rgb))}.text_grey{color:rgb(var(--peculiar-color-grey-rgb))}.text_primary{color:rgb(var(--peculiar-color-primary-rgb))}.align_center{text-align:center}.align_left{text-align:left}.align_right{text-align:right}.fill_grey{background-color:rgb(var(--peculiar-color-grey-rgb))}.fill_white{background-color:rgb(var(--peculiar-color-white-rgb))}.fill_primary{background-color:rgb(var(--peculiar-color-primary-rgb))}.svg_fill_black{fill:rgb(var(--peculiar-color-black-rgb))}.svg_fill_white{fill:rgb(var(--peculiar-color-white-rgb))}.svg_fill_primary{fill:rgb(var(--peculiar-color-primary-rgb))}.stroke_border{border-color:rgb(var(--peculiar-color-border-rgb))}:host{display:block;width:100%}.text{display:inline-block;width:calc(100% - 70px);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;margin:0}.text.m_opened{white-space:initial}.action{vertical-align:top;display:inline-block;width:70px;text-align:right;position:relative;top:-6px}.button_action{width:30px}.expand_icon{width:7px;height:5px;display:inline-block}.m_opened .expand_icon{transform:rotate(180deg)}";

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
                svg_fill_white: this.opened,
                svg_fill_primary: !this.opened,
            } }, h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M5.459.124c.934.001 1.442.994.84 1.644L4.425 3.794c-.44.475-1.244.475-1.684 0L.862 1.764C.26 1.115.77.12 1.705.122l3.754.003z" })))))));
    }
};
TextHider.style = textHiderCss;

export { TextHider as peculiar_text_hider };
