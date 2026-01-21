/* 对话框里表单验证 */
export const rules = {
  tmName: [
    {
      required: true,
      validator: (rule: any, value: any, callback: any) => {
        if (!value) {
          callback(new Error('请输入品牌名称'))
        }
        if (!/^\S{2,10}$/.test(value)) {
          callback(new Error('品牌名称是大于2~10位非空字符'))
        }
        callback()
      },
      trigger: 'blur',
    },
  ],
  logoUrl: [
    {
      required: true,
      validator: (rule: any, value: any, callback: any) => {
        if (!value) {
          callback(new Error('请上传图片'))
        }
        callback()
      },
    },
  ],
}
