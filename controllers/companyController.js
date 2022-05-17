const Company = require('../models/companyModel');
const Role = require('../models/roleModel');
const catchAsync = require('../utils/catchAsync');

exports.deleteCompany = catchAsync(async (req, res, next) => {
  const document = await Company.findByIdAndDelete(req.params.id);
  if (!document) {
    return next(new AppError('No document found with that ID', 404));
  }
  res.status(204).json({
    status: 'success',
    data: null
  });
});

exports.updateCompany =  catchAsync(async (req, res, next) => {
  const document = await Company.findByIdAndUpdate(req.params.id, req.body, {
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

exports.getCompany  = catchAsync(async (req, res, next) => {    
const company = await Company.findById(req.params.id);  
res.status(200).json({
  status: 'success',
  data: {
    company: company
  }
});  
});
 // Get Country List
 exports.getCompanyList = catchAsync(async (req, res, next) => {    
    const companyList = await Company.find({}).all();  
    res.status(200).json({
      status: 'success',
      data: {
        companyList: companyList
      }
    });  
});
