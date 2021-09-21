const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const user = new Schema({
    username: String,
    name: String,
    password: String,
    img: String,
    item: Array,
    cart: Array,
})


module.exports = mongoose.model('user', user);