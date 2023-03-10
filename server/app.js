const Koa = require('koa')
const router = require('./router')
const bodyparser = require('koa-bodyparser')

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

app.use(async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', '*')
  ctx.set('Access-Control-Allow-Headers', 'Content-Type')
  ctx.set('Access-Control-Allow-Methods', 'OPTIONS, GET, PUT, POST, DELETE')
  await next()
})

app.use(bodyparser())

app.use(router.routes(), router.allowedMethods())

app.listen(8888, () => console.log('服务启动成功，监听8888端口'))
