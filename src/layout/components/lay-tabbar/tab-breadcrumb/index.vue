<script lang="ts" setup name="TabBread">
import { ArrowRight } from '@element-plus/icons-vue'
import { useRoute } from 'vue-router'
const route = useRoute()
</script>

<template>
  <el-breadcrumb :separator-icon="ArrowRight" class="breadcrumb">
    <el-breadcrumb-item
      v-for="item in route.matched"
      v-show="item.meta.title"
      :key="item.path"
      :to="item.path"
    >
      <el-icon class="icon">
        <component :is="item.meta?.icon" />
      </el-icon>
      {{ item.meta?.title }}
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<style lang="scss" scoped>
.breadcrumb {
  display: flex;
  align-items: center;
  height: 100%;
  vertical-align: middle;

  .icon {
    margin-top: -0.125em;
    vertical-align: middle;
  }
}
</style>
