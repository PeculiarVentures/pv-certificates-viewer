import { r as registerInstance, h, H as Host, c as getElement } from './core-b3a1a540.js';

const HighlightWords = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.tag = 'mark';
    }
    componentDidLoad() {
        this.handleHighlightSearch();
    }
    componentDidUpdate() {
        this.handleHighlightSearch();
    }
    handleHighlightSearch() {
        const basicString = this.resetHighlightSearch(this.host.innerHTML);
        let result = basicString;
        if (this.search) {
            const substring = new RegExp(`(${this.search})`, 'gi');
            result = basicString.replace(substring, `<${this.tag}>$1</${this.tag}>`);
        }
        this.host.innerHTML = result;
    }
    resetHighlightSearch(source) {
        const substring = new RegExp(`<\/?${this.tag}>`, 'g');
        return source.replace(substring, '');
    }
    render() {
        return (h(Host, null, h("slot", null)));
    }
    get host() { return getElement(this); }
    static get style() { return ":host {\n  display: inline-block;\n}\n\n::slotted(mark) {\n  background-color: rgba(var(--pv-color-attention-rgb), 0.4);\n}"; }
};

export { HighlightWords as pv_highlight_words };
