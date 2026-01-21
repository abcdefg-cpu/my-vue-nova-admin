<script lang="ts" setup name="ProdAttr">
import { ref, watch } from 'vue'
import { ElMessage } from 'element-plus'
import Category from '@/components/Category/index.vue'
import { GetAttrAPI, DeleteAttrAPI } from '@/api/product/attr'
import type { AttrResponseData } from '@/api/product/attr/types'

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

watch(
  () => categoryRef.value?.C3Id,
  (newId) => {
    if (!categoryRef.value?.C3Id) return
    C3Id.value = newId || ''
    getAttr()
  },
)

/* 添加/编辑属性表单 */
const attrForm = ref<AttrResponseData>({
  attrName: '',
  categoryId: 0,
  categoryLevel: 0,
  attrValueList: [],
})

/* 添加属性 */
const addAttr = (row) => {
  scene.value = 0
  console.log(row)
}

/* 编辑属性 */
const editAttr = (row) => {
  scene.value = 0
  console.log(row)
  attrForm.value.attrName = row.attrName
  attrForm.value.attrValueList = row.attrValueList
}

/* 删除属性 */
const deleteAttr = async (row: AttrResponseData) => {
  try {
    await DeleteAttrAPI(row.id)
    ElMessage.success('删除成功！')
    getAttr()
  } catch (error) {
    console.log(error)
    ElMessage.error('删除失败！')
  }
}

/* 添加属性值 */
const addAttrValue = () => {
  console.log(123)
}
const scene = ref(1)
</script>

<template>
  <!-- 选择器 -->
  <Category ref="categoryRef" />

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
      <el-form>
        <el-form-item label="属性名称" prop="attrName">
          <el-input
            v-model="attrForm.attrName"
            placeholder="请输入属性名称"
            clearable
            style="width: 200px"
          />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" icon="Plus" @click="addAttrValue">添加属性值</el-button>
          <el-button @click="scene = 1">取消</el-button>
        </el-form-item>

        <el-table border :data="attrForm.attrValueList">
          <el-table-column type="index" label="序号" width="80" align="center" />
          <el-table-column label="属性值名称">
            <template #default="{ row }">
              <div>{{ row.valueName }}</div>
            </template>
          </el-table-column>

          <el-table-column label="属性值操作">
            <template #default="{ row }">
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

        <el-form-item style="margin-top: 10px">
          <el-button type="primary" size="default">保存</el-button>
          <el-button size="default" @click="scene = 1">取消</el-button>
        </el-form-item>
      </el-form>
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
