var User = require('../models/User');
var bCrypt = require('bcrypt-nodejs');

var createHash = function(password){
 return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}

module.exports = {

  addUser: function(username, password){
    var hashedPassword = createHash(password);
    newUser = new User();
    newUser.username = username;
    newUser.password = hashedPassword;
    console.log('here');
    return newUser.save();
  },

  getUser: function(req, res){
    User.find(req.query).exec().then(function(docs, err){
      return res.json(docs);
    });
  }
}
