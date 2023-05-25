
const LiveTracking = require('./../models/liveTrackingModel');
const express = require('express');
const app = express();
app.use(express.json);
const catchAsync = require('./../utils/catchAsync');


exports.addNew = catchAsync(async (req, res, next) => {
   
    const newLiveTracking = await LiveTracking.create({
      fileString: req.body.fileString,
      user:req.cookies.userId,
      company : req.cookies.companyId,
    });   
   
  });
  exports.addOrUpdateIfExists = catchAsync(async (req, res, next) => {
    const liveTrackigExits = await LiveTracking.find({}).where('user').equals(req.cookies.userId);    
    if (liveTrackigExits.length>0) {
      const newliveTracking = await LiveTracking.updateOne( { user: req.cookies.userId}, { $set: { fileString: req.body.fileString }} ).exec();            
   
    }
    else{ 
     this.addNew();
    }
    const newliveTracking = await LiveTracking.find({}).where('user').equals(req.cookies.userId);  
    res.status(200).json({
      status: 'success',
      data: {
        liveTracking:newliveTracking
      }
    });
  });
   

exports.getByUserId = catchAsync(async (req, res, next) => {
    const { userId } = req.params;
    LiveTracking.where('user').equals(userId)
      .then(liveTrackingEntry => {
        if (!liveTrackingEntry) {
          return res.status(404).json({ error: 'Live tracking entry not found' });
        }
        res.json(liveTrackingEntry);
      })
      .catch(error => {
        res.status(500).json({ error: 'Error retrieving live tracking entry' });
      });
  });