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
        res.send('success');
      })
      .catch(next);
});

router.delete('/days/:id', function(req, res, next){
  Day.findById(req.params.id)
    .then(function(foundDay){
      return foundDay.destroy();
    }).then(function(destroyedDay){
      res.send(destroyedDay);
      console.log('destroyed a day, you are mean');
    })
    .catch(next);
});

router.post('/days', function(req, res, next){
  Day.create({
  })
    .then(function(createdDay){
      createdDay.number = createdDay.id;
      return createdDay.save().
      then(function(createdDay){
        res.send(createdDay);
      });
    }).catch(next);
});

router.post('/days/:id/restaurants', function(req, res, next){
    // $hotelSelect.setDay(req.params.id);
});


router.post('/days/:id/restaurants', function(req, res, next){
    // $restaurantSelect.setDay(req.params.id);
});

router.post('/days/:id/activities', function(req, res, next){
  // $activitySelect.setDay(req.params.id);

});
module.exports = router;

