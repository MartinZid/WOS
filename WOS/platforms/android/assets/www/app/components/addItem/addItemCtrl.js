'use strict';
angular.module('wos.controllers.addItem', [])

.controller('AddItemCtrl', function ($scope, $cordovaCamera, $ionicHistory, $state, category, locality) {
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
    $scope.localities;
    $scope.selectedLocality = {};
    $scope.selectedLocalities = [];

    $scope.addPrice = function () {
        /// <summary>
        /// Adds new price into prices array and sets prices form to default values.
        /// </summary>
        var period = parseInt($scope.price.period);
        $scope.prices.push({
            price: $scope.item.price,
            period: period
        });
        $scope.price = { period: 0 };
        $scope.item = { price: null };
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

    if(false)
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
        locality.getUserLocalities(18)
            .success(function (data) {
                $scope.localities = data;
            }).error(function () {
                $scope.status = 2;
            })
    };
    $scope.getLocalities();

    $scope.addLocality = function () {
        console.log($scope.localities[$scope.selectedLocality.value]);
        $scope.selectedLocalities.push($scope.localities[$scope.selectedLocality.value]);
        //$scope.selectedLocality.value = -1;
    };

    $scope.deleteLocality = function (index) {
        $scope.selectedLocalities.splice(index, 1);
    }
})