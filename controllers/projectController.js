const Project = require('../models/projectModel');
const catchAsync = require('../utils/catchAsync');

exports.deleteProject = catchAsync(async (req, res, next) => {
  const document = await Project.findByIdAndDelete(req.params.id);
  if (!document) {
    return next(new AppError('No document found with that ID', 404));
  }
  res.status(204).json({
    status: 'success',
    data: null
  });
});

exports.updateProject =  catchAsync(async (req, res, next) => {
  const document = await Project.findByIdAndUpdate(req.params.id, req.body, {
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

exports.getProject  = catchAsync(async (req, res, next) => {    
const project = await Project.findById(req.params.id); 
res.status(200).json({
  status: 'success',
  data: {
    project: project
  }
});  
});

 // Get Country List
 exports.getProjectList = catchAsync(async (req, res, next) => {    
    console.log("hi");
    const projectList = await Project.find({}).all();  
    res.status(200).json({
      status: 'success',
      data: {
        projectList: projectList
      }
    });  
  });

 exports.addProject = catchAsync(async (req, res, next) => {  
    const newProject = await Project.create({
      projectName: req.body.projectName,
      startDate:req.body.startDate,
      endDate :req.body.endDate,
      notes: req.body.notes,
      estimatedTime:req.body.estimatedTime,
      createdOn: new Date(Date.now()),
      updatedOn: new Date(Date.now()),
      company:req.body.company,
      createdBy: req.body.createdBy,
      updatedBy: req.body.updatedBy,
      status:"Active"
    });  
    console.log('project created');
    res.status(200).json({
      status: 'success',
      data: {
        newProject: newProject
      }
    });  
  });
