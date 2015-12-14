var User = require('../models/user');

module.exports = {
  addUser: function(req, res){
    newUser = new User(req.body);
    newUser.save().then(function(doc, err){
      if(err){throw err;}
      return res.json(doc);
    });
  },

  getUser: function(req, res){
    User.find(req.query).exec().then(function(docs, err){
      return res.json(docs);
    });
  }
}
