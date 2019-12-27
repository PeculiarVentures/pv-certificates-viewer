import { r as registerInstance, h, H as Host } from './core-b3a1a540.js';

const CircularProgress = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        /**
         * Width/height of progress circle.
         */
        this.size = 24;
        /**
         * Stroke width of progress bar circle.
         */
        this.width = 4;
        this.box = 50;
    }
    render() {
        return (h(Host, null, h("div", { class: "circle_progress", style: {
                width: `${this.size}px`,
                height: `${this.size}px`,
            } }, h("svg", { class: "circle_progress_svg", viewBox: `0 0 ${this.box} ${this.box}` }, h("circle", { class: "circle_progress_backdrop", cx: this.box / 2, cy: this.box / 2, r: (this.box / 2) - 5, fill: "none", style: {
                strokeWidth: `${this.width}px`,
            } }), h("circle", { class: "circle_progress_circle", cx: this.box / 2, cy: this.box / 2, r: (this.box / 2) - 5, fill: "none", style: {
                strokeWidth: `${this.width}px`,
            } })))));
    }
    static get style() { return ":host {\n  display: block;\n  width: 100%;\n}\n\n\@-webkit-keyframes circular-rotate {\n  to {\n    -webkit-transform: rotate(1turn);\n    transform: rotate(1turn);\n  }\n}\n\n\@keyframes circular-rotate {\n  to {\n    -webkit-transform: rotate(1turn);\n    transform: rotate(1turn);\n  }\n}\n\n\@-webkit-keyframes circular-dash {\n  0% {\n    stroke-dasharray: 1,200;\n    stroke-dashoffset: 0;\n  }\n\n  50% {\n    stroke-dasharray: 100,200;\n    stroke-dashoffset: -15;\n  }\n\n  to {\n    stroke-dasharray: 100,200;\n    stroke-dashoffset: -120;\n  }\n}\n\n\@keyframes circular-dash {\n  0% {\n    stroke-dasharray: 1,200;\n    stroke-dashoffset: 0;\n  }\n\n  50% {\n    stroke-dasharray: 100,200;\n    stroke-dashoffset: -15;\n  }\n\n  to {\n    stroke-dasharray: 100,200;\n    stroke-dashoffset: -120;\n  }\n}\n\n.circle_progress {\n  margin: 0 auto;\n}\n\n.circle_progress_svg {\n  -webkit-animation: circular-rotate 1.4s linear infinite;\n  animation: circular-rotate 1.4s linear infinite;\n}\n\n.circle_progress_circle {\n  stroke-linecap: round;\n  -webkit-animation: circular-dash 1.4s ease-in-out infinite;\n  animation: circular-dash 1.4s ease-in-out infinite;\n  stroke-dasharray: 80,200;\n  stroke-dashoffset: 0;\n  stroke: rgb(var(--pv-color-primary-rgb));\n}\n\n.circle_progress_backdrop {\n  stroke: rgb(var(--pv-color-border-rgb));\n}"; }
};

export { CircularProgress as pv_circular_progress };
