// src/types/router.d.ts
import type { RouteRecordRaw } from 'vue-router'

// 扩展路由类型，添加菜单需要的属性
export interface AppRouteRecordRaw extends Omit<RouteRecordRaw, 'meta' | 'children'> {
  meta?: {
    title?: string
    icon?: string
    hidden?: boolean
    keepAlive?: boolean
    affix?: boolean
    breadcrumb?: boolean
    requiresAuth?: boolean
    [key: string]: any
  }
  children?: AppRouteRecordRaw[]
}

// 菜单项类型（
export interface MenuItem {
  path: string
  name?: string
  component?: any
  redirect?: string
  meta?: AppRouteRecordRaw['meta']
  children?: MenuItem[]
}
