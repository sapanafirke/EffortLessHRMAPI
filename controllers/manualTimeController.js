const manualTimeRequest = require('../models/manualTime/manualTimeRequestModel');
const TimeLog = require('../models/timeLog');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError.js');
const { v1: uuidv1} = require('uuid');
const { Stream } = require('nodemailer/lib/xoauth2');
const  FileAPI = require('file-api');
const sendEmail = require('../utils/email');
const User = require('../models/permissions/userModel');
const Project = require('../models/projectModel');
const Company = require('../models/companyModel');
var moment = require('moment'); 

exports.addManualTimeRequest = catchAsync(async (req, res, next) => {  
  const user = await User.findById(req.body.user);
  if (!user) {
    return next(new AppError(`There is no user with email ${user}}.`, 404));
  }  
  if(!req.body.date){
    return next(new AppError(`Date is required.`, 404));
  }

  if(!req.body.fromDate){
    return next(new AppError(`From Date is required.`, 404));
  }
  if(!req.body.toDate){
    return next(new AppError(`To Date is required.`, 404));
  }  
  const manager = await User.findById(req.body.manager);
  if (!manager) {
    return next(new AppError(`There is no manager with id ${user}}.`, 404));
  }

  const project = await Project.findById(req.body.project);
  if (!project) {
    return next(new AppError(`Project is required.`, 404));
  }
  
  var mtRequest =  await manualTimeRequest.create(
    {
      user: req.body.user,
      date:req.body.date,
      company: req.cookies.companyId,
      project:req.body.project,
      manager:req.body.manager,
      fromDate:req.body.fromDate,
      toDate:req.body.toDate,
      status:"pending",
      reason:req.body.reason,
      createdOn: new Date(Date.now()),
      updatedOn: new Date(Date.now()),
      createdBy: req.cookies.userId,
      updatedBy: req.cookies.userId,
    }
  );

  if(mtRequest){
    await sendEmail({
      email: "dotnetexpertdev@gmail.com",
      subject: 'Manual Time Request',
      message:"No message"
    });
  }
  res.status(200).json({
      status: 'success',
      data: mtRequest
    });  
  });

exports.updateManualTimeRequest = catchAsync(async (req, res, next) => {  
    const user = await User.findById(req.body.user);
    if (!user) {
      return next(new AppError(`There is no user with email ${user}}.`, 404));
    }  
    if(!req.body.date){
      return next(new AppError(`Date is required.`, 404));
    }  
    const manager = await User.findById(req.body.manager);
    if (!manager) {
      return next(new AppError(`There is no manager with id ${user}}.`, 404));
    }
  
    const project = await Project.findById(req.body.project);
    if (!project) {
      return next(new AppError(`Project is required.`, 404));
    }
    
    const updateUserPreference = await manualTimeRequest.findByIdAndUpdate(req.params.id, req.body, {
      new: false,
      runValidators: true
  });
    res.status(200).json({
        status: 'success',
        data: updateUserPreference
      });  
    });
exports.getManualTimeRequestsByUser = catchAsync(async (req, res, next) => {      
      const manualTimeRequests = await manualTimeRequest.find({}).where('user').equals(req.params.id);
      for(let i=0;i<manualTimeRequests.length;i++){ 
        manualTimeRequests[i].project = await Project.findById(manualTimeRequests[i].project); 
        manualTimeRequests[i].manager = await User.findById(manualTimeRequests[i].manager); 
      }
      res.status(200).json({
          status: 'success',
          data: manualTimeRequests
        });  
      }); 

      exports.deleteManualTimeRequest = catchAsync(async (req, res, next) => {        
        const result = await manualTimeRequest.findByIdAndDelete(req.params.id);
        res.status(201).json({
            status: 'success',
            body: result
        });          
        });  