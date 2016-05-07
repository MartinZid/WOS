'use strict';
angular.module('wos.services.cart', [])

.factory('cart', function ($http, api) {
    /// <summary>
    /// Factory for cart.
    /// </summary>
    /// <returns type="object">cart</returns>

    var updatedLease = null;
    var deletedLease = null;

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
            updatedLease = null;
            deletedLease = null;
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
        },
        setUpdatedLease: function (index) {
            /// <summary>
            /// Deletes cart item from index and saves it to tmp variable.
            /// </summary>

            var cart = JSON.parse(localStorage.getItem("cart"));
            updatedLease = cart.splice(index, 1);
            localStorage.setItem("cart", JSON.stringify(cart));
        },
        getUpdatedLease: function () {
            /// <summary>
            /// Returns updated lease.
            /// </summary>
            /// <returns type=""></returns>
            return updatedLease;
        },
        deleteUpdatedLease: function () {
            /// <summary>
            /// Deletes updated lease.
            /// </summary>
            updatedLease = null;
        },
        setDeletedLease: function (lease) {
            /// <summary>
            /// Set var deletedLease to the latest deleted lease from cart.
            /// </summary>
            /// <param name="index" type="type"></param>
            deletedLease = lease;
        },
        getDeletedLease: function () {
            /// <summary>
            /// Return the latest deleted lease.
            /// </summary>
            /// <returns type=""></returns>
            return deletedLease;
        },
        deleteDeletedLease: function () {
            /// <summary>
            /// Sets deleted lease to null.
            /// </summary>
            deletedLease = null;
        }
    }
})
