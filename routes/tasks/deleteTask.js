var Task = require('../../models/task')
  , User = require('../../models/user');


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
        User.findOne({ username: req.user.username }, function(err, user) {
          if (err) throw err;
        
          var index = user.tasks.findIndex(function(task) {
            if(task._id == id) {
              return true;
            }
          });

          if(index != -1) {
            user.tasks.splice(index, 1);
            user.save();
            res.send({ success: 'removed' });
          }
        });
      });
    } else {
      res.send({ error: 'task is not found' });
    }
  } else {
    res.send({ error: 'you are not sign in' });
  }
}