import { ref } from 'vue'

export const useFormatTime = () => {
  const welcome = ref('')
  const time = new Date()
  const Hours = time.getHours()
  if (Hours > 19) {
    welcome.value = '晚上好'
  } else if (Hours > 12) {
    welcome.value = '下午好'
  } else if (Hours > 10) {
    welcome.value = '中午好'
  } else if (Hours > 6) {
    welcome.value = '早上好'
  } else {
    welcome.value = '凌晨好'
  }

  return { time, Hours, welcome }
}
