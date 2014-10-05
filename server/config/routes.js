var auth = require('./auth'),
    controllers = require('../controllers');

module.exports = function (app) {
  //  app.get('/api/users', auth.isInRole('admin'), controllers.users.getAllCategories);
    app.post('/api/users', controllers.users.createUser);
    app.put('/api/users', auth.isAuthenticated, controllers.users.updateUser);

    // Vote areas
    app.get('/api/votes', controllers.votes.getAllVotes);
    app.post('/api/votes', auth.isAuthenticated, controllers.votes.createVote);
    app.get('/api/votes/random', controllers.votes.getRandomVote);
    app.get('/api/vote/:id', controllers.votes.getVoteById);

    // Category areas
    app.get('/api/categories', controllers.categories.getAllCategories);
    app.get('/api/categories/:name', controllers.votes.getVotesByCategoryName);

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