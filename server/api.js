var express = require('express');
var app= express();
var Router= express.Router();
var sequelize = require('sequelize');
var Hotel = require('../models').Hotel
var Restaurant = require('../models').Restaurant
var Activity = require('../models').Activity
var Place = require('../models').Place

var allAttractions = {};

Router.get('/', (req,res,next) => {

Hotel.findAll({ include: [ Place ] })
.then(function(hotels) {
  allAttractions.hotels = hotels;
  return Restaurant.findAll({ include: [ Place ] });
})
.then(function(restaurants) {
  allAttractions.restaurants = restaurants;
  return Activity.findAll({ include: [ Place ] });
})
.then(function(activities) {
  allAttractions.activities = activities;
})
.then(function() {
  res.json(allAttractions);
})
.catch(next);

})

Router.get('/:attractions/:name', (req, res, next) => {
console.log(req.params.attractions);
if (req.params.attractions === "hotels") {
  var database = Hotel;
}
if (req.params.attractions === "restaurants") {
  var database = Restaurant;
}
if (req.params.attractions === "activities") {
  var database = Activity;
}

database.findOne({
  where: {
    name: req.params.name, 
  },
  include: [ Place ] 
})
  .then((attraction) => {
  res.json(attraction)
  })
  .catch(console.error)
})




module.exports = Router;
