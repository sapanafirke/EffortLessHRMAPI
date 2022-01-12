const HolidayCalendar = require('../models/holidayCalendar');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');

exports.saveHolidayCalendar = catchAsync(async (req, res, next) => {
  const newHolidayCalendar = await HolidayCalendar.create({
      holidayName:req.body.holidayName,
      holidayDate:req.body.holidayDate
  });  
  res.status(200).json({
    status: 'success',
    data: {
      HolidayCalendar:newHolidayCalendar
    }
  }); 
});

exports.getHolidayList = catchAsync(async (req, res, next) => {    
  let { startDate, endDate } = req.query; 
  const holidays = await HolidayCalendar.find({ 
    holidayDate: {
          $gte: new Date(new Date(startDate).setHours(00, 00, 00)),
          $lt: new Date(new Date(endDate).setHours(23, 59, 59))
           }
    }).sort({holidayDate: 'asc'})
  res.status(200).json({
    status: 'success',
    holidays   
  }); 
});
exports.getHolidayCalendar = (req, res) => {
    const holidayCalendarRecords = factory.getAll(HolidayCalendar);
    
    res.status(200).json({
      status: 'success',
      data: {
        holidayCalendarRecords
      }
    }); 
};
