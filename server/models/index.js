'use strict';

var User = require('../models/User'),
    Category = require('../models/Category'),
    Like = require('../models/Like'),
    Comment = require('../models/Comment'),
    Vote = require('../models/Vote');

module.exports = {
    user: User,
    category: Category,
    vote: Vote,
    like: Like,
    comment: Comment
};