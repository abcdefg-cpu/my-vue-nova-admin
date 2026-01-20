<template>
  <div class="layout-container">
    <!-- 左边侧边栏 -->
    <div class="layout-sidebar" :class="{ layoutFold: layoutStore.fold }">
      <!-- logo -->
      <Logo />
      <!-- menu -->
      <el-scrollbar class="scrollbar">
        <el-menu router :default-active="route.path" :collapse="layoutStore.fold">
          <MenuItem :menuList="menuRoutes" />
        </el-menu>
      </el-scrollbar>

      <!-- 折叠按钮 -->
      <Fold />
    </div>

    <!-- 顶部导航区 -->
    <div class="layout-tabbar" :class="{ layoutFold: layoutStore.fold }">
      <Tabbar />
    </div>

    <!-- 中间内容区 -->
    <div class="layout-content" :class="{ layoutFold: layoutStore.fold }">
      <!-- 封装组件 ，需要有动画 -->
      <Main />
    </div>
  </div>
</template>

<script lang="ts" setup name="Layout">
import Logo from './components/lay-logo/index.vue'
import MenuItem from './components/lay-menu/index.vue'
import Fold from './components/lay-fold/index.vue'
import Tabbar from './components/lay-tabbar/index.vue'
import Main from './components/lay-main/index.vue'
import { useRoute } from 'vue-router'
import { useUserStore } from '@/stores/modules/user'
import { useLayoutStore } from '@/stores/modules/layout'
const userStore = useUserStore()
const layoutStore = useLayoutStore()
const route = useRoute()
const { menuRoutes } = userStore
</script>

<style scoped lang="scss">
.layout-container {
  width: 100%;
  height: 100vh;
  background-color: $nova-base-background;

  .layout-sidebar {
    position: relative;
    width: $nova-menu-width;
    height: 100vh;
    background-color: $nova-menu-background;
    transition: all 0.3s ease;

    &.layoutFold {
      width: $nova-menu-min-width;
    }

    .scrollbar {
      width: 100%;
      height: calc(100vh - #{$nova-menu-logo-height});
    }

    .el-menu {
      padding: 0 10px;
      border: none;

      :deep(.el-menu-item),
      :deep(.el-sub-menu .el-menu-item) {
        width: 100%;
        height: 50px;
        padding: 0 10px;
        margin: 4px 0;
        border-radius: 4px;

        &:hover {
          background-color: #fff !important;
        }

        &.is-active {
          color: #fff !important;
          background-color: var(--el-color-primary) !important;
        }
      }

      :deep(.el-sub-menu .el-menu-item) {
        padding: 0 30px;
      }

      :deep(.el-sub-menu .el-sub-menu__title) {
        height: 50px;
        padding: 0 10px;

        &:hover {
          color: inherit !important;
          background-color: transparent !important;
        }
      }

      /* 修改 tooltip 样式 */
      :deep(.el-menu-tooltip__trigger) {
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        width: 100% !important;

        .el-icon {
          padding: 0 !important;
          margin: 0 !important; /* 清除 tooltip 中的图标边距 */
        }
      }
    }
  }

  .layout-tabbar {
    position: absolute;
    top: 0;
    left: $nova-menu-width;
    width: calc(100vw - #{$nova-menu-width});
    height: $nova-tabbar-height;
    background-color: #fff;
    transition: all 0.3s ease;

    &.layoutFold {
      left: $nova-menu-min-width;
      width: calc(100vw - #{$nova-menu-min-width});
    }
  }

  .layout-content {
    position: absolute;
    top: $nova-tabbar-height;
    left: $nova-menu-width;
    width: calc(100vw - #{$nova-menu-width});
    height: calc(100vh - #{$nova-tabbar-height});
    transition: all 0.3s ease;

    &.layoutFold {
      left: $nova-menu-min-width;
      width: calc(100vw - #{$nova-menu-min-width});
    }
  }
}
</style>
