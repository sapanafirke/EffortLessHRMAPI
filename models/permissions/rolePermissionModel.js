var mongoose = require('mongoose');
var AutoIncrement = require('mongoose-sequence')(mongoose);
var Schema = mongoose.Schema;

var rolePermissionSchema = new Schema({     
    roleId: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: 'Role',
    },
    permissionId: {
      type: mongoose.Schema.ObjectId,
      required: true,
      ref: 'Permission',  
    },
    company:{
        type: mongoose.Schema.ObjectId,
        ref: 'Company',
        required: [true, 'Company must belong to a Company']
      },  
  },
  {
    toJSON: { virtuals: true }, // Use virtuals when outputing as JSON
    toObject: { virtuals: true } // Use virtuals when outputing as Object
  },
  {collection: 'RolePermission'});
  rolePermissionSchema.pre(/^find/,async function(next) {
    this.populate({
      path: 'company',
      select: 'companyName'
    }).populate({
      path: 'roleId',
      select: 'Name'
    }).populate({
      path: 'permissionId',
      select: 'permissionName'
    });
    next();
  });
  module.exports = mongoose.model('RolePermission', rolePermissionSchema);


