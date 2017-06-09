var Task = require('../../models/task')
  , User = require('../../models/user');

exports.acceptTask = function(req, res) {
  if(req.isAuthenticated()) {
    User.findOne({ username: req.user.username }, function(err, user) {
      if(user && user.active) {
        user.activeTask = req.body.id;
        user.save();
        res.send({ success: 'updated' });
      } else {
        res.status(403).send({ error: 'Your account is not activated' });
      }
    });
  } else {
    res.status(403).send({ error: 'You are not sign in' });
  }
};