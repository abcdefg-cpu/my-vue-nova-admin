<script lang="ts" setup name="ProdTM">
import { onMounted, ref, nextTick } from 'vue'
import { ElMessage } from 'element-plus'
import type { UploadProps } from 'element-plus'
import { GetTrademarkAPI, OperateTrademarkAPI, DeleteTrademarkAPI } from '@/api/product/trademark'
import type { TrademarkRecords } from '@/api/product/trademark/types'
import Pagination from '@/components/Pagination/index.vue'
import { useUserStore } from '@/stores/modules/user'
import { rules } from './utils/rules'

/* 仓库与路由 */
const userStore = useUserStore()

/* 对话框显示隐藏 */
const dialogVisible = ref(false)

/* 分页器 */
const paginationRef = ref<InstanceType<typeof Pagination>>()

/* 获取已有品牌 */
const trademarkList = ref([])
const total = ref()
const getTrademarkObj = async () => {
  const res = await GetTrademarkAPI(paginationRef.value.currentPage, paginationRef.value.pageSize)
  trademarkList.value = res.data.records
  total.value = res.data.total
}

/* 上传图片 */
const baseUrl = import.meta.env.VITE_SERVE
const imageUrl = baseUrl + '/admin/product/fileUpload'
const headers = { Token: userStore.token }
// 上传前
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  // 限定类型
  if (
    rawFile.type === 'image/jpeg' ||
    rawFile.type === 'image/png' ||
    rawFile.type === 'image/gif'
  ) {
    // 限定大小
    if (rawFile.size / 1024 / 1024 < 4) {
      return true
    } else {
      ElMessage.error('文件大小必须小于4M！')
      return false
    }
  } else {
    ElMessage.error('图片格式只能为：png、jpg、gif！')
    return false
  }
}

// 上传成功后
const handleAvatarSuccess: UploadProps['onSuccess'] = (response) => {
  // 收集图片地址
  trademarkForm.value.logoUrl = response.data
  // 清空图片验证
  trademarkFormRef.value.clearValidate('logoUrl')
}

/* 表单数据 */
// const initTrademarkForm = {
//   id: '',
//   tmName: '',
//   logoUrl: '',
// }
const trademarkForm = ref<TrademarkRecords>({
  tmName: '',
  logoUrl: '',
})

/* 新增品牌 */
const addTrademark = () => {
  nextTick(() => {
    trademarkFormRef.value?.resetFields()
  })
  dialogVisible.value = true
}

/* 编辑品牌 */
const editTrademark = (row: TrademarkRecords) => {
  dialogVisible.value = true
  nextTick(() => {
    trademarkFormRef.value.clearValidate()
  })
  trademarkForm.value = { ...row }
}

/* 删除品牌 */
const deleteTrademark = async (row: TrademarkRecords) => {
  try {
    await DeleteTrademarkAPI(row.id)
    ElMessage.success('删除成功！')
    paginationRef.value.currentPage = 1
    getTrademarkObj()
  } catch {
    ElMessage.error('删除失败！')
  }
}

/* 确定提交 */
const trademarkFormRef = ref()
const confirmSubmit = async () => {
  await trademarkFormRef.value.validate()
  try {
    await OperateTrademarkAPI(trademarkForm.value)
    dialogVisible.value = false
    ElMessage.success(trademarkForm.value.id ? '编辑成功' : '添加成功')
    if (!trademarkForm.value.id) {
      paginationRef.value.currentPage = Math.ceil((total.value + 1) / paginationRef.value.pageSize)
    }
    getTrademarkObj()
  } catch (error) {
    dialogVisible.value = false
    ElMessage.error(trademarkForm.value.id ? '编辑失败' : '添加失败')
    console.log(error)
  }
}

onMounted(() => {
  getTrademarkObj()
})
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
    <Pagination ref="paginationRef" :getTrademarkObj="getTrademarkObj" :total="total" />
  </el-card>

  <!-- 对话框 -->
  <el-dialog
    v-model="dialogVisible"
    :title="trademarkForm.id ? '编辑品牌' : '新增品牌'"
    width="500"
  >
    <el-form
      ref="trademarkFormRef"
      :model="trademarkForm"
      :rules="rules"
      label-width="100"
      style="width: 80%"
    >
      <el-form-item label="品牌名称" prop="tmName">
        <el-input v-model="trademarkForm.tmName" autocomplete="off" placeholder="请输入品牌名称" />
      </el-form-item>
      <el-form-item label="品牌LOGO" prop="logoUrl">
        <el-upload
          class="avatar-uploader"
          :headers="headers"
          :action="imageUrl"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="trademarkForm.logoUrl" :src="trademarkForm.logoUrl" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </el-form-item>
    </el-form>

    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="confirmSubmit">确定</el-button>
      </div>
    </template>
  </el-dialog>
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
