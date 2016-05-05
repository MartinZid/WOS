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
            /// Returns a promise for all items.
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
            /// <returns type="promise"></returns>
            return $http({
                method: 'GET',
                url: api.url + 'mobile/item?itemID=' + id
            });
        },
        search: function (query) {
            /// <summary>
            /// Returns a promise for search. Used in search controller.
            /// </summary>
            /// <param name="query" type="string"></param>
            /// <returns type="promise"></returns>
            return $http({
                method: 'GET',
                url: api.url + 'mobile/item?search=' + query
            })
        },
        addItem: function (item) {
            /// <summary>
            /// Uploads item to server. Add item controller.
            /// </summary>
            /// <param name="item" type="object"></param>
            /// <returns type="promise"></returns>
            return $http({
                method: 'POST',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                url: api.url + 'mobile/item/add-item?data=' + JSON.stringify(item)
            });
        }
    }

})