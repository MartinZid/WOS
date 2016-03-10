'use strict';
angular.module('wos.controllers.cart', [])

.controller('CartCtrl', function ($scope) {
    /// <summary>
    /// Controller for cart view.
    /// </summary>
    /// <param name="$scope" type="type"></param>
    $scope.status = 0;

    $scope.data = {
        showDelete: false
    };

    $scope.deleteItem = function (item) {
        console.log('Deleting: ' + item.text)
        //$scope.items.splice($scope.items.indexOf(item), 1);
    };

    $scope.doRefresh = function () {
        console.log('refreshing...');
    }
    $scope.items = [
        {
            id: 1,
            name: 'Bagr Caterpillar',
            img: 'http://sp2.binarity-testing.cz//images/tiles/square/small_56ab947e496de.png',
            from: '28.2.2015',
            to: '26.3.2015',
            price: '36000'
        },
        {
            id: 2,
            name: 'John Deere',
            img: 'http://sp2.binarity-testing.cz//images/tiles/square/small_56ab947e496de.png',
            from: '14.2.2015',
            to: '7.3.2015',
            price: '25000'
        }
    ];

    $scope.countPrice = function () {
        /// <summary>
        /// Counts price of all items in the cart.
        /// </summary>
        /// <returns type="integer">sum price</returns>
        var finalPrice = 0;
        $scope.items.forEach(function (item) {
            finalPrice += Number(item.price);
        });
        return finalPrice;
    };

})