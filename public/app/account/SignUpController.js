app.controller('SignUpCtrl', function ($scope, $location, auth, identity, notifier) {
    if (identity.isAuthenticated()) {
        $location.path('/');
    }

    $scope.signup = function (user) {
        auth.signup(user).then(function () {
            notifier.success('Registration successful!');
            $location.path('/');
        }, function (error) {
            notifier.error(error.data.message);
        })
    }
});