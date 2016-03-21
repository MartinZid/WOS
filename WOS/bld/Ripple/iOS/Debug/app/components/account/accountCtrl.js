'use strict';
angular.module('wos.controllers.account', [])

.controller('AccountCtrl', function ($scope, $state, profile) {
    /// <summary>
    /// Controller for homepage tab
    /// </summary>
    /// <param name="$scope" type="type"></param>
    $scope.selectedSection = 1;
    $scope.status = 0;
    $scope.profile;

    getUserData();

    $scope.doRefresh = function () {
        /// <summary>
        /// Called when account page is "pulled down" for refresh
        /// </summary>
        console.log('refreshing...');
        getUserData();
    }

    function getUserData() {
        /// <summary>
        /// Downloads data for account
        /// </summary>
        profile.getProfileData(25)
            .success(function (data) { ///if success save loaded data to $scope.items
                $scope.profile = data;
                console.log(data);
                $scope.status = 0;
            }).error(function (data) { ///if can not load data from server set $scope.status, for error handling
                console.log('profile.getProfileData: Can not load data from server.');
                $scope.status = 2;
            }).finally(function () { /// Stop the ion-refresher from spinning
                $scope.$broadcast('scroll.refreshComplete');
            });
    }

    //$rootScope.notifications = '#/tab/notifications';

    $scope.logout = function () {
        /// <summary>
        /// It handles logout and redirects user to login page.
        /// </summary>

        // TODO: handle logout
        $state.go('tab.login');
    };

    //$scope.$on('$ionicView.beforeEnter', function () {
    //    $state.go('tab.item-detail', { 'itemId': 28});
    //})

    $scope.changeSection = function (state) {
        /// <summary>
        /// Change section to user's chosen (state param).
        /// </summary>
        /// <param name="state" type="integer"></param>
        $scope.selectedSection = state;
    };
})
