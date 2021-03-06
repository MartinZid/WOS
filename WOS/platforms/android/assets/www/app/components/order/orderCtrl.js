﻿'use strict';
angular.module('wos.controllers.order', [])

.controller('OrderCtrl', function ($scope, $stateParams, item,
                                   api, locality, cart, $state, profile) {
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
    $scope.finalPrice = 0;
    $scope.user;

    $scope.getItemDetail = function(id) {
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

    $scope.getUserLocality = function() {
        /// <summary>
        /// Downloads user locality.
        /// </summary>
        locality.getUserLocalities($scope.user.id)
            .success(function (data) {
                $scope.userLocality = data;
                $scope.status = 0;
                console.log(data);
            }).error(function () {
                console.log('order.getUserLocalities: Can not load data from server.');
                $scope.status = 2;
            });
    };

    $scope.countOrderPrice = function () {
        /// <summary>
        /// Counts a order price.
        /// </summary>
        /// <returns type="integer">Order price</returns>
        //$scope.from.date = new Date(2016, 3, 5);
        //$scope.from.time = new Date(1970, 1, 1, 10, 0);
        //$scope.to.date = new Date(2016, 3, 17);
        //$scope.to.time = new Date(1970, 1, 1, 8, 0);

        console.log('in count final price');

        var finalPrice = 0;
        // milliseconds in the hour
        var msToHours = 60 * 60 * 1000;
        // number of hours in whole days within a range. Eg 1.1.15 - 3.1.15 = 24
        var diffDates = (($scope.to.date - $scope.from.date) / msToHours) - 24;
        // hours of first and last day. Eg 4.5.2016 10:00 and 28.9.2016 8:00 => 22
        var diffHours = (24 - $scope.from.time / msToHours) + $scope.to.time / msToHours;
        // number of duration hours of this order
        var hoursSum = diffDates + diffHours;

        var length = $scope.item.prices.length;
        for (var i = 0; i < length; i++) {
            var unit = $scope.item.prices[length - i - 1].jednotka;
            var hours;
            // transform all unit to same format (hours)
            if (unit == 'hodina')
                hours = 1;
            if (unit == 'den')
                hours = 24;
            if (unit == 'týden')
                hours = 168;
            if (unit == 'měsíc')
                hours = 5040;

            // fit as many of these units as possible. The cheapest first
            var tmp = Math.floor(hoursSum / hours);
            hoursSum -= tmp * hours;
            finalPrice += tmp * new Number($scope.item.prices[length - i - 1].cena);
        };

        // something left?
        if (hoursSum != 0) {
            // add the lowest value to finalPrice
            finalPrice += new Number($scope.item.prices[0].cena);
        }

        $scope.finalPrice = finalPrice;
    };
    
    $scope.addToCart = function () {
        /// <summary>
        /// Gets data from form, created new order object a adds this object to a cart.
        /// Redirects user to the cart.
        /// </summary>
        var takeOver = $scope.takeOverOption.value;
        var locality,
            order,
            price;
        if (takeOver == 0) {
            locality = $scope.userLocality[$scope.selectedLocality.value];
        }
        if (takeOver == 1) {
            locality = $scope.item.locality[$scope.selectedLocality.value]
        }
        if (takeOver == 2) {
            locality = {
                ulice_cp: $scope.locality.street,
                mesto: $scope.locality.city,
                psc: $scope.locality.postal_code
            }
        }
        order = {
            'takeOver': takeOver,
            'locality': locality,
            'from': {
                time: $scope.from.time,
                date: $scope.from.date
            },
            'to': {
                time: $scope.to.time,
                date: $scope.to.date
            },
            'item': {
                name: $scope.item.jmeno,
                mainPhoto: $scope.item.mainPhoto,
                id: $scope.item.id_instance
            },
            'price': $scope.finalPrice
        };
        cart.addToCart(order);
        $state.go('tab.cart');
    };

    $scope.$on('$ionicView.beforeEnter', function () {
        /// <summary>
        /// Is user logged in?
        /// </summary>
        if (profile.getLoggedInUserData() === null) {
            return;
        }
        $scope.user = profile.getLoggedInUserData();
        $scope.getItemDetail($scope.itemId);
        $scope.getUserLocality();
    })

    $scope.goToLogin = function () {
        /// <summary>
        /// Redirects user to login.
        /// </summary>
        $state.go('tab.login');
    }
})