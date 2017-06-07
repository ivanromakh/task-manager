var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

// User Schema
var TaskSchema = mongoose.Schema({
  title: String,
  userId: String,
  user: String,
  date: String,
});

var Task = module.exports = mongoose.model('Task', TaskSchema);