import { Login } from '@/_bak/api/interface'
import qs from 'qs'

import http from '@/_bak/api'

/**
 * @name 用户模块
 */
// * 获取用户列表接口
export const getUserListApi = () => {
  return http.get(`/user/getUserList`, {})
}

// * 获取用户列表接口
export const addUser = (params: any) => {
  return http.post(`/user/addUser`, params)
}
