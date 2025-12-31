<template>
  <!-- 打字机容器 -->
  <div ref="typeitRef">
    <!-- 显示内容 -->
    <slot />
  </div>
</template>

<script lang="ts" setup name="TypeIt">
import { ref, onMounted } from 'vue'
import TypeIt from 'typeit'

// 获取打字机容器
const typeitRef = ref()

// 定义属性
interface Props {
  strings?: string // 要显示的文字
  speed?: number // 打字速度（单位：毫秒）
  loop?: boolean // 是否循环
  breakLines?: boolean // 是否允许换行
  cursor?: boolean //有无光标
}

// 默认属性
const props = withDefaults(defineProps<Props>(), {
  speed: 100,
  loop: false,
  breakLines: false,
  cursor: false,
})

onMounted(() => {
  if (!typeitRef.value) return

  new TypeIt(typeitRef.value, {
    speed: props.speed,
    loop: props.loop,
    breakLines: props.breakLines,
    cursor: props.cursor,
  }).go() // 启动动画
})
</script>
