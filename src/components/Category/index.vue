<script lang="ts" setup name="Category">
import { onMounted, ref } from 'vue'
import { GetCategory1API, GetCategory2API, GetCategory3API } from '@/api/product/attr'
import type { CategoryResponseData } from '@/api/product/attr/types'

const props = defineProps({
  scene: Number,
})

/* 获取一级分类 */
const C1List = ref<CategoryResponseData[]>([])
const C1Id = ref()
const getCategory1 = async () => {
  const res = await GetCategory1API()
  C1List.value = res.data
}

/* 获取二级分类 */
const C2List = ref<CategoryResponseData[]>([])
const C2Id = ref()
const getCategory2 = async () => {
  const res = await GetCategory2API(C1Id.value)
  C2List.value = res.data
}

/* 获取三级分类 */
const C3List = ref<CategoryResponseData[]>([])
const C3Id = ref()
const getCategory3 = async () => {
  const res = await GetCategory3API(C2Id.value)
  C3List.value = res.data
}

/* 一级分类发生变化 */
const handleC1Change = () => {
  C2Id.value = ''
  C3Id.value = ''
  C2List.value = []
  C3List.value = []
  getCategory2()
}

/* 二级分类发生变化 */
const handleC2Change = () => {
  C3Id.value = ''
  C3List.value = []
  getCategory3()
}

onMounted(() => {
  getCategory1()
})

defineExpose({
  C1Id,
  C2Id,
  C3Id,
})
</script>

<template>
  <el-card>
    <el-form label-width="80px" :inline="true" style="display: flex; align-items: center">
      <el-form-item label="一级分类">
        <el-select
          v-model="C1Id"
          clearable
          :disabled="props.scene === 0"
          placeholder="请选择"
          style="width: 220px"
          @change="handleC1Change()"
        >
          <el-option v-for="C1 in C1List" :key="C1.id" :label="C1.name" :value="C1.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select
          v-model="C2Id"
          clearable
          :disabled="props.scene === 0"
          placeholder="请选择"
          style="width: 220px"
          @change="handleC2Change()"
        >
          <el-option v-for="C2 in C2List" :key="C2.id" :label="C2.name" :value="C2.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select
          v-model="C3Id"
          clearable
          :disabled="props.scene === 0"
          placeholder="请选择"
          style="width: 220px"
        >
          <el-option v-for="C3 in C3List" :key="C3.id" :label="C3.name" :value="C3.id" />
        </el-select>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<style lang="scss" scoped>
:deep(.el-form-item) {
  display: flex;
  align-items: center;
  height: 50px;
  margin-bottom: 0;
}
</style>
