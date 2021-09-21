const ProductDB = require('../model/product_model')
const BrandDB = require('../model/brand_model')
const CollaborationDB = require('../model/collaboration_model')
const newModelDB = require('../model/new_model')
const LongSellerDB = require('../model/longSeller_model')
const PreOderDB = require('../model/preOder_model')
const RestockDB = require('../model/restock_model')
const SaleDB = require('../model/sales_model')
const SmuDB = require('../model/smu_model')
const TopSeller = require('../model/topSeller_model')
class SiteController{
    index(req, res, next) {
        Promise.all([
            ProductDB.find({}).lean().limit(10),
            newModelDB.find({}).lean().limit(10),
            BrandDB.find({}).lean(),
            CollaborationDB.find({}).lean().limit(10),
            LongSellerDB.find({}).lean().limit(10),
            RestockDB.find({}).lean().limit(10),
            SaleDB.find({}).lean().limit(10),
            PreOderDB.find({}).lean().limit(10),
            SmuDB.find({}).lean().limit(10),
            TopSeller.find({}).lean().limit(10)
        ])
       
            .then(([product,newmodel,brand,collaboration,longseller,restock,sale,preoder,smu,topseller ]) =>  
                
                res.render('home',{product,newmodel,brand,collaboration,longseller,restock,sale,preoder,smu,topseller})
           
            
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


