import { p as patchBrowser, g as globals, b as bootstrapLazy } from './core-facd9e82.js';

patchBrowser().then(options => {
  globals();
  return bootstrapLazy([["pv-button-split",[[1,"pv-button-split",{"onClick":[16],"fill":[1],"actions":[16],"activeSplit":[32]}]]],["pv-text-hider",[[1,"pv-text-hider",{"opened":[1540]},[[0,"textExpand","textExpandHandler"]]]]],["pv-certificate-summary",[[1,"pv-certificate-summary",{"certificate":[16],"showIssuer":[4,"show-issuer"]}]]],["pv-button",[[1,"pv-button",{"fill":[1],"disabled":[4],"href":[1],"target":[1]}]]],["pv-certificate-viewer",[[1,"pv-certificate-viewer",{"certificate":[1]}]]],["pv-certificates-viewer",[[1,"pv-certificates-viewer",{"certificates":[16],"certificatesDecoded":[32],"expandedRow":[32],"certificateSelectedForDetails":[32],"isDecodeInProcess":[32]}]]]], options);
});
