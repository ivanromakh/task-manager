var config = require('../config/config.js')
  , UUID = require('uuid')
  , User = require('../models/user')
  , mailer = require('../mail/mailer.js');


var message = mailer.message;

exports.postRegister = function (req, res){
  var name = req.body.name;
  var email = req.body.email;
  var username = req.body.username;
  var password = req.body.password;
  var password2 = req.body.password2;

  req.checkBody('name', "Enter your name").notEmpty();
  req.checkBody('email', 'Enter your email').notEmpty();
  req.checkBody('email', 'Email is not').isEmail();
  req.checkBody('username', "Enter login").notEmpty();
  req.checkBody('password', 'Enter password').notEmpty();
  req.checkBody('password2', 'Passwords did not match').equals(req.body.password);
  
  var errors = req.validationErrors();

  if(errors){ 
    res.render('users/register', {
      error:errors
    });
    return;
  }
  User.findOne({username: username}, function(err, user){
    if (err) throw err;
    if (user){
      res.render('users/register', { error: [{ msg: 'This login is already used' }] });
      return;
    }
    User.findOne({email: email}, function(err, userEmail){
      if (err) throw err;
      if (userEmail){
        res.render('users/register', { error: [{ msg: 'this email is already used' }] });
        return;
      }
      var id = UUID();
      var newUser = new User({
        name: name,
        email:email,
        username: username,
        password: password,
        confirmId: id,
        shopping: []
      });
      User.createUser(newUser, function(err, user){
        if(err) throw err;
      });
      message.to = email;
      message.html = '<p> You must go here <a href="'+ config.host +'/users/confirm/' + id + '"> to confirm your account </a></p>';
      
      mailer.transporter.sendMail(message, function(error, info){
          if (error) {
              return console.log(error);
          }
      });
      req.flash('success_msg', 'Now you are sign up, but you must check your post for activation link');
      res.redirect('/users/login');
    });
  });   
};