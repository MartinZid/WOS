'use strict';
angular.module('wos.controllers.addItem', [])

.controller('AddItemCtrl', function ($scope, $cordovaCamera) {
    /// <summary>
    /// Controller for add item view.
    /// </summary>
    /// <param name="$scope" type="type"></param>

    //$scope.imgURI = 'http://sp2.binarity-testing.cz/images/photos/56ab947e496de.png';

    $scope.takePhoto = function () {
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
    }

    //$scope.image;

    //$scope.takePicture = function () {
    //    var options = {
    //        quality: 100,
    //        destinationType: Camera.DestinationType.FILE_URI,
    //        sourceType: Camera.PictureSourceType.CAMERA,
    //        allowEdit: true,
    //        encodingType: Camera.EncodingType.JPEG,
    //        targetWidth: 100,
    //        targetHeight: 100,
    //        popoverOptions: CameraPopoverOptions,
    //        saveToPhotoAlbum: true,
    //        correctOrientation:true
    //    };

    //    $cordovaCamera.getPicture(options).then(function (imageURI) {
    //        var image = document.getElementById('myImage');
    //        image.src = imageURI;
    //        $scope.image = image;
    //        alert($scope.image);
    //    }, function (err) {
    //        alert('error!');
    //    });

    //    alert($scope.image);

    //    //$cordovaCamera.getPicture(options).then(function(imageData) {
    //    //    $scope.image = document.getElementById('myImage');
    //    //    $scope.image.src = "data:image/jpeg;base64," + imageData;
    //    //}, function(err) {
    //    //    console.log('addItem takePicture error!');
    //    //});
    //};
})