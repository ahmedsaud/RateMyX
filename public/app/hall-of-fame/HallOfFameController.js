app.controller('HallOfFameController', function ($scope, identity, VoteService) {
    VoteService.getVotesByMostLikes()
        .then(function (data) {
            $scope.votesByMostLikes = data;
        });
});