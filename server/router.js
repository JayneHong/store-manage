const Router = require('koa-router')
const {
  user,
  goods,
  supplier,
  customer,
  goodsClassified,
} = require('./controllers/controllers')
const router = new Router()

router.post('/login', user.login)
router.post('/updatePassword', user.updatePassword)
router.post('/user/addUser', user.addUser)
router.post('/user/updateUser', user.updateUser)
router.get('/user/getUserList', user.getUserList)
router.post('/user/deleteUser', user.deleteUser)

router.get('/user/getRoleList', user.getRoleList)
router.post('/user/addRole', user.addRole)
router.post('/user/updateRole', user.updateRole)
router.post('/user/deleteRole', user.deleteRole)

router.post('/goods/addGoods', goods.addGoods)
router.post('/goods/updateGoods', goods.updateGoods)
router.get('/goods/getGoodsList', goods.getGoodsList)
router.post('/goods/deleteGoods', goods.deleteGoods)

router.post(
  '/goodsClassified/addGoodsClassified',
  goodsClassified.addGoodsClassified
)
router.post(
  '/goodsClassified/updateGoodsClassified',
  goodsClassified.updateGoodsClassified
)
router.get(
  '/goodsClassified/getGoodsClassifiedList',
  goodsClassified.getGoodsClassifiedList
)
router.post(
  '/goodsClassified/deleteGoodsClassified',
  goodsClassified.deleteGoodsClassified
)

router.post('/supplier/addSupplier', supplier.addSuppliers)
router.post('/supplier/updateSupplier', supplier.updateSuppliers)
router.get('/supplier/getSupplierList', supplier.getSuppliersList)
router.post('/supplier/deleteSupplier', supplier.deleteSuppliers)

router.post('/customer/addCustomer', customer.addCustomer)
router.post('/customer/updateCustomer', customer.updateCustomer)
router.get('/customer/getCustomerList', customer.getCustomerList)
router.post('/customer/deleteCustomer', customer.deleteCustomer)

module.exports = router
