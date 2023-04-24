import http from '@/_bak/api'

/**
 * @name 客户模块
 */
// * 获取客户列表接口
export const getCustomerListApi = (params?: any) => {
  return http.get(`/customer/getCustomerList`, params)
}

// * 添加客户接口
export const addCustomerApi = (params: any) => {
  return http.post(`/customer/addCustomer`, params)
}

// * 更新客户接口
export const updateCustomerApi = (params: any) => {
  return http.post(`/customer/updateCustomer`, params)
}

// * 删除客户接口
export const deleteCustomerApi = (params: any) => {
  return http.post(`/customer/deleteCustomer`, params)
}
