'use strict';
angular.module('wos.controllers', [])

.controller('HomepageCtrl', function ($scope, item) {
    /// <summary>
    /// Controller for homepage tab
    /// </summary>
    /// <param name="$scope" type="type"></param>
    /// <param name="item" type="type"></param>

    $scope.items; /// all items
    $scope.status = 0; /// status variable for errors (0 = no error, 1 = there are no items; 2 = server error) 
    $scope.message; /// variable with message string

    getAllItems();

    $scope.doRefresh = function () {
        /// <summary>
        /// Called when main page is "pulled down" for refresh
        /// </summary>
        console.log('refreshing...');
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
                $scope.status = 0;
                if ($scope.items.length == 0) {
                    console.log('item.getAll: No data loaded.');
                    $scope.message = 'Zde budou všechny položky.'
                    $scope.status = 1;
                }
            }).error(function (data) { ///if can not load data from server set $scope.error to true
                console.log('item.getAll: Can not load data from server.');
                $scope.message = "Bohužel se nepodařilo načíst žádné položky. :-(";
                $scope.status = 2;
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