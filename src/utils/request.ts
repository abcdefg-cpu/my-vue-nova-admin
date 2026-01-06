// import axios, {
//   type AxiosInstance,
//   type AxiosResponse,
//   type InternalAxiosRequestConfig,
// } from 'axios'
// import { useUserStore } from '@/stores/modules/user'
// import { ElMessage } from 'element-plus'
// import router from '@/router'

// /* 创建axios实例 */
// export const request: AxiosInstance = axios.create({
//   baseURL: import.meta.env.VITE_APP_BASE_API, // 从环境变量读取
//   timeout: 10000, // 10秒超时
//   headers: {
//     'Content-Type': 'application/json;charset=utf-8',
//   },
// })

// /* 请求拦截器 */
// request.interceptors.request.use(
//   // 请求成功
//   (config: InternalAxiosRequestConfig) => {
//     // const userStore = useUserStore()
//     // const token = userStore.token
//     const token = localStorage.getItem('token')
//     if (token) config.headers.token = token
//     return config
//   },
//   // 请求失败
//   (error) => {
//     return Promise.reject(error)
//   },
// )

// /* 响应拦截器 */
// request.interceptors.response.use(
//   // 响应成功:http响应码为200
//   (response: AxiosResponse) => {
//     // // 【关键1】先判断响应是否存在（避免 response 为 undefined）
//     // if (!response || !response.data) {
//     //   ElMessage.error('接口无响应数据')
//     //   throw new Error('业务失败，状态码: 空响应')
//     // }

//     // // 【关键2】兼容后端返回的状态码字段（code/status/response.status）
//     // const res = response.data
//     // // 优先取后端自定义 code，再取 HTTP 状态码
//     // const statusCode = res.code ?? res.status ?? response.status

//     // // 业务成功判断（根据你后端实际成功码调整，比如 200/0）
//     // if (statusCode === 200 || statusCode === 0) {
//     //   return res
//     // } else {
//     //   // 业务错误（有明确状态码）
//     //   const errMsg = res.message || `业务失败，状态码: ${statusCode}`
//     //   ElMessage.error(errMsg)
//     //   throw new Error(errMsg)
//     // }

//     const res = response.data
//     // 业务响应码：code===200成功
//     if (res.code === 200) {
//       console.log('✅ 业务成功，返回数据')
//       return response.data
//     }
//     // 业务响应码：code!==200成失败
//     console.error('❌ 业务失败，状态码:', res.code)
//     ElMessage.error(res.message || '操作失败')
//     // 返回 reject，阻止后续执行
//     return Promise.reject(new Error(res.message))
//   },
//   // 响应失败：http响应码不为200
//   (error) => {
//     // 【关键3】处理网络异常/超时/请求失败（此时 error.response 可能为 undefined）
//     let errMsg = ''
//     // 分场景处理
//     if (!error.response) {
//       // 无响应：网络问题/后端崩了/跨域
//       errMsg = '网络异常！请检查后端服务是否启动，或是否跨域'
//     } else {
//       // 有响应但 HTTP 状态码错误（401/404/500等）
//       const status = error.response.status
//       const resData = error.response.data
//       errMsg = resData?.message || `请求失败，状态码: ${status}`
//     }

//     // 提示用户 + 抛出具体错误（不再是 undefined）
//     ElMessage.error(errMsg)
//     throw new Error(errMsg) // 这里抛出的错误会被 login 逻辑捕获

//     // // 统一错误处理
//     // // ✅ HTTP 错误
//     // if (error.response) {
//     //   const { status, data } = error.response
//     //   const message = data?.message || getHttpErrorMessage(status)
//     //   ElMessage({ type: 'error', message })

//     //   if (status === 401) {
//     //     const userStore = useUserStore()
//     //     userStore.clearUserInfo()
//     //     router.push('/login')
//     //   }
//     // } else {
//     //   ElMessage.error('网络连接失败，请检查网络')
//     // }
//     // return Promise.reject(error)
//   },
// )

// // /**
// //  * 统一http错误处理函数
// //  * @param status - axios 错误状态码
// //  */
// // function getHttpErrorMessage(status: number): string {
// //   const map: Record<number, string> = {
// //     400: '请求参数错误',
// //     401: '登录已过期',
// //     403: '没有权限',
// //     404: '请求地址错误',
// //     500: '服务器错误',
// //   }
// //   return map[status] || '请求失败'
// // }

import axios, {
  type AxiosInstance,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from 'axios'

import { useUserStore } from '@/stores/modules/user'
import { ElMessage } from 'element-plus'
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
