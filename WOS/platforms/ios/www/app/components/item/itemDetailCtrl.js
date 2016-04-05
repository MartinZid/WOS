'use strict';
angular.module('wos.controllers.itemDetail', [])

.controller('ItemDetailCtrl', function ($scope, item, $stateParams, $ionicSlideBoxDelegate, api,
                                        $ionicPopover, $cordovaGeolocation, $ionicHistory, $state,
                                        $ionicModal) {
    /// <summary>
    /// Controller for item detail view.
    /// </summary>
    /// <param name="$scope" type="type"></param>
    /// <param name="item" type="type"></param>
    /// <param name="$stateParams" type="type"></param>
    /// <param name="$ionicSlideBoxDelegate" type="type"></param>
    /// <param name="$ionicPopover" type="type"></param>
    /// <param name="$cordovaGeolocation" type="type"></param>
    $scope.id = $stateParams.itemId;
    $scope.item = {
        'prumerne_hodnoceni': 0 ///this has to be defined, because rating.getFullStars is called event before all data is loaded
    };
    $scope.status = 3;
    $scope.imgUrl = api.url;
    $scope.platform = ionic.Platform.platform();
    $scope.events = [];

    getItemDetail($scope.id);

    function getItemDetail(id) {
        /// <summary>
        /// Downloads data for item detail
        /// </summary>
        item.getDetail(id)
            .success(function (data) { ///if success save loaded data to $scope.items
                //any code in here will automatically have an apply run afterwards
                $scope.item = data[0];
                console.log(data);
                $scope.item.photos.unshift({
                    jmeno: $scope.item.mainPhoto
                });
                $scope.status = 0;
                $ionicSlideBoxDelegate.update();
                loadMap();
                $scope.createCalendarEvents();

            }).error(function (data) { ///if can not load data from server set $scope.status, for error handling
                console.log('item.getItemDetail: Can not load data from server.');
                $scope.status = 2;
            }).finally(function () { /// Stop the ion-refresher from spinning
                $scope.$broadcast('scroll.refreshComplete');
            });
    }
    $scope.doRefresh = function () {
        console.log('refreshing...');
        getItemDetail($scope.id)
    }

    $ionicPopover.fromTemplateUrl('popover.html', {
        scope: $scope
    }).then(function (popover) {
        $scope.popover = popover;
    });

    $scope.openPopover = function ($event, content) {
        $scope.popover.show($event);
        $scope.content = content;
    };

    $scope.closePopover = function () {
        $scope.popover.hide();
    };

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
            $scope.mapDisabled = true;
        });
    };

    //we navigated from another tab
    $scope.forceBackButton = $ionicHistory.backView().stateId.indexOf('home') < 0
                             && $ionicHistory.backView().stateId.indexOf('profile-detail') < 0
                             && $ionicHistory.backView().stateId.indexOf('item-detail') < 0;

    $scope.backToParentView = function () {
        $state.go('tab.home', {}, { location: 'repalce', inherit: 'false' });
    };

    $scope.goTo = function (id) {
        /// <summary>
        /// Redirects user to item detail with given id.
        /// </summary>
        /// <param name="id" type="integer">itemId</param>
        $state.go('tab.item-detail', { itemId: id });
    }

    $scope.uiConfig = {
        calendar: {
            height: 450,
            firstDay:1,
            editable: true,
            header: {
                left: 'title',
                center: '',
                right: 'prev,next'
            },
            dayNames: ["Neděle", "Pondělí", "Úterý", "Středa", "Čtvrtek", "Pátek", "Sobota"],
            dayNamesShort: ["Ne", "Po", "Út", "St", "Čt", "Pá", "So"],
            monthNames: ["Leden", "Únor", "Březen", "Duben", "Květen", "Červen", "Červenec", "Srpen", "Září", "Říjen", "Listopad", "Prosinec"]
        }
    };

    $scope.isInArray = function (event, array) {
        /// <summary>
        /// Returns true if events in already in array.
        /// </summary>
        /// <param name="event" type="object"></param>
        /// <param name="array" type="array"></param>
        /// <returns type="bool"></returns>
        var returnValue = false
        array.forEach(function (entry) {
            if (entry.start.getTime() == event.start.getTime() && entry.end.getTime() == event.end.getTime())
                returnValue = true;
        });
        return returnValue;
    }

    $scope.createCalendarEvents = function () {
        /// <summary>
        /// Creates events from item.leases to calendar format.
        /// </summary>

        for (var key in $scope.item.leases) {
            // skip loop if the property is from prototype
            if (!$scope.item.leases.hasOwnProperty(key)) continue;

            var entry = $scope.item.leases[key];
            for (var x in entry) {
                // skip loop if the property is from prototype
                if (!entry.hasOwnProperty(x)) continue;

                var from = entry[x].od.date.split(' ')[0].split('-');
                var to = entry[x].do.date.split(' ')[0].split('-');
                var event = {
                    start: new Date(from[0], from[1], from[2]),
                    end: new Date(to[0], to[1], to[2]),
                    stick: true
                };
                var inArray = $scope.isInArray(event, $scope.events);
                if (!inArray) {
                    $scope.events.push(event);
                };
            }
        }
    }

    $scope.eventSources = [$scope.events];

    $ionicModal.fromTemplateUrl('reviews.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.reviewsModal = modal;
    });
    $scope.openReviewsModal = function ($event, reviews) {
        $scope.reviewsModal.show();
        $scope.reviews = reviews;
    };
    $scope.closeReviewsModal = function () {
        $scope.reviewsModal.hide();
    };

    $scope.order = function () {
        $state.go('tab.order', { itemId: $scope.item.id_instance })
    }
})