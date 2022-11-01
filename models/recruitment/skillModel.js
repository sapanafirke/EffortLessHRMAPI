var mongoose = require('mongoose');
var AutoIncrement = require('mongoose-sequence')(mongoose);
var Schema = mongoose.Schema;

var skillModelSchema = new Schema({  
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
  {collection: 'Skill'});

  module.exports = mongoose.model('Skill', skillModelSchema);
  
