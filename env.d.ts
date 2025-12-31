/// <reference types="vite/client" />

// 声明 .vue 文件模块
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<Record<string, unknown>, Record<string, unknown>, unknown>
  export default component
}

declare module 'v-motion' {
  import type { Component, Plugin } from 'vue'
  export const Motion: Component
  export const MotionPlugin: Plugin
  const VMotion: Plugin
  export default VMotion
}

// 声明 v-motion
declare module 'vue' {
  export interface GlobalComponents {
    VMotion: (typeof import('v-motion'))['Motion']
  }
}

// 声明其他资源模块
declare module '*.svg' {
  const content: string
  export default content
}

declare module '*.svg?component' {
  const component: DefineComponent<Record<string, unknown>, Record<string, unknown>, unknown>
  export default component
}

declare module '*.png' {
  const src: string
  export default src
}
declare module '*.jpg' {
  const src: string
  export default src
}
declare module '*.jpeg' {
  const src: string
  export default src
}
declare module '*.gif' {
  const src: string
  export default src
}
declare module '*.webp' {
  const src: string
  export default src
}

// 环境变量类型
interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  readonly VITE_API_BASE_URL: string
  // 更多环境变量...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
