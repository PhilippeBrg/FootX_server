var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var competitionSchema = new Schema(
  {
  competition: {type: String, unique: true, required: true},
  idleague: {type: Number, unique: true, required: true},
  league: String,
  numberofteam: Number,
  currentmatchday: Number,
  year: Number,
  created_at : { type: Date, default: Date.now }
}
);

var Competition = mongoose.model('Competition', competitionSchema);

module.exports = Competition;
