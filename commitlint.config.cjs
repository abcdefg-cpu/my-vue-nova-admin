module.exports = {
  /* 忽略的提交 */
  ignores: [(commit) => commit.includes('init')], // 不检查初始化项目提交
  /* 继承基础规范 */
  extends: ['@commitlint/config-conventional'],
  // 校验规则
  rules: {
    'body-leading-blank': [2, 'always'], // 提交信息的 “详细描述部分”（body）前面必须留一个空行。
    'footer-leading-blank': [1, 'always'], // 提交信息的 “备注部分”（footer，比如关闭 issue）前面最好留一个空行（警告级别）。
    'header-max-length': [2, 'always', 108], // 提交信息的 “标题部分”（header）最长不能超过 108 个字符，否则报错。
    'subject-empty': [2, 'never'], // 提交信息的 “主题描述”（subject，标题里的核心内容）不能空着，必须写。
    'type-empty': [2, 'never'], // 提交信息的 “类型”（type）不能空着，必须从下面列表里选一个。
    'type-enum': [
      2,
      'always',
      [
        'feat', //新特性、新功能
        'fix', //修改bug
        'docs', //文档修改
        'style', //代码格式修改, 注意不是 css 修改
        'refactor', //代码重构
        'perf', //优化相关，比如提升性能、体验
        'test', //测试用例修改
        'chore', //其他修改, 比如改变构建流程、或者增加依赖库、工具等
        'revert', //回滚到上一个版本
        'build', //编译相关的修改，例如发布版本、对项目构建或者依赖的改动
      ],
    ],
  },
}
