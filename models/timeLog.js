var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var timeLogSchema = new Schema({
  user: {
    type: String,
    required: true
  },
  task: {
    type: mongoose.Schema.ObjectId,
    ref: 'Task',
    required: [true, 'Task must belong to a project']
  },
  project: {
    type: mongoose.Schema.ObjectId,
    ref: 'Project',
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
  filePath: {
    type: String    
  },
  fileString: {
    type: String,
    required: false
  },
  keysPressed: {
    type: Number,
    required: false
  },
  clicks: {
    type: Number,
    required: false
  },
  scrolls: {
    type: Number,
    required: false
  },
  url: {
    type: String,
    required: false
  }

}, { collection: 'TimeLog' });
timeLogSchema.pre(/^find/,async function(next) {
  this.populate({
    path: 'task',
    select: 'taskName'
  }).populate({
    path: 'project',
    select: 'projectName'
  });
  next();
});
module.exports = mongoose.model('TimeLog', timeLogSchema);
