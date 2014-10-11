var auth = require('../config/auth'),
    Vote = require('mongoose').model('Vote');

module.exports = {
    createComment: function (req, res, next) {
        var newCommentData = req.body;
        newCommentData.userId = req.user._id;

        Vote.findOne({_id: newCommentData.voteId }, function (error, vote) {
            if (error) {
                console.log('Failed to load the vote: ' + error);
                return next(error);
            }

            vote.comments.push(newCommentData);
            vote.save();

            res.send(newCommentData);
            res.end();
        });
    }
};