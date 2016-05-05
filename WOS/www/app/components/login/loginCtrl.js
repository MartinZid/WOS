'use strict';

angular.module('wos.controllers.login', [])

.controller('LoginCtrl', function ($scope, $ionicModal, $state, profile, $ionicViewSwitcher) {
    /// <summary>
    /// Controller for login.
    /// </summary>
    /// <param name="$scope" type="type"></param>
    /// <param name="$ionicModal" type="type"></param>
    /// <param name="$state" type="type"></param>
    /// <param name="profile" type="type"></param>
    /// <param name="$ionicViewSwitcher" type="type"></param>
    $scope.email;
    $scope.status = 3;
    $scope.errorOrigin = 0; // 0 = no error, 1 = login failed, 2 = forgotten password failed

    $scope.login = function (user) {
        /// <summary>
        /// Called after user clicks 'login'. It passes form data into model.
        /// </summary>
        /// <param name="user" type="Object"></param>
        $scope.spinning = true;
        profile.getUSerIdentity(user.email, user.password)
            .success(function (data) {
                $scope.spinning = false;
                if (data[0][0] == 'Error') { // login failed due to invalid credentials
                    $scope.status = 0;
                } else { // login succeeded, save user to localStorage and redirect user to his profile.
                    $scope.status = 4;
                    profile.login(data[0]);
                    $state.go('tab.account');
                }
            }).error(function () { // login failed due to server error
                $scope.spinning = false;
                $scope.user = {
                    email: user.email,
                    password: user.password
                };
                $scope.status = 2;
                $scope.errorOrigin = 1;
            });
    };

    $scope.forgottenPassword = function (email) {
        /// <summary>
        /// Called after user submits forgotten password form. It passes data to model.
        /// </summary>
        /// <param name="email" type="type"></param>

        $scope.spinning = true;
        console.log('reseting password');
        console.log(email);
        profile.forgottenPassword(email)
            .success(function () {
                $scope.spinning = false;
                console.log('reset successful');
                $scope.status = 1;
            }).error(function () {
                $scope.spinning = false;
                console.log('reset failed');
                $scope.status = 2;
                $scope.email = email;
                $scope.errorOrigin = 2
            });
        $scope.closeModal();
    };

    $scope.doRefresh = function () {
        /// <summary>
        /// Calls the function in which occured a server error.
        /// </summary>
        if ($scope.errorOrigin == 2) // server error while reseting password
            $scope.forgottenPassword($scope.email);
        if ($scope.errorOrigin == 1) // server errror while login
            $scope.login($scope.user);
    };

    $scope.$on('$ionicView.beforeEnter', function () {
        /// <summary>
        /// If user is already logged in, redirect him to his profile.
        /// </summary>
        if (profile.getLoggedInUserData() !== null) {
            $ionicViewSwitcher.nextDirection('none');
            $state.go('tab.account');
        }
    })

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