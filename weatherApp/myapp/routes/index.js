
var express = require('express');
var router = express.Router();
var request = require('request');

var city = [
    {name: "paris"},
    {name: "Marseille"},
    {name: "Lyon"},
    {name: "Lille"}
    ];

var cityList = [];

/* Make data cityList */
for(var i = 0; i < city.length; i++) 
  {
    request("https://api.openweathermap.org/data/2.5/weather?q="+ city[i].name+"&units=metric&lang=fr&APPID=b762812267c5527db179d26dabf26c35", function(error, response, body) 
    {

      body = JSON.parse(body);
      console.log(body);
      cityList.push(
      {
        name: body.name,
        desc: body.weather[0].description,
        img: "http://openweathermap.org/img/w/"+body.weather[0].icon+".png",
        dayTemp: Math.floor(body.main.temp_max),
        nightTemp: Math.floor(body.main.temp_min),
      })
      console.log("--->",cityList)
    });
  }

// {
//   request("https://api.openweathermap.org/data/2.5/weather?q="+ city[i].name+"&units=metric&lang=fr&APPID=b762812267c5527db179d26dabf26c35", function(error, response, body) 
//     {
//       if (i <= cityList.length)
//          i++;
//       else
//       {
//         body = JSON.parse(body);
//         console.log(body);
//         cityList.push(
//         {
//           name: body.name,
//           desc: body.weather[0].description,
//           img: "http://openweathermap.org/img/w/"+body.weather[0].icon+".png",
//           dayTemp: Math.floor(body.main.temp_max),
//           nightTemp: Math.floor(body.main.temp_min),
//         })
//       }
//       console.log("--->",cityList)
//     });
// }




/* GET home page. */
router.get('/', function(req, res, next) 
{
    res.render('index', { cityList });
});

/* POST add-city page. */
router.post('/add-city', function(req, res, next) {

//  console.log( '--------->', dataCityList);
  console.log("----> ", req.body.addCity)
  request("https://api.openweathermap.org/data/2.5/weather?q="+ req.body.addCity+"&units=metric&lang=fr&APPID=b762812267c5527db179d26dabf26c35", function(error, response, body) {

    body = JSON.parse(body);
    console.log(body.weather);
    cityList.push(
      {
        name: body.name,
        desc: body.weather[0].description,
        img: "http://openweathermap.org/img/w/"+body.weather[0].icon+".png",
        dayTemp: Math.floor(body.main.temp_max),
        nightTemp: Math.floor(body.main.temp_min),
      })
      res.render('index', { cityList });
    });
});

/* GET delete page. */
router.get('/delete-city', function(req, res, next) {
  console.log("CITY DELETE HANDLED! ----> ", req.query.position)
  cityList.splice(req.query.position, 1)
  res.render('index', { cityList });
});



module.exports = router;