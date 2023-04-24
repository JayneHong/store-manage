const DBInstance = require('../../mongodb')

const goods = {
  // 获取商品列表
  getGoodsList: async (ctx) => {
    const { keyword } = ctx.request.query
    const res = await DBInstance.findDocuments(
      'goods',
      keyword ? { goodsName: { $regex: new RegExp(keyword) } } : {}
    )
    ctx.response.body = {
      data: res,
      code: 0,
      msg: '请求成功',
    }
  },

  // 添加商品
  addGoods: async (ctx) => {
    const res = await DBInstance.findDocuments('goods', ctx.request.body)
    if (res.length) {
      ctx.response.body = {
        data: null,
        code: 1,
        msg: '商品已经存在',
      }
    } else {
      const temp = []
      temp.push(ctx.request.body)
      const res = await DBInstance.insertDocuments('goods', temp)
      ctx.response.body = {
        data: 'succeed',
        code: 0,
        msg: '添加成功',
      }
    }
  },

  // 更新商品
  updateGoods: async (ctx) => {
    const { id, ...reset } = ctx.request.body
    const { acknowledged } = await DBInstance.updateDocument(
      'goods',
      { _id: DBInstance.getObjectId(id) },
      { ...reset }
    )
    if (acknowledged) {
      ctx.response.body = {
        data: 'succeed',
        code: 0,
        msg: '更新成功',
      }
    } else {
      ctx.response.body = {
        data: 'succeed',
        code: 1,
        msg: '更新失败',
      }
    }
  },

  // 删除商品
  deleteGoods: async (ctx) => {
    const { id } = ctx.request.body

    const { acknowledged, deletedCount } = await DBInstance.removeDocument(
      'goods',
      { _id: DBInstance.getObjectId(id) }
    )

    if (acknowledged) {
      ctx.response.body = {
        data: 'succeed',
        code: 0,
        msg: `成功删除${deletedCount}条数据`,
      }
    } else {
      ctx.response.body = {
        data: null,
        code: 1,
        msg: `删除失败`,
      }
    }
  },
}

module.exports = goods
