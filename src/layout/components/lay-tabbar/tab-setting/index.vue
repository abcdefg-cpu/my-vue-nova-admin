<script lang="ts" setup name="TabSetting">
// import { onMounted } from 'vue'
import TabBell from './components/TabBell.vue'
import TabSearch from './components/TabSearch.vue'
import TabSystem from './components/TabSystem.vue'
import TabUser from './components/TabUser.vue'
// import { useUserStore } from '@/stores/modules/user'
// import { useRouter } from 'vue-router'
// /* 路由与状态 */
// const userStore = useUserStore()
// const router = useRouter()

/* 方法 */
// 刷新页面
const refreshScreen = () => {
  window.location.reload()
}

//全屏
const changeFullScreen = () => {
  // document.fullscreenElement用来判断当前是否处于全屏状态
  let full = document.fullscreenElement
  if (!full) {
    document.documentElement.requestFullscreen()
  } else {
    document.exitFullscreen()
  }
}
</script>
<template>
  <div class="setting-container">
    <el-button circle icon="Refresh" size="small" @click="refreshScreen" />

    <TabSearch />

    <el-button circle icon="FullScreen" size="small" @click="changeFullScreen" />

    <TabBell />

    <TabSystem />

    <TabUser />
  </div>
</template>
<style lang="scss" scoped>
.setting-container {
  display: flex;
}
</style>
