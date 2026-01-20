<script lang="ts" setup name="TabSystem">
import { useLayoutStore } from '@/stores/modules/layout'

/* 路由与仓库 */
const layoutStore = useLayoutStore()
</script>

<template>
  <el-popover title="主题设置" placement="bottom-end" width="200px">
    <template #reference><el-button circle icon="Setting" size="small" /></template>
    <el-form label-width="80px" label-position="left">
      <el-form-item label="主题颜色">
        <el-color-picker
          v-model="layoutStore.themeColor"
          show-alpha
          :teleported="false"
          :predefine="layoutStore.predefineColors"
          size="small"
          @change="layoutStore.setThemeColor"
        />
      </el-form-item>
      <el-form-item label="暗黑模式">
        <el-switch
          v-model="layoutStore.isDark"
          inline-prompt
          size="small"
          @change="layoutStore.toggleDark"
        />
      </el-form-item>
    </el-form>
  </el-popover>
</template>

<style lang="scss" scoped>
:deep(.el-form-item__label) {
  font-weight: normal !important;
}
</style>
