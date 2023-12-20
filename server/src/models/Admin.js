const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
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
adminSchema.methods.addToken = function (token) {
  this.jwtTokens = this.jwtTokens.concat({ token });
  return this.save();
};

// Middleware to remove a token from the jwtTokens array
adminSchema.methods.removeToken = function (token) {
  this.jwtTokens = this.jwtTokens.filter((jwtToken) => jwtToken.token !== token);
  return this.save();
};

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
