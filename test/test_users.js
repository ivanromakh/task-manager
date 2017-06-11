var server = require('../server.js').server;
var expect = require('Chai').expect;
var request = require('superagent');

var User = require('../models/user');

var test_data = require('./test_data');
var test_user = test_data.test_user1;
var test_user2 = test_data.test_user2;
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

describe('test-all-pages-access', function() {
  var user;

  before(function () {
    server = server.listen(8000);
    user = request.agent();
  });

  it('main page access', function (done) {
    user.get(host)
    .end(function (err, res){
    expect(res.statusCode).to.equal(200);
    done();
    });
  });

  it('login page access', function (done) {
    user.get(host + '/users/login')
    .end(function (err, res){
    expect(res.statusCode).to.equal(200);
    done();
    });
  });

  it('register page access', function (done) {
    user.get(host + '/users/register')
    .end(function (err, res){
    expect(res.statusCode).to.equal(200);
    done();
    });
  });

  it('task page access', function (done) {
    user.get(host + '/tasks')
    .end(function (err, res){
    expect(res.statusCode).to.equal(403);
    done();
    });
  });

  after(function () {
    server.close();
  });
});

describe('test-register-page', function() {
  var user;
  before(function () {
    server = server.listen(8000);
    user = request.agent();
  });

  it('without-some-fields', function (done) {
    user.post(host + '/users/register')
      .send({
        "username":"tes2t", 
        "name": "test", 
        "email": "",
        "password": "123123",
        "password2": "123123"
      })
      .end(function(err,res){
      	expect(res.statusCode).to.equal(400);
      });

    user.post(host + '/users/register')
      .send({
        "username":"tes2t",
        "name": "test",
        "password": "123123",
        "password2": "123123"
      })
      .end(function(err,res){
        expect(res.statusCode).to.equal(400);
      });

    user.post(host + '/users/register')
      .send({
        "name": "test",
        "email": "test@i.ua",
        "password": "123123",
        "password2": "123123"
      })
      .end(function(err,res){
        expect(res.statusCode).to.equal(400);
      });

    user.post(host + '/users/register')
      .send({
        "name": "test",
        "email": "test@i.ua",
        "password": "123123",
        "password2": "123123"
      })
      .end(function(err,res){
        expect(res.statusCode).to.equal(400);
      });
    done();
  });

  it('test-create-user', function (done) {
    request.post(host + '/users/register')
      .send(test_user)
      .end(function(err,res){
      	expect(res.statusCode).to.equal(200);
        User.findOne({ email: test_user.email }).remove().exec();
        done();
      });  
  });

  after(function () {
    User.findOne({ email: test_user.email }).remove().exec();
    server.close();
  });
});

describe('test-login-page', function() {
  var user;
  before(function () {
    server = server.listen(8000);
    user = request.agent();

    var newUser = new User({
      name: test_user2.name,
      email: test_user2.email,
      username: test_user2.username,
      password: test_user2.password,
      confirmId: '123',
    });

    User.createUser(newUser);
  });

  it('login-without-email', function (done) {
    user.post(host + '/users/login')
    .send(test_user2)
    .end(function(err,res){
      request.get(host + '/tasks')
      .end(function(err,res){
        expect(res.statusCode).to.equal(403);
        done();
      });
    });
  });

  it('not-activated-user', function (done) {
    user.post(host + '/users/login')
    .field('username', test_user2.username)
    .field('password', test_user2.password)
    .end(function(err,res){
      expect(res.statusCode).to.equal(200);
      user.get(host + '/tasks')
      .end(function(err,res){
        expect(res.statusCode).to.equal(403);
        done();
      });
    });
  });

  it('login-success', function (done) {
    User.findOne({ email: test_user2.email}, function(err, db_user){
      db_user.active = true;
      db_user.save();
      user.post(host + '/users/login')
      .field('username', test_user2.username)
      .field('password', test_user2.password)
      .end(function(err, res){
        expect(res.statusCode).to.equal(200);
        user.get(host + '/tasks')
        .end(function(err, res){
          expect(res.statusCode).to.equal(200);
          done();
        });
      });
    });
  });

  after(function () {
    User.findOne({ email: test_user2.email }).remove().exec();
    server.close();
  });
});