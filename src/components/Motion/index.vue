<template>
  <!-- 动画包裹容器 -->
  <div ref="motionRef">
    <!-- 使用插槽显示内容 -->
    <slot />
  </div>
</template>

<script setup lang="ts" name="Motion">
import { ref, onMounted } from 'vue'
import { useMotion } from '@vueuse/motion'

// 定义组件属性
interface Props {
  // 初始状态（隐藏在下方的位置）
  initialY?: number
  // 延迟开始时间（毫秒）
  delay?: number
}

// 默认属性值
const props = withDefaults(defineProps<Props>(), {
  initialY: 100, // 默认从下方100px开始
  delay: 50, // 默认不延迟
})

// 获取DOM引用
const motionRef = ref<HTMLElement>()

// 组件挂载时执行动画
onMounted(() => {
  if (!motionRef.value) return

  // 使用useMotion创建动画
  const motion = useMotion(motionRef, {
    // 初始状态：隐藏在下方的位置
    initial: {
      opacity: 0, // 完全透明
      y: props.initialY, // Y轴位置（从下往上）
    },
    // 进入动画：显示在正常位置
    enter: {
      opacity: 1, // 完全不透明
      y: 0, // Y轴归零（回到正常位置）
      // 动画过渡配置
      transition: {
        delay: props.delay, // 延迟开始时间
      },
    },
  })
})
</script>
