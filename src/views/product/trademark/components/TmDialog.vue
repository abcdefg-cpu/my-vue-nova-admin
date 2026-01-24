<script lang="ts" setup name="TmDialog">
import { ref, watch, nextTick } from 'vue'
import { ElMessage } from 'element-plus'
import type { UploadProps } from 'element-plus'
import { OperateTrademarkAPI } from '@/api/product/trademark'
import type { TrademarkRecords } from '@/api/product/trademark/types'
import { rules } from '../utils/rules'
import { useUserStore } from '@/stores/modules/user'

/* 状态与仓库 */
const userStore = useUserStore()

/* 接收参数 */
const props = defineProps<{
  dialogVisible: boolean
  formData?: TrademarkRecords
}>()

const emit = defineEmits<{
  'update:dialog-visible': [value: boolean]
  'save-success': []
  'change-page': []
}>()

const trademarkFormRef = ref()
/* 表单 */
const trademarkForm = ref<TrademarkRecords>({
  tmName: '',
  logoUrl: '',
})

/* 对表单进行处理 */
watch(
  () => [props.dialogVisible, props.formData], // 同时监听两个属性的变化
  ([newVisible, newData]) => {
    if (newVisible) {
      if (newData) {
        // 编辑模式：使用父组件传递的数据
        trademarkForm.value = { ...(newData as TrademarkRecords) }
        // 清除验证状态
        nextTick(() => {
          trademarkFormRef.value?.clearValidate()
        })
      } else {
        // 新增模式：重置表单、清除验证状态
        nextTick(() => {
          trademarkFormRef.value?.resetFields()
        })
      }
    }
  },
  { immediate: true },
)

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

/* 确定提交 */
const confirmSubmit = async () => {
  await trademarkFormRef.value.validate()
  try {
    await OperateTrademarkAPI(trademarkForm.value)
    emit('update:dialog-visible', false) // 触发关闭对话框
    ElMessage.success(trademarkForm.value.id ? '编辑成功' : '添加成功')
    if (!trademarkForm.value.id) {
      emit('change-page')
    }
    emit('save-success')
  } catch {
    emit('update:dialog-visible', false)
    ElMessage.error(trademarkForm.value.id ? '编辑失败' : '添加失败')
  }
}
</script>

<template>
  <el-dialog
    v-model="props.dialogVisible"
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
        <el-button @click="emit('update:dialog-visible', false)">取消</el-button>
        <el-button type="primary" @click="confirmSubmit">确定</el-button>
      </div>
    </template>
  </el-dialog>
</template>
