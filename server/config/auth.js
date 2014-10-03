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

                res.send({success: true, user: user});
            })
        });

        authenticate(req, res, next);
    },
    logout: function (req, res) {
        req.logout();
        res.end();
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