var mongoose = require('mongoose'),
    encryption = require('../utilities/encryption');

var userSchema = mongoose.Schema({
    username: { type: String, require: '{PATH} is required', unique: true },
    salt: String,
    hashPass: String,
    roles: [String]
});

userSchema.method({
    authenticate: function (password) {
        var isPasswordCorrect = encryption.generateHashedPassword(this.salt, password) === this.hashPass;
        return isPasswordCorrect;
    }
});

var User = mongoose.model('User', userSchema);

module.exports.seedInitialUsers = function () {
    User.find({}).exec(function (error, collection) {
        if (error) {
            console.log('Cannot find users: ' + error);
            return;
        }

        if (collection.length === 0) {
            var salt;
            var hashedPwd;

            // Admin
            salt = encryption.generateSalt();
            hashedPwd = encryption.generateHashedPassword(salt, 'admin');
            User.create({username: 'admin', salt: salt, hashPass: hashedPwd, roles: ['admin']});

            // Standard user
            salt = encryption.generateSalt();
            hashedPwd = encryption.generateHashedPassword(salt, 'user');
            User.create({username: 'user', salt: salt, hashPass: hashedPwd, roles: ['standard']});

            console.log('Users added to database...');
        }
    });
};