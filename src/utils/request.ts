import axios, {
  type AxiosInstance,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from 'axios'

import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores/modules/user'
/* 创建axios实例 */
const request: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
})

/* 请求拦截器 */
request.interceptors.request.use(
  // 请求成功
  (config: InternalAxiosRequestConfig) => {
    const userStore = useUserStore()
    if (userStore.token && config.headers) config.headers.token = userStore.token
    return config
  },

  // 请求失败
  (error) => Promise.reject(error),
)

/* 响应拦截器 */
request.interceptors.response.use(
  // 第一步：处理有响应的情况（HTTP请求发出去了，后端有返回
  (response: AxiosResponse) => {
    const { data } = response
    const httpStatus = response.status

    // 1、校验http响应成功：状态码2XX
    if (httpStatus < 200 || httpStatus >= 300) {
      ElMessage.error(`HTTP请求失败，状态码：${httpStatus}`)
      throw new Error(`HTTP_ERROR: ${httpStatus}`)
    }

    // 2、校验后端返回数据是否为空
    // 如果后端返回数据为空
    if (!data) {
      ElMessage.error('后端返回数据为空')
      throw new Error('EMPTY_RESPONSE')
    }

    // 如果后端返回数据不为空
    const { code, msg } = data
    // 3、校验后端状态码
    if (code === 200) {
      return data
    } else {
      ElMessage.error(msg || '业务请求失败！')
      throw new Error(`BUSINESS_ERROR: ${code} - ${msg}`)
    }
  },

  // 第二步：处理无响应的情况（网络异常/超时/跨域等，无response对象）
  (error) => {
    let errorMsg = ''
    const httpStatus = error.response?.status

    if (!error.response) {
      // 无响应：网络问题/后端崩了/跨域
      errorMsg = '网络异常！请检查后端服务是否启动'
    } else {
      // 有响应但http状态码错误
      switch (httpStatus) {
        case 401:
          errorMsg = 'TOKEN过期'
          break
        case 403:
          errorMsg = '无权限访问'
          break
        case 404:
          errorMsg = '接口地址不存在'
          break
        case 500:
          errorMsg = '服务器出现问题'
          break
        default:
          errorMsg = `请求失败（${httpStatus}）`
          break
      }
    }
    // 2. 统一提示 + 抛出异常（让上层捕获）
    ElMessage.error(errorMsg)
    throw new Error(`NETWORK_ERROR: ${errorMsg}`)
  },
)
export default request
