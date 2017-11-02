var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var playerSchema = new Schema({
  name: {type: String, required: true},
  jerseynumber : Number,
  position : String,
  birthdate : Date,
  nationality : String,
  club: String,
  clubs : [String],
  created_at : Date,
  updated_at : Date
});

var Player = mongoose.model('Player', playerSchema);

module.exports = Player;
