var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
System.register([], function (exports, module) {
    'use strict';
    return {
        execute: function () {
            var _this = this;
            var NAMESPACE = exports('N', 'peculiar');
            var scopeId;
            var contentRef;
            var hostTagName;
            var useNativeShadowDom = false;
            var checkSlotFallbackVisibility = false;
            var checkSlotRelocate = false;
            var isSvgMode = false;
            var queueCongestion = 0;
            var queuePending = false;
            var win = exports('w', typeof window !== 'undefined' ? window : {});
            var CSS = exports('C', win.CSS);
            var doc = exports('d', win.document || { head: {} });
            var plt = exports('p', {
                $flags$: 0,
                $resourcesUrl$: '',
                jmp: function (h) { return h(); },
                raf: function (h) { return requestAnimationFrame(h); },
                ael: function (el, eventName, listener, opts) { return el.addEventListener(eventName, listener, opts); },
                rel: function (el, eventName, listener, opts) { return el.removeEventListener(eventName, listener, opts); },
                ce: function (eventName, opts) { return new CustomEvent(eventName, opts); },
            });
            var supportsShadow = /*@__PURE__*/ (function () { return (doc.head.attachShadow + '').indexOf('[native') > -1; })();
            var promiseResolve = exports('a', function (v) { return Promise.resolve(v); });
            var supportsConstructibleStylesheets = /*@__PURE__*/ (function () {
                try {
                    new CSSStyleSheet();
                    return true;
                }
                catch (e) { }
                return false;
            })();
            var addHostEventListeners = function (elm, hostRef, listeners, attachParentListeners) {
                if (listeners) {
                    listeners.map(function (_a) {
                        var flags = _a[0], name = _a[1], method = _a[2];
                        var target = elm;
                        var handler = hostListenerProxy(hostRef, method);
                        var opts = hostListenerOpts(flags);
                        plt.ael(target, name, handler, opts);
                        (hostRef.$rmListeners$ = hostRef.$rmListeners$ || []).push(function () { return plt.rel(target, name, handler, opts); });
                    });
                }
            };
            var hostListenerProxy = function (hostRef, methodName) { return function (ev) {
                {
                    if (hostRef.$flags$ & 256 /* isListenReady */) {
                        // instance is ready, let's call it's member method for this event
                        hostRef.$lazyInstance$[methodName](ev);
                    }
                    else {
                        (hostRef.$queuedListeners$ = hostRef.$queuedListeners$ || []).push([methodName, ev]);
                    }
                }
            }; };
            // prettier-ignore
            var hostListenerOpts = function (flags) { return (flags & 2 /* Capture */) !== 0; };
            var HYDRATED_CSS = '{visibility:hidden}.hydrated{visibility:inherit}';
            var XLINK_NS = 'http://www.w3.org/1999/xlink';
            var createTime = function (fnName, tagName) {
                if (tagName === void 0) { tagName = ''; }
                {
                    return function () {
                        return;
                    };
                }
            };
            var uniqueTime = function (key, measureText) {
                {
                    return function () {
                        return;
                    };
                }
            };
            var rootAppliedStyles = new WeakMap();
            var registerStyle = function (scopeId, cssText, allowCS) {
                var style = styles.get(scopeId);
                if (supportsConstructibleStylesheets && allowCS) {
                    style = (style || new CSSStyleSheet());
                    style.replace(cssText);
                }
                else {
                    style = cssText;
                }
                styles.set(scopeId, style);
            };
            var addStyle = function (styleContainerNode, cmpMeta, mode, hostElm) {
                var scopeId = getScopeId(cmpMeta);
                var style = styles.get(scopeId);
                // if an element is NOT connected then getRootNode() will return the wrong root node
                // so the fallback is to always use the document for the root node in those cases
                styleContainerNode = styleContainerNode.nodeType === 11 /* DocumentFragment */ ? styleContainerNode : doc;
                if (style) {
                    if (typeof style === 'string') {
                        styleContainerNode = styleContainerNode.head || styleContainerNode;
                        var appliedStyles = rootAppliedStyles.get(styleContainerNode);
                        var styleElm = void 0;
                        if (!appliedStyles) {
                            rootAppliedStyles.set(styleContainerNode, (appliedStyles = new Set()));
                        }
                        if (!appliedStyles.has(scopeId)) {
                            {
                                if (plt.$cssShim$) {
                                    styleElm = plt.$cssShim$.createHostStyle(hostElm, scopeId, style, !!(cmpMeta.$flags$ & 10 /* needsScopedEncapsulation */));
                                    var newScopeId = styleElm['s-sc'];
                                    if (newScopeId) {
                                        scopeId = newScopeId;
                                        // we don't want to add this styleID to the appliedStyles Set
                                        // since the cssVarShim might need to apply several different
                                        // stylesheets for the same component
                                        appliedStyles = null;
                                    }
                                }
                                else {
                                    styleElm = doc.createElement('style');
                                    styleElm.innerHTML = style;
                                }
                                styleContainerNode.insertBefore(styleElm, styleContainerNode.querySelector('link'));
                            }
                            if (appliedStyles) {
                                appliedStyles.add(scopeId);
                            }
                        }
                    }
                    else if (!styleContainerNode.adoptedStyleSheets.includes(style)) {
                        styleContainerNode.adoptedStyleSheets = __spreadArrays(styleContainerNode.adoptedStyleSheets, [style]);
                    }
                }
                return scopeId;
            };
            var attachStyles = function (hostRef) {
                var cmpMeta = hostRef.$cmpMeta$;
                var elm = hostRef.$hostElement$;
                var flags = cmpMeta.$flags$;
                var endAttachStyles = createTime('attachStyles', cmpMeta.$tagName$);
                var scopeId = addStyle(supportsShadow && elm.shadowRoot ? elm.shadowRoot : elm.getRootNode(), cmpMeta, hostRef.$modeName$, elm);
                if (flags & 10 /* needsScopedEncapsulation */) {
                    // only required when we're NOT using native shadow dom (slot)
                    // or this browser doesn't support native shadow dom
                    // and this host element was NOT created with SSR
                    // let's pick out the inner content for slot projection
                    // create a node to represent where the original
                    // content was first placed, which is useful later on
                    // DOM WRITE!!
                    elm['s-sc'] = scopeId;
                    elm.classList.add(scopeId + '-h');
                    if (flags & 2 /* scopedCssEncapsulation */) {
                        elm.classList.add(scopeId + '-s');
                    }
                }
                endAttachStyles();
            };
            var getScopeId = function (cmp, mode) { return 'sc-' + (cmp.$tagName$); };
            /**
             * Default style mode id
             */
            /**
             * Reusable empty obj/array
             * Don't add values to these!!
             */
            var EMPTY_OBJ = {};
            /**
             * Namespaces
             */
            var SVG_NS = 'http://www.w3.org/2000/svg';
            var HTML_NS = 'http://www.w3.org/1999/xhtml';
            var isDef = function (v) { return v != null; };
            var noop = function () {
                /* noop*/
            };
            var isComplexType = function (o) {
                // https://jsperf.com/typeof-fn-object/5
                o = typeof o;
                return o === 'object' || o === 'function';
            };
            var IS_DENO_ENV = typeof Deno !== 'undefined';
            var IS_NODE_ENV = !IS_DENO_ENV &&
                typeof global !== 'undefined' &&
                typeof require === 'function' &&
                !!global.process &&
                typeof __filename === 'string' &&
                (!global.origin || typeof global.origin !== 'string');
            var IS_DENO_WINDOWS_ENV = IS_DENO_ENV && Deno.build.os === 'windows';
            var getCurrentDirectory = IS_NODE_ENV ? process.cwd : IS_DENO_ENV ? Deno.cwd : function () { return '/'; };
            var exit = IS_NODE_ENV ? process.exit : IS_DENO_ENV ? Deno.exit : noop;
            /**
             * Production h() function based on Preact by
             * Jason Miller (@developit)
             * Licensed under the MIT License
             * https://github.com/developit/preact/blob/master/LICENSE
             *
             * Modified for Stencil's compiler and vdom
             */
            // const stack: any[] = [];
            // export function h(nodeName: string | d.FunctionalComponent, vnodeData: d.PropsType, child?: d.ChildType): d.VNode;
            // export function h(nodeName: string | d.FunctionalComponent, vnodeData: d.PropsType, ...children: d.ChildType[]): d.VNode;
            var h = exports('h', function (nodeName, vnodeData) {
                var children = [];
                for (var _i = 2; _i < arguments.length; _i++) {
                    children[_i - 2] = arguments[_i];
                }
                var child = null;
                var key = null;
                var slotName = null;
                var simple = false;
                var lastSimple = false;
                var vNodeChildren = [];
                var walk = function (c) {
                    for (var i = 0; i < c.length; i++) {
                        child = c[i];
                        if (Array.isArray(child)) {
                            walk(child);
                        }
                        else if (child != null && typeof child !== 'boolean') {
                            if ((simple = typeof nodeName !== 'function' && !isComplexType(child))) {
                                child = String(child);
                            }
                            if (simple && lastSimple) {
                                // If the previous child was simple (string), we merge both
                                vNodeChildren[vNodeChildren.length - 1].$text$ += child;
                            }
                            else {
                                // Append a new vNode, if it's text, we create a text vNode
                                vNodeChildren.push(simple ? newVNode(null, child) : child);
                            }
                            lastSimple = simple;
                        }
                    }
                };
                walk(children);
                if (vnodeData) {
                    // normalize class / classname attributes
                    if (vnodeData.key) {
                        key = vnodeData.key;
                    }
                    if (vnodeData.name) {
                        slotName = vnodeData.name;
                    }
                    {
                        var classData_1 = vnodeData.className || vnodeData.class;
                        if (classData_1) {
                            vnodeData.class =
                                typeof classData_1 !== 'object'
                                    ? classData_1
                                    : Object.keys(classData_1)
                                        .filter(function (k) { return classData_1[k]; })
                                        .join(' ');
                        }
                    }
                }
                if (typeof nodeName === 'function') {
                    // nodeName is a functional component
                    return nodeName(vnodeData === null ? {} : vnodeData, vNodeChildren, vdomFnUtils);
                }
                var vnode = newVNode(nodeName, null);
                vnode.$attrs$ = vnodeData;
                if (vNodeChildren.length > 0) {
                    vnode.$children$ = vNodeChildren;
                }
                {
                    vnode.$key$ = key;
                }
                {
                    vnode.$name$ = slotName;
                }
                return vnode;
            });
            var newVNode = function (tag, text) {
                var vnode = {
                    $flags$: 0,
                    $tag$: tag,
                    $text$: text,
                    $elm$: null,
                    $children$: null,
                };
                {
                    vnode.$attrs$ = null;
                }
                {
                    vnode.$key$ = null;
                }
                {
                    vnode.$name$ = null;
                }
                return vnode;
            };
            var Host = exports('H', {});
            var isHost = function (node) { return node && node.$tag$ === Host; };
            var vdomFnUtils = {
                forEach: function (children, cb) { return children.map(convertToPublic).forEach(cb); },
                map: function (children, cb) { return children
                    .map(convertToPublic)
                    .map(cb)
                    .map(convertToPrivate); },
            };
            var convertToPublic = function (node) { return ({
                vattrs: node.$attrs$,
                vchildren: node.$children$,
                vkey: node.$key$,
                vname: node.$name$,
                vtag: node.$tag$,
                vtext: node.$text$,
            }); };
            var convertToPrivate = function (node) {
                if (typeof node.vtag === 'function') {
                    var vnodeData = Object.assign({}, node.vattrs);
                    if (node.vkey) {
                        vnodeData.key = node.vkey;
                    }
                    if (node.vname) {
                        vnodeData.name = node.vname;
                    }
                    return h.apply(void 0, __spreadArrays([node.vtag, vnodeData], node.vchildren || []));
                }
                var vnode = newVNode(node.vtag, node.vtext);
                vnode.$attrs$ = node.vattrs;
                vnode.$children$ = node.vchildren;
                vnode.$key$ = node.vkey;
                vnode.$name$ = node.vname;
                return vnode;
            };
            /**
             * Production setAccessor() function based on Preact by
             * Jason Miller (@developit)
             * Licensed under the MIT License
             * https://github.com/developit/preact/blob/master/LICENSE
             *
             * Modified for Stencil's compiler and vdom
             */
            var setAccessor = function (elm, memberName, oldValue, newValue, isSvg, flags) {
                if (oldValue !== newValue) {
                    var isProp = isMemberInElement(elm, memberName);
                    var ln = memberName.toLowerCase();
                    if (memberName === 'class') {
                        var classList = elm.classList;
                        var oldClasses_1 = parseClassList(oldValue);
                        var newClasses_1 = parseClassList(newValue);
                        classList.remove.apply(classList, oldClasses_1.filter(function (c) { return c && !newClasses_1.includes(c); }));
                        classList.add.apply(classList, newClasses_1.filter(function (c) { return c && !oldClasses_1.includes(c); }));
                    }
                    else if (memberName === 'style') {
                        // update style attribute, css properties and values
                        {
                            for (var prop in oldValue) {
                                if (!newValue || newValue[prop] == null) {
                                    if (prop.includes('-')) {
                                        elm.style.removeProperty(prop);
                                    }
                                    else {
                                        elm.style[prop] = '';
                                    }
                                }
                            }
                        }
                        for (var prop in newValue) {
                            if (!oldValue || newValue[prop] !== oldValue[prop]) {
                                if (prop.includes('-')) {
                                    elm.style.setProperty(prop, newValue[prop]);
                                }
                                else {
                                    elm.style[prop] = newValue[prop];
                                }
                            }
                        }
                    }
                    else if (memberName === 'key')
                        ;
                    else if (memberName === 'ref') {
                        // minifier will clean this up
                        if (newValue) {
                            newValue(elm);
                        }
                    }
                    else if ((!isProp) && memberName[0] === 'o' && memberName[1] === 'n') {
                        // Event Handlers
                        // so if the member name starts with "on" and the 3rd characters is
                        // a capital letter, and it's not already a member on the element,
                        // then we're assuming it's an event listener
                        if (memberName[2] === '-') {
                            // on- prefixed events
                            // allows to be explicit about the dom event to listen without any magic
                            // under the hood:
                            // <my-cmp on-click> // listens for "click"
                            // <my-cmp on-Click> // listens for "Click"
                            // <my-cmp on-ionChange> // listens for "ionChange"
                            // <my-cmp on-EVENTS> // listens for "EVENTS"
                            memberName = memberName.slice(3);
                        }
                        else if (isMemberInElement(win, ln)) {
                            // standard event
                            // the JSX attribute could have been "onMouseOver" and the
                            // member name "onmouseover" is on the window's prototype
                            // so let's add the listener "mouseover", which is all lowercased
                            memberName = ln.slice(2);
                        }
                        else {
                            // custom event
                            // the JSX attribute could have been "onMyCustomEvent"
                            // so let's trim off the "on" prefix and lowercase the first character
                            // and add the listener "myCustomEvent"
                            // except for the first character, we keep the event name case
                            memberName = ln[2] + memberName.slice(3);
                        }
                        if (oldValue) {
                            plt.rel(elm, memberName, oldValue, false);
                        }
                        if (newValue) {
                            plt.ael(elm, memberName, newValue, false);
                        }
                    }
                    else {
                        // Set property if it exists and it's not a SVG
                        var isComplex = isComplexType(newValue);
                        if ((isProp || (isComplex && newValue !== null)) && !isSvg) {
                            try {
                                if (!elm.tagName.includes('-')) {
                                    var n = newValue == null ? '' : newValue;
                                    // Workaround for Safari, moving the <input> caret when re-assigning the same valued
                                    if (memberName === 'list') {
                                        isProp = false;
                                        // tslint:disable-next-line: triple-equals
                                    }
                                    else if (oldValue == null || elm[memberName] != n) {
                                        elm[memberName] = n;
                                    }
                                }
                                else {
                                    elm[memberName] = newValue;
                                }
                            }
                            catch (e) { }
                        }
                        /**
                         * Need to manually update attribute if:
                         * - memberName is not an attribute
                         * - if we are rendering the host element in order to reflect attribute
                         * - if it's a SVG, since properties might not work in <svg>
                         * - if the newValue is null/undefined or 'false'.
                         */
                        var xlink = false;
                        {
                            if (ln !== (ln = ln.replace(/^xlink\:?/, ''))) {
                                memberName = ln;
                                xlink = true;
                            }
                        }
                        if (newValue == null || newValue === false) {
                            if (newValue !== false || elm.getAttribute(memberName) === '') {
                                if (xlink) {
                                    elm.removeAttributeNS(XLINK_NS, memberName);
                                }
                                else {
                                    elm.removeAttribute(memberName);
                                }
                            }
                        }
                        else if ((!isProp || flags & 4 /* isHost */ || isSvg) && !isComplex) {
                            newValue = newValue === true ? '' : newValue;
                            if (xlink) {
                                elm.setAttributeNS(XLINK_NS, memberName, newValue);
                            }
                            else {
                                elm.setAttribute(memberName, newValue);
                            }
                        }
                    }
                }
            };
            var parseClassListRegex = /\s/;
            var parseClassList = function (value) { return (!value ? [] : value.split(parseClassListRegex)); };
            var updateElement = function (oldVnode, newVnode, isSvgMode, memberName) {
                // if the element passed in is a shadow root, which is a document fragment
                // then we want to be adding attrs/props to the shadow root's "host" element
                // if it's not a shadow root, then we add attrs/props to the same element
                var elm = newVnode.$elm$.nodeType === 11 /* DocumentFragment */ && newVnode.$elm$.host ? newVnode.$elm$.host : newVnode.$elm$;
                var oldVnodeAttrs = (oldVnode && oldVnode.$attrs$) || EMPTY_OBJ;
                var newVnodeAttrs = newVnode.$attrs$ || EMPTY_OBJ;
                {
                    // remove attributes no longer present on the vnode by setting them to undefined
                    for (memberName in oldVnodeAttrs) {
                        if (!(memberName in newVnodeAttrs)) {
                            setAccessor(elm, memberName, oldVnodeAttrs[memberName], undefined, isSvgMode, newVnode.$flags$);
                        }
                    }
                }
                // add new & update changed attributes
                for (memberName in newVnodeAttrs) {
                    setAccessor(elm, memberName, oldVnodeAttrs[memberName], newVnodeAttrs[memberName], isSvgMode, newVnode.$flags$);
                }
            };
            var createElm = function (oldParentVNode, newParentVNode, childIndex, parentElm) {
                // tslint:disable-next-line: prefer-const
                var newVNode = newParentVNode.$children$[childIndex];
                var i = 0;
                var elm;
                var childNode;
                var oldVNode;
                if (!useNativeShadowDom) {
                    // remember for later we need to check to relocate nodes
                    checkSlotRelocate = true;
                    if (newVNode.$tag$ === 'slot') {
                        if (scopeId) {
                            // scoped css needs to add its scoped id to the parent element
                            parentElm.classList.add(scopeId + '-s');
                        }
                        newVNode.$flags$ |= newVNode.$children$
                            ? // slot element has fallback content
                                2 /* isSlotFallback */
                            : // slot element does not have fallback content
                                1 /* isSlotReference */;
                    }
                }
                if (newVNode.$text$ !== null) {
                    // create text node
                    elm = newVNode.$elm$ = doc.createTextNode(newVNode.$text$);
                }
                else if (newVNode.$flags$ & 1 /* isSlotReference */) {
                    // create a slot reference node
                    elm = newVNode.$elm$ = doc.createTextNode('');
                }
                else {
                    if (!isSvgMode) {
                        isSvgMode = newVNode.$tag$ === 'svg';
                    }
                    // create element
                    elm = newVNode.$elm$ = (doc.createElementNS(isSvgMode ? SVG_NS : HTML_NS, newVNode.$flags$ & 2 /* isSlotFallback */ ? 'slot-fb' : newVNode.$tag$));
                    if (isSvgMode && newVNode.$tag$ === 'foreignObject') {
                        isSvgMode = false;
                    }
                    // add css classes, attrs, props, listeners, etc.
                    {
                        updateElement(null, newVNode, isSvgMode);
                    }
                    if (isDef(scopeId) && elm['s-si'] !== scopeId) {
                        // if there is a scopeId and this is the initial render
                        // then let's add the scopeId as a css class
                        elm.classList.add((elm['s-si'] = scopeId));
                    }
                    if (newVNode.$children$) {
                        for (i = 0; i < newVNode.$children$.length; ++i) {
                            // create the node
                            childNode = createElm(oldParentVNode, newVNode, i, elm);
                            // return node could have been null
                            if (childNode) {
                                // append our new node
                                elm.appendChild(childNode);
                            }
                        }
                    }
                    {
                        if (newVNode.$tag$ === 'svg') {
                            // Only reset the SVG context when we're exiting <svg> element
                            isSvgMode = false;
                        }
                        else if (elm.tagName === 'foreignObject') {
                            // Reenter SVG context when we're exiting <foreignObject> element
                            isSvgMode = true;
                        }
                    }
                }
                {
                    elm['s-hn'] = hostTagName;
                    if (newVNode.$flags$ & (2 /* isSlotFallback */ | 1 /* isSlotReference */)) {
                        // remember the content reference comment
                        elm['s-sr'] = true;
                        // remember the content reference comment
                        elm['s-cr'] = contentRef;
                        // remember the slot name, or empty string for default slot
                        elm['s-sn'] = newVNode.$name$ || '';
                        // check if we've got an old vnode for this slot
                        oldVNode = oldParentVNode && oldParentVNode.$children$ && oldParentVNode.$children$[childIndex];
                        if (oldVNode && oldVNode.$tag$ === newVNode.$tag$ && oldParentVNode.$elm$) {
                            // we've got an old slot vnode and the wrapper is being replaced
                            // so let's move the old slot content back to it's original location
                            putBackInOriginalLocation(oldParentVNode.$elm$, false);
                        }
                    }
                }
                return elm;
            };
            var putBackInOriginalLocation = function (parentElm, recursive) {
                plt.$flags$ |= 1 /* isTmpDisconnected */;
                var oldSlotChildNodes = parentElm.childNodes;
                for (var i = oldSlotChildNodes.length - 1; i >= 0; i--) {
                    var childNode = oldSlotChildNodes[i];
                    if (childNode['s-hn'] !== hostTagName && childNode['s-ol']) {
                        // // this child node in the old element is from another component
                        // // remove this node from the old slot's parent
                        // childNode.remove();
                        // and relocate it back to it's original location
                        parentReferenceNode(childNode).insertBefore(childNode, referenceNode(childNode));
                        // remove the old original location comment entirely
                        // later on the patch function will know what to do
                        // and move this to the correct spot in need be
                        childNode['s-ol'].remove();
                        childNode['s-ol'] = undefined;
                        checkSlotRelocate = true;
                    }
                    if (recursive) {
                        putBackInOriginalLocation(childNode, recursive);
                    }
                }
                plt.$flags$ &= ~1 /* isTmpDisconnected */;
            };
            var addVnodes = function (parentElm, before, parentVNode, vnodes, startIdx, endIdx) {
                var containerElm = ((parentElm['s-cr'] && parentElm['s-cr'].parentNode) || parentElm);
                var childNode;
                if (containerElm.shadowRoot && containerElm.tagName === hostTagName) {
                    containerElm = containerElm.shadowRoot;
                }
                for (; startIdx <= endIdx; ++startIdx) {
                    if (vnodes[startIdx]) {
                        childNode = createElm(null, parentVNode, startIdx, parentElm);
                        if (childNode) {
                            vnodes[startIdx].$elm$ = childNode;
                            containerElm.insertBefore(childNode, referenceNode(before));
                        }
                    }
                }
            };
            var removeVnodes = function (vnodes, startIdx, endIdx, vnode, elm) {
                for (; startIdx <= endIdx; ++startIdx) {
                    if ((vnode = vnodes[startIdx])) {
                        elm = vnode.$elm$;
                        callNodeRefs(vnode);
                        {
                            // we're removing this element
                            // so it's possible we need to show slot fallback content now
                            checkSlotFallbackVisibility = true;
                            if (elm['s-ol']) {
                                // remove the original location comment
                                elm['s-ol'].remove();
                            }
                            else {
                                // it's possible that child nodes of the node
                                // that's being removed are slot nodes
                                putBackInOriginalLocation(elm, true);
                            }
                        }
                        // remove the vnode's element from the dom
                        elm.remove();
                    }
                }
            };
            var updateChildren = function (parentElm, oldCh, newVNode, newCh) {
                var oldStartIdx = 0;
                var newStartIdx = 0;
                var idxInOld = 0;
                var i = 0;
                var oldEndIdx = oldCh.length - 1;
                var oldStartVnode = oldCh[0];
                var oldEndVnode = oldCh[oldEndIdx];
                var newEndIdx = newCh.length - 1;
                var newStartVnode = newCh[0];
                var newEndVnode = newCh[newEndIdx];
                var node;
                var elmToMove;
                while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
                    if (oldStartVnode == null) {
                        // Vnode might have been moved left
                        oldStartVnode = oldCh[++oldStartIdx];
                    }
                    else if (oldEndVnode == null) {
                        oldEndVnode = oldCh[--oldEndIdx];
                    }
                    else if (newStartVnode == null) {
                        newStartVnode = newCh[++newStartIdx];
                    }
                    else if (newEndVnode == null) {
                        newEndVnode = newCh[--newEndIdx];
                    }
                    else if (isSameVnode(oldStartVnode, newStartVnode)) {
                        patch(oldStartVnode, newStartVnode);
                        oldStartVnode = oldCh[++oldStartIdx];
                        newStartVnode = newCh[++newStartIdx];
                    }
                    else if (isSameVnode(oldEndVnode, newEndVnode)) {
                        patch(oldEndVnode, newEndVnode);
                        oldEndVnode = oldCh[--oldEndIdx];
                        newEndVnode = newCh[--newEndIdx];
                    }
                    else if (isSameVnode(oldStartVnode, newEndVnode)) {
                        // Vnode moved right
                        if ((oldStartVnode.$tag$ === 'slot' || newEndVnode.$tag$ === 'slot')) {
                            putBackInOriginalLocation(oldStartVnode.$elm$.parentNode, false);
                        }
                        patch(oldStartVnode, newEndVnode);
                        parentElm.insertBefore(oldStartVnode.$elm$, oldEndVnode.$elm$.nextSibling);
                        oldStartVnode = oldCh[++oldStartIdx];
                        newEndVnode = newCh[--newEndIdx];
                    }
                    else if (isSameVnode(oldEndVnode, newStartVnode)) {
                        // Vnode moved left
                        if ((oldStartVnode.$tag$ === 'slot' || newEndVnode.$tag$ === 'slot')) {
                            putBackInOriginalLocation(oldEndVnode.$elm$.parentNode, false);
                        }
                        patch(oldEndVnode, newStartVnode);
                        parentElm.insertBefore(oldEndVnode.$elm$, oldStartVnode.$elm$);
                        oldEndVnode = oldCh[--oldEndIdx];
                        newStartVnode = newCh[++newStartIdx];
                    }
                    else {
                        // createKeyToOldIdx
                        idxInOld = -1;
                        {
                            for (i = oldStartIdx; i <= oldEndIdx; ++i) {
                                if (oldCh[i] && oldCh[i].$key$ !== null && oldCh[i].$key$ === newStartVnode.$key$) {
                                    idxInOld = i;
                                    break;
                                }
                            }
                        }
                        if (idxInOld >= 0) {
                            elmToMove = oldCh[idxInOld];
                            if (elmToMove.$tag$ !== newStartVnode.$tag$) {
                                node = createElm(oldCh && oldCh[newStartIdx], newVNode, idxInOld, parentElm);
                            }
                            else {
                                patch(elmToMove, newStartVnode);
                                oldCh[idxInOld] = undefined;
                                node = elmToMove.$elm$;
                            }
                            newStartVnode = newCh[++newStartIdx];
                        }
                        else {
                            // new element
                            node = createElm(oldCh && oldCh[newStartIdx], newVNode, newStartIdx, parentElm);
                            newStartVnode = newCh[++newStartIdx];
                        }
                        if (node) {
                            {
                                parentReferenceNode(oldStartVnode.$elm$).insertBefore(node, referenceNode(oldStartVnode.$elm$));
                            }
                        }
                    }
                }
                if (oldStartIdx > oldEndIdx) {
                    addVnodes(parentElm, newCh[newEndIdx + 1] == null ? null : newCh[newEndIdx + 1].$elm$, newVNode, newCh, newStartIdx, newEndIdx);
                }
                else if (newStartIdx > newEndIdx) {
                    removeVnodes(oldCh, oldStartIdx, oldEndIdx);
                }
            };
            var isSameVnode = function (vnode1, vnode2) {
                // compare if two vnode to see if they're "technically" the same
                // need to have the same element tag, and same key to be the same
                if (vnode1.$tag$ === vnode2.$tag$) {
                    if (vnode1.$tag$ === 'slot') {
                        return vnode1.$name$ === vnode2.$name$;
                    }
                    {
                        return vnode1.$key$ === vnode2.$key$;
                    }
                }
                return false;
            };
            var referenceNode = function (node) {
                // this node was relocated to a new location in the dom
                // because of some other component's slot
                // but we still have an html comment in place of where
                // it's original location was according to it's original vdom
                return (node && node['s-ol']) || node;
            };
            var parentReferenceNode = function (node) { return (node['s-ol'] ? node['s-ol'] : node).parentNode; };
            var patch = function (oldVNode, newVNode) {
                var elm = (newVNode.$elm$ = oldVNode.$elm$);
                var oldChildren = oldVNode.$children$;
                var newChildren = newVNode.$children$;
                var tag = newVNode.$tag$;
                var text = newVNode.$text$;
                var defaultHolder;
                if (text === null) {
                    {
                        // test if we're rendering an svg element, or still rendering nodes inside of one
                        // only add this to the when the compiler sees we're using an svg somewhere
                        isSvgMode = tag === 'svg' ? true : tag === 'foreignObject' ? false : isSvgMode;
                    }
                    // element node
                    {
                        if (tag === 'slot')
                            ;
                        else {
                            // either this is the first render of an element OR it's an update
                            // AND we already know it's possible it could have changed
                            // this updates the element's css classes, attrs, props, listeners, etc.
                            updateElement(oldVNode, newVNode, isSvgMode);
                        }
                    }
                    if (oldChildren !== null && newChildren !== null) {
                        // looks like there's child vnodes for both the old and new vnodes
                        updateChildren(elm, oldChildren, newVNode, newChildren);
                    }
                    else if (newChildren !== null) {
                        // no old child vnodes, but there are new child vnodes to add
                        if (oldVNode.$text$ !== null) {
                            // the old vnode was text, so be sure to clear it out
                            elm.textContent = '';
                        }
                        // add the new vnode children
                        addVnodes(elm, null, newVNode, newChildren, 0, newChildren.length - 1);
                    }
                    else if (oldChildren !== null) {
                        // no new child vnodes, but there are old child vnodes to remove
                        removeVnodes(oldChildren, 0, oldChildren.length - 1);
                    }
                    if (isSvgMode && tag === 'svg') {
                        isSvgMode = false;
                    }
                }
                else if ((defaultHolder = elm['s-cr'])) {
                    // this element has slotted content
                    defaultHolder.parentNode.textContent = text;
                }
                else if (oldVNode.$text$ !== text) {
                    // update the text content for the text only vnode
                    // and also only if the text is different than before
                    elm.data = text;
                }
            };
            var updateFallbackSlotVisibility = function (elm) {
                // tslint:disable-next-line: prefer-const
                var childNodes = elm.childNodes;
                var childNode;
                var i;
                var ilen;
                var j;
                var slotNameAttr;
                var nodeType;
                for (i = 0, ilen = childNodes.length; i < ilen; i++) {
                    childNode = childNodes[i];
                    if (childNode.nodeType === 1 /* ElementNode */) {
                        if (childNode['s-sr']) {
                            // this is a slot fallback node
                            // get the slot name for this slot reference node
                            slotNameAttr = childNode['s-sn'];
                            // by default always show a fallback slot node
                            // then hide it if there are other slots in the light dom
                            childNode.hidden = false;
                            for (j = 0; j < ilen; j++) {
                                if (childNodes[j]['s-hn'] !== childNode['s-hn']) {
                                    // this sibling node is from a different component
                                    nodeType = childNodes[j].nodeType;
                                    if (slotNameAttr !== '') {
                                        // this is a named fallback slot node
                                        if (nodeType === 1 /* ElementNode */ && slotNameAttr === childNodes[j].getAttribute('slot')) {
                                            childNode.hidden = true;
                                            break;
                                        }
                                    }
                                    else {
                                        // this is a default fallback slot node
                                        // any element or text node (with content)
                                        // should hide the default fallback slot node
                                        if (nodeType === 1 /* ElementNode */ || (nodeType === 3 /* TextNode */ && childNodes[j].textContent.trim() !== '')) {
                                            childNode.hidden = true;
                                            break;
                                        }
                                    }
                                }
                            }
                        }
                        // keep drilling down
                        updateFallbackSlotVisibility(childNode);
                    }
                }
            };
            var relocateNodes = [];
            var relocateSlotContent = function (elm) {
                // tslint:disable-next-line: prefer-const
                var childNode;
                var node;
                var hostContentNodes;
                var slotNameAttr;
                var relocateNodeData;
                var j;
                var i = 0;
                var childNodes = elm.childNodes;
                var ilen = childNodes.length;
                for (; i < ilen; i++) {
                    childNode = childNodes[i];
                    if (childNode['s-sr'] && (node = childNode['s-cr'])) {
                        // first got the content reference comment node
                        // then we got it's parent, which is where all the host content is in now
                        hostContentNodes = node.parentNode.childNodes;
                        slotNameAttr = childNode['s-sn'];
                        for (j = hostContentNodes.length - 1; j >= 0; j--) {
                            node = hostContentNodes[j];
                            if (!node['s-cn'] && !node['s-nr'] && node['s-hn'] !== childNode['s-hn']) {
                                // let's do some relocating to its new home
                                // but never relocate a content reference node
                                // that is suppose to always represent the original content location
                                if (isNodeLocatedInSlot(node, slotNameAttr)) {
                                    // it's possible we've already decided to relocate this node
                                    relocateNodeData = relocateNodes.find(function (r) { return r.$nodeToRelocate$ === node; });
                                    // made some changes to slots
                                    // let's make sure we also double check
                                    // fallbacks are correctly hidden or shown
                                    checkSlotFallbackVisibility = true;
                                    node['s-sn'] = node['s-sn'] || slotNameAttr;
                                    if (relocateNodeData) {
                                        // previously we never found a slot home for this node
                                        // but turns out we did, so let's remember it now
                                        relocateNodeData.$slotRefNode$ = childNode;
                                    }
                                    else {
                                        // add to our list of nodes to relocate
                                        relocateNodes.push({
                                            $slotRefNode$: childNode,
                                            $nodeToRelocate$: node,
                                        });
                                    }
                                    if (node['s-sr']) {
                                        relocateNodes.map(function (relocateNode) {
                                            if (isNodeLocatedInSlot(relocateNode.$nodeToRelocate$, node['s-sn'])) {
                                                relocateNodeData = relocateNodes.find(function (r) { return r.$nodeToRelocate$ === node; });
                                                if (relocateNodeData && !relocateNode.$slotRefNode$) {
                                                    relocateNode.$slotRefNode$ = relocateNodeData.$slotRefNode$;
                                                }
                                            }
                                        });
                                    }
                                }
                                else if (!relocateNodes.some(function (r) { return r.$nodeToRelocate$ === node; })) {
                                    // so far this element does not have a slot home, not setting slotRefNode on purpose
                                    // if we never find a home for this element then we'll need to hide it
                                    relocateNodes.push({
                                        $nodeToRelocate$: node,
                                    });
                                }
                            }
                        }
                    }
                    if (childNode.nodeType === 1 /* ElementNode */) {
                        relocateSlotContent(childNode);
                    }
                }
            };
            var isNodeLocatedInSlot = function (nodeToRelocate, slotNameAttr) {
                if (nodeToRelocate.nodeType === 1 /* ElementNode */) {
                    if (nodeToRelocate.getAttribute('slot') === null && slotNameAttr === '') {
                        return true;
                    }
                    if (nodeToRelocate.getAttribute('slot') === slotNameAttr) {
                        return true;
                    }
                    return false;
                }
                if (nodeToRelocate['s-sn'] === slotNameAttr) {
                    return true;
                }
                return slotNameAttr === '';
            };
            var callNodeRefs = function (vNode) {
                {
                    vNode.$attrs$ && vNode.$attrs$.ref && vNode.$attrs$.ref(null);
                    vNode.$children$ && vNode.$children$.map(callNodeRefs);
                }
            };
            var renderVdom = function (hostRef, renderFnResults) {
                var hostElm = hostRef.$hostElement$;
                var cmpMeta = hostRef.$cmpMeta$;
                var oldVNode = hostRef.$vnode$ || newVNode(null, null);
                var rootVnode = isHost(renderFnResults) ? renderFnResults : h(null, null, renderFnResults);
                hostTagName = hostElm.tagName;
                if (cmpMeta.$attrsToReflect$) {
                    rootVnode.$attrs$ = rootVnode.$attrs$ || {};
                    cmpMeta.$attrsToReflect$.map(function (_a) {
                        var propName = _a[0], attribute = _a[1];
                        return (rootVnode.$attrs$[attribute] = hostElm[propName]);
                    });
                }
                rootVnode.$tag$ = null;
                rootVnode.$flags$ |= 4 /* isHost */;
                hostRef.$vnode$ = rootVnode;
                rootVnode.$elm$ = oldVNode.$elm$ = (hostElm.shadowRoot || hostElm);
                {
                    scopeId = hostElm['s-sc'];
                }
                {
                    contentRef = hostElm['s-cr'];
                    useNativeShadowDom = supportsShadow && (cmpMeta.$flags$ & 1 /* shadowDomEncapsulation */) !== 0;
                    // always reset
                    checkSlotFallbackVisibility = false;
                }
                // synchronous patch
                patch(oldVNode, rootVnode);
                {
                    // while we're moving nodes around existing nodes, temporarily disable
                    // the disconnectCallback from working
                    plt.$flags$ |= 1 /* isTmpDisconnected */;
                    if (checkSlotRelocate) {
                        relocateSlotContent(rootVnode.$elm$);
                        var relocateData = void 0;
                        var nodeToRelocate = void 0;
                        var orgLocationNode = void 0;
                        var parentNodeRef = void 0;
                        var insertBeforeNode = void 0;
                        var refNode = void 0;
                        var i = 0;
                        for (; i < relocateNodes.length; i++) {
                            relocateData = relocateNodes[i];
                            nodeToRelocate = relocateData.$nodeToRelocate$;
                            if (!nodeToRelocate['s-ol']) {
                                // add a reference node marking this node's original location
                                // keep a reference to this node for later lookups
                                orgLocationNode = doc.createTextNode('');
                                orgLocationNode['s-nr'] = nodeToRelocate;
                                nodeToRelocate.parentNode.insertBefore((nodeToRelocate['s-ol'] = orgLocationNode), nodeToRelocate);
                            }
                        }
                        for (i = 0; i < relocateNodes.length; i++) {
                            relocateData = relocateNodes[i];
                            nodeToRelocate = relocateData.$nodeToRelocate$;
                            if (relocateData.$slotRefNode$) {
                                // by default we're just going to insert it directly
                                // after the slot reference node
                                parentNodeRef = relocateData.$slotRefNode$.parentNode;
                                insertBeforeNode = relocateData.$slotRefNode$.nextSibling;
                                orgLocationNode = nodeToRelocate['s-ol'];
                                while ((orgLocationNode = orgLocationNode.previousSibling)) {
                                    refNode = orgLocationNode['s-nr'];
                                    if (refNode && refNode['s-sn'] === nodeToRelocate['s-sn'] && parentNodeRef === refNode.parentNode) {
                                        refNode = refNode.nextSibling;
                                        if (!refNode || !refNode['s-nr']) {
                                            insertBeforeNode = refNode;
                                            break;
                                        }
                                    }
                                }
                                if ((!insertBeforeNode && parentNodeRef !== nodeToRelocate.parentNode) || nodeToRelocate.nextSibling !== insertBeforeNode) {
                                    // we've checked that it's worth while to relocate
                                    // since that the node to relocate
                                    // has a different next sibling or parent relocated
                                    if (nodeToRelocate !== insertBeforeNode) {
                                        if (!nodeToRelocate['s-hn'] && nodeToRelocate['s-ol']) {
                                            // probably a component in the index.html that doesn't have it's hostname set
                                            nodeToRelocate['s-hn'] = nodeToRelocate['s-ol'].parentNode.nodeName;
                                        }
                                        // add it back to the dom but in its new home
                                        parentNodeRef.insertBefore(nodeToRelocate, insertBeforeNode);
                                    }
                                }
                            }
                            else {
                                // this node doesn't have a slot home to go to, so let's hide it
                                if (nodeToRelocate.nodeType === 1 /* ElementNode */) {
                                    nodeToRelocate.hidden = true;
                                }
                            }
                        }
                    }
                    if (checkSlotFallbackVisibility) {
                        updateFallbackSlotVisibility(rootVnode.$elm$);
                    }
                    // done moving nodes around
                    // allow the disconnect callback to work again
                    plt.$flags$ &= ~1 /* isTmpDisconnected */;
                    // always reset
                    relocateNodes.length = 0;
                }
            };
            var getElement = exports('g', function (ref) { return (getHostRef(ref).$hostElement$); });
            var createEvent = exports('c', function (ref, name, flags) {
                var elm = getElement(ref);
                return {
                    emit: function (detail) {
                        return emitEvent(elm, name, {
                            bubbles: !!(flags & 4 /* Bubbles */),
                            composed: !!(flags & 2 /* Composed */),
                            cancelable: !!(flags & 1 /* Cancellable */),
                            detail: detail,
                        });
                    },
                };
            });
            var emitEvent = function (elm, name, opts) {
                var ev = plt.ce(name, opts);
                elm.dispatchEvent(ev);
                return ev;
            };
            var attachToAncestor = function (hostRef, ancestorComponent) {
                if (ancestorComponent && !hostRef.$onRenderResolve$ && ancestorComponent['s-p']) {
                    ancestorComponent['s-p'].push(new Promise(function (r) { return (hostRef.$onRenderResolve$ = r); }));
                }
            };
            var scheduleUpdate = function (hostRef, isInitialLoad) {
                {
                    hostRef.$flags$ |= 16 /* isQueuedForUpdate */;
                }
                if (hostRef.$flags$ & 4 /* isWaitingForChildren */) {
                    hostRef.$flags$ |= 512 /* needsRerender */;
                    return;
                }
                attachToAncestor(hostRef, hostRef.$ancestorComponent$);
                // there is no ancestorc omponent or the ancestor component
                // has already fired off its lifecycle update then
                // fire off the initial update
                var dispatch = function () { return dispatchHooks(hostRef, isInitialLoad); };
                return writeTask(dispatch);
            };
            var dispatchHooks = function (hostRef, isInitialLoad) {
                var endSchedule = createTime('scheduleUpdate', hostRef.$cmpMeta$.$tagName$);
                var instance = hostRef.$lazyInstance$;
                var promise;
                if (isInitialLoad) {
                    {
                        hostRef.$flags$ |= 256 /* isListenReady */;
                        if (hostRef.$queuedListeners$) {
                            hostRef.$queuedListeners$.map(function (_a) {
                                var methodName = _a[0], event = _a[1];
                                return safeCall(instance, methodName, event);
                            });
                            hostRef.$queuedListeners$ = null;
                        }
                    }
                    {
                        promise = safeCall(instance, 'componentWillLoad');
                    }
                }
                endSchedule();
                return then(promise, function () { return updateComponent(hostRef, instance, isInitialLoad); });
            };
            var updateComponent = function (hostRef, instance, isInitialLoad) {
                // updateComponent
                var elm = hostRef.$hostElement$;
                var endUpdate = createTime('update', hostRef.$cmpMeta$.$tagName$);
                var rc = elm['s-rc'];
                if (isInitialLoad) {
                    // DOM WRITE!
                    attachStyles(hostRef);
                }
                var endRender = createTime('render', hostRef.$cmpMeta$.$tagName$);
                {
                    {
                        // looks like we've got child nodes to render into this host element
                        // or we need to update the css class/attrs on the host element
                        // DOM WRITE!
                        renderVdom(hostRef, callRender(hostRef, instance));
                    }
                }
                if (plt.$cssShim$) {
                    plt.$cssShim$.updateHost(elm);
                }
                if (rc) {
                    // ok, so turns out there are some child host elements
                    // waiting on this parent element to load
                    // let's fire off all update callbacks waiting
                    rc.map(function (cb) { return cb(); });
                    elm['s-rc'] = undefined;
                }
                endRender();
                endUpdate();
                {
                    var childrenPromises = elm['s-p'];
                    var postUpdate = function () { return postUpdateComponent(hostRef); };
                    if (childrenPromises.length === 0) {
                        postUpdate();
                    }
                    else {
                        Promise.all(childrenPromises).then(postUpdate);
                        hostRef.$flags$ |= 4 /* isWaitingForChildren */;
                        childrenPromises.length = 0;
                    }
                }
            };
            var callRender = function (hostRef, instance) {
                try {
                    instance = instance.render();
                    {
                        hostRef.$flags$ &= ~16 /* isQueuedForUpdate */;
                    }
                    {
                        hostRef.$flags$ |= 2 /* hasRendered */;
                    }
                }
                catch (e) {
                    consoleError(e);
                }
                return instance;
            };
            var postUpdateComponent = function (hostRef) {
                var tagName = hostRef.$cmpMeta$.$tagName$;
                var elm = hostRef.$hostElement$;
                var endPostUpdate = createTime('postUpdate', tagName);
                var instance = hostRef.$lazyInstance$;
                var ancestorComponent = hostRef.$ancestorComponent$;
                if (!(hostRef.$flags$ & 64 /* hasLoadedComponent */)) {
                    hostRef.$flags$ |= 64 /* hasLoadedComponent */;
                    {
                        // DOM WRITE!
                        addHydratedFlag(elm);
                    }
                    {
                        safeCall(instance, 'componentDidLoad');
                    }
                    endPostUpdate();
                    {
                        hostRef.$onReadyResolve$(elm);
                        if (!ancestorComponent) {
                            appDidLoad();
                        }
                    }
                }
                else {
                    {
                        safeCall(instance, 'componentDidUpdate');
                    }
                    endPostUpdate();
                }
                // load events fire from bottom to top
                // the deepest elements load first then bubbles up
                {
                    if (hostRef.$onRenderResolve$) {
                        hostRef.$onRenderResolve$();
                        hostRef.$onRenderResolve$ = undefined;
                    }
                    if (hostRef.$flags$ & 512 /* needsRerender */) {
                        nextTick(function () { return scheduleUpdate(hostRef, false); });
                    }
                    hostRef.$flags$ &= ~(4 /* isWaitingForChildren */ | 512 /* needsRerender */);
                }
                // ( •_•)
                // ( •_•)>⌐■-■
                // (⌐■_■)
            };
            var forceUpdate = function (ref) {
                {
                    var hostRef = getHostRef(ref);
                    var isConnected = hostRef.$hostElement$.isConnected;
                    if (isConnected && (hostRef.$flags$ & (2 /* hasRendered */ | 16 /* isQueuedForUpdate */)) === 2 /* hasRendered */) {
                        scheduleUpdate(hostRef, false);
                    }
                    // Returns "true" when the forced update was successfully scheduled
                    return isConnected;
                }
            };
            var appDidLoad = function (who) {
                // on appload
                // we have finish the first big initial render
                {
                    addHydratedFlag(doc.documentElement);
                }
                {
                    plt.$flags$ |= 2 /* appLoaded */;
                }
                nextTick(function () { return emitEvent(win, 'appload', { detail: { namespace: NAMESPACE } }); });
            };
            var safeCall = function (instance, method, arg) {
                if (instance && instance[method]) {
                    try {
                        return instance[method](arg);
                    }
                    catch (e) {
                        consoleError(e);
                    }
                }
                return undefined;
            };
            var then = function (promise, thenFn) {
                return promise && promise.then ? promise.then(thenFn) : thenFn();
            };
            var addHydratedFlag = function (elm) { return (elm.classList.add('hydrated')); };
            var parsePropertyValue = function (propValue, propType) {
                // ensure this value is of the correct prop type
                if (propValue != null && !isComplexType(propValue)) {
                    if (propType & 4 /* Boolean */) {
                        // per the HTML spec, any string value means it is a boolean true value
                        // but we'll cheat here and say that the string "false" is the boolean false
                        return propValue === 'false' ? false : propValue === '' || !!propValue;
                    }
                    if (propType & 2 /* Number */) {
                        // force it to be a number
                        return parseFloat(propValue);
                    }
                    if (propType & 1 /* String */) {
                        // could have been passed as a number or boolean
                        // but we still want it as a string
                        return String(propValue);
                    }
                    // redundant return here for better minification
                    return propValue;
                }
                // not sure exactly what type we want
                // so no need to change to a different type
                return propValue;
            };
            var getValue = function (ref, propName) { return getHostRef(ref).$instanceValues$.get(propName); };
            var setValue = function (ref, propName, newVal, cmpMeta) {
                // check our new property value against our internal value
                var hostRef = getHostRef(ref);
                var oldVal = hostRef.$instanceValues$.get(propName);
                var flags = hostRef.$flags$;
                var instance = hostRef.$lazyInstance$;
                newVal = parsePropertyValue(newVal, cmpMeta.$members$[propName][0]);
                if ((!(flags & 8 /* isConstructingInstance */) || oldVal === undefined) && newVal !== oldVal) {
                    // gadzooks! the property's value has changed!!
                    // set our new value!
                    hostRef.$instanceValues$.set(propName, newVal);
                    if (instance) {
                        // get an array of method names of watch functions to call
                        if (cmpMeta.$watchers$ && flags & 128 /* isWatchReady */) {
                            var watchMethods = cmpMeta.$watchers$[propName];
                            if (watchMethods) {
                                // this instance is watching for when this property changed
                                watchMethods.map(function (watchMethodName) {
                                    try {
                                        // fire off each of the watch methods that are watching this property
                                        instance[watchMethodName](newVal, oldVal, propName);
                                    }
                                    catch (e) {
                                        consoleError(e);
                                    }
                                });
                            }
                        }
                        if ((flags & (2 /* hasRendered */ | 16 /* isQueuedForUpdate */)) === 2 /* hasRendered */) {
                            // looks like this value actually changed, so we've got work to do!
                            // but only if we've already rendered, otherwise just chill out
                            // queue that we need to do an update, but don't worry about queuing
                            // up millions cuz this function ensures it only runs once
                            scheduleUpdate(hostRef, false);
                        }
                    }
                }
            };
            var proxyComponent = function (Cstr, cmpMeta, flags) {
                if (cmpMeta.$members$) {
                    if (Cstr.watchers) {
                        cmpMeta.$watchers$ = Cstr.watchers;
                    }
                    // It's better to have a const than two Object.entries()
                    var members = Object.entries(cmpMeta.$members$);
                    var prototype_1 = Cstr.prototype;
                    members.map(function (_a) {
                        var memberName = _a[0], memberFlags = _a[1][0];
                        if ((memberFlags & 31 /* Prop */ || ((flags & 2 /* proxyState */) && memberFlags & 32 /* State */))) {
                            // proxyComponent - prop
                            Object.defineProperty(prototype_1, memberName, {
                                get: function () {
                                    // proxyComponent, get value
                                    return getValue(this, memberName);
                                },
                                set: function (newValue) {
                                    // proxyComponent, set value
                                    setValue(this, memberName, newValue, cmpMeta);
                                },
                                configurable: true,
                                enumerable: true,
                            });
                        }
                    });
                    if ((flags & 1 /* isElementConstructor */)) {
                        var attrNameToPropName_1 = new Map();
                        prototype_1.attributeChangedCallback = function (attrName, _oldValue, newValue) {
                            var _this = this;
                            plt.jmp(function () {
                                var propName = attrNameToPropName_1.get(attrName);
                                _this[propName] = newValue === null && typeof _this[propName] === 'boolean' ? false : newValue;
                            });
                        };
                        // create an array of attributes to observe
                        // and also create a map of html attribute name to js property name
                        Cstr.observedAttributes = members
                            .filter(function (_a) {
                            var _ = _a[0], m = _a[1];
                            return m[0] & 15;
                        } /* HasAttribute */) // filter to only keep props that should match attributes
                            .map(function (_a) {
                            var propName = _a[0], m = _a[1];
                            var attrName = m[1] || propName;
                            attrNameToPropName_1.set(attrName, propName);
                            if (m[0] & 512 /* ReflectAttr */) {
                                cmpMeta.$attrsToReflect$.push([propName, attrName]);
                            }
                            return attrName;
                        });
                    }
                }
                return Cstr;
            };
            var initializeComponent = function (elm, hostRef, cmpMeta, hmrVersionId, Cstr) { return __awaiter(_this, void 0, void 0, function () {
                var endLoad, endNewInstance, style_1, scopeId_1, endRegisterStyles, ancestorComponent, schedule;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!((hostRef.$flags$ & 32 /* hasInitializedComponent */) === 0)) return [3 /*break*/, 5];
                            // we haven't initialized this element yet
                            hostRef.$flags$ |= 32 /* hasInitializedComponent */;
                            // lazy loaded components
                            // request the component's implementation to be
                            // wired up with the host element
                            Cstr = loadModule(cmpMeta);
                            if (!Cstr.then) return [3 /*break*/, 2];
                            endLoad = uniqueTime();
                            return [4 /*yield*/, Cstr];
                        case 1:
                            Cstr = _a.sent();
                            endLoad();
                            _a.label = 2;
                        case 2:
                            if (!Cstr.isProxied) {
                                // we'eve never proxied this Constructor before
                                // let's add the getters/setters to its prototype before
                                // the first time we create an instance of the implementation
                                {
                                    cmpMeta.$watchers$ = Cstr.watchers;
                                }
                                proxyComponent(Cstr, cmpMeta, 2 /* proxyState */);
                                Cstr.isProxied = true;
                            }
                            endNewInstance = createTime('createInstance', cmpMeta.$tagName$);
                            // ok, time to construct the instance
                            // but let's keep track of when we start and stop
                            // so that the getters/setters don't incorrectly step on data
                            {
                                hostRef.$flags$ |= 8 /* isConstructingInstance */;
                            }
                            // construct the lazy-loaded component implementation
                            // passing the hostRef is very important during
                            // construction in order to directly wire together the
                            // host element and the lazy-loaded instance
                            try {
                                new Cstr(hostRef);
                            }
                            catch (e) {
                                consoleError(e);
                            }
                            {
                                hostRef.$flags$ &= ~8 /* isConstructingInstance */;
                            }
                            {
                                hostRef.$flags$ |= 128 /* isWatchReady */;
                            }
                            endNewInstance();
                            if (!Cstr.style) return [3 /*break*/, 5];
                            style_1 = Cstr.style;
                            scopeId_1 = getScopeId(cmpMeta);
                            if (!!styles.has(scopeId_1)) return [3 /*break*/, 5];
                            endRegisterStyles = createTime('registerStyles', cmpMeta.$tagName$);
                            if (!(cmpMeta.$flags$ & 8) /* needsShadowDomShim */) return [3 /*break*/, 4]; /* needsShadowDomShim */
                            return [4 /*yield*/, module.import('./p-13ab242f.system.js').then(function (m) { return m.scopeCss(style_1, scopeId_1, false); })];
                        case 3:
                            style_1 = _a.sent();
                            _a.label = 4;
                        case 4:
                            registerStyle(scopeId_1, style_1, !!(cmpMeta.$flags$ & 1 /* shadowDomEncapsulation */));
                            endRegisterStyles();
                            _a.label = 5;
                        case 5:
                            ancestorComponent = hostRef.$ancestorComponent$;
                            schedule = function () { return scheduleUpdate(hostRef, true); };
                            if (ancestorComponent && ancestorComponent['s-rc']) {
                                // this is the intial load and this component it has an ancestor component
                                // but the ancestor component has NOT fired its will update lifecycle yet
                                // so let's just cool our jets and wait for the ancestor to continue first
                                // this will get fired off when the ancestor component
                                // finally gets around to rendering its lazy self
                                // fire off the initial update
                                ancestorComponent['s-rc'].push(schedule);
                            }
                            else {
                                schedule();
                            }
                            return [2 /*return*/];
                    }
                });
            }); };
            var connectedCallback = function (elm) {
                if ((plt.$flags$ & 1 /* isTmpDisconnected */) === 0) {
                    var hostRef_1 = getHostRef(elm);
                    var cmpMeta_1 = hostRef_1.$cmpMeta$;
                    var endConnected = createTime('connectedCallback', cmpMeta_1.$tagName$);
                    if (!(hostRef_1.$flags$ & 1 /* hasConnected */)) {
                        // first time this component has connected
                        hostRef_1.$flags$ |= 1 /* hasConnected */;
                        {
                            // initUpdate
                            // if the slot polyfill is required we'll need to put some nodes
                            // in here to act as original content anchors as we move nodes around
                            // host element has been connected to the DOM
                            if ((cmpMeta_1.$flags$ & (4 /* hasSlotRelocation */ | 8 /* needsShadowDomShim */))) {
                                setContentReference(elm);
                            }
                        }
                        {
                            // find the first ancestor component (if there is one) and register
                            // this component as one of the actively loading child components for its ancestor
                            var ancestorComponent = elm;
                            while ((ancestorComponent = ancestorComponent.parentNode || ancestorComponent.host)) {
                                // climb up the ancestors looking for the first
                                // component that hasn't finished its lifecycle update yet
                                if (ancestorComponent['s-p']) {
                                    // we found this components first ancestor component
                                    // keep a reference to this component's ancestor component
                                    attachToAncestor(hostRef_1, (hostRef_1.$ancestorComponent$ = ancestorComponent));
                                    break;
                                }
                            }
                        }
                        // Lazy properties
                        // https://developers.google.com/web/fundamentals/web-components/best-practices#lazy-properties
                        if (cmpMeta_1.$members$) {
                            Object.entries(cmpMeta_1.$members$).map(function (_a) {
                                var memberName = _a[0], memberFlags = _a[1][0];
                                if (memberFlags & 31 /* Prop */ && elm.hasOwnProperty(memberName)) {
                                    var value = elm[memberName];
                                    delete elm[memberName];
                                    elm[memberName] = value;
                                }
                            });
                        }
                        {
                            // connectedCallback, taskQueue, initialLoad
                            // angular sets attribute AFTER connectCallback
                            // https://github.com/angular/angular/issues/18909
                            // https://github.com/angular/angular/issues/19940
                            nextTick(function () { return initializeComponent(elm, hostRef_1, cmpMeta_1); });
                        }
                    }
                    else {
                        // not the first time this has connected
                        // reattach any event listeners to the host
                        // since they would have been removed when disconnected
                        addHostEventListeners(elm, hostRef_1, cmpMeta_1.$listeners$);
                    }
                    endConnected();
                }
            };
            var setContentReference = function (elm) {
                // only required when we're NOT using native shadow dom (slot)
                // or this browser doesn't support native shadow dom
                // and this host element was NOT created with SSR
                // let's pick out the inner content for slot projection
                // create a node to represent where the original
                // content was first placed, which is useful later on
                var contentRefElm = (elm['s-cr'] = doc.createComment(''));
                contentRefElm['s-cn'] = true;
                elm.insertBefore(contentRefElm, elm.firstChild);
            };
            var disconnectedCallback = function (elm) {
                if ((plt.$flags$ & 1 /* isTmpDisconnected */) === 0) {
                    var hostRef = getHostRef(elm);
                    {
                        if (hostRef.$rmListeners$) {
                            hostRef.$rmListeners$.map(function (rmListener) { return rmListener(); });
                            hostRef.$rmListeners$ = undefined;
                        }
                    }
                    // clear CSS var-shim tracking
                    if (plt.$cssShim$) {
                        plt.$cssShim$.removeHost(elm);
                    }
                }
            };
            var bootstrapLazy = exports('b', function (lazyBundles, options) {
                if (options === void 0) { options = {}; }
                var endBootstrap = createTime();
                var cmpTags = [];
                var exclude = options.exclude || [];
                var customElements = win.customElements;
                var head = doc.head;
                var metaCharset = /*@__PURE__*/ head.querySelector('meta[charset]');
                var visibilityStyle = /*@__PURE__*/ doc.createElement('style');
                var deferredConnectedCallbacks = [];
                var appLoadFallback;
                var isBootstrapping = true;
                Object.assign(plt, options);
                plt.$resourcesUrl$ = new URL(options.resourcesUrl || './', doc.baseURI).href;
                {
                    if (options.syncQueue) {
                        plt.$flags$ |= 4 /* queueSync */;
                    }
                }
                lazyBundles.map(function (lazyBundle) { return lazyBundle[1].map(function (compactMeta) {
                    var cmpMeta = {
                        $flags$: compactMeta[0],
                        $tagName$: compactMeta[1],
                        $members$: compactMeta[2],
                        $listeners$: compactMeta[3],
                    };
                    {
                        cmpMeta.$members$ = compactMeta[2];
                    }
                    {
                        cmpMeta.$listeners$ = compactMeta[3];
                    }
                    {
                        cmpMeta.$attrsToReflect$ = [];
                    }
                    {
                        cmpMeta.$watchers$ = {};
                    }
                    if (!supportsShadow && cmpMeta.$flags$ & 1 /* shadowDomEncapsulation */) {
                        cmpMeta.$flags$ |= 8 /* needsShadowDomShim */;
                    }
                    var tagName = cmpMeta.$tagName$;
                    var HostElement = /** @class */ (function (_super) {
                        __extends(HostElement, _super);
                        // StencilLazyHost
                        function HostElement(self) {
                            var _this = 
                            // @ts-ignore
                            _super.call(this, self) || this;
                            self = _this;
                            registerHost(self, cmpMeta);
                            if (cmpMeta.$flags$ & 1 /* shadowDomEncapsulation */) {
                                // this component is using shadow dom
                                // and this browser supports shadow dom
                                // add the read-only property "shadowRoot" to the host element
                                // adding the shadow root build conditionals to minimize runtime
                                if (supportsShadow) {
                                    {
                                        self.attachShadow({ mode: 'open' });
                                    }
                                }
                                else if (!('shadowRoot' in self)) {
                                    self.shadowRoot = self;
                                }
                            }
                            return _this;
                        }
                        HostElement.prototype.connectedCallback = function () {
                            var _this = this;
                            if (appLoadFallback) {
                                clearTimeout(appLoadFallback);
                                appLoadFallback = null;
                            }
                            if (isBootstrapping) {
                                // connectedCallback will be processed once all components have been registered
                                deferredConnectedCallbacks.push(this);
                            }
                            else {
                                plt.jmp(function () { return connectedCallback(_this); });
                            }
                        };
                        HostElement.prototype.disconnectedCallback = function () {
                            var _this = this;
                            plt.jmp(function () { return disconnectedCallback(_this); });
                        };
                        HostElement.prototype.forceUpdate = function () {
                            forceUpdate(this);
                        };
                        HostElement.prototype.componentOnReady = function () {
                            return getHostRef(this).$onReadyPromise$;
                        };
                        return HostElement;
                    }(HTMLElement));
                    cmpMeta.$lazyBundleId$ = lazyBundle[0];
                    if (!exclude.includes(tagName) && !customElements.get(tagName)) {
                        cmpTags.push(tagName);
                        customElements.define(tagName, proxyComponent(HostElement, cmpMeta, 1 /* isElementConstructor */));
                    }
                }); });
                {
                    visibilityStyle.innerHTML = cmpTags + HYDRATED_CSS;
                    visibilityStyle.setAttribute('data-styles', '');
                    head.insertBefore(visibilityStyle, metaCharset ? metaCharset.nextSibling : head.firstChild);
                }
                // Process deferred connectedCallbacks now all components have been registered
                isBootstrapping = false;
                if (deferredConnectedCallbacks.length) {
                    deferredConnectedCallbacks.map(function (host) { return host.connectedCallback(); });
                }
                else {
                    {
                        plt.jmp(function () { return (appLoadFallback = setTimeout(appDidLoad, 30)); });
                    }
                }
                // Fallback appLoad event
                endBootstrap();
            });
            var hostRefs = new WeakMap();
            var getHostRef = function (ref) { return hostRefs.get(ref); };
            var registerInstance = exports('r', function (lazyInstance, hostRef) { return hostRefs.set((hostRef.$lazyInstance$ = lazyInstance), hostRef); });
            var registerHost = function (elm, cmpMeta) {
                var hostRef = {
                    $flags$: 0,
                    $hostElement$: elm,
                    $cmpMeta$: cmpMeta,
                    $instanceValues$: new Map(),
                };
                {
                    hostRef.$onReadyPromise$ = new Promise(function (r) { return (hostRef.$onReadyResolve$ = r); });
                    elm['s-p'] = [];
                    elm['s-rc'] = [];
                }
                addHostEventListeners(elm, hostRef, cmpMeta.$listeners$);
                return hostRefs.set(elm, hostRef);
            };
            var isMemberInElement = function (elm, memberName) { return memberName in elm; };
            var consoleError = function (e) { return console.error(e); };
            var cmpModules = /*@__PURE__*/ new Map();
            var loadModule = function (cmpMeta, hostRef, hmrVersionId) {
                // loadModuleImport
                var exportName = cmpMeta.$tagName$.replace(/-/g, '_');
                var bundleId = cmpMeta.$lazyBundleId$;
                var module$1 = cmpModules.get(bundleId);
                if (module$1) {
                    return module$1[exportName];
                }
                return module.import(
                /* webpackInclude: /\.entry\.js$/ */
                /* webpackExclude: /\.system\.entry\.js$/ */
                /* webpackMode: "lazy" */
                "./" + bundleId + ".entry.js" + '').then(function (importedModule) {
                    {
                        cmpModules.set(bundleId, importedModule);
                    }
                    return importedModule[exportName];
                }, consoleError);
            };
            var styles = new Map();
            var queueDomReads = [];
            var queueDomWrites = [];
            var queueDomWritesLow = [];
            var queueTask = function (queue, write) { return function (cb) {
                queue.push(cb);
                if (!queuePending) {
                    queuePending = true;
                    if (write && plt.$flags$ & 4 /* queueSync */) {
                        nextTick(flush);
                    }
                    else {
                        plt.raf(flush);
                    }
                }
            }; };
            var consume = function (queue) {
                for (var i = 0; i < queue.length; i++) {
                    try {
                        queue[i](performance.now());
                    }
                    catch (e) {
                        consoleError(e);
                    }
                }
                queue.length = 0;
            };
            var consumeTimeout = function (queue, timeout) {
                var i = 0;
                var ts = 0;
                while (i < queue.length && (ts = performance.now()) < timeout) {
                    try {
                        queue[i++](ts);
                    }
                    catch (e) {
                        consoleError(e);
                    }
                }
                if (i === queue.length) {
                    queue.length = 0;
                }
                else if (i !== 0) {
                    queue.splice(0, i);
                }
            };
            var flush = function () {
                {
                    queueCongestion++;
                }
                // always force a bunch of medium callbacks to run, but still have
                // a throttle on how many can run in a certain time
                // DOM READS!!!
                consume(queueDomReads);
                // DOM WRITES!!!
                {
                    var timeout = (plt.$flags$ & 6 /* queueMask */) === 2 /* appLoaded */ ? performance.now() + 14 * Math.ceil(queueCongestion * (1.0 / 10.0)) : Infinity;
                    consumeTimeout(queueDomWrites, timeout);
                    consumeTimeout(queueDomWritesLow, timeout);
                    if (queueDomWrites.length > 0) {
                        queueDomWritesLow.push.apply(queueDomWritesLow, queueDomWrites);
                        queueDomWrites.length = 0;
                    }
                    if ((queuePending = queueDomReads.length + queueDomWrites.length + queueDomWritesLow.length > 0)) {
                        // still more to do yet, but we've run out of time
                        // let's let this thing cool off and try again in the next tick
                        plt.raf(flush);
                    }
                    else {
                        queueCongestion = 0;
                    }
                }
            };
            var nextTick = /*@__PURE__*/ function (cb) { return promiseResolve().then(cb); };
            var writeTask = /*@__PURE__*/ queueTask(queueDomWrites, true);
        }
    };
});
