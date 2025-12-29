import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // 一级路由Login
    {
      path: '/login',
      component: () => import('@/views/login/index.vue'),
      name: 'login',
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

export default router
