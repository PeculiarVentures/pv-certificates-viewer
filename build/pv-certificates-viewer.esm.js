import { p as patchBrowser, g as globals, b as bootstrapLazy } from './core-cdbd8562.js';

patchBrowser().then(options => {
  globals();
  return bootstrapLazy([["pv-certificate-viewer",[[1,"pv-certificate-viewer",{"certificate":[1]}]]],["pv-certificates-viewer",[[1,"pv-certificates-viewer",{"certificates":[1],"certificatesDecoded":[32],"expandedRow":[32],"certificateSelectedForDetails":[32]}]]]], options);
});
