/**
 *
 */
function saveSettings() {
  localStorage.setItem('interval', $('#interval').val());
  localStorage.setItem('restURL', $('#restURL').val());
  localStorage.setItem('eventTypeJSONs', $('#eventTypeJSONs').val());
  window.location.reload();
}

function resetSettings() {
  localStorage.removeItem('interval');
  localStorage.removeItem('restURL');
  localStorage.removeItem('eventTypeJSONs');
  window.location.reload();
}

/**
 *
 */
function startTimer() {
  var interval = parseInt(localStorage.getItem('interval'));

  // Start timer and store timerId in localStorage.
  var timerId = setInterval(dispatchEvent, interval);
  localStorage.setItem('timerId', timerId);

  // Start timerViewTimer and store timerViewTimerId in localStorage.
  var viewTimerInterval = interval / 10;
  var timerViewTimerId = setInterval(refreshTimerView, viewTimerInterval);
  localStorage.setItem('timerViewTimerId', timerViewTimerId);
}

/**
 *
 */
function stopTimer() {
  var timerId = localStorage.getItem('timerId');
  clearInterval(timerId);

  var timerViewTimerId = localStorage.getItem('timerViewTimerId');
  clearInterval(timerViewTimerId);

   $('#timerCount').text(0);
}

/**
 *
 */
function refreshTimerView() {
  var interval = parseInt(localStorage.getItem('interval'));
  var timerCount = parseInt($('#timerCount').text()) + (interval / 10);
  // Reset timercount when it gets greater than interval.
  timerCount = (timerCount < interval) ? timerCount : 0;
  $('#timerCount').text(timerCount);
}

/**
 *
 */
function dispatchEvent() {
  var restURL = localStorage.getItem('restURL');

  var events = [];
  localStorage.getItem('eventTypeJSONs').split(/\r?\n/).map(function(_event){
    events.push(_event);
  });
  var randomEvent = events[Math.floor(Math.random() * events.length)];
  var randomEventObj = JSON.parse(randomEvent);

  var request = $.ajax({
    method: "POST",
    url: restURL,
    data: JSON.parse(randomEvent),
    beforeSend: function (jqXHR, settings) {
      console.log('jqXHR');
      console.log(jqXHR);
    }
  })
    .done(function(msg) {
      // console.log('msg');
      // console.log(msg);
    })
    .fail(function( jqXHR, textStatus ) {
      // console.log('jqXHR');
      // console.log(jqXHR);
      // console.log('textStatus');
      // console.log(textStatus);
    });

  var eventDispatchLog = $('#eventDispatchLog').val();
  eventDispatchLog = eventDispatchLog.length === 0 ? randomEvent : eventDispatchLog + "\n" + randomEvent;
  $('#eventDispatchLog').val(eventDispatchLog);

  var endpointLog = localStorage.getItem('endpointLog');
  $('#endpointLog').val(endpointLog);
}

function clearStore() {
  $.ajax({
    method: "GET",
    url: 'http://localhost:8666/dumpit',
  });
}

/**
 *
 */
function defaultEventTypeJSONs() {
  var defaultEventTypes = [];

  var eventTypes = [
    {
      eventType: 'playerKilledEntity',
      entityType: 'Kitten',
      playerName: null
    },
    {
      eventType: 'playerKilledEntity',
      entityType: 'PuppyDog',
      playerName: null
    },
    {
      eventType: 'playerKilledEntity',
      entityType: 'Zombie',
      playerName: null
    },
    {
      eventType: 'playerKilledEntity',
      entityType: 'Zombie',
      playerName: null
    },
    {
      eventType: 'playerCastSpell',
      spellName: 'petrolBomb',
      playerName: 'death667b'
    },
    {
      eventType: 'playerCastSpell',
      spellName: 'lightningBolt',
      playerName: 'triyuga'
    },
    {
      eventType: 'playerCastSpell',
      spellName: 'lightningBolt',
      playerName: 'briggsy'
    }
  ];

  // JSON.stringify eventType and push into defaulteventTypes array.
  eventTypes.map(function(eventType){
      defaultEventTypes.push(JSON.stringify(eventType));
  });

  return defaultEventTypes.join("\n");
}

/**
 * Runtime.
 */

var defaultInterval = 1000;
var interval = localStorage.getItem('interval') ? localStorage.getItem('interval') : defaultInterval;
localStorage.setItem('interval', interval);
$('#interval').val(interval);

var defaultRestURL = 'http://localhost:8666/eat';
var restURL = localStorage.getItem('restURL') ? localStorage.getItem('restURL') : defaultRestURL;
localStorage.setItem('restURL', restURL);
$('#restURL').val(restURL);

var defaultEventTypeJSONs = defaultEventTypeJSONs();
var eventTypeJSONs = localStorage.getItem('eventTypeJSONs') ? localStorage.getItem('eventTypeJSONs') : defaultEventTypeJSONs;
localStorage.setItem('eventTypeJSONs', eventTypeJSONs);
$('#eventTypeJSONs').val(eventTypeJSONs);

var endpointLog = localStorage.getItem('endpointLog') ? localStorage.getItem('endpointLog') : '';
$('#endpointLog').val(endpointLog);




console.log('window.location.href');
console.log(window.location.href);













