const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  highestScore: {
    type: Number,
  },
  highestScoreInLang: {
    type: String,
  },
  jwtTokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

// Middleware to add a new token to the jwtTokens array
userSchema.methods.addToken = function (token) {
  this.jwtTokens = this.jwtTokens.concat({ token });
  return this.save();
};

// Middleware to remove a token from the jwtTokens array
userSchema.methods.removeToken = function (token) {
  this.jwtTokens = this.jwtTokens.filter((jwtToken) => jwtToken.token !== token);
  return this.save();
};

const User = mongoose.model('User', userSchema);

module.exports = User;
