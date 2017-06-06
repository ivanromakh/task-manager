var express = require('express')
    , router = express.Router()
	, passport = require('passport');

// All auth methods
router.get('/facebook/callback',
  passport.authenticate('facebook', 
    {successRedirect: '/', failureRedirect: '/users/login'}
));

router.get('/facebook', passport.authenticate('facebook', { scope: [] }));

router.get('/google', passport.authenticate('google', { scope: [
       'https://www.googleapis.com/auth/plus.login',
       'https://www.googleapis.com/auth/plus.profile.emails.read']
}));

router.get('/google/callback', passport.authenticate( 'google', 
    { successRedirect: '/', failureRedirect: '/login' }
));

router.get('/twitter', passport.authenticate('twitter'));

router.get( '/twitter/callback', passport.authenticate( 'twitter', 
    { successRedirect: '/', failureRedirect: '/login' }
));

router.get('/instagram', passport.authenticate('instagram'));

router.get( '/instagram/callback', passport.authenticate( 'instagram', 
    { successRedirect: '/', failureRedirect: '/login' }
));

module.exports = router;