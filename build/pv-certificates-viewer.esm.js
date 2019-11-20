import { p as patchBrowser, g as globals, b as bootstrapLazy } from './core-921931c1.js';

patchBrowser().then(options => {
  globals();
  return bootstrapLazy([["pv-button",[[1,"pv-button",{"fill":[1],"disabled":[4]}]]],["pv-button-split",[[1,"pv-button-split",{"onClick":[16],"fill":[1],"actions":[16],"activeSplit":[32]}]]],["pv-certificate-viewer",[[1,"pv-certificate-viewer",{"certificate":[1]}]]],["pv-certificates-viewer",[[1,"pv-certificates-viewer",{"certificates":[1],"certificatesDecoded":[32],"expandedRow":[32],"certificateSelectedForDetails":[32]}]]]], options);
});
