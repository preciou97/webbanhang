const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const product = new Schema({
  name: String,
  pd_code: String,
  img: String,
  status: String,
  cost: String,
});


module.exports = mongoose.model('product', product);
