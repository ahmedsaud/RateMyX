var UsersController = require('../controllers/UsersController'),
    VoteController = require('../controllers/VoteController'),
    CategoryController = require('../controllers/CategoryController'),
    LikeController = require('../controllers/LikeController'),
    CommentController = require('../controllers/CommentController'),
    HallOfFameController = require('../controllers/HallOfFameController');

module.exports = {
    users: UsersController,
    votes: VoteController,
    categories: CategoryController,
    likes: LikeController,
    comments: CommentController,
    hallOfFame: HallOfFameController
};