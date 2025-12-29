import request from '@/utils/request'

const enum API {
  LOGIN_URL = '/api/user/login',
}

// 用户登录
export const LoginAPI = (data: any) => request.post(API.LOGIN_URL, data)
