var mongoose = require('mongoose');

var ArticlesSchema = mongoose.Schema({
    title : String,
    description: String,
    price: Number,
    stock: Number,
    weight: Number,
    image: String
   });

module.exports = mongoose.model('Articles', ArticlesSchema);
