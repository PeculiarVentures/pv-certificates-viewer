import { r as registerInstance, h, H as Host } from './index-d38ac7fc.js';

const buttonSplitCss = ".sc-peculiar-button-split-h{display:inline-block;vertical-align:top;position:relative;white-space:nowrap;font-size:0}.button_split_icon.sc-peculiar-button-split{width:7px;height:5px;display:inline-block;vertical-align:middle;fill:rgb(var(--peculiar-color-primary-rgb))}.button_split_with_icon.sc-peculiar-button-split{width:25px;border-bottom-left-radius:0;border-top-left-radius:0}.button_split_action.sc-peculiar-button-split{width:100%}.active_split_container.sc-peculiar-button-split{position:absolute;bottom:calc(100% + 1px);left:0;width:100%;border-radius:2px;box-shadow:0px -2px 1px rgb(var(--peculiar-color-light-rgb)), 0px 0px 10px rgba(var(--peculiar-color-dark-rgb), 0.0241168);z-index:1}.button_split.sc-peculiar-button-split{border-bottom-right-radius:0;border-top-right-radius:0;border-right-width:0}";

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
        return (h("div", { class: "active_split_container peculiar_fill_light" }, this.actions.map(action => (h("peculiar-button", { fill: "fill", class: "button_split_action", onClick: this.onClickActiveButton.bind(this, action.onClick) }, action.text)))));
    }
    render() {
        return (h(Host, null, h("peculiar-button", { fill: this.fill, onClick: this.onClick, class: "button_split" }, h("slot", null)), h("peculiar-button", { fill: this.fill, onClick: this.onClickSplitButton, class: "button_split_with_icon" }, h("svg", { viewBox: "0 0 7 5", xmlns: "http://www.w3.org/2000/svg", class: "button_split_icon" }, h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M5.459.124c.934.001 1.442.994.84 1.644L4.425 3.794c-.44.475-1.244.475-1.684 0L.862 1.764C.26 1.115.77.12 1.705.122l3.754.003z" }))), this.renderActiveSplitState()));
    }
};
ButtonSplit.style = buttonSplitCss;

export { ButtonSplit as peculiar_button_split };
