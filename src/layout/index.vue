<template>
  <div class="layout-container">
    <!-- 左边侧边栏 -->
    <div class="layout-sidebar">
      <!-- logo -->
      <Logo />
      <!-- menu -->
      <el-scrollbar>
        <el-menu router :default-active="route.path">
          <MenuItem :menuList="menuRoutes" />
        </el-menu>
      </el-scrollbar>
      <!-- 折叠按钮 -->
      <Fold />
    </div>

    <!-- 顶部导航区 -->
    <div class="layout-tabbar">
      <!-- 设置 -->
      <!-- 标签 -->
    </div>

    <!-- 中间内容区 -->
    <div class="layout-content">
      <!-- 封装组件 ，需要有动画 -->
      <Main />
    </div>
  </div>
</template>

<script lang="ts" setup name="Layout">
import Logo from './components/lay-logo/index.vue'
import MenuItem from './components/lay-menu/index.vue'
import Fold from './components/lay-fold/index.vue'
import Main from './components/lay-main/index.vue'
import { useRoute } from 'vue-router'
import { useUserStore } from '@/stores/modules/user'
const userStore = useUserStore()
const route = useRoute()
const { menuRoutes } = userStore
</script>

<style scoped lang="scss">
.layout-container {
  width: 100%;
  height: 100vh;
  background-color: #ebe6e7;

  .layout-sidebar {
    width: $nova-menu-width;
    height: 100vh;
    background-color: $nova-menu-background;
  }

  .layout-content {
    position: absolute;
    top: 0;
    left: 260px;
    width: calc(100vw - 260px);
    height: 100vh;
    background-color: pink;
  }
}
</style>
