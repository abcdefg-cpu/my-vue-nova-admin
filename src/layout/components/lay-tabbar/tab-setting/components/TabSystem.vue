<script lang="ts" setup name="TabSystem">
import { ref } from 'vue'

// 主题颜色
const themeColor = ref('rgba(255, 69, 0, 0.68)')
const predefineColors = ref([
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff',
  '#c71585',
  'rgba(255, 69, 0, 0.68)',
  'rgb(255, 120, 0)',
  'hsv(51, 100, 98)',
  'hsva(120, 40, 94, 0.5)',
  'hsl(181, 100%, 37%)',
  'hsla(209, 100%, 56%, 0.73)',
  '#c7158577',
])

// 修改主题颜色
const setThemeColor = () => {
  const html = document.documentElement
  html.style.setProperty('--el-color-primary', themeColor.value)
}

// 切换暗黑模式
const isDark = ref(false)
const toggleDark = () => {
  const html = document.documentElement
  if (isDark.value) {
    html.classList.add('dark')
  } else {
    html.classList.remove('dark')
  }
}
</script>

<template>
  <el-popover title="主题设置" placement="bottom-end" width="200px">
    <template #reference><el-button circle icon="Setting" size="small" /></template>
    <el-form label-width="80px" label-position="left">
      <el-form-item label="主题颜色">
        <el-color-picker
          v-model="themeColor"
          show-alpha
          :teleported="false"
          :predefine="predefineColors"
          size="small"
          @change="setThemeColor"
        />
      </el-form-item>
      <el-form-item label="暗黑模式">
        <el-switch v-model="isDark" inline-prompt size="small" @change="toggleDark" />
        <!-- <el-switch v-model="dark" inline-prompt size="small" @change="changeDark" /> -->
      </el-form-item>
    </el-form>
  </el-popover>
</template>

<style lang="scss" scoped>
:deep(.el-form-item__label) {
  font-weight: normal !important;
}
</style>
