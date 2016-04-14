'use strict';
angular.module('wos.controllers.addItem', [])

.controller('AddItemCtrl', function ($scope, $cordovaCamera, $ionicHistory, $cordovaFileTransfer,
                                     $state, category, locality, $ionicModal, item, api) {
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
    $scope.imageName = Math.random().toString(36).slice(2) + '.jpg';
    $scope.selectedLocality = {};
    $scope.selectedLocalities = [];
    $scope.upload = 'not uploading';
    $scope.uploadError = 0; // 0 - no error, 1 - upload error
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

    $scope.deletePrice = function (index) {
        /// <summary>
        /// Deletes price from prices array on index.
        /// </summary>
        /// <param name="index" type="type"></param>
        $scope.prices.splice(index, 1);
    }

    $scope.takePhoto = function () {
        /// <summary>
        /// Access device's camera.
        /// </summary>
        var options = {
            quality: 100,
            //destinationType: Camera.DestinationType.DATA_URL,
            destinationType: Camera.DestinationType.FILE_URI,
            sourceType: Camera.PictureSourceType.CAMERA,
            allowEdit: true,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 500,
            targetHeight: 500,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: false
        };

        $cordovaCamera.getPicture(options).then(function (imageData) {
            //$scope.imgURI = "data:image/jpeg;base64," + imageData;
            $scope.imgURI = imageData;
            //$scope.uploadImage(imageData);
        }, function (err) {
            // An error occured. Show a message to the user
        });
    };

    $scope.forceBackButton = $ionicHistory.backView().stateId.indexOf('account') < 0; //we navigated from another tab

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
        $scope.addDay();
        $scope.selectedLocalities.push({
            mesto: locality.city,
            ulice_cp: locality.street,
            psc: locality.postal_code,
            days: locality.days
        });

        $scope.locality.street = '';
        $scope.locality.city = '';
        $scope.locality.postal_code = '';
        $scope.locality.from = null;
        $scope.locality.to = null;
        $scope.locality.day = undefined;
        $scope.locality.days = [];
        $scope.forms.newLocality.street.$setUntouched();
        $scope.forms.newLocality.city.$setUntouched();
        $scope.forms.newLocality.postal_code.$setUntouched();
        $scope.forms.newLocality.from.$setUntouched();
        $scope.forms.newLocality.to.$setUntouched();

        $scope.closeModal();
    };

    function addZero(i) {
        if (i < 10) {
            i = "0" + i;
        }
        return i;
    }

    $scope.addDay = function () {
        /// <summary>
        /// Saves day availibility to days array. Resets form for new day avalibility.
        /// </summary>
        if ($scope.locality.from == null || $scope.locality.to == null || $scope.locality.day == undefined)
            return;

        console.log($scope.locality.from.getHours());
        //var parsedFrom = $scope.locality.from.split('T')[0].split('Z')[0];
        //var parsedTo = $scope.locality.to.split('T')[0].split('Z')[0];
      
        $scope.locality.days.push({
            from: addZero($scope.locality.from.getHours()) + ':' + addZero($scope.locality.from.getMinutes()),
            to: addZero($scope.locality.to.getHours()) + ':' + addZero($scope.locality.to.getMinutes()),
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

    $scope.uploadImage = function () {
        var server = api.url + 'Upload.php';
        $scope.upload = 'in upload function';
        var options = {
            fileKey: 'file',
            mimeType: "image/jpeg",
            chunkedMode: false,
            fileName: $scope.imageName
        };
        $scope.spinning = true;
        $cordovaFileTransfer.upload(server, $scope.imgURI, options, true)
            .then(function(result) {
                $scope.upload = 'Upload succeeded' + $scope.imageName + ' \n' + angular.toJson(result);
                //$state.go('tab.account');
                //$scope.spinning = false;
                $scope.createItem();
            }, function(err) {
                $scope.upload = 'Upload failed ';
                $scope.uploadError = 1;
            }, function (progress) {
                $scope.upload = progress;
            });
    };

    $scope.createItem = function () {
        /// <summary>
        /// Uploads new item to server.
        /// </summary>
        $scope.addLocality();
        $scope.addPrice();
        $scope.upload = 'In create item method...';
        var createdItem = {
            name: $scope.item.name,
            prices: $scope.prices,
            localities: $scope.selectedLocalities,
            photo: $scope.imageName,
            category: $scope.selectedCategory,
            user_id: 18,
            currency: 1,
            code: '$2y$10$8/o1QO0tVkaBUSOcHHoWZu9ugbNijvntKkK.luq3MgTaGt95ISS5e'
        };
        console.log(createdItem);
        console.log(angular.toJson(createdItem));
        item.addItem(createdItem)
            .success(function (data) {
                console.log('add item successful');
                $scope.upload = 'add item successful' + data;
                $scope.spinning = false;
                //$scope.uploadImage();
                $scope.uploadError = 0;
            }).error(function (data) {
                console.log('add item failed');
                $scope.upload =  'add item failed ' + data;
                $scope.uploadError = 1;
                $scope.spinning = false;
            });
        // TODO: redirect user to his new item
    };
})