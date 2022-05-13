var mongoose = require('mongoose');
var AutoIncrement = require('mongoose-sequence')(mongoose);
var Schema = mongoose.Schema;

var countryModelSchema = new Schema({  
  countryId: {
    type: Number,
    unique: true
  },
  countryName: {
    type: String,
    required: true,
    unique: true
  }  
}, { collection: 'Country' });
countryModelSchema.plugin(AutoIncrement, {id:'countryId_seq',inc_field: 'countryId'});
 
module.exports = mongoose.model('Country', countryModelSchema);