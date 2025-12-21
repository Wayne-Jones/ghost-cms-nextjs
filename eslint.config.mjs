import next from "eslint-config-next";
import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import nextEslintPluginNext from "@next/eslint-plugin-next";
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
  allConfig: js.configs.all,
});

export default [
  {
    ignores: [
      "**/node_modules/*",
      "**/dist",
      "**/coverage",
      "**/.next/*",
      "**/*.json",
      "**/*.lock",
      "**/*.css",
      "**/*.scss",
      "**/out/*",
      "**/next-env.d.ts",
    ],
  },
  ...compat.extends("eslint:recommended"),
  ...compat.extends("plugin:react/recommended"),
  ...compat.extends("plugin:@typescript-eslint/recommended"),
  ...compat.extends(
    "plugin:@typescript-eslint/recommended-requiring-type-checking"
  ),
  ...compat.extends("plugin:@next/next/recommended"),
  ...next,
  ...nextCoreWebVitals,
  ...nextTypescript,
  {
    plugins: {
      "@typescript-eslint": typescriptEslint,
      "@next/next": nextEslintPluginNext,
    },

    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },

      parser: tsParser,
      ecmaVersion: 12,
      sourceType: "module",

      parserOptions: {
        project: "./tsconfig.json",

        ecmaFeatures: {
          jsx: true,
        },
      },
    },

    settings: {
      react: {
        version: "detect",
      },
    },

    rules: {},
  },
];
