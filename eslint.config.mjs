import path from "node:path";
import { fileURLToPath } from "node:url";
import jseslint from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";
import tseslint from "typescript-eslint";
import unicorn from "eslint-plugin-unicorn";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({ baseDirectory: __dirname, recommendedConfig: jseslint.configs.recommended });

export default [
  jseslint.configs.recommended,

  ...tseslint.configs.recommended,
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
    },
  },

  {
    ...unicorn.configs.recommended,
    rules: {
      ...unicorn.configs.recommended.rules,
      "unicorn/no-anonymous-default-export": ["off"],
      "unicorn/no-null": ["off"],
      "unicorn/filename-case": [
        "error",
        {
          cases: {
            kebabCase: true,
          },
        },
      ],
      "unicorn/prevent-abbreviations": ["off"],
    },
  },

  ...compat.extends("prettier"),
];
