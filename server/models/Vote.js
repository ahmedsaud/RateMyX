var mongoose = require('mongoose');

var voteSchema = mongoose.Schema({
    category: { type: String, require: '{PATH} is required'},
    pictureUrl: { type: String, require: '{PATH} is required'},
    userId: { type: String, require: '{PATH} is required'},
    question: { type: String, require: '{PATH} is required'}
});

mongoose.model('Vote', voteSchema);