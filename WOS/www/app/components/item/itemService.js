'use strict';
angular.module('wos.services.item', [])

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
                url: api.url + 'mobile/item'
            });
        },
        getDetail: function(id) {
            /// <summary>
            /// Returns a promise for item detail. Used in item detail controller.
            /// </summary>
            /// <param name="id" type="integer"></param>
            return $http({
                method: 'GET',
                url: api.url + '/mobile/item?itemID=' + id
            });
        }
    }

})