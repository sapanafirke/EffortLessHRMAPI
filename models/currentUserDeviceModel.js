var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var currentUserDeviceSchema = new Schema({  
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },  
  machineId: {
    type: String,
    required: true
  },
  createdOn: {
    type: Date,
    required: true    
  },  
  company: {
    type: mongoose.Schema.ObjectId,
    ref: 'Company'//,
    //required: [true, 'User must belong to a User']
  },
  status:
  {
    type: String
  }

},   {
  toJSON: { virtuals: true }, // Use virtuals when outputing as JSON
  toObject: { virtuals: true } // Use virtuals when outputing as Object
},{ collection: 'CurrentUserDevice' });


currentUserDeviceSchema.pre(/^find/,async function(next) {
  this.populate({
    path: 'company',
    select: 'companyName'
  });
  next();
});
module.exports = mongoose.model('CurrentUserDevice', currentUserDeviceSchema);
