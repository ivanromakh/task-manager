var express = require('express')
  , router = express()
  , passport = require('passport')

  , config = require('../../config/config.js')
  , LocalStrategy = require('passport-local').Strategy
  , register = require('./register')
  , login = require('./login')
  , profile = require('./profile')
  , User = require('../../models/user');


router.use('/register', register);
router.use('/login', login);
router.use('/profile', profile);

passport.use('local.signup', new LocalStrategy(function(){ return; }));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});

router.get('/logout', function(req, res){
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.clearCookie("user");
  res.redirect('/users/login');
});

router.get('/confirm/:id', function(req, res) {
  User.findOne({confirmId: req.params.id}, function(err, user) {
    if(!err && user) {
      user.active = true;
      user.save();
      res.redirect('../login');
    } else {
      res.send("This is a some site");
    }
  });
});

module.exports = router;