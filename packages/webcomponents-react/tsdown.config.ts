import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: {
    index: 'src/index.ts',
  },
  // ESM only. CommonJS consumers load it through require(esm) on Node ^20.19 / >=22.12.
  format: ['esm'],
  platform: 'neutral',
  dts: true,
  clean: true,
  // Emit one file per source module. Bundled multi-entry declarations leave
  // rolldown's `__exportAll` namespace helper in shared declaration chunks
  // (see rolldown/tsdown#1051); unbundled output keeps it in its own module.
  // It also keeps the 'use client' directive at the top of dist/components.js.
  unbundle: true,
  // Keep .js/.d.ts output names (package.json is "type": "module")
  // instead of fixed .mjs/.d.mts extensions.
  fixedExtension: false,
  // react, react-dom, @peculiar/certificates-viewer (including its components/*.js
  // subpaths) and @stencil/react-output-target/runtime stay imports.
  deps: {
    neverBundle: true,
  },
  exports: {
    legacy: true,
  },
  outputOptions: {
    // Drop TSDoc from the JS output; docs ship in the .d.ts files. Keep
    // @__PURE__ annotations so bundlers can tree-shake.
    comments: { legal: true, annotation: true, jsdoc: false },
  },
  // The published 5.x packages ship dist/ with a source map.
  outDir: 'dist',
  sourcemap: true,
  tsconfig: 'tsconfig.json',
  attw: {
    level: 'error',
    profile: 'esm-only',
  },
});
