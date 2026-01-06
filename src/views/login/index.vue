<script lang="ts" setup name="Login">
import { reactive, ref } from 'vue'
import setting from '@/setting'
import LoginRegist from './components/LoginRegist.vue'
import LoginUpdate from './components/LoginUpdate.vue'
import { loginRules } from './utils/rules'
import { useUserStore } from '@/stores/modules/user'
import { useRoute, useRouter } from 'vue-router'
import { ElNotification } from 'element-plus'
import { useFormatTime } from '@/utils/formatTime'

const { welcome } = useFormatTime()

// 仓库
const userStore = useUserStore()
// 路由
const route = useRoute()
const router = useRouter()

/* 状态 */
// 表单对象
const loginFormRef = ref()
// 表单数据
const loginForm = reactive({
  username: 'admin',
  password: '111111',
  verifyCode: '',
})
// 加载状态
const loading = ref(false)
// 禁用按钮
const disabled = ref(false)

/* 方法 */
// 登录
const onLogin = async () => {
  try {
    // 1、统一校验表单
    if (!loginFormRef.value) return
    await loginFormRef.value.validate()
    // 2、按钮状态
    loading.value = true
    disabled.value = true
    // 3、请求
    await userStore.userLogin({
      username: loginForm.username,
      password: loginForm.password,
    })
    // 4、跳转路由：登录的时候,路由路径当中是否有query参数，如果有就往query参数挑战，没有跳转到首页
    const redirect: any = route.query.redirect
    router.push({ path: redirect || '/' })
    // 5、登录提示
    ElNotification.success({
      title: `HI,${welcome.value}!`,
      message: '欢迎回来！',
    })
  } catch (error) {
    // 捕获可能的非请求错误（如路由跳转错误）
    // 业务错误已经在请求工具中处理并显示了
    // 只在开发环境记录，不显示给用户
    if (import.meta.env.DEV) {
      console.error('登录流程意外错误:', error)
    }
  } finally {
    // 6、按钮状态恢复
    loading.value = false
    disabled.value = false
  }
}
</script>

<template>
  <!-- 背景图 -->
  <img src="@/assets/login/bg.png" class="wave" />
  <!-- 主背景图 -->
  <div class="login-container">
    <!-- 左边图片 -->
    <div class="left-img">
      <SvgIcon name="illustration" :size="500" />
    </div>
    <!-- 右边表单区 -->
    <div class="login-box">
      <div class="login-form">
        <!-- 图标 -->
        <div class="avatar">
          <SvgIcon name="avatar" :size="80" />
        </div>
        <!-- 标题 -->
        <h2 class="title">
          <TypeIt>
            {{ setting.title }}
          </TypeIt>
        </h2>
        <!-- 表单 -->
        <el-form
          ref="loginFormRef"
          :model="loginForm"
          :rules="loginRules"
          v-if="userStore.currentPage === 0"
        >
          <Motion>
            <el-form-item size="large" prop="username">
              <el-input
                v-model="loginForm.username"
                placeholder="账号"
                prefix-icon="User"
                clearable
              />
            </el-form-item>
          </Motion>

          <Motion :delay="100">
            <el-form-item size="large" prop="password">
              <el-input
                v-model="loginForm.password"
                placeholder="密码"
                prefix-icon="Lock"
                clearable
                show-password
              />
            </el-form-item>
          </Motion>

          <Motion :delay="150">
            <el-form-item size="large" prop="verifyCode">
              <div class="w-full flex-bc gap-2">
                <el-input
                  v-model="loginForm.verifyCode"
                  placeholder="验证码"
                  prefix-icon="Key"
                  clearable
                />
                <ImageVerify v-model:code="userStore.verifyCode" />
              </div>
            </el-form-item>
          </Motion>

          <Motion :delay="200">
            <el-form-item>
              <div class="w-full flex-bc">
                <el-checkbox v-model="userStore.checked">
                  <span class="flex items-center gap-1">
                    <select
                      v-model="userStore.loginDay"
                      :style="{
                        border: 'none',
                        appearance: 'none',
                        outline: 'none',
                        background: 'none',
                        width: userStore.loginDay < 10 ? '10px' : '16px',
                      }"
                    >
                      <option value="1">1</option>
                      <option value="7">7</option>
                      <option value="30">30</option>
                    </select>
                    天免登录
                    <el-tooltip
                      content="勾选并登录后，规定天数内无需输入用户名和密码会自动登入系统"
                      placement="top"
                      effect="dark"
                    >
                      <!-- 这里渲染图标需要后面修改 -->
                      <el-icon><InfoFilled /></el-icon>
                    </el-tooltip>
                  </span>
                </el-checkbox>
                <el-button type="primary" link @click="userStore.currentPage = 2">
                  忘记密码？
                </el-button>
              </div>
            </el-form-item>
          </Motion>

          <Motion :delay="250">
            <el-form-item>
              <el-button
                type="primary"
                class="w-full"
                :loading="loading"
                :disabled="disabled"
                @click="onLogin"
              >
                登录
              </el-button>
              <el-button class="w-full ml-0! mt-3!" @click="userStore.currentPage = 1">
                注册
              </el-button>
            </el-form-item>
          </Motion>
        </el-form>

        <!-- 组件 -->
        <LoginRegist v-if="userStore.currentPage === 1" />
        <LoginUpdate v-if="userStore.currentPage === 2" />

        <Motion :delay="300" v-if="userStore.currentPage === 0">
          <div class="mt-10!">
            <el-divider>
              <span class="overflow-visible text-gray-500 text-xs">第三方登录方式</span>
            </el-divider>
            <div class="flex-ac">
              <AutoIcon icon="mdi:wechat" class="iconStyle" color="#999" width="20" />
              <AutoIcon icon="fa:weibo" class="iconStyle" color="#999" width="20" />
              <AutoIcon icon="mdi:github" class="iconStyle" color="#999" width="20" />
            </div>
          </div>
        </Motion>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
/* 背景图片 */
.wave {
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
  width: 80%;
  height: 100%;
}

/* 主内容区 */
.login-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  // gap: 10rem;
  width: 100vw;
  max-width: 100%;
  height: 100vh;

  /* 图片 */
  padding: 0 2rem;

  .left-img {
    display: flex;
    align-items: center;
    justify-content: end;
    transition: transform 0.5s ease;

    &:hover {
      transform: scale(1.02);
    }
  }

  /* 表单 */
  .login-box {
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    text-align: center;

    .login-form {
      width: 400px;
      padding: 2.5rem;
      background-color: #fff;
      border-radius: 16px;
      box-shadow: 0 10px 30px rgb(0 0 0 / 8%);
      transition: all 0.3s ease;

      &:hover {
        box-shadow: 0 15px 35px rgb(0 0 0 / 12%);
      }

      /* 表单图标 */
      .avatar {
        display: flex;
        justify-content: center;
        transition: transform 0.3s ease;

        &:hover {
          transform: rotate(5deg) scale(1.05);
        }
      }

      /* 表单标题 */
      .title {
        margin: 15px 0;
        font:
          bold 200% Consolas,
          Monaco,
          monospace;
        color: #999;
        text-transform: uppercase;
      }
    }
  }
}
</style>
