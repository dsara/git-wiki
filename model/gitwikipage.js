var mongoose = require('mongoose');

var PageSchema = new mongoose.Schema({
    name: String,
    created: Date,
    modified: Date,
    content: String
});

module.exports = mongoose.model('Page', PageSchema);