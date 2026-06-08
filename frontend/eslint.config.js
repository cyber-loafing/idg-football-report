import js from "@eslint/js";

const browserGlobals = {
  console: "readonly",
  document: "readonly",
  fetch: "readonly",
  FormData: "readonly",
  localStorage: "readonly",
  navigator: "readonly",
  process: "readonly",
  setInterval: "readonly",
  clearInterval: "readonly",
  URL: "readonly",
  URLSearchParams: "readonly",
  window: "readonly"
};

export default [
  {
    ignores: ["dist/**"]
  },
  js.configs.recommended,
  {
    files: ["src/**/*.js", "vite.config.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: browserGlobals
    },
    rules: {
      "no-unused-vars": "off"
    }
  }
];
