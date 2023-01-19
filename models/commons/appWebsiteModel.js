const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const appWebsiteSchema = new mongoose.Schema({
    appWebsite: {
        type: String,
        required: true
    },
    ModuleName: {
        type: String,
        required: true
    },
    ApplicationTitle: {
        type: String,
        required: true
    },
    TimeSpent: {
        type: Number,
        required: true
    },

    date: {
        type: Date,
        required: true
    },

    type: {
        type: String,
        required: true
    },
    projectReference: {
        type: String,
        required: true
    },
    userReference: {
        type: String,
        required: true
    },
    mouseClicks: {
        type: Number,
        required: true
    },
    keyboardStrokes: {
        required: true,
        type: Number
    },
    scrollingNumber: {
        type: Number,
        required: true
    },
    inactive: {
        type: Number,
        required: true
    },
    total: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model("appWebsiteModel", appWebsiteSchema);
