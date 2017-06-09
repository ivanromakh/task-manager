var Task = require('../../models/task')
  , User = require('../../models/user');

function getInvitationNum(invitation){
  return invitation.token == this.token; 
}

exports.acceptTask = function(req, res) {
  if(req.isAuthenticated()) {
  	var id = req.params.id;
  	var token = req.params.token;
    console.log('params: ', req.params);

  	Task.findOne({ _id: id}, function(err, task) {
      if (err) throw err;

      console.log(task);
      if(task) {
        var invitations = task.invitations;
        var intiveNum = invitations.findIndex(getInvitationNum, { token: token });
        console.log('num:', intiveNum);
        if(intiveNum >= 0) {
        	console.log('userInviteId:', invitations[intiveNum]._id);
        	task.users.push({ _id: invitations[intiveNum]._id });
        	task.invitations.splice(intiveNum, 1);
        	task.save();
        	res.status(200).send({ success: 'success' });
        } else {
          res.status(403).send({error: 'token is not found'});
        }

      } else {
      	res.status(403).send({error: 'task not found'});
      }
   	});
  } else {
    res.status(403).send({ error: 'You are not sign in' });
  }
};