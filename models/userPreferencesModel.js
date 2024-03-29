var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userPreferencesSchema = new Schema({
    userName: {
        type: String,
        required: true
    },
    company: {
        type: mongoose.Schema.ObjectId,
        ref: 'Company',
        required: [true, 'Company must belong to a Company']
    },
    preferenceName: {
        type: String,
        required: true
    },
    preferenceValue: {
        type: String,
        required: true
    }
});
userPreferencesSchema.pre(/^find/,async function(next) {
    this.populate({
      path: 'company',
      select: 'companyName'
    });
    next();
  });
userPreferences = mongoose.model('userPreferences', userPreferencesSchema);
module.exports = userPreferences;