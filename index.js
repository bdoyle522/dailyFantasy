var express = require('express'),
  bodyParser = require('body-parser'),
  cors = require('cors'),
  mongoose = require('mongoose'),
  fs = require('fs'),
  app = express(),
  requestify = require('requestify'),
  userCtrl = require('./server-assets/controllers/userCtrl'),
  lineupCtrl = require('./server-assets/controllers/lineupCtrl'),
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
  console.log('GET');
  requestify.get('https://api.fantasydata.net/nfl/v2/JSON/Player/'+req.params.id,{
    headers : {
    'ocp-apim-subscription-key': 'a6e296faeaa24a5da75947241c93d8ba'
    }
  }).then(function(response, error){
    var resp = response.getBody();
    res.send(resp);
  });
});

app.get('/projections/:week', function(req, res){
  requestify.get('https://api.fantasydata.net/nfl/v2/JSON/PlayerGameProjectionStatsByPlayerID/2015/'+req.params.week+'/11056',{
    headers : {
    'ocp-apim-subscription-key': 'a6e296faeaa24a5da75947241c93d8ba'
    }
  }).then(function(response, error){
    var resp = response.getBody();
    res.send(resp);
  });
});

app.get('/results/:week', function(req, res){
  requestify.get('https://api.fantasydata.net/nfl/v2/JSON/PlayerGameStatsByPlayerID/2015/'+req.params.week+'/11056',{
    headers : {
    'ocp-apim-subscription-key': 'a6e296faeaa24a5da75947241c93d8ba'
    }
  }).then(function(response, error){
    var resp = response.getBody();
    res.send(resp);
  });
});

app.get('/results', function(req, res) {
  var week = 11;
  console.log('here');
  requestify.get('https://api.fantasydata.net/nfl/v2/JSON/PlayerGameStatsByPlayerID/2015/'+week+'/11056',{
    headers : {
    'ocp-apim-subscription-key': 'a6e296faeaa24a5da75947241c93d8ba'
    }
  }).then(function(response) {
    var data = response.getBody();
    var myData = {
      Opponent: data.Opponent,
      FantasyPointsFanDuel: data.FantasyPointsFanDuel,
      PlayingSurface: data.PlayingSurface,
      ReceivingTargets: data.ReceivingTargets,
      Receptions: data.Receptions
    }
    fs.writeFile('week11.json', JSON.stringify(myData), function (err) {
      if (err) {
          console.log(err);
        throw err;
      }
    });
    res.send(data);
  });
});
app.listen(port, function(){
  console.log("Listening on port: ", port);
});

//user endpoints
app.post('/api/user', userCtrl.addUser);
app.get('/api/user', userCtrl.getUser);

//lineup endpoints
app.post('/api/lineup', lineupCtrl.createLineup);

mongoose.connect('mongodb://localhost:27017/dailyFantasy');

mongoose.connection.once('open', function(){
  console.log('db connected');
})

// function createLineup(req,res) {
//   var newLineup = new Lineup(req.body);
//   var lineupId;
//   newLinup.save().then(function(lineup) {
//     lineupId = lineup._id;
//     return User.findById(req.user._id).exec();
//   }).then(function(user) {
//     user.lineups.push(lineupId);
//     return user.save();
//   }).then(function(newUser) {
//     return res.json(newUser);
//   }, function(err) {
//     return res.status(500).json(err);
//   });
// }
