'use strict';
angular.module('wos.controllers.login', [])

.controller('LoginCtrl', function ($scope) {
    /// <summary>
    /// Controller for registration.
    /// </summary>
    /// <param name="$scope" type="type"></param>

    $scope.login = function (user) {
        console.log('submited');
        console.log(user.email + " " + user.password);
    }
})