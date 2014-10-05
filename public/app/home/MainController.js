app.controller('MainController', function ($scope, identity, VoteService) {
    var categories = {};

    VoteService.getCategoryNames()
        .then(function (collection) {
            collection.forEach(function (category) {
                categories[category.name.toLowerCase()] = [];
            });

            VoteService.getVotes()
                .then(function (votes) {
                    for (var i = 0; i < votes.length; i++) {
                        var vote = votes[i];
                        if (!vote.category) {
                            continue;
                        }

                        var categoryNameToLowerCase = vote.category.toLowerCase();
                        if (categories[categoryNameToLowerCase]) {
                            categories[categoryNameToLowerCase].push(vote);
                        }
                    }

                    $scope.categories = categories;
                });
        });
});