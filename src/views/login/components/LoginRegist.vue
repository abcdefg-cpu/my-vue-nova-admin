<script lang="ts" setup name="LoginRegist">
import { reactive, ref } from 'vue'
import { loginRules, phoneRules } from '../utils/rules'
import { useVerifyCode } from '../utils/verifyCode'
import { useUserStore } from '@/stores/modules/user'
import { ElMessage } from 'element-plus'
const userStore = useUserStore()
const { msg, isDisabled } = useVerifyCode()

/* 状态 */
// 表单对象
const loginFormRef = ref()
// 表单数据
const loginForm = reactive({
  username: '',
  phone: '',
  verifyCode: '',
  password: '',
  repeatPassword: '',
})
// 隐私协议勾选
const checked = ref(false)

// 按钮状态
const loading = ref(false)
const disabled = ref(false)

/* 业务 */
// 1、表单验证
const rules = {
  repeatPassword: [
    {
      validator: (rules: any, value: any, callback: any) => {
        if (value === '') {
          callback(new Error('请再次输入密码'))
        } else if (value !== loginForm.password) {
          callback(new Error('两次密码输入不一致'))
        } else {
          callback()
        }
      },
      trigger: 'blur',
    },
  ],
}

// 2、获取验证码
const getVerifyCode = () => {
  useVerifyCode().start(loginFormRef.value, 'phone')
}

// 3、注册
const onRegist = async () => {
  try {
    if (!checked.value) {
      return ElMessage.warning('请勾选隐私协议')
    }
    if (!loginFormRef.value) return
    await loginFormRef.value.validate()
    loading.value = true
    disabled.value = true
    // 模拟异步请求
    setTimeout(() => {
      ElMessage.success('注册成功！')
      // router.push('/')
    }, 1000)
  } catch (error) {
    if (import.meta.env.DEV) {
      console.error('登录流程意外错误:', error)
    }
  } finally {
    loading.value = false
    disabled.value = false
  }
}
</script>
<template>
  <el-form ref="loginFormRef" :model="loginForm">
    <Motion>
      <el-form-item size="large" prop="username" :rules="loginRules.username">
        <el-input placeholder="账号" prefix-icon="User" v-model="loginForm.username" clearable />
      </el-form-item>
    </Motion>

    <Motion :delay="100">
      <el-form-item size="large" prop="phone" :rules="phoneRules.phone">
        <el-input placeholder="手机号" prefix-icon="Phone" v-model="loginForm.phone" clearable />
      </el-form-item>
    </Motion>

    <Motion :delay="150">
      <el-form-item size="large" prop="verifyCode" :rules="phoneRules.verifyCode">
        <div class="flex-bc gap-2">
          <el-input
            placeholder="短信验证码"
            prefix-icon="Key"
            v-model="loginForm.verifyCode"
            clearable
          />
          <el-button :disabled="isDisabled" @click="getVerifyCode">
            {{ msg.length > 0 ? `${msg}秒后重新获取` : '获取验证码' }}
          </el-button>
        </div>
      </el-form-item>
    </Motion>

    <Motion :delay="200">
      <el-form-item size="large" prop="password" :rules="loginRules.password">
        <el-input
          v-model="loginForm.password"
          placeholder="密码"
          prefix-icon="Lock"
          show-password
          clearable
        />
      </el-form-item>
    </Motion>

    <Motion :delay="250">
      <el-form-item size="large" prop="repeatPassword" :rules="rules.repeatPassword">
        <el-input
          v-model="loginForm.repeatPassword"
          placeholder="确认密码"
          prefix-icon="Lock"
          show-password
          clearable
        />
      </el-form-item>
    </Motion>

    <Motion :delay="300">
      <el-form-item>
        <div class="w-full flex">
          <el-checkbox v-model="checked">我已仔细阅读并接受</el-checkbox>
          <el-button type="primary" link>《隐私协议》</el-button>
        </div>
      </el-form-item>
    </Motion>

    <Motion :delay="350">
      <el-form-item>
        <el-button
          type="primary"
          class="w-full"
          :loading="loading"
          :disabled="disabled"
          @click="onRegist"
        >
          注册
        </el-button>
        <el-button class="w-full ml-0! mt-3!" @click="userStore.currentPage = 0">取消</el-button>
      </el-form-item>
    </Motion>
  </el-form>
</template>
