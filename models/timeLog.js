var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var timeLogSchema = new Schema({ 
  user: {
    type: String,
    required: true
  },
  task: {
    type: String,
    required: true
  },  
  startTime: {
    type: Date,
    required: true    
  },
  date: {
    type: Date,
    required: true    
  },
  endTime: {
    type: Date,
    required: true    
  },
  filePath:{
    type: String,
    required: true
  }

}, { collection: 'TimeLog' });
module.exports = mongoose.model('TimeLog', timeLogSchema);
