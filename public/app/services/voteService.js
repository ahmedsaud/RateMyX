app.factory('VoteService', function ($q, $http) {
    'use strict';

    function makeQuery(options) {
        var deferred = $q.defer();

        $http(options)
            .success(function (data) {
                deferred.resolve(data);
            })
            .error(function (error) {
                deferred.reject(error);
            });

        return deferred.promise;
    }

    function getJson(url) {
        return makeQuery({
            method: 'GET',
            url: url
        });
    }

    function postJson(url, data) {
        return makeQuery({
            method: 'POST',
            url: url,
            data: data
        });
    }

    function deleteJson(url) {
        return makeQuery({
            method: 'DELETE',
            url: url
        });
    }

    return {
        getUsers: function () {
            return getJson('/api/users');
        },
        getUserVotes: function () {
            return getJson('/api/votes/mine');
        },
        getVotesByCategoryName: function (categoryName) {
            return getJson('/api/categories/' + categoryName);
        },
        getVotesByMostLikes: function () {
            return getJson('/api/hall-of-fame/by-most-likes');
        },
        getCategoryNames: function () {
            return getJson('/api/categories/');
        },
        getVotes: function () {
            return getJson('/api/votes/');
        },
        getVoteById: function (voteId) {
            return getJson('/api/vote/' + voteId);
        },
        getRandomVote: function () {
            return getJson('/api/votes/random');
        },
        makeLike: function (likeData) {
            return postJson('/api/likes/', likeData);
        },
        createComment: function (commentData) {
            return postJson('/api/comments/', commentData);
        },
        createCategory: function (categoryModel) {
            return postJson('/api/categories/', categoryModel);
        },
        createVote: function (voteModel) {
            return postJson('/api/votes/', voteModel);
        },
        deleteVote: function (voteId) {
            return deleteJson('/api/votes/' + voteId);
        },
        deleteCategory: function (categoryId) {
            return deleteJson('/api/categories/' + categoryId);
        }
    }
});