var auth = require('../config/auth'),
    Vote = require('mongoose').model('Vote');

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = {
    createVote: function (req, res) {
        var newVoteData = req.body;
        newVoteData.category = newVoteData.category.toLowerCase();
        newVoteData.userId = req.user._id;

        Vote.create(newVoteData, function (error, user) {
            if (error) {
                console.log('Failed to create new vote: ' + error);
                return;
            }

            res.send(user);
        });
    },
    getAllVotes: function (req, res) {
        Vote.find({}).exec(function (error, collection) {
            if (error) {
                console.log('Votes could not be loaded: ' + error);
            }

            res.send(collection);
        })
    },
    getVoteById: function (req, res) {
        var voteId = req.params.id;

        Vote.findOne({_id: voteId}).exec(function (error, vote) {
            if (error) {
                console.log('Votes could not be loaded: ' + error);
            }

            res.send(vote);
        })
    },
    getVotesByCategoryName: function (req, res) {
        Vote.find({ category: req.params.name }).exec(function (error, collection) {
            if (error) {
                console.log('Votes could not be loaded: ' + error);
            }

            res.send(collection);
        })
    },
    getRandomVote: function (req, res) {
        Vote.find({}).count().exec(function (error, count) {
            var randomIndex = getRandomInt(0, count - 1);
            Vote.find({}).skip(randomIndex).limit(1).exec(function (error, collection) {
                if (error) {
                    console.log('Votes could not be loaded: ' + error);
                }

                res.send(collection);
            })
        });
    }
};