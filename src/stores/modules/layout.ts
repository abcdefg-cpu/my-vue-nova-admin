import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useLayoutStore = defineStore(
  'nova-layout',
  () => {
    /* 状态 */
    // 菜单是否折叠
    const fold = ref(false)
    // 图标的样式
    const iconStyle = computed(() => ({
      transform: fold.value ? 'rotate(180deg)' : 'rotate(0deg)',
      transition: 'transform 0.3s ease',
    }))

    /* 方法 */
    // 切换按钮
    const toggle = () => {
      fold.value = !fold.value
    }

    return {
      fold,
      iconStyle,
      toggle,
    }
  },
  {
    persist: true,
  },
)
