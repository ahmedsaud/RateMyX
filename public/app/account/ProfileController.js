app.controller('ProfileCtrl', function ($scope, $location, auth, notifier, identity) {
    $scope.user = {
        _id: identity.currentUser._id,
        firstName: identity.currentUser.firstName,
        lastName: identity.currentUser.lastName
    };

    $scope.updatePassword = function (form) {
        if (form.password !== form.confirmPassword) {
            notifier.error('Different passwords');
            return;
        }

        var user = {
            _id: $scope.user._id,
            password: form.password
        };

        auth.update(user).then(function () {
            notifier.success('Password was changed successfully!');
            $location.path('/');
        })
    };
});