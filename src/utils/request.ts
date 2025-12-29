import axios from 'axios'

/* 创建axios实例 */
export const request = axios.create({
  baseURL: import.meta.env.BASE_URL,
  timeout: 3000,
})

/* 请求拦截器 */
request.interceptors.request.use(
  // 请求成功
  (config) => {
    return config
  },
  // 请求失败
  (error) => {
    return Promise.reject(error)
  },
)

/* 响应拦截器 */
request.interceptors.response.use(
  // 响应成功
  (response) => {
    return response.data
  },
  // 响应失败
  (error) => {
    return Promise.reject(error)
  },
)

export default request
