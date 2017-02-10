var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var Client = require('node-rest-client').Client;

var interval;
var eventsPerDispatch;
var restURL;
var events;
var emitTimer;

var client = new Client();

/**
 *
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

/**
 *
 */
function emitEvents() {
  // console.log('emitEvents');
  var count = eventsPerDispatch;
  while (count >= 0) {
    var randomEvent = JSON.parse(events[Math.floor(Math.random() * events.length)]);
    var req = {
      data: randomEvent,
      headers: {
        "Content-Type": "application/json"
      }
    };
    // console.log('Emitting Event', randomEvent);
    // dispatch request.
    client.post(restURL, req, function (data, response) {});

    count--;
  }
}

app.post('/startEmitter', function (req, res) {
  interval = req.body.interval;
  eventsPerDispatch = req.body.eventsPerDispatch;
  restURL = req.body.restURL;
  events = req.body.events;
  clearInterval(emitTimer);
  emitTimer = setInterval(emitEvents, interval);

  return res.json({
    msg: 'startEmitter with params:',
    data: req.body
  });
});

app.post('/stopEmitter', function (req, res) {
  clearInterval(emitTimer);
  return res.json({
    msg: 'stopEmitter: emitter stopped',
  });
});

app.use(express.static('app/'));

app.listen(8667, function () {
  console.log('Example app listening on port 8667!');
});

