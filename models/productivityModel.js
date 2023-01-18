const mongoose = require('mongoose');
const { boolean } = require('webidl-conversions');
const Schema = mongoose.Schema;

const productivityModelSchema = new mongoose.Schema({
    AppWebsite: {
        required: true,
        type: String
    },
    company:{
        required:type
    },
    nonProductive: {
        required: true,
        type: boolean
    },
    Neutral: {
        type: boolean,
        required: true
    },
    Productivity: {
        type: boolean,
        required: true
    }
});


module.exports = mongoose.Schema("Productivity Model", Productivity);
