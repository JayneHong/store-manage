const DBInstance = require('./mongodb')

const controllers = {
  // 登录接口
  login: async (ctx) => {
    const res = await DBInstance.findDocuments('user', ctx.request.body)
    if (res.length === 0) {
      ctx.response.body = {
        data: null,
        code: 1,
        msg: '账号、密码验证失败！',
      }
    } else {
      ctx.response.body = {
        data: 'succeed',
        code: 0,
        msg: '请求成功',
      }
    }
  },

  // 获取用户列表
  getUserList: async (ctx) => {
    const { keyword } = ctx.request.query
    const res = await DBInstance.findDocuments(
      'user',
      keyword ? { username: keyword } : {}
    )
    ctx.response.body = {
      data: res,
      code: 0,
      msg: '请求成功',
    }
  },

  // 添加用户
  addUser: async (ctx) => {
    const { username, password } = ctx.request.body
    if (!username || !password) {
      ctx.response.body = {
        data: null,
        code: -1,
        msg: '参数错误',
      }
      return
    }
    const res = await DBInstance.findDocuments('user', ctx.request.body)
    if (res.length) {
      ctx.response.body = {
        data: null,
        code: 1,
        msg: '用户已经存在',
      }
    } else {
      const temp = []
      temp.push(ctx.request.body)
      const res = await DBInstance.insertDocuments('user', temp)
      ctx.response.body = {
        data: 'succeed',
        code: 0,
        msg: '添加成功',
      }
    }
  },

  // 更新用户
  updateUser: async (ctx) => {
    const { username, password, id, ...reset } = ctx.request.body
    if (!username || !password) {
      ctx.response.body = {
        data: null,
        code: -1,
        msg: '参数错误',
      }
      return
    }

    const { acknowledged } = await DBInstance.updateDocument(
      'user',
      { _id: DBInstance.getObjectId(id) },
      { username, password, ...reset }
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

  // 删除用户
  deleteUser: async (ctx) => {
    const { username } = ctx.request.body
    if (!username) {
      ctx.response.body = {
        data: null,
        code: -1,
        msg: '参数错误',
      }
      return
    }

    const { acknowledged, deletedCount } = await DBInstance.removeDocument(
      'user',
      { username }
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

module.exports = controllers
