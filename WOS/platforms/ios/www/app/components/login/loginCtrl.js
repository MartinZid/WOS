'use strict';
angular.module('wos.controllers.login', [])

.controller('LoginCtrl', function ($scope, $ionicModal) {
    /// <summary>
    /// Controller for login.
    /// </summary>
    /// <param name="$scope" type="type"></param>
    /// <param name="$ionicModal" type="type"></param>
    $scope.email;

    $scope.login = function (user) {
        /// <summary>
        /// Called after user clicks 'login'. It passes form data into model.
        /// </summary>
        /// <param name="user" type="Object"></param>
        console.log('submited');
        console.log(user.email + " " + user.password);
    };

    $scope.forgotttenPassword = function (email) {
        /// <summary>
        /// Called after user submits forgotten password form. It passes data to model.
        /// </summary>
        /// <param name="email" type="type"></param>
        console.log('reseting password');
        console.log(email);
    };

    $ionicModal.fromTemplateUrl('forgotten_password.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.modal = modal;
    });
    $scope.openModal = function () {
        $scope.modal.show();
    };
    $scope.closeModal = function () {
        $scope.modal.hide();
    };

})