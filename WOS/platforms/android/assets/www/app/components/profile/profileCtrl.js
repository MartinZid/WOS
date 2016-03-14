'use strict';

angular.module('wos.controllers.profile', [])

.controller('ProfileCtrl', function ($scope, $stateParams, profile, $ionicModal) {
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

    $scope.countUserItems = function () {
        /// <summary>
        /// Return size of user's items array.
        /// </summary>
        /// <returns type="integer"></returns>
        return $scope.profile.items.length;
    };

    $ionicModal.fromTemplateUrl('reviews.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.modal = modal;
    });
    $scope.openModal = function ($event, reviews) {
        $scope.modal.show();
        $scope.reviews = reviews;
    };
    $scope.closeModal = function () {
        $scope.modal.hide();
    };
    ////Cleanup the modal when we're done with it!
    //$scope.$on('$destroy', function () {
    //    $scope.modal.remove();
    //});
    //// Execute action on hide modal
    //$scope.$on('modal.hidden', function () {
    //    // Execute action
    //});
    //// Execute action on remove modal
    //$scope.$on('modal.removed', function () {
    //    // Execute action
    //});


})