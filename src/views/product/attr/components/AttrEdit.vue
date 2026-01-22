<script lang="ts" setup name="AttrEdit">
import { ref, nextTick, watch } from 'vue'
import { ElMessage } from 'element-plus'
import { OperateAttrAPI } from '@/api/product/attr'
import type { AttrResponseData, AttrValueList } from '@/api/product/attr/types'

const props = defineProps<{
  scene: number
  attrList: AttrResponseData[]
  formData?: AttrResponseData
}>()

const emit = defineEmits<{
  'update:scene': [value: number]
  'save-success': []
}>()

/* 输入框对象 */
const inputRefs = ref<Array<any>>([])
/* 添加/编辑属性表单 */
const attrForm = ref<AttrResponseData>({
  attrName: '',
  categoryId: '',
  categoryLevel: 3,
  attrValueList: [],
})

/* 监听父组件传递的表单数据 */
watch(
  () => props.formData,
  (newData) => {
    if (newData) {
      // 深拷贝并初始化 flag
      attrForm.value = {
        ...newData,
        attrValueList: newData.attrValueList.map((item) => ({
          ...item,
          flag: item.flag || false,
        })),
      }
      inputRefs.value = []
    }
  },
  { immediate: true },
)

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
  // index !== $index：排除自己
  // item.valueName === row.valueName：是否有重复
  const valueNameRepeat = attrForm.value.attrValueList.find((item, index) => {
    return index !== $index && item.valueName === row.valueName
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
    // 新增时：检查是否与列表中任何属性重名
    const attrNameRepeat = props.attrList.find((item) => item.attrName === attrForm.value.attrName)
    if (attrNameRepeat) {
      ElMessage.error('属性名称已存在！')
      return
    }
  } else {
    // 编辑时：检查是否与其他属性重名（排除自己）
    const attrNameRepeat = props.attrList.find(
      (item) => item.attrName === attrForm.value.attrName && item.id !== attrForm.value.id,
    )
    if (attrNameRepeat) {
      ElMessage.error('属性名称已存在！')
      return
    }
  }
  try {
    await OperateAttrAPI(attrForm.value)
    ElMessage.success(attrForm.value.id ? '编辑成功!' : '添加成功！')
    emit('update:scene', 1)
    emit('save-success')
  } catch (error) {
    console.log(error)
    ElMessage.error(attrForm.value.id ? '编辑失败!' : '添加失败！')
  }
}
</script>

<template>
  <!-- 添加/编辑属性的页面 -->
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
      <el-button @click="emit('update:scene', 1)">取消</el-button>
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
          <el-button type="danger" size="small" icon="Delete" @click="deleteAttrValue($index)" />
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
      <el-button size="default" @click="emit('update:scene', 1)">取消</el-button>
    </el-form-item>
  </el-form>
</template>
