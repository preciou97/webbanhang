var express = require('express')
var router = express.Router()
var SiteController = require('../app/controllers/SiteController')

router.get('/', SiteController.index)
router.get('/search', SiteController.search)


module.exports = router