import { r as registerInstance, h, H as Host, c as createEvent } from './p-4114264f.js';
import { X as X509Certificate, s as short, O as OIDs, C as Convert } from './p-1f902cad.js';

const buttonCss = ":host{display:inline-block;width:auto;font-family:inherit;text-align:center;text-decoration:none;text-overflow:ellipsis;white-space:nowrap;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;vertical-align:top;vertical-align:-webkit-baseline-middle;pointer-events:auto;-webkit-font-kerning:none;font-kerning:none;-webkit-box-sizing:border-box;box-sizing:border-box;--peculiar-button-padding-end:5px;--peculiar-button-padding-start:5px}:host(.peculiar_button){height:30px;border-radius:2px}:host(.peculiar_button_stroke){border-width:1px;border-style:solid}.peculiar_button_native{font-family:inherit;font-size:inherit;font-style:inherit;font-weight:inherit;letter-spacing:inherit;text-overflow:inherit;text-transform:inherit;text-align:inherit;white-space:inherit;color:inherit;display:block;position:relative;width:100%;height:100%;line-height:30px;contain:layout style;cursor:pointer;z-index:0;-webkit-box-sizing:border-box;box-sizing:border-box;-webkit-appearance:none;text-decoration:inherit;outline:none;margin:0;background:inherit;border:none;border-radius:inherit;padding:0 var(--peculiar-button-padding-end) 0 var(--peculiar-button-padding-start);-webkit-transition:-webkit-box-shadow 200ms;transition:-webkit-box-shadow 200ms;transition:box-shadow 200ms;transition:box-shadow 200ms, -webkit-box-shadow 200ms}.peculiar_button_inner{-webkit-transition:opacity 200ms;transition:opacity 200ms}:host(.peculiar_button_disabled){opacity:0.5;pointer-events:none}.peculiar_button_native:focus{-webkit-box-shadow:0 4px 10px 0 rgba(var(--peculiar-color-dark-rgb), 0.15);box-shadow:0 4px 10px 0 rgba(var(--peculiar-color-dark-rgb), 0.15)}@media (hover: hover){.peculiar_button_native:hover .peculiar_button_inner{opacity:0.6}}.peculiar_button_native:active .peculiar_button_inner{opacity:1}";

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
                rel: 'noreferrer noopener',
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

/**
 * Read file as Binary string
 *
 * @example
 * ```js
 *    const file = new File(['file'], 'file.pdf', { type: 'text/plain' });
 *    readAsBinaryString(file)
 *      .then(result => console.log('Readed success', result))
 *      .catch(err => console.log('An error occured when reading file', err));
 * ```
 */
function readAsBinaryString(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve({
            value: reader.result,
            fileName: file.name,
            fileSize: file.size,
            sourceMime: file.type,
        });
        reader.onerror = () => reject(reader.error);
        reader.readAsBinaryString(file);
    });
}
/**
 * Read file as ArrayBuffer
 *
 * @example
 * ```js
 *    const file = new File(['file'], 'file.pdf', { type: 'text/plain' });
 *    readAsArrayBuffer(file)
 *      .then(result => console.log('Readed success', result))
 *      .catch(err => console.log('An error occured when reading file', err));
 * ```
 */
function readAsArrayBuffer(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve({
            value: reader.result,
            fileName: file.name,
            fileSize: file.size,
            sourceMime: file.type,
        });
        reader.onerror = () => reject(reader.error);
        reader.readAsArrayBuffer(file);
    });
}
/**
 * Read file as Data URL
 *
 * @example
 * ```js
 *    const file = new File(['file'], 'file.pdf', { type: 'text/plain' });
 *    readAsDataUrl(file)
 *      .then(result => console.log('Readed success', result))
 *      .catch(err => console.log('An error occured when reading file', err));
 * ```
 */
function readAsDataUrl(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve({
            value: reader.result,
            fileName: file.name,
            fileSize: file.size,
            sourceMime: file.type,
        });
        reader.onerror = () => reject(reader.error);
        reader.readAsDataURL(file);
    });
}
/**
 * Read file as Text
 *
 * @example
 * ```js
 *    const file = new File(['file'], 'file.pdf', { type: 'text/plain' });
 *    readAsText(file)
 *      .then(result => console.log('Readed success', result))
 *      .catch(err => console.log('An error occured when reading file', err));
 * ```
 */
function readAsText(file, options) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve({
            value: reader.result,
            fileName: file.name,
            fileSize: file.size,
            sourceMime: file.type,
        });
        reader.onerror = () => reject(reader.error);
        reader.readAsText(file, options);
    });
}
const readFile = {
    readAsBinaryString,
    readAsArrayBuffer,
    readAsDataUrl,
    readAsText,
};

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function isAbsolute(pathname) {
  return pathname.charAt(0) === '/';
}

// About 1.5x faster than the two-arg version of Array#splice()
function spliceOne(list, index) {
  for (var i = index, k = i + 1, n = list.length; k < n; i += 1, k += 1) {
    list[i] = list[k];
  }

  list.pop();
}

// This implementation is based heavily on node's url.parse
function resolvePathname(to, from) {
  if (from === undefined) from = '';

  var toParts = (to && to.split('/')) || [];
  var fromParts = (from && from.split('/')) || [];

  var isToAbs = to && isAbsolute(to);
  var isFromAbs = from && isAbsolute(from);
  var mustEndAbs = isToAbs || isFromAbs;

  if (to && isAbsolute(to)) {
    // to is absolute
    fromParts = toParts;
  } else if (toParts.length) {
    // to is relative, drop the filename
    fromParts.pop();
    fromParts = fromParts.concat(toParts);
  }

  if (!fromParts.length) return '/';

  var hasTrailingSlash;
  if (fromParts.length) {
    var last = fromParts[fromParts.length - 1];
    hasTrailingSlash = last === '.' || last === '..' || last === '';
  } else {
    hasTrailingSlash = false;
  }

  var up = 0;
  for (var i = fromParts.length; i >= 0; i--) {
    var part = fromParts[i];

    if (part === '.') {
      spliceOne(fromParts, i);
    } else if (part === '..') {
      spliceOne(fromParts, i);
      up++;
    } else if (up) {
      spliceOne(fromParts, i);
      up--;
    }
  }

  if (!mustEndAbs) for (; up--; up) fromParts.unshift('..');

  if (
    mustEndAbs &&
    fromParts[0] !== '' &&
    (!fromParts[0] || !isAbsolute(fromParts[0]))
  )
    fromParts.unshift('');

  var result = fromParts.join('/');

  if (hasTrailingSlash && result.substr(-1) !== '/') result += '/';

  return result;
}

var prefix = 'Invariant failed';
function invariant(condition, message) {
    if (condition) {
        return;
    }
    {
        throw new Error(prefix);
    }
}

function addLeadingSlash(path) {
  return path.charAt(0) === '/' ? path : '/' + path;
}
function hasBasename(path, prefix) {
  return path.toLowerCase().indexOf(prefix.toLowerCase()) === 0 && '/?#'.indexOf(path.charAt(prefix.length)) !== -1;
}
function stripBasename(path, prefix) {
  return hasBasename(path, prefix) ? path.substr(prefix.length) : path;
}
function stripTrailingSlash(path) {
  return path.charAt(path.length - 1) === '/' ? path.slice(0, -1) : path;
}
function parsePath(path) {
  var pathname = path || '/';
  var search = '';
  var hash = '';
  var hashIndex = pathname.indexOf('#');

  if (hashIndex !== -1) {
    hash = pathname.substr(hashIndex);
    pathname = pathname.substr(0, hashIndex);
  }

  var searchIndex = pathname.indexOf('?');

  if (searchIndex !== -1) {
    search = pathname.substr(searchIndex);
    pathname = pathname.substr(0, searchIndex);
  }

  return {
    pathname: pathname,
    search: search === '?' ? '' : search,
    hash: hash === '#' ? '' : hash
  };
}
function createPath(location) {
  var pathname = location.pathname,
      search = location.search,
      hash = location.hash;
  var path = pathname || '/';
  if (search && search !== '?') path += search.charAt(0) === '?' ? search : "?" + search;
  if (hash && hash !== '#') path += hash.charAt(0) === '#' ? hash : "#" + hash;
  return path;
}

function createLocation(path, state, key, currentLocation) {
  var location;

  if (typeof path === 'string') {
    // Two-arg form: push(path, state)
    location = parsePath(path);
    location.state = state;
  } else {
    // One-arg form: push(location)
    location = _extends({}, path);
    if (location.pathname === undefined) location.pathname = '';

    if (location.search) {
      if (location.search.charAt(0) !== '?') location.search = '?' + location.search;
    } else {
      location.search = '';
    }

    if (location.hash) {
      if (location.hash.charAt(0) !== '#') location.hash = '#' + location.hash;
    } else {
      location.hash = '';
    }

    if (state !== undefined && location.state === undefined) location.state = state;
  }

  try {
    location.pathname = decodeURI(location.pathname);
  } catch (e) {
    if (e instanceof URIError) {
      throw new URIError('Pathname "' + location.pathname + '" could not be decoded. ' + 'This is likely caused by an invalid percent-encoding.');
    } else {
      throw e;
    }
  }

  if (key) location.key = key;

  if (currentLocation) {
    // Resolve incomplete/relative pathname relative to current location.
    if (!location.pathname) {
      location.pathname = currentLocation.pathname;
    } else if (location.pathname.charAt(0) !== '/') {
      location.pathname = resolvePathname(location.pathname, currentLocation.pathname);
    }
  } else {
    // When there is no prior location and pathname is empty, set it to /
    if (!location.pathname) {
      location.pathname = '/';
    }
  }

  return location;
}

function createTransitionManager() {
  var prompt = null;

  function setPrompt(nextPrompt) {
    prompt = nextPrompt;
    return function () {
      if (prompt === nextPrompt) prompt = null;
    };
  }

  function confirmTransitionTo(location, action, getUserConfirmation, callback) {
    // TODO: If another transition starts while we're still confirming
    // the previous one, we may end up in a weird state. Figure out the
    // best way to handle this.
    if (prompt != null) {
      var result = typeof prompt === 'function' ? prompt(location, action) : prompt;

      if (typeof result === 'string') {
        if (typeof getUserConfirmation === 'function') {
          getUserConfirmation(result, callback);
        } else {
          callback(true);
        }
      } else {
        // Return false from a transition hook to cancel the transition.
        callback(result !== false);
      }
    } else {
      callback(true);
    }
  }

  var listeners = [];

  function appendListener(fn) {
    var isActive = true;

    function listener() {
      if (isActive) fn.apply(void 0, arguments);
    }

    listeners.push(listener);
    return function () {
      isActive = false;
      listeners = listeners.filter(function (item) {
        return item !== listener;
      });
    };
  }

  function notifyListeners() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    listeners.forEach(function (listener) {
      return listener.apply(void 0, args);
    });
  }

  return {
    setPrompt: setPrompt,
    confirmTransitionTo: confirmTransitionTo,
    appendListener: appendListener,
    notifyListeners: notifyListeners
  };
}

var canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);
function getConfirmation(message, callback) {
  callback(window.confirm(message)); // eslint-disable-line no-alert
}
/**
 * Returns true if the HTML5 history API is supported. Taken from Modernizr.
 *
 * https://github.com/Modernizr/Modernizr/blob/master/LICENSE
 * https://github.com/Modernizr/Modernizr/blob/master/feature-detects/history.js
 * changed to avoid false negatives for Windows Phones: https://github.com/reactjs/react-router/issues/586
 */

function supportsHistory() {
  var ua = window.navigator.userAgent;
  if ((ua.indexOf('Android 2.') !== -1 || ua.indexOf('Android 4.0') !== -1) && ua.indexOf('Mobile Safari') !== -1 && ua.indexOf('Chrome') === -1 && ua.indexOf('Windows Phone') === -1) return false;
  return window.history && 'pushState' in window.history;
}
/**
 * Returns true if browser fires popstate on hash change.
 * IE10 and IE11 do not.
 */

function supportsPopStateOnHashChange() {
  return window.navigator.userAgent.indexOf('Trident') === -1;
}
/**
 * Returns true if a given popstate event is an extraneous WebKit event.
 * Accounts for the fact that Chrome on iOS fires real popstate events
 * containing undefined state when pressing the back button.
 */

function isExtraneousPopstateEvent(event) {
  return event.state === undefined && navigator.userAgent.indexOf('CriOS') === -1;
}

var PopStateEvent = 'popstate';
var HashChangeEvent = 'hashchange';

function getHistoryState() {
  try {
    return window.history.state || {};
  } catch (e) {
    // IE 11 sometimes throws when accessing window.history.state
    // See https://github.com/ReactTraining/history/pull/289
    return {};
  }
}
/**
 * Creates a history object that uses the HTML5 history API including
 * pushState, replaceState, and the popstate event.
 */


function createBrowserHistory(props) {
  if (props === void 0) {
    props = {};
  }

  !canUseDOM ?  invariant(false) : void 0;
  var globalHistory = window.history;
  var canUseHistory = supportsHistory();
  var needsHashChangeListener = !supportsPopStateOnHashChange();
  var _props = props,
      _props$forceRefresh = _props.forceRefresh,
      forceRefresh = _props$forceRefresh === void 0 ? false : _props$forceRefresh,
      _props$getUserConfirm = _props.getUserConfirmation,
      getUserConfirmation = _props$getUserConfirm === void 0 ? getConfirmation : _props$getUserConfirm,
      _props$keyLength = _props.keyLength,
      keyLength = _props$keyLength === void 0 ? 6 : _props$keyLength;
  var basename = props.basename ? stripTrailingSlash(addLeadingSlash(props.basename)) : '';

  function getDOMLocation(historyState) {
    var _ref = historyState || {},
        key = _ref.key,
        state = _ref.state;

    var _window$location = window.location,
        pathname = _window$location.pathname,
        search = _window$location.search,
        hash = _window$location.hash;
    var path = pathname + search + hash;
    if (basename) path = stripBasename(path, basename);
    return createLocation(path, state, key);
  }

  function createKey() {
    return Math.random().toString(36).substr(2, keyLength);
  }

  var transitionManager = createTransitionManager();

  function setState(nextState) {
    _extends(history, nextState);

    history.length = globalHistory.length;
    transitionManager.notifyListeners(history.location, history.action);
  }

  function handlePopState(event) {
    // Ignore extraneous popstate events in WebKit.
    if (isExtraneousPopstateEvent(event)) return;
    handlePop(getDOMLocation(event.state));
  }

  function handleHashChange() {
    handlePop(getDOMLocation(getHistoryState()));
  }

  var forceNextPop = false;

  function handlePop(location) {
    if (forceNextPop) {
      forceNextPop = false;
      setState();
    } else {
      var action = 'POP';
      transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
        if (ok) {
          setState({
            action: action,
            location: location
          });
        } else {
          revertPop(location);
        }
      });
    }
  }

  function revertPop(fromLocation) {
    var toLocation = history.location; // TODO: We could probably make this more reliable by
    // keeping a list of keys we've seen in sessionStorage.
    // Instead, we just default to 0 for keys we don't know.

    var toIndex = allKeys.indexOf(toLocation.key);
    if (toIndex === -1) toIndex = 0;
    var fromIndex = allKeys.indexOf(fromLocation.key);
    if (fromIndex === -1) fromIndex = 0;
    var delta = toIndex - fromIndex;

    if (delta) {
      forceNextPop = true;
      go(delta);
    }
  }

  var initialLocation = getDOMLocation(getHistoryState());
  var allKeys = [initialLocation.key]; // Public interface

  function createHref(location) {
    return basename + createPath(location);
  }

  function push(path, state) {
    var action = 'PUSH';
    var location = createLocation(path, state, createKey(), history.location);
    transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
      if (!ok) return;
      var href = createHref(location);
      var key = location.key,
          state = location.state;

      if (canUseHistory) {
        globalHistory.pushState({
          key: key,
          state: state
        }, null, href);

        if (forceRefresh) {
          window.location.href = href;
        } else {
          var prevIndex = allKeys.indexOf(history.location.key);
          var nextKeys = allKeys.slice(0, prevIndex + 1);
          nextKeys.push(location.key);
          allKeys = nextKeys;
          setState({
            action: action,
            location: location
          });
        }
      } else {
        window.location.href = href;
      }
    });
  }

  function replace(path, state) {
    var action = 'REPLACE';
    var location = createLocation(path, state, createKey(), history.location);
    transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
      if (!ok) return;
      var href = createHref(location);
      var key = location.key,
          state = location.state;

      if (canUseHistory) {
        globalHistory.replaceState({
          key: key,
          state: state
        }, null, href);

        if (forceRefresh) {
          window.location.replace(href);
        } else {
          var prevIndex = allKeys.indexOf(history.location.key);
          if (prevIndex !== -1) allKeys[prevIndex] = location.key;
          setState({
            action: action,
            location: location
          });
        }
      } else {
        window.location.replace(href);
      }
    });
  }

  function go(n) {
    globalHistory.go(n);
  }

  function goBack() {
    go(-1);
  }

  function goForward() {
    go(1);
  }

  var listenerCount = 0;

  function checkDOMListeners(delta) {
    listenerCount += delta;

    if (listenerCount === 1 && delta === 1) {
      window.addEventListener(PopStateEvent, handlePopState);
      if (needsHashChangeListener) window.addEventListener(HashChangeEvent, handleHashChange);
    } else if (listenerCount === 0) {
      window.removeEventListener(PopStateEvent, handlePopState);
      if (needsHashChangeListener) window.removeEventListener(HashChangeEvent, handleHashChange);
    }
  }

  var isBlocked = false;

  function block(prompt) {
    if (prompt === void 0) {
      prompt = false;
    }

    var unblock = transitionManager.setPrompt(prompt);

    if (!isBlocked) {
      checkDOMListeners(1);
      isBlocked = true;
    }

    return function () {
      if (isBlocked) {
        isBlocked = false;
        checkDOMListeners(-1);
      }

      return unblock();
    };
  }

  function listen(listener) {
    var unlisten = transitionManager.appendListener(listener);
    checkDOMListeners(1);
    return function () {
      checkDOMListeners(-1);
      unlisten();
    };
  }

  var history = {
    length: globalHistory.length,
    action: 'POP',
    location: initialLocation,
    createHref: createHref,
    push: push,
    replace: replace,
    go: go,
    goBack: goBack,
    goForward: goForward,
    block: block,
    listen: listen
  };
  return history;
}

function parseHash(hash = window.location.hash) {
    if (!hash.length) {
        return {};
    }
    const pairs = hash.replace(/^(#|\?)?\/?/, '').split('&');
    const result = {};
    for (let i = 0; i < pairs.length; i += 1) {
        const pair = pairs[i].split('=');
        try {
            result[pair[0]] = pair[1] && decodeURIComponent(pair[1]);
        }
        catch (error) {
            console.warn(error);
        }
    }
    return result;
}

function queryStringify(options) {
    const parameters = [];
    Object.keys(options).forEach((o) => {
        if (typeof options[o] === 'string'
            || typeof options[o] === 'boolean'
            || typeof options[o] === 'number') {
            parameters.push(`${o}=${encodeURIComponent(options[o])}`);
        }
    });
    return parameters.join('&');
}

const browserHistory = createBrowserHistory();
const history = Object.assign(browserHistory, {
    parseHash,
    queryStringify,
});

const certificateDecoderCss = ".sc-peculiar-certificate-decoder-h{display:block;width:100%;font-size:0}.input_paste.sc-peculiar-certificate-decoder{min-height:300px;width:100%;border-radius:3px;border-width:1px;border-style:solid;padding:14px;font-size:14px;font-family:monospace;resize:vertical}.controls.sc-peculiar-certificate-decoder{margin-top:10px}.button.sc-peculiar-certificate-decoder:not(:first-child){margin-left:10px}.viewer.sc-peculiar-certificate-decoder{margin-top:64px}.input_file.sc-peculiar-certificate-decoder{opacity:0;width:100%;height:100%;top:0;left:0;display:block;position:absolute}";

const CertificateDecoder = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.onClickDecode = () => {
            const { value } = this.inputPaste;
            if (value) {
                this.decode(value);
            }
        };
        this.onClickExample = () => {
            this.decode(this.certificateExample);
        };
        this.onClickClear = () => {
            this.clear();
        };
        this.onChangeInputFile = async (e) => {
            const element = e.target;
            if (element.files) {
                const file = await readFile.readAsBinaryString(element.files[0]);
                if (typeof file.value === 'string') {
                    this.decode(file.value);
                }
                element.value = '';
            }
        };
        this.onDropFile = async (e) => {
            e.stopPropagation();
            e.preventDefault();
            const element = e.dataTransfer;
            if (element.files) {
                const file = await readFile.readAsBinaryString(element.files[0]);
                if (typeof file.value === 'string') {
                    this.decode(file.value);
                }
            }
        };
    }
    componentDidLoad() {
        const parsedHash = history.parseHash(window.location.search);
        if (parsedHash.cert) {
            /**
             * Prevent Stencil warning about re-render
             */
            setTimeout(() => this.decode(parsedHash.cert), 100);
        }
    }
    clear() {
        this.inputPaste.value = '';
        this.certificateDecoded = null;
        history.replace({ search: '' });
    }
    decode(certificate) {
        try {
            const decoded = new X509Certificate(certificate);
            this.certificateDecoded = decoded;
            this.inputPaste.value = decoded.export('pem');
            history.replace({
                search: history.queryStringify({
                    cert: decoded.export('base64'),
                }),
            });
        }
        catch (error) {
            this.certificateDecoded = null;
            console.error(error);
            alert('Error decoding certificate. Please use another file');
        }
    }
    render() {
        return (h(Host, null, h("textarea", { placeholder: "Certificate DER or PEM", class: "input_paste peculiar_fill_light peculiar_stroke_grey_3 peculiar_color_dark", ref: el => this.inputPaste = el, onDrop: this.onDropFile }), h("div", { class: "controls" }, h("peculiar-button", { fill: "fill", class: "button", onClick: this.onClickDecode }, "Decode"), h("peculiar-button", { class: "button" }, "Choose file", h("input", { type: "file", class: "input_file", accept: "application/pkix-cert,application/x-x509-ca-cert,application/x-x509-user-cert", onChange: this.onChangeInputFile, value: "" })), h("peculiar-button", { class: "button", onClick: this.onClickClear }, "Clear"), this.certificateExample && (h("peculiar-button", { class: "button", onClick: this.onClickExample }, "Example"))), this.certificateDecoded && (h("peculiar-certificate-viewer", { certificate: this.certificateDecoded, class: "viewer", download: true }))));
    }
};
CertificateDecoder.style = certificateDecoderCss;

const certificateSummaryCss = ".sc-peculiar-certificate-summary-h{display:block;width:100%}th.sc-peculiar-certificate-summary,td.sc-peculiar-certificate-summary{border:none}td.sc-peculiar-certificate-summary{padding:0}.basic_wrapper.sc-peculiar-certificate-summary{position:relative}.basic_wrapper.sc-peculiar-certificate-summary::before,.basic_wrapper.sc-peculiar-certificate-summary::after{content:\"\";display:block;position:absolute;width:1px;top:0;bottom:0;background-color:rgba(var(--peculiar-color-grey_3-rgb), 0.5)}.basic_wrapper.sc-peculiar-certificate-summary::before{left:calc(30% - 20px)}.basic_wrapper.sc-peculiar-certificate-summary::after{left:calc(60% - 20px)}.is_only.basic_wrapper.sc-peculiar-certificate-summary::before{content:none}.basic_col.sc-peculiar-certificate-summary{vertical-align:top;display:inline-block;width:30%;padding-right:40px;position:relative}.is_only.sc-peculiar-certificate-summary .basic_col.sc-peculiar-certificate-summary{width:60%}.basic_meta.sc-peculiar-certificate-summary{vertical-align:top;display:inline-block;width:40%}.dn_name.sc-peculiar-certificate-summary{min-width:30px;vertical-align:top;padding-right:5px}.dn_value.sc-peculiar-certificate-summary{vertical-align:top}.dn_row.sc-peculiar-certificate-summary:not(:last-child){margin-bottom:10px}.meta_row.sc-peculiar-certificate-summary:not(:last-child){margin-bottom:10px}.meta_name.sc-peculiar-certificate-summary{display:inline-block;width:120px;padding-right:5px;vertical-align:top}.meta_value.sc-peculiar-certificate-summary{display:inline-block;vertical-align:top;width:calc(100% - 120px)}.table_attributes.sc-peculiar-certificate-summary{width:100%}@media (max-width: 767px){.basic_wrapper.sc-peculiar-certificate-summary::before,.basic_wrapper.sc-peculiar-certificate-summary::after{content:none}.basic_col.sc-peculiar-certificate-summary{padding:20px 0;width:100% !important;border-bottom:1px solid rgba(var(--peculiar-color-grey_3-rgb), 0.5)}.basic_col.sc-peculiar-certificate-summary::after{top:auto;bottom:0;left:0;right:0;height:1px;width:100%}.basic_meta.sc-peculiar-certificate-summary{width:100%;padding:20px 0;min-width:auto}.basic_wrapper.sc-peculiar-certificate-summary::before,.basic_wrapper.sc-peculiar-certificate-summary::after{content:none}.meta_row.sc-peculiar-certificate-summary:not(:last-child){margin-bottom:0}.meta_name.sc-peculiar-certificate-summary,.meta_value.sc-peculiar-certificate-summary{width:100%;padding:5px 0}}[data-view=mobile].sc-peculiar-certificate-summary-h .basic_wrapper.sc-peculiar-certificate-summary::before,[data-view=mobile].sc-peculiar-certificate-summary-h .basic_wrapper.sc-peculiar-certificate-summary::after{content:none}[data-view=mobile].sc-peculiar-certificate-summary-h .basic_col.sc-peculiar-certificate-summary{padding:20px 0;width:100% !important;border-bottom:1px solid rgba(var(--peculiar-color-grey_3-rgb), 0.5)}[data-view=mobile].sc-peculiar-certificate-summary-h .basic_col.sc-peculiar-certificate-summary::after{top:auto;bottom:0;left:0;right:0;height:1px;width:100%}[data-view=mobile].sc-peculiar-certificate-summary-h .basic_meta.sc-peculiar-certificate-summary{width:100%;padding:20px 0;min-width:auto}[data-view=mobile].sc-peculiar-certificate-summary-h .basic_wrapper.sc-peculiar-certificate-summary::before,[data-view=mobile].sc-peculiar-certificate-summary-h .basic_wrapper.sc-peculiar-certificate-summary::after{content:none}[data-view=mobile].sc-peculiar-certificate-summary-h .meta_row.sc-peculiar-certificate-summary:not(:last-child){margin-bottom:0}[data-view=mobile].sc-peculiar-certificate-summary-h .meta_name.sc-peculiar-certificate-summary,[data-view=mobile].sc-peculiar-certificate-summary-h .meta_value.sc-peculiar-certificate-summary{width:100%;padding:5px 0}";

const CertificateSummary = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.showIssuer = true;
    }
    renderDN(dns) {
        return dns.map(dn => (h("tr", { class: "dn_row" }, h("td", { class: "dn_name" }, h("peculiar-typography", { color: "grey_5" }, dn.name || dn.type)), h("td", { class: "dn_value" }, h("peculiar-typography", null, dn.value)))));
    }
    renderMetaData(item) {
        return ([
            h("div", { class: "meta_row" }, h("peculiar-typography", { class: "meta_name", color: "grey_5" }, "Serial number:"), h("peculiar-typography", { class: "meta_value", monospace: true }, item.serialNumber)),
            h("div", { class: "meta_row" }, h("peculiar-typography", { class: "meta_name", color: "grey_5" }, "Version:"), h("peculiar-typography", { class: "meta_value" }, item.version)),
            h("div", { class: "meta_row" }, h("peculiar-typography", { class: "meta_name", color: "grey_5" }, "Validity:"), h("peculiar-typography", { class: "meta_value" }, item.validity)),
            h("div", { class: "meta_row" }, h("peculiar-typography", { class: "meta_name", color: "grey_5" }, "Issued:"), h("peculiar-typography", { class: "meta_value" }, short(item.notBefore))),
            h("div", { class: "meta_row" }, h("peculiar-typography", { class: "meta_name", color: "grey_5" }, "Expired:"), h("peculiar-typography", { class: "meta_value" }, short(item.notAfter))),
        ]);
    }
    render() {
        return (h(Host, { "data-view": this.view }, h("div", { class: {
                basic_wrapper: true,
                is_only: !this.showIssuer,
            } }, h("div", { class: "basic_col" }, h("peculiar-typography", { class: "dn_row" }, "Subject DN:"), h("table", { class: "table_attributes" }, h("tbody", null, this.renderDN(this.certificate.subject)))), this.showIssuer && (h("div", { class: "basic_col peculiar_stroke_grey_3" }, this.issuerDnLink ? (h("peculiar-link", { href: this.issuerDnLink, class: "dn_row" }, "Issuer DN:")) : (h("peculiar-typography", { class: "dn_row" }, "Issuer DN:")), h("table", { class: "table_attributes" }, h("tbody", null, this.renderDN(this.certificate.issuer))))), h("div", { class: "basic_meta" }, this.renderMetaData(this.certificate)))));
    }
};
CertificateSummary.style = certificateSummaryCss;

function rowTitle(title) {
    if (!title) {
        return null;
    }
    return (h("tr", { class: "title" },
        h("td", { colSpan: 2 },
            h("peculiar-typography", { type: "h6" }, title))));
}

function isLink(value) {
    return value.indexOf('http') === 0;
}

function rowValue(name, value, options = {}) {
    if (!name) {
        return null;
    }
    if (value === undefined || value === null) {
        return null;
    }
    let elementValue;
    if (options.collapse) {
        elementValue = (h("peculiar-text-hider", null, value));
    }
    else {
        elementValue = value;
    }
    return (h("tr", null,
        h("td", null,
            h("peculiar-typography", { color: "grey_5" },
                name,
                ":")),
        h("td", { class: {
                monospace: options.monospace,
            } }, (isLink(value.toString()) || options.href) ? (h("peculiar-link", { href: options.href || value.toString() }, value)) : (h("peculiar-typography", { monospace: options.monospace },
            elementValue,
            options.extraValue)))));
}

function getStringByOID(value) {
    const oid = OIDs[value];
    if (oid) {
        return `${oid} (${value})`;
    }
    return value;
}

function getPublicKeyModulus(publicKey) {
    var _a;
    if ((_a = publicKey.params) === null || _a === void 0 ? void 0 : _a['modulus']) {
        let length = publicKey.params['modulus'].byteLength;
        if (length % 2) {
            length -= 1;
        }
        return length * 8;
    }
    return null;
}
function getPublicKeyExponent(publicKey) {
    var _a;
    if ((_a = publicKey.params) === null || _a === void 0 ? void 0 : _a['publicExponent']) {
        return publicKey.params['publicExponent'].byteLength === 3
            ? 65537
            : 3;
    }
    return null;
}
function publicKey(publicKey) {
    var _a;
    if (!publicKey) {
        return null;
    }
    return [
        rowTitle('Public Key Info'),
        rowValue('Algorithm', getStringByOID(publicKey.algorithm)),
        rowValue('Named Curve', getStringByOID((_a = publicKey.params) === null || _a === void 0 ? void 0 : _a['namedCurve'])),
        rowValue('Exponent', getPublicKeyExponent(publicKey)),
        rowValue('Modulus', getPublicKeyModulus(publicKey)),
        rowValue('Value', Convert.ToHex(publicKey.value), { monospace: true, collapse: true }),
    ];
}

function signature(signature) {
    if (!signature) {
        return null;
    }
    return [
        rowTitle('Signature'),
        rowValue('Algorithm', getStringByOID(signature.algorithm)),
        rowValue('Value', Convert.ToHex(signature.value), { monospace: true, collapse: true }),
    ];
}

function thumbprints(thumbprints) {
    if (!thumbprints) {
        return null;
    }
    return [
        rowTitle('Thumbprints'),
        Object.keys(thumbprints).map(name => (rowValue(name, thumbprints[name], { monospace: true }))),
    ];
}

const certificateViewerCss = ".sc-peculiar-certificate-viewer-h{display:block;width:100%;word-wrap:break-word;position:relative;min-width:280px;min-height:300px;background:rgb(var(--peculiar-color-light-rgb))}th.sc-peculiar-certificate-viewer,td.sc-peculiar-certificate-viewer{border:none}table.sc-peculiar-certificate-viewer{width:100%;margin-bottom:30px}table.sc-peculiar-certificate-viewer .title.sc-peculiar-certificate-viewer td.sc-peculiar-certificate-viewer{border-color:rgba(var(--peculiar-color-grey_3-rgb), 0.5);padding-top:60px;padding-bottom:15px;border-bottom-width:1px;border-bottom-style:solid}table.sc-peculiar-certificate-viewer td.sc-peculiar-certificate-viewer:first-child{padding-left:30px;width:130px;padding-right:10px}table.sc-peculiar-certificate-viewer td.sc-peculiar-certificate-viewer:last-child{padding-right:30px;width:calc(100% - 130px)}table.sc-peculiar-certificate-viewer td.sc-peculiar-certificate-viewer{vertical-align:top;padding-top:5px;padding-bottom:5px}table.sc-peculiar-certificate-viewer td.vertical_align_middle.sc-peculiar-certificate-viewer{vertical-align:middle}table.sc-peculiar-certificate-viewer .title.sc-peculiar-certificate-viewer:first-child td.sc-peculiar-certificate-viewer{padding-top:15px}table.sc-peculiar-certificate-viewer .title.sc-peculiar-certificate-viewer+tr.sc-peculiar-certificate-viewer td.sc-peculiar-certificate-viewer{padding-top:15px}table.sc-peculiar-certificate-viewer td.monospace.sc-peculiar-certificate-viewer{max-width:0}table.sc-peculiar-certificate-viewer .divider.sc-peculiar-certificate-viewer{padding-top:15px;padding-bottom:15px}.divider.sc-peculiar-certificate-viewer .bg_fill.sc-peculiar-certificate-viewer{background-color:rgba(var(--peculiar-color-grey_3-rgb), 0.5)}table.sc-peculiar-certificate-viewer tr.sc-peculiar-certificate-viewer:last-child .divider.sc-peculiar-certificate-viewer{padding-top:0;opacity:0}.divider.sc-peculiar-certificate-viewer span.sc-peculiar-certificate-viewer{display:block;height:1px}.status_wrapper.sc-peculiar-certificate-viewer{min-height:inherit;display:-ms-flexbox;display:flex;-ms-flex-pack:center;justify-content:center;-ms-flex-align:center;align-items:center}.interaction_text.sc-peculiar-certificate-viewer{padding:15px 0;width:300px;margin:auto;text-align:center}@media (max-width: 900px){table.sc-peculiar-certificate-viewer,tr.sc-peculiar-certificate-viewer,td.sc-peculiar-certificate-viewer{display:block}table.sc-peculiar-certificate-viewer td.sc-peculiar-certificate-viewer:last-child,table.sc-peculiar-certificate-viewer td.sc-peculiar-certificate-viewer:first-child{padding-right:15px;padding-left:15px;width:100%}table.sc-peculiar-certificate-viewer .title.sc-peculiar-certificate-viewer+tr.sc-peculiar-certificate-viewer td.sc-peculiar-certificate-viewer{padding-top:5px}table.sc-peculiar-certificate-viewer .title.sc-peculiar-certificate-viewer+tr.sc-peculiar-certificate-viewer td.sc-peculiar-certificate-viewer:first-child{padding-top:15px}table.sc-peculiar-certificate-viewer td.monospace.sc-peculiar-certificate-viewer{width:100%;max-width:none}}[data-view=mobile].sc-peculiar-certificate-viewer-h table.sc-peculiar-certificate-viewer,[data-view=mobile].sc-peculiar-certificate-viewer-h tr.sc-peculiar-certificate-viewer,[data-view=mobile].sc-peculiar-certificate-viewer-h td.sc-peculiar-certificate-viewer{display:block}[data-view=mobile].sc-peculiar-certificate-viewer-h table.sc-peculiar-certificate-viewer td.sc-peculiar-certificate-viewer:last-child,[data-view=mobile].sc-peculiar-certificate-viewer-h table.sc-peculiar-certificate-viewer td.sc-peculiar-certificate-viewer:first-child{padding-right:15px;padding-left:15px;width:100%}[data-view=mobile].sc-peculiar-certificate-viewer-h table.sc-peculiar-certificate-viewer .title.sc-peculiar-certificate-viewer+tr.sc-peculiar-certificate-viewer td.sc-peculiar-certificate-viewer{padding-top:5px}[data-view=mobile].sc-peculiar-certificate-viewer-h table.sc-peculiar-certificate-viewer .title.sc-peculiar-certificate-viewer+tr.sc-peculiar-certificate-viewer td.sc-peculiar-certificate-viewer:first-child{padding-top:15px}[data-view=mobile].sc-peculiar-certificate-viewer-h table.sc-peculiar-certificate-viewer td.monospace.sc-peculiar-certificate-viewer{width:100%;max-width:none}";

const CertificateViewer = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.isDecodeInProcess = true;
    }
    componentWillLoad() {
        this.decodeCertificate(this.certificate);
    }
    async decodeCertificate(certificate) {
        this.isDecodeInProcess = true;
        try {
            if (certificate instanceof X509Certificate) {
                this.certificateDecoded = certificate;
            }
            if (typeof certificate === 'string') {
                this.certificateDecoded = new X509Certificate(certificate);
            }
            // this.certificateDecoded.parseExtensions();
            await this.certificateDecoded.getThumbprint('SHA-1');
            await this.certificateDecoded.getThumbprint('SHA-256');
        }
        catch (error) {
            this.certificateDecodeError = error;
            console.error('Error certificate parse:', error);
        }
        this.isDecodeInProcess = false;
    }
    /**
     * Rerun decodeCertificate if previuos value not equal current value
     */
    watchCertificateAndDecode(newValue, oldValue) {
        if (typeof newValue === 'string' && typeof oldValue === 'string') {
            if (newValue !== oldValue) {
                this.decodeCertificate(newValue);
            }
            return;
        }
        if (newValue instanceof X509Certificate && oldValue instanceof X509Certificate) {
            if (newValue.serialNumber !== oldValue.serialNumber) {
                this.decodeCertificate(newValue);
            }
        }
    }
    // private getAuthKeyIdParentLink = (value: string) => {
    //   return this.authKeyIdParentLink
    //     ?.replace('{{authKeyId}}', value);
    // }
    // private getAuthKeyIdSiblingsLink = (value: string) => {
    //   return this.authKeyIdSiblingsLink
    //     ?.replace('{{authKeyId}}', value);
    // }
    // private getSubjectKeyIdChildrenLink = (value: string) => {
    //   return this.subjectKeyIdChildrenLink
    //     ?.replace('{{subjectKeyId}}', value);
    // }
    // private getSubjectKeyIdSiblingsLink = (value: string) => {
    //   return this.subjectKeyIdSiblingsLink
    //     ?.replace('{{subjectKeyId}}', value);
    // }
    // private getLEILink(value: string) {
    //   return `https://www.gleif.org/lei/${value}`;
    // }
    // private getDNSNameLink(value: string) {
    //   return `https://censys.io/ipv4?q=${value}`;
    // }
    // private getIPAddressLink(value: string) {
    //   return `https://censys.io/ipv4?q=${value}`;
    // }
    getIssuerDnLink() {
        return this.issuerDnLink;
    }
    renderErrorState() {
        return (h("div", { class: "status_wrapper" }, h("peculiar-typography", { type: "b1", class: "interaction_text" }, "There is error for certificate decode.")));
    }
    renderEmptyState() {
        return (h("div", { class: "status_wrapper" }, h("peculiar-typography", { type: "b1", class: "interaction_text" }, "There is no certificate available.")));
    }
    render() {
        if (this.certificateDecodeError) {
            return this.renderErrorState();
        }
        if (!this.certificateDecoded) {
            return this.renderEmptyState();
        }
        return (h(Host, { "data-view": this.view }, h("table", null, rowTitle('Basic Information'), h("tr", null, h("td", { colSpan: 2 }, h("peculiar-certificate-summary", { certificate: this.certificateDecoded, issuerDnLink: this.getIssuerDnLink(), view: this.view }))), publicKey(this.certificateDecoded.publicKey), signature(this.certificateDecoded.signature), thumbprints(this.certificateDecoded.thumbprints))));
    }
    static get watchers() { return {
        "certificate": ["watchCertificateAndDecode"]
    }; }
};
CertificateViewer.style = certificateViewerCss;

const linkCss = ":host{display:inline-block}.link_native{margin:0;padding:0;font-family:var(--peculiar-font-family);font-size:inherit;line-height:inherit;letter-spacing:inherit;word-break:break-word;color:inherit}.link_native:hover{text-decoration:none}";

const Link = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    render() {
        return (h(Host, { class: "peculiar_color_primary peculiar_b3" }, h("a", { href: this.href, target: "_blank", rel: "noreferrer noopener", class: "link_native" }, h("slot", null))));
    }
};
Link.style = linkCss;

const textHiderCss = ".sc-peculiar-text-hider-h{display:block;width:100%}.text.sc-peculiar-text-hider{display:inline-block;width:calc(100% - 60px);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;margin:0}.text.m_opened.sc-peculiar-text-hider{white-space:initial}.action.sc-peculiar-text-hider{vertical-align:top;display:inline-block;width:60px;text-align:right;position:relative;top:-6px}.button_action.sc-peculiar-text-hider{width:30px}.expand_icon.sc-peculiar-text-hider{width:7px;height:5px;display:inline-block;fill:rgb(var(--peculiar-color-primary-rgb))}.m_opened.sc-peculiar-text-hider .expand_icon.sc-peculiar-text-hider{-webkit-transform:rotate(180deg);transform:rotate(180deg);fill:rgb(var(--peculiar-color-light-rgb))}";

const TextHider = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.textExpand = createEvent(this, "textExpand", 7);
        this.opened = false;
    }
    textExpandHandler() {
        this.opened = !this.opened;
    }
    render() {
        return (h(Host, null, h("div", { class: "root" }, h("div", { class: {
                text: true,
                m_opened: this.opened,
            } }, h("slot", null)), h("div", { class: "action" }, h("peculiar-button", { onClick: this.textExpand.emit, class: {
                button_action: true,
                m_opened: this.opened,
            }, fill: this.opened ? 'fill' : 'stroke' }, h("svg", { viewBox: "0 0 7 5", xmlns: "http://www.w3.org/2000/svg", class: {
                expand_icon: true,
            } }, h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M5.459.124c.934.001 1.442.994.84 1.644L4.425 3.794c-.44.475-1.244.475-1.684 0L.862 1.764C.26 1.115.77.12 1.705.122l3.754.003z" })))))));
    }
};
TextHider.style = textHiderCss;

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

export { Button as peculiar_button, CertificateDecoder as peculiar_certificate_decoder, CertificateSummary as peculiar_certificate_summary, CertificateViewer as peculiar_certificate_viewer, Link as peculiar_link, TextHider as peculiar_text_hider, PeculiarTypography as peculiar_typography };
