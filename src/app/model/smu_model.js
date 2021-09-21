const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const smu = new Schema({
  name: String,
  pd_code: String,
  img: String,
  status: String,
  cost: String,
  costNum: Number,
  list: String,
});


module.exports = mongoose.model('smu', smu);
