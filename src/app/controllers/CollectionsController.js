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
        let pageNum = req.params.slug;
        let num = pageNum.slice(5)
        let skipPage = (num-1)*30;
        Promise.all([newModelDB.find({}).lean().limit(30).skip(skipPage),newModelDB.countDocuments({})])
        
        .then(([newmodel,count]) =>{ 
            
               res.render('newModel', {newmodel,count})
        })
        .catch(next)
    }

    countDataOnNewModel(req, res, next){
       newModelDB.countDocuments({})
        .then(number =>{
            res.json(Math.ceil(number/30));
        })
        
    }
    countDataOnSmu(req, res, next){
        SmuDB.countDocuments({})
         .then(number =>{
             res.json(Math.ceil(number/30));
         })
         
     }
    preOrder(req, res, next) {
        Promise.all([ PreOderDB.find({}).lean(),PreOderDB.countDocuments({})])
       
        .then(([preoder,count]) =>{ 
            
               res.render('preOrder', {preoder,count})
        })
        .catch(next)
    }
    smu(req, res, next) {
        let pageNum = req.params.slug;
        let num = pageNum.slice(5)
        let skipPage = (num-1)*30;
        Promise.all([ SmuDB.find({}).lean().limit(30).skip(skipPage),SmuDB.countDocuments({})])
        .then(([smu,count]) =>{ 
            
               res.render('smu', {smu,count})
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