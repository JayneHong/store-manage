import http from '@/_bak/api'

/**
 * @name 供应商模块
 */
// * 获取供应商列表接口
export const getSupplierListApi = (params?: any) => {
  return http.get(`/supplier/getSupplierList`, params)
}

// * 添加供应商接口
export const addSupplierApi = (params: any) => {
  return http.post(`/supplier/addSupplier`, params)
}

// * 更新供应商接口
export const updateSupplierApi = (params: any) => {
  return http.post(`/supplier/updateSupplier`, params)
}

// * 删除供应商接口
export const deleteSupplierApi = (params: any) => {
  return http.post(`/supplier/deleteSupplier`, params)
}
