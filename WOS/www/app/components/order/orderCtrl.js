'use strict';
angular.module('wos.controllers.order', [])

.controller('OrderCtrl', function ($scope, $stateParams, item, api, locality) {
    /// <summary>
    /// Controller for order view.
    /// </summary>
    /// <param name="$scope" type="type"></param>
    $scope.itemId = $stateParams.itemId;
    $scope.item;
    $scope.status = 3;
    $scope.imgURL = api.url;
    $scope.takeOverOption = {};
    $scope.userId = 18;
    $scope.userLocality;
    $scope.selectedLocality = {};
    $scope.locality = {};
    $scope.from = {};
    $scope.to = {};
    $scope.forms = {};

    getItemDetail($scope.itemId);
    getUserLocality();

    function getItemDetail(id) {
        /// <summary>
        /// Downloads data for item detail
        /// </summary>
        item.getDetail(id)
            .success(function (data) { ///if success save loaded data to $scope.items
                //any code in here will automatically have an apply run afterwards
                $scope.item = data[0];
                console.log(data);
                $scope.status = 0;

            }).error(function (data) { ///if can not load data from server set $scope.status, for error handling
                console.log('order.getItemDetail: Can not load data from server.');
                $scope.status = 2;
            });
    };

    function getUserLocality() {
        locality.getUserLocalities($scope.userId)
            .success(function (data) {
                $scope.userLocality = data;
                $scope.status = 0;
                console.log(data);
            }).error(function () {
                console.log('order.getUserLocalities: Can not load data from server.');
                $scope.status = 2;
            });
    };
    
    $scope.addToCart = function () {
        var takeOver = $scope.takeOverOption.value;
        console.log(takeOver );
        if (takeOver == 0)
            console.log($scope.userLocality[$scope.selectedLocality.value]);
        if (takeOver == 1)
            console.log($scope.item.locality[$scope.selectedLocality.value]);
        if (takeOver == 2)
            console.log($scope.locality.city + ' ' + $scope.locality.street + ' ' + $scope.locality.postal_code);
        console.log($scope.from.date + ' ' + $scope.from.time)
        console.log($scope.to.date + ' ' + $scope.to.time)
    };
})