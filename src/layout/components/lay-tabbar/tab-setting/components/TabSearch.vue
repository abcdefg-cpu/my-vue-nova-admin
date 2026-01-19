<script setup lang="ts" name="TabSearch">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/modules/user'
import { Search, Close } from '@element-plus/icons-vue'
import type { MenuItem } from '@/types/router'

// 定义搜索历史项类型
interface SearchHistoryItem {
  keyword: string
  title: string
  path: string
}

// 路由和状态管理
const router = useRouter()
const userStore = useUserStore()

// 对话框显示控制
const dialogVisible = ref(false)
const searchKeyword = ref('')
const isSearching = ref(false)

// 搜索结果
const searchResults = ref<MenuItem[]>([])

// 搜索历史
const searchHistory = ref<SearchHistoryItem[]>([])

// 从store获取菜单路由
const menuRoutes = computed(() => {
  return userStore.menuRoutes || ([] as MenuItem[])
})

// 扁平化路由函数（处理嵌套路由）
const flattenRoutes = (routes: MenuItem[]): MenuItem[] => {
  const result: MenuItem[] = []

  const traverse = (routeList: MenuItem[]) => {
    routeList.forEach((route) => {
      // 只收集有title的菜单项
      if (route.meta?.title) {
        result.push(route)
      }

      // 递归处理子路由
      if (route.children && route.children.length > 0) {
        traverse(route.children)
      }
    })
  }

  traverse(routes)
  return result
}

// 打开对话框
const openDialog = () => {
  dialogVisible.value = true
  loadSearchHistory()
}

// 加载搜索历史
const loadSearchHistory = () => {
  const history = localStorage.getItem('menuSearchHistory')
  if (history) {
    try {
      searchHistory.value = JSON.parse(history)
    } catch {
      searchHistory.value = []
    }
  }
}

// 保存访问历史（只有访问了才保存）
const saveVisitHistory = (route: MenuItem) => {
  const keyword = searchKeyword.value.trim()
  const title = route.meta?.title || ''
  const path = route.path

  if (!keyword || !title) return

  // 创建历史记录项
  const historyItem: SearchHistoryItem = {
    keyword,
    title,
    path,
  }

  // 检查是否已存在相同的记录（根据路径去重）
  const existingIndex = searchHistory.value.findIndex((item) => item.path === path)

  if (existingIndex !== -1) {
    // 如果已存在，移到最前面并更新关键词
    searchHistory.value.splice(existingIndex, 1)
  }

  // 添加到最前面
  searchHistory.value.unshift(historyItem)

  // 最多保存10条
  if (searchHistory.value.length > 10) {
    searchHistory.value = searchHistory.value.slice(0, 10)
  }

  // 保存到本地存储
  localStorage.setItem('menuSearchHistory', JSON.stringify(searchHistory.value))
}

// 执行搜索
const performSearch = async () => {
  const keyword = searchKeyword.value.trim()
  if (!keyword) {
    searchResults.value = []
    return
  }

  isSearching.value = true

  // 模拟搜索延迟
  await new Promise((resolve) => setTimeout(resolve, 200))

  // 扁平化所有路由
  const flatRoutes = flattenRoutes(menuRoutes.value)

  // 执行模糊搜索：搜索 meta.title 包含关键词的路由
  const results = flatRoutes.filter((route) => {
    const title = route.meta?.title || ''
    return title.includes(keyword)
  })

  searchResults.value = results
  isSearching.value = false
}

// 输入时实时搜索（防抖）
let searchTimer = null
const handleSearch = () => {
  clearTimeout(searchTimer)
  searchTimer = setTimeout(() => {
    performSearch()
  }, 300)
}

// 使用历史记录搜索
const useHistory = (keyword: string) => {
  searchKeyword.value = keyword
  performSearch()
}

// 删除单条历史记录
const removeHistory = (index: number) => {
  searchHistory.value.splice(index, 1)
  localStorage.setItem('menuSearchHistory', JSON.stringify(searchHistory.value))
}

// 清空所有历史记录
const clearAllHistory = () => {
  searchHistory.value = []
  localStorage.removeItem('menuSearchHistory')
}

// 跳转到对应菜单
const navigateTo = (route: MenuItem) => {
  if (route.path) {
    // 保存访问历史
    saveVisitHistory(route)

    // 跳转页面
    router.push(route.path)
    dialogVisible.value = false
  }
}

// 对话框关闭时
const handleDialogClosed = () => {
  searchKeyword.value = ''
  searchResults.value = []
  isSearching.value = false
}

// 根据路径获取历史记录的图标
const getHistoryIcon = (path: string): any => {
  // 扁平化所有路由来查找对应的菜单项
  const flatRoutes = flattenRoutes(menuRoutes.value)
  const foundRoute = flatRoutes.find((route) => route.path === path)
  return foundRoute?.meta?.icon
}

// 组件挂载时加载历史记录
onMounted(() => {
  loadSearchHistory()
})
</script>

<template>
  <!-- 触发按钮 -->
  <el-button circle icon="Search" size="small" @click="openDialog" />

  <!-- 搜索对话框 -->
  <el-dialog
    v-model="dialogVisible"
    width="40%"
    :close-on-click-modal="false"
    @closed="handleDialogClosed"
  >
    <!-- 搜索框 -->
    <div class="search-input-wrapper">
      <el-input
        v-model="searchKeyword"
        placeholder="搜索菜单名称..."
        @input="handleSearch"
        @keyup.enter="performSearch"
        size="large"
        clearable
      >
        <template #prefix>
          <el-icon><Search /></el-icon>
        </template>
      </el-input>
      <el-button
        type="primary"
        :icon="Search"
        @click="performSearch"
        :loading="isSearching"
        class="search-btn"
        size="large"
      >
        搜索
      </el-button>
    </div>

    <!-- 搜索历史 - 只在没有搜索状态时显示 -->
    <div v-if="!searchKeyword && searchHistory.length > 0" class="search">
      <div class="search-header">
        <span class="title">搜索历史</span>
        <el-button type="text" @click="clearAllHistory" :disabled="searchHistory.length === 0">
          清空全部
        </el-button>
      </div>
      <ul class="search-list">
        <li v-for="(item, index) in searchHistory" :key="index" class="search-item">
          <el-icon v-if="getHistoryIcon(item.path)" class="menu-icon">
            <component :is="getHistoryIcon(item.path)" />
          </el-icon>
          <span class="search-title" @click="useHistory(item.keyword)">
            {{ item.title }}
          </span>
          <el-icon class="action-icon" @click="removeHistory(index)">
            <Close />
          </el-icon>
        </li>
      </ul>
    </div>

    <!-- 搜索结果 -->
    <div v-if="searchResults.length > 0" class="search">
      <div class="search-header">
        <span class="title">搜索结果</span>
        <span class="count">共 {{ searchResults.length }} 条结果</span>
      </div>
      <ul class="search-list">
        <li
          v-for="(item, index) in searchResults"
          :key="index"
          class="search-item"
          @click="navigateTo(item)"
        >
          <el-icon v-if="item.meta?.icon" class="menu-icon">
            <component :is="item.meta.icon" />
          </el-icon>
          <span class="search-title">{{ item.meta?.title }}</span>
          <el-icon class="action-icon"><Link /></el-icon>

          <!-- <div class="result-content">
            <span>
              <el-icon v-if="item.meta?.icon" class="menu-icon">
                <component :is="item.meta.icon" />
              </el-icon>
              <span class="menu-title">{{ item.meta?.title }}</span>
            </span>
            <el-icon><Link /></el-icon>
          </div> -->
        </li>
      </ul>
    </div>

    <!-- 空状态 -->
    <div v-if="searchKeyword && searchResults.length === 0" class="no-results">
      <el-empty description="未找到相关菜单" :image-size="80" />
    </div>

    <!-- 底部显示总结果数 -->
    <div v-if="searchResults.length > 0" class="results-footer">
      <div class="total-count">
        共找到
        <span class="highlight">{{ searchResults.length }}</span>
        个相关菜单
      </div>
    </div>

    <!-- 对话框底部 -->
    <template #footer>
      <el-button @click="dialogVisible = false">关闭</el-button>
    </template>
  </el-dialog>
</template>

<style lang="scss" scoped>
/* 按钮 */
.el-button {
  margin-right: 12px;
}

/* 搜索框 */
.search-input-wrapper {
  display: flex;
  gap: 12px;
  margin: 20px 0;

  // 搜索框
  :deep(.el-input) {
    flex: 1;
  }

  // 按钮
  .search-btn {
    flex-shrink: 0; //当父容器空间不足时的收缩比例，为0说明绝不收缩
  }
}

/* 搜索历史 & 搜索结果 */
.search {
  margin-bottom: 20px;

  // 头部
  .search-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;

    .title {
      font-size: 14px;
      font-weight: 500;
      color: #606266;
    }

    .count {
      font-size: 12px;
      color: #909399;
    }
  }

  // 列表
  .search-list {
    max-height: 200px;
    padding: 0;
    margin: 0;
    overflow-y: auto;
    list-style: none;

    .search-item {
      display: flex;
      gap: 8px; // 添加间距
      align-items: center;
      justify-content: space-between;
      height: 56px;
      padding: 8px 12px;
      margin-bottom: 8px;
      line-height: 56px;
      border: 1px solid #eee;
      border-radius: 4px;
      transition: background-color 0.3s;

      &:hover {
        color: #fff;
        background-color: #409eff;

        .action-icon {
          opacity: 1;
        }
      }

      .menu-icon {
        flex-shrink: 0;
        font-size: 16px;

        &:hover {
          color: #fff;
        }
      }

      .search-title {
        flex: 1;
        font-size: 14px;
        color: #606266;
        cursor: pointer;
        transition: all 0.3s;

        &:hover {
          font-size: 16px;
          color: #fff;
        }
      }

      .action-icon {
        cursor: pointer;
        opacity: 0.6;
        transition: opacity 0.3s;

        &:hover {
          color: #fff;
          opacity: 1;
        }
      }
    }
  }
}

/* 空状态 */
.no-results {
  padding: 40px 0;
  text-align: center;
}

/* 底部 */
.results-footer {
  padding-top: 16px;
  margin-top: 16px;
  text-align: center;
  border-top: 1px solid #e4e7ed;

  .total-count {
    font-size: 14px;
    color: #606266;

    .highlight {
      font-weight: 600;
      color: #409eff;
    }
  }
}
</style>
