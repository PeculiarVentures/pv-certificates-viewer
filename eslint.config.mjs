/* eslint-disable import/no-unresolved */
import tseslint from 'typescript-eslint';
import baseConfig from '@peculiar/eslint-config-base';
import reactConfig from '@peculiar/eslint-config-react';

export default tseslint.config([
  ...baseConfig,
  ...reactConfig,
  {
    rules: {
      'react/react-in-jsx-scope': 0,
      'react/prop-types': [
        2,
        { skipUndeclared: true },
      ],
      '@typescript-eslint/prefer-for-of': 0,
      'react/no-unknown-property': [
        2,
        { ignore: ['class', 'clip-path', 'clip-rule', 'stop-color', 'stroke-width', 'fill-rule'] },
      ],
      'react/jsx-key': 0,
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          varsIgnorePattern: '^_|h',
          argsIgnorePattern: '^_',
        },
      ],
    },
  },
  {
    ignores: [
      '**/dist/*',
      '**/dist-transpiled/*',
      '**/react-component-lib/*',
      '**/webcomponents/loader/*',
      '**/webcomponents/www/*',
      '**/webcomponents/src/www-copy/*',
      '**/webcomponents/components/*',
      '**/webcomponents/hydrate/*',
      '**/webcomponents/.stencil/*',
      '**/webcomponents/scripts/*',
    ],
  },
]);
