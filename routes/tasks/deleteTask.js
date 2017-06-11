var Task = require('../../models/task')
  , User = require('../../models/user');


exports.deleteTask = function(req, res) {
  if(req.isAuthenticated()) {
    var id = req.body.id;
    var userTasks = req.user.tasks;
    console.log(req.user);
    console.log(id, userTasks);
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

          console.log(index);

          if(index != -1) {
            user.tasks.splice(index, 1);
            user.save();
            console.log('index',index);

            res.send({ success: 'removed' });
          }
        });
      });
    } else {
      res.send('Task is not found');
      console.log('Task is not found');
    }
  } else {
    res.send('You are not sign in');
  }
}