var express = require('express')
  , router = express.Router()

  , { activeTask } = require("./tasks/activeTask")
  , { createTask } = require("./tasks/createTask")
  , { deleteTask } = require("./tasks/deleteTask")
  , { setStatus } = require("./tasks/changeStatus")
  , { inviteUser } = require("./tasks/inviteUser")
  , { updateTask } = require("./tasks/updateTask")
  , tasks = require("./tasks/tasks");

// ajax
router.use("/active-task", activeTask);
router.use("/invite-user", inviteUser);
router.use("/delete-task", deleteTask);
router.use("/create-task", createTask);
router.use("/update-task", updateTask);
router.use("/change-status", setStatus);

router.use("/tasks", tasks.tasks);

router.use("/", tasks.main);

module.exports = router;