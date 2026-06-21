import { defineConfig } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

export default defineConfig([
  ...nextVitals,
  ...nextTypescript,
  {
    ignores: [
      "**/node_modules/**",
      "**/dist/**",
      "**/coverage/**",
      "**/.next/**",
      "**/out/**",
      "**/build/**",
      "**/next-env.d.ts",
      "**/*.min.js",
      "**/eslint.config.mjs",
    ],
  },
]);
