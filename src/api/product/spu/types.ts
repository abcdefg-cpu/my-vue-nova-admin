/* SPU相关API的数据类型 */

/** 公共数据 */
export interface ResponseData {
  code: number
  message: string
  ok: boolean
}

/* 获取SPU */
// data 里 records 字段
export interface SpuRecords {
  id?: number | string
  category3Id: number | string
  spuName: string
  tmId: string | number
  description: string
  spuImageList?: null | SpuImageResponseData[]
  spuSaleAttrList?: null | SpuSaleAttrResponseData[]
}

// 返回的数据里data字段
export interface SpuResponseData {
  records: SpuRecords[]
  total: number
  size: number
  current: number
  searchCount: boolean
  pages: number
}

// 返回的数据
export interface GetSpuResponseData extends ResponseData {
  data: SpuResponseData
}

// 返回的数据里data字段
export interface TrademarkResponseData {
  id: string | number
  tmName: string
  logoUrl: string
}

// 返回的数据
export interface GetTrademarkResponseData extends ResponseData {
  data: TrademarkResponseData[]
}

/** 获取图片 */
// 返回的数据里data字段
export interface SpuImageResponseData {
  id?: string | number
  createTime?: string
  updateTime?: string
  imgName?: string
  imgUrl?: string
  spuId?: string
  name?: string
  url?: string
}

// 返回的数据
export interface GetSpuImageResponseData extends ResponseData {
  data: SpuImageResponseData[]
}

/* 获取全部销售属性 */
// 返回的数据里data字段
export interface AllSaleAttrResponseData {
  id: string | number
  name: string
}

// 返回的数据
export interface GetAllSaleAttrResponseData extends ResponseData {
  data: AllSaleAttrResponseData[]
}

/* 获取已有销售属性 */
// data里面spuSaleAttrValueList(销售属性值)字段
export interface SpuSaleAttrValueList {
  id?: string | number
  createTime?: string
  updateTime?: string
  spuId?: string
  baseSaleAttrId: string | number
  saleAttrValueName: string
  saleAttrName?: string
  isChecked?: any
}

// 返回的数据里data字段
export interface SpuSaleAttrResponseData {
  id?: string | number
  createTime?: string
  updateTime?: string
  spuId?: string
  baseSaleAttrId: string | number
  saleAttrName: string
  spuSaleAttrValueList: SpuSaleAttrValueList[]
  flag?: boolean
  valueName?: string
}

// 返回的数据
export interface GetSpuSaleAttrResponseData extends ResponseData {
  data: SpuSaleAttrResponseData[]
}
