var mongoose = require('mongoose');
var AutoIncrement = require('mongoose-sequence')(mongoose);
var Schema = mongoose.Schema;

var userSubordinateModelSchema = new Schema({  
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required:true,    
  },  
  subordinateUserId: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
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
  userSubordinateModelSchema.pre(/^find/,async function(next) {
    this.populate({
      path: 'userId',
      select: 'email'
    }).populate({
      path: 'subordinateUserId',
      select: 'email'
    });
    next();
  });
  module.exports = mongoose.model('userSubordinate', userSubordinateModelSchema);