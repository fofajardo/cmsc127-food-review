// eslint.config.js
import js from "@eslint/js";
import globals from "globals";
import stylisticJs from "@stylistic/eslint-plugin-js";

export default [
    js.configs.recommended,
    {
        plugins: {
            "@stylistic/js": stylisticJs
        },
        languageOptions: {
            globals: {
                ...globals.nodeBuiltin
            }
        },
        rules: {
            "@stylistic/js/indent": [
                "error",
                4
            ],
            "@stylistic/js/quotes": [
                "error",
                "double"
            ],
            "@stylistic/js/semi": [
                "error",
                "always"
            ],
            "@stylistic/js/no-trailing-spaces": "error",
            "@stylistic/js/max-len": [
                "warn",
                { "code": 80 }
            ],
            "no-unused-vars": "warn",
            "no-undef": "warn",
        }
    }
];
