const TimeLog = require('../models/timeLog');
const CurrentUserDevice = require('../models/currentUserDeviceModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError.js');
const { v1: uuidv1} = require('uuid');
const { BlobServiceClient } = require('@azure/storage-blob');
const { Stream } = require('nodemailer/lib/xoauth2');
const  FileAPI = require('file-api');
var moment = require('moment'); 
const timeLog = require('../models/timeLog');
const userSubordinate = require('../models/userSubordinateModel');
  // AZURE STORAGE CONNECTION DETAILS
const AZURE_STORAGE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING;
if (!AZURE_STORAGE_CONNECTION_STRING) {
throw Error("Azure Storage Connection string not found");
}
const blobServiceClient = BlobServiceClient.fromConnectionString(
  AZURE_STORAGE_CONNECTION_STRING
);
const containerClient = blobServiceClient.getContainerClient(process.env.CONTAINER_NAME);

exports.addLog = catchAsync(async (req, res, next) => { 
 const currentUserActive = await CurrentUserDevice.findOne({}).where('userId').equals(req.cookies.userId).where('companyId').equals(req.cookies.companyId);  
 if (currentUserActive) {
      if(req.body.machineId!=currentUserActive.machineId)
         {
            if(req.body.makeThisDeviceActive==true)
            {
              currentUserActive.machineId = req.body.machineId;
              await currentUserActive.save();
            }
            else
            {
                        res.status(200).json({
                        status: 'success',
                        data: {
                          MakeThisDeviceActive: false,
                          message: "User is logged in on another device, Do you want to make it active?"
                        }
                      }); 
            }
          }
  }
  else
  { 
          const newCurrentUserDevice = await CurrentUserDevice.create({
            machineId: req.body.machineId,
            company:req.cookies.companyId,
            status:"Active",
            createdOn: new Date(),
            userId: req.cookies.userId      
          });               
    }

    // Upload Capture image on block blob client
  const blobName = "Capture" + uuidv1() + `${req.body.filePath}`;
  // Get a block blob client
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);
  console.log("\nUploading to Azure storage as blob:\n\t", blobName);
  // Upload data to the blob
  var FileString = req.body.fileString;
  const buffer = new Buffer.from(FileString, 'base64');
  const uploadBlobResponse = await blockBlobClient.upload(buffer,buffer.length);
  const url=process.env.CONTAINER_URL_BASE_URL+ process.env.CONTAINER_NAME+"/"+blobName; 
  console.log(`process.env.CONTAINER_URL_BASE_URL ${process.env.CONTAINER_URL_BASE_URL} process.env.CONTAINER_NAME ${process.env.CONTAINER_NAME}`);
  console.log(`Blob was uploaded successfully. requestId: ${uploadBlobResponse.requestId}, url: ${uploadBlobResponse}`);
  const newTimeLog = await TimeLog.create({
    user: req.body.user,
    task:req.body.task,
    project:req.body.project,
    date :req.body.date,
    startTime: req.body.startTime,
    endTime:req.body.endTime,
    filePath:blobName,
    keysPressed:req.body.keysPressed,
    clicks:req.body.clicks,
    scrolls:req.body.scrolls,
    url:url
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
  console.log(req.cookies.companyId);
  //let date = `${req.body.date}.000+00:00`;
//console.log("getTimeLogs, date:" + date);
var tomorrow = new Date(new Date(req.body.date).setDate(new Date(req.body.date).getDate() + 1));
  const timeLogs =  await TimeLog.find({}).where('user').equals(req.body.user).find({
    "date" : {"$gte": req.body.date,"$lte": tomorrow}});
 
  res.status(200).json({
    status: 'success',
    data: timeLogs
  });  
});

exports.getLogInUser = catchAsync(async (req, res, next) => {
  var teamIdsArray=[];
  var teamIds='';
  const ids = await userSubordinate.find({}).distinct('subordinateUserId').where('userId').equals(req.cookies.userId);  
  if(ids.length > 0)    
      { 
        for(var i = 0; i < ids.length; i++) 
          {    
              teamIdsArray.push(ids[i]);        
          }
    }
 
teamIdsArray.push(req.cookies.userId);
  //let date = `${req.body.date}.000+00:00`;
//console.log("getTimeLogs, date:" + date);
const timeLogsAll = [];
const realtime = [];
const logs = {};  
var timeLogs;
const today = moment().endOf('day');
const date = today.toDate().toISOString().slice(0, 10);
var tomorrow = new Date(new Date(date).setDate(new Date(date).getDate() + 0));
let startTime = moment(req.body.startTime).toDate();
console.log(tomorrow);
var end = new Date(new Date(tomorrow).setDate(new Date(tomorrow).getDate() + 1));                      
if(req.body.users!='' && req.body.projects!='' && req.body.tasks!='')
  {
  timeLogs=await TimeLog.find({ 'user': { $in: req.body.users },'project': { $in: req.body.projects },'task': { $in: req.body.tasks } ,'date' : {'$gte': tomorrow,'$lte': end}}).distinct('user');    
  }
  else if(req.body.users!='' && req.body.tasks!='')
  {
  timeLogs=await TimeLog.find({ 'user': { $in: req.body.users },'task': { $in: req.body.tasks } ,'date' : {'$gte': tomorrow,'$lte': end}}).distinct('user');    
  }
  else if(req.body.users!='' && req.body.projects!='')
  {
  timeLogs=await TimeLog.find({ 'user': { $in: req.body.users },'project': { $in: req.body.projects },'date' : {'$gte': tomorrow,'$lte': end}}).distinct('user');    
  }
  else if(req.body.tasks!='' && req.body.projects!='')
  {
  timeLogs=await TimeLog.find({ 'user': { $in: teamIdsArray},'project': { $in: req.body.projects } ,'date' : {'$gte': tomorrow,'$lte': end}}).distinct('user');    
  }
  else if(req.body.projects!='')
  {
  timeLogs=await TimeLog.find({ 'user': { $in: teamIdsArray},'project': { $in: req.body.projects } ,'date' : {'$gte': tomorrow,'$lte': end}}).distinct('user');    
  }  
  else if(req.body.tasks!='')
  {
  timeLogs=await TimeLog.find({ 'user': { $in: teamIdsArray},'task': { $in: req.body.tasks },'date' : {'$gte': tomorrow,'$lte': end} }).distinct('user');    
  }
  else if(req.body.users!='')
  {
   
  timeLogs=await TimeLog.find({ 'user': { $in: teamIdsArray},'user': { $in: req.body.users },'date' : {'$gte': tomorrow,'$lte': end} }).distinct('user');    
  }
  else{
      timeLogs = await TimeLog.find({'user': { $in: teamIdsArray},'date' : {'$gte': tomorrow,'$lte': end}}).distinct('user');
  }
   
    for(var i = 0; i < timeLogs.length; i++) 
          {
           const timeLog = await TimeLog.findOne({'user':timeLogs[i],'date' : {'$gte': tomorrow,'$lte': end}});
          
        if(timeLog) 
          {
            const newLogInUSer = {};
            newLogInUSer.user = timeLog.user;
            newLogInUSer.project = timeLog.project.projectName;
            newLogInUSer.task = timeLog.task.taskName;
            timeLogsAll.push(newLogInUSer);
          }
  
        }
        logs.onlineUsers=timeLogsAll;       
        logs.totalMember=teamIdsArray.length;
        logs.activeMember=timeLogsAll.length;
        logs.totalNonProductiveMember=0;
        realtime.push(logs);
  res.status(200).json({
    status: 'success',
    data: realtime
  });  
});

exports.getCurrentWeekTotalTime = catchAsync(async (req, res, next) => {      
  const timeLogs = await TimeLog.find({}).where('user').equals(req.body.user).find({
    "date" : {"$gte": req.body.startDate,"$lte": req.body.endDate}});
  res.status(200).json({
    status: 'success',
    length:timeLogs.length,
    data: timeLogs
  });  
});

exports.getLog = catchAsync(async (req, res, next) => {  
  res.status(200).json({
    status: 'success',
    data: {
      timeLog: "he"
    }
  });
});

exports.getLogsWithImages = catchAsync(async (req, res, next) => {
  var tomorrow = new Date(new Date(req.body.date).setDate(new Date(req.body.date).getDate() + 1));
  const timeLogs =  await TimeLog.find({}).where('user').equals(req.body.user).find({
    "date" : {"$gte": req.body.date,"$lte": tomorrow}});
    
  //let response =[];
  //for (const timeLog of timeLogs) {
  //  const blobName = timeLog.filePath;
    
  // const blobClient = containerClient.getBlobClient(blobName);    
  //  try{
  //  const downloadBlockBlobResponse = await blobClient.download(0); 
  //  console.log(downloadBlockBlobResponse.url);
  //  const fileString =await streamToText(downloadBlockBlobResponse.readableStreamBody)   
  //  timeLog.fileString= fileString;
  //  response.push(timeLog);    
  //  }
  //  catch(err){      
  //  }
  //  } 

  res.status(200).json({
    status: 'success',
    data: timeLogs
  });
});

exports.deleteLog = catchAsync(async (req, res, next) => {
  for(var i = 0; i < req.body.logs.length; i++) {
  const timeLogsExists = await TimeLog.findById(req.body.logs[i].logId);    
  console.log(timeLogsExists);
  if(timeLogsExists)
  {
    var url = timeLogsExists.filePath;    
    containerClient.getBlockBlobClient(url).deleteIfExists();
    const blockBlobClient = containerClient.getBlockBlobClient(url);
    await blockBlobClient.deleteIfExists();
    const document = await TimeLog.findByIdAndDelete(req.body.logs[i].logId);
    if (!document) {
      console.log('No document found with that ID');
    }    
  }
  else{
    console.log('No document found with that ID');
  }
}
res.status(204).json({
  status: 'success',
  data: null
});
});

exports.addManualTime = catchAsync(async (req, res, next) => {    
  let startTime = moment(req.body.startTime).toDate();
  const endTime = moment(req.body.endTime).toDate();  
  let recordCount=0;  
  let result=[];
  while( startTime<endTime){   
    var newLog = {
      user: req.body.user,
      task:req.body.task,
      project:req.body.projectId,
      date :req.body.date,
      startTime: startTime,
      endTime:moment(startTime).add(10, 'm').toDate(),     
      keysPressed:0,
      clicks:0,
      scrolls:0,
      filePath:"",     
    }
    //let result = await TimeLog.create();
    result.push(newLog);
    recordCount++;  
    startTime = moment(startTime).add(10, 'm').toDate();      
  }  
   res.status(200).json({
     status: 'success',
     data: {
       timeLog: result
     }
   });
 });
 
// Convert stream to text
async function streamToText(readable) {
  readable.setEncoding('utf8');
  let data = '';
  for await (const chunk of readable) {
    data += chunk;
  }
  return data;
}


async function streamToString(readableStream) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    readableStream.on("data", (data) => {
      chunks.push(data.toString());
    });
    readableStream.on("end", () => {
      resolve(chunks.join(""));
    });
    readableStream.on("error", reject);
  });
}