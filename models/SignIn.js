const mongoose = require('mongoose');

const signInSchema = new mongoose.Schema({
  name: String,
  ageGroup: String,
  signedInAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('SignIn', signInSchema);
