import { defineStore } from 'pinia'
import { ref } from 'vue'
import { LoginAPI } from '@/api/user'
import type { LoginRequestData, LoginResponseData } from '@/api/user/types'
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
    const userLogin = async (data: LoginRequestData) => {
      // 发起请求
      const res: LoginResponseData = await LoginAPI(data)
      // pinia储存token
      token.value = res.data
      // 本地储存token
      SET_TOKEN(res.data)
      // 表示登录成功
      return true
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
