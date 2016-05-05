'use strict';
angular.module('wos.controllers.order', [])

.controller('OrderCtrl', function ($scope, $stateParams, item, ionicDatePicker,
                                   api, locality, cart, $state, profile, $filter, $ionicHistory) {
    /// <summary>
    /// Controller for order view.
    /// </summary>
    /// <param name="$scope" type="type"></param>
    /// <param name="$stateParams" type="type"></param>
    /// <param name="item" type="type"></param>
    /// <param name="ionicDatePicker" type="type"></param>
    /// <param name="api" type="type"></param>
    /// <param name="locality" type="type"></param>
    /// <param name="cart" type="type"></param>
    /// <param name="$state" type="type"></param>
    /// <param name="profile" type="type"></param>
    /// <param name="$filter" type="type"></param>
    /// <param name="$ionicHistory" type="type"></param>

    // get itemId from "url"
    $scope.itemId = $stateParams.itemId;
    $scope.item;
    $scope.status = 3;
    $scope.imgURL = api.url;
    $scope.takeOverOption = {};
    $scope.userLocality;
    $scope.selectedLocality = {
        value: 0
    };
    // is order new or is user updating?
    $scope.updating = false;
    $scope.locality = {};
    $scope.from = {};
    $scope.to = {};
    $scope.forms = {};
    $scope.finalPrice = 0;
    $scope.user;
    // not overlaps selected date with some other date?
    $scope.valid = true;
    $scope.forceBackButton = false;

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
                $scope.defineDatePickerObjTo();
                $scope.defineDatePickerObjFrom();
                $scope.getUserLocality();

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
                $scope.getUpdatedLease();
            }).error(function () {
                console.log('order.getUserLocalities: Can not load data from server.');
                $scope.status = 2;
                $scope.getUserLocality();
            });
    };

    $scope.getUpdatedLease = function () {
        /// <summary>
        /// Sets order form to default according to updated lease.
        /// </summary>
        var lease = cart.getUpdatedLease();
        console.log(lease);

        $scope.updating = lease != null;
        $scope.forceBackButton = $ionicHistory.backView().stateId.indexOf('cart') < 0 && !$scope.updating;

        if (lease == null)
            return;

        cart.deleteUpdatedLease();

        lease = lease[0];
        lease.takeOver = parseInt(lease.takeOver);
        $scope.takeOverOption.value = lease.takeOver;
        if (lease.takeOver == 0) {
            $scope.selectedLocality.value = $scope.findLocalityInArray(lease.locality, $scope.userLocality);
        }
        if (lease.takeOver == 1) {
            $scope.selectedLocality.value = $scope.findLocalityInArray(lease.locality, $scope.item.locality);
        }
        if (lease.takeOver == 2) {
            $scope.locality.street = lease.locality.ulice_cp;
            $scope.locality.city = lease.locality.mesto;
            $scope.locality.postal_code = lease.locality.psc;
        }

        console.log($scope.selectedLocality.value);
        console.log($scope.item.locality)

        $scope.from.time = new Date(lease.from.time).addHours(-1);
        $scope.from.date = new Date(lease.from.date);
        $scope.to.time = new Date(lease.to.time).addHours(-1);
        $scope.to.date = new Date(lease.to.date);

        $scope.countOrderPrice();
    };

    $scope.findLocalityInArray = function (value, array) {
        /// <summary>
        /// Return position of value in array. Used on locality (compared attr is id).
        /// If not found returns -1.
        /// </summary>
        /// <param name="value" type="type"></param>
        /// <param name="array" type="type"></param>
        /// <returns type="integer">Index or -1</returns>
        for (var i = 0; i < array.length; i++) {
            if (value.id_lokalita == array[i].id_lokalita)
                return i;
        }
        return -1;
    };

    $scope.orderPrices = function (array) {
        /// <summary>
        /// Orders prices hours first, months last. It is used for correct price count.
        /// </summary>
        /// <param name="array" type="array"></param>
        /// <returns type="array">Ordered array</returns>
        var tmp = [];
        var unit;
        for (var i = 0; i < 4; i++) {
            if (i == 3)
                unit = 'měsíc';
            if (i == 2)
                unit = 'týden';
            if (i == 1)
                unit = 'den'
            if (i == 0)
                unit = 'hodina';
            for (var j = 0; j < array.length; j++) {
                if (array[j].jednotka == unit)
                    tmp.push(array[j]);
            }
        }
        return tmp;
    }

    $scope.countOrderPrice = function () {
        /// <summary>
        /// Counts a order price.
        /// </summary>
        /// <returns type="integer">Order price</returns>

        $scope.item.prices = $scope.orderPrices($scope.item.prices);

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
    
    Date.prototype.addHours = function (h) {
        this.setHours(this.getHours() + h);
        return this;
    }

    $scope.addToCart = function () {
        /// <summary>
        /// Gets data from form, created new order object and adds this object to a cart.
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
                time: $scope.from.time.addHours(1),
                date: $scope.from.date
            },
            'to': {
                time: $scope.to.time.addHours(1),
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
    })

    $scope.goToLogin = function () {
        /// <summary>
        /// Redirects user to login.
        /// </summary>
        $state.go('tab.login');
    };

    $scope.defineDatePickerObjFrom = function () {
        /// <summary>
        /// Defines ionic date picker config object.
        /// </summary>
        $scope.createDisabledDates();
        $scope.createDisabledWeekdays();
        $scope.ipObj1 = {
            callback: function (val) {
                $scope.from.date = new Date(val);
                $scope.countOrderPrice();
                $scope.isValid();
            },
            disabledDates: $scope.disabledDates,
            from: new Date(),      
            disableWeekdays: $scope.disableWeekdays,
            // has to be defined here, because in config translations does not work
            weeksList: [$filter('translate')('days.sun'), $filter('translate')('days.mon'), $filter('translate')('days.tue'),
                $filter('translate')('days.wed'), $filter('translate')('days.thu'), $filter('translate')('days.fri'), $filter('translate')('days.sat')],
            monthsList: [$filter('translate')('months.jan'), $filter('translate')('months.feb'), $filter('translate')('months.mar'),
                $filter('translate')('months.apr'), $filter('translate')('months.may'), $filter('translate')('months.june'), $filter('translate')('months.july'),
                $filter('translate')('months.aug'), $filter('translate')('months.sept'), $filter('translate')('months.oct'), $filter('translate')('months.nov'),
                $filter('translate')('months.dec')],
        };
    }

    $scope.openDatePickerFrom = function () {
        /// <summary>
        /// Opens ionic date picker.
        /// </summary>
        ionicDatePicker.openDatePicker($scope.ipObj1);
    };

    $scope.createDisabledDates = function () {
        /// <summary>
        /// Creates array of disabled dates.
        /// </summary>
        $scope.disabledDates = [];
        for (var key in $scope.item.leases) {
            // Given date - 2016-04-17
            console.log('key ' + key);
            var tmpDate = key.split('-');
            $scope.disabledDates.push(new Date(tmpDate[0], tmpDate[1] - 1, tmpDate[2]));
        }
    };
    $scope.createDisabledWeekdays = function () {
        /// <summary>
        /// Creates array of disabled weekdays.
        /// </summary>
        $scope.disableWeekdays = [];
        $scope.availableWeekdays = [];

        //Parse available days.
        for (var key in $scope.item.availability) {
            var entry = $scope.item.availability[key];
            console.log(entry);
            for (var key in entry) {
                if(!isNaN(key))
                    $scope.availableWeekdays.push(parseInt(key));
            }
        }
        //Reverse available days to disabled days array.
        for (var i = 0; i < 7; i++) {
            if ($scope.availableWeekdays.indexOf(i) == -1) {
                if (i != 6) // On date picker 0 is Saturday, in given data 0 is monday...
                    $scope.disableWeekdays.push(i + 1);
                else
                    $scope.disableWeekdays.push(0);
            }
        }
    };

    $scope.defineDatePickerObjTo = function () {
        /// <summary>
        /// Defines ionic date picker config object.
        /// </summary>
        $scope.createDisabledDates();
        $scope.createDisabledWeekdays();
        $scope.ipObj2 = {
            callback: function (val) {
                $scope.to.date = new Date(val);
                $scope.countOrderPrice();
                $scope.isValid();
            },
            disabledDates: $scope.disabledDates,
            from: $scope.from.date || new Date(),
            disableWeekdays: $scope.disableWeekdays,
            // has to be defined here, because in config translations does not work
            weeksList: [$filter('translate')('days.sun'), $filter('translate')('days.mon'), $filter('translate')('days.tue'),
                $filter('translate')('days.wed'), $filter('translate')('days.thu'), $filter('translate')('days.fri'), $filter('translate')('days.sat')],
            monthsList: [$filter('translate')('months.jan'), $filter('translate')('months.feb'), $filter('translate')('months.mar'),
                $filter('translate')('months.apr'), $filter('translate')('months.may'), $filter('translate')('months.june'), $filter('translate')('months.july'),
                $filter('translate')('months.aug'), $filter('translate')('months.sept'), $filter('translate')('months.oct'), $filter('translate')('months.nov'),
                $filter('translate')('months.dec')],
        };
    }

    $scope.openDatePickerTo = function () {
        /// <summary>
        /// Opens ionic date picker.
        /// </summary>
        ionicDatePicker.openDatePicker($scope.ipObj2);
    };

    $scope.isValid = function () {
        /// <summary>
        /// Sets valid variable to false, when date overlaps with already order lease date.
        /// </summary>
        if (!$scope.to.date || !$scope.from.date)
            return;

        $scope.valid = true;
        $scope.disabledDates.forEach(function (date) {
            if (date.getTime() >= $scope.from.date && date.getTime() <= $scope.to.date)
                $scope.valid = false;
        });
    };

    $scope.backToParentView = function () {
        $state.go('tab.cart', {}, { location: 'repalce', inherit: 'false' });
    };
})