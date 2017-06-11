var socket = io();

$(document).ready(function() {
        
  var userId = $('#update-task').attr('userId');
  var taskId = $('#invite-email').attr('taskId');

  socket.emit("send-task-id", {
    taskId: taskId
  });

  socket.emit("send-user-id", {
    userId: userId
  });

  socket.on('invite-error', function(msg) {
    $('#invite-danger').html(msg.error);
    $('#invite-danger').css('display', 'block');
  });

  socket.on('reload-page', function(msg) {
    window.location.reload();
  });

  $('#update-task').click(function() {
    var text = $('#task-input-box').val();
    var taskId = $('#update-task').attr('taskId');

    if(text) {
      socket.emit('update-task', { 
        text: text,
        taskId: taskId,
        userId: userId
      });
    }
  });
});

function inviteUser() {
  var taskId = $('#invite-email').attr('taskId');
  var email = $('#invite-email').val();
    
  socket.emit('invite-user', {
    taskId: taskId,
    email: email
  });
}      