import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import pluginVue from 'eslint-plugin-vue'

export default [
  // 忽略文件
  {
    ignores: [
      'dist/',
      'node_modules/',
      '.stylelintrc.json',
      '*.json',
      'src/components.d.ts', // 忽略自动生成文件
      'src/auto-imports.d.ts', // 忽略自动生成文件
    ],
  },

  // 基础配置
  {
    files: ['**/*.{js,mjs,cjs,ts,vue}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2024,
        ...globals.node,
        ...globals.jest,
      },
      ecmaVersion: 'latest',
      sourceType: 'module',
      parser: tseslint.parser, // ✅ 正确位置：在 languageOptions 内部
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
  },

  // Vue 文件特殊配置
  {
    files: ['**/*.vue'],
    languageOptions: {
      parser: pluginVue.parser, // Vue 文件使用 Vue 解析器
      parserOptions: {
        parser: tseslint.parser, // Vue 中的 TypeScript 使用 TS 解析器
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
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

  // ESLint 推荐配置
  js.configs.recommended,

  // TypeScript 推荐配置
  ...tseslint.configs.recommended,

  // Vue 推荐配置
  ...pluginVue.configs['flat/essential'],

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

      // TypeScript 规则 - 简化配置
      '@typescript-eslint/no-unused-vars': 'warn', // 改为 warn 而不是 error
      '@typescript-eslint/prefer-ts-expect-error': 'off', // 关闭
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-namespace': 'off',
      '@typescript-eslint/semi': 'off',

      // 关闭 interface 相关报错
      'no-undef': 'off',
      'no-unused-vars': 'off',

      // Vue 规则
      'vue/multi-word-component-names': 'off',
      'vue/no-mutating-props': 'off',
      'vue/attribute-hyphenation': 'off',

      // Vue 标签强制自闭合
      'vue/html-self-closing': [
        'error',
        {
          html: {
            void: 'always',
            normal: 'always',
            component: 'always',
          },
          svg: 'always',
          math: 'always',
        },
      ],
    },
  },
]
