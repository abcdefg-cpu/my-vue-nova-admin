<script lang="ts" setup name="ProdAttr">
import { nextTick, ref, watch } from 'vue'
import { ElMessage } from 'element-plus'
import Category from '@/components/Category/index.vue'
import { GetAttrAPI, DeleteAttrAPI, OperateAttrAPI } from '@/api/product/attr'
import type { AttrResponseData, AttrValueList } from '@/api/product/attr/types'

/* 页面显示 */
const scene = ref(1)

/* 分类选择器 */
const categoryRef = ref<InstanceType<typeof Category>>()

/* 按钮 */
const C3Id = ref()

/* 输入框对象 */
const inputRefs = ref<Array<any>>([])

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

/* 添加/编辑属性表单 */
const attrForm = ref<AttrResponseData>({
  attrName: '',
  categoryId: '',
  categoryLevel: 3,
  attrValueList: [],
})

/* 添加属性 */
const addAttr = () => {
  scene.value = 0
  // 清空表单数据
  attrForm.value = {
    attrName: '',
    categoryId: categoryRef.value?.C3Id || '',
    categoryLevel: 3,
    attrValueList: [],
  }
  // 清空输入框引用数组
  inputRefs.value = []
}

/* 编辑属性 */
const editAttr = (row: AttrResponseData) => {
  scene.value = 0
  // 深拷贝数据，避免修改原数据
  attrForm.value = {
    ...row,
    attrValueList: row.attrValueList.map((item) => ({
      ...item, //展开原对象的所有属性
      flag: false, // 添加新属性 flag: false
    })),
  }
  // 清空输入框引用数组
  inputRefs.value = []
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

/* 添加属性值 */
const addAttrValue = () => {
  const newAttrValue: AttrValueList = {
    valueName: '', // 初始为空字符串
    flag: true, // 标记为编辑模式
  }
  // 属性值追加
  attrForm.value.attrValueList.push(newAttrValue)
  // 光标自动聚焦
  nextTick(() => {
    const lastIndex = attrForm.value.attrValueList.length - 1
    inputRefs.value[lastIndex]?.focus()
  })
}

/* 编辑属性值 */
const editAttrName = (row: AttrValueList, $index: number) => {
  row.flag = true
  nextTick(() => {
    inputRefs.value[$index]?.focus()
  })
}

/* 删除属性值 */
const deleteAttrValue = ($index: number) => {
  attrForm.value.attrValueList.splice($index, 1)
  // 同步删除引用
  inputRefs.value.splice($index, 1)
}

/* 光标失去焦点 */
const handleBlur = (row: AttrValueList, $index: number) => {
  const value = row.valueName?.trim() || ''
  // 验证空值
  if (!value) {
    ElMessage.error('属性值不能为空！')
    attrForm.value.attrValueList.splice($index, 1)
    return
  }

  // 验证重复值
  // 剔除最后一项与row对比（因为最后一项就是当前row）
  const valueNameRepeat = attrForm.value.attrValueList.find((item) => {
    if (item !== row) {
      return item.valueName === row.valueName
    }
  })
  // 如果有重复值，把重复值剔除，并提示信息
  if (valueNameRepeat) {
    attrForm.value.attrValueList.splice($index, 1)
    ElMessage.error('属性值不能重复!')
    return
  }
  // 验证通过
  row.flag = false
  row.valueName = value
}

/* 保存新增/修改 */
const saveAttr = async () => {
  // 属性名称重复验证
  if (!attrForm.value.id) {
    const attrNameRepeat = attrList.value.find((item) => item.attrName === attrForm.value.attrName)
    if (attrNameRepeat) {
      ElMessage.error('属性名称已存在！')
      attrForm.value.attrName = ''
      attrForm.value.attrValueList = []
      return
    }
  }
  try {
    await OperateAttrAPI(attrForm.value)
    ElMessage.success(attrForm.value.id ? '编辑成功!' : '添加成功！')
    scene.value = 1
    getAttr()
  } catch {
    ElMessage.error(attrForm.value.id ? '编辑失败!' : '添加失败！')
  }
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
            <template #default="{ row, $index }">
              <el-input
                v-if="row.flag"
                v-model="row.valueName"
                :ref="(el: any) => (inputRefs[$index] = el)"
                size="small"
                clearable
                @blur="handleBlur(row, $index)"
                @keyup.enter="handleBlur(row, $index)"
              />
              <div v-else @click="editAttrName(row, $index)">{{ row.valueName }}</div>
            </template>
          </el-table-column>

          <el-table-column label="属性值操作">
            <template #default="{ $index }">
              <el-button
                type="danger"
                size="small"
                icon="Delete"
                @click="deleteAttrValue($index)"
              />
            </template>
          </el-table-column>
        </el-table>

        <el-form-item style="margin-top: 10px">
          <el-button
            type="primary"
            size="default"
            :disabled="attrForm.attrValueList.length === 0"
            @click="saveAttr"
          >
            保存
          </el-button>
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
