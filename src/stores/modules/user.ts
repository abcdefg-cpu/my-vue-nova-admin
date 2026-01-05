import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore(
  'nova-user',
  () => {
    /* 状态 */
    // 当前表单展示页
    const currentPage = ref(0)

    return {
      currentPage,
    }
  },
  {
    persist: true,
  },
)
