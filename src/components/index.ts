/* 注册全局组件 */
import type { App, Component } from 'vue'
import SvgIcon from './SvgIcon/index.vue'

// 组件列表
const components: { [name: string]: Component } = {
  SvgIcon,
}

// 默认导出所有组件
export default {
  install(app: App) {
    Object.keys(components).forEach((key: string) => {
      app.component(key, components[key] as Component)
    })
  },
}
