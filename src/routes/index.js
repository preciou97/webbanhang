
var SiteRouter = require('./siteRoute')
var CollectionsRouter = require('./collectionsRoute')
var AccountRouter = require('./accountRoute')
var PageInfoController = require('../app/controllers/PageInfoController')
function router(app){

    app.use('/', SiteRouter)
    app.use('/collections', CollectionsRouter)
    app.use('/account',AccountRouter)
    app.get('/page/infomations',PageInfoController.show)

}




module.exports = router