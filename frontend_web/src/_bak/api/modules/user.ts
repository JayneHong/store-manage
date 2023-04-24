import http from '@/_bak/api'

/**
 * @name 用户模块
 */
// * 获取用户列表接口
export const getUserListApi = (params?: any) => {
  return http.get(`/user/getUserList`, params)
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

// * 获取角色列表
export const getRoleListApi = (params?: any) => {
  return http.get(`/user/getRoleList`, params)
}

// * 添加角色
export const addRoleApi = (params: any) => {
  return http.post(`/user/addRole`, params)
}

// * 更新角色
export const updateRoleApi = (params: any) => {
  return http.post(`/user/updateRole`, params)
}

// * 删除角色
export const deleteRoleApi = (params: any) => {
  return http.post(`/user/deleteRole`, params)
}
