app.controller('ListCategoryController', function ($scope, $route, notifier, VoteService) {
    VoteService.getCategoryNames()
        .then(function (collection) {
            $scope.categories = collection;
        });

    $scope.removeCategory = function (category) {
        VoteService.deleteCategory(category._id)
            .then(function (data) {
                notifier.warning(data.message);
                $route.reload();
            }, function () {
                notifier.error('Something bad happened!')
            });
    }
});