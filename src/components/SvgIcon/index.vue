<template>
  <svg :style="{ width: finalWidth, height: finalHeight }" :class="customClass" aria-hidden="true">
    <use :xlink:href="`${prefix}${name}`" :fill="color" />
  </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue'

// 方法1：使用 defineProps 的运行时声明（推荐新手）
const props = defineProps({
  prefix: {
    type: String,
    default: '#icon-',
  },
  name: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    default: 'currentColor',
  },
  width: {
    type: [String, Number],
    default: undefined,
  },
  height: {
    type: [String, Number],
    default: undefined,
  },
  size: {
    type: [String, Number],
    default: '16px',
  },
  customClass: {
    type: String,
    default: '',
  },
})

// 计算最终的宽高
const finalWidth = computed(() => {
  if (props.width) {
    return typeof props.width === 'number' ? `${props.width}px` : props.width
  }
  return typeof props.size === 'number' ? `${props.size}px` : props.size
})

const finalHeight = computed(() => {
  if (props.height) {
    return typeof props.height === 'number' ? `${props.height}px` : props.height
  }
  return typeof props.size === 'number' ? `${props.size}px` : props.size
})
</script>
