const Router = require('koa-router')
const controllers = require('./controllers')
const router = new Router()

router.post('/login', controllers.login)
router.post('/user/addUser', controllers.addUser)
router.post('/user/updateUser', controllers.updateUser)
router.get('/user/getUserList', controllers.getUserList)
router.post('/user/deleteUser', controllers.deleteUser)

module.exports = router
