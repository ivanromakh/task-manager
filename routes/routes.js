var express = require('express')
  , router = express.Router()
  , tasks = require("./tasks");

// main
router.use("/", sendUserName, tasks.main);

function sendUserName(req, res, next){
  if(req.isAuthenticated()){
    res.cookie('user', req.user.username);
  }
  next();
}

module.exports = router;