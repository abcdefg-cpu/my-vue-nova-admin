/* 分类选择器相关API的数据类型 */

/** 公共数据 */
export interface ResponseData {
  code: number
  message: string
  ok: boolean
}

/** 获取分类 */
// 返回的数据里data字段
export interface CategoryResponseData {
  id: number | string
  name: string
  category1Id?: number
  category2Id?: number
}

// 返回的数据
export interface GetCategoryResponseData extends ResponseData {
  data: CategoryResponseData[]
}
