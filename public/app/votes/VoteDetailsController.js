app.controller('VoteDetailsController', function ($scope, $routeParams, $location, identity, notifier, VoteService) {
    var voteId = $routeParams.id;
    $scope.identity = identity;

    VoteService.getVoteById(voteId)
        .then(function (vote) {
            $scope.vote = vote;
        });

    $scope.upVote = function () {
        makeVote(true);
    };

    $scope.downVote = function () {
        makeVote(false);
    };

    $scope.deleteVote = function () {
        VoteService.deleteVote($scope.vote._id)
            .then(function (data) {
                notifier.warning(data.message);
                $location.path('/');
            }, function () {
                notifier.error('Something bad happened!')
            });
    };

    $scope.createComment = function (comment) {
        VoteService.createComment({
            voteId: $scope.vote._id,
            content: comment.content
        })
            .then(function (data) {
                $scope.vote.comments.push({
                    content: data.content
                });
                $scope.vote.isCurrentUserCommented = true;
                notifier.success('You commented successfully!');
            }, function () {
                notifier.error('Something bad happened!')
            })
    };

    function makeVote(isUpVote) {
        VoteService.makeLike({voteId: $scope.vote._id, isUpVote: isUpVote})
            .then(function () {
                var likeRate = isUpVote ? 1 : -1;
                $scope.vote.likes += likeRate;
                $scope.vote.isCurrentUserVotted = true;
                $scope.vote.numberOfLikers++;
                notifier.success('You votted successfully!');
            }, function () {
                notifier.error('Something bad happened!')
            })
    }
});