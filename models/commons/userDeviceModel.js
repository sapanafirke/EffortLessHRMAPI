const mongoose = require('mongoose');

const userDeviceSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  machineId: {
    type: String,
    required: true
  },
  company: {
    type: mongoose.Schema.ObjectId,
    ref: 'Company',   
  }  
});
module.exports = mongoose.model("userDevice", userDeviceSchema);
