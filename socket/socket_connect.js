var Task = require('../models/task');
var User = require('../models/user');

function getUserIndex(user) {
  return user._id == this.userId;
}

exports = module.exports = function(io){
  io.sockets.on('connection', function (socket) {
    
    socket.on("send-user-id", function(msg) {
      var userId = msg.userId;
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
          User.findOne({ email: userEmail }, function(err, user) {
            if(err) throw err;

            if(user) {
              if(user.active) {
                var userIndex = task.users.findIndex(getUserIndex, { userId: user._id });
                if(userIndex >= 0) {
                  socket.emit("invite-error", {
                    error: 'User already have access to this task'
                  });
                  return;
                }
                task.users.push({ _id: user._id });
                task.save();
                // reload groups 
                io.to(task._id).emit('reload-page');
                // reload user which is invited
                io.to(user._id).emit('reload-page');
              } else {
                socket.emit("invite-error", {
                  error: 'You can`t invite user whom is not active'
                });
              } 
            } else {
              socket.emit("invite-error", {
                error: 'User is not found'
              });
            }
          });
        } else {
          socket.emit("invite-error", {
            error: 'Task is not found'
          });
        }
      });
    });

    socket.on('update-task', function(msg){
      var userId = msg.userId;
      var taskId = msg.taskId;
      var text = msg.text;

      Task.findOne({ _id: taskId }, function(err, task) {
        var date = new Date().getTime();
        task.messages.push({ text: text, userId: userId, createdAt: date });
        task.save();

        User.findOne({ _id: userId }, function(err, user) {
          io.sockets.emit('reload-page');
        });
      });
    });

    socket.on('disconnect', function(){
      console.log('user disconnected');
    });
  });
}