System.register(['./p-50c6b099.system.js', './p-dde22b58.system.js'], function () {
    'use strict';
    var bootstrapLazy, patchBrowser;
    return {
        setters: [function (module) {
                bootstrapLazy = module.b;
            }, function (module) {
                patchBrowser = module.p;
            }],
        execute: function () {
            patchBrowser().then(function (options) {
                return bootstrapLazy([["p-df92ebac.system", [[1, "peculiar-circular-progress", { "size": [2], "width": [2] }], [1, "peculiar-highlight-words", { "search": [1] }]]], ["p-c06e52f4.system", [[2, "peculiar-certificate-decoder", { "certificateExample": [1, "certificate-example"], "certificateDecoded": [32] }], [2, "peculiar-certificate-viewer", { "certificate": [1], "download": [4], "authKeyIdParentLink": [513, "auth-key-id-parent-link"], "authKeyIdSiblingsLink": [513, "auth-key-id-siblings-link"], "subjectKeyIdChildrenLink": [513, "subject-key-id-children-link"], "subjectKeyIdSiblingsLink": [513, "subject-key-id-siblings-link"], "issuerDnLink": [513, "issuer-dn-link"], "view": [1], "isDecodeInProcess": [32] }], [2, "peculiar-certificate-summary", { "certificate": [16], "showIssuer": [4, "show-issuer"], "issuerDnLink": [513, "issuer-dn-link"], "view": [1] }], [6, "peculiar-button-split", { "onClick": [16], "fill": [1], "actions": [16], "open": [32] }], [6, "peculiar-text-hider", { "opened": [1540] }, [[0, "textExpand", "textExpandHandler"]]], [1, "peculiar-link", { "href": [1] }], [1, "peculiar-typography", { "type": [1], "color": [1], "align": [1], "ellipsis": [4], "monospace": [4] }], [1, "peculiar-button", { "fill": [1], "disabled": [4], "href": [1], "target": [1] }]]], ["p-55027d58.system", [[2, "peculiar-certificates-viewer", { "certificates": [16], "filterWithSearch": [4, "filter-with-search"], "highlightWithSearch": [4, "highlight-with-search"], "search": [32], "certificatesDecoded": [32], "expandedRow": [32], "certificateSelectedForDetails": [32], "isDecodeInProcess": [32] }]]]], options);
            });
        }
    };
});
