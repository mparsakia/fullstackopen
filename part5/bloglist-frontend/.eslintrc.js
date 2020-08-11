module.exports = {
  "env": {
      "browser": true,
      "es6": true,
      "jest/globals": true,
      "cypress/globals": true
  },
  "extends": [ 
      "eslint:recommended",
      "plugin:react/recommended"
  ],
  "parserOptions": {
    "ecmaVersion": 2018,
    "sourceType": "module",
      "ecmaFeatures": {
          "jsx": true,
          "modules": true
      },
  },
  "plugins": [
      "react", "jest", "cypress"
  ],
  "rules": {
      "indent": [
          "error",
          2  
      ],
      "quotes": [
          "error",
          "double"
      ],
      "semi": [
          "error",
          "never"
      ],
      "eqeqeq": "error",
      "no-trailing-spaces": "error",
      "object-curly-spacing": [
          "error", "always"
      ],
      "arrow-spacing": [
          "error", { "before": true, "after": true }
      ],
      "no-console": 0,
      "react/prop-types": 0
  }
}