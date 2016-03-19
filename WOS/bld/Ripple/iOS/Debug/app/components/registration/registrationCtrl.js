'use strict';
angular.module('wos.controllers.registration', [])

.controller('RegistrationCtrl', function ($scope, $state) {
    /// <summary>
    /// Controller for registration.
    /// </summary>
    /// <param name="$scope" type="type"></param>
    /// <param name="$state" type="type"></param>

    $scope.registration = function (user) {
        /// <summary>
        /// Called after user clicks registration. It passes data to model.
        /// </summary>
        /// <param name="user" type="object"></param>
        console.log('submited');
        console.log(user.name);
        $state.go('tab.login');
    }
})