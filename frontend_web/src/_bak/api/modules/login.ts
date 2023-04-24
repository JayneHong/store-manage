import { Login } from '@/_bak/api/interface'
import qs from 'qs'

import http from '@/_bak/api'

/**
 * @name 登录模块
 */
// * 用户登录接口
export const loginApi = (params: Login.ReqLoginForm) => {
  return http.post<Login.ResLogin>(`/login`, params)
}

// * 用户登录接口
export const updatePassword= (params: Login.RetrievePassword) => {
  return http.post<Login.ResLogin>(`/updatePassword`, params)
}
