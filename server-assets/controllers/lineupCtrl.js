var Lineup = require('../models/Lineup');


module.exports = {
  createLineup: function(req, res){
    newLineup = new Lineup(req.body);
    newLineup.save().then(function(doc, err){
      if(err){throw err;}
      return res.json(doc);
    });
  },
  //
  // getLineup: function(req, res){
  //   User.find(req.query).exec().then(function(docs, err){
  //     return res.json(docs);
  //   });
  // }
}
