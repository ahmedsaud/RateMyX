var auth = require('../config/auth'),
    Vote = require('mongoose').model('Vote');

module.exports = {
    getVotesByMostLikes: function (req, res, next) {
        Vote.find({}, { 'category': 1, '_id': 1, 'pictureUrl': 1 }, { sort: { likes: -1 }, skip: 0, limit: 4 }, function (error, collection) {
            if (error) {
                console.log('Failed to load the vote: ' + error);
                return next(error);
            }

            res.send(collection);
            res.end();
        });
    }
};