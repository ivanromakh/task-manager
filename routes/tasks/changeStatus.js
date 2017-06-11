var Task = require('../../models/task')
  , User = require('../../models/user');

exports.setStatus = function(req, res) {
  if(req.isAuthenticated()) {
    if(user && user.active) {
      var taskId = req.body.id;
      var status = req.body.status;

      Task.findOne({ _id: taskId }, function(err, task){
        if(task) {
          console.log(task);
        } else {
        	res.status(403).send({ error: 'Task is not found' });
        }
        console.log(task);
      });
    } else {
      res.status(403).send({ error: 'Your account is not activated' });
    }
  } else {
    res.status(403).send({ error: 'You are not sign in' });
  }
};