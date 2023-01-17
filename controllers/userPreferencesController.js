const userPreferences = require("../models/userPreferencesModel");
const catchAsync = require("../utils/catchAsync");
const User = require("../models/permissions/userModel.js");
const AppError = require("../utils/appError.js");
const express = require("express");
const { findById } = require("../models/item");
const app = express()
app.use(express.json);

exports.getAllUserPreference = catchAsync(async (req, res, next) => {
    try {

        const allUserPreferences = await userPreferences.find({}).all();
        console.log('getAllUserPreference called');
        res.status(201).json({
            status: 'success',
            result: allUserPreferences
        })
    }
    catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        })
    }
});



exports.createUserPreference = catchAsync(async (req, res, next) => {
    try {
        const newUserPreference = await userPreferences.create(req.body);
        res.status(201).json({
            status: 'success',
            UserPreference: newUserPreference
        })
    }
    catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        })
    }
});

exports.getUserPreference = catchAsync(async (req, res) => {
    try {
        
        const findUserPreference = await userPreferences.findById(req.params.id);
        res.status(201).json({
            status: 'success',
            result: findUserPreference
        });
    }
    catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        })
    }
});


exports.deleteUserPreference = catchAsync(async (req, res, next) => {
    const deleteUserPreference = await userPreferences.findByIdAndDelete(req.params.id);

    if (!deleteUserPreference) {
        return next(new AppError("No user preference found with this id", 404));
    };

    res.status(204).json({
        status: 'success',
        data: null
    });
});

exports.updateUserPreference = catchAsync(async (req, res, next) => {
    try {
        const updateUserPreference = await userPreferences.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        res.status(201).json({
            status: 'success',
            data: {
                data: updateUserPreference
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        })
    }
});

