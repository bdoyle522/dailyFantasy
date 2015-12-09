var express = require('express'),
  bodyParser = require('body-parser'),
  cors = require('cors'),
  mongoose = require('mongoose'),
  app = express(),
  requestify = require('requestify'),
  port = process.env.port || 9001;

app.use(bodyParser.json(), cors(), express.static(__dirname + '/public'));

// var headers = {
//   'ocp-apim-subscription-key': '24b90e7fdf0542ffbf688fd703f77783'
// };

app.get('/allPlayers', function(req, res){
  console.log('GET');
  requestify.get('https://api.fantasydata.net/nfl/v2/JSON/DailyFantasyPlayers/2015-DEC-13',{
    headers : {
    'ocp-apim-subscription-key': 'a6e296faeaa24a5da75947241c93d8ba'
    }
  }).then(function(response, error){
    var resp = response.getBody();
    res.send(resp);
  });
});

app.get('/wr/:id', function(req, res){
  console.log(req.params.id);
  console.log('GET');
  requestify.get(`https://api.fantasydata.net/nfl/v2/JSON/${req.params.id}/`,{
    headers : {
    'ocp-apim-subscription-key': 'a6e296faeaa24a5da75947241c93d8ba'
    }
  }).then(function(response, error){
    var resp = response.getBody();
    res.send(resp);
  });
});


app.listen(port, function(){
  console.log("Listening on port: ", port);
});
