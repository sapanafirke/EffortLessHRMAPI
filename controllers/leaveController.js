
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');
const ErrorLog = require('../models/errorLogModel');
const Leave = require('../models/leaveModel');
  // Save Permission List
  exports.getLeaveList = catchAsync(async (req, res, next) => {    
    const leaveList = await Leave.find({}).all();  
    res.status(200).json({
      status: 'success',
      data: {
        leaveList: leaveList
      }
    });  
  });
  exports.getLeaveByUser = catchAsync(async (req, res, next) => {    
    const leaveList = await Leave.find({}).where('createdBy').equals(req.params.userId).where('company').equals(req.cookies.companyId);  
    res.status(200).json({
      status: 'success',
      data: {
        leaveList: leaveList
      }
    });  
  });
  
  exports.getLeave = catchAsync(async (req, res, next) => {    
    const leave = await Leave.find({}).where('_id').equals(req.params.id).where('company').equals(req.cookies.companyId); 
    res.status(200).json({
      status: 'success',
      data: {
        errorLogList: leave
      }
    });  
  });
  // Save Permission
  exports.saveLeave = catchAsync(async (req, res, next) => {    
    const newLeave = await Leave.create({      
      user:req.body.user,
      LeaveType:req.body.LeaveType,     
      Date:req.body.Date,
      Note:req.body.Note,
      createdOn: new Date(Date.now()),
      updatedOn: new Date(Date.now()),
      company:req.cookies.companyId,
      createdBy: req.cookies.userId,
      updatedBy: req.cookies.userId,
      status:"Pending"

    });  

    res.status(200).json({
      status: 'success',
      data: {
        ErrorLog:newLeave
      }
    }); 
  });
  exports.deleteLeave = catchAsync(async (req, res, next) => {  
    const document = await Leave.findByIdAndDelete(req.params.id);
    if (!document) {
      return next(new AppError('No document found with that ID', 404));
    }
    res.status(204).json({
      status: 'success',
      data: null
    });
  });
  
  exports.updateLeave = factory.updateOne(Leave);
  
  
  

