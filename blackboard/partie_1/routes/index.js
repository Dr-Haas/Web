var UserModel = require('../models/users');
var ArticleModel = require('../models/articles');

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home');
});

router.get('/messages-page', function(req, res, next) {
  res.render('messages');
});

router.get('/tasks-page', function(req, res, next) {
  res.render('tasks');
});

router.get('/users-page', function(req, res, next) {
  UserModel.find(function(err, users){
    console.log("USERSSSS : ",users);
    res.render('users', {users});
  });

});

router.get('/catalog-page', function(req, res, next) {
  ArticleModel.find(function(err, articles){
    res.render('catalog', {articles});
  });
});


router.get('/order-list-page', function(req, res, next) {
  res.render('order-list');
});

router.get('/order-page', function(req, res, next) {
  res.render('order');
});


/* POST users route. */
router.post('/new-user', function(req, res, next) {

  var newUser = new UserModel({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    age: req.body.age,
    status: req.body.status,
    gender: req.body.gender,
  });

  newUser.save(
    function(err, user){
      if (err) {
        console.log(err)
      } else {
        console.log("USER SAVED --> ", user )
      }
      res.render('home');
    }
  )
});

/* POST articles route. */
router.post('/new-article', function(req, res, next) {

  var newArticle = new ArticleModel({
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    stock: req.body.stock,
    weight: req.body.weight,
    img: req.body.img
  });

  newArticle.save(
    function(err, article){
      if (err) {
        console.log(err)
      } else {
        console.log("ARTICLE SAVED --> ", article )
      }
      res.render('home');
    }
  )
});

module.exports = router;
