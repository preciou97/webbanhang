const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const blogImg = new Schema({
  link: String,
})


module.exports = mongoose.model('blogImg', blogImg);