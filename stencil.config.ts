import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'pv-certificates-viewer',
  globalStyle: 'src/global/variables.css',
  devServer: {
    port: 3000,
  },
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'docs-readme',
      footer: '',
    },
    {
      type: 'www',
      serviceWorker: null, // disable service workers
      copy: [
        {
          src: 'www-copy',
          dest: './',
        },
      ],
    },
  ],
};
