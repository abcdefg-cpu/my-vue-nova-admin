import request from '@/utils/request'
import type { GetTrademarkResponseData, TrademarkRecords } from './types'

const enum API {
  GETTRADEMARK_URL = '/admin/product/baseTrademark',
  ADDTRADEMARK_URL = '/admin/product/baseTrademark/save',
  UPDATETRADEMARK_URL = '/admin/product/baseTrademark/update',
  DELETETRADEMARK_URL = '/admin/product/baseTrademark/remove',
}

// 获取已有品牌
export const GetTrademarkAPI = (page = 1, limit = 4) =>
  request.get<any, GetTrademarkResponseData>(API.GETTRADEMARK_URL + `/${page}/${limit}`)

// 新增/编辑品牌
export const OperateTrademarkAPI = (data: TrademarkRecords) => {
  if (data.id) {
    return request.put<any, any>(API.UPDATETRADEMARK_URL, data)
  } else {
    return request.post<any, any>(API.ADDTRADEMARK_URL, data)
  }
}

// 删除品牌
export const DeleteTrademarkAPI = (id: string | number) =>
  request.delete<any, any>(API.DELETETRADEMARK_URL + `/${id}`)
