var express = require('express'),
  bodyParser = require('body-parser'),
  cors = require('cors'),
  mongoose = require('mongoose'),
  app = express(),
  port = process.env.port || 9001;

app.use(bodyParser.json(), cors(), express.static(__dirname + '/public'));

app.listen(port, function(){
  console.log("Listening on port: ", port);
});
