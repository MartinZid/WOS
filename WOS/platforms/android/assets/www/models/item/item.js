'use strict';
angular.module('wos.services', [])

.factory('items', function () {

    return {
        all: function () {
            $http({
                method: 'GET',
                url: $scope.API + 'item'
            }).then(function successCallback(response) {
                console.log($scope.API + ' ' + response);
            }, function errorCallback(response) {
                console.log($scope.API + ' ' + response);
            });
        }
    }

})