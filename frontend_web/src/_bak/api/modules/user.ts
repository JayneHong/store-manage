import { Login } from '@/_bak/api/interface'
import qs from 'qs'

import http from '@/_bak/api'
import {get} from '@/api/http'

/**
 * @name 用户模块
 */
// * 获取用户列表接口
export const getUserListApi = (params?: any) => {
  return get(`/api/user/list`, params)
}

// * 添加用户接口
export const addUserApi = (params: any) => {
  return http.post(`/user/addUser`, params)
}

// * 更新用户接口
export const updateUserApi = (params: any) => {
  return http.post(`/user/updateUser`, params)
}

// * 删除用户接口
export const deleteUserApi = (params: any) => {
  return http.post(`/user/deleteUser`, params)
}
