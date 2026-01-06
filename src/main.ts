import { createApp } from 'vue'
/* 仓库 */
import pinia from './stores'
/* 路由 */
import router from './router'
/* 样式 */
import '@/styles/index.scss'
import '@/styles/tailwind.css'
import 'element-plus/dist/index.css'
/* element-plus图标 */
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
/* svg图标 */
import 'virtual:svg-icons-register'
/* motion动画 */
import { MotionPlugin } from '@vueuse/motion'

/* App */
import App from './App.vue'

/* 创建app */
const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(MotionPlugin)

/* 注册图标 */
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.mount('#app')
