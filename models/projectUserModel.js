var mongoose = require('mongoose');
var AutoIncrement = require('mongoose-sequence')(mongoose);
var Schema = mongoose.Schema;

var projectUsersModelSchema = new Schema({ 
  project: {
    type: mongoose.Schema.ObjectId,
    ref: 'Project',
    required: [true, 'Project must belong to a Project']
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'User must belong to a User']
  },
  createdOn: {
    type: Date,
    required: true    
  },
  updatedOn: {
    type: Date,
    required: true    
  },  
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'//,
  //  required: [true, 'User must belong to a User']
  },
  updatedBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'//,
    //required: [true, 'User must belong to a User']
  },
  company: {
    type: mongoose.Schema.ObjectId,
    ref: 'Company'//,
    //required: [true, 'User must belong to a User']
  },
  status:
  {
    type: String
  }
  },
  {
    toJSON: { virtuals: true }, // Use virtuals when outputing as JSON
    toObject: { virtuals: true } // Use virtuals when outputing as Object
  },
  { collection: 'ProjectUsers' });

  projectUsersModelSchema.pre(/^find/,async function(next) {
    this.populate({
      path: 'company',
      select: 'companyName'
    }).populate({
      path: 'createdBy',
      select: 'firstName lastName'
    }).populate({
      path: 'updatedBy',
      select: 'firstName lastName'
    }).populate({
      path: 'project',
      select: 'projectName notes startDate endDate estimatedTime status'
    }).populate({
      path: 'user',
      select: 'firstName lastName'
    });
    next();
  });

module.exports = mongoose.model('ProjectUsers', projectUsersModelSchema);