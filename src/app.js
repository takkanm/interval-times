/**
 * Welcome to Pebble.js!
 *
 * This is where you write your app.
 */

var UI = require('ui');
var interval_sec = 5;
var running_p = false;
var count = 0;
var Vibe = require('ui/vibe');

var main = new UI.Card({
  title: 'Interval Vibes',
  subtitle: 'Vibe Off',
  body: ('Interval sec is ' + interval_sec + ' sec.')
});

function reloadMainBody() {
  main.body('Interval sec : ' + interval_sec); 
}

reloadMainBody();
main.show();

function timer() {
  if (!running_p) {
    return;
  }
  count += 1;

  if (running_p) {
    setTimeout(timer, 1000);
  }

  if ((count % interval_sec) == 0) {
    Vibe.vibrate('long');
  } else {
    Vibe.vibrate('short');
  }
}

main.on('click', 'select', function(e) {
  if(running_p) {
    running_p = false;
    main.subtitle('Vibe Off');
  } else {
    count = 0;
    running_p = true;
    main.subtitle('Vibe On !!!');
    timer();
  }
});

main.on('click', 'up', function(e) {
  interval_sec += 1;
  reloadMainBody();
});

main.on('click', 'down', function(e) {
  interval_sec -= 1;
  reloadMainBody();
});