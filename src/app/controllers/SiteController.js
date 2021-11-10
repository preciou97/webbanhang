const ProductDB = require('../model/product_model')
const BrandDB = require('../model/brand_model')
const newModelDB = require('../model/new_model')
const PreOderDB = require('../model/preOder_model')
const SaleDB = require('../model/sales_model')
const SmuDB = require('../model/smu_model')

class SiteController{
    index(req, res, next) {
        Promise.all([
            ProductDB.find({}).lean().limit(10),
            newModelDB.find({}).lean().limit(10),
            BrandDB.find({}).lean(),
            SaleDB.find({}).lean().limit(10),
            PreOderDB.find({}).lean().limit(10),
            SmuDB.find({}).lean().limit(10),
        ])
       
            .then(([product,newmodel,brand,sale,preoder,smu]) =>  
                
                res.render('home',{product,newmodel,brand,sale,preoder,smu})
           
            
            )   
    }
    
   search(req,res,next){
       var searchValue = req.query;
       Promise.all([ ProductDB.find({name: { $regex: searchValue.v,$options: "i" }}).lean(),ProductDB.find({name: { $regex: searchValue.v,$options: "i" }}).countDocuments({})])
   
            .then(([product,count]) => {

                res.render('search', {
                    product,
                    "searchValue": searchValue.v,
                    count 
                });
            })
    
    }
    
}

module.exports = new SiteController()


