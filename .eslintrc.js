const path = require('path');

module.exports = {
  extends: 'vinta/recommended',
  "parser": "babel-eslint",
  "parserOptions": {
    "ecmaVersion": 2017,
    "ecmaFeatures": {
      "jsx": true,
      "modules": true,
      "experimentalObjectRestSpread": true
  }
  },
  rules: {
    'jest/prefer-inline-snapshots': ['off'],
    'import/named': 'off',
    'babel/camelcase': 'off'
  },
  env: {
    es6: true,
    browser: true,
    jest: true
  },
  settings: {
    'import/resolver': {
      webpack: {
        config: path.join(__dirname, '/webpack.local.config.js'),
        'config-index': 1
      }
    },
  },
}
