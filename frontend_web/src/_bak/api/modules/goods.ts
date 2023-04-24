import http from '@/_bak/api'

/**
 * @name 商品模块
 */
// * 获取商品列表接口
export const getGoodsListApi = (params?: any) => {
  return http.get(`/goods/getGoodsList`, params)
}

// * 添加商品接口
export const addGoodsApi = (params: any) => {
  return http.post(`/goods/addGoods`, params)
}

// * 更新商品接口
export const updateGoodsApi = (params: any) => {
  return http.post(`/goods/updateGoods`, params)
}

// * 删除商品接口
export const deleteGoodsApi = (params: any) => {
  return http.post(`/goods/deleteGoods`, params)
}
