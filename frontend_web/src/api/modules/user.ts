import { Login } from '@/api/interface/index'
import qs from 'qs'

import http from '@/api'

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
