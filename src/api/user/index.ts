import request from '@/utils/request'
import type { LoginRequestData, LoginResponseData, GetUserInfoResponseData } from './types'

const enum API {
  LOGIN_URL = '/admin/acl/index/login',
  GETUSERINFO_URL = '/admin/acl/index/info',
  LOGOUT_URL = '/admin/acl/index/logout',
}

// 用户登录
export const LoginAPI = (data: LoginRequestData) =>
  request.post<any, LoginResponseData>(API.LOGIN_URL, data)

// 获取用户信息
export const GetUserInfoAPI = () => request.get<any, GetUserInfoResponseData>(API.GETUSERINFO_URL)

// 退出登录
export const LogoutAPI = () => request.post<any, any>(API.LOGOUT_URL)
