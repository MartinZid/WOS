'use strict';
angular.module('wos.controllers.notifications', [])

.controller('NotificationsCtrl', function ($scope) {
    /// <summary>
    /// Controller for notifications view.
    /// </summary>
    /// <param name="$scope" type="type"></param>
    $scope.status = 0;

    $scope.data = {
        showDelete: false
    };

    $scope.deleteItem = function (item) {
        console.log('Deleting: ' + item.text)
        //$scope.items.splice($scope.items.indexOf(item), 1);
    };

    $scope.items = [
        { 'text': 'Nové hodnocení.' },
        { 'text': 'Vaše položka "Bagr Catterpillar" byla objednána.' },
        { 'text': 'Vaše položka "Sekačka Deree" byla schválena.' }
    ];
    
    $scope.doRefresh = function () {
        console.log('refreshing...');
    }

})