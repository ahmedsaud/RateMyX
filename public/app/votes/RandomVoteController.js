app.controller('RandomVoteController', function ($scope, $routeParams, notifier, VoteService) {
    VoteService.getRandomVote()
        .then(function (vote) {
            $scope.vote = vote[0];
        });
});