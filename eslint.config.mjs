import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    // 匹配所有 JS/JSX 文件
    files: ["**/*.{js,mjs,cjs,jsx}"],
    // 环境配置（解决未定义变量问题）
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.node,    // Node.js 全局变量（require、module 等）
        ...globals.jest,    // Jest 全局变量（describe、it 等）
        ...globals.browser  // 如需浏览器变量，取消注释
      }
    },
    // 插件和规则
    plugins: {
      js: js,
      react: pluginReact
    },
    extends: [
      js.configs.recommended,
      pluginReact.configs.flat.recommended
    ],
    rules: {
      "no-unused-vars": ["warn", { "argsIgnorePattern": "^_" }]
    }
  }
]);