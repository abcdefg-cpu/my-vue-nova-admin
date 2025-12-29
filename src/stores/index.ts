import { createPinia } from 'pinia'
import { createPersistedState } from 'pinia-plugin-persistedstate'

const pinia = createPinia()

// 使用持久化插件
pinia.use(
  createPersistedState({
    // 全局配置
    storage: localStorage, // 默认 localStorage
    key: (id: any) => `__persisted__${id}`, // 存储的 key
    // 只持久化指定的状态
    // paths: ['user'], // 只持久化 user store
    // 自定义序列化
    serializer: {
      serialize: JSON.stringify,
      deserialize: JSON.parse,
    },
  }),
)

export default pinia
