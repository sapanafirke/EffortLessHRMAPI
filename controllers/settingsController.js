const productivity = require("../models/productivityModel");
const catchAsync = require("../utils/catchAsync");
const { v1: uuidv1 } = require("uuid");
const AppError = require("../utils/appError");

exports.addProductivity = catchAsync(async (req, res, next) => {
  const newProductivity = await productivity.create({
    icon: req.body.icon,
    key: req.body.key,
    name: req.body.name,
    isProductive: req.body.isProductive,
    company: req.cookies.companyId,
    createdOn: new Date(),
    updatedOn: new Date(),
    createdBy: req.cookies.userId,
    updatedBy: req.cookies.userId,
  });
  res.status(200).json({
    status: "success",
    data: newProductivity,
  });
});

exports.updateProductivity = catchAsync(async (req, res, next) => {
  const result = await productivity.findByIdAndUpdate(req.params.id, req.body, {
    new: true, // If not found - add new
    runValidators: true, // Validate data
  });
  if (!result) {
    return next(new AppError("No productivity found with that ID", 404));
  }
  res.status(201).json({
    status: "success",
    data: {
      data: result,
    },
  });
});

exports.get = catchAsync(async (req, res, next) => {
  const result = await productivity.find({ id: req.params.id });
  res.status(200).json({
    status: "success",
    data: result,
  });
});

exports.getAll = catchAsync(async (req, res, next) => {
  const result = await productivity
    .find()
    .where("company")
    .equals(req.cookies.companyId);
  res.status(200).json({
    status: "success",
    data: result,
  });
});

exports.deleteProductivity = catchAsync(async (req, res, next) => {
  const result = await productivity.findByIdAndDelete(req.params.id);
  res.status(204).json({
    status: "success",
    data: result,
  });
});
