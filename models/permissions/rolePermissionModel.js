var mongoose = require('mongoose');
var AutoIncrement = require('mongoose-sequence')(mongoose);
var Schema = mongoose.Schema;

var rolePermissionSchema = new Schema({    
     rolePermissionId: {
      type: Number,
      unique: true
    },  
  roleId: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: 'Role',
    },
    permissionId: {
      type: mongoose.Schema.ObjectId,
      required: true      
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

  module.exports = mongoose.model('rolePermission', rolePermissionSchema);


