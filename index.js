var express = require('express'),
  bodyParser = require('body-parser'),
  cors = require('cors'),
  session = require('express-session'),
  mongoose = require('mongoose'),
  passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy,
  User = require('./server-assets/models/User'),
  fs = require('fs'),
  app = express(),
  requestify = require('requestify'),
  userCtrl = require('./server-assets/controllers/userCtrl'),
  lineupCtrl = require('./server-assets/controllers/lineupCtrl'),
  port = process.env.port || 9001;

app.use(bodyParser.json(), cors(), express.static(__dirname + '/public'));



app.use(session({secret: 'something'}));
app.use(passport.initialize());
app.use(passport.session);

passport.use(new LocalStrategy(
  function(username, password, done){
    User.findOne({username: username}.exec().then(function(err, user){
      if(err){return done(err); }
      if(!user){
        return done(null, false, {message: "incorrect username."});
      }
      if(!user.validPassword(password)) {
        return done(null, false, {message: "Incorrect password."});
      }
      return done(null, user);
    }))
  }
));

passport.serializeUser(function(user, done){
  done(null, user);
});

passport.deserializeUser(function(obj, done){
  done(null, obj);
});

var requireAuth = function(req, res, next){
  if(!req.isAuthenticated()){
    return res.status(401).end();
  }
  next();
}

app.post('/login',
  passport.authenticate('local', {
    successRedirect: '/createLineup',
    failureRedirect: '/login',
    failureFlash: true
  })
)




app.get('/allPlayers', function(req, res){
  console.log('GET');
  requestify.get('https://api.fantasydata.net/nfl/v2/JSON/DailyFantasyPlayers/2015-DEC-13',{
    headers : {
    'ocp-apim-subscription-key': ''
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
    'ocp-apim-subscription-key': ''
    }
  }).then(function(response, error){
    var resp = response.getBody();
    res.send(resp);
  });
});

app.get('/projections/:week', function(req, res){
  requestify.get('https://api.fantasydata.net/nfl/v2/JSON/PlayerGameProjectionStatsByPlayerID/2015/'+req.params.week+'/11056',{
    headers : {
    'ocp-apim-subscription-key': ''
    }
  }).then(function(response, error){
    var resp = response.getBody();
    res.send(resp);
  });
});

app.get('/results/:week', function(req, res){
  requestify.get('https://api.fantasydata.net/nfl/v2/JSON/PlayerGameStatsByPlayerID/2015/'+req.params.week+'/11056',{
    headers : {
    'ocp-apim-subscription-key': ''
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
    'ocp-apim-subscription-key': ''
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

function createLineup(req,res) {
  var newLineup = new Lineup(req.body);
  var lineupId;
  newLineup.save().then(function(lineup) {
    lineupId = lineup._id;
    return User.findById(req.user._id).exec();
  }).then(function(user) {
    user.lineups.push(lineupId);
    return user.save();
  }).then(function(newUser) {
    return res.json(newUser);
  }, function(err) {
    return res.status(500).json(err);
  });
}
