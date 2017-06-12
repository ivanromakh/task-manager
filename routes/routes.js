var express = require('express')
  , router = express.Router()

  , activeTask = require("./tasks/activeTask")
  , createTask = require("./tasks/createTask")
  , deleteTask = require("./tasks/deleteTask")
  , changeStatus = require("./tasks/changeStatus")
  , inviteUser = require("./tasks/inviteUser")
  , updateTask = require("./tasks/updateTask")
  , tasks = require("./tasks/tasks");

// ajax
router.use("/active-task", activeTask.activeTask);
router.use("/invite-user", inviteUser.inviteUser);
router.use("/delete-task", deleteTask.deleteTask);
router.use("/create-task", createTask.createTask);
router.use("/update-task", updateTask.updateTask);
router.use("/change-status", changeStatus.setStatus);

router.use("/tasks", tasks.tasks);

router.use("/", tasks.main);

module.exports = router;