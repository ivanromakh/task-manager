var express = require('express')
  , router = express()
  , passport = require('passport')

  , config = require('../../config/config.js')
  , register = require('./register')
  , User = require('../../models/user');


router.get('/', function(req, res){
  res.render('users/login', { username: null });
});

router.post('/',
  passport.authenticate('local.login', {
    successRedirect:'/', failureRedirect:'/users/login', failureFlash: true
  }),
  function(req, res) {
    res.redirect('users/login');
});

module.exports = router;