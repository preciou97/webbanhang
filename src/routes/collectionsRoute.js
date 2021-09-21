var express = require('express')
var router = express.Router()
var CollectionsController = require('../app/controllers/CollectionsController')


router.get('/cart-empty',CollectionsController.cartEmpty)

router.get('/product/:id',CollectionsController.product)
router.get('/blog', CollectionsController.blog)
router.get('/new-models', CollectionsController.newModels)
router.get('/pre-order', CollectionsController.preOrder)
router.get('/smu', CollectionsController.smu)
router.get('/', CollectionsController.showBrand)


module.exports = router

