import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';

export const config: Config = {
  autoprefixCss: true,
  namespace: 'peculiar',
  globalStyle: 'src/css/peculiar.scss',
  devServer: {
    openBrowser: true,
    port: 3000,
  },
  plugins: [
    sass(),
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
      type: 'dist-custom-elements',
      dir: 'components',
      copy: [
        {
          src: '../scripts/custom-elements',
          dest: 'components',
          warn: true,
        },
      ],
      includeGlobalScripts: false,
    },
    { type: 'dist-hydrate-script' },
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
  testing: {
    setupFilesAfterEnv: [
      '<rootDir>/src/tests/setupTests.ts',
    ],
  },
  buildEs5: 'prod',
  preamble: '© Peculiar Ventures https://peculiarventures.com/ - MIT License',
};
