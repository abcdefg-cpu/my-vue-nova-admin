<script lang="ts" setup name="ProdTM">
import { onMounted, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { GetTrademarkAPI, DeleteTrademarkAPI } from '@/api/product/trademark'
import type { TrademarkRecords } from '@/api/product/trademark/types'
import Pagination from '@/components/Pagination/index.vue'
import TmDialog from './components/TmDialog.vue'

/* 仓库与路由 */

/* 对话框显示隐藏 */
const dialogVisible = ref(false)

/* 分页器 */
const paginationRef = ref<InstanceType<typeof Pagination>>()

/* 初始化表单 */
const dialogFormData = ref<TrademarkRecords | null>(null)

/* 获取已有品牌 */
const trademarkList = ref([])
const total = ref()
const getTrademark = async () => {
  const res = await GetTrademarkAPI(paginationRef.value.currentPage, paginationRef.value.pageSize)
  trademarkList.value = res.data.records
  total.value = res.data.total
}
/* 新增品牌 */
const addTrademark = () => {
  dialogFormData.value = null
  dialogVisible.value = true
}

/* 编辑品牌 */
const editTrademark = (row: TrademarkRecords) => {
  dialogVisible.value = true
  dialogFormData.value = { ...row }
}

/* 删除品牌 */
const deleteTrademark = async (row: TrademarkRecords) => {
  try {
    await DeleteTrademarkAPI(row.id)
    ElMessage.success('删除成功！')
    paginationRef.value.currentPage = 1
    getTrademark()
  } catch {
    ElMessage.error('删除失败！')
  }
}

onMounted(() => {
  getTrademark()
})

/* 跳转页面 */
const changeCurrentPage = () => {
  paginationRef.value.currentPage = Math.ceil((total.value + 1) / paginationRef.value.pageSize)
}

/* 保存成功 */
const handleSaveSuccess = () => {
  getTrademark()
}
</script>

<template>
  <!-- 表格 -->
  <el-card>
    <el-button
      type="primary"
      size="default"
      icon="Plus"
      style="font-weight: 600"
      @click="addTrademark"
    >
      新增品牌
    </el-button>
    <el-table :data="trademarkList" border class="td-table">
      <el-table-column type="index" label="序号" width="80" align="center" />
      <el-table-column label="品牌名称" prop="tmName" />
      <el-table-column label="品牌LOGO">
        <template #default="{ row }">
          <img :src="row.logoUrl" style="width: 100px; height: 100px" />
        </template>
      </el-table-column>
      <el-table-column label="品牌操作">
        <template #default="{ row }">
          <el-button type="warning" size="small" icon="Edit" @click="editTrademark(row)" />
          <el-popconfirm
            width="250px"
            :title="`确定删除${row.tmName}吗？`"
            placement="bottom-end"
            @confirm="deleteTrademark(row)"
          >
            <template #reference>
              <el-button type="danger" size="small" icon="Delete" />
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <Pagination ref="paginationRef" :get-data="getTrademark" :total="total" />
  </el-card>

  <!-- 对话框 -->
  <TmDialog
    v-if="paginationRef"
    :form-data="dialogFormData"
    :dialog-visible="dialogVisible"
    @update:dialog-visible="dialogVisible = $event"
    @change-page="changeCurrentPage"
    @save-success="handleSaveSuccess"
  />
</template>

<style lang="scss" scoped>
.td-table {
  width: 100%;
  margin-top: 20px;
}
</style>

<style>
.avatar-uploader .el-upload {
  position: relative;
  overflow: hidden;
  cursor: pointer;
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  width: 178px;
  height: 178px;
  font-size: 28px;
  color: #8c939d;
  text-align: center;
}

.avatar {
  width: 180px;
  height: 180px;
}
</style>
