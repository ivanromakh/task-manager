var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

// User Schema
var TaskSchema = mongoose.Schema({
  title: String,
  userId: String,
  user: String,
  date: String,
  messages: [{
  	userId: String,
  	text: String,
  	createdAt: String,
  }],
  invitations: [{
    _id: String,
    token: String
  }],
  users: [{
    _id: String
  }],
  status: String
});

var Task = module.exports = mongoose.model('Task', TaskSchema);