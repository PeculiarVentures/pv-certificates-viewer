import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';

export const config: Config = {
  namespace: 'peculiar',
  globalStyle: 'src/global/bundle.scss',
  devServer: {
    openBrowser: false,
    port: 3000,
  },
  plugins: [
    sass(),
  ],
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
