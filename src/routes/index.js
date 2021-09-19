
var SiteRouter = require('../routes/site')
var CollectionsRouter = require('../routes/collections')
var AccountRouter = require('../routes/account')
var PageInfoController = require('../app/controllers/PageInfoController')
function router(app){

    app.use('/', SiteRouter)
    app.use('/collections', CollectionsRouter)
    app.use('/account',AccountRouter)
    app.get('/page/infomations',PageInfoController.show)

}




module.exports = router