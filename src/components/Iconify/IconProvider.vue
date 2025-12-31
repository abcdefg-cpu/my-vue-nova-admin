<!-- src/components/Icon/IconProvider.vue -->
<template>
  <slot />
</template>

<script setup lang="ts">
import { provide, ref, reactive, computed } from 'vue'
import type { IconMode } from './types'
import { preloadEssentialIcons } from '@/utils/icon-loader'

interface IconProviderProps {
  /** 默认模式 */
  defaultMode?: IconMode
  /** 是否预加载常用图标 */
  preload?: boolean
  /** 是否启用缓存 */
  cache?: boolean
}

interface IconContext {
  mode: IconMode
  setMode: (mode: IconMode) => void
  config: {
    preload: boolean
    cache: boolean
    essentialIcons: string[]
  }
}

const props = withDefaults(defineProps<IconProviderProps>(), {
  defaultMode: 'auto',
  preload: true,
  cache: true,
})

// 当前模式
const currentMode = ref<IconMode>(props.defaultMode)

// 配置
const config = reactive({
  preload: props.preload,
  cache: props.cache,
  essentialIcons: [
    'ep:user',
    'ep:lock',
    'ep:home',
    'ep:setting',
    'ep:search',
    'ep:plus',
    'ep:delete',
    'ep:edit',
  ],
})

// 切换模式
const setMode = (mode: IconMode) => {
  currentMode.value = mode
  console.log(`图标模式切换为: ${mode}`)
}

// 提供上下文
const context: IconContext = {
  mode: currentMode.value,
  setMode,
  config,
}

provide('icon-context', context)

// 预加载图标
import { onMounted } from 'vue'
onMounted(async () => {
  if (props.preload) {
    await preloadEssentialIcons()
  }
})
</script>
