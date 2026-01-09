<script lang="ts" setup name="LayoutLogo">
import setting from '@/setting'
/* 仓库 */
</script>

<template>
  <div class="logo-container" v-if="setting.logoHidden">
    <img :src="setting.logo" class="logo" />
    <span class="title">{{ setting.title }}</span>
  </div>
</template>

<style lang="scss" scoped>
.logo-container {
  display: flex;
  align-items: center;
  width: 100%;
  height: $nova-menu-logo-height;
  padding-left: 10px;

  .logo {
    width: 36px;
    height: 36px;
  }

  .title {
    width: 100%;
    height: 100%;
    margin-left: 12px;
    font-size: $nova-menu-logo-title-fontSize;
    font-weight: 600;
    line-height: $nova-menu-logo-height;
    transition: all 0.3s ease;
  }
}
</style>
