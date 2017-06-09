var uuidV4 = require('uuid/v4')
  , Task = require('../../models/task')
  , User = require('../../models/user')
  , config = require('../../config/config')
  , mailer = require('../../mail/mailer.js');

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
              console.log('user num: ', user);
              if(userIndex >= 0) {
                res.send({ error: 'user already have access to this task' });
                return;
              }
              var token = uuidV4();
              console.log()
              task.invitations.push({_id: user._id, token: token});
              task.save();

              message = {};
              message.to = userEmail;
              var link = config.host + '/tasks/accept/' + task._id + '/' + token;
              message.html = '<p> You are invited to the task: ' + task.title + 'if you accept this go to the next link <a href="'+ link +'"> accept task </a></p>';
              console.log('message: ', message);
              mailer.transporter.sendMail(message, function(err, info) {
                if(err) throw err;
                res.send({ success: 'invited' });
              });
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