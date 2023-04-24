const DBInstance = require('../../mongodb')
const { getCurrentDate } = require('../../utils.js')

const goodsClassified = {
  // 获取商品分类列表
  getGoodsClassifiedList: async (ctx) => {
    const { keyword } = ctx.request.query
    const res = await DBInstance.findDocuments(
      'goodsClassified',
      keyword ? { claasifiedName: { $regex: new RegExp(keyword) } } : {}
    )
    ctx.response.body = {
      data: res,
      code: 0,
      msg: '请求成功',
    }
  },

  // 添加商品分类
  addGoodsClassified: async (ctx) => {
    const res = await DBInstance.findDocuments(
      'goodsClassified',
      ctx.request.body
    )
    if (res.length) {
      ctx.response.body = {
        data: null,
        code: 1,
        msg: '商品分类已经存在',
      }
    } else {
      const temp = []
      temp.push({ ...ctx.request.body, createdDate: getCurrentDate() })
      const res = await DBInstance.insertDocuments('goodsClassified', temp)
      ctx.response.body = {
        data: 'succeed',
        code: 0,
        msg: '添加成功',
      }
    }
  },

  // 更新商品分类
  updateGoodsClassified: async (ctx) => {
    const { claasifiedName, claasifiedCode, id, ...reset } = ctx.request.body
    if (!claasifiedName || !claasifiedCode) {
      ctx.response.body = {
        data: null,
        code: -1,
        msg: '参数错误',
      }
      return
    }

    const res = await DBInstance.findDocuments('goodsClassified', {
      claasifiedCode,
    })
    console.log('====================================')
    console.log('res', reset, getCurrentDate())
    console.log('====================================')
    if (res.filter((item) => item['_id'].toString() === id)?.length > 1) {
      ctx.response.body = {
        data: null,
        code: 1,
        msg: '分类编码已经存在！',
      }
    } else {
      const { acknowledged } = await DBInstance.updateDocument(
        'goodsClassified',
        { _id: DBInstance.getObjectId(id) },
        {
          claasifiedName,
          claasifiedCode,
          updatedDate: getCurrentDate(),
          ...reset,
        }
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
    }
  },

  // 删除商品分类
  deleteGoodsClassified: async (ctx) => {
    const { id } = ctx.request.body

    const { acknowledged, deletedCount } = await DBInstance.removeDocument(
      'goodsClassified',
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

module.exports = goodsClassified
