/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:vue/vue3-recommended',
    '@vue/typescript/recommended',
    'prettier'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    'no-console': 1,
    'no-debugger': 2,
    'prettier/prettier': 'error',
    'no-mixed-spaces-and-tabs': [2, 'smart-tabs'],
    'vue/max-attributes-per-line': [
      'error',
      {
        singleline: {
          max: 3
        },
        multiline: {
          max: 3
        }
      }
    ]
  },
  plugins: ['@typescript-eslint', 'prettier']
};
