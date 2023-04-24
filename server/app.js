const Koa = require('koa')
const router = require('./router')
const bodyparser = require('koa-bodyparser')
const jwt = require('jsonwebtoken')

const app = new Koa()

// 最外层捕获错误
app.use(async (ctx, next) => {
  try {
    await next()
  } catch (error) {
    // ctx.response.status = 500
    // ctx.response.body = '服务器内部错误'
    ctx.throw(500)
  }
})

const auth = async (ctx, next) => {
  const authorization = ctx.headers.authorization

  if (!authorization) {
    ctx.status = 401
    ctx.body = { error: 'No token provided' }
    return
  }

  try {
    const token = authorization.split(' ')[1]
    const decoded = jwt.verify(token, 'secret')
    ctx.user = { id: decoded.id }
  } catch (error) {
    ctx.status = 401
    ctx.body = { error: 'Invalid token' }
    return
  }

  await next()
}

// 访问需要认证的路由
router.get('/protected', auth, async (ctx) => {
  ctx.body = { message: 'Protected resource' }
})

app.use(async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', '*')
  ctx.set('Access-Control-Allow-Headers', 'Content-Type')
  ctx.set('Access-Control-Allow-Methods', 'OPTIONS, GET, PUT, POST, DELETE')
  await next()
})

app.use(bodyparser())

app.use(router.routes(), router.allowedMethods())

// 监听端口
app.listen(8888, () => console.log('服务启动成功，监听8888端口'))
