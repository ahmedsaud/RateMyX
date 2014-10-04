var mongoose = require('mongoose');

var likeSchema = mongoose.Schema({
    voteId: { type: String, require: '{PATH} is required'},
    isUpVote: { type: Boolean, require: '{PATH} is required'}
});

mongoose.model('Like', likeSchema);