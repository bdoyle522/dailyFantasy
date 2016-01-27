var Lineup = require('../models/Lineup');
var User = require('../models/User');


module.exports = {
  createLineup: function(req, res){
    console.log('THIS IS THE USER: ', req.user);
    var newLineup = new Lineup();
    newLineup.players = req.body.players;
    newLineup.projected = req.body.projected;
    newLineup.user = req.user._id;
    console.log(newLineup);
    newLineup.save().then(function(lineup) {
      lineupId = lineup._id;
      return User.findById(req.user._id).exec();
    }).then(function(user) {
      user.lineups.push(lineupId);
      return user.save();
    })
  },

  getUserLineups: function(req, res){
    console.log('LINEUPCTRL', req.user);
    Lineup.find({"user": {$all: req.user._id}}).exec().then(function(lineups){
      console.log(lineups);
      console.log('break');
      res.status(200);
      res.send(lineups);
    })
  },

  getLineup: function(req, res){
    User.find(req.query).exec().then(function(docs, err){
      return res.json(docs);
    });
  }
}
