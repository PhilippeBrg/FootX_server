var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema(
  {
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    idfavoriteleague: Number,
    idfavoriteteam: Number,
    isLogged: {type: Boolean, default: false},
    created_at: {type: Date, default: Date.now}
  }
);

var User = mongoose.model('User', userSchema);

module.exports = User;
