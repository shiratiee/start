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

Hotel.findAll()
.then(function(hotels) {
  allAttractions.hotels = hotels;
  return Restaurant.findAll();
})
.then(function(restaurants) {
  allAttractions.restaurants = restaurants;
  return Activity.findAll();
})
.then(function(activities) {
  allAttractions.activities = activities;
})
.then(function() {
  res.json(allAttractions);
})
.catch(next);

})

module.exports= Router;