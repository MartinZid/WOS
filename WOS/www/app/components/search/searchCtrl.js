'use strict';
angular.module('wos.controllers.search', [])

.controller('SearchCtrl', function ($scope, item) {
    /// <summary>
    /// Controller for item search view.
    /// </summary>
    /// <param name="$scope" type="type"></param>
    /// <param name="item" type="type"></param>

    $scope.status;
    $scope.items;
    $scope.searchText = {};
    //$scope.query;

    $scope.search = function() {
        /// <summary>
        /// Downloads data for search
        /// </summary>
        item.search($scope.searchText.value)
            .success(function (data) { ///if success save loaded data to $scope.items
                //any code in here will automatically have an apply run afterwards
                $scope.items = data;
                console.log(data);
                $scope.status = 0;
                if ($scope.items.length == 0) {
                    console.log('item.search: No data loaded.');
                    $scope.status = 1;
                }
            }).error(function (data) { ///if can not load data from server set $scope.status, for error handling
                console.log('item.search: Can not load data from server.');
                $scope.status = 2;
            }).finally(function () { /// Stop the ion-refresher from spinning
                $scope.$broadcast('scroll.refreshComplete');
            });
    }
    $scope.doRefresh = function () {
        console.log('refreshing...');
        $scope.search($scope.searchText.value)
    }
})