'use strict';
angular.module('wos.controllers.cart', [])

.controller('CartCtrl', function ($scope, cart, api, $state) {
    /// <summary>
    /// Controller for cart view.
    /// </summary>
    /// <param name="$scope" type="type"></param>
    $scope.status = 0;
    $scope.imgUrl = api.url;

    console.log(cart.getAll());

    $scope.$on('$ionicView.beforeEnter', function () {
        /// <summary>
        /// Get cart data when entering cart view.
        /// </summary>
        $scope.getDataFromCart();
    });

    $scope.getDataFromCart = function () {
        /// <summary>
        /// Gets data from cart service, and parse date to readable format.
        /// </summary>
        $scope.orders = cart.getAll();
        console.log($scope.orders);
        $scope.orders.forEach(function (order) {
            var tmpfromDate = order.from.date.split('T')[0].split('-');
            var tmpFromTime = order.from.time.split('T')[1].split('.')[0].split(':');
            order.stringFrom = tmpFromTime[0] + ':' + tmpFromTime[1] + ' ';
            order.stringFrom += tmpfromDate[2] + '.';
            order.stringFrom += tmpfromDate[1] + '.';
            order.stringFrom += tmpfromDate[0];

            var tmpfromDate = order.to.date.split('T')[0].split('-');
            var tmpFromTime = order.to.time.split('T')[1].split('.')[0].split(':');
            order.stringTo = tmpFromTime[0] + ':' + tmpFromTime[1] + ' ';
            order.stringTo += tmpfromDate[2] + '.';
            order.stringTo += tmpfromDate[1] + '.';
            order.stringTo += tmpfromDate[0];
        });
    }

    $scope.getDataFromCart();

    $scope.data = { //default state for cart list
        showDelete: false
    };

    $scope.deleteItem = function (index) {
        /// <summary>
        /// Deletes item on index from cart.
        /// </summary>
        /// <param name="index" type="type"></param>
        cart.deleteFromCart(index);
        $scope.getDataFromCart();
    };

    $scope.countPrice = function () {
        /// <summary>
        /// Counts price of all items in the cart.
        /// </summary>
        /// <returns type="integer">sum price</returns>
        var finalPrice = 0;
        $scope.orders.forEach(function (order) {
            finalPrice += Number(order.price);
        });
        return finalPrice;
    };
    
    $scope.updateOrder = function (order, index) {
        /// <summary>
        /// Redirect user to order with order item id.
        /// </summary>
        /// <param name="order" type="type"></param>
        /// <param name="index" type="type"></param>
        $scope.deleteItem(index);
        $state.go('tab.order', { itemId: order.item.id });
    }

})