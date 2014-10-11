var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');

module.exports = {
    development: {
        rootPath: rootPath,
        db: 'mongodb://localhost/ratemyx',
        port: process.env.PORT || 4444
    },
    production: {
        rootPath: rootPath,
        db: 'mongodb://admin:telerik@ds035300.mongolab.com:35300/ratemyx',
        port: process.env.PORT || 4444
    }
};