var express = require('express')
  , router = express.Router()

  , taskInfo = require("./tasks/taskInfo")
  , createTask = require("./tasks/createTask")
  , deleteTask = require("./tasks/deleteTask")
  , tasks = require("./tasks/tasks");

router.use("/tasks/delete-task", deleteTask.deleteTask);
router.use("/tasks/create-task", createTask.createTask);
router.use("/tasks/:id", taskInfo.taskInfo);
router.use("/tasks", tasks.tasks);
router.use("/", tasks.main);


function sendUserName(req, res, next){
  if(req.isAuthenticated()){
    res.cookie('user', req.user.username);
  }
  next();
}

module.exports = router;