'use strict';
angular.module('wos.controllers.registration', [])

.controller('RegistrationCtrl', function ($scope, $state, profile, $ionicScrollDelegate) {
    /// <summary>
    /// Controller for registration.
    /// </summary>
    /// <param name="$scope" type="type"></param>
    /// <param name="$state" type="type"></param>
    /// <param name="profile" type="type"></param>
    /// <param name="$ionicScrollDelegate" type="type"></param>

    $scope.status = 3;
    $scope.user;

    $scope.registration = function (user) {
        /// <summary>
        /// Called after user clicks registration. It passes data to model.
        /// </summary>
        /// <param name="user" type="object"></param>
        $scope.spinning = true;
        profile.registerUser(user.name, user.surname, user.email, user.password)
            .success(function (data) {
                $scope.spinning = false;
                if (data != 'false') { // registration was successful
                    $scope.status = 0;
                } else { // registration failed
                    $scope.status = 1;
                }
            }).error(function () { // server error
                $scope.spinning = false;
                $scope.status = 2;
                $scope.user = {
                    name: user.name,
                    surname: user.surname,
                    email: user.email,
                    password: user.password
                };
            });
        $scope.scrollTop();
    };
    $scope.doRefresh = function () {
        /// <summary>
        /// Refreshes page.
        /// </summary>
        $scope.registration($scope.user);
    };
    $scope.$on('$ionicView.beforeEnter', function () {
        /// <summary>
        /// If user is already logged in, redirect him to his profile.
        /// </summary>
        if (profile.getLoggedInUserData() !== null)
            $state.go('tab.account');
    });
    $scope.scrollTop = function () {
        /// <summary>
        /// Scrolls to the top of the page.
        /// </summary>
        $ionicScrollDelegate.scrollTop();
    };

})