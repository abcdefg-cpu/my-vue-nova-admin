import { createApp } from 'vue'
import { createPinia } from 'pinia'

/* 样式 */
import '@/styles/index.scss'

/* svg图标 */
import 'virtual:svg-icons-register'
import globalComponent from './components/index'

import App from './App.vue'
import router from './router'

/* 创建app */
const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(globalComponent)

app.mount('#app')
