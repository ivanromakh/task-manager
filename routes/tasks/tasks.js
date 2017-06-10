var _ = require("underscore")

  , User = require('../../models/user')
  , Task = require('../../models/task');


function renderTasks(res, user, tasks, task) {
  res.render("tasks", {
    _     : _,
    title : "Tasks",
    tasks : tasks,
    username: user.username,
    userId: user._id,
    activeTask: task,
    messages: []
  });
}

function getTaskIds(task) {
  var taskId = {};
  taskId._id = task._id;
  return taskId;
}

function getUserIds(msg) {
  var temp = {}
  temp._id = msg.userId;
  return temp;
}

function findUserById(user) {
  return user._id == this.userId;
}

function addUserToMessage(msg) {
  var mss = {};
  var user = this.users.find(findUserById, { userId: msg.userId });
  mss.message = msg;
  mss.user = user;
  return mss;
}

function getMessages(err, task, users) {
  if (err) throw err;
  var messages = task.messages.map(addUserToMessage, { users: users });
  if(!messages) {
    messages = [];
  }
  return messages;
}

exports.tasks = function(req, res) {
  var user = {};
  var taskIds = [];

  if(req.isAuthenticated()) {
    user = req.user;

    Task.find({ 'users._id': user._id }, function(err, tasks) {
      if (err) throw err;

      Task.findOne({ _id: user.activeTask }, function(err, task) {
        if (err) throw err;

        if(!task) {
          renderTasks(res, user, tasks);
          return;
        }

        User.find({ $or: task.users }, function(err, users) {
          var messages = getMessages(err, task, users);

          res.render("tasks", {
            _     : _,
            title : "Tasks",
            tasks : tasks,
            username: user.username,
            userId: user._id,
            users: users,
            activeTask: task,
            messages: messages
          });
        });
      });
    });
  } else {
    res.status(403).send('Forbidden');
  }
};

exports.main = function(req, res) {
  var user = {};

  if(req.isAuthenticated()) {
    user = req.user;
  }

  res.render("main", {
    title : 'Home',
    username: user.username
  });
};