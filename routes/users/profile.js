var express = require('express')
  , router = express()
  , fs = require('fs')

  , config = require('../../config/config.js')
  , register = require('./register')
  , User = require('../../models/user');


router.get('/', function(req, res){
  if(req.isAuthenticated()){
    User.findOne({ username : req.user.username }, function(err, user) {
      res.render('users/profile', {
        user: user,
        username: user.username
      });
    });
  } else {
    res.redirect('login');
  }
});

router.post('/', function(req, res){
  if(req.isAuthenticated()){
    User.findOne({ username: req.user.username }, function(err, user) {
      let image = req.files.image;
      if(image) {
        var imageDir = __dirname + '/../../public/images/users/'+ user.username;
        if (!fs.existsSync(imageDir)) {
            fs.mkdirSync(imageDir);
        }
        imageDir += '/' + image.name;
        image.mv(imageDir);
        if(user.image) {
          fs.unlink(__dirname + '/../../public' + user.image.replace( config.host, ''));
        }
        user.image = config.host + '/images/users/' + user.username + '/' + image.name;
        user.save();
      }
      res.render('users/profile', {
        user: user,
        username: user.username
      });
    });
  }
});

module.exports = router;