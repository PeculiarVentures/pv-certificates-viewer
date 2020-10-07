import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';
import { postcss } from '@stencil/postcss';
import autoprefixer from 'autoprefixer';

export const config: Config = {
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
    postcss({
      plugins: [autoprefixer()],
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
};
