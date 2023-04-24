import http from '@/_bak/api'

/**
 * @name 商品分类模块
 */
// * 获取商品分类列表接口
export const getGoodsClassifiedListApi = (params?: any) => {
  return http.get(`/goodsClassified/getGoodsClassifiedList`, params)
}

// * 添加商品分类接口
export const addGoodsClassifiedApi = (params: any) => {
  return http.post(`/goodsClassified/addGoodsClassified`, params)
}

// * 更新商品分类接口
export const updateGoodsClassifiedApi = (params: any) => {
  return http.post(`/goodsClassified/updateGoodsClassified`, params)
}

// * 删除商品分类接口
export const deleteGoodsClassifiedApi = (params: any) => {
  return http.post(`/goodsClassified/deleteGoodsClassified`, params)
}
