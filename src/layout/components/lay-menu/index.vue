<script lang="ts">
export default {
  name: 'MenuItem',
}
</script>
<script lang="ts" setup>
import type { PropType } from 'vue'
import { useRouter } from 'vue-router'
import type { MenuItem } from '@/types/router'

const router = useRouter()

defineProps({
  menuList: {
    type: Array as PropType<MenuItem[]>,
    default: () => [{}],
  },
})

const goRoute = (item) => {
  router.push(item.path)
}
</script>

<template>
  <template v-for="item in menuList" :key="item.path">
    <!-- 如果没有子路由 -->
    <template v-if="!item.children">
      <!-- 只显示需要展示的菜单项 -->
      <el-menu-item v-if="!item.meta?.hidden" :index="item.path" @click="goRoute(item)">
        <el-icon>
          <component :is="item.meta?.icon" />
        </el-icon>
        <template #title>
          <span>{{ item.meta?.title }}</span>
        </template>
      </el-menu-item>
    </template>

    <!-- 如果有1个子路由 -->
    <template v-if="item.children && item.children.length === 1">
      <el-menu-item
        v-if="!item.children[0].meta?.hidden"
        :index="item.children[0].path"
        @click="goRoute(item)"
      >
        <el-icon>
          <component :is="item.children[0].meta?.icon" />
        </el-icon>
        <template #title>
          <span>{{ item.children[0].meta?.title }}</span>
        </template>
      </el-menu-item>
    </template>

    <!-- 如果有多个子路由 -->
    <el-sub-menu v-if="item.children && item.children.length > 1" :index="item.path">
      <template #title>
        <el-icon>
          <component :is="item.meta?.icon" />
        </el-icon>
        <span>{{ item.meta?.title }}</span>
      </template>
      <MenuItem :menuList="item.children" />
    </el-sub-menu>
  </template>
</template>

<style lang="scss" scoped></style>
