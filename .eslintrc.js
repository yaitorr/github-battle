module.exports = {
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": true,
        },
    },
    "env": {
        "browser": true,
        "es6": true,
        "node": true,
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:import/errors",
        "plugin:import/warnings",
    ],
    "rules": {
        "indent": ["error", 4],
        "quotes": ["error", "single"],
        "object-curly-spacing": ["error", "never"],
        "jsx-quotes": ["error", "prefer-single"],
        "comma-dangle": ["error", "only-multiline"],
    }
};
