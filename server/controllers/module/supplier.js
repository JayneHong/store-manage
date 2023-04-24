const DBInstance = require('../../mongodb')

/** 供应商 */
const supplier = {
  // 获取供应商列表
  getSuppliersList: async (ctx) => {
    const { keyword } = ctx.request.query
    const res = await DBInstance.findDocuments(
      'supplier',
      keyword ? { supplierName: { $regex: new RegExp(keyword) } } : {}
    )
    ctx.response.body = {
      data: res,
      code: 0,
      msg: '请求成功',
    }
  },

  // 添加供应商
  addSuppliers: async (ctx) => {
    const res = await DBInstance.findDocuments('supplier', ctx.request.body)
    if (res.length) {
      ctx.response.body = {
        data: null,
        code: 1,
        msg: '供应商已经存在',
      }
    } else {
      const temp = []
      temp.push(ctx.request.body)
      const res = await DBInstance.insertDocuments('supplier', temp)
      ctx.response.body = {
        data: 'succeed',
        code: 0,
        msg: '添加成功',
      }
    }
  },

  // 更新供应商
  updateSuppliers: async (ctx) => {
    const { id, ...reset } = ctx.request.body
    const { acknowledged } = await DBInstance.updateDocument(
      'supplier',
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
  deleteSuppliers: async (ctx) => {
    const { id } = ctx.request.body

    const { acknowledged, deletedCount } = await DBInstance.removeDocument(
      'supplier',
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
