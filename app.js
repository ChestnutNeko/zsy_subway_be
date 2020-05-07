var createError = require('http-errors');
var express = require('express');
const bodyParser = require('body-parser');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors");
var log4js = require('log4js');
var logger = log4js.getLogger('app');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
log4js.configure({
  appenders: [
    { type: 'console', category: 'app' }
  ]
});
logger.setLevel('INFO'); // 级别 > INFO 的日志才会被打印
app.use( log4js.connectLogger(logger) ); 
app.use(function(req, res, next){
  res.send('ok');
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// 静态资源
app.use(express.static(path.join(__dirname, 'public')));
// post请求
app.use(bodyParser.urlencoded({extended: true}));
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

//设置跨域访问
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost"); //*表示允许的域名地址，本地则为'http://localhost' 
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By",' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});

module.exports = app;
