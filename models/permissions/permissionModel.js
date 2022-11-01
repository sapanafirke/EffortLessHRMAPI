var mongoose = require('mongoose');
var AutoIncrement = require('mongoose-sequence')(mongoose);
var Schema = mongoose.Schema;
var permissionModelSchema = new Schema({  
   permissionId: {
      type: Number,
      unique: true
    },
    permissionName: {
      type: String,
      required: true,
      unique: true
    },
    permissionDetails: {
      type: String
    },
    parentPermission:{
      type:Number
    }
  },{
    toJSON: { virtuals: true }, // Use virtuals when outputing as JSON
    toObject: { virtuals: true } // Use virtuals when outputing as Object
  },
   { collection: 'Permission' });
  permissionModelSchema.plugin(AutoIncrement, {id:'permissionId_seq',inc_field: 'permissionId'});
  permissionModelSchema.virtual('rolePerms', {
    ref: 'RolePerms',
    foreignField: 'permission', // tour field in review model pointing to this model
    localField: 'permissionId' // id of current model
  });
  module.exports = mongoose.model('Permission', permissionModelSchema);