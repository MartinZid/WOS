'use strict';
angular.module('wos.controllers.addItem', [])

.controller('AddItemCtrl', function ($scope, $cordovaCamera, $ionicHistory, $state) {
    /// <summary>
    /// Controller for add item view.
    /// </summary>
    /// <param name="$scope" type="type"></param>

    //$scope.imgURI = 'http://sp2.binarity-testing.cz/images/photos/56ab947e496de.png';

    $scope.price = { period: 0 };
    $scope.item = { price: null };
    $scope.prices = [];
    $scope.forms = {}; //has to be defined (as parent form) for easy access form from view in controller

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

    $scope.forceBackButton = $ionicHistory.backView().stateId.indexOf('events') < 0; //we navigated from another tab
    console.log($scope.forceBackButton);
    console.log($ionicHistory.backView().stateId.indexOf('home'));

    $scope.backToParentView = function () {
        $state.go('tab.home', {}, { location: 'repalce', inherit: 'false' });
    };
})