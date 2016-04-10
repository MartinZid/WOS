'use strict';
angular.module('wos.controllers.cart', [])

.controller('CartCtrl', function ($scope, cart, api, $state, profile) {
    /// <summary>
    /// Controller for cart view.
    /// </summary>
    /// <param name="$scope" type="type"></param>
    $scope.status = 0;
    $scope.imgUrl = api.url;
    $scope.deletedItem;

    console.log(cart.getAll());

    $scope.$on('$ionicView.beforeEnter', function () {
        /// <summary>
        /// Get cart data when entering cart view.
        /// </summary>
        $scope.status = 0;
        $scope.getDataFromCart();
    });

    $scope.getDataFromCart = function () {
        /// <summary>
        /// Gets data from cart service, and parse date to readable format.
        /// Date: "2016-04-07T22:00:00.000Z" + Time: "1970-01-01T09:00:00.000Z" => "09:00 07.04.2016" 
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
            order.from.datetime = order.from.date.split('T')[0] + 'T' + order.from.time.split('T')[1];
            //TODO: fix - time is -1
            var tmpfromDate = order.to.date.split('T')[0].split('-');
            var tmpFromTime = order.to.time.split('T')[1].split('.')[0].split(':');
            order.stringTo = tmpFromTime[0] + ':' + tmpFromTime[1] + ' ';
            order.stringTo += tmpfromDate[2] + '.';
            order.stringTo += tmpfromDate[1] + '.';
            order.stringTo += tmpfromDate[0];
            order.to.datetime = order.to.date.split('T')[0] + 'T' + order.to.time.split('T')[1];
        });
    }

    $scope.getDataFromCart();

    $scope.data = { //default state for cart list
        showDelete: false
    };

    $scope.deleteItem = function (index) {
        /// <summary>
        /// Deletes item on index from cart. Saves this item to temporary variable, in case user wants to return this item
        /// back to cart.
        /// </summary>
        /// <param name="index" type="type"></param>
        $scope.deletedItem = $scope.orders[index];
        cart.deleteFromCart(index);
        $scope.getDataFromCart();
    };

    $scope.returnToCart = function () {
        /// <summary>
        /// Return recently deleted item back to cart and refreshs cart.
        /// </summary>
        cart.addToCart($scope.deletedItem);
        $scope.deletedItem = null;
        $scope.getDataFromCart();
    }

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
    };

    $scope.finishOrders = function () {
        /// <summary>
        /// Saves data to object and sends it to server.
        /// </summary>
        $scope.spinning = true;
        $scope.user = profile.getLoggedInUserData();
        var wholeCart = {
            finalPrice: $scope.countPrice(),
            user_id: $scope.user.id,
            orders: $scope.orders
        };
        cart.sendOrders(wholeCart)
            .success(function () {
                $scope.status = 1;
                $scope.spinning = false;
                cart.clearCart();
            }).error(function () {
                $scope.status = 2;
                $scope.spinning = false;
            });
        console.log(wholeCart);
        console.log(angular.toJson(wholeCart));
    };

})