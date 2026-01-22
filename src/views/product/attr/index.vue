<script lang="ts" setup name="ProdAttr">
import { ref, watch } from 'vue'
import { ElMessage } from 'element-plus'
import Category from '@/components/Category/index.vue'
import { GetAttrAPI, DeleteAttrAPI } from '@/api/product/attr'
import type { AttrResponseData } from '@/api/product/attr/types'
import AttrEdit from './components/AttrEdit.vue'

const editFormData = ref<AttrResponseData | null>(null)

const scene = ref(1)

/* 分类选择器 */
const categoryRef = ref<InstanceType<typeof Category>>()

/* 按钮 */
const C3Id = ref()

/* 获取属性 */
const attrList = ref<AttrResponseData[]>([])
const getAttr = async () => {
  const res = await GetAttrAPI(
    categoryRef.value.C1Id,
    categoryRef.value.C2Id,
    categoryRef.value.C3Id,
  )
  attrList.value = res.data
}

/* 渲染页面：选择器全部有值后才渲染*/
watch(
  () => categoryRef.value?.C3Id,
  (newId) => {
    if (!categoryRef.value?.C3Id) return
    C3Id.value = newId || ''
    getAttr()
  },
)

/* 添加属性 */
const addAttr = () => {
  scene.value = 0
  // 清空表单数据
  editFormData.value = {
    attrName: '',
    categoryId: categoryRef.value?.C3Id || '',
    categoryLevel: 3,
    attrValueList: [],
  }
}

/* 编辑属性 */
const editAttr = (row: AttrResponseData) => {
  scene.value = 0
  // 深拷贝数据，避免修改原数据
  editFormData.value = {
    ...row,
    attrValueList: row.attrValueList.map((item) => ({
      ...item, //展开原对象的所有属性
      flag: false, // 添加新属性 flag: false
    })),
  }
}

/* 删除属性 */
const deleteAttr = async (row: AttrResponseData) => {
  try {
    await DeleteAttrAPI(row.id)
    ElMessage.success('删除成功！')
    getAttr()
  } catch {
    ElMessage.error('删除失败！')
  }
}

/* 保存成功后渲染列表 */
const handleSaveSuccess = () => {
  getAttr()
}
</script>

<template>
  <!-- 选择器 -->
  <Category ref="categoryRef" :scene="scene" />

  <el-card class="attr-card">
    <!-- 显示属性的页面 -->
    <template v-if="scene === 1">
      <el-button
        :disabled="!C3Id"
        type="primary"
        size="default"
        icon="Plus"
        style="font-weight: 600"
        @click="addAttr"
      >
        添加属性
      </el-button>
      <el-table :data="attrList" border class="attr-table">
        <el-table-column type="index" label="序号" width="80" align="center" />
        <el-table-column label="属性名称" prop="attrName" width="120" />
        <el-table-column label="属性值名称" prop="attrValueList">
          <template #default="{ row }">
            <el-tag v-for="item in row.attrValueList" :key="item.id" style="margin-right: 5px">
              {{ item.valueName }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="属性操作" width="120">
          <template #default="{ row }">
            <el-button type="warning" size="small" icon="Edit" @click="editAttr(row)" />
            <el-popconfirm
              width="250px"
              :title="`确定删除${row.attrName}吗？`"
              placement="bottom-end"
              @confirm="deleteAttr(row)"
            >
              <template #reference>
                <el-button type="danger" size="small" icon="Delete" />
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </template>

    <!-- 添加/编辑属性的页面 -->
    <template v-else>
      <AttrEdit
        v-if="editFormData"
        :scene="scene"
        :attr-list="attrList"
        :form-data="editFormData"
        :get-attr="getAttr"
        @update:scene="scene = $event"
        @save-success="handleSaveSuccess"
      />
    </template>
  </el-card>
</template>

<style lang="scss" scoped>
.attr-card {
  margin-top: 10px;

  .attr-table {
    width: 100%;
    margin-top: 20px;
  }
}

:deep(td.el-table__cell) {
  height: 50px;
}
</style>
