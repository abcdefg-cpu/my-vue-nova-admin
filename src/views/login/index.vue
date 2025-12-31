<script lang="ts" setup name="Login">
import setting from '@/setting'
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
              <div class="w-full flex-bc">
                <el-input placeholder="验证码" prefix-icon="Key" clearable />
                <ImageVerify />
              </div>
            </el-form-item>
          </Motion>

          <Motion :delay="200">
            <el-form-item>
              <el-button type="primary" class="w-full">登录</el-button>
            </el-form-item>
          </Motion>
        </el-form>
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
  gap: 18rem;
  width: 100vw;
  max-width: 100%;
  height: 100vh;

  /* 图片 */
  padding: 0 2rem;

  .left-img {
    display: flex;
    align-items: center;
    justify-content: end;
  }

  /* 表单 */
  .login-box {
    display: flex;
    align-items: center;
    overflow: hidden;
    text-align: center;

    .login-form {
      /* 表单图标 */
      width: 360px;

      .avatar {
        display: flex;
        justify-content: center;
        // align-items: flex-start;
        width: 100%;
        height: 80px;
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

  :deep(.el-input-group__append, .el-input-group__prepend) {
    padding: 0;
  }
}
</style>
