'use strict';
/* global $ dayModule */

/**
 * A module for managing multiple days & application state.
 * Days are held in a `days` array, with a reference to the `currentDay`.
 * Clicking the "add" (+) button builds a new day object (see `day.js`)
 * and switches to displaying it. Clicking the "remove" button (x) performs
 * the relatively involved logic of reassigning all day numbers and splicing
 * the day out of the collection.
 *
 * This module has four public methods: `.load()`, which currently just
 * adds a single day (assuming a priori no days); `switchTo`, which manages
 * hiding and showing the proper days; and `addToCurrent`/`removeFromCurrent`,
 * which take `attraction` objects and pass them to `currentDay`.
 */

var tripModule = (function () {

  // application state

  var days = [],
  currentDay;

  // jQuery selections

  var $addButton, $removeButton;
  $(function () {
    $addButton = $('#day-add');
    $removeButton = $('#day-title > button.remove');
  });

  // method used both internally and externally

  function switchTo (newCurrentDay) {
    if (currentDay) currentDay.hide();
    currentDay = newCurrentDay;
    currentDay.show();
  }

  // jQuery event binding

  $(function () {
    $addButton.on('click', addDay);
    $removeButton.on('click', deleteCurrentDay);
  });

  function addDay () {
    if (this && this.blur) this.blur(); // removes focus box from buttons
      //receive post request, create new day in database, create new day
      //on front end, make that new day the current day.
      $.post('/api/days')
        .then(newDay => {
          console.log('using dayModule.create on', newDay);
          var newFrontEndDay = dayModule.create(newDay);
          switchTo(newFrontEndDay);
        });
  }
//$.ajax({url: '/api/days/22', type: 'DELETE'})
//set current day to variable
//send ajax delete request with current day = :id
//switch to current day
//make sure all numbers are current.
  function deleteCurrentDay () {
    // prevent deleting last day
    $.ajax({url: '/api/days/' + currentDay.number, type: 'DELETE'})
        .then(() =>{
              currentDay.hideButton();
              console.log('good-bye day');
            });
    // if (days.length < 2 || !currentDay) return;
    // // remove from the collection
    // var index = days.indexOf(currentDay),
    //   previousDay = days.splice(index, 1)[0],
    //   newCurrent = days[index] || days[index - 1];
    // // fix the remaining day numbers
    // days.forEach(function (day, i) {
    //   day.setNumber(i + 1);
    // });
    // switchTo(newCurrent);
    // previousDay.hideButton();
  }

  // globally accessible module methods

  var publicAPI = {

    load: function () {
      $.get('/api/days')
      .then(days => {
        days.forEach(day => {
        dayModule.create(day);
        });
      });
    },

    switchTo: switchTo,

    addToCurrent: function (attraction) {
      currentDay.addAttraction(attraction);
    },

    removeFromCurrent: function (attraction) {
      currentDay.removeAttraction(attraction);
    }

  };

  return publicAPI;

}());
