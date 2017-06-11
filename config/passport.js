var passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy
    , FacebookStrategy = require('passport-facebook')
    , GoogleStrategy   = require( 'passport-google-oauth2' ).Strategy
    , TwitterStrategy  = require('passport-twitter').Strategy
    , InstagramStrategy = require('passport-instagram').Strategy

    , User = require('../models/user')
    , configAuth = require('./auth/auth.js');


passport.use('local.login', new LocalStrategy(
  function(username, password, done) {
    User.getUserByUsername(username, function(err, user){
    if(err) throw err;
    if(!user){
      return done(null, false, {message: 'Unknown User'});
    }
    User.comparePassword(password, user.password, function(err, isMatch){
      if(err) throw err;
      if(isMatch){
        if(user.active){
          return done(null, user);
        }
        else{
          return done(null, false, {message: 'Account is not active'});
        }
      } else {
        return done(null, false, {message: 'Invalid password'});
      }
    });
   });
  })
);

passport.use(new GoogleStrategy(configAuth.google,
  function(accessToken, refreshToken, profile, done) {
    process.nextTick(function(){
      User.findOne({'google.id': profile.id}, function(err, user){
        if(err) return done(err);
        if(user) return done(null, user);
        else {
          var newUser = new User();
          newUser.google.id = profile.id;
          newUser.google.token = accessToken;
          newUser.name = newUser.email = newUser.username = newUser.google.name = profile.email;
          newUser.active = true;
          newUser.save(function(err){
            if(err) throw err;
            return done(null, newUser);
          })
        }
      });
    });
  }
));

passport.use(new InstagramStrategy(configAuth.instagram,
  function(accessToken, refreshToken, profile, done) {
    process.nextTick(function(){
      User.findOne({'instagram.id': profile.id}, function(err, user){
        if(err) return done(err);
        if(user) return done(null, user);
        else {
          var newUser = new User();
          newUser.instagram.id = profile.id;
          newUser.instagram.token = accessToken;
          newUser.name = newUser.username = newUser.instagram.name = profile.displayName;

          newUser.save(function(err){
            if(err) throw err;
            return done(null, newUser);
          })
        }
      });
    });
  }
));

passport.use(new FacebookStrategy(configAuth.facebookAuth,
  function(accessToken, refreshToken, profile, done) {
    process.nextTick(function(){
      User.findOne({'facebook.id': profile.id}, function(err, user){
        if(err) return done(err);
        if(user) return done(null, user);
        else {
          var newUser = new User();
          newUser.facebook.id = profile.id;
          newUser.facebook.token = accessToken;
          newUser.name = newUser.username = newUser.facebook.name = profile.displayName;
          newUser.save(function(err){
            if(err) throw err;
            return done(null, newUser);
          })
        }
      });
    });
  }
));

passport.use(new TwitterStrategy(configAuth.twitter,
  function(token, tokenSecret, profile, done) {
    process.nextTick(function() {
      User.findOne({ 'twitter.id' : profile.id }, function(err, user) {
        if (err) return done(err);
        if (user) return done(null, user);
        else {
          var newUser                 = new User();
          newUser.twitter.id          = profile.id;
          newUser.twitter.token       = token;
          newUser.username = newUser.twitter.username    = profile.username;
          newUser.twitter.displayName = profile.displayName;
          newUser.save(function(err) {
            if (err) throw err;
            return done(null, newUser);
          });
        }
      });
    });
  }
));