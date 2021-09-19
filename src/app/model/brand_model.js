const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const brand = new Schema({
  link: String,
})


module.exports = mongoose.model('brand', brand);