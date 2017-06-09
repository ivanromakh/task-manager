var app = require('../server.js');
var expect = require('Chai').expect;

var request = require('superagent');
var server;

describe('non-authorized-user', function() {
  before(function () {
    server = app.listen(8000);
  });

  it('main page access', function (done) {
    request.get('http://localhost:8000', function (err, res, body){
    expect(res.statusCode).to.equal(200);
    done();
    });
  });

  it('tasks page access', function (done) {
    request.get('http://localhost:8000/tasks', function (err, res, body){
    expect(res.statusCode).to.equal(403);
    done();
    });
  });

  it('task info page access', function (done) {
    request.get('http://localhost:8000/tasks/123', function (err, res, body){
    expect(res.statusCode).to.equal(403);
    done();
    });
  });

  after(function () {
    server.close();
  });
});

describe('test-register-page', function() {
  before(function () {
    server = app.listen(8000);
    //create user

  });

  it('without-some-fields', function (done) {
    request.post('http://localhost:8000/users/register')
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

    request.post('http://localhost:8000/users/register')
      .send({
        "username":"tes2t",
        "name": "test",
        "password": "123123",
        "password2": "123123"
      })
      .end(function(err,res){
        expect(res.statusCode).to.equal(400);
      });

    request.post('http://localhost:8000/users/register')
      .send({
        "name": "test",
        "email": "test@i.ua",
        "password": "123123",
        "password2": "123123"
      })
      .end(function(err,res){
        expect(res.statusCode).to.equal(400);
      });

    request.post('http://localhost:8000/users/register')
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

  it('create-test-user', function (done) {
    request.post('http://localhost:8000/users/register')
      .send({
        "username":"tes2t", 
        "name": "test", 
        "email": "test@i.ua",
        "password": "123123",
        "password2": "123123"
      })
      .end(function(err,res){
      	expect(res.statusCode).to.equal(400);
        done();
      });  
  });

  after(function () {
    server.close();
  });
});

describe('test-login-page', function() {
  console.log('');
});
