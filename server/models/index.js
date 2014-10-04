'use strict';

var User = require('../models/User'),
    Category = require('../models/Category'),
    Vote = require('../models/Vote'),
    Like = require('../models/Like'),
    Comment = require('../models/Comment');

module.exports = {
    user: User,
    category: Category,
    votes: Vote,
    like: Like,
    comment: Comment
};