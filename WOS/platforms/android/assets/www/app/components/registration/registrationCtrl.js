'use strict';
angular.module('wos.controllers.registration', [])

.controller('RegistrationCtrl', function ($scope, $state, profile) {
    /// <summary>
    /// Controller for registration.
    /// </summary>
    /// <param name="$scope" type="type"></param>
    /// <param name="$state" type="type"></param>

    $scope.status = 3;
    $scope.user;

    $scope.registration = function (user) {
        /// <summary>
        /// Called after user clicks registration. It passes data to model.
        /// </summary>
        /// <param name="user" type="object"></param>
        console.log('submited');
        profile.registerUser(user.name, user.surname, user.email, user.password)
        .success(function (data) {
            if (data != 'false') {
                $scope.status = 0;
            } else {
                $scope.status = 1;
            }
        }).error(function () {
            $scope.status = 2;
            $scope.user = {
                name: user.name,
                surname: user.surname,
                email: user.email,
                password: user.password
            };
        });
    };
    $scope.doRefresh = function () {
        $scope.registration($scope.user);
    };
})