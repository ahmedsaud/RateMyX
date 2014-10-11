app.factory('VoteService', function ($q, $http) {
    'use strict';

    return {
        getUsers: function () {
            var deferred = $q.defer();

            $http({
                method: 'GET',
                url: '/api/users'
            })
                .success(function (data) {
                    deferred.resolve(data);
                })
                .error(function (error) {
                    deferred.reject(error);
                });

            return deferred.promise;
        },
        getUserVotes: function () {
            var deferred = $q.defer();

            $http({
                method: 'GET',
                url: '/api/votes/mine'
            })
                .success(function (data) {
                    deferred.resolve(data);
                });

            return deferred.promise;
        },
        getVotesByCategoryName: function (categoryName) {
            var deferred = $q.defer();

            $http({
                method: 'GET',
                url: '/api/categories/' + categoryName
            })
                .success(function (data) {
                    deferred.resolve(data);
                });

            return deferred.promise;
        },
        getVotesByMostLikes: function () {
            var deferred = $q.defer();

            $http({
                method: 'GET',
                url: '/api/hall-of-fame/by-most-likes'
            })
                .success(function (data) {
                    deferred.resolve(data);
                });

            return deferred.promise;
        },
        makeLike: function (likeData) {
            var deferred = $q.defer();

            $http({
                method: 'POST',
                url: '/api/likes/',
                data: likeData
            })
                .success(function (data) {
                    deferred.resolve(data);
                })
                .error(function (error) {
                    deferred.reject(error);
                });

            return deferred.promise;
        },
        createComment: function (commentData) {
            var deferred = $q.defer();

            $http({
                method: 'POST',
                url: '/api/comments/',
                data: commentData
            })
                .success(function (data) {
                    deferred.resolve(data);
                })
                .error(function (error) {
                    deferred.reject(error);
                });

            return deferred.promise;
        },
        createCategory: function (categoryModel) {
            var deferred = $q.defer();

            $http({
                method: 'POST',
                url: '/api/categories/',
                data: categoryModel
            })
                .success(function (data) {
                    deferred.resolve(data);
                })
                .error(function (error) {
                    deferred.reject(error);
                });

            return deferred.promise;
        },
        getCategoryNames: function () {
            var deferred = $q.defer();

            $http({
                method: 'GET',
                url: '/api/categories/'
            })
                .success(function (data) {
                    deferred.resolve(data);
                });

            return deferred.promise;
        },
        createVote: function (voteModel) {
            var deferred = $q.defer();

            $http({
                method: 'POST',
                url: '/api/votes/',
                data: voteModel
            })
                .success(function (data) {
                    deferred.resolve(data);
                })
                .error(function (error) {
                    deferred.reject(error);
                });

            return deferred.promise;
        },
        getVotes: function () {
            var deferred = $q.defer();

            $http({
                method: 'GET',
                url: '/api/votes/'
            })
                .success(function (data) {
                    deferred.resolve(data);
                });

            return deferred.promise;
        },
        getVoteById: function (voteId) {
            var deferred = $q.defer();

            $http({
                method: 'GET',
                url: '/api/vote/' + voteId
            })
                .success(function (data) {
                    deferred.resolve(data);
                });

            return deferred.promise;
        },
        getRandomVote: function () {
            var deferred = $q.defer();

            $http({
                method: 'GET',
                url: '/api/votes/random'
            })
                .success(function (data) {
                    deferred.resolve(data);
                });

            return deferred.promise;
        }
    }
});