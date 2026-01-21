/* 品牌相关API的数据类型 */

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

/* 获取分类下已有的属性与属性值 */
// data里attrValueList（属性值）字段
export interface AttrValueList {
  id?: number | string
  valueName: string
  attrId?: number
  flag?: boolean
}

// 返回的数据里data字段
export interface AttrResponseData {
  id?: number | string
  attrName: string
  categoryId: number | string
  categoryLevel: number
  attrValueList: AttrValueList[]
}
// 返回的数据
export interface GetAttrResponseData extends ResponseData {
  data: AttrResponseData[]
}
