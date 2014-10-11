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
    deleteCategory: function (req, res, next) {
        var categoryId = req.params.id;

        Category.remove({ _id: categoryId }).exec(function (error) {
            if (error) {
                console.log('Category could not be removed: ' + error);
                return next(error);
            }

            res.send({message: 'Category was successfully removed!'});
            res.end();
        })
    },
    getAllCategories: function (req, res) {
        Category.find({}).exec(function (error, collection) {
            if (error) {
                console.log('Categories could not be loaded: ' + error);
                return;
            }

            res.send(collection);
        })
    }
};