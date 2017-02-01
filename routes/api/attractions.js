'use strict';

const express = require('express');
const router = express.Router();
const db = require('../../models');
const Hotel = require('../../models/hotel');
const Activity = require('../../models/activity');
const Restaurant = require('../../models/restaurant');
const Day = require('../../models/day');


router.get('/hotels', function(req, res, next){
  Hotel.findAll()
      .then(function(allHotels){
        res.send(allHotels);
      }).catch(next);
});

router.get('/restaurants', function(req, res, next){
  Restaurant.findAll()
      .then(function(allRestaurants){
        res.send(allRestaurants);
      }).catch(next);
});

router.get('/activities', function(req, res, next){
    Activity.findAll()
      .then(function(allActivities){
        res.send(allActivities);
      }).catch(next);
});

router.get('/days', function(req, res, next){
    Day.findAll()
      .then(function(alldays){
        res.send(alldays);
      }).catch(next);
});

router.get('/days/:id', function(req, res, next){
    Day.findById(req.params.id)
      .then(function(foundDay){
        res.send(foundDay);
      })
      .catch(next);
});

router.delete('/days/:id', function(req, res, next){
  Day.findById(req.params.id)
    .then(function(foundDay){
      return foundDay.destroy();
    }).then(function(){
      console.log('destroyed a day, you are mean');
    })
    .catch(next);
});

router.post('/days/:id', function(req, res, next){
  Day.create({
    number: req.params.id
  })
    .then(function(createdDay){
      console.log('you created a day, it is called', createdDay);
    }).catch(next);
});

router.post('/day/:id/:attraction', function(req, res, next){
  var attraction = function(attraction){
    return attraction[0].toUpper() + attraction.slice(1);
  };
  attraction.create({
    //create the attraction here. end point 2/1/17
  });
});

module.exports = router;

