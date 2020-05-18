import { r as registerInstance, h, H as Host, g as getElement } from './index-d38ac7fc.js';

const highlightWordsCss = ":host{display:inline-block}::slotted(mark){background-color:rgba(var(--peculiar-color-attention-rgb), 0.4)}";

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
};
HighlightWords.style = highlightWordsCss;

export { HighlightWords as peculiar_highlight_words };
