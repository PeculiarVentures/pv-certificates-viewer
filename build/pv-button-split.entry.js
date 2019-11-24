import { r as registerInstance, h, H as Host } from './core-facd9e82.js';

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
        return (h(Host, null, h("pv-button", { fill: this.fill, onClick: this.onClick, class: "button_split" }, h("slot", null)), h("pv-button", { fill: this.fill, onClick: this.onClickSplitButton, class: "button_split_with_icon" }, h("svg", { viewBox: "0 0 7 5", fill: "none", xmlns: "http://www.w3.org/2000/svg", class: "button_split_icon" }, h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M5.459.124c.934.001 1.442.994.84 1.644L4.425 3.794c-.44.475-1.244.475-1.684 0L.862 1.764C.26 1.115.77.12 1.705.122l3.754.003z", fill: "#3584F7" }))), this.renderActiveSplitState()));
    }
    static get style() { return "/* Text type */\n.b3 {\n  font-family: inherit;\n  font-size: 13px;\n  line-height: 1.53;\n  letter-spacing: 0.5px;\n  font-weight: 400;\n}\n\n.h4 {\n  font-family: inherit;\n  font-style: normal;\n  font-weight: bold;\n  font-size: 18px;\n  line-height: 25px;\n}\n\n.h6 {\n  font-family: inherit;\n  font-weight: 600;\n  font-size: 15px;\n  line-height: 20px;\n  letter-spacing: 0.3px;\n}\n\n.h7 {\n  font-family: inherit;\n  font-weight: 600;\n  font-size: 14px;\n  line-height: 1.35;\n}\n\n/* Text color */\n.text_black {\n  color: #2A3134;\n}\n\n.text_white {\n  color: white;\n}\n\n.text_grey_5 {\n  color: #869196;\n}\n\n.text_secondary {\n  color: #3584F7;\n}\n\n/* Text aligance */\n.align-center {\n  text-align: center;\n}\n\n.align-left {\n  text-align: left;\n}\n\n/* Background color */\n.fill_grey_2 {\n  background-color: #F4F7FC;\n}\n\n.fill_grey_1_opacity {\n  background-color: rgba(251, 252, 253, 0.8);\n}\n\n.fill_grey_3_opacity_border {\n  background-color: rgba(209, 213, 217, 0.5);\n}\n\n.fill_grey_5 {\n  background-color: #869196;\n}\n\n.fill_white {\n  background-color: white;\n}\n\n.fill_secondary {\n  background-color: #3584F7;\n}\n\n/* Border color */\n.stroke_grey_3_border {\n  border-color: #D1D5D9;\n}\n\n.stroke_grey_3_opcity_border {\n  border-color: rgba(209, 213, 217, 0.5);\n}\n\n.stroke_secondary_border {\n  border-color: rgba(50, 124, 232, 0.3);\n}\n\n.monospace {\n  font-family: monospace;\n}\n\n\n:host {\n  display: inline-block;\n  vertical-align: top;\n  position: relative;\n  white-space: nowrap;\n  font-size: 0;\n}\n\n.button_split_icon {\n  width: 7px;\n  height: 5px;\n  display: inline-block;\n  vertical-align: middle;\n}\n\n.button_split_with_icon {\n  width: 25px;\n  border-bottom-left-radius: 0;\n  border-top-left-radius: 0;\n}\n\n.button_split_action {\n  width: 100%;\n}\n\n.active_split_container {\n  position: absolute;\n  top: calc(100% + 1px);\n  left: 0;\n  width: 100%;\n  border-radius: 2px;\n  box-shadow: 0px 2px 1px #F2F6F6, 0px 0px 10px rgba(0, 0, 0, 0.0241168);\n  z-index: 1;\n}\n\n.button_split {\n  border-bottom-right-radius: 0;\n  border-top-right-radius: 0;\n  border-right-width: 0;\n}"; }
};

export { ButtonSplit as pv_button_split };
