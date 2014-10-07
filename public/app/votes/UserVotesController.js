app.controller('UserVotesController', function ($scope, $routeParams, VoteService) {
    VoteService.getUserVotes()
        .then(function (votes) {
            $scope.votes = votes;
        });
});