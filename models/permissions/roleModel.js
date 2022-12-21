var mongoose = require('mongoose');
var AutoIncrement = require('mongoose-sequence')(mongoose);
var Schema = mongoose.Schema;

var roleModelSchema = new Schema({  
    Id: {
      type: Number,
      unique: true
    },
    Name: {
      type: String,
      required: true,
      unique: true
    },
    company: {
      type: mongoose.Schema.ObjectId,
      ref: 'Company',
      required: [true, 'Company must belong to a Company']
    },
    active: {
      type: Boolean,
      default: true,
      select: false
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
    createdOn: {
      type: Date,
      required: true    
    },
    updatedOn: {
      type: Date,
      required: true    
    }    
  },
  {
    toJSON: { virtuals: true }, // Use virtuals when outputing as JSON
    toObject: { virtuals: true } // Use virtuals when outputing as Object
  },
  {collection: 'Role' });      
  
  module.exports = mongoose.model('Role', roleModelSchema);