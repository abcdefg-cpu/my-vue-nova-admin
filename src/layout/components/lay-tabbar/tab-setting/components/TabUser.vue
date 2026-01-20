<script lang="ts" setup name="TabUser">
import { onMounted } from 'vue'
import { useUserStore } from '@/stores/modules/user'
import { useRouter } from 'vue-router'
/* 路由与状态 */
const userStore = useUserStore()
const router = useRouter()
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
  <el-dropdown class="user-dropdown" placement="bottom" trigger="click">
    <span class="user-info">
      <img :src="userStore.userInfo.avatar" class="avatar" />
      <span class="name">{{ userStore.userInfo.name }}</span>
    </span>
    <template #dropdown>
      <el-dropdown-menu class="user-dropdown-menu">
        <el-dropdown-item>
          <span @click="router.push('/account-settings')">
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
</template>

<style lang="scss" scoped>
.user-dropdown {
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
</style>

<style lang="scss">
.user-dropdown-menu {
  width: 120px !important;

  .el-dropdown-menu__item {
    span {
      width: 100%;
      padding: 5px 16px;
    }
  }
}
</style>
