var mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
    firstName : String,
    lastName: String,
    email: String,
    password: String,
    country:String,
    age: Number,
    status: String,
    gender: String,
    dateInsert:Date
   });

module.exports = mongoose.model('Users', UserSchema);
