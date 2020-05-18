import { r as registerInstance, h, H as Host } from './index-d38ac7fc.js';

const typographyCss = ":host{display:block}.typography_native{margin:0;padding:0;font-family:var(--peculiar-font-family);font-size:inherit;line-height:inherit;letter-spacing:inherit;word-break:break-word}:host(.align_left){text-align:left}:host(.align_center){text-align:center}:host(.align_right){text-align:right}.ellipsis{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.monospace{font-family:monospace}";

const PeculiarTypography = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        /**
         * Typography type.
         */
        this.type = 'b3';
        /**
         * Component color from theme.
         */
        this.color = 'dark';
    }
    render() {
        const TagType = this.type && this.type.includes('h') ? this.type : 'p';
        return (h(Host, { class: {
                [`peculiar_${this.type || 'b3'}`]: true,
                [`peculiar_color_${this.color || 'dark'}`]: true,
                [`align_${this.align}`]: !!this.align,
            } }, h(TagType, { class: {
                typography_native: true,
                ellipsis: this.ellipsis,
                monospace: this.monospace,
            } }, h("slot", null))));
    }
};
PeculiarTypography.style = typographyCss;

export { PeculiarTypography as peculiar_typography };
