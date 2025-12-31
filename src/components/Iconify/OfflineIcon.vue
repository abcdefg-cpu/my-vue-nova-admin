<template>
  <IconifyIcon
    v-if="isLoaded"
    ref="iconRef"
    :icon="icon"
    :class="computedClass"
    :style="iconStyle"
    aria-hidden="true"
  />
  <span v-else-if="isLoading" :class="computedClass" :style="placeholderStyle" aria-hidden="true">
    {{ loadingContent }}
  </span>
  <span v-else :class="computedClass" :style="placeholderStyle" aria-hidden="true">
    {{ fallbackContent }}
  </span>
</template>

<script setup lang="ts">
import { Icon as IconifyIcon } from '@iconify/vue'
import { ref, computed, watch } from 'vue'
import type { IconProps } from './types'
import { loadIconSet, isIconLoaded } from '@/utils/icon-loader'

const props = withDefaults(defineProps<IconProps>(), {
  size: 16,
  color: 'currentColor',
  className: '',
  spin: false,
  fallback: '□',
  loading: '...',
})

const iconRef = ref<any>(null)
const isLoaded = ref(false)
const isLoading = ref(false)
const error = ref<string | null>(null)

// 解析图标前缀
const iconPrefix = computed(() => {
  const parts = props.icon.split(':')
  return parts[0] || ''
})

// 计算样式
// 使用类型安全的样式计算
const iconStyle = computed(() => ({
  fontSize: typeof props.size === 'number' ? `${props.size}px` : props.size,
  color: props.color,
  display: 'inline-block' as const,
  verticalAlign: 'middle' as const,
  ...(props.spin ? { animation: 'spin 1s linear infinite' } : {}),
}))

const placeholderStyle = computed(() => ({
  ...iconStyle.value,
  color: '#999',
  border: '1px dashed #ddd',
  borderRadius: '2px',
  textAlign: 'center' as const,
  lineHeight: 1,
  animation: undefined, // 明确移除 animation
}))

const computedClass = computed(() => [
  'icon-offline',
  props.className,
  { 'icon-spin': props.spin && isLoaded.value },
])

const fallbackContent = computed(() => (error.value ? '❌' : props.fallback))
const loadingContent = computed(() => props.loading)

// 加载图标集
const loadIcon = async () => {
  isLoading.value = true
  error.value = null
  isLoaded.value = false

  try {
    // 检查是否已加载
    if (isIconLoaded(props.icon)) {
      isLoaded.value = true
      return
    }

    // 加载整个图标集
    const success = await loadIconSet(iconPrefix.value)

    if (success) {
      isLoaded.value = true
    } else {
      error.value = `图标集 ${iconPrefix.value} 加载失败`
    }
  } catch (err: any) {
    error.value = err.message || '未知错误'
    console.error('离线图标加载失败:', err)
  } finally {
    isLoading.value = false
  }
}

// 监听图标变化
watch(() => props.icon, loadIcon, { immediate: true })

// 暴露方法
defineExpose({
  reload: loadIcon,
  isLoaded: () => isLoaded.value,
  isLoading: () => isLoading.value,
  error: () => error.value,
})
</script>
