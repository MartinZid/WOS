﻿'use strict';
angular.module('wos.controllers.addItem', [])

.controller('AddItemCtrl', function ($scope, $cordovaCamera, $ionicHistory,
                                     $state, category, locality, $ionicModal, item) {
    /// <summary>
    /// Controller for add item view.
    /// </summary>
    /// <param name="$scope" type="type"></param>

    //$scope.imgURI = 'http://sp2.binarity-testing.cz/images/photos/56ab947e496de.png';

    $scope.price = { period: 0 };
    $scope.item = { price: null };
    $scope.prices = [];
    $scope.forms = {}; //has to be defined (as parent form) for easy access form from view in controller
    $scope.selectedCategory = 44;
    $scope.allCategories = [];
    $scope.select = [];
    $scope.status = 3;
    $scope.platform = ionic.Platform.platform();
    $scope.localities;
    $scope.selectedLocality = {};
    $scope.selectedLocalities = [];
    $scope.locality = {
        street: '',
        city: '',
        postal_code: '',
        days: [],
        from: null,
        to: null,
        day: undefined
    };

    console.log(parseInt(undefined));

    $scope.addPrice = function () {
        /// <summary>
        /// Adds new price into prices array and sets prices form to default values.
        /// </summary>
        var period = parseInt($scope.price.period);
        if (period === NaN || $scope.item.price === null)
            return;
        $scope.prices.push({
            price: $scope.item.price,
            period: period
        });
        $scope.price = { period: 0 };
        $scope.item.price = null;
        $scope.forms.addItemForm.price.$setUntouched();
    };

    $scope.takePhoto = function () {
        /// <summary>
        /// Access device's camera.
        /// </summary>
        var options = {
            quality: 100,
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: Camera.PictureSourceType.CAMERA,
            allowEdit: true,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 500,
            targetHeight: 500,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: false
        };

        $cordovaCamera.getPicture(options).then(function (imageData) {
            $scope.imgURI = "data:image/jpeg;base64," + imageData;
        }, function (err) {
            // An error occured. Show a message to the user
        });
    };

    //if(false)
    $scope.forceBackButton = $ionicHistory.backView().stateId.indexOf('home') < 0; //we navigated from another tab

    $scope.backToParentView = function () {
        $state.go('tab.home', {}, { location: 'repalce', inherit: 'false' });
    };

    $scope.getChildCategories = function (index) {
        /// <summary>
        /// Gets child categories of selected category.
        /// </summary>
        /// <param name="index" type="type"></param>

        if (index != 0) {
            $scope.selectedCategory = $scope.allCategories[index - 1][$scope.select[index - 1]].id_kategorie;
        }

        category.getChildcategories($scope.selectedCategory)
            .success(function (data) {
                if (data.length > 0) {
                    $scope.allCategories[index] = data;
                    $scope.status = 0;
                }
            }).error(function () {
                $scope.status = 2;
            });
    };
    $scope.getChildCategories(0);

    $scope.doRefresh = function () {
        console.log('refreshing...');
        $scope.getChildCategories(0);
        $scope.getLocalities();
    };

    $scope.getLocalities = function () {
        /// <summary>
        /// Get user's localities.
        /// </summary>
        locality.getUserLocalities(18)
            .success(function (data) {
                $scope.localities = data;
            }).error(function () {
                $scope.status = 2;
            })
    };
    $scope.getLocalities();

    $scope.addLocality = function () {
        /// <summary>
        /// Adds selected locality into selected localities array.
        /// </summary>
        if ($scope.selectedLocality.value === undefined)
            return;
        $scope.selectedLocalities.push($scope.localities[$scope.selectedLocality.value]);
        $scope.selectedLocality.value = undefined;
    };

    $scope.deleteLocality = function (index) {
        /// <summary>
        /// Deletes selected locality from array on position index.
        /// </summary>
        /// <param name="index" type="type"></param>
        $scope.selectedLocalities.splice(index, 1);
    };

    $scope.saveNewLocality = function (locality) {
        /// <summary>
        /// Adds created locality into selected localities array. Also resets modal for new locality creation.
        /// </summary>
        /// <param name="locality" type="type"></param>
        $scope.selectedLocalities.push({
            mesto: locality.city,
            ulice_cp: locality.street + ' ' + locality.postal_code,
            days: locality.days
        });

        $scope.locality.street = '';
        $scope.locality.city = '';
        $scope.locality.postal_code = '';
        $scope.locality.from = null;
        $scope.locality.to = null;
        $scope.locality.day = undefined;
        $scope.locality.days = [];
        console.log($scope.forms.newLocality);
        $scope.forms.newLocality.street.$setUntouched();
        $scope.forms.newLocality.city.$setUntouched();
        $scope.forms.newLocality.postal_code.$setUntouched();
        $scope.forms.newLocality.from.$setUntouched();
        $scope.forms.newLocality.to.$setUntouched();

        $scope.closeModal();
    };
    $scope.addDay = function () {
        /// <summary>
        /// Saves day availibility to days array. Resets form for new day avalibility.
        /// </summary>
        $scope.locality.days.push({
            from: $scope.locality.from,
            to: $scope.locality.to,
            day: $scope.locality.day
        });
        $scope.locality.from = null;
        $scope.locality.to = null;
        $scope.locality.day = undefined;
        $scope.forms.newLocality.from.$setUntouched();
        $scope.forms.newLocality.to.$setUntouched();
    };
    $scope.deleteDay = function (index) {
        /// <summary>
        /// Deletes created day availibility from array on position index.s
        /// </summary>
        /// <param name="index" type="type"></param>
        $scope.locality.days.splice(index, 1);
    }

    $ionicModal.fromTemplateUrl('new_locality.html', {
        scope: $scope,
        animation: 'slide-in-up',
    }).then(function (modal) {
        $scope.modal = modal;
    });
    $scope.openModal = function () {
        $scope.modal.show();
    };
    $scope.closeModal = function () {
        $scope.modal.hide();
    };

    $scope.createItem = function () {
        /// <summary>
        /// Uploads new item to server.
        /// </summary>
        $scope.addLocality();
        $scope.addPrice();
        var createdItem = {
            name: $scope.item.name,
            prices: $scope.prices,
            localities: $scope.selectedLocalities,
            photo: $scope.imgURI,
            category: $scope.selectedCategory,
            user_id: 18
        };
        console.log(createdItem);
        item.addItem(createdItem)
            .success(function (data) {
                console.log('add item successful');
            }).error(function (data) {
                console.log('add item failed');
            });
    };
})