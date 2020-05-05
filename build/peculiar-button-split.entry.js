import { r as registerInstance, h, H as Host } from './index-f2b7af1d.js';

const buttonSplitCss = ".b1{font-family:inherit;font-size:15px;line-height:1.46;letter-spacing:0.3px}.b3{font-family:inherit;font-size:13px;line-height:1.53;letter-spacing:0.5px;font-weight:400}.h4{font-family:inherit;font-style:normal;font-weight:bold;font-size:18px;line-height:25px}.h6{font-family:inherit;font-weight:600;font-size:15px;line-height:20px;letter-spacing:0.3px}.h7{font-family:inherit;font-weight:600;font-size:14px;line-height:1.35}.monospace{font-family:monospace}.text_black{color:rgb(var(--peculiar-color-black-rgb))}.text_white{color:rgb(var(--peculiar-color-white-rgb))}.text_grey{color:rgb(var(--peculiar-color-grey-rgb))}.text_primary{color:rgb(var(--peculiar-color-primary-rgb))}.align_center{text-align:center}.align_left{text-align:left}.align_right{text-align:right}.fill_grey{background-color:rgb(var(--peculiar-color-grey-rgb))}.fill_white{background-color:rgb(var(--peculiar-color-white-rgb))}.fill_primary{background-color:rgb(var(--peculiar-color-primary-rgb))}.svg_fill_black{fill:rgb(var(--peculiar-color-black-rgb))}.svg_fill_white{fill:rgb(var(--peculiar-color-white-rgb))}.svg_fill_primary{fill:rgb(var(--peculiar-color-primary-rgb))}.stroke_border{border-color:rgb(var(--peculiar-color-border-rgb))}:host{display:inline-block;vertical-align:top;position:relative;white-space:nowrap;font-size:0}.button_split_icon{width:7px;height:5px;display:inline-block;vertical-align:middle}.button_split_with_icon{width:25px;border-bottom-left-radius:0;border-top-left-radius:0}.button_split_action{width:100%}.active_split_container{position:absolute;top:calc(100% + 1px);left:0;width:100%;border-radius:2px;box-shadow:0px 2px 1px rgb(var(--peculiar-color-white-rgb)), 0px 0px 10px rgba(var(--peculiar-color-black-rgb), 0.0241168);z-index:1}.button_split{border-bottom-right-radius:0;border-top-right-radius:0;border-right-width:0}";

const ButtonSplit = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.fill = 'stroke';
        this.actions = [];
        this.activeSplit = false;
        this.onClickSplitButton = (event) => {
            event.stopPropagation();
            this.activeSplit = !this.activeSplit;
        };
    }
    onClickActiveButton(action, event) {
        this.activeSplit = false;
        action(event);
    }
    renderActiveSplitState() {
        if (!this.activeSplit) {
            return null;
        }
        return (h("div", { class: "active_split_container fill_white" }, this.actions.map(action => (h("peculiar-button", { fill: "fill", class: "button_split_action", onClick: this.onClickActiveButton.bind(this, action.onClick) }, action.text)))));
    }
    render() {
        return (h(Host, null, h("peculiar-button", { fill: this.fill, onClick: this.onClick, class: "button_split" }, h("slot", null)), h("peculiar-button", { fill: this.fill, onClick: this.onClickSplitButton, class: "button_split_with_icon" }, h("svg", { viewBox: "0 0 7 5", xmlns: "http://www.w3.org/2000/svg", class: "button_split_icon svg_fill_primary" }, h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M5.459.124c.934.001 1.442.994.84 1.644L4.425 3.794c-.44.475-1.244.475-1.684 0L.862 1.764C.26 1.115.77.12 1.705.122l3.754.003z" }))), this.renderActiveSplitState()));
    }
};
ButtonSplit.style = buttonSplitCss;

export { ButtonSplit as peculiar_button_split };
