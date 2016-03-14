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

    //$scope.$on('$ionicView.beforeEnter', function () {
    //    $state.go('tab.item-detail', { 'itemId': 28});
    //})

    $scope.doRefresh = function () {
        console.log('refreshing...');
    };

    $scope.changeSection = function (state) {
        $scope.selectedSection = state;
    };
})
