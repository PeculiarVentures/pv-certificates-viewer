import { p as patchBrowser, g as globals, b as bootstrapLazy } from './core-81618ee4.js';

patchBrowser().then(options => {
  globals();
  return bootstrapLazy([["pv-certificates-viewer",[[1,"pv-certificates-viewer",{"certificates":[1],"certificatesDecoded":[32],"expanded":[32]}]]]], options);
});
