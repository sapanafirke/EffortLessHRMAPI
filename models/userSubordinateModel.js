var mongoose = require('mongoose');
var AutoIncrement = require('mongoose-sequence')(mongoose);
var Schema = mongoose.Schema;

var userSubordinateModelSchema = new Schema({  
  userId: {
    type: String,
    required:true,    
  },  
  subordinateUserId: {
      type: String,
      required:true
    },
    modifiedOn: {
      type: Date,
     // required: true      
    },
    modifiedBy: {
        type: String,
       // required: true      
      },
  },
  {
    toJSON: { virtuals: true }, // Use virtuals when outputing as JSON
    toObject: { virtuals: true } // Use virtuals when outputing as Object
  },
  {collection: 'userSubordinate' });
  
  module.exports = mongoose.model('userSubordinate', userSubordinateModelSchema);