const userDB = require('../model/account_model')
const ProductDB = require('../model/product_model')
var jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
class AccountController {


   loginSuccess(req, res, next) {
      var token = req.cookies.token;
      var kq = jwt.verify(token,'mk');
      
      userDB.findOne({_id : kq._id}).lean()
      .then(account => {
         res.render('./accountView/loginSuccess',{account})
      })
     
   }


   loginFailed(req, res, next) {
      res.render('./accountView/loginFailed')
   }
   checkToken(req, res, next) {
      
      var token = req.cookies.token;
      var kq = jwt.verify(token,'mk');
        
      if(kq){
         next();
      }else{
         this.login();
      }
   }
   store(req, res, next) {
      var token = req.cookies.token;
      var kq = jwt.verify(token,'mk');
      userDB.findOne({_id : kq._id}).lean()
         .then(account => {
            ProductDB.find({_id: {$in : account.item}}).lean()
            .then(product => {
               res.render('./accountView/store',{product,account})
            })
            .catch(next)
         })
         .catch(next)
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
              let token = jwt.sign({_id:account._id},'mk')
               res.json({ token: token})
               
            }else{
               res.json('failed')
            }
         })
         
   }
   
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
               res.render('./accountView/registerFailed', { account })
            } else {
               return userDB.create({ name, username, password })
            }
         })
         .then(account => {
            res.render('./accountView/registerSuccess', { account })
         })
         .catch(next)
   }



   addItem(req, res, next) {
      var token = req.cookies.token;
      var kq = jwt.verify(token,'mk');
      
      
       userDB.updateOne(
          {_id:kq._id},
          { $addToSet:  req.body  }
       ).lean()
      .then(account => {
         res.redirect('/home')
      })
      .catch(next)
   }

   editItem(req, res, next) {
      var token = req.cookies.token;
      var kq = jwt.verify(token, 'mk');
      userDB.findOneAndUpdate({ _id: kq._id }, {
         $pull: { 'item' : req.body.item }
       })
      
      .then(()=>{
         res.render("accountView/store");
      })
      .catch(next)
         
   }

}



module.exports = new AccountController()
// 