<script lang="ts" setup name="Pagination">
import { ref } from 'vue'

const props = defineProps<{
  total: number
  getData?: () => Promise<void>
}>()

// 当前页
const currentPage = ref(1)
// 一页显示条数
const pageSize = ref(4)

// 数据条数变化
const handleSizeChange = async () => {
  currentPage.value = 1
  if (props.getData) {
    await props.getData()
  }
}

// 当前页数变化
const handleCurrentChange = async () => {
  if (props.getData) {
    await props.getData()
  }
}

defineExpose({
  currentPage,
  pageSize,
})
</script>

<template>
  <el-pagination
    v-model:current-page="currentPage"
    v-model:page-size="pageSize"
    :page-sizes="[2, 4, 6, 8, 10]"
    size="default"
    :background="true"
    style="margin-top: 10px"
    layout=" prev, pager, next, jumper,->, sizes,total"
    :total="props.total"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  />
</template>

<style lang="scss" scoped></style>
