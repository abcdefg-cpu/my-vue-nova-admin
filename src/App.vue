<script setup lang="ts">
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

import { ref } from 'vue'
import { LoginAPI } from './api/user'

const loginData = ref({
  username: 'admin',
  password: '111111',
})
const login = async () => {
  const res = await LoginAPI(loginData.value)
  console.log(res)
}
</script>

<template>
  <!--el-config-provider：全局配置国际化  -->
  <el-config-provider :locale="zhCn">
    <RouterView />
  </el-config-provider>
  <el-button type="primary" size="default" @click="login">点击登录</el-button>
</template>

<style scoped lang="scss"></style>
