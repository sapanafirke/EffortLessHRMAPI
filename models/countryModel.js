var mongoose = require('mongoose');
var AutoIncrement = require('mongoose-sequence')(mongoose);
var Schema = mongoose.Schema;

var countryModelSchema = new Schema({  
  CountryId: {
    type: Number,
    unique: true
  },
  CountryName: {
    type: String,
    required: true,
    unique: true
  }  
}, { collection: 'Country' });
countryModelSchema.plugin(AutoIncrement, {id:'CountryId1_seq',inc_field: 'CountryId'});
 
module.exports = mongoose.model('Country', countryModelSchema);