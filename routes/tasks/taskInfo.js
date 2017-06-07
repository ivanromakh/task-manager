var Task = require('../../models/task')
  , User = require('../../models/user')
  , config = require('../../config/config.js');

exports.taskInfo = function(req,res){
  res.render("main", {
    title : 'Home'
  });
};