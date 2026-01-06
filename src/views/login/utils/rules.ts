/* 表单验证的规则 */
import { useUserStore } from '@/stores/modules/user'
const userStore = useUserStore()
// 账号密码表单
export const loginRules = {
  username: [
    {
      validator: (rules: any, value: any, callback: any) => {
        if (value === '') {
          callback(new Error('请输入用户名'))
        } else if (!/[0-9A-Za-z]{5,15}/.test(value)) {
          callback(new Error('请输入5~15位字母或数字'))
        } else {
          callback()
        }
      },
      trigger: 'blur',
    },
  ],
  password: [
    {
      validator: (rules: any, value: any, callback: any) => {
        if (value === '') {
          callback(new Error('请输入密码'))
        } else if (!/[0-9A-Za-z]{6,15}/.test(value)) {
          callback(new Error('请输入6~15位字母或数字'))
        } else {
          callback()
        }
      },
      trigger: 'blur',
    },
  ],
  verifyCode: [
    {
      validator: (rules: any, value: any, callback: any) => {
        if (value === '') {
          callback(new Error('请输入验证码'))
        } else if (value !== userStore.verifyCode) {
          callback(new Error('验证码输入错误'))
        } else {
          callback()
        }
      },
      trigger: 'blur',
    },
  ],
}
