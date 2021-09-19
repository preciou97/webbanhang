class PageInfoController{
    show(req, res, next) {
       res.render('help');
    }
    
}

module.exports = new PageInfoController()