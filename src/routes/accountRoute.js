var express = require('express')
var router = express.Router()
var AccountController = require('../app/controllers/AccountController')


/* -----------Cart -------------- */
router.patch('/cart/delete',AccountController.deleteFromCart)
router.post('/addToCart',AccountController.checkItemExistCart,AccountController.addToCart)
router.get('/cart',AccountController.checkCartEmpty,AccountController.showCart)



/* -----------Store -------------- */

router.patch('/store/delete',AccountController.editItemStore)
router.post('/store',AccountController.addItemStore)
router.get('/store',AccountController.checkStoreEmpty,AccountController.showStore)




/* -----------Register -------------- */

router.post('/register', AccountController.register)
router.get('/register',AccountController.showRegister)





/* -----------Login -------------- */

router.get('/loginFailed',AccountController.loginFailed)
router.get('/loginSuccess',AccountController.loginSuccess)
router.post('/login/check', AccountController.loginCheck)
router.get('/login', AccountController.login)


module.exports = router