var express = require('express')
var router = express.Router()
var CollectionsController = require('../app/controllers/CollectionsController')


router.get('/cart-empty',CollectionsController.cartEmpty)

router.get('/product/:id',CollectionsController.product)
router.get('/blog', CollectionsController.blog)
router.get('/smu/get-data-count', CollectionsController.countDataOnSmu)
router.get('/new-models/get-data-count', CollectionsController.countDataOnNewModel)
router.get('/new-models/:slug', CollectionsController.newModels)
router.get('/pre-order', CollectionsController.preOrder)
router.get('/smu/:slug', CollectionsController.smu)
router.get('/', CollectionsController.showBrand)


module.exports = router

