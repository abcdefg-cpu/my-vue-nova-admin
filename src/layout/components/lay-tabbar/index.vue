<script lang="ts" setup name="LayoutTabbar">
import TabBreadcrumb from './tab-breadcrumb/index.vue'
import TabSetting from './tab-setting/index.vue'
</script>

<template>
  <div class="tabbar-container">
    <TabBreadcrumb />
    <TabSetting />
  </div>
</template>
<style lang="scss" scoped>
.tabbar-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  padding: 0 20px;
}
</style>
