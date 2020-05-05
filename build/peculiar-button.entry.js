import { r as registerInstance, h, H as Host } from './index-f2b7af1d.js';

const buttonCss = ".b1{font-family:inherit;font-size:15px;line-height:1.46;letter-spacing:0.3px}.b3{font-family:inherit;font-size:13px;line-height:1.53;letter-spacing:0.5px;font-weight:400}.h4{font-family:inherit;font-style:normal;font-weight:bold;font-size:18px;line-height:25px}.h6{font-family:inherit;font-weight:600;font-size:15px;line-height:20px;letter-spacing:0.3px}.h7{font-family:inherit;font-weight:600;font-size:14px;line-height:1.35}.monospace{font-family:monospace}.text_black{color:rgb(var(--peculiar-color-black-rgb))}.text_white{color:rgb(var(--peculiar-color-white-rgb))}.text_grey{color:rgb(var(--peculiar-color-grey-rgb))}.text_primary{color:rgb(var(--peculiar-color-primary-rgb))}.align_center{text-align:center}.align_left{text-align:left}.align_right{text-align:right}.fill_grey{background-color:rgb(var(--peculiar-color-grey-rgb))}.fill_white{background-color:rgb(var(--peculiar-color-white-rgb))}.fill_primary{background-color:rgb(var(--peculiar-color-primary-rgb))}.svg_fill_black{fill:rgb(var(--peculiar-color-black-rgb))}.svg_fill_white{fill:rgb(var(--peculiar-color-white-rgb))}.svg_fill_primary{fill:rgb(var(--peculiar-color-primary-rgb))}.stroke_border{border-color:rgb(var(--peculiar-color-border-rgb))}:host{display:inline-block;width:auto;font-family:inherit;text-align:center;text-decoration:none;text-overflow:ellipsis;white-space:nowrap;user-select:none;vertical-align:top;vertical-align:-webkit-baseline-middle;pointer-events:auto;font-kerning:none;box-sizing:border-box;}:host(.button){height:30px;border-radius:2px}:host(.button_stroke){border-width:1px;border-style:solid}.button_native{font-family:inherit;font-size:inherit;font-style:inherit;font-weight:inherit;letter-spacing:inherit;text-overflow:inherit;text-transform:inherit;text-align:inherit;white-space:inherit;color:inherit;display:block;position:relative;width:100%;height:100%;line-height:30px;contain:layout style;cursor:pointer;z-index:0;box-sizing:border-box;-webkit-appearance:none;text-decoration:inherit;outline:none;margin:0;background:inherit;border:none;border-radius:inherit;padding:0 var(--peculiar-button-padding-end) 0 var(--peculiar-button-padding-start);transition:box-shadow 200ms}.button_inner{transition:opacity 200ms}:host(.button_disabled){opacity:.5;pointer-events:none}.button_native:focus{box-shadow:0 4px 10px 0 rgba(var(--peculiar-color-black-rgb), 0.15)}@media (hover: hover){.button_native:hover .button_inner{opacity:0.6}}.button_native:active .button_inner{opacity:1}";

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
};
Button.style = buttonCss;

export { Button as peculiar_button };
