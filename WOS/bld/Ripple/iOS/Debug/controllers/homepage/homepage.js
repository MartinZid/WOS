'use strict';
angular.module('wos.controllers', [])

/// Controller for homepage tab
.controller('HomepageCtrl', function ($scope, item) {
    $scope.items;
    $scope.error;
    item.getAll().success(function (data) { ///if success save loaded data to $scope.items
        $scope.items = data;
        $scope.erroe = false;
    }).error(function (data) { ///if can not load data from server set $scope.error to true
        console.log('item.getAll: Can not load data from server.');
        $scope.error = true;
    });
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