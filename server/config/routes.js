var auth = require('./auth'),
    controllers = require('../controllers');

module.exports = function (app) {
    app.get('/api/users', auth.isInRole('admin'), controllers.users.getAllUsers);
    app.post('/api/users', controllers.users.createUser);
    app.put('/api/users', auth.isAuthenticated, controllers.users.updateUser);

    // Vote areas
    app.get('/api/votes', controllers.votes.getAllVotes);
    app.post('/api/votes', auth.isAuthenticated, controllers.votes.createVote);
    app.get('/api/votes/mine', controllers.votes.getUserVotes);
    app.get('/api/votes/random', controllers.votes.getRandomVote);
    app.get('/api/vote/:id', controllers.votes.getVoteById);

    // Category areas
    app.get('/api/categories', controllers.categories.getAllCategories);
    app.get('/api/categories/:name', controllers.votes.getVotesByCategoryName);
    app.post('/api/categories', controllers.categories.createCategory);

    // Like areas
    app.post('/api/likes', auth.isAuthenticated, controllers.likes.makeLike);

    // Comment areas
    app.post('/api/comments', auth.isAuthenticated, controllers.comments.createComment);

    // Hall of fame
    app.get('/api/hall-of-fame/by-most-likes', controllers.hallOfFame.getVotesByMostLikes);


    app.get('/partials/:partialArea/:partialName', function (req, res) {
        res.render('../../public/app/' + req.params.partialArea + '/' + req.params.partialName)
    });

    app.post('/login', auth.login);
    app.post('/logout', auth.logout);

    app.get('/api/*', function (req, res) {
        res.status(404);
        res.end();
    });

    app.get('*', function (req, res) {
        res.render('index', { currentUser: req.user });
    });
};