<script lang="ts" setup name="LoginUpdate">
import { useUserStore } from '@/stores/modules/user'
const userStore = useUserStore()
</script>
<template>
  <el-form>
    <Motion>
      <el-form-item size="large">
        <el-input placeholder="手机号" prefix-icon="Phone" />
      </el-form-item>
    </Motion>

    <Motion :delay="100">
      <el-form-item size="large">
        <div class="flex-bc gap-2">
          <el-input placeholder="短信验证码" prefix-icon="Key" />
          <el-button class="font-normal">获取验证码</el-button>
        </div>
      </el-form-item>
    </Motion>

    <Motion :delay="150">
      <el-form-item size="large">
        <el-input placeholder="密码" prefix-icon="Lock" />
      </el-form-item>
    </Motion>

    <Motion :delay="200">
      <el-form-item size="large">
        <el-input placeholder="确认密码" prefix-icon="Lock" />
      </el-form-item>
    </Motion>

    <Motion :delay="250">
      <el-form-item>
        <el-button type="primary" class="w-full">确定</el-button>
        <el-button class="w-full ml-0! mt-3!" @click="userStore.currentPage = 0">取消</el-button>
      </el-form-item>
    </Motion>
  </el-form>
</template>
