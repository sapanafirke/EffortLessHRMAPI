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
},
{
    toJSON: { virtuals: true }, // Use virtuals when outputing as JSON
    toObject: { virtuals: true } // Use virtuals when outputing as Object
},
{ collection: 'Country' });
countryModelSchema.plugin(AutoIncrement, {id:'countryId_seq',inc_field: 'countryId'});
countryModelSchema.virtual('user', {
  ref: 'User',
  foreignField: 'country', // tour field in review model pointing to this model
  localField: '_id' // id of current model
});
countryModelSchema.virtual('company', {
  ref: 'Company',
  foreignField: 'country', // tour field in review model pointing to this model
  localField: '_id' // id of current model
});

module.exports = mongoose.model('Country', countryModelSchema);