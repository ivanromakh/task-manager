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
  , cookieParser = require("cookie-parser")
  , LocalStrategy = require('passport-local').Strategy
  , ejs = require('ejs')
  , fileUpload = require('express-fileupload')
  , http = require('http').Server(app)
  , io = require('socket.io')(http)
  
  , auth = require('./routes/auth')
  , users = require("./routes/users")
  , routes = require('./routes/routes')
  // this file have only auth tokens and ip address 
  // so this is not present in github
  , config = require('./config/config');

var Task = require('./models/task');
var User = require('./models/user');
  
var onConnect = require('./socket/socket_connect');
require('./config/passport.js');

mongoose.connect(config.db_url);
var db = mongoose.connection;

// All environments
app.set("views", __dirname + "/views/pages");
app.set("users", __dirname + "/views/users")

app.set("view engine", "ejs");
app.engine('jsx', require('express-react-views').createEngine());

app.use(bodyParser({limit: '20mb'}));
app.use(fileUpload());
app.use(cookieParser("61d333a8-6325-4506-96e7-a180035cc26f"));

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

io.on('connection', function(socket){
  socket.on('update-task', function(msg){
    console.log();
    var userId = msg.userId;
    var taskId = msg.taskId;
    var text = msg.text;

    Task.findOne({_id: taskId}, function(err, task) {
      var date = new Date().getTime();
      task.messages.push({ text: text, userId: userId, createdAt: date});
      task.save();

      User.findOne({ _id: userId }, function(err, user) {
        console.log('user-write', user);
        io.sockets.emit('reload-page');
      });
    });
  });

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

http.listen(config.port, config.ipaddress);

exports.app = app;
