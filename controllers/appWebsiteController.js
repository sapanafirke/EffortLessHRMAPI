const appWebsite = require('./../models/commons/appWebsiteModel');
const express = require('express');
const app = express();
app.use(express.json);
const catchAsync = require('./../utils/catchAsync');
const { findById } = require("../models/item");
const Productivity = require('./../models/productivityModel');


exports.addNew = catchAsync(async (req, res, next) => {
    var appWebsiteKey = req.body.appWebsite.split(".");
    console.log(appWebsiteKey[0]);
    const getProductivity = await Productivity.find({}).where('key').equals(appWebsiteKey[0])
    let appWebsiteName="Default";
    console.log(getProductivity);
      if(getProductivity.length>0)
      { 
        appWebsiteName= getProductivity[0].name;
      }
     console.log(appWebsiteName);
     try {       
            const createDocument = await appWebsite.create({
                appWebsite:appWebsiteName,
                ModuleName:req.body.ModuleName,
                ApplicationTitle :req.body.ApplicationTitle,
                TimeSpent: req.body.TimeSpent,
                date:req.body.date,
                type: req.body.type,
                projectReference:req.body.projectReference,
                userReference :req.body.userReference,
                mouseClicks: req.body.mouseClicks,
                keyboardStrokes:req.body.keyboardStrokes,
                scrollingNumber:req.body.scrollingNumber,
                inactive :req.body.inactive,
                total: req.body.total
              }); 

        res.status(201).json({
            status: 'success',
            body: createDocument
        })


    } catch (err) {
        res.status(400).json({
            status: 'faied',
            body: err
        })

    }

});

exports.delete = catchAsync(async (req, res, next) => {
    try {
        const deleteDocument = await appWebsite
            .findByIdAndDelete(req.params.id);


        res.status(201).json({
            status: 'success',
            body: deleteDocument
        })


    } catch (err) {
        res.status(400).json({
            status: 'failed',
            body: err
        });
    }
});

exports.getById = catchAsync(async (req, res, next) => {
    try {
        console.log(req.params.id);
        const getDocumentByID = await appWebsite.findById(req.params.id);
        res.status(200).json({
            status: 'success',
            body: getDocumentByID
        });
    }
    catch (err) {
        res.status(400).json({
            status: 'failed',
            body: err
        });
    }
});



exports.update = catchAsync(async (req, res, next) => {
    try {
        const updateDocument = await appWebsite.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });


        res.status(201).json({
            status: 'success',
            data: updateDocument
        })

    } catch (err) {
        res.status(400).json({
            status: 'failed',
            body: err
        })

    }
});




exports.getByIdAndDate = catchAsync(async (req, res, next) => {
    try 
    {
        let date = req.body.date;
        // console.log(req.params.id);
        // console.log(req.body.date);
        const getDocumentByDateAndId = await appWebsite
            .findById(req.params.id).where('date').equals(date);

        res.status(200).json({
            status: 'success',
            body: getDocumentByDateAndId
        });

    }
    catch (err) {
        res.status(400).json({
            status: 'failed',
            body: err
        });
    }
})

exports.getAllbyDate = catchAsync(async (req, res, next) => {
    try {
        let date = req.body.date;
        const getAllDocumentsbyDate = await appWebsite.find({}).where('date').equals(date)
        res.status(200).json({
            status: 'success',
            body: getAllDocumentsbyDate
        })
    }
    catch (err) {
        res.status(400).json({
            status: 'failed',
            body: err
        });
    }
});