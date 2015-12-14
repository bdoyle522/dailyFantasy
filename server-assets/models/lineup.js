var mongoose = require('mongoose');

var lineupSchema = new mongoose.Schema({
  date: {type: Date, default: Date.now},
  players: [{
    player1: {type: String, required: true},
    player2: {type: String, required: true},
    player3: {type: String, required: true}
  }],
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

module.exports = mongoose.model( 'Lineup', lineupSchema);
