var express = require('express')
  , router = express.Router()

  , activeTask = require("./tasks/activeTask")
  , createTask = require("./tasks/createTask")
  , deleteTask = require("./tasks/deleteTask")
  , changeStatus = require("./tasks/changeStatus")
  , tasks = require("./tasks/tasks");

// ajax
router.use("/active-task", activeTask.activeTask);
router.use("/delete-task", deleteTask.deleteTask);
router.use("/create-task", createTask.createTask);
//router.use("/change-status", changeStatus.setStatus);

router.use("/tasks", tasks.tasks);

router.use("/", tasks.main);

module.exports = router;