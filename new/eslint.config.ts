import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    plugins: { js },
  },
  globalIgnores([
    "node_modules",
    "dist",
    "build",
    "public",
    "coverage",
    "stories",
    ".storybook",
    ".react-router",
  ]),
  tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    languageOptions: { globals: globals.browser },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      "empty-object-pattern": "off",
      "react/jsx-uses-react": "off",
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
    },
  },
]);
