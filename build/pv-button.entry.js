import { r as registerInstance, h, H as Host } from './core-d6f9181b.js';

const Button = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.fill = 'stroke';
    }
    render() {
        return (h(Host, { class: {
                b3: true,
                button: true,
                button_stroke: this.fill === 'stroke',
                stroke_secondary_border: this.fill === 'stroke',
                text_secondary: this.fill === 'stroke',
                text_white: this.fill === 'fill',
                fill_secondary: this.fill === 'fill',
                button_disabled: this.disabled,
            } }, h("button", { type: "button", disabled: this.disabled, class: {
                button_native: true,
            } }, h("slot", null))));
    }
    static get style() { return ":host {\n  --pv-button-padding-end: 5px;\n  --pv-button-padding-start: 5px\n}\n\n\n/* Text type */\n.b3 {\n  font-family: inherit;\n  font-size: 13px;\n  line-height: 1.53;\n  letter-spacing: 0.5px;\n  font-weight: 400;\n}\n\n.h4 {\n  font-family: inherit;\n  font-style: normal;\n  font-weight: bold;\n  font-size: 18px;\n  line-height: 25px;\n}\n\n.h6 {\n  font-family: inherit;\n  font-weight: 600;\n  font-size: 15px;\n  line-height: 20px;\n  letter-spacing: 0.3px;\n}\n\n.h7 {\n  font-family: inherit;\n  font-weight: 600;\n  font-size: 14px;\n  line-height: 1.35;\n}\n\n/* Text color */\n.text_black {\n  color: #2A3134;\n}\n\n.text_white {\n  color: white;\n}\n\n.text_grey_5 {\n  color: #869196;\n}\n\n.text_secondary {\n  color: #3584F7;\n}\n\n/* Text aligance */\n.align-center {\n  text-align: center;\n}\n\n.align-left {\n  text-align: left;\n}\n\n/* Background color */\n.fill_grey_2 {\n  background-color: #F4F7FC;\n}\n\n.fill_grey_1_opacity {\n  background-color: rgba(251, 252, 253, 0.8);\n}\n\n.fill_grey_3_opacity_border {\n  background-color: rgba(209, 213, 217, 0.5);\n}\n\n.fill_grey_5 {\n  background-color: #869196;\n}\n\n.fill_white {\n  background-color: white;\n}\n\n.fill_secondary {\n  background-color: #3584F7;\n}\n\n/* Border color */\n.stroke_grey_3_border {\n  border-color: #D1D5D9;\n}\n\n.stroke_grey_3_opcity_border {\n  border-color: rgba(209, 213, 217, 0.5);\n}\n\n.stroke_secondary_border {\n  border-color: rgba(50, 124, 232, 0.3);\n}\n\n.monospace {\n  font-family: monospace;\n}\n\n\n:host {\n  display: inline-block;\n  width: auto;\n  font-family: inherit;\n  text-align: center;\n  text-decoration: none;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n  vertical-align: top;\n  vertical-align: -webkit-baseline-middle;\n  pointer-events: auto;\n  -webkit-font-kerning: none;\n  font-kerning: none;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n\n  /**\n   * \@prop --pv-button-padding-start: Left padding of the button\n   * \@prop --pv-button-padding-end: Right padding of the button\n  */\n}\n\n:host(.button) {\n  height: 30px;\n  -webkit-transition: background-color, opacity 100ms linear;\n  transition: background-color, opacity 100ms linear;\n  border-radius: 2px;\n}\n\n:host(.button:hover) {\n  opacity: 0.8;\n}\n\n:host(.button:active) {\n  opacity: 0.6;\n}\n\n:host(.button_disabled) {\n  opacity: .5;\n  pointer-events: none;\n}\n\n:host(.button_stroke) {\n  border-width: 1px;\n  border-style: solid;\n}\n\n.button_native {\n  font-family: inherit;\n  font-size: inherit;\n  font-style: inherit;\n  font-weight: inherit;\n  letter-spacing: inherit;\n  text-overflow: inherit;\n  text-transform: inherit;\n  text-align: inherit;\n  white-space: inherit;\n  color: inherit;\n  display: block;\n  position: relative;\n  width: 100%;\n  height: 100%;\n  line-height: 1;\n  contain: layout style;\n  cursor: pointer;\n  z-index: 0;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  -webkit-appearance: none;\n  text-decoration: inherit;\n  outline: none;\n  margin: 0;\n  background: inherit;\n  border: none;\n  border-radius: inherit;\n  padding: 0 var(--pv-button-padding-end) 0 var(--pv-button-padding-start);\n}\n\n.button_native:focus {\n  opacity: 0.8;\n}"; }
};

export { Button as pv_button };
