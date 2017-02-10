var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var Client = require('node-rest-client').Client;

/**
 *
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// app.use(function (req, res, next) {
//   res.header('Access-Control-Allow-Origin', req.get('Origin') || '*');
//   res.header('Access-Control-Allow-Credentials', 'true');
//   res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
//   res.header('Access-Control-Expose-Headers', 'Content-Length');
//   res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, X-Requested-With, Range');
//   if (req.method === 'OPTIONS') {
//     return res.send(200);
//   } else {
//     return next();
//   }
// });


// Serves recentSpells.
app.get('/tiggerDispatch', function (req, res) {
  console.log('req.query', req.query);
  // return;

  //Example POST method invocation
  var client = new Client();
  // set content-type header and data as json in args parameter
  var request = {
    data: req.query.event,
    headers: {
      "Content-Type": "application/json"
    }
  };

  // dispatch request.
  client.post(req.query.restURL, request, function (data, response) {
      // parsed response body as js object
      console.log('data', data);
      // raw response
      // console.log('response', response);
  });

  return res.json({
    msg: 'tiggerDispatch',
    data: req.query
  });
});

app.use(express.static('app/'));

app.listen(8667, function () {
  console.log('Example app listening on port 8667!');
});

