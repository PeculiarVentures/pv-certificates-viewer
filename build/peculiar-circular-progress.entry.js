import { r as registerInstance, h, H as Host } from './index-d38ac7fc.js';

const circularProgressCss = ":host{display:block;width:100%}@keyframes circular-rotate{to{transform:rotate(1turn)}}@keyframes circular-dash{0%{stroke-dasharray:1, 200;stroke-dashoffset:0}50%{stroke-dasharray:100, 200;stroke-dashoffset:-15}to{stroke-dasharray:100, 200;stroke-dashoffset:-120}}.circle_progress{margin:0 auto}.circle_progress_svg{animation:circular-rotate 1.4s linear infinite}.circle_progress_circle{stroke-linecap:round;animation:circular-dash 1.4s ease-in-out infinite;stroke-dasharray:80, 200;stroke-dashoffset:0;stroke:rgb(var(--peculiar-color-primary-rgb))}.circle_progress_backdrop{stroke:rgb(var(--peculiar-color-grey_3-rgb))}";

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
};
CircularProgress.style = circularProgressCss;

export { CircularProgress as peculiar_circular_progress };
