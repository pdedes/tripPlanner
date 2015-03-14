var express = require('express');
var router = express.Router();
var path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
	var models = require('../models/');
  
	models.Hotel.find(function(err, hotels_data){
		models.Restaurant.find(function(err, restaurants_data){
			models.ThingToDo.find(function(err, thingtodos_data){
				res.render('index', { title: 'TRIP PLANNER', 
				  	hotels: hotels_data,
				  	restaurants: restaurants_data,
				  	thingtodos: thingtodos_data
				});
			});
		});
	});

}); // close GET '/'



module.exports = router;
