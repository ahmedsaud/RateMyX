app.controller('VoteDetailsController', function ($scope, $routeParams, notifier, VoteService) {
    var voteId = $routeParams.id;

    VoteService.getVoteById(voteId)
        .then(function (vote) {
            $scope.vote = vote;
        });
});