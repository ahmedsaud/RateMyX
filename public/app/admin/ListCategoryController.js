app.controller('ListCategoryController', function ($scope, VoteService) {
    VoteService.getCategoryNames()
        .then(function (collection) {
            $scope.categories = collection;
        });
});