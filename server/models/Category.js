var mongoose = require('mongoose');

var categorySchema = mongoose.Schema({
    name: { type: String, require: '{PATH} is required', unique: true }
});

mongoose.model('Category', categorySchema);