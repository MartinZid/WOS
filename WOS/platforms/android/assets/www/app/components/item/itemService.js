'use strict';
angular.module('wos.services', [])

///Factory for items
.factory('item', function ($http, api) {

    return {
        ///getAll function return a promise for all items. Used in homepage controller.
        getAll: function () {
            return $http({
                method: 'GET',
                url: api.url + 'api/item'
            });
        }
    }

})