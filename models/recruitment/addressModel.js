var mongoose = require('mongoose');
var AutoIncrement = require('mongoose-sequence')(mongoose);
var Schema = mongoose.Schema;

var addressModelSchema = new Schema({  
    Id: {
      type: Number,
      unique: true
    },
    Address1: {
      type: String
    },
    Address2: {
      type: String
    },
    Address3: {
      type: String
    },
    City: {
      type: String
    },
    State: {
      type: String
    },
    Country: {
      type: String
    },
    PostalCode : {
      type: String
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
  {collection: 'Address' });      
  
  module.exports = mongoose.model('Address', addressModelSchema);




  
