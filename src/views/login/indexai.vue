<script lang="ts" setup name="Login">
// import { ref } from 'vue'
import setting from '@/setting'
// import { useRouter } from 'vue-router'

// // 表单状态管理
// const loginForm = ref({
//   username: '',
//   password: '',
//   code: '',
// })
// const loading = ref(false)
// const router = useRouter()

// // 登录处理
// const handleLogin = () => {
//   loading.value = true
//   // 模拟登录请求
//   setTimeout(() => {
//     loading.value = false
//     router.push('/home')
//   }, 800)
// }
</script>

<template>
  <div class="login-page">
    <!-- 背景装饰 -->
    <div class="bg-decoration">
      <div class="bg-blur" />
      <img src="@/assets/login/bg.png" class="bg-img" />
    </div>

    <!-- 主容器 -->
    <div class="login-container">
      <!-- 左侧插画区 -->
      <div class="illustration-section">
        <div class="illustration-content">
          <SvgIcon name="illustration" :size="500" class="main-illustration" />
          <div class="brand-slogan">
            <h1 class="slogan-text">{{ setting.title || '高效管理，从这里开始' }}</h1>
            <p class="slogan-desc">专业的后台管理解决方案，助力业务快速发展</p>
          </div>
        </div>
      </div>

      <!-- 右侧表单区 -->
      <div class="form-section">
        <div class="login-card">
          <!-- 品牌标识 -->
          <div class="brand-logo">
            <SvgIcon name="avatar" :size="80" class="logo-icon" />
            <TypeIt class="logo-text" :speed="100">
              {{ setting.title }}
            </TypeIt>
          </div>

          <!-- 登录表单 -->
          <el-form class="login-form" size="large">
            <Motion>
              <el-form-item>
                <el-input
                  placeholder="请输入账号"
                  prefix-icon="User"
                  clearable
                  autocomplete="username"
                  class="form-input"
                />
              </el-form-item>
            </Motion>

            <Motion :delay="100">
              <el-form-item>
                <el-input
                  placeholder="请输入密码"
                  prefix-icon="Lock"
                  clearable
                  show-password
                  autocomplete="current-password"
                  class="form-input"
                />
              </el-form-item>
            </Motion>

            <Motion :delay="150">
              <el-form-item>
                <div class="verify-code-group">
                  <el-input
                    placeholder="请输入验证码"
                    prefix-icon="Key"
                    clearable
                    class="form-input verify-input"
                  />
                  <ImageVerify class="verify-code" />
                </div>
              </el-form-item>
            </Motion>

            <Motion :delay="200">
              <el-form-item class="form-actions">
                <el-checkbox class="remember-me">记住密码</el-checkbox>
                <el-link type="primary" class="forgot-password">忘记密码?</el-link>
              </el-form-item>
            </Motion>

            <Motion :delay="250">
              <el-form-item>
                <el-button type="primary" class="login-btn w-full">登录</el-button>
              </el-form-item>
            </Motion>
          </el-form>

          <!-- 其他登录方式 -->
          <div class="other-login">
            <div class="divider">
              <span>其他登录方式</span>
            </div>
            <div class="social-login">
              <el-icon class="social-icon" size="24"><Wechat /></el-icon>
              <el-icon class="social-icon" size="24"><Weibo /></el-icon>
              <el-icon class="social-icon" size="24"><Github /></el-icon>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 页脚信息 -->
    <footer class="login-footer">
      <p>© {{ new Date().getFullYear() }} {{ setting.title }}. 保留所有权利</p>
    </footer>
  </div>
</template>

<style scoped lang="scss">
.login-page {
  position: relative;
  min-height: 100vh;
  overflow: hidden;
}

// 背景样式优化
.bg-decoration {
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  width: 100%;
  height: 100%;

  .bg-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: brightness(0.8);
  }

  .bg-blur {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      to right,
      rgb(255 255 255 / 90%),
      rgb(255 255 255 / 70%) 50%,
      rgb(255 255 255 / 95%)
    );
  }
}

// 主容器布局
.login-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  width: 100%;
  max-width: 1400px;
  min-height: 100vh;
  padding: 2rem;
  margin: 0 auto;

  @media (width <= 1024px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}

// 左侧插画区
.illustration-section {
  display: flex;
  justify-content: center;
  padding: 2rem;

  .illustration-content {
    text-align: center;
  }

  .main-illustration {
    transition: transform 0.5s ease;

    &:hover {
      transform: scale(1.02);
    }
  }

  .brand-slogan {
    margin-top: 2rem;

    .slogan-text {
      margin-bottom: 0.5rem;
      font-size: 2rem;
      font-weight: 700;
      color: #333;
    }

    .slogan-desc {
      max-width: 500px;
      margin: 0 auto;
      font-size: 1rem;
      color: #666;
    }
  }
}

// 右侧表单区
.form-section {
  display: flex;
  justify-content: center;
  padding: 2rem;
}

// 登录卡片样式
.login-card {
  width: 100%;
  max-width: 400px;
  padding: 2.5rem;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgb(0 0 0 / 8%);
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 15px 35px rgb(0 0 0 / 12%);
  }

  .brand-logo {
    margin-bottom: 2rem;
    text-align: center;

    .logo-icon {
      margin: 0 auto 1rem;
      transition: transform 0.3s ease;

      &:hover {
        transform: rotate(5deg) scale(1.05);
      }
    }

    .logo-text {
      font-size: 1.8rem;
      font-weight: 700;
      color: #333;
    }
  }
}

// 表单样式
.login-form {
  width: 100%;

  .form-input {
    height: 50px;
    border-color: #e5e7eb;
    border-radius: 8px;
    transition: all 0.2s ease;

    &:focus-within {
      border-color: #409eff;
      box-shadow: 0 0 0 3px rgb(64 158 255 / 10%);
    }
  }

  .verify-code-group {
    display: flex;
    gap: 10px;

    .verify-input {
      flex: 1;
    }

    .verify-code {
      width: 120px;
      height: 50px;
      cursor: pointer;
      border-radius: 8px;
    }
  }

  .form-actions {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 0.5rem;

    .remember-me {
      font-size: 0.9rem;
      color: #666;
    }

    .forgot-password {
      height: auto;
      padding: 0;
      font-size: 0.9rem;
    }
  }

  .login-btn {
    height: 50px;
    font-size: 1.1rem;
    border-radius: 8px;
    transition: all 0.3s ease;

    &:not(:disabled):hover {
      transform: translateY(-2px);
    }
  }
}

// 其他登录方式
.other-login {
  margin-top: 1.5rem;

  .divider {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;

    &::before,
    &::after {
      flex: 1;
      height: 1px;
      content: '';
      background-color: #e5e7eb;
    }

    span {
      padding: 0 1rem;
      font-size: 0.9rem;
      color: #999;
    }
  }

  .social-login {
    display: flex;
    gap: 1.5rem;
    justify-content: center;

    .social-icon {
      color: #666;
      cursor: pointer;
      transition: all 0.2s ease;

      &:hover {
        color: #409eff;
        transform: scale(1.15);
      }
    }
  }
}

// 页脚样式
.login-footer {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 1rem;
  font-size: 0.9rem;
  color: #999;
  text-align: center;
  background: rgb(255 255 255 / 70%);
}

// 动画相关
:deep(.motion-enter-active) {
  transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
}
</style>
