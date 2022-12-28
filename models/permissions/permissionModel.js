var mongoose = require('mongoose');
var AutoIncrement = require('mongoose-sequence')(mongoose);
var Schema = mongoose.Schema;
var permissionModelSchema = new Schema({  
    permissionName: {
      type: String,
      required: true,
      unique: true
    },
    permissionDetails: {
      type: String
    },
    parentPermission:{
      type: Number
    }
  },{
    toJSON: { virtuals: true }, // Use virtuals when outputing as JSON
    toObject: { virtuals: true } // Use virtuals when outputing as Object
  },
   { collection: 'Permission' }); 
  permissionModelSchema.virtual('rolePerms', {
    ref: 'RolePerms',
    foreignField: 'permission', // tour field in review model pointing to this model
    localField: '_id' // id of current model
  });
  module.exports = mongoose.model('Permission', permissionModelSchema);