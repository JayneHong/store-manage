const Router = require('koa-router')
const controllers = require('./controllers')
const router = new Router()

router.post('/login', controllers.login)
router.post('/user/addUser', controllers.addUser)
router.get('/user/getUserList', controllers.getUserList)

module.exports = router
