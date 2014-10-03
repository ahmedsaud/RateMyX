var mongoose = require('mongoose'),
    models = require('../models/User');

module.exports = function (config) {
    mongoose.connect(config.db);
    var db = mongoose.connection;

    db.once('open', function (error) {
        if (error) {
            console.log('Database could not be opened: ' + error);
            return;
        }

        console.log('Database up and running...')
    });

    db.on('error', function (error) {
        console.log('Database error: ' + error);
    });

    models.user.seedInitialUsers();
};

// For development
function clearDatabase() {
    models.user.removeAll();
}

// For development
function showDatabase() {
    models.user.showAll();
}