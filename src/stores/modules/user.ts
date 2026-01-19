import { defineStore } from 'pinia'
import { ref } from 'vue'
import { LoginAPI, GetUserInfoAPI, LogoutAPI } from '@/api/user'
import type { LoginRequestData, LoginResponseData, GetUserInfoResponseData } from '@/api/user/types'
import { SET_TOKEN, REMOVE_TOKEN } from '@/utils/token'
import { constantRoutes } from '@/router/routes'
import { MenuItem } from '@/types/router'
import router from '@/router'

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
    // 静态路由列表
    const menuRoutes: MenuItem[] = constantRoutes
    // 用户信息
    const defaultUserInfo = {
      routes: [],
      buttons: [],
      roles: [],
      name: '',
      avatar: '',
    }

    const userInfo = ref({
      routes: [],
      buttons: [],
      roles: [],
      name: '',
      avatar: '',
    })

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
    const getUserInfo = async () => {
      const res: GetUserInfoResponseData = await GetUserInfoAPI()
      userInfo.value = res.data
      return true
    }

    // 退出登录
    const userLogout = async () => {
      await LogoutAPI()
      token.value = ''
      REMOVE_TOKEN()
      userInfo.value = { ...defaultUserInfo }
      router.push('/login')
      return true
    }

    return {
      currentPage,
      loginDay,
      checked,
      verifyCode,
      token,
      menuRoutes,
      userInfo,
      userLogin,
      getUserInfo,
      userLogout,
    }
  },
  {
    persist: true,
  },
)
