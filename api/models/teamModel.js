var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var teamSchema = new Schema(
  {
  name: {type: String, required: true, unique: true},
  nickname: String,
  shortname: String,
  stadium: String,
  capacity: Number,
  birthdate : Date,
  website: String,
  coach: String,
  crestUrl: String,
  created_at : { type: Date, default: Date.now }
}
);

var Team = mongoose.model('Team', teamSchema);

module.exports = Team;
