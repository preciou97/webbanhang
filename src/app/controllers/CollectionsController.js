const ProductDB = require('../model/product_model')
const BrandDB = require('../model/brand_model')
const BlogImgDB = require('../model/blogimg_model')
const SmuDB = require('../model/smu_model')
const PreOderDB = require('../model/preOder_model')
const newModelDB = require('../model/new_model')
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
        newModelDB.find({}).lean()
        .then(newmodel =>{ 
            
               res.render('newModel', {newmodel})
        })
        .catch(next)
    }
    preOrder(req, res, next) {
        PreOderDB.find({}).lean()
        .then(preoder =>{ 
            
               res.render('preOrder', {preoder})
        })
        .catch(next)
    }
    smu(req, res, next) {
        SmuDB.find({}).lean()
        .then(smu =>{ 
            
               res.render('smu', {smu})
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
   

    cartEmpty(req, res, next){
        res.render('cartEmpty')
    }
}

module.exports = new CollectionsController()