<template>
  <component :is="iconComponent" v-bind="$attrs" />
</template>

<script setup lang="ts">
import { computed, defineAsyncComponent, h } from 'vue'
import { Icon as IconifyIcon } from '@iconify/vue'

interface Props {
  name: string
  size?: number | string
  color?: string
  rotate?: number
  flip?: 'horizontal' | 'vertical' | 'both'
}

const props = withDefaults(defineProps<Props>(), {
  size: 16,
  color: 'currentColor',
  rotate: 0,
  flip: undefined,
})

// 动态加载图标
const iconComponent = computed(() => {
  // 如果是 Element Plus 图标
  if (props.name.startsWith('ep:')) {
    const iconName = props.name.replace('ep:', '')
    return defineAsyncComponent(() =>
      import(`@iconify-icons/ep/${iconName}`).then((module) => ({
        render: () => h(IconifyIcon, { icon: module.default, ...props }),
      })),
    )
  }

  // 如果是其他 Iconify 图标
  return IconifyIcon
})

// 计算样式
const iconStyle = computed(() => ({
  fontSize: typeof props.size === 'number' ? `${props.size}px` : props.size,
  color: props.color,
  transform: props.rotate ? `rotate(${props.rotate}deg)` : undefined,
}))
</script>
