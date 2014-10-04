var UsersController = require('../controllers/UsersController'),
    VoteController = require('../controllers/VoteController'),
    CategoryController = require('../controllers/CategoryController');

module.exports = {
    users: UsersController,
    votes: VoteController,
    categories: CategoryController
};