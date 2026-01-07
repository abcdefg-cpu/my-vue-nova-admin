import { createRouter, createWebHistory } from 'vue-router'
import setting from '@/setting'
import nProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { GET_TOKEN } from '@/utils/token'
import { useUserStore } from '@/stores/modules/user'
import { constantRoutes } from './routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: constantRoutes,
})

// 配置 nProgress
nProgress.configure({ showSpinner: false })

const loadedPath = new Set<string>()

router.beforeEach(async (to, from, next) => {
  // 进度条
  if (!loadedPath.has(to.path)) {
    nProgress.start()
  }

  // 登录状态（这里应该从 Pinia 或 localStorage 获取）
  const userStore = useUserStore()
  const token = GET_TOKEN() || userStore.token

  // 白名单：不需要登录就可以访问的页面
  const whiteList = ['/login', '/404']

  if (token) {
    // 已登录
    if (whiteList.includes(to.path)) {
      // 已登录访问白名单，重定向到首页
      next({ path: '/' })
    } else {
      // 访问其他页面，正常放行
      next()
    }
  } else {
    // 未登录
    if (whiteList.includes(to.path)) {
      // 在白名单中，允许访问
      next()
    } else {
      // 不在白名单，重定向到登录页
      next({
        path: '/login',
        query: { redirect: to.fullPath }, // 保存目标地址
      })
    }
  }
})

router.afterEach((to) => {
  loadedPath.add(to.path)
  nProgress.done()

  // 设置页面标题
  const title = (to.meta?.title as string) || ''
  if (title) {
    document.title = `${title} | ${setting.title}`
  }
})

router.onError((error) => {
  nProgress.done()
  console.error('路由错误:', error)
})

export default router
