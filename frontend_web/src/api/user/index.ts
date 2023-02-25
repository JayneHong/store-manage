import {Login} from '@/_bak/api/interface'

import {postJson} from '@/api/http'

/**
 * 用户登录接口
 */
export const apiUserLogin = (params: Login.ReqLoginForm) => {
    return postJson(`/api/user/login`, params)
}
