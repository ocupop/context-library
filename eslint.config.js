import typescriptEslint from "@typescript-eslint/eslint-plugin";
import typescriptParser from "@typescript-eslint/parser";
import astroEslintParser from "astro-eslint-parser";
import eslintPluginAstro from "eslint-plugin-astro";
import jsoncPlugin from "eslint-plugin-jsonc";
import jsxA11y from "eslint-plugin-jsx-a11y";
import ymlPlugin from "eslint-plugin-yml";
import jsoncParser from "jsonc-eslint-parser";
import yamlParser from "yaml-eslint-parser";

export default [
  // Base ESLint recommended rules
  {
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
    },
    rules: {
      // Basic ESLint rules
      "no-unused-vars": "warn",
      "no-console": "off",
      "prefer-const": "error",
      "no-var": "error",
      "object-shorthand": "error",
      "prefer-template": "error",
      "template-curly-spacing": "error",
      "padding-line-between-statements": [
        "error",
        { blankLine: "always", prev: ["const", "let", "var"], next: "*" },
        { blankLine: "any", prev: ["const", "let", "var"], next: ["const", "let", "var"] },
      ],
    },
  },

  // TypeScript files
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        project: "./tsconfig.json",
      },
    },
    plugins: {
      "@typescript-eslint": typescriptEslint,
    },
    rules: {
      ...typescriptEslint.configs.recommended.rules,
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-non-null-assertion": "warn",
      // Removed rules that require type information for now
    },
  },

  // JSX/TSX files
  {
    files: ["**/*.jsx", "**/*.tsx"],
    plugins: {
      "jsx-a11y": jsxA11y,
    },
    rules: {
      ...jsxA11y.configs.recommended.rules,
    },
  },

  // Astro files
  {
    files: ["**/*.astro"],
    plugins: {
      astro: eslintPluginAstro,
    },
    languageOptions: {
      parser: astroEslintParser,
      parserOptions: {
        parser: typescriptParser,
        project: "./tsconfig.json",
        extraFileExtensions: [".astro"],
      },
    },
    rules: {
      ...eslintPluginAstro.configs.recommended.rules,
      // Astro-specific rules
      "astro/no-conflict-set-directives": "error",
      "astro/no-unused-define-vars-in-style": "error",
      "astro/no-unused-css-selector": "warn",
      "astro/prefer-class-list-directive": "warn",
      "astro/prefer-split-class-list": "warn",
      "astro/sort-attributes": "off",
    },
  },

  // JSON files
  {
    files: ["**/*.json", "**/*.jsonc"],
    languageOptions: {
      parser: jsoncParser,
    },
    plugins: {
      jsonc: jsoncPlugin,
    },
    rules: {
      "jsonc/quotes": ["error", "double"],
      "jsonc/comma-dangle": ["error", "never"],
    },
  },

  // Enforce the order of keys in Bookshop YAML files
  {
    files: ["**/*.bookshop.yml", "**/*.bookshop.yaml"],
    languageOptions: {
      parser: yamlParser,
    },
    plugins: {
      yml: ymlPlugin,
    },
    rules: {
      ...ymlPlugin.configs.recommended.rules,
      "yml/sort-keys": [
        "error",
        {
          pathPattern: "^$",
          order: ["spec", "blueprint", "preview", "_inputs"],
        },
        {
          pathPattern: "^_inputs\\..*$",
          order: ["type", "label", "comment", "hidden", "options"],
        },
        {
          pathPattern: "^_inputs\\..*\\.options$",
          order: ["values", "structures", "preview"], // Common options keys
        },
      ],
      "yml/quotes": ["error", { prefer: "double", avoidEscape: false }],
      "yml/no-empty-document": "off",
      "yml/no-empty-mapping-value": "off", // Bookshop uses empty values for defaults
      "yml/no-empty-sequence-entry": "off", // Bookshop uses empty arrays for defaults
    },
  },

  // Global ignores
  {
    ignores: [
      "node_modules/**",
      "dist/**",
      ".astro/**",
      "**/*.min.js",
      "packages/*/dist/**",
      "**/.astro/**",
      "**/content.d.ts",
      "**/types.d.ts",
    ],
  },
];
