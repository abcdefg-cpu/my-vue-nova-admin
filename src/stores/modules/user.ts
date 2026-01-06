import { defineStore } from 'pinia'
import { ref } from 'vue'
import { LoginAPI } from '@/api/user'
import type { LoginRequestData } from '@/api/user/types'
import { SET_TOKEN } from '@/utils/token'

export const useUserStore = defineStore(
  'nova-user',
  () => {
    /* 状态 */
    // 当前表单展示页
    const currentPage = ref(0)
    // 免登陆天数
    const loginDay = ref(7)
    // 是否勾选免登录
    const checked = ref(false)
    // 验证码
    const verifyCode = ref('')
    // token
    const token = ref('')
    // 用户信息
    const userInfo = ref({})

    /* 方法 */
    // 用户登录
    // const userLogin = async (data: LoginRequestData) => {
    //   // 发起请求
    //   const res: LoginResponseData = await LoginAPI(data)
    //   console.log('登录响应:', res)
    //   // pinia储存token
    //   token.value = res.data
    //   // 本地储存token
    //   SET_TOKEN(res.data)
    //   return true // 表示登录成功
    // }

    const userLogin = async (data: LoginRequestData) => {
      console.log('1. 开始登录，请求数据:', data)

      try {
        // 发起请求
        const res = await LoginAPI(data)
        console.log('2. 登录响应:', res)

        // token 就是 res.data（字符串）
        const newToken = res.data
        console.log('3. 获取到的 token:', newToken)
        console.log('4. token 类型:', typeof newToken)
        console.log('5. token 长度:', newToken.length)

        if (!newToken) {
          console.error('6. ❌ token 为空')
          throw new Error('未获取到 token')
        }

        // 更新响应式 token
        token.value = newToken
        console.log('7. ✅ store.token 已更新:', token.value.substring(0, 20) + '...')

        // 本地储存token
        SET_TOKEN(newToken)
        console.log('8. ✅ localStorage 已存储')
        console.log('9. ✅ 验证 localStorage:', localStorage.getItem('token'))

        return true
      } catch (error) {
        console.error('10. ❌ 登录过程出错:', error)
        throw error
      }
    }

    // 获取用户信息
    const getUserInfo = () => {
      console.log(123)
    }

    // 清除用户信息
    const clearUserInfo = () => {
      console.log(123)
    }

    return {
      currentPage,
      loginDay,
      checked,
      verifyCode,
      token,
      userInfo,
      userLogin,
      getUserInfo,
      clearUserInfo,
    }
  },
  {
    persist: true,
  },
)
