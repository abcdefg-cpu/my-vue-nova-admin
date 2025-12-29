import { createRouter, createWebHistory } from 'vue-router'
import setting from '@/setting'
import nProgress from 'nprogress'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // 一级路由Login
    {
      path: '/login',
      component: () => import('@/views/login/index.vue'),
      name: 'login',
      meta: {
        title: '登录',
      },
    },
    // 一级路由Home
    {
      path: '/',
      component: () => import('@/layout/index.vue'),
      name: 'layout',
      redirect: '/home',
      children: [
        {
          path: '/home',
          component: () => import('@/views/home/index.vue'),
          name: 'home',
        },
      ],
    },
  ],
})

/* 路由守卫 */
// token：暂时
const token = ''
// 用户信息：暂时
const userInfo = {}
const loadedPath = new Set<string>()
router.beforeEach((to: any, from: any, next) => {
  /* 初始化加载状态 */
  to.meta.loaded = loadedPath.has(to.path)
  if (!to.meta.loaded) nProgress.start()

  /* ================= 已登录状态处理 ================= */
  if (token) {
    // 访问登录页
    if (to.path === '/login') return next({ path: '/' })
    // 访问非登录页
    if (!userInfo) {
      try {
        // 获取用户信息...
        next()
      } catch (error) {
        // 没有用户信息，且无法获取用户信息：token过期或被手动修改
        // 退出登录接口...
        // 返回登陆页
        next({ path: '/login' })
        Promise.reject(new Error((error as Error).message))
      }
    }
  } else {
    /* ================= 未登录状态处理 ================= */
    //访问登录页
    if (to.path === 'login') return next()
    // 访问普通路由
    return next({ path: '/login' })
  }
})

router.afterEach((to) => {
  loadedPath.add(to.path)
  nProgress.done()
  // 动态设置标题
  document.title = `${to.meta.title} | ${setting.title}`
})

export default router
