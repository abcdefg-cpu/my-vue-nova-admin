<script lang="ts" setup name="TabSetting">
import { onMounted } from 'vue'
import TabBell from './components/TabBell.vue'
import TabSearch from './components/TabSearch.vue'
import { useUserStore } from '@/stores/modules/user'
/* 路由与状态 */
const userStore = useUserStore()

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

// 获取用户信息
const getUserInfo = () => {
  userStore.getUserInfo()
}

// 退出登录
const onLogout = () => {
  userStore.userLogout()
}

onMounted(() => {
  getUserInfo()
})
</script>

<template>
  <div class="setting-container">
    <el-button circle icon="Refresh" size="small" @click="refreshScreen" />

    <TabSearch />

    <el-button circle icon="FullScreen" size="small" @click="changeFullScreen" />

    <TabBell />

    <el-dropdown class="dropdown" placement="bottom" trigger="click">
      <span class="user-info">
        <img :src="userStore.userInfo.avatar" class="avatar" />
        <span class="name">{{ userStore.userInfo.name }}</span>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>
            <span>
              <el-icon><Operation /></el-icon>
              账户设置
            </span>
          </el-dropdown-item>
          <el-dropdown-item>
            <span @click="onLogout">
              <el-icon><Remove /></el-icon>
              退出系统
            </span>
          </el-dropdown-item>
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
    margin: 0 12px;

    .user-info {
      .avatar {
        width: 24px;
        height: 24px;
        margin-right: 5px;
        vertical-align: middle;
        outline: none;
        border-radius: 50%;
      }
    }
  }
}
</style>

<style lang="scss">
.el-dropdown-menu {
  width: 120px !important;

  .el-dropdown-menu__item {
    span {
      width: 100%;
      padding: 5px 16px;
    }
  }
}
</style>
