'use strict';
angular.module('wos.services', [])

.factory('item', function ($http, api) {
    /// <summary>
    /// Factory for items.
    /// </summary>
    /// <param name="$http" type="type"></param>
    /// <param name="api" type="type"></param>
    /// <returns type="object">item</returns>

    return {
        getAll: function () {
            /// <summary>
            /// Returns a promise for all items. Used in homepage controller.
            /// </summary>
            /// <returns type="promise"></returns>
            return $http({
                method: 'GET',
                url: api.url + 'api/item'
            });
        }
    }

})