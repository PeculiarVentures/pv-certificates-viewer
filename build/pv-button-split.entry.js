import { r as registerInstance, h, H as Host } from './core-828499c0.js';

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
        return (h("div", { class: "active_split_container fill_white" }, this.actions.map(action => (h("pv-button", { fill: "fill", class: "button_split_action", onClick: this.onClickActiveButton.bind(this, action.onClick) }, action.text)))));
    }
    render() {
        return (h(Host, null, h("pv-button", { fill: this.fill, onClick: this.onClick, class: "button_split" }, h("slot", null)), h("pv-button", { fill: this.fill, onClick: this.onClickSplitButton, class: "button_split_with_icon" }, h("svg", { viewBox: "0 0 7 5", xmlns: "http://www.w3.org/2000/svg", class: "button_split_icon svg_fill_primary" }, h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M5.459.124c.934.001 1.442.994.84 1.644L4.425 3.794c-.44.475-1.244.475-1.684 0L.862 1.764C.26 1.115.77.12 1.705.122l3.754.003z" }))), this.renderActiveSplitState()));
    }
    static get style() { return "/* Text type */\n.b1 {\n  font-family: inherit;\n  font-size: 15px;\n  line-height: 1.46;\n  letter-spacing: 0.3px;\n}\n\n.b3 {\n  font-family: inherit;\n  font-size: 13px;\n  line-height: 1.53;\n  letter-spacing: 0.5px;\n  font-weight: 400;\n}\n\n.h4 {\n  font-family: inherit;\n  font-style: normal;\n  font-weight: bold;\n  font-size: 18px;\n  line-height: 25px;\n}\n\n.h6 {\n  font-family: inherit;\n  font-weight: 600;\n  font-size: 15px;\n  line-height: 20px;\n  letter-spacing: 0.3px;\n}\n\n.h7 {\n  font-family: inherit;\n  font-weight: 600;\n  font-size: 14px;\n  line-height: 1.35;\n}\n\n.monospace {\n  font-family: monospace;\n}\n\n/* Text color */\n.text_black {\n  color: rgb(var(--pv-color-black-rgb));\n}\n\n.text_white {\n  color: rgb(var(--pv-color-white-rgb));\n}\n\n.text_grey {\n  color: rgb(var(--pv-color-grey-rgb));\n}\n\n.text_primary {\n  color: rgb(var(--pv-color-primary-rgb));\n}\n\n/* Text aligance */\n.align_center {\n  text-align: center;\n}\n\n.align_left {\n  text-align: left;\n}\n\n.align_right {\n  text-align: right;\n}\n\n/* Background color */\n.fill_grey {\n  background-color: rgb(var(--pv-color-grey-rgb));\n}\n\n.fill_white {\n  background-color: rgb(var(--pv-color-white-rgb));\n}\n\n.fill_primary {\n  background-color: rgb(var(--pv-color-primary-rgb));\n}\n\n/* SVG fill color */\n.svg_fill_black {\n  fill: rgb(var(--pv-color-black-rgb));\n}\n\n.svg_fill_white {\n  fill: rgb(var(--pv-color-white-rgb));\n}\n\n.svg_fill_primary {\n  fill: rgb(var(--pv-color-primary-rgb));\n}\n\n/* Border color */\n.stroke_border {\n  border-color: rgb(var(--pv-color-border-rgb));\n}\n\n\n:host {\n  display: inline-block;\n  vertical-align: top;\n  position: relative;\n  white-space: nowrap;\n  font-size: 0;\n}\n\n.button_split_icon {\n  width: 7px;\n  height: 5px;\n  display: inline-block;\n  vertical-align: middle;\n}\n\n.button_split_with_icon {\n  width: 25px;\n  border-bottom-left-radius: 0;\n  border-top-left-radius: 0;\n}\n\n.button_split_action {\n  width: 100%;\n}\n\n.active_split_container {\n  position: absolute;\n  top: calc(100% + 1px);\n  left: 0;\n  width: 100%;\n  border-radius: 2px;\n  -webkit-box-shadow: 0px 2px 1px rgb(var(--pv-color-white-rgb)), 0px 0px 10px rgba(var(--pv-color-black-rgb), 0.0241168);\n  box-shadow: 0px 2px 1px rgb(var(--pv-color-white-rgb)), 0px 0px 10px rgba(var(--pv-color-black-rgb), 0.0241168);\n  z-index: 1;\n}\n\n.button_split {\n  border-bottom-right-radius: 0;\n  border-top-right-radius: 0;\n  border-right-width: 0;\n}"; }
};

export { ButtonSplit as pv_button_split };
