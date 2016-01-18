var Lineup = require('../models/Lineup');
var User = require('../models/User');


module.exports = {
  createLineup: function(req, res){
    var newLineup = new Lineup(req.body);
    console.log(req.user);
    var lineupId
    newLineup.save().then(function(lineup) {
      lineupId = lineup._id;
      return User.findById(req.user._id).exec();
    }).then(function(user) {
      user.lineups.push(lineupId);
      return user.save();
    })
  },

  getUserLineups: function(req, res){
    User.findById('56704814d5feea67dc980df3').exec().then(function(user){
      console.log(user.lineups.length);
      var pastLineups = {};
      for(var i = 0; i < user.lineups.length; i++){

        Lineup.findById(user.lineups[i]).exec().then(function(lineup){
          console.log(lineup);
          // pastLineups.push(lineup);
        })
      }
      console.log(pastLineups);
    })
  },

  getLineup: function(req, res){
    User.find(req.query).exec().then(function(docs, err){
      return res.json(docs);
    });
  }
}
