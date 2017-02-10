/**
 *
 */

var viewTimer;

function saveSettings() {
  localStorage.setItem('interval', $('#interval').val());
  localStorage.setItem('eventsPerDispatch', $('#eventsPerDispatch').val());
  localStorage.setItem('restURL', $('#restURL').val());
  localStorage.setItem('eventTypeJSONs', $('#eventTypeJSONs').val());
  localStorage.setItem('resetStoreURL', $('#resetStoreURL').val());
  localStorage.setItem('scoreboardThroughputURL', $('#scoreboardThroughputURL').val());

  window.location.reload();
}

function resetSettings() {
  localStorage.removeItem('interval');
  localStorage.removeItem('eventsPerDispatch');
  localStorage.removeItem('restURL');
  localStorage.removeItem('eventTypeJSONs');
  localStorage.removeItem('resetStoreURL');
  localStorage.removeItem('scoreboardThroughputURL');

  window.location.reload();
}

function stopEmitter() {
  $.ajax({
      method: "POST",
      url: '/stopEmitter',
  })
    .done(function(msg) {
      console.log('msg', msg);
    })
    .fail(function( jqXHR, textStatus ) {
      console.log('jqXHR', jqXHR);
      console.log('textStatus', textStatus);
    });
}

function startEmitter() {
  var events = [];
  localStorage.getItem('eventTypeJSONs').split(/\r?\n/).map(function(_event){
    events.push(_event);
  });

  var query = {
    interval: parseInt(localStorage.getItem('interval')),
    eventsPerDispatch: parseInt(localStorage.getItem('eventsPerDispatch')),
    restURL: localStorage.getItem('restURL'),
    events: events,
  };

  console.log('query', query);

  $.ajax({
      method: "POST",
      url: '/startEmitter',
      data: query,
  })
    .done(function(msg) {
      console.log('msg', msg);
    })
    .fail(function( jqXHR, textStatus ) {
      console.log('jqXHR', jqXHR);
      console.log('textStatus', textStatus);
    });

  // clearInterval(viewTimer);

}

/**
 *
 */
function refreshStatsView() {
  var scoreboardThroughputURL = localStorage.getItem('scoreboardThroughputURL');

  $.ajax({
      method: "GET",
      url: scoreboardThroughputURL,
  })
    .done(function(msg) {
      $('#throughputLog').val(JSON.stringify(msg));
    });
}

/**
 *
 */
function resetStore() {
  var resetStoreURL = localStorage.getItem('resetStoreURL');
  $.ajax({
    method: "GET",
    url: resetStoreURL,
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
      eventType: "playerKilledEntity",
      entityType: "Wolf{owner=null,tamed=false}",
      playerName: null
    },
    {
      eventType: "playerKilledEntity",
      entityType: "Player{name=ProgHouse2016}",
      playerName: null
    },
    {
      eventType: 'playerCastSpell',
      spellName: 'petrolBomb',
      playerName: 'death667b'
    },
    {
      eventType: 'playerCastSpell',
      spellName: 'fulmen',
      playerName: 'triyuga'
    },
    {
      eventType: 'playerCastSpell',
      spellName: 'ignifera',
      playerName: 'triyuga'
    },
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

var defaultEventsPerDispatch = 10;
var eventsPerDispatch = localStorage.getItem('eventsPerDispatch') ? localStorage.getItem('eventsPerDispatch') : defaultEventsPerDispatch;
localStorage.setItem('eventsPerDispatch', eventsPerDispatch);
$('#eventsPerDispatch').val(eventsPerDispatch);

var defaultRestURL = 'http://localhost:8666/eat';
var restURL = localStorage.getItem('restURL') ? localStorage.getItem('restURL') : defaultRestURL;
localStorage.setItem('restURL', restURL);
$('#restURL').val(restURL);

var defaultResetStoreURL = 'http://localhost:8666/reset';
var resetStoreURL = localStorage.getItem('resetStoreURL') ? localStorage.getItem('resetStoreURL') : defaultResetStoreURL;
localStorage.setItem('resetStoreURL', resetStoreURL);
$('#resetStoreURL').val(resetStoreURL);

var defaultEventTypeJSONs = defaultEventTypeJSONs();
var eventTypeJSONs = localStorage.getItem('eventTypeJSONs') ? localStorage.getItem('eventTypeJSONs') : defaultEventTypeJSONs;
localStorage.setItem('eventTypeJSONs', eventTypeJSONs);
$('#eventTypeJSONs').val(eventTypeJSONs);

var endpointLog = localStorage.getItem('endpointLog') ? localStorage.getItem('endpointLog') : '';
$('#endpointLog').val(endpointLog);

var defaultScoreboardThroughputURL = 'http://localhost:8666/throughput';
var scoreboardThroughputURL = localStorage.getItem('scoreboardThroughputURL') ? localStorage.getItem('scoreboardThroughputURL') : defaultScoreboardThroughputURL;
localStorage.setItem('scoreboardThroughputURL', scoreboardThroughputURL);
$('#scoreboardThroughputURL').val(scoreboardThroughputURL);

// console.log('window.location.href');
// console.log(window.location.href);

viewTimer = setInterval(refreshStatsView, 1000);











