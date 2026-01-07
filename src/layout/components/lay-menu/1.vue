<template>
  <template v-for="item in menuList" :key="item.path">
    <!-- 没有子路由 -->
    <template v-if="!item.children">
      <el-menu-item v-if="!item.meta?.hidden" :index="item.path" @click="goRouter(item)">
        <el-icon>
          <component :is="item.meta?.icon" />
        </el-icon>
        <template #title>
          <span>{{ item.meta?.title }}</span>
        </template>
      </el-menu-item>
    </template>
    <!-- 只有一个子路由 -->
    <!-- 注意：这里把icon放在具名插槽外面是因为，el-menu如果有collapse折叠属性的话，icon也会被折叠，因此要想在折叠的情况下留下icon就要把icon放在插槽外面 -->
    <template v-if="item.children && item.children.length === 1">
      <el-menu-item
        v-if="!item.children[0].meta?.hidden"
        :index="item.children[0].path"
        @click="goRouter(item)"
      >
        <el-icon>
          <component :is="item.children[0].meta?.icon" />
        </el-icon>
        <template #title>
          <span>{{ item.children[0].meta?.title }}</span>
        </template>
      </el-menu-item>
    </template>
    <!-- 有多个子路由 -->
    <!-- 注意：这里不加goRoute方法的原因是使用了组件递归，递归的组件Menu里面本身已经具有这个方法了 -->
    <el-sub-menu v-if="item.children && item.children.length > 1" :index="item.path">
      <template #title>
        <el-icon>
          <component :is="item.meta?.icon" />
        </el-icon>
        <span>{{ item.meta?.title }}</span>
      </template>
      <MenuBar :menuList="item.children" />
    </el-sub-menu>
  </template>
</template>

<script lang="ts">
// 这里用到组件递归，因此需要导出
export default {
  name: 'MenuBar',
}
</script>
<script lang="ts" setup>
import router from '@/router'
import type { PropType } from 'vue'
import type { RouteRecordRaw } from 'vue-router'
defineProps({
  menuList: {
    type: Array as PropType<RouteRecordRaw[]>,
    default: () => [{}],
  },
})

// 点击菜单项，跳转路由
const goRouter = (item: any) => {
  router.push(item.path)
}
</script>

<style lang="scss" scoped>
div {
  color: #fff;
}
</style>
