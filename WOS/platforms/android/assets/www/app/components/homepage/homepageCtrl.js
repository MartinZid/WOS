'use strict';
angular.module('wos.controllers', [])

/// Controller for homepage tab
.controller('HomepageCtrl', function ($scope, item) {
    $scope.items; /// all items
    $scope.status; /// status variable for errors

    getAllItems();

    ///called when main page is "pulled down" for refresh
    $scope.doRefresh = function () {
        getAllItems();
    }

    ///download data for homepage
    function getAllItems () {
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