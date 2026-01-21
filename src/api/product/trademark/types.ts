/* 品牌相关API的数据类型 */

/** 公共数据 */
export interface ResponseData {
  code: number
  message: string
  ok: boolean
}

/** 获取已有品牌 */
// data里records字段
export interface TrademarkRecords {
  id?: string | number
  tmName: string
  logoUrl: string
  createTime?: string
  updateTime?: string
}

// 返回的数据里data字段
export interface TrademarkResponseData {
  records: TrademarkRecords[]
  total: number
  size: number
  current: number
  searchCount: boolean
  pages: number
}

// 返回的数据
export interface GetTrademarkResponseData extends ResponseData {
  data: TrademarkResponseData
}
