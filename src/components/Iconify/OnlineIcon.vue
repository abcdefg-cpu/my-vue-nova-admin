<!-- src/components/Icon/IconOnline.vue -->
<template>
  <IconifyIcon
    v-if="isLoaded"
    ref="iconRef"
    :icon="icon"
    :class="computedClass"
    :style="iconStyle"
    aria-hidden="true"
  />
  <span v-else :class="computedClass" :style="placeholderStyle" aria-hidden="true">
    {{ isLoading ? loadingContent : fallbackContent }}
  </span>
</template>

<script setup lang="ts">
import { Icon as IconifyIcon } from '@iconify/vue'
import { ref, computed, watch } from 'vue'
import type { IconProps } from './types'
import { loadSingleIcon } from '@/utils/icon-loader'

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

// 计算样式
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

const computedClass = computed(() => ['icon-online', props.className, { 'icon-spin': props.spin }])

const fallbackContent = computed(() => (error.value ? '❌' : props.fallback))
const loadingContent = computed(() => props.loading)

// 加载图标
const loadIcon = async () => {
  isLoading.value = true
  error.value = null
  isLoaded.value = false

  try {
    const success = await loadSingleIcon(props.icon)

    if (success) {
      isLoaded.value = true
    } else {
      error.value = '图标加载失败'
    }
  } catch (err: any) {
    error.value = err.message || '未知错误'
    console.error('在线图标加载失败:', err)
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

<style>
@keyframes spin {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

.icon-online.icon-spin {
  animation: spin 1s linear infinite;
}
</style>
