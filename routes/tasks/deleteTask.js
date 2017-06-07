var Task = require('../../models/task');


exports.deleteTask = function(req, res) {
  if(req.isAuthenticated()) {
    var id = req.body.id;
    var userTasks = req.user.tasks;

    var isThisUserTask = userTasks.find(function(task) {
      if(task._id == id)
        return true;
    });
    

    if (isThisUserTask) {
      Task.remove({ _id: id }, function(err){
      	if (err) throw err;
      	res.send({ success: 'removed' });
      });
    }
  } else {
    res.send('You are not sign in');
  }
}