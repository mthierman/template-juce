// @ts-check
import eslint from "@eslint/js";
import globals from "globals";
import { resolve } from "path";
import tseslint from "typescript-eslint";

import react from "eslint-plugin-react";
import reactJsxRuntime from "eslint-plugin-react/configs/jsx-runtime.js";
import reactRecommended from "eslint-plugin-react/configs/recommended";

// import reactHooks from "eslint-plugin-react-hooks";

export default tseslint.config(
    eslint.configs.recommended,
    ...tseslint.configs.strictTypeChecked,
    ...tseslint.configs.stylisticTypeChecked,
    reactRecommended,
    reactJsxRuntime,
    {
        ignores: ["**/build/**"],
    },
    {
        plugins: {
            react,
            // reactHooks,
        },
        rules: {
            // ...reactHooks.configs.recommended.rules,
        },
        languageOptions: {
            globals: {
                ...globals.browser,
            },
            parserOptions: {
                project: ["./tsconfig.vite.json"],
                tsconfigRootDir: import.meta.dirname,
                ecmaFeatures: {
                    jsx: true,
                },
            },
        },
    },
    {
        files: ["**/*.config.ts"],
        languageOptions: {
            globals: {
                ...globals.node,
            },
            parserOptions: {
                project: ["./tsconfig.node.json"],
                tsconfigRootDir: import.meta.dirname,
            },
        },
    },
    {
        files: ["**/*.config.mjs"],
        languageOptions: {
            globals: {
                ...globals.node,
            },
        },
        ...tseslint.configs.disableTypeChecked,
    },
);
