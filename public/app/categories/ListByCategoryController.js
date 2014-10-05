app.controller('ListByCategoryController', function ($scope, $routeParams, VoteService) {
    var categoryName = $routeParams.name;

    VoteService.getVotesByCategoryName(categoryName)
        .then(function (collection) {
            $scope.category = { name: categoryName };
            $scope.votes = collection;
        });
});