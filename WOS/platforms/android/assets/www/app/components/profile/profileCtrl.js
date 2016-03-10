'use strict';

angular.module('wos.controllers.profile', [])

.controller('ProfileCtrl', function ($scope, $stateParams, profile, rating) {
    /// <summary>
    /// Controller for profile view.
    /// </summary>
    /// <param name="$scope" type="type"></param>
    /// <param name="$stateParams" type="type"></param>
    /// <param name="profile" type="type"></param>
    /// <param name="rating type="type"></param>

    $scope.id = $stateParams.profileId;
    $scope.profile;
    $scope.status = 3;
    $scope.userItemsSum = 0;

    getProfileData($scope.id);

    function getProfileData(id) {
        /// <summary>
        /// Gets data for user profile with given id.
        /// </summary>
        /// <param name="id" type="integer"></param>
        profile.getProfileData(id)
            .success(function (data) { ///if success save loaded data to $scope.items
                $scope.profile = data;
                console.log(data);
                $scope.status = 0;
                $scope.userItemsSum = $scope.countUserItems();

            }).error(function (data) { ///if can not load data from server set $scope.status, for error handling
                console.log('profile.getProfileData: Can not load data from server.');
                $scope.message = "Bohužel se nepodařilo načíst informace o položce. :-(";
                $scope.status = 2;
            }).finally(function () { /// Stop the ion-refresher from spinning
                $scope.$broadcast('scroll.refreshComplete');
            });
    };
    $scope.doRefresh = function () {
        console.log('refreshing...');
        getProfileData($scope.id);
    }

    $scope.getFullStars = rating.getFullStars;
    $scope.hasHalfStar = rating.hasHalfStar;
    $scope.getEmptyStars = rating.getEmptyStars;

    $scope.countUserItems = function () {
        console.log($scope.profile.items.length);
        return $scope.profile.items.length;
    }
})