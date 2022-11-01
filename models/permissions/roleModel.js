var mongoose = require('mongoose');
var AutoIncrement = require('mongoose-sequence')(mongoose);
var Schema = mongoose.Schema;

var roleModelSchema = new Schema({  
    roleId: {
      type: Number,
      unique: true
    },
    roleName: {
      type: String,
      required: true,
      unique: true
    }  
  },
  {
    toJSON: { virtuals: true }, // Use virtuals when outputing as JSON
    toObject: { virtuals: true } // Use virtuals when outputing as Object
  },
  {collection: 'Role' });      
  
  module.exports = mongoose.model('Role', roleModelSchema);