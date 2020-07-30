const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
  }
});
/**
const UserClassesSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  classes: [{ name: String, description: String }]
});
**/
const User = mongoose.model('User', UserSchema);
//const UserClasses = mongoose.model('UserClasses', UserClassesSchema);

module.exports = User;