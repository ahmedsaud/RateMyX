app.controller('CreateVoteController', function ($scope, $routeParams, $location, notifier, auth, VoteService, EverliveService) {
    var categories = {};

    VoteService.getCategoryNames()
        .then(function (collection) {
            collection.forEach(function (category) {
                categories[category.name] = category._id;
            });

            $scope.categories = categories;
        });

    $scope.createVote = function (vote) {
        toggleLoading();
        var firstCommaIndex = vote.picture.indexOf(',');
        var imageData = vote.picture.substr(firstCommaIndex + 1);
        notifier.warning('Please wait while picture is uploading...');
        EverliveService.uploadImage(imageData, function (data) {
            onSuccessUpload(data, vote);
        }, onFailedUpload);
    };

    function toggleLoading() {
        $('#loadingmsg').toggle();
        $('#loadingover').toggle();
    }

    function onSuccessUpload(data, vote) {
        EverliveService.getImageData(data.result.Id)
            .then(function (data) {
                $.ajax({
                    type: "GET",
                    url: EverliveService.everlivePictureStorageUri + data.result[0].Url,
                    contentType: "application/json"
                }).then(function (imageData) {
                    notifier.success('Picture was uploaded successfully!');
                    addVoteToDatabase(vote, imageData.Result.Uri);
                })
            }, onFailedUpload);
    }

    function onFailedUpload() {
        toggleLoading();
        notifier.error("Cannot get image data!");
    }

    function addVoteToDatabase(vote, imageUrl) {
        var voteModel = {
            category: vote.category,
            pictureUrl: imageUrl,
            question: vote.question
        };

        VoteService.createVote(voteModel)
            .then(function (data) {
                toggleLoading();
                $location.path('vote/' + data._id);
            }, toggleLoading);
    }
});