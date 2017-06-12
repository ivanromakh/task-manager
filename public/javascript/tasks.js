var hostname = window.location.hostname + ':' + window.location.port;

function showForm(obj) {
  var x = document.getElementById('create-task-form');
  var isFormDisplay = $('#create-task-form').css('display');
  isFormDisplay == 'none'
    ? $('#create-task-form').css('display', 'block')
    : $('#create-task-form').css('display', 'none');
}

function showTask(obj) {
  var id = $(obj).parent().parent().attr("taskId");

  if(id) {
    $.post("/active-task", {
      id: id,
    })
    .done(function(data) {
      window.location.reload();
    });
  }
}

function deleteTask(obj) {
  var id = $(obj).parent().parent().attr("taskId");

  if(id) {
    $.post("/delete-task", {
      id: id,
    })
    .done(function(data) {
      if(data.error) {
        $("#alert-danger").css('display', 'inline');
        $("#alert-danger").html(data.error);
      } else {
        window.location.reload();
      }
    });
  }
}

function createTask() {
  if($('#input-task-name').val()) {
    $.post("/create-task", {
      title: $('#input-task-name').val(),
    })
    .done(function(data) {
      if(data.error) {
        $("#alert-danger").css('display', 'inline');
        $("#alert-danger").html(data.error);
      } else {
        window.location.reload();
      }
    });
  };
}

function showIviteForm(obj) {
  $('body').fadeIn(500);
  $('.invite-form').css('display', 'block');
  $('#overlay-top, #overlay-left').fadeIn(500);
}

function canselInvite() {
  $('.invite-form').css('display', 'none');
}


