<script lang="ts" setup name="LayoutFold">
import AutoIcon from '@/components/Iconify/AutoIcon.vue'
import { useLayoutStore } from '@/stores/modules/layout'
/* 仓库*/
const layoutStore = useLayoutStore()

/* 业务 */
// 点击折叠按钮，缩小菜单width
const foldMenu = () => {
  layoutStore.toggleFold()
}
</script>

<template>
  <div class="fold-container">
    <el-tooltip
      effect="light"
      :content="layoutStore.fold ? '点击展开' : '点击折叠'"
      placement="right"
    >
      <AutoIcon
        icon="ri:menu-fold-fill"
        :style="layoutStore.iconStyle"
        class="fold-icon"
        @click="foldMenu"
      />
    </el-tooltip>
  </div>
</template>

<style lang="scss" scoped>
.fold-container {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 40px;
  padding-left: 16px;
  line-height: 40px;
  box-shadow: 0 0 6px -3px var(--el-color-primary);

  .fold-icon {
    cursor: pointer;
    outline: none;
  }
}
</style>
