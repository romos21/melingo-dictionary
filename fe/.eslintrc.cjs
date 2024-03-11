module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "plugin:react/recommended",
        "standard-with-typescript",
        'plugin:prettier/recommended'
    ],
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "prettier",
    ],
    "rules": {
        '@typescript-eslint/no-non-null-assertion': 'off',
        'react/react-in-jsx-scope': 'off',
        '@typescript-eslint/strict-boolean-expressions': 'off',
        '@typescript-eslint/no-misused-promises': 'off',
    },
    "ignorePatterns": ["assets", ".eslintrc.cjs", "vite.config.ts", "vite-env.d.ts", "jest.config.js"],
}
