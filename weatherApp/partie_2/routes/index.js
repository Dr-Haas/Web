var express = require('express');
var router = express.Router();
var request = require('request');

var mongoose = require('mongoose');

var options = {
  connectTimeoutMS: 5000,
  useNewUrlParser: true
}

mongoose.connect('mongodb+srv://dbUser:Ihave1Serve-@cluster0-bdcpb.mongodb.net/openWeathemap?retryWrites=true',
    options,
    function(err) {
     console.log(err);
    }
);

// var cityList = [];

var citySchema = mongoose.Schema({
  name: String,
  desc: String,
  img: String,
  temp_min: Number,
  temp_max: Number,
});


var cityModel = mongoose.model('cities', citySchema);

/* GET home page. */
router.get('/', function(req, res, next) {
  
  cityModel.find(
    function(err, citiesFromDataBase) {
      res.render('index', {
        cityList: citiesFromDataBase
      });
    });
});


/* POST add-city page. */
router.post('/add-city', function(req, res, next) {
  console.log("CITY ADDED : --->", req.body.addedCityFromFront);
  request(`http://api.openweathermap.org/data/2.5/weather?q=${req.body.addedCityFromFront}&APPID=b762812267c5527db179d26dabf26c35&units=metric&lang=fr`, function(error, response, body) {
    body = JSON.parse(body);
    console.log("STEP 1 | HERE IS THE BODY ---> ", body)
    
    var newCity = new cityModel({
      name: body.name,
      desc: body.weather[0].description,
      img: `http://openweathermap.org/img/w/${body.weather[0].icon}.png`,
      temp_max: Math.floor(body.main.temp_max),
      temp_min: Math.floor(body.main.temp_min),
    });
    
    newCity.save(
      function(error, city) {
        console.log("STEP 2 | CITY SAVED ---> ", city)
        
        cityModel.find(
          function(err, citiesFromDataBase) {
            console.log("STEP 3 | CITIES FOUND IN DB ---> ", citiesFromDataBase);
            res.render('index', {
              cityList: citiesFromDataBase
            });
          });
      });
  });
});





// This bonus aims at handling errors when a city is not found. The main goal is not to try to save a city which does not exist. Therefore, we need to implement a condition which tells : is there a 404 error return in the body ? To reach this step, we need to log the body when it works and when it does not work. That's how we can find that we need to use "body.cod == 404".

router.post('/add-city', function(req, res, next) {
  console.log("CITY ADDED : --->",req.body.addedCityFromFront);
  // We are using the ES6 new concatenation syntax. You could use the ES5 method as well --> "string"+variable+"string"
  request(`http://api.openweathermap.org/data/2.5/weather?q=${req.body.addedCityFromFront}&appid=fc07f13e149c30c7f3bc9c87c606a95f&units=metric&lang=fr`, function(error, response, body) {
  	body = JSON.parse(body);
    if (body.cod == '404') {
      console.log("STEP 1 | HERE IS THE BODY ERROR --->", body)
      cityModel.find(
        function(err, citiesFromDataBase) {
          console.log("STEP 2 | CITIES FOUND IN DB ---> ", citiesFromDataBase);
          res.render('index', {
            cityList: citiesFromDataBase
          });
        });
    } else {
      console.log("STEP 1 | HERE IS THE BODY ---> ", body)
      // 1) Regarding citymodel, here, I want to pre-save by creating a new model in a variable called newCity
      var newCity = new cityModel({
        name: body.name,
        desc: body.weather[0].description,
        img: `http://openweathermap.org/img/w/${body.weather[0].icon}.png`,
        temp_min: body.main.temp_min,
        temp_max: body.main.temp_max,
      });
      newCity.save(
        function(error, city) {
          console.log("STEP 2 | CITY SAVED ---> ", city)
          // 3) Once the city is saved, and the script is completed, I want to ask my database to give me all the cities (it will return "citiesFromDataBase" as I defined it). To do so, I can use find()
          cityModel.find(
            function(err, citiesFromDataBase) {
              console.log("STEP 3 | CITIES FOUND IN DB ---> ", citiesFromDataBase);
              res.render('index', {
                cityList: citiesFromDataBase
              });
            });
        });
    }
  });
});

// var express = require('express');
// var router = express.Router();
// var request = require('request');

// var city = [
//     {name: "paris"},
//     {name: "Marseille"},
//     {name: "Lyon"},
//     {name: "Lille"}
//     ];

// var cityList = [];

// /* Make data cityList */
// for(var i = 0; i < city.length; i++) 
//   {
//     request("https://api.openweathermap.org/data/2.5/weather?q="+ city[i].name+"&units=metric&lang=fr&APPID=b762812267c5527db179d26dabf26c35", function(error, response, body) 
//     {

//       body = JSON.parse(body);
//       console.log(body);
//       cityList.push(
//       {
//         name: body.name,
//         desc: body.weather[0].description,
//         img: "http://openweathermap.org/img/w/"+body.weather[0].icon+".png",
//         dayTemp: Math.floor(body.main.temp_max),
//         nightTemp: Math.floor(body.main.temp_min),
//       })
//       console.log("--->",cityList)
//     });
//   }

// // function(var ){
// //   request("https://api.openweathermap.org/data/2.5/weather?q="+ city[i].name+"&units=metric&lang=fr&APPID=b762812267c5527db179d26dabf26c35", function(error, response, body) 
// //     {
// //       if (i < cityList.length)
// //       {
// //         body = JSON.parse(body);
// //         console.log(body);
// //         cityList.push(
// //         {
// //           name: body.name,
// //           desc: body.weather[0].description,
// //           img: "http://openweathermap.org/img/w/"+body.weather[0].icon+".png",
// //           dayTemp: Math.floor(body.main.temp_max),
// //           nightTemp: Math.floor(body.main.temp_min),
// //         })
// //       }
// //       else
// //         i++
// //       console.log("--->",cityList)
// //     });
// // }




// /* GET home page. */
// router.get('/', function(req, res, next) 
// {
//     res.render('index', { cityList });
// });

// /* POST add-city page. */
// router.post('/add-city', function(req, res, next) {

// //  console.log( '--------->', dataCityList);
//   console.log("----> ", req.body.addCity)
//   request("https://api.openweathermap.org/data/2.5/weather?q="+ req.body.addCity+"&units=metric&lang=fr&APPID=b762812267c5527db179d26dabf26c35", function(error, response, body) {

//     body = JSON.parse(body);
//     console.log(body.weather);
//     cityList.push(
//       {
//         name: body.name,
//         desc: body.weather[0].description,
//         img: "http://openweathermap.org/img/w/"+body.weather[0].icon+".png",
//         dayTemp: Math.floor(body.main.temp_max),
//         nightTemp: Math.floor(body.main.temp_min),
//       })
//       res.render('index', { cityList });
//     });
// });

// /* GET delete page. */
// router.get('/delete-city', function(req, res, next) {
//   console.log("CITY DELETE HANDLED! ----> ", req.query.position)
//   cityList.splice(req.query.position, 1)
//   res.render('index', { cityList });
// });



// module.exports = router;



/* GET delete page. */
router.get('/delete-city', function(req, res, next) {
  console.log("STEP 4 | CITY DELETED ID ---> ", req.query.id)
  cityModel.deleteOne(
      { _id: req.query.id},
      function(error) {
        console.log("STEP 5 | CITY SUCCESSFULLY DELETED")
        cityModel.find(
          function(err, citiesFromDataBase) {
            res.render('index', {
              cityList: citiesFromDataBase
            });
          });
      }
  );
});



module.exports = router;
