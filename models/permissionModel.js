var mongoose = require('mongoose');
var AutoIncrement = require('mongoose-sequence')(mongoose);
var Schema = mongoose.Schema;
var permissionModelSchema = new Schema({  
  PermissionId: {
      type: Number,
      unique: true
    },
    PermissionName: {
      type: String,
      required: true,
      unique: true
    },
    PermissionDetails: {
      type: String
    }
  },{
    toJSON: { virtuals: true }, // Use virtuals when outputing as JSON
    toObject: { virtuals: true } // Use virtuals when outputing as Object
  },
   { collection: 'Permission' });
  permissionModelSchema.plugin(AutoIncrement, {id:'PermissionId_seq',inc_field: 'PermissionId'});
  permissionModelSchema.virtual('rolePerms', {
    ref: 'RolePerms',
    foreignField: 'permission', // tour field in review model pointing to this model
    localField: 'PermissionId' // id of current model
  });
  module.exports = mongoose.model('Permission', permissionModelSchema);