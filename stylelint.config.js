// @ts-check

/** @type {import("stylelint").Config} */
export default {
  /* 继承现有规范 */
  extends: [
    'stylelint-config-standard', // 基础的 CSS 规范（官方推荐）
    'stylelint-config-html/vue', // 支持 Vue 文件中的样式校验
    'stylelint-config-recess-order', // 强制 CSS 属性按一定顺序排列（如先布局后样式）
  ],
  /* 启用插件 */
  plugins: [
    'stylelint-scss', // 支持 SCSS 语法的校验
    'stylelint-order', // 控制 CSS 属性的顺序（配合上面的 recess-order）
    'stylelint-prettier', // 让 stylelint 和 Prettier 格式化工具配合工作（避免冲突）
  ],
  /* 不同文件的特殊配置 */
  overrides: [
    // .css、.html、.vue 文件
    {
      files: ['**/*.(css|html|vue)'],
      customSyntax: 'postcss-html', // 用 postcss-html 解析这些文件中的样式
    },
    // .scss 文件
    {
      files: ['*.scss', '**/*.scss'],
      customSyntax: 'postcss-scss', // 用 postcss-scss 解析 SCSS 语法
      extends: [
        'stylelint-config-standard-scss', // SCSS 专用的基础规范
        'stylelint-config-recommended-vue/scss', // Vue 中 SCSS 的推荐规范
      ],
    },
  ],
  /* 具体校验规则 */
  rules: {
    'prettier/prettier': true, // 启用 Prettier 格式化样式
    'selector-class-pattern': null, // 关闭类名格式校验（不限制类名命名规则）
    'no-descending-specificity': null, // 关闭 “选择器优先级递减” 错误（允许低优先级样式覆盖高优先级）
    'scss/dollar-variable-pattern': null, // 关闭 SCSS 变量名格式校验（不限制 $变量 的命名）
    'no-empty-source': null, //关闭 禁止空样式源 规则
    'font-family-no-missing-generic-family-keyword': null, //允许缺少通用字体族
    // 'font-family-no-duplicate-names': null, // 允许重复的字体名称
    'selector-pseudo-class-no-unknown': [
      true, // 允许使用 Vue 特有的伪类（如 :deep、:global），不报错
      {
        ignorePseudoClasses: ['deep', 'global'],
      },
    ],
    'selector-pseudo-element-no-unknown': [
      true, // 允许使用 Vue 特有的伪元素（如 ::v-deep），不报错
      {
        ignorePseudoElements: ['v-deep', 'v-global', 'v-slotted'],
      },
    ],
    'at-rule-no-unknown': [
      true, // 允许使用特定的 @ 规则（如 Tailwind 的 @apply、SCSS 的 @mixin）
      {
        ignoreAtRules: [
          'tailwind',
          'apply',
          'variants',
          'responsive',
          'screen',
          'function',
          'if',
          'each',
          'include',
          'mixin',
          'use',
        ],
      },
    ],
    'rule-empty-line-before': [
      'always', // 规则前必须有空行（除非在注释后或嵌套在最内层）
      {
        ignore: ['after-comment', 'first-nested'],
      },
    ],
    'unit-no-unknown': [
      true, // 允许使用 rpx 单位
      { ignoreUnits: ['rpx'] },
    ],
    'order/order': [
      //强制 CSS 属性按固定顺序排列（变量 → 自定义属性 → @规则 → 声明 → ...），违反只警告不报错
      [
        'dollar-variables',
        'custom-properties',
        'at-rules',
        'declarations',
        {
          type: 'at-rule',
          name: 'supports',
        },
        {
          type: 'at-rule',
          name: 'media',
        },
        'rules',
      ],
      { severity: 'warning' },
    ],
  },
  /* 忽略文件 */
  ignoreFiles: ['**/*.js', '**/*.ts', '**/*.jsx', '**/*.tsx', 'report.html'],
}
