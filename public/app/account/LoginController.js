app.controller('LoginController', function ($scope, $location, notifier, identity, auth) {
    if (identity.isAuthenticated()) {
        $location.path('/');
    }

    $scope.identity = identity;

    $scope.login = function (user) {
        auth.login(user).then(function (success) {
            if (success) {
                notifier.success('Successful login!');
                $location.path('/');
            }
            else {
                notifier.error('Username/Password combination is not valid!');
            }
        });
    };

    $scope.logout = function () {
        auth.logout().then(function () {
            notifier.success('Successful logout!');

            if ($scope.user) {
                $scope.user.username = '';
                $scope.user.password = '';
            }
            
            $location.path('/');
        })
    }
});