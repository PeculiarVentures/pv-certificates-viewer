import { r as registerInstance, h, H as Host } from './core-b3a1a540.js';

const Button = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.fill = 'stroke';
    }
    render() {
        const TagType = this.href === undefined ? 'button' : 'a';
        const attrs = (TagType === 'button')
            ? { type: 'button' }
            : {
                href: this.href,
                target: this.target,
            };
        return (h(Host, { class: {
                b3: true,
                button: true,
                button_stroke: this.fill === 'stroke',
                text_primary: this.fill === 'stroke',
                text_white: this.fill === 'fill',
                fill_primary: this.fill === 'fill',
                button_disabled: this.disabled,
            } }, h(TagType, Object.assign({}, attrs, { disabled: this.disabled, class: "button_native" }), h("span", { class: "button_inner" }, h("slot", null)))));
    }
    static get style() { return "/* Text type */\n.b1 {\n  font-family: inherit;\n  font-size: 15px;\n  line-height: 1.46;\n  letter-spacing: 0.3px;\n}\n\n.b3 {\n  font-family: inherit;\n  font-size: 13px;\n  line-height: 1.53;\n  letter-spacing: 0.5px;\n  font-weight: 400;\n}\n\n.h4 {\n  font-family: inherit;\n  font-style: normal;\n  font-weight: bold;\n  font-size: 18px;\n  line-height: 25px;\n}\n\n.h6 {\n  font-family: inherit;\n  font-weight: 600;\n  font-size: 15px;\n  line-height: 20px;\n  letter-spacing: 0.3px;\n}\n\n.h7 {\n  font-family: inherit;\n  font-weight: 600;\n  font-size: 14px;\n  line-height: 1.35;\n}\n\n.monospace {\n  font-family: monospace;\n}\n\n/* Text color */\n.text_black {\n  color: rgb(var(--pv-color-black-rgb));\n}\n\n.text_white {\n  color: rgb(var(--pv-color-white-rgb));\n}\n\n.text_grey {\n  color: rgb(var(--pv-color-grey-rgb));\n}\n\n.text_primary {\n  color: rgb(var(--pv-color-primary-rgb));\n}\n\n/* Text aligance */\n.align_center {\n  text-align: center;\n}\n\n.align_left {\n  text-align: left;\n}\n\n.align_right {\n  text-align: right;\n}\n\n/* Background color */\n.fill_grey {\n  background-color: rgb(var(--pv-color-grey-rgb));\n}\n\n.fill_white {\n  background-color: rgb(var(--pv-color-white-rgb));\n}\n\n.fill_primary {\n  background-color: rgb(var(--pv-color-primary-rgb));\n}\n\n/* SVG fill color */\n.svg_fill_black {\n  fill: rgb(var(--pv-color-black-rgb));\n}\n\n.svg_fill_white {\n  fill: rgb(var(--pv-color-white-rgb));\n}\n\n.svg_fill_primary {\n  fill: rgb(var(--pv-color-primary-rgb));\n}\n\n/* Border color */\n.stroke_border {\n  border-color: rgb(var(--pv-color-border-rgb));\n}\n\n\n:host {\n  display: inline-block;\n  width: auto;\n  font-family: inherit;\n  text-align: center;\n  text-decoration: none;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n  vertical-align: top;\n  vertical-align: -webkit-baseline-middle;\n  pointer-events: auto;\n  -webkit-font-kerning: none;\n  font-kerning: none;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n\n  /**\n   * \@prop --pv-button-padding-start: Left padding of the button\n   * \@prop --pv-button-padding-end: Right padding of the button\n  */\n}\n\n:host(.button) {\n  height: 30px;\n  border-radius: 2px;\n}\n\n:host(.button_stroke) {\n  border-width: 1px;\n  border-style: solid;\n}\n\n.button_native {\n  font-family: inherit;\n  font-size: inherit;\n  font-style: inherit;\n  font-weight: inherit;\n  letter-spacing: inherit;\n  text-overflow: inherit;\n  text-transform: inherit;\n  text-align: inherit;\n  white-space: inherit;\n  color: inherit;\n  display: block;\n  position: relative;\n  width: 100%;\n  height: 100%;\n  line-height: 30px;\n  contain: layout style;\n  cursor: pointer;\n  z-index: 0;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  -webkit-appearance: none;\n  text-decoration: inherit;\n  outline: none;\n  margin: 0;\n  background: inherit;\n  border: none;\n  border-radius: inherit;\n  padding: 0 var(--pv-button-padding-end) 0 var(--pv-button-padding-start);\n  -webkit-transition: -webkit-box-shadow 200ms;\n  transition: -webkit-box-shadow 200ms;\n  transition: box-shadow 200ms;\n  transition: box-shadow 200ms, -webkit-box-shadow 200ms;\n}\n\n.button_inner {\n  -webkit-transition: opacity 200ms;\n  transition: opacity 200ms;\n}\n\n/* Disabled state */\n:host(.button_disabled) {\n  opacity: .5;\n  pointer-events: none;\n}\n\n/* Focus state */\n.button_native:focus {\n  -webkit-box-shadow: 0 4px 10px 0 rgba(var(--pv-color-black-rgb), 0.15);\n  box-shadow: 0 4px 10px 0 rgba(var(--pv-color-black-rgb), 0.15);\n}\n\n/* Hover state */\n\@media (hover: hover) {\n  .button_native:hover .button_inner {\n    opacity: 0.6;\n  }\n}\n\n/* Active state */\n.button_native:active .button_inner {\n  opacity: 1;\n}"; }
};

export { Button as pv_button };
