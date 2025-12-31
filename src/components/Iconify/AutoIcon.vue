<!-- src/components/Icon/IconHybrid.vue -->
<template>
  <!-- 根据模式显示不同组件 -->
  <IconOnline v-if="currentMode === 'online'" ref="onlineRef" v-bind="onlineProps" />
  <IconOffline v-else-if="currentMode === 'offline'" ref="offlineRef" v-bind="offlineProps" />
  <span v-else :class="computedClass" :style="placeholderStyle" aria-hidden="true">
    {{ placeholderText }}
  </span>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue'
import IconOnline from './OnlineIcon.vue'
import IconOffline from './OfflineIcon.vue'
import type { IconProps, IconMode } from './types'
import { isOnline, isIconLoaded, loadSingleIcon } from '@/utils/icon-loader'

interface HybridIconProps extends IconProps {
  /** 模式选择：online/offline/hybrid/auto */
  mode?: IconMode
  /** 超时时间（毫秒） */
  timeout?: number
  /** 是否静默失败 */
  silent?: boolean
}

const props = withDefaults(defineProps<HybridIconProps>(), {
  size: 16,
  color: 'currentColor',
  className: '',
  spin: false,
  mode: 'auto',
  timeout: 3000,
  silent: false,
  fallback: '□',
  loading: '...',
})

const onlineRef = ref<InstanceType<typeof IconOnline>>()
const offlineRef = ref<InstanceType<typeof IconOffline>>()

// 当前实际使用的模式
const currentMode = ref<IconMode>('online')
const isDetecting = ref(false)

// 传递的属性
const onlineProps = computed(() => ({
  icon: props.icon,
  size: props.size,
  color: props.color,
  className: props.className,
  spin: props.spin,
  fallback: props.fallback,
  loading: props.loading,
}))

const offlineProps = computed(() => ({
  ...onlineProps.value,
  offline: true,
}))

const computedClass = computed(() => ['icon-hybrid', props.className])

const placeholderStyle = computed(() => ({
  fontSize: typeof props.size === 'number' ? `${props.size}px` : props.size,
  color: '#999',
  display: 'inline-block',
  verticalAlign: 'middle',
}))

const placeholderText = computed(() => {
  if (isDetecting.value) return props.loading
  return props.fallback
})

/**
 * 智能选择模式
 */
const detectBestMode = async (): Promise<IconMode> => {
  // 如果是手动指定的模式
  if (props.mode !== 'auto' && props.mode !== 'hybrid') {
    return props.mode
  }

  // 检查网络状态
  if (!isOnline()) {
    return 'offline'
  }

  // 检查图标是否已加载（离线可用）
  if (isIconLoaded(props.icon)) {
    return 'offline'
  }

  // 尝试在线加载（带超时）
  const onlineTest = Promise.race([
    loadSingleIcon(props.icon),
    new Promise<boolean>((resolve) => setTimeout(() => resolve(false), props.timeout)),
  ])

  const onlineSuccess = await onlineTest

  if (onlineSuccess) {
    return 'online'
  }

  // 在线失败，尝试离线
  return 'offline'
}

/**
 * 更新模式
 */
const updateMode = async () => {
  isDetecting.value = true

  try {
    const mode = await detectBestMode()
    currentMode.value = mode

    if (!props.silent) {
      console.log(`图标 ${props.icon} 使用 ${mode} 模式`)
    }
  } catch (error) {
    console.error('模式检测失败:', error)
    currentMode.value = 'online' // 默认回退到在线
  } finally {
    isDetecting.value = false
  }
}

// 监听变化
watch(() => props.icon, updateMode, { immediate: true })
watch(() => props.mode, updateMode)

// 暴露方法
const reload = async () => {
  await updateMode()

  await nextTick()

  if (currentMode.value === 'online' && onlineRef.value) {
    onlineRef.value.reload?.()
  } else if (currentMode.value === 'offline' && offlineRef.value) {
    offlineRef.value.reload?.()
  }
}

defineExpose({
  reload,
  currentMode: () => currentMode.value,
  switchMode: (mode: IconMode) => {
    currentMode.value = mode
  },
})
</script>
