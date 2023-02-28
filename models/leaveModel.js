var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var leaveModelSchema = new Schema({  
  user:{
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'User must belong to a User']
  },
  
  LeaveType: {
    type: String,
    required: true
  },
  Date: {
    type: Date,
    required: true
  },
  Note: {
    type: String,
    required: true
  },
  createdOn: {
    type: Date,
    required: true    
  },
  updatedOn: {
    type: Date,
    required: true    
  },  
  approvedBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'//,
  //  required: [true, 'User must belong to a User']
  }, 
  company: {
    type: mongoose.Schema.ObjectId,
    ref: 'Company',
    required: [true, 'Company must belong to a Company']
  },
  status:
  {
    type: String
  }
}, {
  toJSON: { virtuals: true }, // Use virtuals when outputing as JSON
  toObject: { virtuals: true } // Use virtuals when outputing as Object
},
{ collection: 'leave' });

module.exports = mongoose.model('leave', leaveModelSchema);