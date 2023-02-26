import { Login } from '@/_bak/api/interface'
import qs from 'qs'

// import http from '@/_bak/api'
import {postJson} from '@/api/http'

/**
 * @name 登录模块
 */
// * 用户登录接口
export const loginApi = (params: Login.ReqLoginForm) => {
  return postJson(`/api/user/login`, params)
}
