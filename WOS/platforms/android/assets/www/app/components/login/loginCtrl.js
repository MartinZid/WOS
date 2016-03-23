'use strict';
angular.module('wos.controllers.login', [])

.controller('LoginCtrl', function ($scope, $ionicModal, $state, profile) {
    /// <summary>
    /// Controller for login.
    /// </summary>
    /// <param name="$scope" type="type"></param>
    /// <param name="$ionicModal" type="type"></param>
    /// <param name="$state" type="type"></param>
    $scope.email;
    $scope.status = 3;

    $scope.login = function (user) {
        /// <summary>
        /// Called after user clicks 'login'. It passes form data into model.
        /// </summary>
        /// <param name="user" type="Object"></param>
        console.log('submited');
        //console.log(user.email + " " + user.password);
        if (true) { //if login succeeded redirect user, to home
            $state.go('tab.account');
        }
    };

    $scope.forgottenPassword = function (email) {
        /// <summary>
        /// Called after user submits forgotten password form. It passes data to model.
        /// </summary>
        /// <param name="email" type="type"></param>
        console.log('reseting password');
        console.log(email);
        profile.forgottenPassword(email)
            .success(function () {
                console.log('reset successful');
                $scope.status = 0;
            }).error(function () {
                console.log('reset failed');
                $scope.status = 2;
                $scope.email = email;
            });
        $scope.closeModal();
    };

    $scope.doRefresh = function () {
        $scope.forgottenPassword($scope.email);
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