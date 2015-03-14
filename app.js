
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var swig = require('swig');
var dbg = require('./dbg.js');
var sassMiddleware = require('node-sass-middleware');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();
app.engine('html', swig.renderFile);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(sassMiddleware({
    src: path.join(__dirname, "assets"),
    dest: path.join(__dirname, 'public'),
    debug: true,
    outputStyle: 'compressed',
    // prefix:  '/stylesheets'
}));
app.use(express.static(path.join(__dirname, 'public')));

// The first argument to .use is for accsing /bower_components via URL
// It's second mentioning in the express.static method designates the folder to search in
app.use('/bower_components', express.static(path.join(__dirname, 'bower_components')));

// This statement mounts the router at ROOT ('/');
app.use('/', dbg, routes);
// app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  swig.setDefaults({ cache: false });
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
