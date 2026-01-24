import request from '@/utils/request'
import type { GetCategoryResponseData, GetAttrResponseData, AttrResponseData } from './types'

const enum API {
  C1_URL = '/admin/product/getCategory1',
  C2_URL = '/admin/product/getCategory2/',
  C3_URL = '/admin/product/getCategory3/',
  GETATTR_URL = '/admin/product/attrInfoList/',
  DELETEATTR_URL = '/admin/product/deleteAttr/',
  OPERATEATTR_URL = '/admin/product/saveAttrInfo',
}

// 获取一级分类
export const GetCategory1API = () => request.get<any, GetCategoryResponseData>(API.C1_URL)

// 获取二级分类
export const GetCategory2API = (c1ID: string | number) =>
  request.get<any, GetCategoryResponseData>(API.C2_URL + c1ID)

// 获取三级分类
export const GetCategory3API = (c2ID: string | number) =>
  request.get<any, GetCategoryResponseData>(API.C3_URL + c2ID)

// 获取分类下已有的属性与属性值
export const GetAttrAPI = (c1ID: string | number, c2ID: string | number, c3ID: string | number) =>
  request.get<any, GetAttrResponseData>(API.GETATTR_URL + `${c1ID}/${c2ID}/${c3ID}`)

// 删除属性
export const DeleteAttrAPI = (attrId: number | string) =>
  request.delete<any, any>(API.DELETEATTR_URL + attrId)

// 新增/修改属性
export const OperateAttrAPI = (data: AttrResponseData) =>
  request.post<any, any>(API.OPERATEATTR_URL, data)
