import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useLayoutStore = defineStore(
  'nova-layout',
  () => {
    /* 左侧菜单 */
    // 菜单是否折叠
    const fold = ref(false)
    // 菜单图标的样式
    const iconStyle = computed(() => ({
      transform: fold.value ? 'rotate(180deg)' : 'rotate(0deg)',
      transition: 'transform 0.3s ease',
    }))
    // 切换折叠按钮
    const toggleFold = () => {
      fold.value = !fold.value
    }

    /* 主题设置 */
    const themeColor = ref('rgba(255, 69, 0, 0.68)')
    const predefineColors = ref([
      '#ff4500',
      '#ff8c00',
      '#ffd700',
      '#90ee90',
      '#00ced1',
      '#1e90ff',
      '#c71585',
      'rgba(255, 69, 0, 0.68)',
      'rgb(255, 120, 0)',
      'hsv(51, 100, 98)',
      'hsva(120, 40, 94, 0.5)',
      'hsl(181, 100%, 37%)',
      'hsla(209, 100%, 56%, 0.73)',
      '#c7158577',
    ])

    const setThemeColor = () => {
      const html = document.documentElement
      html.style.setProperty('--el-color-primary', themeColor.value)
    }

    // 暗黑模式
    const isDark = ref(false)
    const toggleDark = () => {
      const html = document.documentElement
      if (isDark.value) {
        html.classList.add('dark')
      } else {
        html.classList.remove('dark')
      }
    }

    return {
      fold,
      iconStyle,
      toggleFold,
      themeColor,
      predefineColors,
      setThemeColor,
      isDark,
      toggleDark,
    }
  },
  {
    persist: true,
  },
)
