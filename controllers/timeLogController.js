const TimeLog = require('../models/timeLog');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError.js');

exports.addLog = catchAsync(async (req, res, next) => {
  
  const newTimeLog = await TimeLog.create({
    user: req.body.user,
    task:req.body.task,
    date :req.body.date,
    startTime: req.body.startTime,
    endTime:req.body.endTime
  });  
  console.log('time log created');
  res.status(200).json({
    status: 'success',
    data: {
      timeLog: newTimeLog
    }
  });  
});

exports.getTimeLogs = catchAsync(async (req, res, next) => {    
  const timeLogs = await TimeLog.find({}).where('user').equals(req.body.user).where('date').equals(req.body.date);  
  res.status(200).json({
    status: 'success',
    data: {
      timeLogs: timeLogs
    }
  });  
});


exports.getLog = catchAsync(async (req, res, next) => {  
  res.status(200).json({
    status: 'success',
    data: {
      timeLog: null
    }
  });
});