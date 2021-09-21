const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const longseller = new Schema({
  name: String,
  pd_code: String,
  img: String,
  status: String,
  cost: String,
  costNum: Number,
  list: String,
});


module.exports = mongoose.model('longseller', longseller);
