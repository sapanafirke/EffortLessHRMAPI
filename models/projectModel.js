var mongoose = require('mongoose');
var AutoIncrement = require('mongoose-sequence')(mongoose);
var Schema = mongoose.Schema;

var projectModelSchema = new Schema({ 
  projectName: {
    type: String,
    required: true,
    unique: true
   },
   startDate: {
    type: Date 
  },
  endDate: {
    type: Date   
  },
  estimatedTime:{
    type:Number
  },
  notes:{
    type:String
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
  { collection: 'Project' });

  projectModelSchema.pre(/^find/,async function(next) {
    this.populate({
      path: 'company',
      select: 'companyName'
    }).populate({
      path: 'createdBy',
      select: 'firstName'
    }).populate({
      path: 'updatedBy',
      select: 'firstName'
    });
    next();
  });

module.exports = mongoose.model('Project', projectModelSchema);