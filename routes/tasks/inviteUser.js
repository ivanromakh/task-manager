var Task = require('../../models/task')
  , User = require('../../models/user')
  , mailer = require('../mail/mailer.js');

exports.inviteUser = function(req, res) {
  if(req.isAuthenticated()) {
  	var taskId = req.body.taskId;
  	var userEmail = req.body.email;
    console.log(req.body)
    Task.findOne({ _id: taskId }, function(err, task) {
      if (err) throw err;

      if(task) {
      	User.findOne({ email: userEmail }, function(err, user) {
          if(err) throw err;

          if(user && user.active) {
          	//send email
            message.to = userEmail;
            

            mailer.transporter.sendMail(message, function(err, info) {
              if (err) throw err;
              
              res.send({ success: 'invited' });
            });          	
          } else {
          	res.send({ error: 'user is not found' });
          }
      	});
      } else {
        res.send({ error: 'task is not found' });
      }
    });
  } else {
    res.send({ error: 'You are not sign in' });
  }
}