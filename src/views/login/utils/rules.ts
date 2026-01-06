/* 表单验证的规则 */
import { useUserStore } from '@/stores/modules/user'
const userStore = useUserStore()
/* 1、账号密码登录表单 */
export const loginRules = {
  username: [
    {
      validator: (rules: any, value: any, callback: any) => {
        if (value === '') {
          callback(new Error('请输入用户名'))
        } else if (!/^[0-9A-Za-z]{5,15}$/.test(value)) {
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

/* 2、注册表单 */
// 手机号正则表达式
const phoneRegex = /^(?:(?:\+|00)86)?1[3-9]\d{9}$/
export const phoneRules = {
  phone: [
    {
      validator: (rules: any, value: any, callback: any) => {
        if (value === '') {
          callback(new Error('请输入手机号'))
        } else if (!phoneRegex.test(value)) {
          callback(new Error('请输入正确的手机号'))
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
        } else if (!/^[0-9]{6}$/.test(value)) {
          callback(new Error('请输入6位数字验证码'))
        } else {
          callback()
        }
      },
      trigger: 'blur',
    },
  ],
}
