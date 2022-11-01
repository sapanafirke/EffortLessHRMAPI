var mongoose = require('mongoose');
var AutoIncrement = require('mongoose-sequence')(mongoose);
var Schema = mongoose.Schema;

var applicantModelSchema = new Schema({
    Id: {
      type: Number,
      unique: true
    },
    FirstName: {
      type: String,
      required: true
    },
    LastName:{
        type: String,
        required: true
      },
    EMails: {
      type: String,
      required: true
    },
    PhoneNumbers: {
      type: String,
      required: true
    },    
    CurrentDesignation: {
      type: mongoose.Schema.ObjectId,
      ref:'Designation',
      required: [true, 'Current Designation must be specified']
    },
    currentLocation:{
        type:String
    },
    preferredLocation:{
        type:string
    },
    Role:{
        type:mongoose.Schema.ObjectId,
        ref:'Role'
    },
    Industry:{
        type:mongoose.Schema.ObjectId,
        ref:'Industry'
    },
    Experience:{
        type:Number
    },
    CurrentSalary:{
        type:Number
    },
    ExpectedSalary:{
        type:Number
    },
    HighestDegree:{
        type: mongoose.Schema.ObjectId,
        ref:'Degree',
    },
    NoticePeriod:{
        type: string        
    },
    Education:{
        type: mongoose.Schema.ObjectId,
        ref:'Education',
        required: true
      },
      DOB:{
        type:Date
      },
      Gender:{
        type:string
      },
      MaritalStatus:{
        type:string
      },
      ReasonOfLeaving:{
        type:string
      },
      UpdatedBy:{
        type: mongoose.Schema.ObjectId,
        ref:'User',
        required: true
      },
      UpdatedOn:{
        type:Date,
        required:true
      },
      company: {
        type: mongoose.Schema.ObjectId,
        ref: 'Company',
        required: [true, 'Company must belong to a Company']
      }   
  },
  {
    toJSON: { virtuals: true }, // Use virtuals when outputing as JSON
    toObject: { virtuals: true } // Use virtuals when outputing as Object
  },
  {collection: 'Applicant'});
  
  module.exports = mongoose.model('applicant', applicantModelSchema);




  
