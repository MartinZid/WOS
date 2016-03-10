'use strict';
angular.module('wos.controllers.itemDetail', [])

.controller('ItemDetailCtrl', function ($scope, item, $stateParams, rating,
                                        $ionicSlideBoxDelegate, $ionicPopover, $cordovaGeolocation, $window) {
    /// <summary>
    /// Controller for item detail view.
    /// </summary>
    /// <param name="$scope" type="type"></param>
    /// <param name="item" type="type"></param>
    /// <param name="$stateParams" type="type"></param>
    /// <param name="rating" type="type"></param>
    /// <param name="$ionicSlideBoxDelegate" type="type"></param>
    /// <param name="$ionicPopover" type="type"></param>
    /// <param name="$cordovaGeolocation" type="type"></param>
    $scope.id = $stateParams.itemId;
    $scope.item = {
        'prumerne_hodnoceni': 0 ///this has to be defined, because rating.getFullStars is called event before all data is loaded
    };
    $scope.status = 3;

    getItemDetail($scope.id);

    function getItemDetail(id) {
        /// <summary>
        /// Downloads data for item detail
        /// </summary>
        item.getDetail(id)
            .success(function (data) { ///if success save loaded data to $scope.items
                //any code in here will automatically have an apply run afterwards
                $scope.item = data;
                console.log(data);
                $scope.status = 0;
                $ionicSlideBoxDelegate.update();
                loadMap();

            }).error(function (data) { ///if can not load data from server set $scope.status, for error handling
                console.log('item.getItemDetail: Can not load data from server.');
                $scope.message = "Bohužel se nepodařilo načíst informace o položce. :-(";
                $scope.status = 2;
            }).finally(function () { /// Stop the ion-refresher from spinning
                $scope.$broadcast('scroll.refreshComplete');
            });
    }
    $scope.doRefresh = function () {
        console.log('refreshing...');
        getItemDetail($scope.id)
    }

    $scope.getFullStars = rating.getFullStars;
    $scope.hasHalfStar = rating.hasHalfStar;
    $scope.getEmptyStars = rating.getEmptyStars;

    $ionicPopover.fromTemplateUrl('popover.html', {
        scope: $scope
    }).then(function (popover) {
        $scope.popover = popover;
    });

    $scope.openPopover = function ($event, content) {
        $scope.popover.show($event);
        console.log(content);
        $scope.content = content;
    };

    $scope.closePopover = function () {
        $scope.popover.hide();
    };

    //Cleanup the popover when we're done with it!
    $scope.$on('$destroy', function () {
        $scope.popover.remove();
    });

    // Execute action on hide popover
    $scope.$on('popover.hidden', function () {
        // Execute action
    });

    // Execute action on remove popover
    $scope.$on('popover.removed', function () {
        // Execute action
    });

    $scope.$on("$ionicView.enter", function (scopes, states) {
        /// <summary>
        /// When view is loaded it refreshes the map (also with the markers).
        /// </summary>
        /// <param name="scopes" type="type"></param>
        /// <param name="states" type="type"></param>
        if ($scope.status !== 0) return;
        console.log('refreshing map...')
        //google.maps.event.trigger(map, 'resize');
        loadMap();
    });

    var options = { timeout: 10000, enableHighAccuracy: true };

    function loadMap() {
        /// <summary>
        /// Sets up the map.
        /// </summary>
        $cordovaGeolocation.getCurrentPosition(options).then(function (position) {

            var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

            var mapOptions = {
                center: new google.maps.LatLng(49.80, 15.38),
                zoom: 6,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };

            $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);

            console.log($scope.map);
            console.log(document.getElementById("map"));

            //Wait until the map is loaded
            google.maps.event.addListenerOnce($scope.map, 'idle', function () {
                /// <summary>
                /// Sets up markers for each item locality.
                /// </summary>

                $scope.item.locality.forEach(function (locality) {
                    var latLng = new google.maps.LatLng(locality.gps_lat, locality.gps_lng);

                    var marker = new google.maps.Marker({
                        map: $scope.map,
                        animation: google.maps.Animation.DROP,
                        position: latLng
                    });

                    var infoWindow = new google.maps.InfoWindow({
                        // marker info
                        content: locality.mesto + ", " + locality.ulice_cp
                    });

                    google.maps.event.addListener(marker, 'click', function () {
                        // on marker click show addtional info and zoom map
                        infoWindow.open($scope.map, marker);
                        $scope.map.setZoom(13);
                        $scope.map.setCenter(marker.getPosition());
                    });

                    google.maps.event.addListener(infoWindow, 'closeclick', function () {
                        // on marker close zoom out and center map to default
                        $scope.map.setZoom(6);
                        $scope.map.setCenter(new google.maps.LatLng(49.80, 15.38));
                    });
                });
            });

        }, function (error) {
            console.log("Could not get location");
        });
    };

})