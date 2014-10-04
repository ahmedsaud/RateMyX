app.factory('GameRequests', function ($q, $http, UsersResource) {
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
        scanUser: function (targetID) {
            return getJson('/api/users-scan/' + targetID);
        }
    }
});