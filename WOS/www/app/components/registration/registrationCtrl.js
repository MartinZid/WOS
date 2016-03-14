'use strict';
angular.module('wos.controllers.registration', [])

.controller('RegistrationCtrl', function ($scope) {
    /// <summary>
    /// Controller for registration.
    /// </summary>
    /// <param name="$scope" type="type"></param>

    $scope.registration = function (user) {
        console.log('submited');
        console.log(user.name);
    }
})