var Task = require('../../models/task')
  , User = require('../../models/user');

function getUserIndex(user) {
  return user._id == this.userId;
}

exports.inviteUser = function(req, res) {
  if(req.isAuthenticated()) {
  	var taskId = req.body.taskId;
  	var userEmail = req.body.email;
    console.log(req.body)
    Task.findOne({ _id: taskId }, function(err, task) {
      if(err) throw err;

      if(task) {
      	User.findOne({ email: userEmail }, function(err, user) {
          if(err) throw err;

          if(user)
            if(user.active) {
              var userIndex = task.users.findIndex(getUserIndex, { userId: user._id });

              if(userIndex >= 0) {
                res.send({ error: 'user already have access to this task' });
                return;
              }

              task.users.push({ _id: user._id });
              task.save();
              res.send({ success: 'invited' });
            } else {
              res.send({ error: 'You can`t invite user whom is not active' });
          } else {
          	res.send({ error: 'User is not found' });
          }
      	});
      } else {
        res.send({ error: 'Task is not found' });
      }
    });
  } else {
    res.send({ error: 'You are not sign in' });
  }
}