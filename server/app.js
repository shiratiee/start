var express = require('express');
var app= express();
var sequelize = require('sequelize');
var bodyParser= require('body-parser');
var morgan = require('morgan');
var path = require('path');
var db = require("../models").db;
var api = require('./api.js')


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '..', 'public')))

app.use(morgan('dev'));

app.use('/api', api);

// failed to catch req above means 404, forward to error handler
app.use(function(req, res, next) {
    var err = new Error("Not Found");
    err.status = 404;
    next(err);
  });

    // handle any errors
    app.use(function(err, req, res, next) {
      console.error(err, err.stack);
      res.status(err.status || 500);
      res.send("Something went wrong: " + err.message);
    });

  // listen on a port
  var port = 8080;
  app.listen(port, function() {
    console.log("The server is listening closely on port", port);
    db
      .sync()
      .then(function() {
        console.log("Synchronated the database");
      })
      .catch(function(err) {
        console.error("Trouble right here in River City", err, err.stack);
      });
  });


