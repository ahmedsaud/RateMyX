app.controller('MainController', function ($scope, CategoryResource, VoteResource) {
    var categories = {};

    CategoryResource.query().$promise
        .then(function (collection) {
            collection.forEach(function (category) {
                categories[category.name] = [];
            });

            VoteResource.query().$promise
                .then(function (votes) {
                    votes.forEach(function (vote) {
                        if (categories[vote.category]) {
                            categories[vote.category].push(vote);
                        }
                    });

                    $scope.categories = categories;
                });
        });
});