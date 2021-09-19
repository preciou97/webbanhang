const ProductDB = require('../model/product_model')
const BrandDB = require('../model/brand_model')
class SiteController{
    index(req, res, next) {
        Promise.all([ProductDB.find({}).lean().limit(10),BrandDB.find({}).lean()])
       
            .then(([product,brand ]) =>  
                
                res.render('home',{product,brand})
           
            
            )   
    }
    
   search(req,res,next){
       var searchValue = req.query;
      
       ProductDB.find({name: { $regex: searchValue.v,$options: "i" }}).lean()
            .then(product => {

                res.render('search', {product,
                    "searchValue": searchValue.v,
                });
            })
    
}
}

module.exports = new SiteController()


