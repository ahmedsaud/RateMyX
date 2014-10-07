var mongoose = require('mongoose');

var commentSchema = mongoose.Schema({
    userId: { type: String, require: '{PATH} is required' },
    voteId: { type: String, require: '{PATH} is required' },
    content: { type: String, require: '{PATH} is required'}
});

mongoose.model('Comment', commentSchema);