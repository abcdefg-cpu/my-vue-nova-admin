/* 用户相关API的数据类型 */

/** 公共数据 */
export interface ResponseData {
  code: number
  message: string
  ok: boolean
}

/** 用户登录 */
// 请求携带数据
export type LoginRequestData = {
  username: string
  password: string
}

// 返回的数据
export interface LoginResponseData extends ResponseData {
  data: string
}

/** 获取用户信息 */
// 返回的数据里data字段（用户信息）
export interface UserInfoResponseData {
  routes: string[]
  buttons: string[]
  roles: string[]
  name: string
  avatar: string
}

// 返回的数据
export interface GetUserInfoResponseData extends ResponseData {
  data: UserInfoResponseData
}
