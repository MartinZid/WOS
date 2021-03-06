﻿'use strict';
angular.module('wos.controllers.search', [])

.controller('SearchCtrl', function ($scope, item, $filter) {
    /// <summary>
    /// Controller for item search view.
    /// </summary>
    /// <param name="$scope" type="type"></param>
    /// <param name="item" type="type"></param>
    /// <param name="$filter" type="type"></param>

    $scope.status = 0;
    $scope.items;
    $scope.searchText = {};

    $scope.search = function() {
        /// <summary>
        /// Downloads data for search
        /// </summary>
        $scope.status = 3;
        item.search($scope.searchText.value)
            .success(function (data) { ///if success save loaded data to $scope.items
                $scope.items = data;
                // select only approved items
                $scope.items = $filter('filter')($scope.items, { itemState: 2 });
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
        /// <summary>
        /// Refreshes page.
        /// </summary>
        console.log('refreshing...');
        $scope.search($scope.searchText.value)
    }
})