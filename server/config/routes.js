var auth = require('./auth'),
    controllers = require('../controllers'),
    apicache = require('apicache'),
    cache = apicache.middleware;

module.exports = function(app) {
    app.get('/api/users', auth.isInRole('admin'), controllers.users.getAllUsers);
    app.post('/api/users', controllers.users.createUser);
    app.put('/api/users', auth.isAuthenticated, controllers.users.updateUser);

    // Vote areas
    app.get('/api/votes', cache('60 minutes'), controllers.votes.getAllVotes);
    app.post('/api/votes', clearCache, auth.isAuthenticated, controllers.votes.createVote);
    app.get('/api/votes/mine', cache('60 minutes'), auth.isAuthenticated, controllers.votes.getUserVotes);
    app.get('/api/votes/random', auth.isAuthenticated, controllers.votes.getRandomVote);
    app.get('/api/vote/:id', auth.isAuthenticated, controllers.votes.getVoteById);
    app.delete('/api/votes/:id', clearCache, auth.isInRole('admin'), controllers.votes.deleteVote);

    // Category areas
    app.get('/api/categories', controllers.categories.getAllCategories);
    app.get('/api/categories/:name', cache('60 minutes'), controllers.votes.getVotesByCategoryName);
    app.post('/api/categories', auth.isInRole('admin'), controllers.categories.createCategory);
    app.delete('/api/categories/:id', auth.isInRole('admin'), controllers.categories.deleteCategory);

    // Like areas
    app.post('/api/likes', auth.isAuthenticated, controllers.likes.makeLike);

    // Comment areas
    app.post('/api/comments', auth.isAuthenticated, controllers.comments.createComment);

    // Hall of fame
    app.get('/api/hall-of-fame/by-most-likes', auth.isAuthenticated, controllers.hallOfFame.getVotesByMostLikes);


    app.get('/partials/:partialArea/:partialName', function(req, res) {
        res.render('../../public/app/' + req.params.partialArea + '/' + req.params.partialName)
    });

    app.post('/login', auth.login);
    app.post('/logout', auth.logout);

    app.get('/api/*', function(req, res) {
        res.status(404);
        res.end();
    });

    app.get('*', function(req, res) {
        res.render('index', {
            currentUser: req.user
        });
    });

    function clearCache(req, res, next) {
        apicache.clear(req.params.collection);
        next();
    }
};