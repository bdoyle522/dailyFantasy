var mongoose = require('mongoose');

var lineupSchema = new mongoose.Schema({
  date: {type: Date, default: Date.now},
  players: [{
    player1: {type: Object, required: true},
    player2: {type: Object, required: true},
    player3: {type: Object, required: true}
  }],
  projected: {type: Number},
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

module.exports = mongoose.model( 'Lineup', lineupSchema);
