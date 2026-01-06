/* 本地化token */

/* 储存token */
export const SET_TOKEN = (token: string) => {
  localStorage.setItem('token', token)
}

/* 获取token */
export const GET_TOKEN = () => {
  return localStorage.getItem('token')
}

/* 删除token */
export const REMOVE_TOKEN = () => {
  return localStorage.removeItem('token')
}
