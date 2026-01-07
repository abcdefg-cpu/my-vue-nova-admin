import type { MenuItem } from '@/types/router'

export const constantRoutes: MenuItem[] = [
  /* 登录页：一级 */
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    name: 'login',
    meta: {
      title: '登录',
      hidden: true,
      icon: 'Promotion',
      requiresAuth: false, // 明确标记不需要登录
    },
  },
  /* 首页：一级 */
  {
    path: '/',
    component: () => import('@/layout/index.vue'),
    name: 'layout',
    redirect: '/home',
    meta: {
      hidden: true,
      icon: '',
      requiresAuth: true, // 需要登录
    },
    children: [
      {
        path: 'home',
        component: () => import('@/views/home/index.vue'),
        name: 'home',
        meta: {
          title: '首页',
          hidden: false,
          icon: 'HomeFilled',
          requiresAuth: true,
        },
      },
    ],
  },

  /*  数据大屏:一级 */
  {
    path: '/screen',
    component: () => import('@/views/screen/index.vue'),
    name: 'screen',
    meta: {
      title: '数据大屏',
      hidden: false,
      icon: 'Platform',
      requiresAuth: true,
    },
  },

  /* 权限管理：一级 */
  {
    path: '/acl',
    component: () => import('@/layout/index.vue'),
    name: 'acl',
    redirect: '/acl/user',
    meta: {
      title: '权限管理',
      hidden: false,
      icon: 'Lock',
      requiresAuth: true,
    },
    children: [
      {
        path: '/acl/user',
        component: () => import('@/views/acl/user/index.vue'),
        name: 'user',
        meta: {
          title: '用户管理',
          hidden: false,
          icon: 'User',
          requiresAuth: true,
        },
      },
      {
        path: '/acl/role',
        component: () => import('@/views/acl/role/index.vue'),
        name: 'role',
        meta: {
          title: '角色管理',
          hidden: false,
          icon: 'UserFilled',
          requiresAuth: true,
        },
      },
      {
        path: '/acl/permission',
        component: () => import('@/views/acl/permission/index.vue'),
        name: 'permission',
        meta: {
          title: '菜单管理',
          hidden: false,
          icon: 'Menu',
          requiresAuth: true,
        },
      },
    ],
  },

  // 商品管理：一级
  {
    path: '/product',
    component: () => import('@/layout/index.vue'),
    name: 'product',
    redirect: '/product/trademark',
    meta: {
      title: '商品管理',
      hidden: false,
      icon: 'Goods',
      requiresAuth: true,
    },
    children: [
      {
        path: '/product/trademark',
        component: () => import('@/views/product/trademark/index.vue'),
        name: 'trademark',
        meta: {
          title: '品牌管理',
          hidden: false,
          icon: 'ShoppingCartFull',
          requiresAuth: true,
        },
      },
      {
        path: '/product/attr',
        component: () => import('@/views/product/attr/index.vue'),
        name: 'attr',
        meta: {
          title: '属性管理',
          hidden: false,
          icon: 'ChromeFilled',
          requiresAuth: true,
        },
      },
      {
        path: '/product/spu',
        component: () => import('@/views/product/spu/index.vue'),
        name: 'spu',
        meta: {
          title: 'SPU管理',
          hidden: false,
          icon: 'Calendar',
          requiresAuth: true,
        },
      },
      {
        path: '/product/sku',
        component: () => import('@/views/product/sku/index.vue'),
        name: 'sku',
        meta: {
          title: 'SKU管理',
          hidden: false,
          icon: 'Orange',
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
      title: '404',
      hidden: true,
      requiresAuth: false,
    },
  },

  // 任意路由
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    name: 'Any',
    meta: {
      title: '任意路由',
      hidden: true,
    },
  },
]
