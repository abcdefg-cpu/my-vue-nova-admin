<script lang="ts" setup name="TabSetting">
// import { ref } from 'vue'
import TabBell from './components/tab-bell.vue'
import TabSearch from './components/tab-search.vue'
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

    <el-dropdown class="dropdown" placement="bottom" trigger="click">
      <img src="@/assets/icons/avatar.svg" class="avatar" />
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item icon="Operation">账户设置</el-dropdown-item>
          <el-dropdown-item icon="Remove">退出系统</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>

    <el-button circle icon="Setting" size="small" />
  </div>
</template>

<style lang="scss" scoped>
.setting-container {
  display: flex;

  .dropdown {
    margin-left: 12px;
  }

  .avatar {
    width: 24px;
    height: 24px;
    margin-right: 12px;
    outline: none;
    border-radius: 50%;
  }
}
</style>
