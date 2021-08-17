module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
  ],
  rules: {
    "import/no-unresolved": "off",
    "no-console": "off",
    "consistent-return": "off",
    "import/extensions": "off",
    "import/prefer-default-export": "off",
  },
};
