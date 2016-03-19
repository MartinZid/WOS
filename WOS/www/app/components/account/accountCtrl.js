'use strict';
angular.module('wos.controllers.account', [])

.controller('AccountCtrl', function ($scope, $state) {
    /// <summary>
    /// Controller for homepage tab
    /// </summary>
    /// <param name="$scope" type="type"></param>
    $scope.selectedSection = 1;
    $scope.status = 0;

    //$rootScope.notifications = '#/tab/notifications';

    $scope.logout = function () {
        /// <summary>
        /// It handles logout and redirects user to login page.
        /// </summary>
        //handle logout
        $state.go('tab.login');
    };

    //$scope.$on('$ionicView.beforeEnter', function () {
    //    $state.go('tab.item-detail', { 'itemId': 28});
    //})

    $scope.doRefresh = function () {
        console.log('refreshing...');
    };

    $scope.changeSection = function (state) {
        /// <summary>
        /// Change section to user's chosen (state param).
        /// </summary>
        /// <param name="state" type="integer"></param>
        $scope.selectedSection = state;
    };
})
