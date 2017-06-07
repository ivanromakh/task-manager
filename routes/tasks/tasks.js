var _ = require("underscore")

  , Task = require('../../models/task');


exports.tasks = function(req, res) {
  var user = {};
  var taskIds = [];

  if(req.isAuthenticated()) {
    user = req.user;
    
    taskIds = user.tasks.map(function(task) {
      var taskId = {};
      taskId._id = task._id;
      return taskId;
    });

    Task.find({ userId: user._id }, function(err, tasks) {
      if (err) throw err;

      res.render("tasks", {
        _     : _,
        title : "Tasks",
        tasks : tasks,
        user: user.username
      });
    });
  } else {
    res.render("main", { title: 'home' });
  }
};

exports.main = function(req, res) {
  res.render("main", {
    title : 'Home'
  });
};