var Task = require('../../models/task')
  , User = require('../../models/user');

exports.setStatus = function(req, res) {
  console.log(1232);
  if(req.isAuthenticated()) {
  	var taskId = req.body.id;
    var status = req.body.status;
    var userId = req.user._id;

    Task.findOne({ _id: taskId, 'users._id': userId }, function(err, task){
      if(task) {
        task.status = status;
        task.save();
        res.send({ success: 'status changed' });
      } else {
      	res.status(403).send({ error: 'Task is not found' });
      }
    });
  } else {
    res.status(403).send({ error: 'You are not sign in' });
  }
};