var express = require('express'),
  bodyParser = require('body-parser'),
  session = require('express-session'),
  mongoose = require('mongoose'),
  passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy,
  fs = require('fs'),
  bCrypt= require('bcrypt-nodejs'),
  requestify = require('requestify'),
  flash = require('connect-flash'),
  User = require('./server-assets/models/User.js'),
  Lineup = require('./server-assets/models/Lineup.js'),
  lineupCtrl = require('./server-assets/controllers/lineupCtrl.js'),
  port = process.env.port || 9001,
  uristring = process.env.MONGOLAB_URI || 'mongodb://localhost/dailyFantasy';


var app = express();
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
app.use(session({secret: 'something'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(function(req, res, next) {
        res.header('Access-Control-Allow-Credentials', true);
        res.header('Access-Control-Allow-Origin', req.headers.origin);
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
        if ('OPTIONS' == req.method) {
            res.send(200);
        } else {
            next();
        }
});

var isValidPassword = function(user, password){
  return bCrypt.compareSync(password, user.password);
}
var createHash = function(password){
 return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}

passport.serializeUser(function(user, done){
  done(null, user);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
        done(err, user);
    });
});

passport.use('signup', new LocalStrategy({passReqToCallback : true},
  function(req, username, password, done) {
    console.log('we got here');
    findOrCreateUser = function(){
      // find a user in Mongo with provided username
      User.findOne({'userame':username},function(err, user) {
        // In case of any error return
        if (err){
          console.log('Error in SignUp: '+err);
          return done(err);
        }
        // already exists
        if (user) {
          console.log('User already exists');
          return done(null, false)
            req.flash('message','User Already Exists');
        } else {
          // if there is no user with that email
          // create the user
          var newUser = new User();
          // set the user's local credentials
          newUser.username = username;
          newUser.password = createHash(password);

          // save the user
          newUser.save(function(err) {
            if (err){
              console.log('Error in Saving user: '+err);
              throw err;
            }
            console.log('User Registration succesful');
            return done(null, newUser);
          });
        }
      });
    };
    process.nextTick(findOrCreateUser);
  }
));

passport.use('login', new LocalStrategy({passReqToCallback : true},
  function(req, username, password, done) {
    console.log('we out here');
    // check in mongo if a user with username exists or not
    User.findOne({ 'username' :  username },
      function(err, user) {
        // In case of any error, return using the done method
        if (err){
          console.log(err);
          return done(err);
        }
        // Username does not exist, log error & redirect back
        if (!user){
          console.log('User Not Found with username '+username);
          return done(null, false,
                req.flash('message', 'User Not found.'));
        }
        // User exists but wrong password, log the error
        // if (!isValidPassword(user, password)){
        //   console.log('Invalid Password');
        //   return done(null, false,
        //       req.flash('message', 'Invalid Password'));
        // }
        // User and password both match, return user from
        // done method which will be treated like success
        return done(null, user);
      }
    );
}));


app.get('/', function(req, res) {
    // Display the Login page with any flash message, if any
    res.render('index', { message: req.flash('message') });
});


app.post('/login', passport.authenticate('login',
  {
    successRedirect: '/#/createLineup',
    failureRedirect: '/home',
    failureFlash: true
}));

app.post('/signup', passport.authenticate('signup',
    {
      successRedirect: '/#/createLineup',
      failureRedirect: '/#/login',
      failureFlash: true
}));

//add lineup to user's file
app.post('/lineup', lineupCtrl.createLineup);
// app.post('/lineup', function(req, res){
//   var newLineup = new Lineup(req.body);
//   console.log(req.user);
//   var lineupId
//   newLineup.save().then(function(lineup) {
//     lineupId = lineup._id;
//     return User.findById(req.user._id).exec();
//   }).then(function(user) {
//     user.lineups.push(lineupId);
//     return user.save();
//   })
//   // .then(function(newUser) {
//   //   return res.json(newUser);
//   // }, function(err) {
//   //   return res.status(500).json(err);
//   // });
// })

//get all previous lineups for the current user
app.get('/getPrevious', lineupCtrl.getUserLineups);




// var requireAuth = function(req, res, next){
//   if(!req.isAuthenticated()){
//     return res.status(401).end();
//   }
//   next();
// }



app.get('/allPlayers', function(req, res){
  console.log('GET');
  requestify.get('https://api.fantasydata.net/nfl/v2/JSON/DailyFantasyPlayers/2015-DEC-13',{
    headers : {
    'ocp-apim-subscription-key': '4be58535c4614fab99659be70594cc2d'
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
    'ocp-apim-subscription-key': '4be58535c4614fab99659be70594cc2d'
    }
  }).then(function(response, error){
    var resp = response.getBody();
    res.send(resp);
  });
});

app.get('/projections/:week', function(req, res){
  requestify.get('https://api.fantasydata.net/nfl/v2/JSON/PlayerGameProjectionStatsByPlayerID/2015/'+req.params.week+'/11056',{
    headers : {
    'ocp-apim-subscription-key': '4be58535c4614fab99659be70594cc2d'
    }
  }).then(function(response, error){
    var resp = response.getBody();
    res.send(resp);
  });
});

app.get('/results/:week', function(req, res){
  requestify.get('https://api.fantasydata.net/nfl/v2/JSON/PlayerGameStatsByPlayerID/2015/'+req.params.week+'/11056',{
    headers : {
    'ocp-apim-subscription-key': '4be58535c4614fab99659be70594cc2d'
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
    'ocp-apim-subscription-key': '4be58535c4614fab99659be70594cc2d'
    }
  }).then(function(response) {
    console.log(response);
    var data = response.getBody();
    var myData = {
      Opponent: data.Opponent,
      FantasyPointsFanDuel: data.FantasyPointsFanDuel,
      PlayingSurface: data.PlayingSurface,
      ReceivingTargets: data.ReceivingTargets,
      Receptions: data.Receptions
    }
    console.log('and then here');
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

mongoose.connect(uristring);

mongoose.connection.once('open', function(){
  console.log('db connected');
});
