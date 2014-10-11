var mongoose = require('mongoose'),
    CommentSchema = mongoose.model('Comment').schema;

var voteSchema = mongoose.Schema({
    category: { type: String, require: '{PATH} is required' },
    pictureUrl: { type: String, require: '{PATH} is required'},
    userId: { type: String, require: '{PATH} is required' },
    description: { type: String, require: '{PATH} is required'},
    likes: { type: Number, default: 0 },
    numberOfLikers: { type: Number, min: 0, default: 0 },
    comments: [CommentSchema],
    isCurrentUserVotted: { type: Boolean, default: false }
});

mongoose.model('Vote', voteSchema);