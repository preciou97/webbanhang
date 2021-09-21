const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const restock = new Schema({
  name: String,
  pd_code: String,
  img: String,
  status: String,
  cost: String,
  costNum: Number,
  list: String,
});


module.exports = mongoose.model('restock', restock);
