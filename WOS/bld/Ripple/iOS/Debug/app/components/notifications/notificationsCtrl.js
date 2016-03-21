'use strict';
angular.module('wos.controllers.notifications', [])

.controller('NotificationsCtrl', function ($scope, notifications) {
    /// <summary>
    /// Controller for notifications view.
    /// </summary>
    /// <param name="$scope" type="type"></param>
    $scope.status = 0;
    $scope.item;

    getAllNotifications();

    $scope.doRefresh = function () {
        console.log('refreshing...');
        getAllNotifications();
    }

    function getAllNotifications() {
        /// <summary>
        /// Downloads notifications data
        /// </summary>
        notifications.getAll(18)
            .success(function (data) {
                $scope.makeDataReadable(data);
                $scope.items = data;
                console.log(data);
                $scope.status = 0;
                if ($scope.items.length == 0) {
                    console.log('notifications.getAll: No data loaded.');
                    $scope.status = 1;
                };
            }).error(function (data) { ///if can not load data from server set $scope.status, for error handling
                console.log('notifications.getAll: Can not load data from server.');
                $scope.status = 2;
            }).finally(function () { /// Stop the ion-refresher from spinning
                $scope.$broadcast('scroll.refreshComplete');
            });
    };

    $scope.makeDataReadable = function (data) {
        /// <summary>
        /// It parses some data from notifications entries such as date and type and converts them in to more user friendly format.
        /// It is called after data is recieved from API.
        /// </summary>
        /// <param name="data" type="array"></param>
        console.log(data);
        if (data == []) return;
        data.forEach(function (entry) {
            var tmpDate = entry.vytvoreno.date.split(' ')[0].split('-');
            entry.myDate = tmpDate[2] + '.';
            entry.myDate += tmpDate[1] + '.';
            entry.myDate += tmpDate[0];

            entry.type = entry.obsah.split('.')[2];
        });
    };


    $scope.data = { //default state for notifications list
        showDelete: false
    };

    $scope.deleteItem = function (item) {
        console.log('Deleting: ' + item.text)
        //$scope.items.splice($scope.items.indexOf(item), 1);
    };

})