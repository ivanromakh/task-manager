var Task = require('../../models/task');


exports.updateTask = function(req, res) {
  if(req.isAuthenticated()) {
    var userId = req.body.userId;
    var taskId = req.body.taskId;
    var text = req.body.text;
    
    Task.findOne({ _id: taskId }, function(err, task) {
      var user = task.users.find((user)=> user._id == userId);

      if(user) {
        if(task) {
          var date = new Date().getTime();
          console.log({ text: text, userId: userId, createdAt: date });
          task.messages.push({ text: text, userId: userId, createdAt: date });
          task.save();
          res.send({ success: 'updated' });
        } else {
          res.status(400).send( { error: 'task not found' });
        }
      } else {
        res.status(403).send({ error: 'forbiden' });
      }
    });

  } else {
    res.status(403).send({ error: 'you are not sign in' });
  }
}