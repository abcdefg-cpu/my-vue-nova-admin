import request from '@/utils/request'
import type { GetAttrResponseData, AttrResponseData } from './types'

const enum API {
  GETATTR_URL = '/admin/product/attrInfoList/',
  DELETEATTR_URL = '/admin/product/deleteAttr/',
  OPERATEATTR_URL = '/admin/product/saveAttrInfo',
}

// 获取分类下已有的属性与属性值
export const GetAttrAPI = (c1ID: string | number, c2ID: string | number, c3ID: string | number) =>
  request.get<any, GetAttrResponseData>(API.GETATTR_URL + `${c1ID}/${c2ID}/${c3ID}`)

// 删除属性
export const DeleteAttrAPI = (attrId: number | string) =>
  request.delete<any, any>(API.DELETEATTR_URL + attrId)

// 新增/修改属性
export const OperateAttrAPI = (data: AttrResponseData) =>
  request.post<any, any>(API.OPERATEATTR_URL, data)
