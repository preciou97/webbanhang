const ProductDB = require('../model/product_model')
const BrandDB = require('../model/brand_model')
const BlogImgDB = require('../model/blogimg_model')

class CollectionsController {

    showBrand(req, res, next) {
        BrandDB.find({}).lean()
            .then(brand =>{
                res.render('brand', {brand});
            })
            .catch(next)
        
    }
    blog(req, res, next) {  
        BlogImgDB.find({}).lean()
            .then(blogImg =>{
                res.render('blog', { layout: 'blog', blogImg });
            })
            .catch(next)
        
    }
    newModels(req, res, next) {
        ProductDB.find({}).lean()
        .then(product =>{ 
            
               res.render('newModel', {product})
        })
        .catch(next)
    }
    preOrder(req, res, next) {
        ProductDB.find({}).lean()
        .then(product =>{ 
            
               res.render('preOrder', {product})
        })
        .catch(next)
    }
    smu(req, res, next) {
        ProductDB.find({}).lean()
        .then(product =>{ 
            
               res.render('smu', {product})
        })
        .catch(next)
    }
    
        
    product(req, res, next) {
        ProductDB.findById(req.params.id).lean()
            .then(product =>{ 
                
                   res.render('product', {product})
            })
            .catch(next)
       
    }
    cart(req, res, next) {
       var sizeAndNum = req.query
       
        ProductDB.findById(req.params.id).lean()
        .then(product =>{ 
                
            res.render('cart', {product,sizeAndNum})
     })
     .catch(next)
    }

    cartEmpty(req, res, next){
        res.render('cartEmpty')
    }
}

module.exports = new CollectionsController()