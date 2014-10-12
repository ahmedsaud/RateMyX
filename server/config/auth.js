var passport = require('passport');

module.exports = {
    login: function (req, res, next) {
        var authenticate = passport.authenticate('local', function (error, user) {
            if (error) {
                return next(error);
            }

            if (!user) {
                res.send({success: false})
            }

            req.logIn(user, function (error) {
                if (error) {
                    return next(error);
                }

                res.send({success: true, user: {
                    username: user.username,
                    roles: user.roles,
                    _id: user._id
                }});
            })
        });

        authenticate(req, res, next);
    },
    logout: function (req, res) {
        req.logout();
        res.redirect('/');
    },
    isAuthenticated: function (req, res, next) {
        if (!req.isAuthenticated()) {
            res.status(403);
            res.end();
        }
        else {
            next();
        }
    },
    isInRole: function (role) {
        return function (req, res, next) {
            if (req.isAuthenticated() && req.user.roles.indexOf(role) > -1) {
                next();
            }
            else {
                res.status(403);
                res.end();
            }
        }
    }
};