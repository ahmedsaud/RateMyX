var auth = require('../config/auth'),
    Like = require('mongoose').model('Like'),
    Vote = require('mongoose').model('Vote');

module.exports = {
    makeLike: function (req, res, next) {
        var newLikeData = req.body;
        newLikeData.userId = req.user._id;

        Like.create(newLikeData, function (error, like) {
            if (error) {
                console.log('Failed to create new like: ' + error);
                return next(error);
            }

            Vote.findOne({_id: like.voteId}).exec(function (error, vote) {
                if (error) {
                    console.log('Failed to find the vote: ' + error);
                    return next(error);
                }

                var likeRate = like.isUpVote ? 1 : -1;
                vote.likes += likeRate;
                vote.numberOfLikers++;
                vote.save();

                res.send(like);
                res.end();
            })
        });
    }
};