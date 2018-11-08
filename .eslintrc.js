module.exports = {
  extends: 'airbnb',
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
    int32Hint: true,
    'react/jsx-filename-extension': ['error', { extensions: ['.tsx'] }],
    'import/no-unresolved': 'off',
    'import/extensions': 'off',
  },
  globals: {
    window: true,
    document: true,
    Image: true,
    gtag: true,
    Cookies: true,
    fetch: true,
  },
};
