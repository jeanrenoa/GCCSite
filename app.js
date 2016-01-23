var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var mongodb = require('../gecko_cc/database');

var Schema = mongodb.mongoose.Schema;
var projectSchema = new Schema({
  project: String,
  total_Forum_Posts: Number,
  total_Forum_Posts_By_Internal_Tester: Number,
  total_download_Alpha1: Number,
  total_Project_Login: Number,
  total_download_Maestro_SP1_Beta1_x64: Number,
  total_download_Maestro_SP1_Beta1_x86: Number,
  total_download_Maestro_SP1_Beta2_x64: Number,
  total_download_Maestro_SP1_Beta2_x86: Number,
  total_Forum_Posts_Maestro_SP1_Beta1: Number,
  total_download_Nautilus_Alpha2_x64: Number,
  total_download_Nautilus_Alpha2_x86: Number,
  total_download_Nautilus_Beta1_x64: Number,
  total_download_Nautilus_Beta1_x86: Number,
  total_download_Nautilus_Beta2_x64: Number,
  total_download_Nautilus_Beta2_x86: Number,
  date: String,
  baseline: Boolean,
  Week: Number
});

var Project = mongodb.mongoose.model('Project', projectSchema);
var results_database; // result from queryDatabase

Project.find({}, function(err, res){
  if (err) throw err;

  results_database = res;
  if (results_database.length == 0) {
    console.log('debug', 'Nothing in database now.');
  }
  else {
    console.log('debug', 'The earliest document on: ' + res[0]["date"]);
  }
  console.log('debug', 'Database Query completes.');
});

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
  req.db = results_database[0];
  console.log('req:', req.db);
  next();
});

app.use('/', routes);
app.use('/users', users);

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
