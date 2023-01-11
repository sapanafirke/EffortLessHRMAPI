const Task = require('../models/taskModel');
const TaskUser = require('../models/taskUserModel');
const TaskAttachments = require('../models/taskAttachmentModel');
const catchAsync = require('../utils/catchAsync');
const { BlobServiceClient } = require('@azure/storage-blob');
const { v1: uuidv1} = require('uuid');
const AppError = require('../utils/appError');
// AZURE STORAGE CONNECTION DETAILS
const AZURE_STORAGE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING;
if (!AZURE_STORAGE_CONNECTION_STRING) {
throw Error("Azure Storage Connection string not found");
}
const blobServiceClient = BlobServiceClient.fromConnectionString(
  AZURE_STORAGE_CONNECTION_STRING
);
const containerClient = blobServiceClient.getContainerClient(process.env.CONTAINER_NAME);

exports.deleteTask = catchAsync(async (req, res, next) => {
  const newTaskUserList = await TaskUser.findOneAndDelete({}).where('task').equals(req.params.id);  
  const newTaskAttachmentList = await TaskAttachments.findOneAndDelete({}).where('task').equals(req.params.id);
  const document = await Task.findByIdAndDelete(req.params.id);
  res.status(204).json({
    status: 'success',
    data: null
  });
});

exports.updateTask =  catchAsync(async (req, res, next) => {

  const document = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true, // If not found - add new
    runValidators: true // Validate data
  });
  if (!document) {
    return next(new AppError('No document found with that ID', 404));
  }
  res.status(201).json({
    status: 'success',
    data: {
      data: document
    }
  });
});


exports.getTask  = catchAsync(async (req, res, next) => {    
const task = await Task.findById(req.params.id); 
const newTaskUserList = await TaskUser.find({}).where('task').equals(req.params.id);  
const newTaskAttachmentList = await TaskAttachments.find({}).where('task').equals(req.params.id);  
 
  
res.status(200).json({
  status: 'success',
  data: {
    task: task,
    newTaskUserList:newTaskUserList,
    newTaskAttachmentList:newTaskAttachmentList
  }
});  
});

exports.getTaskUsers  = catchAsync(async (req, res, next) => {    
  
  const newTaskUserList = await TaskUser.find({}).where('task').equals(req.params.id);  
  
  res.status(200).json({
    status: 'success',
    data: {
    taskUserList:newTaskUserList
    }
  });  
});

exports.getTaskAttachments  = catchAsync(async (req, res, next) => {    
    const newTaskAttachmentList = await TaskAttachments.find({}).where('task').equals(req.params.id);  
    res.status(200).json({
      status: 'success',
      data: {
      newTaskAttachmentList:newTaskAttachmentList
      }
    });  
});
exports.getTaskListByUser  = catchAsync(async (req, res, next) => {    
  var taskList=[];

    const newTaskUserList = await TaskUser.find({}).where('user').equals(req.body.userId);  
    if(newTaskUserList)
      {
       for(var i = 0; i < newTaskUserList.length; i++) {
           taskList.push(newTaskUserList[i].task);
         }  
      }
      res.status(200).json({
      status: 'success',
      data: {
        taskList:taskList
      }
    });   
  });
exports.getTaskUser  = catchAsync(async (req, res, next) => {    
    const newTaskUser = await TaskUser.find({}).where('_id').equals(req.params.id);      
    res.status(200).json({
      status: 'success',
      data: {
      taskUser:newTaskUser
      }
    });  
});
exports.updateTaskUser =  catchAsync(async (req, res, next) => {
  const taskUsersexists = await TaskUser.find({}).where('_id').equals(req.params.id).where('user').equals(req.body.user);  
  
  if (taskUsersexists.length>0) {
    return next(new AppError('Task User already exists.', 403));
  }
  else{ 
    const document = await TaskUser.findByIdAndUpdate(req.params.id, req.body, {
    new: true, // If not found - add new
    runValidators: true // Validate data
  });
  if (!document) {
    return next(new AppError('No document found with that ID', 404));
  }
  res.status(201).json({
    status: 'success',
    data: {
      data: document
    }
  });
}
});
exports.getTaskAttachment  = catchAsync(async (req, res, next) => {    
      const newTaskAttachment = await TaskAttachments.find({}).where('_id').equals(req.params.id);  
      res.status(200).json({
        status: 'success',
        data: {
        newTaskAttachment:newTaskAttachment
        }
      });  
});
exports.updateTaskAttachments =  catchAsync(async (req, res, next) => {
  const document = await TaskAttachments.findByIdAndUpdate(req.params.id, req.body, {
    new: true, // If not found - add new
    runValidators: true // Validate data
  });
  if (!document) {
    return next(new AppError('No document found with that ID', 404));
  }
  res.status(201).json({
    status: 'success',
    data: {
      data: document
    }
  });
});
exports.addTask = catchAsync(async (req, res, next) => { 

  // Upload Capture image on block blob client 

  const newTask = await Task.create({
    taskName: req.body.taskName,
    startDate:req.body.startDate,
    endDate :req.body.endDate,
    startTime: req.body.startTime,
    description:req.body.description,
    comment :req.body.comment,
    isSubTask: false,
    priority:req.body.priority,
    company:req.cookies.companyId,
    project:req.body.project,
    status:"Active",
    createdOn: new Date(),
    updatedOn: new Date(),
    createdBy: req.cookies.userId,
    updatedBy: req.cookies.userId
  });  
  if(req.body.taskUsers!=null)
  {
  for(var i = 0; i < req.body.taskUsers.length; i++) {
    const newTaskUserItem = await TaskUser.create({
      task:newTask._id,
      user:req.body.taskUsers[i].user,
      company:req.cookies.companyId,
      status:"Active",
      createdOn: new Date(),
      updatedOn: new Date(),
      createdBy: req.cookies.userId,
      updatedBy: req.cookies.userId
    });  
    
  
  }
  }
  if(req.body.taskAttachments!=null)
  {
  for(var i = 0; i < req.body.taskAttachments.length; i++) {
    console.log("attach");
    const blobName = "Capture" + uuidv1() + ".png";
  // Get a block blob client
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);
  console.log("\nUploading to Azure storage as blob:\n\t", blobName);
  // Upload data to the blob
  var FileString =  req.body.taskAttachments[i].file;
  const buffer = new Buffer.from(FileString, 'base64');
  const uploadBlobResponse = await blockBlobClient.upload(buffer,buffer.byteLength );
  console.log(
    "Blob was uploaded successfully. requestId: ",
    uploadBlobResponse.requestId
  );

    const newTaskUserItem = await TaskAttachments.create({
      task:newTask._id,
      attachmentType:req.body.taskAttachments[i].attachmentType,
      attachmentName:req.body.taskAttachments[i].attachmentName,
      attachmentSize:req.body.taskAttachments[i].attachmentSize,
      filePath:blobName,
      status:"Active",
      createdOn: new Date(),
      updatedOn: new Date(),
      createdBy: req.cookies.userId,
      updatedBy: req.cookies.userId
    });  
  
  }
}

  const newTaskAttachmentList = await TaskAttachments.find({}).where('task').equals(newTask._id);  
 
  const newTaskUserList = await TaskUser.find({}).where('task').equals(newTask._id);  
  res.status(200).json({
    status: 'success',
    data: {
      newTask: newTask,
      newTaskUserList:newTaskUserList,
      newTaskAttachmentList:newTaskAttachmentList
    }
  });
});

exports.addTaskUser = catchAsync(async (req, res, next) => { 
  // Upload Capture image on block blob client 
 for(var i = 0; i < req.body.taskUsers.length; i++) {
  const taskUsersexists = await TaskUser.find({}).where('task').equals(req.body.taskId).where('user').equals(req.body.taskUsers[i].user);  
  
  if (taskUsersexists.length>0) {
    return next(new AppError('Task User already exists.', 403));
  }
  else{ 
    const newTaskUserItem = await TaskUser.create({
      task:req.body.taskId,
      user:req.body.taskUsers[i].user,
      company:req.cookies.companyId,
      status:"Active",
      createdOn: new Date(),
      updatedOn: new Date(),
      createdBy: req.cookies.userId,
      updatedBy: req.cookies.userId
    });    
  }
  }  
  const newTaskUserList = await TaskUser.find({}).where('task').equals(req.body.taskId);  
  res.status(200).json({
    status: 'success',
    data: {      
      TaskUserList:newTaskUserList
    }
  });
});
exports.deleteTaskUser = catchAsync(async (req, res, next) => {
  console.log("hii");
  const document = await TaskUser.findByIdAndDelete(req.params.id);
  if (!document) {
    return next(new AppError('No document found with that ID', 404));
  }
  res.status(204).json({
    status: 'success',
    data: null
  });
});
exports.addTaskAttachment = catchAsync(async (req, res, next) => { 

  // Upload Capture image on block blob client 
  for(var i = 0; i < req.body.taskAttachments.length; i++) {
    const blobName = "Capture" + uuidv1() + ".png";
  // Get a block blob client
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);
  console.log("\nUploading to Azure storage as blob:\n\t", );
  // Upload data to the blob
  var fileString =  req.body.taskAttachments[i].file;
  const buffer = fileString;
  const uploadBlobResponse = await blockBlobClient.upload(buffer,buffer.byteLength );
  console.log(
    "Blob was uploaded successfully. requestId: ",
    uploadBlobResponse.requestId
  );
    const newTaskUserItem = await TaskAttachments.create({
      task:req.body.taskId,
      attachmentType:req.body.taskAttachments[i].attachmentType,
      attachmentName:req.body.taskAttachments[i].attachmentName,
      attachmentSize:req.body.taskAttachments[i].attachmentSize,
      filePath:blobName,
      status:"Active",
      createdOn: new Date(),
      updatedOn: new Date(),
      createdBy: req.cookies.userId,
      updatedBy: req.cookies.userId
    });    
  }
  const newTaskAttachmentList = await TaskAttachments.find({}).where('task').equals(req.body.taskId);  
   res.status(200).json({
    status: 'success',
    data: {
      newTaskUserList:newTaskAttachmentList
    }
  });
});
exports.deleteTaskAttachment = catchAsync(async (req, res, next) => {
  const document = await TaskAttachments.findByIdAndDelete(req.params.id);
  if (!document) {
    return next(new AppError('No document found with that ID', 404));
  }
  res.status(204).json({
    status: 'success',
    data: null
  });
});
 // Get Country List
exports.getTaskList = catchAsync(async (req, res, next) => {    
    const taskList = await Task.find({}).where('company').equals(req.cookies.companyId);  
    res.status(200).json({
      status: 'success',
      data: {
        taskList: taskList
      }
    });  
});
exports.getTaskListByProject = catchAsync(async (req, res, next) => {    
  const taskList = await Task.find({}).where('company').equals(req.cookies.companyId).where('project').equals(req.params.projectId);  
  res.status(200).json({
    status: 'success',
    data: {
      taskList: taskList
    }
  });  
});
