var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var rolePermsModelSchema = new Schema({  
    Perms: {
      type: Boolean
    },
    role: {
      type: mongoose.Schema.ObjectId,
      ref: 'Role',
      required: [true, 'Role must belong to a Role']
    },
    permission: {
      type: mongoose.Schema.ObjectId,
      ref: 'Permission',
      required: [true, 'Permission must belong to a Permission']
    }
  },
  {
    toJSON: { virtuals: true }, // Use virtuals when outputing as JSON
    toObject: { virtuals: true } // Use virtuals when outputing as Object
  },
   { collection: 'RolePerms' });
  
  
rolePermsModelSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'role',
    select: 'RoleName'
  }).populate({
    path: 'permission',
    select: 'PermissionName PermissionDetails'
  });
  next();
});
  module.exports = mongoose.model('RolePerms', rolePermsModelSchema);