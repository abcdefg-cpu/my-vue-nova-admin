import { createApp } from 'vue'
/* 仓库 */
import pinia from './stores'
/* 路由 */
import router from './router'
/* 样式 */
import '@/styles/index.scss'
/* svg图标 */
import 'virtual:svg-icons-register'
import globalComponent from './components/index'
/* App */
import App from './App.vue'

/* 创建app */
const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(globalComponent)

app.mount('#app')
