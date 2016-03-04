'use strict';
angular.module('wos.controllers.itemDetail', [])

.controller('ItemDetailCtrl', function ($scope, item, $stateParams, rating, $ionicSlideBoxDelegate, $ionicPopover) {
    $scope.id = $stateParams.itemId;
    $scope.item = {
        'prumerne_hodnoceni': 0 ///this has to be defined, because rating.getFullStars is called event before all data is loaded
    };

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
})