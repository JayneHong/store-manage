const DBInstance = require('../../mongodb')

/** 供应商 */
const supplier = {
  // 获取供应商列表
  getCustomerList: async (ctx) => {
    const { keyword } = ctx.request.query
    const res = await DBInstance.findDocuments(
      'customer',
      keyword ? { supplierName: { $regex: new RegExp(keyword) } } : {}
    )
    ctx.response.body = {
      data: res,
      code: 0,
      msg: '请求成功',
    }
  },

  // 添加供应商
  addCustomer: async (ctx) => {
    const res = await DBInstance.findDocuments('customer', ctx.request.body)
    if (res.length) {
      ctx.response.body = {
        data: null,
        code: 1,
        msg: '供应商已经存在',
      }
    } else {
      const temp = []
      temp.push(ctx.request.body)
      const res = await DBInstance.insertDocuments('customer', temp)
      ctx.response.body = {
        data: 'succeed',
        code: 0,
        msg: '添加成功',
      }
    }
  },

  // 更新供应商
  updateCustomer: async (ctx) => {
    const { id, ...reset } = ctx.request.body
    const { acknowledged } = await DBInstance.updateDocument(
      'customer',
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

  // 删除供应商
  deleteCustomer: async (ctx) => {
    const { id } = ctx.request.body

    const { acknowledged, deletedCount } = await DBInstance.removeDocument(
      'customer',
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

module.exports = supplier
