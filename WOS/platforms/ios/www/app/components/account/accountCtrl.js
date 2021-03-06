﻿'use strict';
angular.module('wos.controllers.account', [])

.controller('AccountCtrl', function ($scope, $state, profile, rent, $ionicModal,
                                     rating, $ionicViewSwitcher) {
    /// <summary>
    /// Controller for homepage tab
    /// </summary>
    /// <param name="$scope" type="type"></param>
    $scope.selectedSection = 1;
    $scope.status = 3;
    $scope.isRentsArray = true;
    $scope.isBorrowsArray = false;
    $scope.profile;
    $scope.rents;
    $scope.borrows;
    $scope.rating = 4;
    $scope.user;

    $scope.$on('$ionicView.beforeEnter', function () {
        /// <summary>
        /// If user is logged in get his identity and download his data, if not redirect user to login.
        /// </summary>
        if (profile.getLoggedInUserData() === null) {
            //$ionicViewSwitcher.nextDirection('none');
            $state.go('tab.login');
        }
        $scope.user = profile.getLoggedInUserData();
        $scope.getUserData();
        $scope.getUserRents();
    })

    $scope.doRefresh = function () {
        /// <summary>
        /// Called when account page is "pulled down" for refresh
        /// </summary>
        console.log('refreshing...');
        $scope.getUserData();
        $scope.getUserRents();
    }

    $scope.getUserData = function() {
        /// <summary>
        /// Downloads data for account
        /// </summary>
        profile.getProfileData($scope.user.id)
            .success(function (data) { ///if success save loaded data to $scope.profile
                $scope.profile = data;
                console.log(data);
                $scope.status = 0;
            }).error(function (data) { ///if can not load data from server set $scope.status, for error handling
                console.log('profile.getProfileData: Can not load data from server.');
                $scope.status = 2;
            }).finally(function () { /// Stop the ion-refresher from spinning
                $scope.$broadcast('scroll.refreshComplete');
            });
    };

    $scope.getUserRents = function() {
        /// <summary>
        /// Downloads rents and borrows for user profile.
        /// </summary>
        rent.getAll($scope.user.id, $scope.user.APIkey)
            .success(function (data) {///if success save loaded data to $scope.rents and $scope.borrows
                $scope.rents = data[1];
                $scope.borrows = data[0];
                console.log(data);
                $scope.covertBorrowsDate();
                $scope.status = 0;
                if ($scope.borrows.length == 0) {
                    $scope.isBorrowsArray = false;
                } else {
                    $scope.isBorrowsArray = true;
                }
                if ($scope.rents.length == 0) {
                    $scope.isRentsArray = false;
                } else {
                    $scope.isRentsArray = true;
                }
            }).error(function (data) { ///if can not load data from server set $scope.status, for error handling
                console.log('profile.getRents: Can not load data from server.');
                $scope.status = 2;
            }).finally(function () { /// Stop the ion-refresher from spinning
                $scope.$broadcast('scroll.refreshComplete');
            });
    };

    $scope.covertBorrowsDate = function () {
        /// <summary>
        /// Covert date format for all leases.
        /// "2016-02-29 17:11:00" -> "29.02.2016 17:11:00"
        /// </summary>
        /// <param name="data" type="type"></param>

        if ($scope.borrows == undefined) return;

        $scope.borrows.forEach(function (entry) {
            entry.leases.forEach(function (lease) {
                var from = lease.od.date.split(' ')[0].split('-');
                lease.from = from[2] + '.';
                lease.from += from[1] + '.';
                lease.from += from[0] + ' ';
                lease.from += lease.od.date.split(' ')[1];

                var to = lease.do.date.split(' ')[0].split('-');
                lease.to = to[2] + '.';
                lease.to += to[1] + '.';
                lease.to += to[0] + ' ';
                lease.to += lease.do.date.split(' ')[1];
                lease.actionError = 0;
            });
        });

        if ($scope.rents == undefined) return;

        $scope.rents.forEach(function (entry) {
            var from = entry.od.date.split(' ')[0].split('-');
            entry.from = from[2] + '.';
            entry.from += from[1] + '.';
            entry.from += from[0];

            var to = entry.do.date.split(' ')[0].split('-');
            entry.to = to[2] + '.';
            entry.to += to[1] + '.';
            entry.to += to[0];
            entry.loading = false;
            entry.actionError = 0;
        });
    }

    //$rootScope.notifications = '#/tab/notifications';

    $scope.logout = function () {
        /// <summary>
        /// It handles logout and redirects user to login page.
        /// </summary>

        profile.logout();
        $state.go('tab.login');
    };

    //$scope.$on('$ionicView.beforeEnter', function () {
    //    $state.go('tab.item-detail', { 'itemId': 28});
    //})

    $scope.changeSection = function (state) {
        /// <summary>
        /// Change section to user's chosen (state param).
        /// </summary>
        /// <param name="state" type="integer"></param>
        $scope.selectedSection = state;
    };

    $scope.goToItem = function (id) {
        /// <summary>
        /// Redirect user item with given id.
        /// </summary>
        /// <param name="id" type="integer"></param>
        $state.go('tab.item-detail', { itemId: id });
    }

    $ionicModal.fromTemplateUrl('new_rating.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.modal = modal;
    });
    $scope.openModal = function (lease) {
        $scope.modal.show();
        $scope.ratedLease = lease;
        console.log($scope.ratedLease);
        $scope.status = 0;  
    };
    $scope.closeModal = function () {
        $scope.modal.hide();
        $scope.status = 0;
    };

    $scope.ratingsObject = {
        iconOn: 'ion-ios-star',   
        iconOff: 'ion-ios-star-outline',  
        iconOnColor: 'rgb(255, 200, 0)',
        iconOffColor: 'rgb(255, 200, 0)',    
        rating: 4, 
        minRating: 1,  
        readOnly: true, 
        callback: function (rating) { 
            $scope.ratingsCallback(rating);
        }
    };

    $scope.ratingsCallback = function (rating) {
        /// <summary>
        /// When rating is submitted, saves rating into $scope.rating.
        /// </summary>
        /// <param name="rating" type="type"></param>
        $scope.rating = rating;
    };

    $scope.doRate = function (text) {
        /// <summary>
        /// Rating form submit. Sends rating with text to server.
        /// </summary>
        /// <param name="text" type="String"></param>
        console.log($scope.rating + '\n' + text.value);
        console.log($scope.ratedLease);
        $scope.spinning = true;
        rating.rateLease($scope.ratedLease.id_vypujcka, $scope.rating, text.value,
                         $scope.user.id, $scope.ratedLease.instance.id_instance_original)
            .success(function (data) {
                console.log('rating successful');
                $scope.status = 0;
                text.value = undefined;
                $scope.closeModal();
                $scope.ratedLease.rated = true;
                $scope.spinning = false;
            }).error(function () {
                console.log('rating failed');
                $scope.status = 2;
                $scope.spinning = false;
            });
    };

    $scope.approve = function (lease) {
        /// <summary>
        /// Lease is selected approved. It contacts server and when response is recieved
        /// it stops spinner and sets actionError to propriate value.
        /// </summary>
        /// <param name="lease" type="type"></param>
        console.log('approving...');
        lease.spinning = true;
        rent.approve(lease.id_vypujcka)
            .success(function () {
                lease.spinning = false;
                lease.actionError = 0;
                lease.stav_vypujcky = 'schváleno';
            }).error(function () {
                lease.spinning = false;
                lease.actionError = 1;
            })
    };
    $scope.decline = function (lease) {
        /// <summary>
        /// Lease is selected declined. It contacts server and when response is recieved
        /// it stops spinner and sets actionError to propriate value.
        /// </summary>
        /// <param name="lease" type="type"></param>
        console.log('declining...');
        lease.spinning = true;
        rent.decline(lease.id_vypujcka)
            .success(function () {
                lease.spinning = false;
                lease.actionError = 0;
                lease.stav_vypujcky = 'zamítnuto';
            }).error(function () {
                lease.spinning = false;
                lease.actionError = 2;
            })
    };
    $scope.repeatAction = function (lease) {
        /// <summary>
        /// It repeats a action acording to actionError.
        /// </summary>
        /// <param name="lease" type="type"></param>
        if (lease.actionError == 1)
            $scope.approve(lease);
        if (lease.actionError == 2)
            $scope.decline(lease);
        if (lease.actionError == 3)
            $scope.doReturn(lease);
    }
    $scope.doReturn = function (lease) {
        /// <summary>
        /// Lease is selected returned. It contacts server and when response is recieved
        /// it stops spinner and sets actionError to propriate value.
        /// </summary>
        /// <param name="lease" type="type"></param>
        console.log('returning...');
        lease.spinning = true;
        rent.return(lease.id_vypujcka)
            .success(function () {
                lease.spinning = false;
                lease.actionError = 0;
                lease.stav_vypujcky = 'ukončeno';
            }).error(function () {
                lease.spinning = false;
                lease.actionError = 3;
            })
    }
})
