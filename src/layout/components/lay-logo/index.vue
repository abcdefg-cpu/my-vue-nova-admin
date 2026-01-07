<script lang="ts" setup name="LayoutLogo">
import setting from '@/setting'
</script>

<template>
  <div class="logo-container">
    <img :src="setting.logo" class="logo" />
    <span class="title">{{ setting.title }}</span>
  </div>
</template>

<style lang="scss" scoped>
.logo-container {
  display: flex;
  align-items: center;
  width: 100%;
  height: 50px;
  padding-left: 10px;

  .logo {
    width: 36px;
    height: 36px;
  }

  .title {
    margin-left: 12px;
    font-size: $nova-menu-logo-title-fontSize;
    font-weight: 600;
  }
}
</style>
