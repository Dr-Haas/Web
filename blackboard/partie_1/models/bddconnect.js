var mongoose = require('mongoose');

var user = 'Admin';
var password = 'azerty12';
var port = 11865;
var bddname = 'blackboardapp';

var options = { connectTimeoutMS: 5000, useNewUrlParser: true }

mongoose.connect(
  "mongodb://"+user+":"+password+"@ds2"+port+".mlab.com:"+port+"/"+bddname,
  options,
  function(error){
   console.log(error);
  }
);
