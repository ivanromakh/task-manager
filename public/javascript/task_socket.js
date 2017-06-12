var socket = io();

$(document).ready(function(){
  $('.user-image').hover(function() {
    var userName = $(this).attr('userName');
    console.log(userName);
    $('#hover-user-data').html(userName).css('display', 'block');
  }, function() {
    $('#hover-user-data').css('display', 'none');
  });

  $('#task-status-change li a').click(function() {
    var taskId = $('#invite-email').attr('taskId'); 
    var status = $(this).attr('status');
    
    console.log(taskId, status);

    $.post("/change-status", {
      id: taskId, status: status
    })
    .done(function(data) {
      if (data.error) {

      } else {
        window.location.reload();
      }
    });
  });
});

$(document).ready(function() {
        
  var userId = $('#create-task-form').attr('userId');
  var taskId = $('#invite-email').attr('taskId');
  console.log('ready');
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
      $.post("/update-task", {
        text: text,
        taskId: taskId,
        userId: userId
      })
      .done(function(data) {
        socket.emit('update-task', {
          taskId: taskId,
          userId: userId
        });
      });
    }
  });
});

function inviteUser() {
  var email = $('#invite-email').val();
  var taskId = $('#invite-email').attr('taskId');
  console.log(taskId, email);

  $.post("/invite-user", {
    taskId: taskId,
    email: email
  })
  .done(function(data) {
    if(data.error) {
      $('#invite-danger').html(data.error);
      $('#invite-danger').css('display', 'block');
    }
    if(data.success) {
      console.log(taskId, email);
      $('.invite-form').css('display', 'none');
      socket.emit('invite-user', {
        taskId: taskId,
        email: email
      });
    }
  });
}