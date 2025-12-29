import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import pluginVue from 'eslint-plugin-vue'
import pluginPrettier from 'eslint-plugin-prettier'
import configPrettier from 'eslint-config-prettier'

export default [
  // 忽略文件
  {
    ignores: ['dist/', 'node_modules/', '.stylelintrc.json', '*.json'],
  },

  // 基础配置
  {
    files: ['**/*.{js,mjs,cjs,ts,vue}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2024,
        ...globals.node, // 关键：添加 Node.js 全局变量
        ...globals.jest,
      },
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
  },

  // CommonJS 文件特殊配置
  {
    files: ['**/*.cjs'],
    languageOptions: {
      sourceType: 'commonjs',
    },
    rules: {
      'no-undef': 'off',
    },
  },

  // 配置文件特殊处理
  {
    files: ['**/*.config.{js,cjs}', '**/.stylelintrc.*', '**/.eslintrc.*'],
    languageOptions: {
      sourceType: 'commonjs',
    },
    rules: {
      'no-undef': 'off',
    },
  },

  // 其他配置...
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs['flat/essential'],
  {
    plugins: {
      prettier: pluginPrettier,
    },
    rules: {
      ...configPrettier.rules,
      ...pluginPrettier.configs.recommended.rules,
    },
  },
  // 自定义规则
  {
    rules: {
      // ESLint 规则
      'no-var': 'error',
      'no-multiple-empty-lines': ['warn', { max: 1 }],
      'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
      'no-unexpected-multiline': 'error',
      'no-useless-escape': 'off',

      // TypeScript 规则
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/prefer-ts-expect-error': 'error',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-namespace': 'off',
      '@typescript-eslint/semi': 'off',

      // Vue 规则
      'vue/multi-word-component-names': 'off',
      // 'vue/script-setup-uses-vars': 'error',
      'vue/no-mutating-props': 'off',
      'vue/attribute-hyphenation': 'off',
    },
  },
]
