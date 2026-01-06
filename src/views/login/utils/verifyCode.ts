import { FormInstance, FormItemProp } from 'element-plus'
import { ref } from 'vue'
import cloneDeep from 'lodash/cloneDeep'

const msg = ref('')
const isDisabled = ref(false)
let timer = null
export const useVerifyCode = () => {
  // 开始获取验证码
  const start = async (formEl: FormInstance | undefined, props: FormItemProp, time = 60) => {
    if (!formEl) return
    const initTime = cloneDeep(time)
    await formEl.validateField(props, (isValid) => {
      if (isValid) {
        clearInterval(timer)
        isDisabled.value = true
        msg.value = `${time}`
        timer = setInterval(() => {
          if (time > 0) {
            time--
            msg.value = `${time}`
          } else {
            msg.value = ''
            isDisabled.value = false
            clearInterval(timer)
            time = initTime
          }
        }, 1000)
      }
    })
  }
  // 手动结束验证码倒计时
  const end = () => {
    msg.value = ''
    isDisabled.value = false
    clearInterval(timer)
  }

  return {
    isDisabled,
    msg,
    timer,
    start,
    end,
  }
}
