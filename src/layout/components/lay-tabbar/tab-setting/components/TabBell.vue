<script lang="ts" setup name="TabBell">
import { ref } from 'vue'
const activeTab = ref(1)

const navItems = [
  { id: 1, label: '通知' },
  { id: 2, label: '消息(3)' },
  { id: 3, label: '待办(4)' },
]
</script>

<template>
  <el-dropdown
    class="dropdown"
    placement="bottom-end"
    trigger="click"
    popper-class="bell-dropdown-popper"
  >
    <el-badge :value="7">
      <el-button circle icon="Bell" size="small" />
    </el-badge>
    <template #dropdown>
      <div class="custom-dropdown-menu">
        <!-- 导航区域 -->
        <div class="menu-nav">
          <span
            v-for="item in navItems"
            :key="item.id"
            :class="{ active: activeTab === item.id }"
            @click="activeTab = item.id"
            class="nav-item"
          >
            {{ item.label }}
          </span>
        </div>

        <!-- 分隔线 -->
        <div class="divider" />

        <!-- 内容区域 - 仍然用 el-dropdown-item -->
        <div class="content-area">
          <el-dropdown-menu>
            <template v-if="activeTab === 1">
              <el-empty description="暂无通知" />
            </template>
            <template v-else-if="activeTab === 2">
              <el-dropdown-item>
                <div class="news">
                  <span class="img">
                    <img src="https://xiaoxian521.github.io/hyperlink/svg/smile1.svg" alt="" />
                  </span>
                  <div>
                    <p class="name">小铭&nbsp;评论了你</p>
                    <p class="message">长风破浪会有时，直挂云帆济沧海。</p>
                    <p class="time">今天</p>
                  </div>
                </div>
              </el-dropdown-item>
              <el-dropdown-item>
                <div class="news">
                  <span class="img">
                    <img src="https://xiaoxian521.github.io/hyperlink/svg/smile1.svg" alt="" />
                  </span>
                  <div>
                    <p class="name">小铭&nbsp;评论了你</p>
                    <p class="message">长风破浪会有时，直挂云帆济沧海。</p>
                    <p class="time">今天</p>
                  </div>
                </div>
              </el-dropdown-item>
              <el-dropdown-item>
                <div class="news">
                  <span class="img">
                    <img src="https://xiaoxian521.github.io/hyperlink/svg/smile1.svg" alt="" />
                  </span>
                  <div>
                    <p class="name">小铭&nbsp;评论了你</p>
                    <p class="message">长风破浪会有时，直挂云帆济沧海。</p>
                    <p class="time">今天</p>
                  </div>
                </div>
              </el-dropdown-item>
            </template>
            <template v-else-if="activeTab === 3">
              <el-dropdown-item>
                <div class="backlog">
                  <div class="title">
                    第三方紧急代码变更
                    <el-tag type="danger" effect="light">马上到期</el-tag>
                  </div>
                  <p class="task">小林提交于 2024-05-10，需在 2024-05-11 前完成代码变更任务</p>
                </div>
              </el-dropdown-item>
              <el-dropdown-item>
                <div class="backlog">
                  <div class="title">
                    版本发布
                    <el-tag type="warning" effect="light">已耗时8天</el-tag>
                  </div>
                  <p class="task">指派小铭于 2024-06-18 前完成更新并发布</p>
                </div>
              </el-dropdown-item>
              <el-dropdown-item>
                <div class="backlog">
                  <div class="title">
                    新功能开发
                    <el-tag type="primary" effect="light">进行中</el-tag>
                  </div>
                  <p class="task">开发多租户管理</p>
                </div>
              </el-dropdown-item>
              <el-dropdown-item>
                <div class="backlog">
                  <div class="title">
                    第三方紧急代码变更
                    <el-tag type="info" effect="light">未开始</el-tag>
                  </div>
                  <p class="task">任务需要在 2030-10-30 10:00 前启动</p>
                </div>
              </el-dropdown-item>
            </template>
          </el-dropdown-menu>
        </div>
      </div>
    </template>
  </el-dropdown>
</template>

<style lang="scss" scoped>
.dropdown {
  margin: 0 12px;
}

.bell-dropdown-popper {
  min-width: 330px;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);

  .custom-dropdown-menu {
    overflow: hidden;
    border-radius: 4px;
  }

  .menu-nav {
    display: flex;
    align-items: center;
    justify-content: space-around;
    height: 40px;
    padding: 0 36px;
    border-bottom: 1px solid #e4e7ed;
  }

  .nav-item {
    height: 100%;
    padding: 0 5px;
    font-size: 14px;
    line-height: 40px;
    color: #303133;
    text-align: center;
    cursor: pointer;
    transition: all 0.3s;

    &:hover {
      color: #409eff;
    }

    &.active {
      color: #409eff;
      border-bottom: 2px solid #409eff;
    }
  }

  .divider {
    height: 1px;
    margin: 0;
    background-color: #e4e7ed;
  }

  .content-area {
    width: 330px;
    height: 312px;
    max-height: 312px;
    padding: 15px 24px 0;
    overflow-y: auto;

    .news {
      display: flex;
      width: 100%;
      color: #303133;
      background-color: #fff;

      .img {
        padding-right: 20px;
      }

      .name {
        padding-bottom: 6px;
        font-size: 14px;
      }

      .message {
        font-size: 12px;
      }

      .time {
        margin-top: 2px;
        font-size: 12px;
      }
    }

    .backlog {
      width: 100%;

      .title {
        display: flex;
        justify-content: space-between;
        width: 100%;
        padding-bottom: 6px;
        font-size: 14px;
      }

      .task {
        width: 100%;
        font-size: 12px;
        word-break: break-all; // 在亚洲语言中更有效
        overflow-wrap: break-word; // 允许在单词内换行
        white-space: normal; // 默认值，正常换行
      }
    }
  }
}
</style>

<style lang="scss">
.content-area {
  .el-dropdown-menu {
    padding: 0 !important;
    margin: 0 !important;
    border: none !important;
    box-shadow: none !important;

    .el-dropdown-menu__item {
      padding: 12px 0 !important;
      color: #303133 !important;
      background-color: #fff !important;
      border-bottom: 1px solid #eee !important;
    }
  }
}
</style>
