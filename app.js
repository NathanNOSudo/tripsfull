var createError = require('http-errors');
var express = require('express');
var hash = require('pbkdf2-password')();
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
// const { delete } = require('./routes/index');
const { resolveSoa } = require('dns');

var app = express();

// view engine setup and middleware
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// setup local server in development and specify which start 
// script we are using, in this case dev...
// see package.json start scripts for refference.
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(session({
  resave: false, // Do not save session if unmodified
  saveUninitialized: false, // Do not create session until stored
  secret: 'the very very sneaky man' 
}));

// Set up a session-persisted message middleware
app.use(function(req, res, next){
  var err = req.session.error;
  var msg = req.session.success;
  delete req.session.error;
  delete req.session.success;
  res.locals.message = '';
  if (err) res.locals.message = '<p class="msg error">' + err + '</p>';
  if (msg) res.locals.message = '<p class="msg success">' + msg + '</p>';
  next();
})

//set up a dummy database of users
var users = {
  weezy: { name: 'tj' }
};

//When a user is created, generate a salt
//and hash the passwd ('iRstrong' is the passwd here)

hash({passwd: 'iRstrong'}, function (err, pass, salt, hash){
  if (err) throw err;
  //store the salt and hash in the "db"
  users.weezy.salt = salt;
  users.weezy.hash = hash;
});


app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// set up a if statement to console log that development
// server is up and running on specified port
if (app.use(logger('dev'))) {
  // app.listen(3000);
  console.log('Development server started successfully and is running on port 3000')
}

module.exports = app;
