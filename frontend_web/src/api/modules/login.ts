import { Login } from '@/api/interface/index'
import qs from 'qs'

import http from '@/api'

/**
 * @name 登录模块
 */
// * 用户登录接口
export const loginApi = (params: Login.ReqLoginForm) => {
  return http.post<Login.ResLogin>(`/login`, params)
}
