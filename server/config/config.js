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
        db: 'mongodb://admin:telerik@ds043180.mongolab.com:43180/votter',
        port: process.env.PORT || 4444
    }
};