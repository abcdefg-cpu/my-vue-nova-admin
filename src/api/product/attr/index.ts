import request from '@/utils/request'
import type { GetCategoryResponseData } from './types'

const enum API {
  C1_URL = '/admin/product/getCategory1',
  C2_URL = '/admin/product/getCategory2/',
  C3_URL = '/admin/product/getCategory3/',
}

// 获取一级分类
export const GetCategory1API = () => request.get<any, GetCategoryResponseData>(API.C1_URL)

// 获取二级分类
export const GetCategory2API = (c1ID: string | number) =>
  request.get<any, GetCategoryResponseData>(API.C2_URL + c1ID)

// 获取三级分类
export const GetCategory3API = (c2ID: string | number) =>
  request.get<any, GetCategoryResponseData>(API.C3_URL + c2ID)
