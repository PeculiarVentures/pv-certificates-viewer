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
            var buttonSplitCss = ".sc-peculiar-button-split-h{display:inline-block;vertical-align:top;position:relative;white-space:nowrap;font-size:0}.button_split.sc-peculiar-button-split{border-bottom-right-radius:0;border-top-right-radius:0;border-right-width:0}.button_split_icon.sc-peculiar-button-split{width:7px;height:5px;display:inline-block;vertical-align:middle;fill:rgb(var(--peculiar-color-primary-rgb))}.button_split_with_icon.sc-peculiar-button-split{width:25px;border-bottom-left-radius:0;border-top-left-radius:0}.button_split_with_icon.m_open.sc-peculiar-button-split:before{position:fixed;width:100%;height:100%;top:0;left:0;content:\"\"}.button_split_action.sc-peculiar-button-split{width:100%}.button_split_container.sc-peculiar-button-split{position:absolute;bottom:calc(100% + 1px);left:0;width:100%;border-radius:2px;-webkit-box-shadow:0px -2px 1px rgb(var(--peculiar-color-light-rgb)), 0px 0px 10px rgba(var(--peculiar-color-dark-rgb), 0.0241168);box-shadow:0px -2px 1px rgb(var(--peculiar-color-light-rgb)), 0px 0px 10px rgba(var(--peculiar-color-dark-rgb), 0.0241168);z-index:1}";
            var ButtonSplit = exports('peculiar_button_split', /** @class */ (function () {
                function class_1(hostRef) {
                    var _this = this;
                    registerInstance(this, hostRef);
                    this.fill = 'stroke';
                    this.actions = [];
                    this.open = false;
                    this.onClickSplitButton = function (event) {
                        event.stopPropagation();
                        _this.open = !_this.open;
                    };
                }
                class_1.prototype.onClickActiveButton = function (action, event) {
                    this.open = false;
                    action(event);
                };
                class_1.prototype.renderActiveSplitState = function () {
                    var _this = this;
                    if (!this.open) {
                        return null;
                    }
                    return (h("div", { class: "button_split_container peculiar_fill_light" }, this.actions.map(function (action) { return (h("peculiar-button", { fill: "fill", class: "button_split_action", onClick: _this.onClickActiveButton.bind(_this, action.onClick) }, action.text)); })));
                };
                class_1.prototype.render = function () {
                    return (h(Host, null, h("peculiar-button", { fill: this.fill, onClick: this.onClick, class: "button_split" }, h("slot", null)), h("peculiar-button", { fill: this.fill, onClick: this.onClickSplitButton, class: {
                            button_split_with_icon: true,
                            m_open: this.open,
                        } }, h("svg", { viewBox: "0 0 7 5", xmlns: "http://www.w3.org/2000/svg", class: "button_split_icon" }, h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M5.459.124c.934.001 1.442.994.84 1.644L4.425 3.794c-.44.475-1.244.475-1.684 0L.862 1.764C.26 1.115.77.12 1.705.122l3.754.003z" }))), this.renderActiveSplitState()));
                };
                return class_1;
            }()));
            ButtonSplit.style = buttonSplitCss;
            var circularProgressCss = ":host{display:block;width:100%}@-webkit-keyframes circular-rotate{to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}@keyframes circular-rotate{to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}@-webkit-keyframes circular-dash{0%{stroke-dasharray:1, 200;stroke-dashoffset:0}50%{stroke-dasharray:100, 200;stroke-dashoffset:-15}to{stroke-dasharray:100, 200;stroke-dashoffset:-120}}@keyframes circular-dash{0%{stroke-dasharray:1, 200;stroke-dashoffset:0}50%{stroke-dasharray:100, 200;stroke-dashoffset:-15}to{stroke-dasharray:100, 200;stroke-dashoffset:-120}}.circle_progress{margin:0 auto}.circle_progress_svg{-webkit-animation:circular-rotate 1.4s linear infinite;animation:circular-rotate 1.4s linear infinite}.circle_progress_circle{stroke-linecap:round;-webkit-animation:circular-dash 1.4s ease-in-out infinite;animation:circular-dash 1.4s ease-in-out infinite;stroke-dasharray:80, 200;stroke-dashoffset:0;stroke:rgb(var(--peculiar-color-primary-rgb))}.circle_progress_backdrop{stroke:rgb(var(--peculiar-color-grey_3-rgb))}";
            var CircularProgress = exports('peculiar_circular_progress', /** @class */ (function () {
                function class_2(hostRef) {
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
                class_2.prototype.render = function () {
                    return (h(Host, null, h("div", { class: "circle_progress", style: {
                            width: this.size + "px",
                            height: this.size + "px",
                        } }, h("svg", { class: "circle_progress_svg", viewBox: "0 0 " + this.box + " " + this.box }, h("circle", { class: "circle_progress_backdrop", cx: this.box / 2, cy: this.box / 2, r: (this.box / 2) - 5, fill: "none", style: {
                            strokeWidth: this.width + "px",
                        } }), h("circle", { class: "circle_progress_circle", cx: this.box / 2, cy: this.box / 2, r: (this.box / 2) - 5, fill: "none", style: {
                            strokeWidth: this.width + "px",
                        } })))));
                };
                return class_2;
            }()));
            CircularProgress.style = circularProgressCss;
            var highlightWordsCss = ":host{display:inline-block}::slotted(mark){background-color:rgba(var(--peculiar-color-attention-rgb), 0.4)}";
            var HighlightWords = exports('peculiar_highlight_words', /** @class */ (function () {
                function class_3(hostRef) {
                    registerInstance(this, hostRef);
                    this.tag = 'mark';
                }
                class_3.prototype.componentDidLoad = function () {
                    this.handleHighlightSearch();
                };
                class_3.prototype.componentDidUpdate = function () {
                    this.handleHighlightSearch();
                };
                class_3.prototype.handleHighlightSearch = function () {
                    var basicString = this.resetHighlightSearch(this.host.innerHTML);
                    var result = basicString;
                    if (this.search) {
                        var substring = new RegExp("(" + this.search + ")", 'gi');
                        result = basicString.replace(substring, "<" + this.tag + ">$1</" + this.tag + ">");
                    }
                    this.host.innerHTML = result;
                };
                class_3.prototype.resetHighlightSearch = function (source) {
                    var substring = new RegExp("</?" + this.tag + ">", 'g');
                    return source.replace(substring, '');
                };
                class_3.prototype.render = function () {
                    return (h(Host, null, h("slot", null)));
                };
                Object.defineProperty(class_3.prototype, "host", {
                    get: function () { return getElement(this); },
                    enumerable: false,
                    configurable: true
                });
                return class_3;
            }()));
            HighlightWords.style = highlightWordsCss;
        }
    };
});
