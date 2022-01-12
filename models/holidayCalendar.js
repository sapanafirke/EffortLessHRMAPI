var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var holidayCalendarSchema = new Schema({  
  holidayDate: {
    type: Date,
    required: true
  },
  holidayName: {
    type: String,
    required: true
  }  
}, { collection: 'holidayCalendar' });

module.exports = mongoose.model('holidayCalendar', holidayCalendarSchema);