var Task = require('../models/task');
var User = require('../models/user');


var onConnect = function(socket){
  console.log('a user connected');

  socket.on('update-task', function(msg){
    var userId = msg.userId;
    var taskId = msg.taskId;
    var text = msg.text;

    Task.findOne({_id: taskId}, function(err, task) {
      var date = new Date().getTime();
      task.messages.push({ text: text, userId: userId, createdAt: date});
      task.save();

      User.findOne({ _id: userId }, function(err, user) {
        console.log('user-write', user);
        socket.emit('reload-page', {
          user: user,
          text: text
        });
      });
    });
  });

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
};

module.exports = onConnect;