import { p as patchBrowser, b as bootstrapLazy } from './index-d38ac7fc.js';
import { g as globalScripts } from './app-globals-0f993ce5.js';

patchBrowser().then(options => {
  globalScripts();
  return bootstrapLazy([["peculiar-text-hider",[[6,"peculiar-text-hider",{"opened":[1540]},[[0,"textExpand","textExpandHandler"]]]]],["peculiar-certificates-viewer",[[2,"peculiar-certificates-viewer",{"certificates":[16],"filterWithSearch":[4,"filter-with-search"],"highlightWithSearch":[4,"highlight-with-search"],"search":[32],"certificatesDecoded":[32],"expandedRow":[32],"certificateSelectedForDetails":[32],"isDecodeInProcess":[32]}]]],["peculiar-certificate-decoder",[[2,"peculiar-certificate-decoder",{"certificateExample":[1,"certificate-example"],"certificateDecoded":[32]}]]],["peculiar-circular-progress",[[1,"peculiar-circular-progress",{"size":[2],"width":[2]}]]],["peculiar-highlight-words",[[1,"peculiar-highlight-words",{"search":[1]}]]],["peculiar-button-split",[[6,"peculiar-button-split",{"onClick":[16],"fill":[1],"actions":[16],"activeSplit":[32]}]]],["peculiar-typography",[[1,"peculiar-typography",{"type":[1],"color":[1],"align":[1],"ellipsis":[4],"monospace":[4]}]]],["peculiar-certificate-summary",[[2,"peculiar-certificate-summary",{"certificate":[16],"showIssuer":[4,"show-issuer"],"issuerDnLink":[1,"issuer-dn-link"],"view":[1]}]]],["peculiar-button",[[1,"peculiar-button",{"fill":[1],"disabled":[4],"href":[1],"target":[1]}]]],["peculiar-certificate-viewer",[[2,"peculiar-certificate-viewer",{"certificate":[1],"download":[4],"authKeyIdParentLink":[1,"auth-key-id-parent-link"],"authKeyIdSiblingsLink":[1,"auth-key-id-siblings-link"],"subjectKeyIdChildrenLink":[1,"subject-key-id-children-link"],"subjectKeyIdSiblingsLink":[1,"subject-key-id-siblings-link"],"issuerDnLink":[1,"issuer-dn-link"],"view":[1],"isDecodeInProcess":[32]}]]]], options);
});