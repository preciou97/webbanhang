var express = require('express')
var router = express.Router()

var AccountController = require('../app/controllers/AccountController')

router.patch('/store/delete',AccountController.editItem)
router.get('/loginFailed',AccountController.loginFailed)
router.get('/loginSuccess',AccountController.loginSuccess)
router.post('/store',AccountController.addItem)
router.get('/store',AccountController.checkToken,AccountController.store)
router.post('/register', AccountController.register)
router.get('/register',AccountController.showRegister)
router.post('/login/check', AccountController.loginCheck)
router.get('/login', AccountController.login)


module.exports = router