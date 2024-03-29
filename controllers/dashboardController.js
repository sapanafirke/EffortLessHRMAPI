const TimeLog = require('../models/timeLog');
const catchAsync = require('../utils/catchAsync');
const mongoose = require('mongoose');
const moment = require('moment'); 
const Task = require('../models/taskModel');
exports.getHoursWorked = catchAsync(async (req, res, next) => {
  const userId = req.query.userId;
  const date =   req.query.date;  

  const startOfDate = new Date(date);
  startOfDate.setHours(0, 0, 0, 0);
  const endOfDate = new Date(date);
  endOfDate.setHours(23, 59, 59, 999);

  const startOfPreviousDay = new Date(startOfDate);
  startOfPreviousDay.setDate(startOfPreviousDay.getDate() - 1);
  const endOfPreviousDay = new Date(endOfDate);
  endOfPreviousDay.setDate(endOfPreviousDay.getDate() - 1);

  const todayLogs = await TimeLog.aggregate([
    {
      $match: {
        user: mongoose.Types.ObjectId(userId),
        date: { $gte: startOfDate, $lte: endOfDate }
      }
    },
    {
      $group: {
        _id: '$user',
        totalTime: { $sum: { $subtract: ['$endTime', '$startTime'] } }
      }
    }
  ]);

  const previousDayLogs = await TimeLog.aggregate([
    {
      $match: {
        user: mongoose.Types.ObjectId(userId),
        date: { $gte: startOfPreviousDay, $lte: endOfPreviousDay }
      }
    },
    {
      $group: {
        _id: '$user',
        totalTime: { $sum: { $subtract: ['$endTime', '$startTime'] } }
      }
    }
  ]);

  const result = {
    today: todayLogs.length > 0 ? todayLogs[0].totalTime : 0,
    previousDay: previousDayLogs.length > 0 ? previousDayLogs[0].totalTime : 0
  };
    res.status(200).json({
        status: 'success',
        data: result
      });
});


exports.getWeeklySummary = catchAsync(async (req, res, next) => {        
    const userId = req.query.userId;
      const date = new Date(req.query.date);
      const currentWeekStartDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay());
      const currentWeekEndDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay() + 6);
      const previousWeekStartDate = new Date(currentWeekStartDate.getFullYear(), currentWeekStartDate.getMonth(), currentWeekStartDate.getDate() - 7);
      const previousWeekEndDate = new Date(currentWeekEndDate.getFullYear(), currentWeekEndDate.getMonth(), currentWeekEndDate.getDate() - 7);
      
      const currentWeekTimeLogs = await TimeLog.find({
        user: userId,
        date: { $gte: currentWeekStartDate, $lte: currentWeekEndDate }
      });
      const currentWeekTotalHours = currentWeekTimeLogs.reduce((total, timeLog) => total + ((timeLog.endTime - timeLog.startTime) / (1000 * 60 * 60)), 0);
      
      const previousWeekTimeLogs = await TimeLog.find({
        user: userId,
        date: { $gte: previousWeekStartDate, $lte: previousWeekEndDate }
      });
      const previousWeekTotalHours = previousWeekTimeLogs.reduce((total, timeLog) => total + ((timeLog.endTime - timeLog.startTime) / (1000 * 60 * 60)), 0);
      const result  = {currentWeek: currentWeekTotalHours,
                    previousWeek: previousWeekTotalHours
          }  
  res.status(200).json({
        status: 'success',
        data: result
      });

  }
);

exports.getMonthlySummary = catchAsync(async (req, res, next) => {  
    
  const { userId, date } = req.query;
  const startOfMonth = moment(date).startOf('month');
  const endOfMonth = moment(date).endOf('month');
  const startOfPreviousMonth = moment(date).subtract(1, 'month').startOf('month');
  const endOfPreviousMonth = moment(date).subtract(1, 'month').endOf('month');

    const currentMonthLogs = await TimeLog.aggregate([
      {
        $match: {
          user: mongoose.Types.ObjectId(userId),
          date: {
            $gte: startOfMonth.toDate(),
            $lte: endOfMonth.toDate()
          }
        }
      },
      {
        $group: {
          _id: null,
          total: {
            $sum: {
              $subtract: ['$endTime', '$startTime']
            }
          }
        }
      }
    ]);

    const previousMonthLogs = await TimeLog.aggregate([
      {
        $match: {
          user: mongoose.Types.ObjectId(userId),
          date: {
            $gte: startOfPreviousMonth.toDate(),
            $lte: endOfPreviousMonth.toDate()
          }
        }
      },
      {
        $group: {
          _id: null,
          total: {
            $sum: {
              $subtract: ['$endTime', '$startTime']
            }
          }
        }
      }
    ]);

    const currentMonth = currentMonthLogs[0] ? currentMonthLogs[0].total / (1000 * 60) : 0;
    const previousMonth = previousMonthLogs[0] ? previousMonthLogs[0].total / (1000 * 60) : 0;

    res.status(200).json({
      status: 'success',
      data: {
        currentMonth,
        previousMonth
      }
    });
}
);

exports.getTaskwiseHours = catchAsync(async (req, res, next) => {   
  
    const timeLogs = await TimeLog.aggregate([
      {
        $match: { user: mongoose.Types.ObjectId(req.query.userId) }
      },
      {
        $group: {
          _id: { project: '$project', task: '$task' },
          totalTime: { $sum: { $subtract: ['$endTime', '$startTime'] } }
        }
      },
      {
        $lookup: {
          from: 'tasks',
          localField: '_id.task',
          foreignField: '_id',
          as: 'task'
        }
      },
      {
        $lookup: {
          from: 'projects',
          localField: '_id.project',
          foreignField: '_id',
          as: 'project'
        }
      },
      {
        $unwind: '$task'
      },
      {
        $unwind: '$project'
      },
      {
        $group: {
          _id: '$project._id',
          projectName: { $first: '$project.projectName' },
          tasks: {
            $push: {
              taskName: '$task.taskName',
              totalTime: '$totalTime'
            }
          }
        }
      },
      {
        $project: {
          _id: 0,
          projectName: 1,
          tasks: 1
        }
      }
    ]);      
   
    res.status(200).json({
      status: 'success',
      data: timeLogs
    });
}
);

exports.getTaskwiseStatus = catchAsync(async (req, res, next) => {   
    
  const userId = req.query.userId;
  // Find all time logs of the user
  const timeLogs = await TimeLog.find({ user: userId }).populate('task');

  // Group time logs by project and task
  const timeLogsByProjectAndTask = timeLogs.reduce((acc, curr) => {
    const projectId = curr.project._id;
    const taskId = curr.task._id;
    if (!acc[projectId]) {
      acc[projectId] = {};
    }
    if (!acc[projectId][taskId]) {
      acc[projectId][taskId] = { timeTaken: 0 };
    }
    acc[projectId][taskId].timeTaken += Math.abs(curr.endTime - curr.startTime);
    return acc;
  }, {});

  // Find all tasks of the user
  const tasks = await Task.find({ createdBy: userId });

  // Map tasks to include project information
  const tasksByProject = tasks.reduce((acc, curr) => {
    const projectId = curr.project?._id;
    if (!acc[projectId]) {
      acc[projectId] = { estimatedTime: 0, tasks: {} };
    }
    acc[projectId].estimatedTime += curr.estimate || 0;
    acc[projectId].tasks[curr._id] = {
      taskName: curr.taskName,
      timeTaken: timeLogsByProjectAndTask[projectId]?.[curr._id]?.timeTaken || 0,
    };
    return acc;
  }, {});    

 
  res.status(200).json({
    status: 'success',
    data: tasksByProject
  });
}
);