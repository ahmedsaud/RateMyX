app.controller('CreateCategoryController', function ($scope, $routeParams, $location, notifier, VoteService) {
    $scope.createCategory = function (category) {
        VoteService.createCategory(category)
            .then(function () {
                notifier.success('Category was created successfully!');
                $location.path('/admin/categories');
            });
    };
});