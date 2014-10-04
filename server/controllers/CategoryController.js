var Category = require('mongoose').model('Category');

module.exports = {
    getAllCategories: function (req, res) {
        Category.find({}).exec(function (error, collection) {
            if (error) {
                console.log('Categories could not be loaded: ' + error);
            }

            res.send(collection);
        })
    }
};