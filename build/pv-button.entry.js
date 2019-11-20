import { r as registerInstance, h, H as Host } from './core-921931c1.js';

const Button = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.fill = 'stroke';
    }
    render() {
        return (h(Host, { class: {
                button_disabled: this.disabled,
            } }, h("button", { type: "button", disabled: this.disabled, class: {
                b3: true,
                button: true,
                button_stroke: this.fill === 'stroke',
                text_secondary: this.fill === 'stroke',
                text_white: this.fill === 'fill',
                fill_secondary: this.fill === 'fill',
            } }, h("slot", null))));
    }
    static get style() { return "* {\n  margin: 0;\n  padding: 0;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  border: 0;\n  border-radius: 0;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n  -moz-text-size-adjust: none;\n  -ms-text-size-adjust: none;\n  text-size-adjust: none;\n  -webkit-text-size-adjust: none;\n  -webkit-tap-highlight-color: transparent;\n  word-break: break-word;\n}\n\n*:focus:not(:active):not(:hover) {\n  outline-width: 2px;\n  outline-style: solid;\n  outline-offset: -1px;\n}\n\ninput:focus, textarea:focus, *:active, *:hover {\n  outline: none !important;\n}\n\na {\n  text-decoration: none;\n}\n\ntextarea {\n  resize: none;\n}\n\ninput, textarea {\n  -webkit-appearance: none !important;\n  -moz-appearance: none;\n  -ms-appearance: none;\n  appearance: none !important;\n  font-family: inherit;\n}\n\nbutton {\n  font-family: inherit;\n  background: transparent;\n}\n\ntable {\n  cellspacing: 0 !important;\n  border-spacing: 0 !important;\n}\n\n\n/* Text type */\n.b3 {\n  font-family: \'Open Sans\', Arial, sans-serif;\n  font-size: 13px;\n  line-height: 1.53;\n  letter-spacing: 0.5px;\n  font-weight: 400;\n}\n\n.h7 {\n  font-family: \'Open Sans\', Arial, sans-serif;\n  font-weight: 600;\n  font-size: 14px;\n  line-height: 1.35;\n}\n\n/* Text color */\n.text_black {\n  color: #2A3134;\n}\n\n.text_white {\n  color: white;\n}\n\n.text_grey_5 {\n  color: #869196;\n}\n\n.text_secondary {\n  color: #3584F7;\n}\n\n/* Text aligance */\n.align-center {\n  text-align: center;\n}\n\n.align-left {\n  text-align: left;\n}\n\n/* Background color */\n.fill_grey_2 {\n  background-color: #F4F7FC;\n}\n\n.fill_grey_1_opacity {\n  background-color: rgba(251, 252, 253, 0.8);\n}\n\n.fill_grey_5 {\n  background-color: #869196;\n}\n\n.fill_white {\n  background-color: white;\n}\n\n.fill_secondary {\n  background-color: #3584F7;\n}\n\n/* Border color */\n.stroke_grey_3_border {\n  border-color: #D1D5D9;\n}\n\n\n:host {\n  display: inline-block;\n  width: auto;\n  font-family: inherit;\n  text-align: center;\n  text-decoration: none;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n  vertical-align: top;\n  vertical-align: -webkit-baseline-middle;\n  pointer-events: auto;\n  -webkit-font-kerning: none;\n  font-kerning: none;\n\n  height: 30px;\n}\n\n/* :host(.button_disabled) {\n  opacity: .5;\n  pointer-events: none;\n}\n\n:host .button {\n  display: block;\n  height: 100%;\n  width: 100%;\n  padding: 0 5px;\n  cursor: pointer;\n  background: transparent;\n  border: none;\n  outline: none;\n  box-sizing: border-box;\n  appearance: none;\n  line-height: 1;\n  z-index: 0;\n} */\n\n/* button {\n  width: 100%;\n} */\n\n/* Button styles */\n.button {\n  padding: 0 5px;\n  cursor: pointer;\n  border-radius: 2px;\n  height: 30px;\n  width: 100%;\n  height: 100%;\n  -webkit-transition: opacity 200ms;\n  transition: opacity 200ms;\n  display: block;\n}\n\n.button:hover {\n  opacity: 0.7;\n}\n\n.button_stroke {\n  border: 1px solid rgba(53, 132, 247, 0.3);\n}\n\n:host(.button_disabled) {\n  opacity: .5;\n  pointer-events: none;\n}"; }
};

export { Button as pv_button };
