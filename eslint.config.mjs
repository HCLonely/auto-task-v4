import { defineConfig, globalIgnores } from "eslint/config";
import { fixupConfigRules, fixupPluginRules } from "@eslint/compat";
import _import from "eslint-plugin-import";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default defineConfig([globalIgnores(["dist/**/*", "src/header.js", ".history/**/*", "node_modules/**/*", "**/*.user.js", "*.config.js", "test/**/*", "*.js"]), {
    files: ["src/**/*.ts"],
    extends: fixupConfigRules(compat.extends(
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:import/recommended",
    )),

    plugins: {
        import: fixupPluginRules(_import),
        "@typescript-eslint": fixupPluginRules(typescriptEslint),
    },

    languageOptions: {
        globals: {
            ...globals.browser,
            ...globals.node,
            GM_getValue: "readonly",
            GM_setValue: "readonly",
            Cookies: "readonly",
            Swal: "readonly",
            sha1: "readonly",
            unsafeWindow: true,
            $: true,
        },

        parser: tsParser,
        ecmaVersion: 12,
        sourceType: "module",
    },

    rules: {
        indent: ["error", 2],
        "linebreak-style": ["error", "windows"],
        quotes: ["error", "single"],
        semi: ["error", "always"],

        "prefer-const": ["error", {
            destructuring: "any",
            ignoreReadBeforeAssign: false,
        }],

        "no-var": "error",
        "no-new-object": "error",
        "object-shorthand": "error",
        "quote-props": ["error", "as-needed"],
        "prefer-object-spread": "error",
        "no-array-constructor": "error",
        "array-callback-return": "error",

        "prefer-destructuring": ["error", {
            array: true,
            object: true,
        }],

        "prefer-template": "error",
        "template-curly-spacing": ["error", "never"],
        "no-eval": "error",
        "func-style": ["error", "expression"],
        "wrap-iife": ["error", "outside"],
        "no-loop-func": "error",
        "prefer-rest-params": "error",
        "default-param-last": "error",
        "no-new-func": "error",

        "space-before-function-paren": ["error", {
            anonymous: "always",
            named: "never",
            asyncArrow: "always",
        }],

        "space-before-blocks": "error",
        "no-param-reassign": "error",
        "prefer-spread": "error",
        "prefer-arrow-callback": "error",
        "arrow-spacing": "error",
        "arrow-parens": "error",
        "arrow-body-style": "error",

        "no-confusing-arrow": ["error", {
            allowParens: true,
        }],

        "implicit-arrow-linebreak": ["error", "beside"],
        "no-useless-constructor": "error",
        "class-methods-use-this": 0,
        "no-duplicate-imports": "error",
        "import/no-mutable-exports": "error",
        "import/prefer-default-export": "error",
        "import/first": "error",

        "object-curly-newline": ["error", {
            ObjectPattern: {
                multiline: true,
            },
        }],

        "import/no-webpack-loader-syntax": "error",
        "import/extensions": 0,
        "import/no-unresolved": 0,
        "no-iterator": "error",
        "generator-star-spacing": ["error", "after"],
        "dot-notation": "error",
        "one-var": ["error", "never"],
        "no-multi-assign": "error",
        "no-plusplus": "error",
        "operator-linebreak": ["error", "after"],
        eqeqeq: "error",
        "no-nested-ternary": "error",
        "no-unneeded-ternary": "error",
        "no-mixed-operators": "error",
        "nonblock-statement-body-position": ["error", "beside"],

        "brace-style": ["error", "1tbs", {
            allowSingleLine: true,
        }],

        "no-else-return": "error",
        "spaced-comment": ["error", "always"],
        "keyword-spacing": "error",
        "space-infix-ops": "error",
        "eol-last": ["error", "always"],
        "newline-per-chained-call": "error",
        "no-whitespace-before-property": "error",
        "padded-blocks": ["error", "never"],

        "no-multiple-empty-lines": ["error", {
            max: 1,
        }],

        "space-in-parens": ["error", "never"],
        "array-bracket-spacing": ["error", "never"],
        "object-curly-spacing": ["error", "always"],

        "max-len": ["error", {
            code: 200,
        }],

        "block-spacing": "error",

        "comma-spacing": ["error", {
            before: false,
            after: true,
        }],

        "computed-property-spacing": ["error", "never"],
        "func-call-spacing": ["error", "never"],
        "key-spacing": "error",
        "no-trailing-spaces": "error",
        "comma-style": "error",
        "comma-dangle": ["error", "never"],
        "no-new-wrappers": "error",
        radix: "error",
        "id-length": "error",
        "no-constant-binary-expression": "off",

        camelcase: ["error", {
            allow: ["GM_info"],
        }],

        "new-cap": ["error", {
            capIsNewExceptions: [
                "GM_xmlhttpRequest",
                "GM_addStyle",
                "GM_setValue",
                "GM_getValue",
                "GM_deleteValue",
                "GM_registerMenuCommand",
                "GM_openInTab",
                "GM_listValues",
                "GM_setClipboard",
                "GM_getResourceText",
            ],
        }],

        "no-underscore-dangle": "error",
        "@typescript-eslint/ban-ts-comment": "off",
        "@typescript-eslint/no-unused-expressions": "off",
        "@typescript-eslint/no-explicit-any": "off",
    },
}]);
