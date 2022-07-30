var mongoose = require('mongoose');
var AutoIncrement = require('mongoose-sequence')(mongoose);
var Schema = mongoose.Schema;

var userRoleModelSchema = new Schema({  
  userRoleId: {
    type: Number,
    required:true,
    unique:true
  },  
  roleId: {
      type: Number,
      required:true
    },
    userId: {
      type: Number,
      required: true      
    }  
  },
  {
    toJSON: { virtuals: true }, // Use virtuals when outputing as JSON
    toObject: { virtuals: true } // Use virtuals when outputing as Object
  },
  {collection: 'UserRole' });
  
  module.exports = mongoose.model('UserRole', userRoleModelSchema);