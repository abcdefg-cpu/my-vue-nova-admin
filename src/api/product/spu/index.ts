import request from '@/utils/request'
import type {
  GetAllSaleAttrResponseData,
  GetSpuImageResponseData,
  GetSpuResponseData,
  GetSpuSaleAttrResponseData,
  GetTrademarkResponseData,
  SpuRecords,
} from './types'

const enum API {
  GETSPU_URL = '/admin/product',
  DELETESPU_URL = '/admin/product/deleteSpu/',
  ADDSPU_URL = '/admin/product/saveSpuInfo',
  UPDATESPU_URL = '/admin/product/updateSpuInfo',
  GETTM_URL = '/admin/product/baseTrademark/getTrademarkList',
  GETIMG_URL = '/admin/product/spuImageList/',
  GETALLSALEATTR_URL = '/admin/product/baseSaleAttrList',
  GETSALEATTR_URL = '/admin/product/spuSaleAttrList/',
}

// 获取SPU
export const GetSpuAPI = (page = 1, limit = 4, C3Id: number | string) =>
  request.get<any, GetSpuResponseData>(API.GETSPU_URL + `/${page}/${limit}?category3Id=${C3Id}`)

// 删除SPU
export const DeleteSpuAPI = (attrId: number | string) =>
  request.delete<any, any>(API.DELETESPU_URL + attrId)

// 获取品牌
export const GetSpuTradeMarkAPI = () => request.get<any, GetTrademarkResponseData>(API.GETTM_URL)

// 获取图片
export const GetSpuImgAPI = (id: string | number) =>
  request.get<any, GetSpuImageResponseData>(API.GETIMG_URL + id)

// 获取全部销售属性
export const GetAllSaleAttrAPI = () =>
  request.get<any, GetAllSaleAttrResponseData>(API.GETALLSALEATTR_URL)

// 获取已有销售属性
export const GetSpuSaleAttrAPI = (id: string | number) =>
  request.get<any, GetSpuSaleAttrResponseData>(API.GETSALEATTR_URL + id)

// 新增/编辑SPU
export const OperateSpuAPI = (data: SpuRecords) => {
  if (data.id) {
    return request.post<any, any>(API.UPDATESPU_URL, data)
  } else {
    return request.post<any, any>(API.ADDSPU_URL, data)
  }
}
