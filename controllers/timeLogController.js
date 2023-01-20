const TimeLog = require('../models/timeLog');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError.js');
const { v1: uuidv1} = require('uuid');
const { BlobServiceClient } = require('@azure/storage-blob');
const { Stream } = require('nodemailer/lib/xoauth2');
const  FileAPI = require('file-api');
var moment = require('moment'); 

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
  const timeLogs = await TimeLog.find({}).where('user').equals(req.body.user).where('date').equals(req.body.date);
  res.status(200).json({
    status: 'success',
    data: timeLogs
  });  
});

exports.getLogInUser = catchAsync(async (req, res, next) => {
  console.log(req.cookies.companyId);
  //let date = `${req.body.date}.000+00:00`;
//console.log("getTimeLogs, date:" + date);
const timeLogsAll = [];
var timeLogs;

if(req.body.users!='' && req.body.projects!='' && req.body.tasks!='')
  {
  timeLogs=await TimeLog.find({ 'user': { $in: req.body.users },'project': { $in: req.body.projects },'task': { $in: req.body.tasks } }).distinct('user').where('date').equals("2023-01-19");    
  }
  else if(req.body.users!='' && req.body.tasks!='')
  {
  timeLogs=await TimeLog.find({ 'user': { $in: req.body.users },'task': { $in: req.body.tasks } }).distinct('user').where('date').equals("2023-01-19");    
  }
  else if(req.body.users!='' && req.body.projects!='')
  {
  timeLogs=await TimeLog.find({ 'user': { $in: req.body.users },'project': { $in: req.body.projects } }).distinct('user').where('date').equals("2023-01-19");    
  }
  else if(req.body.tasks!='' && req.body.projects!='')
  {
  timeLogs=await TimeLog.find({ 'project': { $in: req.body.projects } }).distinct('user').where('date').equals("2023-01-19");    
  }
  else if(req.body.projects!='')
  {
  timeLogs=await TimeLog.find({ 'project': { $in: req.body.projects } }).distinct('user').where('date').equals("2023-01-19");    
  }  
  else if(req.body.tasks!='')
  {
  timeLogs=await TimeLog.find({ 'task': { $in: req.body.tasks } }).distinct('user').where('date').equals("2023-01-19");    
  }
  else if(req.body.users!='')
  {
  timeLogs=await TimeLog.find({ 'user': { $in: req.body.users } }).distinct('user').where('date').equals("2023-01-19");    
  }
  else{
      timeLogs = await TimeLog.find({}).distinct('user').where('date').equals("2023-01-19");
   }
    for(var i = 0; i < timeLogs.length; i++) 
          {
          const timeLog = await TimeLog.findOne({user:timeLogs[i],date:"2023-01-19"});
          if(timeLog) 
          {
            const newLogInUSer = {};
            newLogInUSer.user= timeLog.user;
            newLogInUSer.project = timeLog.project.projectName;
            newLogInUSer.task = timeLog.task.taskName;
            timeLogsAll.push(newLogInUSer);
          }
  
        }
  res.status(200).json({
    status: 'success',
    data: timeLogsAll
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
  //let date = `${req.body.date}.000+00:00`;
  console.log("called");

  const timeLogs = await TimeLog.find({}).where('user').equals(req.body.user).where('date').equals(req.body.date);    
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
      return next(new AppError('No document found with that ID', 404));
    }
    res.status(204).json({
      status: 'success',
      data: null
    });
  }
}
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