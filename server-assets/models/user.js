var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  username: {type: String, required: true},
  password: {type: String, required: true},
  lineups: [{type: mongoose.Schema.Types.ObjectId, ref: 'Lineup'}]
});

module.exports = mongoose.model('User', userSchema);
