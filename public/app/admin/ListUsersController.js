app.controller('ListUsersController', function ($scope, VoteService) {
    VoteService.getUsers()
        .then(function (data) {
            $scope.users = data;
        })
});