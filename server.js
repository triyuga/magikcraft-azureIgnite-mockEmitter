var express = require('express')
var app = express()

var store = [];

function getStats() {
  var stats = {
    killCount: {}, // entityType: int
    spellCount: {}, // spellName: int
    leaderBoard: [], // [ { playerName: stats } ]
  };

  store.map(function (event) {
    switch(event.eventType) {
      case "playerKilledEntity":
          if (!stats.killCount.hasOwnProperty('entityType')) {
            var entityType =
            stats.killCount[entityType] = 0;
          }
          stats.killCount[entityType]++;
          break;
      case "playerCastSpell":
          if (!stats.spellCount.hasOwnProperty('spellType')) {
            stats.spellCount[entityType] = 0;
          }
          stats.spellCount[entityType]++;
          break;
    }
  });
}

// Consumes data from mock emitter.
app.get('/eat', function (req, res) {
  store.push(req.query);
  console.log('store');
  console.log(req.query);
  res.json({
    msg: 'Nom nom!',
    query: req.query
  });
})

// Serves data collected from mock emitter.
app.get('/serve', function (req, res) {
  res.json({
    msg: 'Eat Suck Suckface!',
    data: store
  });
})

// Serves data collected from mock emitter.
app.get('/stats', function (req, res) {
  res.json({
    msg: 'Whos who!',
    data: getStats()
  });
})

// Clears data from the store.
app.get('/dumpit', function (req, res) {
  store = [];
  res.json({
    msg: 'Ahhhmazing dump!',
  });
})

// // Clears data from the store.
// app.get('/store', function (req, res) {
//   store = [];
//   res.json({
//     msg: 'Many stuffs!',
//     data: store
//   });
// })

app.listen(8666, function () {
  console.log('Example app listening on port 8666!')
})
