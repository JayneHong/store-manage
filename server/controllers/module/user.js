const DBInstance = require('../../mongodb')
const { getCurrentDate, JWT_SECRET } = require('../../utils.js')
const jwt = require('jsonwebtoken')

const user = {
  // 登录接口
  login: async (ctx) => {
    // 获取用户名和密码
    const { username, password } = ctx.request.body
    const res = await DBInstance.findDocuments('user', { username, password })
    if (res.length === 0) {
      ctx.response.body = {
        data: null,
        code: 1,
        msg: '账号、密码验证失败！',
      }
    } else {
      // Create token
      const token = jwt.sign({ username, password }, JWT_SECRET, {
        expiresIn: '1h',
      })
      // Set cookie with token
      ctx.cookies.set('token', token, { httpOnly: true, maxAge: 3600000 })
      // 返回body
      ctx.response.body = {
        data: 'succeed',
        code: 0,
        msg: '请求成功',
      }
    }
  },

  updatePassword: async (ctx) => {
    const { username, phoneNumber, confirmPassword, newPassword } =
      ctx.request.body
    if (!username || !phoneNumber || !confirmPassword || !newPassword) {
      ctx.response.body = {
        data: null,
        code: -1,
        msg: '参数错误',
      }
      return
    }

    const res = await DBInstance.findDocuments('user', {
      username,
      phoneNumber,
    })
    if (res.length === 0) {
      ctx.response.body = {
        data: res,
        code: 1,
        msg: '用户不存在!',
      }
      return
    }

    const { acknowledged } = await DBInstance.updateDocument(
      'user',
      { username, phoneNumber },
      { username, password: confirmPassword }
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

  // 获取用户列表
  getUserList: async (ctx) => {
    const { keyword } = ctx.request.query
    const res = await DBInstance.findDocuments(
      'user',
      keyword ? { username: { $regex: new RegExp(keyword) } } : {}
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
      temp.push({ ...ctx.request.body, createdDate: getCurrentDate() })
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
      { username, password, updatedDate: getCurrentDate(), ...reset }
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

  // 获取角色列表
  getRoleList: async (ctx) => {
    const { keyword } = ctx.request.query
    const res = await DBInstance.findDocuments(
      'role',
      keyword ? { roleName: { $regex: new RegExp(keyword) } } : {}
    )
    ctx.response.body = {
      data: res,
      code: 0,
      msg: '请求成功',
    }
  },

  // 添加角色
  addRole: async (ctx) => {
    const { roleName, roleCode, description = '' } = ctx.request.body
    if (!roleName || !roleCode) {
      ctx.response.body = {
        data: null,
        code: -1,
        msg: '参数错误',
      }
      return
    }

    const res = await DBInstance.findDocuments('role', { roleCode })
    if (res.length) {
      ctx.response.body = {
        data: null,
        code: 1,
        msg: '角色编码已经存在',
      }
    } else {
      const temp = []
      temp.push({ ...ctx.request.body, createdDate: getCurrentDate() })
      const res = await DBInstance.insertDocuments('role', temp)
      ctx.response.body = {
        data: 'succeed',
        code: 0,
        msg: '添加成功',
      }
    }
  },

  // 更新角色
  updateRole: async (ctx) => {
    const { roleName, roleCode, id, ...reset } = ctx.request.body
    if (!roleName || !roleCode) {
      ctx.response.body = {
        data: null,
        code: -1,
        msg: '参数错误',
      }
      return
    }

    const res = await DBInstance.findDocuments('role', { roleCode })
    if (res.filter((item) => item['_id'].toString() === id)?.length > 1) {
      ctx.response.body = {
        data: null,
        code: 1,
        msg: '角色编码已经存在！',
      }
    } else {
      const { acknowledged } = await DBInstance.updateDocument(
        'role',
        { _id: DBInstance.getObjectId(id) },
        { roleName, roleCode, updatedDate: getCurrentDate(), ...reset }
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
  // 删除角色
  deleteRole: async (ctx) => {
    const { roleName, roleCode } = ctx.request.body
    if (!roleName || !roleCode) {
      ctx.response.body = {
        data: null,
        code: -1,
        msg: '参数错误',
      }
      return
    }

    const { acknowledged, deletedCount } = await DBInstance.removeDocument(
      'role',
      { roleName, roleCode }
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

module.exports = user
