const Task = require('../models/taskModel');
const TaskUser = require('../models/taskUserModel');
const catchAsync = require('../utils/catchAsync');
const { BlobServiceClient } = require('@azure/storage-blob');

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
  const document = await Task.findByIdAndDelete(req.params.id);
  if (!document) {
    return next(new AppError('No document found with that ID', 404));
  }
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

exports.getTaskUser  = catchAsync(async (req, res, next) => {    
    const newTaskUser = await TaskUser.find({}).where('_id').equals(req.params.id);      
    res.status(200).json({
      status: 'success',
      data: {
      taskUser:newTaskUser
      }
    });  
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
    company:req.body.company,
    status:"Active",
    createdOn: new Date(),
    updatedOn: new Date(),
    createdBy: req.body.createdBy,
    updatedBy: req.body.updatedBy
  });  
  
  for(var i = 0; i < req.body.taskUsers.length; i++) {
    const newTaskUserItem = await TaskUser.create({
      task:newTask._id,
      user:req.body.taskUsers[i].user,
      company:req.body.company,
      status:"Active",
      createdOn: new Date(),
      updatedOn: new Date(),
      createdBy: req.body.createdBy,
      updatedBy: req.body.updatedBy
    });  
  
  }
  for(var i = 0; i < req.body.taskAttachments.length; i++) {
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
      createdBy: req.body.createdBy,
      updatedBy: req.body.updatedBy
    });  
  
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
    const newTaskUserItem = await TaskUser.create({
      task:req.body.taskId,
      user:req.body.taskUsers[i].user,
      company:req.body.company,
      status:"Active",
      createdOn: new Date(),
      updatedOn: new Date(),
      createdBy: req.body.createdBy,
      updatedBy: req.body.updatedBy
    });    
  }  
  const newTaskUserList = await TaskUser.find({}).where('task').equals(newTask._id);  
  res.status(200).json({
    status: 'success',
    data: {      
      newTaskAttachmentList:newTaskAttachmentList
    }
  });
});

exports.addTaskAttachment = catchAsync(async (req, res, next) => { 

  // Upload Capture image on block blob client 
  for(var i = 0; i < req.body.taskAttachments.length; i++) {
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
      task:req.body.taskId,
      attachmentType:req.body.taskAttachments[i].attachmentType,
      attachmentName:req.body.taskAttachments[i].attachmentName,
      attachmentSize:req.body.taskAttachments[i].attachmentSize,
      filePath:blobName,
      status:"Active",
      createdOn: new Date(),
      updatedOn: new Date(),
      createdBy: req.body.createdBy,
      updatedBy: req.body.updatedBy
    });    
  }
  const newTaskAttachmentList = await TaskAttachments.find({}).where('task').equals(newTask._id);  
   res.status(200).json({
    status: 'success',
    data: {
      newTaskUserList:newTaskUserList
    }
  });
});
 // Get Country List
exports.getTaskList = catchAsync(async (req, res, next) => {    
    const taskList = await Task.find({}).all();  
    res.status(200).json({
      status: 'success',
      data: {
        taskList: taskList
      }
    });  
});
