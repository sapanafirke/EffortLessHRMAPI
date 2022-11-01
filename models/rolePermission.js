// var mongoose = require('mongoose');
// var AutoIncrement = require('mongoose-sequence')(mongoose);
// var Schema = mongoose.Schema;
// var permissionModelSchema = new Schema({  
//    rolePermissionId: {
//       type: Number,
//       unique: true
//     },
//     roleId: {
//       type: Number,
//       required: true      
//     },
//     permissionId: {
//       type: Number
//     }
//   },{
//     toJSON: { virtuals: true }, // Use virtuals when outputing as JSON
//     toObject: { virtuals: true } // Use virtuals when outputing as Object
//   },
//    { collection: 'rolePermission' });
//   permissionModelSchema.plugin(AutoIncrement, {id:'rolePermissionId_seq',inc_field: 'permissionId'});
//   permissionModelSchema.virtual('rolePerms', {
//     ref: 'RolePerms',
//     foreignField: 'permission', // tour field in review model pointing to this model
//     localField: 'permissionId' // id of current model
//   });
//   module.exports = mongoose.model('RolePermission', rolePermissionModelSchema);