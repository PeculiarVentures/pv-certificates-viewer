import { r as registerInstance, h, H as Host } from './index-d38ac7fc.js';

const buttonCss = ":host{display:inline-block;width:auto;font-family:inherit;text-align:center;text-decoration:none;text-overflow:ellipsis;white-space:nowrap;user-select:none;vertical-align:top;vertical-align:-webkit-baseline-middle;pointer-events:auto;font-kerning:none;box-sizing:border-box;--peculiar-button-padding-end:5px;--peculiar-button-padding-start:5px}:host(.peculiar_button){height:30px;border-radius:2px}:host(.peculiar_button_stroke){border-width:1px;border-style:solid}.peculiar_button_native{font-family:inherit;font-size:inherit;font-style:inherit;font-weight:inherit;letter-spacing:inherit;text-overflow:inherit;text-transform:inherit;text-align:inherit;white-space:inherit;color:inherit;display:block;position:relative;width:100%;height:100%;line-height:30px;contain:layout style;cursor:pointer;z-index:0;box-sizing:border-box;-webkit-appearance:none;text-decoration:inherit;outline:none;margin:0;background:inherit;border:none;border-radius:inherit;padding:0 var(--peculiar-button-padding-end) 0 var(--peculiar-button-padding-start);transition:box-shadow 200ms}.peculiar_button_inner{transition:opacity 200ms}:host(.peculiar_button_disabled){opacity:0.5;pointer-events:none}.peculiar_button_native:focus{box-shadow:0 4px 10px 0 rgba(var(--peculiar-color-dark-rgb), 0.15)}@media (hover: hover){.peculiar_button_native:hover .peculiar_button_inner{opacity:0.6}}.peculiar_button_native:active .peculiar_button_inner{opacity:1}";

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
                peculiar_b3: true,
                peculiar_button: true,
                peculiar_button_stroke: this.fill === 'stroke',
                peculiar_color_primary: this.fill === 'stroke',
                peculiar_color_light: this.fill === 'fill',
                peculiar_fill_primary: this.fill === 'fill',
                peculiar_button_disabled: this.disabled,
            } }, h(TagType, Object.assign({}, attrs, { disabled: this.disabled, class: "peculiar_button_native" }), h("span", { class: "peculiar_button_inner" }, h("slot", null)))));
    }
};
Button.style = buttonCss;

export { Button as peculiar_button };
