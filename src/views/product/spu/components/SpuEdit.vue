<script lang="ts" setup name="SpuEdit">
import {
  GetAllSaleAttrAPI,
  GetSpuImgAPI,
  GetSpuSaleAttrAPI,
  GetSpuTradeMarkAPI,
  OperateSpuAPI,
} from '@/api/product/spu'
import type {
  AllSaleAttrResponseData,
  GetAllSaleAttrResponseData,
  GetSpuImageResponseData,
  GetSpuSaleAttrResponseData,
  GetTrademarkResponseData,
  SpuImageResponseData,
  SpuRecords,
  SpuSaleAttrResponseData,
  TrademarkResponseData,
} from '@/api/product/spu/types'
import { useUserStore } from '@/stores/modules/user'
import type { UploadProps } from 'element-plus'
import { ElMessage } from 'element-plus'
import { computed, nextTick, ref, watch } from 'vue'

/* 仓库 */
const userStore = useUserStore()

/* 输入框对象 */
const inputRefs = ref<Array<any>>([])

// 参数
const props = defineProps<{
  scene: number
  formData: SpuRecords
}>()

// 事件
const emit = defineEmits<{
  'update:scene': [value: number]
  'save-success': []
}>()

// 表单
const spuForm = ref<SpuRecords>({
  category3Id: '',
  spuName: '',
  tmId: '',
  description: '',
  spuImageList: [] as SpuImageResponseData[],
  spuSaleAttrList: [] as SpuSaleAttrResponseData[],
})

/* 获取数据：品牌、图片、销售属性 */
// 品牌
const spuTmList = ref<TrademarkResponseData[]>([])
// 全部销售属性
const allSaleAttrList = ref<AllSaleAttrResponseData[]>([])
// 已有销售属性
const spuSaleAttrList = ref<SpuSaleAttrResponseData[]>([])
// 图片
const spuImgList = ref<SpuImageResponseData[]>([])
const getSpuData = async () => {
  try {
    // 品牌数据、全部销售属性
    const [tmRes, allSaleRes] = (await Promise.all([
      GetSpuTradeMarkAPI(),
      GetAllSaleAttrAPI(),
    ])) as [GetTrademarkResponseData, GetAllSaleAttrResponseData]

    spuTmList.value = tmRes.data
    allSaleAttrList.value = allSaleRes.data

    // 图片数据、销售属性数据
    if (spuForm.value.id) {
      try {
        const [imgRes, saleRes] = (await Promise.all([
          GetSpuImgAPI(spuForm.value.id),
          GetSpuSaleAttrAPI(spuForm.value.id),
        ])) as [GetSpuImageResponseData, GetSpuSaleAttrResponseData]
        // el-upload图片列表只能接收包含name和url的列表
        spuImgList.value = imgRes.data.map((item) => ({
          name: item.imgName,
          url: item.imgUrl,
        }))
        spuSaleAttrList.value = saleRes.data
      } catch (imgError) {
        console.warn('图片数据加载失败:', imgError)
        spuImgList.value = [] // 失败时设置为空数组
      }
    }
  } catch (error) {
    console.error('数据获取失败:', error)
    ElMessage.error('获取数据失败')
  }
}

/* 图片上传 */
const baseUrl = import.meta.env.VITE_SERVE
const actionUrl = baseUrl + '/admin/product/fileUpload'
const headers = { Token: userStore.token }
// 对话框
const imgVisible = ref<boolean>(false)
const imgUrl = ref<string>('')
const imgName = ref<string>('')

// 点击预览
const handlePictureCardPreview: UploadProps['onPreview'] = (uploadFile) => {
  imgUrl.value = uploadFile.url
  imgName.value = uploadFile.name
  imgVisible.value = true
}

// 点击删除
const handleRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles)
}

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

/* 销售属性 */
// 未选择的销售属性
const unSelectSaleAttrList = computed(() => {
  return allSaleAttrList.value.filter(
    (item1) => !spuSaleAttrList.value.some((item2) => item2.saleAttrName === item1.name),
  )
})

// placeholder值
const placeholderText = computed(() => {
  return unSelectSaleAttrList.value.length
    ? `还有${unSelectSaleAttrList.value.length}个属性未选择`
    : '没有未选择项'
})

/* 添加销售属性 */
// el-select：v-model绑定值(也就是option的value值)，因为后续新增/修改spu需要销售属性的id和name,因此绑定这两个值
const saleAttrInfo = ref<string>('')
const addSaleAttr = () => {
  // 把绑定的值，拆成数组并解构
  const [baseSaleAttrId, saleAttrName] = saleAttrInfo.value.split(':')
  const saleAttrObj: SpuSaleAttrResponseData = {
    baseSaleAttrId: Number(baseSaleAttrId),
    saleAttrName,
    spuSaleAttrValueList: [],
  }
  spuSaleAttrList.value.push(saleAttrObj)
  // 清空选择框的数据
  saleAttrInfo.value = ''
}

/* 删除销售属性 */
const deleteSaleAttr = ($index) => {
  spuSaleAttrList.value.splice($index, 1)
}

/* 添加销售属性值 */
const addSaleAttrValue = (row: SpuSaleAttrResponseData, $index) => {
  row.valueName = ''
  row.flag = true
  // 光标自动聚焦
  nextTick(() => {
    inputRefs.value[$index]?.focus()
  })
}

/* 失去光标 */
const handleBlur = (row: SpuSaleAttrResponseData) => {
  const { baseSaleAttrId, valueName } = row

  // 收集属性值
  const spuAttrValueObj = {
    baseSaleAttrId,
    saleAttrValueName: valueName,
  }

  // 验证空值
  const value = row.valueName?.trim() || ''
  if (!value) {
    ElMessage.error('属性值不能为空！')
    // row.attrValueList.splice($index, 1)
    return
  }

  // 验证重复值
  // item.valueName === row.valueName：是否有重复
  const valueNameRepeat = row.spuSaleAttrValueList.find((item) => {
    return item.saleAttrValueName === row.valueName
  })
  // 如果有重复值，把重复值剔除，并提示信息
  if (valueNameRepeat) {
    ElMessage.error('属性值不能重复!')
    return
  }
  // 验证通过
  row.flag = false
  row.spuSaleAttrValueList.push(spuAttrValueObj)
}

/* 删除标签 */
const handleClose = (tag, tags) => {
  const index = tags.indexOf(tag)
  tags.splice(index, 1)
}

/* 保存 */
const saveSaleAttr = async () => {
  // 收集数据
  spuForm.value.spuImageList = spuImgList.value.map((item: any) => {
    return {
      imgName: item.name,
      imgUrl: (item.response && item.response.data) || item.url,
    }
  })
  spuForm.value.spuSaleAttrList = spuSaleAttrList.value
  try {
    await OperateSpuAPI(spuForm.value as SpuRecords)
    ElMessage.success(spuForm.value.id ? '编辑成功！' : '添加成功！')
    emit('update:scene', 1)
    emit('save-success')
  } catch (error) {
    console.log(error)
    ElMessage.error(spuForm.value.id ? '编辑失败！' : '添加失败！')
  }
}

/* 监视数据变化 */
watch(
  () => props.formData,
  (newData) => {
    if (newData) {
      // 深拷贝
      spuForm.value = JSON.parse(JSON.stringify(newData))
      // 获取数据
      getSpuData()
    }
  },
  { immediate: true },
)
</script>

<template>
  <!-- 添加/编辑属性的页面 -->
  <el-form label-width="100px" :model="spuForm">
    <el-form-item label="SPU名称" prop="spuName">
      <el-input v-model="spuForm.spuName" placeholder="请输入SPU名称" clearable />
    </el-form-item>

    <el-form-item label="SPU品牌">
      <el-select v-model="spuForm.tmId" placeholder="请选择" clearable filterable>
        <el-option v-for="item in spuTmList" :key="item.id" :value="item.id" :label="item.tmName" />
      </el-select>
    </el-form-item>

    <el-form-item label="SPU描述" prop="description">
      <el-input v-model="spuForm.description" placeholder="请输入SPU描述" clearable />
    </el-form-item>

    <el-form-item label="SPU图片">
      <el-upload
        v-model:file-list="spuImgList"
        class="avatar-uploader"
        :headers="headers"
        :action="actionUrl"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        :before-upload="beforeAvatarUpload"
      >
        <el-icon class="avatar-uploader-icon">
          <Plus />
        </el-icon>
      </el-upload>
      <el-dialog v-model="imgVisible">
        <img :src="imgUrl" alt="imgName" w-full style="width: 100%; height: 100%" />
      </el-dialog>
    </el-form-item>

    <el-form-item label="SPU销售属性">
      <el-select
        v-model="saleAttrInfo"
        :placeholder="placeholderText"
        clearable
        filterable
        style="width: 240px; margin-right: 10px"
      >
        <el-option
          v-for="item in unSelectSaleAttrList"
          :key="item.id"
          :value="`${item.id}:${item.name}`"
          :label="item.name"
        />
      </el-select>

      <el-button type="primary" icon="Plus" @click="addSaleAttr">添加属性值</el-button>

      <el-table border style="width: 100%; margin-top: 10px" :data="spuSaleAttrList">
        <el-table-column type="index" label="序号" width="80" />
        <el-table-column prop="saleAttrName" label="销售属性名称" width="120" />
        <el-table-column label="销售属性值">
          <template #default="{ row, $index }">
            <el-tag
              v-for="item in row.spuSaleAttrValueList"
              :key="item.baseSaleAttrId"
              type="success"
              style="margin-right: 5px"
              closable
              @close="handleClose(item, row.spuSaleAttrValueList)"
            >
              {{ item.saleAttrValueName }}
            </el-tag>
            <el-input
              v-if="row.flag"
              :ref="(el: any) => (inputRefs[$index] = el)"
              v-model="row.valueName"
              style="width: 100px; height: 22px"
              @keyup.enter="handleBlur(row)"
              @blur="handleBlur(row)"
            />
            <el-button
              v-else
              type="warning"
              size="small"
              icon="Plus"
              @click="addSaleAttrValue(row, $index)"
            />
          </template>
        </el-table-column>
        <el-table-column label="销售属性操作" width="120">
          <template #default="{ $index }">
            <el-button type="danger" size="small" icon="Delete" @click="deleteSaleAttr($index)" />
          </template>
        </el-table-column>
      </el-table>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="saveSaleAttr">保存</el-button>
      <el-button @click="emit('update:scene', 1)">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<style lang="scss" scoped>
:deep(.el-form-item__label) {
  font-weight: normal;
}

.avatar-uploader .avatar {
  display: block;
  width: 148px;
  height: 148px;
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
  width: 148px;
  height: 148px;
  font-size: 28px;
  color: #8c939d;
  text-align: center;
}

/* :deep(td.el-table__cell) {
  height: 42px;
} */
</style>
