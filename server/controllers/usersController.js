var encryption = require('../utilities/encryption'),
    User = require('mongoose').model('User');

module.exports = {
    createUser: function (req, res) {
        var newUserData = req.body;
        newUserData.salt = encryption.generateSalt();
        newUserData.hashPass = encryption.generateHashedPassword(newUserData.salt, newUserData.password);

        User.create(newUserData, function (error, user) {
            if (error) {
                console.log('Failed to register new user: ' + error);
                res.status(400);
                res.send({message: 'Failed to register new user'});
                return;
            }

            req.logIn(user, function (error) {
                if (error) {
                    res.status(400);
                    return res.send({ reason: error.toString() });
                }

                res.send(user);
            })
        });
    },
    updateUser: function (req, res) {
        if (req.user._id == req.body._id || req.user.roles.indexOf('admin') > -1) {
            var updatedUserData = req.body;
            if (updatedUserData.password && updatedUserData.password.length > 5) {
                updatedUserData.salt = encryption.generateSalt();
                updatedUserData.hashPass = encryption.generateHashedPassword(updatedUserData.salt, updatedUserData.password);
            }

            User.update({_id: req.body._id}, updatedUserData, function () {
                res.end();
            });
        }
        else {
            res.send({reason: 'You do not have permissions!'})
        }
    }
};