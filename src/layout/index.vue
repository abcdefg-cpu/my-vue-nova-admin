<template>
  <div class="layout-container">
    <!-- 左边侧边栏 -->
    <div class="layout-sidebar">
      <!-- logo -->
      <Logo />
      <!-- menu -->
      <!-- 折叠按钮 -->
    </div>

    <!-- 顶部导航区 -->
    <div class="layout-tabbar">
      <!-- 设置 -->
      <!-- 标签 -->
    </div>

    <!-- 中间内容区 -->
    <div class="layout-content">
      <!-- 封装组件 ，需要有动画 -->
      <router-view />
    </div>
  </div>
</template>

<script lang="ts" setup name="Layout">
import Logo from './components/lay-logo/index.vue'
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
}
</style>
