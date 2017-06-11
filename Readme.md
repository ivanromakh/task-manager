Task manager
===================
 This is a simple task manager. Where users can register with google and make some tasks. Shares this tasks to each other and write some notations in it. 

##  About project structure ##

 ### Routes ###
    /routes                  - all routes on server side
    /routes/tasks/*          - all routes which connected to tasks
    /routes/routes.js        - router which devide routes
    /routes/auth             - all auth routes
    /routes/users            - routes for login and profile page
    /routes/register         - routes for register page
    /routes/tasks/activeTask - set in user activeTask in which user is able to write something task must be accepted or created by user
    /routes/tasks/createTask - creation task which can be viewed only by user which created task
    /routes/tasks/deleteTask - remove task data from tasks and user
    /routes/tasks/tasks      - render the main page where you can see list of tasks and write something and invite users

 ### Models ###
This is a mongoose models for database rules. So this models say which fields are allowed in my collection and what type it must be.

    /models/tasks - this is for task
    /models/users - this is for user

 ### Other back-end ###
    /socket/socket_connect - this is something difficult. I create some groups of sockets. At first, each user has room, the name of room is user id. So I can update user page on my wish. Also I create room for each task and it looks like a chat so now this is easy.

 ### Front-end ###
 I used ejs templates. all front-end things are in the /public and /views folders.

    views/            - here is some pages and components for them
    views/pages/main  - this is a basic page with nav-bar. this is empty
    views/users       - this is pages for user: login, register and profile pages.
    views/partials    - this is components which I used in some pages
    views/chat_box    - I loaded in from opensouse project and use for free but change a little. This is a chat where users write something in task
    views/invite_form - this is a part which are hiden for the time when it will be used for inviting users to the task which is active now in the current user
    views/nav-bar     - this is a standart boostrap nav-bar
    views/head        - this is links which every page must have.

## Used modules ##
    bcryptjs      - this is for password encryption
    body-parser   - this is for parsing data from ajax reguests
    chai          - for tests
    connect-flash - this is for messages
    cookie-parser - this is for cookies
    ejs           - used ejs templates for rendering pages
    express       - server-side framework which I used in this project
    express-fileupload - this is for files uploades. Used for changing profile image.
    express-session    - this is for cookies
    express-validator  - validate some filds like email.
    formidable         - 
    mocha              - for tests
    mongoose           - for database
    nodemailer         - for sending emails
    passport           - for authorization
    passport-facebook  - for facebook authorization
    passport-google-oauth2 - for google authorization
    passport-instagram     - for instagram authorization
    passport-local         - for registration and then authorization
    passport-twitter       - for twitter authorization
    socket.io              - for reloading pages on task shares
    superagent             - for tests

## Install instraction ##

    npm install
    mkdir config
    echo > config/auth.js
    echo > config/mailer.js

mailer.js must have the next content:
```
const nodemailer = require('nodemailer');

// create reusable transporter object using the default SMTP transport
exports.transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'user use gmail adress',
        pass: 'user password'
    }
});

exports.message = {
}; 

```
auth.js must have the next content:
```
var config = require('../config.js');

module.exports = {
  facebookAuth: {
    clientID: '',
    clientSecret: '',
    callbackURL: config.host + '/auth/facebook/callback',
    profileFields: ['id', 'displayName', 'photos', 'email']
  },
  google: {
    clientID: '',
    clientSecret: '',
    callbackURL: config.host + "/auth/google/callback"
  },
  twitter: {
    consumerKey     : '',
        consumerSecret  : '',
        callbackURL     :  config.host + '/auth/twitter/callback'
  },
  instagram: {
    clientID: '',
      clientSecret: '',
      callbackURL: config.host + "/auth/instagram/callback"
  }
}
```

    node server.js


## Testing ##
I used mocha package so if you wanna to test it you should install in global
    npm install --global mocha
then just run next command and testing will start
    mocha