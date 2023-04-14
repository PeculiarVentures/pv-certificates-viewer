module.exports = {
  extends: [
    'airbnb',
    'airbnb-typescript',
  ],
  rules: {
    'react/prop-types': [
      2,
      {
        skipUndeclared: true,
      },
    ],
    'react/jsx-props-no-spreading': 0,
    'react/static-property-placement': 0,
    'import/no-extraneous-dependencies': 1,
    'react/react-in-jsx-scope': 0,
    'import/prefer-default-export': 0,
    'react/no-unknown-property': [
      2,
      { ignore: ['class', 'clip-path', 'clip-rule', 'stop-color', 'stroke-width', 'fill-rule'] },
    ],
    '@typescript-eslint/no-unused-vars': 1,
    'no-continue': 1,
    'no-await-in-loop': 1,
    'jsx-a11y/label-has-associated-control': 1,
    'import/extensions': 1,
    'react/jsx-one-expression-per-line': 1,
    'dot-notation': 1,
    'react/function-component-definition': [2, { 'namedComponents': 'arrow-function' }]
  },
  parserOptions: {
    project: './tsconfig.json',
  }
};
