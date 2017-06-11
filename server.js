// Module dependencies.
var express = require("express")
  , app = express()
  , http = require('http').Server(app)
  , io = require('socket.io')(http)
  , flash = require('connect-flash')
  , session = require('express-session')
  , expressValidator = require('express-validator')
  , passport = require('passport')
  , mongoose = require('mongoose')
  , path    = require("path")
  , bodyParser = require("body-parser")
  , LocalStrategy = require('passport-local').Strategy
  , ejs = require('ejs')
  , fileUpload = require('express-fileupload')
  , socket = require('./socket/socket_connect')(io)
  
  , auth = require('./routes/auth')
  , users = require("./routes/users")
  , routes = require('./routes/routes')
  , config = require('./config/config');

var Task = require('./models/task');
var User = require('./models/user');
  
require('./config/passport.js');

mongoose.connect(config.db_url);
var db = mongoose.connection;

// All environments
app.set("views", __dirname + "/views/pages");
app.set("users", __dirname + "/views/users")

app.set("view engine", "ejs");

app.use(bodyParser());
app.use(fileUpload());

// Express Session
app.use(session({
    secret: 'fwelfwekgj;sldkjg;lwe',
    saveUninitialized: true,
    resave: true
}));

// Passport init
app.use(passport.initialize());
app.use(passport.session());

// Connect Flash
app.use(flash());

// Global Vars
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});

app.use(expressValidator());
app.use(express.static(path.join(__dirname, "public")));

// different authentification methods google, facebook, ...
app.use('/auth', auth);
app.use("/users", users);
app.use('/', routes);


exports.server = http;
var server = http.listen(config.port, config.ipaddress);

