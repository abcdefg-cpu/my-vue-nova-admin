import type { RouteRecordRaw } from 'vue-router'
export const constantRoutes = [
  /* 登录页：一级 */
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    name: 'login',
    meta: {
      title: '登录',
      requiresAuth: false, // 明确标记不需要登录
    },
  },
  /* 布局页：一级 */
  {
    path: '/',
    component: () => import('@/layout/index.vue'),
    name: 'layout',
    redirect: '/home',
    meta: {
      requiresAuth: true, // 需要登录
    },
    children: [
      {
        path: 'home',
        component: () => import('@/views/home/index.vue'),
        name: 'home',
        meta: {
          title: '首页',
          requiresAuth: true,
        },
      },
    ],
  },
  /* 404页面：一级 */
  {
    path: '/404',
    name: 'NotFound',
    component: () => import('@/views/error/404.vue'),
    meta: {
      title: '页面不存在',
      requiresAuth: false,
    },
  },
] as RouteRecordRaw[]
