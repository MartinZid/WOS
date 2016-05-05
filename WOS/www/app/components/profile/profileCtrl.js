'use strict';

angular.module('wos.controllers.profile', [])

.controller('ProfileCtrl', function ($scope, $stateParams, profile, $ionicModal, $ionicHistory,
                                     $state, $filter) {
    /// <summary>
    /// Controller for profile view.
    /// </summary>
    /// <param name="$scope" type="type"></param>
    /// <param name="$stateParams" type="type"></param>
    /// <param name="profile" type="type"></param>
    /// <param name="$ionicModal" type="type"></param>
    /// <param name="$ionicHistory" type="type"></param>
    /// <param name="$state" type="type"></param>
    /// <param name="$filter" type="type"></param>

    // get profile id from "url"
    $scope.id = $stateParams.profileId;
    $scope.profile;
    $scope.status = 3;
    $scope.userItemsSum = 0;
    // get device's platform
    $scope.platform = ionic.Platform.platform();

    getProfileData($scope.id);

    function getProfileData(id) {
        /// <summary>
        /// Gets data for user profile with given id.
        /// </summary>
        /// <param name="id" type="integer"></param>
        profile.getProfileData(id)
            .success(function (data) {
                $scope.profile = data;
                console.log(data);
                $scope.status = 0;
                // show only instances which are approved
                $scope.profile.instances = $filter('filter')($scope.profile.instances, { itemState: 2 });

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
        /// <summary>
        /// Refreshes page.
        /// </summary>
        console.log('refreshing...');
        getProfileData($scope.id);
    }

    $scope.countUserItems = function () {
        /// <summary>
        /// Return size of user's items array.
        /// </summary>
        /// <returns type="integer"></returns>
        return $scope.profile.instances.length;
    };

    $scope.goBack = function () {
        $ionicHistory.goBack();
    };

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

    //we navigated from another tab
    $scope.forceBackButton = $ionicHistory.backView().stateId.indexOf('item-detail') < 0;

    $scope.backToParentView = function () {
        $state.go('tab.home', {}, { location: 'repalce', inherit: 'false' });
    };
})