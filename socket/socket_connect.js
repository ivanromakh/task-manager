var Task = require('../models/task');
var User = require('../models/user');

function getUserIndex(user) {
  return user._id == this.userId;
}

exports = module.exports = function(io){
  io.sockets.on('connection', function (socket) {
    
    socket.on("send-user-id", function(msg) {
      var userId = msg.userId;
      console.log('userIDjoin', msg.userId);
      socket.join(userId);
    });

    socket.on("send-task-id", function(msg){
      var taskId = msg.taskId;
      socket.join(taskId);
    });

    socket.on("invite-user", function(msg) {
      var taskId = msg.taskId;
      var userEmail = msg.email;

      Task.findOne({ _id: taskId }, function(err, task) {
        if(err) throw err;
        
        if(task) {
          console.log('taskFinded');
          User.findOne({ email: userEmail }, function(err, user) {
            if(err) throw err;

            if(user && user.active) {
              console.log('userFinded', user._id);
              io.to(task._id).emit('reload-page');
              io.to(user._id).emit('reload-page');
            } 
          });
        }
      });
    });

    socket.on('update-task', function(msg){
      var userId = msg.userId;
      var taskId = msg.taskId;

      User.findOne({ _id: userId }, function(err, user) {
        io.to(taskId).emit('reload-page');
      });
    });

    socket.on('disconnect', function(){
      console.log('user disconnected');
    });
  });
}