var express = require('express')
    , router = express()
    , passport = require('passport')
    , formidable = require('formidable')
    , fs = require('fs')

    , config = require('../config/config.js')
    , LocalStrategy = require('passport-local').Strategy
    , register = require('./register')
    , User = require('../models/user');


router.get('/login', function(req, res){
  res.render('users/login');
});

router.get('/profile', function(req, res){
  if(req.isAuthenticated()){
    User.findOne({ username :req.user.username }, function(err, user){
      res.render('users/profile', {
        user: user
      });
    });
  }
  else{
    res.redirect('login');
  }
});

router.post('/profile', function(req, res){
  if(req.isAuthenticated()){
    User.findOne({ username: req.user.username }, function(err, user){
      let image = req.files.image;
      if(image){
        var imageDir = __dirname + '/../public/images/users/'+ user.username;
        if (!fs.existsSync(imageDir)){
            fs.mkdirSync(imageDir);
        }
        imageDir += '/' + image.name;
        image.mv(imageDir);
        if(user.image){
          fs.unlink(__dirname + '/../public' + user.image.replace( config.host, ''));
        }
        user.image = config.host + '/images/users/' + user.username + '/' + image.name;
        user.save();
      }
      res.render('users/profile', {
        user: user
      });
    });
  }
});

router.post('/login',
  passport.authenticate('local.login', {
    successRedirect:'/', failureRedirect:'/users/login',failureFlash: true
  }),
  function(req, res) {
    res.redirect('users/login');
});

router.get('/register', function(req, res){
  res.render('users/register');
});

router.post('/register', register.postRegister);

passport.use('local.signup', new LocalStrategy(
  function(username, email, password, done) {
    console.log('User sign in: ', username);
}));

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

router.get('/confirm/:id', function(req, res){
  User.findOne({confirmId: req.params.id}, function(err, user){
    if(!err && user){
      user.active = true;
      console.log(user);
      user.save();
      console.log('User ', user.username, ' activated');
      res.redirect('../login');
    }
    else{
      res.send("This is a some site");
    }
  });
});

module.exports = router;