import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';

export const config: Config = {
  autoprefixCss: true,
  namespace: 'peculiar',
  globalStyle: 'src/styles/peculiar.scss',
  devServer: {
    openBrowser: false,
    port: 3000,
  },
  plugins: [
    sass({
      includePaths: ['./src/styles'],
    }),
  ],
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
      copy: [
        // copy locales
        {
          src: 'locales/*.json',
          dest: 'locales',
        },
      ],
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
  buildEs5: false,
  extras: {
    dynamicImportShim: true,
    initializeNextTick: true,
    scriptDataOpts: true,
    experimentalImportInjection: true,
  },
  preamble: '© Peculiar Ventures https://peculiarventures.com/ - MIT License',
};
