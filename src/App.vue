<script setup lang="ts">
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
</script>

<template>
  <!--el-config-provider：全局配置国际化  -->
  <el-config-provider :locale="zhCn">
    <RouterView />
  </el-config-provider>
</template>
