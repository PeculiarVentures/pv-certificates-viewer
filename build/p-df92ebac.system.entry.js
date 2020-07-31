System.register(['./p-50c6b099.system.js'], function (exports) {
    'use strict';
    var registerInstance, h, Host, getElement;
    return {
        setters: [function (module) {
                registerInstance = module.r;
                h = module.h;
                Host = module.H;
                getElement = module.g;
            }],
        execute: function () {
            var circularProgressCss = ":host{display:block;width:100%}@-webkit-keyframes circular-rotate{to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}@keyframes circular-rotate{to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}@-webkit-keyframes circular-dash{0%{stroke-dasharray:1, 200;stroke-dashoffset:0}50%{stroke-dasharray:100, 200;stroke-dashoffset:-15}to{stroke-dasharray:100, 200;stroke-dashoffset:-120}}@keyframes circular-dash{0%{stroke-dasharray:1, 200;stroke-dashoffset:0}50%{stroke-dasharray:100, 200;stroke-dashoffset:-15}to{stroke-dasharray:100, 200;stroke-dashoffset:-120}}.circle_progress{margin:0 auto}.circle_progress_svg{-webkit-animation:circular-rotate 1.4s linear infinite;animation:circular-rotate 1.4s linear infinite}.circle_progress_circle{stroke-linecap:round;-webkit-animation:circular-dash 1.4s ease-in-out infinite;animation:circular-dash 1.4s ease-in-out infinite;stroke-dasharray:80, 200;stroke-dashoffset:0;stroke:rgb(var(--peculiar-color-primary-rgb))}.circle_progress_backdrop{stroke:rgb(var(--peculiar-color-grey_3-rgb))}";
            var CircularProgress = exports('peculiar_circular_progress', /** @class */ (function () {
                function class_1(hostRef) {
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
                class_1.prototype.render = function () {
                    return (h(Host, null, h("div", { class: "circle_progress", style: {
                            width: this.size + "px",
                            height: this.size + "px",
                        } }, h("svg", { class: "circle_progress_svg", viewBox: "0 0 " + this.box + " " + this.box }, h("circle", { class: "circle_progress_backdrop", cx: this.box / 2, cy: this.box / 2, r: (this.box / 2) - 5, fill: "none", style: {
                            strokeWidth: this.width + "px",
                        } }), h("circle", { class: "circle_progress_circle", cx: this.box / 2, cy: this.box / 2, r: (this.box / 2) - 5, fill: "none", style: {
                            strokeWidth: this.width + "px",
                        } })))));
                };
                return class_1;
            }()));
            CircularProgress.style = circularProgressCss;
            var highlightWordsCss = ":host{display:inline-block}::slotted(mark){background-color:rgba(var(--peculiar-color-attention-rgb), 0.4)}";
            var HighlightWords = exports('peculiar_highlight_words', /** @class */ (function () {
                function class_2(hostRef) {
                    registerInstance(this, hostRef);
                    this.tag = 'mark';
                }
                class_2.prototype.componentDidLoad = function () {
                    this.handleHighlightSearch();
                };
                class_2.prototype.componentDidUpdate = function () {
                    this.handleHighlightSearch();
                };
                class_2.prototype.handleHighlightSearch = function () {
                    var basicString = this.resetHighlightSearch(this.host.innerHTML);
                    var result = basicString;
                    if (this.search) {
                        var substring = new RegExp("(" + this.search + ")", 'gi');
                        result = basicString.replace(substring, "<" + this.tag + ">$1</" + this.tag + ">");
                    }
                    this.host.innerHTML = result;
                };
                class_2.prototype.resetHighlightSearch = function (source) {
                    var substring = new RegExp("</?" + this.tag + ">", 'g');
                    return source.replace(substring, '');
                };
                class_2.prototype.render = function () {
                    return (h(Host, null, h("slot", null)));
                };
                Object.defineProperty(class_2.prototype, "host", {
                    get: function () { return getElement(this); },
                    enumerable: false,
                    configurable: true
                });
                return class_2;
            }()));
            HighlightWords.style = highlightWordsCss;
        }
    };
});
