﻿'use strict';
angular.module('wos.services.cart', [])

.factory('cart', function ($http, api) {
    /// <summary>
    /// Factory for cart.
    /// </summary>
    /// <returns type="object">cart</returns>

    return {
        addToCart: function (order) {
            /// <summary>
            /// Add new order to cart (localStorage). If cart was not created already, creates one.
            /// </summary>
            /// <param name="order" type="object"></param>
            var cart = JSON.parse(localStorage.getItem("cart")) || [];
            cart.push(order);
            localStorage.setItem("cart", JSON.stringify(cart));
        },
        getAll: function () {
            /// <summary>
            /// Returns a array with all order (objects).
            /// </summary>
            /// <returns type="array"></returns>
            var cart = JSON.parse(localStorage.getItem("cart"));
            if (cart == null)
                return [];
            return cart;
        },
        deleteFromCart: function (index) {
            /// <summary>
            /// Deletes item on index from cart localStorage.
            /// </summary>
            /// <param name="index" type="type"></param>
            var cart = JSON.parse(localStorage.getItem("cart"));
            cart.splice(index, 1);
            localStorage.setItem("cart", JSON.stringify(cart));
        },
        clearCart: function () {
            /// <summary>
            /// Deletes whole cart from localStorage.
            /// </summary>
            localStorage.setItem("cart", null);
        },
        sendOrders: function (orders) {
            /// <summary>
            /// Sends all orders (whole cart) to server.
            /// </summary>
            /// <param name="orders" type="object"></param>
            /// <returns type="promise"></returns>
            return $http({
                method: 'POST',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                url: api.url + 'mobile/rent/order?data=' + JSON.stringify(orders)
            })
        }
    }
})
