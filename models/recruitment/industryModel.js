var mongoose = require('mongoose');
var AutoIncrement = require('mongoose-sequence')(mongoose);
var Schema = mongoose.Schema;

var industryModelSchema = new Schema({  
    Id: {
      type: Number,
      unique: true
    },
    Name:{
      type: String,
      required: true,
      unique: true
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
  {collection: 'Industry'});
  
  module.exports = mongoose.model('industry', industryModelSchema);
  
