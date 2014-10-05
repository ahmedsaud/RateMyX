app.factory('VoteService', function ($q, $http) {
    'use strict';

    function postJson(url, data) {
        data = data || {};
        var deferred = $q.defer();

        $http.post(url, data).success(function (response) {
            if (response.success) {
                deferred.resolve(response);
            }
            else {
                deferred.resolve(false);
            }
        });

        return deferred.promise;
    }

    function getJson(url) {
        var deferred = $q.defer();

        $http.get(url).success(function (response) {
            if (response.success) {
                deferred.resolve(response);
            }
            else {
                deferred.resolve(false);
            }
        });

        return deferred.promise;
    }

    return {
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
        getRandomVote: function() {
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