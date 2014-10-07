var Category = require('mongoose').model('Category');

module.exports = {
    createCategory: function (req, res) {
        var newCategoryData = req.body;

        Category.create(newCategoryData, function (error, category) {
            if (error) {
                console.log('Failed to create new category: ' + error);
                return;
            }

            res.send(category);
        });
    },
    getAllCategories: function (req, res) {
        Category.find({}).exec(function (error, collection) {
            if (error) {
                console.log('Categories could not be loaded: ' + error);
            }

            res.send(collection);
        })
    }
};