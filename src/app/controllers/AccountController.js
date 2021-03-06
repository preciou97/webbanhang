const userDB = require('../model/account_model')
const ProductDB = require('../model/product_model')
var jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
class AccountController {


// --------- Register ------------

showRegister(req, res, next) {
   res.render('./accountView/register');
}

register(req, res, next) {
   let username = req.body.email;
   let password = req.body.password;
   let name = req.body.name;
   userDB.findOne({ username: username }).lean()
      .then(account => {
         if (account) {
            res.render('./accountView/registerFailed')
         } else {
            return userDB.create({ name, username, password })
         }
      })
      .then(account => {
         res.render('./accountView/registerSuccess', { account })
      })
      .catch(next)
}


// ------ login Handle -------
   loginSuccess(req, res, next) {
      var token = req.cookies.token;
      var kq = jwt.verify(token, 'mk');

      userDB.findOne({ _id: kq._id }).lean()
         .then(account => {
            res.render('./accountView/loginSuccess', { account })
         })

   }
   loginFailed(req, res, next) {
      res.render('./accountView/loginFailed')
   }
   login(req, res, next) {
      res.render('./accountView/login');

   }
   loginCheck(req, res, next) {

      let username = req.body.username;
      let password = req.body.password;

      userDB.findOne({ username: username, password: password }).lean()
         .then(account => {


            if (account) {
               let token = jwt.sign({ _id: account._id }, 'mk')
               res.json({ token: token })

            } else {
               res.json('failed')
            }
         })

   }


// --------- Token handle -----------
   checkToken(req, res, next) {

      var token = req.cookies.token;
      var kq = jwt.verify(token, 'mk');

      if (kq) {
         next();
      } else {
         this.login();
      }
   }


// ---------- Store ---------------
   showStore(req, res, next) {
      var token = req.cookies.token;
      var kq = jwt.verify(token, 'mk');
      userDB.findOne({ _id: kq._id }).lean()
         .then(account => {
            if(account !== null){
               ProductDB.find({ _id: { $in: account.item } }).lean()
               .then(product => {
                
                  res.render('./accountView/store', { product, account })
               })
               .catch(next)
            }
            else{
               res.render('./accountView/login');
            }
         })
        
   }
   checkStoreEmpty(req, res, next) {
      var token = req.cookies.token;
      var kq = jwt.verify(token, 'mk', (err, decoded) => {
         if (decoded) {
            return decoded;
         }
         if (err) {

            res.redirect('/account/login');
         }

      });
      userDB.find({ _id: kq._id }).lean()
         .then(account =>{ 
            
            if(account[0].item.length > 0) {
               
               next();
            }
            else {
               res.render("accountView/storeEmpty",{account});
            }

         })
   }
   addItemStore(req, res, next) {
      var token = req.cookies.token;
      var kq = jwt.verify(token, 'mk');
     
   
      userDB.updateOne(
         { _id: kq._id },
         { $addToSet: req.body }
      ).lean()
         .then(account => {
            res.redirect('/')
         })
         .catch(next)
   }
   
   editItemStore(req, res, next) {
      var token = req.cookies.token;
      var kq = jwt.verify(token, 'mk');
      userDB.findOneAndUpdate({ _id: kq._id }, {
         $pull: { 'item': req.body.item }
      })
   
         .then(() => {
            res.render("accountView/store");
         })
         .catch(next)
   
   }
 

// ------------ Cart ----------

   checkItemExistCart(req, res, next) {
      var token = req.cookies.token;
      var kq = jwt.verify(token, 'mk', (err, decoded) => {
         if (decoded) {
            return decoded;
         }
         if (err) {

            res.redirect('/account/login');
         }
      })
      userDB.find({ _id: kq._id }).lean()
         .then(account => { 
            var checkExist = false;
            account[0].cart.forEach(item =>{
              if(JSON.stringify(item) == JSON.stringify(req.body)){
               checkExist = true;
              } 
            })
            
            if(checkExist){
               res.json('???????????????????????????????????????????????????')
            }else{
               next();
            }
            
         })
         .catch(err => {
            return res.json(err)
         })
   }
   checkCartEmpty(req, res, next) {
      var token = req.cookies.token;
      var kq = jwt.verify(token, 'mk', (err, decoded) => {
         if (decoded) {
            return decoded;
         }
         if (err) {

            res.redirect('/account/login');
         }

      });
      userDB.find({ _id: kq._id }).lean()
         .then(account =>{ 
            
            if(account[0].cart.length > 0) {
               
               next();
            }
            else {
               res.render("accountView/cartEmpty",{account});
            }

         })
   }

   showCart(req, res, next) {

      var token = req.cookies.token;
      var kq = jwt.verify(token, 'mk', (err, decoded) => {
         if (decoded) {
            return decoded;
         }
         if (err) {

            res.redirect('/account/login');
         }
      })
      userDB.find({ _id: kq._id }).lean()
         .then(account => {

            let productIDs = [];
            let productSizeAndNum = [];


            account[0].cart.map((prod, index) => {
               productIDs.push(prod.id);
               productSizeAndNum.push(
                  {
                     size: prod.size,
                     num: prod.num
                  }
               )
            })
            ProductDB.find({ _id: { $in: productIDs } }).lean()
               .then(products => {
                 
                  let product = [];
                  productIDs.map((prod, index) => {
                     product.push({...products[index], ...productSizeAndNum[index] });
                  })
                  var totalCost = (product.reduce((pre, curr) =>{
                     return pre + curr.num * curr.cost;  
                  },0)); 
                  
                  var totalCostObj = {totalCost}
                  return res.render('accountView/cart', { product, account, totalCostObj})
               })
         })
         .catch(err => {
            return res.json(err)
         })
   }

   addToCart(req, res, next) {
      
      var token = req.cookies.token;
      var kq = jwt.verify(token, 'mk');
      userDB.findOneAndUpdate({ _id: kq._id }, {
         $push: { 'cart': req.body }
      })
         .then(() => {
            res.json('OK');
         })
         .catch(next)
   }

   deleteFromCart(req, res, next){
      var token = req.cookies.token;
      var kq = jwt.verify(token, 'mk');
      
      userDB.findOneAndUpdate({ _id: kq._id }, {
         $pull: { 'cart' : {id : req.body.item, num: req.body.num, size: req.body.size} },
         
      },{ multi: false })

         .then(() => {
            res.render("accountView/store");
         })
         .catch(next)
   }
}



module.exports = new AccountController()
// 