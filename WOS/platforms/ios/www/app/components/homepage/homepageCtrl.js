'use strict';
angular.module('wos.controllers', [])

.controller('HomepageCtrl', function ($scope, item) {
    /// <summary>
    /// Controller for homepage tab
    /// </summary>
    /// <param name="$scope" type="type"></param>
    /// <param name="item" type="type"></param>

    $scope.items; /// all items
    $scope.status; /// status variable for errors

    getAllItems();

    $scope.doRefresh = function () {
        /// <summary>
        /// Called when main page is "pulled down" for refresh
        /// </summary>
        getAllItems();
    }

    function getAllItems() {
        /// <summary>
        /// Downloads data for homepage
        /// </summary>
        item.getAll()
            .success(function (data) { ///if success save loaded data to $scope.items
                $scope.items = data;
                console.log(data);
                $scope.status = false;
            }).error(function (data) { ///if can not load data from server set $scope.error to true
                console.log('item.getAll: Can not load data from server.');
                $scope.status = true;
            }).finally(function () { /// Stop the ion-refresher from spinning
                $scope.$broadcast('scroll.refreshComplete');
            });
    }

    ///navTitle stores a html img for app icon
    $scope.navTitle = '<img class="title-image" src="assets/img/main_logo.png" />';
})




.controller('DashCtrl', function ($scope) { })

.controller('ChatsCtrl', function ($scope) {

})

.controller('ChatDetailCtrl', function ($scope) {

})

.controller('AccountCtrl', function ($scope) {
    $scope.settings = {
        enableFriends: true
    };
});