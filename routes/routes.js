var express = require('express')
  , router = express.Router()

  , activeTask = require("./tasks/activeTask")
  , createTask = require("./tasks/createTask")
  , deleteTask = require("./tasks/deleteTask")
  , inviteUser = require("./tasks/inviteUser")
  , acceptTask = require("./tasks/acceptTask")
  , tasks = require("./tasks/tasks");

// ajax
router.use("/invite-user", inviteUser.inviteUser);
router.use("/active-task", activeTask.activeTask);
router.use("/delete-task", deleteTask.deleteTask);
router.use("/create-task", createTask.createTask);

router.user("/tasks/accept/:id/:token", acceptTask.acceptTask);
router.use("/tasks", tasks.tasks);

router.use("/", tasks.main);

module.exports = router;