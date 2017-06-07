var Task = require('../../models/task')
  , User = require('../../models/user');

exports.createTask = function(req, res) {
  if(req.isAuthenticated()) {
    User.findOne({ username: req.user.username }, function(err, user) {
      if(user && user.active) {
        var title = req.body.title;
        var date = new Date();

        var task = new  Task({
          title: title,
          userId: req.user._id,
          user: req.user.username,
          date: date.toISOString().substring(0, 10)
        });
        
        task.save(function(err) {
          if(err) throw err;
          user.tasks.push({ title: title, _id: task._id });
          user.save();
          res.send({ success: 'created' });
        });
      }
    });
  } else {
    res.send({ error: 'You are not sign in' });
  }
};