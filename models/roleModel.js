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
  }, {
    toJSON: { virtuals: true }, // Use virtuals when outputing as JSON
    toObject: { virtuals: true } // Use virtuals when outputing as Object
  },
  { collection: 'Role' });
  roleModelSchema.plugin(AutoIncrement, {id:'RoleId_seq',inc_field: 'roleId'});
  roleModelSchema.virtual('rolePerms', {
    ref: 'RolePerms',
    foreignField: 'role', // tour field in review model pointing to this model
    localField: 'roleId' // id of current model
  });
  
  module.exports = mongoose.model('Role', roleModelSchema);