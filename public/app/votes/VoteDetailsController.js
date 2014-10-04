app.controller('VoteDetailsController', function ($scope, $routeParams, notifier, VoteResource) {
    var voteId = $routeParams.id;

    VoteResource.get({id: voteId}).$promise
        .then(function (vote) {
            $scope.vote = vote;
        });
});