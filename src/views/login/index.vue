<script lang="ts" setup name="Login">
import setting from '@/setting'
// import wechat from "@iconify-json/ep"
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
        <el-form>
          <Motion>
            <el-form-item size="large">
              <el-input placeholder="账号" prefix-icon="User" clearable />
            </el-form-item>
          </Motion>

          <Motion :delay="100">
            <el-form-item size="large">
              <el-input placeholder="密码" prefix-icon="Lock" clearable show-password />
            </el-form-item>
          </Motion>

          <Motion :delay="150">
            <el-form-item size="large">
              <div class="w-full flex-bc gap-2">
                <el-input placeholder="验证码" prefix-icon="Key" clearable />
                <ImageVerify />
              </div>
            </el-form-item>
          </Motion>

          <Motion :delay="200">
            <el-form-item>
              <div class="w-full flex-bc">
                <el-checkbox label="记住我" />
                <el-button type="primary" link>忘记密码？</el-button>
              </div>
            </el-form-item>
          </Motion>

          <Motion :delay="250">
            <el-form-item>
              <el-button type="primary" class="w-full">登录</el-button>
            </el-form-item>
          </Motion>
        </el-form>

        <div class="mt-15!">
          <el-divider>
            <span class="overflow-visible text-gray-500 text-xs">第三方登录方式</span>
          </el-divider>
          <div class="flex-ac">
            <AutoIcon icon="mdi:wechat" class="iconStyle" color="#999" width="20" />
            <AutoIcon icon="fa:weibo" class="iconStyle" color="#999" width="20" />
            <AutoIcon icon="mdi:github" class="iconStyle" color="#999" width="20" />
          </div>
        </div>
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
