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
    User.findById(req.user._id).exec().then(function(user){
      console.log(user.lineups);
      return user.lineups;
    })
  }
  //
  // getLineup: function(req, res){
  //   User.find(req.query).exec().then(function(docs, err){
  //     return res.json(docs);
  //   });
  // }
}
