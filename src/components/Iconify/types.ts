// src/components/Icon/types.ts
export type IconMode = 'online' | 'offline' | 'hybrid' | 'auto'

export interface IconProps {
  /** 图标名称，格式: prefix:icon-name */
  icon: string
  /** 图标大小 */
  size?: number | string
  /** 图标颜色 */
  color?: string
  /** 自定义类名 */
  className?: string
  /** 旋转动画 */
  spin?: boolean
  /** 是否启用离线模式 */
  offline?: boolean
  /** 加载失败时的备用图标 */
  fallback?: string
  /** 加载中显示的内容 */
  loading?: string
}

export interface IconCollection {
  [prefix: string]: string[] // 前缀: [图标名称数组]
}
