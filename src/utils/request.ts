import axios, {
  type AxiosInstance,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from 'axios'
import { useUserStore } from '@/stores/modules/user'
import { ElMessage } from 'element-plus'
import router from '@/router'

/* 创建axios实例 */
export const request: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API, // 从环境变量读取
  timeout: 10000, // 10秒超时
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
})

/* 请求拦截器 */
request.interceptors.request.use(
  // 请求成功
  (config: InternalAxiosRequestConfig) => {
    // const userStore = useUserStore()
    // const token = userStore.token
    const token = localStorage.getItem('token')
    if (token) config.headers.token = token
    return config
  },
  // 请求失败
  (error) => {
    return Promise.reject(error)
  },
)

/* 响应拦截器 */
request.interceptors.response.use(
  // 响应成功:http响应码为200
  (response: AxiosResponse) => {
    const res = response.data
    // 业务响应码：code===200成功
    if (res.code === 200) {
      console.log('✅ 业务成功，返回数据')
      return response.data
    }
    // 业务响应码：code!==200成失败
    console.error('❌ 业务失败，状态码:', res.code)
    ElMessage.error(res.message || '操作失败')
    // 返回 reject，阻止后续执行
    return Promise.reject(new Error(res.message))
  },
  // 响应失败：http响应码不为200
  (error) => {
    // 统一错误处理
    // ✅ HTTP 错误
    if (error.response) {
      const { status, data } = error.response
      const message = data?.message || getHttpErrorMessage(status)
      ElMessage({ type: 'error', message })

      if (status === 401) {
        const userStore = useUserStore()
        userStore.clearUserInfo()
        router.push('/login')
      }
    } else {
      ElMessage.error('网络连接失败，请检查网络')
    }
    return Promise.reject(error)
  },
)

/**
 * 统一http错误处理函数
 * @param status - axios 错误状态码
 */
function getHttpErrorMessage(status: number): string {
  const map: Record<number, string> = {
    400: '请求参数错误',
    401: '登录已过期',
    403: '没有权限',
    404: '请求地址错误',
    500: '服务器错误',
  }
  return map[status] || '请求失败'
}

export default request
