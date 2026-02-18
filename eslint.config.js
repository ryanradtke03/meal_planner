import js from "@eslint/js";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import globals from "globals";
import tseslint from "typescript-eslint";

export default [
  // -------------------------------------
  // Global ignores (flat config style)
  // -------------------------------------
  {
    ignores: [
      "**/node_modules/**",
      "**/dist/**",
      "**/coverage/**",
      "**/generated/**",
      "**/.turbo/**",
    ],
  },

  // -------------------------------------
  // Base JS recommended rules
  // -------------------------------------
  js.configs.recommended,

  // -------------------------------------
  // TypeScript recommended rules
  // -------------------------------------
  ...tseslint.configs.recommended,

  // -------------------------------------
  // WEB (React - Vite)
  // -------------------------------------
  {
    files: ["apps/web/**/*.{ts,tsx}"],

    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },

    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },

    rules: {
      ...reactHooks.configs.recommended.rules,

      "react-refresh/only-export-components": "warn",

      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
    },
  },

  // -------------------------------------
  // API (Node / Express)
  // -------------------------------------
  {
    files: ["apps/api/**/*.ts"],

    languageOptions: {
      globals: {
        ...globals.node,
      },
    },

    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
    },
  },
];