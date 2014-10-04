var mongoose = require('mongoose');

var commentSchema = mongoose.Schema({
    voteId: { type: String, require: '{PATH} is required'},
    content: { type: String, require: '{PATH} is required'}
});

mongoose.model('Comment', commentSchema);