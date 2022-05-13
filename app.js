var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var itemRouter = require('./routes/item');
var tourRouter = require('./routes/tourRoutes');
var userRouter = require('./routes/userRoutes');
var timeLogRouter = require('./routes/timeLogRoutes');
var commonRouter = require('./routes/commonRouter');
var holidayCalendarRouter = require('./routes/holidayCalendarRouter');
const compression = require('compression');
const cors =  require('cors');
var authRouter = require('./routes/authRouter');
const AppError = require('./utils/appError');
var app = express();

app.use(express.json({ lmit: '10kb' }));
//app.use(compression);
app.use(cors());

app.options('*',cors());

// Each request will contain requested time
app.use((req, res, next) => {    
  
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");    

  console.log('received the request');  
  next(); // run next middleware in stack
  });  
  
  // Use api routes
  app.use('/api/v1/users', userRouter);
  app.use('/api/v1/tours', tourRouter);
  app.use('/api/v1/timeLogs', timeLogRouter);
  app.use('/api/v1/holidayCalendar', holidayCalendarRouter);
  // api route for common API like Country , Role , Permission , RolePermission
  app.use('/api/v1/common', commonRouter);
module.exports = app;