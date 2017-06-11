var server = require('../server.js').server;
var expect = require('Chai').expect;
var request = require('superagent');
var bcrypt = require('bcryptjs');

var User = require('../models/user');

var test_data = require('./test_data');
var test_user3 = test_data.test_user3  ;
var host = test_data.host;

describe('before-testing', function() {
  before(function () {
    server = server.listen(8000);
  });

  it('empty test', function (done) {
    done();
  });

  after(function () {
    server.close();
  });
});

describe('test-task-page', function() {
  var user;
  before(function () {
    server = server.listen(8000);
    user = request.agent();

    var salt = bcrypt.genSaltSync(1);
    var hash = bcrypt.hashSync(test_user3.password, salt);

    var newUser = new User({
      name: test_user3.name,
      email: test_user3.email,
      username: test_user3.username,
      password: hash,
      confirmId: '123',
      active: true
    });
    newUser.save();
  });

  it('test-task-access', function (done) {
    user.post(host + '/users/login')
    .field('username', test_user3.username)
    .field('password', test_user3.password)
    .end(function(err, res) {
      user.get(host + '/tasks')
      .end(function(err, res){
        expect(res.statusCode).to.equal(200);
        done();
      });
    });
  });

  it('test-task-create-and-delete', function (done) {
    user.post(host + '/users/login')
    .field('username', test_user3.username)
    .field('password', test_user3.password)
    .end(function(err, res) {
      user.post(host + '/create-task')
      .send({ title: 'test' })
      .end(function(err, res){
        expect(res.statusCode).to.equal(200);
        expect(res.body.success).to.equal('created');
        var taskId = res.body.taskId;
        user.post(host + '/delete-task')
        .send({ id: taskId })
        .end(function(err, res){
          expect(res.statusCode).to.equal(200);
          expect(res.body.success).to.equal('removed');
          done();
        });
      });
    });
  });

  after(function () {
    User.findOne({ email: test_user3.email }).remove().exec();
    server.close();
  });
});