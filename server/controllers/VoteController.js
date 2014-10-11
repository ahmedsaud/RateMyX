var auth = require('../config/auth'),
    Vote = require('mongoose').model('Vote'),
    Like = require('mongoose').model('Like');

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = {
    createVote: function (req, res, next) {
        var newVoteData = req.body;
        newVoteData.category = newVoteData.category.toLowerCase();
        newVoteData.userId = req.user._id;

        Vote.create(newVoteData, function (error, user) {
            if (error) {
                console.log('Failed to create new vote: ' + error);
                return next(error);
            }

            res.send(user);
        });
    },
    getAllVotes: function (req, res, next) {
        Vote.find({}).exec(function (error, collection) {
            if (error) {
                console.log('Votes could not be loaded: ' + error);
                return next(error);
            }

            collection.reverse();
            res.send(collection);
        })
    },
    deleteVote: function (req, res, next) {
        var voteId = req.params.id;

        Vote.remove({ _id: voteId }).exec(function (error) {
            if (error) {
                console.log('Vote could not be removed: ' + error);
                return next(error);
            }

            res.send({message: 'Vote was successfully removed!'});
            res.end();
        })
    },
    getVoteById: function (req, res, next) {
        var voteId = req.params.id;

        Vote.findOne({_id: voteId}).exec(function (error, vote) {
            if (error) {
                console.log('Votes could not be loaded: ' + error);
                return next(error);
            }

            Like.findOne({voteId: voteId, userId: req.user._id}).exec(function (error, like) {
                if (error) {
                    console.log('Like could not be loaded: ' + error);
                    return next(error);
                }

                if (like) {
                    vote.isCurrentUserVotted = true;
                }

                res.send(vote);
            });
        })
    },
    getVotesByCategoryName: function (req, res, next) {
        Vote.find({ category: req.params.name }).exec(function (error, collection) {
            if (error) {
                console.log('Votes could not be loaded: ' + error);
                return next(error);
            }

            res.send(collection);
        })
    },
    getRandomVote: function (req, res, next) {
        Vote.find({}).count().exec(function (error, count) {
            var randomIndex = getRandomInt(0, count - 1);
            Vote.find({}).skip(randomIndex).limit(1).exec(function (error, collection) {
                if (error) {
                    console.log('Votes could not be loaded: ' + error);
                    return next(error);
                }

                res.send(collection);
            })
        });
    },
    getUserVotes: function (req, res, next) {
        var userId = req.user._id;

        Vote.find({ userId: userId }).exec(function (error, collection) {
            if (error) {
                console.log('Votes could not be loaded: ' + error);
                return next(error);
            }

            res.send(collection);
        })
    }
};