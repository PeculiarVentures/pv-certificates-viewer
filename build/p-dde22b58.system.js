System.register(['./p-50c6b099.system.js'], function (exports, module) {
    'use strict';
    var CSS, plt, win, promiseResolve, doc, NAMESPACE;
    return {
        setters: [function (module) {
                CSS = module.C;
                plt = module.p;
                win = module.w;
                promiseResolve = module.a;
                doc = module.d;
                NAMESPACE = module.N;
            }],
        execute: function () {
            /*
             Stencil Client Patch v1.17.2 | MIT Licensed | https://stenciljs.com
             */
            var noop = function () {
                /* noop*/
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
            var getDynamicImportFunction = function (namespace) { return "__sc_import_" + namespace.replace(/\s|-/g, '_'); };
            var patchEsm = exports('a', function () {
                // NOTE!! This fn cannot use async/await!
                // @ts-ignore
                if (!(CSS && CSS.supports && CSS.supports('color', 'var(--c)'))) {
                    // @ts-ignore
                    return module.import(/* webpackChunkName: "polyfills-css-shim" */ './p-25477994.system.js').then(function () {
                        if ((plt.$cssShim$ = win.__cssshim)) {
                            return plt.$cssShim$.i();
                        }
                        else {
                            // for better minification
                            return 0;
                        }
                    });
                }
                return promiseResolve();
            });
            var patchBrowser = exports('p', function () {
                {
                    // shim css vars
                    plt.$cssShim$ = win.__cssshim;
                }
                // @ts-ignore
                var scriptElm = Array.from(doc.querySelectorAll('script')).find(function (s) { return new RegExp("/" + NAMESPACE + "(\\.esm)?\\.js($|\\?|#)").test(s.src) || s.getAttribute('data-stencil-namespace') === NAMESPACE; });
                var opts = scriptElm['data-opts'] || {};
                if ('onbeforeload' in scriptElm && !history.scrollRestoration /* IS_ESM_BUILD */) {
                    // Safari < v11 support: This IF is true if it's Safari below v11.
                    // This fn cannot use async/await since Safari didn't support it until v11,
                    // however, Safari 10 did support modules. Safari 10 also didn't support "nomodule",
                    // so both the ESM file and nomodule file would get downloaded. Only Safari
                    // has 'onbeforeload' in the script, and "history.scrollRestoration" was added
                    // to Safari in v11. Return a noop then() so the async/await ESM code doesn't continue.
                    // IS_ESM_BUILD is replaced at build time so this check doesn't happen in systemjs builds.
                    return {
                        then: function () {
                            /* promise noop */
                        },
                    };
                }
                {
                    opts.resourcesUrl = new URL('.', new URL(scriptElm.getAttribute('data-resources-url') || scriptElm.src, win.location.href)).href;
                    {
                        patchDynamicImport(opts.resourcesUrl, scriptElm);
                    }
                    if (!win.customElements) {
                        // module support, but no custom elements support (Old Edge)
                        // @ts-ignore
                        return module.import(/* webpackChunkName: "polyfills-dom" */ './p-1614c190.system.js').then(function () { return opts; });
                    }
                }
                return promiseResolve(opts);
            });
            var patchDynamicImport = function (base, orgScriptElm) {
                var importFunctionName = getDynamicImportFunction(NAMESPACE);
                try {
                    // test if this browser supports dynamic imports
                    // There is a caching issue in V8, that breaks using import() in Function
                    // By generating a random string, we can workaround it
                    // Check https://bugs.chromium.org/p/chromium/issues/detail?id=990810 for more info
                    win[importFunctionName] = new Function('w', "return import(w);//" + Math.random());
                }
                catch (e) {
                    // this shim is specifically for browsers that do support "esm" imports
                    // however, they do NOT support "dynamic" imports
                    // basically this code is for old Edge, v18 and below
                    var moduleMap_1 = new Map();
                    win[importFunctionName] = function (src) {
                        var url = new URL(src, base).href;
                        var mod = moduleMap_1.get(url);
                        if (!mod) {
                            var script_1 = doc.createElement('script');
                            script_1.type = 'module';
                            script_1.crossOrigin = orgScriptElm.crossOrigin;
                            script_1.src = URL.createObjectURL(new Blob(["import * as m from '" + url + "'; window." + importFunctionName + ".m = m;"], { type: 'application/javascript' }));
                            mod = new Promise(function (resolve) {
                                script_1.onload = function () {
                                    resolve(win[importFunctionName].m);
                                    script_1.remove();
                                };
                            });
                            moduleMap_1.set(url, mod);
                            doc.head.appendChild(script_1);
                        }
                        return mod;
                    };
                }
            };
        }
    };
});
