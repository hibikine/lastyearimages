module.exports = {
  extends: ['airbnb'],
  parser: 'typescript-eslint-parser',
  parserOptions: {
    jsx: true,
    useJSXTextNode: true,
  },
  rules: {
    'no-mixed-operators': 'off',
    'no-multi-assign': 'off',
    'no-underscore-dangle': 'off',
    'no-bitwise': 'off',
    'no-unused-vars': 'off',
    'no-undef': 'off',
    'react/default-props-match-prop-types': 'off',
    int32Hint: true,
    'react/jsx-filename-extension': ['error', { extensions: ['.tsx'] }],
    'import/extensions': ['.js', 'jsx', '.json', '.ts', '.tsx'],
  },
  globals: {
    window: true,
    document: true,
    Image: true,
    gtag: true,
    Cookies: true,
    fetch: true,
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
};
