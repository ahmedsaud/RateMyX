var mongoose = require('mongoose'),
    CommentSchema = mongoose.model('Comment').schema;

var voteSchema = mongoose.Schema({
    category: { type: String, require: '{PATH} is required' },
    pictureUrl: { type: String, require: '{PATH} is required'},
    userId: { type: String, require: '{PATH} is required' },
    question: { type: String, require: '{PATH} is required'},
    givenYes: { type: Number, min: 0, default: 0 },
    givenNo: { type: Number, min: 0, default: 0 },
    likes: { type: Number, default: 0 },
    comments: [CommentSchema]
});

mongoose.model('Vote', voteSchema);