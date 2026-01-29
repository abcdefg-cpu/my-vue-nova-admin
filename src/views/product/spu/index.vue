<script lang="ts" setup name="ProdSPU">
import { DeleteSpuAPI, GetSpuAPI } from '@/api/product/spu'
import type { SpuRecords } from '@/api/product/spu/types'
import Category from '@/components/Category/index.vue'
import Pagination from '@/components/Pagination/index.vue'
import { ElMessage } from 'element-plus'
import { ref, watch } from 'vue'
// import { GetAttrAPI, DeleteAttrAPI } from '@/api/product/attr'
// import type { AttrResponseData } from '@/api/product/attr/types'
import SpuEdit from './components/SpuEdit.vue'

// 初始化表单
const spuFormData = ref<SpuRecords | null>(null)

// 场景切换
const scene = ref(1)

/* 分类选择器 */
const categoryRef = ref<InstanceType<typeof Category>>()

/* 分页器 */
const paginationRef = ref<InstanceType<typeof Pagination>>()

/* 按钮 */
const C3Id = ref()

/* 获取SPU */
// SPU列表
const spuList = ref<SpuRecords[]>([])
// 数据条数
const total = ref()
const getSpu = async () => {
  const res = await GetSpuAPI(
    paginationRef.value.currentPage,
    paginationRef.value.pageSize,
    categoryRef.value.C3Id,
  )
  spuList.value = res.data.records
  total.value = res.data.total
}

/* 添加SPU */
const addSpu = () => {
  scene.value = 0
  // 清空表单数据
  spuFormData.value = {
    category3Id: categoryRef.value.C3Id || '',
    spuName: '',
    tmId: '',
    description: '',
    spuImageList: [],
    spuSaleAttrList: [],
  }
}

// /* 编辑属性 */
const editSpu = (row: SpuRecords) => {
  scene.value = 0
  // 深拷贝数据，避免修改原数据
  spuFormData.value = JSON.parse(JSON.stringify(row))
}

/* 添加SKU */
const addSku = (row) => {
  console.log(row)
}

/* 查看SKU */
const checkSpu = (row) => {
  console.log(row)
}

/* 删除属性 */
const deleteSpu = async (row: SpuRecords) => {
  try {
    await DeleteSpuAPI(row.id)
    ElMessage.success('删除成功！')
    getSpu()
  } catch {
    ElMessage.error('删除失败！')
  }
}

/* 保存成功后渲染列表 */
const handleSaveSuccess = () => {
  getSpu()
}

/* 渲染页面：选择器全部有值后才渲染*/
watch(
  () => categoryRef.value?.C3Id,
  (newId) => {
    if (!categoryRef.value?.C3Id) return
    C3Id.value = newId || ''
    getSpu()
  },
)
</script>

<template>
  <!-- 选择器 -->
  <Category ref="categoryRef" :scene="scene" />

  <el-card class="spu-card">
    <!-- 显示属性的页面 -->
    <template v-if="scene === 1">
      <el-button
        :disabled="!C3Id"
        type="primary"
        size="default"
        icon="Plus"
        style="font-weight: 600"
        @click="addSpu"
      >
        添加属性
      </el-button>
      <el-table :data="spuList" border class="spu-table">
        <el-table-column type="index" label="序号" width="80" align="center" />
        <el-table-column label="SPU名称" prop="spuName" width="120" />
        <el-table-column label="SPU描述" prop="description" />
        <el-table-column label="SPU操作" width="210">
          <template #default="{ row }">
            <el-button
              type="primary"
              size="small"
              icon="Edit"
              title="编辑SPU"
              @click="editSpu(row)"
            />
            <el-button
              type="warning"
              size="small"
              icon="Plus"
              title="添加SKU"
              @click="addSku(row)"
            />
            <el-button
              type="info"
              size="small"
              icon="View"
              title="查看SPU"
              @click="checkSpu(row)"
            />
            <el-popconfirm
              width="250px"
              :title="`确定删除${row.spuName}吗？`"
              placement="bottom-end"
              @confirm="deleteSpu(row)"
            >
              <template #reference>
                <el-button type="danger" size="small" icon="Delete" />
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <Pagination ref="paginationRef" :total="total" :get-data="getSpu" />
    </template>

    <!-- 添加/编辑属性的页面 -->
    <template v-else>
      <SpuEdit
        v-if="spuFormData"
        :form-data="spuFormData"
        :scene="scene"
        @update:scene="scene = $event"
        @save-success="handleSaveSuccess"
      />
      <!-- <Spd
        v-if="editFormData"
        :scene="scene"
        :attr-list="attrList"
        :form-data="editFormData"
        :get-attr="getAttr"
        @update:scene="scene = $event"
        @save-success="handleSaveSuccess"
      /> -->
    </template>
  </el-card>
</template>

<style lang="scss" scoped>
.spu-card {
  margin-top: 10px;

  .spu-table {
    width: 100%;
    margin-top: 20px;
  }
}

// :deep(td.el-table__cell) {
//   height: 50px;
// }
</style>
