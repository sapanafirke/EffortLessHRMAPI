const TimeLog = require('../models/timeLog');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError.js');
const { v1: uuidv1} = require('uuid');
const { BlobServiceClient } = require('@azure/storage-blob');
const { Stream } = require('nodemailer/lib/xoauth2');
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
  const blobName = "Capture" + uuidv1() + ".png";
  // Get a block blob client
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);
  console.log("\nUploading to Azure storage as blob:\n\t", blobName);
  // Upload data to the blob
  var FileString = req.body.file;
  const buffer = new Buffer.from(FileString, 'base64');
  const uploadBlobResponse = await blockBlobClient.upload(buffer,buffer.byteLength );
  console.log(
    "Blob was uploaded successfully. requestId: ",
    uploadBlobResponse.requestId
  );

  const newTimeLog = await TimeLog.create({
    user: req.body.user,
    task:req.body.task,
    date :req.body.date,
    startTime: req.body.startTime,
    endTime:req.body.endTime,
    filePath:blobName
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