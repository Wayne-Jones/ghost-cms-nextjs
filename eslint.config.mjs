import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

export default defineConfig([
  // Next.js base + Core Web Vitals rules
  ...nextVitals,
  // TypeScript‑specific rules (includes @typescript-eslint/recommended)
  ...nextTypescript,
  // Extend the default ignore patterns from eslint‑config‑next.
  globalIgnores([
    "**/node_modules/**",
    "**/dist/**",
    "**/coverage/**",
    "**/.next/**",
    "**/out/**",
    "**/build/**",
    "**/next-env.d.ts",
    "**/*.min.js", // ignore generated/minified assets
    "**/eslint.config.mjs", // avoid linting this config file
  ]),
]);
