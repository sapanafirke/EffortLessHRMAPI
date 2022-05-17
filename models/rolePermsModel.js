var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var rolePermsModelSchema = new Schema({  
    perms: {
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
    select: 'roleName'
  }).populate({
    path: 'permission',
    select: 'permissionName permissionDetails'
  });
  next();
});

module.exports = mongoose.model('RolePerms', rolePermsModelSchema);