import request from '@/utils/request'
import type { LoginRequestData, LoginResponseData } from './types'

const enum API {
  LOGIN_URL = '/admin/acl/index/login',
}

// 用户登录
export const LoginAPI = (data: LoginRequestData) =>
  request.post<any, LoginResponseData>(API.LOGIN_URL, data)
